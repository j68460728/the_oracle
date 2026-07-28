# Ingeniería de Necesidades: Descomposición en Variables Medibles

**Objetivo:** Descomponer cada necesidad de información identificada hasta alcanzar variables concretas, observables y medibles.

**Principio:** Un concepto general no es suficiente. Aquí no existe "la forma del equipo" sino un conjunto de variables que, combinadas, capturan dimensiones específicas de lo que llamamos forma.

---

## Categoría 1: Calidad Relativa de los Equipos

### Concepto General: "El equipo A es mejor que el equipo B"

#### Descomposición

```
Calidad Relativa
├── 1.1 Rendimiento Acumulado en la Temporada
│   ├── 1.1.1 Posición en la tabla [rank 1-20]
│   ├── 1.1.2 Puntos totales [integer]
│   ├── 1.1.3 Puntos por partido [decimal, 0.0 - 3.0]
│   ├── 1.1.4 Diferencia de goles total [integer]
│   ├── 1.1.5 Diferencia de goles por partido [decimal]
│   └── 1.1.6 Porcentaje de puntos obtenidos / posibles [decimal, 0.0 - 1.0]
│
├── 1.2 Rendimiento Ajustado por Calendario
│   ├── 1.2.1 Puntos vs equipos de la mitad superior de la tabla [integer]
│   ├── 1.2.2 Puntos vs equipos de la mitad inferior [integer]
│   ├── 1.2.3 Diferencia de goles vs rivales fuertes [integer]
│   ├── 1.2.4 Diferencia de goles vs rivales débiles [integer]
│   └── 1.2.5 Índice de fortaleza de calendario enfrentado [índice normalizado]
│
├── 1.3 Rendimiento Ofensivo
│   ├── 1.3.1 Goles marcados por partido [decimal]
│   ├── 1.3.2 Goles marcados por partido vs top mitad [decimal]
│   ├── 1.3.3 Goles marcados por partido vs bottom mitad [decimal]
│   └── 1.3.4 Tiros totales por partido (proxy de creación de ocasiones) [integer]
│
├── 1.4 Rendimiento Defensivo
│   ├── 1.4.1 Goles encajados por partido [decimal]
│   ├── 1.4.2 Goles encajados por partido vs top mitad [decimal]
│   ├── 1.4.3 Goles encajados por partido vs bottom mitad [decimal]
│   ├── 1.4.4 Clean sheets (partidos sin encajar) [integer]
│   └── 1.4.5 Clean sheet rate [decimal, 0.0 - 1.0]
│
├── 1.5 Calidad de Plantilla (Proxy)
│   ├── 1.5.1 Valor de mercado total del equipo [integer, EUR]
│   ├── 1.5.2 Valor de mercado promedio de la plantilla [integer, EUR]
│   ├── 1.5.3 Rango del valor de mercado en la liga [rank]
│   ├── 1.5.4 Experiencia promedio de la plantilla [decimal, años]
│   └── 1.5.5 Profundidad de plantilla (jugadores con > X minutos) [integer]
│
├── 1.6 Consistencia / Estabilidad
│   ├── 1.6.1 Desviación estándar de puntos por partido [decimal]
│   ├── 1.6.2 Coeficiente de variación del rendimiento [decimal]
│   └── 1.6.3 Ratio victorias/derrotas [decimal]
│
└── 1.7 Comparación Inter-Temporadas
    ├── 1.7.1 Diferencia de puntos vs misma jornada temporada anterior [integer]
    ├── 1.7.2 Diferencia de goles por partido vs temporada anterior [decimal]
    └── 1.7.3 Cambio en ranking de plantilla vs temporada anterior [rank delta]
```

#### Preguntas que esta descomposición permite responder

- ¿El equipo A es objetivamente mejor o solo tiene mejor calendario?
- ¿El favorito domina tanto como indican sus puntos totales?
- ¿El equipo outsider tiene alguna dimensión en la que sea competitivo?
- ¿La diferencia de calidad justifica la cuota actual?

#### Limitaciones de cada enfoque

| Variable | Limitación |
|----------|------------|
| Posición en tabla | No diferencia entre equipos cercanos en puntos |
| Puntos por partido | No ajusta por oposición enfrentada |
| Diferencia de goles | Puede estar inflada por un par de partidos extremos |
| Valor de mercado | No siempre correlaciona con rendimiento real |
| Racha por oposición | Requiere clasificar a los rivales; puede ser circular |

