// The page pipeline's gates (brief D7) for integration pages, in code, on every JSON in src/content/integrations/pages.
// Shape, style, facts against the catalog (every app, trigger and action named exists in the input), uniqueness and
// length. Writes report-integrations.md. A page that fails is regenerated once; if it fails again it is listed and the
// app keeps its template page (delete the JSON).
// Usage: node scripts/pages/gates-integrations.mjs
import fs from 'node:fs';
const DIR = 'src/content/integrations/pages';
const CAT = 'src/content/integrations/catalog';
const rows = Object.fromEntries(JSON.parse(fs.readFileSync('scripts/pages/rows-integrations.json', 'utf8')).map(r => [r.slug, r]));
const index = JSON.parse(fs.readFileSync(`${CAT}/index.json`, 'utf8')).apps;
const bySlug = new Map(index.map(a => [a.s, a]));
const useCases = new Set(fs.readdirSync('src/content/use-cases/pages').filter(f => f.endsWith('.json')).map(f => f.replace(/\.json$/, '')));
const loadApp = s => JSON.parse(fs.readFileSync(`${CAT}/apps/${s}.json`, 'utf8'));
const BANNED = ['unlock', 'unleash', 'seamless', 'effortless', 'leverage', 'robust', 'elevate', 'empower', 'supercharge', 'game-changer', 'revolutioniz', 'cutting-edge', 'delve', 'harness', 'streamline', 'synergy', 'journey', 'landscape', 'realm', 'tapestry', "today's fast-paced", 'look no further', 'say goodbye to', 'next level', 'imagine a world'];
// Words that are also catalog app names but, on these pages, are the product's own words or plain English.
const NOT_APPS = new Set(['Email', 'Rows', 'Reply', 'Flow', 'Captain', 'Activity', 'Settings', 'Needs', 'Home', 'Slackbot', 'Sidekick', 'Breeze', 'Agent Hub', 'Agent Builder', 'Agentforce']);
// Single-word app names that are plain English words ("Email", "Rows", "Flow") are only checked when they are not.
const DICT = fs.existsSync('/usr/share/dict/words') ? new Set(fs.readFileSync('/usr/share/dict/words', 'utf8').toLowerCase().split('\n')) : new Set();
const ORDER = ['auto', 'ai', 'browser', 'app'];
const words = s => s.split(/\s+/).filter(Boolean).length;
const norm = s => s.toLowerCase().replace(/_/g, ' ').replace(/\s+/g, ' ').trim();
const texts = p => [p.title, p.description, p.h1, ...p.answer, p.build.name, p.build.line, p.build.when, ...p.build.does, p.build.asksFirst,
  ...p.kinds.flatMap(k => [k.title, k.body]), ...p.groups.flatMap(g => [g.label, g.line ?? '']), ...p.faqs.flatMap(f => [f.q, f.a])];
