# Lote 07 — cinco piezas para diseñar actividades y evaluar aprendizaje

Fecha: 2026-08-24  
Estado: VoBo recibido; borrador reversible aplicado y en cierre de QA; publicación no autorizada  
Copia de trabajo: `/home/hermes/Nextcloud/Projects/ia/aprendizaje-ia`

> **Nota de trazabilidad.** Este expediente es el registro histórico de la investigación y la
> propuesta anterior al VoBo. Las frases en presente sobre “pendiente de VoBo” o “no modifica
> `content/`” describen aquel corte, no el estado posterior a la aplicación. El cierre y los
> hashes posteriores se registran en el manifiesto de aplicación del lote.

## Pregunta de revisión

¿Estas cinco páginas preexistentes cumplen funciones editoriales distintas y comprensibles, y sus explicaciones corresponden con las fuentes que citan?

Este expediente no modifica `content/`. Clasifica funciones, procedencia y límites antes de proponer una reescritura.

## Línea base viva

La auditoría canónica regenerada el 24 de agosto cubre **164 fuentes Markdown activas**: 11 con decisión `conservar`, 34 con decisión `cambiar` y 119 pendientes. Las dos páginas puestas en cuarentena por el lote 06 ya no forman parte del árbol activo; restarlas de nuevo había producido el total administrativo incorrecto de 115 pendientes.

Las cinco páginas de este lote continúan en el grupo de 119 pendientes. Si reciben decisión humana, quedarán 114 fuentes sin lectura. Las dos fuentes concurrentes bajo `formacion-docente/diseno-inverso-cocreacion-ia/` permanecen fuera de este lote.

## Alcance

| Página | Función actual | Referencias entrantes | Propuesta |
|---|---|---:|---|
| `content/formacion-docente/aprendizaje-activo/index.md` | concepto canónico para reconocer trabajo cognitivo observable | 9 líneas / 8 archivos | **cambiar** |
| `content/formacion-docente/modelos-samr-icap/index.md` | comparación de dos lentes: cambio tecnológico y conducta cognitiva | 9 líneas / 6 archivos | **cambiar** |
| `content/formacion-docente/taxonomia-bloom-diseno-inverso/index.md` | concepto canónico para alinear propósito, evidencia, experiencia y ayuda | 15 líneas / 12 archivos | **conservar** |
| `content/formacion-docente/evaluacion-retroalimentacion/index.md` | introducción a evaluación formativa, sumativa, CAT y retroalimentación | 6 líneas / 5 archivos | **cambiar** |
| `content/formacion-docente/taller-diseno-actividades-ia-backward/index.md` | taller completo de tres sesiones para producir una actividad | 2 líneas / 1 archivo | **cambiar** |

No se propone quitar rutas ni crear aliases. La coexistencia entre la explicación de diseño inverso y el taller está justificada: una explica el concepto y el otro organiza una intervención formativa completa.

## Procedencia

Las cinco páginas son preexistentes. Las cuatro piezas conceptuales de Formación docente entraron al historial en abril de 2026; las tres primeras recibieron una reescritura editorial sustantiva en agosto. El taller entró el 28 de abril y conserva una estructura anterior al frente actual. El historial auxiliar se usa solo para establecer procedencia; la copia sincronizada no tiene `.git` y no permite publicar.

## 1. Aprendizaje activo — cambiar

### Lo que sí funciona

La página parte de un caso reconocible, compara cuatro productos, ofrece una alternativa con y sin IA y termina con cinco preguntas de revisión. Su función no duplica al taller ni a la guía larga: explica qué conducta y qué producto permiten reconocer el trabajo cognitivo.

El artículo original de ICAP clasifica conductas observables en cuatro modos —pasivo, activo, constructivo e interactivo— y advierte que pedir una conducta no garantiza que se realice como fue diseñada.[7] La página incorpora bien esa cautela cuando distingue una colaboración real de una persona que resuelve mientras las demás copian.

### Lo que debe corregirse

En las líneas 63–66 afirma que conversar con IA no puede ser interactivo “en el sentido de ICAP” y que la interacción requiere reciprocidad “entre aprendices”. Esa atribución es demasiado categórica: Chi y Wylie no restringen quién puede ser interlocutor e incluyen un agente computacional si responde de manera pertinente y se cumplen los criterios de construcción y turnos.[7]

