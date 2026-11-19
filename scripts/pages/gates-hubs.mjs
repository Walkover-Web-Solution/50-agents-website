// The page pipeline's gates for the kind hubs (family "hubs"), on every src/content/hubs/pages/*.json. Writes report-hubs.md.
import fs from 'node:fs';
import { words, shingles, overlap, style, example, CATALOG, PATHS, ASKS, UC_PAGES, report } from './checks.mjs';
import { plain, linksIn, leadsWithAsk } from './gates-lib.mjs';
const DIR = 'src/content/hubs/pages';
const rows = Object.fromEntries(JSON.parse(fs.readFileSync('scripts/pages/rows-hubs.json', 'utf8')).map(r => [r.slug, r]));
const texts = p => [p.title, p.description, p.h1, p.line, ...p.answer, p.useCases, ...p.faqs.flatMap(f => [f.q, plain(f.a)]), p.final];
const pages = fs.readdirSync(DIR).filter(f => f.endsWith('.json')).map(f => JSON.parse(fs.readFileSync(`${DIR}/${f}`, 'utf8')));
// D259: the possibilities gallery (src/content/hubs/gallery.json), checked per kind on that kind's hub.
const GALLERY = JSON.parse(fs.readFileSync('src/content/hubs/gallery.json', 'utf8'));
const TEAMS = ['sales', 'support', 'finance', 'operations', 'ecommerce', 'personal'];
const SAYS = { ai: /\bAI agent\b/, auto: /\bautomation\b/, browser: /\bbrowser agent\b/, app: /\bapp\b/ };
function gallery(kind) {
  const bad = [], cards = GALLERY[kind] ?? [];
  if (cards.length < 20 || cards.length > 30) bad.push(`gallery has ${cards.length} cards (20 to 30)`);
  const seen = new Set();
  cards.forEach(c => {
    const at = `gallery "${c.job}"`;
    if (seen.has(c.ask)) bad.push(`${at}: ask repeated`); seen.add(c.ask);
    if (!TEAMS.includes(c.team)) bad.push(`${at}: team ${c.team} is not a filter`);
    if (c.ask.length >= 300) bad.push(`${at}: ask is ${c.ask.length} characters (under 300)`);
    if (words(c.job) > 12) bad.push(`${at}: job over 12 words`);
    c.apps.forEach(a => !CATALOG.has(a) && bad.push(`${at}: app ${a} not in the catalog`));
    if (c.from === 'app') {
      if (!ASKS.has(c.ask)) bad.push(`${at}: marked from the app but not a starting ask in templates/list.ts`);
      else if (ASKS.get(c.ask) !== kind) bad.push(`${at}: the app's ask is a ${ASKS.get(c.ask)}, not a ${kind}`);
    } else if (c.from === 'site') {
      if (ASKS.has(c.ask)) bad.push(`${at}: is the app's own ask, mark it from "app"`);
      if (!SAYS[kind].test(c.ask)) bad.push(`${at}: a written ask must name its kind`);
    } else bad.push(`${at}: from is neither "app" nor "site"`);
    bad.push(...style(`${c.job}\n${c.ask}`).map(b => `${at}: ${b}`));
  });
  // every starting ask and use case of this kind is in its gallery
  [...ASKS].filter(([, k]) => k === kind).forEach(([a]) => !seen.has(a) && bad.push(`gallery misses the app's ask "${a.slice(0, 40)}..."`));
  UC_PAGES.filter(u => u.kind === kind).forEach(u => !seen.has(u.ask) && bad.push(`gallery misses use case ${u.slug}`));
  return bad;
}
const sh = Object.fromEntries(pages.map(p => [p.slug, shingles(texts(p).join(' '))]));
const out = pages.map(p => {
  const bad = [], row = rows[p.slug], all = texts(p).join('\n');
  // shape
  if (!row) bad.push('no row in rows-hubs.json');
  if (row && row.kind !== p.kind) bad.push('kind differs from the row');
  if (row && p.example.ask !== row.ask) bad.push('ask differs from the row');
  if (p.title.length > 60 || !p.title.endsWith(' | 50agents')) bad.push(`title ${p.title.length} chars or no " | 50agents"`);
  if (p.description.length < 120 || p.description.length > 160) bad.push(`description ${p.description.length} chars`);
  if (p.answer.length !== 2) bad.push('answer is not two sentences');
  // D254: the hero answer is 40 words at most in total; a subheader is one short line, 14 words at most
  if (words(p.answer.join(' ')) > 40) bad.push(`answer is ${words(p.answer.join(' '))} words (40 at most in total)`);
  if (words(p.useCases) > 14) bad.push(`useCases subheader is ${words(p.useCases)} words (14 at most)`);
  if (!Array.isArray(p.apps)) bad.push('apps is not a list of catalog slugs');
  if (words(p.line) > 12) bad.push('line over 12 words');
  if (p.faqs.length < 8 || p.faqs.length > 12) bad.push('faqs not 8 to 12 (D260: more questions the page itself does not answer)');
  // D260: the hero film types 5 or 6 real asks of this kind, the first the hub's own ask, each from its gallery
  const gal = new Set((GALLERY[p.kind] ?? []).map(c => c.ask));
  if (!Array.isArray(p.asks) || p.asks.length < 5 || p.asks.length > 6) bad.push('asks not 5 or 6');
  else {
    if (p.asks[0] !== p.example.ask) bad.push('asks[0] is not the example ask');
    if (new Set(p.asks).size !== p.asks.length) bad.push('asks repeat');
    p.asks.forEach(a => !gal.has(a) && bad.push(`film ask not in the ${p.kind} gallery: "${a.slice(0, 40)}..."`));
  }
  p.faqs.forEach(f => words(plain(f.a)) > 70 && bad.push(`answer to "${f.q}" is ${words(plain(f.a))} words`));
  // SEO pass 01: the description leads with the query and the answer; links in answers are internal and live
  if (leadsWithAsk(p.description)) bad.push('description opens with "Tell Captain": lead with the query and the answer');
  p.faqs.flatMap(f => linksIn(f.a)).forEach(l => !PATHS.has(l) && bad.push(`link ${l} is not a page`));
  if (p.links.length !== 3) bad.push('links not 3');
  // facts
  bad.push(...example(p.example, p.kind));
  (p.apps ?? []).forEach(a => !CATALOG.has(a) && bad.push(`app ${a} not in the catalog`));
  if (row) (p.apps ?? []).forEach(a => !row.apps.includes(a) && bad.push(`app ${a} not in the row`));
  p.links.forEach(l => !PATHS.has(l.href) && bad.push(`link to a page that does not exist: ${l.href}`));
  // style
  bad.push(...style(all));
  // the gallery
  bad.push(...gallery(p.kind));
  // uniqueness
  pages.forEach(q => { if (q.slug !== p.slug) { const j = overlap(sh[p.slug], sh[q.slug]); if (j >= 0.5) bad.push(`overlaps ${q.slug} (${j.toFixed(2)})`); } });
  // length
  if (words(all) < 300 || words(all) > 900) bad.push(`${words(all)} words of its own (300 to 900; D254 made heroes and subheaders shorter)`);
  return { slug: p.slug, words: words(all), bad };
});
report('hubs', pages.length, out, 'gates-hubs.mjs');
