---
title: "Documenta una práctica docente con IA para que otra persona pueda repetirla"
date: 2026-04-26
draft: false
description: "Llena la plantilla de nueve secciones con una práctica tuya (o revisa una que te enviaron) y comprueba con siete preguntas si alguien más podría repetirla en su aula."
summary: "Plantilla, criterios de calidad y errores frecuentes al capturar una intervención docente con IA. Pensado para coordinaciones que reciben envíos de docentes."
tags: ["documentación", "buenas prácticas", "metodología", "plantilla"]
categories: ["guia"]
areas: ["pedagogia", "ia", "evaluacion"]

weight: 1
showHero: true
showBreadcrumbs: true
showSummary: true
showTableOfContents: true
showReadingTime: true
showAuthor: false
---

{{< contrato quien="Docentes que aplicaron una actividad con IA y quieren enviarla a un repositorio de prácticas, y coordinaciones que reciben esos envíos y tienen que decidir si se publican o se devuelven." haras="Vas a llenar (o revisar) una plantilla de nueve secciones con la práctica: contexto, objetivo, cómo entra la IA y con qué modelo, secuencia, rúbrica, resultados, lo que falló, cuándo conviene repetirla y referencias; después la pasas por siete preguntas de revisión." tendras="Un documento de práctica listo para enviar, o para devolver con observaciones (por ejemplo, una sección «Lo que no funcionó» que diga: «Cuatro de diez equipos aceptaron la primera fuente que sugirió la IA sin verificarla; en la segunda vuelta añadimos una tabla de verificación»)." tarda="Diez minutos con el caso de Elena; entre cuarenta y sesenta llenando la plantilla con una práctica tuya; quince revisando un envío ajeno." ejemplo="Abajo está el caso de Elena, profesora de contabilidad, ya resuelto: qué envió, qué le faltaba y qué le devolvió la coordinación." >}}

## El caso de Elena, ya resuelto

Elena da contabilidad de costos en tercer semestre. Usó una IA para generar cinco estados financieros ficticios con errores escondidos; cada equipo tenía que encontrar los errores y explicar qué decisión tomaría un gerente con esos datos. Le fue bien y lo envió a la coordinación en dos párrafos entusiastas: «los estudiantes se engancharon muchísimo, la IA generó casos muy realistas».

La coordinación no pudo publicarlo así, porque otra docente no sabría repetirlo. Le devolvió tres observaciones: falta decir qué modelo y versión usó (los errores «escondidos» los fabricó Gemini 2.5, y otro modelo los fabrica distinto); falta la rúbrica (¿cómo calificó a un equipo que encontró los errores pero no propuso decisión?); y falta lo que falló. Elena reescribió el envío con la plantilla de abajo. En «Lo que no funcionó» puso: «Dos de los cinco estados financieros tenían errores demasiado obvios; la IA no entiende de sutileza contable y los tuve que retocar a mano. Cuatro de diez equipos le pidieron a la IA que encontrara los errores; en la segunda vuelta la actividad pasó a ser sin IA en clase». Con esas tres secciones, el envío se publicó.

## Qué hace que otra persona pueda repetir tu práctica

Un envío como el primero de Elena describe lo que pasó sin permitir a quien lee decidir si puede hacer lo mismo. Para que sí pueda, tu documento cumple cuatro condiciones:

- **Reproducibilidad** — otra persona puede aplicar la práctica con suficiente fidelidad para esperar resultados comparables.
- **Trazabilidad** — el lector entiende qué decisiones tomó el docente y por qué; no solo el qué, también el cómo y el porqué.
- **Honestidad** — la documentación incluye lo que no funcionó, las desviaciones del plan original y los límites observados.
- **Comparabilidad** — la estructura es suficientemente parecida a otras prácticas del mismo repositorio para permitir lectura transversal.

Sin estas cuatro condiciones, tu envío se queda en testimonio personal («se engancharon muchísimo») y nadie más lo puede usar.

## Llena la plantilla de nueve secciones

La plantilla siguiente cubre las cuatro condiciones; llena una sección a la vez, con la práctica ya aplicada delante. Las actividades propuestas del Laboratorio —[ABP con IA](/laboratorio/practicas/abp-con-ia/), [debate socrático con IA](/laboratorio/practicas/debate-socratico-con-ia/), [evaluación formativa asistida por IA](/laboratorio/practicas/evaluacion-formativa-asistida-ia/)— sirven como ejemplos de **estado declarado**: cada una se presenta como plantilla o actividad propuesta, no como caso implementado. Una práctica solo podrá citarse aquí como referente empírico cuando exista un expediente verificable de su aplicación.

### Frontmatter (metadatos comparables)

