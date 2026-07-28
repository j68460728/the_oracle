# Auditoría Integral: Football-Data.org API v4 (Plan Free)

**Fecha:** 2026-07-27
**Versión de API:** v4
**Plan de suscripción:** Free (TIER_ONE)
**Token utilizado:** [REDACTADO]

---

## Resumen Ejecutivo

Football-Data.org es una API REST que proporciona datos de fútbol con una arquitectura limpia y bien documentada. El plan Free ofrece acceso a **13 competiciones principales** con datos históricos extensos, pero con limitaciones importantes en tasa de solicitudes (10/min) y disponibilidad de datos en tiempo real.

**Cobertura principal:** Premier League, La Liga, Bundesliga, Serie A, Ligue 1, Eredivisie, Primeira Liga, Championship, Brasileirão, Champions League, Europa League, Conference League, Copa Libertadores, Eurocopa, Mundial.

---

## 1. Cobertura Funcional

### 1.1 Recursos Principales (Resources)

| Recurso | Endpoint | Métodos | Descripción |
|---------|----------|---------|-------------|
| **Area** | `/v4/areas` | GET | Países y continentes |
| **Competition** | `/v4/competitions` | GET | Ligas y copas |
| **Match** | `/v4/matches` | GET | Partidos |
| **Team** | `/v4/teams` | GET | Equipos |
| **Person** | `/v4/persons/{id}` | GET | Jugadores (individual) |

### 1.2 Subrecursos

| Subrecurso | Endpoint | Filtros disponibles |
|------------|----------|---------------------|
| **Competition/Standings** | `/v4/competitions/{code}/standings` | `season`, `matchday`, `date` |
| **Competition/Teams** | `/v4/competitions/{code}/teams` | `season` |
| **Competition/Matches** | `/v4/competitions/{code}/matches` | `season`, `matchday`, `status`, `dateFrom`, `dateTo`, `stage`, `group` |
| **Competition/Scorers** | `/v4/competitions/{code}/scorers` | `season`, `matchday` |
| **Team/Matches** | `/v4/teams/{id}/matches` | `dateFrom`, `dateTo`, `season`, `status`, `venue`, `limit` |
| **Person/Matches** | `/v4/persons/{id}/matches` | `lineup`, `e` (evento), `dateFrom`, `dateTo`, `competitions`, `limit`, `offset` |
| **Head2Head** | `/v4/matches/{id}/head2head` | `limit` |

### 1.3 Parámetros de Consulta Especiales

- **Atajos de fecha:** `YESTERDAY`, `TODAY`, `TOMORROW` (solo en `/v4/matches`)
- **Filtros de fecha:** `dateFrom`/`dateTo` (formato `yyyy-MM-dd`)
- **Límite de resultados:** `limit` (1-500)

### 1.4 Headers de Control de Respuesta

| Header | Valores | Efecto |
|--------|---------|--------|
| `X-Unfold-Lineups` | `true/false` | Incluir alineaciones en listas |
| `X-Unfold-Bookings` | `true/false` | Incluir tarjetas |
| `X-Unfold-Subs` | `true/false` | Incluir sustituciones |
| `X-Unfold-Goals` | `true/false` | Incluir goles |

**Nota:** Estos headers solo funcionan en endpoints de listas, no en recursos individuales.

---

## 2. Modelo de Datos

### 2.1 Entidades Principales

```
Area
├── id, name, countryCode, flag, parentAreaId, parentArea

Competition
├── id, name, code, type, emblem, plan
├── area (→ Area)
├── currentSeason (id, startDate, endDate, currentMatchday, winner)
└── seasons[] (historial completo)

Season
├── id, startDate, endDate, currentMatchday, winner, stages[]

Team
├── id, name, shortName, tla, crest, address, website, founded
├── clubColors, venue
├── area (→ Area)
├── runningCompetitions[] (→ Competition)
├── coach (id, name, nationality, contract)
├── squad[] (→ Person)
├── staff[]
└── marketValue

Person
├── id, name, firstName, lastName, dateOfBirth
├── nationality, position, shirtNumber
├── currentTeam (→ Team)
└── section

Match
├── id, utcDate, status, minute, injuryTime
├── attendance, venue, matchday, stage, group
├── area (→ Area)
├── competition (→ Competition)
├── season (→ Season)
├── homeTeam (→ Team + statistics + lineup + bench)
├── awayTeam (→ Team + statistics + lineup + bench)
├── score (winner, duration, fullTime, halfTime, regularTime, extraTime)
├── goals[] (minute, type, team, scorer, assist, score)
├── bookings[] (minute, team, player, card)
├── substitutions[] (minute, team, playerOut, playerIn)
├── penalties[] (player, team, scored)
├── referees[] (id, name, type, nationality)
└── odds (homeWin, draw, awayWin) [solo plan premium]
```

