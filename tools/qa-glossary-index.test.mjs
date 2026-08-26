import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { auditGlossaryIndex } from './lib/glossary-index.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

test('detecta una entrada existente que no aparece en los ejes del índice', () => {
  const body = `## Cómo está organizado\n\n- **Primer eje:** Uno y Dos\n- **Segundo eje:** Tres\n`;
  const result = auditGlossaryIndex(body, ['Uno', 'Dos', 'Tres', 'Cuatro']);
  assert.deepEqual(result.missing, ['Cuatro']);
  assert.deepEqual(result.unknown, []);
  assert.equal(result.matches, false);
});

test('el índice real enumera una vez cada entrada existente', () => {
  const indexPath = path.join(root, 'content/recursos/glosario/_index.md');
  const glossaryPath = path.dirname(indexPath);
  const titles = fs.readdirSync(glossaryPath, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(glossaryPath, entry.name, 'index.md'))
    .filter(fs.existsSync)
    .map((entryPath) => fs.readFileSync(entryPath, 'utf8').match(/^title:\s*["']?(.+?)["']?\s*$/m)?.[1])
    .filter(Boolean);
  const result = auditGlossaryIndex(fs.readFileSync(indexPath, 'utf8'), titles);
  assert.deepEqual(result.missing, []);
  assert.deepEqual(result.unknown, []);
  assert.deepEqual(result.duplicates, []);
  assert.equal(result.listed.length, titles.length);
  assert.equal(result.matches, true);
});
