from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Literal

class Settings(BaseSettings):
    # App Information
    PROJECT_NAME: str = "The Oracle"
    VERSION: str = "0.1.0"
    ENVIRONMENT: Literal["development", "production", "testing"] = "development"

    # API Configuration
    API_PORT: int = 15801

    # Football-Data.org API
    FOOTBALL_DATA_API_KEY: str = ""
    FD_RATE_LIMIT_PER_MINUTE: int = 10
    FD_TIMEOUT_SECONDS: int = 10
    FD_RETRY_ATTEMPTS: int = 3
    
    # Redis Configuration
    REDIS_URL: str = "redis://redis:6379/0"
    
    # Cache TTLs (in seconds)
    CACHE_TTL_STANDINGS: int = 86400       # 24h
    CACHE_TTL_SCORERS: int = 86400         # 24h
    CACHE_TTL_TEAM: int = 604800           # 7d
    CACHE_TTL_TEAM_MATCHES: int = 3600     # 1h
    CACHE_TTL_HEAD2HEAD: int = 604800      # 7d

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

settings = Settings()
