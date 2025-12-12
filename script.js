// Configuration
const CONFIG = {
    GEMINI_API_KEY: 'AIzaSyAogO7ktYHnznGGipKHjQeLEL1fwTjnwSU',
    GEMINI_API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
    MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
};

let currentImageData = null;

// Initialize app when page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    initTabNavigation();
    initCalorieTracking();
    initPersonalizedPlan();
    loadSavedFormData();
}

// Tab Navigation
function initTabNavigation() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.dataset.tab;

            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            tabPanes.forEach(pane => pane.classList.remove('active'));
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// Calorie Tracking
let cameraStream = null;

function initCalorieTracking() {
    const mealImageInput = document.getElementById('mealImage');
    const uploadArea = document.getElementById('uploadArea');
    const cameraArea = document.getElementById('cameraArea');
    const imagePreview = document.getElementById('imagePreview');
    const previewImg = document.getElementById('previewImg');
    const removeImageBtn = document.getElementById('removeImage');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const uploadOption = document.getElementById('uploadOption');
    const cameraOption = document.getElementById('cameraOption');
    const captureBtn = document.getElementById('captureBtn');
    const stopCameraBtn = document.getElementById('stopCameraBtn');
    const cameraVideo = document.getElementById('cameraVideo');
    const cameraCanvas = document.getElementById('cameraCanvas');

    uploadOption.addEventListener('click', () => {
        uploadOption.classList.add('active');
        cameraOption.classList.remove('active');
        uploadArea.classList.remove('hidden');
        cameraArea.classList.add('hidden');
        stopCamera();
    });

    cameraOption.addEventListener('click', () => {
        cameraOption.classList.add('active');
        uploadOption.classList.remove('active');
        cameraArea.classList.remove('hidden');
        uploadArea.classList.add('hidden');
        startCamera();
    });

    mealImageInput.addEventListener('change', (e) => {
        handleImageUpload(e.target.files[0]);
    });

    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--primary-color)';
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = 'var(--border-color)';
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--border-color)';
        const file = e.dataTransfer.files[0];
        handleImageUpload(file);
    });

    captureBtn.addEventListener('click', () => {
        capturePhoto(cameraVideo, cameraCanvas);
    });

    stopCameraBtn.addEventListener('click', () => {
        stopCamera();
    });

    removeImageBtn.addEventListener('click', () => {
        currentImageData = null;
        mealImageInput.value = '';
        uploadArea.classList.remove('hidden');
        imagePreview.classList.add('hidden');
        analyzeBtn.disabled = true;
        hideResults('calorie');
    });

    analyzeBtn.addEventListener('click', () => {
        analyzeMeal();
    });
}

async function startCamera() {
    try {
        const video = document.getElementById('cameraVideo');
        
        cameraStream = await navigator.mediaDevices.getUserMedia({
            video: {
                width: { ideal: 1280 },
                height: { ideal: 720 },
                facingMode: 'environment'
            }
        });
        
        video.srcObject = cameraStream;
        showNotification('Camera started successfully!', 'success');
    } catch (error) {
        console.error('Error accessing camera:', error);
        showNotification('Unable to access camera. Please check permissions.', 'error');
    }
}

function stopCamera() {
    if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
        cameraStream = null;
        const video = document.getElementById('cameraVideo');
        video.srcObject = null;
    }
}

function capturePhoto(video, canvas) {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    currentImageData = canvas.toDataURL('image/jpeg', 0.9);
    
    const previewImg = document.getElementById('previewImg');
    previewImg.src = currentImageData;
    
    document.getElementById('cameraArea').classList.add('hidden');
    document.getElementById('imagePreview').classList.remove('hidden');
    document.getElementById('analyzeBtn').disabled = false;
    
    stopCamera();
    showNotification('Photo captured successfully!', 'success');
}

function handleImageUpload(file) {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
        showNotification('Please upload an image file', 'error');
        return;
    }

    if (file.size > CONFIG.MAX_FILE_SIZE) {
        showNotification('File size should be less than 5MB', 'error');
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        currentImageData = e.target.result;
        const previewImg = document.getElementById('previewImg');
        previewImg.src = currentImageData;
        
        document.getElementById('uploadArea').classList.add('hidden');
        document.getElementById('imagePreview').classList.remove('hidden');
        document.getElementById('analyzeBtn').disabled = false;
    };
    reader.readAsDataURL(file);
}

