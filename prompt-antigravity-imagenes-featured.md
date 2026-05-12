# Prompt para Antigravity — generación de imágenes `featured.webp` con Nano Banana

> Plantilla reutilizable. Al cerrar cada tanda de artículos, copiar este archivo, llenar la sección **Tanda actual** con los artículos publicados y ejecutarlo en Antigravity. El agente genera las imágenes con Nano Banana (Gemini 2.5 Flash Image), las convierte a `.webp` y las coloca en la carpeta de cada Page Bundle.

---

## Contexto del sitio

Estás trabajando sobre el repo `aprendizaje-ia`, un sitio Hugo + Blowfish v2.97 del Programa de Aprendizaje Digital UDGplus (Universidad de Guadalajara). La audiencia son docentes y estudiantes universitarios. El sitio comparte guías, prácticas y estudios sobre inteligencia artificial en educación superior.

Cada artículo es un Leaf Bundle: una carpeta con `index.md` dentro. Blowfish detecta automáticamente cualquier archivo cuyo nombre comience con `featured` en la raíz del bundle y lo usa en cuatro lugares: card del homepage, thumbnail en listados de sección, hero del artículo y Open Graph para redes sociales.

---

## Objetivo

Para cada artículo listado en la sección **Tanda actual**, generar con Nano Banana una ilustración horizontal de 1200×630 px, convertirla a `.webp` y guardarla como `featured.webp` en la carpeta del Page Bundle correspondiente.

---

## Especificaciones técnicas

- **Modelo:** Gemini 2.5 Flash Image (Nano Banana).
- **Proporción:** 1200×630 px (estándar Open Graph).
- **Formato final:** `.webp`, calidad 85, peso objetivo inferior a 250 KB. Convertir desde el PNG original con `cwebp` o `ImageMagick`.
- **Nombre de archivo:** `featured.webp`.
- **Ubicación:** raíz del Page Bundle del artículo, al mismo nivel que `index.md`.
- **Reemplazo:** si ya existe un `featured.*` previo en la carpeta, renombrarlo a `featured-prev.<ext>` antes de guardar el nuevo.

---

## Lineamientos estéticos (válidos para toda imagen del sitio)

- Ilustración moderna, minimalista, editorial. Estilo vectorial plano o semi-plano con gradientes suaves.
- Sin texto embebido en la imagen. Sin logos, sin marcas de agua.
- Sin personas fotorrealistas. Si hay figuras humanas, mantenerlas esquemáticas o tipo silueta.
- Composición limpia, respiración visual, sin saturación de elementos.
- Coherencia con los hero SVG ya presentes en el sitio: red neuronal sutil, nodos conectados, redes de personas esquemáticas, geometría editorial.
- Evitar iconografía estereotípica de IA (cerebros con circuitos, robots humanoides, manos saliendo de pantallas, "The Creation of Adam" con androides).

### Paleta por sección

| Sección del sitio | Color dominante | Complementarios | Referencia visual |
|---|---|---|---|
| `ia-educacion/` | Índigo/violeta | azul profundo, blanco, acentos magenta | red neuronal abstracta |
| `formacion-docente/` | Verde esmeralda | verde menta, blanco, acentos amarillo cálido | red de personas esquemáticas |
| `laboratorio/` | Azul oceánico | cian, blanco, acentos coral | laboratorio/iteración |
| `observatorio/` | Azul oceánico | azul petróleo, blanco, acentos dorados | datos y observación |
| `recursos/` | Azul oceánico | azul cielo, blanco, acentos verdes | biblioteca/repositorio |
| `blog/` | Azul oceánico | flexible según tema | editorial |

La carpeta raíz del artículo determina la sección y por lo tanto la paleta base.

---

## Plantilla de prompt para Nano Banana

Para cada artículo, construye un prompt combinando los bloques [A], [B] y [C]:

**[A] Estilo base (fijo para todo el sitio)**

