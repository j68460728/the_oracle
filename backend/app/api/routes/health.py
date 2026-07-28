from fastapi import APIRouter, HTTPException
from domain.models import HealthResponse
import sys
from datetime import datetime

router = APIRouter()

@router.get("/health")
async def health_check():
    try:
        return HealthResponse(
            status="healthy",
            version="0.1.0",
            timestamp=datetime.now()
        )
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"Service unhealthy: {str(e)}")

@router.get("/")
async def root():
    return {"message": "The Oracle API - No AI, no predictions, no ML"}