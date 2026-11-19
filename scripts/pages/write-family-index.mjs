// Writes src/content/<family>/pages/index.ts for the hubs and learn families: one import per page JSON (no fs at runtime,
// so pages stay static). Usage: node scripts/pages/write-family-index.mjs hubs|learn
import fs from 'node:fs';
const family = process.argv[2];
const T = { hubs: ['HubPage', '@/site/hubs/types', 'HUB_PAGES'], learn: ['TermPage', '@/site/learn/types', 'TERM_PAGES'] }[family];
if (!T) { console.error('usage: write-family-index.mjs hubs|learn'); process.exit(2); }
const dir = `src/content/${family}/pages`;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json')).sort();
const id = f => 'p_' + f.replace(/\.json$/, '').replace(/[^a-z0-9]/gi, '_');
fs.writeFileSync(`${dir}/index.ts`, `// Written by scripts/pages/write-family-index.mjs ${family}: every page JSON of the family. Don't edit by hand.
import type { ${T[0]} } from '${T[1]}';
${files.map(f => `import ${id(f)} from './${f}';`).join('\n')}

export const ${T[2]} = [${files.map(id).join(', ')}] as ${T[0]}[];
`);
console.log(`${family} index: ${files.length} pages`);
