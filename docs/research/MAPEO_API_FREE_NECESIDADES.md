# Mapeo: Necesidades de Información → Football-Data.org Free

**Propósito:** Traducir las necesidades de información prepartido en consultas concretas a la API, clasificando cada recurso por su ámbito de reutilización y documentando limitaciones.

---

## 1. Clasificación de Recursos por Ámbito

La optimización de llamadas (10/min) exige distinguir entre recursos según su frecuencia de cambio y ámbito de aplicación.

| Ámbito | Endpoint | Frecuencia de cambio | Estrategia |
|--------|----------|---------------------|------------|
| **Competición** | `/v4/competitions/{code}/standings` | Por jornada | 86400s (24h) |
| **Competición** | `/v4/competitions/{code}/scorers` | Por jornada | 86400s (24h) |
| **Competición** | `/v4/competitions/{code}/teams` | Por temporada | 604800s (7d) |
| **Equipo** | `/v4/teams/{id}` | Por temporada | 604800s (7d) |
| **Equipo** | `/v4/teams/{id}/matches` | Post-partido | 3600s (1h) |
| **Partido** | `/v4/matches/{id}` | Post-partido | Bajo demanda |
| **Partido** | `/v4/matches/{id}/head2head` | Solo nuevo partido | 604800s (7d) |
| **Transversal** | `/v4/matches?dateFrom=&dateTo=` | Diario | 86400s (24h) |

**Regla:** Los recursos de ámbito Competición se consultan una vez y se reutilizan para todos los partidos de esa liga. Los de ámbito Equipo se consultan una vez por equipo analizado. Los de ámbito Partido se consultan por matchup específico.

---

## 2. Mapeo Detallado: Necesidad → Endpoint → Valor

### 2.1 Calidad Relativa de los Equipos

| Variable | Endpoint | Filtros | Procesamiento | Satisfacción |
|----------|----------|---------|---------------|--------------|
| Posición en tabla | `competitions/{code}/standings` | `season` | Extraer `table[].position` por teamId | **Completa** |
| Puntos totales | `competitions/{code}/standings` | `season` | Extraer `table[].points` por teamId | **Completa** |
| Diferencia de goles | `competitions/{code}/standings` | `season` | Extraer `table[].goalDifference` | **Completa** |
| Puntos por partido | `competitions/{code}/standings` | `season` | points / playedGames | **Derivable** |
| Goles a favor/contra | `competitions/{code}/standings` | `season` | goalsFor, goalsAgainst | **Completa** |
| Forma (W/D/L) | `competitions/{code}/standings` | `season` | `table[].form` (string ej: "W,W,L") | **Completa** |
| Rendimiento local | `competitions/{code}/standings` | `season` | Array `standings[].type="HOME"` | **Completa** |
| Rendimiento visitante | `competitions/{code}/standings` | `season` | Array `standings[].type="AWAY"` | **Completa** |
| Valor de plantilla | `teams/{id}` | — | `marketValue` del equipo | **Completa** |
| Jugadores por posición | `teams/{id}` | — | `squad[].position` | **Completa** |

### 2.2 Forma Reciente (Últimos N Partidos)

| Variable | Endpoint | Filtros | Procesamiento | Satisfacción |
|----------|----------|---------|---------------|--------------|
| Últimos N resultados | `teams/{id}/matches` | `status=FINISHED, limit=N, season` | Extraer `score.winner` de cada match | **Completa** |
| Goles en últimos N | `teams/{id}/matches` | `status=FINISHED, limit=N, season` | Sumar `score.fullTime.home/away` | **Completa** |
| BTTS en últimos N | `teams/{id}/matches` | `status=FINISHED, limit=N, season` | Calcular si ambos marcaron | **Derivable** |
| Over/Under en últimos N | `teams/{id}/matches` | `status=FINISHED, limit=N, season` | Sumar goles totales > 2.5 | **Derivable** |
| Estadísticas proceso | `teams/{id}/matches` | `X-Unfold-Bookings, X-Unfold-Goals, X-Unfold-Subs, X-Unfold-Lineups` | Solo disponible si se despliegan headers | **Parcial** |
| Tiros/Posesión | `matches/{id}` (individual) | — | `score.homeTeam.statistics` | **Parcial** (solo en recurso individual) |

