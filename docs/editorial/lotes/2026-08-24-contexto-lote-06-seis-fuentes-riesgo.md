# Lote 06 — lectura humana de seis fuentes de riesgo

Fecha: 2026-08-24  
Estado: investigación y segunda lectura concluidas; propuesta lista para VoBo editorial  
Copia de trabajo: `/home/hermes/Nextcloud/Projects/ia/aprendizaje-ia`

## Pregunta de revisión

Cinco páginas fueron priorizadas por un detector de lenguaje empírico. La lectura humana añadió una sexta al comprobar que el hub `laboratorio/experiencias/` no contiene páginas hijas, aunque promete casos reales.

Este expediente no modifica ninguna fuente. Separa los casos que pueden conservarse de los que necesitan reescritura o cuarentena.

## Alcance

| Página | Ruta física |
|---|---|
| Ruta para coordinación académica | `content/ia-educacion/rutas/coordinacion-academica/index.md` |
| Modelo SAMR | `content/recursos/glosario/modelo-samr/index.md` |
| Acerca de | `content/about.md` |
| Experiencias de docentes con IA en el aula | `content/blog/experiencias-docentes-ia-aula/index.md` |
| Hub Experiencias docentes | `content/laboratorio/experiencias/_index.md` |
| Tutorías y mentoría con IA | `content/ia-educacion/tendencias/ia-tutorias-mentoria/index.md` |

Las seis rutas existían antes de esta revisión. Ninguna fue creada durante la lectura del lote 6.

## Método

Se revisaron:

1. las seis fuentes completas;
2. su primera aparición en el historial público de GitHub;
3. sus referencias y enlaces externos;
4. las páginas primarias o copias legítimas accesibles;
5. las referencias entrantes en `content/`;
6. la función editorial y los materiales que recibe el lector.

La comprobación de enlaces distinguió una fuente viva de una captura archivada. También rechazó intersticiales de Cloudflare aunque devolvieran HTML.

## Resultado por página

### 1. Coordinación académica: `conservar`

La página no presenta una implementación observada. El front matter declara `estado_evidencia: prototipo-escenario` (`L26`). El cuerpo se presenta como guía de trabajo (`L52–L57`) y usa un ejemplo hipotético (`L123–L125`). Frases como “¿el proceso docente mejoró?” forman parte de las preguntas para revisar un piloto (`L211–L221`), no de resultados declarados.

La función es comprensible: delimitar un piloto, acordar reglas, acompañar al profesorado y decidir si el programa continúa. Incluye situación inicial, responsables, calendario, materiales, productos y revisión. La propuesta es `conservar` sin presentar el ejemplo hipotético como caso real.

### 2. Modelo SAMR: `cambiar`

La ficha define sustitución, aumento, modificación y redefinición de acuerdo con la presentación de Puentedura. La captura archivada el 4 de septiembre de 2025 confirma esas cuatro definiciones.[8]

El lote local 02A del 23 de agosto ya corrigió el problema conceptual: la versión vigente dice que las categorías no son una escala de calidad, que SAMR no demuestra aprendizaje y que no existe una correspondencia fija con Bloom o ICAP (`L21–L23`). Esa reescritura local todavía no está publicada y no debe repetirse en el lote 6.

El cambio pendiente es bibliográfico. El enlace vivo de Puentedura en `L29` rechazó conexiones. La captura archivada conserva la fuente citada.[8] La revisión crítica de Hamilton, Rosenberg y Akcaoglu aporta los límites ya resumidos por la ficha; el preprint permite comprobar el resumen y el DOI identifica la versión de registro.[10][11]

La propuesta es `cambiar` con alcance estrictamente bibliográfico:

- sustituir el enlace muerto por la captura Wayback fechada el 4 de septiembre de 2025;
- añadir la revisión crítica y su DOI;
- conservar sin reescritura los límites conceptuales que ya dejó el lote 02A.

### 3. Acerca de: `cambiar`

La página afirma que la integración de IA es una prioridad de la Universidad de Guadalajara y que el sitio documenta prácticas y experiencias propias (`L21`). También promete que toda afirmación factual se respalda con fuentes (`L45`). El sitio todavía contiene prácticas con procedencia no verificada y fuentes que requieren corrección. Esa promesa no describe el estado actual.

UDGPlus sí ha organizado actividades para que docentes integren herramientas generativas de forma ética y efectiva.[9] Esa actividad oficial no basta para afirmar una prioridad institucional general ni para presentar este sitio como publicación oficial sin una declaración explícita sobre autoría y alcance.

La propuesta es `cambiar`:

- identificar quién mantiene el sitio y qué relación editorial tiene con UDGPlus;
- sustituir la promesa de cobertura total por un alcance comprobable;
- distinguir prácticas aplicadas, propuestas y piezas en cuarentena;
- retirar la frase de “prioridad institucional” o respaldarla con una política oficial;
- mantener el aviso de atribución y licencia con lenguaje verificable.

### 4. Experiencias docentes: `quitar/cuarentena`

