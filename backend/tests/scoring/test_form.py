import pytest
from app.application.scoring.form import parse_recent_form, calculate_form_score

def test_parse_recent_form():
    """Prueba el parseo de secuencias de Football-Data a nuestro formato."""
    assert parse_recent_form("W,W,D,L,W") == ["V", "V", "E", "D", "V"]
    assert parse_recent_form("WWD") == ["V", "V", "E"]
    assert parse_recent_form("") == []
    # Test unknown characters fallback to 'E'
    assert parse_recent_form("X,W") == ["E", "V"]

def test_calculate_form_score():
    """Prueba el cálculo de puntaje de forma."""
    assert calculate_form_score(["V", "V", "V", "V", "V"]) == 15.0
    assert calculate_form_score(["D", "D", "D", "D", "D"]) == 0.0
    assert calculate_form_score(["V", "E", "D"]) == 4.0
    assert calculate_form_score([]) == 0.0
