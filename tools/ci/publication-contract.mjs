import { readFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);

export const catalogDefinitions = [
  {
    path: "data/h5p/catalog.json",
    select: (catalog) => catalog.contents,
  },
  {
    path: "data/udgia_figures.json",
    select: (catalog) => catalog,
  },
];

function value(entry, camelCase, snakeCase) {
  return entry[camelCase] ?? entry[snakeCase];
}

export function evaluateCatalogObject(catalogPath, id, entry) {
  const authorization = value(
    entry,
    "publicationAuthorized",
    "publication_authorized",
  );
  const licenseStatus = value(entry, "licenseStatus", "license_status");
  const declaredLicense =
    value(entry, "contentLicense", "content_license") ?? entry.license;
  const normalizedStatus = String(licenseStatus ?? "").toLowerCase();
  const normalizedLicense = String(declaredLicense ?? "").toLowerCase();
  const blockers = [];

  if (authorization !== true) {
    blockers.push(
      authorization === false || authorization === "false"
        ? "publication-not-authorized"
        : authorization == null
          ? "publication-authorization-missing"
          : "publication-authorization-invalid",
    );
  }
  if (!String(declaredLicense ?? "").trim()) {
    blockers.push("license-missing");
  }
  if (
    normalizedStatus.includes("pending") ||
    normalizedLicense.includes("pending")
  ) {
    blockers.push("license-pending");
  }
  if (
    String(declaredLicense ?? "").toUpperCase() === "U" &&
    !normalizedStatus
  ) {
    blockers.push("license-unresolved");
  }

  return blockers.map((reason) => ({
    catalog: catalogPath,
    id,
    reason,
    license: declaredLicense ?? null,
    licenseStatus: licenseStatus ?? null,
    publicationAuthorized: authorization ?? null,
  }));
}

export function evaluateCatalogs(catalogs) {
  const blockers = [];
  let objectCount = 0;

  for (const catalog of catalogs) {
    for (const [id, entry] of Object.entries(catalog.objects)) {
      objectCount += 1;
      blockers.push(...evaluateCatalogObject(catalog.path, id, entry));
    }
  }

  return {
    objectCount,
    blockerCount: blockers.length,
    publicPublicationAllowed: blockers.length === 0,
    blockers,
  };
}

export async function loadCatalogs() {
  return Promise.all(
    catalogDefinitions.map(async (definition) => {
      const absolutePath = path.resolve(repoRoot, definition.path);
      const catalog = JSON.parse(await readFile(absolutePath, "utf8"));
      const objects = definition.select(catalog);
      if (!objects || Array.isArray(objects) || typeof objects !== "object") {
        throw new Error(`${definition.path}: catálogo sin objetos auditables`);
      }
      return { path: definition.path, objects };
    }),
  );
}

function parseArguments(argv) {
  const modeIndex = argv.indexOf("--mode");
  const reportIndex = argv.indexOf("--report");
  const mode = modeIndex >= 0 ? argv[modeIndex + 1] : "build-only";
  const report = reportIndex >= 0 ? argv[reportIndex + 1] : null;

  if (!["build-only", "public"].includes(mode)) {
    throw new Error("--mode debe ser build-only o public");
  }
  if (reportIndex >= 0 && !report) {
    throw new Error("--report requiere una ruta");
  }
  return { mode, report };
}

export async function runCli(argv = process.argv.slice(2)) {
  const { mode, report } = parseArguments(argv);
  const audit = evaluateCatalogs(await loadCatalogs());
  const result = {
    schemaVersion: 1,
    mode,
    catalogs: catalogDefinitions.map(({ path: catalogPath }) => catalogPath),
    ...audit,
    decision:
      mode === "public" && !audit.publicPublicationAllowed
        ? "blocked"
        : "allowed",
  };

  if (report) {
    const reportPath = path.resolve(report);
    await mkdir(path.dirname(reportPath), { recursive: true });
    await writeFile(reportPath, `${JSON.stringify(result, null, 2)}\n`);
  }

  if (mode === "public" && !audit.publicPublicationAllowed) {
    console.error(
      `PUBLICATION CONTRACT: BLOCKED — ${audit.blockerCount} bloqueos en ` +
        `${audit.objectCount} objetos.`,
    );
    for (const blocker of audit.blockers) {
      console.error(
        `- ${blocker.catalog}#${blocker.id}: ${blocker.reason}`,
      );
    }
    return 1;
  }

  const qualification = audit.publicPublicationAllowed
    ? "sin bloqueos editoriales"
    : `${audit.blockerCount} bloqueos conservados; no habrá push`;
  console.log(
    `PUBLICATION CONTRACT: PASS (${mode}) — ${audit.objectCount} objetos, ` +
      qualification,
  );
  return 0;
}

const isMain =
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  process.exitCode = await runCli();
}
