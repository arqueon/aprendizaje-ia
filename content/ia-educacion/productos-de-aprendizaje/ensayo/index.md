---
title: "Ensayo con IA: evaluar el proceso de escritura"
date: 2026-05-11
lastmod: 2026-07-01
draft: false
description: "Guía visual para construir un ensayo por etapas, usar IA sin delegar la autoría y evaluar tanto el proceso como el texto final."
summary: "Una ruta de siete etapas para investigar, argumentar, interrogar y revisar un ensayo con apoyo crítico de IA. Incluye dos rutas —estudiante y docente—, evidencias, prompts y rúbrica."
tags: ["producto-aprendizaje", "bloom-5", "evaluación-procesos", "cognitivas", "comunicación", "argumentación", "ensayo", "IA generativa"]
categories: ["producto-aprendizaje"]
areas: ["ia", "evaluacion", "pedagogia"]

bloom_dominante: 5
bloom_rango: "2-6"
competencias_cluster: ["Cognitivas", "Comunicación"]
area_disciplinar: "general"
riesgo_sustitucion_autoria: "alto"
modalidad: "híbrida o cualquiera"
asignatura_ejemplo: "Humanidades / Filosofía / Ciencias sociales / Comunicación"

showHero: true
showTableOfContents: true
showReadingTime: true
showBreadcrumbs: true
showSummary: true
showTaxonomies: true
showRelatedContent: true
showAuthor: false
content_type: producto
audiences: [estudiante, profesorado]
intentions: [practicar, diseñar, evaluar]
topics: [productos-de-aprendizaje, evaluacion, trazabilidad]
challenges: [autoria, alucinacion, dependencia]
competencies: [cocreacion, verificacion, trazabilidad]
evidence_status: prototipo
connections:
  - relation: requiere
    page: /ia-educacion/practicas/comprobar-afirmacion/
    reason: "Verifica la evidencia antes de incorporar una afirmación al argumento."
  - relation: aplica
    page: /ia-educacion/practicas/bitacora-cocreacion/
    reason: "Registra versiones, sugerencias aceptadas o rechazadas y fuentes."
  - relation: fundamenta
    page: /ia-educacion/guias/evaluacion-formativa-ia/
    reason: "Comprende cómo valorar el recorrido y no solo el texto final."
ecosistema:
  id: practice.declaracion-uso-ia
  titulo: "Declaración de uso de IA"
  audiencias: [estudiante, docente]
  intenciones: [practicar, diseñar, evaluar]
  tipo: caso
  capas: [D.ensayo, P.direccion-epistemica, P.trazabilidad, P.transparencia]
  resultado: "Diseña o recorre un ensayo por etapas y declara de forma proporcional el uso de IA."
  estado_evidencia: prototipo-escenario
  fuentes:
    - "https://arqueon.github.io/aprendizaje-ia/ia-educacion/guias/agenciamiento-humano-ia/"
    - "https://arqueon.github.io/aprendizaje-ia/ia-educacion/guias/evaluacion-formativa-ia/"
  revisado: 2026-07-27
  relaciones:
    - tipo: ejemplifica
      destino: practice.portafolio-proceso
    - tipo: aplica
      destino: pattern.direccion-epistemica
    - tipo: aplica
      destino: evidence.trazabilidad
  reutilizacion: [hugo, moodle, curso-amplio]
  accesibilidad: "Las siete etapas tienen una explicación lineal, evidencias y rutas textuales por audiencia."
  responsable:
    rol: "Coordinación editorial IA-docencia"
    proxima_revision: 2026-10-27
---

{{< contrato modo="ejemplo" quien="Docentes de cualquier licenciatura que piden un ensayo argumentativo y ya saben que el archivo entregado puede venir entero de una IA; y estudiantes que quieren usar IA en su ensayo sin regalar la autoría." haras="Sofía, estudiante de Relaciones Internacionales, recibe la instrucción «Evalúe la coherencia de la política exterior de México ante una crisis reciente». En siete etapas acota el tema a la ruptura con Ecuador de 2024, verifica fuentes, escribe su tesis en tres versiones, redacta un borrador de 1 200 palabras sin IA, le pide a la IA un esquema inverso y objeciones, decide en una tabla qué acepta y qué rechaza, y entrega el ensayo con su portafolio y una declaración de uso. La IA entra en las etapas 1, 3, 5 y 6; nunca en el borrador." tendras="Ocho prompts copiables por etapa, una tabla de decisiones de tres columnas (sugerencia · decisión · por qué) y una regla de revisión que puedes usar mañana: «sin borrador v1 fechado antes de la fase de IA, la entrega no se evalúa»." tarda="Veinte minutos de lectura completa; ocho si sólo sigues tu ruta (estudiante o docente)." ejemplo="El caso de Sofía aparece resumido en el primer párrafo y completo en la sección «Un ejemplo de principio a fin», antes de las rutas y de los prompts." >}}

