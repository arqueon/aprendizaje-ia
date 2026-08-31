import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const metadata = JSON.parse(fs.readFileSync(path.join(root, 'data', 'udgia_figures.json'), 'utf8'));
const expectedAttribution = 'Aprendizaje Digital e IA (UDGPlus), Universidad de Guadalajara';
const expectedEditorialScope = 'Material editorial del proyecto; no constituye un dictamen institucional.';
// Resincronización 2026-08-30: la autoridad IAorientaciones publicó la generación
// v0.12 (revisión abbcafc) que reescribió ocho de las figuras compartidas (F5 se sumó
// por extensión del encargo el mismo día). El anclaje es por figura: las ocho
// refrescadas apuntan a la revisión nueva; F7 permanece anclada a su estado previo
// porque es byte-idéntica en ambas revisiones.
const canonicalSources = {
  'udgia-f04-disociacion': { version: '0.12-consolidado-con-original', revision: 'abbcafc0b1f2832238153417b0bb917eb6b4a24e', svg: '6771ba63fb596874ea5110a6c093d9ff1321266f8dfafc8c1bb60e695f88fcfa', description: '2af7565fb04313fcb2fae4b15ff360d046280fe1844f475bba1d7ca07154780c' },
  'udgia-f05-cocreacion': { version: '0.12-consolidado-con-original', revision: 'abbcafc0b1f2832238153417b0bb917eb6b4a24e', svg: '30ced8f8c20517aa24dbd19741def0f2ad445f934a00b87e96808266ccec53ad', description: '411e3bc13e5923c135bf8a0d5e315457fef423061f69c999072500e4e178dfff' },
  'udgia-f09-instrumentos': { version: '0.12-consolidado-con-original', revision: 'abbcafc0b1f2832238153417b0bb917eb6b4a24e', svg: '9d5739b03ad4aa83937a4621b48f929ad49b13835aa27919cf18150cffe8699d', description: '2489684c9482d1a3e7b5969af0517ac1323bc028c329def315307e35fd828f7a' },
  'udgia-f01-trayectoria': { version: '0.12-consolidado-con-original', revision: 'abbcafc0b1f2832238153417b0bb917eb6b4a24e', svg: '9a4f1392fe9cd3bc022ec40c8dcbb4ff05c064acaefa2a10b17ddeeb0f0d6205', description: '99793eed38eb9c23f12853d14b52d79cda17f4e262bc30966c6b4f8a629ef67d' },
  'udgia-f03-principios': { version: '0.12-consolidado-con-original', revision: 'abbcafc0b1f2832238153417b0bb917eb6b4a24e', svg: '3b6fc4f00782e8ae9b0b8f2d6e69d8be87922c0ce9305cfc20d6400120576ae2', description: '7398313ba7b21439212613240bbe2ae03a3ea17914cd05023a634dadf23a4ef4' },
  'udgia-f07-dialogo': { version: '1.0.0-lote2', revision: '0331dfec00b47d2138641b0cdd3b6c8c56b9c345', svg: '31fa0ac382ef42bffcc4423c3ef26b1649821efdaebf1286d62c6de7be47ded8', description: '1504294f024b321ebb128aa5396e5f380495bddc4470526987790acc36944182' },
  'udgia-f08-producto-proceso': { version: '0.12-consolidado-con-original', revision: 'abbcafc0b1f2832238153417b0bb917eb6b4a24e', svg: 'd47ecd06a76a42d52d8bd1a60b2d459d6791f408f5379ca1ab646fd2f47cdbaf', description: 'd068d1fc6309cf6884bcf237d2eba24f5607af16a99af1c06c50fae33ae15233' },
  'udgia-f11-politica-capas': { version: '0.12-consolidado-con-original', revision: 'abbcafc0b1f2832238153417b0bb917eb6b4a24e', svg: 'c8ebc4b04c1e9212e0f8f34a817cd0420506e77aaaaf402672fcf7d33e85d234', description: 'ee13639ce63eea7710f1a61c0a652f7ee865785441128022936a90145c81d1c6' },
  'udgia-f17-priorizacion': { version: '0.12-consolidado-con-original', revision: 'abbcafc0b1f2832238153417b0bb917eb6b4a24e', svg: '20e738aa1e3085ccb76207f5b45a921fbaeb0ae91682f417b5406f8685ed518f', description: '9740094bac5bd1291f966a1a35967c8db60aaa5cb2c08663e52fa02892fff483' },
};
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
    fallbackSignal: '| Manera de conocer |',
  },
  'udgia-f01-trayectoria': {
    page: 'content/ia-educacion/rutas/coordinacion-academica/index.md',
    svg: 'content/ia-educacion/rutas/coordinacion-academica/trayectoria-habilitar-integrar.svg',
    mobileSvg: 'content/ia-educacion/rutas/coordinacion-academica/trayectoria-habilitar-integrar-mobile.svg',
    fallbackSignal: '| Etapa |',
  },
  'udgia-f03-principios': {
    page: 'content/ia-educacion/guias/lineamientos-eticos-ia/index.md',
    svg: 'content/ia-educacion/guias/lineamientos-eticos-ia/principios-rectores.svg',
    mobileSvg: 'content/ia-educacion/guias/lineamientos-eticos-ia/principios-rectores-mobile.svg',
    fallbackSignal: '| Criterio de decisión |',
  },
  'udgia-f07-dialogo': {
    page: 'content/ia-educacion/guias/aprendizaje-activo-con-ia/index.md',
    svg: 'content/ia-educacion/guias/aprendizaje-activo-con-ia/dialogo-ia-aprendizaje-activo.svg',
    mobileSvg: 'content/ia-educacion/guias/aprendizaje-activo-con-ia/dialogo-ia-aprendizaje-activo-mobile.svg',
    fallbackSignal: '| Movimiento |',
  },
  'udgia-f08-producto-proceso': {
    page: 'content/ia-educacion/tendencias/evaluacion-en-la-era-ia/index.md',
    svg: 'content/ia-educacion/tendencias/evaluacion-en-la-era-ia/producto-a-proceso.svg',
    mobileSvg: 'content/ia-educacion/tendencias/evaluacion-en-la-era-ia/producto-a-proceso-mobile.svg',
    fallbackSignal: '| Muestra posible |',
  },
  'udgia-f11-politica-capas': {
    page: 'content/ia-educacion/tendencias/politicas-institucionales-universidades/index.md',
    svg: 'content/ia-educacion/tendencias/politicas-institucionales-universidades/politica-por-capas.svg',
    mobileSvg: 'content/ia-educacion/tendencias/politicas-institucionales-universidades/politica-por-capas-mobile.svg',
    fallbackSignal: '| Ámbito |',
  },
  'udgia-f17-priorizacion': {
    page: 'content/ia-educacion/rutas/decision-institucional-ia/index.md',
    svg: 'content/ia-educacion/rutas/decision-institucional-ia/matriz-priorizacion.svg',
    mobileSvg: 'content/ia-educacion/rutas/decision-institucional-ia/matriz-priorizacion-mobile.svg',
    fallbackSignal: '| Pregunta |',
  },
};
const localTargets = {
  // Resincronización 2026-08-30: la rutina de seis pasos de la autoridad (v0.12)
  // sustituye conceptualmente a los «Cinco movimientos» generados con Napkin; la
  // figura vigente ya no es Generated Output adaptado sino síntesis original del
  // documento, y las guardas de procedencia describen ese estado nuevo.
  'udgia-f18-rutina-seis-pasos': {
    page: 'content/ia-educacion/constelaciones/cocreacion-evaluacion/index.md',
    svg: 'assets/figures/rutina-direccion-epistemica.svg',
    mobileSvg: 'assets/figures/rutina-direccion-epistemica-mobile.svg',
    fallbackSignal: '1. **Posición inicial:**',
    expects: {
      reuseKey: 'rutina-direccion-epistemica',
      sourceVersion: '0.12-consolidado-con-original',
      sourceRevision: 'abbcafc0b1f2832238153417b0bb917eb6b4a24e',
      sourceSha256: '0f6700fef02695a84e1a7d032de29b9ae42733230e3d0d55b49cbab6cce3fe87',
      noticeIncludes: 'Sustituye desde 2026-08-30',
    },
  },
  // Figura de identidad del homepage (2026-08-31): sustituye al mermaid inaugural.
  // No deriva del documento de orientaciones: es síntesis original de la propia
  // arquitectura del sitio, anclada a la revisión de main sobre la que se diseñó.
  'udgia-f19-ecosistema-sitio': {
    page: 'content/_index.md',
    svg: 'assets/figures/ecosistema-sitio.svg',
    mobileSvg: 'assets/figures/ecosistema-sitio-mobile.svg',
    fallbackSignal: '1. **Orientarse (IA en Educación):**',
    expects: {
      reuseKey: 'ecosistema-sitio',
      sourceVersion: 'sitio',
      sourceRevision: '71cf02bae7037a9d71dd36fdf61264702a761708',
      sourceSha256: '37b7ad716bb24b9fb5d3b9807e9e672620a2240119cd3219eea883b3b1e6d6cc',
      noticeIncludes: null,
    },
  },
};
const failures = [];