async function analyzeMeal() {
    if (!currentImageData) {
        showNotification('Please upload an image first', 'error');
        return;
    }

    showLoading('calorie');
    hideResults('calorie');
    hideError('calorie');

    try {
        const base64Image = currentImageData.split(',')[1];

        const prompt = `Analyze this food image and provide detailed nutritional information. For each food item visible:

1. Identify the food name
2. Estimate the weight in grams
3. Provide nutritional values:
   - Calories (kcal)
   - Protein (g)
   - Carbohydrates (g)
   - Fats (g)
4. Also provide values per 100g for each food

Format your response as a JSON array like this:
[
  {
    "name": "Food name",
    "weight": 150,
    "nutrition": {
      "calories": 250,
      "protein": 15,
      "carbs": 30,
      "fats": 8
    },
    "per100g": {
      "calories": 167,
      "protein": 10,
      "carbs": 20,
      "fats": 5.3
    }
  }
]

Be accurate and realistic with estimates. If you see multiple items, include all of them.`;
        const response = await callGeminiAPI(prompt, base64Image);
        const foodItems = parseNutritionResponse(response);
        
        if (foodItems && foodItems.length > 0) {
            displayCalorieResults(foodItems);
        } else {
            throw new Error('Could not parse nutritional information');
        }

    } catch (error) {
        console.error('Error analyzing meal:', error);
        showError('calorie', `Failed to analyze meal: ${error.message}`);
    } finally {
        hideLoading('calorie');
    }
}

function parseNutritionResponse(response) {
    try {
        const text = response.trim();
        
        const jsonMatch = text.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }
        
        const codeBlockMatch = text.match(/```json\s*([\s\S]*?)\s*```/);
        if (codeBlockMatch) {
            return JSON.parse(codeBlockMatch[1]);
        }
        
        throw new Error('Could not extract JSON from response');
    } catch (error) {
        console.error('Parse error:', error);
        throw new Error('Invalid response format from API');
    }
}

function displayCalorieResults(foodItems) {
    const foodItemsContainer = document.getElementById('foodItems');
    foodItemsContainer.innerHTML = '';

    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFats = 0;

    foodItems.forEach((food, index) => {
        totalCalories += food.nutrition.calories || 0;
        totalProtein += food.nutrition.protein || 0;
        totalCarbs += food.nutrition.carbs || 0;
        totalFats += food.nutrition.fats || 0;

        const foodCard = document.createElement('div');
        foodCard.className = 'food-item';
        foodCard.innerHTML = `
            <div class="food-name">🍽️ ${food.name}</div>
            <div class="food-weight">Estimated weight: ${food.weight}g</div>
            
            <div class="nutrition-grid">
                <div class="nutrition-item">
                    <div class="nutrition-label">Calories</div>
                    <div class="nutrition-value">${food.nutrition.calories} kcal</div>
                </div>
                <div class="nutrition-item">
                    <div class="nutrition-label">Protein</div>
                    <div class="nutrition-value">${food.nutrition.protein}g</div>
                </div>
                <div class="nutrition-item">
                    <div class="nutrition-label">Carbs</div>
                    <div class="nutrition-value">${food.nutrition.carbs}g</div>
                </div>
                <div class="nutrition-item">
                    <div class="nutrition-label">Fats</div>
                    <div class="nutrition-value">${food.nutrition.fats}g</div>
                </div>
            </div>

            <div class="per-100g">
                <div class="per-100g-title">Per 100g:</div>
                <div class="nutrition-grid">
                    <div class="nutrition-item">
                        <div class="nutrition-label">Calories</div>
                        <div class="nutrition-value">${food.per100g.calories} kcal</div>
                    </div>
                    <div class="nutrition-item">
                        <div class="nutrition-label">Protein</div>
                        <div class="nutrition-value">${food.per100g.protein}g</div>
                    </div>
                    <div class="nutrition-item">
                        <div class="nutrition-label">Carbs</div>
                        <div class="nutrition-value">${food.per100g.carbs}g</div>
                    </div>
                    <div class="nutrition-item">
                        <div class="nutrition-label">Fats</div>
                        <div class="nutrition-value">${food.per100g.fats}g</div>
                    </div>
                </div>
            </div>
        `;
        foodItemsContainer.appendChild(foodCard);
    });

    document.getElementById('totalCalories').textContent = `${Math.round(totalCalories)} kcal`;
    document.getElementById('totalProtein').textContent = `${Math.round(totalProtein)}g`;
    document.getElementById('totalCarbs').textContent = `${Math.round(totalCarbs)}g`;
    document.getElementById('totalFats').textContent = `${Math.round(totalFats)}g`;

    showResults('calorie');
}

