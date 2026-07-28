from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime

from .enums import BriefDepth, CompetitionType, MatchStatus, StandingType

class Team(BaseModel):
    id: int = Field(..., description="Stable global identifier for the team")
    name: str = Field(..., description="Full team name")
    short_name: str = Field(..., description="Short team name")
    abbreviation: str = Field(..., description="Three-letter or short code for the team (e.g., MCI)")
    logo_url: str = Field(..., description="URL to the team's logo or crest")
    address: Optional[str] = None
    website: Optional[str] = None
    founded: Optional[int] = None
    colors: Optional[str] = Field(None, description="Team colors")
    venue: Optional[str] = Field(None, description="Home stadium or venue name")
    area: Optional[Dict[str, Any]] = None
    current_competitions: Optional[List[Dict[str, Any]]] = None
    coach: Optional[Dict[str, Any]] = None
    squad: Optional[List[Dict[str, Any]]] = None
    staff: Optional[List[Dict[str, Any]]] = None
    market_value: Optional[int] = None
    last_updated: Optional[datetime] = None

class Competition(BaseModel):
    id: int = Field(..., description="Stable global identifier for the competition")
    name: str = Field(..., description="Competition name")
    code: str = Field(..., description="Standard code representing the competition (e.g., PL, PD)")
    type: CompetitionType = Field(..., description="Type of competition (League, Cup, etc.)")
    logo_url: Optional[str] = Field(None, description="URL to the competition's logo or emblem")
    area: Optional[Dict[str, Any]] = None

class Standing(BaseModel):
    position: int = Field(..., description="Position in the league table")
    team: Team = Field(..., description="Team information")
    played_games: int = Field(..., description="Total games played")
    wins: int = Field(..., description="Total wins")
    draws: int = Field(..., description="Total draws")
    losses: int = Field(..., description="Total losses")
    points: int = Field(..., description="Points total")
    goal_difference: int = Field(..., description="Goals scored minus goals conceded")
    goals_for: int = Field(..., description="Total goals scored")
    goals_against: int = Field(..., description="Total goals conceded")
    recent_form: Optional[str] = Field(None, description="Sequence of recent match results (e.g., W,W,D,L,W)")
    last_updated: Optional[datetime] = None

class Match(BaseModel):
    id: int = Field(..., description="Stable global identifier for the match")
    scheduled_at: datetime = Field(..., description="Scheduled date and time of the match in UTC")
    status: MatchStatus = Field(..., description="Current status of the match")
    minute: Optional[int] = Field(None, description="Current minute of play if active")
    injury_time: Optional[int] = Field(None, description="Stoppage time in minutes")
    attendance: Optional[int] = None
    venue: Optional[str] = None
    round: Optional[int] = Field(None, description="Matchday or round number")
    stage: Optional[str] = None
    group: Optional[str] = None
    last_updated: Optional[datetime] = None
    competition: Optional[Competition] = None
    home_team: Optional[Team] = None
    away_team: Optional[Team] = None
    score: Optional[Dict[str, Any]] = None
    goals: Optional[List[Dict[str, Any]]] = None
    bookings: Optional[List[Dict[str, Any]]] = None
    substitutions: Optional[List[Dict[str, Any]]] = None
    penalties: Optional[List[Dict[str, Any]]] = None
    referees: Optional[List[Dict[str, Any]]] = None
    odds: Optional[Dict[str, Any]] = None

class Player(BaseModel):
    id: int = Field(..., description="Stable global identifier for the player")
    name: str = Field(..., description="Full name")
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    date_of_birth: Optional[str] = None
    nationality: Optional[str] = None
    position: Optional[str] = None
    shirt_number: Optional[int] = None
    current_team: Optional[Team] = None

class Head2Head(BaseModel):
    home_team_wins: int = Field(default=0, description="Total wins by the home team")
    away_team_wins: int = Field(default=0, description="Total wins by the away team")
    draws: int = Field(default=0, description="Total draws between the teams")
    matches: Optional[List[Match]] = Field(None, description="List of past encounters")

class Scorer(BaseModel):
    player: Player = Field(..., description="Player information")
    goals: int = Field(..., description="Total goals scored")
    assists: int = Field(..., description="Total assists made")
    penalties: int = Field(..., description="Total penalties scored")

class TeamStats(BaseModel):
    corner_kicks: Optional[int] = None
    ball_possession: Optional[int] = None
    shots: Optional[int] = None
    shots_on_target: Optional[int] = None
    yellow_cards: Optional[int] = None
    red_cards: Optional[int] = None

class Formation(BaseModel):
    code: Optional[str] = None
    name: Optional[str] = None

class LineupPlayer(BaseModel):
    id: int = Field(..., description="Player ID")
    position: Optional[str] = None
    shirt_number: Optional[int] = None
    is_starter: bool = Field(default=True, description="Is starting player")
    is_captain: bool = Field(default=False, description="Is team captain")

class Lineup(BaseModel):
    formation: Formation = Field(..., description="Team formation (e.g., 4-3-3)")
    starters: List[LineupPlayer] = Field(..., description="List of starting players")
    bench: List[LineupPlayer] = Field(..., description="List of bench players")

class MatchTeamInfo(BaseModel):
    team: Team = Field(..., description="Team information context")
    statistics: Optional[TeamStats] = None
    formation: Optional[Formation] = None
    lineup: Optional[Lineup] = None

class Brief(BaseModel):
    match_info: Dict[str, Any] = Field(..., description="Basic match metadata")
    analysis: Dict[str, Any] = Field(..., description="Structured analysis representing betting context")
    context: Dict[str, Any] = Field(..., description="Additional environment and context variables")

class BriefDto(BaseModel):
    match_info: Dict[str, Any] = Field(..., description="Basic match metadata")
    analysis: Dict[str, Any] = Field(..., description="Structured analysis representing betting context")
    context: Dict[str, Any] = Field(..., description="Additional environment and context variables")
    depth: BriefDepth = Field(default=BriefDepth.STANDARD, description="Analysis depth level")

class StandingResponse(BaseModel):
    competition: Competition = Field(..., description="Competition information")
    standings: List[Standing] = Field(..., description="List of standings entries")
    last_updated: Optional[datetime] = None

class HealthResponse(BaseModel):
    status: str = Field(default="healthy", description="Service health status")
    version: str = Field(default="0.1.0", description="API version")
    timestamp: datetime = Field(default_factory=datetime.now, description="Response timestamp")
