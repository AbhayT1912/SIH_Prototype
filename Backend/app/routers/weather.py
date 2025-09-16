from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Annotated
from datetime import datetime, timedelta

from app.database import get_db
from app.dependencies import get_current_active_user
from app.models.models import User, WeatherData
from app.schemas.schemas import WeatherDataCreate, WeatherData as WeatherDataSchema

router = APIRouter(prefix="/weather", tags=["weather"])

@router.get("/current/{location}", response_model=WeatherDataSchema)
async def get_current_weather(
    location: str,
    current_user: Annotated[User, Depends(get_current_active_user)],
    db: Session = Depends(get_db)
):
    """Get current weather data for a location."""
    # Get most recent weather data for the location
    weather = db.query(WeatherData)\
        .filter(WeatherData.location == location)\
        .order_by(WeatherData.date.desc())\
        .first()
    
    if weather is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Weather data not found for this location"
        )
    
    # Check if weather data is not too old (e.g., more than 1 hour old)
    if weather.date < datetime.utcnow() - timedelta(hours=1):
        # TODO: Implement weather API call to update data
        pass
    
    return weather

@router.get("/forecast/{location}", response_model=List[WeatherDataSchema])
async def get_weather_forecast(
    location: str,
    current_user: Annotated[User, Depends(get_current_active_user)],
    db: Session = Depends(get_db),
    days: int = 7
):
    """Get weather forecast for a location."""
    # Get forecast data for the specified number of days
    forecast = db.query(WeatherData)\
        .filter(
            WeatherData.location == location,
            WeatherData.date >= datetime.utcnow(),
            WeatherData.date <= datetime.utcnow() + timedelta(days=days)
        )\
        .order_by(WeatherData.date.asc())\
        .all()
    
    if not forecast:
        # TODO: Implement weather API call to get forecast
        pass
    
    return forecast

@router.get("/history/{location}", response_model=List[WeatherDataSchema])
async def get_weather_history(
    location: str,
    current_user: Annotated[User, Depends(get_current_active_user)],
    db: Session = Depends(get_db),
    days: int = 30
):
    """Get historical weather data for a location."""
    history = db.query(WeatherData)\
        .filter(
            WeatherData.location == location,
            WeatherData.date >= datetime.utcnow() - timedelta(days=days),
            WeatherData.date <= datetime.utcnow()
        )\
        .order_by(WeatherData.date.desc())\
        .all()
    
    return history

# Admin endpoints for managing weather data
@router.post("/", response_model=WeatherDataSchema)
async def create_weather_data(
    weather: WeatherDataCreate,
    current_user: Annotated[User, Depends(get_current_active_user)],
    db: Session = Depends(get_db)
):
    """Create new weather data entry (admin only)."""
    # TODO: Add admin check
    db_weather = WeatherData(**weather.model_dump())
    db.add(db_weather)
    db.commit()
    db.refresh(db_weather)
    return db_weather