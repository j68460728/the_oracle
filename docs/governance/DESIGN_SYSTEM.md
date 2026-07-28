# Sistema de Diseño — The Oracle

Este documento define las directrices normativas de diseño para todas las interfaces de The Oracle. Su propósito es garantizar una identidad visual coherente y de calidad premium a lo largo de todo el ciclo de desarrollo del frontend (Next.js + Tailwind CSS + shadcn/ui).

---

## 1. Filosofía Visual

- **Enfoque Analítico y Maduro:** The Oracle se concibe como una herramienta de inteligencia deportiva, no como una casa de apuestas. La paleta de colores y las fuentes deben reflejar sobriedad, datos claros y objetividad.
- **Sin Elementos de Casino:** Se prohíbe el uso de luces de neón, botones con reflejos dorados/metálicos o banners promocionales parpadeantes.
- **Comparación Directa (Home vs Away):** Las tarjetas y tablas analíticas deben estar dispuestas de modo que el usuario pueda comparar de un vistazo el desempeño del equipo local (izquierda) frente al visitante (derecha).

---

## 2. Paleta de Colores Semánticos

Para dirigir la atención del usuario de manera intuitiva, se deben emplear los siguientes colores:

- **Fondo General:** `#070b14` (Slate extremadamente oscuro).
- **Fondos de Tarjetas (Cards):** `#0e1526` / `slate-900` con bordes suaves `slate-800`.
- **Textos Principales:** `text-slate-100` o blanco para títulos y datos destacados.
- **Textos de Metadatos y Descriptores:** `text-slate-400` / `text-slate-500` (evitar que compitan con los datos de primer nivel).
- **Éxito / Mejor Estadística (Verde):** `#10b981` (Emerald-500) o verde suave para señalar un desempeño superior frente al rival.
- **Derrota / Peor Estadística (Rojo):** `#ef4444` (Red-500) o rojo suave para señalar debilidad o desventaja crítica.
- **Empate / Igualdad / Neutro (Gris/Slate):** `text-slate-400` o `bg-slate-800` para datos empatados o contextos neutros.

---

## 3. Tipografía y Jerarquía Visual

- **Fuente Principal:** Inter (Sans-serif moderna).
- **Títulos de Secciones (Casing):** Se debe emplear **Sentence case** (primera letra en mayúscula, el resto en minúscula) para todos los títulos de tarjetas y encabezados de sección.
- **Uso de UPPERCASE:** Reservado estrictamente para pequeñas etiquetas de metadatos, identificadores rápidos (como abreviaturas de equipos, p. ej. "MCI", "ARS") o badges muy pequeños.

### Escala Tipográfica:
- Títulos del Hero: `text-2xl` a `text-3xl` (font-bold).
- Títulos de Tarjetas: `text-lg` (font-semibold, color blanco o slate-100).
- Texto del Cuerpo/Datos: `text-sm` o `text-base` (font-medium).
- Metadata: `text-xs` (font-normal, color slate-400).

---

## 4. Sistema de Espaciados y Paddings

Para dar sensación de producto "premium", las interfaces deben respirar.

- **Padding Interno de Tarjetas (Cards):** Mínimo de `p-6` (24px) en pantallas medianas y grandes.
- **Separación entre Tarjetas:** Mínimo de `space-y-6` o `gap-6`.
- **Bordes y Sombras:**
  - `rounded-xl` (12px) para tarjetas analíticas.
  - `border border-slate-800/80` para delimitar suavemente los bloques.
  - `shadow-lg` con coloración oscura.

---

## 5. Iconografía

- **Familia Única:** Se utilizará exclusivamente **Lucide React** (`lucide-react`).
- **Grosor y Tamaño:**
  - Grosor de trazo (`strokeWidth`): `1.5` o `2` máximo.
  - Tamaño estándar de iconos decorativos en inputs/tabs: `w-4 h-4` o `w-5 h-5`.
  - Iconos de tarjetas de contexto: `w-5 h-5`.

---

## 6. Comportamiento Adaptativo (Responsive)

- **Mobile First:** Todo componente debe ser completamente usable en pantallas móviles (`grid-cols-1`).
- **Layout General a Columnas:**
  - *Mobile / Portrait:* Columna única con scroll vertical fluido.
  - *Tablet / Desktop:* Sistema de rejilla a dos columnas principales (Menú/Lateral y Dashboard con Grid de 2 o 3 columnas).

---

## 7. Estados y Microinteracciones

- **Hover States:** Todo elemento interactivo (filas de tablas, botones, tarjetas de selección) debe poseer un efecto hover sutil (p. ej., `hover:bg-slate-800/40 transition-colors duration-200`).
- **Tooltips:** Utilizar los tooltips de shadcn para explicar métricas complejas (como PPG o xG).
- **Animaciones:** Transiciones CSS suaves (`transition-all duration-300`) al expandir acordeones o cambiar de pestañas.
- **Skeletons:** Carga asíncrona simulada en la interfaz mediante skeletons con efecto `pulse` en tonos oscuros (`bg-slate-800/50`).
