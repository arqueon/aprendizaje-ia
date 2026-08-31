@AGENTS.md

# Contexto del proyecto: Aprendizaje Digital e IA (UDGplus)

## Qué es este sitio

Sitio web estático para **UDGplus / Universidad de Guadalajara** que comparte buenas prácticas, guías, estrategias, recursos y proyectos sobre aprendizaje digital e IA en educación universitaria. La IA en educación es **prioridad institucional urgente** en este momento.

- **Stack:** Hugo v0.157 extended + tema Blowfish v2.97.0 (módulo Go)
- **Deploy:** push a `main` → GitHub Actions → GitHub Pages (automático)
- **Idioma:** español, audiencia docente universitaria UDG

## Estructura de contenido

```
content/
├── ia-educacion/          ← PRIORITARIA (peso 1, primera en menú)
│   ├── guias/
│   ├── rutas/
│   ├── constelaciones/
│   ├── practicas/
│   ├── productos-de-aprendizaje/
│   ├── integracion-curricular/
│   ├── etica-y-transparencia/
│   ├── tendencias/
│   └── (páginas sueltas: orientaciones, investigacion, que-es-la-educacion-digital)
├── laboratorio/
│   ├── practicas/         ← cardView: true
│   ├── integracion-ia/
│   └── h5p-runtime/       (experiencias/ retirada)
├── observatorio/
│   ├── estudios/
│   ├── guias/
│   └── documentacion/
├── recursos/
│   ├── articulos/ videos/ links/   ← cardView: true
│   ├── glosario/
│   ├── institucionales/
│   └── (páginas sueltas: catálogo, comparativa LLM, política IA, prompts…)
├── formacion-docente/     ← páginas sueltas (alfabetizacion, formacion-continua, redes
│   │                        ya no son subsecciones sino page bundles individuales)
│   └── diseno-inverso-cocreacion-ia/   ← curso de 13 lecciones
├── blog/                  ← en el menú principal
└── areas/                 ← páginas de la taxonomía areas
```

## Configuración clave (hugo.toml)

- Identidad C con **dos apariencias** (rediseño 2026-08): `colorScheme = "udgplus-c"`,
  `defaultAppearance = "light"`, `autoSwitchAppearance = true` y selector activo
  (`footer.showAppearanceSwitcher = true`). Los tokens de ambos modos viven en
  `assets/css/custom.css` (`:root` claro, `html.dark` oscuro); acento primario **añil**
  (`#34508c` claro / `#8ba3d6` oscuro), rojo almagre reservado a `--udg-c-risk`.
  Titulares en **Newsreader** peso ~500 (Piazzolla retirada)
- Taxonomías: `tags`, `categories`, `areas` (ia, evaluacion, pedagogia, digital, formacion, etica)
- `mainSections = ["ia-educacion", "laboratorio", "observatorio", "recursos", "formacion-docente"]`
- Homepage: `showRecent = true`, `showRecentItems = 6`, `cardView = true`

## Arquetipos disponibles

`practica`, `articulo`, `link`, `video`, `opinion` — todos incluyen campo `areas`

## Layouts personalizados

- `layouts/partials/home/background.html` — homepage hero con recent articles
- `layouts/partials/extend-head.html` — declara `color-scheme: light dark`; la
  inicialización de apariencia la hace Blowfish (no purgar `localStorage.appearance`)
- `layouts/partials/hooks/head-end.html` — RETIRADO 2026-08 (Blowfish 2.97 nunca lo
  consumió: Font Awesome estuvo sin cargar en producción); FA se carga ahora en
  `extend-head.html`
- `layouts/shortcodes/card.html` + `cards.html` — usa **Font Awesome** (`fa-{icon}`), NO iconos nativos Blowfish
- `layouts/_markup/render-table.html` — sistema global Almagre para tablas Markdown:
  asigna variante editorial o matriz, mantiene desplazamiento móvil accesible y acepta
  `.udgia-table--comparison`, `.udgia-table--matrix`, `.udgia-table--row-headers` y
  `caption="…"` mediante atributos de bloque

## SVGs hero por sección — migrados a identidad C (2026-08)

Los heros, tarjetas (`static/images/cards/`) y `featured/default-almagre.svg` ya usan
las familias de la identidad; los `color=` de los shortcodes `card` en contenido siguen
el mismo mapa. Asignación por sección (mantener en gráficos nuevos):

| Sección / uso              | Familia cromática                  |
| -------------------------- | ---------------------------------- |
| Homepage, IA en Educación  | Añil (`#34508c` y rampa)           |
| Laboratorio                | Tinta desaturada (`#656f85` rampa) |
| Observatorio, marcos       | Ocre (`#b06a1f` rampa)             |
| Recursos                   | Almagre (`#b12028` rampa)          |
| Formación Docente          | Oliva (`#68762f` rampa)            |

## Shortcodes Blowfish en uso

