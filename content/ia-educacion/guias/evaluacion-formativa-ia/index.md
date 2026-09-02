---
title: "Añade a una tarea tuya un ciclo de retroalimentación con IA que puedas revisar"
date: 2026-04-14
draft: false
description: "Toma una tarea que ya pides, añade una vuelta de retroalimentación con IA entre el borrador y la entrega, y decide qué te entrega el estudiante para ver qué hizo con los comentarios."
summary: "Cómo integrar retroalimentación con IA en ciclos proporcionales que incluyen criterios, revisión, comprobación y cuidado de datos."
tags: ["evaluación formativa", "retroalimentación", "IA generativa", "portafolios", "rúbricas"]
categories: ["guia"]
areas: ["ia", "evaluacion", "pedagogia"]
showHero: true
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
  accesibilidad: "El ciclo visual se explica paso a paso y las maneras de conocer el recorrido se ofrecen como tablas y listas."
  responsable:
    rol: "Coordinación editorial IA-docencia"
    proxima_revision: 2026-10-27
---

{{< contrato quien="Profesorado que ya pide un borrador y una versión final (un ensayo, un informe, un problema resuelto) y quiere que el estudiante reciba comentarios antes de entregar sin comentar cada borrador a mano, y sin que la IA califique." haras="Vas a tomar una tarea tuya, vas a añadir una vuelta de retroalimentación con IA entre el borrador y la entrega, vas a fijar con qué se revisará (una rúbrica corta que el estudiante conoce desde el inicio) y vas a decidir qué te entrega el estudiante además de la versión final: un punto de comparación y una nota de decisiones." tendras="La instrucción de la tarea con el ciclo añadido y la lista de lo que se entrega (por ejemplo: «Entrega tu esquema inicial, la versión final y una nota de tres líneas: qué sugerencia de la IA aceptaste, cuál descartaste y por qué»), además de la rúbrica que la IA y tú usarán." tarda="Diez minutos con el caso de Paula; treinta con una tarea tuya." ejemplo="Abajo está el caso de Paula, profesora de derecho, ya resuelto: su tarea antes, el ciclo que añadió, la petición que dio al grupo y qué le entregaron." >}}

## El caso de Paula, ya resuelto

Paula da derecho penal en tercer semestre y pide un ensayo argumentativo sobre la proporcionalidad de las penas en delitos menores. Su tarea tenía dos entregas: borrador y versión final. Ella comentaba los cuarenta borradores a mano, tardaba dos semanas, y la versión final cambiaba poco: el grupo corregía las comas que ella marcaba y dejaba igual el argumento.

Añadió una vuelta de retroalimentación con IA entre las dos entregas. Compartió desde el inicio una rúbrica de tres líneas (claridad del argumento, uso de fuentes, contraargumentos considerados) y dio al grupo esta petición para usar con Claude:

> *Prompt:* Soy estudiante de derecho y este es mi borrador de ensayo argumentativo sobre la proporcionalidad de las penas en delitos menores. Actúa como evaluador formativo. No me des la respuesta correcta. Señala: (1) los puntos donde mi argumento es débil o circular, (2) las afirmaciones que necesitan una fuente que las respalde, (3) los contraargumentos que no estoy considerando. Usa un tono directo y constructivo.

Cambió también lo que se entrega: el esquema inicial, la versión final y una nota de tres líneas con una sugerencia aceptada, una descartada y por qué. Una de las notas que recibió: «Acepté añadir el contraargumento de que el juez ya pondera caso por caso. Descarté quitar el caso de 2019: la IA dijo que era irrelevante y es mi mejor ejemplo de pena desproporcionada». Con esa nota y el esquema, Paula ve en dos minutos qué decidió cada estudiante y dedica sus comentarios a la decisión, no a las comas. La IA no puso ninguna calificación: la rúbrica la aplica ella sobre la versión final.

## Haz lo mismo con una tarea tuya, paso a paso

1. **Elige una tarea que ya tenga borrador y entrega.** Si sólo tiene entrega, añade un borrador una semana antes.
2. **Escribe una rúbrica de tres a cinco líneas** con lo que se valora (Paula: «claridad del argumento, uso de fuentes, contraargumentos») y compártela desde el inicio.
3. **Escribe la petición que usará el grupo** con la IA, con dos límites fijos: que no dé la respuesta y que señale qué necesita respaldo. Puedes partir de la de Paula.
4. **Decide qué se entrega además de la versión final:** un punto de comparación (esquema, versión previa o tabla de fuentes verificadas) y una nota breve de decisiones. Elige lo mínimo que te deje ver el recorrido; la sección de abajo te ayuda a calibrarlo.
5. **Revisa antes de usar un servicio externo** qué textos y datos pueden compartirse ([protege datos y trabajos al usar IA](../privacidad-datos-ia/)).

