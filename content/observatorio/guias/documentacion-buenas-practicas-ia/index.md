---
title: "Documentación de buenas prácticas con IA"
date: 2026-04-26
draft: false
description: "Guía metodológica para documentar prácticas docentes con IA de forma replicable, comparable y útil para colegas en otros contextos."
summary: "Plantilla, criterios de calidad y errores frecuentes al capturar una intervención docente con IA. Pensado para coordinaciones que reciben envíos de docentes."
tags: ["documentación", "buenas prácticas", "metodología", "plantilla"]
categories: ["guia"]
areas: ["pedagogia", "ia", "evaluacion"]

weight: 1
showHero: true
heroStyle: "background"
showBreadcrumbs: true
showSummary: true
showTableOfContents: true
showReadingTime: true
showAuthor: false
---

{{< lead >}}
Una práctica docente sin documentar se queda en el aula donde ocurrió. Una práctica documentada con descuido viaja, pero llega rota: sin contexto, sin condiciones de aplicabilidad, sin la honestidad sobre lo que falló. Esta guía propone un mínimo común para que las prácticas con IA puedan compararse, revisarse entre pares y reutilizarse en otros contextos.
{{< /lead >}}

## Qué distingue una documentación útil de una descripción

La mayoría de los repositorios de "buenas prácticas" sufren del mismo problema: describen lo que se hizo sin permitir al lector decidir si puede hacer lo mismo. Una documentación útil cumple cuatro condiciones que una descripción simple no garantiza:

- **Reproducibilidad** — otra persona puede aplicar la práctica con suficiente fidelidad para esperar resultados comparables.
- **Trazabilidad** — el lector entiende qué decisiones tomó el docente y por qué; no solo el qué, también el cómo y el porqué.
- **Honestidad** — la documentación incluye lo que no funcionó, las desviaciones del plan original y los límites observados.
- **Comparabilidad** — la estructura es suficientemente parecida a otras prácticas del mismo repositorio para permitir lectura transversal.

Sin estas cuatro condiciones, una práctica documentada termina siendo testimonio personal en lugar de conocimiento compartido.

## Estructura mínima recomendada

La plantilla siguiente integra la mayoría de lo que se necesita para cumplir las cuatro condiciones. Las prácticas ya publicadas en este sitio —[ABP con IA](/laboratorio/practicas/abp-con-ia/), [debate socrático con IA](/laboratorio/practicas/debate-socratico-con-ia/), [evaluación formativa asistida por IA](/laboratorio/practicas/evaluacion-formativa-asistida-ia/)— siguen esta estructura y pueden usarse como referencia.

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
| **Forma de evaluación** | Rúbrica o criterios. | Indicadores que separan proceso de producto. |
| **Resultados observados** | Qué se midió y qué se observó. | Datos cuantitativos cuando existan; siempre cualitativos. |
| **Lo que no funcionó** | Desviaciones, fricciones, ajustes. | Al menos un párrafo honesto. |
| **Condiciones de aplicabilidad** | Cuándo conviene replicar y cuándo no. | 3–5 condiciones. |
| **Referencias** | Fuentes citadas en formato APA 7. | Al menos 2 referencias verificables. |

## Criterios de calidad

Una práctica está lista para publicarse cuando un revisor externo puede responder "sí" a las siguientes preguntas:

- ¿Entiendo el contexto suficiente para juzgar si la práctica aplica al mío?
- ¿Sé qué modelo de IA se usó y con qué configuración mínima?
- ¿Las decisiones del docente están justificadas o solo descritas?
- ¿La documentación menciona al menos un fracaso parcial o ajuste no previsto?
- ¿La rúbrica evalúa el proceso, no solo el entregable?
- ¿Hay fuentes verificables citadas en APA 7?
- ¿El texto evita jerga IA prescindible y mantiene tono analítico?

Si una de las respuestas es "no", conviene devolverla al autor con observaciones antes de publicar.

## Errores frecuentes en documentación de prácticas con IA

Después de revisar prácticas en varios repositorios institucionales, los patrones que más erosionan la utilidad documental se repiten:

- **Confundir entusiasmo con resultado** — describir lo que experimentó el docente en lugar de lo que aprendieron los estudiantes.
- **Promover una herramienta** — la práctica termina siendo un caso de uso de un modelo específico, no una intervención pedagógica replicable con otros modelos.
- **No declarar versión del modelo** — un prompt que funcionaba con Gemini 2.5 puede no funcionar con Gemini 4 ni con otro modelo. La versión es parte de las condiciones de aplicabilidad.
- **Saltarse la rúbrica** — describir una actividad increíble en el aula sin incluir cómo se calificó. Cuando otro docente intenta replicarla, sabe *qué* hacer, pero no sabe *cómo evaluar* si hubo aprendizaje real. Especialmente al integrar IA —donde a menudo se debe evaluar el proceso de pensamiento y no solo el producto final—, omitir los criterios de evaluación le quita a la documentación la mitad de su valor práctico para otros docentes.

## Lecturas relacionadas

Para los criterios pedagógicos generales que respaldan la rúbrica, ver [evaluación formativa con IA](/ia-educacion/guias/evaluacion-formativa-ia/) y [taxonomía de Bloom y diseño inverso](/formacion-docente/taxonomia-bloom-diseno-inverso/). Para casos ya documentados que ejemplifican el formato, [las prácticas pedagógicas](/laboratorio/practicas/) cubren varias modalidades.

## Referencias

Hattie, J. (2009). *Visible learning: A synthesis of over 800 meta-analyses relating to achievement*. Routledge.

Lave, J., & Wenger, E. (1991). *Situated learning: Legitimate peripheral participation*. Cambridge University Press.

UNESCO. (2023). *Guidance for generative AI in education and research*. UNESCO. <https://www.unesco.org/en/articles/guidance-generative-ai-education-and-research>
