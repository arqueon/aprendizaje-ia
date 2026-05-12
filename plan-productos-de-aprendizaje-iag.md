# Plan consolidado — Productos de aprendizaje con IAG

_Generado: 2026-05-11. Última actualización: 2026-05-11 (sumadas 2 guías Gemini para Ensayo y Análisis de casos)._
_Ubicación destino del contenido: `content/ia-educacion/productos-de-aprendizaje/`_

Este documento consolida cuatro fuentes UDG (`Guia_IAG_Educacion_Superior_FINAL.docx`,
`Guia_IAG_Educacion_Superior_AMPLIADA.docx`, `Guia_IAG_con_prompts.docx` y
`Rubrica_IAG.docx`) más dos guías interactivas externas (Gemini: Ensayo
académico de 4 fases y Análisis de casos Global-Local de 6 fases) en un único
marco para construir **27 páginas** en el sitio, una por cada producto de
aprendizaje. Incorpora la **taxonomía de Bloom** como columna vertebral de
progresión y la **evaluación de procesos** (no sólo de productos) como
criterio rector.

---

## 1. Origen y fuentes

| Fuente | Aporta | Estado |
|---|---|---|
| `Guia_IAG_Educacion_Superior_FINAL.docx` | Tabla maestra de 26 productos × uso formativo × competencias **+** progresión de prompts (básico/intermedio/avanzado) para 10 productos | Base |
| `Guia_IAG_Educacion_Superior_AMPLIADA.docx` | Misma tabla maestra sin la progresión | Redundante con FINAL |
| `Guia_IAG_con_prompts.docx` | 10 productos con ejemplo de prompt único + uso + competencias | Subset; alimenta los ejemplos |
| `Rubrica_IAG.docx` | 7 criterios × 4 niveles para evaluar el uso formativo de IAG | Base de la rúbrica unificada |
| Gemini — Guía Interactiva para Ensayos Académicos | 4 fases × 5 sub-pasos para ensayo, con prompts literales por fase y énfasis en mapas mentales/conceptuales | Adoptada en `ensayo/index.md` |
| Gemini — Guía Interactiva de Análisis de Casos (Global-Local) | 6 fases (definir problema → contexto local) con prompts literales y matriz de decisión | Adoptada como **producto 27**: `analisis-de-casos/` |

Decisión consolidadora: **FINAL es la fuente canónica**; AMPLIADA queda
absorbida; los prompts de `con_prompts` complementan los ejemplos del nivel
intermedio o avanzado según corresponda.

---

## 2. Marco unificado de categorización

### 2.1 Bloom como columna vertebral

Cada ejercicio se describe con dos campos Bloom:

- **Nivel dominante** (1–6): el que vertebra la actividad principal.
- **Rango Bloom involucrado**: niveles tocados a lo largo de la secuencia.

| Nivel | Verbo rector | Qué hace el estudiante |
|---|---|---|
| 1 — Recordar | Reconocer, listar, definir | Identifica términos, fuentes, conceptos |
| 2 — Comprender | Explicar, parafrasear, resumir | Reconstruye con sus palabras |
| 3 — Aplicar | Usar, ejecutar, implementar | Lleva un procedimiento a un caso |
| 4 — Analizar | Diferenciar, organizar, atribuir | Descompone, relaciona, compara |
| 5 — Evaluar | Juzgar, criticar, contrastar | Emite juicios fundamentados |
| 6 — Crear | Generar, planear, producir | Construye algo nuevo |

### 2.2 Mapeo Bloom ↔ progresión de prompts ↔ rúbrica

La guía FINAL traía tres niveles de prompt: **básico / intermedio / avanzado**.
Se anclan a Bloom sin perder la nomenclatura del docente:

| Progresión de prompt | Bloom equivalente | Qué se le pide a la IAG |
|---|---|---|
| Básico — comprender / explorar | 1–2 (Recordar/Comprender) | Definir, listar, explicar el dominio |
| Intermedio — analizar / relacionar | 3–4 (Aplicar/Analizar) | Comparar alternativas, identificar relaciones |
| Avanzado — evaluar / crear | 5–6 (Evaluar/Crear) | Cuestionar, refutar, contrastar, proponer |

