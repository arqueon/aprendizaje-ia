---
title: "Alfabetización en co-creación: aprender a co-producir con IA"
date: 2026-04-26
draft: false
description: "Una capa específica de alfabetización digital que las anteriores no cubren: aprender a sostener un acoplamiento productivo con sistemas de IA, sin colapsar en uso instrumental ni en delegación pasiva."
summary: "La co-creación persona-IA no se aprende por exposición. Esta pieza propone un marco formativo de tres niveles para que un docente desarrolle la competencia de co-producir conocimiento con un sistema algorítmico."
tags: ["co-creación", "alfabetización", "co-producción", "competencia digital", "Deleuze"]
categories: ["guia"]
areas: ["digital", "ia", "formacion"]

weight: 13
showHero: true
showBreadcrumbs: true
showSummary: true
showTableOfContents: true
showReadingTime: true
showAuthor: false
ecosistema:
  id: literacy.cocreacion
  titulo: "Literacidad de co-creación"
  audiencias: [estudiante, docente]
  intenciones: [comprender, practicar, diseñar]
  tipo: guia
  capas: [L3, D.cocreacion, P.direccion-epistemica, P.trazabilidad]
  resultado: "Distingue co-creación dirigida de delegación pasiva y diseña una progresión para practicarla."
  estado_evidencia: evidencia-citada
  fuentes:
    - "https://doi.org/10.1145/3664214"
    - "https://www.unesco.org/en/articles/ai-competency-framework-teachers"
  revisado: 2026-07-27
  relaciones:
    - tipo: requiere
      destino: literacy.operativa
    - tipo: requiere
      destino: literacy.critica
    - tipo: aplica
      destino: pattern.direccion-epistemica
    - tipo: continua
      destino: assessment.basada-en-procesos
  reutilizacion: [hugo, moodle, curso-amplio]
  accesibilidad: "La progresión se presenta como texto, tabla e indicadores observables además del diagrama."
  responsable:
    rol: "Coordinación editorial IA-docencia"
    proxima_revision: 2026-10-27
---

{{< contrato modo="lectura" quien="Docentes que ya usan IA para preparar clases, guías o retroalimentación y notan que aceptan lo que devuelve casi sin tocarlo, o que quieren pedir a su grupo un trabajo con IA que sea algo más que copiar y pegar." haras="Vas a entender que trabajar con IA es una tercera habilidad, distinta de saber manejar la herramienta y de saber criticarla: sostener una conversación en la que tú decides qué aceptas, qué descartas y qué cambias, y puedes decir por qué. Y vas a ver cómo se aprende por niveles: primero notarlo, después sostenerlo y al final diseñarlo para tu grupo." tendras="Un ejercicio para empezar esta semana (guardar una conversación con la IA y anotar al final qué puso cada parte y qué decidiste tú: «la estructura la propuso la IA; el ejemplo del arroyo lo puse yo; descarté su conclusión porque generalizaba») y una lista de señales para saber en qué nivel estás." tarda="Doce a quince minutos de lectura." ejemplo="Empieza con Laura, docente de historia, que pide a la IA un resumen de una fuente y se descubre entregándolo casi igual; su caso abre la primera sección." >}}

## Por qué son necesarias las tres alfabetizaciones y no sólo dos

Laura da historia de México en primer semestre. Pide a una IA que resuma un testimonio del siglo XIX para usarlo en clase, lee el resumen, le parece bien y lo pega en la presentación. Al día siguiente una estudiante le pregunta por una fecha que aparece en el resumen y Laura no sabe si viene del testimonio o la puso el modelo. Laura sabe manejar la herramienta (escribió una instrucción clara) y sabe que los modelos inventan datos (lo explica en clase). Lo que le faltó fue lo que pasa en medio: leer cada salida decidiendo qué acepta, qué descarta y qué cambia, y poder decirlo después. A esa tercera habilidad la llamamos aquí **co-creación**: lo producido sale de la relación entre la persona y el modelo (Meshi, 2024), y la persona conserva el mando. En su raíz teórica es lo que Deleuze y Guattari llaman *agenciamiento* (ensamblaje); usamos «co-creación» por su mayor claridad.

Separar la alfabetización operativa de la crítica funciona bien para muchos programas (por ejemplo, un procesador de textos: aprendo a hacerlo funcionar y aprendo qué empresa lo vende y con qué interés). Para el caso de la IA generativa esa dupla nos dejaría un vacío: el de Laura.

La operativa enseña a formular prompts, a comparar modelos, a enderezar las solicitudes; la crítica enseña a leer los sesgos, a comprender el modelo de negocio, a anticipar las consecuencias sociales. Ninguna de estas dos enseña lo que acontece a lo largo de la interacción: cómo mantener un diálogo con la IA donde la persona conserva el rumbo (decide qué se busca y qué cuenta como buena respuesta), evalúa cada salida y decide qué aceptar, qué descartar y qué transformar. Esa competencia —la **co-creación**— aparece en un caso trabajado en la [guía sobre la co-creación persona-IA](/ia-educacion/guias/agenciamiento-humano-ia/) y aquí se traduce en un camino de formación con tres niveles.

