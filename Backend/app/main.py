from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from .routers import (
    auth,
    users,
    farms,
    crops,
    market,
    inventory,
    recommendations,
    predictions
)
from .config import settings

app = FastAPI(
    title="FasalSaathi API",
    description="Backend API for FasalSaathi - Smart Agriculture Management Platform",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers with prefixes
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(users.router, prefix="/api/users", tags=["Users"])
app.include_router(farms.router, prefix="/api/farms", tags=["Farm Management"])
app.include_router(crops.router, prefix="/api/crops", tags=["Crop Management"])
app.include_router(market.router, prefix="/api/market", tags=["Market Data"])
app.include_router(inventory.router, prefix="/api/inventory", tags=["Inventory"])
app.include_router(
    recommendations.router, 
    prefix="/api/recommendations", 
    tags=["Crop Recommendations"]
)
app.include_router(
    predictions.router, 
    prefix="/api/predictions", 
    tags=["Yield Predictions"]
)

@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return JSONResponse(
        content={
            "status": "healthy",
            "version": app.version
        }
    )

@app.get("/")
async def root():
    """Root endpoint with API information"""
    return JSONResponse(
        content={
            "app_name": "FasalSaathi API",
            "version": app.version,
            "docs_url": "/api/docs",
            "health_check": "/api/health"
        }
    )