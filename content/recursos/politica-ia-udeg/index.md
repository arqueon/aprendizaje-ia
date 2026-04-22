---
title: "Principios para una política de IA en la Universidad de Guadalajara"
date: 2026-04-22
draft: false
description: "Siete ejes mínimos para una política institucional de IA en la UdeG, concebida como marco revisable y no como reglamento estático, con un ciclo de actualización y un modelo de gobernanza distribuida."
summary: "Siete principios operativos, un modelo de gobernanza y un ciclo de revisión para orientar una política de IA universitaria que no envejezca al publicarse."
tags: ["politica-ia", "udeg", "gobernanza", "regulacion-educativa", "marco-institucional"]
categories: ["recurso-institucional"]
areas: ["ia", "formacion", "pedagogia"]

showHero: true
heroStyle: "background"
layoutBackgroundBlur: true
showTableOfContents: true
showReadingTime: true
showBreadcrumbs: true
showSummary: true
showTaxonomies: true
showRelatedContent: true
weight: 1
---

{{< lead >}}
Las universidades mexicanas enfrentan la urgencia de fijar políticas sobre IA generativa, pero los reglamentos detallados envejecen en semanas. Este documento propone siete principios operativos — en lugar de un reglamento exhaustivo — junto con un modelo de gobernanza distribuida y un ciclo formal de revisión.
{{< /lead >}}

## De qué tipo de política hablamos

Una política institucional sobre IA puede tomar dos formas. La primera es un reglamento cerrado que enumera usos permitidos, prohibidos y sanciones asociadas. La segunda es un marco de principios revisables que orienta decisiones colegiadas en cada ámbito de la universidad. La evidencia internacional acumulada en los últimos tres años favorece la segunda (UNESCO, 2023; Russell Group, 2023; OECD, 2023).

El motivo es operativo, no ideológico. Los reglamentos cerrados asumen una tecnología estable, y la IA generativa no lo es: los modelos se actualizan cada pocos meses, los precios cambian, los proveedores modifican términos de servicio y aparecen competidores que desplazan el mercado. Un reglamento que enumera "herramientas permitidas" necesita reescribirse cada semestre. Un marco de principios soporta la volatilidad porque define los criterios con que cada unidad académica toma decisiones en su contexto.

El [marco ético para el uso de IA en educación superior]({{< ref "/ia-educacion/etica-y-transparencia/marco-etico-ia-educacion-superior" >}}) desarrolla esta lógica en profundidad. Esta guía la traduce a ejes concretos para una institución específica: la Universidad de Guadalajara, la segunda universidad pública más grande de México con más de 330 mil estudiantes distribuidos en catorce centros universitarios y el Sistema de Educación Media Superior.

## Siete principios mínimos

Los principios no son independientes. Se cruzan, se tensionan y se priorizan distinto según el ámbito. Su función es fijar un lenguaje común para que las discusiones colegiadas no empiecen cada vez desde cero.

### 1. Transparencia por defecto

Todo uso de IA en trabajo académico — estudiantil o docente — se declara. La declaración incluye modelo, versión y extensión del uso. La ausencia de declaración, no el uso mismo, es el problema a tratar (Eaton, 2023).

Este principio implica que el docente también declara cuándo usa IA en materiales, retroalimentación o rúbricas. La transparencia es bidireccional; si solo se exige a los estudiantes, el principio pierde fuerza moral.

### 2. Formación previa a regulación

No se puede exigir uso responsable de lo que no se ha enseñado a usar. Cualquier política institucional debe estar acompañada de un programa de formación docente con contenidos mínimos: competencias de prompting, criterios de evaluación crítica de respuestas, detección de sesgos y diseño de actividades con IA. La sección de [formación docente]({{< ref "/formacion-docente" >}}) del sitio ofrece la base.

Publicar una política sin plan de formación es trasladar a los docentes el costo de descifrarla.

### 3. Evaluación del proceso, no solo del producto

La política institucional respalda diseños de evaluación que valoran el proceso de aprendizaje documentado: bitácoras de prompts, versiones sucesivas, reflexiones metacognitivas (Bearman et al., 2024). Los procedimientos de integridad académica reconocen estas evidencias como legítimas y, cuando es posible, privilegian la evaluación dialogada sobre el juicio basado en detectores automáticos, cuyos sesgos y tasas de error están documentados (Weber-Wulff et al., 2023).

