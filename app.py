import streamlit as st
from nutrition_db import get_nutrition_by_name
from PIL import Image
import numpy as np
import tensorflow as tf
from tensorflow.keras.applications.mobilenet_v2 import MobileNetV2, preprocess_input
import requests
import base64
import io
import json
import os
import pathlib
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

st.set_page_config(page_title="Food Nutrition Calculator", layout="centered")

# Paths
HERE = pathlib.Path(__file__).parent
MODEL_PATH = HERE / "food_model.h5"
CLASS_MAP_PATH = HERE / "class_indices.json"
DATA_DIR = HERE / "images"

# --- Load model if already trained ---
@st.cache_resource
def load_model_and_classes():
    """Load the trained model and class names with caching."""
    if MODEL_PATH.exists() and CLASS_MAP_PATH.exists():
        try:
            model = tf.keras.models.load_model(str(MODEL_PATH))
            with open(CLASS_MAP_PATH, "r", encoding="utf-8") as f:
                class_names = json.load(f)
            return model, class_names, True
        except Exception as e:
            st.warning(f"Failed to load saved model or class map: {e}")
            return None, [], False
    return None, [], False

model, class_names, model_loaded = load_model_and_classes()


# --- Gemini API Integration ---
def get_nutrition_from_gemini(image: Image.Image):
    """Call Gemini (Generative Language) to identify food + nutrition for 100g.
    Returns (nutrition_dict, error_str) where nutrition_dict is None on error.
    """
    st.info("Food not recognized with high confidence. Querying Gemini...")

    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        return None, "Gemini API key is not set in environment variable GEMINI_API_KEY."

    # convert image to jpeg base64
    buffered = io.BytesIO()
    image.save(buffered, format="JPEG")
    img_b64 = base64.b64encode(buffered.getvalue()).decode("utf-8")

    api_url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key={api_key}"

    prompt = (
        "Identify the primary food item in this image. Respond with ONLY a single JSON object "
        "containing 'name', 'calories', 'protein', 'carbs', and 'fats' for a standard 100g serving. "
        "Example: {\"name\": \"sushi\", \"calories\": 200, \"protein\": 8, \"carbs\": 35, \"fats\": 2}"
    )

    payload = {
        "contents": [
            {
                "parts": [
                    {"text": prompt},
                    {
                        "inlineData": {
                            "mimeType": "image/jpeg",
                            "data": img_b64,
                        }
                    }
                ]
            }
        ]
    }

    headers = {"Content-Type": "application/json"}

    try:
        r = requests.post(api_url, headers=headers, json=payload, timeout=30)
        r.raise_for_status()
        result = r.json()

        candidate = result.get("candidates", [{}])[0]
        content_parts = candidate.get("content", {}).get("parts", [])
        text_content = ""
        for p in content_parts:
            if p.get("text"):
                text_content += p.get("text")

        text_content = text_content.strip()
        # strip markdown fences if present
        if text_content.startswith("```json"):
            text_content = text_content[7:]
        if text_content.endswith("```"):
            text_content = text_content[:-3]

        nutrition_data = json.loads(text_content)
        if all(k in nutrition_data for k in ("name", "calories", "protein", "carbs", "fats")):
            return nutrition_data, None
        else:
            return None, "Gemini response missing required fields."

    except requests.exceptions.RequestException as e:
        return None, f"API request failed: {e}"
    except (json.JSONDecodeError, KeyError, IndexError) as e:
        return None, f"Could not parse Gemini response: {e}"


# --- Image classification using the fine-tuned model ---
def classify_image(image: Image.Image, top_k=3):
    """Return (result, error). If recognized locally, result is the food name string.
    If not recognized locally, result is a nutrition dict from Gemini.
    """
    if not model_loaded:
        return None, "Local model not available. Train or provide a trained model."

    img = image.resize((224, 224))
    arr = tf.keras.preprocessing.image.img_to_array(img)
    arr = np.expand_dims(arr, axis=0)
    arr = preprocess_input(arr)

    preds = model.predict(arr)[0]
    # preds assumed softmax over classes
    top_idx = preds.argsort()[-top_k:][::-1]
    top_probs = preds[top_idx]
    top_names = [class_names[i] for i in top_idx]

    st.write("### Model's Top Predictions:")
    for name, prob in zip(top_names, top_probs):
        st.write(f"{name.replace('_', ' ').title()} — {prob:.2%}")

    best_name = top_names[0]
    best_prob = float(top_probs[0])

    # If recognized with decent confidence and present in nutrition DB, return it
    if best_prob >= 0.5:
        # normalize name to match keys in nutrition DB
        db_entry = get_nutrition_by_name(best_name)
        if db_entry:
            return best_name, None

    # otherwise fall back to Gemini
    return get_nutrition_from_gemini(image)


