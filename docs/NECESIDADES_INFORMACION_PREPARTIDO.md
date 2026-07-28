# Necesidades de Información Pre-Partido

**Objetivo:** Construir un catálogo organizado de todas las necesidades de información que tendría un analista de apuestas deportivas antes de un partido de fútbol.

**Principio:** Este documento describe el PROBLEMA, no la solución. No se considera qué datos están disponibles ni cómo obtenerlos. Solo se identifica qué se necesita saber y por qué.

---

## Marco Conceptual: La Apuesta como Decisión de Inversión

### Definición

Una apuesta deportiva es una **decisión de inversión bajo incertidumbre** donde:

- Se arriesga capital conocido
- El retorno potencial es conocido (cuota)
- El resultado es incierto
- La ventaja (edge) proviene de estimar probabilidades con mayor precisión que el mercado

### Problema Fundamental

El objetivo no es predecir resultados. Es **estimar la probabilidad real de un outcome** y compararla con la probabilidad implícita en la cuota del bookmaker.

```
Si tu P(estimada) > P(implícita en cuota) → Valor positivo
Si tu P(estimada) < P(implícita en cuota) → Valor negativo
Si tu P(estimada) = P(implícita en cuota) → Sin valor
```

### Consecuencia

Cada pieza de información tiene sentido solo si **modifica tu estimación de probabilidad**. Si una información no cambia tu estimación, es irrelevante para la decisión, sin importar cuán "interesante" parezca.

---

## Fuentes de Incertidumbre

Antes de identificar qué se necesita saber, hay que entender qué genera incertidumbre en un partido:

### Incertidumbre Estructural (Inevitable)

1. **Varianza aleatoria del fútbol** - Un tiro al palo, un error arbitral, un rebote inesperado pueden cambiar el resultado. Esto no se puede eliminar, solo cuantificar.

2. **Complejidad del sistema** - 22 jugadores, un balón, dinámicas no lineales. Pequeñas variaciones pueden tener efectos grandes.

### Incertidumbre Reducible (Información existe)

3. **Calidad relativa de los equipos** - No todos los equipos son iguales. La diferencia de calidad crea probabilidades esperadas.

4. **Estado actual de los equipos** - Un equipo puede estar en mejor o peor momento que su promedio histórico.

5. **Disponibilidad de recursos humanos** - Lesiones, suspensiones, rotaciones afectan la capacidad real del equipo.

6. **Factores contextuales** - Localía, motivación, calendario, clima, todo esto modifica la probabilidad base.

7. **Dinámica del mercado** - Las cuotas reflejan el consenso del mercado. Detectar divergencias entre tu estimación y el mercado es donde está el valor.

---

## Catálogo de Necesidades de Información

### Categoría 1: Calidad Relativa de los Equipos

#### 1.1 Nivel General del Equipo

| Necesidad | Por qué es importante | Qué decisión apoya | Qué incertidumbre reduce |
|-----------|----------------------|--------------------|--------------------|
| **Posición en tabla** | Indicador básico de rendimiento acumulado | Evaluar si un equipo es "mejor" que otro | Diferencia de calidad entre equipos |
| **Puntos acumulados** | Mide la efectividad real (no solo el nivel percibido) | Comparar rendimiento absoluto | Si el favorito realmente es superior |
| **Diferencia de goles** | Proxy de dominio en partidos | Identificar equipos dominados vs competitivos | Margen esperado de victoria |
| **Goles a favor / contra** | Muestra capacidad ofensiva y solidez defensiva | Evaluar si un equipo puede ganar por margen | Probabilidad de goles por lado |
| **Juegos disputados** | Indica si la muestra es representativa | Evitar basar decisiones en pocos partidos | Fiabilidad de los datos observados |

**Preguntas clave que responden:**
- ¿Cuánto mejor es el equipo A que el equipo B?
- ¿Es el favorito realmente tan dominante como parece?
- ¿El outsiders tiene alguna oportunidad real?

#### 1.2 Rendimiento Local vs Visitante

