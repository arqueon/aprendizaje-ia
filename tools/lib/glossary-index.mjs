const normalize = (value) => String(value)
  .normalize('NFD')
  .replace(/\p{Diacritic}/gu, '')
  .toLowerCase()
  .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
  .replace(/[”“"'`*_]/g, '')
  .replace(/[.。]\s*$/u, '')
  .replace(/\s+/g, ' ')
  .trim();

export function auditGlossaryIndex(body, entryTitles) {
  const section = String(body).match(/##\s+Cómo está organizado\s*\n([\s\S]*?)(?=\n##\s|$)/i)?.[1] ?? '';
  const listed = [...section.matchAll(/^-\s+\*\*[^*]+:\*\*\s*(.+)$/gm)]
    .flatMap((match) => match[1]
      .replace(/[.。]\s*$/u, '')
      .replace(/\s+(?:y|e)\s+([^,]+)$/i, ', $1')
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean));
  const expectedByKey = new Map(entryTitles.map((title) => [normalize(title), title]));
  const listedKeys = listed.map(normalize);
  const counts = new Map();
  for (const key of listedKeys) counts.set(key, (counts.get(key) ?? 0) + 1);
  const missing = [...expectedByKey]
    .filter(([key]) => !counts.has(key))
    .map(([, title]) => title)
    .sort((a, b) => a.localeCompare(b, 'es'));
  const unknown = listed
    .filter((title, index) => !expectedByKey.has(listedKeys[index]))
    .sort((a, b) => a.localeCompare(b, 'es'));
  const duplicates = [...counts]
    .filter(([, count]) => count > 1)
    .map(([key]) => expectedByKey.get(key) ?? listed[listedKeys.indexOf(key)])
    .sort((a, b) => a.localeCompare(b, 'es'));
  return {
    listed,
    missing,
    unknown,
    duplicates,
    matches: missing.length === 0 && unknown.length === 0 && duplicates.length === 0,
  };
}
