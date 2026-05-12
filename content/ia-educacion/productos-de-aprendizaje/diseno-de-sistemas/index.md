---
title: "Diseño de sistemas con IAG"
date: 2026-05-11
draft: false
description: "Cómo abordar el diseño de un sistema con apoyo formativo de IAG, evaluando arquitecturas de referencia, trade-offs y subsistemas críticos no considerados."
summary: "Diseño de sistemas con IAG: arquitecturas de referencia, evaluación de trade-offs e identificación de subsistemas o interfaces críticas. Progresión de prompts por nivel Bloom y rúbrica de proceso."
tags: ["producto-aprendizaje", "bloom-6", "rubrica-iag", "ingeniería", "innovación", "diseño-de-sistemas", "arquitectura"]
categories: ["producto-aprendizaje"]
areas: ["ia", "evaluacion", "pedagogia"]

bloom_dominante: 6
bloom_rango: "4-6"
competencias_cluster: ["Ingeniería", "Innovación"]
area_disciplinar: "ingenieria"
riesgo_sustitucion_autoria: "bajo"
modalidad: "cualquiera"
asignatura_ejemplo: "Ingeniería de sistemas / Software / Mecatrónica / Industrial"

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
Un sistema se diseña con lo que se ve y se rompe con lo que no se vio. La IAG ayuda a mapear arquitecturas de referencia y a recordar subsistemas olvidados; las decisiones de trade-off y la responsabilidad operativa son del estudiante.
{{< /lead >}}

## Qué es y para qué sirve

El **diseño de sistemas** define la arquitectura, los componentes, las
interfaces y los flujos de un sistema técnico complejo (mecánico,
electrónico, software, ciber-físico). Valor formativo: pensamiento
arquitectónico, trade-offs explícitos y anticipación de fallos en
operación real.

**Uso formativo de la IAG:** mapear arquitecturas de referencia,
evaluar trade-offs entre alternativas e identificar subsistemas o
interfaces que el estudiante no consideró.

## Bloom y progresión de prompts

Nivel dominante **6 — Crear** (la construcción de una arquitectura
propia).

| Nivel Bloom | Movimiento del diseño | Qué hace el estudiante | Prompt sugerido |
|---|---|---|---|
| 4 — Analizar | Arquitecturas de referencia | Conoce el espacio de arquitecturas y sus trade-offs | _"Necesito diseñar un sistema para [requerimiento]. ¿Qué arquitecturas de referencia existen (monolítica, modular, distribuida, etc.) y qué trade-offs imponen?"_ |
| 5 — Evaluar | Trade-offs aplicados | Compara alternativas bajo criterios técnicos | _"He preseleccionado estas arquitecturas: [lista]. Aplica los criterios [escalabilidad, mantenibilidad, costo, etc.] y muéstrame ventajas/desventajas. No decidas por mí."_ |
| 6 — Crear **(dominante)** | Subsistemas críticos | Identifica omisiones en su diseño | _"Mi diseño propuesto es: [descripción]. ¿Qué subsistemas o interfaces no estoy considerando que podrían ser críticos en operación real?"_ |

## Competencias que desarrolla

- **Ingeniería** — pensamiento sistémico, integración de subsistemas, diseño con trade-offs explícitos.
- **Innovación** — exploración divergente de arquitecturas, decisión bajo incertidumbre.

## Secuencia de la actividad (proceso → producto)

{{< timeline >}}

{{< timelineItem icon="layer-group" header="Fase 1 — Requerimientos y arquitecturas" subheader="Mapeo" >}}
Levantamiento de requerimientos y revisión de arquitecturas de
referencia.
{{< /timelineItem >}}

{{< timelineItem icon="scale-balanced" header="Fase 2 — Trade-offs" subheader="Decisión" >}}
Comparación de alternativas con criterios explícitos y selección
justificada.
{{< /timelineItem >}}

{{< timelineItem icon="diagram-project" header="Fase 3 — Diseño detallado" subheader="Construcción autoral" >}}
Diseño de subsistemas e interfaces por el estudiante.
{{< /timelineItem >}}

