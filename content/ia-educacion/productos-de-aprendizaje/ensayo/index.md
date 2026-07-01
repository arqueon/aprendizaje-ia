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
---

{{< lead >}}
Un ensayo no es solo el archivo que se entrega. Es una secuencia de decisiones: delimitar un problema, verificar fuentes, sostener una tesis, enfrentar objeciones y revisar con criterio. Esta guía hace visible ese recorrido para que la IA funcione como interlocutora, no como autora sustituta.
{{< /lead >}}

{{< alert icon="compass" type="info" >}}
**Idea central:** la persona conserva la dirección epistémica. La IA puede preguntar, diagnosticar, objetar y sugerir; el estudiante investiga, escribe, verifica y decide.
{{< /alert >}}

## El cambio en una mirada

| Modelo centrado en el producto | Modelo centrado en proceso y producto |
|---|---|
| Una consigna y una fecha final | Siete etapas con puntos de control |
| Solo se observa el texto terminado | Se observan tesis, fuentes, versiones y decisiones |
| El uso de IA queda implícito | Los usos permitidos se explican por etapa |
| La revisión ocurre al final | La retroalimentación modifica el trabajo mientras se construye |
| Se intenta inferir quién escribió | El estudiante demuestra y defiende su autoría |

Evaluar el proceso **no significa dejar de evaluar el ensayo final**. Significa valorar por separado la calidad del argumento y la calidad de las decisiones que permitieron construirlo.

## Elige tu ruta

{{< cards >}}
  {{< card link="#ruta-estudiante" title="Soy estudiante" icon="pen-nib" color="#4f46e5" description="Sigue las siete etapas, conserva las evidencias mínimas y decide qué hacer con cada sugerencia de la IA." >}}
  {{< card link="#ruta-docente" title="Soy docente" icon="chalkboard-user" color="#0d9488" description="Define la política de uso, distribuye los puntos de control y evalúa proceso y producto con criterios distintos." >}}
  {{< card link="#la-ruta-completa" title="Ver la ruta completa" icon="route" color="#7c3aed" description="Recorre el proceso común: preparar, escribir, interrogar, revisar y defender." >}}
{{< /cards >}}

## La ruta completa

{{< mermaid >}}
flowchart LR
    A[1. Interpretar] --> B[2. Investigar]
    B --> C[3. Formular tesis]
    C --> D[4. Escribir V1]
    D --> E[5. Interrogar]
    E --> F[6. Revisar]
    F --> G[7. Entregar y defender]

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
  {{< card link="/formacion-docente/alfabetizacion-operativa/" title="Operativa" icon="keyboard" color="#4f46e5" description="Encuadrar una tarea, dar contexto y formular restricciones útiles." >}}
  {{< card link="/ia-educacion/etica-y-transparencia/alfabetizacion-critica-ia/" title="Crítica" icon="magnifying-glass" color="#d97706" description="Verificar fuentes, detectar errores y discutir las respuestas del modelo." >}}
  {{< card link="/formacion-docente/alfabetizacion-co-creacion/" title="Co-creación y autoría" icon="fingerprint" color="#7c3aed" description="Decidir, transformar, documentar y conservar una voz reconocible." >}}
{{< /cards >}}

## Siete etapas para construir el ensayo

{{< timeline >}}

{{< timelineItem icon="bullseye" header="1. Interpretar la consigna" subheader="Preparar · antes · trabajo asíncrono" md="true" >}}
**Estudiante:** subraya el verbo de la consigna, delimita el problema y escribe una primera pregunta de trabajo.

**IA:** formula preguntas aclaratorias y compara posibles enfoques; no elige el tema ni responde la consigna.

**Docente:** entrega criterios y aclara qué usos de IA están permitidos.

**Evidencia:** nota de enfoque con una elección y al menos un descarte justificado.
{{< /timelineItem >}}

{{< timelineItem icon="book-open" header="2. Investigar y verificar" subheader="Preparar · antes · trabajo asíncrono" md="true" >}}
**Estudiante:** localiza fuentes académicas, las lee y relaciona cada afirmación importante con evidencia verificable.

**IA:** sugiere conceptos, autores o tipos de fuente que conviene buscar; una referencia propuesta por el modelo nunca cuenta como verificada.

**Docente:** revisa una muestra de fuentes o la tabla de evidencia antes del borrador.

**Evidencia:** matriz breve de afirmaciones, fuentes y comprobación.
{{< /timelineItem >}}

{{< timelineItem icon="route" header="3. Formular tesis y esquema" subheader="Preparar · durante · taller síncrono sugerido" md="true" >}}
**Estudiante:** escribe una tesis provisional, la contrasta con las fuentes y conserva su evolución.

**IA:** tensiona una tesis ya escrita: identifica supuestos, ambigüedades y objeciones previsibles. No origina la postura del ensayo.

