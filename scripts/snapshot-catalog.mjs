// Snapshot viaSocket's app catalog for the integration and pair pages (pages-brief B8, D4).
// Run: node scripts/snapshot-catalog.mjs [--passes 2] [--top 0]
// Writes src/content/integrations/catalog/: index.json (every app, lean), pairs.json (every pair in the recipes),
// apps/<slug>.json (one app: its triggers, actions and every recipe that touches it). Pages render from these files only.
//
// Sources (public, no auth):
//   all apps   https://plug-service.viasocket.com/api/v1/plugins/all?limit=200&offset=<n>   (popularity order)
//   one app    https://plug-service.viasocket.com/api/v1/plugins/recommend/integrations?service=<slug>
// The recommend endpoint returns a ranked sample of recipes that changes between calls (19 Nov 2026: three calls for
// hubspot gave 62, 52 and 44 recipes with little overlap). So each app is read `passes` times and every recipe seen in
// any app's answer is kept, keyed by its trigger event id and action event id.
import fs from 'node:fs';
import path from 'node:path';

const args = Object.fromEntries(process.argv.slice(2).map((a, i, all) => a.startsWith('--') ? [a.slice(2), all[i + 1]] : null).filter(Boolean));
const PASSES = Number(args.passes ?? 2);
const TOP = Number(args.top ?? 0); // 0 = every app
const CONCURRENCY = 12;
const API = 'https://plug-service.viasocket.com/api/v1/plugins';
const OUT = path.join(process.cwd(), 'src/content/integrations/catalog');
const READ = new Date().toLocaleDateString('en-CA'); // local date, YYYY-MM-DD

// The 20 curated categories (pages-brief B8), each fed by the catalog's raw labels, which overlap ("Sales & CRM", "CRM").
const CATEGORIES = {
  crm: ['CRM', 'Sales and CRM', 'Sales & CRM', 'CRM (Customer Relationship Management)', 'Sales Automation', 'Sales', 'Lead Generation'],
  email: ['Email', 'Email Newsletters', 'Transactional Email', 'Email Marketing', 'Drip Emails', 'Email Verification'],
  ecommerce: ['eCommerce', 'E-commerce', 'Commerce', 'Online Store', 'Retail', 'Digital Products', 'Shipping'],
  accounting: ['Accounting', 'Finance', 'Proposal and Invoice Management', 'Proposal & Invoice Management', 'Taxes', 'Invoicing', 'Budgeting'],
  'project-management': ['Project Management', 'Task Management', 'Product Management', 'Time Tracking Software', 'Time Tracking'],
  'customer-support': ['Customer Support', 'Support', 'Customer Service'],
  forms: ['Forms and Surveys', 'Forms & Surveys', 'Form Building', 'Survey', 'Survey Tools', 'Data Collection'],
  scheduling: ['Scheduling and Booking', 'Scheduling & Booking', 'Scheduling', 'Calendar'],
  payments: ['Payment Processing', 'Subscription Management'],
  'marketing-automation': ['Marketing Automation', 'Marketing', 'Ads & Conversion', 'Ads and Conversion', 'Campaign Management', 'SEO', 'SEO Tools', 'Online Advertising'],
  'social-media': ['Social Media Marketing', 'Social Media Accounts', 'Social Media'],
  databases: ['Databases', 'Spreadsheets', 'Data Management', 'Data'],
  documents: ['Documents', 'Content & Files', 'Content and Files', 'Signatures', 'E-Signature', 'File Management and Storage', 'File Management & Storage', 'Document Management', 'Notes', 'Documentation'],
  communication: ['Communication', 'Team Chat', 'Video Conferencing'],
  hr: ['HR Talent and Recruitment', 'HR Talent & Recruitment', 'Human Resources', 'Payroll'],
  analytics: ['Analytics', 'Business Intelligence', 'Dashboards', 'Data Analysis'],
  'ai-tools': ['AI Tools', 'AI', 'Artificial Intelligence', 'Machine Learning', 'AI (Built-In Plug)', 'Transcription'],
  'developer-tools': ['Developer Tools', 'IT Operations', 'Server Monitoring', 'Engineering', 'SDK', 'API Management', 'API', 'DevOps', 'Web Development', 'Version Control', 'Cloud Computing', 'Testing', 'Incident Management'],
  'phone-and-sms': ['Phone and SMS', 'Phone & SMS', 'Call Tracking', 'Fax'],
  'app-builders': ['App Builder', 'Website & App Building', 'Website and App Building', 'Website Builders'],
};
const LABEL_TO_CAT = new Map(Object.entries(CATEGORIES).flatMap(([cat, labels]) => labels.map(l => [l.toLowerCase(), cat])));