```
Modern editorial illustration, flat vector style with soft gradients, clean minimalist composition, generous white space, horizontal 1200x630 banner format, no embedded text, no logos, no watermark, no photorealistic people, no clichéd AI imagery such as brains with circuits or humanoid robots. Soft lighting, subtle geometric shapes, professional and calm tone suitable for an academic site about artificial intelligence in higher education.
```

**[B] Paleta según la sección**

- IA en educación: `Dominant indigo and violet palette with deep blue accents, thin magenta highlights, light neutral background.`
- Formación docente: `Dominant emerald green palette with mint accents, warm yellow highlights, light neutral background.`
- Laboratorio / Observatorio / Recursos / Blog: `Dominant ocean blue palette with cyan accents, coral or gold highlights, light neutral background.`

**[C] Concepto visual específico del artículo**

Descripción corta en inglés de la metáfora o escena. Se redacta por artículo en la **Tanda actual**. Ejemplos:

- `A stylised neural network diagram where nodes gradually transform into interconnected books, suggesting ethical deliberation about knowledge.`
- `Two abstract figures in dialogue over a flowing stream of data particles that bend around them, suggesting critical evaluation rather than passive reception.`
- `A magnifying glass hovering over a cluster of data points with some points softly highlighted to suggest hidden bias, set on a calm editorial background.`

Prompt final para Nano Banana = `[A] + " " + [B] + " " + [C]`.

---

## Pipeline de ejecución

Para cada artículo de la tabla **Tanda actual**, ejecutar:

1. Leer `slug`, `carpeta destino`, `sección` y `concepto visual`.
2. Construir el prompt final uniendo [A] + [B de la sección] + [C del artículo].
3. Llamar a Nano Banana con `aspect_ratio: "1200:630"` (o el más cercano disponible). Guardar el PNG temporal como `featured.png` en la carpeta destino.
4. Convertir a `.webp` con `cwebp -q 85 featured.png -o featured.webp` (o `magick featured.png -quality 85 featured.webp`). Verificar que el peso esté por debajo de 250 KB; si no, bajar calidad a 80 y repetir.
5. Borrar el PNG temporal.
6. Verificar con `identify featured.webp` (o equivalente) que la proporción final sea 1200×630 ±5 %. Si no, reencuadrar.
7. Registrar en un log (`imagenes-tanda-<fecha>.md`) la pareja `slug → prompt usado → ruta final`.

Si la imagen no cumple los lineamientos estéticos (demasiado saturada, con texto embebido, con cliché de IA), regenerar ajustando el bloque [C]. Máximo tres iteraciones por artículo; si persiste, marcar el artículo como pendiente de revisión manual en el log.

---

## Frontmatter — confirmación en cada artículo

Antes de cerrar la tanda, verificar que cada `index.md` incluya:

```yaml
showHero: true
```

No es necesario declarar la ruta de la imagen: Blowfish la detecta por nombre (`featured.*`). `heroStyle: "background"` se hereda de `hugo.toml`.

---

## Tanda actual — Productos de aprendizaje, Olas 1 + 2 + 3 + 4 + Gemini (cierre 2026-05-11)

> **Veintisiete páginas** (catálogo completo) publicadas en `content/ia-educacion/productos-de-aprendizaje/`. Todas comparten paleta (índigo/violeta de IA en educación). Procesar como un único lote. Registrar log en `imagenes-tanda-2026-05-11.md`.

### Lote único — Productos de aprendizaje (`content/ia-educacion/productos-de-aprendizaje/`)

Paleta `[B]`: `Dominant indigo and violet palette with deep blue accents, thin magenta highlights, light neutral background.`

Cada concepto visual está diseñado para reflejar la **metáfora pedagógica del producto** (proceso de pensamiento del estudiante con apoyo de IAG), no el objeto entregable.

