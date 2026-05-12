---
title: "Análisis de materiales con IAG"
date: 2026-05-11
draft: false
description: "Cómo realizar un análisis de materiales con apoyo formativo de IAG, evaluando parámetros operativos de la técnica, lectura de resultados y consistencia con la teoría."
summary: "Análisis de materiales con IAG: parámetros operativos de la técnica, hipótesis a verificar a partir de los datos y consistencia interpretativa con la teoría. Progresión de prompts por nivel Bloom y rúbrica de proceso."
tags: ["producto-aprendizaje", "bloom-4", "rubrica-iag", "ingeniería", "investigación", "materiales", "caracterización"]
categories: ["producto-aprendizaje"]
areas: ["ia", "evaluacion", "pedagogia"]

bloom_dominante: 4
bloom_rango: "3-5"
competencias_cluster: ["Ingeniería", "Investigación"]
area_disciplinar: "ingenieria"
riesgo_sustitucion_autoria: "bajo"
modalidad: "cualquiera"
asignatura_ejemplo: "Ingeniería de materiales / Química / Metalurgia / Caracterización de materiales"

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
Un análisis de materiales no se evalúa por lo que arroja el instrumento sino por cómo se lee. La IAG puede ofrecer hipótesis sobre patrones; la interpretación responsable contra teoría y la decisión de qué reportar son del estudiante.
{{< /lead >}}

## Qué es y para qué sirve

El **análisis de materiales** caracteriza propiedades físicas,
químicas o estructurales mediante técnicas estándar (SEM, DRX, ensayos
mecánicos, espectroscopias). Valor formativo: dominio de la técnica,
lectura crítica de resultados y consistencia con marcos teóricos.

**Uso formativo de la IAG:** verificar parámetros operativos
adecuados, sugerir hipótesis a verificar a partir de los datos y
contrastar la interpretación con la teoría establecida.

## Bloom y progresión de prompts

Nivel dominante **4 — Analizar** (la lectura de patrones y anomalías en
los resultados).

| Nivel Bloom | Movimiento del análisis | Qué hace el estudiante | Prompt sugerido |
|---|---|---|---|
| 3 — Aplicar | Parámetros de la técnica | Conoce los parámetros estándar y críticos | _"Voy a analizar [material/probeta] mediante [técnica: SEM, DRX, ensayo de tracción, etc.]. ¿Qué parámetros operativos son estándar y cuáles condicionan los resultados?"_ |
| 4 — Analizar **(dominante)** | Patrones e hipótesis | Recibe hipótesis para verificar sobre los datos | _"Tengo estos resultados: [datos o gráficas descritas]. ¿Qué patrones o anomalías ves y a qué fenómenos podrían atribuirse? No concluyas; sólo señala hipótesis a verificar."_ |
| 5 — Evaluar | Consistencia con teoría | Contrasta su interpretación con el marco teórico | _"He concluido que el material tiene [propiedad/comportamiento]. ¿Mi interpretación es consistente con la teoría [referencia] o hay tensiones que tendría que discutir?"_ |

## Competencias que desarrolla

- **Ingeniería** — operación informada de técnicas de caracterización, interpretación cuantitativa.
- **Investigación** — formulación de hipótesis a partir de evidencia, contraste con teoría establecida.

## Secuencia de la actividad (proceso → producto)

{{< timeline >}}

{{< timelineItem icon="vial" header="Fase 1 — Técnica y parámetros" subheader="Antes del ensayo" >}}
Selección de la técnica y verificación con IAG de parámetros
operativos críticos.
{{< /timelineItem >}}

{{< timelineItem icon="flask" header="Fase 2 — Adquisición" subheader="Sin IAG" >}}
Ejecución del análisis en laboratorio con protocolos y registro
fiel. La IAG no participa en la adquisición.
{{< /timelineItem >}}

{{< timelineItem icon="chart-area" header="Fase 3 — Lectura de resultados" subheader="Patrones e hipótesis" >}}
La IAG sugiere hipótesis sobre patrones; el estudiante las verifica
con sus datos.
{{< /timelineItem >}}