Sofía, estudiante de Relaciones Internacionales, recibe una instrucción de una línea:
«Evalúe la coherencia de la política exterior de México ante una crisis reciente». Lo que
entregará cuatro semanas después es un ensayo, y también el camino: la nota donde acotó
el tema, la matriz de fuentes que verificó, tres versiones de su tesis, un borrador
escrito sin IA y una tabla con lo que aceptó, adaptó y rechazó de lo que la IA le dijo.
Un ensayo es una secuencia de decisiones: delimitar un problema, verificar fuentes,
sostener una tesis, enfrentar objeciones y revisar con razones. Esta guía hace visible
ese recorrido para que la IA funcione como interlocutora, no como autora sustituta.

{{< alert icon="compass" type="info" >}}
**Idea central:** la persona conserva la dirección epistémica (decide qué cuenta como válido y hacia dónde avanza el trabajo). La IA puede preguntar, diagnosticar, objetar y sugerir; el estudiante investiga, escribe, verifica y decide.
{{< /alert >}}

## El cambio en una mirada

La tabla compara los dos modelos (a la izquierda, lo que casi todo el mundo hace hoy; a la derecha, lo que propone esta guía):

| Modelo centrado en el producto | Modelo centrado en proceso y producto |
|---|---|
| Una consigna y una fecha final | Siete etapas con puntos de control |
| Solo se observa el texto terminado | Se observan tesis, fuentes, versiones y decisiones |
| El uso de IA queda implícito | Los usos permitidos se explican por etapa |
| La revisión ocurre al final | La retroalimentación modifica el trabajo mientras se construye |
| Se intenta inferir quién escribió | El estudiante demuestra y defiende su autoría |

Evaluar el proceso añade una mirada y **el ensayo final se sigue evaluando**: se valora por separado la calidad del argumento y la calidad de las decisiones que permitieron construirlo.

## Elige tu ruta

{{< cards >}}
  {{< card link="#ruta-estudiante" title="Soy estudiante" icon="pen-nib" description="Sigue las siete etapas, conserva las evidencias mínimas y decide qué hacer con cada sugerencia de la IA." >}}
  {{< card link="#ruta-docente" title="Soy docente" icon="chalkboard-user" description="Define la política de uso, distribuye los puntos de control y evalúa proceso y producto con criterios distintos." >}}
  {{< card link="#la-ruta-completa" title="Ver la ruta completa" icon="route" description="Recorre el proceso común: preparar, escribir, interrogar, revisar y defender." >}}
{{< /cards >}}

## La ruta completa

{{< mermaid >}}
flowchart LR
    subgraph M1[PREPARAR]
      A[1. Interpretar] --> B[2. Investigar]
      B --> C[3. Formular tesis]
    end
    subgraph M2[ESCRIBIR]
      D[4. Escribir V1]
    end
    subgraph M3[INTERROGAR]
      E[5. Interrogar]
    end
    subgraph M4[CERRAR]
      F[6. Revisar] --> G[7. Entregar y defender]
    end
    C --> D
    D --> E
    E --> F

    classDef preparar fill:#eef2ff,stroke:#4f46e5,color:#312e81
    classDef escribir fill:#ecfdf5,stroke:#0d9488,color:#134e4a
    classDef interrogar fill:#fff7ed,stroke:#d97706,color:#78350f
    classDef cerrar fill:#f5f3ff,stroke:#7c3aed,color:#4c1d95
    class A,B,C preparar
    class D escribir
    class E interrogar
    class F,G cerrar
{{< /mermaid >}}

La secuencia desarrolla tres literacidades de manera progresiva:

{{< cards >}}
  {{< card link="/formacion-docente/alfabetizacion-operativa/" title="Operativa" icon="keyboard" description="Encuadrar una tarea, dar contexto y formular restricciones útiles." >}}
  {{< card link="/ia-educacion/etica-y-transparencia/alfabetizacion-critica-ia/" title="Crítica" icon="magnifying-glass" description="Verificar fuentes, detectar errores y discutir las respuestas del modelo." >}}
  {{< card link="/formacion-docente/alfabetizacion-co-creacion/" title="Co-creación y autoría" icon="fingerprint" description="Decidir, transformar, documentar y conservar una voz reconocible." >}}
{{< /cards >}}