El artículo afirma que cinco patrones “aparecen con suficiente frecuencia para considerarse condiciones del oficio actual” (`L5`); el lead usa una formulación equivalente con “suficiente regularidad” (`L21`). También sostiene que “conviene tomarlos como datos” (`L56`). No identifica corpus, número de casos, periodo, método de selección ni forma de análisis.

Bearman y sus colegas publicaron un artículo conceptual sobre juicio evaluativo y evaluación formativa, no un estudio de las cinco experiencias descritas.[5][7] La OCDE distingue con claridad rendimiento y aprendizaje, pero tampoco documenta esos cinco patrones locales.[6] La referencia a comunidades de práctica explica aprendizaje colectivo; no convierte un ensayo editorial en síntesis empírica.

La función no se recupera con una corrección breve. La página no ofrece materiales o casos que permitan comprobar sus patrones. La propuesta es `quitar/cuarentena`. Podría regresar si se construye un corpus público, se describe el método y cada patrón se vincula con casos comprobables.

### 5. Hub Experiencias docentes: `quitar/cuarentena`

La rama `/laboratorio/experiencias/` no contiene páginas hijas. Aun así, el hub promete “casos reales”, “resultados observados” y relatos de docentes de UdeG y otras instituciones (`L17–L30`). Mantener el hub activo después de retirar el artículo produciría una ruta vacía que promete un corpus inexistente.

La propuesta es poner también el hub en cuarentena. Las rutas `/blog/experiencias-docentes-ia-aula/` y `/laboratorio/experiencias/` se conservarían como aliases de `/laboratorio/`. El hub general de Laboratorio debe retirar la tarjeta y las frases que ofrecen implementaciones documentadas hasta que exista al menos un caso con procedencia verificable.

### 6. Tutorías y mentoría: `cambiar`

La página mezcla resultados prometedores con afirmaciones universales. Cita como “2024” un artículo de Mary Burns publicado por Brookings el 27 de enero de 2026.[2] Esa fuente advierte que muchas afirmaciones sobre beneficios educativos adelantaron a la evidencia y que el diseño pedagógico importa.[2]

El ensayo controlado de Kestin y colegas encontró mejores resultados para un tutor construido con contenido, prompts y andamiaje de especialistas. Los autores aclaran que no suponen que la tutoría estructurada superará al aprendizaje activo en todos los contextos, en particular cuando hay síntesis compleja y pensamiento crítico de orden superior.[3]

La OCDE coincide en que completar mejor una tarea no implica aprender: sin orientación pedagógica, delegar la tarea puede mejorar el producto sin producir ganancias reales.[6] El marco UNESCO define conocimientos, habilidades y valores docentes para usar y evaluar IA; no es una prueba de eficacia de tutores.[4]

La página actual atribuye a Brookings un “declive” robusto que la fuente no mide, califica el resultado de Harvard como replicable sin replicaciones, afirma cifras de grupos mexicanos sin fuente y presenta el modelo híbrido como una conclusión universal. La propuesta es `cambiar`:

- corregir fecha, método y alcance de cada fuente;
- retirar las cifras mexicanas y comparaciones de costo no documentadas;
- sustituir “resultado replicable y robusto” por la descripción acotada del ensayo;
- presentar dependencia, errores y sustitución del pensamiento como riesgos de diseño, no como efectos inevitables;
- explicar cuándo puede servir un tutor, cuándo debe intervenir una persona y qué aprendizaje se comprobará sin IA.

## Decisión propuesta

| Página | Decisión | Razón breve |
|---|---|---|
| Coordinación académica | `conservar` | Guía declarada como prototipo-escenario, con ejemplo hipotético y recorrido completo. |
| Modelo SAMR | `cambiar` | Los límites ya fueron corregidos en 02A; falta reparar y ampliar la referencia. |
| Acerca de | `cambiar` | Promesas editoriales e institucionales mayores que la evidencia disponible. |
| Experiencias docentes | `quitar/cuarentena` | No existe corpus ni método para los cinco patrones presentados como recurrentes. |
| Hub Experiencias docentes | `quitar/cuarentena` | Está vacío y promete casos reales y resultados observados. |
| Tutorías y mentoría | `cambiar` | Fechas, alcance y conclusiones sobredimensionadas. |

## Rutas y dependencias

El censo encontró seis enlaces de navegación hacia coordinación académica. La URL absoluta guardada en `ecosistema.fuentes` de `decision-institucional-ia` no es un alias. `about` tiene un enlace interno desde la página de licencia. SAMR, Tutorías y el artículo de Experiencias no tienen enlaces entrantes activos en `content/`. El hub Experiencias recibe una tarjeta desde `/laboratorio/`.

Si se aprueba la cuarentena del artículo y del hub de experiencias:

