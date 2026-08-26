---
title: "Evaluación formativa con IA — ciclos de retroalimentación iterativa"
date: 2026-04-14
draft: false
description: "Guía para diseñar ciclos donde la evidencia y la retroalimentación se usan para ajustar enseñanza y aprendizaje con supervisión humana."
summary: "Cómo integrar retroalimentación con IA en ciclos proporcionales que incluyen criterios, revisión, comprobación y cuidado de datos."
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
showRelatedContent: true
content_type: guia
audiences: [profesorado, coordinacion]
intentions: [diseñar, evaluar]
topics: [evaluacion, retroalimentacion, trazabilidad]
challenges: [dependencia, opacidad]
competencies: [juicio-evaluativo, diseno-pedagogico, trazabilidad]
evidence_status: evidencia-citada
connections:
  - relation: fundamenta
    page: /formacion-docente/alfabetizacion-co-creacion/
    reason: "Relaciona la evaluación del proceso con dirección epistémica y co-creación."
  - relation: ejemplifica
    page: /ia-educacion/productos-de-aprendizaje/ensayo/
    reason: "Observa versiones, decisiones y declaración de uso en una tarea completa."
  - relation: requiere
    page: /ia-educacion/guias/privacidad-datos-ia/
    reason: "Protege textos, retroalimentación y datos antes de usar un servicio externo."
ecosistema:
  id: assessment.basada-en-procesos
  titulo: "Evaluación basada en procesos"
  audiencias: [docente, coordinacion]
  intenciones: [diseñar, evaluar, gobernar]
  tipo: guia
  capas: [R.evaluacion, D.evaluacion, P.trazabilidad, P.retroalimentacion]
  resultado: "Diseña un ciclo que valora producto, decisiones y revisión con criterios diferenciados."
  estado_evidencia: evidencia-citada
  fuentes:
    - "https://doi.org/10.1080/0969595980050102"
    - "https://doi.org/10.3102/003465430298487"
  revisado: 2026-07-28
  relaciones:
    - tipo: aplica
      destino: evidence.trazabilidad
    - tipo: continua
      destino: practice.portafolio-proceso
    - tipo: requiere
      destino: pattern.direccion-epistemica
  reutilizacion: [orientaciones, hugo, moodle, curso-amplio]
  accesibilidad: "El ciclo visual se explica paso a paso y los instrumentos se ofrecen como tablas y listas."
  responsable:
    rol: "Coordinación editorial IA-docencia"
    proxima_revision: 2026-10-27
---

{{< lead >}}
Una actividad es formativa cuando la evidencia que produce se usa para modificar o ajustar la enseñanza y el aprendizaje. Puede además contribuir a una decisión sumativa: ambas funciones pueden coincidir en la misma actividad. Esta guía propone ciclos donde la IA ofrece una primera retroalimentación, el estudiante la contrasta y actúa, y el docente supervisa y comprueba qué aprendizaje ocurrió.
{{< /lead >}}

## La premisa: evaluar procesos, no solo productos

{{< alert icon="scale-balanced" type="info" >}}
**Dos decisiones distintas:** la evaluación formativa describe la función de la
retroalimentación —ayudar a mejorar mientras se aprende—; la evaluación basada en procesos
describe **qué evidencias** se valoran —versiones, verificaciones y decisiones, además del
producto final—. Pueden combinarse, pero no son sinónimos.
{{< /alert >}}

La diferencia entre evaluación sumativa y formativa es de **uso**, no de instrumento. Una evidencia se usa formativamente cuando permite decidir qué debe revisarse, qué apoyo necesita una persona o qué conviene cambiar en la enseñanza. Se usa sumativamente cuando contribuye a certificar o comunicar un nivel alcanzado. Un borrador calificado puede generar una acción posterior y cumplir una función formativa; una observación sin calificación puede dejar de serlo si nadie la usa (Black & Wiliam, 1998).

Una herramienta generativa puede apoyar el ciclo porque puede:

- producir comentarios rápidos y detallados sobre un borrador;
- contrastar el texto con criterios explícitos;
- proponer preguntas o contraejemplos para una revisión;
- ayudar a organizar diferencias entre versiones.

Estas posibilidades no garantizan precisión, personalización ni comprensión del contexto. La evidencia disponible es heterogénea: una revisión de ocho estudios y 461 estudiantes encontró rapidez y detalle en comentarios de ChatGPT, pero mayor personalización y apoyo emocional en la retroalimentación humana. La supervisión humana sigue siendo necesaria para interpretar el contexto, detectar errores y decidir qué acción pedagógica corresponde (Guardia-Paniura et al., 2026).

## Arquitectura de un ciclo formativo con IA