La **rúbrica IAG** (sección 3.3) cruza ortogonalmente con Bloom: un mismo
nivel Bloom puede ejecutarse con prompts pertinentes o vagos, con o sin
iteración, con o sin metacognición. Bloom marca la **profundidad cognitiva
esperada**; la rúbrica marca la **calidad del proceso** para llegar ahí.

### 2.3 Dimensiones de cada ejercicio

Toda página de ejercicio se etiqueta con seis dimensiones, además del título:

| Dimensión | Valores |
|---|---|
| `bloom_dominante` | 1–6 |
| `bloom_rango` | rango contiguo, ej. `2-5` |
| `competencias_cluster` | uno o más de: Cognitivas · Investigación · Comunicación · Profesionales · Innovación · Ingeniería |
| `area_disciplinar` | `general` · `ingenieria` · `ambas` |
| `riesgo_sustitucion_autoria` | `alto` · `medio` · `bajo` |
| `modalidad` | `cualquiera` · `presencial` · `hibrida` · `a-distancia` |

`riesgo_sustitucion_autoria` no es un juicio moral: es una guía pedagógica para
calibrar la robustez de las evidencias de proceso que se exigen al estudiante
(ver §3.2). Texto largo de autoría individual → alto. Producto técnico
verificable → bajo.

### 2.4 Agrupación de competencias

Tomada literal de FINAL (§ "Agrupación de competencias"):

- **Cognitivas** — pensamiento crítico, análisis, síntesis, sistémico.
- **Investigación** — búsqueda de información, análisis de datos, rigor metodológico.
- **Comunicación** — escrita, oral, argumentación, multimodal.
- **Profesionales** — toma de decisiones, gestión de proyectos.
- **Innovación** — creatividad, resolución de problemas.
- **Ingeniería** — diseño, modelación, programación, integración de sistemas.

---

## 3. Evaluación de procesos (no sólo de productos)

Este es el desplazamiento que hace coherente a toda la sección y al sitio:
**evaluamos qué hizo el estudiante con la IAG, no sólo qué entregó**.

### 3.1 Principios

1. **El producto es entregable, el proceso es evidencia.** Sin evidencia de
   proceso, el producto no se evalúa.
2. **La transparencia es competencia, no penalización.** Mostrar el uso de
   IAG suma; ocultarlo descalifica (ver práctica `debate-socratico-con-ia`).
3. **Lo que no se itera, no se aprendió.** Una sola interacción es signo de
   sustitución; tres o más iteraciones con anotaciones son signo de
   apropiación.
4. **La IAG opera en el "andamio", no en el techo.** Se usa para explorar,
   confrontar y revisar; el cierre intelectual lo hace el estudiante.

### 3.2 Evidencias de proceso requeridas

Toda página de ejercicio incluirá un bloque de evidencias de proceso
graduado por nivel de riesgo:

| Evidencia | Riesgo bajo | Riesgo medio | Riesgo alto |
|---|---|---|---|
| Bitácora del diálogo con IAG (transcripción) | recomendada | obligatoria | obligatoria |
| Versiones iteradas del prompt (≥3) | opcional | recomendada | obligatoria |
| Anotaciones de validación (qué aceptó/rechazó del output) | recomendada | obligatoria | obligatoria |
| Borradores previos vs. posteriores al intercambio | opcional | recomendada | obligatoria |
| Bitácora metacognitiva (qué aprendió del proceso) | recomendada | obligatoria | obligatoria |
| Declaración de uso de IAG (transparencia) | obligatoria | obligatoria | obligatoria |

### 3.3 Rúbrica IAG re-leída como rúbrica de proceso

La rúbrica de `Rubrica_IAG.docx` ya está enfocada en proceso. Se mantiene tal
cual; se añade en cada criterio una columna **"Evidencia mínima"** que liga
al §3.2 y se sugieren ponderaciones por defecto:

