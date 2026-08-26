# Lote 10 — Evidencia y recursos para evaluar con IA

**Fecha de investigación:** 2026-08-24  
**Estado:** propuesta previa al VoBo; no aplicada  
**Ámbito:** cuatro páginas activas del sitio Hugo  
**Resultado propuesto:** `0 conservar / 4 cambiar / 0 quitar o poner en cuarentena`  
**Frontera:** este expediente no autoriza editar `content/`, cambiar rutas ni publicar.

## Decisión resumida

Las cuatro páginas cumplen funciones editoriales distintas y siguen siendo útiles. No hay fundamento para fusionarlas ni retirarlas. Las cuatro deben cambiar porque contienen errores de autoría, afirmaciones más fuertes que sus fuentes, superlativos sin verificación o recomendaciones presentadas como si procedieran directamente de marcos externos.

| Página | Función que debe conservar | Propuesta | Razón principal |
|---|---|---|---|
| Artículo sobre retroalimentación generativa | Ficha conceptual de un artículo académico | **Cambiar** | La autoría es incorrecta y la reseña convierte un marco tentativo en una síntesis más consolidada de lo que el artículo afirma. |
| Tres guías UNAM | Reseña y punto de acceso a tres PDF institucionales | **Cambiar** | Los PDF son auténticos, pero la página añade primacías no demostradas, extiende rasgos de una guía a las tres y mezcla atribuciones propias con las de UNAM. |
| *The Next Era of Assessment* | Ficha de un informe institucional sobre rediseño de evaluación | **Cambiar** | Los datos centrales son correctos, pero el texto debe atribuir los superlativos al DEC y no llamar “probadas” a metodologías que el informe presenta como prácticas recopiladas. |
| Evaluación de herramientas educativas con IA | Guía de decisión institucional | **Cambiar** | Los criterios son útiles, pero el protocolo, los plazos, la composición del comité y algunas advertencias son elaboración del sitio, no recomendaciones literales de ASCCC o eCampusOntario. |

## 1. Artículo sobre retroalimentación generativa

**Ruta que debe preservarse:** `/recursos/articulos/genai-feedback-engagement-2025/`  
**Acción propuesta:** cambiar la ficha sin moverla ni fusionarla.

El artículo real es *Generative artificial intelligence as an enabler of student feedback engagement: a framework*, de **Ying Zhan, David Boud, Phillip Dawson y Zi Yan**, publicado en *Higher Education Research & Development*, 44(5), 1289–1304, DOI `10.1080/07294360.2025.2476513`.[1][2] La página actual atribuye el texto a autores distintos.

El trabajo es conceptual. Propone un marco tentativo para estudiar cómo las posibilidades y restricciones de la IA generativa interactúan con la alfabetización en retroalimentación del estudiantado; los propios autores advierten que estas conceptualizaciones deben seguir siendo provisionales.[1][2] Por eso conviene corregir expresiones como “el marco operativo más sólido publicado hasta la fecha” y evitar presentar sus seis posibilidades educativas como seis dimensiones ya validadas del marco.

### Cambios que requeriría

- corregir autores, referencia bibliográfica, volumen, número y páginas;
- explicar que es un artículo conceptual, no una prueba de eficacia;
- distinguir las seis posibilidades de la IA generativa de las etapas del proceso de usar retroalimentación;
- nombrar las bases teóricas realmente utilizadas, sin atribuir un “ciclo” conjunto a Carless y Hattie;
- conservar el DOI y añadir la copia abierta bajo CC BY-NC-ND 4.0.[2]
- describir límites: ausencia de prueba empírica propia, dependencia del contexto y carácter provisional del marco.

## 2. Tres guías UNAM sobre IA generativa y evaluación

**Ruta que debe preservarse:** `/recursos/articulos/guias-iagen-evaluacion-unam/`  
**Acción propuesta:** cambiar la reseña; conservar los tres PDF, sus portadas, anclas, iframes y enlaces de descarga.

Las tres guías fueron publicadas por la UNAM en abril de 2026 y se distribuyen bajo CC BY-NC-SA 4.0.[3][4][5]

Gaceta UNAM las presenta como documentos orientadores elaborados colectivamente por la CEIDE y especialistas de bachillerato, licenciatura y posgrado.[6]

Las copias guardadas en el bundle coinciden por SHA-256 con las descargas oficiales; esta comprobación se hizo directamente sobre los seis archivos.

