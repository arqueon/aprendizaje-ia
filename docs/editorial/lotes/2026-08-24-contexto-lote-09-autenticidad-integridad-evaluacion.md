# Lote 09 · Autenticidad, integridad y evaluación con IA

Fecha de investigación: 2026-08-24  
Estado: **propuesta previa al VoBo; fuentes intactas**  
Frontera: esta investigación no autoriza reescritura ni publicación.

## Alcance

El lote revisa cinco fuentes preexistentes:

1. `content/blog/ia-generativa-evaluacion-autentica/index.md`;
2. `content/recursos/articulos/autenticidad-evaluacion-ajjawi-bearman/index.md`;
3. `content/ia-educacion/etica-y-transparencia/plagio-autenticidad-era-ia/index.md`;
4. `content/ia-educacion/guias/evaluacion-formativa-ia/index.md`;
5. `content/recursos/glosario/integridad-academica/index.md`.

Las cinco cumplen funciones editoriales distintas: artículo de intervención, ficha bibliográfica, explicación ética extensa, guía operativa y definición breve. No se propone fusionarlas por compartir vocabulario.

## Corrección previa de la cola

Al regenerar la auditoría se detectó que tres decisiones activas del lote 06 no estaban en `data/editorial/context-audit-decisions.json`: `about.md`, `rutas/decision-coordinacion-academica` e `ia-educacion/tendencias/ia-tutorias-mentoria`. El registro de aplicación y la segunda lectura del lote 06 demostraban que esas decisiones habían sido aprobadas y aplicadas. Se incorporaron al ledger sin modificar contenido y se volvió a ejecutar `content:context-audit` y `qa:context-audit`.

Conteo corregido:

- fuentes activas: 164;
- decisiones activas: 58;
  - conservar: 15;
  - cambiar: 43;
  - quitar: 0;
- pendientes reales antes del lote 09: 106.

La hoja de ruta `docs/editorial/lotes/2026-08-24-contexto-hoja-ruta-106-pendientes.md` distribuye las 106 fuentes en 19 lotes y su JSON homónimo verifica cobertura 106/106, cero duplicados y cero omisiones.

## Arquitectura y dependencias

El mapa `2026-08-24-contexto-lote-09-link-map.json` registra enlaces entrantes y salientes por coincidencia exacta con la ruta canónica. La guía `evaluacion-formativa-ia` es la ruta más sensible: 19 archivos activos distintos contienen 23 apariciones textuales exactas de su ruta, porque cuatro páginas la incluyen dos veces. `incoming_count: 19` significa, por tanto, **archivos citantes únicos**, no ocurrencias. Su identificador y su ruta deben preservarse en cualquier reescritura. Las otras cuatro fuentes tienen funciones recuperables y continuaciones coherentes; no hay base editorial para eliminarlas.

## Evidencia transversal

Ajjawi et al. no reducen la autenticidad a reproducir el lugar de trabajo: distinguen autenticidad psicológica, fidelidad ontológica y perspectivas de teoría de la práctica.[1] A la vez, la literatura más reciente advierte que hay evidencia limitada para presentar la evaluación auténtica como solución general a preparación profesional, fraude e inclusión; requiere diseño situado y negociación de otros fines pedagógicos.[3] Para el problema específico de la IA generativa, Bearman et al. proponen desarrollar juicio evaluativo sobre productos, procesos y los propios juicios apoyados por IA; no prescriben una única respuesta institucional.[17]

Los detectores tampoco ofrecen una prueba estable de autoría. Liang et al. evaluaron siete detectores sobre 91 ensayos TOEFL procedentes de un foro chino y 88 ensayos estadounidenses de octavo grado; la tasa media de falsos positivos de 61.3 % corresponde al corpus TOEFL de ese estudio, no a toda escritura no anglófona ni a detectores posteriores.[6] Weber-Wulff et al. evaluaron catorce herramientas y concluyeron que no eran precisas ni fiables; la edición, paráfrasis y traducción degradaban aún más el desempeño.[7]

La evaluación es formativa por el uso de la evidencia: Black y Wiliam incluyen las actividades que producen información usada como retroalimentación para modificar la enseñanza y el aprendizaje, y documentan ganancias cuando esa retroalimentación se integra en el proceso.[8] Por ello, “formativa” no equivale a “sin calificación” ni “sumativa” a “clasificación”: una misma actividad puede cumplir ambas funciones según el uso de la evidencia. Esa literatura anterior a la IA generativa tampoco demuestra que un modelo pueda “escalar” el diálogo sin perder calidad. Una revisión sistemática publicada en 2026, limitada a ocho estudios y 461 estudiantes, encontró rapidez y detalle en la retroalimentación de ChatGPT, pero mayor personalización y apoyo emocional en la retroalimentación humana; también subraya que la supervisión humana sigue siendo necesaria.[15]

