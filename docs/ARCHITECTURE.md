# Arquitectura — The Oracle

Single modular system for organizing and presenting Football-Data.org info for bettors. No AI, no predictions, no ML.

## Visión General de Arquitectura

The Oracle es un sistema modular único (no microservicios) enfocado en encapsular la API de Football-Data.org (FD) y servir modelos de dominio limpios al frontend.

| Capa | Tecnología | Propósito | Restricciones Clave |
|------|------------|-----------|---------------------|
| **Frontend** | Next.js 16 (App Router), React 19, TypeScript | Presentación y consumo de API. | Solo consume The Oracle API; no se comunica directamente con FD. |
| **Backend** | Python 3.14, FastAPI, Pydantic v2 | API REST y orquestación de negocio. | API-first, orientada al modelo de negocio interno, no a la estructura FD. |
| **Caché** | Redis 7 | Rendimiento y cumplimiento de rate-limits. | TTL estricto por tipo de recurso. |
| **Infraestructura**| Docker Compose (V2) | Orquestación consistente de contenedores. | Políticas del workspace (sin `container_name`, uso de anchors YAML). |

## Arquitectura de Flujo de Datos

### Principio Central (Adapter Pattern)

**The Oracle trabaja exclusivamente con modelos de dominio internos. La estructura de Football-Data está encapsulada estrictamente en la capa `infrastructure/`.**

```text
Football-Data.org API
        │
        ▼ (Petición HTTP pura)
infrastructure/clients/football_data.py
        │
        ▼ (Adapter Pattern)
infrastructure/adapters/ (standings_adapter.py, matches_adapter.py, etc.)
        │
        ▼ (Transformación a Modelos de Dominio Validados)
domain/models.py
        │
        ▼ (Servicios de Lógica de Negocio)
application/services/brief_service.py
        │
        ▼ (Contratos de API REST)
api/routes/
        │
        ▼ (Consumo por cliente)
frontend/components/
```

**Invariante Crítica:** Solamente el directorio `infrastructure/adapters/` y el cliente conocen la estructura JSON de Football-Data. Los servicios de negocio y las rutas REST trabajan únicamente con los modelos de dominio.

## Contratos de API (Endpoints Oficiales)

The Oracle API expone endpoints orientados al negocio, no son un espejo de la API de Football-Data. Las rutas utilizan IDs estables en lugar de nombres de texto libre.

```http
# Estado del sistema
GET /api/v1/health

# Oracle Brief (Core MVP): Agrega llamadas a FD tras la caché en una sola respuesta.
GET /api/v1/brief/{competition_id}/{home_id}/{away_id}

# Clasificación de la liga (Soporte)
GET /api/v1/standings/{code}
```

## Estrategia de Caché y Rate Limits

Para cumplir con el límite estricto de Football-Data.org (10 solicitudes/minuto, plan Free), The Oracle utiliza Redis con políticas de TTL (Time-To-Live) exactas según el recurso.

### TTLs Oficiales en Redis

| Patrón de Clave (Key Pattern) | TTL | Razón de la vigencia |
|---------------------------------------------|----------|----------------------------------------|
| `oracle:standings:{code}:{season}` | 86400s (24h)| Cambia únicamente por jornada completada. |
| `oracle:scorers:{code}:{season}` | 86400s (24h)| Cambia únicamente por jornada completada. |
| `oracle:team:{id}` | 604800s (7d)| Información base muy estable (plantilla).|
| `oracle:teammatches:{id}:{params_hash}` | 3600s (1h) | Puede haber partidos recientes terminados. |
| `oracle:head2head:{match_id}` | 604800s (7d)| Historial directo es estático hasta el próximo partido entre ambos. |

La gestión del Rate Limit (10/min) se debe aplicar proactivamente dentro de `infrastructure/clients/football_data.py` antes de cualquier llamada HTTP hacia FD. Si se supera, se lanza una excepción gracefully sin exponer detalles internos de FD.

## Estándares de Infraestructura (Docker)

El orquestador del proyecto es Docker Compose V2. Debe respetar las siguientes reglas estipuladas para este repositorio:

1. **Sin `container_name`**: Compose debe asignar dinámicamente los nombres (`<dir>_<service>_1`).
2. **Sin `version:`**: Obsoleto en Docker Compose V2.
3. **YAML Anchors en la raíz**: Toda extensión (`x-*`) debe ubicarse en la raíz del documento, nunca anidada dentro de `services:`.
4. **Volúmenes/Redes relativas**: No usar propiedades `name:` en los bloques de volúmenes o redes.
5. **Dependencia y Healthcheck**: El servicio `api` depende obligatoriamente de `redis` con la condición `condition: service_healthy`.

### Política de Puertos

The Oracle utiliza el bloque de puertos 15800–15899:

| Servicio | Offset | Puerto | Fase |
|---------------------------|--------|--------|----------|
| Next.js (Frontend) | +00 | 15800 | MVP |
| FastAPI (Backend) | +01 | 15801 | MVP |
| Gateway | +03 | 15803 | Reservado|
| Gateway Secundario | +04 | 15804 | Reservado|
| Base de Datos SQL | +10 | 15810 | Reservado|
| Redis | +13 | 15813 | MVP |
| RabbitMQ | +15 | 15815 | Reservado|
| RabbitMQ Management | +41 | 15841 | Reservado|

## Observabilidad

Se requiere un rastreo y monitoreo básico pero robusto enfocado en la latencia, el estado de la caché y el consumo de la cuota de la API de Football-Data.

### Métricas Requeridas
* **Rastreo (Tracing)**: Generación de un `request_id` único, endpoint llamado y método HTTP.
* **Rendimiento**: Tiempo de respuesta (`response_time`) y tasa de aciertos de la caché (`cache_hit_rate`).
* **Dependencia Externa**: Llamadas por minuto a FD y estado límite de tasa restante (`rate limit status`).
* **Salud**: Estado general del servicio y dependencias (Redis).

### Headers de Respuesta Obligatorios

Cada respuesta de The Oracle API debe exponer esta telemetría en sus cabeceras HTTP:

```http
X-Request-ID: req_1234567890abcdef
X-Response-Time: 245ms
X-Cache-Status: HIT (cache key oracle:standings:PL:2024)
X-FD-Requests-Remaining: 8
```