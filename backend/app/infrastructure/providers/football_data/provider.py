from app.domain.ports import DataProviderPort
from app.domain.models import Match, StandingResponse, Head2Head, Team
from .client import FootballDataClient
from . import adapters

class FootballDataProvider(DataProviderPort):
    """
    Implementación del proveedor de Football-Data.
    Cumple con el contrato del dominio `DataProviderPort`.
    Orquesta la descarga desde el cliente HTTP y el mapeo mediante los adaptadores.
    """
    
    def __init__(self, api_key: str):
        self._client = FootballDataClient(api_key=api_key)
        
    async def get_match_by_id(self, match_id: int) -> Match:
        json_data = await self._client.fetch_match(match_id)
        return adapters.map_match(json_data)
        
    async def get_standings(self, competition_code: str, season: Optional[str] = None) -> StandingResponse:
        json_data = await self._client.fetch_standings(competition_code, season)
        return adapters.map_standing_response(json_data)
        
    async def get_head_to_head(self, home_team_id: int, away_team_id: int) -> Head2Head:
        # Workaround for FD Free Tier: We don't have the match_id, so we find the scheduled match first.
        scheduled = await self._client.fetch_team_matches(home_team_id, status="SCHEDULED")
        match_id = None
        for m in scheduled.get("matches", []):
            away = m.get("awayTeam", {}).get("id")
            home = m.get("homeTeam", {}).get("id")
            if (home == home_team_id and away == away_team_id) or (home == away_team_id and away == home_team_id):
                match_id = m.get("id")
                break
                
        if not match_id:
            # If no scheduled match is found, fallback to returning an empty Head2Head
            # or we could search FINISHED matches. For MVP, empty is safe.
            return Head2Head(home_team_wins=0, away_team_wins=0, draws=0, matches=[])
            
        json_data = await self._client.fetch_head2head(match_id)
        return adapters.map_head2head(json_data)
        
    async def get_team_by_id(self, team_id: int) -> Team:
        json_data = await self._client.fetch_team(team_id)
        return adapters.map_team(json_data)
