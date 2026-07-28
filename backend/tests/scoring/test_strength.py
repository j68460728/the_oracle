import pytest
from app.application.scoring.strength import calculate_strength
from tests.fixtures.teams import build_team

def test_strength_perfect_team():
    """
    Un equipo perfecto: PPG 3.0, Forma 15 (5 victorias), Posición 1.
    Debe obtener 100 puntos y los factores deben ser 50/30/20.
    """
    team = build_team(points_per_game=3.0, form_score=15.0, position=1)
    score, factors = calculate_strength(**team)
    
    assert score == 100
    assert factors["points_per_game"] == 50
    assert factors["form"] == 30
    assert factors["league_position"] == 20

def test_strength_worst_team():
    """
    El peor equipo: PPG 0.0, Forma 0, Posición 20.
    Debe obtener 0 puntos y los factores deben ser 0/0/0.
    """
    team = build_team(points_per_game=0.0, form_score=0.0, position=20)
    score, factors = calculate_strength(**team)
    
    assert score == 0
    assert factors["points_per_game"] == 0
    assert factors["form"] == 0
    assert factors["league_position"] == 0

def test_strength_average_team():
    """
    Un equipo promedio: PPG 1.5, Forma 7.5, Posición 10.
    Debe obtener ~51 puntos y los factores deben ser 25/15/11.
    """
    team = build_team(points_per_game=1.5, form_score=7.5, position=10)
    score, factors = calculate_strength(**team)
    
    # 25 + 15 + 10.53 = 50.53 -> 51
    assert score == 51
    assert factors["points_per_game"] == 25
    assert factors["form"] == 15
    assert factors["league_position"] == 11
