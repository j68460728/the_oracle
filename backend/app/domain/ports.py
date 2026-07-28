from typing import Protocol, List
from .models import Match, StandingResponse, Head2Head, Team

class DataProviderPort(Protocol):
    """
    Contrato que todo proveedor de datos externos (ej. Football-Data, Sportmonks)
    debe implementar para suministrar información al dominio The Oracle.
    """
    
    async def get_match_by_id(self, match_id: int) -> Match:
        """Fetch a match by its stable global identifier."""
        ...
        
    async def get_standings(self, competition_code: str, season: Optional[str] = None) -> StandingResponse:
        """Fetch the current standings for a given competition."""
        ...
        
    async def get_head_to_head(self, home_team_id: int, away_team_id: int) -> Head2Head:
        """Fetch the head-to-head history based on the participating teams."""
        ...
        
    async def get_team_by_id(self, team_id: int) -> Team:
        """Fetch detailed information about a specific team."""
        ...

class CacheRepositoryPort(Protocol):
    """
    Port for generic caching operations.
    Keeps the application agnostic to the underlying cache infrastructure (e.g., Redis).
    """
    async def get(self, key: str) -> object | None:
        """Retrieve an object from the cache by key."""
        ...
        
    async def set(self, key: str, value: object, ttl: int) -> None:
        """Store an object in the cache with a Time-To-Live (in seconds)."""
        ...