Eaton desplaza el debate desde la persecución técnica hacia responsabilidad, atribución y capacidad de demostrar aprendizaje, pero no convierte bitácoras, versiones o defensas orales de diez minutos en requisitos universales.[12] Perkins sostiene que el uso de IA no constituye por sí solo una falta: importan la declaración y las políticas de cada institución.[13] Cotton et al. recomiendan instrucciones claras y revisar el diseño de evaluación, pero el artículo no establece que la ausencia de acuerdos sea “la primera causa” de conflictos.[14]

Para la definición breve, ICAI ofrece un punto de partida positivo: honestidad, confianza, justicia, respeto, responsabilidad y valentía, no solo ausencia o detección de fraude.[16]

## Propuesta de decisiones

### 1. Blog · IA generativa y evaluación auténtica

**Propuesta: cambiar.**

Función recuperable: introducir el problema y ofrecer criterios de rediseño a docentes.

Cambios necesarios:

- retirar “se vuelve indispensable”, “contexto local irreductible”, “la IA no puede sustituir” y “se vuelve obligatoria”;
- sustituir el falso dilema entre tareas “bajas” y evaluación auténtica por una explicación de dimensiones, compromisos y límites;
- corregir la atribución a Bearman et al.: el artículo desarrolla juicio evaluativo sobre productos, procesos y los propios juicios apoyados por IA, no una única “respuesta institucional adecuada”;[17]
- presentar defensa oral, personalización y documentación del proceso como opciones seleccionadas según propósito, riesgo, accesibilidad y carga, no como receta universal;
- enlazar la definición breve ya revisada y la ficha de Ajjawi et al.;
- conservar su género de artículo y su orientación docente.

### 2. Ficha · Ajjawi, Bearman et al.

**Propuesta: cambiar.**

Función recuperable: describir y contextualizar un artículo académico concreto.

Cambios necesarios:

- corregir `articuloAccesoAbierto: false`: el artículo publicado es de acceso abierto bajo CC BY-NC-ND 4.0; Taylor & Francis debe quedar como enlace principal y UTS como copia estable de repositorio;[1][20]
- distinguir la publicación en línea del 19 de octubre de 2023 de la publicación impresa del 18 de mayo de 2024 en el volumen 49, número 4, páginas 499–510;[1][20]
- no presentar la IA generativa como objeto principal del artículo: aparece como uno de los problemas que una concepción estrecha no resuelve;
- reemplazar “sustento teórico fundamental” y “centro irreemplazable” por una síntesis acotada de las tres perspectivas;
- añadir un enlace legítimo al texto completo y preservar DOI, autores y función de ficha.

### 3. Plagio y autenticidad en la era de la IA

**Propuesta: cambiar.**

Función recuperable: explicar cómo cambian autoría, declaración, evidencia y debido proceso.

Cambios necesarios:

- eliminar la definición atribuida a Perkins que el artículo no formula;
- acotar “post-plagio” a la propuesta de Eaton, sin convertirla en consenso ni en una definición cerrada de autenticidad;
- corregir la cifra de Liang: 61.3 % corresponde a 91 ensayos TOEFL evaluados con siete detectores y comparados con 88 ensayos estadounidenses de octavo grado, no a una tasa universal;[6]
- conservar la crítica a usar detectores como prueba única, incorporando límites de alcance y evolución tecnológica;
- retirar la afirmación causal no sustentada atribuida a Cotton et al.;
- convertir bitácora, versiones, declaración y conversación oral en instrumentos opcionales y combinables, con atención a accesibilidad, privacidad y carga;
- retirar el requisito universal de diez minutos y la “nota adicional”; distinguir sugerencia pedagógica de procedimiento institucional;
- rotular los tres casos como escenarios hipotéticos, no como resoluciones normativas automáticas.

### 4. Guía · Evaluación formativa con IA

**Propuesta: cambiar.**

Función recuperable y dependencia crítica: guía operativa con 19 enlaces entrantes explícitos.

Cambios necesarios:

