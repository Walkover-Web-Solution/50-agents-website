// Writes src/content/use-cases/pages/index.ts: one import per page JSON (no fs at runtime, so pages stay static).
import fs from 'node:fs';
const dir = 'src/content/use-cases/pages';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json')).sort();
const id = f => 'p_' + f.replace(/\.json$/, '').replace(/[^a-z0-9]/gi, '_');
const out = `// Written by scripts/pages/write-index.mjs: every use case page JSON. Don't edit by hand.
import type { UseCasePage } from '@/site/usecase/types';
${files.map(f => `import ${id(f)} from './${f}';`).join('\n')}

export const PAGES = [${files.map(id).join(', ')}] as UseCasePage[];
`;
fs.writeFileSync(`${dir}/index.ts`, out);
console.log(`index: ${files.length} pages`);