// Personalized Plan
function initPersonalizedPlan() {
    const planForm = document.getElementById('planForm');
    const savePlanBtn = document.getElementById('savePlan');

    planForm.addEventListener('submit', (e) => {
        e.preventDefault();
        generatePersonalizedPlan();
    });

    savePlanBtn.addEventListener('click', () => {
        savePlanData();
    });
}

async function generatePersonalizedPlan() {
    const formData = {
        currentWeight: parseFloat(document.getElementById('currentWeight').value),
        height: parseFloat(document.getElementById('height').value),
        age: parseInt(document.getElementById('age').value),
        gender: document.getElementById('gender').value,
        bodyFat: document.getElementById('bodyFat').value ? parseFloat(document.getElementById('bodyFat').value) : null,
        activityLevel: document.getElementById('activityLevel').value,
        targetWeight: parseFloat(document.getElementById('targetWeight').value),
        goal: document.getElementById('goal').value,
        timeline: document.getElementById('timeline').value,
        healthConditions: document.getElementById('healthConditions').value
    };

    localStorage.setItem('userPlanData', JSON.stringify(formData));

    showLoading('plan');
    hideResults('plan');
    hideError('plan');

    try {
        const prompt = `Create a comprehensive personalized fitness and nutrition plan based on these details:

Current Status:
- Weight: ${formData.currentWeight} kg
- Height: ${formData.height} cm
- Age: ${formData.age} years
- Gender: ${formData.gender}
${formData.bodyFat ? `- Body Fat: ${formData.bodyFat}%` : ''}
- Activity Level: ${formData.activityLevel}

Goals:
- Target Weight: ${formData.targetWeight} kg
- Primary Goal: ${formData.goal}
${formData.timeline ? `- Timeline: ${formData.timeline}` : ''}

${formData.healthConditions ? `Health Conditions: ${formData.healthConditions}` : ''}

Please provide:

1. DAILY NUTRITION TARGETS (provide as JSON):
{
  "calories": <number>,
  "protein": <number in grams>,
  "carbs": <number in grams>,
  "fats": <number in grams>,
  "water": <number in liters>
}

2. EXERCISE PLAN:
Provide a detailed weekly exercise plan considering their goal, fitness level, and any health conditions. Include:
- Types of exercises
- Frequency and duration
- Progression plan
- Safety considerations

3. KEY TIPS & RECOMMENDATIONS:
Provide 5-8 actionable tips covering:
- Nutrition strategies
- Workout best practices
- Recovery and rest
- Lifestyle modifications
- Specific considerations for their health conditions (if any)

Format the response clearly with sections separated by "---SECTION---"`;

        const response = await callGeminiAPI(prompt);
        displayPersonalizedPlan(response);

    } catch (error) {
        console.error('Error generating plan:', error);
        showError('plan', `Failed to generate plan: ${error.message}`);
    } finally {
        hideLoading('plan');
    }
}

