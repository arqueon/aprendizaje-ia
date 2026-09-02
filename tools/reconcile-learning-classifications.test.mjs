import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const script = path.join(root, 'tools', 'reconcile-learning-classifications.mjs');
const derivedPath = path.join(root, 'data', 'editorial', 'learning-course-classifications.json');
const sourcePath = path.join(root, 'data', 'editorial', 'learning-course-classification-source.json');

function checkDerived(outputPath) {
  return spawnSync(process.execPath, [script, '--check'], {
    cwd: root,
    encoding: 'utf8',
    env: {
      ...process.env,
      UDGIA_COURSE_CLASSIFICATIONS: outputPath,
    },
  });
}

test('la fuente canónica cubre 203 rutas y conserva las 18 altas deliberadas', () => {
  const source = JSON.parse(readFileSync(sourcePath, 'utf8'));
  assert.equal(source.expectedPageCount, 203);
  assert.equal(source.pages.length, 203);
  assert.equal(source.deliberateAdditions.length, 18);
  assert.equal(new Set(source.deliberateAdditions).size, 18);
  const classifiedPaths = new Set(source.pages.map(({ path: pagePath }) => pagePath));
  for (const pagePath of source.deliberateAdditions) {
    assert.ok(classifiedPaths.has(pagePath), `alta sin clasificación: ${pagePath}`);
  }
});

test('la verificación diferencial rechaza una mutación semántica del derivado', () => {
  const temporary = mkdtempSync(path.join(tmpdir(), 'udgia-classifications-'));
  const outputPath = path.join(temporary, 'learning-course-classifications.json');
  try {
    const derivedText = readFileSync(derivedPath, 'utf8');
    writeFileSync(outputPath, derivedText);
    const baseline = checkDerived(outputPath);
    assert.equal(baseline.status, 0, baseline.stderr || baseline.stdout);

    const mutated = JSON.parse(derivedText);
    mutated.pages[0].rol_en_el_curso = 'mutacion-semantica-qf2';
    writeFileSync(outputPath, `${JSON.stringify(mutated, null, 2)}\n`);
    const result = checkDerived(outputPath);
    assert.notEqual(result.status, 0, 'la mutación semántica fue aceptada');
    assert.match(result.stderr, /Clasificaciones de aprendizaje desactualizadas/);
  } finally {
    rmSync(temporary, { recursive: true, force: true });
  }
});

test('la reconciliación rechaza fuentes clasificatorias fuera del repositorio', () => {
  const temporary = mkdtempSync(path.join(tmpdir(), 'udgia-external-source-'));
  const sourceOutsideRepo = path.join(temporary, 'source.json');
  try {
    writeFileSync(sourceOutsideRepo, readFileSync(sourcePath, 'utf8'));
    const result = spawnSync(process.execPath, [script, '--check'], {
      cwd: root,
      encoding: 'utf8',
      env: {
        ...process.env,
        UDGIA_COURSE_CLASSIFICATION_SOURCE: sourceOutsideRepo,
      },
    });
    assert.notEqual(result.status, 0, 'se aceptó una fuente externa al repositorio');
    assert.match(result.stderr, /La fuente debe permanecer dentro del repositorio/);
  } finally {
    rmSync(temporary, { recursive: true, force: true });
  }
});