| Necesidad | Por qué es importante | Qué decisión apoya | Qué incertidumbre reduce |
|-----------|----------------------|--------------------|--------------------|
| **Puntos en casa** | El factor local influye significativamente | Evaluar ventaja de localía | Si el factor casa mitiga la diferencia de calidad |
| **Puntos fuera** | Muestra capacidad de competir lejos de casa | Evaluar resistencia del visitante | Si el visitante puede obtener resultado |
| **Goles en casa/fuera** | Patrones de anotación según venue | Predecir total de goles | Efecto local en producción de goles |
| **Forma en casa/fuera reciente** | El rendimiento puede variar por venue | Identificar tendencias específicas de venue | Si hay tendencia emergente en local/visitante |

**Preguntas clave:**
- ¿El equipo X es realmente fuerte en casa o solo parece?
- ¿El equipo Y puede competir fuera de casa contra equipos de su nivel?
- ¿La diferencia casa/fuera es mayor de lo esperado?

---

### Categoría 2: Forma Reciente

#### 2.1 Tendencia Actual

| Necesidad | Por qué es importante | Qué decisión apoya | Qué incertidumbre reduce |
|-----------|----------------------|--------------------|--------------------|
| **Resultados últimos 5-10 partidos** | Indicador de momentum actual | Identificar si un equipo está en racha o en crisis | Si el rendimiento actual difiere del histórico |
| **Secuencia W/D/L** | Muestra consistencia o volatilidad | Evaluar estabilidad del rendimiento | Si el equipo es predecible o errático |
| **Goles marcados recientes** | Capacidad ofensiva actual | Predecir probabilidad de goles | Si la ofensiva está funcionando |
| **Goles encajados recientes** | Solidez defensiva actual | Predecir goles en contra | Si la defensa está vulnerable |
| **Calidad de rivales enfrentados** | Contexto de los resultados recientes | Evaluar si la forma es real o inflada | Si los resultados recientes son representativos |

**Preguntas clave:**
- ¿Este equipo está mejorando, empeorando o estable?
- ¿La racha actual es sostenible o es una anomalía?
- ¿Los resultados recientes contra rivales difíciles son representativos?

#### 2.2 Evolución Temporal

| Necesidad | Por qué es importante | Qué decisión apoya | Qué incertidumbre reduce |
|-----------|----------------------|--------------------|--------------------|
| **Comparación con temporada anterior** | Muestra si el equipo mejoró o empeoró | Evaluar tendencia a largo plazo | Si el nivel actual es mejor/p peor que el histórico |
| **Evolución dentro de la temporada** | Puede haber cambios de tendencia | Identificar puntos de inflexión | Si hay mejora o deterioro progresivo |
| **Rendimiento por fases de temporada** | Algunos equipos arrancan fuerte y decaen, o vicejo al revés | Predecir rendimiento en fase actual | Si el equipo tiene patrones estacionales |

---

### Categoría 3: Factor Localía / Visitante

#### 3.1 Impacto del Venue

| Necesidad | Por qué es importante | Qué decisión apoya | Qué incertidumbre reduce |
|-----------|----------------------|--------------------|--------------------|
| **Ventaja estadística de localía** | El factor casa existe y varía por liga/equipo | Cuantificar cuántos puntos "vale" jugar en casa | Si la ventaja de localía está priced-in correctamente |
| **Récord histórico en el venue específico** | Algunos equipos tienen historial particular contra otros en ciertos estadios | Evaluar si hay tendencia histórica | Si el historial directo es relevante |
| **Capacidad del estadio / atmosfera** | Factores intangibles que afectan rendimiento | Evaluar presión sobre el visitante | Si el ambiente influirá en el resultado |
| **Distancia de viaje** | El desplazamiento afecta al equipo visitante | Evaluar fatiga logística | Si el viajeimpactará en el rendimiento |

**Preguntas clave:**
- ¿Cuántos puntos gana este equipo en casa que no ganaría fuera?
- ¿El equipo visitante tiene buen historial en este estadio específico?
- ¿La distancia de viaje es significativa?

---

### Categoría 4: Disponibilidad de Jugadores

#### 4.1 Ausencias