### 2.2 Enums Principales

| Campo | Valores |
|-------|---------|
| **Competition.type** | `LEAGUE`, `LEAGUE_CUP`, `CUP`, `PLAYOFFS` |
| **Match.status** | `SCHEDULED`, `TIMED`, `IN_PLAY`, `PAUSED`, `EXTRA_TIME`, `PENALTY_SHOOTOUT`, `FINISHED`, `SUSPENDED`, `POSTPONED`, `CANCELLED`, `AWARDED` |
| **Match.stage** | `FINAL`, `SEMI_FINALS`, `QUARTER_FINALS`, `LAST_16`, `GROUP_STAGE`, `REGULAR_SEASON`, etc. |
| **Score.duration** | `REGULAR`, `EXTRA_TIME`, `PENALTY_SHOOTOUT` |
| **Goal.type** | `REGULAR`, `OWN`, `PENALTY` |
| **Card.type** | `YELLOW`, `YELLOW_RED`, `RED` |
| **Person.position** | `Goalkeeper`, `Defence`, `Midfield`, `Offence` |

### 2.3 Identificadores

- **IDs numéricos** para todos los recursos
- **Códigos de liga** (ej: `PL`, `PD`, `BL1`) como alternativa a IDs
- **Consistencia:** Los IDs de equipos y personas son estables entre temporadas

---

## 3. Cobertura del Plan Free

### 3.1 Competiciones Disponibles (Verificadas)

| Código | Nombre | País/Región | Tipo |
|--------|--------|-------------|------|
| `PL` | Premier League | England | LEAGUE |
| `PD` | Primera Division | Spain | LEAGUE |
| `BL1` | Bundesliga | Germany | LEAGUE |
| `SA` | Serie A | Italy | LEAGUE |
| `FL1` | Ligue 1 | France | LEAGUE |
| `DED` | Eredivisie | Netherlands | LEAGUE |
| `PPL` | Primeira Liga | Portugal | LEAGUE |
| `ELC` | Championship | England | LEAGUE |
| `BSA` | Campeonato Brasileiro Série A | Brazil | LEAGUE |
| `CL` | UEFA Champions League | Europe | CUP |
| `EL` | UEFA Europa League | Europe | CUP |
| `CLI` | Copa Libertadores | South America | CUP |
| `EC` | European Championship | Europe | CUP |
| `WC` | FIFA World Cup | World | CUP |

### 3.2 Restricciones Documentadas vs Reales

| Aspecto | Documentado | Verificado |
|---------|-------------|------------|
| Tasa de solicitudes | 10/min (Free) | ✅ Confirmado (headers `X-RequestsAvailable`, `X-RequestCounter-Reset`) |
| Competiciones | TIER_ONE | ✅ 13 competiciones + Copa Libertadores (TIER_FOUR) |
| Cuotas de apuestas | Premium | ✅ Retorna `"msg": "Activate Odds-Package..."` |
| Alineaciones | Disponibles con headers | ⚠️ Solo en listas, no en recursos individuales |
| Personas | Individual | ✅ `/persons/{id}` funciona, `/persons` (lista) retorna 404 |
| Historial | Temporadas pasadas | ✅ Accesible con filtro `season` |

### 3.3 Restricciones No Documentadas

1. **Rate limiting estricto:** 10 solicitudes por minuto, sin tolerancia
2. **`YESTERDAY` no funciona** en subrecursos de competición, solo en `/v4/matches`
3. **Head2head:** Los aggregates muestran 0 para wins/draws/losses en algunos casos
4. **Alineaciones:** No disponibles即使 con headers en endpoints de competición
5. **Personas:** No existe endpoint de lista, solo individual

---

## 4. Calidad de los Datos

### 4.1 Consistencia

- ✅ **Formato de fechas:** ISO 8601 (`yyyy-MM-ddTHH:mm:ssZ`)
- ✅ **Scores como enteros** (no strings)
- ✅ **Null values:** Manejo consistente para campos no disponibles
- ✅ **IDs estables:** Equipos y personas mantienen IDs entre temporadas

### 4.2 Completitud

| Dato | Disponibilidad |
|------|----------------|
| Resultados (full-time, half-time) | ✅ Siempre |
| Goles con minutero | ✅ En partidos finalizados |
| Tarjetas | ✅ Con unfold headers |
| Sustituciones | ✅ Con unfold headers |
| Alineaciones | ⚠️ Parcial (solo listas con headers) |
| Asistencia | ⚠️ No siempre disponible |
| Árbitros | ✅ Disponible |
| Cuotas | ❌ Solo premium |
| Estadísticas del partido | ✅ (tiros, posesión, córners, etc.) |