---

## Categoría 2: Forma Reciente

### Concepto General: "El equipo X está en buena/mala racha"

#### Descomposición

```
Forma Reciente
├── 2.1 Forma por Resultados
│   ├── 2.1.1 Puntos en los últimos N partidos [integer] (N=5, 10, 15, 20)
│   ├── 2.1.2 Puntos por partido en últimos N [decimal]
│   ├── 2.1.3 Ratio de los últimos N puntos vs promedio de temporada [decimal]
│   ├── 2.1.4 Secuencia de resultados W/D/L (ej: W,W,D,L,W) [string]
│   ├── 2.1.5 Racha actual de invictos/derrotas consecutivas [integer]
│   ├── 2.1.6 Proporción de victorias en últimos N [decimal, 0.0 - 1.0]
│   ├── 2.1.7 Proporción de derrotas en últimos N [decimal, 0.0 - 1.0]
│   └── 2.1.8 Resultados con handicap en últimos N [decimal vs línea esperada]
│
├── 2.2 Forma en Goles
│   ├── 2.2.1 Goles marcados por partido en últimos N [decimal]
│   ├── 2.2.2 Goles encajados por partido en últimos N [decimal]
│   ├── 2.2.3 Diferencia de goles en últimos N [integer]
│   ├── 2.2.4 Cambio en goles marcados vs promedio temporada [decimal]
│   ├── 2.2.5 Cambio en goles encajados vs promedio temporada [decimal]
│   ├── 2.2.6 BTTS (Both Teams To Score) rate en últimos N [decimal]
│   └── 2.2.7 Over 2.5 rate en partidos recientes [decimal]
│
├── 2.3 Forma por Contexto
│   ├── 2.3.1 Forma en casa (últimos N locales) [pts/partido]
│   ├── 2.3.2 Forma fuera (últimos N visitantes) [pts/partido]
│   ├── 2.3.3 Forma vs rivales de nivel similar (últimos N) [pts/partido]
│   ├── 2.3.4 Forma vs rivales de nivel superior [pts/partido]
│   └── 2.3.5 Forma vs rivales de nivel inferior [pts/partido]
│
├── 2.4 Momentum (Tendencia)
│   ├── 2.4.1 Pendiente de puntos en ventanas móviles [pendiente lineal]
│   ├── 2.4.2 Diferencia entre últimos N2 y N1 [pts/partido delta]
│   ├── 2.4.3 Dirección de la tendencia (mejora/empeora/estable) [categórico]
│   └── 2.4.4 Aceleración del cambio (segunda derivada) [decimal]
│
├── 2.5 Forma en Estadísticas de Proceso (vs Resultado)
│   ├── 2.5.1 Tiros totales por partido en últimos N [integer]
│   ├── 2.5.2 Tiros a puerta por partido en últimos N [integer]
│   ├── 2.5.3 Posesión promedio en últimos N [decimal, %]
│   ├── 2.5.4 Corners ganados/perdidos en últimos N [ratio]
│   ├── 2.5.5 Faltas cometidas/recibidas en últimos N [ratio]
│   └── 2.5.6 Tarjetas recibidas en últimos N [promedio]
│
└── 2.6 Calidad de la Oposición en la Muestra Reciente
    ├── 2.6.1 Ranking promedio de rivales enfrentados en últimos N [avg rank]
    ├── 2.6.2 Proporción de partidos como local/visitante en últimos N [decimal]
    └── 2.6.3 Proporción de partidos contra top/bottom 5 en últimos N [decimal]
```

#### Dimensiones Conflictivas

**¿Qué N usar?**
- N=5: Captura momentum actual pero es ruidoso (muestra pequeña)
- N=10: Balance entre señal y ruido
- N=20: Más representativo pero puede ocultar cambios recientes de tendencia
- **Solución:** No elegir un N, sino evaluar múltiples ventanas simultáneamente

**Resultado vs Proceso:**
- Un equipo puede ganar jugando mal (suerte) o perder jugando bien (mala suerte)
- Las estadísticas de proceso (tiros, posesión) pueden anticipar una reversión a la media
- **Conclusión:** Ambas dimensiones son necesarias, ninguna es suficiente por sí sola

