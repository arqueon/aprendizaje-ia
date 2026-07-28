import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const metadata = JSON.parse(fs.readFileSync(path.join(root, 'data', 'udgia_figures.json'), 'utf8'));
const targets = {
  'udgia-f04-disociacion': {
    page: 'content/observatorio/estudios/paradoja-descarga-cognitiva/index.md',
    svg: 'content/observatorio/estudios/paradoja-descarga-cognitiva/disociacion-desempeno-aprendizaje.svg',
    mobileSvg: 'content/observatorio/estudios/paradoja-descarga-cognitiva/disociacion-desempeno-aprendizaje-mobile.svg',
    fallbackSignal: '| Condición |',
  },
  'udgia-f05-cocreacion': {
    page: 'content/ia-educacion/guias/agenciamiento-humano-ia/index.md',
    svg: 'content/ia-educacion/guias/agenciamiento-humano-ia/cocreacion-dos-desenlaces.svg',
    mobileSvg: 'content/ia-educacion/guias/agenciamiento-humano-ia/cocreacion-dos-desenlaces-mobile.svg',
    fallbackSignal: '| Decisión de la persona |',
  },
  'udgia-f09-instrumentos': {
    page: 'content/ia-educacion/guias/evaluacion-formativa-ia/index.md',
    svg: 'content/ia-educacion/guias/evaluacion-formativa-ia/instrumentos-evaluacion-proceso.svg',
    mobileSvg: 'content/ia-educacion/guias/evaluacion-formativa-ia/instrumentos-evaluacion-proceso-mobile.svg',
    fallbackSignal: '| Instrumento |',
  },
};
const failures = [];

if (Object.keys(metadata).length !== 3) failures.push('el manifiesto no contiene tres figuras');

for (const [id, target] of Object.entries(targets)) {
  const meta = metadata[id];
  if (!meta) {
    failures.push(`${id}: falta metadata`);
    continue;
  }
  const page = fs.readFileSync(path.join(root, target.page), 'utf8');
  const svg = fs.readFileSync(path.join(root, target.svg), 'utf8');
  const mobileSvg = fs.readFileSync(path.join(root, target.mobileSvg), 'utf8');
  const digest = crypto.createHash('sha256').update(svg).digest('hex');
  const mobileDigest = crypto.createHash('sha256').update(mobileSvg).digest('hex');

  if (!page.includes(`udgia-figure id="${id}"`)) failures.push(`${id}: falta shortcode`);
  if (!page.includes('{{< /udgia-figure >}}') || !page.includes(target.fallbackSignal)) {
    failures.push(`${id}: falta fallback textual`);
  }
  if (digest !== meta.variant_sha256) failures.push(`${id}: checksum de variante`);
  if (mobileDigest !== meta.mobile_variant_sha256) failures.push(`${id}: checksum de variante móvil`);
  if (path.basename(target.mobileSvg) !== meta.src_mobile) failures.push(`${id}: ruta de variante móvil`);
  if (
    !/^[a-f0-9]{64}$/.test(meta.source_sha256)
    || !meta.source_version
    || !meta.alt
    || !meta.caption
    || !meta.license
    || meta.publication_authorized !== false
  ) {
    failures.push(`${id}: procedencia o alternativa incompleta`);
  }
  for (const [variant, source] of [['escritorio', svg], ['móvil', mobileSvg]]) {
    for (const [label, pattern] of [
      ['role', /\brole=["']img["']/],
      ['title', /<title\b/],
      ['desc', /<desc\b/],
      ['aria-labelledby', /\baria-labelledby=/],
      ['viewBox', /\bviewBox=/],
    ]) {
      if (!pattern.test(source)) failures.push(`${id} ${variant}: falta ${label}`);
    }
    if (
      /<script\b|<foreignObject\b|<image\b/i.test(source)
      || /(?:href|src)=["'](?:https?:)?\/\//i.test(source)
      || /url\(\s*["']?https?:\/\//i.test(source)
    ) {
      failures.push(`${id} ${variant}: recurso o código externo`);
    }
    if (/§\d/.test(source)) failures.push(`${id} ${variant}: referencia interna de Orientaciones`);
  }
}

const css = fs.readFileSync(path.join(root, 'assets', 'css', 'custom.css'), 'utf8');
const shortcode = fs.readFileSync(path.join(root, 'layouts', 'shortcodes', 'udgia-figure.html'), 'utf8');
for (const signal of ['--udgia-figure-width', 'scroll-margin-top', '@media print', ':focus-visible']) {
  if (!css.includes(signal)) failures.push(`CSS: falta ${signal}`);
}
for (const signal of ['tabindex="0"', '<picture>', 'srcset=', '.Inner', 'data-mobile-variant-sha256', 'hugo.Data']) {
  if (!shortcode.includes(signal)) failures.push(`shortcode: falta ${signal}`);
}
if (shortcode.includes('target="_blank"')) failures.push('shortcode: abre pestaña nueva sin necesidad');
if (shortcode.includes('.Site.Data')) failures.push('shortcode: usa API de datos obsoleta');

if (failures.length) {
  console.error(`FAIL: ${failures.join('; ')}`);
  process.exit(1);
}

console.log('PASS: 3 figuras × 2 variantes, procedencia, fallback, checksums, semántica y cero recursos externos.');