const clean = s => (s ?? '').replace(/\s+/g, ' ').replace(/—|–/g, ', ').trim();
const cut = (s, n) => (s.length > n ? s.slice(0, s.lastIndexOf(' ', n - 1) > 40 ? s.lastIndexOf(' ', n - 1) : n - 1).replace(/[,.;:]$/, '') + '…' : s);

async function get(url, tries = 3) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { headers: { accept: 'application/json', 'user-agent': 'catalog-snapshot/1.0' } });
      if (r.ok) return await r.json();
    } catch {}
    await new Promise(r => setTimeout(r, 600 * (i + 1)));
  }
  return null;
}

async function pool(items, fn) {
  let i = 0, done = 0;
  await Promise.all(Array.from({ length: CONCURRENCY }, async () => {
    while (i < items.length) {
      const k = i++;
      await fn(items[k], k);
      if (++done % 100 === 0) process.stdout.write(`  ${done}/${items.length}\n`);
    }
  }));
}

const t0 = Date.now();
// 1. Every app, in popularity order, first copy of each slug kept. The paged order is not stable between calls
// (apps can repeat or slip between pages), so the list is read twice and merged.
const list = [];
for (let round = 0; round < 2; round++)
  for (let offset = 0; ; offset += 200) {
    const page = await get(`${API}/all?limit=200&offset=${offset}`);
    if (!page?.data?.length) break;
    list.push(...page.data);
  }
const seenSlug = new Set();
const apps = list.filter(a => a.appslugname && !seenSlug.has(a.appslugname) && seenSlug.add(a.appslugname));
const chosen = TOP ? apps.slice(0, TOP) : apps;
console.log(`catalog: ${list.length / 2} rows a read, ${apps.length} apps; reading ${chosen.length} x ${PASSES} passes`);

// 2. Each app's events and recipes.
const events = new Map(); // slug -> [{id,n,d,t,k}]
const meta = new Map(); // slug -> plugin record (from any answer)
const eventIndex = new Map(); // event id -> {app, n, d, t}
const recipes = new Map(); // `${trigger id}>${action id}` -> {ta, te, aa, ae}
let failed = 0;
await pool(chosen.flatMap(a => Array.from({ length: PASSES }, (_, p) => [a.appslugname, p])), async ([slug, p]) => {
  const d = await get(`${API}/recommend/integrations?service=${encodeURIComponent(slug)}${p ? `&pass=${p}` : ''}`);
  if (!d) { failed++; return; }
  for (const [s, pl] of Object.entries(d.plugins ?? {})) {
    if (!meta.has(s)) meta.set(s, pl);
    for (const e of pl.events ?? []) eventIndex.set(e.rowid, { app: s, n: clean(e.name), d: clean(e.description), t: e.type });
    if (s === slug && !events.has(s)) events.set(s, (pl.events ?? []).map(e => ({ id: e.rowid, n: clean(e.name), d: cut(clean(e.description), 220), t: e.type === 'trigger' ? 'trigger' : 'action', k: e.triggertype === 'polling' ? 'polling' : 'hook' })));
  }
  for (const c of d.combinations ?? []) {
    const tr = c.trigger, ac = c.actions?.[0];
    if (!tr?.id || !ac?.id || tr.name === ac.name) continue;
    recipes.set(`${tr.id}>${ac.id}`, { tid: tr.id, aid: ac.id, ta: tr.name, aa: ac.name });
  }
});