| Shortcode                    | Dónde                                             |
| ---------------------------- | ------------------------------------------------- |
| `recurso-info` (custom)      | Artículos en recursos (automatiza metadata)       |
| `cards` / `card` (custom FA) | Homepage y secciones principales                  |
| `lead`                       | Intro de todas las secciones                      |
| `typeit`                     | ia-educacion/_index.md                            |
| `timeline` + `timelineItem`  | Prácticas del laboratorio                         |
| `keywordList` + `keyword`    | Herramientas en prácticas                         |
| `alert`                      | Notas pedagógicas importantes                     |
| `mermaid`                    | Diagramas (guías, recursos; ya no en homepage)    |
| `youtubeLite`                | Videos                                            |

## Shortcodes disponibles (no usados aún)

`chart` (sin ningún uso en contenido), `tabs` (contenido por audiencia), `gallery` (evidencias Laboratorio), `carousel`, `figure`, `badge`, `list`, `article`, `video`, `github`

## Criterios de figuras e interactivos (P1–P7, I1–I3)

Varas aprobadas para toda figura (P) e interactivo (I) nuevo o modificado:

- **P1** — dibujar el mecanismo, no una lista dibujada.
- **P2** — legible a 375px de ancho.
- **P3** — equivalencia textual real (no un alt decorativo).
- **P4** — autonomía de apariencia: SVG vía `<img>` lleva lienzo propio y funciona en dark;
  SVG inline usa los tokens CSS de la página.
- **P5** — familia cromática de su sección (ver tabla de identidad C).
- **P6** — oportunidad: la figura aparece donde la explicación la necesita.
- **P7** — no duplicar la tabla: si una tabla ya lo muestra, la figura no lo repite.
- **I1** — el interactivo exige un acto real del usuario (decidir, comparar, escribir).
- **I2** — retroalimentación contingente a la respuesta, sin calificación.
- **I3** — fallback textual equivalente completo (el shortcode `h5p` lo exige no vacío).

## Criterios de equilibrio de contenidos

- **≥4 hijas por subsección**; con menos, fusionar con otra subsección.
- **≥1 interactivo por subsección de guías** antes de añadir el interactivo n+1 al curso.
- **Hub**: mínimo 150 palabras de prosa + enlaces a todas sus hijas.
- **Vocabulario de formatos cerrado** (~10 formatos; hoy en uso: guia, practica, ruta,
  plantilla, producto, concepto, evidencia, entrada, más curso/lección y glosario): no
  inventar formatos nuevos sin decisión editorial.

## QA sistémica

- `npm run qa:routes-tables` — valida “Elige tu ruta” en inicio e IA, tablas globales en
  raíz/subruta y móvil/escritorio, contraste, axe, enlaces y ausencia de deriva H5P.
- Las tablas sin atributos reciben el patrón global. Declara variante y caption solo cuando
  aporten semántica; no reescribas el contenido como tarjetas móviles ni conviertas tablas
  en imágenes.

## Estado del contenido

El estado (qué está desarrollado y qué es stub) se lleva **fuera del repo**, en la bitácora
del proyecto — este archivo solo guarda reglas estables. Verificar el contenido real en
`content/` antes de asumir qué existe.

## Convenciones — NO romper sin consultar

1. **IA en Educación siempre primero** — peso 1, primera en menú y homepage
2. **Iconos en `card` shortcode son Font Awesome** — el shortcode es custom, no usa iconos Blowfish
3. **`_vendor/` nunca se commitea** — está en .gitignore; el tema se descarga vía Go modules en CI
4. **Deploy automático** al pushear a `main` — confirmar antes de cambios estructurales grandes
5. **Taxonomía `areas`** en todo contenido nuevo: ia, evaluacion, pedagogia, digital, formacion,
   etica — `etica` se incorporó en la auditoría de 2026-04-26 y se documenta aquí en 2026-08-27
6. **Identidad C en gráficos nuevos o modificados** — usar solo las familias de la
   identidad (añil, tinta, ocre, almagre, oliva sobre papel/noche) según la tabla de
   secciones. Los SVG servidos vía `<img>` no reciben las variables CSS de la página:
   deben funcionar sobre ambos modos por sí mismos (fondo nocturno propio) o inlinearse.
7. **Imagen `featured.*` obligatoria** en todo artículo nuevo:
   - Colocar un archivo `featured.webp` (o `.png`) en la raíz del Page Bundle, junto al `index.md`
   - Blowfish la detecta automáticamente para: cards del homepage, listados de sección, hero del artículo y Open Graph
   - Estilo recomendado: ilustración moderna, minimalista, gradientes suaves, sin texto embebido, ~1200×630px
   - Incluir `showHero: true` en el front matter (el `heroStyle: "background"` se hereda de `hugo.toml`)
   - Estructura mínima:
     ```
     content/seccion/mi-articulo/
     ├── index.md        ← showHero: true
     └── featured.webp   ← thumbnail + hero + OG image
     ```
8. **Sin referencias internas en páginas públicas** — el repositorio es público. No incluir en el contenido menciones ni enlaces a archivos de planificación internos (p. ej. `plan-*.md`), rutas locales (`~/`, `/home/…`), servidores propios ni documentos privados. El marco o la fuente se integran en el propio texto o se enlazan a un recurso público; nunca como "ver `archivo-interno.md`". Aplica también a comentarios del front matter (se ven en GitHub).
