# UDGIA-021 — muestras visuales no integradas

**Estado:** prototipos locales para evaluación. No son activos públicos ni sustituyen ningún
`featured` existente. Requieren dos rondas, lector en frío, decisión de licencia/uso y VoBo
antes de integrarse.

## Activos

| Archivo | Función | Dimensiones / soporte | SHA-256 |
|---|---|---|---|
| `hero-editorial-cocreacion-v1.webp` | Dirección raster para entrada/co-creación | 1600×900, 281 KiB | `8ce3a085bf574a68841d0c6bf01b32e32c1820d2fe2c23211e06570cc884ff73` |
| `hero-editorial-cocreacion-mobile-v1.webp` | Re-composición móvil del mismo concepto | 900×1200, 217 KiB | `57846cd4db2b97199fecb505e5fc64e0dfa65d938e81316689d1c3349ec54ef0` |
| `hero-entrada-contextual-v2.webp` | Hero contextual para la entrada general | 1600×900, 190,190 bytes | `fbffc382ca5ab7eceb4d52be45f33c6d8f484f7e5300e4966ff9809ed7aa0d75` |
| `hero-entrada-contextual-mobile-v2.webp` | Recomposición móvil del caso ambiental | 900×1125, 143,968 bytes | `c54f20eccb96cefd4daf0e0ea31fc8823dec99d0fc69edc18d92aafd73bf8d6c` |
| `muestra-aprendizaje-hibrido.svg` | Explica continuidad funcional entre momentos | SVG 1600×900 | `33afd47bdc75574e117b7d0e5c2b94d7657de1ed8527952da36a73a2a7024be1` |
| `muestra-aprendizaje-hibrido-mobile.svg` | Variante móvil recompuesta con la misma relación | SVG 900×1200, `viewBox` 360×480 | `78abfc6fb9efff6710fb498d435def89765f435810b3870b49e6c3aab5d85bd4` |
| `comparador-cocreacion.svg` | Separa sugerencia, decisión, criterio y evidencia | SVG 960×1200, `viewBox` 640×800 | `79fac4a2fa3adfe1d15bd1359cc3756e81197892546bf264df91f0d473c8236f` |
| `acciones-aprendizaje-activo.svg` | Contrasta cuatro conductas sin jerarquía | SVG 960×1200, `viewBox` 640×800 | `f7085c22f1c6baa359c8592f08ca8290debf19ef96cb9d54aa7e9142235233c5` |
| `dos-lentes-samr-icap.svg` | Mantiene independientes transformación y conducta | SVG 960×1200, `viewBox` 640×800 | `4b7f7d2be5426d712c971b799419275fbfd070ff0269de568e717559e598fe8c` |
| `cadena-diseno-inverso.svg` | Conecta y permite revisar propósito, evidencia, experiencia y ayuda | SVG 960×1200, `viewBox` 640×800 | `fee968e75e7af76120c165e1d770419d27078b5273173cb14992eb49f2f7a2a9` |

## Escena editorial de comparación

**Función:** después de verla, la persona comprende que el trabajo consiste en comparar
versiones y evidencia, no en contemplar una herramienta.  
**Alt provisional:** “Tres integrantes de una comunidad universitaria comparan dos versiones
de un trabajo y señalan qué evidencia apoya cada cambio.”  
**Procedencia:** herramienta integrada `imagegen`, generación nueva, 2026-08-02. La variante
móvil se generó usando la primera imagen como referencia de estilo y acción.  
**Uso/licencia:** pendiente de decisión humana; no se asigna automáticamente CC BY-SA ni se
publica mientras siga como muestra.

**VoBo de dirección, 2026-08-02:** aprobada como referencia para entrada/co-creación, con
revisión posterior de representación y licencia. La siguiente versión debe reforzar tres
anclas para evitar “personas random”: problema o campo visible, evidencia concreta sobre la
mesa y decisión/consecuencia reconocible en los gestos y objetos.

### Prompt maestro