const shingles = t => { const w = t.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter(Boolean), s = new Set(); for (let i = 0; i + 5 <= w.length; i++) s.add(w.slice(i, i + 5).join(' ')); return s; };
const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const pages = fs.readdirSync(DIR).filter(f => f.endsWith('.json')).map(f => JSON.parse(fs.readFileSync(`${DIR}/${f}`, 'utf8')));
const sh = Object.fromEntries(pages.map(p => [p.slug, shingles(texts(p).join(' '))]));
const report = [];
let failed = 0;
for (const p of pages) {
  const bad = [], row = rows[p.slug], all = texts(p).join('\n');
  if (!bySlug.has(p.slug)) { report.push(`| ${p.slug} | 0 | FAIL: not in the catalog |`); failed++; continue; }
  const app = loadApp(p.slug);
  const eventNames = new Map(app.events.map(e => [norm(e.n), e.n]));
  // The apps this page may name: itself, every app it has a recipe with, and the recipe's apps.
  const ucApps = (row?.useCases ?? []).filter(u => useCases.has(u)).flatMap(u => JSON.parse(fs.readFileSync(`src/content/use-cases/pages/${u}.json`, 'utf8')).build.apps);
  const allowed = new Set([p.slug, ...app.recipes.flatMap(r => [r.ta, r.aa]), ...(p.recipe ? [p.recipe.ta, p.recipe.aa] : []), ...ucApps]);

  // shape
  if (row) {
    if (p.ask !== row.ask) bad.push('ask differs from the row');
    if (JSON.stringify(p.recipe) !== JSON.stringify(row.recipe)) bad.push('recipe differs from the row');
  }
  if (p.title.length > 60 || !p.title.endsWith(' | 50agents')) bad.push(`title "${p.title}" (${p.title.length} chars)`);
  if (p.description.length < 120 || p.description.length > 160) bad.push(`description ${p.description.length} chars`);
  if (!Array.isArray(p.answer) || p.answer.length !== 2) bad.push('answer is not two sentences');
  else if (words(p.answer.join(' ')) > 40) bad.push(`answer is ${words(p.answer.join(' '))} words, over 40 (D254)`);
  if (!p.build || !p.build.name || !p.build.when || !p.build.does?.length || !p.build.asksFirst) bad.push('build incomplete');
  if (words(p.build.asksFirst) > 8) bad.push('build.asksFirst over 8 words');
  if (p.kinds.length !== 4 || p.kinds.some((k, i) => k.kind !== ORDER[i])) bad.push(`kinds not ${ORDER.join(', ')}`);
  if (p.kinds[0] && p.kinds[0].ask !== p.ask) bad.push('the automation card’s ask is not the page’s ask');
  p.kinds.forEach(k => {
    if (words(k.title) > 8) bad.push(`kind title "${k.title}" over 8 words`);
    if (words(k.body) > 40) bad.push(`kind "${k.title}" body is ${words(k.body)} words`);
    if (!k.ask) bad.push(`kind "${k.title}" has no ask`);
    if (k.useCase && !useCases.has(k.useCase)) bad.push(`use case ${k.useCase} does not exist`);
    if (k.useCase && row && !row.useCases.includes(k.useCase)) bad.push(`use case ${k.useCase} not in the row`);
  });
  if (p.faqs.length < 4 || p.faqs.length > 6) bad.push(`faqs ${p.faqs.length}, not 4 to 6`);
  p.faqs.forEach(f => { const n = f.a.split(/(?<=[.?])\s+/).length; if (n > 3) bad.push(`faq "${f.q}" is ${n} sentences`); });
  if (!/^\d{4}-\d{2}-\d{2}$/.test(p.updated)) bad.push('updated is not an ISO date');

  // facts: the recipe, every event, every quoted name, every app named
  if (p.recipe) {
    const host = [p.recipe.ta, p.recipe.aa].find(s => bySlug.has(s));
    const ok = host && loadApp(host).recipes.some(r => r.ta === p.recipe.ta && r.te === p.recipe.te && r.aa === p.recipe.aa && r.ae === p.recipe.ae);
    if (!ok) bad.push(`recipe ${p.recipe.ta}:${p.recipe.te} -> ${p.recipe.aa}:${p.recipe.ae} is not in the catalog`);
    if (p.recipe.ta !== p.slug && p.recipe.aa !== p.slug) bad.push('recipe does not use this app');
  } else if (row) bad.push('no recipe');
  p.build.apps.forEach(a => !bySlug.has(a) && bad.push(`build app ${a} not in the catalog`));
  if (p.recipe && [...new Set([p.recipe.ta, p.recipe.aa])].sort().join() !== [...p.build.apps].sort().join()) bad.push('build.apps are not the recipe’s apps');
  p.kinds.forEach(k => k.uses.forEach(n => !eventNames.has(norm(n)) && bad.push(`"${n}" is not a ${app.name} trigger or action`)));
  const grouped = p.groups.flatMap(g => g.events);
  grouped.forEach(n => !eventNames.has(norm(n)) && bad.push(`grouped "${n}" is not a ${app.name} trigger or action`));
  const dup = grouped.filter((n, i) => grouped.indexOf(n) !== i);
  if (dup.length) bad.push(`in two groups: ${dup.join(', ')}`);
  const missing = app.events.map(e => e.n).filter(n => !grouped.includes(n));
  if (missing.length) bad.push(`not in a group: ${missing.join(', ')}`);
  if (app.events.length >= 8 && (p.groups.length < 3 || p.groups.length > 9)) bad.push(`${p.groups.length} groups, not 3 to 9`);
  p.groups.forEach(g => g.line && words(g.line) > 30 && bad.push(`group "${g.label}" line over 30 words`));
  // Every name in curly quotes is a trigger or action of an app on the page, or words from one of the page's asks.
  const asks = [p.ask, ...p.kinds.map(k => k.ask)].map(norm);
  const anyEvent = new Set([...eventNames.keys(), ...[...allowed].filter(s => bySlug.has(s) && s !== p.slug).flatMap(s => loadApp(s).events.map(e => norm(e.n)))]);
  for (const m of all.matchAll(/“([^”]+)”/g)) {
    const q = norm(m[1]).replace(/[.,]$/, '');
    if (!anyEvent.has(q) && !asks.some(a => a.includes(q))) bad.push(`quoted “${m[1]}” is neither a trigger, an action nor the ask`);
  }
  // Every catalog app named in the words is this app, a recipe partner or a recipe app.
  for (const a of index) {
    if (allowed.has(a.s) || a.n.length < 4 || NOT_APPS.has(a.n) || (!/\s/.test(a.n) && DICT.has(a.n.toLowerCase()))) continue;
    if (new RegExp(`(^|[^\\w-])${esc(a.n)}(?![\\w-])`).test(all)) bad.push(`names ${a.n}, not in the input`);
  }

  // style
  if (/—/.test(all)) bad.push('em dash');
  if (/!/.test(all)) bad.push('exclamation mark');
  BANNED.forEach(b => all.toLowerCase().includes(b) && bad.push(`banned: ${b}`));
  if (/ViaSocket/.test(all)) bad.push('ViaSocket');
  if (/credit/i.test(all.replace(/store credit/gi, ''))) bad.push('mentions credits');
  if (/\$\s?\d|\bper month\b|\/mo\b/i.test(all)) bad.push('a price');
  if (/\b(19|20)\d\d\b|\b(January|February|March|April|June|July|August|September|October|November|December) \d{4}\b|\bread \d/i.test(all)) bad.push('a date or year in the text');
  const bare = [...all.replace(/Agent (Hub|Builder)/g, '').matchAll(/(\S+)\s+agents?\b/gi)].map(m => m[1]).filter(w => !/^(AI|browser|50)$/i.test(w));
  if (/^agents?\b/im.test(all) || bare.length) bad.push(`bare "agent" after: ${[...new Set(bare)].join(', ')}`);
  const counts = (all.match(/\b\d{1,3}(,\d{3})+\+?/g) || []).filter(n => n !== '2,300+');
  if (counts.length) bad.push(`numbers to check: ${counts.join(', ')}`);
  if (/\b\d+ (triggers?|actions?|recipes?|templates?)\b/i.test(all)) bad.push('a count of triggers, actions or templates');
  if (/\brecipes?\b/i.test(all)) bad.push('says "recipe": the page word is "template" (D254)');

  // uniqueness
  for (const q of pages) {
    if (q.slug === p.slug) continue;
    const a = sh[p.slug], b = sh[q.slug]; let n = 0; a.forEach(x => b.has(x) && n++);
    const j = n / Math.max(1, Math.min(a.size, b.size));
    if (j >= 0.5) bad.push(`overlaps ${q.slug} (${j.toFixed(2)})`);
  }
  // length
  if (words(all) < 450) bad.push(`only ${words(all)} words of its own`);
  if (bad.length) failed++;
  report.push(`| ${p.slug} | ${words(all)} | ${bad.length ? 'FAIL: ' + bad.join('; ') : 'pass'} |`);
}