Lo que sigue explica por qué funciona el ciclo y qué otras formas de entrega puedes usar.

## Por qué importa lo que pasa después del comentario

{{< alert icon="scale-balanced" type="info" >}}
**Dos decisiones distintas:** la evaluación formativa describe la función de la
retroalimentación —ayudar a mejorar mientras se aprende—; la evaluación basada en procesos
describe **qué se valora** (versiones, verificaciones y decisiones, además de la versión final). Pueden combinarse, pero no son sinónimos.
{{< /alert >}}

Una actividad es formativa cuando lo que produce (un borrador, un comentario, una nota de decisión) se usa para ajustar la enseñanza y el aprendizaje; puede además contar para la calificación, y ambas funciones caben en la misma actividad. La diferencia entre evaluación sumativa y formativa es de **uso**, no de instrumento. Un borrador o un comentario se usa formativamente cuando permite decidir qué debe revisarse, qué apoyo necesita una persona o qué conviene cambiar en la enseñanza. Se usa sumativamente cuando contribuye a certificar o comunicar un nivel alcanzado. Un borrador calificado puede generar una acción posterior y cumplir una función formativa; una observación sin calificación puede dejar de serlo si nadie la usa (Black & Wiliam, 1998).

Una herramienta generativa puede apoyar el ciclo porque puede:

- producir comentarios rápidos y detallados sobre un borrador;
- contrastar el texto con una rúbrica;
- proponer preguntas o contraejemplos para una revisión;
- ayudar a organizar diferencias entre versiones.

Estas posibilidades no garantizan precisión, personalización ni comprensión del contexto. Lo que se sabe hasta ahora es desigual: una revisión de ocho estudios y 461 estudiantes encontró rapidez y detalle en comentarios de ChatGPT, pero mayor personalización y apoyo emocional en la retroalimentación humana. La supervisión humana sigue siendo necesaria para interpretar el contexto, detectar errores y decidir qué acción pedagógica corresponde (Guardia-Paniura et al., 2026).

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
    H --> I{¿Cumple lo mínimo de la rúbrica?}
    I -->|No| B
    I -->|Sí| J[Docente revisa el proceso completo]
{{< /mermaid >}}

Lo que importa es lo que ocurre después del comentario de la IA. Cada ciclo que añadas necesita tres cosas: con qué se revisa (una rúbrica corta, como la de tres líneas de Paula), una **acción posterior** del estudiante —revisar, verificar, pedir ayuda o explicar por qué aceptó, cambió o descartó— y una **comprobación** que te deje ver si cambió el trabajo o la comprensión. La nota de decisión del estudiante te dice algo, pero la lees junto con la versión final y con lo que la tarea buscaba.

## Cuatro maneras de conocer cómo se llegó al resultado

Cada actividad puede elegir una muestra distinta del recorrido; no hace falta usar las cuatro
a la vez ni convertirlas en un expediente. Las cuatro sirven para lo mismo: conocer una
decisión y cómo se comprobó (Paula usó dos: el esquema inicial y la nota de decisión), en lugar de intentar adivinar si intervino una herramienta.

{{< udgia-figure id="udgia-f09-instrumentos" src="instrumentos-evaluacion-proceso.svg" >}}
Las cuatro maneras convergen en comprender el recorrido: qué se preguntó, qué se descartó,
qué se transformó y por qué:

| Manera de conocer | Qué permite comprender | Cómo se recoge sin vigilar |
|---|---|---|
| Versiones sucesivas. | Comparar qué cambió y qué provocó el cambio. | Dos o tres cortes del trabajo bastan; no hace falta el historial completo. |
| Nota sobre una decisión. | Qué se aceptó, corrigió o descartó, y por qué. | Un párrafo breve de la propia persona, dentro del trabajo o junto a él. |
| Conversación sobre el trabajo. | La persona explica una elección y responde una pregunta. | Unos minutos de intercambio en clase o en tutoría. |
| Criterios explícitos. | El grupo sabe qué se observará; el profesorado conserva el juicio. | Se comparten antes de la actividad, no después. |

Cada actividad puede elegir la muestra más pequeña que todavía ayude a interpretar el
aprendizaje. Comprender una decisión aporta más que intentar detectar una herramienta.
{{< /udgia-figure >}}

## Elige lo mínimo que te deja ver el recorrido

Cuánto pedir depende de la tarea: no se pide lo mismo para una práctica breve que para un
proyecto de alto impacto. El ejercicio siguiente plantea una actividad de riesgo académico bajo y
te obliga a seleccionar, no a acumular. La selección no se califica y no registra el intento; sirve para ensayar la decisión que después tomarás en tu tarea real (paso 4 de arriba).