### 4.3 Formación de Equipos

**Hecho observado:** El campo `formation` está disponible en la respuesta de partidos individuales, pero no en listas.

**Ejemplo verificado:**
```json
"homeTeam": {
  "formation": "3-4-1-2",
  "lineup": [...],
  "bench": [...],
  "statistics": {
    "corner_kicks": 4,
    "ball_possession": 41,
    "shots": 8,
    "shots_on_goal": 3,
    "yellow_cards": 5
  }
}
```

---

## 5. Valor Analítico

### 5.1 Por Endpoint

#### Standings (`/competitions/{code}/standings`)
- **Conocimiento:** Posiciones, puntos, goles a favor/contra, forma reciente
- **Preguntas que responde:** ¿Quién lidera? ¿Cómo está el equipo X? ¿Cuál es la diferencia de puntos?
- **Indicadores derivados:** Diferencia de goles, promedio de puntos, eficiencia local/visitante
- **Filtros útiles:** `date` (histórico), `matchday`, `season`

#### Matches (`/competitions/{code}/matches`)
- **Conocimiento:** Calendario, resultados, árbitros, formaciones
- **Preguntas que responde:** ¿Cuándo juega X? ¿Cómo le fue? ¿Quién arbitra?
- **Indicadores derivados:** Racha de resultados, goles por partido, localía vs visitante
- **Filtros útiles:** `status=FINISHED`, `dateFrom/dateTo`, `matchday`

#### Team/Matches (`/teams/{id}/matches`)
- **Conocimiento:** Historial de un equipo específico
- **Preguntas que responde:** ¿Cómo le fue al equipo X en casa/fuera? ¿Cuál es su racha?
- **Indicadores derivados:** Rendimiento local/visitante, tendencias recientes

#### Head2Head (`/matches/{id}/head2head`)
- **Conocimiento:** Historial entre dos equipos específicos
- **Preguntas que responde:** ¿Cómo les ha ido entre sí? ¿Quién tiene ventaja?
- **Limitación:** Los aggregates a veces muestran 0 para wins/draws/losses

#### Scorers (`/competitions/{code}/scorers`)
- **Conocimiento:** Goleadores, asistencias, penaltis
- **Preguntas quiénes son los máximos goleadores? ¿Quién asiste más?
- **Indicadores derivados:** Eficiencia de goles, dependencia de penaltis

#### Person/Matches (`/persons/{id}/matches`)
- **Conocimiento:** Historial de un jugador específico
- **Preguntas que responde:** ¿Cuántos goles lleva? ¿En qué posiciones ha jugado?
- **Filtros útiles:** `lineup=STARTING`, `e=GOAL`

---

## 6. Ingeniería Inversa: Estrategia Óptima

### 6.1 Secuencia de Consultas Recomendada

**Para análisis pre-partido de un equipo:**

```
1. GET /v4/competitions/{code}/standings?season=YYYY
   → Contexto general de la temporada

2. GET /v4/teams/{id}/matches?season=YYYY&status=FINISHED&limit=10
   → Últimos 10 partidos del equipo

3. GET /v4/teams/{id}/matches?season=YYYY&venue=HOME&limit=5
   → Rendimiento en casa (últimos 5)

4. GET /v4/teams/{id}/matches?season=YYYY&venue=AWAY&limit=5
   → Rendimiento fuera de casa (últimos 5)

5. GET /v4/matches/{match_id}/head2head?limit=10
   → Historial entre los dos equipos
```

### 6.2 Optimización de Caché

| Dato | Frecuencia de actualización | Estrategia |
|------|----------------------------|------------|
| Información de equipos | Estática (temporadas) | Caché indefinida |
| Competiciones | Semanal | Caché 7 días |
| Standings | Por jornada | Caché 1 día (en temporada) |
| Partidos programados | Semanal | Caché 3 días |
| Resultados | Post-partido | Caché indefinida |
| Estadísticas de partido | Post-partido | Caché indefinida |

### 6.3 Minimización de Llamadas

**Patrón óptimo para monitoreo diario:**

```bash
# Una sola llamada para obtener todos los partidos del día
GET /v4/matches?dateFrom={hoy}&dateTo={hoy}

# Para actualización de standings (una vez por jornada)
GET /v4/competitions/{code}/standings
```

**Patrón para análisis de equipo:**

```bash
# Combinar standings + últimos partidos en 2 llamadas
GET /v4/competitions/{code}/standings
GET /v4/teams/{id}/matches?status=FINISHED&limit=20
```