## Siete etapas para construir el ensayo

{{< timeline >}}

{{< timelineItem icon="bullseye" header="1. Interpretar la consigna" subheader="Preparar · asíncrono" md="true" >}}
🎯 **Para qué.** Entender qué pide la instrucción («evalúe la coherencia…») y acotar un problema propio.

🎓 **Estudiante:** subraya el verbo de la instrucción, delimita el problema y escribe una primera pregunta de trabajo.

🤖 **IA:** formula preguntas aclaratorias y compara posibles enfoques; no elige el tema ni responde la tarea.

👩‍🏫 **Docente:** entrega la rúbrica (con qué revisará, por ejemplo «cada afirmación central tiene fuente comprobada») y aclara qué usos de IA están permitidos.

📎 **Qué se entrega:** nota de enfoque con una elección y al menos un descarte justificado.
{{< /timelineItem >}}

{{< timelineItem icon="book-open" header="2. Investigar y verificar" subheader="Preparar · asíncrono" md="true" >}}
🎯 **Para qué.** Reunir fuentes fiables (un comunicado oficial, dos artículos académicos) y distinguir afirmación de fuente.

🎓 **Estudiante:** localiza fuentes académicas, las lee y relaciona cada afirmación importante con una fuente verificable.

🤖 **IA:** sugiere conceptos, autores o tipos de fuente que conviene buscar; una referencia propuesta por el modelo nunca cuenta como verificada.

👩‍🏫 **Docente:** revisa una muestra de fuentes o la matriz de fuentes antes del borrador.

📎 **Qué se entrega:** matriz breve de afirmaciones, fuentes y comprobación.
{{< /timelineItem >}}

{{< timelineItem icon="route" header="3. Formular tesis y esquema" subheader="Preparar · taller síncrono" md="true" >}}
🎯 **Para qué.** Tomar una postura debatible y poder sostenerla.

🎓 **Estudiante:** escribe una tesis provisional, la contrasta con las fuentes y conserva su evolución.

🤖 **IA:** tensiona una tesis ya escrita: identifica supuestos, ambigüedades y objeciones previsibles. No origina la postura del ensayo.

👩‍🏫 **Docente y pares:** realizan una clínica breve de tesis y comprueban que sea debatible, específica y sustentable.

📎 **Qué se entrega:** tesis v1, v2 y final, con justificación de la elección.
{{< /timelineItem >}}

{{< timelineItem icon="file-pen" header="4. Escribir el primer borrador" subheader="Escribir · asíncrono" md="true" >}}
🎯 **Para qué.** Construir el argumento con voz propia antes de cualquier ayuda.

🎓 **Estudiante:** redacta un borrador completo con su voz, argumentos, fuentes y contraargumentos.

🤖 **IA:** permanece fuera de la redacción sustantiva. Puede aclarar una duda de formato, pero no producir párrafos para pegar.

👩‍🏫 **Docente:** no corrige todavía cada frase; comprueba que exista un punto de partida auténtico.

📎 **Qué se entrega:** borrador v1 fechado y conservado antes de la retroalimentación algorítmica.
{{< /timelineItem >}}

{{< timelineItem icon="comments" header="5. Interrogar el borrador" subheader="Interrogar · síncrono o asíncrono" md="true" >}}
🎯 **Para qué.** Exponer el borrador a la crítica para hallar sus puntos débiles.

🎓 **Estudiante:** solicita un esquema inverso, objeciones fuertes y una lectura provisional con la rúbrica del docente.

🤖 **IA:** diagnostica la estructura y actúa como adversaria argumentativa. Señala problemas; no reescribe el ensayo.

👩‍🏫 **Docente:** modela cómo distinguir una observación útil de una sugerencia genérica o equivocada.

📎 **Qué se entrega:** interacciones significativas seleccionadas, objeciones y respuestas del estudiante.
{{< /timelineItem >}}

{{< timelineItem icon="code-compare" header="6. Revisar y decidir" subheader="Cerrar · asíncrono" md="true" >}}
🎯 **Para qué.** Juzgar cada sugerencia y decidir con fundamento.

🎓 **Estudiante:** acepta, adapta o rechaza cada sugerencia relevante y explica por qué. Después produce la versión final.

🤖 **IA:** propone cambios localizados y explica su razón; no sustituye la decisión del autor.

👩‍🏫 **Docente:** observa la calidad del juicio, no la obediencia a la herramienta ni la cantidad de consultas.

