from fastapi import Depends
from app.infrastructure.providers.football_data.client import FootballDataClient
from app.infrastructure.providers.football_data.provider import FootballDataProvider
from app.application.use_cases.generate_oracle_brief import GenerateOracleBriefUseCase
from app.domain.ports import DataProviderPort
from app.config import settings

# Since clients might need to be singleton/reused or have connection pools,
# we can instantiate a global client or create a dependency that yields it.
# For simplicity with aiolimiter and httpx, a module-level instance is good.

from app.application.use_cases.cached_generate_oracle_brief import CachedGenerateOracleBriefUseCase
from app.infrastructure.cache.redis_adapter import RedisCacheAdapter

_fd_provider = FootballDataProvider(api_key=settings.FOOTBALL_DATA_API_KEY)
_redis_cache = RedisCacheAdapter(redis_url=settings.REDIS_URL)

def get_data_provider() -> DataProviderPort:
    return _fd_provider

def get_cache_repository() -> CacheRepositoryPort:
    return _redis_cache

def get_generate_oracle_brief_use_case(
    provider: DataProviderPort = Depends(get_data_provider),
    cache: CacheRepositoryPort = Depends(get_cache_repository)
) -> CachedGenerateOracleBriefUseCase:
    base_use_case = GenerateOracleBriefUseCase(provider=provider)
    return CachedGenerateOracleBriefUseCase(cache=cache, use_case=base_use_case)