- se preservarán los Markdown y activos en rollback y cuarentena;
- `/blog/experiencias-docentes-ia-aula/` y `/laboratorio/experiencias/` quedarán como aliases de `/laboratorio/`;
- el hub general de Laboratorio dejará de anunciar implementaciones documentadas mientras no haya casos verificables;
- no se borrarán copias ocultas de Nextcloud;
- se actualizará el ledger humano sin marcar publicación.

Las demás páginas conservan sus URLs actuales.

## Plan si recibe VoBo

1. crear rollback y hashes de las seis fuentes y dependencias;
2. escribir un QA RED para afirmaciones sobredimensionadas, fuente SAMR y alias;
3. conservar coordinación académica sin reescritura;
4. completar la referencia SAMR y reescribir Acerca de y Tutorías con las fuentes verificadas;
5. poner el artículo y el hub Experiencias en cuarentena, retirar la tarjeta vacía y añadir ambos aliases;
6. actualizar decisiones e inventarios;
7. ejecutar QA de contexto, lenguaje, rutas, build, móvil, escritorio y axe;
8. realizar una segunda lectura independiente;
9. presentar el borrador para VoBo editorial específico.

Este VoBo no autorizaría publicar GitHub Pages ni borrar definitivamente la cuarentena.

## Segunda lectura independiente

La revisión inicial de Fable produjo `adjust`: dos bloqueos y seis cambios obligatorios. La primera reconciliación resolvió siete de ocho controles, pero detectó un manifiesto con bloques antiguos contradictorios. El manifiesto se reescribió desde cero como una sola representación canónica y los hashes se recalcularon localmente.

La comprobación final aprobó `4/4` controles, sin bloqueos ni cambios obligatorios. Confirmó seis fuentes, cinco dependencias, ambos aliases hacia `/laboratorio/`, el ledger corregido con fecha de Brookings del 27 de enero y la separación entre los límites SAMR ya escritos en 02A y la reparación bibliográfica propuesta aquí.

Las seis fuentes y las cinco dependencias permanecen sin cambios; `production_changed=false`.

## Sources

[2] https://www.brookings.edu/articles/what-the-research-shows-about-generative-ai-in-tutoring — Brookings — What the research shows about generative AI in tutoring
    > "Thus far, many claims about the educational benefits of generative AI have outpaced high-quality evidence."
    > "January 27, 2026"
[3] https://doi.org/10.1038/s41598-025-97652-6 — Kestin et al. — AI tutoring outperforms in-class active learning
    > "While the advantages of the experimental condition are widely generalizable and our findings have broad implications, we do not presume that structured AI tutoring will always outperform in-class active learning in all contexts, for example, those requiring complex synthesis of multiple concepts and higher-order critical thinking."
[4] https://www.unesco.org/en/articles/ai-competency-framework-teachers — UNESCO AI competency framework for teachers
    > "Guiding teachers on artificial intelligence (AI) use and misuse in education, this publication defines the knowledge, skills, and values teachers must master in the age of AI."
[5] https://doi.org/10.1080/02602938.2024.2335321 — Bearman et al. — Developing evaluative judgement
    > "Developing evaluative judgement for a time of generative artificial intelligence"
[6] https://www.oecd.org/en/publications/oecd-digital-education-outlook-2026_062a7394-en.html — OECD Digital Education Outlook 2026
    > "The OECD Digital Education Outlook 2026 analyses emerging research that suggests GenAI can support learning when guided by clear teaching principles. However, if designed or used without pedagogical guidance, outsourcing tasks to GenAI simply enhances performance with no real learning gains."
[7] https://eric.ed.gov/?id=EJ1438704 — ERIC EJ1438704 — Developing evaluative judgement for a time of generative AI
    > "In this conceptual paper, we describe the intersection between evaluative judgement and generative AI with a view to articulating how assessment practices can help students learn to work productively with generative AI."
[8] https://web.archive.org/web/20250904122306/https://www.hippasus.com/rrpweblog/archives/2012/01/19/SAMR_GuidingDevelopment.pdf — Wayback 2025-09-04 — SAMR: Guiding Development
    > "Tech allows for the creation of new tasks, previously inconceivable"
[9] https://udgplus.udg.mx/noticias/promueve-udgplus-uso-de-herramientas-de-ia-generativa-en-la-educacion — UDGPlus promueve herramientas de IA generativa en educación
    > "Promover el uso de herramientas de inteligencia artificial generativa entre docentes, para que puedan integrarlas de manera ética y efectiva en sus prácticas educativas"
[10] https://newcollegedurhamhe.wordpress.com/wp-content/uploads/2018/03/the-samr-model-a-critical-review.pdf — Hamilton et al. — The SAMR Model: A Critical Review
    > "We focus on the absence of context, its hierarchical structure, and the emphasis placed on product over process and conclude with suggestions to guide educators’ and researchers’ technology integration efforts."
[11] https://doi.org/10.1007/s11528-016-0091-y — Hamilton, Rosenberg y Akcaoglu (2016) — SAMR: A Critical Review and Suggestions for Its Use
    > "The Substitution Augmentation Modification Redefinition (SAMR) Model: a Critical Review and Suggestions for its Use"
