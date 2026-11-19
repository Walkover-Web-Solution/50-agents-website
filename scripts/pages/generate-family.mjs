// The page pipeline's writer for the guides and the role pages (D253): for each row, Claude (claude-sonnet-5-5, with web
// search) writes the page JSON from the family's prompt and an input bundle built here; then run the family's gates and
// write-index-family.mjs. Needs ANTHROPIC_API_KEY (never committed). Without it, prints the bundle so a Claude Code session
// can run the same prompt on the same inputs.
// Usage: node scripts/pages/generate-family.mjs guides|for [slug]
import fs from 'node:fs';
const FAM = {
  guides: { prompt: 'guides.md', types: 'src/site/guides/types.ts', example: 'src/content/guides/pages/how-to-automate-invoice-reminders.json', out: 'src/content/guides/pages' },
  for: { prompt: 'for.md', types: 'src/site/for/types.ts', example: 'src/content/for/pages/sales.json', out: 'src/content/for/pages' },
};
const [fam, only] = process.argv.slice(2), f = FAM[fam];
if (!f) { console.error('Usage: node scripts/pages/generate-family.mjs guides|for [slug]'); process.exit(2); }
const read = p => fs.readFileSync(p, 'utf8');
const facts = read('scripts/pages/product-facts.md');
const ucDir = 'src/content/use-cases/pages';
const useCases = fs.readdirSync(ucDir).filter(x => x.endsWith('.json')).map(x => JSON.parse(read(`${ucDir}/${x}`)));
const catalog = slugs => slugs.filter(s => fs.existsSync(`src/content/integrations/catalog/apps/${s}.json`)).map(s => {
  const a = JSON.parse(read(`src/content/integrations/catalog/apps/${s}.json`));
  return { slug: a.slug, name: a.name, events: a.events.map(e => ({ name: e.n, type: e.t, about: e.d })) };
});
function bundle(row) {
  if (fam === 'guides') {
    const uc = useCases.find(u => u.slug === row.useCase);
    return { row, useCase: uc ?? null, catalog: catalog(uc?.build.apps ?? row.apps ?? []), facts };
  }
  return { row, useCases: useCases.map(u => ({ slug: u.slug, kind: u.kind, h1: u.h1, ask: u.ask })), catalog: catalog(row.apps), facts };
}
const rows = JSON.parse(read(`scripts/pages/rows-${fam}.json`)).filter(r => !only || r.slug === only);
const key = process.env.ANTHROPIC_API_KEY;
if (!key) {
  console.error(`No ANTHROPIC_API_KEY: run scripts/pages/prompts/${f.prompt} in a Claude Code session on the bundle below.`);
  console.log(JSON.stringify(rows.map(bundle), null, 1));
  process.exit(2);
}
const system = read(`scripts/pages/prompts/${f.prompt}`), types = read(f.types), example = read(f.example);
for (const row of rows) {
  const body = {
    model: 'claude-sonnet-5-5', max_tokens: 12000,
    tools: [{ type: 'web_search_20250305', name: 'web_search', max_uses: 8 }],
    system,
    messages: [{ role: 'user', content: `types.ts:\n${types}\n\nexample:\n${example}\n\ninput:\n${JSON.stringify(bundle(row), null, 1)}\n\nToday is ${new Date().toISOString().slice(0, 10)}. Return the JSON only.` }],
  };
  const r = await fetch('https://api.anthropic.com/v1/messages', { method: 'POST', headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' }, body: JSON.stringify(body) });
  const j = await r.json();
  const text = (j.content ?? []).filter(c => c.type === 'text').map(c => c.text).join('');
  const json = text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1);
  try { JSON.parse(json); fs.writeFileSync(`${f.out}/${row.slug}.json`, json + '\n'); console.log('wrote', row.slug); }
  catch { console.error('bad JSON for', row.slug); }
}
