---
title: "Metrología con IAG"
date: 2026-05-11
draft: false
description: "Cómo realizar un trabajo de metrología con apoyo formativo de IAG, evaluando fuentes de incertidumbre, patrones de error y coherencia del reporte de medición."
summary: "Metrología con IAG: fuentes de incertidumbre según GUM, lectura de patrones de error sistemático/aleatorio y coherencia entre incertidumbre, trazabilidad y resolución. Progresión de prompts por nivel Bloom y rúbrica de proceso."
tags: ["producto-aprendizaje", "bloom-4", "rubrica-iag", "ingeniería", "metrología", "incertidumbre", "calidad"]
categories: ["producto-aprendizaje"]
areas: ["ia", "evaluacion", "pedagogia"]

bloom_dominante: 4
bloom_rango: "3-5"
competencias_cluster: ["Ingeniería"]
area_disciplinar: "ingenieria"
riesgo_sustitucion_autoria: "bajo"
modalidad: "cualquiera"
asignatura_ejemplo: "Ingeniería industrial / Mecánica / Control de calidad / Laboratorios de medición"

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
Una medición se evalúa por lo que se sabe sobre lo que no se sabe: la incertidumbre declarada con honestidad. La IAG puede revisar la trazabilidad y el cálculo según GUM; la medición y la responsabilidad del valor reportado son del estudiante.
{{< /lead >}}

## Qué es y para qué sirve

La **metrología** se ocupa de medir con rigor: trazabilidad,
incertidumbre, calibración y reporte coherente del resultado. Valor
formativo: conciencia de fuentes de error, manejo de la incertidumbre
según GUM y disciplina de reporte.

**Uso formativo de la IAG:** mapear fuentes típicas de incertidumbre,
identificar patrones de error sistemático/aleatorio en residuos y
revisar la coherencia entre incertidumbre declarada, trazabilidad y
resolución del instrumento.

## Bloom y progresión de prompts

Nivel dominante **4 — Analizar** (la lectura de patrones de error).

| Nivel Bloom | Movimiento metrológico | Qué hace el estudiante | Prompt sugerido |
|---|---|---|---|
| 3 — Aplicar | Fuentes de incertidumbre | Lista fuentes típicas según GUM | _"Voy a medir [magnitud] con [instrumento]. ¿Qué fuentes de incertidumbre son típicas y cómo se cuantifican según GUM?"_ |
| 4 — Analizar **(dominante)** | Patrones de error | Identifica error sistemático vs. aleatorio en residuos | _"Tengo estas mediciones: [datos]. ¿Qué patrones de error sistemático o aleatorio sugieren los residuos? No me des la corrección; sólo identifica el patrón."_ |
| 5 — Evaluar | Coherencia del reporte | Verifica coherencia entre incertidumbre, trazabilidad y resolución | _"Mi resultado es [valor ± incertidumbre]. ¿Mi incertidumbre combinada está reportada coherentemente con la trazabilidad de mis patrones y la resolución del instrumento?"_ |

## Competencias que desarrolla

- **Ingeniería** — disciplina metrológica, manejo de incertidumbre, reporte trazable.

## Secuencia de la actividad (proceso → producto)

{{< timeline >}}

{{< timelineItem icon="ruler" header="Fase 1 — Encuadre metrológico" subheader="Antes de medir" >}}
Definición de magnitud, método, instrumento y trazabilidad esperada.
La IAG mapea fuentes típicas de incertidumbre.
{{< /timelineItem >}}

{{< timelineItem icon="scale-unbalanced" header="Fase 2 — Medición" subheader="Sin IAG" >}}
Adquisición de datos según protocolo; la IAG no participa.
{{< /timelineItem >}}

{{< timelineItem icon="chart-line" header="Fase 3 — Análisis de residuos" subheader="Patrones de error" >}}
Lectura de patrones y propuesta de causas con verificación
manual de los cálculos.
{{< /timelineItem >}}

{{< timelineItem icon="file-circle-check" header="Fase 4 — Reporte" subheader="Coherencia" >}}
Reporte final del valor con su incertidumbre, trazabilidad y
resolución; verificación cruzada de coherencia.
{{< /timelineItem >}}

{{< /timeline >}}

## Evidencias de proceso requeridas

| Evidencia | Estado | Forma concreta |
|---|---|---|
| Bitácora del diálogo con IAG | recomendada | Transcripción por fase |
| Datos crudos de medición | obligatoria | Archivos o planilla con metadatos |
| Hoja de cálculo de incertidumbre | obligatoria | Cálculo paso a paso según GUM |
| Trazabilidad de patrones | obligatoria | Certificados o referencias verificables |
| Anotaciones de validación | obligatoria | Patrones de error identificados y verificados |
| Bitácora metacognitiva | recomendada | Qué aprendió sobre medir con responsabilidad |
| Declaración de uso de IAG | obligatoria | Modelo, contexto y propósito |

## Cómo se evalúa (rúbrica de proceso)

| Criterio | N1 Inicial | N2 En desarrollo | N3 Competente | N4 Avanzado | Peso |
|---|---|---|---|---|---|
| Pertinencia del prompt | Vago | Relación parcial | Claro y adecuado | Pertinente y estratégico | 10% |
| Nivel cognitivo del prompt | Pide el cálculo | Algo de análisis | Análisis de residuos | Pensamiento crítico — IAG como verificador metrológico | 15% |
| Uso crítico de la respuesta | Acepta sin cuestionar | Cuestiona poco | Contrasta y analiza | Evalúa y reformula | 20% |
| Integración en el trabajo | Copia | Uso limitado | Integra y adapta | Transforma; el reporte es propio | 20% |
| Iteración del prompt | No ajusta | Ajustes mínimos | Mejora prompts | Itera estratégicamente | 10% |
| Metacognición | No reflexiona | Reflexión superficial | Explica su aprendizaje | Analiza decisiones de declaración de incertidumbre | 15% |
| Uso ético | Inadecuado | Básico | Adecuado | Crítico — honestidad en incertidumbre | 10% |

## Riesgos y salvaguardas

- **Incertidumbre subdeclarada.** Reportar valores sin componentes
  importantes de incertidumbre. Salvaguarda: hoja de cálculo según GUM
  obligatoria.
- **Trazabilidad ausente.** Salvaguarda: certificados verificables
  obligatorios.
- **Patrones de error no investigados.** Salvaguarda: el prompt nivel 4
  obliga a identificar el patrón antes de corregir.
- **Errores de cálculo heredados de la IAG.** Salvaguarda: verificación
  manual de los pasos críticos.

{{< alert icon="shield-halved" type="warning" >}}
**Transparencia obligatoria.** Declarar uso de IAG y entregar trazabilidad
y datos crudos. La medición y la responsabilidad del reporte son del
estudiante.
{{< /alert >}}

## Asignatura de ejemplo

Ingeniería industrial, mecánica, control de calidad, laboratorios de
medición, metrología dimensional o eléctrica.

## Ejemplos y enlaces

- Producto cercano: [Análisis de materiales con IAG]({{< ref "/ia-educacion/productos-de-aprendizaje/analisis-de-materiales" >}}) — uso de mediciones para caracterización.
- Producto cercano: [Reporte técnico con IAG]({{< ref "/ia-educacion/productos-de-aprendizaje/reporte-tecnico" >}}) — comunicación del resultado.
- Marco general: ver `plan-productos-de-aprendizaje-iag.md`.

## Fuente

Marco UDG (`Guia_IAG_Educacion_Superior_FINAL`) + redacción de prompts
nivelados a Bloom específicamente para este producto.
