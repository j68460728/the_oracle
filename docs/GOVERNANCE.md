# Gobernanza Documental — The Oracle

Este documento establece la política oficial de gobernanza para toda la documentación del proyecto The Oracle. El objetivo de esta política es establecer una frontera clara entre "lo que investigamos" y "lo que decidimos", asegurando que la implementación del código se base en una única fuente de verdad.

## Clasificación de la Documentación

La documentación del repositorio se divide estrictamente en dos categorías:

### 1. Documentación de Gobernanza (Normativa)

Estos documentos son la **única fuente de verdad** para la implementación del sistema. Contienen las decisiones finales, contratos y reglas arquitectónicas. **La implementación de código solo puede basarse en estos documentos.**

- **[README.md](README.md)**: Onboarding, cómo ejecutar el proyecto y políticas operativas.
- **[VISION.md](governance/VISION.md)**: El qué y el por qué del producto. Alcance del MVP y no-objetivos.
- **[ARCHITECTURE.md](governance/ARCHITECTURE.md)**: El cómo del diseño técnico. Flujo de datos, contratos API, TTLs de caché y estándares.
- **[DECISIONS.md](governance/DECISIONS.md)**: Registro histórico de Decisiones de Arquitectura (ADR) aprobadas.
- **[GOVERNANCE.md](GOVERNANCE.md)**: Este documento, que dicta la jerarquía documental.

Cualquier cambio arquitectónico, modificación de contratos API o nueva decisión tecnológica debe reflejarse **primero** en estos documentos normativos antes de implementarse en código.

### 2. Documentación de Investigación (Histórica)

Estos documentos contienen la investigación inicial, descubrimientos sobre proveedores externos y derivación de necesidades. Son **estrictamente de referencia histórica y contexto**.

- **[AUDITORIA_FOOTBALL_DATA_API.md](research/AUDITORIA_FOOTBALL_DATA_API.md)**
- **[NECESIDADES_INFORMACION_PREPARTIDO.md](research/NECESIDADES_INFORMACION_PREPARTIDO.md)**
- **[INGENIERIA_NECESIDADES_VARIABLES.md](research/INGENIERIA_NECESIDADES_VARIABLES.md)**
- **[MAPEO_API_FREE_NECESIDADES.md](research/MAPEO_API_FREE_NECESIDADES.md)**

**Invariante Crítica:** Los documentos de investigación **no** pueden modificar contratos, decisiones ni la arquitectura del sistema. Si existe alguna contradicción entre un documento histórico y uno normativo, prevalece absoluta y exclusivamente el documento normativo.

---

A partir de este punto, se considera **cerrada la fase de investigación (Document Freeze)**.
Toda implementación a partir de ahora debe seguir **exclusivamente** la documentación de gobernanza.
