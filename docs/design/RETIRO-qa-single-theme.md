# Retiro de `tools/qa-single-theme.mjs` (2026-08-28)

Se retira la herramienta. No se corrige: su premisa entera dejó de ser cierta.

## Por qué

`qa-single-theme.mjs` se escribió el 2026-07-26 con el commit «feat: fijar identidad C
**única** en Hugo». Verificaba que el sitio tuviera **una sola apariencia**. El rediseño
Almagre del 2026-08-23 (`f41f795`) introdujo dos, y nadie reescribió la herramienta.

Desde entonces sus aserciones afirmaban lo contrario de lo implementado:

| Línea | Exigía | Realidad desde agosto |
| --- | --- | --- |
| `:512` | `autoSwitchAppearance = "false"` | `true` (`hugo.toml:47`) |
| `:514` | cero selectores de apariencia | selector activo (`hugo.toml:95`) |
| `:517` | primario almagre `177, 32, 40` | añil `92, 122, 180` |
| `:519`, `:522` | fuente Piazzolla cargada | Newsreader; Piazzolla no existe en `static/fonts/` |
| `:58-59` | `piazzolla-*.woff2` | archivos inexistentes → 404 |
| `:578` | **prohibía** `prefers-color-scheme` en SVG | `CLAUDE.md` convención 6 ahora lo **exige** |

No estaba cableada en `package.json` ni en ningún workflow, de modo que nunca se ejecutó y
nadie noto la contradicción. Además habría fallado antes de llegar a sus aserciones: hace
`require("playwright")` cuando la dependencia declarada es `playwright-core`.

## Qué cubre ahora la apariencia

La cobertura no se pierde; pasa a herramientas que sí corren en CI:

- `qa:routes-tables` — desde 2026-08-28 ejercita portada e IA en Educación **en claro y en
  oscuro**, con axe, contraste, overflow y enlaces, en raíz y en subruta.
- `qa:course-rise` — cuatro escenarios: escritorio y móvil × claro y oscuro.
- `qa:shortcode-library` — renderiza la biblioteca de shortcodes en ambos modos.
- `qa:h5p` — verifica que el runtime H5P **adopte** la apariencia del documento padre
  (`appearanceFollowsHost`), aserción que sustituyó a la antigua `noDarkVariant`.

## Lección

Es el caso extremo de un patrón que la auditoría del 2026-08-27 encontró cinco veces: una
aserción que codifica **el estado del día en que se escribió**, no una invariante. Cuando la
decisión cambia y nadie reescribe la guarda, la comprobación queda mintiendo. Y si además no
corre en CI, miente en silencio durante meses.

**Regla derivada:** toda decisión que cambie el estado del sitio obliga a reescribir su
guarda en el mismo commit. Si la guarda ya no puede expresarse como invariante, se retira con
un documento como éste, no se deja apagada.
