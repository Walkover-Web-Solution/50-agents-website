// The page pipeline's writer for integration pages (brief D7): for each input bundle, Claude (with web search) writes the
// page JSON from prompts/integration.md; then run gates-integrations.mjs. Needs ANTHROPIC_API_KEY (never committed).
// Usage: node scripts/pages/build-inputs-integrations.mjs [slug | --all] && node scripts/pages/generate-integrations.mjs [slug]
import fs from 'node:fs';
const key = process.env.ANTHROPIC_API_KEY;
if (!key) { console.error('No ANTHROPIC_API_KEY: set it, or run the prompt on scripts/pages/inputs/integrations/<slug>.json in a Claude Code session.'); process.exit(2); }
const IN = 'scripts/pages/inputs/integrations';
const prompt = fs.readFileSync('scripts/pages/prompts/integration.md', 'utf8');
const example = fs.readFileSync('src/content/integrations/pages/hubspot.json', 'utf8');
const types = fs.readFileSync('src/site/integrations/types.ts', 'utf8');
const only = process.argv[2];
for (const f of fs.readdirSync(IN).filter(f => f.endsWith('.json'))) {
  const slug = f.replace(/\.json$/, '');
  if (only && slug !== only) continue;
  const input = fs.readFileSync(`${IN}/${f}`, 'utf8');
  const body = {
    model: 'claude-sonnet-5-5', max_tokens: 8000,
    tools: [{ type: 'web_search_20260209', name: 'web_search', max_uses: 4 }],
    system: prompt,
    messages: [{ role: 'user', content: `types.ts:\n${types}\n\nexample:\n${example}\n\ninput:\n${input}\n\nToday is ${new Date().toISOString().slice(0, 10)}. Return the JSON only.` }],
  };
  const r = await fetch('https://api.anthropic.com/v1/messages', { method: 'POST', headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' }, body: JSON.stringify(body) });
  const j = await r.json();
  const text = (j.content ?? []).filter(c => c.type === 'text').map(c => c.text).join('');
  const json = text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1);
  try { JSON.parse(json); fs.writeFileSync(`src/content/integrations/pages/${slug}.json`, json + '\n'); console.log('wrote', slug, j.usage ? `(in ${j.usage.input_tokens}, out ${j.usage.output_tokens})` : ''); }
  catch { console.error('bad JSON for', slug); }
}
