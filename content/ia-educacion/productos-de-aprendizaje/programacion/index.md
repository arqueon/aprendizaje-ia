---
title: "Programación con IAG"
date: 2026-05-11
draft: false
description: "Cómo aprender a programar con apoyo formativo de IAG, evaluando la comprensión del código, la capacidad de depurar y la justificación de las mejoras propuestas."
summary: "Programación con IAG: lectura comprensiva de código, depuración asistida, análisis de casos límite, mejoras justificadas. Progresión de prompts por nivel Bloom y rúbrica de proceso, con foco en evitar la dependencia."
tags: ["producto-aprendizaje", "bloom-3", "rubrica-iag", "ingeniería", "cognitivas", "programación", "depuración"]
categories: ["producto-aprendizaje"]
areas: ["ia", "evaluacion", "pedagogia"]

# Dimensiones del marco unificado
bloom_dominante: 3
bloom_rango: "2-6"
competencias_cluster: ["Ingeniería", "Cognitivas"]
area_disciplinar: "ingenieria"
riesgo_sustitucion_autoria: "medio"
modalidad: "cualquiera"
asignatura_ejemplo: "Ciencias computacionales / Ingeniería de software / Cualquier curso con código"

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
La IA genera código en segundos. Lo difícil es aprender a leerlo, depurarlo y decidir qué mejora vale la pena. Aquí evaluamos esas tres capacidades —no la cantidad de líneas entregadas.
{{< /lead >}}

## Qué es y para qué sirve

**Programación** como producto de aprendizaje cubre el ciclo completo de
escribir, leer, depurar y mejorar código. La IAG cambia radicalmente el
costo de generar código pero no el de **entenderlo**, y entender es lo
que la asignatura forma.

**Uso formativo de la IAG en este producto:** explicar código, identificar
errores, sugerir mejoras justificadas. La IAG no reemplaza al estudiante en
la decisión sobre qué cambiar y por qué.

## Bloom y progresión de prompts

Este producto cubre todo el rango Bloom (**2 a 6**), con nivel dominante
**3 — Aplicar** (escribir y depurar código que funcione). El nivel 6
aparece cuando el estudiante diseña una solución completa.

| Nivel Bloom | Movimiento de programación | Qué hace el estudiante | Prompt sugerido |
|---|---|---|---|
| 2 — Comprender | Lectura comprensiva | Reconstruye qué hace un fragmento existente | _"Explícame qué hace este código."_ |
| 3 — Aplicar **(dominante)** | Depuración asistida | Identifica el origen de un error y lo corrige | _"¿Qué errores tiene este código y por qué ocurren?"_ |
| 4 — Analizar | Trazas y casos límite | Prueba el código con entradas no obvias | _"Para este código, ¿qué entradas podrían romperlo? Dame 3 casos límite."_ |
| 5 — Evaluar | Mejoras justificadas | Decide si vale la pena cambiar algo | _"Sugiere mejoras en eficiencia y justifica los cambios sin reescribir completamente el código."_ |
| 6 — Crear | Diseño propio | Diseña la arquitectura y la implementa | _"Tengo este problema: [descripción]. Discute conmigo posibles arquitecturas antes de escribir código; sólo escribe pseudocódigo de alto nivel."_ |

## Competencias que desarrolla

- **Ingeniería** — pensamiento computacional, lectura técnica, depuración, diseño de soluciones.
- **Cognitivas** — abstracción, descomposición de problemas, evaluación crítica de alternativas técnicas.

## Secuencia de la actividad (proceso → producto)

{{< timeline >}}

{{< timelineItem icon="book-open" header="Fase 1 — Lectura" subheader="Comprender antes de tocar" >}}
Ante un código ajeno o un fragmento generado por IAG, el estudiante
**explica con sus palabras** qué hace antes de modificarlo. La IAG verifica
la explicación; el estudiante corrige su interpretación.
{{< /timelineItem >}}

{{< timelineItem icon="bug" header="Fase 2 — Depuración" subheader="Trazas y diagnóstico" >}}
Frente a un error, el estudiante traza el flujo y formula una hipótesis
antes de consultar IAG. La IAG confirma o desvía la hipótesis explicando
**por qué** ocurre el error.
{{< /timelineItem >}}

{{< timelineItem icon="vial" header="Fase 3 — Casos límite" subheader="Romper el código" >}}
El estudiante diseña pruebas con entradas extremas; la IAG sugiere
adicionales. Las pruebas se documentan junto con sus resultados.
{{< /timelineItem >}}

