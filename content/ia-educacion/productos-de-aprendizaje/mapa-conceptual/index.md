---
title: "Mapa conceptual con IAG"
date: 2026-05-11
lastmod: 2026-08-31
draft: false
description: "Cómo construir un mapa conceptual en dos versiones —una propia y una contrastada con IAG— y evaluar las decisiones de jerarquía y relación que lo hacen evidencia de comprensión."
summary: "Un mapa conceptual muestra cómo entiende alguien un tema: qué selecciona, qué subordina y qué conecta. Esta guía propone construirlo en dos versiones, usar la IAG como contraste y valorar el recorrido con un ejemplo trabajado completo."
tags: ["producto-aprendizaje", "bloom-4", "rubrica-iag", "cognitivas", "mapa-conceptual", "pensamiento-sistémico"]
categories: ["producto-aprendizaje"]
areas: ["ia", "evaluacion", "pedagogia"]

# Dimensiones del marco unificado
bloom_dominante: 4
bloom_rango: "2-5"
competencias_cluster: ["Cognitivas"]
area_disciplinar: "ambas"
riesgo_sustitucion_autoria: "bajo"
modalidad: "cualquiera"
asignatura_ejemplo: "Cualquier asignatura con marco teórico, estudio de teorías o sistemas complejos"

showHero: true
showTableOfContents: true
showReadingTime: true
showBreadcrumbs: true
showSummary: true
showTaxonomies: true
showRelatedContent: true
showAuthor: false
---

{{< contrato modo="ejemplo" quien="Docentes de cualquier asignatura con marco teórico o sistemas complejos (biología, sociología, redes de computadoras) que piden un mapa conceptual y reciben diagramas limpios, equilibrados e iguales entre sí, sin una sola decisión reconocible del estudiante." haras="Julia, de primer año de Biología, recibe la instrucción de relacionar fotosíntesis, respiración celular y flujo de energía en máximo veinte conceptos. Traza sola un primer mapa fechado (con un error: pone la respiración sólo en los animales), pega sus proposiciones a la IA y le pide conceptos ausentes, relaciones dudosas y cruces entre ramas; verifica en su libro, acepta «ATP», rechaza «quimiosíntesis» y entrega el mapa v1, el v2 con los cambios marcados y una nota de decisiones. La IA entra sólo después del primer trazado y devuelve preguntas, nunca el mapa." tendras="Una actividad en dos versiones con cuatro prompts copiables y una instrucción que puedes pegar mañana: «Máximo 20 conceptos; cada enlace lleva un verbo explícito; entregas el mapa en dos versiones fechadas y una nota con tus decisiones»." tarda="Doce minutos de lectura; veinte si adaptas la instrucción y los prompts a tu tema." ejemplo="El primer párrafo anuncia el caso de Julia; el caso completo, fase por fase, está en la sección «El mapa de Julia, de la lista al cruce»." >}}

Una profesora de Biología de primer año pide a su grupo un mapa conceptual sobre el flujo
de energía en un ecosistema. Recibe veintiocho mapas correctos, equilibrados y casi
idénticos; sólo el de Julia tiene un error visible (pone la respiración celular únicamente
bajo los animales) y, con el error, una nota que explica cómo lo corrigió. Un mapa
conceptual es la radiografía de cómo alguien entiende un tema: qué pone arriba, qué pone
abajo y qué conecta con qué. Si el mapa lo arma la IA, la radiografía muestra el
conocimiento del modelo. Esta página propone construirlo en dos versiones y revisar las
decisiones que las separan, con el caso de Julia como hilo.

## Tres decisiones hacen un mapa

Dibujar cajas y flechas es lo de menos. Lo que convierte un mapa conceptual en una muestra
de comprensión (qué está arriba, qué cuelga de qué, qué verbo une cada par) son tres
decisiones que nadie puede tomar por el estudiante.

La primera es la **selección**: de todo lo que dice el tema, ¿qué veinte conceptos importan?
Elegir implica descartar, y descartar exige entender qué es central y qué es anécdota. La
segunda es la **jerarquía**: ¿qué concepto abarca a cuáles, qué es un caso particular, qué
atraviesa todo el mapa sin pertenecer a ninguna rama? Un mapa donde todo está al mismo nivel
delata que la estructura del tema todavía no se ve. La tercera —la más reveladora— es la
**relación**: cada flecha necesita un verbo que diga cómo se conectan dos conceptos.
«Fotosíntesis *produce* glucosa» afirma algo comprobable; «fotosíntesis *se relaciona con*
glucosa» no afirma nada. El conector vago es el lugar exacto donde la comprensión se detiene,
y por eso es tan valioso: muestra dónde hay que volver a estudiar.