📎 **Qué se entrega:** tabla de decisiones y comparación entre v1 y versión final.
{{< /timelineItem >}}

{{< timelineItem icon="person-chalkboard" header="7. Entregar, declarar y defender" subheader="Cerrar · síncrono breve o memo" md="true" >}}
🎯 **Para qué.** Dar cuenta del proceso y responder por la autoría.

🎓 **Estudiante:** entrega el ensayo y el portafolio mínimo, declara cómo usó IA y explica una decisión importante en una defensa breve o reflexión.

🤖 **IA:** puede ayudar a anticipar preguntas, pero el estudiante responde con sus fuentes y su razonamiento.

👩‍🏫 **Docente:** evalúa por separado el proceso y el ensayo final.

📎 **Qué se entrega:** ensayo, portafolio, declaración de uso y defensa o memo reflexivo.
{{< /timelineItem >}}

{{< /timeline >}}

## Observa cómo cambia un mismo trabajo

Ya conoces las siete etapas. Ahora sigue a una estudiante en tres momentos de un mismo
ensayo. No busques tres textos terminados: compara qué hace ella, qué documentos tiene
sobre la mesa y qué nueva decisión aparece en cada escena.

Antes de abrir la actividad, identifica la secuencia:

1. **Primero hay una postura propia.** La estudiante escribe una tesis provisional y marca
   lo que todavía no sabe.
2. **Después llega el contraste.** Usa la IA para obtener preguntas u objeciones, pero
   comprueba las afirmaciones en fuentes externas.
3. **Al final hay una decisión explicable.** Reescribe el texto, conserva las fuentes
   verificadas y registra por qué aceptó, modificó o descartó una sugerencia.

{{< h5p id="cocreacion-versiones-slider" load="manual" title="Del borrador a una revisión justificada" description="Tres escenas de un mismo ensayo: observa cómo cambian el trabajo de la estudiante, las fuentes y las decisiones." >}}
### La secuencia en texto

| Momento | Qué ocurre | Qué permite comprender |
|---|---|---|
| Borrador propio | La estudiante formula una tesis inicial, reconoce dudas y reúne fuentes por verificar. | Cuál era su punto de partida antes de recibir asistencia. |
| Interrogación y verificación | Usa la IA para buscar objeciones o conexiones y contrasta cada aporte con fuentes pertinentes. | Qué aceptó como hipótesis, qué comprobó y qué descartó. |
| Revisión justificada | Reescribe el ensayo y registra dos o tres decisiones que cambiaron el argumento. | Cómo evolucionó su razonamiento y por qué la versión final es mejor. |

Al avanzar por las imágenes, fíjate en la continuidad: la estudiante y su borrador siguen
presentes. Lo que cambia es la relación entre su primera idea, las preguntas recibidas, las
fuentes consultadas y la versión que finalmente decide sostener.
{{< /h5p >}}

## Un ejemplo de principio a fin

Así se ve el recorrido en un caso concreto. **Sofía**, estudiante de Relaciones Internacionales, recibe la consigna: *«Evalúe la coherencia de la política exterior de México ante una crisis reciente»*.

**Etapas 1–2 · Delimita e investiga.** Las preguntas de la IA le muestran que «toda la política exterior del sexenio» es inabarcable, y acota: la ruptura de relaciones con Ecuador tras el asalto a la embajada de México en Quito (abril de 2024). Localiza el comunicado oficial de la SRE, dos análisis académicos y la Convención de Caracas de 1954, y registra cada afirmación central en su matriz de fuentes.

**Etapa 3 · Su tesis evoluciona.**

- **v1:** «La política exterior de México es coherente con sus principios.» — *vaga: nadie podría estar en desacuerdo.*
- **v2:** «La respuesta de México al asalto de su embajada fue coherente con la doctrina Estrada.» — *más específica, pero «coherente» sigue siendo ambiguo.*
- **Final:** «Al romper relaciones con Ecuador, México subordinó su tradición de no intervención a la defensa del derecho de asilo: sus principios operan como jerarquía, no como lista.» — *debatible, específica y sustentable.*

**Etapa 4 · Escribe sin IA.** Redacta un borrador de unas 1 200 palabras y lo guarda fechado. Ese archivo es la prueba de su punto de partida y de su voz.

**Etapa 5 · Interroga el borrador.** El esquema inverso revela que dos párrafos repiten la misma idea. El red team le devuelve una objeción fuerte: *«La ruptura puede leerse como reacción coyuntural del gobierno en turno, no como decisión doctrinal; tu tesis asume una continuidad que no demuestras.»* Sofía responde con el texto del comunicado —que funda la ruptura en el derecho de asilo, no en el agravio político— y añade un párrafo de contraargumento al ensayo.