### 2.3 Factor Localía / Visitante

| Variable | Endpoint | Filtros | Procesamiento | Satisfacción |
|----------|----------|---------|---------------|--------------|
| Puntos como local | `competitions/{code}/standings` | `season` | Standings type="HOME" | **Completa** |
| Puntos como visitante | `competitions/{code}/standings` | `season` | Standings type="AWAY" | **Completa** |
| Resultados en casa | `teams/{id}/matches` | `venue=HOME, status=FINISHED, limit=N` | Filtrar por venue | **Completa** |
| Resultados fuera | `teams/{id}/matches` | `venue=AWAY, status=FINISHED, limit=N` | Filtrar por venue | **Completa** |
| Estadio del equipo | `teams/{id}` | — | `venue` del equipo | **Completa** |

### 2.4 Producción de Goles

| Variable | Endpoint | Filtros | Procesamiento | Satisfacción |
|----------|----------|---------|---------------|--------------|
| Goles a favor (total) | `competitions/{code}/standings` | `season` | goalsFor | **Completa** |
| Goles en contra (total) | `competitions/{code}/standings` | `season` | goalsAgainst | **Completa** |
| Goles a favor local | `competitions/{code}/standings` | `season, type=HOME` | goalsFor en HOME | **Completa** |
| Goles en contra local | `competitions/{code}/standings` | `season, type=HOME` | goalsAgainst en HOME | **Completa** |
| Goles a favor visitante | `competitions/{code}/standings` | `season, type=AWAY` | goalsFor en AWAY | **Completa** |
| Goles en contra visitante | `competitions/{code}/standings` | `season, type=AWAY` | goalsAgainst en AWAY | **Completa** |
| Goles recientes | `teams/{id}/matches` | `status=FINISHED, limit=N` | Sumar goles por partido | **Completa** |
| Goles encajados recientes | `teams/{id}/matches` | `status=FINISHED, limit=N` | Sumar goles rival | **Completa** |

### 2.5 Historial Directo (Head-to-Head)

| Variable | Endpoint | Filtros | Procesamiento | Satisfacción |
|----------|----------|---------|---------------|--------------|
| Victorias/Derrotas/Empates | `matches/{id}/head2head` | `limit=N` | `aggregates.homeTeam/awayTeam` | **Completa** |
| Resultados enfrentamientos | `matches/{id}/head2head` | `limit=N` | `matches[].score` | **Completa** |
| Goles en enfrentamientos | `matches/{id}/head2head` | `limit=N` | Sumar goles de `matches[].score` | **Completa** |

### 2.6 Goleadores y Jugadores Clave

| Variable | Endpoint | Filtros | Procesamiento | Satisfacción |
|----------|----------|---------|---------------|--------------|
| Máximos goleadores | `competitions/{code}/scorers` | `season, limit` | `scorers[].goals` | **Completa** |
| Asistencias | `competitions/{code}/scorers` | `season, limit` | `scorers[].assists` | **Completa** |
| Penaltis convertidos | `competitions/{code}/scorers` | `season, limit` | `scorers[].penalties` | **Completa** |
| Datos del jugador | `persons/{id}` | — | posición, nacionalidad, equipo actual | **Completa** |
| Partidos del jugador | `persons/{id}/matches` | `lineup, limit` | Minutos, goles, tarjetas, suplencias | **Completa** |

### 2.7 Árbitro

| Variable | Endpoint | Filtros | Procesamiento | Satisfacción |
|----------|----------|---------|---------------|--------------|
| Árbitro asignado | `matches/{id}` | — | `referees[].name, type` | **Completa** |