| Criterio | N1 Inicial | N2 En desarrollo | N3 Competente | N4 Avanzado | Evidencia mínima | Peso sugerido |
|---|---|---|---|---|---|---|
| Pertinencia del prompt | Vago o no relacionado | Relación parcial | Claro y adecuado | Altamente pertinente y estratégico | Bitácora del diálogo | 10% |
| Nivel cognitivo del prompt | Definiciones simples | Algo de análisis | Análisis y evaluación | Pensamiento crítico y metacognición | Bitácora + anclaje Bloom declarado | 15% |
| Uso crítico de la respuesta | Acepta sin cuestionar | Cuestiona superficialmente | Contrasta y analiza | Evalúa críticamente y reformula | Anotaciones de validación | 20% |
| Integración en el trabajo | Copia o depende | Uso limitado | Integra y adapta | Transforma y produce originalidad | Borradores previos/posteriores | 20% |
| Iteración del prompt | No ajusta | Ajustes mínimos | Mejora prompts | Itera estratégicamente | ≥3 versiones del prompt | 10% |
| Metacognición | No reflexiona | Reflexión superficial | Explica su aprendizaje | Analiza críticamente su proceso | Bitácora metacognitiva | 15% |
| Uso ético | Inadecuado | Básico | Adecuado | Crítico y consciente | Declaración de uso | 10% |

Los pesos son sugeridos; el docente los ajusta a su asignatura. Lo que **no
se ajusta** es el principio: ningún criterio puede valer 0 — son siete
dimensiones del proceso, todas necesarias.

---

## 4. Catálogo de 27 ejercicios

### 4.1 Tabla maestra

| # | Producto | Slug | Bloom dom. | Bloom rango | Cluster competencias | Área | Riesgo | Tiene prompts FINAL |
|---|---|---|---|---|---|---|---|---|
| 1 | Monografía | `monografia` | 4 | 2–5 | Investigación · Cognitivas · Comunicación | general | alto | ✓ |
| 2 | Ensayo | `ensayo` | 5 | 2–6 | Cognitivas · Comunicación | general | alto | ✓ |
| 3 | Nota | `nota` | 2 | 1–3 | Comunicación · Cognitivas | general | medio | — |
| 4 | Crónica | `cronica` | 6 | 3–6 | Comunicación · Innovación | general | medio | — |
| 5 | Reseña | `resena` | 5 | 4–5 | Cognitivas · Comunicación | general | alto | — |
| 6 | Entrevista | `entrevista` | 3 | 2–4 | Investigación · Comunicación | general | bajo | — |
| 7 | Proyecto | `proyecto` | 6 | 3–6 | Profesionales · Innovación | ambas | medio | ✓ |
| 8 | Mapa conceptual | `mapa-conceptual` | 4 | 2–5 | Cognitivas | ambas | bajo | ✓ |
| 9 | Artículo | `articulo` | 5 | 3–6 | Investigación · Comunicación · Cognitivas | ambas | alto | — |
| 10 | Investigación de campo | `investigacion-de-campo` | 4 | 3–5 | Investigación | general | medio | ✓ |
| 11 | Presentación | `presentacion` | 6 | 2–6 | Comunicación | ambas | medio | ✓ |
| 12 | Prototipo | `prototipo` | 6 | 3–6 | Innovación · Ingeniería | ingenieria | bajo | ✓ |
| 13 | Planos técnicos | `planos-tecnicos` | 4 | 3–5 | Ingeniería | ingenieria | bajo | — |
| 14 | Análisis económico | `analisis-economico` | 5 | 3–5 | Profesionales · Cognitivas | ambas | medio | — |
| 15 | Modelado matemático | `modelado-matematico` | 4 | 3–6 | Ingeniería · Cognitivas | ingenieria | bajo | ✓ |
| 16 | Diseño de sistemas | `diseno-de-sistemas` | 6 | 4–6 | Ingeniería · Innovación | ingenieria | bajo | — |
| 17 | Análisis de materiales | `analisis-de-materiales` | 4 | 3–5 | Ingeniería · Investigación | ingenieria | bajo | — |
| 18 | Programación | `programacion` | 3 | 2–6 | Ingeniería · Cognitivas | ingenieria | medio | ✓ |
| 19 | Automatización industrial | `automatizacion-industrial` | 6 | 3–6 | Ingeniería · Innovación | ingenieria | bajo | — |
| 20 | Metrología | `metrologia` | 4 | 3–5 | Ingeniería | ingenieria | bajo | — |
| 21 | Circuitos eléctricos | `circuitos-electricos` | 3 | 2–5 | Ingeniería | ingenieria | bajo | — |
| 22 | Control y dinámica | `control-y-dinamica` | 4 | 3–5 | Ingeniería · Cognitivas | ingenieria | bajo | — |
| 23 | Gestión industrial | `gestion-industrial` | 5 | 3–6 | Profesionales · Ingeniería | ingenieria | medio | — |
| 24 | Investigación aplicada | `investigacion-aplicada` | 5 | 3–6 | Investigación · Ingeniería | ambas | medio | — |
| 25 | Reporte técnico | `reporte-tecnico` | 3 | 2–4 | Comunicación · Ingeniería | ingenieria | medio | ✓ |
| 26 | Integración de sistemas | `integracion-de-sistemas` | 6 | 4–6 | Ingeniería · Innovación | ingenieria | bajo | — |
| 27 | Análisis de casos | `analisis-de-casos` | 5 | 2–6 | Cognitivas · Profesionales · Investigación | ambas | medio | ✓ (Gemini, 6 fases) |