**Forma vs Calidad Base:**
- Un equipo malo en buena racha sigue siendo un equipo malo
- Un equipo bueno en mala racha sigue siendo un equipo bueno
- **Indicador clave:** Desviación de la forma respecto al promedio de la temporada

---

## Categoría 3: Factor Localía / Visitante

### Concepto General: "Jugar en casa da ventaja"

#### Descomposición

```
Factor Localía / Visitante
├── 3.1 Ventaja de Localía del Equipo
│   ├── 3.1.1 Puntos por partido en casa [decimal]
│   ├── 3.1.2 Puntos por partido fuera de casa [decimal]
│   ├── 3.1.3 Diferencia localía (casa - fuera) [pts/partido]
│   ├── 3.1.4 Ratio localía (casa / fuera) [decimal]
│   ├── 3.1.5 Promedio de goles marcados en casa vs fuera [ratio]
│   ├── 3.1.6 Promedio de goles encajados en casa vs fuera [ratio]
│   └── 3.1.7 Diferencia de goles (casa - fuera) [por partido]
│
├── 3.2 Ventaja de Localía de la Liga
│   ├── 3.2.1 Promedio de puntos locales en la liga [decimal]
│   ├── 3.2.2 Ratio Victorias Local / Victorias Visitante en la liga [decimal]
│   ├── 3.2.3 Diferencia media de goles local-visitante en la liga [decimal]
│   └── 3.2.4 Ranking del equipo en dependencia de localía [rank]
│
├── 3.3 Componentes de la Localía
│   ├── 3.3.1 Distancia de viaje del visitante [km]
│   ├── 3.3.2 Diferencia horaria si aplica [horas]
│   ├── 3.3.3 Historial del equipo en el estadio específico [pts/partido]
│   ├── 3.3.4 Capacidad del estadio [integer]
│   └── 3.3.5 Rendimiento del equipo con público vs sin público [pts/partido]
│
└── 3.4 Contexto de Localía
    ├── 3.4.1 Partidos consecutivos en casa (seguidos) [integer]
    ├── 3.4.2 Partidos consecutivos fuera (seguidos) [integer]
    ├── 3.4.3 Rendimiento en casa vs rivales de nivel similar [pts/partido]
    ├── 3.4.4 Rendimiento fuera vs rivales de nivel similar [pts/partido]
    └── 3.4.5 Resultado del partido de ida (si aplica) [resultado]
```

#### Preguntas que permite responder

- ¿Este equipo es excepcionalmente fuerte en casa o solo normal?
- ¿La ventaja de localía del equipo es mayor/menor que el promedio de la liga?
- ¿El equipo visitante sufre especialmente fuera de casa?
- ¿Hay algún factor geográfico (viaje, altitud) que sea relevante?

---

## Categoría 4: Disponibilidad de Jugadores

### Concepto General: "Quién juega y quién no"

#### Descomposición

```
Disponibilidad de Jugadores
├── 4.1 Ausencias Confirmadas
│   ├── 4.1.1 Número de titulares habituales ausentes [integer]
│   ├── 4.1.2 Número de jugadores en la plantilla ausentes [integer]
│   ├── 4.1.3 Minutos totales de los ausentes en la temporada [integer]
│   ├── 4.1.4 Goles/Asistencias de los ausentes [integer]
│   ├── 4.1.5 Posiciones afectadas por las ausencias [lista: GK, DEF, MID, FWD]
│   ├── 4.1.6 Valor de mercado total de los ausentes [integer, EUR]
│   └── 4.1.7 Proporción de minutos de plantilla perdidos [decimal]
│
├── 4.2 Ausencias por Impacto
│   ├── 4.2.1 ¿Está ausente el jugador más valioso del equipo? [boolean]
│   ├── 4.2.2 ¿Está ausente el capitán / líder del equipo? [boolean]
│   ├── 4.2.3 ¿Está ausente el máximo goleador? [boolean]
│   ├── 4.2.4 ¿Está ausente el portero titular? [boolean]
│   ├── 4.2.5 ¿Está ausente el creador de juego principal? [boolean]
│   └── 4.2.6 Número de bajas en la misma línea (ej: 2 defensas) [integer]
│
├── 4.3 Reemplazos y Profundidad
│   ├── 4.3.1 Calidad del reemplazo en cada posición afectada [subjetivo o proxy]
│   ├── 4.3.2 Experiencia del reemplazo (minutos jugados) [integer]
│   ├── 4.3.3 Rendimiento del equipo sin el jugador ausente (histórico) [pts/partido]
│   └── 4.3.4 ¿El reemplazo es titular consolidado o debutante? [categórico]
│
├── 4.4 Dudas y Lesiones Leves
│   ├── 4.4.1 Número de jugadores con duda [integer]
│   ├── 4.4.2 Probabilidad estimada de que jueguen [decimal, 0.0 - 1.0]
│   └── 4.4.3 Impacto potencial si no juegan [alto/medio/bajo]
│
└── 4.5 Sanciones / Acumulación de Tarjetas
    ├── 4.5.1 Jugadores al borde de suspensión (4 tarjetas) [integer]
    ├── 4.5.2 Riesgo de expulsión durante el partido [basado en historial]
    └── 4.5.3 Jugadores que vuelven de suspensión [integer]
```

