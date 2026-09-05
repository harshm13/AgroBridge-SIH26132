from fastapi import APIRouter, UploadFile, File, HTTPException
import random

router = APIRouter(
    prefix="/api/grading",
    tags=["Crop Quality Grading"]
)

@router.post("/analyze")
async def analyze_crop_quality(file: UploadFile = File(...)):
    # Validate that the uploaded file is an image
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Please upload a valid image file.")

    # Read the file to ensure the upload works (ready for future real CV models)
    content = await file.read()
    
    # Simulate AI vision grading logic for the MVP
    grades = ["Grade A (Premium)", "Grade B (Standard)", "Grade C (Processing)"]
    weights = [0.4, 0.4, 0.2] # 40% chance of A or B, 20% C
    assigned_grade = random.choices(grades, weights=weights)[0]
    
    if "Grade A" in assigned_grade:
        defect_rate = round(random.uniform(0.0, 5.0), 1)
        multiplier = 1.15 # 15% price bonus
        feedback = "Excellent quality. Minimal discoloration. Optimal for retail markets."
    elif "Grade B" in assigned_grade:
        defect_rate = round(random.uniform(5.1, 15.0), 1)
        multiplier = 1.00 # Standard market price
        feedback = "Average quality. Minor blemishes detected. Suitable for general mandi sales."
    else:
        defect_rate = round(random.uniform(15.1, 30.0), 1)
        multiplier = 0.85 # 15% price reduction
        feedback = "High defect rate. Signs of rot. Best routed to food processing plants."

    return {
        "filename": file.filename,
        "grade": assigned_grade,
        "defect_percentage": defect_rate,
        "price_multiplier": multiplier,
        "ai_feedback": feedback
    }