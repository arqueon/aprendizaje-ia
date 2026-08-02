import { spawnSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  realpathSync,
  writeFileSync,
} from "node:fs";
import { homedir } from "node:os";
import {
  dirname,
  isAbsolute,
  relative,
  resolve,
} from "node:path";
import { fileURLToPath } from "node:url";

const scriptRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = resolve(
  scriptRoot,
  process.env.UDGIA_ECOSYSTEM_MANIFEST || "udgia-ecosystem.json",
);
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
const startedAt = new Date();
const SELF_REVISION = "SELF";

function assertManifest(condition, message) {
  if (!condition) throw new Error(`Manifiesto inválido: ${message}`);
}

function commandText(argv) {
  return argv
    .map((part) => (/^[A-Za-z0-9_./:=+-]+$/.test(part) ? part : JSON.stringify(part)))
    .join(" ");
}

function tail(value, lines = 30) {
  return value
    .replaceAll(/\u001b\[[0-9;]*m/g, "")
    .trimEnd()
    .split("\n")
    .slice(-lines)
    .join("\n");
}

function run(argv, cwd) {
  const result = spawnSync(argv[0], argv.slice(1), {
    cwd,
    encoding: "utf8",
    env: process.env,
    maxBuffer: 64 * 1024 * 1024,
  });
  return {
    status: result.status,
    signal: result.signal,
    error: result.status === null ? result.error?.message || "" : "",
    stdout: result.stdout || "",
    stderr: result.stderr || "",
  };
}

function git(root, ...args) {
  return run(["git", "-C", root, ...args], scriptRoot);
}

function resolveRoot(repository) {
  const override = process.env[repository.rootEnvironmentVariable];
  const configured = override || repository.defaultRoot;
  const expanded = configured.startsWith("~/")
    ? resolve(homedir(), configured.slice(2))
    : configured;
  return {
    root: isAbsolute(expanded) ? expanded : resolve(scriptRoot, expanded),
    source: override ? repository.rootEnvironmentVariable : "defaultRoot",
  };
}

assertManifest(manifest.schemaVersion === 1, "schemaVersion debe ser 1");
assertManifest(manifest.id === "UDGIA-017", "id debe ser UDGIA-017");
assertManifest(Array.isArray(manifest.repositories), "repositories debe ser una lista");
assertManifest(manifest.repositories.length === 3, "se esperaban tres repositorios");
assertManifest(
  new Set(manifest.repositories.map(({ id }) => id)).size === manifest.repositories.length,
  "los identificadores de repositorio deben ser únicos",
);
assertManifest(
  manifest.policy?.workingTree === "report-only",
  "workingTree debe declarar report-only",
);
assertManifest(
  manifest.policy?.remoteWritesAuthorized === false
    && manifest.policy?.publicationAuthorized === false,
  "el alcance local debe prohibir escrituras remotas y publicación",
);
const selfRepositories = manifest.repositories.filter(
  ({ revision }) => revision === SELF_REVISION,
);
assertManifest(
  selfRepositories.length === 1 && selfRepositories[0].id === "hugo",
  "SELF debe aparecer una sola vez y únicamente en el repositorio Hugo portador",
);

const repositoryReports = [];
let success = true;

for (const repository of manifest.repositories) {
  const resolvedRoot = resolveRoot(repository);
  const report = {
    id: repository.id,
    role: repository.role,
    label: repository.label,
    rootSource: resolvedRoot.source,
    expectedBranch: repository.branch,
    declaredRevision: repository.revision,
    expectedRevision: repository.revision,
    revisionSource: "fixed",
    actualBranch: "",
    actualRevision: "",
    dirty: false,
    workingTree: [],
    preflight: "FAIL",
    commands: [],
  };
  repositoryReports.push(report);

  process.stdout.write(`\n[${repository.id}] ${repository.label}\n`);

  if (!existsSync(resolvedRoot.root)) {
    process.stderr.write(`FAIL: no existe ${resolvedRoot.root}\n`);
    success = false;
    continue;
  }

  const branch = git(resolvedRoot.root, "branch", "--show-current");
  const revision = git(resolvedRoot.root, "rev-parse", "HEAD");
  const workingTree = git(
    resolvedRoot.root,
    "status",
    "--porcelain=v1",
    "--untracked-files=all",
  );

  if (branch.status !== 0 || revision.status !== 0 || workingTree.status !== 0) {
    report.gitError = tail(
      [branch.stderr, revision.stderr, workingTree.stderr].filter(Boolean).join("\n"),
    );
    process.stderr.write(`FAIL: no se pudo inspeccionar el repositorio\n${report.gitError}\n`);
    success = false;
    continue;
  }

  report.actualBranch = branch.stdout.trim();
  report.actualRevision = revision.stdout.trim();
  report.workingTree = workingTree.stdout.trim()
    ? workingTree.stdout.trimEnd().split("\n")
    : [];
  report.dirty = report.workingTree.length > 0;

  const branchMatches = report.actualBranch === report.expectedBranch;
  const revisionIsSelf = repository.revision === SELF_REVISION;
  const rootIsManifestCarrier = revisionIsSelf
    && realpathSync(resolvedRoot.root) === realpathSync(scriptRoot);
  if (revisionIsSelf && rootIsManifestCarrier) {
    report.expectedRevision = report.actualRevision;
    report.revisionSource = "manifest-carrier-head";
  }
  const revisionMatches = revisionIsSelf
    ? rootIsManifestCarrier
    : report.actualRevision === report.expectedRevision;
  report.preflight = branchMatches && revisionMatches ? "PASS" : "FAIL";

  process.stdout.write(
    `checkout ${report.actualBranch} @ ${report.actualRevision.slice(0, 12)} `
      + `(${report.dirty ? `${report.workingTree.length} cambios; report-only` : "limpio"})\n`,
  );

  if (!branchMatches) {
    process.stderr.write(
      `FAIL: rama ${report.actualBranch || "(detached)"}; se esperaba ${report.expectedBranch}\n`,
    );
  }
  if (!revisionMatches) {
    if (revisionIsSelf) {
      process.stderr.write(
        "FAIL: SELF solo puede resolver al checkout que contiene el manifiesto y el runner\n",
      );
    } else {
      process.stderr.write(
        `FAIL: revisión ${report.actualRevision}; se esperaba ${report.expectedRevision}\n`,
      );
    }
  }
  if (!branchMatches || !revisionMatches) {
    success = false;
    continue;
  }

  for (const qa of repository.qa) {
    assertManifest(Array.isArray(qa.command) && qa.command.length > 0, `${repository.id}/${qa.id}`);
    const qaStartedAt = Date.now();
    process.stdout.write(`→ ${qa.id}: ${commandText(qa.command)}\n`);
    const result = run(qa.command, resolvedRoot.root);
    const commandReport = {
      id: qa.id,
      command: qa.command,
      status: result.status,
      signal: result.signal,
      durationMs: Date.now() - qaStartedAt,
      stdoutTail: tail(result.stdout),
      stderrTail: tail(result.stderr),
    };
    if (result.error) commandReport.error = result.error;
    report.commands.push(commandReport);

    if (result.stdout) process.stdout.write(result.stdout);
    if (result.stderr) process.stderr.write(result.stderr);

    if (result.status === 0) {
      process.stdout.write(`PASS: ${repository.id}/${qa.id}\n`);
    } else {
      success = false;
      process.stderr.write(
        `FAIL: ${repository.id}/${qa.id} (salida ${result.status ?? "sin código"})\n`,
      );
    }
  }
}

const finishedAt = new Date();
const evidence = {
  schemaVersion: 1,
  ecosystem: manifest.id,
  status: success ? "PASS" : "FAIL",
  startedAt: startedAt.toISOString(),
  finishedAt: finishedAt.toISOString(),
  durationMs: finishedAt.getTime() - startedAt.getTime(),
  manifest: relative(scriptRoot, manifestPath),
  policy: manifest.policy,
  repositories: repositoryReports,
};
const evidencePath = resolve(scriptRoot, manifest.evidence);
mkdirSync(dirname(evidencePath), { recursive: true });
writeFileSync(evidencePath, `${JSON.stringify(evidence, null, 2)}\n`, "utf8");

process.stdout.write(
  `\n${success ? "PASS" : "FAIL"}: QA del ecosistema UDGIA — `
    + `${relative(scriptRoot, evidencePath)}\n`,
);
process.exitCode = success ? 0 : 1;
