// The page pipeline's writer (brief D7): for each row, Claude (claude-sonnet-5-5, with web search) writes the page JSON
// from the prompt and the input bundle; then run gates.mjs. Needs ANTHROPIC_API_KEY in the environment (never committed).
// Usage: node scripts/pages/build-inputs.mjs && node scripts/pages/generate.mjs [slug]
import fs from 'node:fs';
const key = process.env.ANTHROPIC_API_KEY;
if (!key) { console.error('No ANTHROPIC_API_KEY: set it, or run the prompt on scripts/pages/inputs/<slug>.json in a Claude Code session.'); process.exit(2); }
const prompt = fs.readFileSync('scripts/pages/prompts/use-case.md', 'utf8');
const example = fs.readFileSync('src/content/use-cases/pages/chase-unpaid-invoices.json', 'utf8');
const types = fs.readFileSync('src/site/usecase/types.ts', 'utf8');
const only = process.argv[2];
for (const f of fs.readdirSync('scripts/pages/inputs').filter(f => f.endsWith('.json'))) {
  const slug = f.replace(/\.json$/, '');
  if (only && slug !== only) continue;
  if (slug === 'chase-unpaid-invoices' && !only) continue; // the reference page, written by hand
  const input = fs.readFileSync(`scripts/pages/inputs/${f}`, 'utf8');
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
  try { JSON.parse(json); fs.writeFileSync(`src/content/use-cases/pages/${slug}.json`, json + '\n'); console.log('wrote', slug); }
  catch { console.error('bad JSON for', slug); }
}
