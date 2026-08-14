import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const metadata = JSON.parse(fs.readFileSync(path.join(root, 'data', 'udgia_figures.json'), 'utf8'));
const expectedAttribution = 'Aprendizaje Digital e IA (UDGPlus), Universidad de Guadalajara';
const expectedEditorialScope = 'Material editorial del proyecto; no constituye un dictamen institucional.';
const expectedSourceRevision = '0331dfec00b47d2138641b0cdd3b6c8c56b9c345';
const canonicalHashes = {
  'udgia-f04-disociacion': ['e2012a54bcaa009857db82be996d15fbf485f886643581106bef267b83a62aee', '2af7565fb04313fcb2fae4b15ff360d046280fe1844f475bba1d7ca07154780c'],
  'udgia-f05-cocreacion': ['f776f624b7f9a7cedc54582651aaca62435ec7c38b05da69e0746f5f9959a0a1', '411e3bc13e5923c135bf8a0d5e315457fef423061f69c999072500e4e178dfff'],
  'udgia-f09-instrumentos': ['e23a809a18d10f07102bfa12dea339cbad777510baef90ba62541ddd3017481b', '2489684c9482d1a3e7b5969af0517ac1323bc028c329def315307e35fd828f7a'],
  'udgia-f01-trayectoria': ['9fe688222e3c59b9635e662a95b4f21b89cace8f5637d5324739a6e35726e60a', '99793eed38eb9c23f12853d14b52d79cda17f4e262bc30966c6b4f8a629ef67d'],
  'udgia-f03-principios': ['ec2beec8ad8001de8ad103240e8efc2d48eca3777598812c480111bcda6c53a2', '7398313ba7b21439212613240bbe2ae03a3ea17914cd05023a634dadf23a4ef4'],
  'udgia-f07-dialogo': ['31fa0ac382ef42bffcc4423c3ef26b1649821efdaebf1286d62c6de7be47ded8', '1504294f024b321ebb128aa5396e5f380495bddc4470526987790acc36944182'],
  'udgia-f08-producto-proceso': ['6ecb3cc8e492adea7dbfcbf44551911b0949bb7c46b7f7cb9637b67b3500dfa8', 'd068d1fc6309cf6884bcf237d2eba24f5607af16a99af1c06c50fae33ae15233'],
  'udgia-f11-politica-capas': ['a8241cf6e2f4c08176d2ee4f3a086ec465d309ce0d91001d26f85188bb796a4b', 'ee13639ce63eea7710f1a61c0a652f7ee865785441128022936a90145c81d1c6'],
  'udgia-f17-priorizacion': ['3784efd69f1851f949a5c71a7d13f1c185a0849d973e85454229bd9e35075fb2', '9740094bac5bd1291f966a1a35967c8db60aaa5cb2c08663e52fa02892fff483'],
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
    fallbackSignal: '| Instrumento |',
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
    fallbackSignal: '| Principio rector |',
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
    fallbackSignal: '| Enfoque de evaluación |',
  },
  'udgia-f11-politica-capas': {
    page: 'content/ia-educacion/tendencias/politicas-institucionales-universidades/index.md',
    svg: 'content/ia-educacion/tendencias/politicas-institucionales-universidades/politica-por-capas.svg',
    mobileSvg: 'content/ia-educacion/tendencias/politicas-institucionales-universidades/politica-por-capas-mobile.svg',
    fallbackSignal: '| Capa de la política |',
  },
  'udgia-f17-priorizacion': {
    page: 'content/ia-educacion/rutas/decision-institucional-ia/index.md',
    svg: 'content/ia-educacion/rutas/decision-institucional-ia/matriz-priorizacion.svg',
    mobileSvg: 'content/ia-educacion/rutas/decision-institucional-ia/matriz-priorizacion-mobile.svg',
    fallbackSignal: '| Criterio |',
  },
};
const localTargets = {
  'udgia-f18-cinco-movimientos': {
    page: 'content/ia-educacion/constelaciones/cocreacion-evaluacion/index.md',
    svg: 'content/ia-educacion/constelaciones/cocreacion-evaluacion/cinco-movimientos-ayuda.svg',
    mobileSvg: 'content/ia-educacion/constelaciones/cocreacion-evaluacion/cinco-movimientos-ayuda-mobile.svg',
    fallbackSignal: '1. **Propósito claro:**',
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
  const [canonicalSvgHash, canonicalDescriptionHash] = canonicalHashes[id];
  if (
    !/^1\.0\.0-lote[12]$/.test(meta.source_version)
    || meta.source_revision !== expectedSourceRevision
    || meta.source_sha256 !== canonicalSvgHash
    || meta.description_sha256 !== canonicalDescriptionHash
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
  if (path.basename(target.mobileSvg) !== meta.src_mobile) failures.push(`${id}: ruta de variante móvil`);
  if (
    meta.source_version !== 'napkin-generated-output-selection-18'
    || meta.source_revision !== '40b83d9ceb7f11722f857bcc8dadc357cebda0f4'
    || meta.source_sha256 !== 'dcddac08e6f6b933136580ddb4a26a0473e8255d0f5898fb7589da5102d4a8c2'
    || meta.description_sha256 !== 'f287592b50c4814ecd5661f4786372c90b350724d06976bdd804f70e228fb714'
    || meta.license !== 'Generated Output de Napkin AI; uso sujeto a los términos aplicables de Napkin'
    || !meta.attribution?.includes('Generated Output de Napkin AI')
    || meta.editorial_scope !== expectedEditorialScope
    || meta.authorization_scope !== 'project-editorial'
    || meta.institutional_policy_status !== 'not-an-institutional-ruling'
    || meta.provenance_kind !== 'napkin-generated-output-adapted'
    || meta.publication_authorized !== true
    || !meta.notice?.includes('Publicación autorizada por Rubén')
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
      ['procedencia Napkin', /<metadata>[^<]*Generated Output de Napkin AI[^<]*<\/metadata>/],
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

for (const id of ['udgia-f07-dialogo', 'udgia-f09-instrumentos', 'udgia-f11-politica-capas', 'udgia-f17-priorizacion']) {
  if (metadata[id].source_sha256 !== metadata[id].variant_sha256) {
    failures.push(`${id}: el SVG de escritorio no coincide literalmente con el canónico`);
  }
}
if (!/\| Defensa oral \|/.test(fs.readFileSync(path.join(root, targets['udgia-f09-instrumentos'].page), 'utf8'))) {
  failures.push('udgia-f09-instrumentos: faltan los cuatro instrumentos canónicos');
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
for (const signal of ['tabindex="0"', '<picture>', 'srcset=', '.Inner', 'data-mobile-variant-sha256', 'hugo.Data']) {
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

console.log(`PASS: ${Object.keys(targets).length} figuras publicables y ${Object.keys(localTargets).length} figura local × 2 variantes, procedencia, fallback, checksums, semántica y cero recursos externos.`);
