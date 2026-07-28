# AGENTS.md — The Oracle

Single modular system for organizing and presenting Football-Data.org info for bettors. No AI, no predictions, no ML.

## Gobernanza (Governance)
**CRITICAL RULE**: Do not create a new folder, file, pattern, dependency, or layer without justifying it with a document from [docs/GOVERNANCE.md](docs/GOVERNANCE.md). All architectural or structural decisions must be driven by the governance documentation. No exceptions.

## Stack

- **Backend**: Python 3.14, FastAPI, httpx, Pydantic v2
- **Frontend**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, shadcn/ui
- **Infrastructure**: Docker Compose (V2), Redis 7 (cache), no database in MVP

## Port Policy (Block 15800–15899)

| Service | Offset | Port | Phase |
|---|---|---|---|
| Next.js (Frontend) | +00 | 15800 | MVP |
| FastAPI (Backend) | +01 | 15801 | MVP |
| Gateway | +03 | 15803 | reserved |
| Gateway Secundario | +04 | 15804 | reserved |
| Base de Datos SQL | +10 | 15810 | reserved |
| Redis | +13 | 15813 | MVP |
| RabbitMQ | +15 | 15815 | reserved |
| RabbitMQ Management | +41 | 15841 | reserved |

## Docker Standards (from `../DOCKER_STANDARDS.md`)

Must follow in every `docker-compose.yml`:

- **No `container_name`** — Compose assigns dynamic names (`<dir>_<service>_1`)
- **No `version:`** — obsolete in Compose V2
- **YAML Anchors at document root** (`x-*`), never inside `services:`
- **Relative volumes/networks** — no `name:` on volumes or networks
- **Healthcheck on Redis** — api depends on `condition: service_healthy`

## Backend Structure

```
backend/app/
├── api/routes/           # FastAPI endpoints (business-oriented, not FD mirror)
├── domain/models.py      # Pydantic entities (no FD dependency)
├── application/services/ # Use cases / orchestration
├── infrastructure/
│   ├── clients/football_data.py   # httpx client (download only)
│   ├── adapters/                  # FD JSON → domain models
│   │   ├── standings_adapter.py
│   │   ├── matches_adapter.py
│   │   └── head2head_adapter.py
│   └── cache/redis.py             # Redis wrapper with TTL per resource
├── observability/                 # logging, request_id, metrics
└── config.py

**Rule**: Only `infrastructure/adapters/` knows FD JSON structure. The client only downloads. Adapters transform FD JSON → domain models. Services and routes work with domain models only.

## API Endpoints

```
GET /api/v1/health                    → system status
GET /api/v1/brief/{competition_id}/{home_id}/{away_id}   → Oracle Brief (MVP)
GET /api/v1/standings/{code}          → league table (supporting)
```

Brief is the core business — aggregates 5 FD calls behind Redis cache into one response. Uses stable IDs, not free-text names.

## Cache Strategy (Redis)

| Key Pattern | TTL | Reason |
|---|---|---|
| `oracle:standings:{code}:{season}` | 86400s (24h) | changes per matchday |
| `oracle:scorers:{code}:{season}`