from typing import Optional
from app.application.dto.brief import OracleBrief
from app.application.use_cases.generate_oracle_brief import GenerateOracleBriefUseCase
from app.domain.ports import CacheRepositoryPort

class CachedGenerateOracleBriefUseCase:
    """
    Decorator for the GenerateOracleBriefUseCase.
    Intercepts the execution to return a cached OracleBrief if it exists,
    otherwise executes the pure UseCase and saves the result into the cache.
    """
    def __init__(self, cache: CacheRepositoryPort, use_case: GenerateOracleBriefUseCase):
        self._cache = cache
        self._use_case = use_case
        
    async def execute(
        self,
        competition_code: str,
        home_team_id: int,
        away_team_id: int,
        season: Optional[str] = None
    ) -> OracleBrief:
        
        # Define cache key. Example: oracle:brief:PL:65:66
        key = f"oracle:brief:{competition_code}:{home_team_id}:{away_team_id}"
        if season:
            key += f":{season}"
            
        cached_data = await self._cache.get(key)
        if cached_data:
            # We must reconstruct the OracleBrief from the dict
            brief = OracleBrief.model_validate(cached_data)
            # Indicate it's a hit
            brief.metadata.cache = "HIT"
            return brief
            
        # MISS -> Execute pure UseCase
        brief = await self._use_case.execute(
            competition_code=competition_code,
            home_team_id=home_team_id,
            away_team_id=away_team_id,
            season=season
        )
        
        # Save to cache with TTL (e.g., 24h)
        await self._cache.set(key, brief, ttl=86400)
        
        # Return with MISS metadata (default)
        return brief