```yaml
---
title: "Título descriptivo en sentence case"
date: 2026-MM-DD
description: "Una línea para el listado de cards."
summary: "Resumen para el hero del artículo (2 frases)."
tags: ["herramienta", "nivel", "modalidad", "competencia"]
categories: ["practica-pedagogica"]
areas: ["ia", "pedagogia"]   # según taxonomía del sitio
asignatura: "Disciplina o materia"
---
```

### Contenido del cuerpo

| Sección | Qué debe responder | Mínimo aceptable |
|---|---|---|
| **Contexto** | Grupo, semestre, modalidad, asignatura, reto previo. | 80–120 palabras. |
| **Objetivo pedagógico** | Qué competencia o aprendizaje se busca desarrollar. | 3–5 indicadores observables. |
| **Cómo se integra la IA** | Qué modelo, qué rol cumple, qué se le pide y qué no. | Mencionar al menos un modelo (Gemini, Claude, DeepSeek, Kimi, Qwen) con versión específica. |
| **Secuencia de la actividad** | Fases, tiempos y decisiones clave. | Línea de tiempo con 3+ fases (puede usar el shortcode `timeline`). |
| **Forma de evaluación** | Rúbrica o lista de qué se valora (por ejemplo: «encuentra los errores» y «propone una decisión con esos datos»). | Indicadores que distinguen el recorrido (versiones, decisiones) del entregable final. |
| **Resultados observados** | Qué se midió y qué se observó. | Datos cuantitativos cuando existan; siempre cualitativos. |
| **Lo que no funcionó** | Desviaciones, fricciones, ajustes. | Al menos un párrafo honesto. |
| **Condiciones de aplicabilidad** | Cuándo conviene replicar y cuándo no. | 3–5 condiciones. |
| **Referencias** | Fuentes citadas en formato APA 7. | Al menos 2 referencias verificables. |

## Pasa el documento por siete preguntas

Tu práctica está lista para enviarse, y una coordinación puede publicarla, cuando alguien ajeno responde «sí» a las siete preguntas siguientes:

- ¿Entiendo el contexto suficiente para juzgar si la práctica aplica al mío?
- ¿Sé qué modelo de IA se usó y con qué configuración mínima?
- ¿Las decisiones del docente están justificadas o solo descritas?
- ¿La documentación menciona al menos un fracaso parcial o ajuste no previsto?
- ¿La rúbrica evalúa el proceso, no solo el entregable?
- ¿Hay fuentes verificables citadas en APA 7?
- ¿El texto evita jerga IA prescindible y mantiene tono analítico?

Si una de las respuestas es «no», la coordinación la devuelve con observaciones, como pasó con el primer envío de Elena (le faltaban el modelo, la rúbrica y lo que falló).

## Cuatro errores que verás en los envíos

Después de revisar prácticas en varios repositorios institucionales, estos son los patrones que más se repiten; revisa tu documento contra ellos antes de enviarlo:

- **Confundir entusiasmo con resultado** — describir lo que experimentó el docente en lugar de lo que aprendieron los estudiantes.
- **Promover una herramienta** — la práctica termina siendo un caso de uso de un modelo específico, no una intervención pedagógica replicable con otros modelos.
- **No declarar versión del modelo** — un prompt que funcionaba con Gemini 2.5 puede no funcionar con Gemini 4 ni con otro modelo. La versión es parte de las condiciones de aplicabilidad.
- **Saltarse la rúbrica** — describir una actividad increíble en el aula sin incluir cómo se calificó. Cuando otro docente intenta replicarla, sabe *qué* hacer, pero no sabe *cómo evaluar* si hubo aprendizaje real. Con IA de por medio suele valorarse el recorrido (qué verificó, qué descartó) además del entregable final, así que omitir la rúbrica le quita a la documentación la mitad de su valor práctico para otros docentes.

## Lecturas relacionadas

Para el fundamento pedagógico de la rúbrica, ver [evaluación formativa con IA](/ia-educacion/guias/evaluacion-formativa-ia/) y [taxonomía de Bloom y diseño inverso](/formacion-docente/taxonomia-bloom-diseno-inverso/). Para casos ya documentados que ejemplifican el formato, [las prácticas pedagógicas](/laboratorio/practicas/) cubren varias modalidades.

## Referencias

Hattie, J. (2009). *Visible learning: A synthesis of over 800 meta-analyses relating to achievement*. Routledge.

Lave, J., & Wenger, E. (1991). *Situated learning: Legitimate peripheral participation*. Cambridge University Press.

UNESCO. (2023). *Guidance for generative AI in education and research*. UNESCO. <https://www.unesco.org/en/articles/guidance-generative-ai-education-and-research>