La página actual acierta al reunirlas y compararlas, pero convierte varias interpretaciones editoriales en hechos. No encontramos sustento para afirmar que constituyen “el primer cuerpo institucional mexicano” de este tipo o que ofrecen “por primera vez” un marco diferenciado en México. Estas frases deben retirarse o atribuirse a una fuente que realmente haga esa comparación nacional.

Tampoco conviene afirmar que las tres comparten de manera uniforme todos los marcos descritos. La licenciatura atribuye a UNESCO (2025) una lista de diez principios, mientras el registro de la Recomendación sobre ética de la IA conserva el código de 2021 y la edición publicada en 2022.[4][7] La reseña debe respetar lo que cada guía cita y distinguirlo de la procedencia bibliográfica general, en lugar de condensarlo como un único “canon UNESCO 2025”.

### Cambios que requeriría

- eliminar primacías y superlativos nacionales no demostrados;
- corregir el conteo físico de los PDF a 32, 57 y 31 páginas, o aclarar si se usa la numeración interna;
- separar con precisión lo común a las tres guías de lo específico de cada nivel;
- presentar `GAIA-GEN` como nombre del grupo académico de la UNAM, no como un marco de evaluación paralelo a ARCHED;
- distinguir recomendaciones de UNAM, síntesis editorial y comparaciones introducidas por el sitio;
- retirar la afirmación de que las tres “dialogan, sin citarlo, con Bearman et al.”;
- retirar “la frase más repetida” cuando no se acompañe de un conteo y cambiar “las 14 metodologías necesarias” por una descripción atribuida al DEC;
- evitar convertir recomendaciones situadas en reglas universales, especialmente sobre supervisión, trazabilidad, herramientas concretas y evaluación “resistente” a IA;
- reemplazar el enlace genérico de CEIDE por la página estable de informes y conservar las tres URL oficiales, además de las copias locales;
- mantener licencia, citas APA, imágenes, anclas y descargas.

## 3. *The Next Era of Assessment*

**Ruta que debe preservarse:** `/recursos/articulos/next-era-assessment-dec/`  
**Acción propuesta:** cambiar la ficha sin fusionarla con las guías UNAM o con la guía formativa.

El Digital Education Council y Pearson describen su informe como un mapeo de **101 casos**, **14 metodologías prácticas**, una guía de rediseño a escala y un enfoque doble: habilidades humanas fundamentales y fluidez con IA.[8][11]

También presentan “AI-resistant” como principio de base para sostener validez e integridad.[8][11]

Estos datos respaldan la existencia y función del recurso, pero no permiten presentar las metodologías como tácticas “probadas” ni el informe como una evaluación causal de eficacia. La frase “primer mapeo integral” debe atribuirse al DEC, porque es la descripción promocional del propio editor, no una comparación independiente de toda la literatura.

### Cambios que requeriría

- usar el dato exacto de 101 casos en lugar de “más de 100”;
- atribuir al DEC y Pearson la afirmación de “primer mapeo integral”;
- describir las 14 metodologías como categorías o prácticas recopiladas, no como estrategias cuya eficacia ya quedó demostrada;
- aclarar que es un informe institucional, no una revisión académica con evaluación independiente de calidad;
- reemplazar `https://www.digitaleducationcouncil.com/research/the-next-era-of-assessment`, que devuelve 404, por la página viva del recurso.[11]
- comprobar en el informe completo cuándo usa “emerging methodologies” y “AI-resilient”, y distinguir esos términos del “practical methodologies” y “AI-resistant” de la página pública;
- presentar “AI-resistant” como una de las prioridades del informe, sin convertirla en la única respuesta ni garantizar que una evaluación sea invulnerable;
- conservar la ruta, la portada, la referencia a las 14 metodologías y los cuatro enlaces entrantes actuales.

## 4. Guía para evaluar herramientas educativas con IA

**Ruta que debe preservarse:** `/observatorio/guias/evaluacion-herramientas-ia-educativas/`  
**Acción propuesta:** cambiar la guía y explicitar qué partes son adaptación editorial propia.

ASCCC propone preguntas para valorar herramientas en dimensiones como uso ético, efecto pedagógico, usabilidad y sostenibilidad.[9]

La rúbrica de McMaster/eCampusOntario incluye función, accesibilidad, privacidad y consideraciones pedagógicas, éticas y ambientales.[10]

Esa rúbrica se define como una herramienta informal para apoyar conversaciones y decisiones, y recomienda consultar a las unidades locales de docencia y tecnología.[10]