En términos de la taxonomía de Bloom, este tipo de trabajo recorre los niveles 2 a 5: comprender el
tema para seleccionar, aplicar esa selección en un primer trazado, **analizar** —el nivel
dominante— al decidir jerarquías y relaciones cruzadas, y evaluar al criticar el propio mapa.
El análisis es el corazón del trabajo: las otras fases lo preparan o lo revisan.

¿Y la IAG? Puede hacer las tres cosas en segundos, y ese es justamente el problema. Un mapa
generado por el modelo suele ser correcto, equilibrado y ajeno: no contiene ninguna decisión
del estudiante y, por tanto, no muestra nada de su comprensión. El uso formativo va en
otra dirección: la IAG sirve para **contrastar** un mapa que ya existe —señalar conceptos
olvidados, relaciones débiles, cruces posibles— y cada señalamiento se convierte en una
decisión más que el estudiante debe tomar y justificar.

## Dos mapas, no uno

De esa idea sale el diseño de la actividad: el estudiante no entrega un mapa, entrega dos
versiones del mismo mapa y las decisiones que hay entre ellas.

El **mapa v1** se construye sin IAG y se guarda fechado. No necesita estar bien: necesita
ser honesto. Sus errores y sus huecos son información, no falta. El **mapa v2** nace de
contrastar el v1 con la IAG y con las fuentes del curso: cada cambio —un concepto añadido,
una jerarquía movida, un cruce nuevo— queda marcado y justificado en una nota breve. La
comparación entre ambos es la pieza central de la entrega: muestra qué entendía el
estudiante al empezar y qué comprensión ganó en el camino.

Aunque el riesgo de sustitución de autoría es **bajo** —copiar un mapa ajeno a mano ya exige
cierto procesamiento—, el orden de las fases importa: si la consulta a la IAG ocurre antes
del primer trazado, el estudiante ya no compara su comprensión con el contraste, sino que
colorea el esquema del modelo.

{{< timeline >}}

{{< timelineItem icon="list" header="1. Inventario de conceptos" subheader="Con consulta puntual a la IAG" md="true" >}}
El estudiante lista los conceptos que considera centrales a partir de sus apuntes y
lecturas. Puede preguntar a la IAG qué conceptos suelen asociarse al tema, pero filtra la
lista con un criterio explícito (qué vio en el curso, qué pide la instrucción, qué cabe en
el límite de veinte conceptos).
{{< /timelineItem >}}

{{< timelineItem icon="diagram-project" header="2. Mapa v1, con sus propias manos" subheader="Sin IAG" md="true" >}}
Trazado completo: jerarquía, agrupamientos y conectores con verbo explícito («causa»,
«incluye», «se opone a», «depende de»). El mapa se fecha y se guarda tal cual. La IAG no
participa en esta fase.
{{< /timelineItem >}}

{{< timelineItem icon="link" header="3. Contraste con la IAG" subheader="El mapa ya existe" md="true" >}}
El estudiante describe su mapa al modelo —o pega su lista de proposiciones— y pide tres
cosas: conceptos ausentes, relaciones dudosas y cruces posibles entre ramas. Cada
sugerencia se anota como pendiente de verificación, no como corrección automática.
{{< /timelineItem >}}

{{< timelineItem icon="scale-balanced" header="4. Decidir y cerrar el mapa v2" subheader="Con las fuentes en la mano" md="true" >}}
Sugerencia por sugerencia, el estudiante verifica contra sus fuentes y decide: incorporar,
adaptar o rechazar. Marca en el v2 lo que cambió respecto del v1 y escribe una nota breve
con las dos o tres decisiones que más modificaron su mapa.
{{< /timelineItem >}}

{{< /timeline >}}

## El mapa de Julia, de la lista al cruce

Así se ve el recorrido en un caso concreto. **Julia**, estudiante de primer año de
Biología, recibe esta instrucción de su docente:

> Construye un mapa conceptual que relacione fotosíntesis, respiración celular y flujo de
> energía en un ecosistema. Máximo 20 conceptos; cada enlace debe llevar un verbo explícito.
> Entregarás el mapa en dos versiones fechadas y una nota con tus decisiones.

**Fases 1–2 · Su mapa, sin IAG.** Julia lista dieciocho conceptos desde sus apuntes y traza
el v1 en una hora. Arriba coloca «energía solar»; de ahí baja a «fotosíntesis», «glucosa» y
«cadenas tróficas». Su mapa tiene un error instructivo: pone «respiración celular» solo
bajo la rama de «animales», y conecta «plantas» únicamente con «fotosíntesis». También tiene
tres conectores vagos del tipo «se relaciona con». Guarda el archivo con fecha: esa es la
fotografía de lo que entiende hoy.

