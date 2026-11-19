// Writes the content index of a family's page JSONs (no fs at runtime, so pages stay static) and its paths.ts (the list
// src/site/routes.ts reads). Usage: node scripts/pages/write-index-family.mjs guides|for
import fs from 'node:fs';
const FAMILIES = {
  guides: { dir: 'src/content/guides/pages', type: 'GuidePage', from: '@/site/guides/types', name: 'GUIDES', base: '/guides/', paths: 'src/content/guides/paths.ts' },
  for: { dir: 'src/content/for/pages', type: 'RolePage', from: '@/site/for/types', name: 'ROLES', base: '/for/', paths: 'src/content/for/paths.ts' },
};
const fam = process.argv[2], f = FAMILIES[fam];
if (!f) { console.error('Usage: node scripts/pages/write-index-family.mjs guides|for'); process.exit(2); }
// The order the rows give (scripts/pages/rows-<family>.json), so a new page is a new row.
const order = JSON.parse(fs.readFileSync(`scripts/pages/rows-${fam}.json`, 'utf8')).map(r => r.slug);
const files = fs.readdirSync(f.dir).filter(x => x.endsWith('.json')).map(x => x.replace(/\.json$/, '')).sort((a, b) => (order.indexOf(a) + 1 || 999) - (order.indexOf(b) + 1 || 999));
const id = s => 'p_' + s.replace(/[^a-z0-9]/gi, '_');
fs.writeFileSync(`${f.dir}/index.ts`, `// Written by scripts/pages/write-index-family.mjs ${fam}: every page JSON of the family. Don't edit by hand.
import type { ${f.type} } from '${f.from}';
${files.map(s => `import ${id(s)} from './${s}.json';`).join('\n')}

export const ${f.name} = [${files.map(id).join(', ')}] as ${f.type}[];
`);
fs.writeFileSync(f.paths, `// Written by scripts/pages/write-index-family.mjs ${fam}: the paths of this family's pages that exist (read by
// src/site/routes.ts). Plain strings, so every page's links can read it without loading the content.
export const PATHS: string[] = [
${files.map(s => `  '${f.base}${s}',`).join('\n')}
];
`);
console.log(`${fam}: ${files.length} pages`);
