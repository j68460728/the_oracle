import time
import uuid
import logging
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from app.config import settings
from app.observability.logger import setup_logging

# Initialize logging
setup_logging()
logger = logging.getLogger(__name__)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
)

@app.middleware("http")
async def add_observability_headers(request: Request, call_next):
    request_id = str(uuid.uuid4())
    start_time = time.time()
    
    # Attach request_id to state
    request.state.request_id = request_id
    
    try:
        response = await call_next(request)
    except Exception as exc:
        logger.error(f"Unhandled exception: {exc}", extra={"request_id": request_id})
        response = JSONResponse(
            status_code=500,
            content={"detail": "Internal Server Error"}
        )
        
    process_time = (time.time() - start_time) * 1000
    formatted_process_time = f"{process_time:.2f}ms"
    
    # Append headers
    response.headers["X-Request-ID"] = request_id
    response.headers["X-Response-Time"] = formatted_process_time
    
    return response

@app.get("/api/v1/health")
async def health_check():
    return {"status": "healthy", "version": settings.VERSION}