**Docente y pares:** realizan una clínica breve de tesis y comprueban que sea debatible, específica y sustentable.

**Evidencia:** tesis v1, v2 y final, con justificación de la elección.
{{< /timelineItem >}}

{{< timelineItem icon="file-pen" header="4. Escribir el primer borrador" subheader="Escribir · después · trabajo asíncrono" md="true" >}}
**Estudiante:** redacta un borrador completo con su voz, argumentos, evidencia y contraargumentos.

**IA:** permanece fuera de la redacción sustantiva. Puede aclarar una duda de formato, pero no producir párrafos para pegar.

**Docente:** no corrige todavía cada frase; comprueba que exista un punto de partida auténtico.

**Evidencia:** borrador v1 fechado y conservado antes de la retroalimentación algorítmica.
{{< /timelineItem >}}

{{< timelineItem icon="comments" header="5. Interrogar el borrador" subheader="Interrogar · durante · sesión guiada o asíncrona" md="true" >}}
**Estudiante:** solicita un esquema inverso, objeciones fuertes y una lectura provisional con la rúbrica del docente.

**IA:** diagnostica la estructura y actúa como adversaria argumentativa. Señala problemas; no reescribe el ensayo.

**Docente:** modela cómo distinguir una observación útil de una sugerencia genérica o equivocada.

**Evidencia:** interacciones significativas seleccionadas, objeciones y respuestas del estudiante.
{{< /timelineItem >}}

{{< timelineItem icon="code-compare" header="6. Revisar y decidir" subheader="Cerrar · después · trabajo asíncrono" md="true" >}}
**Estudiante:** acepta, adapta o rechaza cada sugerencia relevante y explica por qué. Después produce la versión final.

**IA:** propone cambios localizados y explica su razón; no sustituye la decisión del autor.

**Docente:** observa la calidad del juicio, no la obediencia a la herramienta ni la cantidad de consultas.

**Evidencia:** tabla de decisiones y comparación entre v1 y versión final.
{{< /timelineItem >}}

{{< timelineItem icon="person-chalkboard" header="7. Entregar, declarar y defender" subheader="Cerrar · punto de control final" md="true" >}}
**Estudiante:** entrega el ensayo y el portafolio mínimo, declara cómo usó IA y explica una decisión importante en una defensa breve o reflexión.

**IA:** puede ayudar a anticipar preguntas, pero el estudiante responde con sus fuentes y su razonamiento.

**Docente:** evalúa por separado el proceso y el producto final.

**Evidencia:** ensayo, portafolio, declaración de uso y defensa o memo reflexivo.
{{< /timelineItem >}}

{{< /timeline >}}

## Ruta del estudiante {#ruta-estudiante}

Antes de empezar, confirma estas reglas con tu docente:

- Qué herramienta puedes usar y si existe una alternativa equivalente sin IA.
- Qué información no debes introducir en un servicio externo.
- En qué etapas se permite IA y en cuáles debes trabajar sin ella.
- Qué evidencias forman parte de la entrega y cómo se califican.

Tu portafolio no necesita contener cada clic ni una conversación interminable. Debe permitir reconstruir las decisiones que cambiaron tu trabajo.

| Evidencia mínima | Qué demuestra |
|---|---|
| Nota de enfoque y tesis v1 → final | Cómo delimitaste y modificaste tu postura |
| Matriz de fuentes verificadas | Cómo sostuviste las afirmaciones centrales |
| Borrador v1 | Tu punto de partida antes de la retroalimentación de IA |
| Interacciones significativas | Qué diagnóstico u objeción influyó en el proceso |
| Tabla aceptar · adaptar · rechazar | Tu juicio frente a las sugerencias |
| Ensayo final | Calidad del argumento, evidencia, estructura y voz |
| Declaración y reflexión | Transparencia y comprensión del proceso |

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

{{< alert icon="scale-balanced" type="info" >}}
**La IA retroalimenta; el docente evalúa.** Una valoración producida por un modelo es una hipótesis que el estudiante puede impugnar, no una calificación automática.
{{< /alert >}}

## Cómo evaluar proceso y producto

Esta distribución es un punto de partida adaptable, no una política institucional.

| Componente | Criterio | Peso de ejemplo |
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

## Prompts listos para usar

Todos parten de trabajo previo del estudiante y contienen una restricción explícita contra la sustitución de autoría.

<details>
<summary><strong>1. Delimitar sin recibir la respuesta</strong></summary>

> Actúa como tutor socrático. La consigna es: «[consigna]». Mi interpretación inicial es: «[interpretación propia]». No respondas la consigna ni redactes una tesis. Hazme cinco preguntas que me ayuden a precisar alcance, conceptos y tensiones. Al final, señala qué decisión todavía debo tomar yo.

</details>

<details>
<summary><strong>2. Preparar una búsqueda verificable</strong></summary>

