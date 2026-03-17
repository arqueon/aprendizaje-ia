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

- `colorScheme = "ocean"`, `defaultTheme = "light"`
- Taxonomías: `tags`, `categories`, `areas` (ia, evaluacion, pedagogia, digital, formacion)
- `mainSections = ["ia-educacion", "laboratorio", "observatorio", "recursos", "formacion-docente"]`
- Homepage: `showRecent = true`, `showRecentItems = 6`, `cardView = true`

## Arquetipos disponibles

`practica`, `articulo`, `link`, `video`, `opinion` — todos incluyen campo `areas`

## Layouts personalizados

- `layouts/partials/home/background.html` — homepage hero con recent articles
- `layouts/partials/hooks/head-end.html` — inyecta Font Awesome 6.4.0 CDN
- `layouts/shortcodes/card.html` + `cards.html` — usa **Font Awesome** (`fa-{icon}`), NO iconos nativos Blowfish

## SVGs hero por sección

| Archivo | Sección | Color |
|---|---|---|
| `hero-bg.svg` | Homepage | Azul oceánico |
| `hero-ia.svg` | IA en Educación | Índigo/violeta (red neuronal) |
| `hero-formacion.svg` | Formación Docente | Verde esmeralda (red de personas) |
| `hero-laboratorio.svg` | Laboratorio | Azul |
| `hero-observatorio.svg` | Observatorio | Azul |
| `hero-recursos.svg` | Recursos | Azul |

## Shortcodes Blowfish en uso

| Shortcode | Dónde |
|---|---|
| `cards` / `card` (custom FA) | Homepage y secciones principales |
| `lead` | Intro de todas las secciones |
| `typeit` | ia-educacion/_index.md |
| `timeline` + `timelineItem` | Prácticas del laboratorio |
| `keywordList` + `keyword` | Herramientas en prácticas |
| `alert` | Notas pedagógicas importantes |
| `mermaid` | Diagramas (homepage) |
| `youtubeLite` | Videos |

## Shortcodes disponibles (no usados aún)

`chart` (ideal Observatorio), `tabs` (contenido por audiencia), `gallery` (evidencias Laboratorio), `carousel`, `figure`, `badge`, `list`, `article`, `video`, `github`

## Estado del contenido

**Desarrollado:** debate socrático con IA, encuesta DEC 2026, artículo Bearman et al., link UNESCO, video Sal Khan, post blog "La IA No Hace Trampa".

**Stubs pendientes:** ia-educacion/guias, ia-educacion/integracion-curricular, ia-educacion/tendencias, laboratorio/experiencias, laboratorio/integracion-ia, observatorio/guias, observatorio/documentacion, recursos/externas, recursos/institucionales, formacion-docente/\* (todas).

## Convenciones — NO romper sin consultar

1. **IA en Educación siempre primero** — peso 1, primera en menú y homepage
2. **Iconos en `card` shortcode son Font Awesome** — el shortcode es custom, no usa iconos Blowfish
3. **`_vendor/` nunca se commitea** — está en .gitignore; el tema se descarga vía Go modules en CI
4. **Deploy automático** al pushear a `main` — confirmar antes de cambios estructurales grandes
5. **Taxonomía `areas`** en todo contenido nuevo: ia, evaluacion, pedagogia, digital, formacion
6. **SVG hero índigo** para IA, **verde** para Formación, **azul** para el resto
