// Builds the writer input for each indexed pair page (Search S24): one file per pair in inputs/pairs/<a>__<b>.json.
// The pairs are the core and test tiers (pairTier in src/site/integrations/data.ts), read from the dev server's pair
// sitemaps, which are built from pairTier (the aliased TypeScript module cannot be run on its own). Empty
// index-gate.json first ({ "failed": [] }) to list every pair in line, not only those that passed the gate.
// Usage: node scripts/pages/build-inputs-pairs.mjs [http://localhost:3050]
import fs from 'node:fs';
const BASE = process.argv[2]?.startsWith('http') ? process.argv[2] : 'http://localhost:3050';
const CAT = 'src/content/integrations/catalog';
const OUT = process.argv.includes('--out') ? process.argv[process.argv.indexOf('--out') + 1] : 'scripts/pages/inputs/pairs';
const idx = JSON.parse(fs.readFileSync(`${CAT}/index.json`, 'utf8')).apps;
const raw = new Map(idx.map(a => [a.s.toLowerCase(), a.s]));
const loadApp = s => JSON.parse(fs.readFileSync(`${CAT}/apps/${raw.get(s) ?? s}.json`, 'utf8'));
const LOOKUP = /^(find|search|get|list|lookup|look up|retrieve|fetch|read|query|view|check|count|describe)\b/i;
fs.mkdirSync(OUT, { recursive: true });
const paths = [];
// --list <file>: one canonical pair per line (a/b), for a new tier (pairs tier 2, from the catalog's candidates)
const li = process.argv.indexOf('--list');
if (li > 0) paths.push(...fs.readFileSync(process.argv[li + 1], 'utf8').split('\n').map(x => x.trim()).filter(Boolean));
else for (const f of ['pairs', 'pairs-test']) {
  const xml = await (await fetch(`${BASE}/sitemaps/${f}.xml`)).text();
  paths.push(...[...xml.matchAll(/<loc>https:\/\/50agents\.com\/integrations\/([^<]+)<\/loc>/g)].map(m => m[1]));
}
fs.writeFileSync(`${OUT}/_list.txt`, paths.join('\n') + '\n');
for (const p of paths) {
  const [a, b] = p.split('/'), A = loadApp(a), B = loadApp(b);
  const ev = new Map([...A.events.map(e => [`${a}:${e.n}`, e]), ...B.events.map(e => [`${b}:${e.n}`, e])]);
  const seen = new Set();
  const recipes = [...A.recipes, ...B.recipes].map(r => ({ ...r, ta: r.ta.toLowerCase(), aa: r.aa.toLowerCase() }))
    .filter(r => ((r.ta === a && r.aa === b) || (r.ta === b && r.aa === a)) && !LOOKUP.test(r.ae.replace(/_/g, ' ')))
    .filter(r => { const k = JSON.stringify(r); return !seen.has(k) && !!seen.add(k); });
  // Group by action: the templates read "<trigger> in <app> -> <action> in <app>".
  const byAction = {};
  for (const r of recipes) (byAction[`${r.aa}:${r.ae}`] ??= []).push(`${r.ta}:${r.te}`);
  const used = new Set(recipes.flatMap(r => [`${r.ta}:${r.te}`, `${r.aa}:${r.ae}`]));
  const detail = [...used].map(k => ({ key: k, kind: ev.get(k)?.t, delivery: ev.get(k)?.k, description: ev.get(k)?.d })).filter(x => x.kind);
  fs.writeFileSync(`${OUT}/${a}__${b}.json`, JSON.stringify({
    pair: `${a}/${b}`, apps: { [a]: { name: A.name, labels: A.labels, about: A.description.slice(0, 160) }, [b]: { name: B.name, labels: B.labels, about: B.description.slice(0, 160) } },
    templates: Object.entries(byAction).map(([action, triggers]) => ({ action, triggers })), details: detail,
  }, null, 1));
}
console.log(paths.length, 'pairs written to', OUT);
