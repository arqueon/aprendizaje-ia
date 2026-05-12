---
title: "Mapa conceptual con IAG"
date: 2026-05-11
draft: false
description: "Cómo construir un mapa conceptual con apoyo formativo de IAG, evaluando la jerarquización, las relaciones explícitas y la crítica del propio mapa."
summary: "Mapa conceptual con IAG: identificación de conceptos clave, jerarquización, mapeo de relaciones y autocrítica del mapa. Progresión de prompts por nivel Bloom y rúbrica de proceso."
tags: ["producto-aprendizaje", "bloom-4", "rubrica-iag", "cognitivas", "mapa-conceptual", "pensamiento-sistémico"]
categories: ["producto-aprendizaje"]
areas: ["ia", "evaluacion", "pedagogia"]

# Dimensiones del marco unificado
bloom_dominante: 4
bloom_rango: "2-5"
competencias_cluster: ["Cognitivas"]
area_disciplinar: "ambas"
riesgo_sustitucion_autoria: "bajo"
modalidad: "cualquiera"
asignatura_ejemplo: "Cualquier asignatura con marco teórico, estudio de teorías o sistemas complejos"

showHero: true
showTableOfContents: true
showReadingTime: true
showBreadcrumbs: true
showSummary: true
showTaxonomies: true
showRelatedContent: true
showAuthor: false
---

{{< lead >}}
Un mapa conceptual es la radiografía de cómo el estudiante entiende un tema: qué pone arriba, qué pone abajo y qué conecta con qué. Si lo arma la IAG, deja de ser radiografía. Aquí evaluamos las decisiones de jerarquía y conexión.
{{< /lead >}}

## Qué es y para qué sirve

Un **mapa conceptual** representa visualmente conceptos y las relaciones
explícitas entre ellos. Es a la vez instrumento de estudio, evidencia de
comprensión y herramienta para detectar vacíos.

**Uso formativo de la IAG en este producto:** sugerir conceptos a incluir,
proponer relaciones jerárquicas a validar y señalar inconsistencias o
relaciones débiles del mapa elaborado por el estudiante. El estudiante es
quien organiza, jerarquiza y nombra las relaciones.

## Bloom y progresión de prompts

Este producto moviliza los niveles **2 a 5** de la taxonomía de Bloom, con
nivel dominante **4 — Analizar** (la articulación explícita de relaciones
jerárquicas y cruzadas).

| Nivel Bloom | Movimiento del mapa | Qué hace el estudiante | Prompt sugerido |
|---|---|---|---|
| 2 — Comprender | Identificación de conceptos | Selecciona conceptos clave del tema | _"¿Qué conceptos clave están relacionados con [tema]?"_ |
| 3 — Aplicar | Mapeo inicial | Posiciona los conceptos y traza relaciones tentativas | _"Para los conceptos [lista], ¿qué relaciones existen entre ellos? Sólo enuméralas sin dibujar el mapa."_ |
| 4 — Analizar **(dominante)** | Jerarquización | Decide qué es general, qué subordinado y qué transversal | _"¿Qué relaciones jerárquicas existen entre estos conceptos: [lista]?"_ |
| 5 — Evaluar | Crítica del mapa | Identifica inconsistencias o relaciones débiles propias | _"¿Qué inconsistencias o relaciones débiles hay en este mapa conceptual?"_ |

## Competencias que desarrolla

- **Cognitivas** — pensamiento sistémico, organización del conocimiento, abstracción, identificación de relaciones causa-efecto, parte-todo y cruzadas.

## Secuencia de la actividad (proceso → producto)

{{< timeline >}}

{{< timelineItem icon="seedling" header="Fase 1 — Inventario" subheader="Conceptos clave" >}}
El estudiante hace un primer inventario de conceptos. Consulta a la IAG
para no olvidar conceptos clave de la disciplina, pero filtra con criterio.
{{< /timelineItem >}}

{{< timelineItem icon="diagram-project" header="Fase 2 — Borrador del mapa" subheader="Sin IAG" >}}
Construcción del mapa con sus propias manos: jerarquía, nodos, conectores
con verbos explícitos ("causa", "incluye", "se opone a"). La IAG aún no
participa.
{{< /timelineItem >}}

{{< timelineItem icon="link" header="Fase 3 — Validación de relaciones" subheader="Consulta IAG" >}}
Una vez listo el borrador, el estudiante pide a la IAG validar relaciones
jerárquicas y proponer relaciones cruzadas que pudo haber omitido.
{{< /timelineItem >}}