- sustituir todas las reapariciones de “la evaluación formativa no califica” y “la sumativa clasifica” —incluidas las secciones de flujo, evaluación del aprendizaje e implementación— por la distinción funcional: la evidencia es formativa cuando se usa para ajustar enseñanza o aprendizaje;[8]
- reemplazar “sin sacrificar la calidad del diálogo” por una promesa condicional y verificable;
- incorporar evidencia específica sobre retroalimentación generativa, sus límites y la necesidad de juicio humano;
- no convertir “IA aplica la rúbrica; docente decide” en garantía: la aplicación de criterios también requiere revisión y puede estar restringida por políticas o protección de datos;
- exigir que todo ciclo incluya criterio, acción posterior y comprobación del aprendizaje, no solo producción de comentarios;
- añadir advertencias sobre privacidad, carga de trabajo, sesgo, dependencia y exposición de textos estudiantiles;
- preservar ruta, identificadores, enlaces entrantes y carácter práctico de la guía.

### 5. Glosario · Integridad académica

**Propuesta: cambiar.**

Función recuperable: definición breve y subordinada a páginas extensas.

Cambios necesarios:

- conservar la brevedad; no convertir la entrada en otra guía;
- sustituir la caricatura de los enfoques “casi exclusivamente” centrados en fraude y software por una definición positiva de valores y responsabilidades compartidas;
- no presentar el rediseño de evaluación como condición universal de integridad;
- explicar en dos párrafos que, con IA, importan reglas comprensibles, declaración del uso, atribución, equidad y capacidad de responder por el trabajo;
- mantener el enlace a evaluación auténtica y añadir una continuación hacia la explicación ética extensa cuando esta haya sido revisada.

## Resumen de la propuesta

| Decisión | Cantidad |
|---|---:|
| Conservar | 0 |
| Cambiar | 5 |
| Quitar/cuarentena | 0 |

La coincidencia de las cinco decisiones no se basa en longitud ni tema. Cada cambio responde a un defecto verificable distinto: prescripción absoluta, atribución inexistente, universalización de un resultado, metadato de acceso incorrecto o definición reductiva. Ninguna función editorial está perdida.

## Segunda lectura independiente y reconciliación

La segunda lectura independiente de Sol confirmó la clasificación **5 cambiar, 0 conservar, 0 quitar/cuarentena**. El dictamen fue `AJUSTAR` el expediente probatorio, no las decisiones: las cinco funciones siguen siendo recuperables y no existe fundamento para fusionar o retirar ninguna página.

La revisión señaló un bloqueo documental y cuatro mejoras importantes. Esta versión los reconcilia de la siguiente forma:

1. añade el artículo de Bearman et al. y delimita sus tres focos;
2. incorpora evidencia literal de acceso abierto, licencia y publicación en línea de Ajjawi et al., más el registro Crossref de la publicación impresa de 2024;
3. documenta los siete detectores y los tamaños de ambos corpus de Liang et al.;
4. incorpora la definición funcional de Black y Wiliam y las afirmaciones de Eaton sobre atribución y demostración del aprendizaje;
5. explica que `incoming_count: 19` cuenta archivos citantes únicos, frente a 23 apariciones textuales;
6. incluye todas las reapariciones localizadas de la falsa oposición formativa/sumativa en el alcance de la futura corrección.

La revisión no modificó archivos ni autorizó aplicación, VoBo o publicación. Tras esta reconciliación, el gate estricto terminó con `citations OK`: 12 fuentes citadas, 12 presentes en el ledger y 12 con evidencia literal. El bloqueo documental queda resuelto.

## Condiciones para una eventual aplicación

1. VoBo explícito del lote 09.
2. Rollback y hashes de las cinco fuentes antes de editar.
3. Pruebas RED focales que codifiquen las correcciones sin imponer redacción literal.
4. Preservación de rutas, aliases, recursos, licencias e identificadores.
5. Build, enlaces, lenguaje directo y QA visual en escritorio/móvil.
6. Segunda lectura independiente del borrador aplicado.
7. Registro de decisiones solo después de validar las cinco fuentes.
8. Sin publicación: un VoBo editorial autorizaría únicamente borrador reversible y QA.

## Sources

[1] https://opus.lib.uts.edu.au/rest/bitstreams/9d8f6ee7-5fbf-438a-9125-0414e1e2b866/retrieve — From authentic assessment to authenticity in assessment
    > "possibilities for assessment. These are (1) psychological authenticity; (2) ontological fidelity; and (3) practice theory perspectives."
    > "Published online: 19 Oct 2023."
    > "This is an Open Access article distributed under the terms of the Creative Commons Attribution-NonCommercial-NoDerivatives License"
