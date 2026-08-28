# Autorización editorial UDGIA-022

- Identificador de decisión: **UDGIA-022**
- Fecha de decisión: **2026-08-27**
- Alcance: **project-editorial** — autorización editorial del proyecto para publicación.
- Atribución: Aprendizaje Digital e IA (UDGPlus), Universidad de Guadalajara.
- Licencia del contenido: Creative Commons Atribución-CompartirIgual 4.0 Internacional
  (CC BY-SA 4.0).
- Evidencia: confirmación de autoría del responsable del proyecto, 2026-08-27, registrada
  en el apartado «Procedencia» de este documento.

Esta decisión permite publicar los objetos enumerados abajo bajo
CC BY-SA 4.0. No constituye un dictamen institucional general de la Universidad de
Guadalajara ni sustituye las revisiones jurídicas o institucionales que pudieran
requerirse para otros contenidos.

## Qué se promueve y por qué

Las treinta prácticas de selección del curso «Diseño inverso y cocreación con IA para
aprendizaje activo e híbrido» pasan de respaldo HTML estático a `H5P.MultiChoice` real.

El motivo es pedagógico, no técnico. En su forma actual el respaldo emite una lista
ordenada sin ningún mecanismo de selección: el usuario no puede elegir, de modo que no hay
acto al que responder, y la explicación de todas las opciones se despliega igual haya
decidido o no. La política del propio catálogo ya lo anticipaba: la justificación de
`H5P.MultiChoice` en `data/h5p/course_candidates.json` invoca «su presentación formativa
sin puntuación», que es precisamente lo que el respaldo estático no puede ofrecer.

Los otros veintiséis candidatos **no se promueven** y conservan su decisión
`native-html-preferred`. Los diecisiete `dialog-cards` funcionan bien tal como están —hay
un gesto real por tarjeta y el reverso llega justo después del intento— y promoverlos no
añadiría nada. Los nueve restantes exigirían gobernar tres bibliotecas nuevas que no están
en el runtime.

## Condiciones que se mantienen

- **Sin calificación, sin cuenta y sin persistencia de intentos.** Los treinta objetos
  llevan `reportingIsEnabled: false` y el adaptador de presentación `formative-no-score`,
  que retira la barra de puntuación del reproductor. Verificado en navegador: cero
  `.h5p-question-scorebar` en las actividades generadas.
- **Alternativa accesible obligatoria.** El respaldo HTML actual no se descarta: pasa a ser
  el contenido interior del shortcode `h5p`, que aborta el build si se deja vacío. El
  trabajo hecho no se pierde, cambia de función.
- **Sin recursos externos.** Los paquetes no incorporan medios de terceros.

## Procedencia — RESUELTA

Los nueve objetos ya autorizados por UDGIA-010 declaran un bloque `provenance` con autoría
y origen. Los cincuenta y seis candidatos del curso **no lo declaran**: sólo llevan la
cadena `project-original-pending-publication-gate` dentro de `licenseStatus`, que afirma
autoría propia pero no la documenta. El paquete de origen
(`…-raw-28ezk9aB.zip`, sha256 `2fa5079a…`) **no está versionado**, de modo que la
afirmación no puede rastrearse desde este repositorio.

**Resolución (2026-08-27).** Consultado el responsable del proyecto sobre si el curso de
Articulate Rise es de autoría UDGplus y si los enunciados, opciones y retroalimentaciones de
las treinta preguntas incorporan material de terceros incompatible con CC BY-SA 4.0,
confirmó la autoría de la Universidad de Guadalajara. Sobre esa confirmación se firma esta
autorización y se registra el bloque `provenance` de los treinta objetos con
`kind: "original"` y la atribución institucional.

Queda como recomendación operativa, no como condición de esta autorización: versionar el
paquete de origen o dejar constancia de su ubicación fuera del repositorio, de modo que la
procedencia sea rastreable en futuras revisiones sin depender de una consulta.

## Verificación técnica ya realizada (2026-08-27)

- Treinta paquetes generados desde `h5p/templates/official/multi-choice.h5p`
  (sha256 verificado), **49,5 MB en total, media de 1,7 MB por paquete**.
- Runtime regenerado: 39 contenidos, treinta del curso, **los treinta con el adaptador
  `formative-no-score`**.
- Prueba funcional en navegador sobre `curso-l01-h5p-02`, en apariencia clara y oscura:
  opciones seleccionables presentes, botón «Comprobar» presente, **cero barras de
  puntuación**, y el fondo siguiendo la apariencia del sitio (`#f5f3ee` / `#131c31`).
- `publication-contract.mjs --mode public` los marca como `publication-not-authorized` y
  `license-pending`, que es el comportamiento correcto mientras esta decisión no se firme.