{{< timelineItem icon="magnifying-glass" header="Fase 4 — Autocrítica" subheader="Mapa final" >}}
El estudiante pregunta a la IAG por inconsistencias y relaciones débiles
del **propio** mapa, decide qué corregir y entrega versión final con
bitácora de decisiones.
{{< /timelineItem >}}

{{< /timeline >}}

## Evidencias de proceso requeridas

Riesgo **bajo**: el mapa visual es difícil de generar de forma totalmente
plausible sin trabajo previo. Aun así, las evidencias dejan ver la
trazabilidad.

| Evidencia | Estado | Forma concreta |
|---|---|---|
| Bitácora del diálogo con IAG | recomendada | Transcripción de las fases 3 y 4 |
| ≥3 iteraciones del prompt | opcional | Útil para jerarquización |
| Anotaciones de validación | recomendada | Qué relaciones sugeridas se aceptaron/rechazaron |
| Mapa v1 (sin IAG) | obligatoria | Borrador fechado antes de consultar IAG |
| Mapa v2 (con consulta IAG) | obligatoria | Versión revisada con cambios marcados |
| Bitácora metacognitiva | recomendada | Qué relaciones agregó por su cuenta y cuáles por sugerencia |
| Declaración de uso de IAG | obligatoria | Modelo, contexto y propósito |

## Cómo se evalúa (rúbrica de proceso)

| Criterio | N1 Inicial | N2 En desarrollo | N3 Competente | N4 Avanzado | Peso |
|---|---|---|---|---|---|
| Pertinencia del prompt | Vago | Relación parcial | Claro y adecuado | Pertinente y estratégico | 10% |
| Nivel cognitivo del prompt | Pide el mapa hecho | Algo de análisis | Análisis y evaluación | Pensamiento crítico — IAG como validador, no como cartógrafo | 15% |
| Uso crítico de la respuesta | Acepta sin cuestionar | Cuestiona poco | Contrasta y analiza | Evalúa y reformula relaciones | 20% |
| Integración en el trabajo | Copia mapa IAG | Uso limitado | Integra y adapta | Transforma; el mapa refleja su comprensión | 20% |
| Iteración del prompt | No ajusta | Ajustes mínimos | Mejora prompts | Itera estratégicamente | 10% |
| Metacognición | No reflexiona | Reflexión superficial | Explica su aprendizaje | Analiza decisiones de jerarquía | 15% |
| Uso ético | Inadecuado | Básico | Adecuado | Crítico y consciente | 10% |

## Riesgos y salvaguardas

- **Mapa copiado de la IAG.** El estudiante pide el mapa y lo dibuja igual.
  Salvaguarda: entrega obligatoria del **mapa v1 sin IAG**, fechado antes
  del v2.
- **Relaciones sin verbo explícito.** Conectores genéricos ("se relaciona
  con"). Salvaguarda: cada conector debe llevar verbo específico
  ("causa", "incluye", "se opone a", "depende de").
- **Jerarquía plana.** Todos los conceptos al mismo nivel. Salvaguarda:
  rúbrica premia jerarquía con al menos 3 niveles.
- **Aceptación pasiva de relaciones cruzadas.** Salvaguarda: por cada
  relación cruzada agregada por sugerencia IAG, el estudiante debe
  justificar por escrito por qué la incorpora.

{{< alert icon="shield-halved" type="warning" >}}
**Transparencia obligatoria.** Declarar uso de IAG. Aun siendo de bajo
riesgo, la declaración es parte de la rúbrica.
{{< /alert >}}

## Asignatura de ejemplo

Cualquier asignatura con marco teórico que necesite organizarse: ciencias
naturales, ingenierías, ciencias sociales, marcos conceptuales de tesis.

## Ejemplos y enlaces

- Producto cercano: [Ensayo con IAG]({{< ref "/ia-educacion/productos-de-aprendizaje/ensayo" >}}) — usa el mapa conceptual como herramienta intermedia.
- Producto cercano: [Monografía con IAG]({{< ref "/ia-educacion/productos-de-aprendizaje/monografia" >}}) — usa esquema de relaciones análogo.
- Marco general: ver `plan-productos-de-aprendizaje-iag.md`.

## Fuente

Adaptado de la **Guia_IAG_Educacion_Superior_FINAL** (UDG), integrando Bloom
y la rúbrica IAG unificada del sitio.
