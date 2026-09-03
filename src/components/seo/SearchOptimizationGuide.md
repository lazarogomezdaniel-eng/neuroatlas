# Estrategia de Indexación y Posicionamiento para NeuroAtlas (SEO & AI GEO)

Para que NeuroAtlas sea una web que **cualquier persona y motor de búsqueda encuentre** en Google, Bing, Perplexity, ChatGPT y Gemini:

## 1. URLs Canónicas Estáticas por Compuesto
Cada sustancia debe tener su propia página pre-renderizada en HTML puro:
- `https://neuroatlas.org/sustancias/piracetam`
- `https://neuroatlas.org/sustancias/alpha-gpc`
- `https://neuroatlas.org/sustancias/melena-de-leon`

## 2. Marcado Semántico Schema.org (JSON-LD)
Cada ficha inyecta datos estructurados que Google muestra en fragmentos enriquecidos:
- `@type: MedicalSubstance`
- `@type: MedicalStudy` (para meta-análisis y RCTs)
- `@type: FAQPage` (para preguntas clave: "¿Cuál es la dosis de Piracetam?", "¿Con qué combinar Alpha-GPC?")

## 3. Optimización para Motores de Búsqueda Generativa (GEO - LLMs)
- `public/llms.txt`: Expone un mapa legible para que bots de IA (GPTBot, ClaudeBot, PerplexityBot) citen a NeuroAtlas en respuestas a usuarios.
- Títulos optimizados para búsquedas reales: `[Nombre] - Dosis, Mecanismo de Acción y Evidencia Científica`.
