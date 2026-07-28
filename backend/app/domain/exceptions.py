class OracleDomainException(Exception):
    """Base exception for all domain-related errors in The Oracle."""
    pass

class ProviderRateLimitExceededException(OracleDomainException):
    """Raised when the underlying data provider's rate limit has been exhausted."""
    def __init__(self, message: str = "Provider rate limit exceeded. Please try again later."):
        self.message = message
        super().__init__(self.message)

class ProviderIntegrationException(OracleDomainException):
    """Raised when communication with the underlying data provider fails (e.g., 500, timeout)."""
    def __init__(self, message: str = "Failed to communicate with data provider."):
        self.message = message
        super().__init__(self.message)

class MatchNotFoundException(OracleDomainException):
    """Raised when a specific match ID cannot be found."""
    def __init__(self, match_id: int):
        self.match_id = match_id
        self.message = f"Match with ID {match_id} not found."
        super().__init__(self.message)

class CompetitionNotFoundException(OracleDomainException):
    """Raised when a specific competition code cannot be found."""
    def __init__(self, code: str):
        self.code = code
        self.message = f"Competition with code {code} not found."
        super().__init__(self.message)

class TeamNotFoundException(OracleDomainException):
    """Raised when a specific team ID cannot be found."""
    def __init__(self, team_id: int):
        self.team_id = team_id
        self.message = f"Team with ID {team_id} not found."
        super().__init__(self.message)
