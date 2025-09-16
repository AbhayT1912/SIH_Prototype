"""FastAPI Backend Application

This module initializes the FastAPI application with routers, middleware, and settings.
Run this script to start the application server.
"""

import uvicorn
from app.config import Settings

settings = Settings()

if __name__ == "__main__":
    uvicorn.run(
        "app.main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG
    )