// 3. Resolve recipe names; drop any whose events the catalog didn't describe.
const rec = [];
for (const r of recipes.values()) {
  const te = eventIndex.get(r.tid), ae = eventIndex.get(r.aid);
  if (!te || !ae) continue;
  rec.push({ ta: r.ta, te: te.n, aa: r.aa, ae: ae.n }); // descriptions live once, in each app's own events
}
const appBySlug = new Map(apps.map(a => [a.appslugname, a]));
const known = s => appBySlug.has(s);
const seenRec = new Set(); // one recipe per app and event name pair (some apps list two events with the same name)
const usable = rec.filter(r => known(r.ta) && known(r.aa)).filter(r => { const k = `${r.ta}|${r.te}|${r.aa}|${r.ae}`; return !seenRec.has(k) && !!seenRec.add(k); });

// 4. Pairs, in canonical order: the trigger app first; if recipes run both ways, alphabetical (B8).
const pairMap = new Map();
for (const r of usable) {
  const key = [r.ta, r.aa].sort().join('|');
  const p = pairMap.get(key) ?? { fwd: new Set(), n: 0 };
  p.fwd.add(r.ta); p.n++;
  pairMap.set(key, p);
}
const pairs = [...pairMap.entries()].map(([key, p]) => {
  const [x, y] = key.split('|');
  const [a, b] = p.fwd.size === 1 ? [[...p.fwd][0], [...p.fwd][0] === x ? y : x] : [x, y];
  return { a, b, n: p.n };
}).sort((p, q) => q.n - p.n || p.a.localeCompare(q.a));

// 5. Write.
fs.rmSync(path.join(OUT, 'apps'), { recursive: true, force: true });
fs.mkdirSync(path.join(OUT, 'apps'), { recursive: true });
const recipesOf = new Map();
for (const r of usable) for (const s of new Set([r.ta, r.aa])) (recipesOf.get(s) ?? recipesOf.set(s, []).get(s)).push(r);

const index = [];
apps.forEach((a, rank) => {
  const s = a.appslugname;
  const m = meta.get(s);
  const ev = events.get(s) ?? [];
  const cats = [...new Set((a.category ?? []).map(l => LABEL_TO_CAT.get(clean(l).toLowerCase())).filter(Boolean))];
  const rs = recipesOf.get(s) ?? [];
  const t = ev.filter(e => e.t === 'trigger').length, ac = ev.length - t;
  const read = events.has(s);
  index.push({ s, n: clean(a.name), i: a.iconurl || m?.iconurl || '', c: cats, t, a: ac, r: rs.length, ...(read ? {} : { u: 1 }) });
  const file = {
    slug: s,
    name: clean(a.name),
    description: clean(a.description || m?.description),
    icon: a.iconurl || m?.iconurl || '',
    domain: a.domain || m?.domain || '',
    rank: rank + 1,
    labels: (a.category ?? []).map(clean).filter(Boolean),
    categories: cats,
    eventsRead: read,
    events: ev.map(({ id, ...e }) => e),
    recipes: rs,
  };
  fs.writeFileSync(path.join(OUT, 'apps', `${s}.json`), JSON.stringify(file));
});
fs.writeFileSync(path.join(OUT, 'index.json'), JSON.stringify({ read: READ, source: `${API}/all`, apps: index }));
fs.writeFileSync(path.join(OUT, 'pairs.json'), JSON.stringify({ read: READ, source: `${API}/recommend/integrations`, pairs }));

const secs = ((Date.now() - t0) / 1000).toFixed(0);
const idx = index.filter(x => x.t + x.a >= 5 && x.r >= 1).length;
console.log(`read ${READ} in ${secs}s: ${apps.length} apps (${events.size} with events, ${failed} failed calls), ${usable.length} recipes, ${pairs.length} pairs (${pairs.filter(p => p.n >= 3).length} with 3+), ${idx} apps indexable`);
