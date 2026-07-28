"""
Adapter for transforming Football-Data.org head-to-head responses to
internal domain models.

This adapter handles head-to-head data between two teams, converting FD's JSON
structure into The Oracle's Head2Head domain model.
Only this module knows about Football-Data.org's response format.
"""
from typing import Dict, Any, List
from domain.models import Head2Head, Match, Team
from infrastructure.adapters.matches_adapter import MatchesAdapter

class Head2HeadAdapter:
    """
    Adapter for transforming Football-Data.org head-to-head data.
    
    This class converts head-to-head statistics from Football-Data.org
    into The Oracle's internal Head2Head domain model.
    """
    
    @staticmethod
    def adapt(head2head_data: Dict[str, Any]) -> Head2Head:
        """
        Transform Football-Data.org head-to-head response to internal model.
        
        Args:
            head2head_data: Raw response from `/matches/{id}/head2head` endpoint
            
        Returns:
            Head2Head object in The Oracle's domain model
            
        Raises:
            ValueError: If the data structure is invalid
        """
        if not head2head_data:
            raise ValueError("Invalid head2head data")
            
        # Extract match information
        matches = []
        if "matches" in head2head_data:
            matches = MatchesAdapter.adapt_head2head_match_data(head2head_data["matches"])
            
        return Head2Head(
            home_team_wins=head2head_data.get("homeTeamWins", 0),
            away_team_wins=head2head_data.get("awayTeamWins", 0),
            draws=head2head_data.get("draws", 0),
            matches=matches
        )
    
    @staticmethod
    def adapt_head2head_match_data(matches_data: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """
        Adapt head-to-head match data to internal format.
        
        Args:
            matches_data: List of match data from Football-Data.org
            
        Returns:
            List of adapted match dictionaries
        """
        adapted_matches = []
        
        for match_data in matches_data:
            adapted_match = MatchesAdapter.adapt_single_match(match_data)
            adapted_matches.append(adapted_match)
            
        return adapted_matches

    @staticmethod
    def adapt_summary(head2head_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Extract summary statistics from head-to-head data for caching.
        
        Args:
            head2head_data: Raw head2head data from FD
            
        Returns:
            Dictionary with summary statistics for caching purposes
        """
        return {
            "home_team_wins": head2head_data.get("homeTeamWins", 0),
            "away_team_wins": head2head_data.get("awayTeamWins", 0),
            "draws": head2head_data.get("draws", 0),
            "total_matches": head2head_data.get("homeTeamWins", 0) + 
                           head2head_data.get("awayTeamWins", 0) + 
                           head2head_data.get("draws", 0),
            "last_updated": head2head_data.get("lastUpdated")
        }

    @staticmethod
    def adapt_detailed(head2head_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Create detailed head-to-head analysis with team performance context.
        
        Args:
            head2head_data: Raw head2head data from FD
            
        Returns:
            Detailed head-to-head analysis for The Oracle
        """
        matches = Head2HeadAdapter.adapt_head2head_match_data(head2head_data.get("matches", []))
        
        # Calculate advanced statistics
        home_wins = head2head_data.get("homeTeamWins", 0)
        away_wins = head2head_data.get("awayTeamWins", 0)
        draws = head2head_data.get("draws", 0)
        total_matches = home_wins + away_wins + draws
        
        # Calculate win percentages
        home_win_pct = (home_wins / total_matches * 100) if total_matches > 0 else 0
        away_win_pct = (away_wins / total_matches * 100) if total_matches > 0 else 0
        draw_pct = (draws / total_matches * 100) if total_matches > 0 else 0
        
        # Analyze home advantage
        home_advantage = home_win_pct - away_win_pct
        
        # Determine confidence level based on sample size
        confidence_level = "low"
        if total_matches >= 10:
            confidence_level = "high"
        elif total_matches >= 5:
            confidence_level = "medium"
            
        return {
            "summary": Head2HeadAdapter.adapt_summary(head2head_data),
            "statistics": {
                "home_team": {
                    "wins": home_wins,
                    "win_percentage": round(home_win_pct, 1),
                    "home_advantage": round(home_advantage, 1)
                },
                "away_team": {
                    "wins": away_wins,
                    "win_percentage": round(away_win_pct, 1)
                },
                "draws": {
                    "count": draws,
                    "percentage": round(draw_pct, 1)
                },
                "analysis": {
                    "home_team_advantage": home_advantage > 10,
                    "even_match": abs(home_win_pct - away_win_pct) < 15,
                    "high_scoring": any(m.get("goals", {}).get("home") + m.get("goals", {}).get("away", 0) > 2.5 
                                    for m in matches if m.get("score") else False
                }
            },
            "insights": _generate_head2head_insights(home_wins, away_wins, draws, total_matches),
            "confidence": confidence_level,
            "last_updated": head2head_data.get("lastUpdated")
        }


def _generate_head2head_insights(home_wins: int, away_wins: int, draws: int, total_matches: int) -> List[str]:
    """
    Generate insights from head-to-head statistics.
    
    Args:
        home_wins: Number of home team wins
        away_wins: Number of away team wins  
        draws: Number of draws
        total_matches: Total number of matches analyzed
        
    Returns:
        List of string insights for betting context
    """
    insights = []
    
    if total_matches == 0:
        insights.append("No head-to-head data available")
        return insights
        
    home_percentage = (home_wins / total_matches * 100) if total_matches > 0 else 0
    away_percentage = (away_wins / total_matches * 100) if total_matches > 0 else 0
    draw_percentage = (draws / total_matches * 100) if total_matches > 0 else 0
    
    # Home advantage insight
    if home_percentage > away_percentage + 20:
        insights.append(f"Strong home advantage: {home_percentage:.1f}% vs {away_percentage:.1f}%")
    elif home_percentage > away_percentage + 10:
        insights.append(f"Moderate home advantage: {home_percentage:.1f}% vs {away_percentage:.1f}%")
    else:
        insights.append("Balanced head-to-head with minimal home advantage")
        
    # Analysis period insight
    if total_matches <= 5:
        insights.append("Limited sample size - consider additional sources")
    elif total_matches <= 10:
        insights.append("Moderate sample size - insights may vary")
    else:
        insights.append("Robust sample size with reliable trends")
        
    # Dominant team insight
    if home_percentage > away_percentage + 30:
        insights.append(f"One team strongly dominates this matchup ({home_percentage:.1f}% wins)")
    elif away_percentage > home_percentage + 30:
        insights.append(f"Away team dominates this matchup ({away_percentage:.1f}% wins)")
        
    # Even matchup insight
    if abs(home_percentage - away_percentage) <= 15 and draw_percentage >= 25:
        insights.append("Highly unpredictable matchup with significant draw potential")
    elif home_percentage > 60 or away_percentage > 60:
        insights.append("Strong favorite/undoubtedly matched")
        
    return insights