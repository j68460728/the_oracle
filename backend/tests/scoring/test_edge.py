import pytest
from app.application.scoring.edge import determine_edge

def test_determine_edge_even():
    """Diferencia menor al umbral (por defecto 5.0)."""
    assert determine_edge(72.0, 68.0) == "EVEN"
    assert determine_edge(68.0, 72.0) == "EVEN"

def test_determine_edge_home():
    """Ventaja clara para el equipo local."""
    assert determine_edge(75.0, 60.0) == "HOME"
    
def test_determine_edge_away():
    """Ventaja clara para el equipo visitante."""
    assert determine_edge(60.0, 75.0) == "AWAY"

def test_determine_edge_custom_threshold():
    """Prueba con un umbral personalizado."""
    # Con umbral 5, 75 vs 70 es EVEN (abs diff es 5, debe ser estríctamente mayor para no ser EVEN si threshold es 5... wait, edge.py dice abs(diff) < threshold)
    # Wait, edge.py dice `if abs(diff) < threshold:` return "EVEN". So 5.0 is NOT < 5.0. It is equal, so diff=5.0 returns "HOME".
    assert determine_edge(75.0, 70.0, threshold=6.0) == "EVEN"
    assert determine_edge(75.0, 70.0, threshold=5.0) == "HOME"