**Etapas 6–7 · Decide, entrega y declara.** Su tabla de decisiones registra, entre otras: fusionar los párrafos repetidos (aceptada), añadir un dato a la conclusión (adaptada: el dato entra, el cierre argumentativo se queda) y sustituir «jerarquía de principios» por «pragmatismo» (rechazada: borra la distinción que sostiene su tesis). Su declaración final:

> Utilicé IA generativa en las etapas 1, 3, 5 y 6 para delimitar el tema, tensionar mi tesis, obtener un esquema inverso y objeciones, y recibir sugerencias de estilo. Verifiqué todas las fuentes fuera del sistema. La tesis, las fuentes y la redacción son mías; mi tabla de decisiones documenta qué acepté, adapté y rechacé.

## Ruta del estudiante {#ruta-estudiante}

{{< alert icon="list-check" type="info" >}}
**Antes de empezar, confirma estas reglas con tu docente:**
- Qué herramienta puedes usar y si existe una alternativa equivalente sin IA.
- Qué información no debes introducir en un servicio externo.
- En qué etapas se permite IA y en cuáles debes trabajar sin ella.
- Qué piezas forman parte de la entrega (borrador v1, matriz de fuentes, tabla de decisiones) y cómo se califican.
{{< /alert >}}

Tu portafolio no necesita contener cada clic ni una conversación interminable. Debe permitir reconstruir las decisiones que cambiaron tu trabajo.

| Evidencia mínima | Etapa | Qué demuestra |
|---|:---:|---|
| Nota de enfoque y tesis v1 → final | 1 · 3 | Cómo delimitaste y modificaste tu postura |
| Matriz de fuentes verificadas | 2 | Cómo sostuviste las afirmaciones centrales |
| Borrador v1 | 4 | Tu punto de partida antes de la retroalimentación de IA |
| Interacciones significativas | 5 | Qué diagnóstico u objeción influyó en el proceso |
| Tabla aceptar · adaptar · rechazar | 6 | Tu juicio frente a las sugerencias |
| Ensayo final | 6 | Calidad del argumento, evidencia, estructura y voz |
| Declaración y reflexión | 7 | Transparencia y comprensión del proceso |

### La tabla de decisiones, en la práctica

No necesita más que una fila por sugerencia relevante:

| Sugerencia de la IA | Decisión | Por qué |
|---|---|---|
| «Los párrafos 2 y 4 repiten la misma idea» (esquema inverso) | ✅ Aceptada | La repetición era real; los fusioné |
| «La conclusión necesita datos cuantitativos» | 🔁 Adaptada | Añadí un dato, pero conservé el cierre argumentativo |
| «Sustituir "jerarquía de principios" por "pragmatismo"» | ❌ Rechazada | Borra la distinción que sostiene mi tesis |

{{< alert icon="shield-halved" type="warning" >}}
**Transparencia por defecto.** Declarar un uso permitido de IA no penaliza. Ocultarlo impide verificar la autoría del proceso y puede invalidar la entrega según las reglas comunicadas por el docente.
{{< /alert >}}

## Ruta del docente {#ruta-docente}

### Antes de publicar la actividad

1. Define el aprendizaje que el ensayo debe evidenciar; evita convertir «usar IA» en el objetivo principal.
2. Publica una política por etapas: permitido, condicionado o no permitido.
3. Decide dos o tres puntos de control que realmente puedas retroalimentar.
4. Entrega la rúbrica antes del primer borrador.
5. Ofrece una ruta equivalente sin IA y evita que el acceso a una herramienta determine la calificación.
6. Prohíbe introducir datos personales, sensibles o trabajos de terceros sin autorización.

### Distribución híbrida sugerida

| Momento | Actividad de mayor valor | Modalidad sugerida |
|---|---|---|
| Antes | Interpretar, buscar fuentes y preparar tesis | Asíncrona, con comentarios breves del docente |
| Durante | Clínica de tesis, objeciones y revisión entre pares | Síncrona, presencial o por videollamada |
| Después | Redactar, decidir revisiones y preparar el portafolio | Asíncrona |
| Cierre | Defender una decisión y recibir retroalimentación | Síncrona breve o memo reflexivo |

### Cronograma sugerido (adaptable)

Cuatro semanas como referencia; en cursos intensivos puede comprimirse a dos, y en semestrales cada ciclo de interrogación-revisión puede repetirse.

