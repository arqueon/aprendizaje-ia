---
title: "Modelado matemático con IAG"
date: 2026-05-11
draft: false
description: "Cómo construir y criticar un modelo matemático con apoyo formativo de IAG, evaluando la justificación de variables, los supuestos y los límites del modelo."
summary: "Modelado matemático con IAG: identificación de variables, análisis de sensibilidad y crítica de supuestos. Progresión de prompts por nivel Bloom y rúbrica de proceso."
tags: ["producto-aprendizaje", "bloom-4", "rubrica-iag", "ingeniería", "cognitivas", "modelado", "matemática-aplicada"]
categories: ["producto-aprendizaje"]
areas: ["ia", "evaluacion", "pedagogia"]

# Dimensiones del marco unificado
bloom_dominante: 4
bloom_rango: "3-6"
competencias_cluster: ["Ingeniería", "Cognitivas"]
area_disciplinar: "ingenieria"
riesgo_sustitucion_autoria: "bajo"
modalidad: "cualquiera"
asignatura_ejemplo: "Matemáticas aplicadas / Ingeniería / Física / Ciencias exactas"

showHero: true
showTableOfContents: true
showReadingTime: true
showBreadcrumbs: true
showSummary: true
showTaxonomies: true
showRelatedContent: true
showAuthor: false
---

{{< contrato modo="ejemplo" quien="Docentes de matemáticas aplicadas, física o ingeniería que piden modelar un fenómeno real (el enfriamiento de una taza de café, el llenado de un tanque, la propagación de un rumor en la escuela) y reciben ecuaciones correctas cuyos supuestos nadie escribió." haras="Un estudiante de tercer semestre modela cuánto tarda en enfriarse el café de la cafetería. Propone él las variables (temperatura inicial, temperatura del aire, tamaño del vaso), le pide a la IA que revise si olvidó alguna estándar (la tapa, el material del vaso), plantea la ecuación con ayuda de la IA para la notación, varía cada parámetro para ver cuál manda y termina con una lista de supuestos («el aire del local no cambia de temperatura») que la IA le ayuda a cuestionar. Entrega el modelo, la tabla de sensibilidad y la lista de supuestos." tendras="Tres prompts copiables y una regla de revisión: «cada variable del modelo lleva una línea que dice qué representa físicamente (por ejemplo, «h: cuánto calor cede el vaso al aire por segundo»); una variable sin esa línea no cuenta»." tarda="Nueve minutos de lectura; quince si adaptas los prompts a tu fenómeno." ejemplo="Empieza con el café de la cafetería, en el primer párrafo, y vuelve a él en las fases y en las salvaguardas." >}}

Una profesora de ecuaciones diferenciales pide a su grupo un modelo de algo que puedan
medir en la escuela. Un estudiante elige el café de la cafetería: toma la temperatura
cada dos minutos con un termómetro de cocina y quiere un modelo que prediga cuándo estará
bebible. Lo que ella revisa es la honestidad de los supuestos («el vaso no cambia de
forma», «el aire del local se queda a 22 °C») y si el estudiante sabe qué variable manda.
La IA puede verificar cálculos y proponer reformulaciones; decidir qué simplificación es
aceptable para este café le toca al estudiante.

## Qué es y para qué sirve

Un **modelo matemático** es una representación simplificada de un
fenómeno mediante variables, relaciones y supuestos. Lo que se revisa es la
**trazabilidad** entre fenómeno → variables relevantes → relaciones →
predicciones → contraste con la realidad (en el caso del café: del termómetro
a la ecuación y de la ecuación a «estará a 60 °C en ocho minutos»).

**Dónde entra la IA en este tipo de trabajo:** revisa que no falten variables
estándar (por ejemplo, la tapa del vaso), ayuda con el álgebra y la notación,
acompaña el análisis de sensibilidad («¿qué pasa si el aire está a 30 °C?»)
y cuestiona los supuestos. La IA es asesora de modelado; la decisión sobre
qué simplificar es del estudiante.

## Bloom y progresión de prompts

Este tipo de trabajo moviliza los niveles **3 a 6** de la taxonomía de Bloom, con
nivel dominante **4 — Analizar** (la articulación de variables y sus
interacciones). Para ti, la tabla es un banco de prompts: copia el de la
fase que tu grupo suele saltarse (casi siempre la crítica de supuestos) y
sustituye «este modelo» por el fenómeno de tu curso.

| Nivel Bloom | Movimiento del modelo | Qué hace el estudiante | Prompt sugerido |
|---|---|---|---|
| 3 — Aplicar | Identificación de variables | Selecciona variables relevantes del fenómeno | _"¿Qué variables son importantes en este modelo?"_ |
| 4 — Analizar **(dominante)** | Sensibilidad y relaciones | Estudia cómo cambian los resultados al variar parámetros | _"¿Cómo afectan estas variables al resultado?"_ |
| 5–6 — Evaluar/Crear | Crítica de supuestos | Identifica las simplificaciones del modelo y propone alternativas | _"¿Qué supuestos limitan este modelo y cómo podrían mejorarse?"_ |

## Competencias que desarrolla

- **Ingeniería** — modelación cuantitativa, abstracción matemática, validación contra datos, predicción justificada.
- **Cognitivas** — pensamiento abstracto, análisis sistémico, juicio sobre simplificaciones aceptables, razonamiento causal.

## Secuencia de la actividad (proceso → producto)

{{< timeline >}}

{{< timelineItem icon="binoculars" header="Fase 1 — Fenómeno y variables" subheader="Observación primero" md="true" >}}
Caracterización del fenómeno y propuesta inicial de variables relevantes
por parte del estudiante. La IAG verifica que no se omitan variables
estándar de la disciplina.
{{< /timelineItem >}}

