---
title: "Metrología con IAG"
date: 2026-05-11
draft: false
description: "Cómo realizar un trabajo de metrología con apoyo formativo de IAG, evaluando fuentes de incertidumbre, patrones de error y coherencia del reporte de medición."
summary: "Metrología con IAG: fuentes de incertidumbre según GUM, lectura de patrones de error sistemático/aleatorio y coherencia entre incertidumbre, trazabilidad y resolución. Progresión de prompts por nivel Bloom y rúbrica de proceso."
featured_alt: "Dos manos miden un anillo con calibrador junto a un micrómetro, bloques patrón y piezas repetidas."
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

{{< contrato modo="ejemplo" quien="Docentes de laboratorio de metrología, control de calidad o ingeniería mecánica que piden medir una pieza y reportar el valor con su incertidumbre, y reciben reportes con un número bonito y una incertidumbre que nadie sabe de dónde salió." haras="Una estudiante de ingeniería industrial mide diez veces el diámetro de un eje con un micrómetro de 0,01 mm, antes de medir le pide a la IA la lista de fuentes de incertidumbre típicas para ese instrumento (temperatura, fuerza de apriete, calibración del patrón), después le pasa sus diez lecturas para que le señale si los residuos muestran un error sistemático, y al final le pregunta si su valor «24,98 ± 0,03 mm» es coherente con la resolución del micrómetro y el certificado del patrón. La IA entra antes y después de medir; la medición y la hoja de cálculo según GUM son de la estudiante." tendras="Tres prompts copiables, uno por fase, y una regla de revisión: «una incertidumbre declarada menor que la resolución del instrumento (por ejemplo, ± 0,005 mm con un micrómetro de 0,01 mm) se devuelve sin calificar»." tarda="Ocho minutos de lectura; doce si adaptas los prompts a tu instrumento." ejemplo="Empieza con el eje y el micrómetro, en el primer párrafo, y vuelve a él en las fases y en las salvaguardas." >}}

Un profesor de laboratorio de metrología dimensional entrega a cada estudiante un eje
torneado, un micrómetro de 0,01 mm y el certificado de calibración del bloque patrón.
Pide diez mediciones del diámetro y un reporte de una página con el valor, su
incertidumbre según la GUM (la guía internacional para expresar la incertidumbre) y la
cadena de trazabilidad. Una medición se revisa por lo que se sabe sobre lo que no se
sabe: la incertidumbre declarada con honestidad. La IA puede revisar la trazabilidad y
el cálculo; la medición y la responsabilidad del valor reportado («24,98 ± 0,03 mm») son
de quien midió.

## Qué es y para qué sirve

La **metrología** se ocupa de medir con rigor: trazabilidad,
incertidumbre, calibración y reporte coherente del resultado. Lo que el
estudiante aprende aquí: reconocer las fuentes de error (la temperatura
del taller, la fuerza con que cierra el micrómetro), calcular la
incertidumbre según GUM y reportar con disciplina.

**Dónde entra la IA en este tipo de trabajo:** lista las fuentes típicas de
incertidumbre para el instrumento (por ejemplo, la dilatación del eje si se
mide recién torneado), señala si los residuos de las diez lecturas muestran
un error sistemático o aleatorio, y revisa que la incertidumbre declarada
sea coherente con la trazabilidad del patrón y la resolución del
micrómetro.

## Bloom y progresión de prompts

Nivel dominante **4 — Analizar** (la lectura de patrones de error). Para
ti, la tabla es un banco de prompts: copia el de la fase que quieras
reforzar (casi siempre la de residuos, donde el grupo corrige sin haber
mirado el patrón) y sustituye los corchetes por tu magnitud e instrumento.

| Nivel Bloom | Movimiento metrológico | Qué hace el estudiante | Prompt sugerido |
|---|---|---|---|
| 3 — Aplicar | Fuentes de incertidumbre | Lista fuentes típicas según GUM | _"Voy a medir [magnitud] con [instrumento]. ¿Qué fuentes de incertidumbre son típicas y cómo se cuantifican según GUM?"_ |
| 4 — Analizar **(dominante)** | Patrones de error | Identifica error sistemático vs. aleatorio en residuos | _"Tengo estas mediciones: [datos]. ¿Qué patrones de error sistemático o aleatorio sugieren los residuos? No me des la corrección; sólo identifica el patrón."_ |
| 5 — Evaluar | Coherencia del reporte | Verifica coherencia entre incertidumbre, trazabilidad y resolución | _"Mi resultado es [valor ± incertidumbre]. ¿Mi incertidumbre combinada está reportada coherentemente con la trazabilidad de mis patrones y la resolución del instrumento?"_ |

## Competencias que desarrolla

- **Ingeniería** — disciplina metrológica, manejo de incertidumbre, reporte trazable.

## Secuencia de la actividad (proceso → producto)

{{< timeline >}}

{{< timelineItem icon="ruler" header="Fase 1 — Encuadre metrológico" subheader="Antes de medir" md="true" >}}
Definición de magnitud, método, instrumento y trazabilidad esperada.
La IAG mapea fuentes típicas de incertidumbre.
{{< /timelineItem >}}

{{< timelineItem icon="scale-unbalanced" header="Fase 2 — Medición" subheader="Sin IAG" md="true" >}}
Adquisición de datos según protocolo; la IAG no participa.
{{< /timelineItem >}}

{{< timelineItem icon="chart-line" header="Fase 3 — Análisis de residuos" subheader="Patrones de error" md="true" >}}
Lectura de patrones y propuesta de causas con verificación
manual de los cálculos.
{{< /timelineItem >}}

{{< timelineItem icon="file-circle-check" header="Fase 4 — Reporte" subheader="Coherencia" md="true" >}}
Reporte final del valor con su incertidumbre, trazabilidad y
resolución; verificación cruzada de coherencia.
{{< /timelineItem >}}

{{< /timeline >}}

## Qué entrega el estudiante además del reporte

Riesgo **bajo**: sin datos crudos y hoja de cálculo el reporte se cae solo.
Junto con el valor reportado, el estudiante entrega estas piezas (las diez
lecturas con fecha y temperatura, la hoja GUM, el certificado del patrón):

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

Con esta rúbrica revisas la hoja de cálculo y la bitácora, no sólo el número
final; ajusta los pesos a tu curso (por ejemplo, más peso a «uso ético» si
te preocupa la incertidumbre subdeclarada):

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

- Trabajo cercano: [Análisis de materiales con IAG]({{< ref "/ia-educacion/productos-de-aprendizaje/analisis-de-materiales" >}}) — uso de mediciones para caracterización.
- Trabajo cercano: [Reporte técnico con IAG]({{< ref "/ia-educacion/productos-de-aprendizaje/reporte-tecnico" >}}) — comunicación del resultado.

{{< referencias titulo="Procedencia editorial" >}}

Elaboración editorial del sitio para este catálogo. La progresión usa Bloom como vocabulario descriptivo e integra criterios de revisión del proceso (por ejemplo, el uso crítico de la respuesta de la IA); no presenta una política institucional ni una rúbrica obligatoria.

{{< /referencias >}}