| # | Slug | Carpeta destino | Concepto visual (bloque C, en inglés) |
|---|------|-----------------|----------------------------------------|
| 1 | ensayo | `content/ia-educacion/productos-de-aprendizaje/ensayo/` | `A central thesis node held in a calm clearing, surrounded by three translucent source documents linked to the node by labelled threads showing both convergence and conflict; soft halos around the central node suggest progressive iteration and refinement of an argument rather than a finished page. Editorial and contemplative composition.` |
| 2 | analisis-de-casos | `content/ia-educacion/productos-de-aprendizaje/analisis-de-casos/` | `Six translucent square panels arranged in a horizontal sequence, each holding a different abstract symbol — a question mark for problem definition, three branching paths for alternatives, a balanced scale for criteria, a softly highlighted point of light for the chosen decision, a small critical lens, and a stylised local map fragment — suggesting six phases of structured deliberation rather than a finished verdict.` |
| 3 | monografia | `content/ia-educacion/productos-de-aprendizaje/monografia/` | `A central topic node radiating gently into a constellation of subtopic clusters, each subtopic connected to small translucent document icons representing verified sources; thin threads explicitly label the relations among subtopics. Calm cartographic feel of a delimited territory rather than an exhaustive map.` |
| 4 | proyecto | `content/ia-educacion/productos-de-aprendizaje/proyecto/` | `Three diverging paths emerging from a single anchor point and converging again toward an upward-rising abstract scaffold; one of the converging paths is softly highlighted to suggest a justified choice among alternatives. Editorial blueprint-like composition with generous white space.` |
| 5 | presentacion | `content/ia-educacion/productos-de-aprendizaje/presentacion/` | `Three layered translucent horizontal slide-like cards staggered on a calm stage backdrop, with thin arrows of attention flowing between them and a soft cluster of question marks anticipated to one side. Suggests structure and dialogue with an audience rather than a finished slide deck.` |
| 6 | programacion | `content/ia-educacion/productos-de-aprendizaje/programacion/` | `Abstract horizontal stacks of stylised code-like rectangles connected by thin trace lines that fork and rejoin, with a soft circular spotlight hovering over one block highlighting a debugging moment; no readable text, no terminal or hoodie clichés. Calm, analytical, editorial.` |
| 7 | mapa-conceptual | `content/ia-educacion/productos-de-aprendizaje/mapa-conceptual/` | `A hierarchical structure of softly glowing nodes connected by labelled edges, with three clearly distinct levels of depth and a few diagonal cross-links suggesting non-trivial relations between branches; the central node sits in a calm cleared space. Cartographic editorial style, no text.` |
| 8 | investigacion-de-campo | `content/ia-educacion/productos-de-aprendizaje/investigacion-de-campo/` | `A calm scene where an abstract observer-figure sketches notes on a translucent clipboard while looking toward a small ecosystem of soft data points and human silhouettes in the distance; thin trace lines connect each observation back to a methods compass at the side. Suggests fieldwork and methodological choice, not laboratory.` |
| 9 | prototipo | `content/ia-educacion/productos-de-aprendizaje/prototipo/` | `Three successive translucent silhouettes of the same abstract artifact arranged in a gentle horizontal progression, each iteration slightly refined; thin annotation lines pointing to small changes between versions. Suggests iterative design rather than a polished final product.` |
| 10 | modelado-matematico | `content/ia-educacion/productos-de-aprendizaje/modelado-matematico/` | `An abstract flowing curve traced over a soft grid, with small variable nodes attached along its path by thin labelled threads, and a faint envelope around the curve suggesting sensitivity ranges; calm editorial mood, no readable equations.` |
| 11 | reporte-tecnico | `content/ia-educacion/productos-de-aprendizaje/reporte-tecnico/` | `A vertical stack of translucent document sections of varying heights, each carrying a small abstract glyph for figure, table or measurement, connected by a thin spine that suggests sequence and traceability; clean editorial layout with generous white space, no readable text.` |
| 12 | nota | `content/ia-educacion/productos-de-aprendizaje/nota/` | `A small translucent rectangular card resting on a clean editorial surface, with five tiny labelled markers (who, what, when, where, why) clustered around it like compass points and a soft halo of restraint suggesting economy of language; no readable text, no journal cliché.` |
| 13 | cronica | `content/ia-educacion/productos-de-aprendizaje/cronica/` | `A long horizontal scene of soft observed fragments — abstract silhouettes, doorways, a passing figure — woven by a thin meandering thread that loops back on itself once, suggesting a narrator returning over the observation; calm, atmospheric, no specific landmark.` |
| 14 | resena | `content/ia-educacion/productos-de-aprendizaje/resena/` | `A central translucent panel representing an abstract work, surrounded by three soft converging beams of light from different angles — each beam suggesting a distinct critical reading — with one beam slightly highlighted to indicate the author's stance; editorial composition, no readable title.` |
| 15 | entrevista | `content/ia-educacion/productos-de-aprendizaje/entrevista/` | `Two abstract seated figures facing each other across a calm space, with a soft cluster of question-shaped glyphs flowing from one figure toward the other and a thin recording line tracing along the bottom edge; respectful, attentive, no faces, no smartphones.` |
| 16 | articulo | `content/ia-educacion/productos-de-aprendizaje/articulo/` | `A central anchored manuscript icon held in a clearing, with a constellation of small verified-citation nodes connected back to it by thin solid threads; a few greyed-out floating dots in the periphery suggest unverified sources kept outside the circle. Calm academic composition, no readable text.` |
| 17 | planos-tecnicos | `content/ia-educacion/productos-de-aprendizaje/planos-tecnicos/` | `Three orthographic translucent silhouettes of an abstract part arranged in a clean technical grid, with thin connecting dimension lines bridging the three views and a small soft marker indicating cross-checking between vistas; no readable measurements, calm drafting feel.` |
| 18 | analisis-economico | `content/ia-educacion/productos-de-aprendizaje/analisis-economico/` | `A calm abstract sensitivity diagram: a horizontal stack of soft bars of different lengths radiating from a central decision point, each bar labelled with a tiny variable glyph and one bar gently highlighted to suggest a critical variable; no readable numbers, editorial feel.` |
| 19 | diseno-de-sistemas | `content/ia-educacion/productos-de-aprendizaje/diseno-de-sistemas/` | `An abstract system architecture diagram of softly glowing rectangular blocks at two layered levels, connected by thin clearly labelled interface lines, with a small spotlight near one interface suggesting a critical handoff; no readable text, calm blueprint composition.` |
| 20 | analisis-de-materiales | `content/ia-educacion/productos-de-aprendizaje/analisis-de-materiales/` | `An abstract micro-landscape of textured translucent layers and tiny crystalline patterns, with a small magnifying lens hovering over an anomalous region; no instrument silhouette, no microscope cliché, just a quiet analytical mood.` |
| 21 | automatizacion-industrial | `content/ia-educacion/productos-de-aprendizaje/automatizacion-industrial/` | `An abstract network of three softly glowing control nodes connected to sensor and actuator glyphs by thin lines, with a small protective shield motif near one node suggesting safety and OT cybersecurity awareness; no factory cliché, no robotic arm.` |
| 22 | metrologia | `content/ia-educacion/productos-de-aprendizaje/metrologia/` | `A horizontal calibration scale of translucent tick-like marks of varying weight, with a soft uncertainty envelope drawn around a measured point and a thin traceability chain extending sideways from it; calm, precise, no readable numbers.` |
| 23 | circuitos-electricos | `content/ia-educacion/productos-de-aprendizaje/circuitos-electricos/` | `An abstract loop of softly glowing nodes connected by thin lines suggesting a circuit topology, with a small overlay of two waveform-like curves softly compared side by side (calculation vs. simulation); no readable values, calm analytical mood.` |
| 24 | control-y-dinamica | `content/ia-educacion/productos-de-aprendizaje/control-y-dinamica/` | `A soft sigmoid-like response curve approaching a target line, with a thin envelope of uncertainty around it and small perturbation arrows tapping the curve from above; calm dynamic feel, no readable axes, no graph cliché.` |
| 25 | gestion-industrial | `content/ia-educacion/productos-de-aprendizaje/gestion-industrial/` | `An abstract value-stream-like horizontal flow of translucent process nodes connected by thin arrows, with one node slightly congested to suggest a bottleneck and small human-silhouette markers indicating stakeholders; calm, organisational, no factory cliché.` |
| 26 | investigacion-aplicada | `content/ia-educacion/productos-de-aprendizaje/investigacion-aplicada/` | `A calm bridge motif: an abstract theoretical cluster on the left, an applied context cluster on the right, connected by a soft translucent arc with small risk-marker dots along the arc; no readable text, suggests transferability rather than discovery.` |
| 27 | integracion-de-sistemas | `content/ia-educacion/productos-de-aprendizaje/integracion-de-sistemas/` | `Three abstract subsystem clusters of different shapes meeting at a central interface region, with thin labelled handshake lines between them and small softly glowing test markers at the boundaries; calm integration feel, no specific device.` |