A continuación se presenta un esquema que resume las tres literacidades, detallando lo que cada una desarrolla y cómo se construye:

| Literacidad     | Qué se desarrolla                                                                                                          | Cómo se construye                                                                                                 | Demanda de Bloom frecuente, no exclusiva |
| --------------- | -------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| **Operativa**   | Dominio en el uso de la IA: formulación de instrucciones y su integración en el trabajo diario                             | A través de una práctica guiada y progresiva                                                                      | Recordar · Comprender · Aplicar |
| **Crítica**     | Comprensión de los sistemas, incluyendo sus sesgos y efectos; capacidad de discernimiento y verificación de resultados     | Mediante lectura lateral, análisis del sesgo algorítmico, y desarrollo de conciencia sociotécnica y ética         | Analizar · Evaluar              |
| **Co-creación** | Mantener el acoplamiento mientras se preserva la dirección epistémica, y decidir cuándo no emplear la IA                  | A través de un ciclo iterativo supervisado (formular, contrastar, decidir, responder) y documentación del proceso | **Crear** (cúspide)             |

Estas literacidades no son etapas independientes sino una progresión acumulativa: cada una
se apoya en las anteriores. La [taxonomía de
Bloom](/recursos/glosario/taxonomia-de-bloom/) ofrece una heurística de diseño, no una
equivalencia fija: la literacidad operativa suele enfatizar recordar, comprender y aplicar;
la crítica, analizar y evaluar; y la co-creación integra esas demandas para crear. Una tarea
concreta puede movilizar varios niveles a la vez. Lo importante es precisar qué esfuerzo
cognitivo conserva la persona.

{{< mermaid >}}
flowchart LR
    A["**Operativa**<br/>usar"]
    B["**Crítica**<br/>entender"]
    C["**Co-creación**<br/>sostener"]
    T["Evaluación<br/>del proceso<br/>(transversal)"]

    A --> B --> C
    T -.- A & B & C
    
    style A fill:#007c83,stroke:#123b4a,color:#ffffff
    style B fill:#123b4a,stroke:#102e3a,color:#ffffff
    style C fill:#f7a11a,stroke:#123b4a,color:#123b4a
    style T fill:#f6f1e8,stroke:#007c83,color:#123b4a

{{< /mermaid >}}

Esta progresión es un **programa de alfabetización en IA** dirigido al profesorado y al estudiantado, dividido en seis módulos (60h): evaluación crítica y discernimiento, conciencia sociotécnica y ética, agencia y co-creación, uso selectivo y derecho a la no-utilización, adaptabilidad disciplinar y un proyecto integrador de coproducción documentada. Sus contenidos están fundamentados en los principios de las tres literacidades —[operativa](/formacion-docente/alfabetizacion-operativa/), [crítica](/ia-educacion/etica-y-transparencia/alfabetizacion-critica-ia/) y [co-creación](/formacion-docente/alfabetizacion-co-creacion/)— y llevan la muestra del aprendizaje del trabajo final al proceso, con la [evaluación formativa del proceso](/ia-educacion/guias/evaluacion-formativa-ia/) —bitácora de decisiones, portafolio iterativo y auditoría de salidas—, donde se detallan los tres niveles que siguen. Si coordinas formación docente, ese programa te sirve como esqueleto; si eres docente, lo que sigue te sirve para ubicarte y elegir un ejercicio.

## Tres niveles de progresión

Esta alfabetización se obtiene practicando, con alguien que revise y con tiempo para pensar sobre lo hecho; leer esta página sólo te dice por dónde empezar. La progresión sugerida tiene tres niveles, con duración aproximada de un semestre cada uno para quien ya domine la alfabetización operativa. Lee las señales de cada nivel y quédate con el ejercicio del nivel donde te reconozcas.

### Nivel 1 — Detectar la co-creación

El primer movimiento consiste en notar que la co-creación existe. Sonará trivial, pero la mayoría de los docentes y estudiantes que usan IA hablan en términos instrumentales —"yo le pedí", "ella respondió"— como si el resultado se adjudicara a alguna de las partes. Detectar la co-creación implica reconocer que el resultado salió de la relación entre ambos: en el caso de Laura, el modelo eligió qué frases resumir y ella eligió dejarlas.

**Indicadores observables:**

