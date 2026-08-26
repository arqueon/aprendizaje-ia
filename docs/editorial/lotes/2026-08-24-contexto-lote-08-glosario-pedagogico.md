# Lote 08 — cinco entradas del glosario pedagógico

Fecha de investigación: 2026-08-24  
Estado: **VoBo recibido el 2026-08-24; borrador reversible aplicado, verificado y cerrado sin publicar**  
Frontera: el VoBo autorizó edición reversible y verificación, pero no integración ni publicación. Las secciones de propuesta se conservan como registro de la decisión previa.

## Pregunta editorial

¿Estas entradas breves resuelven una duda puntual y devuelven al lector al texto canónico, o compiten con él mediante afirmaciones incompletas, promocionales o sin procedencia verificable?

El contrato vigente del glosario establece que una entrada debe aclarar cómo usa el sitio un concepto y remitir a la explicación extensa cuando la decisión requiera contexto, límites o un procedimiento. La brevedad no es por sí sola un defecto; sí lo son una definición rival, una promesa no sustentada o la ausencia de continuación.

## Alcance y estado de publicación

Las cinco fuentes son preexistentes, tienen `draft: false` y respondieron HTTP 200 tanto en GitHub Pages como en el sitio de revisión el 2026-08-24. No son páginas nuevas, borradores aislados ni rutas en cuarentena.

| Fuente | Palabras | Referencias entrantes escritas a mano | Estado | Propuesta |
|---|---:|---:|---|---|
| `content/recursos/glosario/aprendizaje-activo/index.md` | 113 | 0 | publicada | **cambiar** |
| `content/recursos/glosario/diseno-inverso/index.md` | 171 | 0 | publicada | **cambiar** |
| `content/recursos/glosario/taxonomia-de-bloom/index.md` | 203 | 3 | publicada | **conservar** |
| `content/recursos/glosario/modelo-samr/index.md` | 205 | 0 | publicada | **conservar** |
| `content/recursos/glosario/evaluacion-autentica/index.md` | 138 | 1 | publicada | **cambiar** |

Las entradas con cero referencias escritas a mano no están automáticamente huérfanas: el índice del glosario las enumera mediante la colección de Hugo. El dato solo indica que su continuidad depende especialmente de la referencia relacionada incluida en la propia entrada.

## Decisiones propuestas

### 1. Aprendizaje activo — cambiar

La primera oración ofrece una definición recuperable, pero el segundo párrafo llama al aprendizaje activo “antídoto” contra un supuesto “déficit cognitivo”, afirma que el diseño descrito “garantiza” esquemas conceptuales robustos y restringe la IA a “únicamente” motor de contraste u oponente. Ninguna de esas tres afirmaciones queda sustentada en la entrada.

ICAP describe el compromiso cognitivo mediante comportamientos observables y distingue modos pasivo, activo, constructivo e interactivo.[1] Esta base permite conservar una entrada breve sin reducir el aprendizaje activo a moverse, usar una interfaz o asignar a la IA un único papel.

**Cambio propuesto:**

- definir el término mediante la operación cognitiva que realiza la persona;
- eliminar “antídoto”, “garantiza” y la restricción “únicamente”;
- añadir un contraste breve entre actividad visible y elaboración cognitiva;
- remitir a `formacion-docente/aprendizaje-activo/` como explicación canónica;
- conservar la ruta, el título y los metadatos de clasificación.

### 2. Diseño inverso — cambiar

La secuencia de tres etapas es correcta y recuperable. Una fuente universitaria que resume a Wiggins y McTighe formula esas etapas como identificar resultados, determinar evidencia aceptable y planificar instrucción, tareas y experiencias.[2] La entrada actual, sin embargo, no cita esa procedencia, no enlaza la guía canónica y termina con una afirmación promocional según la cual el marco es “particularmente valioso” con IA porque obliga a desarrollar competencias cognitivas profundas.

**Cambio propuesto:**

- conservar las tres etapas;
- atribuir el marco a Wiggins y McTighe;
- sustituir la promesa sobre “competencias profundas” por una explicación acotada de alineación entre propósito, evidencia y experiencia;
- remitir a `formacion-docente/taxonomia-bloom-diseno-inverso/`;
- conservar ruta y metadatos.

### 3. Taxonomía de Bloom — conservar

La entrada ya cumple la función subordinada del glosario:

- define la taxonomía revisada sin convertirla en pirámide obligatoria;
- advierte que un verbo aislado no determina la complejidad;
- evita reservar los niveles iniciales a la IA o los finales al juicio humano;
- remite mediante `relref` a la página canónica;
- ofrece la referencia de Anderson y Krathwohl (2001).

Tiene tres referencias entrantes escritas a mano. No se propone fusionarla con la guía extensa ni reescribirla por compartir vocabulario.

### 4. Modelo SAMR — conservar

La entrada también conserva una función propia y subordinada:

