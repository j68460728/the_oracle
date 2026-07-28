from typing import Optional
from app.domain.ports import DataProviderPort
from app.application.dto.brief import OracleBrief
from app.application.builders.oracle_brief_builder import build_oracle_brief

class GenerateOracleBriefUseCase:
    """
    Use Case para orquestar la generación del OracleBrief.
    Interactúa con DataProviderPort para extraer datos puros,
    y utiliza constructores puros para ensamblar la inteligencia.
    """
    def __init__(self, provider: DataProviderPort):
        self._provider = provider
        
    async def execute(
        self, 
        competition_code: str, 
        home_team_id: int, 
        away_team_id: int,
        season: Optional[str] = None
    ) -> OracleBrief:
        
        # 1. Fetch raw data from provider
        home_team = await self._provider.get_team_by_id(home_team_id)
        away_team = await self._provider.get_team_by_id(away_team_id)
        
        standings_response = await self._provider.get_standings(competition_code, season)
        
        # Find standings for the specific teams
        home_standing = next((s for s in standings_response.standings if s.team.id == home_team_id), None)
        away_standing = next((s for s in standings_response.standings if s.team.id == away_team_id), None)
        
        if not home_standing or not away_standing:
            pass # Or raise domain exception MatchNotFoundException
            
        h2h = await self._provider.get_head_to_head(home_team_id, away_team_id)
        
        # 2. Build the aggregate using pure function
        brief = build_oracle_brief(
            competition_code=competition_code,
            home_team=home_team,
            home_standing=home_standing,
            away_team=away_team,
            away_standing=away_standing,
            h2h=h2h
        )
        
        return brief
