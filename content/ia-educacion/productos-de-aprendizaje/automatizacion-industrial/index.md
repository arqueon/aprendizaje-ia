---
title: "Automatización industrial con IAG"
date: 2026-05-11
draft: false
description: "Cómo diseñar una solución de automatización industrial con apoyo formativo de IAG, evaluando la arquitectura de control, la seguridad operacional y las pruebas de aceptación."
summary: "Automatización industrial con IAG: arquitecturas de control (PLC, DCS, SCADA), selección de sensores y actuadores, seguridad operacional y pruebas FAT/SAT. Progresión de prompts por nivel Bloom y rúbrica de proceso."
tags: ["producto-aprendizaje", "bloom-6", "rubrica-iag", "ingeniería", "innovación", "automatización", "control-industrial"]
categories: ["producto-aprendizaje"]
areas: ["ia", "evaluacion", "pedagogia"]

bloom_dominante: 6
bloom_rango: "3-6"
competencias_cluster: ["Ingeniería", "Innovación"]
area_disciplinar: "ingenieria"
riesgo_sustitucion_autoria: "bajo"
modalidad: "cualquiera"
asignatura_ejemplo: "Ingeniería en automatización / Mecatrónica / Industrial / Eléctrica"

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
Una propuesta de automatización se evalúa por cómo se comporta cuando algo falla, no por cómo luce en el diagrama. La IAG puede mapear arquitecturas y recordar pruebas indispensables; la responsabilidad de seguridad operacional es del estudiante.
{{< /lead >}}

## Qué es y para qué sirve

La **automatización industrial** propone una solución de control para
un proceso productivo o de servicio: arquitectura, instrumentación,
lógica y pruebas. Valor formativo: integración técnica, conciencia de
seguridad operacional y trazabilidad desde el requerimiento hasta la
puesta en marcha.

**Uso formativo de la IAG:** mapear arquitecturas de control,
identificar errores típicos de selección de instrumentación, señalar
riesgos de seguridad operacional y orientar pruebas de aceptación
(FAT/SAT).

## Bloom y progresión de prompts

Nivel dominante **6 — Crear** (la propuesta integrada lista para
pruebas).

| Nivel Bloom | Movimiento del diseño | Qué hace el estudiante | Prompt sugerido |
|---|---|---|---|
| 3 — Aplicar | Arquitectura de control | Decide entre PLC, DCS, SCADA, edge | _"Necesito automatizar [proceso]. ¿Qué arquitecturas de control son estándar (PLC, DCS, SCADA, edge computing) y qué condiciona la elección?"_ |
| 4 — Analizar | Instrumentación | Selecciona sensores y actuadores con criterio | _"Para mi proceso, los actuadores y sensores candidatos son [lista]. ¿Qué criterios técnicos uso para seleccionarlos y qué errores típicos de selección debo evitar?"_ |
| 5 — Evaluar | Seguridad operacional | Identifica riesgos no considerados | _"He propuesto esta arquitectura de automatización: [descripción]. ¿Qué riesgos de seguridad operacional (process safety, ciberseguridad OT) no estoy considerando?"_ |
| 6 — Crear **(dominante)** | Pruebas de aceptación | Estructura FAT/SAT | _"Tengo el diseño funcional. ¿Qué pruebas de aceptación (FAT/SAT) son indispensables antes de la puesta en marcha y cómo las estructuro?"_ |

## Competencias que desarrolla

- **Ingeniería** — integración de sistemas de control, seguridad operacional, normativa industrial.
- **Innovación** — propuesta técnica completa con conciencia de fallo.

## Secuencia de la actividad (proceso → producto)

{{< timeline >}}

{{< timelineItem icon="industry" header="Fase 1 — Proceso y arquitectura" subheader="Encuadre" >}}
Caracterización del proceso a automatizar y elección de arquitectura
de control.
{{< /timelineItem >}}

{{< timelineItem icon="circle-nodes" header="Fase 2 — Instrumentación y lógica" subheader="Diseño" >}}
Selección de sensores, actuadores y desarrollo de la lógica de
control por el estudiante.
{{< /timelineItem >}}