**Fase 3 · El contraste.** En lugar de pedir «hazme un mapa del flujo de energía» —lo que
la instrucción prohíbe—, Julia pega sus proposiciones y pregunta qué relaciones parecen dudosas
y qué cruces entre ramas podría estar omitiendo. Entre las respuestas hay tres señalamientos
útiles: la pregunta «¿las plantas no respiran?», la sugerencia de cruzar «respiración
celular» con «ciclo del carbono», y la propuesta de añadir «ATP» como concepto puente.
También hay una sugerencia inflada: incorporar «quimiosíntesis», con una definición que a
Julia le suena rara.

**Fase 4 · Verificar y decidir.** Julia va a su libro de texto. Confirma que las plantas
también respiran —su v1 tenía un error conceptual real, no un olvido— y mueve «respiración
celular» a un nivel superior, del que ahora cuelgan plantas y animales. Acepta «ATP» porque
le permite convertir dos conectores vagos en verbos precisos («la respiración celular
*libera energía en forma de* ATP»). Rechaza «quimiosíntesis»: existe, pero su curso no la
abordó y la instrucción limita los conceptos; lo anota como rechazo justificado, no lo esconde.
Su nota de decisiones cierra con una frase que el docente valora especialmente: «El error de
la respiración no me lo corrigió la IA: me hizo una pregunta y el libro me corrigió a mí.»

**La entrega.** Mapa v1 fechado, mapa v2 con los cambios marcados en otro color, nota de
decisiones de media página y declaración de uso de IAG de tres líneas. En la sesión de
cierre, la docente le pide explicar en un minuto el cruce entre respiración y ciclo del
carbono; Julia lo explica sin mirar el mapa. Eso —no la estética del diagrama— es lo que se
evalúa.

## Qué conservar de la entrega

Lo que se conserva de este trabajo (las dos versiones del mapa, la nota de decisiones)
sirve para
[conocer cómo se llegó al resultado]({{< ref "/ia-educacion/guias/evaluacion-formativa-ia" >}}):
comparar versiones, leer una decisión justificada, conversar sobre el trabajo y decir de
antemano cómo se va a revisar. Para un mapa conceptual, la muestra mínima es pequeña:

| Evidencia | Estado | Qué permite comprender |
|---|---|---|
| Mapa v1 fechado, sin IAG | obligatoria | El punto de partida real: aciertos, huecos y errores propios |
| Mapa v2 con cambios marcados | obligatoria | Qué se movió, se añadió o se corrigió, y dónde |
| Nota de decisiones (2–3 casos) | obligatoria | Por qué se aceptó, adaptó o rechazó cada sugerencia relevante |
| Registro del contraste con IAG | recomendada | Qué se preguntó y qué señalamientos produjo la consulta |
| Declaración de uso de IAG | obligatoria | En qué fases y con qué propósito intervino la herramienta |

Una conversación breve —«explícame este cruce», «¿por qué este concepto está arriba?»—
sustituye con ventaja cualquier intento de detectar herramienta: quien tomó las decisiones
puede defenderlas; quien coloreó un mapa ajeno, no.

## Preguntas que no piden el mapa hecho

Los prompts útiles para este trabajo comparten una regla: parten del mapa del estudiante y
devuelven preguntas o señalamientos, nunca el mapa terminado. Por eso no hay prompt para la
fase 2: el primer trazado se hace sin IAG.

<details>
<summary><strong>Fase 1 · Completar el inventario sin adoptarlo</strong></summary>

> Estoy construyendo un mapa conceptual sobre [tema] para un curso de [asignatura]. Mi
> lista de conceptos es: [lista]. No dibujes ni describas un mapa. Dime qué conceptos
> suelen considerarse centrales en este tema y no están en mi lista, con una línea sobre
> por qué importa cada uno. Yo decidiré cuáles entran.

</details>

<details>
<summary><strong>Fase 3 · Auditar las relaciones del mapa propio</strong></summary>

> Estas son las proposiciones de mi mapa conceptual, en formato «concepto — verbo —
> concepto»: [lista]. No lo reorganices ni propongas un mapa nuevo. Señala qué
> proposiciones te parecen imprecisas o discutibles y explica por qué, y dime qué
> relaciones cruzadas entre ramas distintas podría estar omitiendo. Formula tus
> señalamientos como preguntas cuando sea posible.

</details>

<details>
<summary><strong>Fase 3 · Poner a prueba la jerarquía</strong></summary>

> En mi mapa, [concepto A] está por encima de [conceptos B y C]. Hazme las preguntas que
> me permitirían comprobar si esa jerarquía se sostiene, y dime qué caso o contraejemplo
> la pondría en aprietos. No me des la jerarquía correcta: yo la verificaré en mis fuentes.

</details>