| Semana | Etapas | Qué ocurre | Punto de control |
|:---:|:---:|---|---|
| 1 | 1–2 | Interpretar la consigna, investigar y verificar fuentes (asíncrono) | ✔ **Control 1:** nota de enfoque + matriz de fuentes (por muestreo) |
| 2 | 3–4 | Clínica de tesis (síncrono) y primer borrador (asíncrono) | ✔ **Control 2:** tesis registrada y borrador v1 fechado |
| 3 | 5–6 | Sesión guiada de interrogación con IA; revisión y decisiones | Revisión entre pares, sin calificación |
| 4 | 7 | Portafolio, declaración y defensa breve | ✔ **Control 3:** entrega final + defensa o memo |

{{< alert icon="scale-balanced" type="info" >}}
**La IA retroalimenta; el docente evalúa.** Una valoración producida por un modelo es una hipótesis que el estudiante puede impugnar, no una calificación automática.
{{< /alert >}}

## Cómo evaluar el proceso y el ensayo final

Esta distribución es un punto de partida adaptable, no una política institucional (por ejemplo, un curso de primer semestre puede subir el peso de la verificación de fuentes):

| Componente | Criterio (por ejemplo, «tesis sostenida») | Peso de ejemplo |
|---|---|---:|
| **Proceso** | Evolución del enfoque y de la tesis | 10% |
| **Proceso** | Búsqueda, lectura y verificación de fuentes | 15% |
| **Proceso** | Calidad de las decisiones de revisión | 20% |
| **Proceso** | Reflexión, transparencia y uso crítico de IA | 15% |
| **Producto** | Claridad y solidez del argumento | 15% |
| **Producto** | Uso de evidencia y respuesta a objeciones | 15% |
| **Producto** | Estructura, voz, estilo y citación | 10% |
| | **Total** | **100%** |

No se califica la cantidad de prompts ni la longitud de la conversación. Una interacción breve que provoca una decisión bien fundamentada vale más que veinte consultas aceptadas sin crítica.

### Cómo se ve cada nivel (criterios de proceso)

| Criterio | N1 · Inicial | N2 · En desarrollo | N3 · Competente | N4 · Avanzado |
|---|---|---|---|---|
| Evolución del enfoque y la tesis | La tesis no cambia o proviene de la IA | Cambia sin justificación | Evoluciona con justificación propia | La evolución responde a fuentes y objeciones documentadas |
| Búsqueda y verificación de fuentes | Fuentes sin verificar o inexistentes | Verificadas pero desconectadas del argumento | Cada afirmación central tiene fuente comprobada | Triangula fuentes y evalúa su calidad |
| Calidad de las decisiones de revisión | Acepta todo sin cuestionar | Acepta o rechaza sin explicar | Justifica cada decisión relevante | Detecta sugerencias equivocadas y decide con criterio disciplinar (por ejemplo, rechaza una cita que no existe) |
| Reflexión, transparencia y uso crítico | No declara, o la reflexión es genérica | Declaración incompleta | Declaración específica y reflexión honesta | Nombra decisiones tomadas en contra de la IA y lo aprendido |

## Prompts listos para usar

Todos parten de trabajo previo del estudiante y contienen una restricción explícita contra la sustitución de autoría. Cada uno indica la **etapa** en la que se usa. ¿Notas que no hay prompt para la **etapa 4**? Es deliberado: el primer borrador se escribe sin IA, porque es la prueba del punto de partida y de la voz propia.

<details>
<summary><strong>Etapa 1 · Delimitar sin recibir la respuesta</strong></summary>

> Actúa como tutor socrático. La consigna es: «[consigna]». Mi interpretación inicial es: «[interpretación propia]». No respondas la tarea ni redactes una tesis. Hazme cinco preguntas que me ayuden a precisar alcance, conceptos y tensiones. Al final, señala qué decisión todavía debo tomar yo.

</details>

<details>
<summary><strong>Etapa 2 · Preparar una búsqueda verificable</strong></summary>

> Mi tema provisional es «[tema]» y estas son las afirmaciones que creo necesitar demostrar: [lista]. No inventes referencias. Para cada afirmación, indícame qué tipo de fuente académica debería buscar, qué palabras clave usar y qué señal me permitiría evaluar su pertinencia. Yo localizaré y verificaré las fuentes.

</details>

<details>
<summary><strong>Etapa 3 · Tensionar una tesis propia</strong></summary>

> Esta es mi tesis provisional: «[tesis]». No escribas otra por mí. Identifica un término ambiguo, un supuesto no demostrado y dos objeciones fuertes. Después hazme preguntas para que yo produzca una segunda versión más específica y defendible.