| Necesidad | Por qué es importante | Qué decisión apoya | Qué incertidumbre reduce |
|-----------|----------------------|--------------------|--------------------|
| **Jugadores lesionados** | Un jugador clave ausente cambia la dinámica del equipo | Ajustar estimación de calidad real | Si el equipo está a capacidad completa |
| **Jugadores suspendidos** | Lo mismo que lesiones pero por acumulación de tarjetas | Evaluar impacto de ausencias temporales | Si hay ausencias previsibles |
| **Titulares dudosos** | Jugadores que podrían jugar pero no están al 100% | Evaluar riesgo de titular jugadores limitados | Si la alineación será la óptima |
| **Recién regresados de lesión** | Jugadores que vuelven pero pueden no estar en ritmo | Evaluar si volverán a nivel óptimo | Si el regreso será efectivo |

#### 4.2 Disponibilidad Positiva

| Necesidad | Por qué es importante | Qué decisión apoya | Qué incertidumbre reduce |
|-----------|----------------------|--------------------|--------------------|
| **Regresos de lesión** | Jugadores importantes que vuelven | Evaluar si el equipo se fortalece | Si la alineación mejorará |
| **Nuevas incorporaciones** | Refuerzos de mitad de temporada | Evaluar si el equipo mejoró | Si hay impacto positivo de fichajes |

**Preguntas clave:**
- ¿Quiénes faltan y cuánto influyen en el equipo?
- ¿El equipo está al máximo de su capacidad?
- ¿Hay jugadores que vuelven y pueden cambiar la dinámica?

---

### Categoría 5: Factores Tácticos

#### 5.1 Alineación y Formación

| Necesidad | Por qué es importante | Qué decisión apoya | Qué incertidumbre reduce |
|-----------|----------------------|--------------------|--------------------|
| **Formación probable** | Determina el estilo de juego esperado | Predecir dinámica del partido | Cómo jugará cada equipo |
| **Alineación probable** | Quiénes empezarán titularles | Evaluar calidad real disponible | Si los mejores jugadores jugarán |
| **Sustituciones habituales** | Patrones de cambios del entrenador | Predecir cambios de segundo tiempo | Cómo evolucionará el partido |
| **Estilo de juego** | Posesión vs contragolpe, presión alta vs baja | Predecir dinámica del partido | Si los estilos son compatibles |

#### 5.2 Matchup Táctico

| Necesidad | Por qué es importante | Qué decisión apoya | Qué incertidumbre reduce |
|-----------|----------------------|--------------------|--------------------|
| **Estilo vs estilo** | Algunos estilos contrarrestan a otros | Evaluar ventaja táctica | Si hay ventaja tática clara |
| **Fortalezas vs debilidades** | Un equipo puede explotar debilidades específicas del rival | Identificar ventajas competitivas | Si hay matchup favorable |
| **Historial de enfrentamientos tácticos** | Cómo se han comportado los entrenadores entre sí | Evaluar ventaja del banquillo | Si el entrenador rival tiene ventaja |

---

### Categoría 6: Factores Motivacionales y Contextuales

#### 6.1 Motivación del Partido

| Necesidad | Por qué es importante | Qué decisión apoya | Qué incertidumbre reduce |
|-----------|----------------------|--------------------|--------------------|
| **Importancia del partido** | Un equipo puede no esforzarse al máximo si ya tiene todo resuelto | Evaluar nivel de esfuerzo esperado | Si el equipo dará el máximo |
| **Objetivos pendientes** | Luchar por título, evitar descenso, clasificar a Europa | Evaluar urgencia y motivación | Si el resultado importa realmente |
| **Presión psicológica** | La presión puede afectar rendimiento | Evaluar factor psicológico | Si la presión ayudará o perjudicará |

#### 6.2 Calendario y Fatiga

| Necesidad | Por qué es importante | Qué decisión apoya | Qué incertidumbre reduce |
|-----------|----------------------|--------------------|--------------------|
| **Días de descanso** | Menos descanso = más fatiga | Evaluar condición física | Si el equipo estará fresco |
| **Densidad del calendario** | Muchos partidos en poco tiempo | Evaluar riesgo de fatiga/rotación | Si habrá rotación significativa |
| **Partidos previos en semana** | Copa, Champions, etc. | Evaluar prioridades del entrenador | Si el equipo rotará jugadores |
| **Próximos compromisos** | Un equipo puede guardar fuerzas para un partido más importante | Evaluar prioridades | Si este partido es prioritario |

