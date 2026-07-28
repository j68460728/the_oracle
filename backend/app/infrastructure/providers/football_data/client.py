import httpx
from aiolimiter import AsyncLimiter
from typing import Dict, Any, Optional

from app.domain.exceptions import ProviderRateLimitExceededException, ProviderIntegrationException

class FootballDataClient:
    """
    Cliente HTTP puro para la API de Football-Data.org.
    Su única responsabilidad es gestionar la conexión, autenticación, rate limit (10/min),
    y retornar respuestas JSON en diccionarios crudos.
    No conoce de modelos Pydantic ni reglas de negocio.
    """
    
    BASE_URL = "https://api.football-data.org/v4"
    
    def __init__(self, api_key: str):
        self._api_key = api_key
        # Free Tier: 10 requests per minute
        self._limiter = AsyncLimiter(10, 60)
        self._client = httpx.AsyncClient(
            base_url=self.BASE_URL,
            headers={"X-Auth-Token": self._api_key},
            timeout=10.0
        )
        
    async def close(self):
        await self._client.aclose()

    async def _request(self, method: str, endpoint: str, params: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """Realiza una petición HTTP respetando el rate limit de forma no bloqueante."""
        
        # If we cannot acquire a token immediately (without waiting), it means we hit the rate limit.
        if not self._limiter.has_capacity():
            raise ProviderRateLimitExceededException("Football-Data rate limit exceeded (10 req/min).")
            
        async with self._limiter:
            try:
                response = await self._client.request(method, endpoint, params=params)
                
                # Check for explicit 429 even with limiter (just in case)
                if response.status_code == 429:
                    raise ProviderRateLimitExceededException("Football-Data returned 429 Too Many Requests.")
                    
                response.raise_for_status()
                return response.json()
            except httpx.HTTPStatusError as e:
                # Log actual error or map it. Here we just raise integration exception.
                raise ProviderIntegrationException(f"HTTP Error {e.response.status_code} from FD API.")
            except httpx.RequestError as e:
                raise ProviderIntegrationException(f"Request Error contacting FD API: {str(e)}")

    async def fetch_match(self, match_id: int) -> Dict[str, Any]:
        return await self._request("GET", f"/matches/{match_id}")

    async def fetch_standings(self, competition_code: str, season: Optional[str] = None) -> Dict[str, Any]:
        params = {"season": season} if season else None
        return await self._request("GET", f"/competitions/{competition_code}/standings", params=params)

    async def fetch_head2head(self, match_id: int) -> Dict[str, Any]:
        return await self._request("GET", f"/matches/{match_id}/head2head")

    async def fetch_team(self, team_id: int) -> Dict[str, Any]:
        return await self._request("GET", f"/teams/{team_id}")

    async def fetch_team_matches(self, team_id: int, status: str = "SCHEDULED") -> Dict[str, Any]:
        return await self._request("GET", f"/teams/{team_id}/matches", params={"status": status})