### 2.8 Información del Partido Específico

| Variable | Endpoint | Filtros | Procesamiento | Satisfacción |
|----------|----------|---------|---------------|--------------|
| Fecha y hora | `matches/{id}` o listas | — | `utcDate` | **Completa** |
| Estado del partido | `matches/{id}` o listas | — | `status` (SCHEDULED, TIMED, FINISHED, etc.) | **Completa** |
| Jornada | `matches/{id}` o listas | — | `matchday` | **Completa** |
| Fase/Etapa | `matches/{id}` o listas | — | `stage` (REGULAR_SEASON, GROUP_STAGE, etc.) | **Completa** |
| Resultado completo | `matches/{id}` | — | FT, HT, Extra Time, Penales | **Completa** |
| Goles (minuto, tipo, asistencia) | `matches/{id}` | — | `goals[]` con minutero, tipo, asistente, score al momento | **Completa** |
| Formaciones | `matches/{id}` | — | `homeTeam.formation, awayTeam.formation` | **Completa** |

---

## 3. Necesidades No Satisfechas (Limitaciones Explícitas)

| Necesidad | Ausente en API | Impacto en análisis |
|-----------|----------------|---------------------|
| **Cuotas de apuestas** | Odds bloqueado (solo premium) | Imposible calcular edge sin cuotas externas |
| **Lesiones** | No existe en ningún endpoint | No se puede evaluar disponibilidad de jugadores clave |
| **Sanciones** | No existe en ningún endpoint | No se puede anticipar ausencias por tarjetas |
| **Alineación pre-partido** | Solo alineación post-partido | No se puede saber quién jugará titular |
| **Datos tácticos** | Sin datos estructurados de estilo | No se puede modelar matchup táctico |
| **Motivación/Contexto** | No cuantificable | No se puede incluir factor humano |
| **Estadísticas en vivo** | Sin streaming | No hay actualización durante el partido |

**Estas limitaciones deben documentarse en cada análisis que se entregue.** No se intenta suplirlas con datos externos; se reconoce que el análisis está incompleto en esas dimensiones.

---

## 4. Conjunto Base Recomendado de Consultas

No es una secuencia fija. Es un menú del cual el agente selecciona según el contexto del análisis.

### Consultas de Competición (se hacen una vez, se reutilizan)

```
A. GET /v4/competitions/{code}/standings?season=YYYY
   → Ámbito: Competición. Proporciona tabla TOTAL, HOME, AWAY.
   → Incluye: posición, puntos, DG, goles F/A, forma (string), partidos jugados
   → Reutilizable para TODOS los partidos de esa competición en la sesión

B. GET /v4/competitions/{code}/scorers?season=YYYY&limit=10
   → Ámbito: Competición. Top goleadores con goles, asistencias, penaltis.
   → Reutilizable para TODOS los partidos de esa competición
```

### Consultas de Equipo (una por equipo, reutilizables el mismo día)

```
C. GET /v4/teams/{id}
   → Ámbito: Equipo. Plantilla, coach, valor mercado, estadio.
   → Proporciona contexto sobre la calidad de plantilla

D. GET /v4/teams/{id}/matches?status=FINISHED&limit=10&season=YYYY
   → Últimos 10 resultados del equipo (todas las competiciones)

E. GET /v4/teams/{id}/matches?status=FINISHED&venue=HOME&limit=5&season=YYYY
   → Últimos 5 como local (solo si el equipo juega en casa)

F. GET /v4/teams/{id}/matches?status=FINISHED&venue=AWAY&limit=5&season=YYYY
   → Últimos 5 como visitante (solo si el equipo juega fuera)
```

### Consultas de Partido (específicas del matchup)

```
G. GET /v4/matches/{matchId}
   → Partido específico: fecha, estado, resultado, goles, formaciones, árbitros

H. GET /v4/matches/{matchId}/head2head?limit=10
   → Historial directo entre los dos equipos
```