function displayPersonalizedPlan(response) {
    try {
        const nutritionMatch = response.match(/\{[\s\S]*?"calories"[\s\S]*?\}/);
        let nutritionTargets = null;
        
        if (nutritionMatch) {
            nutritionTargets = JSON.parse(nutritionMatch[0]);
        }

        const sections = response.split(/---SECTION---|#{2,3}/);

        displayDashboardStats(nutritionTargets);
        
        if (nutritionTargets) {
            displayNutritionTargets(nutritionTargets);
        } else {
            displayNutritionTargetsFromText(response);
        }

        displayExercisePlan(response);
        displayProgressTimeline();
        displayTips(response);

        showResults('plan');
    } catch (error) {
        console.error('Error displaying plan:', error);
        displayRawPlan(response);
        showResults('plan');
    }
}

function displayDashboardStats(nutritionTargets) {
    const savedData = localStorage.getItem('userPlanData');
    if (savedData) {
        const data = JSON.parse(savedData);
        
        document.getElementById('statCurrentWeight').textContent = `${data.currentWeight} kg`;
        document.getElementById('statTargetWeight').textContent = `${data.targetWeight} kg`;
        
        if (nutritionTargets) {
            document.getElementById('statCalories').textContent = `${nutritionTargets.calories} kcal`;
        }
        
        const heightInMeters = data.height / 100;
        const bmi = (data.currentWeight / (heightInMeters * heightInMeters)).toFixed(1);
        document.getElementById('statBMI').textContent = bmi;
    }
}

function displayNutritionTargets(targets) {
    const container = document.getElementById('nutritionTargets');
    container.innerHTML = '';

    const items = [
        { label: 'Daily Calories', value: `${targets.calories} kcal`, icon: '🔥' },
        { label: 'Protein', value: `${targets.protein}g`, icon: '🥩' },
        { label: 'Carbs', value: `${targets.carbs}g`, icon: '🍞' },
        { label: 'Fats', value: `${targets.fats}g`, icon: '🥑' },
        { label: 'Water', value: `${targets.water}L`, icon: '💧' }
    ];

    items.forEach(item => {
        const targetItem = document.createElement('div');
        targetItem.className = 'target-item';
        targetItem.innerHTML = `
            <div class="target-label">${item.icon} ${item.label}</div>
            <div class="target-value">${item.value}</div>
        `;
        container.appendChild(targetItem);
    });
}

function displayNutritionTargetsFromText(text) {
    const caloriesMatch = text.match(/calories?:?\s*(\d+)/i);
    const proteinMatch = text.match(/protein:?\s*(\d+)/i);
    const carbsMatch = text.match(/carbs?:?\s*(\d+)/i);
    const fatsMatch = text.match(/fats?:?\s*(\d+)/i);
    const waterMatch = text.match(/water:?\s*([\d.]+)/i);

    const targets = {
        calories: caloriesMatch ? parseInt(caloriesMatch[1]) : 2000,
        protein: proteinMatch ? parseInt(proteinMatch[1]) : 150,
        carbs: carbsMatch ? parseInt(carbsMatch[1]) : 200,
        fats: fatsMatch ? parseInt(fatsMatch[1]) : 65,
        water: waterMatch ? parseFloat(waterMatch[1]) : 2.5
    };

    displayNutritionTargets(targets);
}

function displayExercisePlan(text) {
    const container = document.getElementById('exercisePlan');
    const exerciseSection = text.match(/EXERCISE[\s\S]*?(?=KEY TIPS|RECOMMENDATIONS|$)/i);
    
    if (exerciseSection) {
        container.innerHTML = formatTextContent(exerciseSection[0]);
    } else {
        const lines = text.split('\n');
        let exerciseContent = '';
        let capturing = false;
        
        for (let line of lines) {
            if (line.match(/exercise|workout|training/i)) {
                capturing = true;
            }
            if (capturing && line.match(/tips|recommendation/i)) {
                break;
            }
            if (capturing) {
                exerciseContent += line + '\n';
            }
        }
        
        container.innerHTML = formatTextContent(exerciseContent || 'Exercise plan will be customized based on your goals.');
    }
}

function displayTips(text) {
    const container = document.getElementById('tipsContent');
    const tipsSection = text.match(/KEY TIPS[\s\S]*$/i) || text.match(/RECOMMENDATIONS[\s\S]*$/i);
    
    let tipsText = tipsSection ? tipsSection[0] : text;
    
    const tipMatches = tipsText.match(/\d+\.\s*([^\n]+)/g);
    
    if (tipMatches && tipMatches.length > 0) {
        container.innerHTML = tipMatches.map(tip => {
            const cleanTip = tip.replace(/^\d+\.\s*/, '');
            const parts = cleanTip.split(':');
            if (parts.length > 1) {
                return `<div class="tip-item"><strong>${parts[0]}:</strong>${parts.slice(1).join(':')}</div>`;
            }
            return `<div class="tip-item">${cleanTip}</div>`;
        }).join('');
    } else {
        container.innerHTML = `<div class="tip-item">${formatTextContent(tipsText)}</div>`;
    }
}

function displayProgressTimeline() {
    const savedData = localStorage.getItem('userPlanData');
    if (!savedData) return;
    
    const data = JSON.parse(savedData);
    const container = document.getElementById('progressTimeline');
    const currentWeight = data.currentWeight;
    const targetWeight = data.targetWeight;
    const weightDiff = Math.abs(currentWeight - targetWeight);
    const timeline = data.timeline || '12 weeks';
    
    const milestones = [
        { week: 'Week 1-2', title: 'Adaptation Phase', desc: 'Body adjusts to new routine, initial changes begin' },
        { week: 'Week 3-4', title: 'Momentum Building', desc: `Target: ${(weightDiff * 0.25).toFixed(1)} kg progress` },
        { week: 'Week 5-8', title: 'Steady Progress', desc: `Target: ${(weightDiff * 0.5).toFixed(1)} kg progress` },
        { week: 'Week 9-12', title: 'Final Push', desc: `Target: ${targetWeight} kg goal weight` }
    ];
    
    container.innerHTML = milestones.map((milestone, index) => `
        <div class="timeline-item">
            <div class="timeline-marker">${index + 1}</div>
            <div class="timeline-content">
                <div class="timeline-title">${milestone.week}: ${milestone.title}</div>
                <div class="timeline-desc">${milestone.desc}</div>
            </div>
        </div>
    `).join('');
}

function displayRawPlan(text) {
    document.getElementById('nutritionTargets').innerHTML = '<p>Please see full plan below</p>';
    document.getElementById('exercisePlan').innerHTML = formatTextContent(text);
    document.getElementById('tipsContent').innerHTML = '<p>See exercise plan section above</p>';
}

function formatTextContent(text) {
    return text
        .replace(/#{3,4}\s*(.+)/g, '<h4>$1</h4>')
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/^\s*[-*]\s+(.+)/gm, '<li>$1</li>')
        .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
        .replace(/\n\n/g, '</p><p>')
        .replace(/^(?!<[hul])/gm, '<p>')
        .replace(/(?![>hul\/])$/gm, '</p>')
        .replace(/<p>\s*<\/p>/g, '')
        .replace(/<p>\s*<ul>/g, '<ul>')
        .replace(/<\/ul>\s*<\/p>/g, '</ul>');
}

function loadSavedFormData() {
    const savedData = localStorage.getItem('userPlanData');
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            
            document.getElementById('currentWeight').value = data.currentWeight || '';
            document.getElementById('height').value = data.height || '';
            document.getElementById('age').value = data.age || '';
            document.getElementById('gender').value = data.gender || '';
            document.getElementById('bodyFat').value = data.bodyFat || '';
            document.getElementById('activityLevel').value = data.activityLevel || '';
            document.getElementById('targetWeight').value = data.targetWeight || '';
            document.getElementById('goal').value = data.goal || '';
            document.getElementById('timeline').value = data.timeline || '';
            document.getElementById('healthConditions').value = data.healthConditions || '';
        } catch (error) {
            console.error('Error loading saved data:', error);
        }
    }
}