La página ya declara que adapta y simplifica los marcos para una universidad pública mexicana; esa atribución debe conservarse. Lo que no está respaldado es presentar los cuatro pasos completos como “la práctica recomendada” por ambos marcos. En particular, el comité mínimo de cuatro perfiles, la comparación obligatoria de dos herramientas y los tres “errores frecuentes” atribuidos a reportes de comités universitarios no aparecen en las dos fuentes citadas. Pueden formularse expresamente como propuesta editorial local o retirarse si no existe una fuente adicional.

### Cambios que requeriría

- conservar la declaración de que la matriz es una adaptación editorial basada en ASCCC y McMaster/eCampusOntario;
- mapear cada criterio local con su fuente y señalar qué dimensiones fueron combinadas;
- retirar o justificar con fuente el comité mínimo y la comparación obligatoria;
- eliminar anécdotas atribuidas genéricamente a “comités universitarios”;
- preservar la advertencia existente de que la decisión final no es la suma de calificaciones;
- diferenciar decisión preliminar, prueba controlada y autorización institucional;
- añadir preguntas sobre resultados de aprendizaje, supervisión humana, accesibilidad, grupos afectados, privacidad, contrato, retención de datos y sostenibilidad;
- auditar o retirar las referencias a EDUCAUSE y UNESCO si no se vinculan con afirmaciones concretas del texto;
- mantener la ruta, `featured.webp` y los cuatro enlaces entrantes actuales; no existe una plantilla descargable en el bundle.

## Dependencias y reversibilidad que debe preservar una aplicación futura

- La ficha de Zhan no tiene enlaces entrantes exactos; aun así, la ruta y el DOI deben conservarse.
- La página UNAM no tiene enlaces entrantes exactos; sus tres PDF, tres portadas, anclas e iframes son parte de su función y no deben perderse.
- La ficha DEC tiene 4 archivos citantes y 4 apariciones, incluida una referencia Hugo `ref` sin barra final.
- La guía de herramientas tiene 3 archivos citantes y 4 apariciones exactas.
- Existen archivos ocultos de recuperación de Nextcloud dentro de algunos bundles. No son contenido Hugo activo y no deben borrarse durante una edición del lote.
- Antes de cualquier cambio se requerirá un rollback nuevo de las cuatro fuentes, sus bundles relevantes y el ledger editorial.

## Segunda lectura y reconciliación

La segunda lectura independiente emitió dictamen **AJUSTAR** y confirmó la clasificación `4 cambiar / 0 conservar / 0 quitar o poner en cuarentena`. No recomendó fusionar ni retirar ninguna página y no autorizó publicación.

Se incorporaron sus correcciones sobre el conteo de enlaces DEC, la URL 404, la licencia del artículo abierto, la separación de marcos UNAM y los defectos realmente presentes en la guía de herramientas. También se reparó el ledger: Gaceta UNAM conserva ahora la cita literal en español; UNESCO distingue código/adopción de 2021 y edición de 2022; y se añadieron citas específicas para licencias, metodología DEC y consulta institucional de eCampusOntario.

No se incorporó la observación de que `etica` no sería un área permitida: la comprobación del árbol encontró uso activo de esa área en múltiples páginas y no encontró un vocabulario controlado que la excluya. La segunda lectura se conserva completa en `docs/editorial/revisiones/2026-08-24-sol-contexto-lote-10.md`.

## Propuesta para VoBo posterior

Si esta clasificación recibe VoBo, el siguiente paso sería preparar un borrador reversible que:

1. reescriba únicamente los cuatro `index.md`;
2. no cambie rutas ni retire archivos;
3. preserve PDF, portadas, imágenes, descargas, alias y enlaces entrantes;
4. actualice el ledger con cuatro decisiones `cambiar`;
5. ejecute prueba focal en RED y GREEN, QA integrado, build Hugo, lectura en frío y segunda revisión aplicada;
6. permanezca solo en el sitio de revisión hasta una autorización de publicación separada.

## Estado de esta investigación

- Páginas de contenido modificadas: **0**.
- Rutas modificadas: **0**.
- Clasificación propuesta: **4 cambiar / 0 conservar sin cambios / 0 quitar**.
- Publicación autorizada: **no**.
- Producción modificada: **no**.

## Sources

[1] https://www.tandfonline.com/doi/full/10.1080/07294360.2025.2476513 — Zhan et al. (2025), GenAI as an enabler of student feedback engagement
    > "This tentative framework offers a process view of feedback engagement"
    > "Ying Zhan, David Boud, Phillip Dawson & Zi Yan"