{{< h5p id="evidencias-proceso-proporcion" load="manual" title="Elegir evidencia suficiente y proporcional" >}}
### Versión textual del caso

En una actividad de riesgo académico bajo, el estudiantado escribe un análisis de 900
palabras y realiza un solo ciclo de retroalimentación con IA. El paquete mínimo suficiente
incluye:

- el esquema inicial, para reconocer el punto de partida;
- una verificación breve de las fuentes utilizadas, para observar el contraste;
- dos decisiones de revisión explicadas, para hacer visible el juicio;
- la versión final, para apreciar el resultado de esas decisiones.

Entregar sólo la versión final resulta insuficiente. Exigir conversaciones completas,
capturas, historial de navegación o todos los mensajes resulta desproporcionado. El número de
consultas y los detectores tampoco muestran por sí mismos qué aprendió la persona.
{{< /h5p >}}

### 1. Portafolio iterativo

El estudiante conserva algunos momentos del trabajo para comparar el punto de partida, una revisión y el resultado. El número de versiones depende de lo que busca la tarea y de su duración; la IA puede intervenir en uno o varios momentos si las reglas lo permiten.

**Ejemplo de estructura proporcional:**

| Versión | Contenido | Qué se entrega |
|---------|-----------|-------------------|
| Punto de partida | Esquema, tesis o fragmento inicial | Fecha y qué aspecto quiere mejorar (por ejemplo, «la tesis») |
| Revisión | Versión posterior a una fuente de retroalimentación | Una o dos decisiones explicadas, sin exigir la conversación completa |
| Contraste opcional | Revisión por pares, docente o herramienta | Comentario elegido y respuesta de quien escribe |
| Cierre | Versión que se valorará | Comprobación breve de qué cambió y qué queda pendiente |

El prompt que Paula dio a su grupo (arriba) sirve como plantilla para la fila «Revisión»: cambia la materia y el tipo de texto.

### 2. Rúbricas asistidas por IA

El docente diseña la rúbrica y puede usar una herramienta generativa para producir un borrador de retroalimentación. La herramienta también interpreta la rúbrica y puede aplicarla de forma inconsistente; su salida debe contrastarse antes de llegar al estudiante o influir en una decisión de evaluación.

**Protocolo:**

1. El docente crea la rúbrica con lo que se valora (por ejemplo: «claridad del argumento»), niveles y ejemplos de interpretación.
2. Antes de compartir textos, verifica la política institucional, la privacidad y la protección de datos del servicio.
3. La herramienta contrasta un texto autorizado con la rúbrica y formula observaciones provisionales.
4. Una persona revisa cada observación que se utilizará: comprueba que señale algo que sí está en el texto, el tono, los sesgos y que corresponda a la rúbrica.
5. El estudiante recibe los comentarios revisados, decide una acción posterior y explica qué cambió.
6. El docente comprueba el aprendizaje con la versión final, las decisiones y lo demás que se entregó; no usa la salida automática como fundamento único de una calificación.

**Ejemplo con Gemini:**

> *Prompt:* Aquí tienes una rúbrica analítica con 4 aspectos (claridad argumentativa, uso de fuentes, estructura lógica y originalidad del planteamiento). Cada aspecto tiene 4 niveles (insuficiente, en desarrollo, competente, destacado). Evalúa el siguiente texto usando exclusivamente esta rúbrica. Para cada aspecto indica el nivel, la justificación y una sugerencia concreta de mejora. [Pegar rúbrica y texto]

{{< alert icon="triangle-exclamation" type="warning" >}}
**La rúbrica no elimina la interpretación.** Una herramienta puede pasar por alto lo que sí está en el texto, inventar justificaciones o reproducir sesgos aun cuando reciba una rúbrica clara. Solo deben entregarse comentarios revisados, y ninguna salida automática debe decidir por sí sola una calificación o una consecuencia académica.
{{< /alert >}}

### 3. Bitácora de decisiones

El estudiante mantiene una bitácora breve donde registra qué buscaba, qué verificó,
qué aceptó y qué descartó durante su trabajo con IA. La escritura reflexiva ayuda a distinguir
una decisión razonada de la adopción automática de una sugerencia.

**Entradas sugeridas:**

- ¿Qué le pregunté a la IA hoy y por qué?
- ¿Qué respuesta esperaba y qué obtuve?
- ¿Qué acepté y qué rechacé de la sugerencia?
- ¿Qué aprendí sobre mi propio proceso de pensamiento?

### 4. Defensa oral

El estudiante explica qué quería lograr, las fuentes, los cambios y las decisiones centrales de
su trabajo sin depender de la IA. En lugar de repetir lo que escribió, sostiene
por qué tomó determinadas decisiones y cómo verificó lo que incorporó.