</details>

<details>
<summary><strong>Etapa 5 · Reconstruir el esquema real</strong></summary>

> Te comparto mi borrador. No lo reescribas. Resume la función de cada párrafo en una línea: contexto, tesis, razón, dato o fuente que la sostiene, objeción, respuesta o cierre. Señala repeticiones, saltos lógicos y párrafos que no contribuyen a la tesis. Cita fragmentos concretos para justificar el diagnóstico.

</details>

<details>
<summary><strong>Etapa 5 · Hacer un red team argumentativo</strong></summary>

> Actúa como especialista escéptico. Mi tesis es «[tesis]» y mis fuentes principales sostienen [síntesis]. Formula las tres objeciones más fuertes que podrían debilitar mi argumento. No redactes respuestas. Indica qué tipo de fuente o dato necesitaría yo para responder a cada objeción.

</details>

<details>
<summary><strong>Etapa 5 · Usar una rúbrica sin delegar la calificación</strong></summary>

> Aplica únicamente esta rúbrica a mi borrador: [rúbrica]. Para cada criterio de la rúbrica (por ejemplo, «solidez del argumento»), propone un nivel provisional, justifícalo con una cita exacta del texto y formula una pregunta de revisión. No asignes una nota final ni reescribas el contenido. Yo contrastaré e impugnaré tu valoración.

</details>

<details>
<summary><strong>Etapa 6 · Pedir cambios localizados y justificados</strong></summary>

> Te comparto dos párrafos de mi versión revisada: «[párrafos]». Propón como máximo tres cambios localizados de claridad o estilo. Explica qué mejora cada uno y qué matiz podría perderse si lo aplico. No reescribas el texto completo ni cambies el argumento: yo decidiré cuáles acepto, adapto o rechazo.

</details>

<details>
<summary><strong>Etapa 7 · Preparar la declaración de uso</strong></summary>

> Organiza esta lista de interacciones [lista] según lo que buscaba en cada una: delimitación, búsqueda, diagnóstico, objeciones o edición. No inventes usos ni decisiones. Devuélveme una plantilla factual para que yo complete qué acepté, adapté o rechacé y redacte mi declaración final.

</details>

## Riesgos y salvaguardas

{{< cards >}}
  {{< card link="/ia-educacion/etica-y-transparencia/plagio-autenticidad-era-ia/" title="Sustitución de autoría" icon="user-lock" description="Se previene con un borrador previo, decisiones visibles y defensa del razonamiento." >}}
  {{< card link="/ia-educacion/etica-y-transparencia/alfabetizacion-critica-ia/" title="Fuentes inexistentes" icon="link-slash" description="Toda referencia se localiza y comprueba fuera de la respuesta del modelo." >}}
  {{< card link="/ia-educacion/etica-y-transparencia/sesgos-algoritmicos-equidad/" title="Deriva del criterio" icon="compass" description="La tesis nace del estudiante y cada sugerencia puede aceptarse, adaptarse o rechazarse." >}}
  {{< card link="/ia-educacion/etica-y-transparencia/transparencia-algoritmica-aula/" title="Pérdida de voz" icon="fingerprint" description="La comparación entre versiones permite detectar una edición que uniforma el estilo." >}}
{{< /cards >}}

## Preguntas frecuentes del docente

<details>
<summary><strong>¿Cuánto trabajo extra implica con un grupo grande?</strong></summary>

Menos del que parece: solo hay dos o tres puntos de control, el portafolio es mínimo por diseño y puede revisarse por muestreo, y la interrogación del borrador se apoya en pares. El tiempo se desplaza: menos horas persiguiendo plagio al final, más retroalimentación mientras el trabajo aún puede mejorar.

</details>

<details>
<summary><strong>¿Y si un estudiante no quiere o no puede usar IA?</strong></summary>

La ruta equivalente produce las mismas piezas (nota de enfoque, borrador v1, tabla de decisiones): las preguntas de delimitación y las objeciones las aportan pares, tutores o el propio docente, y el esquema inverso puede hacerse a mano. Nada del proceso depende de una herramienta concreta, y el acceso a una de pago nunca determina la calificación.

</details>

<details>
<summary><strong>¿Cómo sé que el borrador v1 es realmente del estudiante?</strong></summary>

No se persigue con vigilancia; se hace probable por diseño: el v1 se entrega fechado antes de la fase de IA, la defensa final exige explicar decisiones propias, y la comparación entre v1 y versión final revela una voz consistente o un salto inexplicable.

</details>