La advertencia pedagógica de la página puede conservarse, pero debe formularse así: una interfaz conversacional **no demuestra por sí sola** interacción cognitiva; hay que observar si la persona produce aportes, responde a objeciones y transforma su comprensión. Si se desea reservar la palabra *interacción* para reciprocidad humana, debe declararse como decisión editorial local, no atribuirse a ICAP.

**Decisión propuesta:** `cambiar`. Función recuperable y recorrido completo; corrección conceptual acotada.

## 2. SAMR–ICAP — cambiar

### Lo que sí funciona

La página separa dos preguntas que suelen confundirse: qué cambió en la tarea gracias a la tecnología y qué hizo la persona con las ideas. Evita correspondencias rígidas con Bloom y niega que SAMR sea una meta de ascenso. Esa cautela coincide con la revisión de Hamilton, Rosenberg y Akcaoglu, que identifica en SAMR tres problemas: ausencia de contexto, estructura jerárquica y énfasis en producto sobre proceso.[2]

El enlace vivo a `SAMR_GuidingDevelopment.pdf` respondió hoy `HTTP 200`, `application/pdf`, 111,184 bytes. No corresponde marcarlo como roto.

### Lo que debe corregirse

Las líneas 75–77 repiten la atribución inexacta de la página anterior: presentan la interacción ICAP como exclusivamente humana. Deben distinguir una conversación meramente reactiva de un diálogo constructivo sin negar que el marco original admite un agente computacional bajo condiciones.[7]

La bibliografía solo incluye Puentedura e ICAP. Como el cuerpo ya usa una lectura crítica de SAMR, debe añadir la revisión crítica con DOI `10.1007/s11528-016-0091-y` y explicar que se originó en K–12, no convertirla en validación universal de integración tecnológica.[2][9]

**Decisión propuesta:** `cambiar`. La arquitectura de dos lentes se conserva; se corrigen atribución y soporte bibliográfico.

## 3. Bloom y diseño inverso — conservar

La página presenta un problema concreto —un objetivo que dice “analizar” y una evaluación que solo pide reconocer—, repara la cadena completa y ofrece un ejemplo antes/después. No clasifica una actividad por un verbo aislado ni presenta Bloom como pirámide obligatoria.

La secuencia usada coincide con las tres etapas que ASCD presenta para la planificación inversa: identificar resultados deseados, determinar evidencia aceptable y planear experiencias e instrucción.[5] La página añade una cuarta pregunta sobre asistencia para decidir dónde cabe una fuente, un par o una IA sin delegar la evidencia. Esa ampliación está claramente formulada como decisión de diseño del sitio, no como una cuarta etapa atribuida a Wiggins y McTighe.

**Decisión propuesta:** `conservar`. Cumple situación, destinatario implícito, material inicial, acciones, producto, criterio y continuación. Solo admite correcciones menores de estilo o accesibilidad dentro de otro lote; no necesita reescritura conceptual.

## 4. Evaluación y retroalimentación — cambiar

### Problema conceptual

Las líneas 91–94 llaman “retroalimentación sumativa” a las opiniones del estudiantado sobre la práctica docente al final del curso. Eso es evaluación del curso o de la docencia; no es la retroalimentación sumativa que recibe una persona sobre su aprendizaje. La sección debe separarse o retirarse.

Black y Wiliam describen la evaluación formativa por el uso de información como retroalimentación para modificar la enseñanza y el aprendizaje mientras están ocurriendo.[4] La página actual acierta al presentarla como oportunidad de corregir durante el proceso, pero debilita esa distinción al mezclar funciones distintas bajo el mismo nombre.

### Problema de alcance de fuente

La sección CAT enumera seis técnicas y atribuye su descripción general a Holbeck et al. El artículo consultado estudia una sola técnica —*Misconception/Preconception Check*— en cuatro cursos en línea de ingreso universitario. Participaron 39 de 96 estudiantes y la intervención era opcional; los propios autores la describen como un estudio breve y de pequeña escala.[8] El texto permite nombrar CAT como comprobaciones formativas, pero no sostiene por sí solo toda la taxonomía ni una eficacia general.

Además:

