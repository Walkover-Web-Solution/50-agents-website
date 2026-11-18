/**
 * Ensures /.well-known/ai-catalog.json lists the artifacts Axien find.ai-catalog expects.
 */
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const catalogPath = path.join(root, 'public/.well-known/ai-catalog.json');
const indexPath = path.join(root, 'public/landing/index.html');
const nextConfig = fs.readFileSync(path.join(root, 'next.config.ts'), 'utf8');

let catalog;
try {
  catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
} catch (e) {
  console.error('validate-ai-catalog: invalid catalog JSON:', e.message);
  process.exit(1);
}

if (catalog.specVersion !== '1.0' || !Array.isArray(catalog.entries)) {
  console.error('validate-ai-catalog: specVersion 1.0 and entries array required');
  process.exit(1);
}

const urls = catalog.entries.map((e) => e.url).filter(Boolean);
const mustInclude = [
  'https://50agents.com/mcp/server-card',
  'https://50agents.com/openapi.json',
  'https://50agents.com/help',
  'https://50agents.com/llms.txt',
  'https://50agents.com/.well-known/agent-skills.json',
];
for (const need of mustInclude) {
  if (!urls.includes(need)) {
    console.error(`validate-ai-catalog: missing catalog entry url ${need}`);
    process.exit(1);
  }
}

const landing = fs.readFileSync(indexPath, 'utf8');
if (!landing.includes('rel="ai-catalog" href="/.well-known/ai-catalog.json"')) {
  console.error('validate-ai-catalog: homepage missing <link rel="ai-catalog">');
  process.exit(1);
}

if (!nextConfig.includes('</.well-known/ai-catalog.json>; rel="ai-catalog"')) {
  console.error('validate-ai-catalog: next.config.ts missing ai-catalog Link header');
  process.exit(1);
}

console.log(`validate-ai-catalog: OK (${catalog.entries.length} entries)`);