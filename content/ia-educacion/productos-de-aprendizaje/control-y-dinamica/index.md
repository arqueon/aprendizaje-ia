---
title: "Control y dinámica con IAG"
date: 2026-05-11
draft: false
description: "Cómo analizar y diseñar un sistema de control con apoyo formativo de IAG, evaluando especificaciones de desempeño, características dinámicas y robustez."
summary: "Control y dinámica con IAG: especificaciones razonables, lectura de polos/ceros/retardos y pruebas de robustez antes de declarar el controlador aceptable. Progresión de prompts por nivel Bloom y rúbrica de proceso."
tags: ["producto-aprendizaje", "bloom-4", "rubrica-iag", "ingeniería", "cognitivas", "control", "dinámica", "robustez"]
categories: ["producto-aprendizaje"]
areas: ["ia", "evaluacion", "pedagogia"]

bloom_dominante: 4
bloom_rango: "3-5"
competencias_cluster: ["Ingeniería", "Cognitivas"]
area_disciplinar: "ingenieria"
riesgo_sustitucion_autoria: "bajo"
modalidad: "cualquiera"
asignatura_ejemplo: "Ingeniería en control / Mecatrónica / Eléctrica / Mecánica"

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
Un controlador no se evalúa cuando funciona bien sino cuando lo presionan. La IAG puede orientar especificaciones y pruebas de robustez; la lectura dinámica del sistema y la responsabilidad del sintonizado son del estudiante.
{{< /lead >}}

## Qué es y para qué sirve

El análisis y diseño de **control y dinámica** trabaja con sistemas
realimentados: planta, controlador, especificaciones de desempeño y
robustez ante perturbaciones e incertidumbre paramétrica. Valor
formativo: lectura de polos/ceros/retardos, sintonizado con criterio y
pruebas de robustez explícitas.

**Uso formativo de la IAG:** verificar especificaciones razonables
para el tipo de planta, identificar características dinámicas
dominantes y orientar pruebas de robustez antes de declarar el
controlador aceptable.

## Bloom y progresión de prompts

Nivel dominante **4 — Analizar** (la lectura de características
dinámicas del sistema).

| Nivel Bloom | Movimiento del control | Qué hace el estudiante | Prompt sugerido |
|---|---|---|---|
| 3 — Aplicar | Especificaciones | Define metas razonables para la planta | _"Tengo este sistema [descripción] y quiero diseñar un controlador [PID, lead-lag, etc.]. ¿Qué especificaciones de desempeño (overshoot, tiempo de establecimiento, error en régimen) son razonables para este tipo de planta?"_ |
| 4 — Analizar **(dominante)** | Características dinámicas | Identifica polos, ceros y retardos dominantes | _"Mi función de transferencia es [forma general]. ¿Qué características del sistema (polos, ceros, retardos) condicionan más fuertemente la respuesta y cómo lo identifico sin resolver?"_ |
| 5 — Evaluar | Robustez | Aplica pruebas explícitas antes de aceptar el controlador | _"He sintonizado mi controlador con [método]. ¿Qué pruebas de robustez (perturbaciones, incertidumbre paramétrica, ruido) debo aplicar antes de declararlo aceptable?"_ |

## Competencias que desarrolla

- **Ingeniería** — análisis dinámico, sintonizado con criterio, pruebas de robustez.
- **Cognitivas** — abstracción frecuencial y temporal, juicio sobre umbrales de aceptabilidad.

## Secuencia de la actividad (proceso → producto)

{{< timeline >}}

{{< timelineItem icon="bullseye" header="Fase 1 — Especificaciones" subheader="Encuadre" >}}
Definición de metas de desempeño con la IAG como referencia de lo
razonable.
{{< /timelineItem >}}

{{< timelineItem icon="chart-line" header="Fase 2 — Lectura dinámica" subheader="Análisis" >}}
Identificación de polos, ceros y retardos dominantes; lectura física
del sistema.
{{< /timelineItem >}}