### 4.2 Ficha por ejercicio (uso formativo + prompts cuando existen)

Lo que sigue es material para poblar las páginas; viene literal de FINAL salvo
el campo Bloom (añadido aquí).

#### 1. Monografía — `monografia` · Bloom 2–5 (dom. 4)
- **Uso formativo IAG:** delimitar tema con preguntas guía, estructurar plan, contrastar interpretación de datos y mejorar redacción propia.
- **Prompts:**
  - Básico (Bloom 2): _¿Qué subtemas clave debería incluir en una monografía sobre [tema]?_
  - Intermedio (Bloom 4): _¿Cómo se relacionan estos conceptos dentro del tema: [lista]?_
  - Avanzado (Bloom 5): _¿Qué aspectos de mi análisis son débiles o poco desarrollados?_

#### 2. Ensayo — `ensayo` · Bloom 2–6 (dom. 5)
- **Uso formativo IAG:** generar contraargumentos, evaluar coherencia lógica y fortalecer postura.
- **Prompts:**
  - Básico: _¿Qué ideas principales debería considerar sobre este tema?_
  - Intermedio: _¿Qué contraargumentos existen frente a esta postura?_
  - Avanzado: _Evalúa la solidez de mi argumento y señala debilidades sin reescribirlo._

#### 3. Nota — `nota` · Bloom 1–3 (dom. 2)
- **Uso formativo IAG:** verificar claridad, precisión y cobertura de información clave. _Prompts: poblar._

#### 4. Crónica — `cronica` · Bloom 3–6 (dom. 6)
- **Uso formativo IAG:** explorar estilos narrativos y enriquecer descripción sin sustituir la voz autoral. _Prompts: poblar._

#### 5. Reseña — `resena` · Bloom 4–5 (dom. 5)
- **Uso formativo IAG:** contrastar interpretaciones y fortalecer juicio crítico. _Prompts: poblar._

#### 6. Entrevista — `entrevista` · Bloom 2–4 (dom. 3)
- **Uso formativo IAG:** generar preguntas, contextualizar y organizar respuestas. _Prompts: poblar._

#### 7. Proyecto — `proyecto` · Bloom 3–6 (dom. 6)
- **Uso formativo IAG:** explorar soluciones, estructurar planeación y validar decisiones.
- **Prompts:**
  - Básico: _¿Qué elementos debe incluir un proyecto sobre [tema]?_
  - Intermedio: _¿Qué alternativas de solución existen y cómo se comparan?_
  - Avanzado: _Evalúa la viabilidad de mi propuesta considerando estos criterios: [lista]._

#### 8. Mapa conceptual — `mapa-conceptual` · Bloom 2–5 (dom. 4)
- **Uso formativo IAG:** sugerir relaciones conceptuales para validar y reorganizar.
- **Prompts:**
  - Básico: _¿Qué conceptos clave están relacionados con [tema]?_
  - Intermedio: _¿Qué relaciones jerárquicas existen entre estos conceptos: [lista]?_
  - Avanzado: _¿Qué inconsistencias o relaciones débiles hay en este mapa conceptual?_

#### 9. Artículo — `articulo` · Bloom 3–6 (dom. 5)
- **Uso formativo IAG:** delimitar problema, revisar coherencia y mejorar redacción. _Prompts: poblar._

