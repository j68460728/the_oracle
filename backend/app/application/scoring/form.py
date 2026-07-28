from typing import List

def parse_recent_form(form_string: str) -> List[str]:
    """
    Transforms a Football-Data form string like 'W,W,D,L,W' or 'WWD' 
    into our internal 'V,E,D' (Victoria, Empate, Derrota) array.
    """
    if not form_string:
        return []
        
    form_string = form_string.replace(",", "").upper()
    mapping = {'W': 'V', 'D': 'E', 'L': 'D'}
    return [mapping.get(char, 'E') for char in form_string][:5] # Max 5 matches

def calculate_form_score(form_array: List[str]) -> float:
    """
    Calculates points from the last 5 matches based on standard football scoring.
    V = 3, E = 1, D = 0.
    Max is 15 points.
    """
    score = 0
    for result in form_array:
        if result == 'V':
            score += 3
        elif result == 'E':
            score += 1
    return float(score)
