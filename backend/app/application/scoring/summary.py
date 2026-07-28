def calculate_confidence(home_strength: float, away_strength: float) -> str:
    """
    Calcula la confianza en la predicción/ventaja. 
    Mayor diferencia de fortaleza significa mayor confianza.
    """
    diff = abs(home_strength - away_strength)
    # Base confidence is 50%. Max confidence is bounded around 95%
    confidence = 50 + (diff * 1.5)
    confidence = min(95.0, max(50.0, confidence))
    return f"{int(confidence)}%"

def generate_insight_text(home_strength: float, away_strength: float, edge: str, home_name: str, away_name: str) -> str:
    """
    Genera un texto analítico cualitativo rápido basado en la diferencia de fuerza.
    Evita afirmaciones absolutas reflejando el grado de confianza.
    """
    diff = abs(home_strength - away_strength)
    confidence = min(95.0, max(50.0, 50 + (diff * 1.5)))
    
    if edge == "EVEN":
        return "El partido se perfila parejo; ambos equipos muestran métricas de rendimiento similares."
    
    favorite = home_name if edge == "HOME" else away_name
    
    if confidence > 75:
        return f"{favorite} shows a strong statistical advantage based on recent form and league position."
    elif confidence > 60:
        return f"{favorite} holds a moderate advantage heading into this fixture."
    else:
        return f"Slight edge for {favorite}, though the matchup remains highly competitive."
