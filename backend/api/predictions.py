from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List
from ml.predict import predict_crop_price, get_7_day_forecast

router = APIRouter(
    prefix="/api/predict",
    tags=["Price Predictions"]
)

class PriceRequest(BaseModel):
    crop_name: str
    target_month: Optional[int] = None

@router.post("/price")
async def get_price_prediction(request: PriceRequest):
    # Call the ML model
    predicted_price = predict_crop_price(
        crop_name=request.crop_name, 
        target_month=request.target_month
    )
    
    if predicted_price == 0.0:
        raise HTTPException(status_code=404, detail=f"No data available for {request.crop_name}")

    # Generate the 7-day historical/forecast trend for the frontend charts
    forecast_array = get_7_day_forecast(predicted_price)

    return {
        "crop": request.crop_name,
        "predicted_price_per_quintal": predicted_price,
        "predicted_price_per_kg": round(predicted_price / 100, 2),
        "currency": "INR",
        "forecast_7_days": forecast_array
    }