### 4. Equidad de acceso

La universidad provee acceso institucional a los modelos que las actividades formativas requieren, o diseña esas actividades para funcionar con herramientas gratuitas de desempeño comparable. No es admisible que una asignatura obligue a una suscripción de pago que no todos los estudiantes pueden costear (World Bank, 2024).

Este principio exige inversión institucional. Sin ella, la política produce desigualdades en lugar de corregirlas.

### 5. Privacidad y protección de datos

Los datos estudiantiles — ensayos, exámenes, identificadores — no se suben a servicios de IA generativa sin base legal clara y consentimiento informado. Las herramientas adoptadas institucionalmente deben cumplir la normativa aplicable sobre protección de datos personales en México y ofrecer términos de servicio auditables.

Este principio limita qué modelos pueden usarse para qué operaciones. Calificar ensayos en un servicio de consumo sin garantías contractuales es incompatible con el principio, por conveniente que sea.

### 6. Responsabilidad distribuida

La responsabilidad por un uso inadecuado de IA se distribuye entre el estudiante (por la autenticidad de su trabajo), el docente (por el diseño instruccional), el programa (por la formación previa y los criterios de integridad) y la institución (por la gobernanza general). Ningún nivel puede trasladar su parte a otro (OECD, 2023).

Este principio importa especialmente en procedimientos disciplinarios: un estudiante que no fue formado en criterios de integridad no responde por la misma magnitud que uno que fue formado y eligió ignorar los acuerdos.

### 7. Revisión periódica

La política se revisa formalmente cada doce meses con un procedimiento definido. La revisión no es una actualización administrativa menor; es un ejercicio colegiado que integra nueva evidencia, casos ocurridos, cambios tecnológicos relevantes y ajustes a los instrumentos operativos.

Sin ciclo de revisión, los principios se vuelven letra muerta cuando la realidad se mueve.

## Gobernanza: quién decide qué

Los siete principios requieren un modelo de gobernanza explícito para operar. El modelo propuesto distribuye decisiones en tres niveles.

{{< mermaid >}}
flowchart TB
    A[Nivel institucional] -->|Principios y<br/>ciclo de revisión| B[Nivel de programa]
    B -->|Criterios disciplinares<br/>y formación| C[Nivel de asignatura]
    C -->|Acuerdos de aula<br/>y syllabus| D[Práctica docente]
    D -.->|Casos y evidencia<br/>para la revisión anual| A
{{< /mermaid >}}

### Nivel institucional

Responde por los principios generales, el ciclo de revisión, el licenciamiento de herramientas y los lineamientos sobre privacidad de datos. Aquí se definen también los procedimientos marco para procedimientos de integridad académica cuando involucran IA.

### Nivel de programa o centro universitario

Traduce los principios generales a criterios disciplinares. Un programa de medicina tiene exigencias distintas a un programa de letras; el nivel de programa hace esa traducción. También coordina el plan de formación docente específico de su ámbito.

### Nivel de asignatura

Operacionaliza en el syllabus: qué usos de IA se permiten, qué se exige declarar, qué se excluye, cómo se evaluará el proceso. El docente es el decisor, dentro de los criterios del programa. La [guía de evaluación formativa con IA]({{< ref "/ia-educacion/guias/evaluacion-formativa-ia" >}}) ofrece plantillas para el syllabus.

Este modelo distribuye la carga decisional según la granularidad de la decisión. Las decisiones que afectan a toda la universidad se toman arriba; las que dependen del contexto disciplinar, en el medio; las que dependen del diseño del curso, abajo.

## Del principio a la norma operativa

Un principio se convierte en norma operativa cuando se responde a cuatro preguntas en cada instrumento institucional (syllabus, procedimiento de integridad, plan de formación):

