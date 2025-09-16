from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    # Application Settings
    APP_NAME: str = "FasalSaathi API"
    VERSION: str = "1.0.0"
    DEBUG: bool = False
    
    # API Settings
    API_PREFIX: str = "/api"
    
    # Security Settings
    SECRET_KEY: str
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # Database Settings
    DATABASE_URL: str
    
    # CORS Settings
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",  # Development frontend
        "http://localhost:5173",  # Vite dev server
    ]
    
    # ML Model Settings
    MODEL_PATH: str = "app/ml_models"
    
    # External APIs
    WEATHER_API_KEY: str = "8f945372fa522a39510cade87c27e8bf"
    SOIL_API_KEY: str = ""
    
    class Config:
        env_file = ".env"
        case_sensitive = True

# Create global settings object
settings = Settings()