{{< timelineItem icon="rotate" header="Fase 4 — Mejora justificada" subheader="Refactor con criterio" >}}
Identificación de mejoras (eficiencia, legibilidad, modularidad). Cada
cambio se justifica por escrito; los cambios sin justificación no se
aceptan.
{{< /timelineItem >}}

{{< /timeline >}}

## Evidencias de proceso requeridas

Riesgo **medio**: el riesgo no es la calidad del código sino la **dependencia**
del estudiante respecto a la IAG. Las evidencias clave son las explicaciones
en lenguaje natural del propio código.

| Evidencia | Estado | Forma concreta |
|---|---|---|
| Bitácora del diálogo con IAG | obligatoria | Transcripción por fase, incluyendo prompts de depuración |
| Explicaciones del propio código en lenguaje natural | obligatoria | Comentarios o bitácora; el estudiante debe poder explicar cada bloque sin la IAG |
| Trazas y casos de prueba | obligatoria | Mínimo 3 casos límite con resultados esperados y obtenidos |
| Justificación de cambios y refactors | obligatoria | Por cada mejora, una línea de "por qué este cambio" |
| Historial de versiones | recomendada | Commits o snapshots fechados |
| Bitácora metacognitiva | obligatoria | Qué aprendió sobre el problema, no sobre las herramientas |
| Declaración de uso de IAG | obligatoria | Qué partes del código tuvieron asistencia y de qué tipo |

## Cómo se evalúa (rúbrica de proceso)

| Criterio | N1 Inicial | N2 En desarrollo | N3 Competente | N4 Avanzado | Peso |
|---|---|---|---|---|---|
| Pertinencia del prompt | Vago | Relación parcial | Claro y adecuado | Pertinente y estratégico (errores, casos, refactor) | 10% |
| Nivel cognitivo del prompt | "Hazme el código" | Algo de análisis | Análisis y evaluación | Pensamiento crítico — IAG como tutor de depuración | 15% |
| Uso crítico de la respuesta | Acepta sin probar | Cuestiona poco | Prueba y contrasta | Evalúa críticamente y verifica con casos límite | 20% |
| Integración en el trabajo | Copia/pega | Uso limitado | Integra y adapta | Transforma; entiende cada línea que entrega | 20% |
| Iteración del prompt | No ajusta | Ajustes mínimos | Mejora prompts | Itera estratégicamente | 10% |
| Metacognición | No reflexiona | Reflexión superficial | Explica su aprendizaje | Analiza dependencias y decisiones de diseño | 15% |
| Uso ético | Inadecuado | Básico | Adecuado | Crítico; declara qué partes son asistidas | 10% |

## Riesgos y salvaguardas

- **Copia-pega sin entender.** El código funciona pero el estudiante no
  sabe explicarlo. Salvaguarda: examen oral breve sobre el propio código,
  o requisito de explicación en lenguaje natural por bloque.
- **Dependencia para depurar.** Cada error vuelve directo al chat.
  Salvaguarda: el prompt de depuración exige hipótesis previa del
  estudiante; sin hipótesis no se entrega el código a la IAG.
- **Refactor sin justificación.** Cambios cosméticos sin razón.
  Salvaguarda: cada commit/cambio necesita una línea de justificación
  evaluable.
- **Tests ausentes o triviales.** Salvaguarda: requisito de ≥3 casos
  límite documentados con entradas/salidas.

{{< alert icon="shield-halved" type="warning" >}}
**Transparencia obligatoria.** Declarar qué partes del código tuvieron
asistencia y de qué tipo (explicación, depuración, refactor). La IAG es
asistente; la titularidad técnica y la rendición de cuentas son del
estudiante.
{{< /alert >}}

## Asignatura de ejemplo

Introducción a la programación, estructuras de datos, ingeniería de
software, laboratorios de cualquier ingeniería con código.

## Ejemplos y enlaces

- Producto cercano: [Modelado matemático con IAG]({{< ref "/ia-educacion/productos-de-aprendizaje/modelado-matematico" >}}) — análisis cuantitativo análogo.
- Producto cercano: [Diseño de sistemas con IAG]({{< ref "/ia-educacion/productos-de-aprendizaje/diseno-de-sistemas" >}}) — escala arquitectónica.
- Marco general: ver `plan-productos-de-aprendizaje-iag.md`.

## Fuente

Adaptado de la **Guia_IAG_Educacion_Superior_FINAL** (UDG), integrando Bloom
y la rúbrica IAG unificada del sitio.
