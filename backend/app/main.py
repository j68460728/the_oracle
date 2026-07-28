from fastapi import FastAPI
from contextlib import asynccontextmanager
from typing import AsyncGenerator

from api.routes.health import router as health_router
from api.routes.brief import router as brief_router
from api.routes.standings import router as standings_router

@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    # Initialize services on startup
    print("Initializing The Oracle API...")
    yield
    # Cleanup on shutdown
    print("Shutting down The Oracle API...")

app = FastAPI(
    title="The Oracle",
    description="Single modular system for organizing and presenting Football-Data.org info for bettors. No AI, no predictions, no ML.",
    version="0.1.0",
    lifespan=lifespan,
)

app.include_router(health_router, prefix="/api/v1")
app.include_router(brief_router, prefix="/api/v1")
app.include_router(standings_router, prefix="/api/v1")

@app.get("/api/v1")
async def root():
    return {"message": "The Oracle API - No AI, no predictions, no ML"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")