#### Nota sobre fuentes

Las lesiones y sanciones **no están disponibles en Football-Data.org**. Esto representa una limitación importante que debe reconocerse explícitamente. Las variables proxy que pueden obtenerse de la API son limitadas:

- **Proxy 1:** Analizar partidos previos para detectar ausencias en alineaciones pasadas
- **Proxy 2:** Usar estadísticas de tarjetas para inferir riesgos de suspensión
- **Proxy 3:** Identificar patrones de rotación de entrenadores

---

## Categoría 5: Factores Tácticos

### Concepto General: "Cómo juega cada equipo"

#### Descomposición

```
Factores Tácticos
├── 5.1 Formación y Estructura
│   ├── 5.1.1 Formación más utilizada en la temporada [ej: 4-3-3]
│   ├── 5.1.2 Formación más utilizada en últimos 5 partidos [ej: 4-2-3-1]
│   ├── 5.1.3 Flexibilidad táctica (formaciones distintas usadas) [integer]
│   ├── 5.1.4 Cambios de formación durante partidos [frecuencia]
│   └── 5.1.5 Formación del rival (misma descomposición)
│
├── 5.2 Estilo de Juego
│   ├── 5.2.1 Posesión promedio [decimal, %]
│   ├── 5.2.2 Posesión vs rivales de nivel similar [decimal, %]
│   ├── 5.2.3 Tiros totales por partido [integer]
│   ├── 5.2.4 Tiros a puerta por partido [integer]
│   ├── 5.2.5 Eficiencia de conversión (goles/tiro) [decimal]
│   ├── 5.2.6 Pases por minuto de posesión [decimal]
│   ├── 5.2.7 Precisión de pases [decimal, %]
│   └── 5.2.8 Proporción de juego por bandas vs centro [ratio]
│
├── 5.3 Estilo Defensivo
│   ├── 5.3.1 Línea defensiva (alta/media/baja) [categórico]
│   ├── 5.3.2 Intensidad de presión (recuperaciones en campo rival) [frecuencia]
│   ├── 5.3.3 Faltas cometidas por partido [integer]
│   ├── 5.3.4 Fuera de juego provocados [integer]
│   └── 5.3.5 Corners concedidos por partido [integer]
│
├── 5.4 A Balón Parado
│   ├── 5.4.1 Goles de set piece marcados [integer]
│   ├── 5.4.2 Goles de set piece encajados [integer]
│   ├── 5.4.3 Proporción de goles de set piece sobre total [decimal]
│   └── 5.4.4 Eficiencia defensiva en set pieces [goles encajados/partido]
│
├── 5.5 Matchup Táctico
│   ├── 5.5.1 Historial de enfrentamientos entre los entrenadores [W/D/L]
│   ├── 5.5.2 Rendimiento del equipo A vs equipos que juegan como el B [pts/partido]
│   ├── 5.5.3 Rendimiento del equipo B vs equipos que juegan como el A [pts/partido]
│   └── 5.5.4 Compatibilidad de estilos (ventaja de un estilo sobre otro) [categórico]
│
└── 5.6 Gestión del Entrenador
    ├── 5.6.1 Antigüedad del entrenador en el club [días]
    ├── 5.6.2 Experiencia del entrenador en la liga [partidos]
    ├── 5.6.3 Promedio de cambios por partido [integer]
    ├── 5.6.4 Minuto promedio de la primera sustitución [minuto]
    └── 5.6.5 Historial de rotaciones antes de partidos importantes [categórico]
```

#### Limitaciones de Football-Data.org para variables tácticas

