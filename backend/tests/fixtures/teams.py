import pytest

def build_team(points_per_game: float = 1.5, form_score: float = 7.5, position: int = 10, total_teams: int = 20):
    """
    Fixture para construir datos de un equipo para los tests de scoring.
    """
    return {
        "points_per_game": points_per_game,
        "form_score": form_score,
        "position": position,
        "total_teams": total_teams
    }