- “recolectar y analizar rápidamente preguntas” debe decir respuestas, productos o indicios de comprensión;
- la exigencia universal de rúbricas para toda evaluación sumativa debe sustituirse por criterios comunicados y un instrumento adecuado a la tarea;
- el documento UdeG de circulación interna puede conservarse como antecedente declarado, pero no cargar afirmaciones públicas que el lector no puede comprobar;
- la página debe diferenciar evaluación del aprendizaje, retroalimentación para aprender y evaluación de la docencia.

**Decisión propuesta:** `cambiar`. La ruta y su función introductoria se conservan; requiere reescritura conceptual y bibliográfica.

## 5. Taller de diseño de actividades con IA — cambiar

### Lo que sí funciona

Es la pieza más completa del lote: identifica audiencia, prerrequisitos, duración, materiales, objetivos por sesión, secuencias con reloj, productos intermedios, rúbrica y adaptaciones. No duplica la página de diseño inverso. La estructura de tres sesiones sigue el orden resultados → evidencia → experiencias que ASCD atribuye al diseño inverso.[5]

El énfasis en comparar calidad, procesos y decisiones es compatible con el artículo conceptual de Bearman et al., que propone desarrollar juicio evaluativo sobre salidas de IA, procesos de trabajo con IA y evaluaciones del propio juicio.[6]

### Lo que debe corregirse

La sesión 3 remite a una “comparativa pedagógica de LLMs” como fuente de “cuatro tareas donde la IA aporta más y tres donde no”. La ficha enlazada no contiene ese esquema: enumera seis tareas y una matriz cualitativa por modelo. Declara pruebas de uso del equipo editorial, pero no publica protocolo, corpus, versiones, resultados ni fecha de cada prueba. No puede fundamentar esa lectura del taller.

También conviene:

- cambiar “funciona con grupos de 12 a 24” por “está diseñado para” mientras no exista registro de aplicación;
- distinguir recomendaciones de facilitación de resultados comprobados;
- sustituir la taxonomía 4+3 por decisiones respaldadas: qué parte del trabajo se desea observar, qué puede aportar la IA, qué no debe delegarse y qué alternativa existe;
- convertir las plantillas descritas en formatos copiables o imprimibles, o declarar que el taller es un guion y no un paquete listo para impartir;
- mantener el compromiso de implementación como opción de seguimiento, no como obligación sin soporte posterior.

**Decisión propuesta:** `cambiar`. La estructura del taller se preserva; deben corregirse procedencia, estado y materiales de replicación.

## Dependencias editoriales

Si se aprueba el lote, también debe ajustarse `content/formacion-docente/_index.md`:

- la card de aprendizaje activo no debe reducirlo a “participar activamente”;
- la card SAMR–ICAP no debe prometer integración “efectiva” ni un “nivel de engagement”, pues las dos lentes no califican automáticamente;
- la card de Bloom debe describir la cadena propósito–evidencia–experiencia;
- la card de evaluación debe distinguir evaluación, retroalimentación y CAT.

`content/recursos/comparativa-llm-pedagogica/index.md` queda fuera del lote 7 y mantiene su decisión pendiente. El taller dejaría de usarla como fundamento empírico; la ficha deberá recibir una revisión de procedencia propia en otro lote.

## Segunda lectura independiente

El intento con Claude Fable terminó antes de leer archivos con `HTTP 429` por agotamiento de cuota; el contenedor de error se conserva en `docs/editorial/revisiones/2026-08-24-claude-fable-contexto-lote-07-api-error.json` y no se presenta como revisión.

Claude Sonnet 5 repitió los cinco controles con acceso exclusivo de lectura y emitió `approve`, `5/5`, sin bloqueos ni cambios obligatorios. Confirmó las cinco decisiones propuestas y no identificó candidatas a quitar. Sugirió dos mejoras no bloqueantes de trazabilidad, incorporadas antes del cierre: adjuntar al ledger la muestra y participación del estudio CAT, y registrar el DOI de la revisión crítica de SAMR como fuente propia.

## Tabla de decisión

