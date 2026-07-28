# Visión — The Oracle

Single modular system for organizing and presenting Football-Data.org info for bettors. No AI, no predictions, no ML.

## El Problema

Los apostadores se enfrentan a una sobrecarga de información al intentar tomar decisiones rápidas previas a un partido. Los datos valiosos existen en Football-Data.org, pero están:

- Distribuidos en múltiples endpoints (clasificaciones, partidos, equipos, historial, goleadores, etc.).
- En formatos inconsistentes (diferentes estructuras, nombres, tipos de datos).
- Limitados por tasa (10 solicitudes/minuto en el plan Free).
- Carentes de contexto vital para apuestas (sin cuotas, sin lesiones, sin alineaciones previas).

El resultado: análisis manual que consume mucho tiempo, insights inconsistentes y decisiones basadas en información fragmentada.

## El Usuario Objetivo

**Apostadores que buscan contexto estructurado pre-partido pero que desean mantenerse dentro de las fuentes de datos gratuitas.**

- Apostadores con tiempo limitado (necesitan decisiones rápidas).
- Usuarios de múltiples casas de apuestas (eficiencia en la investigación).
- Apostadores analíticos (buscan información estructurada).
- Usuarios limitados por presupuesto (solo datos gratuitos).

## Nuestra Solución (Objetivo)

The Oracle transforma los datos dispersos de Football-Data.org en información estructurada y orientada a las apuestas, respetando siempre las limitaciones del proveedor.

**Propuesta de Valor Central:**
- **Velocidad**: Comprensión rápida del contexto en minutos (no horas).
- **Estructura**: Análisis organizado y coherente listo para la toma de decisiones.
- **Integridad**: Combina datos relevantes de FD en insights unificados.
- **Respeto**: Funciona dentro de las limitaciones de FD Free (no es un reemplazo de la suscripción premium).

## Alcance del Producto

Un sistema de presentación construido sobre Football-Data.org para apostadores. La plataforma:

- **Organiza** los datos de FD alrededor de preguntas clave de apuestas.
- **Estructura** la información de manera coherente.
- **Presenta** insights en un formato fácil de consumir.
- **Acelera** la toma de decisiones con el contexto de un solo vistazo.
- **Respeta** las limitaciones de FD Free (no incluye cuotas, lesiones ni alineaciones pre-partido).

### Flujo Central de Experiencia (MVP: Oracle Brief)

1. **Entrada**: Identificador de Competición + IDs de Equipos.
2. **Procesamiento**: The Oracle agrega llamadas a FD (con caché) y transforma los datos en un modelo de dominio propio.
3. **Salida**: Un "Brief" estructurado del partido con:
   - Comparación de la calidad del equipo.
   - Tendencias de rendimiento reciente.
   - Datos históricos de enfrentamientos.
   - Contexto base para las decisiones de apuesta.

## No-Objetivos (Fuera del alcance)

Nuestra visión respeta las limitaciones del plan FD Free y define estrictamente lo que **NO** somos:

- **Sin Predicciones**: Proporcionamos contexto, no resultados probables.
- **Sin Inteligencia Artificial ni Machine Learning**: Sin cajas negras predictivas ni sesgos ocultos. Todo el análisis es transparente.
- **Sin Reemplazo del Analista Humano**: Los analistas toman las decisiones finales basándose en nuestras salidas estructuradas. No sustituimos la experiencia humana.
- **Sin Completitud de Datos de Apuestas**: Nos enfocamos en las fortalezas de FD (datos históricos estructurados) y omitimos voluntariamente crear scrapers o integraciones de terceros para cuotas o lesiones en esta fase.

## Métricas de Éxito

### Experiencia del Usuario
- **Ahorro de Tiempo**: Reducir el análisis pre-partido de horas a minutos.
- **Cohesión de la Información**: Consultar un solo origen en lugar de múltiples endpoints de FD.
- **Velocidad de Decisión**: Ofrecer contexto rápido para elecciones ágiles de apuestas.

### Calidad
- **Precisión**: Transformación correcta de la estructura FD a los modelos internos.
- **Claridad**: Presentación intuitiva y fácil de entender.
- **Utilidad**: Insights accionables como contexto de apuestas.