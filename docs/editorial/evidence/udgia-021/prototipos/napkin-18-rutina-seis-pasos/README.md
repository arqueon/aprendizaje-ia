# Piloto Napkin 18 — rutina de seis pasos

Estado: **piloto integrado y verificado en el árbol local; sin commit ni publicación**.

## Qué debe enseñar

Después de ver el esquema, la persona debe comprender que trabajar con IA sin ceder su criterio implica conservar una posición inicial, delimitar la ayuda, comprobar lo importante, decidir con razones, comparar versiones y explicar el resultado.

El visual resume una relación ya explicada en las Orientaciones: la IA puede aportar durante el proceso, pero la decisión y su justificación siguen perteneciendo a quien aprende. No sustituye esa explicación en prosa.

## Archivos

- `rutina-seis-pasos-identidad-c.svg`: adaptación horizontal para escritorio, 960 × 540.
- `rutina-seis-pasos-identidad-c-mobile.svg`: composición vertical para pantallas estrechas, 640 × 1080.
- `captura-escritorio.png` y `captura-movil.png`: renderizaciones usadas en la revisión visual.
- `captura-original.png`: renderización de referencia del Generated Output original.
- `cinco-movimientos-hugo.svg` y `cinco-movimientos-hugo-mobile.svg`: adaptación aprobada
  conceptualmente para la secuencia de cinco movimientos que ya explica la página pública.
- `render-hugo-desktop.png` y `render-hugo-mobile.png`: recortes del render real de la integración
  preparada en Hugo.
- `diff-hugo/`: espejo aislado de los archivos tal como quedarían después de integrar.
- `integracion-hugo-cinco-movimientos.patch`: diff exacto, comprobado con `git apply --check` y
  aplicado localmente el 5 de agosto de 2026. SHA-256:
  `4a695e3ad516e8895326aef69a6ad77c445b6a8939f580166cd3b7cafffef816`.
- `qa-harness-napkin18.patch`: actualización reversible de los dos verificadores de figuras para
  distinguir nueve figuras publicables de la pieza Napkin local no autorizada. SHA-256:
  `629f739fdc47fb7b92c7964eabc24f952a3df7757f11b138631854ea1ee2bae9`.

## Procedencia y transformación

Fuente recibida:

`/home/ruben/Projects/ia/napkin-SVG- Orientaciones para la Integración de la IA - visual selection/Orientaciones para la Integración de la IA - visual selection 18.svg`

SHA-256 de la fuente: `dcddac08e6f6b933136580ddb4a26a0473e8255d0f5898fb7589da5102d4a8c2`.

La fuente se identifica como **Generated Output de Napkin AI**. Las variantes conservan esa procedencia en sus metadatos y quedan sujetas a los términos aplicables de Napkin. El piloto no asigna una licencia nueva al material de origen.

Cambios realizados:

- paleta adaptada a la identidad C: papel cálido, azul tinta, almagre, verde olivo y ocre;
- tipografía local con alternativas del sistema, sin importar fuentes externas;
- etiquetas reescritas como acciones cotidianas;
- numeración visible para no depender del color;
- fondo explícito para conservar contraste en temas claros y oscuros;
- título, descripción accesible y metadatos dentro de cada SVG;
- variante móvil recompuesta como secuencia vertical, no como reducción del gráfico horizontal.

## Compuerta de coherencia resuelta para la preparación

La figura presenta **seis pasos**. La página pública `content/ia-educacion/constelaciones/cocreacion-evaluacion/index.md` presenta **cinco movimientos**: propósito, primer intento, ayuda delimitada, comprobación y decisión explicada. La auditoría UDGIA-021 ya registra que la muestra pública resume seis pasos en cinco sin cambiar la relación, pero la correspondencia no es literal.

La revisión enviada por Rubén el 5 de agosto de 2026 a las 17:34:09 UTC aprobó la dirección visual
y eligió **adaptar a cinco movimientos y preparar un diff exacto para Hugo**. Autorizó preparar la
variante conceptual y el diff fuera del contenido, sin aplicarlos.

La compuerta posterior enviada a las `2026-08-05T17:50:49.162Z` autorizó aplicar el parche exacto al
árbol local, ejecutar build, QA y render real, actualizar la evidencia y preparar después la
compuerta de Orientaciones. No autorizó commit, `push`, publicación, despliegue ni Moodle.

La preparación conserva estas rutas como antecedentes:

1. la variante de seis pasos permanece disponible para una eventual entrada de Orientaciones;
2. la variante de cinco movimientos es la candidata elegida para Hugo;
3. no se reescribió la página pública para forzarla a seis pasos.

## QA ejecutada

- XML válido en ambas variantes: `xmllint --noout` → PASS.
- Sin `@import`, scripts ni recursos remotos: PASS.
- Texto principal en azul tinta sobre papel cálido; la secuencia no depende del color: PASS.
- Render real inspeccionado a 1440 × 810 y 640 × 1080: PASS local.
- Sin cortes, números perdidos ni texto desbordado en las dos capturas: PASS local.
- Variante de cinco movimientos: XML válido, sin recursos remotos y render directo inspeccionado en
  1440 × 780 y 640 × 970: PASS local.
- Integración aplicada al árbol local: el build completo Hugo 0.164.0 produjo 928 páginas, 60
  paginadores y 192 recursos no-página en PASS; permanecen advertencias conocidas de deprecación y
  compatibilidad del tema.
- QA gobernada de figuras: 9 figuras publicables y 1 figura local, cada una con dos variantes, en
  PASS.
- QA de rutas de figuras: 10 rutas × 2 bases × 2 viewports, axe, enlaces, carga SVG, fallback,
  tráfico de red y almacenamiento en PASS; cero advertencias Hugo nuevas.
- Render real de Hugo inspeccionado en escritorio y teléfono: PASS local; la
  figura horizontal y la variante vertical aparecen donde corresponde, con introducción,
  conclusión, procedencia, aviso de alcance y descripción desplegable.
- Runtime H5P general: PASS. El piloto H5P conserva una falla ajena a Napkin 18: «Móvil: faltan las
  dos entradas».
- Los inventarios globales de contenido y materiales siguen desactualizados por el WIP acumulado;
  no se regeneraron para evitar certificar un árbol mezclado. La QA de rutas y tablas agotó el tiempo
  esperando `.udgia-table--comparison`, también fuera de los archivos de esta pieza.
- Reversión comprobada: `git apply -R --check` pasa tanto para la integración como para el ajuste de
  los verificadores.
- Revisión con una persona de la audiencia real: **pendiente**.
- El sitio fija actualmente `defaultAppearance = "light"` y desactiva el cambio automático; no
  existe un render oscuro de Hugo que verificar. El SVG usa fondo explícito y su contraste no depende
  del tema.

## Límite de autorización

La integración local quedó autorizada y aplicada. Continúan fuera de alcance `git add`, commit,
`push`, publicación, despliegue y cambios en Moodle. `publication_authorized` permanece en `false`.