| Ruta | Decisión | Qué se conserva | Reparación necesaria |
|---|---|---|---|
| `/formacion-docente/aprendizaje-activo/` | cambiar | caso, cuatro conductas, alternativa con/sin IA, cinco preguntas | corregir atribución de interacción ICAP |
| `/formacion-docente/modelos-samr-icap/` | cambiar | dos lentes independientes, ejemplo y límites | corregir ICAP y añadir revisión crítica SAMR |
| `/formacion-docente/taxonomia-bloom-diseno-inverso/` | conservar | recorrido completo y cadena de diseño | solo ajustes menores futuros |
| `/formacion-docente/evaluacion-retroalimentacion/` | cambiar | ruta introductoria, distinción formativa/sumativa y repertorio CAT | separar conceptos, limitar fuentes y corregir CAT |
| `/formacion-docente/taller-diseno-actividades-ia-backward/` | cambiar | tres sesiones, productos, materiales y rúbrica | declarar propuesta, retirar 4+3 y ofrecer plantillas utilizables |

## Plan posterior al VoBo

1. crear rollback con las cinco fuentes y el índice de Formación docente;
2. escribir pruebas editoriales focales en estado RED;
3. reescribir cuatro páginas y las cards, sin tocar la página conservada salvo una corrección indispensable;
4. mantener rutas, recursos gráficos e identificadores;
5. actualizar el registro humano solo después del VoBo;
6. ejecutar auditorías de contexto, lenguaje, aprendizaje, visuales y build;
7. revisar las cinco rutas en escritorio y móvil;
8. realizar una segunda lectura independiente y reconciliarla;
9. conservar `production_changed=false`.

El VoBo del lote 7 autorizaría preparar este borrador reversible. No autorizaría publicar GitHub Pages ni aprobar la comparativa de LLMs.

## Sources

[2] https://scholars.georgiasouthern.edu/en/publications/the-substitution-augmentation-modification-redefinition-samr-mode — Hamilton et al. — Critical Review of SAMR
    > "We focus on the absence of context, its hierarchical structure, and the emphasis placed on product over process and conclude with suggestions to guide educators’ and researchers’ technology integration efforts."
[4] https://assess.ucr.edu/sites/default/files/2019-02/blackwiliam_1998.pdf — Black & Wiliam — Assessment and Classroom Learning
    > "which provide information to be used as feedback to modify the"
    > "teaching and learning activities in which they are engaged."
[5] https://ascd.org/el/articles/the-fundamentals-of-backward-planning — ASCD — The Fundamentals of Backward Planning
    > "1. Identify Desired Learning Results"
    > "2. Determine Acceptable Evidence"
    > "3. Plan Learning Experiences and Instruction"
[6] https://eric.ed.gov/?id=EJ1438704 — ERIC — Developing Evaluative Judgement for a Time of Generative AI
    > "We propose three foci: (1) developing evaluative judgement of generative AI outputs; (2) developing evaluative judgement of generative AI processes; and (3) generative AI assessment of student evaluative judgements."
[7] https://education.asu.edu/sites/g/files/litvpz656/files/lcl/chiwylie2014icap_2.pdf — Chi & Wylie 2014 — ICAP full text
    > "This article describes the ICAP framework that defines cognitive engagement activities on the basis of students’ overt behaviors and proposes that engagement behaviors can be categorized and differentiated into one of four modes: Interactive, Constructive, Active, and Passive."
    > "However, asking students to carry out a behavior does not guarantee that the expected behavior will actually be carried out in the intended way."
    > "We do not restrict who the partners can be, provided that the criteria are met."
    > "computer agent responds in a content-relevant way"
[8] https://files.eric.ed.gov/fulltext/EJ1127694.pdf — Holbeck, Bergquist & Lees 2014 — CAT full text
    > "Classroom Assessment Techniques (CATs) have been used in traditional university classrooms as a strategy to check for student understanding (Angelo & Cross, 1993)."
    > "This brief and small-scale study carries implications for future research."
    > "For the purposes of this study, the information was retrieved from four online University Success classes. The number of participants totaled 96. Of these 96 students, 39 participated in the optional Misconception/Preconception Check CAT or 40.625% of the total population. The others chose not to participate."
[9] https://doi.org/10.1007/s11528-016-0091-y — Hamilton, Rosenberg & Akcaoglu 2016 — DOI record
    > "Hamilton, E.R., Rosenberg, J.M. & Akcaoglu, M. The Substitution Augmentation Modification Redefinition (SAMR) Model: a Critical Review and Suggestions for its Use. TechTrends 60, 433–441 (2016). https://doi.org/10.1007/s11528-016-0091-y"