{{< timelineItem icon="book" header="Fase 4 — Contraste con teoría" subheader="Discusión" >}}
Confrontación de la interpretación con el marco teórico y
discusión de tensiones si las hay.
{{< /timelineItem >}}

{{< /timeline >}}

## Evidencias de proceso requeridas

Riesgo **bajo**: los datos crudos del instrumento son difíciles de
fabricar. La trazabilidad de la interpretación es lo crítico.

| Evidencia | Estado | Forma concreta |
|---|---|---|
| Bitácora del diálogo con IAG | recomendada | Transcripción por fase |
| Datos crudos del instrumento | obligatoria | Archivos nativos con metadatos |
| Protocolo de ensayo seguido | obligatoria | Versión propia documentada |
| Anotaciones de validación | obligatoria | Qué hipótesis se confirmaron y cuáles se descartaron con argumento |
| Justificación teórica de la interpretación | obligatoria | Referencias citadas verificadas |
| Bitácora metacognitiva | recomendada | Qué aprendió sobre leer la técnica |
| Declaración de uso de IAG | obligatoria | Modelo, contexto y propósito |

## Cómo se evalúa (rúbrica de proceso)

| Criterio | N1 Inicial | N2 En desarrollo | N3 Competente | N4 Avanzado | Peso |
|---|---|---|---|---|---|
| Pertinencia del prompt | Vago | Relación parcial | Claro y adecuado | Pertinente y estratégico | 10% |
| Nivel cognitivo del prompt | Pide la conclusión | Algo de análisis | Análisis de patrones | Pensamiento crítico — IAG como sugerente de hipótesis | 15% |
| Uso crítico de la respuesta | Acepta sin cuestionar | Cuestiona poco | Contrasta y analiza | Evalúa y reformula | 20% |
| Integración en el trabajo | Copia | Uso limitado | Integra y adapta | Transforma; la interpretación es propia | 20% |
| Iteración del prompt | No ajusta | Ajustes mínimos | Mejora prompts | Itera estratégicamente | 10% |
| Metacognición | No reflexiona | Reflexión superficial | Explica su aprendizaje | Analiza decisiones interpretativas | 15% |
| Uso ético | Inadecuado | Básico | Adecuado | Crítico y consciente | 10% |

## Riesgos y salvaguardas

- **Conclusión sin verificación.** El estudiante acepta la hipótesis de
  IAG como conclusión. Salvaguarda: el prompt pide hipótesis "a
  verificar".
- **Parámetros operativos incorrectos.** Salvaguarda: revisión cruzada
  contra protocolo del laboratorio.
- **Interpretación inconsistente con la teoría.** Salvaguarda: el prompt
  nivel 5 obliga a contrastar con teoría establecida.
- **Datos manipulados.** Salvaguarda: archivos nativos del instrumento
  obligatorios.

{{< alert icon="shield-halved" type="warning" >}}
**Transparencia obligatoria.** Declarar uso de IAG y entregar datos
crudos del instrumento. La interpretación responsable es del estudiante.
{{< /alert >}}

## Asignatura de ejemplo

Ingeniería de materiales, química, metalurgia, caracterización de
materiales, ciencia de materiales.

## Ejemplos y enlaces

- Producto cercano: [Reporte técnico con IAG]({{< ref "/ia-educacion/productos-de-aprendizaje/reporte-tecnico" >}}) — comunicación del análisis.
- Producto cercano: [Metrología con IAG]({{< ref "/ia-educacion/productos-de-aprendizaje/metrologia" >}}) — manejo de incertidumbre análogo.
- Producto cercano: [Investigación aplicada con IAG]({{< ref "/ia-educacion/productos-de-aprendizaje/investigacion-aplicada" >}}) — marco mayor.
- Marco general: ver `plan-productos-de-aprendizaje-iag.md`.

## Fuente

Marco UDG (`Guia_IAG_Educacion_Superior_FINAL`) + redacción de prompts
nivelados a Bloom específicamente para este producto.