Una defensa breve puede combinar tres preguntas: qué cambió entre versiones, qué decisión
tomó ante una sugerencia relevante y qué fuente o dato respalda la decisión más importante.

## Qué entrega el estudiante y qué evalúa el docente

Según lo que busca la tarea y su peso en la calificación, el estudiante entrega un **paquete breve** (el de Paula: esquema, versión final y nota de decisiones). No todas las actividades necesitan los mismos componentes; el docente selecciona solo los que permitan interpretar el aprendizaje:

1. **La versión que se valorará:** el texto o la actuación sobre la que se aplicará la rúbrica.
2. **Un punto de comparación:** un esquema, una versión previa o una verificación de fuentes, cuando resulte pertinente.
3. **Una explicación de decisiones:** una nota breve sobre una aceptación, modificación o descarte relevante. No hace falta documentar cada interacción.

Al revisar este paquete, lo que miras cambia de enfoque:

| Lo que aporta al juicio | Lo que no basta por sí solo |
|---|---|
| Las decisiones del estudiante ante la retroalimentación | La cantidad de interacciones con la IA |
| La evolución entre versiones | La calidad del prompt en sí mismo |
| La reflexión sobre el proceso | La versión final aislada |
| La capacidad de aceptar, modificar o descartar sugerencias con fundamento | La obediencia a la IA |

## Decide qué te deja ver el aprendizaje

La pregunta siguiente aplica la distinción que acabas de revisar. No busca acumular rastros:
busca un conjunto pequeño que permita comparar el punto de partida, la verificación y las
decisiones de revisión.

{{< h5p id="evaluacion-proceso-decision" load="manual" title="Qué evidencia muestra aprendizaje" >}}
### Revisa las opciones con la explicación visible

Una estudiante presenta un ensayo sólido después de usar IA. Estas entregas sí ayudan a
valorar el aprendizaje:

- una tesis o un esquema previo, porque muestra el punto de partida;
- una tabla breve de fuentes propuestas, verificadas y descartadas, porque muestra cómo decidió;
- dos o tres decisiones de revisión explicadas, porque permiten observar juicio y
  transformación.

El número de prompts no mide la calidad del proceso. Un porcentaje producido por un
detector tampoco reconstruye qué aprendió la estudiante.
{{< /h5p >}}

## Errores frecuentes

1. **Delegar una decisión de calificación.** Un comentario automático puede orientar una revisión, pero no sustituye tu lectura de la rúbrica sobre el trabajo ni tu responsabilidad docente.

2. **No decirle al estudiante con qué se revisará.** Si no sabe qué se espera, la retroalimentación de la IA es ruido. La rúbrica se comparte desde el inicio, como hizo Paula.

3. **Calificar sólo la versión final.** Si el portafolio se califica por la versión final sin considerar las iteraciones, el sistema desincentiva el proceso que se supone estamos desarrollando.

4. **Asumir que la retroalimentación de la IA es siempre correcta.** La IA puede dar sugerencias equivocadas. Que el estudiante identifique errores en la retroalimentación de la IA es, en sí mismo, una muestra de aprendizaje (la nota que descartó quitar el caso de 2019 lo muestra).

## Salvaguardas antes de usar un servicio externo

- **Privacidad y protección de datos:** no pegar trabajos estudiantiles, nombres o información sensible sin base institucional y consentimiento aplicable. Usar fragmentos anonimizados o alternativas locales cuando corresponda.
- **Sesgo y contexto:** comprobar si los comentarios penalizan variedades lingüísticas, enfoques disciplinares o formas de expresión que la herramienta interpreta de manera estrecha.
- **Dependencia:** alternar fuentes de retroalimentación y pedir que el estudiante contraste la salida con la rúbrica, pares, documentos o revisión docente.
- **Carga de trabajo:** empezar con un ciclo y una entrega breve. Automatizar comentarios que después requieren corregirse uno por uno puede aumentar, no reducir, la carga.
- **Accesibilidad:** ofrecer una vía equivalente cuando la interfaz, el formato conversacional o la exposición oral introduce una barrera.

## Consejos pedagógicos

{{< alert icon="lightbulb" type="info" >}}
**Empieza con un solo ciclo.** Añade una oportunidad de retroalimentación a una tarea existente y comprueba si la revisión te muestra algo útil (una decisión explicada, un cambio entre versiones) antes de ampliar el número de versiones o muestras.
{{< /alert >}}

{{< alert icon="lightbulb" type="info" >}}
**Haz visibles decisiones relevantes.** Si el estudiante acepta, modifica o descarta una sugerencia importante, una nota breve puede mostrar la razón que usó. No debe inventar un rechazo ni conservar toda la conversación para cumplir el formato.
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
