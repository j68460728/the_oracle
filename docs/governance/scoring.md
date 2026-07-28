# Oracle Scoring Methodology (strength-v1.1)

El sistema The Oracle se basa en una serie de cálculos deterministas y reproducibles para medir la fortaleza estadística de cada equipo. La versión actual del algoritmo es **strength-v1.1**.

## Pesos de evaluación (Strength Score)
El "Strength Score" (de 0 a 100) se calcula utilizando tres factores principales procedentes de métricas reales y medibles.

1. **Rendimiento en Liga (50%)**
   - **Métrica**: Puntos Por Partido (PPG - Points Per Game).
   - **Razón**: Es el indicador más fiable de la calidad estructural de un equipo a largo plazo.
   - **Cálculo**: El PPG (máximo teórico 3.0) se escala linealmente a 50 puntos.

2. **Forma Reciente (30%)**
   - **Métrica**: Últimos 5 partidos jugados.
   - **Razón**: El momentum es crítico. Un equipo menor en buena forma puede superar a un equipo mayor en crisis.
   - **Cálculo**: (Puntos obtenidos en últimos 5 partidos / 15) * 30. (Victoria=3, Empate=1, Derrota=0).

3. **Posición en la Tabla (20%)**
   - **Métrica**: Clasificación actual (ej. 1º a 20º).
   - **Razón**: Añade una capa comparativa directa sobre la liga actual.
   - **Cálculo**: El 1º obtiene 20 puntos. El último clasificado (ej. 20º) obtiene 0 puntos. La fórmula asegura que `(position - 1) / (total_teams - 1)` interpole el valor entre 0 y 20.

## Determinación de "Edge" (Ventaja)
El sistema compara el Strength Score del local frente al visitante.
- **Threshold**: 5.0 puntos de diferencia.
- Si `abs(Home - Away) < 5.0`, el partido se considera **EVEN** (Igualado).
- Si la diferencia supera el umbral a favor del local, se decreta **HOME** (Ventaja Local).

## Availability (Cobertura)
The Oracle debe declarar explícitamente sobre qué variables está basando su decisión, indicando si los datos avanzados (como xG, bajas o Head-2-Head) están disponibles en la capa de infraestructura actual. La UI se encarga de mostrar la disponibilidad y la justificación.

## Pruebas de regresión (Testing)
El algoritmo está respaldado por pruebas de Pytest (`backend/tests/scoring/`).
Cualquier cambio futuro en los pesos (ej. migración a `strength-v1.2` con la inclusión del clima) debe primero:
1. Definir los nuevos umbrales en este documento.
2. Actualizar las pruebas para asegurar la exactitud de los nuevos pesos.
3. Actualizar el componente `OracleMethodology.tsx` en el frontend.
