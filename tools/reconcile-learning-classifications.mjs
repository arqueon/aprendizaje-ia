import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const snapshotDate = process.env.UDGIA_SNAPSHOT_DATE || '2026-08-23';
const baseInventoryPath = path.resolve(
  process.env.UDGIA_BASE_INVENTORY
    || path.join(
      root,
      'docs',
      'editorial',
      'inventarios',
      `${snapshotDate}-hugo`,
      'inventario-hugo.json',
    ),
);
const classificationSourcePath = path.resolve(
  process.env.UDGIA_COURSE_CLASSIFICATION_SOURCE
    || path.join(root, 'data', 'editorial', 'learning-course-classification-source.json'),
);
const outputPath = path.resolve(
  process.env.UDGIA_COURSE_CLASSIFICATIONS
    || path.join(root, 'data', 'editorial', 'learning-course-classifications.json'),
);
const checkMode = process.argv.includes('--check');
const classificationKeys = [
  'path',
  'rol_en_el_curso',
  'accion_editorial',
  'modulos_posibles',
  'rutas',
  'razon',
];

function relativeRepoPath(file) {
  const relative = path.relative(root, file);
  if (!relative || relative.startsWith('..') || path.isAbsolute(relative)) {
    throw new Error(`La fuente debe permanecer dentro del repositorio: ${file}`);
  }
  return relative.split(path.sep).join('/');
}

function readJson(file, label) {
  if (!fs.existsSync(file)) throw new Error(`Falta ${label}: ${path.relative(root, file)}`);
  const bytes = fs.readFileSync(file);
  return { bytes, value: JSON.parse(bytes) };
}

function countBy(values) {
  return Object.fromEntries(
    Object.entries(Object.groupBy(values, (value) => value))
      .map(([key, matches]) => [key, matches.length])
      .sort(([left], [right]) => left.localeCompare(right)),
  );
}

function requireUniquePaths(pages, label) {
  const seen = new Set();
  const duplicates = [];
  for (const page of pages) {
    if (seen.has(page.path)) duplicates.push(page.path);
    seen.add(page.path);
  }
  if (duplicates.length > 0) {
    throw new Error(`${label} contiene rutas duplicadas: ${[...new Set(duplicates)].join(', ')}`);
  }
  return seen;
}

function validateClassification(page) {
  if (!page || typeof page !== 'object' || Array.isArray(page)) {
    throw new Error('La fuente clasificatoria contiene una entrada inválida.');
  }
  const keys = Object.keys(page).sort();
  const expected = [...classificationKeys].sort();
  if (JSON.stringify(keys) !== JSON.stringify(expected)) {
    throw new Error(
      `${page.path || '(sin ruta)'}: la fuente canónica solo admite ${classificationKeys.join(', ')}`,
    );
  }
  for (const field of ['path', 'rol_en_el_curso', 'accion_editorial', 'razon']) {
    if (typeof page[field] !== 'string' || page[field].trim() === '') {
      throw new Error(`${page.path || '(sin ruta)'}: ${field} debe ser texto no vacío`);
    }
  }
  for (const field of ['modulos_posibles', 'rutas']) {
    if (!Array.isArray(page[field]) || page[field].some((value) => typeof value !== 'string')) {
      throw new Error(`${page.path}: ${field} debe ser una lista de textos`);
    }
  }
}

relativeRepoPath(baseInventoryPath);
relativeRepoPath(classificationSourcePath);

const { bytes: baseBytes, value: baseInventory } = readJson(baseInventoryPath, 'inventario Hugo');
const { bytes: sourceBytes, value: source } = readJson(
  classificationSourcePath,
  'fuente clasificatoria canónica',
);

