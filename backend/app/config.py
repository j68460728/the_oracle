"""
Configuration management for The Oracle application.

This module handles application configuration, including environment
variables, rate limiting settings, and API endpoints.
"""
from typing import Dict, Any
import os
from pydantic import BaseSettings, Field
from functools import lru_cache

class Settings(BaseSettings):
    """Application settings loaded from environment variables."""
    
    # API Configuration
    app_name: str = "The Oracle"
    api_version: str = "1.0.0"
    debug: bool = Field(default=False, env="DEBUG")
    
    # Football-Data.org API
    football_data_api_token: str = Field(..., env="FOOTBALL_DATA_API_TOKEN")
    football_data_api_base_url: str = "https://api.football-data.org/v4"
    football_data_rate_limit_per_minute: int = 10
    football_data_max_requests_per_minute: int = 10
    
    # Redis Configuration
    redis_host: str = Field(default="redis", env="REDIS_HOST")
    redis_port: int = Field(default=6379, env="REDIS_PORT")
    redis_db: int = Field(default=0, env="REDIS_DB")
    
    # Cache Configuration
    cache_ttl_standings: int = 86400  # 24 hours in seconds
    cache_ttl_team: int = 604800     # 7 days in seconds
    cache_ttl_matches: int = 3600    # 1 hour in seconds
    cache_ttl_head2head: int = 604800 # 7 days in seconds
    
    # Application Configuration
    app_host: str = Field(default="0.0.0.0", env="APP_HOST")
    app_port: int = Field(default=8000, env="APP_PORT")
    workers: int = Field(default=1, env="WORKERS")
    
    # Log Configuration
    log_level: str = Field(default="INFO", env="LOG_LEVEL")
    log_format: str = Field(default="json", env="LOG_FORMAT")
    
    # Security
    allowed_origins: List[str] = Field(default=["http://localhost:15800"], env="ALLOWED_ORIGINS")
    
    # Rate Limiting
    rate_limit_general: int = 100  # requests per minute
    rate_limit_strict: int = 10   # requests per minute for FD
    
    # Monitoring
    enable_metrics: bool = Field(default=True, env="ENABLE_METRICS")
    metrics_port: int = Field(default=9090, env="METRICS_PORT")
    
    # Development
    enable_hot_reload: bool = Field(default=False, env="ENABLE_HOT_RELOAD")
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = False

@lru_cache(maxsize=1)
def get_settings() -> Settings:
    """Get cached settings instance."""
    return Settings()