- El docente narra la interacción en términos de proceso, no de transacción.
- Sabe distinguir momentos en los cuales la IA propuso algo que él no habría llegado a producir, dado su conocimiento de la materia.
- Identifica decisiones suyas que orientaron las salidas hacia un lugar específico.
- Distingue entre lo que aceptó porque lo evaluó y lo que aceptó por comodidad.

La manera de formarse es a partir de ejercicios de transcripción reflexiva. El docente conserva el diálogo completo con la IA y, al cierre de la sesión, escribe un comentario sobre qué aportó cada parte y qué decisiones tomó. De tres a cinco ejercicios por semana durante seis semanas suelen consolidar la disposición.

### Nivel 2 — Mantener la co-creación

Detectar no es igual a mantener. El segundo nivel plantea que el docente aprenda a sostener el control epistémico durante la interacción, no solo reconocerlo a posteriori. Yang y Ma (2025) proponen una clasificación de las relaciones epistémicas en la interacción persona-IA que permite nombrar qué tipo de vínculo mantiene el humano al realizar cada tarea: si actúa como autor, evaluador o curador del resultado. Hablamos de reformular prompts cuando una salida es insatisfactoria, de descartar respuestas plausibles que no cumplen lo que el docente había fijado de antemano (por ejemplo, «el caso tiene que ser de una comunidad mexicana y con datos reales»), o de no aceptar una salida adecuada cuando la propia exigencia pedía más.

**Indicadores observables:**

- Reformula prompts varias veces y sin frustración, hasta lograr el resultado que busca.
- Descarta respuestas plausibles cuando no responden a lo que decidió antes de consultar (por ejemplo, «quiero tres causas, no una lista de diez»).
- Detecta cuándo la IA sigue un patrón simple en la respuesta y exige que el resultado aporte especificidad.
- Mantiene lo que él mismo exige (por ejemplo, «un ejemplo por concepto y ninguna cita sin fuente») como referencia fija, no como sugerencia negociable.

**Cómo se entrena:** con tareas de exigencia fija (por ejemplo, «un plan de clase para un grupo de 40 sin proyector») y revisión entre pares. El docente elabora una tarea que solo él puede saber si está bien resuelta (porque conoce el contexto de su asignatura) y la trabaja con IA hasta producir un resultado que pueda defender. Otro docente revisa el proceso completo y comenta dónde percibió que se delegó juicio. Tres iteraciones a lo largo de un semestre.

### Nivel 3 — Diseñar la co-creación para otros

El tercer nivel es la competencia avanzada. El docente no sostiene solo su co-creación; diseña actividades donde sus estudiantes sostendrán procesos de co-creación productiva, lo que implica anticipar las dificultades específicas del estudiante, las trampas en las que caerá, los puntos donde la práctica con IA generará aprendizaje real.

**Indicadores observables:**

- Escribe instrucciones que exigen al estudiante sostener decisiones (por ejemplo, «entrega también la versión que descartaste y di por qué»), no sólo obtener respuestas.
- Anticipa dónde el estudiante sentirá la tentación de delegar juicio y construye fricciones deliberadas en esos puntos.
- Diferencia entre tareas que la IA debe asistir, tareas donde el estudiante trabaja sin IA y tareas donde el contraste entre ambas es lo que se evalúa.
- Escribe la rúbrica sobre la calidad de las decisiones tomadas con la IA (por ejemplo, «descarta una salida y explica la razón»), no sólo sobre el texto final.

**Cómo se entrena:** diseño y realización de una asignatura completa centrada en procesos de co-creación, con bitácora del docente, retroalimentación entre pares y revisión de los trabajos finales al cierre. Aquí la alfabetización en co-creación se consolida y se vuelve enseñable a otros docentes.

## Recorre el ciclo completo

Esta síntesis cobra sentido después de distinguir los tres niveles. Úsala para reconocer
dónde comienza y termina cada decisión, no como sustituto de la práctica supervisada.

{{< h5p id="cocreacion-evaluacion-recorrido" load="manual" title="Recorrido: co-crear y evaluar con IA" >}}
### El recorrido en cuatro movimientos

1. **Empieza con una posición propia:** conserva un esquema, una hipótesis o lo que vas a
   exigirle al resultado (por ejemplo, «tiene que citar la ley vigente»).
2. **Interroga y verifica:** solicita objeciones y contrasta datos y fuentes.
3. **Transforma y justifica:** compara versiones y explica las razones de cambio.
4. **Evalúa el proceso, el resultado y lo que se transfiere:** el estudiante explica qué aprendió
   y el docente combina la calidad del trabajo final con las marcas del recorrido (el primer
   esquema, las dos decisiones anotadas).

Al cerrar, distingue una marca de decisión propia (por ejemplo, «descarté la segunda versión
porque generalizaba») de un registro que sólo demuestra que se utilizó una herramienta.
{{< /h5p >}}

## Lo que esta alfabetización requiere de la institución

