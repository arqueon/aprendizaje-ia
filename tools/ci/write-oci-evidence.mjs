import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const required = [
  "BUILD_MODE",
  "BUILD_METADATA",
  "GITHUB_REPOSITORY",
  "GITHUB_SHA",
  "IMAGE_NAME",
  "IMAGE_DIGEST",
  "OUTPUT_PATH",
];
for (const name of required) {
  if (!process.env[name]) throw new Error(`Falta ${name}`);
}

const digest = process.env.IMAGE_DIGEST;
if (!/^sha256:[a-f0-9]{64}$/.test(digest)) {
  throw new Error(`Digest OCI inesperado: ${digest}`);
}
if (!/^[a-f0-9]{40,64}$/.test(process.env.GITHUB_SHA)) {
  throw new Error(`Revisión Git inesperada: ${process.env.GITHUB_SHA}`);
}

const metadata = JSON.parse(process.env.BUILD_METADATA);
const image = process.env.IMAGE_NAME;
const tag = process.env.GITHUB_SHA;
const report = {
  schemaVersion: 1,
  source: {
    repository: process.env.GITHUB_REPOSITORY,
    revision: process.env.GITHUB_SHA,
  },
  image: {
    name: image,
    tag,
    digest,
    taggedReference: `${image}:${tag}`,
    immutableReference: `${image}@${digest}`,
  },
  mode: process.env.BUILD_MODE,
  delivery:
    process.env.BUILD_MODE === "build-only"
      ? {
          registryPush: false,
          retainedImage: false,
          note: "El archivo OCI fue efímero y se descarta con el runner.",
        }
      : {
          registryPush: true,
          retainedImage: true,
          note: "La imagen y sus atestaciones se publicaron por referencia inmutable.",
        },
  attestations: {
    sbom: "buildkit-requested",
    provenance: "buildkit-mode-max",
  },
  buildMetadata: metadata,
};

const outputPath = path.resolve(process.env.OUTPUT_PATH);
await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(`Evidencia OCI escrita en ${outputPath}`);