[3] https://research.monash.edu/en/publications/authentic-assessment-from-panacea-to-criticality — Authentic assessment: from panacea to criticality
    > "Despite literature supporting its potential benefits, there is limited evidence on the relationship between authentic assessment and these challenges."
[6] https://pmc.ncbi.nlm.nih.gov/articles/PMC10382961 — GPT detectors are biased against non-native English writers
    > "they incorrectly labeled more than half of the TOEFL essays as "AI-generated" (average false-positive rate: 61.3%)."
    > "In our study, we evaluated the performance of seven widely used GPT detectors on 91 TOEFL (Test of English as a Foreign Language) essays from a Chinese forum and 88 US eighth-grade essays from the Hewlett Foundation’s ASAP dataset."
    > "While the detectors accurately classified the US student essays, they incorrectly labeled more than half of the TOEFL essays as "AI-generated" (average false-positive rate: 61.3%)."
[7] https://link.springer.com/article/10.1007/s40979-023-00146-z — Testing of detection tools for AI-generated text
    > "The researchers conclude that the available detection tools are neither accurate nor reliable and have a main bias towards classifying the output as human-written rather than detecting AI-generated text."
[8] https://assess.ucr.edu/sites/default/files/2019-02/blackwiliam_1998.pdf — Assessment and Classroom Learning
    > "Several studies show firm evidence that innovations designed to strengthen the frequent feedback that students receive about their learning yield substantial learning gains."
    > "be interpreted as encompassing all those activities undertaken by teachers, and/or by their students, which provide information to be used as feedback to modify the"
    > "teaching and learning activities in which they are engaged."
[12] https://link.springer.com/article/10.1007/s40979-023-00144-1 — Postplagiarism
    > "To extend this argument to educational contexts, students remain responsible for the quality and credibility of the work they submit for assessment."
    > "If students cannot demonstrate their own learning, then there may be reason to question whether academic integrity has been violated."
    > "Citing, referencing, and attribution remain important skills."
    > "Attribution, on the other hand, is about knowing others’ work, being able to speak to it accurately, and showing respect for others’ contributions."
[13] https://files.eric.ed.gov/fulltext/EJ1382355.pdf — Academic integrity considerations of AI LLMs
    > "we conclude that it is not the student use of any AI tools that defines whether plagiarism or a breach of academic integrity has occurred, but whether any use is made clear by the student."
[14] https://pearl.plymouth.ac.uk/cgi/viewcontent.cgi?article=1310&context=bms-research — Chatting and cheating repository copy
    > "Firstly, academic staff can provide clear and detailed instructions to students regarding how to structure their assignments."
    > "Whatever happens on the technology side, this should serve as a wake-up call to university staff to think very carefully about the design of their assessments and ways to ensure that academic dishonesty is clearly explained to students and minimised."
[15] https://www.cedtech.net/download/human-and-ai-generated-feedback-in-higher-education-a-systematic-review-of-effectiveness-and-student-17863.pdf — Human and AI-generated feedback systematic review PDF
    > "This review included 8 studies with 461 students. ChatGPT feedback was detailed and rapid, while human feedback was valued for its personalization and emotional support."
    > "However, human supervision is essential to ensure feedback is nuanced and contextually appropriate."
[16] https://www.academicintegrity.org/aws/ICAI/pt/sp/values — ICAI Fundamental Values
    > "The International Center for Academic Integrity defines academic integrity as a commitment, even in the face of adversity, to six fundamental values: honesty, trust, fairness, respect, responsibility, and courage."
[17] https://figshare.com/articles/journal_contribution/Developing_evaluative_judgement_for_a_time_of_generative_artificial_intelligence/25720845 — Developing evaluative judgement for a time of generative artificial intelligence
    > "We propose three foci: (1) developing evaluative judgement of genera-
tive AI outputs; (2) developing evaluative judgement of generative AI
processes; and (3) generative AI assessment of student evaluative judge-
ments."
    > "The relationship between evaluative judgement and generative AI is more than just the application of human judgement to machine outputs. We have a collective responsibility, as educators and learners, to ensure that humans do not relinquish their roles as arbiters of quality."
[20] https://api.crossref.org/works/10.1080/02602938.2023.2271193 — Crossref record: From authentic assessment to authenticity in assessment
    > ""published-print": {
    "date-parts": [
      [
        2024,
        5,
        18
      ]
    ]
  }"
    > ""volume": "49",
  "issue": "4",
  "page": "499-510""