| Variable | Disponible en API |
|----------|-------------------|
| Formación | Sí (post-partido, en partidos individuales) |
| Posesión | Sí (post-partido) |
| Tiros | Sí (post-partido) |
| Matchup entrenadores | No explícitamente |
| Estilo defensivo | No explícitamente |
| Set pieces | Parcialmente (tiros de esquina) |

---

## Categoría 6: Factores Motivacionales y Contextuales

### Concepto General: "¿Qué tan importante es este partido para cada equipo?"

#### Descomposición

```
Factores Motivacionales
├── 6.1 Importancia Competitiva
│   ├── 6.1.1 Diferencia de puntos con el próximo objetivo [integer]
│   │   ├── 6.1.1.a Puntos de distancia del líder (si aplica)
│   │   ├── 6.1.1.b Puntos de distancia del puesto de Champions
│   │   ├── 6.1.1.c Puntos de distancia del descenso
│   │   └── 6.1.1.d Puntos de distancia del puesto de Europa League
│   ├── 6.1.2 Partidos restantes en la temporada [integer]
│   ├── 6.1.3 Importancia del partido para el objetivo primario [subjetivo 1-5]
│   └── 6.1.4 ¿El equipo tiene algo que ganar/perder? [categórico]
│
├── 6.2 Presión y Expectativas
│   ├── 6.2.1 Presión del resultado (palabras del entrenador en prensa) [análisis textual]
│   ├── 6.2.2 Reacción del mercado de apuestas a noticias recientes [proxy de mercado]
│   ├── 6.2.3 Historial del equipo en partidos "importantes" [pts/partido]
│   ├── 6.2.4 Rendimiento en partidos decisivos (últimas 5 jornadas) [pts/partido]
│   └── 6.2.5 Rendimiento con el líder/perseguidor en casa [pts/partido]
│
├── 6.3 Fatiga y Gestión de Esfuerzo
│   ├── 6.3.1 Días de descanso desde el último partido [integer]
│   ├── 6.3.2 Días de descanso del rival [integer]
│   ├── 6.3.3 Diferencia de descanso (local - visitante) [integer]
│   ├── 6.3.4 Partidos en los últimos 7 días [integer]
│   ├── 6.3.5 Minutos jugados por titulares en la última semana [integer]
│   ├── 6.3.6 ¿Hubo partido entre semana (copa/Champions)? [boolean]
│   ├── 6.3.7 Distancia del partido más reciente (viaje post-partido) [km]
│   └── 6.3.8 Próximo partido importante en < 72h? [boolean]
│
├── 6.4 Dinámica del Vestuario
│   ├── 6.4.1 Cambio de entrenador reciente (< 5 partidos) [boolean]
│   ├── 6.4.2 Efecto "nuevo entrenador" (pts/partido post-cambio) [decimal]
│   ├── 6.4.3 Conflictos públicos en el club [frecuencia reciente]
│   ├── 6.4.4 Rumores de mercado de fichajes afectando al equipo [subjetivo]
│   ├── 6.4.5 Jugadores en año de contrato (buscando renovación/traspaso) [integer]
│   └── 6.4.6 Descontento de la afición (protestas, silbidos) [subjetivo]
│
└── 6.5 Factores Externos
    ├── 6.5.1 Clima pronosticado [lluvia/nieve/viento/calor extremo]
    ├── 6.5.2 Temperatura al momento del partido [°C]
    ├── 6.5.3 Probabilidad de lluvia [decimal, %]
    ├── 6.5.4 Estado del campo (reciente lluvia, mantenimiento) [subjetivo]
    ├── 6.5.5 Altitud del estadio [metros]
    ├── 6.5.6 ¿Partido a puerta cerrada? [boolean]
    └── 6.5.7 Fecha especial (derbi, aniversario, homenaje) [boolean]
```

#### Dimensión No Reducible

La motivación es inherentemente difícil de medir con datos. Los factores anteriores son **aproximaciones** que pueden no capturar la realidad. Un equipo sin nada que jugar puede ganar por orgullo profesional. Un equipo con todo en juego puede paralizarse por la presión.

**Proxy disponible en Football-Data.org:** 
- La posición en tabla y los puntos de distancia son calculables.
- El historial en partidos similares puede inferirse de resultados pasados.
- La fatiga (días de descanso) puede calcularse del calendario de partidos.
- El resto de variables requieren fuentes externas.