# --- Training helper (only runs if user triggers it) ---
def train_model(epochs=5, batch_size=32, image_size=(224, 224)):
    """Train a transfer learning model on the images/ folder and save model + class map."""
    if not DATA_DIR.exists():
        st.error("Images dataset folder not found. Place the Food-101 style dataset in 'images/'")
        return False, "dataset_missing"

    st.info("Preparing datasets. This may take a few moments...")
    train_ds = tf.keras.preprocessing.image_dataset_from_directory(
        str(DATA_DIR),
        labels='inferred',
        label_mode='int',
        image_size=image_size,
        batch_size=batch_size,
        shuffle=True,
        validation_split=0.2,
        subset='training',
        seed=123
    )
    val_ds = tf.keras.preprocessing.image_dataset_from_directory(
        str(DATA_DIR),
        labels='inferred',
        label_mode='int',
        image_size=image_size,
        batch_size=batch_size,
        shuffle=True,
        validation_split=0.2,
        subset='validation',
        seed=123
    )

    class_names_local = train_ds.class_names
    num_classes = len(class_names_local)

    # Build model
    base = MobileNetV2(weights='imagenet', include_top=False, input_shape=(image_size[0], image_size[1], 3))
    base.trainable = False
    inputs = tf.keras.Input(shape=(image_size[0], image_size[1], 3))
    x = preprocess_input(inputs)
    x = base(x, training=False)
    x = tf.keras.layers.GlobalAveragePooling2D()(x)
    x = tf.keras.layers.Dropout(0.2)(x)
    outputs = tf.keras.layers.Dense(num_classes, activation='softmax')(x)
    m = tf.keras.Model(inputs, outputs)

    m.compile(optimizer=tf.keras.optimizers.Adam(1e-4),
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])

    callbacks = [
        tf.keras.callbacks.ModelCheckpoint(str(MODEL_PATH), save_best_only=True, monitor='val_accuracy'),
        tf.keras.callbacks.EarlyStopping(monitor='val_accuracy', patience=3, restore_best_weights=True)
    ]

    m.fit(train_ds, validation_data=val_ds, epochs=epochs, callbacks=callbacks)

    # Save class map
    with open(CLASS_MAP_PATH, 'w', encoding='utf-8') as f:
        json.dump(class_names_local, f)

    return True, None


# --- Streamlit UI ---
st.title("Food Nutrition Calculator")
st.write("Upload an image of your meal to get its nutritional information.")

col1, col2 = st.columns([2, 1])
with col2:
    st.write("Model status:")
    if model_loaded:
        st.success("Local model loaded")
        st.write(f"Classes: {len(class_names)}")
    else:
        st.warning("No trained local model found")
        if st.button("Train model now (uses local CPU/GPU)"):
            with st.spinner("Training model — this can take a long time depending on dataset and hardware..."):
                ok, err = train_model(epochs=5)
                if ok:
                    st.success("Model trained and saved. Reload the app to use it.")
                else:
                    st.error(f"Training failed: {err}")

uploaded_file = st.file_uploader("Choose an image...", type=["jpg", "jpeg", "png"])

if uploaded_file is not None:
    image = Image.open(uploaded_file).convert('RGB')
    st.image(image, caption='Uploaded Meal', use_column_width=True)

    if not model_loaded:
        st.info("Local model not loaded. You can train one from the images/ folder or rely on Gemini (requires GEMINI_API_KEY).")

    with st.spinner('Analyzing your meal...'):
        nutrition_info, error = classify_image(image)

    st.write('---')

    if error:
        st.error(error)
    elif nutrition_info:
        st.write('### Nutritional Information')
        if isinstance(nutrition_info, str):
            # this branch should not happen with current classify_image signature, kept for backward compatibility
            food_name = nutrition_info
            data = get_nutrition_by_name(food_name)
            st.success(f"**Detected Food:** {food_name.replace('_', ' ').title()}")
        elif isinstance(nutrition_info, dict):
            data = nutrition_info
            st.success(f"**Detected Food (from Gemini):** {data.get('name', 'N/A').title()}")
        else:
            # local detection returned a class name
            data = None
            if isinstance(nutrition_info, tuple) and nutrition_info[0]:
                # not expected but handle
                data = get_nutrition_by_name(nutrition_info[0])

        if data:
            st.write(f"**Calories:** {data.get('calories', 0):.2f} kcal")
            st.write(f"**Protein:** {data.get('protein', 0):.2f} g")
            st.write(f"**Carbohydrates:** {data.get('carbs', 0):.2f} g")
            st.write(f"**Fats:** {data.get('fats', 0):.2f} g")
            st.caption("_Values are typically per 100g serving._")
        else:
            st.warning("Could not retrieve nutritional data for the detected food.")

else:
    st.write("Awaiting image upload...")