{{< mermaid >}}
flowchart TD
    A[Estudiante produce borrador] --> B[IA ofrece retroalimentación]
    B --> C[Estudiante revisa y decide]
    C --> D{¿Qué hizo con la sugerencia?}
    D -->|Aceptó| E[Documenta por qué]
    D -->|Modificó| F[Documenta qué cambió y por qué]
    D -->|Descartó| G[Documenta por qué]
    E --> H[Nuevo borrador]
    F --> H
    G --> H
    H --> I{¿Cumple criterios mínimos?}
    I -->|No| B
    I -->|Sí| J[Docente revisa el proceso completo]
{{< /mermaid >}}

El elemento crítico no es el comentario de la IA, sino lo que ocurre después. Cada ciclo debe declarar un **criterio**, producir una **acción posterior** —revisar, verificar, pedir ayuda o explicar una aceptación, modificación o descarte— y añadir una **comprobación** que permita reconocer si cambió la comprensión o el trabajo. La decisión documentada del estudiante puede aportar evidencia, pero debe leerse junto con el producto y el propósito de la actividad.

## Cuatro instrumentos formativos con IA

{{< udgia-figure id="udgia-f09-instrumentos" src="instrumentos-evaluacion-proceso.svg" >}}
Cuatro instrumentos complementarios convergen en la trazabilidad del trabajo:

| Instrumento | Qué hace visible | Qué no demuestra por sí solo |
|---|---|---|
| Portafolio iterativo | La evolución entre versiones y la incorporación de retroalimentación. | No explica por sí mismo la razón de cada cambio. |
| Bitácora de decisiones | Criterios, verificaciones, descartes y responsabilidades. | No demuestra por sí sola la calidad integral del producto final. |
| Defensa oral | La capacidad de explicar y sostener el trabajo sin depender de la IA. | No reconstruye por sí sola todo el recorrido entre versiones. |
| Rúbricas asistidas | Retroalimentación apoyada por IA, con calificación bajo juicio docente. | No aporta evidencia concreta si no se acompaña de artefactos. |

Una combinación proporcionada permite evaluar el juicio sin convertir la trazabilidad en
vigilancia exhaustiva.
{{< /udgia-figure >}}

## Elige un paquete de evidencias proporcional

La suficiencia depende de la tarea: no se pide lo mismo para una práctica breve que para un
proyecto de alto impacto. Este ejercicio plantea una actividad de riesgo académico bajo y
obliga a seleccionar, no a acumular. En este ejercicio de práctica, la selección no se califica,
no registra el intento y no se entrega como evidencia; su función es preparar una decisión que
pueda reutilizarse en una tarea real.

{{< h5p id="evidencias-proceso-proporcion" load="manual" title="Elegir evidencia suficiente y proporcional" >}}
### Versión textual del caso

En una actividad de riesgo académico bajo, el estudiantado escribe un análisis de 900
palabras y realiza un solo ciclo de retroalimentación con IA. El paquete mínimo suficiente
incluye:

- el esquema inicial, para reconocer el punto de partida;
- una verificación breve de las fuentes utilizadas, para observar el contraste;
- dos decisiones de revisión explicadas, para hacer visible el juicio;
- la versión final, para apreciar el resultado de esas decisiones.

Entregar solo el producto final resulta insuficiente. Exigir conversaciones completas,
capturas, historial de navegación o todos los mensajes resulta desproporcionado. El número de
consultas y los detectores tampoco muestran por sí mismos qué aprendió la persona.
{{< /h5p >}}

### 1. Portafolio iterativo

El estudiante conserva algunos momentos del trabajo para comparar el punto de partida, una revisión y el resultado. El número de versiones depende del propósito y la duración de la tarea; la IA puede intervenir en uno o varios momentos si las reglas lo permiten.

**Ejemplo de estructura proporcional:**

| Versión | Contenido | Evidencia requerida |
|---------|-----------|-------------------|
| Punto de partida | Esquema, tesis o fragmento inicial | Fecha y criterio que se quiere trabajar |
| Revisión | Versión posterior a una fuente de retroalimentación | Una o dos decisiones explicadas, sin exigir la conversación completa |
| Contraste opcional | Revisión por pares, docente o herramienta | Comentario elegido y respuesta de quien escribe |
| Cierre | Versión que se valorará | Comprobación breve de qué cambió y qué queda pendiente |

**Ejemplo de prompt para retroalimentación con Claude:**

> *Prompt:* Soy estudiante de derecho y este es mi borrador de ensayo argumentativo sobre la proporcionalidad de las penas en delitos menores. Actúa como evaluador formativo. No me des la respuesta correcta. Señala: (1) los puntos donde mi argumento es débil o circular, (2) las afirmaciones que necesitan evidencia, (3) los contraargumentos que no estoy considerando. Usa un tono directo y constructivo.

### 2. Rúbricas asistidas por IA

