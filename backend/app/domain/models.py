from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime
from enum import Enum

class BriefDepth(str, Enum):
    BASIC = "basic"
    STANDARD = "standard"
    FULL = "full"

class CompetitionType(str, Enum):
    LEAGUE = "LEAGUE"
    LEAGUE_CUP = "LEAGUE_CUP"
    CUP = "CUP"
    PLAYOFFS = "PLAYOFFS"

class MatchStatus(str, Enum):
    SCHEDULED = "SCHEDULED"
    TIMED = "TIMED"
    IN_PLAY = "IN_PLAY"
    PAUSED = "PAUSED"
    EXTRA_TIME = "EXTRA_TIME"
    PENALTY_SHOOTOUT = "PENALTY_SHOOTOUT"
    FINISHED = "FINISHED"
    SUSPENDED = "SUSPENDED"
    POSTPONED = "POSTPONED"
    AWARDED = "AWARDED"

class StandingType(str, Enum):
    HOME = "HOME"
    AWAY = "AWAY"
    NEUTRAL = "NEUTRAL"

class Team(BaseModel):
    id: int = Field(..., description="Stable team ID from Football-Data.org")
    name: str = Field(..., description="Team name")
    short_name: str = Field(..., description="Short name/abbreviation")
    tla: str = Field(..., description="Three-letter code (e.g., 'MCI')")
    crest: str = Field(..., description="Team crest URL")
    address: Optional[str] = None
    website: Optional[str] = None
    founded: Optional[int] = None
    club_colors: Optional[str] = None
    venue: Optional[str] = None
    area: Optional[Dict[str, Any]] = None
    current_competitions: Optional[List[Dict[str, Any]]] = None
    coach: Optional[Dict[str, Any]] = None
    squad: Optional[List[Dict[str, Any]]] = None
    staff: Optional[List[Dict[str, Any]]] = None
    market_value: Optional[int] = None
    last_updated: Optional[datetime] = None

class Competition(BaseModel):
    id: int = Field(..., description="Stable competition ID")
    name: str = Field(..., description="Competition name")
    code: str = Field(..., description="Competition code (e.g., 'PL', 'PD')")
    competition_type: CompetitionType = Field(..., description="Type of competition")
    emblem: Optional[str] = None
    plan: str = Field(..., description="Subscription tier")
    area: Optional[Dict[str, Any]] = None

class Standing(BaseModel):
    position: int = Field(..., description="Position in standings")
    team: Team = Field(..., description="Team information")
    played_games: int = Field(..., description="Games played")
    win: int = Field(..., description="Wins")
    draw: int = Field(..., description="Draws")
    loss: int = Field(..., description="Losses")
    points: int = Field(..., description="Points total")
    goal_difference: int = Field(..., description="Goals for minus against")
    goals_for: int = Field(..., description="Goals scored")
    goals_against: int = Field(..., description="Goals conceded")
    form: Optional[str] = None
    last_updated: Optional[datetime] = None

class Match(BaseModel):
    id: int = Field(..., description="Stable match ID")
    utc_date: datetime = Field(..., description="Match date/time in UTC")
    status: MatchStatus = Field(..., description="Current match status")
    minute: Optional[int] = None
    injury_time: Optional[int] = None
    attendance: Optional[int] = None
    venue: Optional[str] = None
    matchday: Optional[int] = None
    stage: Optional[str] = None
    group: Optional[str] = None
    last_updated: Optional[datetime] = None
    area: Optional[Dict[str, Any]] = None
    competition: Optional[Competition] = None
    season: Optional[Dict[str, Any]] = None
    home_team: Optional[Dict[str, Any]] = None
    away_team: Optional[Dict[str, Any]] = None
    score: Optional[Dict[str, Any]] = None
    goals: Optional[List[Dict[str, Any]]] = None
    bookings: Optional[List[Dict[str, Any]]] = None
    substitutions: Optional[List[Dict[str, Any]]] = None
    penalties: Optional[List[Dict[str, Any]]] = None
    referees: Optional[List[Dict[str, Any]]] = None
    odds: Optional[Dict[str, Any]] = None

class Player(BaseModel):
    id: int = Field(..., description="Stable player ID")
    name: str = Field(..., description="Full name")
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    date_of_birth: Optional[str] = None
    nationality: Optional[str] = None
    position: Optional[str] = None
    shirt_number: Optional[int] = None
    current_team: Optional[Team] = None
    section: Optional[str] = None

class Head2Head(BaseModel):
    home_team_wins: int = Field(default=0, description="Home team wins")
    away_team_wins: int = Field(default=0, description="Away team wins")
    draws: int = Field(default=0, description="Draws")
    matches: Optional[List[Dict[str, Any]]] = None

class Scorer(BaseModel):
    player: Player = Field(..., description="Scorer information")
    goals: int = Field(..., description="Goals scored")
    assists: int = Field(..., description="Assists made")
    penalties: int = Field(..., description="Penalties scored")

class TeamStats(BaseModel):
    corner_kicks: Optional[int] = None
    ball_possession: Optional[int] = None
    shots: Optional[int] = None
    shots_on_goal: Optional[int] = None
    yellow_cards: Optional[int] = None
    red_cards: Optional[int] = None

class Formation(BaseModel):
    code: Optional[str] = None
    name: Optional[str] = None

class LineupPlayer(BaseModel):
    id: int = Field(..., description="Player ID")
    position: Optional[str] = None
    duplicate_number: Optional[int] = None
    starter: bool = Field(default=True, description="Is starting player")
    captain: bool = Field(default=False, description="Is team captain")

class Lineup(BaseModel):
    formation: Formation = Field(..., description="Team formation")
    starters: List[LineupPlayer] = Field(..., description="Starting lineup")
    bench: List[LineupPlayer] = Field(..., description="Bench players")

class MatchTeamInfo(BaseModel):
    team: Team = Field(..., description="Team information")
    statistics: Optional[TeamStats] = None
    formation: Optional[Formation] = None
    lineup: Optional[Lineup] = None
    bench: Optional[Lineup] = None

class Brief(BaseModel):
    match_info: Dict[str, Any] = Field(..., description="Basic match information")
    analysis: Dict[str, Any] = Field(..., description="Structured analysis for betting context")
    context: Dict[str, Any] = Field(..., description="Additional context for analysis")

class BriefDto(BaseModel):
    match_info: Dict[str, Any] = Field(..., description="Basic match information")
    analysis: Dict[str, Any] = Field(..., description="Structured analysis for betting context")
    context: Dict[str, Any] = Field(..., description="Additional context for analysis")
    depth: BriefDepth = Field(default=BriefDepth.STANDARD, description="Analysis depth level")

class StandingResponse(BaseModel):
    competition: Competition = Field(..., description="Competition information")
    standings: List[Standing] = Field(..., description="Current standings")
    last_updated: Optional[datetime] = None

class HealthResponse(BaseModel):
    status: str = Field(default="healthy", description="Service health status")
    version: str = Field(default="0.1.0", description="API version")
    timestamp: datetime = Field(default_factory=datetime.now, description="Response timestamp")