if (source.schemaVersion !== 1 || source.id !== 'UDGIA-021-course-classification-source') {
  throw new Error('La fuente clasificatoria canónica tiene identidad o versión inválida.');
}
if (typeof source.authority !== 'string' || source.authority.trim() === '') {
  throw new Error('La fuente clasificatoria canónica debe declarar su autoridad local.');
}
if (!Array.isArray(source.pages) || !Array.isArray(source.deliberateAdditions)) {
  throw new Error('La fuente clasificatoria canónica debe declarar pages y deliberateAdditions.');
}
source.pages.forEach(validateClassification);

const hugoPaths = requireUniquePaths(baseInventory.pages || [], 'El inventario Hugo');
const sourcePaths = requireUniquePaths(source.pages, 'La fuente clasificatoria');
const missing = [...hugoPaths].filter((pagePath) => !sourcePaths.has(pagePath));
const obsolete = [...sourcePaths].filter((pagePath) => !hugoPaths.has(pagePath));
if (missing.length > 0 || obsolete.length > 0) {
  throw new Error(
    `Cobertura clasificatoria distinta del inventario Hugo: faltan=[${missing.join(', ')}]; `
      + `sobran=[${obsolete.join(', ')}]`,
  );
}
if (source.expectedPageCount !== baseInventory.pages.length) {
  throw new Error(
    `La fuente espera ${source.expectedPageCount} rutas y el inventario Hugo contiene `
      + `${baseInventory.pages.length}.`,
  );
}

const deliberateAdditions = new Set(source.deliberateAdditions);
if (deliberateAdditions.size !== 18 || deliberateAdditions.size !== source.deliberateAdditions.length) {
  throw new Error('La fuente debe conservar exactamente las 18 altas deliberadas, sin duplicados.');
}
const invalidAdditions = [...deliberateAdditions].filter((pagePath) => !sourcePaths.has(pagePath));
if (invalidAdditions.length > 0) {
  throw new Error(`Altas deliberadas sin clasificación: ${invalidAdditions.join(', ')}`);
}

const sourceByPath = new Map(source.pages.map((page) => [page.path, page]));
const pages = baseInventory.pages.map((page) => {
  const classification = sourceByPath.get(page.path);
  return {
    path: page.path,
    route: page.route,
    title: page.title,
    kind: page.kind,
    words: page.words,
    rol_en_el_curso: classification.rol_en_el_curso,
    accion_editorial: classification.accion_editorial,
    modulos_posibles: classification.modulos_posibles,
    rutas: classification.rutas,
    razon: classification.razon,
  };
});

const report = {
  schemaVersion: 1,
  id: 'UDGIA-021-course-classifications',
  snapshotDate,
  sourceInventory: relativeRepoPath(baseInventoryPath),
  sourceInventorySha256: createHash('sha256').update(baseBytes).digest('hex'),
  classificationSource: relativeRepoPath(classificationSourcePath),
  classificationSourceSha256: createHash('sha256').update(sourceBytes).digest('hex'),
  regeneratedBy: 'npm run content:learning-classifications',
  provenance: {
    method: 'Cruce por ruta exacta entre el inventario Hugo y la fuente clasificatoria canónica local.',
    authority: source.authority,
    deliberateAdditions: source.deliberateAdditions,
  },
  classifiedPageCount: pages.length,
  classificationCounts: countBy(pages.map((page) => page.rol_en_el_curso)),
  actionCounts: countBy(pages.map((page) => page.accion_editorial)),
  pages,
};
const output = `${JSON.stringify(report, null, 2)}\n`;

if (checkMode) {
  if (!fs.existsSync(outputPath) || fs.readFileSync(outputPath, 'utf8') !== output) {
    console.error(`Clasificaciones de aprendizaje desactualizadas: ${path.relative(root, outputPath)}`);
    process.exit(1);
  }
  console.log(`Clasificaciones de aprendizaje vigentes: ${pages.length} rutas locales.`);
} else {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, output, 'utf8');
  console.log(`Clasificaciones de aprendizaje reconciliadas: ${pages.length} rutas locales.`);
}
