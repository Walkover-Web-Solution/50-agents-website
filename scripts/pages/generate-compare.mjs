// The page pipeline's writer for the comparison family (D253). For each row in rows-compare.json it builds the input
// bundle (the row, the facts.ts record of every tool on the page, product-facts.md) in inputs/compare/<slug>.json, then,
// when ANTHROPIC_API_KEY is set, asks Claude (with web search) to write the page JSON from prompts/compare.md.
// Without a key, a Claude Code session runs the same prompt on the same bundle. Then: index-compare.mjs, gates-compare.mjs.
// Usage (repo root, Node 23+): node scripts/pages/generate-compare.mjs [slug]
import fs from 'node:fs';
const { TOOLS } = await import(new URL('../../src/content/compare/facts.ts', import.meta.url));
const rows = JSON.parse(fs.readFileSync('scripts/pages/rows-compare.json', 'utf8'));
const facts = fs.readFileSync('scripts/pages/product-facts.md', 'utf8');
const only = process.argv[2];
fs.mkdirSync('scripts/pages/inputs/compare', { recursive: true });
const bundles = [];
for (const row of rows) {
  if (only && row.slug !== only) continue;
  const ids = [...new Set(['fifty', row.tool, ...(row.tools ?? [])])];
  const bundle = { row, tools: Object.fromEntries(ids.map(id => [id, TOOLS[id]])), facts };
  fs.writeFileSync(`scripts/pages/inputs/compare/${row.slug}.json`, JSON.stringify(bundle, null, 1));
  bundles.push(row.slug);
}
console.log(`inputs written: ${bundles.length}`);
const key = process.env.ANTHROPIC_API_KEY;
if (!key) { console.error('No ANTHROPIC_API_KEY: run prompts/compare.md on scripts/pages/inputs/compare/<slug>.json in a Claude Code session.'); process.exit(0); }
const prompt = fs.readFileSync('scripts/pages/prompts/compare.md', 'utf8');
const example = fs.readFileSync('src/content/compare/pages/zapier-alternatives.json', 'utf8');
const types = fs.readFileSync('src/site/compare/types.ts', 'utf8');
for (const slug of bundles) {
  if (slug === 'zapier-alternatives' && !only) continue; // the example page, edited by hand
  const input = fs.readFileSync(`scripts/pages/inputs/compare/${slug}.json`, 'utf8');
  const body = {
    model: 'claude-sonnet-5-5', max_tokens: 8000,
    tools: [{ type: 'web_search_20250305', name: 'web_search', max_uses: 6 }],
    system: prompt,
    messages: [{ role: 'user', content: `types.ts:\n${types}\n\nexample:\n${example}\n\ninput:\n${input}\n\nToday is ${new Date().toISOString().slice(0, 10)}. Return the JSON only.` }],
  };
  const r = await fetch('https://api.anthropic.com/v1/messages', { method: 'POST', headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' }, body: JSON.stringify(body) });
  const j = await r.json();
  const text = (j.content ?? []).filter(c => c.type === 'text').map(c => c.text).join('');
  const json = text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1);
  try { JSON.parse(json); fs.writeFileSync(`src/content/compare/pages/${slug}.json`, json + '\n'); console.log('wrote', slug); }
  catch { console.error('bad JSON for', slug); }
}
