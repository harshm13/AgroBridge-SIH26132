import pickle
import os
from datetime import datetime

current_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(current_dir, 'model.pkl')

model_data = None
try:
    with open(model_path, 'rb') as f:
        model_data = pickle.load(f)
except FileNotFoundError:
    print("Warning: model.pkl not found. Please run train.py first.")

def predict_crop_price(crop_name: str, target_month: int = None) -> float:
    """Predicts price using the trained Random Forest model."""
    if not model_data:
        return 0.0

    model = model_data['model']
    encoder = model_data['encoder']

    # Default to the current month if none is provided
    if target_month is None:
        target_month = datetime.now().month

    crop_clean = crop_name.lower().strip()
    
    # Fallback if crop wasn't in the CSV
    if crop_clean not in encoder.classes_:
        return 0.0 

    crop_encoded = encoder.transform([crop_clean])[0]
    prediction = model.predict([[crop_encoded, target_month]])
    
    return round(prediction[0], 2)
import random

# ... (Keep all your existing code above) ...

def get_7_day_forecast(base_price: float) -> list:
    """Generates a realistic 7-day price trend around the base predicted price."""
    if base_price == 0.0:
        return []
        
    trend = []
    current_price = base_price
    
    for _ in range(7):
        # Simulate a daily market fluctuation between -2% and +2%
        fluctuation = current_price * random.uniform(-0.02, 0.02)
        current_price = round(current_price + fluctuation, 2)
        trend.append(current_price)
        
    return trend