{{< timelineItem icon="sliders" header="Fase 3 — Sintonizado" subheader="Sin IAG en la decisión" >}}
Sintonizado del controlador por el estudiante con método elegido.
{{< /timelineItem >}}

{{< timelineItem icon="shield-halved" header="Fase 4 — Robustez" subheader="Pruebas explícitas" >}}
Aplicación de pruebas de perturbación, incertidumbre y ruido antes
de aceptar el resultado.
{{< /timelineItem >}}

{{< /timeline >}}

## Evidencias de proceso requeridas

| Evidencia | Estado | Forma concreta |
|---|---|---|
| Bitácora del diálogo con IAG | recomendada | Transcripción por fase |
| Documento de especificaciones razonadas | obligatoria | Por qué estos valores y no otros |
| Lectura dinámica documentada | obligatoria | Polos/ceros/retardos identificados |
| Sintonizado con método y justificación | obligatoria | Pasos y decisiones |
| Resultados de pruebas de robustez | obligatoria | Mínimo 3 pruebas con resultados |
| Anotaciones de validación | obligatoria | Qué se aceptó/rechazó del análisis IAG |
| Bitácora metacognitiva | recomendada | Qué aprendió sobre dinámica del sistema |
| Declaración de uso de IAG | obligatoria | Modelo, contexto y propósito |

## Cómo se evalúa (rúbrica de proceso)

| Criterio | N1 Inicial | N2 En desarrollo | N3 Competente | N4 Avanzado | Peso |
|---|---|---|---|---|---|
| Pertinencia del prompt | Vago | Relación parcial | Claro y adecuado | Pertinente y estratégico | 10% |
| Nivel cognitivo del prompt | Pide el controlador | Algo de análisis | Análisis dinámico | Pensamiento crítico — IAG como par revisor | 15% |
| Uso crítico de la respuesta | Acepta sin cuestionar | Cuestiona poco | Contrasta y analiza | Evalúa y reformula con argumento dinámico | 20% |
| Integración en el trabajo | Copia | Uso limitado | Integra y adapta | Transforma; el diseño es propio | 20% |
| Iteración del prompt | No ajusta | Ajustes mínimos | Mejora prompts | Itera estratégicamente | 10% |
| Metacognición | No reflexiona | Reflexión superficial | Explica su aprendizaje | Analiza decisiones de sintonizado | 15% |
| Uso ético | Inadecuado | Básico | Adecuado | Crítico y consciente | 10% |

## Riesgos y salvaguardas

- **Especificaciones irreales.** Salvaguarda: justificación obligatoria
  contra tipo de planta.
- **Sintonizado sin lectura dinámica.** Salvaguarda: documento de
  polos/ceros previo al sintonizado.
- **Aceptación sólo en condiciones nominales.** Salvaguarda: pruebas de
  robustez obligatorias.
- **Errores algebraicos heredados.** Salvaguarda: verificación manual de
  funciones de transferencia.

{{< alert icon="shield-halved" type="warning" >}}
**Transparencia obligatoria.** Declarar uso de IAG. La lectura dinámica
y el sintonizado son del estudiante; las pruebas de robustez son su
responsabilidad.
{{< /alert >}}

## Asignatura de ejemplo

Ingeniería en control, mecatrónica, eléctrica, mecánica; cualquier
asignatura con sistemas dinámicos realimentados.

## Ejemplos y enlaces

- Producto cercano: [Circuitos eléctricos con IAG]({{< ref "/ia-educacion/productos-de-aprendizaje/circuitos-electricos" >}}) — análisis previo en régimen estático.
- Producto cercano: [Modelado matemático con IAG]({{< ref "/ia-educacion/productos-de-aprendizaje/modelado-matematico" >}}) — base de la función de transferencia.
- Producto cercano: [Automatización industrial con IAG]({{< ref "/ia-educacion/productos-de-aprendizaje/automatizacion-industrial" >}}) — aplicación industrial.
- Marco general: ver `plan-productos-de-aprendizaje-iag.md`.

## Fuente

Marco UDG (`Guia_IAG_Educacion_Superior_FINAL`) + redacción de prompts
nivelados a Bloom específicamente para este producto.
