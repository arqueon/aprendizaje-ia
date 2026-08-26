#!/usr/bin/env node
import { mkdtemp, readFile, readdir, rm, stat, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const contentRoot = path.join(root, "content");
const debtPath = path.join(root, "data", "editorial", "visual-contract.json");
const reportPath = path.join(
  root,
  "docs",
  "editorial",
  "lotes",
  "2026-08-23-visual-contract-report.json"
);

const isSyncBackup = (name) => /^\..+\.~[a-f0-9]+$/i.test(name);

async function exists(target) {
  try {
    await stat(target);
    return true;
  } catch {
    return false;
  }
}

async function markdownFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const result = [];
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    if (isSyncBackup(entry.name)) continue;
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) result.push(...(await markdownFiles(absolute)));
    else if (entry.isFile() && entry.name.endsWith(".md")) result.push(absolute);
  }
  return result;
}

function frontMatter(source) {
  if (!source.startsWith("---\n")) return "";
  const end = source.indexOf("\n---", 4);
  return end === -1 ? "" : source.slice(4, end);
}

function scalar(fm, key) {
  const match = fm.match(new RegExp(`^\\s*${key}\\s*:\\s*["']?([^\\n"']+)`, "im"));
  return match?.[1]?.trim() || "";
}

async function ownFeatured(markdownPath, fm) {
  if (scalar(fm, "featureimage")) return true;
  if (path.basename(markdownPath) !== "index.md") return false;
  const entries = await readdir(path.dirname(markdownPath), { withFileTypes: true });
  return entries.some(
    (entry) =>
      entry.isFile() &&
      !isSyncBackup(entry.name) &&
      /^(?:featured|feature|cover|thumbnail)\.[a-z0-9]+$/i.test(entry.name)
  );
}

function sortedUnique(items) {
  return [...new Set(items)].sort((a, b) => a.localeCompare(b));
}

function difference(left, right) {
  const rightSet = new Set(right);
  return left.filter((item) => !rightSet.has(item));
}

async function sourceAudit() {
  const pages = [];
  for (const markdownPath of await markdownFiles(contentRoot)) {
    if (path.basename(markdownPath) === "_index.md") continue;
    const source = await readFile(markdownPath, "utf8");
    const fm = frontMatter(source);
    if (/^\s*draft\s*:\s*true\s*$/im.test(fm)) continue;
    const relative = path.relative(contentRoot, markdownPath).split(path.sep).join("/");
    pages.push({
      path: relative,
      title: scalar(fm, "title") || path.basename(relative, ".md"),
      ownFeatured: await ownFeatured(markdownPath, fm),
      heroHidden: /^\s*showHero\s*:\s*false\s*$/im.test(fm)
    });
  }
  return pages;
}

async function sourceCardShortcodeCount() {
  let total = 0;
  for (const markdownPath of await markdownFiles(contentRoot)) {
    const source = await readFile(markdownPath, "utf8");
    total += [...source.matchAll(/\{\{<\s*card\b/g)].length;
  }
  return total;
}

function cardsIn(html) {
  const matches = [];
  const pattern = /<article\b[^>]*(?:data-connection-source=|class="[^"]*article-link--(?:card|related))[\s\S]*?<\/article>/gi;
  for (const match of html.matchAll(pattern)) {
    matches.push({
      html: match[0],
      hasImage: /<img\b/i.test(match[0]),
      href: match[0].match(/<a\b[^>]*href="([^"]+)"/i)?.[1] || ""
    });
  }
  return matches;
}

