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
