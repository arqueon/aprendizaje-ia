import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";

const root = process.cwd();
const stageRoot = path.join(root, "docs/editorial/evidence/udgia-021/diff-p3a");

const mappings = [
  {
    id: "M2",
    source: "docs/editorial/evidence/udgia-021/muestras/cocreacion.md",
    destination: "content/ia-educacion/guias/agenciamiento-humano-ia/index.md",
    title: "Conservar la dirección del trabajo con IA",
    description: "Un caso para distinguir una sugerencia de una decisión y comprender la co-creación sin trasladar la responsabilidad a la herramienta.",
    summary: "Formula, contrasta, decide y conserva un rastro breve de los cambios que puedes sostener.",
    assets: ["comparador-cocreacion.svg"]
  },
  {
    id: "M3",
    source: "docs/editorial/evidence/udgia-021/muestras/aprendizaje-activo.md",
    destination: "content/formacion-docente/aprendizaje-activo/index.md",
    title: "Qué hace activa una experiencia de aprendizaje",
    description: "Cómo reconocer el trabajo cognitivo por lo que la persona produce, contrasta y revisa, no por la cantidad de tecnología o movimiento.",
    summary: "Distingue recibir, manipular, generar y construir para diseñar una actividad que haga visible el aprendizaje.",
    assets: ["acciones-aprendizaje-activo.svg"]
  },
  {
    id: "M4",
    source: "docs/editorial/evidence/udgia-021/muestras/aprendizaje-hibrido.md",
    destination: "content/formacion-docente/aprendizaje-hibrido/index.md",
    title: "Conectar momentos para que el aprendizaje avance",
    description: "Un caso para diseñar continuidad entre momentos presenciales, en línea, síncronos o asíncronos sin confundir modalidad con aprendizaje.",
    summary: "Cada momento recibe, transforma y prepara algo; la conexión importa más que repartir materiales entre aula y plataforma.",
    assets: ["muestra-aprendizaje-hibrido.svg", "muestra-aprendizaje-hibrido-mobile.svg"]
  },
  {
    id: "M5",
    source: "docs/editorial/evidence/udgia-021/muestras/samr-icap.md",
    destination: "content/formacion-docente/modelos-samr-icap/index.md",
    title: "Dos preguntas distintas sobre una misma actividad",
    description: "SAMR describe qué cambió en la tarea e ICAP qué hizo la persona con las ideas; ninguna lente califica por sí sola una tecnología.",
    summary: "Separa transformación tecnológica e implicación cognitiva para evitar escaleras y correspondencias rígidas.",
    assets: ["dos-lentes-samr-icap.svg"]
  },
  {
    id: "M6",
    source: "docs/editorial/evidence/udgia-021/muestras/bloom-diseno-inverso.md",
    destination: "content/formacion-docente/taxonomia-bloom-diseno-inverso/index.md",
    title: "Partir de lo que quieres observar",
    description: "Cómo alinear propósito, evidencia, experiencia y asistencia sin diseñar desde la herramienta ni clasificar una tarea por un verbo aislado.",
    summary: "Bloom ayuda a describir la demanda; el diseño inverso mantiene conectados propósito, evidencia, experiencia y apoyo.",
    assets: ["cadena-diseno-inverso.svg"]
  }
];

function splitDocument(markdown) {
  if (!markdown.startsWith("---\n")) throw new Error("Missing front matter");
  const end = markdown.indexOf("\n---\n", 4);
  if (end < 0) throw new Error("Unclosed front matter");
  return {
    frontMatter: markdown.slice(0, end + 5),
    body: markdown.slice(end + 5).replace(/^\n+/, "")
  };
}

function replaceScalar(frontMatter, key, value) {
  const escaped = JSON.stringify(value);
  const line = new RegExp(`^${key}:.*$`, "m");
  if (line.test(frontMatter)) return frontMatter.replace(line, `${key}: ${escaped}`);
  return frontMatter.replace(/\n---\n$/, `\n${key}: ${escaped}\n---\n`);
}