```text
Use case: illustration-story
Asset type: 16:9 website hero image and visual-direction sample for a public university learning site
Primary request: create a warm editorial illustration of three university community members comparing two versions of the same academic work and deciding which changes are supported by evidence
Scene/backdrop: contemporary public-university study space in central-western Mexico, plausible and understated, with a table, printed drafts, a notebook, a few source cards, and one ordinary laptop used only as a work surface
Subject: a young adult student, an educator, and a second student or colleague; diverse Mexican appearance without stereotypes; natural collaboration; hands point to differences, evidence, and annotations rather than to the screen
Style/medium: refined editorial illustration with subtle paper texture, human warmth, simplified realistic forms, coherent with a thoughtful academic publication; not photorealistic and not flat corporate vector art
Composition/framing: wide 16:9 composition; action remains legible in a centered mobile-safe zone; medium-wide, slightly elevated viewpoint; clear visual hierarchy; no empty decorative technology
Lighting/mood: soft natural daylight, reflective and engaged rather than celebratory
Color palette: warm paper, ink blue, almagre red, muted olive green, restrained ochre; moderate contrast; no neon
Materials/textures: paper fibers, pencil marks as abstract strokes only, worn wood, natural fabrics
Constraints: no readable text anywhere; no logos; no watermarks; no brands; no UI mockups; no scores; no arrows or labels; no futuristic elements; no folkloric costume; the main action must be comparing versions and evidence, not merely looking at a laptop
Avoid: glowing brains, robots, circuits, neural networks, holograms, floating screens, blue-purple neon, generic teamwork poses, handshakes, graduation caps, lightbulbs, puzzle pieces, stock-photo smiles, tiny pseudo-infographic text
```

### Prompt de variante móvil

```text
Use case: style-transfer
Asset type: 4:5 mobile companion crop for the same public-university website hero
Input images: Image 1 is the approved visual-direction reference; preserve its editorial illustration style, warm paper texture, palette, subject roles, and comparison-of-versions action
Primary request: recompose the same kind of scene for a vertical 4:5 mobile layout so all three university community members remain visible and the central action—comparing two versions and pointing to supporting evidence—is immediately clear
Scene/backdrop: the same understated contemporary public-university study space in central-western Mexico
Subject: the same functional trio: young adult student, educator, and second student or colleague; natural Mexican diversity without stereotypes; hands and gazes converge on two drafts and annotations
Style/medium: match Image 1's refined warm editorial illustration, paper texture, simplified realistic forms, and quiet academic mood
Composition/framing: vertical 4:5, medium shot, three people arranged around the table in a compact triangular composition; drafts and evidence occupy the lower center; no person cropped out; safe margins for mobile card use
Lighting/mood: soft natural daylight, reflective and engaged
Color palette: warm paper, ink blue, almagre red, muted olive, restrained ochre; no neon
Constraints: no readable text; no logos; no watermarks; no brands; no UI; no futuristic elements; preserve the educational action rather than merely showing people at a laptop
Avoid: robots, glowing brains, circuits, neural networks, holograms, floating screens, blue-purple neon, handshakes, graduation caps, lightbulbs, puzzle pieces, generic teamwork pose, stock smiles, tiny pseudo-infographic text
```

## Escena contextual de ciencias ambientales

**Función:** mostrar que una ayuda con IA se evalúa dentro de una situación disciplinar y que
la decisión depende de evidencia reconocible, no de la presencia de una pantalla.  
**Alt provisional:** “Dos estudiantes y una docente de ciencias ambientales comparan un mapa
de muestreo, una gráfica de resultados y dos versiones de una conclusión antes de decidir qué
puede sostener la evidencia.”  
**Procedencia:** herramienta integrada `imagegen`, generación nueva, 2026-08-02. La escena
anterior se usó solo como referencia de estilo editorial; no como contenido ni composición.
La variante móvil se generó como una nueva composición a partir de la escena amplia. Los PNG
originales permanecen en el directorio de resultados de la herramienta.  
**Uso/licencia:** pendiente de decisión humana; no se publica ni se asigna automáticamente
una licencia mientras siga como muestra.

### Prompt maestro contextual

```text
Use case: style-transfer
Asset type: 16:9 website hero and visual-direction sample for a public-university learning site
Input images: use the prior editorial scene only as a style reference for warm paper texture,
restrained ink-blue, almagre and olive palette, simplified realistic forms, and quiet academic
mood; create a completely new setting, action and composition
Primary request: illustrate a specific environmental-science decision in which two university
students and an educator compare water-quality evidence with two draft conclusions, deciding
which claim the evidence can support
Scene/backdrop: modest public-university environmental lab or field station in central-western
Mexico, with a real river landscape visible or mapped in the background
Subject/action: three people actively compare a river sampling map, labeled-by-color sample
bottles, a simple scatter plot, a field notebook and two printed draft conclusions; one draft
is visibly rejected with a large abstract cross while the other remains under review; hands
and gazes connect the evidence to the decision; an ordinary closed or secondary laptop stays
at the side
Style/medium: refined warm editorial illustration, subtle paper fibers and ink texture,
plausible instruments, human and observant, not photorealistic and not flat corporate vector
Composition/framing: wide 16:9, slightly elevated viewpoint, evidence occupies the foreground,
all three people remain inside a mobile-safe central zone, river context remains visible
Lighting/mood: soft natural daylight; concentrated, reflective, consequential rather than
celebratory
Color palette: warm paper, ink blue, almagre red, muted olive, restrained ochre; moderate
contrast; no neon
Constraints: no readable text, no logos, no watermark, no brands, no UI mockups, no scores,
no decorative AI symbolism; preserve scientific plausibility without implying that the
fictional data establish a real safety conclusion
Avoid: random people around a laptop, generic teamwork pose, stock smiles, robots, glowing
brains, circuits, neural networks, holograms, floating screens, blue-purple neon, graduation
caps, lightbulbs, puzzle pieces, tiny pseudo-infographic labels
```