function savePlanData() {
    const planResults = document.getElementById('planResults').innerHTML;
    const blob = new Blob([planResults], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `fitness-plan-${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('Plan saved successfully!', 'success');
}

// API Communication
async function callGeminiAPI(prompt, imageBase64 = null) {
    const url = `${CONFIG.GEMINI_API_URL}?key=${CONFIG.GEMINI_API_KEY}`;
    
    const requestBody = {
        contents: [{
            parts: []
        }]
    };

    if (imageBase64) {
        requestBody.contents[0].parts.push({
            inline_data: {
                mime_type: "image/jpeg",
                data: imageBase64
            }
        });
    }

    requestBody.contents[0].parts.push({
        text: prompt
    });

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || 'API request failed');
        }

        const data = await response.json();
        
        if (data.candidates && 
            data.candidates[0]?.content?.parts && 
            data.candidates[0].content.parts[0]?.text) {
            return data.candidates[0].content.parts[0].text;
        } else {
            console.error('Full API Response:', JSON.stringify(data, null, 2));
            throw new Error('Unexpected API response format. Check console for details.');
        }
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// UI Helper Functions

function showLoading(section) {
    document.getElementById(`loading${section === 'calorie' ? 'Calorie' : 'Plan'}`).classList.remove('hidden');
}

function hideLoading(section) {
    document.getElementById(`loading${section === 'calorie' ? 'Calorie' : 'Plan'}`).classList.add('hidden');
}

function showResults(section) {
    document.getElementById(`${section === 'calorie' ? 'calorie' : 'plan'}Results`).classList.remove('hidden');
}

function hideResults(section) {
    document.getElementById(`${section === 'calorie' ? 'calorie' : 'plan'}Results`).classList.add('hidden');
}

function showError(section, message) {
    const errorElement = document.getElementById(`${section === 'calorie' ? 'calorie' : 'plan'}Error`);
    errorElement.textContent = message;
    errorElement.classList.remove('hidden');
}

function hideError(section) {
    document.getElementById(`${section === 'calorie' ? 'calorie' : 'plan'}Error`).classList.add('hidden');
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? 'var(--success-color)' : type === 'error' ? 'var(--error-color)' : 'var(--primary-color)'};
        color: white;
        border-radius: 8px;
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
