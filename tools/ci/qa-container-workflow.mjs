import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { validateBaseURL } from "./validate-base-url.mjs";

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);
const workflowPath = path.join(
  repoRoot,
  ".github/workflows/container-image.yaml",
);
const workflow = await readFile(workflowPath, "utf8");

assert.match(workflow, /^on:\n  workflow_dispatch:/m);
assert.doesNotMatch(workflow, /^  push:/m, "La publicación automática sigue cerrada");
assert.match(workflow, /publish_image:/);
assert.match(workflow, /default: false/);
assert.match(workflow, /file: \.\/Dockerfile/);
assert.match(workflow, /HUGO_VERSION: 0\.164\.0/);
assert.equal((workflow.match(/HUGO_VERSION=\$\{\{ env\.HUGO_VERSION \}\}/g) || []).length, 2);
assert.match(workflow, /ghcr\.io\/\$\{\{ github\.repository \}\}/);
assert.match(workflow, /:\$\{\{ github\.sha \}\}/);
assert.match(workflow, /push: false/);
assert.match(workflow, /push: true/);
assert.match(workflow, /DOCKER_BUILD_RECORD_UPLOAD: "false"/);
assert.equal(
  (workflow.match(/packages: write/g) || []).length,
  1,
  "packages:write solo pertenece al job de publicación",
);
assert.doesNotMatch(
  workflow,
  /id-token: write/,
  "La procedencia BuildKit no necesita permiso OIDC",
);
assert.ok((workflow.match(/sbom: true/g) || []).length >= 2);
assert.ok((workflow.match(/provenance: mode=max/g) || []).length >= 2);
assert.match(workflow, /needs: \[quality, publication-contract\]/);
assert.match(workflow, /npm run qa:h5p/);
assert.match(workflow, /npm run qa:coordinacion-route/);
assert.match(workflow, /npm run qa:decision-institucional-route/);
assert.match(workflow, /publication-contract\.mjs/);
assert.ok((workflow.match(/validate-base-url\.mjs/g) || []).length >= 2);
assert.doesNotMatch(workflow, /coolify/i);

const secretReferences = [
  ...workflow.matchAll(/secrets\.([A-Za-z0-9_]+)/g),
].map((match) => match[1]);
assert.deepEqual(
  new Set(secretReferences),
  new Set(["GITHUB_TOKEN"]),
  "El workflow solo puede usar el token efímero de GitHub",
);

assert.equal(
  validateBaseURL("https://aprendizaje.udg.mx/ia/"),
  "https://aprendizaje.udg.mx/ia/",
);
for (const invalid of [
  "http://aprendizaje.udg.mx/",
  "https://aprendizaje.udg.mx/sin-diagonal",
  "https://user:password@aprendizaje.udg.mx/",
  "https://aprendizaje.udg.mx/?canal=otro",
  "https://aprendizaje.udg.mx/\nOTRO_ARG=valor/",
]) {
  assert.throws(() => validateBaseURL(invalid));
}

console.log(
  "Container workflow QA: PASS — despacho manual, no-push por defecto y publicación gobernada.",
);
