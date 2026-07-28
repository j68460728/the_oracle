"""
Football-Data.org client implementation.

This module encapsulates all communication with the Football-Data.org API,
making it the single point of contact for external data retrieval.
This ensures proper rate limit handling, error management, and caching.

Note: This is the ONLY module that knows about Football-Data.org's
structure. All other modules work with The Oracle's domain models.
"""
import httpx
import json
from typing import Dict, Any, Optional, List
from datetime import datetime, timedelta
import time
import redis.asyncio as redis

from domain.models import Team, Match, Standing, Scorer, Head2Head, Player

from config import get_settings

class RateLimitException(Exception):
    """Raised when Football-Data.org rate limit would be exceeded."""
    pass

class FootballDataClient:
    """
    Client for Football-Data.org API with built-in rate limiting
    and caching support.
    
    This client abstracts away the details of Football-Data.org's API,
    providing a clean interface for data retrieval while respecting
    the free plan's 10 requests/minute limit.
    """
    
    def __init__(self, redis_client=None):
        self.settings = get_settings()
        self.redis = redis_client
        self.base_url = "https://api.football-data.org/v4"
        self.rate_limiter = RateLimiter(max_requests=10, window_minutes=1)
        self.session = httpx.AsyncClient(
            headers={
                "X-Auth-Token": self.settings.football_data_api_token,
                "X-Unfold-Lineups": "true",
                "X-Unfold-Bookings": "true", 
                "X-Unfold-Subs": "true",
                "X-Unfold-Goals": "true"
            },
            timeout=10.0
        )
        
    async def close(self):
        """Close the HTTP session."""
        await self.session.aclose()
    
    async def get_standings(self, competition_code: str, season: str = "2024") -> List[Standing]:
        """
        Get competition standings.
        
        Args:
            competition_code: Three-letter competition code (e.g., 'PL', 'PD')
            season: Season ID (e.g., '2024')
            
        Returns:
            List of Standing objects
        """
        cache_key = f"oracle:standings:{competition_code}:{season}"
        cached_data = await self._get_cached(cache_key)
        
        if cached_data:
            return cached_data
            
        await self._enforce_rate_limit()
        
        response = await self.session.get(
            f"{self.base_url}/competitions/{competition_code}/standings",
            params={"season": season}
        )
        
        response.raise_for_status()
        data = response.json()
        
        await self._cache_data(cache_key, 86400, data)
        
        return self._convert_standings_response(data)
    
    async def get_match(self, match_id: str) -> Match:
        """
        Get match details by ID.
        
        Args:
            match_id: Unique match identifier
            
        Returns:
            Match object
        """
        # No caching for individual matches per requirement
        await self._enforce_rate_limit()
        
        response = await self.session.get(f"{self.base_url}/matches/{match_id}")
        response.raise_for_status()
        data = response.json()
        
        return self._convert_match_response(data)
    
    async def get_head2head(self, match_id: str, limit: int = 10) -> Head2Head:
        """
        Get head-to-head statistics between two teams.
        
        Args:
            match_id: Reference match ID
            limit: Number of recent matches to consider
            
        Returns:
            Head2Head object with statistics
        """
        cache_key = f"oracle:head2head:{match_id}"
        cached_data = await self._get_cached(cache_key)
        
        if cached_data:
            return cached_data
            
        await self._enforce_rate_limit()
        
        response = await self.session.get(
            f"{self.base_url}/matches/{match_id}/head2head",
            params={"limit": limit}
        )
        response.raise_for_status()
        data = response.json()
        
        await self._cache_data(cache_key, 604800, data)
        
        return self._convert_head2head_response(data)
    
    async def get_team_matches(self, team_id: int, season: str = "2024", status: str = "FINISHED") -> List[Match]:
        """
        Get recent matches for a team.
        
        Args:
            team_id: Team identifier
            season: Season identifier
            status: Match status filter
            
        Returns:
            List of Match objects
        """
        params = {
            "season": season,
            "status": status
        }
        
        cache_key = f"oracle:teammatches:{team_id}:{hash(frozenset(params.items()))}"
        cached_data = await self._get_cached(cache_key)
        
        if cached_data:
            return cached_data
            
        await self._enforce_rate_limit()
        
        response = await self.session.get(
            f"{self.base_url}/teams/{team_id}/matches",
            params=params
        )
        response.raise_for_status()
        data = response.json()
        
        await self._cache_data(cache_key, 3600, data)
        
        return self._convert_team_matches_response(data)
    
    async def get_team(self, team_id: int) -> Team:
        """
        Get team information.
        
        Args:
            team_id: Team identifier
            
        Returns:
            Team object
        """
        cache_key = f"oracle:team:{team_id}"
        cached_data = await self._get_cached(cache_key)
        
        if cached_data:
            return cached_data
            
        await self._enforce_rate_limit()
        
        response = await self.session.get(f"{self.base_url}/teams/{team_id}")
        response.raise_for_status()
        data = response.json()
        
        await self._cache_data(cache_key, 604800, data)
        
        return self._convert_team_response(data)
    
    async def get_competition_matches(self, competition_code: str, season: str = "2024") -> List[Match]:
        """
        Get matches for a competition in a season.
        
        Args:
            competition_code: Three-letter competition code
            season: Season identifier
            
        Returns:
            List of Match objects
        """
        params = {"season": season}
        
        cache_key = f"oracle:matches:{competition_code}:{season}"
        cached_data = await self._get_cached(cache_key)
        
        if cached_data:
            return cached_data
            
        await self._enforce_rate_limit()
        
        response = await self.session.get(
            f"{self.base_url}/competitions/{competition_code}/matches",
            params=params
        )
        response.raise_for_status()
        data = response.json()
        
        await self._cache_data(cache_key, 86400, data)
        
        return self._convert_competition_matches_response(data)
    
    async def _enforce_rate_limit(self):
        """Enforce rate limiting to stay within FD Free tier limits."""
        if not self.rate_limiter.can_make_request():
            reset_time = self.rate_limiter.get_reset_time()
            raise RateLimitException(
                f"Football-Data.org rate limit would be exceeded. "
                f"Reset time: {reset_time}"
            )
    
    async def _get_cached(self, key: str) -> Optional[Any]:
        """Get data from cache if available."""
        if not self.redis:
            return None
            
        try:
            cached = await self.redis.get(key)
            if cached:
                return json.loads(cached)
        except Exception:
            pass
            
        return None
    
    async def _cache_data(self, key: str, ttl: int, data: Any):
        """Cache data with TTL."""
        if not self.redis:
            return
            
        try:
            await self.redis.setex(key, ttl, json.dumps(data))
        except Exception:
            pass
    
    def _convert_standings_response(self, data: Dict[str, Any]) -> List[Standing]:
        """Convert Football-Data.org standings response to internal model."""
        standings = []
        for item in data.get("standings", []):
            team_data = item.get("team", {})
            team = Team(
                id=team_data.get("id", 0),
                name=team_data.get("name", ""),
                short_name=team_data.get("shortName", ""),
                tla=team_data.get("tla", ""),
                crest=team_data.get("crest", ""),
                market_value=team_data.get("marketValue")
            )
            
            standing = Standing(
                position=item.get("position", 0),
                team=team,
                played_games=item.get("playedGames", 0),
                win=item.get("win", 0),
                draw=item.get("draw", 0),
                loss=item.get("loss", 0),
                points=item.get("points", 0),
                goal_difference=item.get("goalDifference", 0),
                goals_for=item.get("goalsFor", 0),
                goals_against=item.get("goalsAgainst", 0),
                form=item.get("form"),
                standing_type=self._parse_standing_type(item)
            )
            standings.append(standing)
            
        return standings
    
    def _parse_standing_type(self, standing_data: Dict[str, Any]) -> str:
        """Parse standing type from Football-Data.org response."""
        standings_list = standing_data.get("standings", [])
        for item in standings_list:
            if item.get("type") in ["HOME", "AWAY", "NEUTRAL"]:
                return item["type"]
        return "NEUTRAL"
    
    def _convert_match_response(self, data: Dict[str, Any]) -> Match:
        """Convert Football-Data.org match response to internal model."""
        # Simplified conversion - full implementation would process all fields
        return Match(
            id=data.get("id", 0),
            utc_date=data.get("utcDate", ""),
            status=data.get("status", "SCHEDULED"),
            minute=data.get("minute"),
            goals=data.get("goals", []),
            home_team=data.get("homeTeam"),
            away_team=data.get("awayTeam"),
            score=data.get("score", {}),
            competition=data.get("competition")
        )
    
    def _convert_head2head_response(self, data: Dict[str, Any]) -> Head2Head:
        """Convert Football-Data.org head2head response to internal model."""
        return Head2Head(
            home_team_wins=data.get("homeTeamWins", 0),
            away_team_wins=data.get("awayTeamWins", 0),
            draws=data.get("draws", 0),
            matches=data.get("matches", [])
        )
    
    def _convert_team_matches_response(self, data: Dict[str, Any]) -> List[Match]:
        """Convert Football-Data.org team matches response to internal models."""
        return [self._convert_match_response(match) for match in data.get("matches", [])]
    
    def _convert_team_response(self, data: Dict[str, Any]) -> Team:
        """Convert Football-Data.org team response to internal model."""
        return Team(
            id=data.get("id", 0),
            name=data.get("name", ""),
            short_name=data.get("shortName", ""),
            tla=data.get("tla", ""),
            crest=data.get("crest", ""),
            market_value=data.get("marketValue"),
            coach=data.get("coach", {}),
            area=data.get("area", {})
        )
    
    def _convert_competition_matches_response(self, data: Dict[str, Any]) -> List[Match]:
        """Convert Football-Data.org competition matches response to internal models."""
        return [self._convert_match_response(match) for match in data.get("matches", [])]


class RateLimiter:
    """Simple rate limiter for Football-Data.org API calls."""
    
    def __init__(self, max_requests: int, window_minutes: int):
        self.max_requests = max_requests
        self.window_minutes = window_minutes
        self.requests = []
        
    def can_make_request(self) -> bool:
        """Check if a request can be made without exceeding rate limits."""
        current_time = time.time()
        
        # Remove old requests outside the window
        cutoff_time = current_time - (self.window_minutes * 60)
        self.requests = [req_time for req_time in self.requests if req_time > cutoff_time]
        
        return len(self.requests) < self.max_requests
    
    def make_request(self):
        """Record a request and enforce rate limit."""
        current_time = time.time()
        self.requests.append(current_time)
        
        if not self.can_make_request():
            raise RateLimitException("Rate limit exceeded")
        
        return True
    
    def get_reset_time(self) -> datetime:
        """Get the time when the rate limit window resets."""
        if not self.requests:
            return datetime.now()
            
        oldest_request = min(self.requests)
        reset_time = datetime.fromtimestamp(oldest_request + (self.window_minutes * 60))
        return reset_time