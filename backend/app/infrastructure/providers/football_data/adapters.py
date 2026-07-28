from typing import Any, Dict
from datetime import datetime

from app.domain.models import Team, Match, Competition, Head2Head, Standing, StandingResponse
from app.domain.enums import MatchStatus, CompetitionType

def map_competition(data: Dict[str, Any]) -> Competition:
    return Competition(
        id=data.get("id", 0),
        name=data.get("name", ""),
        code=data.get("code", ""),
        type=CompetitionType(data.get("type", "LEAGUE")),
        logo_url=data.get("emblem"),
        area=data.get("area")
    )

def map_team(data: Dict[str, Any]) -> Team:
    return Team(
        id=data.get("id", 0),
        name=data.get("name", ""),
        short_name=data.get("shortName", ""),
        abbreviation=data.get("tla", ""),
        logo_url=data.get("crest", ""),
        address=data.get("address"),
        website=data.get("website"),
        founded=data.get("founded"),
        colors=data.get("clubColors"),
        venue=data.get("venue"),
        area=data.get("area"),
        coach=data.get("coach")
    )

def map_match(data: Dict[str, Any]) -> Match:
    # FD provides utcDate
    utc_str = data.get("utcDate")
    scheduled_at = datetime.fromisoformat(utc_str.replace('Z', '+00:00')) if utc_str else datetime.now()
    
    # Check status mapping
    raw_status = data.get("status", "SCHEDULED")
    try:
        status = MatchStatus(raw_status)
    except ValueError:
        status = MatchStatus.SCHEDULED
        
    return Match(
        id=data.get("id", 0),
        scheduled_at=scheduled_at,
        status=status,
        minute=data.get("minute"),
        injury_time=data.get("injuryTime"),
        attendance=data.get("attendance"),
        venue=data.get("venue"),
        round=data.get("matchday"),
        stage=data.get("stage"),
        group=data.get("group"),
        competition=map_competition(data["competition"]) if "competition" in data else None,
        home_team=map_team(data["homeTeam"]) if "homeTeam" in data else None,
        away_team=map_team(data["awayTeam"]) if "awayTeam" in data else None,
        score=data.get("score")
    )

def map_head2head(data: Dict[str, Any]) -> Head2Head:
    aggregates = data.get("aggregates", {})
    home_wins = aggregates.get("homeTeam", {}).get("wins", 0)
    away_wins = aggregates.get("awayTeam", {}).get("wins", 0)
    draws = aggregates.get("homeTeam", {}).get("draws", 0)
    
    matches_list = data.get("matches", [])
    mapped_matches = [map_match(m) for m in matches_list]
    
    return Head2Head(
        home_team_wins=home_wins,
        away_team_wins=away_wins,
        draws=draws,
        matches=mapped_matches
    )

def map_standing_response(data: Dict[str, Any]) -> StandingResponse:
    competition = map_competition(data.get("competition", {}))
    
    standings_list = []
    # FD groups standings, typically TOTAL is what we want
    for standings_table in data.get("standings", []):
        if standings_table.get("type") == "TOTAL":
            for row in standings_table.get("table", []):
                team = map_team(row.get("team", {}))
                standing = Standing(
                    position=row.get("position", 0),
                    team=team,
                    played_games=row.get("playedGames", 0),
                    wins=row.get("won", 0),
                    draws=row.get("draw", 0),
                    losses=row.get("lost", 0),
                    points=row.get("points", 0),
                    goal_difference=row.get("goalDifference", 0),
                    goals_for=row.get("goalsFor", 0),
                    goals_against=row.get("goalsAgainst", 0),
                    recent_form=row.get("form")
                )
                standings_list.append(standing)
            break
            
    return StandingResponse(
        competition=competition,
        standings=standings_list
    )
