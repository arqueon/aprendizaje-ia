# Rollback — Lote 02B

**Fecha:** 2026-08-23  
**Alcance:** contrato visual, cards tipadas y piloto de `/ia-educacion/guias/profesorado/`.

## Copias exactas previas

| Archivo | Snapshot | SHA-256 |
|---|---|---|
| `content/ia-educacion/guias/profesorado/index.md` | `rollback/2026-08-23-lote-02b/profesorado-index.before.md` | `85ae7b9f018acc7aca0807b8869fda592e1dc2c584e8e54760eb581416603002` |
| `layouts/partials/related.html` | `rollback/2026-08-23-lote-02b/related.before.html` | `690b30bcb2d870d3bdb0a627b53e77c99a1ac3312f07064ddf5d1a897a885b3a` |
| `hugo.toml` | `rollback/2026-08-23-lote-02b/hugo.before.toml` | `8059e6e802b5d30fc49da51c312fb7ef93cb49f7e38e0b3f74d5db29b4fa2bd1` |
| `package.json` | `rollback/2026-08-23-lote-02b/package.before.json` | `7ab10c8cbe60b31b26bd565f592fbbc3fd6e8dc7089a7a6858683952dc5adc3e` |

## Reversión local completa

Ejecutar solo dentro de una copia de trabajo revisada:

```bash
cp docs/editorial/lotes/rollback/2026-08-23-lote-02b/profesorado-index.before.md content/ia-educacion/guias/profesorado/index.md
cp docs/editorial/lotes/rollback/2026-08-23-lote-02b/related.before.html layouts/partials/related.html
cp docs/editorial/lotes/rollback/2026-08-23-lote-02b/hugo.before.toml hugo.toml
cp docs/editorial/lotes/rollback/2026-08-23-lote-02b/package.before.json package.json
rm -f content/ia-educacion/guias/profesorado/featured.svg
rm -f layouts/partials/udgia/featured-url.html
rm -f layouts/partials/udgia/connection-card.html
rm -f assets/images/featured/default-almagre.svg
rm -f static/js/udgia-embed-resize.js
rm -f tools/qa-visual-contract.mjs
rm -f tools/qa-profesorado-pilot.mjs
rm -f data/editorial/visual-contract.json
npm run content:inventory
npm run content:learning-audit
npm run qa:content-inventory
npm run qa:learning-audit
hugo --minify
```

Los informes y snapshots de rollback pueden conservarse como evidencia histórica. La reversión no se ha ejecutado.