## Nota sobre el orden de aplicación

`publication-contract.mjs --mode public` bloquea el despliegue **del sitio entero** si
cualquier objeto del catálogo queda sin autorizar, no sólo el objeto afectado. Por eso las
entradas viven en `h5p/pending-catalog-udgia-022.json` y no en `data/h5p/catalog.json`:
fusionarlas sin autorizar dejaría el sitio sin poder publicarse.

## Objetos que se autorizarán (30)


**Lección 1**

1. `curso-l01-h5p-02` — ¿Cuál de las siguientes acciones refleja mejor la agencia docente en un entorno híbrido?

**Lección 2**

2. `curso-l02-h5p-02` — ¿Cuál de las siguientes opciones refleja mejor la lógica del diseño inverso?

**Lección 3**

3. `curso-l03-h5p-02` — ¿Cuál de las siguientes acciones refleja mejor la literacidad de cocreación con IA?

**Lección 4**

4. `curso-l04-h5p-02` — ¿Cuál de las siguientes acciones representa mejor una cocreación efectiva entre persona …

**Lección 5**

5. `curso-l05-h5p-02` — ¿Cuál de las siguientes acciones representa un uso apropiado de la IA en el diagnóstico …

**Lección 6**

6. `curso-l06-h5p-03` — ¿Cuál de las siguientes opciones representa un resultado de aprendizaje observable, alin…

**Lección 7**

7. `curso-l07-h5p-03` — ¿Cuál de las siguientes evidencias sería la más robusta y alineada para evaluar la justi…

**Lección 8**

8. `curso-l08-h5p-03` — ¿Cuál de las siguientes afirmaciones refleja mejor una secuencia activa e híbrida bien d…

**Lección 9**

9. `curso-l09-h5p-02` — Al analizar dos comunidades frente a la misma amenaza, ¿qué factor explica mejor por qué…

**Lección 10**

10. `curso-l10-h5p-03` — ¿Cuál de las siguientes acciones representa mejor una integración efectiva de la reflexi…

**Lección 11**

11. `curso-l11-h5p-04` — Al priorizar intervenciones en un contexto complejo, ¿cuál de las siguientes acciones re…

**Lección 12**

12. `curso-l12-h5p-02` — ¿Qué elemento es fundamental para una mejora continua efectiva en el diseño de actividad…

**Lección 13**

13. `curso-l13-h5p-01` — ¿Cuál opción identifica correctamente los cuatro componentes del riesgo?
14. `curso-l13-h5p-02` — Una docente usa IA en su curso de tres maneras: formula prompts para resumir textos, con…
15. `curso-l13-h5p-03` — En un curso universitario híbrido, una profesora detecta que su grupo tiene niveles dist…
16. `curso-l13-h5p-04` — Según el recorrido habitual de esta lección, ¿qué secuencia organiza una experiencia act…
17. `curso-l13-h5p-05` — Un docente quiere evaluar si el estudiantado puede aplicar criterios de verificación de …
18. `curso-l13-h5p-06` — Una docente diseña una actividad híbrida en la que parte del grupo participará en un deb…
19. `curso-l13-h5p-07` — Un docente quiere aumentar el nivel de actividad cognitiva en una secuencia híbrida. ¿Qu…
20. `curso-l13-h5p-08` — Una docente quiere redactar un resultado de aprendizaje observable para una actividad. ¿…
21. `curso-l13-h5p-09` — Una docente usa una herramienta de IA para planear una actividad de clase. Primero ajust…
22. `curso-l13-h5p-10` — Al planear una actividad virtual sincrónica para un grupo universitario diverso, ¿qué ac…
23. `curso-l13-h5p-11` — Una docente utiliza IA para proponer una actividad de clase. Revisa las sugerencias, con…
24. `curso-l13-h5p-14` — En un contexto con recursos limitados, ¿qué conjunto de criterios permite priorizar una …
25. `curso-l13-h5p-15` — Estás diseñando una rúbrica para evaluar el resultado de aprendizaje: "El estudiante jus…
26. `curso-l13-h5p-16` — El diseño inverso inicia con la definición de los resultados de aprendizaje deseados ant…
27. `curso-l13-h5p-17` — Un docente usa IA para diseñar una actividad y acepta sus propuestas sin revisarlas ni c…
28. `curso-l13-h5p-18` — Una docente quiere preparar un diagnóstico inicial para una nueva unidad. Usa una herram…
29. `curso-l13-h5p-19` — Una docente universitaria rediseña una unidad para que el estudiantado analice un caso e…
30. `curso-l13-h5p-25` — Utilizar verbos como explicar, aplicar o analizar ayuda a que un resultado de aprendizaj…