| Principio | Pregunta operativa |
| --- | --- |
| Transparencia | ¿Qué se declara y cómo se documenta? |
| Formación previa | ¿Qué se enseña antes de exigir? |
| Proceso sobre producto | ¿Qué evidencia del proceso se pide y cómo se pondera? |
| Equidad | ¿Qué se provee institucionalmente y qué se adapta? |
| Privacidad | ¿Qué datos pueden subirse y a qué servicios? |
| Responsabilidad | ¿Qué responde cada nivel en caso de conflicto? |
| Revisión | ¿Cuándo y con qué evidencia se actualiza? |

La política institucional incluye esta tabla como anexo metodológico. Cada unidad académica que la adopta debe poder responder las siete preguntas para su contexto.

## Ciclo de revisión

La revisión anual tiene cuatro insumos canónicos.

Primero, los **casos ocurridos** en el año: procedimientos de integridad, dilemas reportados por docentes, consultas colegiadas. No para juzgarlos retroactivamente sino para detectar patrones que la política actual no resuelve bien.

Segundo, la **evidencia internacional nueva**: actualizaciones de UNESCO, OECD, literatura académica, políticas de universidades referentes. Selwyn (2022) advierte que adoptar cualquier tendencia sin filtro lleva a políticas contradictorias; la revisión anual hace ese filtro explícito.

Tercero, los **cambios tecnológicos** relevantes del año: nuevos modelos, nuevos precios, nuevos términos de servicio, nuevas amenazas (deepfakes académicos, generación de código malicioso, agentes autónomos).

Cuarto, los **ajustes al plan de formación** docente. Si la política exige competencias que el plan no desarrolla, hay que corregir uno u otro.

El producto de la revisión es un documento con versión (`Política de IA UdeG v1.1`, `v1.2`, etc.) que registra qué cambió, por qué y cuándo. La trazabilidad del cambio institucional es parte de la política misma.

## Lo que esta política no es

Tres aclaraciones útiles para evitar expectativas equívocas.

No es un **listado de herramientas autorizadas**. La política fija criterios; el catálogo concreto se mantiene en el [catálogo de herramientas IA]({{< ref "/recursos/catalogo-herramientas-ia" >}}) y se actualiza con mayor frecuencia que la política.

No es una **declaración de oposición ni de entusiasmo** respecto a la IA en educación. Es un marco que permite adoptarla con criterio, rechazar usos específicos cuando hay razones pedagógicas o éticas, y revisar las decisiones cuando cambia el contexto.

No es un **documento terminado**. La versión 1.0 es, por definición, provisional. El ciclo de revisión es parte constitutiva de la política, no un añadido administrativo.

## Referencias

- Bearman, M., Tai, J., Dawson, P., Boud, D., & Ajjawi, R. (2024). Developing evaluative judgement for a time of generative artificial intelligence. *Assessment & Evaluation in Higher Education*, 49(6), 893–905. https://doi.org/10.1080/02602938.2024.2335321
- Eaton, S. E. (2023). Postplagiarism: Transdisciplinary ethics and integrity in the age of artificial intelligence and neurotechnology. *International Journal for Educational Integrity*, 19, 23. https://doi.org/10.1007/s40979-023-00144-1
- OECD. (2023). *OECD digital education outlook 2023: Towards an effective digital education ecosystem*. OECD Publishing. https://doi.org/10.1787/c74f03de-en
- Russell Group. (2023). *Russell Group principles on the use of generative AI tools in education*. https://russellgroup.ac.uk/media/6137/rg_ai_principles-final.pdf
- Selwyn, N. (2022). The future of AI and education: Some cautionary notes. *European Journal of Education*, 57(4), 620–631. https://doi.org/10.1111/ejed.12532
- UNESCO. (2023). *Guidance for generative AI in education and research*. United Nations Educational, Scientific and Cultural Organization. https://doi.org/10.54675/EWZM9535
- Weber-Wulff, D., Anohina-Naumeca, A., Bjelobaba, S., Foltýnek, T., Guerrero-Dib, J., Popoola, O., Šigut, P., & Waddington, L. (2023). Testing of detection tools for AI-generated text. *International Journal for Educational Integrity*, 19, 26. https://doi.org/10.1007/s40979-023-00146-z
- World Bank. (2024). *Unlocking the potential of generative AI in education: Opportunities, risks, and policy priorities*. World Bank Group. https://documents.worldbank.org/en/publication/documents-reports/documentdetail/099062024145080589
