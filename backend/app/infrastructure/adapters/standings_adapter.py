"""
Adapter for transforming Football-Data.org standings responses to
internal domain models.

This adapter is responsible for converting the raw JSON structure from
Football-Data.org into The Oracle's domain model representations.
Only this module knows about Football-Data.org's response format.
"""
from typing import Dict, Any, List
from domain.models import Standing, Team, StandingType

class StandingsAdapter:
    """
    Adapter for transforming Football-Data.org standings data.
    
    This class follows the Adapter pattern to convert external data
    formats into internal domain models, protecting the rest of the
    system from changes in the data source structure.
    """
    
    @staticmethod
    def adapt(standings_data: Dict[str, Any]) -> List[Standing]:
        """
        Transform Football-Data.org standings response into domain models.
        
        Args:
            standings_data: Raw response from Football-Data.org
            
        Returns:
            List of Standing objects in The Oracle's domain model
            
        Raises:
            ValueError: If the data structure is invalid
        """
        if not standings_data or "standings" not in standings_data:
            raise ValueError("Invalid standings data structure")
            
        domain_standings = []
        
        for standing_data in standings_data["standings"]:
            team_data = standing_data.get("team", {})
            team = Team(
                id=team_data.get("id", 0),
                name=team_data.get("name", ""),
                short_name=team_data.get("shortName", ""),
                tla=team_data.get("tla", ""),
                crest=team_data.get("crest", ""),
                market_value=team_data.get("marketValue"),
                website=team_data.get("website"),
                founded=team_data.get("founded"),
                club_colors=team_data.get("clubColors"),
                address=team_data.get("address"),
                venue=team_data.get("venue"),
                area=team_data.get("area", {}),
                current_competitions=team_data.get("currentCompetitions", []),
                coach=team_data.get("coach", {}),
                squad=team_data.get("squad", []),
                staff=team_data.get("staff", [])
            )
            
            standing_type = StandingType.NEUTRAL
            if standing_data.get("location") == "HOME":
                standing_type = StandingType.HOME
            elif standing_data.get("location") == "AWAY":
                standing_type = StandingType.AWAY
                
            standing = Standing(
                position=standing_data.get("position", 0),
                team=team,
                played_games=standing_data.get("playedGames", 0),
                win=standing_data.get("win", 0),
                draw=standing_data.get("draw", 0),
                loss=standing_data.get("loss", 0),
                points=standing_data.get("points", 0),
                goal_difference=standing_data.get("goalDifference", 0),
                goals_for=standing_data.get("goalsFor", 0),
                goals_against=standing_data.get("goalsAgainst", 0),
                form=standing_data.get("form"),
                standing_type=standing_type,
                last_updated=standing_data.get("lastUpdated")
            )
            
            domain_standings.append(standing)
            
        return domain_standings

    @staticmethod
    def adapt_competitions(competitions_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Transform Football-Data.org competitions response to a simplified format.
        
        Args:
            competitions_data: Raw competition data from FD
            
        Returns:
            Simplified competition dictionary for internal use
        """
        return {
            "id": competitions_data.get("id"),
            "name": competitions_data.get("name"),
            "code": competitions_data.get("code"),
            "type": competitions_data.get("type"),
            "emblem": competitions_data.get("emblem"),
            "area": competitions_data.get("area"),
            "plan": competitions_data.get("plan")
        }

    @staticmethod
    def adapt_team(team_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Transform Football-Data.org team response to internal format.
        
        Args:
            team_data: Raw team data from FD
            
        Returns:
            Simplified team dictionary for internal use
        """
        return {
            "id": team_data.get("id"),
            "name": team_data.get("name"),
            "short_name": team_data.get("shortName"),
            "tla": team_data.get("tla"),
            "crest": team_data.get("crest"),
            "website": team_data.get("website"),
            "founded": team_data.get("founded"),
            "club_colors": team_data.get("clubColors"),
            "venue": team_data.get("venue"),
            "market_value": team_data.get("marketValue"),
            "area": team_data.get("area", {}),
            "coach": team_data.get("coach", {}),
            "current_competitions": team_data.get("currentCompetitions", [])
        }

    @staticmethod
    def adapt_match(match_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Transform Football-Data.org match response to internal format.
        
        Args:
            match_data: Raw match data from FD
            
        Returns:
            Simplified match dictionary for internal use
        """
        return {
            "id": match_data.get("id"),
            "utc_date": match_data.get("utcDate"),
            "status": match_data.get("status"),
            "minute": match_data.get("minute"),
            "venue": match_data.get("venue"),
            "matchday": match_data.get("matchday"),
            "stage": match_data.get("stage"),
            "group": match_data.get("group"),
            "attendance": match_data.get("attendance"),
            "home_team": match_data.get("homeTeam"),
            "away_team": match_data.get("awayTeam"),
            "score": match_data.get("score"),
            "goals": match_data.get("goals", []),
            "bookings": match_data.get("bookings", []),
            "substitutions": match_data.get("substitutions", []),
            "penalties": match_data.get("penalties", []),
            "referees": match_data.get("referees", []),
            "odds": match_data.get("odds"),
            "competition": match_data.get("competition"),
            "season": match_data.get("season"),
            "last_updated": match_data.get("lastUpdated")
        }