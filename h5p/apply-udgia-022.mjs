#!/usr/bin/env node
// Aplica la promoción UDGIA-022 (30 prácticas del curso a H5P.MultiChoice).
// Ejecutar SÓLO después de firmar h5p/AUTHORIZATION-UDGIA-022.md.
// Pasa --authorize para cruzar además la compuerta de publicación.
import { readFile, writeFile } from "node:fs/promises";

const authorize = process.argv.includes("--authorize");
const patch = JSON.parse(await readFile("h5p/pending-catalog-udgia-022.json", "utf8"));

const man = JSON.parse(await readFile("h5p/activities/manifest.json", "utf8"));
Object.assign(man.activities, patch.manifest_activities);
await writeFile("h5p/activities/manifest.json", `${JSON.stringify(man, null, 2)}\n`);

const cat = JSON.parse(await readFile("data/h5p/catalog.json", "utf8"));
for (const [id, entry] of Object.entries(patch.contents)) {
  cat.contents[id] = authorize
    ? { ...entry,
        licenseStatus: "authorized-project-editorial",
        publicationAuthorized: true,
        publicationAuthorization: {
          scope: "project-editorial",
          decision: "UDGIA-022",
          decisionDate: "2026-08-27",
          evidence: "h5p/AUTHORIZATION-UDGIA-022.md",
        } }
    : entry;
}
await writeFile("data/h5p/catalog.json", `${JSON.stringify(cat, null, 2)}\n`);

console.log(
  `UDGIA-022 aplicado: ${Object.keys(patch.contents).length} objetos` +
    (authorize ? " AUTORIZADOS." : " sin autorizar (el despliegue seguirá bloqueado).") +
    "\nSiguiente: node tools/h5p/package-pilot.mjs --update-lock && node tools/h5p/build-runtime.mjs",
);