---

## Categoría 7: Producción de Goles

### Concepto General: "¿Cuántos goles se esperan en el partido?"

#### Descomposición

```
Producción de Goles
├── 7.1 Capacidad Ofensiva del Equipo Local
│   ├── 7.1.1 Goles por partido en casa [decimal]
│   ├── 7.1.2 Goles por partido en casa últimos 5 [decimal]
│   ├── 7.1.3 Goles por partido en casa vs rivales de defensa comparable [decimal]
│   ├── 7.1.4 Minutos por gol en casa [decimal]
│   ├── 7.1.5 Tiros a puerta por partido en casa [decimal]
│   └── 7.1.6 Tasa de conversión (goles/tiro a puerta) [decimal]
│
├── 7.2 Capacidad Ofensiva del Equipo Visitante
│   ├── 7.2.1 Goles por partido fuera [decimal]
│   ├── 7.2.2 Goles por partido fuera últimos 5 [decimal]
│   ├── 7.2.3 Goles por partido fuera vs rivales de defensa comparable [decimal]
│   ├── 7.2.4 Minutos por gol fuera [decimal]
│   ├── 7.2.5 Tiros a puerta por partido fuera [decimal]
│   └── 7.2.6 Tasa de conversión fuera (goles/tiro a puerta) [decimal]
│
├── 7.3 Vulnerabilidad Defensiva del Local
│   ├── 7.3.1 Goles encajados por partido en casa [decimal]
│   ├── 7.3.2 Goles encajados por partido en casa últimos 5 [decimal]
│   ├── 7.3.3 Clean sheets en casa [frecuencia y ratio]
│   └── 7.3.4 Tiros a puerta recibidos en casa [decimal]
│
├── 7.4 Vulnerabilidad Defensiva del Visitante
│   ├── 7.4.1 Goles encajados por partido fuera [decimal]
│   ├── 7.4.2 Goles encajados por partido fuera últimos 5 [decimal]
│   ├── 7.4.3 Clean sheets fuera [frecuencia y ratio]
│   └── 7.4.4 Tiros a puerta recibidos fuera [decimal]
│
├── 7.5 Producción Combinada Esperada
│   ├── 7.5.1 Total de goles esperado: ataque local + ataque visitante [decimal]
│   ├── 7.5.2 Ambos equipos marcan (BTTS) rate en partidos del local [decimal]
│   ├── 7.5.3 BTTS rate en partidos del visitante [decimal]
│   ├── 7.5.4 Over/under 2.5 en partidos del local [ratio]
│   ├── 7.5.5 Over/under 2.5 en partidos del visitante [ratio]
│   └── 7.5.6 Historial directo de goles entre ambos equipos [promedio]
│
├── 7.6 Distribución Temporal de Goles
│   ├── 7.6.1 Goles en primera mitad por equipo [promedio]
│   ├── 7.6.2 Goles en segunda mitad por equipo [promedio]
│   ├── 7.6.3 Goles en últimos 15 minutos por equipo [promedio]
│   ├── 7.6.4 Goles de penalti recibidos/convertidos [frecuencia]
│   └── 7.6.5 Goles en tiempo de descuento [frecuencia]
│
└── 7.7 Indicadores de Proceso Ofensivo
    ├── 7.7.1 Corners ganados por partido [decimal]
    ├── 7.7.2 Fueras de juego provocados [decimal]
    ├── 7.7.3 Faltas recibidas cerca del área [decimal]
    └── 7.7.4 Penaltis recibidos [frecuencia]
```

#### Relaciones Clave para Modelar

```
Expected Total Goals (ETG) ≈ Atq_Local × Def_Visitante + Atq_Visitante × Def_Local
BTTS Probabilidad ≈ f(marcar local) × f(marcar visitante)
Over 2.5 ≈ f(ETG > 2.5 threshold)
```

---

## Categoría 8: Arbitraje

### Concepto General: "¿Cómo influye el árbitro en el partido?"

#### Descomposición