### Instrucciones de ejecución para esta tanda

- Las veintisiete páginas ya tienen `showHero: true` en su `index.md` (redactadas el 2026-05-11); `heroStyle: "background"` se hereda de `hugo.toml`.
- Las veintisiete comparten paleta (índigo/violeta `ia-educacion/`) — un único bloque [B] para todas.
- Importante: estos productos hablan de **evaluación de procesos**, no del objeto entregable. El concepto visual debe sugerir el _camino de pensamiento_ y la interacción con IAG, no el producto físico (no libros cerrados, no pantallas de laptop, no slides con texto real, no ecuaciones legibles, no instrumentos fotográficos, no fábricas).
- Registrar log consolidado en `imagenes-tanda-2026-05-11.md` con los veintisiete registros (slug → prompt usado → ruta final → iteraciones).
- Al cerrar la tanda, confirmar: (a) veintisiete archivos `featured.webp` presentes, (b) ningún PNG temporal residual, (c) peso de cada archivo por debajo de 250 KB.

### Tandas posteriores previstas

Catálogo de 27 productos completado. Las próximas tandas no son del catálogo de productos de aprendizaje; al cerrarse esta sección, reemplazar este bloque con la próxima tanda planificada (otras secciones del sitio).

---

## Ejemplo lleno (para referencia)

