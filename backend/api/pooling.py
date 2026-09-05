from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from datetime import date
from typing import List

from db.database import SessionLocal
from db.models import TransportPool

router = APIRouter(
    prefix="/api/pooling",
    tags=["Transport Pooling"]
)

# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Pydantic Schemas for validation
class PoolCreate(BaseModel):
    farmer_name: str
    contact_number: str
    district: str
    crop_name: str
    weight_kg: float
    vehicle_capacity_kg: float
    travel_date: date

class PoolResponse(PoolCreate):
    id: int
    is_active: bool

    class Config:
        from_attributes = True

@router.post("/request", response_model=PoolResponse)
def create_pool_request(request: PoolCreate, db: Session = Depends(get_db)):
    """Creates a new transport pooling request."""
    new_pool = TransportPool(**request.model_dump())
    db.add(new_pool)
    db.commit()
    db.refresh(new_pool)
    return new_pool

@router.get("/match/{district}", response_model=List[PoolResponse])
def find_matches(district: str, target_date: date, db: Session = Depends(get_db)):
    """Finds active trucks traveling from the same district on a specific date."""
    matches = db.query(TransportPool).filter(
        TransportPool.district.ilike(district),
        TransportPool.travel_date == target_date,
        TransportPool.is_active == True
    ).all()
    
    if not matches:
        raise HTTPException(status_code=404, detail="No matching transport found for this district and date.")
    
    return matches