#### 6.3 Factores Externos

| Necesidad | Por qué es importante | Qué decisión apoya | Qué incertidumbre reduce |
|-----------|----------------------|--------------------|--------------------|
| **Clima** | Lluvia, viento, calor extremo afectan juego | Evaluar condiciones de juego | Si las condiciones favorán a un estilo |
| **Altitud** | Factor relevante en某些 ligas | Evaluar adaptación | Si la altitud afectará a un equipo |
| **Estado del campo** | Un campo en mal estado iguala equipos | Evaluar si el campo perjudica al favorito | Si las condiciones del campo son significativas |

---

### Categoría 7: Goles y Mercados de Totales

#### 7.1 Producción de Goles

| Necesidad | Por qué es importante | Qué decisión apoya | Qué incertidumbre reduce |
|-----------|----------------------|--------------------|--------------------|
| **Promedio de goles del equipo** | Base para estimar total de goles | Apostar over/under | Probabilidad de más/menos goles |
| **Promedio de goles encajados** | Contribuye al total esperado | Apostar over/under | Cuántos goles recibirá |
| **Goles por intervalo** | Patrones temporales de anotación | Evaluar dinámica del partido | Cuándo se marcarán los goles |
| **Relación corners/tiros vs goles** | Indicadores de proceso vs resultado | Evaluar si los goles son sostenibles | Si la producción de goles continuará |

#### 7.2 Patrones de Goles

| Necesidad | Por qué es importante | Qué decisión apoya | Qué incertidumbre reduce |
|-----------|----------------------|--------------------|--------------------|
| **Ambos equipos marcan (BTTS)** | Mercado popular | Apostar BTTS | Probabilidad de que ambos marquen |
| **Clean sheets** | Indicador defensivo | Apostar clean sheet | Probabilidad de que un equipo no encaje |
| **Goles en 1er tiempo** | Patrones de inicio | Apostar HT goles | Probabilidad de goles tempranos |
| **Remontadas** | Indicador de carácter | Evaluar mentalidad | Si un equipo puede remontar |

---

### Categoría 8: Arbitraje

| Necesidad | Por qué es importante | Qué decisión apoya | Qué incertidumbre reduce |
|-----------|----------------------|--------------------|--------------------|
| **Árbitro asignado** | Cada árbitro tiene tendencias diferentes | Evaluar estilo arbitral | Si el árbitro influye en el resultado |
| **Promedio de tarjetas del árbitro** | Algunos son más estrictos que otros | Apostar tarjetas | Número esperado de amarillas/rojas |
| **Historial con los equipos** | Un árbitro puede tener historial particular | Evaluar sesgos posibles | Si hay predisposición arbitral |
| **Tendencia a penaltis** | Algunos pitran más penaltis que otros | Apostar penaltis | Probabilidad de penaltis |
| ** VAR tendencies** | El VAR puede influir en decisiones | Evaluar impacto del VAR | Si el VAR cambiará decisiones |

---

### Categoría 9: El Mercado y el Valor

#### 9.1 Las Cuotas

| Necesidad | Por qué es importante | Qué decisión apoya | Qué incertidumbre reduce |
|-----------|----------------------|--------------------|--------------------|
| **Cuota actual del resultado** | Define el retorno potencial | Calcular si hay valor | Si la cuota refleja valor |
| **Probabilidad implícita** | Cuota convertida en probabilidad | Comparar con tu estimación | Si hay discrepancia con tu estimación |
| **Movimiento de cuotas** | Los cambios indican información del mercado | Detectar información implícita | Si el mercado está reaccionando a algo |
| **Cuota de apertura vs actual** | Muestra la dirección del movimiento | Evaluar presión del mercado | Si el valor está aumentando o disminuyendo |
| **Cuotas de mercados alternativos** | Handicaps, goles, etc. | Evaluar valor en mercados secundarios | Si hay mejor valor en otro mercado |

#### 9.2 Análisis de Valor

| Necesidad | Por qué es importante | Qué decisión apoya | Qué incertidumbre reduce |
|-----------|----------------------|--------------------|--------------------|
| **Edge estimado** | Diferencia entre tu P y la del mercado | Decidir si apostar | Si la apuesta tiene valor esperado positivo |
| **Kelly Criterion** | Tamaño óptimo de apuesta | Gestionar bankroll | Cuánto apostar |
| **Valor acumulado vs individual** | El valor se diluye en combinadas | Evaluar estrategia | Si combinar apuestas tiene sentido |