#### 10. Investigación de campo — `investigacion-de-campo` · Bloom 3–5 (dom. 4)
- **Uso formativo IAG:** apoyar diseño metodológico e interpretación de datos.
- **Prompts:**
  - Básico: _¿Qué métodos de recolección de datos existen para este tema?_
  - Intermedio: _¿Qué método es más adecuado para este objetivo y por qué?_
  - Avanzado: _¿Qué limitaciones tiene mi diseño metodológico?_

#### 11. Presentación — `presentacion` · Bloom 2–6 (dom. 6)
- **Uso formativo IAG:** estructurar discurso y anticipar preguntas.
- **Prompts:**
  - Básico: _¿Cómo puedo organizar una presentación sobre este tema?_
  - Intermedio: _¿Qué ejemplos o analogías pueden mejorar la comprensión?_
  - Avanzado: _¿Qué debilidades tiene mi exposición en términos de claridad y coherencia?_

#### 12. Prototipo — `prototipo` · Bloom 3–6 (dom. 6)
- **Uso formativo IAG:** explorar ideas, materiales y validar soluciones.
- **Prompts:**
  - Básico: _¿Qué posibles soluciones existen para este problema?_
  - Intermedio: _¿Qué ventajas y desventajas tienen estas alternativas?_
  - Avanzado: _¿Cómo podría mejorar mi diseño para hacerlo más eficiente o innovador?_

#### 13. Planos técnicos — `planos-tecnicos` · Bloom 3–5 (dom. 4)
- **Uso formativo IAG:** detectar inconsistencias y mejorar claridad técnica. _Prompts: poblar._

#### 14. Análisis económico — `analisis-economico` · Bloom 3–5 (dom. 5)
- **Uso formativo IAG:** explorar escenarios financieros y validar cálculos. _Prompts: poblar._

#### 15. Modelado matemático — `modelado-matematico` · Bloom 3–6 (dom. 4)
- **Uso formativo IAG:** verificar modelos, variables y resultados.
- **Prompts:**
  - Básico: _¿Qué variables son importantes en este modelo?_
  - Intermedio: _¿Cómo afectan estas variables al resultado?_
  - Avanzado: _¿Qué supuestos limitan este modelo y cómo podrían mejorarse?_

#### 16. Diseño de sistemas — `diseno-de-sistemas` · Bloom 4–6 (dom. 6)
- **Uso formativo IAG:** explorar alternativas y justificar decisiones. _Prompts: poblar._

#### 17. Análisis de materiales — `analisis-de-materiales` · Bloom 3–5 (dom. 4)
- **Uso formativo IAG:** interpretar resultados y contrastar con teoría. _Prompts: poblar._

#### 18. Programación — `programacion` · Bloom 2–6 (dom. 3)
- **Uso formativo IAG:** depurar código y comprender errores.
- **Prompts:**
  - Básico: _Explícame qué hace este código._
  - Intermedio: _¿Qué errores tiene este código y por qué ocurren?_
  - Avanzado: _Sugiere mejoras en eficiencia y justifica los cambios sin reescribir completamente el código._

#### 19. Automatización industrial — `automatizacion-industrial` · Bloom 3–6 (dom. 6)
- **Uso formativo IAG:** proponer arquitecturas y validar selección. _Prompts: poblar._

#### 20. Metrología — `metrologia` · Bloom 3–5 (dom. 4)
- **Uso formativo IAG:** analizar mediciones y errores. _Prompts: poblar._

#### 21. Circuitos eléctricos — `circuitos-electricos` · Bloom 2–5 (dom. 3)
- **Uso formativo IAG:** explicar comportamientos y validar resultados. _Prompts: poblar._

#### 22. Control y dinámica — `control-y-dinamica` · Bloom 3–5 (dom. 4)
- **Uso formativo IAG:** interpretar ecuaciones y comportamiento de sistemas. _Prompts: poblar._

#### 23. Gestión industrial — `gestion-industrial` · Bloom 3–6 (dom. 5)
- **Uso formativo IAG:** analizar procesos y proponer mejoras. _Prompts: poblar._

#### 24. Investigación aplicada — `investigacion-aplicada` · Bloom 3–6 (dom. 5)
- **Uso formativo IAG:** delimitar problemas y revisar metodología. _Prompts: poblar._

