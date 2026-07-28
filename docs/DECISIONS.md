# Decisiones de Arquitectura (ADR) — The Oracle

Este documento contiene el registro histórico de decisiones de arquitectura (ADR - Architecture Decision Records) del proyecto The Oracle. Todas las decisiones tecnológicas fundamentales deben documentarse aquí bajo el formato estándar ADR.

---

## ADR 1: Uso de FastAPI para el Backend

**Status:** Aprobado

**Context:** 
El backend de The Oracle necesita comunicarse con la API de Football-Data, transformar respuestas complejas a modelos de dominio internos y servir los resultados al frontend. Se requiere alta velocidad de respuesta, manejo concurrente para llamadas HTTP y contratos robustos de tipado.

**Decision:** 
Se selecciona Python 3.14 con FastAPI, Pydantic v2 y httpx como cliente asíncrono.

**Consequences:**
*   (Positivo) Excelente soporte asíncrono que favorece orquestar múltiples llamadas (a caché y a la API externa).
*   (Positivo) Pydantic v2 nos obliga a definir esquemas estrictos (validación robusta), protegiendo nuestro modelo de negocio ante cambios silentes en la API de Football-Data.
*   (Positivo) Generación automática de contratos OpenAPI.
*   (Negativo) Python no es tradicionalmente tan rápido en CPU como Go o Rust, aunque para I/O bound tasks como las que hacemos (REST), es completamente adecuado.

---

## ADR 2: Uso de Next.js 16 para el Frontend

**Status:** Aprobado

**Context:** 
Se requiere una interfaz de usuario modular para presentar el "Oracle Brief", capaz de evolucionar en el futuro a dashboards de métricas más complejos. La UI necesita ser consistente y rápida de implementar.

**Decision:** 
Se selecciona Next.js 16 (usando App Router), React 19, TypeScript y Tailwind CSS en combinación con shadcn/ui.

**Consequences:**
*   (Positivo) App Router refleja muy bien una estructura modular por casos de uso.
*   (Positivo) TypeScript proporciona tipado de primer nivel para sincronizar con los contratos del backend.
*   (Positivo) shadcn/ui proporciona un sistema de diseño atómico, eliminando la necesidad de escribir componentes CSS a medida desde cero.
*   (Negativo) Curva de aprendizaje más alta respecto a Single Page Applications (SPA) tradicionales.

---

## ADR 3: Aislamiento del Dominio (Adapter Pattern Obligatorio)

**Status:** Aprobado

**Context:** 
La estructura del proveedor Football-Data.org está fuera de nuestro control. Si introducimos sus esquemas directamente en nuestros servicios de presentación, cualquier cambio en su API romperá nuestro sistema completo.

**Decision:** 
Se impone que ninguna entidad o capa, con la excepción exclusiva de `infrastructure/adapters/` y el cliente HTTP, pueda conocer la estructura de respuesta de Football-Data. Todo dato consumido debe ser mapeado inmediatamente a los Pydantic models definidos en `domain/models.py`.

**Consequences:**
*   (Positivo) Si Football-Data cambia un nombre de campo o la estructura de anidación, solo debemos modificar el adaptador correspondiente.
*   (Positivo) Nuestro negocio ("Oracle Brief") permanece inmutable, favoreciendo una arquitectura limpia.
*   (Negativo) Requiere esfuerzo adicional de escritura (boilerplate) para los adaptadores y modelos, incluso si son similares estructuralmente al inicio.

---

## ADR 4: Redis para Gestión de Estado y Rate Limiting

**Status:** Aprobado

**Context:** 
El límite del plan gratuito de Football-Data.org es de 10 peticiones por minuto. Para que "Oracle Brief" resuelva las 5 llamadas necesarias por análisis sin sobrepasar la cuota global del servidor y asegurar un rendimiento óptimo, se requiere un mecanismo de memoria caché robusto.

**Decision:** 
Utilizar Redis 7 con un diseño estricto de TTLs asimétricos dependiendo de la volatilidad del recurso en cuestión (diario para clasificaciones, semanal para plantillas e historial).

**Consequences:**
*   (Positivo) Absorbe los picos de tráfico mitigando por completo las limitaciones del proveedor subyacente de datos.
*   (Positivo) Permite una rápida recarga de datos en flujos de desarrollo local.
*   (Negativo) Añade complejidad operativa e introduce la necesidad de manejar posibles fallos de conexión al clúster caché dentro del Backend.

---

## ADR 5: Orquestación mediante Docker Compose V2 y Convenciones del Workspace

**Status:** Aprobado

**Context:** 
El entorno de desarrollo requiere reproducibilidad, simplicidad (KISS) y coexistencia con otras aplicaciones en el mismo entorno de hospedaje (workspace local).

**Decision:** 
Desplegar todo el stack utilizando un único archivo `docker-compose.yml` (V2), sin usar orquestadores complejos como Kubernetes o microservicios segregados. Se impone cumplir con el DOCKER_STANDARDS.md del espacio de trabajo (bloque de puertos 15800-15899, sin `container_name`, anclas YAML en la raíz).

**Consequences:**
*   (Positivo) Reduce el ciclo de onboarding para nuevos desarrolladores y la sobrecarga de mantenimiento.
*   (Positivo) La prohibición de `container_name` asegura cero colisiones en entornos multicontenedor.
*   (Negativo) El sistema es monolítico a nivel de despliegue, limitando el escalado horizontal independiente (aunque el backend sin estado puede escalar mediante réplicas básicas si fuera necesario en el futuro).