async function renderedCardAudit(expectedShortcodes) {
  const buildRoot = await mkdtemp(path.join(tmpdir(), "udgia-visual-contract-"));
  try {
    const build = spawnSync(
      "hugo",
      ["--quiet", "--baseURL", "https://example.invalid/", "--destination", buildRoot],
      { cwd: root, encoding: "utf8" }
    );
    if (build.status !== 0) {
      throw new Error(`Hugo no pudo construir el sitio:\n${build.stdout}\n${build.stderr}`);
    }
    const htmlFiles = [];
    async function walk(directory) {
      for (const entry of await readdir(directory, { withFileTypes: true })) {
        const absolute = path.join(directory, entry.name);
        if (entry.isDirectory()) await walk(absolute);
        else if (entry.isFile() && entry.name.endsWith(".html")) htmlFiles.push(absolute);
      }
    }
    await walk(buildRoot);
    const missing = [];
    let total = 0;
    let customCards = 0;
    let customImages = 0;
    for (const htmlPath of htmlFiles) {
      const html = await readFile(htmlPath, "utf8");
      for (const card of cardsIn(html)) {
        total += 1;
        if (!card.hasImage) {
          missing.push({
            page: path.relative(buildRoot, htmlPath).split(path.sep).join("/"),
            href: card.href
          });
        }
      }
      customCards += (html.match(/\bdata-udgia-card(?:\s|=|>)/gi) || []).length;
      customImages += (html.match(/<img\b[^>]*\bdata-udgia-card-image(?:\s|=)/gi) || []).length;
    }
    if (customCards < expectedShortcodes || customImages !== customCards) {
      missing.push({
        page: "shortcode:card",
        href: `${customImages}/${customCards} renderizadas con imagen; ${expectedShortcodes} invocaciones fuente`
      });
    }
    return {
      total: total + customCards,
      missing,
      customCards,
      customImages,
      expectedShortcodes
    };
  } finally {
    await rm(buildRoot, { recursive: true, force: true });
  }
}

async function main() {
  const pages = await sourceAudit();
  const expectedShortcodes = await sourceCardShortcodeCount();
  const actualMissingFeatured = sortedUnique(
    pages.filter((page) => !page.ownFeatured).map((page) => page.path)
  );
  const actualHiddenHeroes = sortedUnique(
    pages.filter((page) => page.heroHidden).map((page) => page.path)
  );
  const debt = (await exists(debtPath))
    ? JSON.parse(await readFile(debtPath, "utf8"))
    : { missingFeatured: [], hiddenHero: [] };
  const allowedMissingFeatured = sortedUnique(debt.missingFeatured || []);
  const allowedHiddenHeroes = sortedUnique(debt.hiddenHero || []);
  const cards = await renderedCardAudit(expectedShortcodes);
  const report = {
    schemaVersion: 1,
    checkedAt: new Date().toISOString(),
    totals: {
      pages: pages.length,
      ownFeatured: pages.length - actualMissingFeatured.length,
      missingFeatured: actualMissingFeatured.length,
      hiddenHero: actualHiddenHeroes.length,
      cards: cards.total,
      cardsWithoutImage: cards.missing.length,
      cardShortcodeSources: cards.expectedShortcodes,
      cardShortcodes: cards.customCards,
      cardShortcodesWithImage: cards.customImages
    },
    unexpected: {
      missingFeatured: difference(actualMissingFeatured, allowedMissingFeatured),
      hiddenHero: difference(actualHiddenHeroes, allowedHiddenHeroes)
    },
    resolvedDebt: {
      missingFeatured: difference(allowedMissingFeatured, actualMissingFeatured),
      hiddenHero: difference(allowedHiddenHeroes, actualHiddenHeroes)
    },
    actual: {
      missingFeatured: actualMissingFeatured,
      hiddenHero: actualHiddenHeroes,
      cardsWithoutImage: cards.missing
    }
  };
  await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  const failures =
    report.unexpected.missingFeatured.length +
    report.unexpected.hiddenHero.length +
    report.resolvedDebt.missingFeatured.length +
    report.resolvedDebt.hiddenHero.length +
    report.totals.cardsWithoutImage;
  if (failures) {
    process.stderr.write(
      `FAIL visual-contract: ${report.totals.missingFeatured} sin featured propio; ` +
        `${report.totals.hiddenHero} ocultan hero; ${report.totals.cardsWithoutImage} cards sin imagen.\n` +
        `Evidencia: ${path.relative(root, reportPath)}\n`
    );
    process.exit(1);
  }
  process.stdout.write(
    `PASS visual-contract: ${report.totals.pages} páginas con contrato gobernado y ` +
      `${report.totals.cards} cards con imagen.\n`
  );
}

await main();