---

## Modelo Jerárquico de Prioridades

### Nivel 1: Fundamentales (Sin esto no se puede analizar)

1. **Calidad relativa de los equipos** (Categoría 1)
2. **Forma reciente** (Categoría 2)
3. **Factor localía** (Categoría 3)

### Nivel 2: Diferenciadores (Separan buenos análisis de promedios)

4. **Disponibilidad de jugadores** (Categoría 4)
5. **Factores motivacionales** (Categoría 6)
6. **Las cuotas y el valor** (Categoría 9)

### Nivel 3: Avanzados (Optimizan decisiones)

7. **Factores tácticos** (Categoría 5)
8. **Producción de goles** (Categoría 7)
9. **Arbitraje** (Categoría 8)

---

## Principios de Análisis

### Principio 1: Información vs Ruido

No toda la información es igualmente útil. Un dato es útil solo si:
- Cambia tu estimación de probabilidad
- Es verificable y confiable
- Tiene relación causal con el resultado

**Ejemplo de ruido:** "El equipo X vistió camiseta roja en su última victoria" → No afecta probabilidad.

**Ejemplo de información:** "El equipo X ha ganado los últimos 8 partidos en casa" → Afecta probabilidad.

### Principio 2: Calidad vs Cantidad

Mejor tener 5 datos relevantes que 50 datos irrelevantes. La cantidad de información no garantiza mejores decisiones.

### Principio 3: Sesgo de Confirmación

El analista debe buscar activamente información que **contradiga** su estimación inicial. Si solo buscas datos que confirmen lo que ya crees, tomarás malas decisiones.

### Principio 4: Probabilidad, no Certeza

El objetivo es estimar probabilidades, no predecir resultados. Un resultado improbable puede ocurrir. Una buena apuesta puede perder. El proceso importa más que el resultado individual.

### Principio 5: Conocer tus Limitaciones

Reconocer explícitamente qué NO sabes es tan importante como saber lo que sí sabes. Si no tienes información sobre lesiones, debes asumir que no sabes quién jugará, no asumir que todos están disponibles.

---

## Gap Analysis: Lo que Necesitas vs Lo que Existe

### Preguntas que un analista necesita responder:

1. ¿Cuál es la probabilidad real de que gane el equipo A?
2. ¿Cuál es la probabilidad de que el partido tenga más/menos X goles?
3. ¿Hay valor en la cuota actual?
4. ¿Qué factores pueden cambiar mi estimación?
5. ¿Cuánta confianza tengo en mi estimación?

### Lo que Football-Data.org puede aportar (Fase posterior):

| Necesidad | Fuente potencial | Cobertura estimada |
|-----------|------------------|--------------------|
| Calidad relativa | Standings, historical data | Alta |
| Forma reciente | Matches recientes | Alta |
| Factor localía | Team/Matches con venue filter | Alta |
| Producción de goles | Matches + standings | Alta |
| Disponibilidad de jugadores | **No disponible** | Nula |
| Factores motivacionales | **No disponible** | Nula |
| Cuotas | **No disponible** (premium) | Nula |
| Arbitraje | Matches (árbitro asignado) | Media |
| Tácticas | **No disponible** | Nula |

---

## Conclusión

El análisis prepartido requiere satisfacer necesidades de información en tres niveles:

1. **Fundamental:** Entender quién es mejor y en qué condiciones juegan
2. **Diferenciador:** Identificar factores que modifican la probabilidad base
3. **Avanzado:** Optimizar la estimación con detalles específicos

Football-Data.org puede satisfacer parcialmente las necesidades del nivel fundamental y algo del diferenciador. Las necesidades de información sobre lesiones, motivación y cuotas requieren fuentes complementarias.

**El primer paso no es consultar la API, sino entender qué necesitas saber. Este documento establece ese marco.**

---

**Próxima fase:** Determinar, para cada necesidad de información, qué parte puede satisfacerse con Football-Data.org y qué parte requiere otras fuentes.