function prepareBody(body) {
  return body
    .replace(/^# .+\n+/, "")
    .replaceAll("../visual/", "")
    .replaceAll(
      "La propuesta de Orientaciones",
      "[La propuesta de Orientaciones]({{< relref \"ia-educacion/orientaciones\" >}})"
    )
    .replaceAll(
      "La guía para el profesorado",
      "[La guía para el profesorado]({{< relref \"ia-educacion/guias/profesorado\" >}})"
    )
    .replaceAll("](/formacion-docente/aprendizaje-activo/)", "]({{< relref \"formacion-docente/aprendizaje-activo\" >}})")
    .replaceAll("](/formacion-docente/aprendizaje-hibrido/)", "]({{< relref \"formacion-docente/aprendizaje-hibrido\" >}})")
    .replaceAll("](/formacion-docente/modelos-samr-icap/)", "]({{< relref \"formacion-docente/modelos-samr-icap\" >}})")
    .replaceAll("](/formacion-docente/taxonomia-bloom-diseno-inverso/)", "]({{< relref \"formacion-docente/taxonomia-bloom-diseno-inverso\" >}})");
}

async function sha256(file) {
  const data = await readFile(file);
  return createHash("sha256").update(data).digest("hex");
}

await mkdir(stageRoot, { recursive: true });
const manifest = {
  version: "p3a-candidato-1",
  generated_at: new Date().toISOString(),
  scope: "Staging local; no modifica content/ ni autoriza publicación",
  pages: []
};

for (const mapping of mappings) {
  const currentPath = path.join(root, mapping.destination);
  const sourcePath = path.join(root, mapping.source);
  const stagedPath = path.join(stageRoot, mapping.destination);
  const stagedDir = path.dirname(stagedPath);
  await mkdir(stagedDir, { recursive: true });

  const current = splitDocument(await readFile(currentPath, "utf8"));
  let frontMatter = current.frontMatter;
  frontMatter = replaceScalar(frontMatter, "title", mapping.title);
  frontMatter = replaceScalar(frontMatter, "date", "2026-08-03");
  frontMatter = replaceScalar(frontMatter, "lastmod", "2026-08-03");
  frontMatter = replaceScalar(frontMatter, "description", mapping.description);
  frontMatter = replaceScalar(frontMatter, "summary", mapping.summary);
  frontMatter = replaceScalar(frontMatter, "showHero", false);

  const body = prepareBody(await readFile(sourcePath, "utf8"));
  await writeFile(stagedPath, `${frontMatter}\n${body.trim()}\n`, "utf8");

  const assets = [];
  for (const name of mapping.assets) {
    const from = path.join(root, "docs/editorial/evidence/udgia-021/visual", name);
    const to = path.join(stagedDir, name);
    await copyFile(from, to);
    assets.push({ name, sha256: await sha256(to) });
  }

  manifest.pages.push({
    id: mapping.id,
    source: mapping.source,
    destination: mapping.destination,
    staged: path.relative(root, stagedPath),
    sha256: await sha256(stagedPath),
    assets
  });
}

await writeFile(
  path.join(stageRoot, "manifest.json"),
  `${JSON.stringify(manifest, null, 2)}\n`,
  "utf8"
);

const rows = manifest.pages
  .map((page) => `| ${page.id} | \`${page.source}\` | \`${page.destination}\` |`)
  .join("\n");

await writeFile(
  path.join(stageRoot, "README.md"),
  `# UDGIA-021 · candidato P3-A para normalizar L1\n\n` +
    `Este directorio contiene cinco páginas completas y sus SVG como un diff reproducible. ` +
    `No modifica \`content/\`, no publica y no autoriza integración.\n\n` +
    `| Pieza | Fuente editorial | Destino propuesto |\n|---|---|---|\n${rows}\n\n` +
    `Las páginas conservan el front matter funcional de sus destinos, actualizan título, ` +
    `descripción, resumen y fecha, desactivan portadas genéricas, incrustan los SVG del piloto ` +
    `en cada page bundle y convierten las referencias a Orientaciones y guía docente en rutas ` +
    `canónicas. Los hashes recuperables están en \`manifest.json\`.\n`,
  "utf8"
);

console.log(`P3-A preparado: ${manifest.pages.length} páginas en ${path.relative(root, stageRoot)}`);