```
Arbitraje
├── 8.1 Perfil del Árbitro
│   ├── 8.1.1 Identidad del árbitro asignado [id/nombre]
│   ├── 8.1.2 Experiencia (partidos arbitrados en la liga) [integer]
│   ├── 8.1.3 Promedio de tarjetas amarillas por partido [decimal]
│   ├── 8.1.4 Promedio de tarjetas rojas por partido [decimal]
│   ├── 8.1.5 Promedio de faltas señaladas por partido [decimal]
│   ├── 8.1.6 Promedio de penaltis señalados por partido [decimal]
│   └── 8.1.7 Tendencia: ¿arbitra más o menos faltas que el promedio? [categórico]
│
├── 8.2 Sesgos del Árbitro
│   ├── 8.2.1 Diferencia de tarjetas local vs visitante [ratio]
│   ├── 8.2.2 Proporción de penaltis para local vs visitante [ratio]
│   ├── 8.2.3 Promedio de minutos de descuento [decimal]
│   └── 8.2.4 ¿Tiende a compensar decisiones polémicas? [subjetivo]
│
├── 8.3 Historial del Árbitro con los Equipos
│   ├── 8.3.1 Número de veces que arbitró al equipo local [integer]
│   ├── 8.3.2 Resultado del equipo local cuando arbitró X [W/D/L ratio]
│   ├── 8.3.3 Promedio de tarjetas al equipo local por X [decimal]
│   ├── 8.3.4 Número de veces que arbitró al equipo visitante [integer]
│   ├── 8.3.5 Resultado del equipo visitante cuando arbitró X [W/D/L ratio]
│   └── 8.3.6 Promedio de tarjetas al equipo visitante por X [decimal]
│
└── 8.4 Impacto del VAR
    ├── 8.4.1 ¿VAR disponible en la competición? [boolean]
    ├── 8.4.2 Promedio de revisiones VAR por partido en la competición [decimal]
    ├── 8.4.3 Proporción de decisiones modificadas por VAR [decimal]
    └── 8.4.4 Influencia del VAR en goles anulados/validados [frecuencia]
```

---

## Categoría 9: Mercado y Valor

### Concepto General: "¿Hay valor en la cuota?"

#### Descomposición

```
Mercado y Valor
├── 9.1 Cuotas y Probabilidades
│   ├── 9.1.1 Cuota actual para 1 (local) [decimal]
│   ├── 9.1.2 Cuota actual para X (empate) [decimal]
│   ├── 9.1.3 Cuota actual para 2 (visitante) [decimal]
│   ├── 9.1.4 Cuota de over/under 2.5 [decimal]
│   ├── 9.1.5 Cuota de BTTS (ambos marcan) [decimal]
│   ├── 9.1.6 Cuota de handicap (-0.5, -1, etc.) [decimal]
│   └── 9.1.7 Probabilidad implícita de cada cuota (1 / cuota) [decimal]
│
├── 9.2 Movimiento de Cuotas
│   ├── 9.2.1 Cuota de apertura vs cuota actual [delta]
│   ├── 9.2.2 Dirección del movimiento (sube/baja/estable) [categórico]
│   ├── 9.2.3 Magnitud del movimiento en % [decimal]
│   ├── 9.2.4 Tiempo del movimiento (cuándo cambió) [timestamp]
│   └── 9.2.5 Volumen de mercado estimado [proxy]
│
├── 9.3 Comparación entre Casas de Apuestas
│   ├── 9.3.1 Mejor cuota disponible para cada resultado [decimal]
│   ├── 9.3.2 Diferencia entre la mejor cuota y la peor [spread]
│   └── 9.3.3 ¿Hay arbitraje entre casas? (cobertura total > 1) [boolean]
│
├── 9.4 Edge (Ventaja)
│   ├── 9.4.1 Probabilidad estimada por el analista (P_local, P_empate, P_visitante) [decimal]
│   ├── 9.4.2 Probabilidad implícita de la cuota [decimal]
│   ├── 9.4.3 Edge: P_analista - P_implícita [decimal]
│   ├── 9.4.4 Valor esperado: (Probabilidad estimada × Cuota) - 1 [decimal]
│   └── 9.4.5 ¿Edge > umbral mínimo (> 2% o > 5%)? [boolean]
│
├── 9.5 Gestión de Riesgo
│   ├── 9.5.1 Fracción de Kelly óptima [decimal]
│   ├── 9.5.2 Tamaño de apuesta recomendado [% del bankroll]
│   ├── 9.5.3 Riesgo de bancarrota si se apuesta [decimal]
│   └── 9.5.4 Correlación con otras apuestas activas [decimal]
│
└── 9.6 Mercados Alternativos
    ├── 9.6.1 Cuota de equipo X marca primer gol [decimal]
    ├── 9.6.2 Cuota de resultado al descanso [decimal]
    ├── 9.6.3 Cuota de doble oportunidad (1X, X2, 12) [decimal]
    ├── 9.6.4 Cuota de número exacto de goles [decimal]
    └── 9.6.5 Cuota de resultado en ambos tiempos [decimal]
```

