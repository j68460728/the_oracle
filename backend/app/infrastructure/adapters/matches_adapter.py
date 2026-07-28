"""
Adapter for transforming Football-Data.org matches responses to
internal domain models.

This adapter handles team matches, competition matches, and individual match
data, converting FD's JSON structure into The Oracle's domain models.
Only this module knows about Football-Data.org's response format.
"""
from typing import Dict, Any, List
from domain.models import Match, Team, StandingType

class MatchesAdapter:
    """
    Adapter for transforming Football-Data.org matches data.
    
    This class converts various match-related responses from Football-Data.org
    into The Oracle's internal Match domain model.
    """
    
    @staticmethod
    def adapt_team_matches(team_matches_data: Dict[str, Any]) -> List[Dict[str, Any]]:
        """
        Transform Football-Data.org team matches response to internal format.
        
        Args:
            team_matches_data: Raw response from `/teams/{id}/matches` endpoint
            
        Returns:
            List of simplified match dictionaries for internal use
        """
        matches = []
        
        for match_data in team_matches_data.get("matches", []):
            matches.append(MatchesAdapter._adapt_match_data(match_data))
            
        return matches
    
    @staticmethod
    def adapt_competition_matches(competition_matches_data: Dict[str, Any]) -> List[Dict[str, Any]]:
        """
        Transform Football-Data.org competition matches response to internal format.
        
        Args:
            competition_matches_data: Raw response from `/competitions/{code}/matches` endpoint
            
        Returns:
            List of simplified match dictionaries for internal use
        """
        matches = []
        
        for match_data in competition_matches_data.get("matches", []):
            matches.append(MatchesAdapter._adapt_match_data(match_data))
            
        return matches
    
    @staticmethod
    def adapt_single_match(match_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Transform Football-Data.org single match response to internal format.
        
        Args:
            match_data: Raw response from `/matches/{id}` endpoint
            
        Returns:
            Simplified match dictionary for internal use
        """
        return MatchesAdapter._adapt_match_data(match_data)
    
    @staticmethod
    def _adapt_match_data(match_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Internal helper to adapt match data to The Oracle format.
        
        Args:
            match_data: Raw match data from Football-Data.org
            
        Returns:
            Adapted match dictionary in The Oracle domain format
        """
        return {
            "id": match_data.get("id"),
            "utc_date": match_data.get("utcDate"),
            "status": match_data.get("status"),
            "minute": match_data.get("minute"),
            "injury_time": match_data.get("injuryTime"),
            "attendance": match_data.get("attendance"),
            "venue": match_data.get("venue"),
            "matchday": match_data.get("matchday"),
            "stage": match_data.get("stage"),
            "group": match_data.get("group"),
            "home_team": _adapt_team_data(match_data.get("homeTeam", {})),
            "away_team": _adapt_team_data(match_data.get("awayTeam", {})),
            "score": match_data.get("score", {}),
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

    @staticmethod
    def adapt_head2head(head2head_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Transform Football-Data.org head2head response to internal format.
        
        Args:
            head2head_data: Raw response from `/matches/{id}/head2head` endpoint
            
        Returns:
            Simplified head2head dictionary for internal use
        """
        return {
            "home_team_wins": head2head_data.get("homeTeamWins", 0),
            "away_team_wins": head2head_data.get("awayTeamWins", 0),
            "draws": head2head_data.get("draws", 0),
            "matches": [
                MatchesAdapter._adapt_match_data(match) 
                for match in head2head_data.get("matches", [])
            ]
        }

    @staticmethod
    def adapt_scorers(scorers_data: Dict[str, Any]) -> List[Dict[str, Any]]:
        """
        Transform Football-Data.org scorers response to internal format.
        
        Args:
            scorers_data: Raw response from `/competitions/{code}/scorers` endpoint
            
        Returns:
            List of simplified scorer dictionaries for internal use
        """
        scorers = []
        
        for scorer_data in scorers_data.get("scorers", []):
            scorers.append({
                "player": _adapt_player_data(scorer_data.get("player", {})),
                "goals": scorer_data.get("goals", 0),
                "assists": scorer_data.get("assists", 0),
                "penalties": scorer_data.get("penalties", 0)
            })
            
        return scorers

    @staticmethod
    def adapt_area(area_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Transform Football-Data.org area response to internal format.
        
        Args:
            area_data: Raw area data from FD
            
        Returns:
            Simplified area dictionary for internal use
        """
        return {
            "id": area_data.get("id"),
            "name": area_data.get("name"),
            "country_code": area_data.get("countryCode"),
            "flag": area_data.get("flag"),
            "parent_area_id": area_data.get("parentAreaId"),
            "parent_area_name": area_data.get("parentArea")
        }

    @staticmethod
    def adapt_person(person_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Transform Football-Data.org person (player) response to internal format.
        
        Args:
            person_data: Raw person data from FD
            
        Returns:
            Simplified person dictionary for internal use
        """
        return {
            "id": person_data.get("id"),
            "name": person_data.get("name"),
            "first_name": person_data.get("firstName"),
            "last_name": person_data.get("lastName"),
            "date_of_birth": person_data.get("dateOfBirth"),
            "nationality": person_data.get("nationality"),
            "position": person_data.get("position"),
            "shirt_number": person_data.get("shirtNumber"),
            "current_team": _adapt_team_data(person_data.get("currentTeam", {})),
            "section": person_data.get("section")
        }


def _adapt_team_data(team_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Internal helper to adapt team data with statistics.
    
    Args:
        team_data: Raw team data with statistics from Football-Data.org
        
    Returns:
        Adapted team dictionary with statistics
    """
    return {
        "id": team_data.get("id"),
        "name": team_data.get("name"),
        "short_name": team_data.get("shortName"),
        "tla": team_data.get("tla"),
        "crest": team_data.get("crest"),
        "statistics": team_data.get("statistics", {}),
        "formation": team_data.get("formation"),
        "lineup": team_data.get("lineup", []),
        "bench": team_data.get("bench", [])
    }


def _adapt_player_data(player_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Internal helper to adapt player data.
    
    Args:
        player_data: Raw player data from Football-Data.org
        
    Returns:
        Adapted player dictionary
    """
    return {
        "id": player_data.get("id"),
        "name": player_data.get("name"),
        "position": player_data.get("position"),
        "shirt_number": player_data.get("shirtNumber"),
        "starter": player_data.get("starter", False),
        "captain": player_data.get("captain", False)
    }