[2] https://opus.lib.uts.edu.au/bitstream/10453/189210/2/1796243.pdf — Zhan et al. (2025), open-access published PDF
    > "Given that the application of GenAI in feedback practices is still in its early stage, any current conceptualisations should remain provisional as GenAI evolves."
    > "Higher Education Research & Development, 44:5, 1289-1304, DOI: 10.1080/07294360.2025.2476513"
    > "This is an Open Access article distributed under the terms of the Creative Commons Attribution-NonCommercial-NoDerivatives License"
[3] https://www.cee.unam.mx/wp-content/uploads/2026/04/GUIA_USO_IAGEN_EVALUACION_BACHILLERATO_UNAM.pdf — UNAM (2026), Guía IAGen en evaluación: Bachillerato
    > "Primera edición: abril de 2026"
    > "Creative Commons Atribución-NoComercial-CompartirIgual 4.0 Internacional."
[4] https://www.cee.unam.mx/wp-content/uploads/2026/04/GUIA_USO_IAGEN_EVALUACION_LICENCIATURA_UNAM.pdf — UNAM (2026), Guía IAGen en evaluación: Licenciatura
    > "La UNESCO (2025) propone que el enfoque de la IA debe contemplar diez principios fundamentales:"
    > "Atribución-NoComercial-CompartirIgual 4.0 Internacional."
[5] https://www.cee.unam.mx/wp-content/uploads/2026/04/GUIA_USO_IAGEN_EVALUACION_POSGRADO_UNAM.pdf — UNAM (2026), Guía IAGen en evaluación: Posgrado
    > "tipos de evaluación: sin uso de IA, con asistencia de la IA y con IA integrada."
    > "Creative Commons Atribución-NoComercial-CompartirIgual 4.0 Internacional."
[6] https://www.gaceta.unam.mx/la-ia-generativa-modifica-la-forma-de-aprender-ensenar-y-evaluar — Gaceta UNAM: presentación de las tres guías
    > "Se trata de tres documentos orientadores dirigidos a estudiantes y docentes de bachillerato, licenciatura y posgrado desarrollados por la Coordinación de Evaluación, Innovación y Desarrollo Educativos (CEIDE), en un trabajo colectivo que reunió a especialistas de esos tres niveles de estudio."
[7] https://unesdoc.unesco.org/ark:/48223/pf0000381137 — UNESCO, Recomendación sobre la ética de la IA (código 2021; edición 2022)
    > "Document code: SHS/BIO/PI/2021/1"
    > "Year of publication: 2022"
[8] https://www.digitaleducationcouncil.com/post/the-next-era-of-assessment-a-global-review-of-ai-in-assessment-design — DEC y Pearson, The Next Era of Assessment
    > "Drawing on 101 global case studies, it offers institutions a clear and actionable framework to rethink and redesign assessment in the age of AI"
    > "14 practical methodologies of AI-integrated assessment design"
    > "AI-resistant as a baseline design principle to uphold assessment validity and integrity"
[9] https://asccc.org/evaluating-ai-tools — ASCCC, Evaluating AI Tools in an Academic Setting
    > "This tool serves as a framework for assessing AI tools across multiple dimensions, including ethical use, pedagogical impact, usability, and sustainability."
[10] https://ecampusontario.pressbooks.pub/mcmasterpracticalaiguide/chapter/evaluating-ai-tools — McMaster/eCampusOntario, Evaluating AI Tools
    > "This resource is meant as an informal evaluation tool, with the aim of informing decision-making and conversations."
    > "The Rubric for AI Tool Evaluation provides a framework for assessing the strengths and weaknesses of AI tools based on a set of criteria, including functionality, accessibility, privacy, as well as pedagogical, ethical, and environmental considerations."
    > "Be sure to check with your local teaching and learning centre for advice, along with your local IT department's practices around evaluation and appropriate use of technologies."
[11] https://www.digitaleducationcouncil.com/resource-library-items/the-next-era-of-assessment-a-global-review-of-ai-in-assessment-design — DEC/Pearson, página viva de The Next Era of Assessment
    > "In partnership with Pearson, a global report mapping 101 case studies to help institutions redesign AI-integrated assessments while upholding academic integrity."
    > "14 practical methodologies of AI-integrated assessment design"
    > "AI-resistant as a baseline design principle to uphold assessment validity and integrity"