El docente diseña la rúbrica y puede usar una herramienta generativa para producir un borrador de retroalimentación. La herramienta también interpreta los criterios y puede aplicarlos de forma inconsistente; su salida debe contrastarse antes de llegar al estudiante o influir en una decisión de evaluación.

**Protocolo:**

1. El docente crea la rúbrica con criterios, niveles y ejemplos de interpretación.
2. Antes de compartir textos, verifica la política institucional, la privacidad y la protección de datos del servicio.
3. La herramienta contrasta un texto autorizado con la rúbrica y formula observaciones provisionales.
4. Una persona revisa cada observación que se utilizará: comprueba evidencia, tono, sesgos y correspondencia con el criterio.
5. El estudiante recibe los comentarios revisados, decide una acción posterior y explica qué cambió.
6. El docente comprueba el aprendizaje con el producto, las decisiones y otra evidencia pertinente; no usa la salida automática como fundamento único de una calificación.

**Ejemplo con Gemini:**

> *Prompt:* Aquí tienes una rúbrica analítica con 4 criterios: claridad argumentativa, uso de evidencia, estructura lógica y originalidad del planteamiento. Cada criterio tiene 4 niveles (insuficiente, en desarrollo, competente, destacado). Evalúa el siguiente texto usando exclusivamente esta rúbrica. Para cada criterio indica el nivel, la justificación y una sugerencia concreta de mejora. [Pegar rúbrica y texto]

{{< alert icon="triangle-exclamation" type="warning" >}}
**La rúbrica no elimina la interpretación.** Una herramienta puede omitir evidencia, inventar justificaciones o reproducir sesgos aun cuando reciba criterios explícitos. Solo deben entregarse comentarios revisados, y ninguna salida automática debe decidir por sí sola una calificación o una consecuencia académica.
{{< /alert >}}

### 3. Bitácora de decisiones

El estudiante mantiene una bitácora breve donde registra criterios, verificaciones,
aceptaciones y descartes durante su trabajo con IA. La escritura reflexiva ayuda a distinguir
una decisión razonada de la adopción automática de una sugerencia.

**Entradas sugeridas:**

- ¿Qué le pregunté a la IA hoy y por qué?
- ¿Qué respuesta esperaba y qué obtuve?
- ¿Qué acepté y qué rechacé de la sugerencia?
- ¿Qué aprendí sobre mi propio proceso de pensamiento?

### 4. Defensa oral

El estudiante explica el propósito, las fuentes, los cambios y las decisiones centrales de
su trabajo sin depender de la IA. No se trata de repetir el producto final, sino de sostener
por qué tomó determinadas decisiones y cómo verificó lo que incorporó.

Una defensa breve puede combinar tres preguntas: qué cambió entre versiones, qué decisión
tomó ante una sugerencia relevante y qué evidencia respalda la decisión más importante.

## Qué entrega el estudiante y qué evalúa el docente

Según el propósito y el riesgo de la tarea, el estudiante puede entregar un **paquete breve de evidencias**. No todas las actividades necesitan los mismos componentes; el docente selecciona solo los que permitan interpretar el aprendizaje:

1. **El producto que se valorará:** la versión o actuación sobre la que se aplicarán los criterios.
2. **Un punto de comparación:** un esquema, una versión previa o una verificación de fuentes, cuando resulte pertinente.
3. **Una explicación de decisiones:** una nota breve sobre una aceptación, modificación o descarte relevante. No hace falta documentar cada interacción.

Al momento de revisar este entregable, los criterios del docente deben cambiar de enfoque:

| Lo que aporta al juicio | Lo que no basta por sí solo |
|---|---|
| Las decisiones del estudiante ante la retroalimentación | La cantidad de interacciones con la IA |
| La evolución entre versiones | La calidad del prompt en sí mismo |
| La reflexión sobre el proceso | El producto final aislado |
| La capacidad de aceptar, modificar o descartar sugerencias con fundamento | La obediencia a la IA |

## Decide qué evidencia permite valorar aprendizaje

La pregunta siguiente aplica la distinción que acabas de revisar. No busca acumular rastros:
busca un conjunto pequeño que permita comparar el punto de partida, la verificación y las
decisiones de revisión.

{{< h5p id="evaluacion-proceso-decision" load="manual" title="Qué evidencia muestra aprendizaje" >}}
### Revisa las opciones con la explicación visible

Una estudiante presenta un ensayo sólido después de usar IA. Estas evidencias sí ayudan a
valorar el aprendizaje:

- una tesis o un esquema previo, porque muestra el punto de partida;
- una tabla breve de fuentes propuestas, verificadas y descartadas, porque muestra criterio;
- dos o tres decisiones de revisión explicadas, porque permiten observar juicio y
  transformación.

