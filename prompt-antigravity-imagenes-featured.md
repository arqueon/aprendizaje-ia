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

## Tanda actual — Ética y Transparencia + Recursos institucionales (cierre 2026-04-22)

> Seis guías publicadas en dos subrutas. Procesar los seis artículos con el pipeline. Las paletas difieren por sección: índigo/violeta para `ia-educacion/`, azul oceánico para `recursos/`. Registrar log único en `imagenes-tanda-2026-04-22.md`.

### Lote A — Ética y Transparencia (`content/ia-educacion/etica-y-transparencia/`)

Paleta `[B]`: `Dominant indigo and violet palette with deep blue accents, thin magenta highlights, light neutral background.`

| # | Slug | Carpeta destino | Concepto visual (bloque C, en inglés) |
|---|------|-----------------|----------------------------------------|
| 1 | marco-etico-ia-educacion-superior | `content/ia-educacion/etica-y-transparencia/marco-etico-ia-educacion-superior/` | `Four translucent geometric panels arranged around a central calm space, each panel showing a different abstract symbol — a compass, a transparent window, a mosaic of diverse small shapes, and a pair of hands balancing a disc — suggesting four principles in dialogue rather than a hierarchy. Editorial and serene composition.` |
| 2 | plagio-autenticidad-era-ia | `content/ia-educacion/etica-y-transparencia/plagio-autenticidad-era-ia/` | `A stack of translucent document pages in sequence, each slightly offset to reveal annotations and thin trace lines connecting them, with a soft highlighted path running across all the pages, suggesting the traceability of a writing process rather than a single finished product.` |
| 3 | sesgos-algoritmicos-equidad | `content/ia-educacion/etica-y-transparencia/sesgos-algoritmicos-equidad/` | `An abstract data landscape of small clustered points forming a soft topography, with certain regions visibly sparser than others and a magnifying glass gently hovering over the sparse zone, suggesting critical inspection of what is missing from the data rather than denunciation.` |

### Lote B — Recursos institucionales (`content/recursos/`)

Paleta `[B]`: `Dominant ocean blue palette with cyan accents, coral or gold highlights, light neutral background.`

| # | Slug | Carpeta destino | Concepto visual (bloque C, en inglés) |
|---|------|-----------------|----------------------------------------|
| 4 | politica-ia-udeg | `content/recursos/politica-ia-udeg/` | `A calm editorial composition of seven translucent overlapping circles of varying sizes forming a loose constellation, with thin connecting lines that suggest cyclical revision rather than hierarchy; a subtle spiral undertone indicating that the framework revisits itself over time.` |
| 5 | repositorio-prompts-docentes | `content/recursos/repositorio-prompts-docentes/` | `Four stacked translucent index-card panels arranged in a gentle fan, each showing abstract line shapes that hint at a different pedagogical phase — activity design, formative assessment, feedback, and rubric — with soft connecting threads that suggest an iterative cycle rather than isolated templates.` |
| 6 | catalogo-herramientas-ia | `content/recursos/catalogo-herramientas-ia/` | `A minimalist grid of softly glowing rectangular tiles of different sizes forming an abstract matrix, with a few tiles gently highlighted to suggest selection by multiple criteria, set on a calm neutral background; evokes a curated comparative catalogue rather than a crowded product list.` |

### Instrucciones de ejecución para esta tanda

- Los seis artículos ya tienen `showHero: true` y `heroStyle: "background"` en su `index.md` (redactados el 2026-04-22).
- Procesar primero el Lote A con paleta índigo/violeta, luego el Lote B con paleta azul oceánico.
- Registrar el log consolidado en `imagenes-tanda-2026-04-22.md` con los seis registros (slug → prompt usado → ruta final → iteraciones).
- Al cerrar la tanda, confirmar: (a) seis archivos `featured.webp` presentes, (b) ningún PNG temporal residual, (c) peso de cada archivo por debajo de 250 KB.

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