#### Limitación Fundamental

Las cuotas **no están disponibles en Football-Data.org Free**. El endpoint de odds retorna:

```json
"odds": {
  "msg": "Activate Odds-Package in User-Panel to retrieve odds."
}
```

Esto significa que el análisis de valor requiere una **fuente de datos complementaria** de cuotas en vivo.

---

## Categoría 10: Historial Directo (Head-to-Head)

### Concepto General: "¿Cómo les fue cuando se enfrentaron antes?"

#### Descomposición

```
Historial Directo
├── 10.1 Resultados Históricos
│   ├── 10.1.1 Total de enfrentamientos [integer]
│   ├── 10.1.2 Victorias del equipo local en el historial [integer]
│   ├── 10.1.3 Empates en el historial [integer]
│   ├── 10.1.4 Victorias del equipo visitante en el historial [integer]
│   ├── 10.1.5 Proporción de victorias local/visitante/empate [decimal]
│   └── 10.1.6 Diferencia de goles acumulada [integer]
│
├── 10.2 Enfrentamientos en el Estadio Actual
│   ├── 10.2.1 Partidos jugados en este estadio [integer]
│   ├── 10.2.2 Resultados del local en este estadio [W/D/L]
│   └── 10.2.3 Promedio de goles en este estadio en estos enfrentamientos [decimal]
│
├── 10.3 Enfrentamientos Recientes
│   ├── 10.3.1 Últimos N enfrentamientos (N=5, 10) [resultados]
│   ├── 10.3.2 Tendencia reciente en enfrentamientos [W/D/L última]
│   ├── 10.3.3 Goles promedio en últimos enfrentamientos [decimal]
│   └── 10.3.4 BTTS rate en últimos enfrentamientos [decimal]
│
└── 10.4 Contexto de los Enfrentamientos
    ├── 10.4.1 ¿Son estos equipos diferentes ahora? (cambios de plantilla) [subjetivo]
    ├── 10.4.2 ¿Los enfrentamientos fueron en la misma competición? [boolean]
    ├── 10.4.3 Relevancia temporal (¿cuándo fue el último?) [días]
    └── 10.4.4 ¿Coinciden con la misma dirección técnica? [boolean]
```

---

## Mapa de Dependencias entre Variables

```
Nivel 1: Datos Primarios (obtenidos directamente de fuente)
├── Resultados de partidos (score, goles, tarjetas, etc.)
├── Posiciones y puntos
├── Cuotas actuales
├── Lesiones y sanciones
└── Calendario de partidos

Nivel 2: Métricas Derivadas Simples
├── Puntos por partido = puntos / partidos
├── Diferencia de goles = GF - GA
├── Clean sheet rate = CS / partidos
├── BTTS rate = BTTS partidos / total
└── Eficiencia de conversión = goles / tiros

Nivel 3: Métricas Derivadas Compuestas
├── Forma ajustada por oposición
├── Rendimiento local ajustado por calidad del rival
├── Expected Goals proxy (basado en tiros y localía)
└── Valor esperado de la apuesta (edge)

Nivel 4: Modelos Integrados
├── Probabilidad estimada de cada resultado (1/X/2)
├── Distribución de goles esperada
├── Evaluación de mercados alternativos
└── Recomendación de apuesta con tamaño óptimo
```

---

## Principios para la Fase Posterior

1. **No forzar datos donde no existen.** Si Football-Data.org no proporciona lesiones, no se inventan. Se reconoce la limitación.

2. **Proxies son admisibles si se documentan.** Ej: usar goles encajados recientes como proxy de solidez defensiva, no como sustituto de lesiones del defensor titular.

3. **Granularidad no es complejidad.** Más variables no siempre significa mejor modelo. El objetivo es granularidad conceptual, no inflación de datos.

4. **Validación cruzada.** Toda variable debe poder ser calculada y verificada. Si no puede medirse de forma reproducible, no es una variable.

5. **El contexto importa.** Una variable sin contexto (goles por partido sin considerar oposición) es engañosa. Siempre documentar las condiciones de la medición.