> Mi tema provisional es «[tema]» y estas son las afirmaciones que creo necesitar demostrar: [lista]. No inventes referencias. Para cada afirmación, indícame qué tipo de fuente académica debería buscar, qué palabras clave usar y qué señal me permitiría evaluar su pertinencia. Yo localizaré y verificaré las fuentes.

</details>

<details>
<summary><strong>3. Tensionar una tesis propia</strong></summary>

> Esta es mi tesis provisional: «[tesis]». No escribas otra por mí. Identifica un término ambiguo, un supuesto no demostrado y dos objeciones fuertes. Después hazme preguntas para que yo produzca una segunda versión más específica y defendible.

</details>

<details>
<summary><strong>4. Reconstruir el esquema real</strong></summary>

> Te comparto mi borrador. No lo reescribas. Resume la función de cada párrafo en una línea: contexto, tesis, razón, evidencia, objeción, respuesta o cierre. Señala repeticiones, saltos lógicos y párrafos que no contribuyen a la tesis. Cita fragmentos concretos para justificar el diagnóstico.

</details>

<details>
<summary><strong>5. Hacer un red team argumentativo</strong></summary>

> Actúa como especialista escéptico. Mi tesis es «[tesis]» y mis fuentes principales sostienen [síntesis]. Formula las tres objeciones más fuertes que podrían debilitar mi argumento. No redactes respuestas. Indica qué tipo de evidencia necesitaría yo para responder a cada objeción.

</details>

<details>
<summary><strong>6. Usar una rúbrica sin delegar la calificación</strong></summary>

> Aplica únicamente esta rúbrica a mi borrador: [rúbrica]. Para cada criterio, propone un nivel provisional, justifícalo con una cita exacta del texto y formula una pregunta de revisión. No asignes una nota final ni reescribas el contenido. Yo contrastaré e impugnaré tu valoración.

</details>

<details>
<summary><strong>7. Preparar la declaración de uso</strong></summary>

> Organiza esta lista de interacciones [lista] por propósito: delimitación, búsqueda, diagnóstico, objeciones o edición. No inventes usos ni decisiones. Devuélveme una plantilla factual para que yo complete qué acepté, adapté o rechacé y redacte mi declaración final.

</details>

## Riesgos y salvaguardas

{{< cards >}}
  {{< card link="/ia-educacion/etica-y-transparencia/plagio-autenticidad-era-ia/" title="Sustitución de autoría" icon="user-lock" color="#dc2626" description="Se previene con un borrador previo, decisiones visibles y defensa del razonamiento." >}}
  {{< card link="/ia-educacion/etica-y-transparencia/alfabetizacion-critica-ia/" title="Fuentes inexistentes" icon="link-slash" color="#d97706" description="Toda referencia se localiza y comprueba fuera de la respuesta del modelo." >}}
  {{< card link="/ia-educacion/etica-y-transparencia/sesgos-algoritmicos-equidad/" title="Deriva del criterio" icon="compass" color="#7c3aed" description="La tesis nace del estudiante y cada sugerencia puede aceptarse, adaptarse o rechazarse." >}}
  {{< card link="/ia-educacion/etica-y-transparencia/transparencia-algoritmica-aula/" title="Pérdida de voz" icon="fingerprint" color="#0d9488" description="La comparación entre versiones permite detectar una edición que uniforma el estilo." >}}
{{< /cards >}}

## Modelo de declaración

> Utilicé un sistema de IA generativa en las etapas de [etapas] con los propósitos de [propósitos]. Verifiqué las fuentes y los datos fuera del sistema. Conservé, adapté o rechacé sus sugerencias según se documenta en mi tabla de decisiones. La tesis, la selección de evidencia, la redacción sustantiva y las conclusiones son responsabilidad propia.

## Para profundizar

- [Evaluación formativa con IA: ciclos de retroalimentación iterativa]({{< ref "/ia-educacion/guias/evaluacion-formativa-ia" >}}).
- [Aprendizaje activo con IA]({{< ref "/ia-educacion/guias/aprendizaje-activo-con-ia" >}}).
- [Debate socrático con IA como interlocutor]({{< ref "/laboratorio/practicas/debate-socratico-con-ia" >}}).
- [Transparencia algorítmica en el aula]({{< ref "/ia-educacion/etica-y-transparencia/transparencia-algoritmica-aula" >}}).

## Referencias

- Black, P., & Wiliam, D. (1998). Assessment and classroom learning. *Assessment in Education: Principles, Policy & Practice*, *5*(1), 7–74. <https://doi.org/10.1080/0969595980050102>
- Nicol, D. J., & Macfarlane-Dick, D. (2006). Formative assessment and self-regulated learning. *Studies in Higher Education*, *31*(2), 199–218. <https://doi.org/10.1080/03075070600572090>
- UNESCO. (2023). *Guidance for generative AI in education and research*. <https://doi.org/10.54675/EWZM9535>
