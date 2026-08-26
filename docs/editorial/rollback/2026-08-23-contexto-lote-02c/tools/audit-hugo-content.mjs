import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const contentRoot = path.join(root, 'content');
const sharedFiguresRoot = path.join(root, 'assets', 'figures');
const snapshotDate = process.env.UDGIA_SNAPSHOT_DATE || '2026-08-23';
const outputDir = path.resolve(
  process.env.UDGIA_HUGO_INVENTORY_DIR
    || path.join(root, 'docs', 'editorial', 'inventarios', `${snapshotDate}-hugo`),
);
const checkMode = process.argv.includes('--check');

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(entryPath));
    else out.push(entryPath);
  }
  return out;
}

function parseScalar(raw) {
  const value = raw.trim();
  if (/^["'].*["']$/.test(value)) return value.slice(1, -1);
  if (/^\[.*\]$/.test(value)) {
    return [...value.matchAll(/["']([^"']+)["']|([^,\[\]\s][^,\[\]]*)/g)]
      .map((match) => (match[1] ?? match[2]).trim());
  }
  if (/^(true|false)$/i.test(value)) return value.toLowerCase() === 'true';
  if (/^-?\d+(\.\d+)?$/.test(value)) return Number(value);
  return value;
}

function frontmatter(text) {
  if (!text.startsWith('---\n')) return [{}, text];
  const end = text.indexOf('\n---', 4);
  if (end < 0) return [{}, text];

  const raw = text.slice(4, end);
  const parsed = {};
  let currentList = '';
  for (const line of raw.split('\n')) {
    const property = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/);
    if (property) {
      const [, key, value] = property;
      parsed[key] = value === '' ? [] : parseScalar(value);
      currentList = value === '' ? key : '';
      continue;
    }
    const item = line.match(/^\s+-\s+(.+)$/);
    if (item && currentList && Array.isArray(parsed[currentList])) {
      parsed[currentList].push(parseScalar(item[1]));
    }
  }
  return [parsed, text.slice(end + 4)];
}

function normalizeText(value) {
  return value.toLowerCase()
    .normalize('NFD').replace(/\p{Diacritic}/gu, '')
    .replace(/https?:\/\/\S+/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\{\{[%<].*?[%>]\}\}/gs, ' ')
    .replace(/[`*_#|[\]()>—–.,;:!?¿¡"']/g, ' ')
    .replace(/\s+/g, ' ').trim();
}

function fileRoute(relativePath) {
  if (relativePath === '_index.md') return '/';
  if (relativePath.endsWith('/_index.md')) return `/${relativePath.slice(0, -10)}/`;
  if (relativePath.endsWith('/index.md')) return `/${relativePath.slice(0, -9)}/`;
  return `/${relativePath.slice(0, -3)}/`;
}

function canonicalRoute(route) {
  return route === '/' ? '/' : `${route.replace(/\/+$/, '')}/`;
}

const allContentFiles = walk(contentRoot);
const markdownFiles = allContentFiles.filter((file) => file.endsWith('.md'));
const assetPattern = /\.(png|jpe?g|webp|svg|gif|avif)$/i;
const contentAssets = allContentFiles.filter((file) => assetPattern.test(file));
const sharedFigureAssets = fs.existsSync(sharedFiguresRoot)
  ? walk(sharedFiguresRoot).filter((file) => assetPattern.test(file))
  : [];
const assets = [...contentAssets, ...sharedFigureAssets];
const documents = markdownFiles.map((file) => {
  const relativePath = path.relative(contentRoot, file);
  const text = fs.readFileSync(file, 'utf8');
  const [metadata, body] = frontmatter(text);
  let route = fileRoute(relativePath);
  if (metadata.slug && path.basename(file) === 'index.md') {
    const parent = `/${path.dirname(relativePath).split('/').slice(0, -1).join('/')}`;
    route = `${parent === '/' ? '' : parent}/${metadata.slug}/`;
  }
  return { file, relativePath, metadata, body, route };
});

const knownRoutes = new Set(documents.flatMap((document) => [
  document.route,
  ...(Array.isArray(document.metadata.aliases)
    ? document.metadata.aliases.map(canonicalRoute)
    : []),
]));
const pages = [];

for (const { file, relativePath, metadata, body, route } of documents) {
  const normalized = normalizeText(body.replace(/```[\s\S]*?```/g, ' '));
  const words = normalized ? normalized.split(' ').length : 0;
  const headings = [...body.matchAll(/^(#{2,6})\s+(.+)$/gm)]
    .map((match) => ({ level: match[1].length, title: match[2] }));
  const imageReferences = [...body.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)]
    .map((match) => match[1]);
  const htmlImages = [...body.matchAll(/<(?:img|source)\b[^>]*(?:src|srcset)=["']([^"']+)/gi)]
    .map((match) => match[1]);
  const shortcodes = [...body.matchAll(/\{\{[<%]\s*(?!\/)([\w-]+)/g)]
    .map((match) => match[1]);
  const markdownLinks = [...body.matchAll(/(?<!!)\[[^\]]+\]\(([^)\s]+)[^)]*\)/g)]
    .map((match) => match[1]);
  const shortcodeLinks = [...body.matchAll(/\blink=["']([^"']+)["']/g)]
    .map((match) => match[1]);
  const internalLinks = [...markdownLinks, ...shortcodeLinks]
    .filter((link) => !/^(https?:|mailto:|tel:|#)/i.test(link) && !link.includes('{{'))
    .map((link) => {
      const withoutQuery = link.split(/[?#]/)[0];
      return new URL(withoutQuery, `https://audit.invalid${route}`).pathname;
    });
  const brokenLinks = internalLinks.filter((link) => {
    const candidateRoute = canonicalRoute(link);
    return !knownRoutes.has(candidateRoute)
      && !fs.existsSync(path.join(root, 'static', link))
      && !fs.existsSync(path.join(contentRoot, link));
  });
  const localAssets = fs.readdirSync(path.dirname(file), { withFileTypes: true })
    .filter((entry) => entry.isFile() && assetPattern.test(entry.name))
    .map((entry) => entry.name);
  const markdownTables = (body.match(/^\|.*\|\s*\n\|[\s:|-]+\|/gm) || []).length;
  const externalUrls = [...new Set(body.match(/https?:\/\/[^\s)>"]+/g) || [])];
  const citationSignals = (body.match(/\([A-ZÁÉÍÓÚÑ][^()\n]{1,80},\s*(?:19|20)\d{2}[a-z]?\)/g) || []).length;
  const referenceHeading = /^#{2,3}\s+(Referencias|Fuentes|Bibliograf[ií]a)\b/im.test(body);
  const tokenSet = new Set(normalized.split(' ').filter((word) => word.length > 4));
  const featured = localAssets.some((asset) => /^featured\./i.test(asset))
    || typeof metadata.featureimage === 'string'
    || typeof metadata.featureImage === 'string';
  const visual = {
    featured,
    local_asset_count: localAssets.length,
    inline_image_count: imageReferences.length + htmlImages.length,
    svg_count: localAssets.filter((asset) => asset.endsWith('.svg')).length,
    table_count: markdownTables + (body.match(/<table\b/gi) || []).length,
    mermaid_count: shortcodes.filter((name) => name === 'mermaid').length
      + (body.match(/```mermaid/g) || []).length,
    chart_count: shortcodes.filter((name) => name === 'chart').length,
    h5p_count: shortcodes.filter((name) => name === 'h5p').length,
    iframe_count: (body.match(/<iframe\b/gi) || []).length,
    shortcode_names: [...new Set(shortcodes)].sort(),
  };

  const isIndex = path.basename(file) === '_index.md';
  let decision = 'actualizar';
  if (metadata.draft === true) decision = 'actualizar';
  else if (!isIndex && words < 90) decision = 'archivar-o-fusionar';
  else if (!isIndex && words < 250) decision = 'fusionar-o-ampliar';
  else if (words > 2800 && headings.length > 12) decision = 'dividir';
  else if (words >= 650 && metadata.description && (referenceHeading || externalUrls.length >= 2)) {
    decision = 'conservar';
  }

  const needs = [];
  if (!featured && !isIndex) needs.push('featured');
  if (!visual.svg_count && !visual.mermaid_count && words >= 500) needs.push('svg-diagrama');
  if (!visual.table_count && words >= 700) needs.push('tabla-sintesis');
  if (
    !visual.h5p_count
    && words >= 900
    && /actividad|secuencia|decisi[oó]n|proceso|pr[aá]ctica|evaluaci[oó]n/i.test(body)
  ) {
    needs.push('interaccion-candidata');
  }
  if (visual.h5p_count) needs.push('fallback-verificar');
  if (!referenceHeading && citationSignals > 0) needs.push('procedencia');

  pages.push({
    path: relativePath,
    route,
    kind: isIndex ? 'section' : 'page',
    section: relativePath.split('/')[0],
    title: metadata.title ?? '',
    date: metadata.date ?? '',
    draft: metadata.draft === true,
    description: metadata.description ?? '',
    summary: metadata.summary ?? '',
    tags: Array.isArray(metadata.tags) ? metadata.tags : [],
    categories: Array.isArray(metadata.categories) ? metadata.categories : [],
    areas: Array.isArray(metadata.areas) ? metadata.areas : [],
    words,
    heading_count: headings.length,
    h2_count: headings.filter((heading) => heading.level === 2).length,
    external_url_count: externalUrls.length,
    citation_signals: citationSignals,
    reference_heading: referenceHeading,
    internal_link_count: internalLinks.length,
    broken_internal_links: [...new Set(brokenLinks)],
    visual,
    decision,
    needs,
    _tokens: tokenSet,
  });
}

const similarities = [];
for (let left = 0; left < pages.length; left += 1) {
  for (let right = left + 1; right < pages.length; right += 1) {
    const a = pages[left];
    const b = pages[right];
    if (a.kind === 'section' || b.kind === 'section' || Math.min(a.words, b.words) < 120) continue;
    let intersection = 0;
    for (const token of a._tokens) if (b._tokens.has(token)) intersection += 1;
    const union = a._tokens.size + b._tokens.size - intersection;
    const score = union ? intersection / union : 0;
    if (score >= 0.32) {
      similarities.push({ score: Number(score.toFixed(3)), a: a.path, b: b.path });
    }
  }
}
similarities.sort((a, b) => b.score - a.score);
for (const page of pages) delete page._tokens;

const bySection = {};
for (const page of pages) {
  const key = page.section;
  bySection[key] ??= {
    pages: 0,
    sections: 0,
    words: 0,
    featured: 0,
    svg: 0,
    h5p: 0,
    tables: 0,
    weak_lt250: 0,
    missing_refs_with_citations: 0,
  };
  bySection[key][page.kind === 'section' ? 'sections' : 'pages'] += 1;
  bySection[key].words += page.words;
  bySection[key].featured += page.visual.featured ? 1 : 0;
  bySection[key].svg += page.visual.svg_count;
  bySection[key].h5p += page.visual.h5p_count;
  bySection[key].tables += page.visual.table_count;
  bySection[key].weak_lt250 += page.kind === 'page' && page.words < 250 ? 1 : 0;
  bySection[key].missing_refs_with_citations += page.citation_signals > 0
    && !page.reference_heading ? 1 : 0;
}

const tags = {};
const categories = {};
const areas = {};
for (const page of pages) {
  for (const [values, counts] of [
    [page.tags, tags],
    [page.categories, categories],
    [page.areas, areas],
  ]) {
    for (const value of values) counts[value] = (counts[value] ?? 0) + 1;
  }
}
const titleGroups = Object.groupBy(pages, (page) => normalizeText(page.title));
const tagVariantCollisions = Object.entries(Object.groupBy(Object.keys(tags), (tag) => tag
  .toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '')
  .replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim()))
  .filter(([, variants]) => variants.length > 1)
  .map(([canonical, variants]) => ({ canonical, variants }));
const duplicateTitles = Object.entries(titleGroups)
  .filter(([title, matches]) => title && matches.length > 1)
  .map(([title, matches]) => ({ title, paths: matches.map((page) => page.path) }));
const orphanFeaturedAssets = contentAssets.filter((asset) => {
  const directory = path.dirname(asset);
  return /^featured\./i.test(path.basename(asset))
    && !fs.existsSync(path.join(directory, 'index.md'))
    && !fs.existsSync(path.join(directory, '_index.md'));
}).map((asset) => path.relative(contentRoot, asset));
const legacyGlossaryLinkOccurrences = documents.reduce(
  (total, document) => total + (document.body.match(/\]\(\/glosario\//g) || []).length,
  0,
);
const declaredCountChecks = [
  {
    path: 'ia-educacion/productos-de-aprendizaje/_index.md',
    field: 'description',
    actual: documents.filter((document) => (
      /^ia-educacion\/productos-de-aprendizaje\/[^/]+\/index\.md$/.test(document.relativePath)
    )).length,
  },
  {
    path: 'recursos/glosario/_index.md',
    field: 'summary',
    actual: documents.filter((document) => (
      /^recursos\/glosario\/[^/]+\/index\.md$/.test(document.relativePath)
    )).length,
  },
].map((check) => {
  const document = documents.find((candidate) => candidate.relativePath === check.path);
  const value = String(document?.metadata[check.field] ?? '');
  const declared = Number(value.match(/\b(\d+)\b/)?.[1] ?? Number.NaN);
  return { ...check, declared, matches: declared === check.actual };
});

const report = {
  snapshot_date: snapshotDate,
  root: '.',
  totals: {
    markdown: pages.length,
    pages: pages.filter((page) => page.kind === 'page').length,
    sections: pages.filter((page) => page.kind === 'section').length,
    words: pages.reduce((total, page) => total + page.words, 0),
    assets: assets.length,
    content_assets: contentAssets.length,
    shared_figure_assets: sharedFigureAssets.length,
    pages_with_featured: pages.filter((page) => page.visual.featured).length,
    pages_with_svg: pages.filter((page) => page.visual.svg_count > 0).length,
    pages_with_tables: pages.filter((page) => page.visual.table_count > 0).length,
    pages_with_mermaid: pages.filter((page) => page.visual.mermaid_count > 0).length,
    pages_with_h5p: pages.filter((page) => page.visual.h5p_count > 0).length,
    pages_with_any_interaction: pages.filter((page) => (
      page.visual.h5p_count + page.visual.chart_count + page.visual.iframe_count
    ) > 0).length,
    body_lt90: pages.filter((page) => page.kind === 'page' && page.words < 90).length,
    body_lt250: pages.filter((page) => page.kind === 'page' && page.words < 250).length,
    body_gt2800: pages.filter((page) => page.words > 2800).length,
    missing_description: pages.filter((page) => !page.description).length,
    missing_summary: pages.filter((page) => !page.summary).length,
    missing_date_pages: pages.filter((page) => page.kind === 'page' && !page.date).length,
    citation_without_reference_heading: pages.filter((page) => (
      page.citation_signals > 0 && !page.reference_heading
    )).length,
    legacy_glossary_link_occurrences: legacyGlossaryLinkOccurrences,
    broken_internal_link_occurrences: pages.reduce(
      (total, page) => total + page.broken_internal_links.length,
      0,
    ),
  },
  by_section: bySection,
  taxonomy: {
    tags,
    categories,
    areas,
    tag_variant_collisions: tagVariantCollisions,
  },
  duplicate_titles: duplicateTitles,
  possible_overlaps: similarities.slice(0, 50),
  declared_count_checks: declaredCountChecks,
  orphan_featured_assets: orphanFeaturedAssets,
  pages,
};

const csvColumns = [
  'path', 'route', 'kind', 'section', 'title', 'date', 'words', 'heading_count',
  'external_url_count', 'citation_signals', 'reference_heading', 'internal_link_count',
  'broken_internal_links', 'featured', 'local_asset_count', 'inline_image_count',
  'svg_count', 'table_count', 'mermaid_count', 'chart_count', 'h5p_count', 'iframe_count',
  'decision', 'needs', 'tags', 'categories', 'areas',
];
const csvValue = (value) => {
  const raw = Array.isArray(value) ? value.join('|') : String(value ?? '');
  return /[",\n]/.test(raw) ? `"${raw.replaceAll('"', '""')}"` : raw;
};
const csvRows = pages.map((page) => {
  const flat = { ...page, ...page.visual };
  return csvColumns.map((column) => csvValue(flat[column])).join(',');
});
const jsonText = `${JSON.stringify(report, null, 2)}\n`;
const csvText = `${[csvColumns.join(','), ...csvRows].join('\n')}\n`;
const jsonPath = path.join(outputDir, 'inventario-hugo.json');
const csvPath = path.join(outputDir, 'inventario-paginas.csv');

if (checkMode) {
  const failures = [];
  if (!fs.existsSync(jsonPath) || fs.readFileSync(jsonPath, 'utf8') !== jsonText) {
    failures.push(path.relative(root, jsonPath));
  }
  if (!fs.existsSync(csvPath) || fs.readFileSync(csvPath, 'utf8') !== csvText) {
    failures.push(path.relative(root, csvPath));
  }
  if (report.totals.broken_internal_link_occurrences > 0) {
    failures.push(`${report.totals.broken_internal_link_occurrences} enlaces internos rotos`);
  }
  if (report.totals.legacy_glossary_link_occurrences > 0) {
    failures.push(`${report.totals.legacy_glossary_link_occurrences} enlaces heredados /glosario/`);
  }
  for (const check of report.declared_count_checks) {
    if (!check.matches) {
      failures.push(`${check.path}: declara ${check.declared} y contiene ${check.actual}`);
    }
  }
  if (failures.length > 0) {
    console.error(`Inventario desactualizado o inválido: ${failures.join(', ')}`);
    process.exit(1);
  }
  console.log(`Inventario vigente: ${pages.length} documentos, 0 enlaces internos rotos.`);
} else {
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(jsonPath, jsonText);
  fs.writeFileSync(csvPath, csvText);
  console.log(`Inventario generado en ${path.relative(root, outputDir)}.`);
}