#### 25. Reporte técnico — `reporte-tecnico` · Bloom 2–4 (dom. 3)
- **Uso formativo IAG:** mejorar claridad y precisión del lenguaje.
- **Prompts:**
  - Básico: _¿Cómo puedo estructurar este reporte?_
  - Intermedio: _¿Qué partes necesitan mayor claridad?_
  - Avanzado: _Evalúa la precisión y rigor de este texto técnico y sugiere mejoras._

#### 26. Integración de sistemas — `integracion-de-sistemas` · Bloom 4–6 (dom. 6)
- **Uso formativo IAG:** analizar interacción entre subsistemas. _Prompts: poblar._

#### 27. Análisis de casos — `analisis-de-casos` · Bloom 2–6 (dom. 5) · _añadido desde Gemini_
- **Uso formativo IAG:** definir con precisión el problema central, ampliar el rango de alternativas, refinar criterios de evaluación, justificar la decisión y aterrizar la dimensión local. Seis fases con prompt literal por fase (ver `analisis-de-casos/index.md`).
- **Prompts (resumidos):**
  - F1 Definición (Bloom 2): _"Actúa como un tutor de análisis de casos… ¿esta formulación es clara, concisa y refleja la raíz del asunto?"_
  - F2 Alternativas (Bloom 6): _"Ayúdame a generar tres alternativas de solución que sean distintas entre sí, considerando un enfoque [tecnológico/social/comunitario] para cada una."_
  - F3 Criterios (Bloom 5): _"He propuesto los criterios […]. ¿Son pertinentes y distintos? Sugiéreme cómo hacerlos más específicos o medibles."_
  - F4 Decisión (Bloom 5–6): _"He elegido la alternativa […]. Ayúdame a estructurar un párrafo de justificación que (1) afirme mi decisión, (2) explique cómo satisface los criterios, y (3) la compare con las otras alternativas."_
  - F5 Crítica (Bloom 5–6): _"Actúa como un crítico experto y plantéame 3 preguntas desafiantes sobre los posibles efectos no deseados, las barreras ocultas y los grupos que podrían oponerse."_
  - F6 Contexto local (Bloom 4): _"¿Puedes ayudarme a encontrar datos o noticias recientes que muestren cómo este problema afecta específicamente a mi localidad, [tu ciudad/región]?"_

---

## 5. Estructura Hugo de la sección

```
content/ia-educacion/productos-de-aprendizaje/
├── _index.md                       ← hub
├── monografia/
│   ├── index.md
│   └── featured.webp               ← pendiente de generar
├── ensayo/
│   ├── index.md
│   └── featured.webp
├── nota/
│   └── index.md
├── ... (23 más)
└── integracion-de-sistemas/
    └── index.md
```

Convenciones que vienen del sitio (CLAUDE.md):

- `showHero: true`. `heroStyle` se hereda de `hugo.toml`.
- Cada página tiene `featured.webp` (~1200×630). Pendiente de generar en
  segunda pasada — los esqueletos quedan sin imagen y con un TODO marcado.
- Taxonomía `areas` obligatoria. Para esta sección se usa `["ia", "evaluacion", "pedagogia"]` por defecto; cada ficha puede sumar más.
- Las categorías y tags incluyen el nivel Bloom como tag (`bloom-4`) para
  filtros y como categoría `producto-aprendizaje` para agrupación.

---

## 6. Plantilla de página de ejercicio

Front-matter base (los esqueletos del §7 lo expanden con valores reales):

```yaml
---
title: "[Producto] con IAG"
date: 2026-05-11
draft: true
description: "[1 línea: qué entrega el estudiante y qué hace la IAG en el camino]"
summary: "[2 líneas para tarjeta]"
tags: ["producto-aprendizaje", "bloom-4", "[cluster1]", "[cluster2]"]
categories: ["producto-aprendizaje"]
areas: ["ia", "evaluacion", "pedagogia"]

# Dimensiones del marco unificado
bloom_dominante: 4
bloom_rango: "2-5"
competencias_cluster: ["Investigación", "Cognitivas"]
area_disciplinar: "general"
riesgo_sustitucion_autoria: "alto"
modalidad: "cualquiera"

showHero: true
showTableOfContents: true
showBreadcrumbs: true
showSummary: true
showTaxonomies: true
showRelatedContent: true
showAuthor: false
---
```

Cuerpo (secciones obligatorias, en este orden):