<details>
<summary><strong>Fase 4 · Preparar la nota de decisiones</strong></summary>

> Recibí estas sugerencias sobre mi mapa: [lista]. Ya decidí qué hacer con cada una:
> [decisiones]. No cambies mis decisiones ni añadas otras. Ayúdame a ordenarlas en una
> tabla breve con tres columnas: sugerencia, decisión y justificación, usando solo lo que
> te he dado.

</details>

## Dónde suele fallar

- **El mapa dictado.** El estudiante pide el mapa a la IAG y lo redibuja. La salvaguarda
  es estructural, no policial: el v1 fechado existe antes de cualquier consulta, y la
  conversación de cierre pide defender una decisión concreta.
- **Conectores sin verbo.** «Se relaciona con» en cada flecha. La instrucción exige verbo
  explícito («produce», «libera», «depende de») y la rúbrica lo valora por separado; un conector vago señala el punto exacto
  que hay que volver a estudiar.
- **Jerarquía plana.** Todos los conceptos al mismo nivel, unidos en cadena. Pedir al menos
  tres niveles y un cruce entre ramas obliga a decidir estructura, no solo vecindad.
- **Aceptación en bloque.** Todas las sugerencias del contraste entran al v2 sin
  verificación. La nota de decisiones exige al menos un rechazo o una adaptación
  justificados; un v2 que acepta todo sin fuentes a la vista es una señal para conversar,
  no para sancionar.

{{< alert icon="shield-halved" type="warning" >}}
**Transparencia por defecto.** Declarar el contraste con IAG no penaliza: es parte de la
entrega. Lo que invalida la entrega es presentar como propio un mapa cuyo origen no se
puede explicar.
{{< /alert >}}

## La rúbrica del mapa, como referencia final

La valoración separa dos cosas que suelen confundirse: la calidad del mapa final y la
calidad de las decisiones que lo produjeron. Un mapa impecable con decisiones invisibles
vale menos, como muestra de aprendizaje, que un mapa modesto cuyo recorrido se puede leer.
Los pesos son un punto de partida adaptable a cada curso (por ejemplo, más peso a «juicio
frente al contraste» si tu grupo tiende a aceptar todo lo que la IA sugiere), no una
política institucional:

| Criterio | N1 · Inicial | N2 · En desarrollo | N3 · Competente | N4 · Avanzado | Peso |
|---|---|---|---|---|---|
| Selección de conceptos | Copia la lista de la IAG o de la fuente sin filtrar | Selecciona con huecos u holgura injustificados | Selecciona lo central dentro del límite y lo justifica | Justifica también lo que dejó fuera | 15% |
| Jerarquía y estructura | Mapa plano o en cadena | Niveles presentes pero inconsistentes | Al menos tres niveles defendibles y agrupamientos claros | Distingue lo transversal de lo subordinado y lo explica | 20% |
| Calidad de las relaciones | Conectores vagos o sin verbo | Verbos presentes pero imprecisos | Verbos específicos y proposiciones comprobables | Cruces entre ramas con verbos precisos y verificados | 20% |
| Evolución entre v1 y v2 | No hay v1, o el v2 es idéntico | Cambios sin justificación | Cambios marcados y justificados en la nota | La comparación muestra una corrección conceptual comprendida | 20% |
| Juicio frente al contraste | Acepta o ignora todo en bloque | Decide sin verificar en fuentes | Verifica y decide caso por caso | Rechaza sugerencias con argumento disciplinar | 15% |
| Transparencia | No declara el uso | Declaración genérica | Declara fases y propósito | La declaración permite reconstruir el recorrido | 10% |

## Para seguir

- El mapa conceptual funciona como herramienta intermedia dentro de un
  [ensayo con IA]({{< ref "/ia-educacion/productos-de-aprendizaje/ensayo" >}}): las mismas
  reglas de contraste aplican a la estructura del argumento.
- La [monografía con IAG]({{< ref "/ia-educacion/productos-de-aprendizaje/monografia" >}})
  usa un esquema de relaciones análogo para organizar fuentes.
- La lógica de valorar versiones y decisiones se desarrolla en
  [evaluación formativa con IA]({{< ref "/ia-educacion/guias/evaluacion-formativa-ia" >}}).
- Para registrar el contraste sin acumular capturas, sirve la práctica de
  [bitácora de co-creación]({{< ref "/ia-educacion/practicas/bitacora-cocreacion" >}}).

{{< referencias titulo="Procedencia editorial" >}}

Elaboración editorial del sitio para este catálogo. La progresión usa Bloom como vocabulario descriptivo e integra criterios de revisión del proceso (por ejemplo, el uso crítico de la respuesta de la IA); no presenta una política institucional ni una rúbrica obligatoria.

{{< /referencias >}}
