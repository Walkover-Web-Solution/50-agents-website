// Writes src/content/compare/pages/index.ts (one import per comparison page JSON, so pages stay static) and
// src/content/compare/paths.ts (the paths routes.ts and the sitemap read). Run after the writer, before the gates.
import fs from 'node:fs';
const dir = 'src/content/compare/pages';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json')).sort();
const order = JSON.parse(fs.readFileSync('scripts/pages/rows-compare.json', 'utf8')).map(r => r.slug).filter(s => files.includes(`${s}.json`));
const id = s => 'p_' + s.replace(/[^a-z0-9]/gi, '_');
fs.writeFileSync(`${dir}/index.ts`, `// Written by scripts/pages/index-compare.mjs: every comparison page JSON, in the rows' order. Don't edit by hand.
import type { ComparePage } from '@/site/compare/types';
${order.map(s => `import ${id(s)} from './${s}.json';`).join('\n')}

export const COMPARE = [${order.map(id).join(', ')}] as ComparePage[];
`);
fs.writeFileSync('src/content/compare/paths.ts', `// The paths of this family's pages that exist (read by src/site/routes.ts). Written by scripts/pages/index-compare.mjs.
// Kept as plain strings (not imported from the content) so routes.ts stays light.
export const PATHS: string[] = [
${order.map(s => `  '/compare/${s}',`).join('\n')}
];
`);
console.log(`compare index: ${order.length} pages`);
