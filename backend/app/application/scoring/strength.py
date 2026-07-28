from typing import Tuple, Dict

def calculate_strength(points_per_game: float, form_score: float, position: int, total_teams: int = 20) -> Tuple[int, Dict[str, int]]:
    """
    Calcula una puntuación de fortaleza general (0-100) para un equipo,
    y desglosa los factores que contribuyeron a esa puntuación.
    """
    # Max PPG is theoretically 3.0. Scale to 50 points max.
    ppg_component = min(50.0, (points_per_game / 3.0) * 50.0)
    
    # Form score is usually 0 to 15 (5 matches * 3 points max). Scale to 30 points max.
    form_component = min(30.0, (form_score / 15.0) * 30.0)
    
    # Position: top teams get up to 20 points, bottom teams get 0.
    # Inverse: position 1 gets 20, position 20 gets 0
    if position and total_teams:
        pos_component = max(0.0, 20.0 - ((position - 1) * (20.0 / total_teams)))
    else:
        pos_component = 10.0 # Default fallback
        
    strength = ppg_component + form_component + pos_component
    score = int(round(min(100.0, max(0.0, strength))))
    
    factors = {
        "points_per_game": int(round(ppg_component)),
        "form": int(round(form_component)),
        "league_position": int(round(pos_component))
    }
    
    return score, factors
