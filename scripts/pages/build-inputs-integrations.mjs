// Builds the input bundle for each integration page (row + the app's catalog events, top recipes and partners + product
// facts), one file per app in inputs/integrations/. Rows come from rows-integrations.json (the flagships); with
// `--all` or an app slug, a row is made from the catalog for any other app (query "<App> integrations", its top recipe
// as the ask), so the same prompt can write all ~1,900 pages.
// Usage: node scripts/pages/build-inputs-integrations.mjs [slug | --all]
import fs from 'node:fs';
const CAT = 'src/content/integrations/catalog';
const OUT = 'scripts/pages/inputs/integrations';
const index = JSON.parse(fs.readFileSync(`${CAT}/index.json`, 'utf8')).apps;
const rank = new Map(index.map((a, i) => [a.s, i]));
const name = s => index.find(a => a.s === s)?.n ?? s;
const facts = fs.readFileSync('scripts/pages/product-facts.md', 'utf8');
const rows = JSON.parse(fs.readFileSync('scripts/pages/rows-integrations.json', 'utf8'));
const useCases = fs.readdirSync('src/content/use-cases/pages').filter(f => f.endsWith('.json')).map(f => JSON.parse(fs.readFileSync(`src/content/use-cases/pages/${f}`, 'utf8')));
const arg = process.argv[2];

const other = (r, s) => (r.ta === s ? r.aa : r.ta);
const clause = r => `when ${r.te} in ${name(r.ta)}, ${r.ae} in ${name(r.aa)}`;
function rowFor(slug) {
  const found = rows.find(r => r.slug === slug);
  if (found) return found;
  const a = JSON.parse(fs.readFileSync(`${CAT}/apps/${slug}.json`, 'utf8'));
  const r0 = [...a.recipes].sort((x, y) => (rank.get(other(x, slug)) ?? 1e9) - (rank.get(other(y, slug)) ?? 1e9))[0];
  return {
    slug, query: `${a.name} integrations`,
    ask: r0 ? `Set up an automation: ${clause(r0)}` : `Tell me what you can build with ${a.name}`,
    recipe: r0, useCases: useCases.filter(u => u.build.apps.includes(slug)).map(u => u.slug), native: [], own: 'Generated from the catalog',
  };
}

const slugs = arg === '--all' ? index.map(a => a.s) : arg ? [arg] : rows.map(r => r.slug);
fs.mkdirSync(OUT, { recursive: true });
for (const slug of slugs) {
  const a = JSON.parse(fs.readFileSync(`${CAT}/apps/${slug}.json`, 'utf8'));
  const sorted = [...a.recipes].sort((x, y) => (rank.get(other(x, slug)) ?? 1e9) - (rank.get(other(y, slug)) ?? 1e9));
  const n = new Map(); a.recipes.forEach(r => n.set(other(r, slug), (n.get(other(r, slug)) ?? 0) + 1));
  const partners = [...n.keys()].sort((x, y) => (rank.get(x) ?? 1e9) - (rank.get(y) ?? 1e9)).slice(0, 12).map(s => ({ slug: s, name: name(s) }));
  const bundle = {
    row: rowFor(slug),
    app: { slug, name: a.name, domain: a.domain, events: a.events.map(e => ({ name: e.n, type: e.t, about: e.d })) },
    recipes: sorted.slice(0, 20).map(r => ({ trigger: { app: name(r.ta), event: r.te }, action: { app: name(r.aa), event: r.ae } })),
    partners,
    useCases: (rowFor(slug).useCases ?? []).map(u => { const x = useCases.find(y => y.slug === u); return x && { slug: u, h1: x.h1, apps: x.build.apps.map(name) }; }).filter(Boolean),
    facts,
  };
  fs.writeFileSync(`${OUT}/${slug}.json`, JSON.stringify(bundle, null, 1));
}
console.log(`inputs written: ${slugs.length}`);
