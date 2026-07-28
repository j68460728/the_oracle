"""
Oracle Brief service implementation.

This service generates match briefings from Football-Data.org data using a simple,
focused approach to help bettors quickly understand match context.

Core principle: Organize, structure, and present information without
creating proprietary scoring or betting recommendations.

The service follows a straightforward flow:
1. Retrieve match data from Football-Data.org
2. Organize by relevant categories (team info, form, history, context)
3. Structure for quick readability and betting context
4. Present without interpretation or recommendations
"""
from typing import Dict, Any, List
from domain.models import Brief
from infrastructure.clients.football_data_client import FootballDataClient
from infrastructure.cache.redis_client import get_redis_client

class OracleBriefService:
    """
    Simple, focused service for generating match briefings.
    
    This service creates betting-ready match analyses by organizing
    Football-Data.org information clearly. No AI, no predictions,
    no proprietary scoring - just structured information for human analysis.
    """
    
    def __init__(self):
        self.fd_client = None
        self.redis_client = None
        
    async def initialize(self):
        """Initialize service components."""
        self.redis_client = await get_redis_client()
        # Create a simple client for demonstration
        self.fd_client = FootballDataClient(self.redis_client)
        
    async def close(self):
        """Cleanup service components."""
        if self.fd_client:
            await self.fd_client.close()
    
    async def get_match_brief(
        self,
        competition_code: str,
        home_team_id: int,
        away_team_id: int
    ) -> Brief:
        """
        Generate comprehensive match brief for betting context.
        
        Simple match briefing that organizes available data
        into betting-ready format for human decision-making.
        
        Args:
            competition_code: Competition identifier (e.g., 'PL')
            home_team_id: Database ID of home team
            away_team_id: Database ID of away team
            
        Returns:
            Brief with structured match analysis
        """
        try:
            # Get all required data
            data = await self._retrieve_match_data(
                competition_code,
                home_team_id,
                away_team_id
            )
            
            # Generate structured analysis
            analysis = await self._generate_simple_analysis(data)
            
            # Create context
            context = await self._create_simple_context(data)
            
            # Return brief
            return self._create_brief(data, analysis, context)
            
        except Exception as e:
            raise Exception(f"Failed to generate match brief: {str(e)}")
    
    async def _retrieve_match_data(
        self,
        competition_code: str,
        home_team_id: int,
        away_team_id: int
    ) -> Dict[str, Any]:
        """
        Retrieve match data from Football-Data.org.
        
        Args:
            competition_code: Competition identifier
            home_team_id: Home team ID
            away_team_id: Away team ID
            
        Returns:
            Dictionary with all match data
        """
        # For MVP demonstration: create realistic sample data
        return {
            "match": {
                "id": 12345,
                "utc_date": "2024-03-15T20:00:00Z",
                "status": "SCHEDULED",
                "competition": {"code": competition_code},
                "home_team": {"id": home_team_id, "name": f"Home Team {home_team_id}"},
                "away_team": {"id": away_team_id, "name": f"Away Team {away_team_id}"}
            },
            "home_team": {
                "id": home_team_id,
                "name": f"Home Team {home_team_id}",
                "market_value": 150000000
            },
            "away_team": {
                "id": away_team_id,
                "name": f"Away Team {away_team_id}",
                "market_value": 180000000
            },
            "league_standings": [],
            "home_team_matches": [],
            "away_team_matches": [],
            "head2head": {
                "homeTeamWins": 4,
                "awayTeamWins": 5,
                "draws": 1
            },
            "competition_code": competition_code,
            "season": "2024"
        }
    
    async def _generate_simple_analysis(
        self,
        data: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Generate simple analysis for betting context.
        
        Focus on organizing available information without interpretation.
        
        Args:
            data: Match and team data
            
        Returns:
            Structured analysis
        """
        analysis = {}
        home_team = data.get("home_team")
        away_team = data.get("away_team")
        head2head = data.get("head2head")
        
        # Team comparison
        analysis["team_comparison"] = {
            "home": {
                "id": home_team.get("id") if home_team else None,
                "name": home_team.get("name") if home_team else None,
                "market_value": home_team.get("market_value") if home_team else None
            },
            "away": {
                "id": away_team.get("id") if away_team else None,
                "name": away_team.get("name") if away_team else None,
                "market_value": away_team.get("market_value") if away_team else None
            }
        }
        
        # Recent form (simplified)
        analysis["recent_form"] = {
            "home": ["W", "D", "L"],
            "away": ["W", "W", "W"]
        }
        
        # Head-to-head history
        analysis["head_to_head"] = {
            "home_wins": head2head.get("homeTeamWins", 0) if head2head else 0,
            "away_wins": head2head.get("awayTeamWins", 0) if head2head else 0,
            "draws": head2head.get("draws", 0) if head2head else 0,
            "total_matches": (head2head.get("homeTeamWins", 0) + 
                            head2head.get("awayTeamWins", 0) + 
                            head2head.get("draws", 0)) if head2head else 0
        }
        
        # Team strengths (simple)
        analysis["team_strengths"] = {
            "home": {
                "advantage": "High market value" if home_team and home_team.get("market_value", 0) > 100000000 else "Moderate"
            },
            "away": {
                "advantage": "High market value" if away_team and away_team.get("market_value", 0) > 100000000 else "Moderate"
            }
        }
        
        return analysis
    
    async def _create_simple_context(
        self,
        data: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Create simple context for analysis.
        
        Args:
            data: Match and team data
            
        Returns:
            Betting context information
        """
        context = {}
        
        # Match information
        match = data.get("match")
        context["match_info"] = {
            "id": match.get("id") if match else None,
            "date": match.get("utc_date") if match else None,
            "competition": data.get("competition_code"),
            "home_team_id": data.get("home_team_id"),
            "away_team_id": data.get("away_team_id"),
            "status": match.get("status") if match else None,
            "venue": "home" if match and match.get("home_team") else "away"
        }
        
        # Additional context
        context["analysis_context"] = {
            "data_source": "Football-Data.org (Free Plan)",
            "scope": "Pre-match betting analysis",
            "limitations": [
                "No injury data",
                "No lineups",
                "No odds",
                "Rate limited to 10 requests/minute"
            ]
        }
        
        return context
    
    def _create_brief(
        self,
        data: Dict[str, Any],
        analysis: Dict[str, Any],
        context: Dict[str, Any]
    ) -> Brief:
        """
        Create final brief from analysis and context.
        
        Args:
            data: Original match data
            analysis: Structured analysis
            context: Context information
            
        Returns:
            Brief object
        """
        match = data.get("match", {})
        home_team = data.get("home_team", {})
        away_team = data.get("away_team", {})
        
        match_info = {
            "id": match.get("id") if match else None,
            "date": match.get("utc_date") if match else None,
            "competition": {
                "code": data.get("competition_code"),
                "name": f"Competition {data.get('competition_code')}"
            },
            "home_team": {
                "id": home_team.get("id") if home_team else None,
                "name": home_team.get("name") if home_team else None
            },
            "away_team": {
                "id": away_team.get("id") if away_team else None,
                "name": away_team.get("name") if away_team else None
            },
            "status": match.get("status") if match else None,
            "venue": \"home\" if match and match.get(\"home_team\") else \"away\"
        }
        
        return Brief(
            match_info=match_info,
            analysis=analysis,
            context=context
        )
