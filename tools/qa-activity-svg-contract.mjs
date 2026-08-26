import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const failures = [];
const inventoryPath = path.join(root, 'docs', 'editorial', 'inventarios', '2026-08-23-udgia-021', 'inventario-materiales.json');
const contractPath = path.join(root, 'data', 'editorial', 'activity-svg-contract.json');
const figureCatalogPath = path.join(root, 'data', 'udgia_figures.json');

function readJson(file, label) {
  if (!fs.existsSync(file)) {
    failures.push(`falta ${label}: ${path.relative(root, file)}`);
    return null;
  }
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (error) {
    failures.push(`${label} inválido: ${error.message}`);
    return null;
  }
}

const inventory = readJson(inventoryPath, 'inventario');
const contract = readJson(contractPath, 'contrato SVG de actividades');
const figures = readJson(figureCatalogPath, 'catálogo de figuras');

if (inventory && contract && figures) {
  const activities = inventory.pages
    .filter((page) => page.course?.role === 'banco-de-practicas')
    .map((page) => page.path)
    .sort();
  const entries = [...(contract.activities || [])].sort((a, b) => a.path.localeCompare(b.path));
  const entryPaths = entries.map((entry) => entry.path);

  if (contract.schemaVersion !== 1) failures.push('schemaVersion debe ser 1');
  if (contract.policy?.default !== 'svg-required') failures.push('la política predeterminada debe ser svg-required');
  if (contract.policy?.exceptionRequires !== 'justificación pedagógica explícita') {
    failures.push('toda excepción debe exigir justificación pedagógica explícita');
  }
  if (contract.policy?.reusePreference !== 'reuse-before-new') {
    failures.push('la política debe preferir reutilizar antes de crear');
  }
  if (contract.baseline?.totalActivities !== activities.length) {
    failures.push(`baseline totalActivities debe ser ${activities.length}`);
  }
  if (JSON.stringify(entryPaths) !== JSON.stringify(activities)) {
    failures.push(`cobertura distinta: inventario=${activities.length}, contrato=${entryPaths.length}`);
  }
  if (new Set(entryPaths).size !== entryPaths.length) failures.push('hay actividades duplicadas en el contrato');

  const allowed = new Set(['integrated', 'reuse-planned', 'new-shared-planned', 'exception']);
  let integrated = 0;
  let debt = 0;
  let exceptions = 0;
  for (const entry of entries) {
    if (!allowed.has(entry.status)) failures.push(`${entry.path}: estado inválido ${entry.status}`);
    const pagePath = path.join(root, 'content', entry.path);
    if (!fs.existsSync(pagePath)) {
      failures.push(`${entry.path}: no existe la fuente`);
      continue;
    }
    const page = fs.readFileSync(pagePath, 'utf8');
    if (entry.status === 'integrated') {
      integrated += 1;
      if (!entry.figureId || !figures[entry.figureId]) failures.push(`${entry.path}: figura integrada ausente del catálogo`);
      if (!page.includes(`udgia-figure id="${entry.figureId}"`)) failures.push(`${entry.path}: no integra ${entry.figureId}`);
    } else if (entry.status === 'exception') {
      exceptions += 1;
      if (!entry.justification || entry.justification.trim().length < 40) {
        failures.push(`${entry.path}: excepción sin justificación suficiente`);
      }
      if (!entry.approvedBy || !/^\d{4}-\d{2}-\d{2}$/.test(entry.approvedOn || '')) {
        failures.push(`${entry.path}: excepción sin aprobación y fecha`);
      }
    } else {
      debt += 1;
      if (!entry.rationale || entry.rationale.trim().length < 40) failures.push(`${entry.path}: deuda sin criterio editorial`);
      if (entry.status === 'reuse-planned' && (!entry.figureId || !figures[entry.figureId])) {
        failures.push(`${entry.path}: reutilización sin figura catalogada`);
      }
      if (entry.status === 'new-shared-planned' && !entry.sharedKey) {
        failures.push(`${entry.path}: figura nueva sin clave reusable`);
      }
    }
  }

  if (debt > contract.baseline.temporaryDebt) failures.push(`la deuda aumentó: ${debt} > ${contract.baseline.temporaryDebt}`);
  if (exceptions > contract.baseline.exceptions) failures.push(`las excepciones aumentaron: ${exceptions} > ${contract.baseline.exceptions}`);
  if (integrated < contract.baseline.integrated) failures.push(`la cobertura integrada disminuyó: ${integrated}`);

  const shared = Object.entries(figures).filter(([, meta]) => meta.storage === 'shared');
  if (shared.length < 1) failures.push('no existe ninguna figura en almacenamiento compartido');
  for (const [id, meta] of shared) {
    if (!meta.src || !meta.src_mobile || !meta.reuse_key || !Array.isArray(meta.reusable_contexts) || meta.reusable_contexts.length < 2) {
      failures.push(`${id}: metadata reusable incompleta`);
      continue;
    }
    for (const asset of [meta.src, meta.src_mobile]) {
      if (!fs.existsSync(path.join(root, 'assets', asset))) failures.push(`${id}: falta activo compartido assets/${asset}`);
    }
  }
}

if (failures.length) {
  console.error(`FAIL activity-svg-contract: ${failures.join('; ')}`);
  process.exit(1);
}

console.log(`PASS activity-svg-contract: ${contract.activities.length} actividades gobernadas; deuda ${contract.baseline.temporaryDebt}; excepciones ${contract.baseline.exceptions}.`);