El número de prompts no mide la calidad del proceso. Un porcentaje producido por un
detector tampoco reconstruye qué aprendió la estudiante.
{{< /h5p >}}

## Errores frecuentes

1. **Delegar una decisión de calificación.** Un comentario automático puede orientar una revisión, pero no sustituye la interpretación del criterio, la evidencia del trabajo ni la responsabilidad docente.

2. **No dar al estudiante criterios claros.** Si el estudiante no sabe qué se espera, la retroalimentación de la IA es ruido. La rúbrica o los criterios deben ser explícitos desde el inicio.

3. **Evaluar solo el producto.** Si el portafolio se califica por la versión final sin considerar las iteraciones, el sistema desincentiva el proceso que se supone estamos desarrollando.

4. **Asumir que la retroalimentación de la IA es siempre correcta.** La IA puede dar sugerencias equivocadas. Que el estudiante identifique errores en la retroalimentación de la IA es, en sí mismo, evidencia de aprendizaje.

## Salvaguardas antes de usar un servicio externo

- **Privacidad y protección de datos:** no pegar trabajos estudiantiles, nombres o información sensible sin base institucional y consentimiento aplicable. Usar fragmentos anonimizados o alternativas locales cuando corresponda.
- **Sesgo y contexto:** comprobar si los comentarios penalizan variedades lingüísticas, enfoques disciplinares o formas de expresión que la herramienta interpreta de manera estrecha.
- **Dependencia:** alternar fuentes de retroalimentación y pedir que el estudiante contraste la salida con criterios, pares, documentos o revisión docente.
- **Carga de trabajo:** empezar con un ciclo y una evidencia breve. Automatizar comentarios que después requieren corregirse uno por uno puede aumentar, no reducir, la carga.
- **Accesibilidad:** ofrecer una vía equivalente cuando la interfaz, el formato conversacional o la exposición oral introduce una barrera.

## Consejos pedagógicos

{{< alert icon="lightbulb" type="info" >}}
**Empieza con un solo ciclo.** Añade una oportunidad de retroalimentación a una tarea existente y comprueba si la revisión produce evidencia útil antes de ampliar el número de versiones o instrumentos.
{{< /alert >}}

{{< alert icon="lightbulb" type="info" >}}
**Haz visibles decisiones relevantes.** Si el estudiante acepta, modifica o descarta una sugerencia importante, una nota breve puede mostrar el criterio usado. No debe inventar un rechazo ni conservar toda la conversación para cumplir el formato.
{{< /alert >}}

## Relación con otras secciones del sitio

- La [actividad propuesta de evaluación formativa asistida por IA](/laboratorio/practicas/evaluacion-formativa-asistida-ia/) propone una aplicación de cuatro semanas de estos principios
- La guía de [ABP con IA](/ia-educacion/guias/abp-con-ia/) usa la evaluación formativa en su fase de iteración
- El [reporte global del DEC sobre la nueva era de la evaluación](/recursos/articulos/next-era-assessment-dec/) ofrece un catálogo de 14 metodologías directas.
- Los principios de [alfabetización crítica en IA](/ia-educacion/etica-y-transparencia/alfabetizacion-critica-ia/) son relevantes para formar estudiantes que evalúen críticamente la retroalimentación de la IA

## Recursos adicionales

- [Assessment for Learning — Dylan Wiliam](https://www.dylanwiliam.org/) — Investigación sobre evaluación formativa

{{< referencias >}}

- Black, P., & Wiliam, D. (1998). Assessment and classroom learning. *Assessment in Education: Principles, Policy & Practice*, *5*(1), 7–74. https://doi.org/10.1080/0969595980050102
- Guardia-Paniura, C. H., Cueva-Luza, T., Cruz-Carpio, F. M., Ito-Díaz, R. R., Apaza-Paco, D. V., Rosas-Rojas, N., Mamani-Mamani, B., Terrero-Pérez, Á., Yaedú, R. Y. F., & Peralta-Mamani, M. (2026). Human and AI-generated feedback in higher education: A systematic review of effectiveness and student perceptions. *Contemporary Educational Technology*, *18*(1), ep623. https://doi.org/10.30935/cedtech/17863
- Hattie, J., & Timperley, H. (2007). The power of feedback. *Review of Educational Research*, *77*(1), 81–112. https://doi.org/10.3102/003465430298487
- Nicol, D. J., & Macfarlane-Dick, D. (2006). Formative assessment and self-regulated learning: A model and seven principles of good feedback practice. *Studies in Higher Education*, *31*(2), 199–218. https://doi.org/10.1080/03075070600572090
- Sadler, D. R. (1989). Formative assessment and the design of instructional systems. *Instructional Science*, *18*(2), 119–144. https://doi.org/10.1007/BF00117714

{{< /referencias >}}
