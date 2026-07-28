from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class BriefMetadata(BaseModel):
    generated_at: datetime = Field(default_factory=datetime.now)
    provider: str = Field(default="football-data.org")
    cache: str = Field(default="MISS")
    version: str = Field(default="1.0")
    algorithm_version: str = Field(default="strength-v1")

class MatchInfo(BaseModel):
    competition: str
    matchday: Optional[str] = None
    date: Optional[str] = None
    time: Optional[str] = None
    stadium: Optional[str] = None
    city: Optional[str] = None
    weather: Optional[dict] = None

class TeamIdentity(BaseModel):
    id: int
    name: str
    short_name: str
    logo_url: str

class LeaguePerformance(BaseModel):
    played: int
    points: int
    goals_for: int
    goals_against: int
    goal_difference: int
    points_per_game: float
    position: Optional[int] = None

class RecentMatch(BaseModel):
    opponent: str
    crest: str
    result: str # 'V', 'E', 'D'
    score: str

class RecentForm(BaseModel):
    form_array: List[str] # ['V', 'E', 'D', 'V', 'V']
    recent_matches: List[RecentMatch]

class TeamBrief(BaseModel):
    identity: TeamIdentity
    league: LeaguePerformance
    form: RecentForm
    # Optional advanced stats (None by default for FD Free Tier)
    attack: Optional[dict] = None
    defense: Optional[dict] = None
    key_player: Optional[dict] = None

class BriefSummary(BaseModel):
    headline: str
    key_factors: List[str]
    confidence: int
    confidence_label: str

class ScoringDetail(BaseModel):
    score: int
    factors: dict

class OracleScoring(BaseModel):
    home: ScoringDetail
    away: ScoringDetail

class DataAvailability(BaseModel):
    available: bool
    reason: Optional[str] = None

class BriefAvailability(BaseModel):
    h2h: DataAvailability
    advanced_metrics: DataAvailability
    injuries: DataAvailability

class MatchHistory(BaseModel):
    date: str
    home_team: str
    home_crest: str
    away_team: str
    away_crest: str
    home_score: int
    away_score: int

class HeadToHeadSummary(BaseModel):
    home_wins: int
    draws: int
    away_wins: int

class HeadToHeadBrief(BaseModel):
    matches: List[MatchHistory]
    summary: HeadToHeadSummary

class ContextFactor(BaseModel):
    type: str # 'home', 'rest', 'injuries', 'weather', etc.
    title: str
    home_text: Optional[str] = None
    away_text: Optional[str] = None
    text: Optional[str] = None

class BriefContext(BaseModel):
    stadium: Optional[str] = None
    weather: Optional[str] = None
    home_advantage: Optional[str] = None
    rest_days: Optional[str] = None
    competition_stage: Optional[str] = None
    kickoff_local: Optional[str] = None
    factors: List[ContextFactor] = Field(default_factory=list)

class OracleBrief(BaseModel):
    metadata: BriefMetadata
    header: MatchInfo
    home_team: TeamBrief
    away_team: TeamBrief
    scoring: OracleScoring
    summary: BriefSummary
    availability: BriefAvailability
    head_to_head: HeadToHeadBrief
    context: BriefContext