```markdown
{{< lead >}}[Gancho de una frase: qué cambia evaluar el proceso, no sólo el producto]{{< /lead >}}

## Qué es y para qué sirve
[2–4 párrafos: definición del producto + uso formativo de la IAG]

## Bloom y progresión de prompts
| Nivel Bloom | Qué pide al estudiante | Prompt sugerido |
|---|---|---|
| 2 — Comprender | … | _…_ |
| 4 — Analizar | … | _…_ |
| 5 — Evaluar | … | _…_ |

## Competencias que desarrolla
- [cluster 1]: …
- [cluster 2]: …

## Secuencia de la actividad (proceso → producto)
{{< timeline >}}
  {{< timelineItem icon="pencil" header="Fase 1 — Encuadre" subheader="Antes de la IAG">}}…{{< /timelineItem >}}
  {{< timelineItem icon="brain" header="Fase 2 — Diálogo con IAG" subheader="Iteración">}}…{{< /timelineItem >}}
  {{< timelineItem icon="list-check" header="Fase 3 — Cierre autoral" subheader="Sin IAG">}}…{{< /timelineItem >}}
  {{< timelineItem icon="magnifying-glass" header="Fase 4 — Entrega y reflexión">}}…{{< /timelineItem >}}
{{< /timeline >}}

## Evidencias de proceso requeridas
[Marcar según riesgo, ver §3.2 del plan]
- [ ] Bitácora del diálogo con IAG
- [ ] ≥3 iteraciones del prompt
- [ ] Anotaciones de validación
- [ ] Borradores antes/después
- [ ] Bitácora metacognitiva
- [ ] Declaración de uso

## Cómo se evalúa (rúbrica de proceso)
[Tabla 7×4 de la rúbrica IAG, con pesos ajustables]

## Riesgos y salvaguardas
[Qué puede salir mal y cómo se mitiga]

{{< alert icon="shield-halved" type="warning" >}}
**Transparencia obligatoria.** [Mensaje específico al producto]
{{< /alert >}}

## Ejemplos y enlaces
- Práctica relacionada en el Laboratorio: …
- Glosario: …
```

---

## 7. Hoja de ruta de poblamiento

### Olas sugeridas

| Ola | Páginas | Criterio | Tiempo estimado |
|---|---|---|---|
| 1 — Anclas | `_index`, `ensayo`, `monografia`, `proyecto`, `presentacion`, `programacion` | Cubren los 6 clusters de competencias y los 6 niveles Bloom; ya traen prompts de FINAL | 1 sprint |
| 2 — Resto con prompts FINAL | `mapa-conceptual`, `investigacion-de-campo`, `prototipo`, `modelado-matematico`, `reporte-tecnico` | Aprovechar prompts ya escritos | 1 sprint |
| 3 — General sin prompts | `nota`, `cronica`, `resena`, `entrevista`, `articulo` | Productos de letras/humanidades | 1 sprint |
| 4 — Ingeniería sin prompts | `planos-tecnicos`, `analisis-economico`, `diseno-de-sistemas`, `analisis-de-materiales`, `automatizacion-industrial`, `metrologia`, `circuitos-electricos`, `control-y-dinamica`, `gestion-industrial`, `investigacion-aplicada`, `integracion-de-sistemas` | Bloque ingenieril; redactar prompts faltantes | 2 sprints |
| 5 — Imágenes `featured.webp` | Las 26 | Generar tras revisión de texto | 1 sprint |

### Definición de "página terminada"

- [ ] `draft: false`
- [ ] Las 7 secciones del cuerpo presentes
- [ ] Tabla Bloom × prompts con al menos 3 niveles
- [ ] Evidencias de proceso marcadas (no genéricas)
- [ ] Rúbrica con pesos concretos para ese producto
- [ ] `featured.webp` presente
- [ ] Enlace bidireccional con al menos 1 práctica del Laboratorio o 1 entrada del Glosario

### Trabajo posterior (fuera de esta hoja)

- Añadir al menú de IA en Educación un enlace a `productos-de-aprendizaje/`.
- Crear glosario `productos-de-aprendizaje` que liste los 26 con tarjetas.
- Decidir si el `riesgo_sustitucion_autoria` se publica visible o se usa sólo
  internamente para calibrar la rúbrica.
- Versionar la rúbrica como página propia en `formacion-docente/` para
  reutilizarla desde otras secciones.
