---
title: "Evaluación formativa con IA — ciclos de retroalimentación iterativa"
date: 2026-04-14
draft: false
description: "Guía para diseñar sistemas de evaluación formativa donde la IA ofrece retroalimentación iterativa sobre procesos de aprendizaje, no sobre productos finales."
summary: "Cómo usar la IA para construir ciclos de retroalimentación que evalúen el proceso de aprendizaje del estudiante, no solo su entregable final."
tags: ["evaluación formativa", "retroalimentación", "IA generativa", "portafolios", "rúbricas"]
categories: ["guia"]
areas: ["ia", "evaluacion", "pedagogia"]
showHero: true
heroStyle: "background"
layoutBackgroundBlur: true
showTableOfContents: true
showReadingTime: true
showBreadcrumbs: true
showSummary: true
---

{{< lead >}}
La evaluación formativa no califica: retroalimenta. La IA permite escalar esta práctica a grupos grandes sin sacrificar la calidad del diálogo. Esta guía presenta un marco para diseñar ciclos de evaluación donde la IA comenta, el estudiante revisa, y el docente supervisa el proceso completo.
{{< /lead >}}

## La premisa: evaluar procesos, no productos

La diferencia entre evaluación sumativa y formativa no es de grado sino de función. La evaluación sumativa clasifica ("aprobado / reprobado"); la formativa retroalimenta ("aquí hay una debilidad en tu argumento, revisa esta sección"). Son herramientas distintas para propósitos distintos (Black & Wiliam, 1998).

La IA tiene un rol natural en la evaluación formativa porque puede:

- Ofrecer retroalimentación detallada sobre borradores en minutos
- Sostener múltiples ciclos de revisión sin fatiga
- Adaptar el nivel de detalle al progreso del estudiante
- Documentar la evolución del trabajo a lo largo de las iteraciones

Lo que la IA **no** puede hacer es decidir si el estudiante aprendió. Eso requiere juicio profesional del docente.

## Arquitectura de un ciclo formativo con IA

{{< mermaid >}}
flowchart TD
    A[Estudiante produce borrador] --> B[IA ofrece retroalimentación]
    B --> C[Estudiante revisa y decide]
    C --> D{¿Aceptó o rechazó la sugerencia?}
    D -->|Aceptó| E[Documenta por qué]
    D -->|Rechazó| F[Documenta por qué]
    E --> G[Nuevo borrador]
    F --> G
    G --> H{¿Cumple criterios mínimos?}
    H -->|No| B
    H -->|Sí| I[Docente revisa el proceso completo]
{{< /mermaid >}}

El elemento crítico no es la retroalimentación de la IA sino la **decisión documentada del estudiante**: qué aceptó, qué rechazó y por qué. Ahí está la evidencia de aprendizaje.

## Tres instrumentos formativos con IA

### 1. Portafolio iterativo

El estudiante construye un portafolio donde cada pieza pasa por al menos tres versiones. La IA comenta cada versión; el estudiante decide qué incorporar.

**Estructura del portafolio:**

| Versión | Contenido | Evidencia requerida |
|---------|-----------|-------------------|
| V1 | Borrador inicial (sin IA) | Texto original del estudiante |
| V2 | Revisión post-retroalimentación IA | Log de la conversación con la IA + decisiones tomadas |
| V3 | Versión revisada por pares | Comentarios de compañeros + respuestas del autor |
| Final | Versión definitiva | Reflexión sobre el proceso completo |

**Ejemplo de prompt para retroalimentación con Claude:**

> *Prompt:* Soy estudiante de derecho y este es mi borrador de ensayo argumentativo sobre la proporcionalidad de las penas en delitos menores. Actúa como evaluador formativo. No me des la respuesta correcta. Señala: (1) los puntos donde mi argumento es débil o circular, (2) las afirmaciones que necesitan evidencia, (3) los contraargumentos que no estoy considerando. Usa un tono directo y constructivo.

### 2. Rúbrica analítica asistida por IA

El docente diseña la rúbrica; la IA la aplica como primer filtro. El docente revisa la aplicación y ajusta.

**Protocolo:**

1. El docente crea la rúbrica con criterios y niveles de desempeño
2. El estudiante entrega su trabajo
3. La IA evalúa el trabajo **usando la rúbrica del docente** (no sus propios criterios)
4. El estudiante recibe la retroalimentación y revisa
5. El docente verifica una muestra de las evaluaciones de la IA y hace la evaluación final

**Ejemplo con Gemini:**

> *Prompt:* Aquí tienes una rúbrica analítica con 4 criterios: claridad argumentativa, uso de evidencia, estructura lógica y originalidad del planteamiento. Cada criterio tiene 4 niveles (insuficiente, en desarrollo, competente, destacado). Evalúa el siguiente texto usando exclusivamente esta rúbrica. Para cada criterio indica el nivel, la justificación y una sugerencia concreta de mejora. [Pegar rúbrica y texto]