<details>
<summary><strong>¿Esto sustituye al detector de plagio o de IA?</strong></summary>

Lo vuelve casi innecesario. Los detectores de texto generado son poco fiables y castigan de manera desproporcionada a hablantes no nativos (ver [plagio y autenticidad en la era de la IA]({{< ref "/ia-educacion/etica-y-transparencia/plagio-autenticidad-era-ia" >}})). Este diseño genera pruebas positivas de autoría (versiones, decisiones, defensa) en lugar de sospecha estadística.

</details>

<details>
<summary><strong>¿Qué hago si aun así detecto delegación?</strong></summary>

La conversación parte del portafolio: sin versiones tempranas ni decisiones documentadas, la entrega no se evalúa —regla anunciada desde el día uno—. La respuesta es pedagógica antes que punitiva: rehacer el tramo faltante del proceso, no solo sancionar el texto.

</details>

## Modelo de declaración

> Utilicé un sistema de IA generativa en las etapas de [etapas] para [delimitar el tema, obtener objeciones, recibir sugerencias de estilo]. Verifiqué las fuentes y los datos fuera del sistema. Conservé, adapté o rechacé sus sugerencias según se documenta en mi tabla de decisiones. La tesis, la selección de fuentes, la redacción sustantiva y las conclusiones son responsabilidad propia.

## Glosario breve

- **Esquema inverso** — reconstruir el índice real de un texto ya escrito, una línea por párrafo, para ver su estructura efectiva y no la que se planeó.
- **Red team** — pedir deliberadamente las objeciones más fuertes contra la propia tesis, para reforzarla o corregirla antes de la entrega.
- **Clínica de tesis** — sesión breve, con pares o docente, donde una tesis se examina con tres preguntas: ¿es debatible?, ¿es específica?, ¿puede sustentarse con las fuentes disponibles?
- **Matriz de fuentes** — tabla que conecta cada afirmación central del ensayo con la fuente verificada que la sostiene.
- **Memo reflexivo** — texto breve donde el estudiante explica una decisión importante de su proceso y qué aprendió al tomarla.
- **Dirección epistémica** — quién decide qué cuenta como válido y hacia dónde avanza el trabajo. En esta actividad, siempre la persona.

## Para profundizar

- [Evaluación formativa con IA: ciclos de retroalimentación iterativa]({{< ref "/ia-educacion/guias/evaluacion-formativa-ia" >}}).
- [Aprendizaje activo con IA]({{< ref "/ia-educacion/guias/aprendizaje-activo-con-ia" >}}).
- Actividad propuesta: [debate socrático con IA como interlocutor]({{< ref "/laboratorio/practicas/debate-socratico-con-ia" >}}).
- [Transparencia algorítmica en el aula]({{< ref "/ia-educacion/etica-y-transparencia/transparencia-algoritmica-aula" >}}).

{{< referencias >}}

- Bearman, M., Fawns, T., & Dawson, P. (2025). Authentic assessment: from panacea to criticality. *Assessment & Evaluation in Higher Education*, *50*(3), 396–408. <https://doi.org/10.1080/02602938.2024.2404634>
- Black, P., & Wiliam, D. (1998). Assessment and classroom learning. *Assessment in Education*, *5*(1), 7–74. <https://doi.org/10.1080/0969595980050102>
- Chi, M. T. H., & Wylie, R. (2014). The ICAP framework: linking cognitive engagement to active learning outcomes. *Educational Psychologist*, *49*(4), 219–243. <https://doi.org/10.1080/00461520.2014.965823>
- Eaton, S. E. (2023). Postplagiarism: transdisciplinary ethics and integrity in the age of artificial intelligence. *International Journal for Educational Integrity*, *19*(1), 23. <https://doi.org/10.1007/s40979-023-00144-1>
- Freeman, S., et al. (2014). Active learning increases student performance in science, engineering, and mathematics. *PNAS*, *111*(23), 8410–8415. <https://doi.org/10.1073/pnas.1319030111>
- Hattie, J., & Timperley, H. (2007). The power of feedback. *Review of Educational Research*, *77*(1), 81–112. <https://doi.org/10.3102/003465430298487>
- Nicol, D. J., & Macfarlane-Dick, D. (2006). Formative assessment and self-regulated learning. *Studies in Higher Education*, *31*(2), 199–218. <https://doi.org/10.1080/03075070600572090>
- UNESCO — Holmes, W., & Miao, F. (2023). *Guidance for generative AI in education and research*. <https://unesdoc.unesco.org/ark:/48223/pf0000386693>

{{< /referencias >}}
