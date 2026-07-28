from typing import Tuple, List, Dict, Any

def calculate_confidence(home_strength: int, away_strength: int) -> Tuple[int, str]:
    """
    Calcula la confianza en la predicción/ventaja. 
    Retorna el valor numérico (50-100) y su etiqueta semántica.
    """
    diff = abs(home_strength - away_strength)
    confidence = int(round(min(95.0, max(50.0, 50.0 + (diff * 1.5)))))
    
    if confidence > 75:
        label = "high"
    elif confidence > 60:
        label = "moderate"
    else:
        label = "low"
        
    return confidence, label

def generate_structured_summary(
    home_score: int, 
    away_score: int, 
    home_factors: Dict[str, int], 
    away_factors: Dict[str, int],
    edge: str, 
    home_name: str, 
    away_name: str
) -> Dict[str, Any]:
    """
    Genera un headline cualitativo y una lista de key_factors basados
    exclusivamente en las variables reales y calculadas.
    """
    confidence, label = calculate_confidence(home_score, away_score)
    
    # Generate Headline
    if edge == "EVEN":
        headline = "Matchup appears evenly balanced based on current statistics"
    else:
        favorite = home_name if edge == "HOME" else away_name
        if label == "high":
            headline = f"{favorite} shows a strong statistical advantage"
        elif label == "moderate":
            headline = f"{favorite} holds a moderate advantage heading into this fixture"
        else:
            headline = f"Slight edge for {favorite}, though the matchup remains highly competitive"
            
    # Generate Key Factors exclusively from available data
    key_factors: List[str] = []
    
    if edge == "HOME":
        if home_factors.get("league_position", 0) > away_factors.get("league_position", 0):
            key_factors.append(f"{home_name} holds a superior league standing")
        if home_factors.get("form", 0) > away_factors.get("form", 0) + 5:
            key_factors.append(f"Stronger recent form from {home_name}")
        elif away_factors.get("form", 0) > home_factors.get("form", 0) + 5:
            key_factors.append(f"{away_name} has shown better form despite overall deficit")
    elif edge == "AWAY":
        if away_factors.get("league_position", 0) > home_factors.get("league_position", 0):
            key_factors.append(f"{away_name} holds a superior league standing")
        if away_factors.get("form", 0) > home_factors.get("form", 0) + 5:
            key_factors.append(f"Stronger recent form from {away_name}")
        elif home_factors.get("form", 0) > away_factors.get("form", 0) + 5:
            key_factors.append(f"{home_name} has shown better form despite overall deficit")
    else:
        key_factors.append("League performance indices are nearly identical")
        if abs(home_factors.get("form", 0) - away_factors.get("form", 0)) > 5:
            better_form = home_name if home_factors.get("form", 0) > away_factors.get("form", 0) else away_name
            key_factors.append(f"Recent form slightly favors {better_form}")
            
    if not key_factors:
        key_factors.append("Overall statistical indices favor the projected outcome")
        
    return {
        "headline": headline,
        "key_factors": key_factors,
        "confidence": confidence,
        "confidence_label": label
    }