---

## 7. Inventario de Oportunidades Analíticas

### 7.1 Dashboards Potenciales

1. **Dashboard de Jornada:** Todos los partidos de una jornada con standings contextuales
2. **Dashboard de Equipo:** Rendimiento completo de un equipo (local/visitante, racha, goles)
3. **Dashboard de Goleadores:** Top goleadores con eficiencia y dependencia de penaltis
4. **Dashboard de Directo:** Partidos en curso con actualizaciones

### 7.2 Métricas Derivadas

| Métrica | Fórmula | Utilidad |
|---------|---------|----------|
| **Promedio de goles** | Total goles / Partidos | Tendencia de ofensiva |
| **Eficiencia local** | Puntos casa / (Partidos casa × 3) | Ventaja de localía |
| **Racha** | Secuencia W/D/L reciente | Momentum |
| **Diferencia de goles promedio** | DG / Partidos | Calidad relativa |
| **Goles encajados promedio** | GA / Partidos | Solidez defensiva |
| **Forma reciente** | Últimos 5 partidos | Tendencia corto plazo |

### 7.3 Indicadores Estadísticos

- **xG proxy:** Goles esperados basado en historial de local/visitante
- **Tendencia de forma:** Pendiente de la curva de rendimiento
- **Ventaja de localía:** % puntos en casa vs fuera
- **Goles por intervalo:** Primera hora vs último tercio
- **Impacto de árbitro:** Promedio de tarjetas por árbitro

### 7.4 Alertas Automáticas

- Partidos próximos de equipos en racha
- Cambios significativos en standings
- Goleadores alcanzando umbrales (10, 20, 30 goles)
- Equipos en zona de descenso/ascenso

### 7.5 Análisis Comparativos

- Comparar rendimiento de dos equipos en misma temporada
- Evolución de un equipo entre temporadas
- Impacto de jugadores específicos (con Person/Matches)

---

## 8. Limitaciones y Consideraciones

### 8.1 Limitaciones Críticas para Análisis Pre-Partido

1. **Sin cuotas de apuestas** (solo premium)
2. **Sin datos de lesiones/sanciones** (no disponible en API)
3. **Sin alineaciones previas al partido** (solo post-partido)
4. **Sin datos de posesión/tiro en tiempo real** (solo post-partido)
5. **Rate limiting estricto** (10/min) dificulta análisis en tiempo real

### 8.2 Workarounds

- **Cuotas:** Usar API de cuotas separada (no incluida)
- **Lesiones:** Scrapeo manual o fuentes externas
- **Alineaciones:** Obtener post-partido para análisis histórico
- **Rate limiting:** Implementar caché agresiva

### 8.3 Preguntas Abiertas

1. ¿Cuántos días de datos históricos están realmente disponibles para cada competición?
2. ¿Hay endpoints no documentados accesibles?
3. ¿Cómo se comporta la API durante partidos en vivo (latencia de actualización)?
4. ¿Existen límites de datos por respuesta más allá de 100 elementos?

---

## 9. Conclusión

Football-Data.org Free ofrece una base sólida para análisis de fútbol con:

**Fortalezas:**
- Datos históricos extensos (múltiples temporadas)
- Estructura limpia y consistente
- Standings con filtro histórico (por fecha)
- Estadísticas detalladas post-partido
- Cobertura de ligas principales europeas + sudamericanas

**Debilidades:**
- Rate limiting muy restrictivo (10/min)
- Sin datos en tiempo real útiles para apuestas
- Sin información de lesiones/sanciones
- Sin cuotas integradas
- Datos de alineaciones solo post-partido

**Recomendación:** Usar como fuente principal para análisis histórico y contexto de temporada, complementado con otras fuentes para datos en tiempo real y cuotas.

---

## 10. Estructura de Directorio Propuesta

```
the_oracle/
├── .env                          # Token API
├── AUDITORIA_FOOTBALL_DATA_API.md # Este documento
├── data/
│   ├── competitions/             # JSON cache de competiciones
│   ├── standings/               # Standings por temporada
│   ├── matches/                 # Partidos históricos
│   └── teams/                   # Información de equipos
├── scripts/
│   ├── fetch_standings.py       # Obtener standings
│   ├── fetch_matches.py         # Obtener partidos
│   └── analyze_team.py          # Análisis de equipo
└── docs/
    └── endpoints.md             # Referencia rápida de endpoints
```

---

**Documento generado por:** Analista de Apuestas Deportivas
**Metodología:** Verificación experimental + documentación oficial
**Nivel de confianza:** Alto (datos verificados directamente contra la API)