El docente individual no puede abarcar este aprendizaje solo. Hay tres condiciones institucionales que lo determinan, y conviene nombrarlas para que no queden como buenas intenciones.

El segundo y tercer niveles exigen tiempo real en la carga horaria — tiempo con autorización explícita para iterar, errar y rehacer. Sin eso, lo que se aprende es uso instrumental con vocabulario de co-creación: la forma sin el fondo.

La revisión entre pares no es una recomendación: es parte del método. El segundo nivel requiere que otro docente revise el proceso completo. La [pieza sobre redes y comunidades](/formacion-docente/redes/) cubre el marco; los espacios concretos hay que construirlos institucionalmente.

Y sin reconocimiento académico explícito, la alfabetización en co-creación queda en el territorio del interés personal. Los docentes que la desarrollen lo harán en contra del sistema, no gracias a él.

## Conexiones con los marcos UNESCO

Si tu institución planea la formación docente con el marco UNESCO, este apartado te dice dónde encaja lo anterior. El marco de competencias de IA para docentes de UNESCO (2024) enumera cinco áreas —**mentalidad centrada en lo humano**, **ética de la IA**, **fundamentos y aplicaciones de la IA**, **pedagogía de la IA** e **IA para el aprendizaje profesional**— y tres niveles progresivos de dominio en cada una: *Adquirir*, *Profundizar* y *Crear*. El nivel *Crear* es donde la literacidad de co-creación se vuelve indispensable, aunque el marco no la nombra con ese término. En tres de las cinco áreas, alcanzar *Crear* exige en la práctica sostener un acoplamiento productivo con la IA:

- En **mentalidad centrada en lo humano**, *Crear* implica diseñar configuraciones de uso de IA que preserven la agencia humana —exactamente la decisión que define la co-creación: cuándo el sistema participa, cuándo no y con qué regla (por ejemplo, «la IA propone objeciones, nunca redacta la conclusión»).
- En **pedagogía de la IA**, *Crear* significa diseñar actividades de aprendizaje con IA para otros; un docente no puede diseñar lo que él mismo no sabe sostener (es el Nivel 3 de la progresión propuesta arriba).
- En **IA para el aprendizaje profesional**, *Crear* describe el uso de la IA como interlocutor del propio desarrollo intelectual del docente —el caso paradigmático de co-creación aplicado a la práctica profesional.

Las otras dos áreas —**ética de la IA** y **fundamentos y aplicaciones**— en su nivel *Crear* movilizan competencias distintas (liderazgo ético-normativo, diseño técnico) que no dependen del mismo acoplamiento epistémico. Nombrar y desarrollar intencionadamente la literacidad de co-creación ayuda a ese marco: aporta el soporte léxico y el método formativo para la competencia que hoy queda implícita en su nivel máximo. Rousell y Sinclair (2025) señalan, además, que los sistemas de IA no son herramientas al servicio de futuros previamente decididos, sino componentes activos en la creación de esos futuros: la literacidad de co-creación es, también, la competencia de participar en ese proceso.

## Lecturas relacionadas

La [guía sobre la co-creación persona-IA](/ia-educacion/guias/agenciamiento-humano-ia/) muestra, mediante un caso, cómo la persona conserva la dirección del proceso; el ensayo del blog sobre [la co-creación persona-IA](/blog/agenciamiento-humano-ia/) sostiene la posición filosófica; la [alfabetización digital](/formacion-docente/alfabetizacion/) cubre el nivel previo del que parte esta competencia; la [alfabetización crítica en IA](/ia-educacion/etica-y-transparencia/alfabetizacion-critica-ia/) cubre la dimensión epistémica complementaria.

{{< referencias >}}

Deleuze, G., & Guattari, F. (1987). *A thousand plateaus: Capitalism and schizophrenia* (B. Massumi, Trans.). University of Minnesota Press. (Trabajo original publicado en 1980).

Meshi, A. (2024). GPT-ME: A human-AI cognitive assemblage. *Proceedings of the ACM on Computer Graphics and Interactive Techniques*, *7*(4), 55:1–55:8. https://doi.org/10.1145/3664214

Rousell, D., & Sinclair, M. P. (2025). Desiring-futures in education policy: Assemblage theory, artificial intelligence, and UNESCO's futures of education. *Educational Review*, *77*(6), 1754–1777. https://doi.org/10.1080/00131911.2024.2362176

UNESCO. (2024). *AI competency framework for teachers*. UNESCO. https://www.unesco.org/en/articles/ai-competency-framework-teachers

Wenger, E. (1998). *Communities of practice: Learning, meaning, and identity*. Cambridge University Press.- Yang, S., & Ma, R. (2026). Towards a typology of epistemic relationships in human–AI interaction. *Information Research*, *31*(iConf). https://doi.org/10.47989/ir31iconf64143
{{< /referencias >}}
