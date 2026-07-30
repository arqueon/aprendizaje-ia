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
│   ├── integracion-curricular/
│   ├── etica-y-transparencia/
│   └── tendencias/
├── laboratorio/
│   ├── practicas/         ← cardView: true
│   ├── experiencias/
│   └── integracion-ia/
├── observatorio/
│   ├── estudios/
│   ├── guias/
│   └── documentacion/
├── recursos/
│   ├── articulos/         ← cardView: true
│   ├── videos/            ← cardView: true
│   └── links/             ← cardView: true
├── formacion-docente/
│   ├── alfabetizacion/
│   ├── formacion-continua/
│   └── redes/
└── blog/
```

## Configuración clave (hugo.toml)

- Identidad única C: `colorScheme = "udgplus-c"`, `defaultAppearance = "light"` como
  valor técnico, `autoSwitchAppearance = false` y selector de apariencia desactivado
- Taxonomías: `tags`, `categories`, `areas` (ia, evaluacion, pedagogia, digital, formacion)
- `mainSections = ["ia-educacion", "laboratorio", "observatorio", "recursos", "formacion-docente"]`
- Homepage: `showRecent = true`, `showRecentItems = 6`, `cardView = true`

## Arquetipos disponibles

`practica`, `articulo`, `link`, `video`, `opinion` — todos incluyen campo `areas`

## Layouts personalizados

- `layouts/partials/home/background.html` — homepage hero con recent articles
- `layouts/partials/extend-head.html` — fija la identidad C y elimina preferencias de
  apariencia heredadas antes de pintar la página
- `layouts/partials/hooks/head-end.html` — parcial legado que Blowfish 2.97 no consume;
  no usarlo como punto de extensión
- `layouts/shortcodes/card.html` + `cards.html` — usa **Font Awesome** (`fa-{icon}`), NO iconos nativos Blowfish
- `layouts/_markup/render-table.html` — sistema global Almagre para tablas Markdown:
  asigna variante editorial o matriz, mantiene desplazamiento móvil accesible y acepta
  `.udgia-table--comparison`, `.udgia-table--matrix`, `.udgia-table--row-headers` y
  `caption="…"` mediante atributos de bloque

## SVGs hero por sección — inventario legado

Estas ilustraciones anteceden a la identidad C y deben migrarse mediante revisión visual,
no con sustituciones cromáticas automáticas.

| Archivo                 | Sección           | Estado cromático heredado         |
| ----------------------- | ----------------- | --------------------------------- |
| `hero-bg.svg`           | Homepage          | Azul oceánico                     |
| `hero-ia.svg`           | IA en Educación   | Índigo/violeta (red neuronal)     |
| `hero-formacion.svg`    | Formación Docente | Verde esmeralda (red de personas) |
| `hero-laboratorio.svg`  | Laboratorio       | Azul                              |
| `hero-observatorio.svg` | Observatorio      | Azul                              |
| `hero-recursos.svg`     | Recursos          | Azul                              |

## Shortcodes Blowfish en uso

| Shortcode                    | Dónde                                             |
| ---------------------------- | ------------------------------------------------- |
| `recurso-info` (custom)      | Artículos en recursos (automatiza metadata)       |
| `chart`                      | Observatorio (visualización de datos interactiva) |
| `cards` / `card` (custom FA) | Homepage y secciones principales                  |
| `lead`                       | Intro de todas las secciones                      |
| `typeit`                     | ia-educacion/_index.md                            |
| `timeline` + `timelineItem`  | Prácticas del laboratorio                         |
| `keywordList` + `keyword`    | Herramientas en prácticas                         |
| `alert`                      | Notas pedagógicas importantes                     |
| `mermaid`                    | Diagramas (homepage)                              |
| `youtubeLite`                | Videos                                            |

## Shortcodes disponibles (no usados aún)

`tabs` (contenido por audiencia), `gallery` (evidencias Laboratorio), `carousel`, `figure`, `badge`, `list`, `article`, `video`, `github`

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
5. **Taxonomía `areas`** en todo contenido nuevo: ia, evaluacion, pedagogia, digital, formacion
6. **Identidad C única en gráficos nuevos o modificados** — usar papel, tinta marina,
   almagre, olivo y ocre; no añadir bifurcaciones `prefers-color-scheme`. Los SVG hero
   heredados se migrarán de forma explícita y semántica.
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