### Prompt de recomposición móvil contextual

```text
Use case: style-transfer
Asset type: 4:5 mobile companion composition for the environmental-science website hero
Input images: preserve the wide scene's editorial medium, palette, people roles, water-quality
case and evidence; do not merely crop it
Primary request: recompose the same decision vertically so the field context, all three
people, sample bottles, river map, scatter plot, notebook and two draft conclusions remain
visible at mobile size
Scene/backdrop: the same modest public-university environmental lab or field station, with
river and map context in the upper field
Subject/action: the educator compares both drafts while the two students connect the map and
plot to the conclusion; the rejected draft remains clearly marked by an abstract cross
Style/medium: match the warm editorial illustration and paper texture of the wide scene
Composition/framing: vertical 4:5, compact triangular group, evidence arranged through the
center and lower half, safe margins, no person or decisive object cropped out
Lighting/mood: soft natural daylight, attentive and reflective
Constraints: no readable text, logos, watermarks, brands or UI; the visual must remain a
specific evidence-and-decision scene rather than generic collaboration
Avoid: random laptop gathering, stock pose, futuristic AI symbols, neon, decorative labels,
tiny pseudo-text
```

## Diagrama de aprendizaje híbrido

**Función:** después de verlo, la persona comprende que cada momento recibe y transforma un
producto del anterior; la modalidad no se reduce a repartir materiales.  
**Tipo:** SVG nativo, creado a partir del brief UDGIA-021; no se usó generación raster.  
**Alt/equivalente:** antes se formula un borrador y preguntas; durante el encuentro se
comparan razones, fuentes y alternativas; después se revisa y explica una versión con
razones. Si no existe encuentro sincrónico, un contraste asincrónico guiado conserva la misma
decisión y evidencia.  
**Procedencia:** diseño interno UDGIA-021, 2026-08-02.  
**Uso/licencia:** pendiente junto con el lote; no integrado.

## Familia de diagramas del segundo lote

**Función común:** hacer visibles relaciones conceptuales que una portada narrativa no puede
explicar: decisiones sobre sugerencias, conductas observables, dos lentes independientes y una
cadena de alineación revisable.  
**Procedencia:** SVG nativo UDGIA-021, 2026-08-02; no se usó generación raster.  
**Decisión móvil:** los cuatro usan `viewBox` 640×800, una sola columna o cuadrícula 2×2 y
texto comprobado en una rasterización de 320×400 px; no necesitan una segunda composición.  
**Uso/licencia:** pendientes junto con las muestras; no integrados.

## QA visual y observaciones de primera lectura

- Los raster cumplen el presupuesto inicial de 300 KiB y representan la acción acordada.
- Aunque no hay texto editorial incrustado, las hojas contienen trazos que simulan renglones;
  debe confirmarse a escala real que no parezcan pseudo-texto distractor.
- Los SVG son XML válido y tienen `title` y `desc`. La variante móvil no es un recorte: se
  recompuso y se verificó rasterizada a 320×427 px; sus textos y la relación principal siguen
  legibles.
- Contraste WCAG calculado: tinta/papel cálido 12.87:1; texto secundario/papel cálido 5.70:1;
  almagre/papel cálido 6.48:1; olivo/papel 6.35:1; ocre/papel 6.65:1; almagre/caja alternativa
  5.88:1. Todas las combinaciones de texto de la muestra superan 4.5:1.
- Falta probar los SVG dentro del tema Hugo; esta prueba queda fuera mientras sean activos no
  integrados.
- La escena muestra tres personas y no depende de futurismo; falta revisión humana de
  representación, plausibilidad y posibles estereotipos.
- Ningún activo se copia a `content/` antes del VoBo posterior.
