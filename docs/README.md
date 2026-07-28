# The Oracle

Single modular system for organizing and presenting Football-Data.org info for bettors. No AI, no predictions, no ML.

## Objetivo

The Oracle construye un sistema que organiza, transforma y presenta información de Football-Data.org para ayudar a los apostadores a entender rápidamente el contexto pre-partido.

## Requisitos

- Docker Compose V2
- Football-Data.org API Token (Free Plan)

## Cómo empezar (Desarrollo)

El entorno de desarrollo está contenerizado. Utiliza los siguientes comandos:

```bash
# Iniciar todos los servicios
docker compose up -d

# Ver el estado de los servicios
docker compose ps

# Ver logs de un servicio específico
docker compose logs -f [service-name]

# Detener los servicios
docker compose down
```

### Puertos Activos

| Servicio | Puerto |
|---------|--------|
| Next.js (Frontend) | **15800** |
| FastAPI (Backend) | **15801** |
| Redis (Cache) | **15813** |

## Estructura del Repositorio

```
<project-root>/
├── backend/       # Aplicación FastAPI (Python 3.14)
├── frontend/      # Aplicación Next.js (React 19, TypeScript)
├── docs/          # Documentación oficial del proyecto
├── docker-compose.yml # Orquestación de infraestructura
└── .env           # Variables de entorno y secretos
```

## Documentación Oficial

Consulta **[GOVERNANCE.md](GOVERNANCE.md)** para entender la política documental del proyecto. La documentación se divide en dos categorías:

### Documentación de Gobernanza (Normativa)
*Es la única fuente de verdad para implementar el MVP.*

- **[VISION.md](governance/VISION.md)**: Definición del producto, alcance, problemas que resuelve y usuario objetivo.
- **[ARCHITECTURE.md](governance/ARCHITECTURE.md)**: Diseño técnico del MVP, capas del sistema, flujo de datos (Adapter Pattern), y estrategias de caché.
- **[DECISIONS.md](governance/DECISIONS.md)**: Registro de Decisiones Arquitectónicas (ADR) aprobadas.
- **[GOVERNANCE.md](GOVERNANCE.md)**: Política y jerarquía de la documentación.

### Documentación de Investigación (Histórica)
*Referencia sobre análisis previos; no modifican las decisiones normativas.*

- [AUDITORIA_FOOTBALL_DATA_API.md](research/AUDITORIA_FOOTBALL_DATA_API.md)
- [NECESIDADES_INFORMACION_PREPARTIDO.md](research/NECESIDADES_INFORMACION_PREPARTIDO.md)
- [INGENIERIA_NECESIDADES_VARIABLES.md](research/INGENIERIA_NECESIDADES_VARIABLES.md)
- [MAPEO_API_FREE_NECESIDADES.md](research/MAPEO_API_FREE_NECESIDADES.md)