{{< timelineItem icon="diagram-project" header="Fase 2 — Relaciones y formulación" subheader="Construcción del modelo" md="true" >}}
Planteamiento de ecuaciones o relaciones. La IAG ayuda con álgebra,
notación y formas canónicas; el estudiante valida que la formulación
representa el fenómeno.
{{< /timelineItem >}}

{{< timelineItem icon="chart-line" header="Fase 3 — Análisis de sensibilidad" subheader="Probar el modelo" md="true" >}}
Variación sistemática de parámetros y observación de resultados.
Identificación de variables dominantes y de comportamientos extremos.
{{< /timelineItem >}}

{{< timelineItem icon="microscope" header="Fase 4 — Crítica y reformulación" subheader="Honestidad sobre límites" md="true" >}}
Identificación de los supuestos que limitan el modelo y propuesta de
mejoras. La IAG actúa como crítica metodológica.
{{< /timelineItem >}}

{{< /timeline >}}

## Qué entrega el estudiante además del modelo

Riesgo **bajo**: los modelos formales son difíciles de "generar
plausiblemente" sin comprenderlos. Las dos piezas que más te dicen son la
justificación de cada variable (una línea por variable) y la tabla de
sensibilidad:

| Evidencia | Estado | Forma concreta |
|---|---|---|
| Bitácora del diálogo con IAG | recomendada | Transcripción por fase |
| ≥3 iteraciones del prompt | opcional | En fases 3 y 4 si la complejidad lo amerita |
| Anotaciones de validación del output | recomendada | Qué se aceptó/rechazó, especialmente en álgebra |
| Justificación escrita de cada variable | obligatoria | Por qué entra y qué representa físicamente |
| Tabla o gráfico de sensibilidad | obligatoria | Cómo varía el resultado con cada variable clave |
| Lista explícita de supuestos | obligatoria | Cada simplificación nombrada |
| Bitácora metacognitiva | recomendada | Qué aprendió sobre modelar este fenómeno |
| Declaración de uso de IAG | obligatoria | Modelo, contexto y propósito |

## Cómo se evalúa (rúbrica de proceso)

Con esta rúbrica revisas la lista de supuestos y la tabla de sensibilidad,
no sólo la ecuación final; ajusta los pesos a tu curso (por ejemplo, más peso
a «metacognición» si te importa que nombren sus límites):

| Criterio | N1 Inicial | N2 En desarrollo | N3 Competente | N4 Avanzado | Peso |
|---|---|---|---|---|---|
| Pertinencia del prompt | Vago | Relación parcial | Claro y adecuado | Pertinente y estratégico | 10% |
| Nivel cognitivo del prompt | Pide el modelo armado | Algo de análisis | Análisis de variables | Pensamiento crítico — IAG como crítico de supuestos | 15% |
| Uso crítico de la respuesta | Acepta sin cuestionar | Cuestiona superficialmente | Contrasta y analiza | Evalúa críticamente y reformula con argumento | 20% |
| Integración en el trabajo | Copia | Uso limitado | Integra y adapta | Transforma; el modelo es propio | 20% |
| Iteración del prompt | No ajusta | Ajustes mínimos | Mejora prompts | Itera estratégicamente | 10% |
| Metacognición | No reflexiona | Reflexión superficial | Explica su aprendizaje | Analiza límites y supuestos asumidos | 15% |
| Uso ético | Inadecuado | Básico | Adecuado | Crítico y consciente | 10% |

## Riesgos y salvaguardas

- **Variables sin justificación física.** Aparecen en el modelo sólo
  porque la IAG las mencionó. Salvaguarda: justificación escrita
  obligatoria por cada variable.
- **Álgebra correcta, supuestos opacos.** El modelo funciona
  formalmente pero no se nombran las simplificaciones. Salvaguarda:
  lista explícita de supuestos como entregable separado.
- **Sin análisis de sensibilidad.** Se presenta un único caso "típico"
  como si representara el modelo. Salvaguarda: tabla o gráfico de
  sensibilidad obligatorio.
- **Errores algebraicos heredados de la IAG.** La IAG puede equivocarse en
  manipulaciones simbólicas. Salvaguarda: el estudiante verifica los
  pasos críticos manualmente o con software simbólico.

{{< alert icon="shield-halved" type="warning" >}}
**Transparencia obligatoria.** Declarar uso de IAG y verificar
manualmente los pasos algebraicos críticos. La IAG asiste; el modelo y
su honestidad sobre los supuestos son del estudiante.
{{< /alert >}}

## Asignatura de ejemplo

Matemáticas aplicadas, física, cualquier ingeniería con componente
cuantitativo, investigación de operaciones, economía aplicada.

## Ejemplos y enlaces

- Trabajo cercano: [Programación con IAG]({{< ref "/ia-educacion/productos-de-aprendizaje/programacion" >}}) — implementación del modelo en código.
- Trabajo cercano: [Análisis económico con IAG]({{< ref "/ia-educacion/productos-de-aprendizaje/analisis-economico" >}}) — modelado aplicado a decisiones.
- Trabajo cercano: [Prototipo con IAG]({{< ref "/ia-educacion/productos-de-aprendizaje/prototipo" >}}) — modelo como soporte de diseño.

{{< referencias titulo="Procedencia editorial" >}}

Elaboración editorial del sitio para este catálogo. La progresión usa Bloom como vocabulario descriptivo e integra criterios de revisión del proceso (por ejemplo, el uso crítico de la respuesta de la IA); no presenta una política institucional ni una rúbrica obligatoria.

{{< /referencias >}}
