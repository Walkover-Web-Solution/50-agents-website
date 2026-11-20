// Writer inputs for app lines (T65): one file per app in scripts/pages/inputs/apps/<slug>.json, for app pages that fail the
// uniqueness gate on template text alone. Each gets its own three lines (prompts/app.md). Usage:
// node scripts/pages/build-inputs-apps.mjs <list-file>   (one slug per line)
import fs from 'node:fs';
const CAT = 'src/content/integrations/catalog';
const OUT = 'scripts/pages/inputs/apps';
const idx = JSON.parse(fs.readFileSync(`${CAT}/index.json`, 'utf8')).apps;
const raw = new Map(idx.map(a => [a.s.toLowerCase(), a.s]));
const name = new Map(idx.map(a => [a.s.toLowerCase(), a.n]));
const load = s => JSON.parse(fs.readFileSync(`${CAT}/apps/${raw.get(s) ?? s}.json`, 'utf8'));
const LOOKUP = /^(find|search|get|list|lookup|look up|retrieve|fetch|read|query|view|check|count|describe)\b/i;
fs.mkdirSync(OUT, { recursive: true });
const slugs = fs.readFileSync(process.argv[2], 'utf8').split('\n').map(x => x.trim()).filter(Boolean);
let n = 0;
for (const s of slugs) {
  const A = load(s);
  const trig = A.events.filter(e => e.t === 'trigger').map(e => ({ n: e.n, d: (e.d || '').slice(0, 160), delivery: e.k }));
  const act = A.events.filter(e => e.t !== 'trigger' && !LOOKUP.test(e.n)).map(e => ({ n: e.n, d: (e.d || '').slice(0, 160) }));
  const trigNames = new Set(trig.map(t => t.n.toLowerCase()));
  // real templates with another app, most-used partners first; drop catalog rows that put a trigger in the action slot
  const recipes = A.recipes.filter(r => !LOOKUP.test(r.ae.replace(/_/g, ' ')))
    .filter(r => !(r.aa.toLowerCase() === s && trigNames.has(r.ae.toLowerCase())))
    .slice(0, 20).map(r => `“${r.te}” in ${name.get(r.ta.toLowerCase()) ?? r.ta}, then “${r.ae}” in ${name.get(r.aa.toLowerCase()) ?? r.aa}`);
  fs.writeFileSync(`${OUT}/${s}.json`, JSON.stringify({ app: s, name: A.name, labels: A.labels, about: (A.description || '').slice(0, 220), triggers: trig.slice(0, 25), actions: act.slice(0, 25), templates: recipes }, null, 1));
  n++;
}
console.log(n, 'app inputs written to', OUT);