// ---- Pair lines (Search S24): src/content/integrations/pairs/<a>__<b>.json, one per indexed pair ----
const PAIRS = 'src/content/integrations/pairs';
const pairRows = [];
let pairFailed = 0;
const pairFiles = fs.existsSync(PAIRS) ? fs.readdirSync(PAIRS).filter(f => f.endsWith('.json')).sort() : [];
for (const f of pairFiles) {
  const [a, b] = f.replace(/\.json$/, '').split('__');
  const bad = [];
  let d;
  try { d = JSON.parse(fs.readFileSync(`${PAIRS}/${f}`, 'utf8')); } catch { pairRows.push(`| ${a}/${b} | FAIL: not JSON |`); pairFailed++; continue; }
  const strs = [d.usedFor, d.bestTemplate?.name, d.bestTemplate?.why, d.watchOut];
  if (strs.some(x => typeof x !== 'string' || !x.trim())) bad.push('a field is missing');
  else {
    const A = JSON.parse(fs.readFileSync(`${CAT}/apps/${index.find(x => x.s.toLowerCase() === a)?.s ?? a}.json`, 'utf8'));
    const B = JSON.parse(fs.readFileSync(`${CAT}/apps/${index.find(x => x.s.toLowerCase() === b)?.s ?? b}.json`, 'utf8'));
    const all = strs.join('\n');
    for (const [k, t] of [['usedFor', d.usedFor], ['bestTemplate.why', d.bestTemplate.why], ['watchOut', d.watchOut]]) {
      const n = t.split(/(?<=[.?])\s+/).length;
      if (n > 3) bad.push(`${k} is ${n} sentences`);
      if (words(t) > 60) bad.push(`${k} is ${words(t)} words`);
    }
    if (!all.includes(A.name) || !all.includes(B.name)) bad.push('does not name both apps');
    if (!d.usedFor.includes(A.name) && !d.usedFor.includes(B.name)) bad.push('usedFor names neither app');
    // Facts: the template named is a real one (its trigger and action in the catalog's words, in this pair's templates).
    const events = new Map([...A.events, ...B.events].map(e => [norm(e.n), e]));
    const quoted = [...d.bestTemplate.name.matchAll(/“([^”]+)”/g)].map(m => norm(m[1]));
    if (quoted.length !== 2 || !quoted.every(n => events.has(n))) bad.push('bestTemplate.name must quote one trigger and one action of the pair');
    else {
      const [t, ac] = quoted;
      const ok = [...A.recipes, ...B.recipes].some(r => norm(r.te) === t && norm(r.ae) === ac && [r.ta, r.aa].map(x => x.toLowerCase()).sort().join() === [a, b].sort().join());
      if (!ok) bad.push('bestTemplate is not a template between these two apps');
    }
    for (const m of all.matchAll(/“([^”]+)”/g)) if (!events.has(norm(m[1]).replace(/[.,]$/, ''))) bad.push(`quoted “${m[1]}” is not a trigger or action of either app`);
    for (const x of index) {
      if (x.s.toLowerCase() === a || x.s.toLowerCase() === b || A.name.includes(x.n) || B.name.includes(x.n) || x.n.length < 4 || NOT_APPS.has(x.n) || (!/\s/.test(x.n) && DICT.has(x.n.toLowerCase()))) continue;
      if (new RegExp(`(^|[^\\w-])${esc(x.n)}(?![\\w-])`).test(all)) bad.push(`names ${x.n}, a third app`);
    }
    if (/—/.test(all)) bad.push('em dash');
    if (/!/.test(all)) bad.push('exclamation mark');
    BANNED.forEach(w => all.toLowerCase().includes(w) && bad.push(`banned: ${w}`));
    if (/ViaSocket/.test(all)) bad.push('ViaSocket');
    if (/credit/i.test(all)) bad.push('mentions credits');
    if (/\$\s?\d|\bper month\b/i.test(all)) bad.push('a price');
    if (/\b(19|20)\d\d\b/.test(all)) bad.push('a year');
    const bare = [...all.matchAll(/(\S+)\s+agents?\b/gi)].map(m => m[1]).filter(w => !/^(AI|browser|50)$/i.test(w));
    if (/^agents?\b/im.test(all) || bare.length) bad.push(`bare "agent" after: ${[...new Set(bare)].join(', ')}`);
    if (/\brecipes?\b/i.test(all)) bad.push('says "recipe"');
    if (/\b\d+ (triggers?|actions?|templates?)\b/i.test(all)) bad.push('a count');
  }
  if (bad.length) pairFailed++;
  pairRows.push(`| ${a}/${b} | ${bad.length ? 'FAIL: ' + [...new Set(bad)].join('; ') : 'pass'} |`);
}
const md = `# Gate report: integrations\n\nPages ${pages.length}, passed ${pages.length - failed}, failed ${failed}. Run: node scripts/pages/gates-integrations.mjs\n\n| Page | Words | Result |\n|---|---|---|\n${report.join('\n')}\n\n## Pair lines\n\nPairs ${pairFiles.length}, passed ${pairFiles.length - pairFailed}, failed ${pairFailed}.\n\n| Pair | Result |\n|---|---|\n${pairRows.join('\n')}\n`;
fs.writeFileSync('scripts/pages/report-integrations.md', md);
console.log(md);
process.exit(failed || pairFailed ? 1 : 0);
