import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import {
  evaluateCatalogs,
  loadCatalogs,
  runCli,
} from "./publication-contract.mjs";

const fixtureAudit = evaluateCatalogs([
  {
    path: "licensed.json",
    objects: {
      allowed: {
        contentLicense: "CC BY-SA 4.0",
        publicationAuthorized: true,
      },
    },
  },
  {
    path: "blocked.json",
    objects: {
      falseCamel: {
        contentLicense: "U",
        licenseStatus: "pending-institutional-confirmation",
        publicationAuthorized: false,
      },
      falseSnake: {
        license: "pending-institutional-confirmation",
        publication_authorized: false,
      },
      unresolved: {
        contentLicense: "U",
      },
      missingLicense: {
        publicationAuthorized: true,
      },
    },
  },
]);

assert.equal(fixtureAudit.objectCount, 5);
assert.equal(fixtureAudit.publicPublicationAllowed, false);
assert.ok(
  fixtureAudit.blockers.some(({ reason }) => reason === "publication-not-authorized"),
);
assert.ok(
  fixtureAudit.blockers.some(({ reason }) => reason === "license-pending"),
);
assert.ok(
  fixtureAudit.blockers.some(({ reason }) => reason === "license-unresolved"),
);
assert.ok(
  fixtureAudit.blockers.some(
    ({ reason }) => reason === "publication-authorization-missing",
  ),
);
assert.ok(
  fixtureAudit.blockers.some(({ reason }) => reason === "license-missing"),
);

const liveAudit = evaluateCatalogs(await loadCatalogs());
const temporaryDirectory = await mkdtemp(
  path.join(os.tmpdir(), "udgia-publication-contract-"),
);

try {
  const buildReport = path.join(temporaryDirectory, "build-only.json");
  assert.equal(
    await runCli(["--mode", "build-only", "--report", buildReport]),
    0,
  );
  const report = JSON.parse(await readFile(buildReport, "utf8"));
  assert.equal(report.mode, "build-only");
  assert.equal(report.decision, "allowed");
  assert.equal(report.objectCount, liveAudit.objectCount);
  assert.equal(report.blockerCount, liveAudit.blockerCount);

  const publicExit = await runCli(["--mode", "public"]);
  assert.equal(publicExit, liveAudit.publicPublicationAllowed ? 0 : 1);
} finally {
  await rm(temporaryDirectory, { recursive: true, force: true });
}

console.log(
  `Publication contract QA: PASS — ${liveAudit.objectCount} objetos; ` +
    `${liveAudit.blockerCount} bloqueos editoriales vigentes.`,
);
