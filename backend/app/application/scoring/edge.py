def determine_edge(home_strength: float, away_strength: float, threshold: float = 5.0) -> str:
    """
    Determina quién tiene la ventaja basado en las puntuaciones de fortaleza.
    Si la diferencia es menor al umbral (threshold), se considera EVEN (Igualado).
    """
    diff = home_strength - away_strength
    
    if abs(diff) < threshold:
        return "EVEN"
    elif diff > 0:
        return "HOME"
    else:
        return "AWAY"