{{< timelineItem icon="shield-halved" header="Fase 3 — Seguridad operacional" subheader="Revisión de riesgos" >}}
Identificación con IAG de riesgos no considerados (process safety y
ciberseguridad OT).
{{< /timelineItem >}}

{{< timelineItem icon="vial" header="Fase 4 — Pruebas FAT/SAT" subheader="Aceptación" >}}
Estructuración de pruebas indispensables antes de la puesta en
marcha.
{{< /timelineItem >}}

{{< /timeline >}}

## Evidencias de proceso requeridas

| Evidencia | Estado | Forma concreta |
|---|---|---|
| Bitácora del diálogo con IAG | recomendada | Transcripción por fase |
| P&ID o diagrama de arquitectura | obligatoria | Diagrama propio del estudiante |
| Lista de instrumentación con criterio | obligatoria | Hojas de selección con justificación |
| Análisis de riesgo operacional | obligatoria | HAZOP simplificado, LOPA o análogo |
| Plan de pruebas FAT/SAT | obligatoria | Protocolo de aceptación |
| Anotaciones de validación | obligatoria | Qué riesgos señalados se incorporaron |
| Bitácora metacognitiva | recomendada | Qué aprendió sobre operar bajo riesgo |
| Declaración de uso de IAG | obligatoria | Modelo, contexto y propósito |

## Cómo se evalúa (rúbrica de proceso)

| Criterio | N1 Inicial | N2 En desarrollo | N3 Competente | N4 Avanzado | Peso |
|---|---|---|---|---|---|
| Pertinencia del prompt | Vago | Relación parcial | Claro y adecuado | Pertinente y estratégico | 10% |
| Nivel cognitivo del prompt | Pide la solución | Algo de análisis | Análisis y evaluación | Pensamiento crítico — IAG como par auditor | 15% |
| Uso crítico de la respuesta | Acepta sin cuestionar | Cuestiona poco | Contrasta y analiza | Evalúa y reformula con criterio de seguridad | 20% |
| Integración en el trabajo | Copia | Uso limitado | Integra y adapta | Transforma; la propuesta es propia | 20% |
| Iteración del prompt | No ajusta | Ajustes mínimos | Mejora prompts | Itera estratégicamente | 10% |
| Metacognición | No reflexiona | Reflexión superficial | Explica su aprendizaje | Analiza decisiones de seguridad | 15% |
| Uso ético | Inadecuado | Básico | Adecuado | Crítico — conciencia de riesgo a personas y entorno | 10% |

## Riesgos y salvaguardas

- **Diseño sin análisis de riesgo.** Grave. Salvaguarda: HAZOP o
  análogo obligatorio.
- **Instrumentación sobre-especificada.** Salvaguarda: justificación
  por componente obligatoria.
- **Ciberseguridad OT no considerada.** Salvaguarda: el prompt nivel 5
  obliga a nombrarla explícitamente.
- **Pruebas FAT/SAT ausentes o triviales.** Salvaguarda: protocolo de
  aceptación obligatorio.

{{< alert icon="shield-halved" type="warning" >}}
**Transparencia obligatoria.** Declarar uso de IAG y entregar análisis
de riesgo. La responsabilidad operacional de la propuesta es del
estudiante.
{{< /alert >}}

## Asignatura de ejemplo

Ingeniería en automatización, mecatrónica, industrial, eléctrica;
proyectos integradores con instrumentación de procesos.

## Ejemplos y enlaces

- Producto cercano: [Diseño de sistemas con IAG]({{< ref "/ia-educacion/productos-de-aprendizaje/diseno-de-sistemas" >}}) — encuadre arquitectónico previo.
- Producto cercano: [Control y dinámica con IAG]({{< ref "/ia-educacion/productos-de-aprendizaje/control-y-dinamica" >}}) — base teórica de la lógica de control.
- Producto cercano: [Integración de sistemas con IAG]({{< ref "/ia-educacion/productos-de-aprendizaje/integracion-de-sistemas" >}}) — integración con TI.
- Marco general: ver `plan-productos-de-aprendizaje-iag.md`.

## Fuente

Marco UDG (`Guia_IAG_Educacion_Superior_FINAL`) + redacción de prompts
nivelados a Bloom específicamente para este producto.
