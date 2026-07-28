Propuesta de estructura

1. Objetivo

Explicar cuál es el propósito de la interfaz.

Ejemplo:

El Oracle Brief no pretende impresionar visualmente ni ofrecer dashboards complejos. Su objetivo es reducir el tiempo necesario para comprender el contexto previo de un partido mediante una presentación clara, jerárquica y fácilmente escaneable.

2. Principios de Diseño

Aquí defines reglas.

Por ejemplo.

Prioridad de lectura

Siempre:

Información crítica
↓

Información relevante

↓

Información complementaria

Nunca al revés.

Escaneo rápido

Un usuario debe entender el estado general del partido en menos de 30 segundos.

Por tanto:

pocos bloques
títulos claros
sin párrafos enormes
sin texto decorativo
Una tarjeta = una pregunta

Cada Card responde una única pregunta.

Ejemplo

Forma reciente

↓

¿Cómo llegan ambos equipos?

Otra

Head to Head

↓

¿Cómo les fue históricamente?

No mezclar ambas.

Comparación siempre horizontal

Siempre que existan dos equipos.

Home

vs

Away

Nunca mostrar primero todo Home y luego todo Away.

Comparar es más importante que listar.

3. Jerarquía del Brief

Definir el orden.

Ejemplo.

Header

↓

Resumen rápido

↓

Forma reciente

↓

Posición en liga

↓

Head to Head

↓

Goles

↓

Contexto

↓

Información secundaria

Ese orden nunca cambia.

4. Componentes permitidos

Por ejemplo.

Se autorizan únicamente:

Card
Badge
Table
Progress
Tabs
Tooltip
Accordion
Skeleton
Alert

Todo proveniente de shadcn/ui.

No inventar componentes.

5. Componentes prohibidos

Esto evita que el asistente empiece a improvisar.

Por ejemplo.

No usar:

carruseles
sliders
gráficos 3D
dashboards tipo BI
gauges
animaciones innecesarias
parallax
autoplay 6. Densidad de información

Muy importante.

El objetivo no es mostrar todo.

El objetivo es mostrar únicamente lo necesario.

Regla:

Si un dato no ayuda a tomar una decisión prepartido,
no aparece en pantalla principal.

7. Responsive

Reglas.

Desktop

2 columnas

Tablet

1 columna y media

Mobile

1 columna

Nunca layouts distintos.

Solo reorganización.

8. Estados

Todos los componentes deben definir:

Loading

Skeleton.

Empty

"No hay información disponible"

Error

No mostrar stacktrace.

Solo mensaje amigable.

Partial

Mostrar lo disponible.

Nunca ocultar todo porque una llamada falló.

Esto es importantísimo.

9. Colores

No definir hexadecimales.

Definir semántica.

Ejemplo.

Success

Warning

Danger

Muted

Primary

Secondary

Después Tailwind resolverá.

10. Iconografía

Muy pocas reglas.

Iconos únicamente para:

estado
navegación
contexto

Nunca decoración.

11. Tipografía

Reglas.

Máximo

H1

H2

H3

Body

Caption

Nada más.

12. Accesibilidad

Obligatorio.

contraste AA
navegación teclado
aria-label
focus visible
no depender únicamente del color 13. Rendimiento

El frontend debe priorizar:

carga rápida
pocos re-renders
lazy loading cuando aplique
skeletons
evitar CLS 14. Filosofía visual

Esta sección me parece la más importante.

Algo como:

El Oracle no es una aplicación de apuestas.

No busca generar emociones.

No busca incentivar apuestas.

No busca parecer un casino.

Debe transmitir confianza, claridad y profesionalismo.

Por tanto:

sin colores agresivos
sin neones
sin efectos exagerados
sin métricas gigantes
sin indicadores engañosos

Debe sentirse como una herramienta de análisis.

Reglas obligatorias para el asistente

Al final pondría algo así.

Reglas Normativas

Toda implementación del frontend deberá cumplir obligatoriamente las siguientes reglas:

La UI consume exclusivamente la API de The Oracle.
Nunca acceder directamente a Football-Data.
No alterar el orden del Brief sin actualizar esta especificación.
Cada componente debe tener una única responsabilidad.
Toda nueva vista debe reutilizar el Design System.
No introducir nuevos patrones visuales sin documentarlos.
La claridad tiene prioridad sobre la densidad de información.
El usuario debe poder comprender el estado del partido en menos de 30 segundos.
La interfaz debe ser consistente entre módulos presentes y futuros.