---

## 5. Decisiones Contextuales del Agente

| Situación | Decisión | Llamadas ahorradas |
|-----------|----------|--------------------|
| Se analizan 3 partidos de la misma liga | Consultar A y B una sola vez | 4 llamadas |
| El equipo ya fue analizado hoy en otro partido | Saltar C, D, E, F si están en caché | 4 llamadas |
| El matchup es de copa (sin historial en liga) | Consultar H igualmente | — |
| Solo interesa el resultado 1X2 (no goles) | Saltar consultas con unfold headers | 1-4 llamadas |
| El partido es de una competición ya cacheada | Usar standings/scorers existentes | 2 llamadas |
| No se necesita el árbitro | Saltar G si ya se tiene el matchId de listas | 1 llamada |

### Ejemplo 1: Partido único de Premier League (primera vez)

```
1. A → standings PL (1 llamada)
2. C → equipo local (1 llamada)
3. C → equipo visitante (1 llamada)
4. D → equipo local, últimos 10 (1 llamada)
5. D → equipo visitante, últimos 10 (1 llamada)
6. H → head2head (1 llamada)
Total: 6 llamadas (quedan 4/minuto)
```

### Ejemplo 2: Segundo partido de la misma liga (PL)

```
1. D → equipo local, últimos 10 (1 llamada)
2. D → equipo visitante, últimos 10 (1 llamada)
3. H → head2head (1 llamada)
Total: 3 llamadas (standings/scorers ya cacheados)
```

### Ejemplo 3: Análisis rápido (solo tabla + forma)

```
1. A → standings (1 llamada)
2. D → local, últimos 5 + D → visitante, últimos 5 (2 llamadas)
3. H → head2head (1 llamada)
Total: 4 llamadas
```

---

## 6. Guía para el Analista

### Orden de prioridad al decidir qué consultar:

1. **Standings** (si no está en caché): siempre, porque es la base de todo
2. **Últimos partidos de cada equipo**: forma reciente
3. **Head2head**: historial directo
4. **Scorers** (si no está en caché): peligro ofensivo
5. **Datos de equipo**: plantilla y contexto
6. **Partido individual**: solo si se necesita árbitro o detalles finos

### Lo que NO debe hacer el analista:

- Consultar el mismo endpoint dos veces si el resultado no cambió
- Hacer llamadas "por si acaso" a datos que no se usarán en el análisis
- Intentar obtener información que la API Free no proporciona
- Asumir que los datos están actualizados sin verificar el campo `lastUpdated`

---

## 7. Documento de Referencia Rápida

Tabla de consulta rápida para el agente durante el análisis:

```
┌────────────────────────────────────────────────────────────────┐
│                  REFERENCIA RÁPIDA: ENDPOINTS                  │
├────────┬──────────────────────────┬────────────┬───────────────┤
│ Ámbito │ Endpoint                 │ TTL (s)    │ Llamadas      │
├────────┼──────────────────────────┼────────────┼───────────────┤
│ C      │ /competitions/{code}/st  │ 86400s     │ 1/competición │
│ C      │ /competitions/{code}/sc  │ 86400s     │ 1/competición │
│ C      │ /competitions/{code}/te  │ 604800s    │ 1/competición │
│ E      │ /teams/{id}              │ 604800s    │ 1/equipo      │
│ E      │ /teams/{id}/matches      │ 3600s      │ variable      │
│ P      │ /matches/{id}            │ Bajo dem.  │ 1/partido     │
│ P      │ /matches/{id}/head2head  │ 604800s    │ 1/partido     │
└────────┴──────────────────────────┴────────────┴───────────────┘
  C=Competición, E=Equipo, P=Partido
  st=standings, sc=scorers, te=teams

* Los TTLs están sincronizados con ARCHITECTURE.md y la Regla de Oro (AGENTS.md).
```