{{< timelineItem icon="bug-slash" header="Fase 4 — Revisión por omisiones" subheader="Anticipación de fallos" >}}
La IAG actúa como par revisor para identificar subsistemas o
interfaces no consideradas que serían críticas en operación.
{{< /timelineItem >}}

{{< /timeline >}}

## Evidencias de proceso requeridas

Riesgo **bajo**: los diagramas y especificaciones son difíciles de
generar consistentemente sin oficio.

| Evidencia | Estado | Forma concreta |
|---|---|---|
| Bitácora del diálogo con IAG | recomendada | Transcripción por fase |
| Documento de requerimientos | obligatoria | Versión propia del estudiante |
| Matriz arquitecturas × criterios | obligatoria | Con argumento por descarte |
| Diagrama de arquitectura propio | obligatoria | Bloque, secuencia, despliegue o lo que aplique |
| Especificación de interfaces críticas | obligatoria | Lista de interfaces con responsabilidades |
| Bitácora metacognitiva | recomendada | Trade-offs aceptados y por qué |
| Declaración de uso de IAG | obligatoria | Modelo, contexto y propósito |

## Cómo se evalúa (rúbrica de proceso)

| Criterio | N1 Inicial | N2 En desarrollo | N3 Competente | N4 Avanzado | Peso |
|---|---|---|---|---|---|
| Pertinencia del prompt | Vago | Relación parcial | Claro y adecuado | Pertinente y estratégico | 10% |
| Nivel cognitivo del prompt | Pide la arquitectura | Algo de análisis | Análisis de trade-offs | Pensamiento crítico — IAG como par arquitecto | 15% |
| Uso crítico de la respuesta | Acepta sin cuestionar | Cuestiona poco | Contrasta y analiza | Evalúa y reformula con argumento técnico | 20% |
| Integración en el trabajo | Copia | Uso limitado | Integra y adapta | Transforma; el diseño es propio | 20% |
| Iteración del prompt | No ajusta | Ajustes mínimos | Mejora prompts | Itera estratégicamente | 10% |
| Metacognición | No reflexiona | Reflexión superficial | Explica su aprendizaje | Analiza trade-offs aceptados | 15% |
| Uso ético | Inadecuado | Básico | Adecuado | Crítico y consciente | 10% |

## Riesgos y salvaguardas

- **Arquitectura de moda adoptada sin análisis.** Salvaguarda: matriz
  trade-offs obligatoria.
- **Interfaces sin responsabilidades claras.** Salvaguarda: especificación
  obligatoria con qué hace cada componente y dónde termina.
- **Sobre-ingeniería.** Salvaguarda: el criterio de viabilidad del
  contexto se incorpora explícitamente.
- **Ausencia de operación real.** El diseño olvida pruebas, despliegue o
  mantenimiento. Salvaguarda: el prompt avanzado obliga a pensar
  subsistemas críticos en operación.

{{< alert icon="shield-halved" type="warning" >}}
**Transparencia obligatoria.** Declarar uso de IAG. La arquitectura,
los trade-offs y la responsabilidad operativa son del estudiante.
{{< /alert >}}

## Asignatura de ejemplo

Ingeniería de sistemas, software, mecatrónica, industrial, civil
estructural.

## Ejemplos y enlaces

- Producto cercano: [Integración de sistemas con IAG]({{< ref "/ia-educacion/productos-de-aprendizaje/integracion-de-sistemas" >}}) — etapa posterior.
- Producto cercano: [Proyecto con IAG]({{< ref "/ia-educacion/productos-de-aprendizaje/proyecto" >}}) — encuadre que precede al diseño.
- Producto cercano: [Prototipo con IAG]({{< ref "/ia-educacion/productos-de-aprendizaje/prototipo" >}}) — materialización del diseño.
- Marco general: ver `plan-productos-de-aprendizaje-iag.md`.

## Fuente

Marco UDG (`Guia_IAG_Educacion_Superior_FINAL`) + redacción de prompts
nivelados a Bloom específicamente para este producto.