const expectedFigureCount = Object.keys(targets).length + Object.keys(localTargets).length;
if (Object.keys(metadata).length !== expectedFigureCount) {
  failures.push(`el manifiesto no contiene ${expectedFigureCount} figuras`);
}

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
    || meta.license !== 'CC BY-SA 4.0'
    || meta.attribution !== expectedAttribution
    || meta.editorial_scope !== expectedEditorialScope
    || meta.authorization_scope !== 'project-editorial'
    || meta.institutional_policy_status !== 'not-an-institutional-ruling'
    || meta.provenance_kind !== 'original-synthesis'
    || meta.publication_authorized !== true
  ) {
    failures.push(`${id}: procedencia o alternativa incompleta`);
  }
  const canonical = canonicalSources[id];
  if (
    meta.source_version !== canonical.version
    || meta.source_revision !== canonical.revision
    || meta.source_sha256 !== canonical.svg
    || meta.description_sha256 !== canonical.description
  ) {
    failures.push(`${id}: revisión o checksum de descripción canónica`);
  }
  for (const [variant, source] of [['escritorio', svg], ['móvil', mobileSvg]]) {
    for (const [label, pattern] of [
      ['role', /\brole=["']img["']/],
      ['title', /<title\b/],
      ['desc', /<desc\b/],
      ['aria-labelledby', /\baria-labelledby=/],
      ['viewBox', /\bviewBox=/],
      ['metadata de derechos', /<metadata\s+id=["']udgia-rights["'][^>]*>[^<]*Aprendizaje Digital e IA \(UDGPlus\), Universidad de Guadalajara[^<]*CC BY-SA 4\.0[^<]*no constituye dictamen ni política institucional\.[^<]*<\/metadata>/],
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
  }
}

for (const [id, target] of Object.entries(localTargets)) {
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
  if (path.relative('assets', target.svg) !== meta.src) failures.push(`${id}: ruta de activo compartido`);
  if (path.relative('assets', target.mobileSvg) !== meta.src_mobile) failures.push(`${id}: ruta de variante móvil compartida`);
  // Las figuras locales no publican archivo de descripción canónica, por lo que
  // sus entradas no fijan description_sha256; el resto de la procedencia queda
  // anclada por figura en `expects` (revisión de la autoridad para f18, revisión
  // del propio sitio para f19).
  if (
    meta.storage !== 'shared'
    || meta.reuse_key !== target.expects.reuseKey
    || !Array.isArray(meta.reusable_contexts)
    || meta.reusable_contexts.length < 2
    || meta.source_version !== target.expects.sourceVersion
    || meta.source_revision !== target.expects.sourceRevision
    || meta.source_sha256 !== target.expects.sourceSha256
    || meta.license !== 'CC BY-SA 4.0'
    || meta.attribution !== expectedAttribution
    || meta.editorial_scope !== expectedEditorialScope
    || meta.authorization_scope !== 'project-editorial'
    || meta.institutional_policy_status !== 'not-an-institutional-ruling'
    || meta.provenance_kind !== 'original-synthesis'
    || meta.publication_authorized !== true
    || (target.expects.noticeIncludes
      ? !meta.notice?.includes(target.expects.noticeIncludes)
      : meta.notice !== undefined)
  ) {
    failures.push(`${id}: procedencia o alcance local incompletos`);
  }
  for (const [variant, source] of [['escritorio', svg], ['móvil', mobileSvg]]) {
    for (const [label, pattern] of [
      ['role', /\brole=["']img["']/],
      ['title', /<title\b/],
      ['desc', /<desc\b/],
      ['aria-labelledby', /\baria-labelledby=/],
      ['viewBox', /\bviewBox=/],
      ['metadata de derechos', /<metadata\s+id=["']udgia-rights["'][^>]*>[^<]*Aprendizaje Digital e IA \(UDGPlus\), Universidad de Guadalajara[^<]*CC BY-SA 4\.0[^<]*no constituye dictamen ni política institucional\.[^<]*<\/metadata>/],
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
  }
}

// source_sha256 conserva la síntesis canónica de procedencia; los hashes de
// variante fijan por separado el re-skin vigente de Hugo y no tienen que ser
// literalmente iguales después de una adaptación visual autorizada.
// Resincronización 2026-08-30: la generación v0.12 sustituyó los cuatro instrumentos
// (portafolio, bitácora, defensa oral, rúbricas) por cuatro maneras de conocer el
// recorrido; la guarda pasa a exigir el conjunto canónico nuevo completo.
{
  const f09Page = fs.readFileSync(path.join(root, targets['udgia-f09-instrumentos'].page), 'utf8');
  for (const muestra of ['| Versiones sucesivas. |', '| Nota sobre una decisión. |', '| Conversación sobre el trabajo. |', '| Criterios explícitos. |']) {
    if (!f09Page.includes(muestra)) {
      failures.push(`udgia-f09-instrumentos: falta la muestra canónica ${muestra}`);
    }
  }
}
const f17Bundle = [
  fs.readFileSync(path.join(root, targets['udgia-f17-priorizacion'].page), 'utf8'),
  fs.readFileSync(path.join(root, targets['udgia-f17-priorizacion'].svg), 'utf8'),
  fs.readFileSync(path.join(root, targets['udgia-f17-priorizacion'].mobileSvg), 'utf8'),
  JSON.stringify(metadata['udgia-f17-priorizacion']),
].join('\n');
if (/Digital Education Council|Innovation Impact Compass|adaptad[ao]\s+de/i.test(f17Bundle)) {
  failures.push('udgia-f17-priorizacion: conserva atribución de adaptación descartada');
}
if (metadata['udgia-f17-priorizacion'].source_basis !== 'Marco UDGIA') {
  failures.push('udgia-f17-priorizacion: falta base original UDGIA');
}

const css = fs.readFileSync(path.join(root, 'assets', 'css', 'custom.css'), 'utf8');
const shortcode = fs.readFileSync(path.join(root, 'layouts', 'shortcodes', 'udgia-figure.html'), 'utf8');
for (const signal of ['--udgia-figure-width', 'scroll-margin-top', '@media print', ':focus-visible']) {
  if (!css.includes(signal)) failures.push(`CSS: falta ${signal}`);
}
for (const signal of ['tabindex="0"', '<picture>', 'srcset=', '.Inner', 'data-mobile-variant-sha256', 'data-storage=', 'data-reuse-key=', 'resources.Get', 'hugo.Data']) {
  if (!shortcode.includes(signal)) failures.push(`shortcode: falta ${signal}`);
}
for (const signal of ['data-attribution=', 'data-editorial-scope=', 'data-authorization-scope=', 'data-institutional-policy-status=', 'data-provenance-kind=', 'udgia-figure__credit', 'udgia-figure__scope', 'udgia-figure__notice']) {
  if (!shortcode.includes(signal)) failures.push(`shortcode: falta ${signal}`);
}
if (metadata['udgia-f11-politica-capas']?.notice !== 'Esquema conceptual no normativo.') {
  failures.push('udgia-f11-politica-capas: falta advertencia visible');
}
if (shortcode.includes('target="_blank"')) failures.push('shortcode: abre pestaña nueva sin necesidad');
if (shortcode.includes('.Site.Data')) failures.push('shortcode: usa API de datos obsoleta');

if (failures.length) {
  console.error(`FAIL: ${failures.join('; ')}`);
  process.exit(1);
}

console.log(`PASS: ${Object.keys(targets).length} figuras publicables y ${Object.keys(localTargets).length} figuras locales × 2 variantes, procedencia, fallback, checksums, semántica y cero recursos externos.`);