- define las cuatro categorías;
- aclara que no son escala universal de calidad;
- separa transformación tecnológica de aprendizaje;
- evita correspondencias fijas con Bloom e ICAP;
- remite mediante `relref` a la explicación canónica;
- incluye tanto la fuente de Puentedura como la revisión crítica de Hamilton, Rosenberg y Akcaoglu.

No tiene referencias entrantes escritas a mano, pero permanece accesible desde el índice automático del glosario y contiene su propia continuación. No se propone quitarla por ese dato aislado.

### 5. Evaluación auténtica — cambiar

La definición actual presenta la evaluación auténtica como una medición “genuina” de competencias del “mundo real”. Después afirma que la evaluación tradicional centrada en productos “pierde validez”, que las máquinas emulan esos productos “sin esfuerzo” y que la aportación humana debe ser “intrínsecamente irreemplazable”. El texto convierte una familia de principios de diseño en garantía contra problemas de validez e IA.

La revisión crítica de Fawns y colegas señala que la evidencia sobre la relación entre evaluación auténtica, preparación profesional, fraude e inclusión es limitada y propone tratar la autenticidad como principios aspiracionales dentro de un marco pedagógico más amplio.[3] Esto no obliga a descartar la autenticidad; obliga a explicar propósitos, contexto, apoyos y compensaciones.

La referencia actual —“Bearman et al. (2023), *Assessment in an AI world: Redesigning for authentic learning*”— no fue localizada mediante búsqueda exacta de título y autores. Sí se verificó un artículo distinto de Bearman y colegas, publicado en 2024, titulado *Developing evaluative judgement for a time of generative artificial intelligence*, DOI `10.1080/02602938.2024.2335321`.[4] La coincidencia temática no valida la referencia actual; debe sustituirse solo por metadatos comprobados y por una fuente que sostenga la frase concreta.

**Cambio propuesto:**

- definir la autenticidad como conjunto de principios situados, no como propiedad binaria o garantía;
- eliminar las generalizaciones sobre pérdida de validez y emulación “sin esfuerzo”;
- sustituir “intrínsecamente irreemplazable” por evidencia observable de aplicación, juicio y justificación;
- incorporar explícitamente límites, apoyos y compensaciones;
- corregir o retirar la referencia no verificada;
- remitir a la guía o artículo canónico correspondiente sin cambiar la URL pública;
- revisar después la frase entrante de `integridad-academica`, que depende de esta entrada, sin ampliar automáticamente el lote.

## Síntesis de decisión

Propuesta preliminar:

- **2 conservar:** Taxonomía de Bloom; modelo SAMR.
- **3 cambiar:** aprendizaje activo; diseño inverso; evaluación auténtica.
- **0 quitar o poner en cuarentena.**

Rubén aprobó y se registraron las cinco decisiones editoriales. La auditoría viva confirmó 55 decisiones sobre fuentes activas —14 `conservar` y 41 `cambiar`— y 109 pendientes. El ledger histórico contiene 57 registros porque conserva dos decisiones de rutas que ya no están activas; esa diferencia no se presenta como trabajo pendiente.

## Condiciones de una eventual aplicación

1. Congelar hashes y copias de rollback de las cinco fuentes y de la dependencia entrante relevante.
2. Escribir pruebas focales en RED antes de editar las tres fuentes.
3. No modificar Bloom ni SAMR salvo metadatos estrictamente necesarios y expresamente justificados.
4. Preservar rutas, aliases, referencias entrantes y funcionamiento del índice automático.
5. Ejecutar auditoría de contexto, enlaces, rutas, build Hugo y revisión visual escritorio/móvil.
6. Obtener una segunda lectura independiente sobre la propuesta y otra sobre el borrador aplicado.
7. Mantener `publication_authorized: false`; el VoBo de lote no equivale a publicación.

## Sources

[1] https://eric.ed.gov/?id=EJ1044018 — The ICAP Framework: Linking Cognitive Engagement to Active Learning Outcomes
    > "This article describes the ICAP framework that defines cognitive engagement activities on the basis of students' overt behaviors and proposes that engagement behaviors can be categorized and differentiated into one of four modes: "Interactive," "Constructive," "Active," and "Passive.""
[2] https://fctl.ucf.edu/teaching-resources/course-design/backward-design — Backward Design — University of Central Florida
    > "In practice, backward design involves three stages:"
    > "1. Identifying outcomes 2. Determining the acceptable evidence to support those outcomes 3. Planning corresponding instruction, tasks, and experiences."
[3] https://research.monash.edu/en/publications/authentic-assessment-from-panacea-to-criticality — Authentic assessment: from panacea to criticality
    > "Despite literature supporting its potential benefits, there is limited evidence on the relationship between authentic assessment and these challenges."
    > "We argue that authenticity should be considered as a set of aspirational principles within a broader pedagogical framework."
[4] https://dro.deakin.edu.au/articles/journal_contribution/Developing_evaluative_judgement_for_a_time_of_generative_artificial_intelligence/25720845 — Developing evaluative judgement for a time of generative artificial intelligence
    > "Developing evaluative judgement for a time of generative artificial intelligence"
    > "Publication URL http://dx.doi.org/10.1080/02602938.2024.2335321"
