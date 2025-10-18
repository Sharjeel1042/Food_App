# Food Nutrition Calculator

A Streamlit web app that identifies food from images and provides nutritional information using a custom-trained CNN model and Gemini API fallback.

## Features
- **Image Classification**: Upload food images and get instant identification
- **Nutrition Database**: Local database with 101 food items and their nutritional values
- **Transfer Learning**: Train your own model using the Food-101 dataset with MobileNetV2
- **AI Fallback**: Uses Google Gemini API when food is not recognized locally
- **Interactive UI**: Simple and clean Streamlit interface

## Setup Instructions

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Set Up Gemini API Key (Optional but recommended)

**Option A: Using .env file (Recommended)**
1. Copy the example file:
   ```bash
   copy .env.example .env
   ```
2. Edit `.env` and add your Gemini API key:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```
3. Get your API key from: https://makersuite.google.com/app/apikey

**Option B: Using PyCharm Environment Variables**
1. Go to `Run → Edit Configurations...`
2. Select your run configuration
3. Click on `Environment variables` → Click the folder icon
4. Add: `GEMINI_API_KEY=your_actual_api_key_here`
5. Click OK and Apply

**Option C: Using Windows System Environment (Persistent)**
```cmd
setx GEMINI_API_KEY "your_actual_api_key_here"
```
(Restart PyCharm/terminal after this)

### 3. Run the Application
```bash
streamlit run app.py
```

## How to Use

### First Time Setup - Train the Model
1. Launch the app with `streamlit run app.py`
2. You'll see a warning "No trained local model found"
3. Click the **"Train model now"** button in the sidebar
4. Wait for training to complete (this can take 30-60 minutes depending on your hardware)
5. After training completes, reload the app

### Using the App
1. Upload a food image using the file uploader
2. The model will:
   - Show top 3 predictions with confidence scores
   - If confidence > 50%, use local nutrition database
   - If confidence < 50%, query Gemini API for identification
3. View nutritional information:
   - Calories (kcal)
   - Protein (g)
   - Carbohydrates (g)
   - Fats (g)
   - *(All values are per 100g serving)*

## Project Structure
```
Food_App/
├── app.py                   # Main Streamlit application
├── nutrition_db.py          # Nutrition database loader
├── nutrition_db.json        # Nutritional data for 101 foods
├── requirements.txt         # Python dependencies
├── .env.example            # Template for environment variables
├── food_model.h5           # Trained model (created after training)
├── class_indices.json      # Class mapping (created after training)
└── images/                 # Food-101 dataset
    ├── apple_pie/
    ├── baby_back_ribs/
    └── ... (101 food categories)
```

## Dataset
The app uses the Food-101 dataset with:
- 101 food categories
- ~1000 images per category
- Total: ~101,000 images

## Model Details
- **Architecture**: MobileNetV2 (transfer learning)
- **Pre-trained weights**: ImageNet
- **Training**: 5 epochs with early stopping
- **Input size**: 224x224 pixels
- **Output**: 101 food classes

## Troubleshooting

### "nutrition_db.json" error
- The file must be valid JSON format (already fixed)
- Restart the app after the fix

### Model not loading
- Make sure `food_model.h5` and `class_indices.json` exist
- Train the model using the in-app button

### Gemini API not working
- Check that `GEMINI_API_KEY` is set correctly
- Verify your API key is valid and has quota
- Check your internet connection

### Training is very slow
- Training 101 classes on CPU can take 1-2 hours
- Consider using Google Colab with GPU for faster training
- Reduce epochs in `train_model()` function (line 162) for testing

## Technologies Used
- **Streamlit**: Web interface
- **TensorFlow/Keras**: Deep learning framework
- **MobileNetV2**: CNN architecture
- **Pillow**: Image processing
- **Google Gemini API**: AI-powered food recognition fallback
- **Python-dotenv**: Environment variable management

## Future Enhancements
- Multi-food detection (detect multiple items in one image)
- Portion size estimation
- Meal tracking and daily totals
- Custom food database additions
- Export nutrition reports

## License
Educational project for learning purposes.