| # | Slug | Sección | Carpeta destino | Concepto visual |
|---|------|---------|-----------------|------------------|
| 1 | marco-etico-ia-educacion-superior | ia-educacion | `content/ia-educacion/etica-y-transparencia/marco-etico-ia-educacion-superior/` | `A balanced scale where one pan holds abstract data nodes and the other holds a soft humanist figure, suggesting ethical equilibrium between algorithmic systems and human agency.` |
| 2 | plagio-autenticidad-era-ia | ia-educacion | `content/ia-educacion/etica-y-transparencia/plagio-autenticidad-era-ia/` | `A layered manuscript where successive translucent pages show the iterative trace of a student's thinking, with subtle marks of dialogue with an AI assistant, suggesting process and authorship rather than a finished product.` |
| 3 | sesgos-algoritmicos-equidad | ia-educacion | `content/ia-educacion/etica-y-transparencia/sesgos-algoritmicos-equidad/` | `A stylised data landscape where certain regions are softly shaded to suggest under-represented voices, with a magnifying glass over the shaded zone, indicating critical inspection of algorithmic bias.` |

---

## Entrega final de la tanda

Al terminar, el agente de Antigravity debe:

1. Confirmar que cada carpeta de la tabla contiene `featured.webp` y que `showHero: true` está en el front matter.
2. Generar `imagenes-tanda-<AAAA-MM-DD>.md` con el log de prompts usados por artículo.
3. Reportar en la conversación la lista de artículos procesados, los que requirieron más de una iteración y los que quedaron pendientes de revisión manual.