{{< alert icon="triangle-exclamation" type="warning" >}}
**La IA aplica la rúbrica; el docente decide la calificación.** La retroalimentación de la IA es formativa, no sumativa. El docente siempre tiene la última palabra sobre la evaluación del estudiante.
{{< /alert >}}

### 3. Diario de reflexión asistido

El estudiante mantiene un diario donde registra sus interacciones con la IA y reflexiona sobre su proceso de aprendizaje. La IA funciona como espejo metacognitivo.

**Entradas sugeridas:**

- ¿Qué le pregunté a la IA hoy y por qué?
- ¿Qué respuesta esperaba y qué obtuve?
- ¿Qué acepté y qué rechacé de la sugerencia?
- ¿Qué aprendí sobre mi propio proceso de pensamiento?

## Qué entrega el estudiante y qué evalúa el docente

A diferencia del modelo tradicional donde solo se entrega un archivo final, en un ciclo formativo con IA el estudiante suele entregar un **paquete de evidencias** que consta de tres partes:

1. **El producto final:** La última versión de su trabajo.
2. **El registro de iteraciones:** Un anexo o documento que muestra las versiones previas o la retroalimentación recibida por la IA.
3. **La reflexión de toma de decisiones (Lo más importante):** Una justificación explícita de por qué aceptó o rechazó las sugerencias de la máquina durante el proceso de mejora.

Al momento de revisar este entregable, los criterios del docente deben cambiar de enfoque:

| Lo que importa | Lo que no importa |
|---|---|
| Las decisiones del estudiante ante la retroalimentación | La cantidad de interacciones con la IA |
| La evolución entre versiones | La calidad del prompt en sí mismo |
| La reflexión sobre el proceso | El producto final aislado |
| La capacidad de rechazar sugerencias con fundamento | La obediencia a la IA |

## Errores frecuentes

1. **Usar la IA como calificadora final.** La IA retroalimenta; el docente califica. Mezclar ambas funciones compromete la confianza del estudiante en el proceso.

2. **No dar al estudiante criterios claros.** Si el estudiante no sabe qué se espera, la retroalimentación de la IA es ruido. La rúbrica o los criterios deben ser explícitos desde el inicio.

3. **Evaluar solo el producto.** Si el portafolio se califica por la versión final sin considerar las iteraciones, el sistema desincentiva el proceso que se supone estamos desarrollando.

4. **Asumir que la retroalimentación de la IA es siempre correcta.** La IA puede dar sugerencias equivocadas. Que el estudiante identifique errores en la retroalimentación de la IA es, en sí mismo, evidencia de aprendizaje.

## Consejos pedagógicos

{{< alert icon="lightbulb" type="info" >}}
**Empieza con un solo ciclo.** No intentes implementar portafolios de 4 versiones desde el primer semestre. Añade un ciclo de retroalimentación IA a una tarea existente y observa el resultado antes de escalar.
{{< /alert >}}

{{< alert icon="lightbulb" type="info" >}}
**Haz visible el rechazo.** Los momentos donde el estudiante decide que la IA está equivocada son los de mayor valor formativo. Asegúrate de incluir formatos o espacios en la entrega de la tarea (como una tabla de decisiones o una reflexión anexa) donde sea obligatorio para el alumno justificar por qué rechazó un consejo de la máquina.
{{< /alert >}}

## Relación con otras secciones del sitio

- La [práctica de evaluación formativa asistida por IA](/laboratorio/practicas/evaluacion-formativa-asistida-ia/) documenta una implementación concreta de estos principios
- La guía de [ABP con IA](/ia-educacion/guias/abp-con-ia/) usa la evaluación formativa en su fase de iteración
- El artículo de [Bearman et al. sobre evaluación auténtica](/recursos/articulos/evaluacion-autentica-ia-bearman/) profundiza en los fundamentos teóricos
- Los principios de [alfabetización crítica en IA](/ia-educacion/etica-y-transparencia/alfabetizacion-critica-ia/) son relevantes para formar estudiantes que evalúen críticamente la retroalimentación de la IA

## Recursos adicionales

- [Assessment for Learning — Dylan Wiliam](https://www.dylanwiliam.org/) — Investigación sobre evaluación formativa
- [Formative Assessment in Practice (CPALMS)](https://www.cpalms.org/Public/ResourceCollection/Formative-Assessment) — Herramientas prácticas

## Referencias

- Black, P., & Wiliam, D. (1998). Assessment and classroom learning. *Assessment in Education: Principles, Policy & Practice*, *5*(1), 7–74. https://doi.org/10.1080/0969595980050102
- Hattie, J., & Timperley, H. (2007). The power of feedback. *Review of Educational Research*, *77*(1), 81–112. https://doi.org/10.3102/003465430298487
- Nicol, D. J., & Macfarlane-Dick, D. (2006). Formative assessment and self-regulated learning: A model and seven principles of good feedback practice. *Studies in Higher Education*, *31*(2), 199–218. https://doi.org/10.1080/03075070600572090
- Sadler, D. R. (1989). Formative assessment and the design of instructional systems. *Instructional Science*, *18*(2), 119–144. https://doi.org/10.1007/BF00117714
