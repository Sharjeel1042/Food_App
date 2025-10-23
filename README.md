# 💪 FitTrack - AI-Powered Fitness & Nutrition Assistant# 💪 FitTrack - Personal Fitness & Nutrition Assistant# Food Nutrition Calculator



<div align="center">



![FitTrack Banner](https://img.shields.io/badge/FitTrack-AI%20Fitness%20App-ff4444?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAgMThjLTQuNDEgMC04LTMuNTktOC04czMuNTktOCA4LTggOCAzLjU5IDggOC0zLjU5IDgtOCA4eiIgZmlsbD0iI2ZmZiIvPgo8L3N2Zz4=)A modern, responsive web application that helps users track their calorie intake and generate personalized fitness plans using Google's Gemini AI.A Streamlit web app that identifies food from images and provides nutritional information using a custom-trained CNN model and Gemini API fallback.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)

![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

![Gemini AI](https://img.shields.io/badge/Gemini%20AI-8E75B2?style=for-the-badge&logo=google&logoColor=white)## ✨ Features## Features



**A modern, gym-themed fitness web application powered by Google's Gemini AI**- **Image Classification**: Upload food images and get instant identification



[View Demo](#) · [Report Bug](https://github.com/Sharjeel1042/Food_App/issues) · [Request Feature](https://github.com/Sharjeel1042/Food_App/issues)### 🍽️ Calorie Tracking- **Nutrition Database**: Local database with 101 food items and their nutritional values



</div>- Upload meal images to get instant nutritional analysis- **Transfer Learning**: Train your own model using the Food-101 dataset with MobileNetV2



---- AI-powered food identification using Gemini Vision API- **AI Fallback**: Uses Google Gemini API when food is not recognized locally



## 🔥 About The Project- Detailed breakdown of calories, protein, carbs, and fats- **Interactive UI**: Simple and clean Streamlit interface



**FitTrack** is a cutting-edge fitness and nutrition tracking application that combines AI-powered food recognition with personalized workout planning. Built with a bold, gym-inspired dark theme, FitTrack helps users achieve their fitness goals through intelligent meal analysis and customized training recommendations.- Per 100g nutritional values for each food item



### ✨ Key Features- Total meal summary with combined macros## Setup Instructions



#### 🍽️ **Smart Calorie Tracking**- Drag & drop image upload support

- 📸 **Dual Image Input**: Upload meal photos or capture live with your device camera

- 🤖 **AI Food Recognition**: Powered by Google Gemini Vision API### 1. Install Dependencies

- 📊 **Detailed Nutrition Breakdown**: Calories, protein, carbs, and fats for each food item

- 📈 **Per 100g Analysis**: Standardized nutritional values for better comparison### 📊 Personalized Fitness Plan```bash

- 🎯 **Meal Summaries**: Instant total macronutrient calculations

- 🖼️ **Drag & Drop Support**: Easy image uploading- Comprehensive body measurement inputpip install -r requirements.txt



#### 💪 **Personalized Fitness Plans**- Goal-oriented plan generation (weight loss, muscle building, bulking, etc.)```

- 📏 **Comprehensive Body Metrics**: Track weight, height, age, body fat %, and more

- 🎯 **Goal-Oriented Planning**: Weight loss, muscle building, bulking, stamina improvement- Customized daily calorie and macronutrient targets

- 🏃 **Activity Level Customization**: From sedentary to very active lifestyles

- 🏥 **Health Condition Awareness**: Safe recommendations based on medical conditions- Personalized exercise recommendations### 2. Set Up Gemini API Key (Optional but recommended)

- 🍎 **Daily Nutrition Targets**: Customized calorie and macro goals

- 🏋️ **Exercise Recommendations**: AI-generated workout plans tailored to your goals- Health condition considerations

- 💡 **Expert Tips**: Actionable diet and fitness advice

- 💾 **Save & Export**: Download your personalized plan- Actionable diet and workout tips**Option A: Using .env file (Recommended)**



---- Save and export your plan1. Copy the example file:



## 🎨 Design Highlights   ```bash



FitTrack features a **bold, gym-inspired dark theme** designed to motivate and energize:## 🚀 Getting Started   copy .env.example .env



- 🔴 **High-Energy Color Palette**: Red, orange, and neon green gradients   ```

- ⚫ **Dark Mode by Default**: Professional gym atmosphere

- ✨ **Glowing Effects**: Dynamic shadows and neon accents### Prerequisites2. Edit `.env` and add your Gemini API key:

- 💫 **Smooth Animations**: Pulsing icons, hover effects, and transitions

- 📱 **Fully Responsive**: Optimized for mobile, tablet, and desktop- A modern web browser (Chrome, Firefox, Safari, Edge)   ```

- 🎯 **Bold Typography**: Uppercase, heavy fonts for maximum impact

- Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))   GEMINI_API_KEY=your_actual_api_key_here

---

   ```

## 🚀 Getting Started

### Installation3. Get your API key from: https://makersuite.google.com/app/apikey

### Prerequisites



- A modern web browser (Chrome, Firefox, Safari, or Edge)

- Internet connection (for Gemini AI API)1. Clone or download this repository:**Option B: Using PyCharm Environment Variables**



### Installation```bash1. Go to `Run → Edit Configurations...`



1. **Clone the repository**git clone https://github.com/Sharjeel1042/Food_App.git2. Select your run configuration

   ```bash

   git clone https://github.com/Sharjeel1042/Food_App.gitcd Food_App3. Click on `Environment variables` → Click the folder icon

   cd Food_App

   ``````4. Add: `GEMINI_API_KEY=your_actual_api_key_here`



2. **Open the app**5. Click OK and Apply

   

   Simply open `index.html` in your browser:2. Open `index.html` in your web browser:

   ```bash

   # Option 1: Direct open   - Simply double-click the `index.html` file, or**Option C: Using Windows System Environment (Persistent)**

   start index.html  # Windows

   open index.html   # macOS   - Use a local web server (recommended for best results):```cmd

   xdg-open index.html  # Linux

      ```bashsetx GEMINI_API_KEY "your_actual_api_key_here"

   # Option 2: Local server (recommended)

   python -m http.server 8000   # Using Python```

   # Then visit: http://localhost:8000

   ```   python -m http.server 8000(Restart PyCharm/terminal after this)



3. **Start using FitTrack!**   

   - No configuration needed

   - API key is pre-configured   # Using Node.js### 3. Run the Application

   - Camera permissions will be requested when needed

   npx http-server```bash

---

   ```streamlit run app.py

## 📖 Usage Guide

```

### 🍽️ Calorie Tracking

3. On first launch, you'll be prompted to enter your Gemini API key

1. **Navigate to "Calorie Tracking" tab**

2. **Choose your input method:**   - The key is stored securely in your browser's localStorage## How to Use

   - 📁 **Upload Image**: Click or drag & drop a meal photo

   - 📷 **Take Photo**: Use your device camera for live capture   - You only need to enter it once

3. **Click "Analyze Meal"**

4. **View Results:**### First Time Setup - Train the Model

   - Individual food items with weight estimates

   - Detailed macronutrients for each item## 📖 Usage1. Launch the app with `streamlit run app.py`

   - Per 100g nutritional values

   - Total meal summary2. You'll see a warning "No trained local model found"



### 💪 Personalized Plan### Calorie Tracking Tab3. Click the **"Train model now"** button in the sidebar



1. **Navigate to "Personalized Plan" tab**4. Wait for training to complete (this can take 30-60 minutes depending on your hardware)

2. **Fill in your details:**

   - **Current Measurements**: Weight, height, age, gender, body fat %1. **Upload a meal image**: Click the upload area or drag & drop an image5. After training completes, reload the app

   - **Activity Level**: How often you exercise

   - **Goals**: Target weight and primary fitness goal2. **Click "Analyze Meal"**: The AI will identify foods and calculate nutrition

   - **Health Info**: Optional conditions for safer recommendations

3. **Click "Generate My Plan"**3. **Review results**: See detailed nutritional information for each food item### Using the App

4. **Review Your Plan:**

   - Daily calorie and macro targets4. **Check summary**: View total calories and macros for the entire meal1. Upload a food image using the file uploader

   - Customized exercise recommendations

   - Expert diet and workout tips2. The model will:

5. **Save Your Plan**: Click "💾 Save Plan" to download

### Personalized Plan Tab   - Show top 3 predictions with confidence scores

---

   - If confidence > 50%, use local nutrition database

## 🛠️ Built With

1. **Enter current measurements**: Weight, height, age, gender, body fat %   - If confidence < 50%, query Gemini API for identification

### Core Technologies

- **HTML5** - Semantic structure2. **Set your goals**: Target weight, primary goal, timeline3. View nutritional information:

- **CSS3** - Advanced styling with animations

- **Vanilla JavaScript** - No frameworks, pure ES6+3. **Add health information**: Optional health conditions for safer recommendations   - Calories (kcal)



### AI & APIs4. **Generate plan**: Get your customized nutrition targets and exercise plan   - Protein (g)

- **Google Gemini AI** - Multimodal AI for vision and text generation

  - Vision API for food recognition5. **Save your plan**: Download the plan for future reference   - Carbohydrates (g)

  - Text generation for personalized plans

   - Fats (g)

### Key Features Implementation

- **MediaDevices API** - Camera access for live photo capture## 🛠️ Technical Details   - *(All values are per 100g serving)*

- **FileReader API** - Image upload and processing

- **Fetch API** - Async communication with Gemini AI

- **LocalStorage API** - Form data persistence

- **Canvas API** - Image capture from video stream### Technologies Used## Project Structure



---- **HTML5**: Semantic markup and structure```



## 📂 Project Structure- **CSS3**: Modern styling with flexbox/grid, animations, and responsive designFood_App/



```- **Vanilla JavaScript**: No frameworks - pure ES6+ JavaScript├── app.py                   # Main Streamlit application

Food_App/

├── index.html          # Main HTML structure- **Gemini AI API**: Google's multimodal AI for vision and text generation├── nutrition_db.py          # Nutrition database loader

├── styles.css          # Complete styling (gym-themed dark mode)

├── script.js           # JavaScript logic and API integration├── nutrition_db.json        # Nutritional data for 101 foods

├── README.md           # Documentation

├── QUICKSTART.md       # Quick setup guide### Project Structure├── requirements.txt         # Python dependencies

├── FEATURES.md         # Feature checklist

├── .env                # API key (not tracked in git)```├── .env.example            # Template for environment variables

├── .env.example        # API key template

└── .gitignore          # Git ignore rulesFood_App/├── food_model.h5           # Trained model (created after training)

```

├── index.html          # Main HTML structure├── class_indices.json      # Class mapping (created after training)

---

├── styles.css          # Complete styling and responsive design└── images/                 # Food-101 dataset

## 🎯 Features Breakdown

├── script.js           # JavaScript logic and API integration    ├── apple_pie/

### Image Recognition

```javascript├── README.md           # Documentation    ├── baby_back_ribs/

// Gemini Vision API analyzes meal photos

- Food identification└── .env.example        # API key template    └── ... (101 food categories)

- Weight estimation

- Calorie calculation``````

- Macro breakdown (protein, carbs, fats)

- Per 100g standardization

```

### Key Features Implementation## Dataset

### Personalized Planning

```javascriptThe app uses the Food-101 dataset with:

// AI-generated fitness plans based on:

- Body metrics (weight, height, age, gender)**API Integration**- 101 food categories

- Activity level and lifestyle

- Fitness goals (weight loss, muscle gain, etc.)- Uses `fetch()` for async API calls- ~1000 images per category

- Health conditions and limitations

- Timeline and preferences- Supports both vision (image analysis) and text generation- Total: ~101,000 images

```

- Error handling and retry logic

### Camera Integration

```javascript- Response parsing for structured data## Model Details

// Live photo capture features:

- Real-time video preview- **Architecture**: MobileNetV2 (transfer learning)

- Environment-facing camera on mobile

- High-resolution capture (1280x720)**State Management**- **Pre-trained weights**: ImageNet

- Instant photo processing

```- localStorage for API key and user data persistence- **Training**: 5 epochs with early stopping



---- In-memory state for current session- **Input size**: 224x224 pixels



## 🌟 Screenshots- Form data auto-save between sessions- **Output**: 101 food classes



<div align="center">



### 🏠 Landing Page**UI/UX**## Troubleshooting

Bold, gym-inspired design with glowing effects

- Tab-based navigation

### 📸 Calorie Tracking

Upload or capture meal photos with AI analysis- Loading animations during API calls### "nutrition_db.json" error



### 💪 Personalized Plans- Error messaging and validation- The file must be valid JSON format (already fixed)

Customized fitness and nutrition recommendations

- Responsive design for mobile/tablet/desktop- Restart the app after the fix

### 📱 Mobile Responsive

Optimized for all screen sizes- Smooth transitions and hover effects



</div>### Model not loading



---## 🔒 Privacy & Security- Make sure `food_model.h5` and `class_indices.json` exist



## 🔒 Privacy & Security- Train the model using the in-app button



- ✅ **Client-Side Processing**: All logic runs in your browser- Your API key is stored only in your browser's localStorage

- ✅ **No External Storage**: Images are not saved or uploaded anywhere

- ✅ **Secure API Calls**: Direct communication with Google Gemini only- No data is sent to any server except Google's Gemini API### Gemini API not working

- ✅ **Local Data Storage**: Form data saved in browser's localStorage

- ✅ **No Tracking**: Zero analytics or user tracking- All processing happens client-side- Check that `GEMINI_API_KEY` is set correctly



---- No user data is collected or stored on external servers- Verify your API key is valid and has quota



## 🎨 Customization- Check your internet connection



### Changing Colors## 🎨 Customization



Edit the CSS variables in `styles.css`:### Training is very slow



```css### Changing Colors- Training 101 classes on CPU can take 1-2 hours

:root {

    --primary-color: #ff4444;      /* Main red color */Edit the CSS variables in `styles.css`:- Consider using Google Colab with GPU for faster training

    --secondary-color: #ff8800;     /* Orange accent */

    --accent-color: #00ff88;        /* Neon green */```css- Reduce epochs in `train_model()` function (line 162) for testing

    --bg-color: #0a0a0a;           /* Background */

    --card-bg: #1a1a1a;            /* Card background */:root {

}

```    --primary-color: #4f46e5;## Technologies Used



### Modifying AI Prompts    --secondary-color: #8b5cf6;- **Streamlit**: Web interface



Edit the prompt templates in `script.js`:    --success-color: #10b981;- **TensorFlow/Keras**: Deep learning framework

- **`analyzeMeal()`** - Food recognition prompts

- **`generatePersonalizedPlan()`** - Fitness plan prompts    /* ... more colors */- **MobileNetV2**: CNN architecture



---}- **Pillow**: Image processing



## 📱 Browser Compatibility```- **Google Gemini API**: AI-powered food recognition fallback



| Browser | Support |- **Python-dotenv**: Environment variable management

|---------|---------|

| Chrome | ✅ 90+ |### Modifying API Prompts

| Firefox | ✅ 88+ |

| Safari | ✅ 14+ |Edit the prompt templates in `script.js`:## Future Enhancements

| Edge | ✅ 90+ |

| Opera | ✅ 76+ |- `analyzeMeal()` function for calorie tracking prompts- Multi-food detection (detect multiple items in one image)



### Camera Support- `generatePersonalizedPlan()` function for fitness plan prompts- Portion size estimation

- ✅ Desktop: Webcam access

- ✅ Mobile: Front & back camera- Meal tracking and daily totals

- ✅ iOS Safari: Requires user interaction

## 📱 Browser Compatibility- Custom food database additions

---

- Export nutrition reports

## 🐛 Troubleshooting

- ✅ Chrome 90+

### API Errors

**Issue**: "API request failed"- ✅ Firefox 88+## License

- ✅ Check internet connection

- ✅ API may be temporarily unavailable- ✅ Safari 14+Educational project for learning purposes.

- ✅ Wait a few moments and retry

- ✅ Edge 90+

### Camera Not Working

**Issue**: Camera won't start

- ✅ Grant camera permissions in browser## 🐛 Troubleshooting

- ✅ Check if camera is used by another app

- ✅ Try refreshing the page### "API request failed" error

- Check your internet connection

### Image Upload Issues- The API service may be temporarily unavailable

**Issue**: Can't upload images- Try again in a few moments

- ✅ Check file size (max 5MB)

- ✅ Ensure image format (PNG, JPG, JPEG)### Image not uploading

- ✅ Try a different browser- Check file size (max 5MB)

- Ensure file is an image format (PNG, JPG, JPEG)

### Plan Not Generating- Try a different browser

**Issue**: Personalized plan fails

- ✅ Fill all required fields (marked with *)### Plan not generating

- ✅ Check browser console (F12) for errors- Fill all required fields (marked with *)

- ✅ Verify form inputs are valid- Check browser console for errors

- Try refreshing the page

---

## 🚧 Future Enhancements

## 🚧 Roadmap

- [ ] Meal history tracking

### Coming Soon- [ ] Progress charts and analytics

- [ ] 📊 **Progress Tracking**: Track weight and measurements over time- [ ] Barcode scanning for packaged foods

- [ ] 📈 **Analytics Dashboard**: Visualize nutrition trends- [ ] Recipe suggestions based on goals

- [ ] 🥗 **Recipe Suggestions**: AI-generated meal recommendations- [ ] Integration with fitness trackers

- [ ] 🏆 **Achievement System**: Gamification and milestones- [ ] Multi-language support

- [ ] 💬 **Chat Assistant**: AI fitness coach- [ ] Dark mode theme

- [ ] 🌐 **Multi-Language**: Support for multiple languages- [ ] PWA capabilities for offline use

- [ ] 🌙 **Theme Switcher**: Light mode option

- [ ] 📲 **PWA Support**: Install as mobile app## 📄 License

- [ ] 🔄 **Sync Across Devices**: Cloud backup (optional)

- [ ] 📧 **Email Reports**: Weekly progress summariesThis project is open source and available under the MIT License.



---## 🤝 Contributing



## 🤝 ContributingContributions, issues, and feature requests are welcome! Feel free to check the issues page.



Contributions are what make the open-source community amazing! Any contributions you make are **greatly appreciated**.## 👨‍💻 Author



1. Fork the Project**Sharjeel**

2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)- GitHub: [@Sharjeel1042](https://github.com/Sharjeel1042)

3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)

4. Push to the Branch (`git push origin feature/AmazingFeature`)## 🙏 Acknowledgments

5. Open a Pull Request

- Google Gemini AI for powerful multimodal AI capabilities

---- The open-source community for inspiration



## 📄 License## 📞 Support



Distributed under the MIT License. See `LICENSE` for more information.If you have any questions or need help, please open an issue on GitHub.



------



## 👨‍💻 AuthorMade with ❤️ using Gemini AI


**Sharjeel**

- GitHub: [@Sharjeel1042](https://github.com/Sharjeel1042)
- Project Link: [https://github.com/Sharjeel1042/Food_App](https://github.com/Sharjeel1042/Food_App)

---

## 🙏 Acknowledgments

- **Google Gemini AI** - Powerful multimodal AI capabilities
- **Font Awesome** - Icons and emoji support
- **MDN Web Docs** - Excellent web development documentation
- **The Open Source Community** - For inspiration and support

---

## 📞 Support

If you find this project helpful, please ⭐ star the repository!

For questions or issues:
- 📧 Open an [issue](https://github.com/Sharjeel1042/Food_App/issues)
- 💬 Start a [discussion](https://github.com/Sharjeel1042/Food_App/discussions)

---

<div align="center">

### 💪 Built with dedication. Powered by AI. Designed for fitness enthusiasts.

**Made with ❤️ using Gemini AI | 2025**

</div>
