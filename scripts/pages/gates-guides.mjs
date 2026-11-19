// The page pipeline's gates for the guides, v4 (D254, src/content/guides/pages/*.json): shape, the round 2 rules (to the
// point, no sources, no dates, short subheaders, a 40-word answer, interactions that earn their place), style, facts
// against the catalog and the use case pages, uniqueness and length. Writes report-guides.md.
// Run: node scripts/pages/gates-guides.mjs
import { pagesIn, read, words, style, CATALOG, namesPrices, shingles, overlap, report, USE_CASES, PLANNED_USE_CASES, leadsWithAsk, namesJob } from './gates-lib.mjs';
import { PATHS } from './checks.mjs';

const pages = pagesIn('src/content/guides/pages');
const rows = Object.fromEntries(read('scripts/pages/rows-guides.json').map(r => [r.slug, r]));
const slugs = new Set(pages.map(p => p.slug));
const ucAsks = Object.fromEntries(Object.values(USE_CASES).map(u => [u.ask, u.slug]));
const GROUPS = ['AI agents', 'Automations', 'Browser agents', 'Apps', 'Email and calendar', 'Choosing tools'];
const KINDS = ['app', 'auto', 'ai', 'browser'];
const KEYS = new Set(['slug', 'group', 'kind', 'query', 'title', 'description', 'h1', 'cover', 'answer', 'chooser', 'sections', 'method', 'captain', 'wrong', 'faqs', 'related', 'updated']);

// The cover (D260, Jii's round 5): its own apps (catalog slugs), its key object and a few words; no two covers alike.
const SCENES = ['panel', 'pipe', 'message', 'calendar', 'page', 'chat', 'fork', 'access', 'board'];
const coverApps = c => [c.app, c.panel?.app, c.from?.app, c.to?.app, ...(c.apps ?? []).map(a => (typeof a === 'string' ? a : a.app)),
  ...[c.panel, c.from, c.to].flatMap(p => p?.rows ?? []).map(r => r.app)].filter(Boolean);
const coverTexts = c => JSON.stringify(c).match(/"(?:label|q|ask|reply|subject|where|day|title|text|url|access|name|tag|via|was|now|button|cells|lines|options|head|events)":(?:"[^"]*"|\[[^\]]*\])/g)?.join(' ') ?? '';
const coverKey = c => JSON.stringify(c);
const coverSeen = new Map();
function coverBad(p) {
  const c = p.cover, bad = [];
  if (!c) return ['no cover (D260: every cover draws its own guide)'];
  if (!SCENES.includes(c.scene)) bad.push(`cover scene ${c.scene}`);
  coverApps(c).forEach(a => !CATALOG.has(a) && bad.push(`cover app ${a} is not in the catalog`));
  const t = coverTexts(c);
  bad.push(...style(t).map(b => `cover: ${b}`));
  if (coverSeen.has(coverKey(c))) bad.push(`cover is the same as ${coverSeen.get(coverKey(c))}`); else coverSeen.set(coverKey(c), p.slug);
  return bad;
}

// The chooser's texts and its problems: 2 to 4 options a question, an answer within 3 taps, short words.
function walk(c, depth, out, bad) {
  out.push(c.q);
  if (words(c.q) > 14) bad.push(`chooser question over 14 words: "${c.q}"`);
  if (c.options.length < 2 || c.options.length > 4) bad.push(`chooser question with ${c.options.length} options (2 to 4)`);
  for (const o of c.options) {
    out.push(o.label);
    if (words(o.label) > 7) bad.push(`chooser option over 7 words: "${o.label}"`);
    if ('q' in o.then) { if (depth >= 3) bad.push('chooser deeper than 3 taps'); else walk(o.then, depth + 1, out, bad); }
    else {
      out.push(o.then.answer, o.then.why);
      if (words(o.then.answer) > 10) bad.push(`chooser answer over 10 words: "${o.then.answer}"`);
      if (words(o.then.why) > 35) bad.push(`chooser answer's why over 35 words`);
      if (o.then.kind && !KINDS.includes(o.then.kind)) bad.push(`chooser answer kind ${o.then.kind}`);
      if (o.then.href && !PATHS.has(o.then.href)) bad.push(`chooser link ${o.then.href} is not a page`);
    }
  }
  return out;
}
const chooserTexts = p => (p.chooser ? [p.chooser.h2, ...walk(p.chooser.root, 1, [], [])] : []);
const blockTexts = b => (b.p ? [b.p] : b.ul ? b.ul : [...b.table.head, ...b.table.rows.flat()]);
const texts = p => [p.title, p.description, p.h1, ...p.answer, ...chooserTexts(p),
  ...p.sections.flatMap(s => [s.h2, ...s.body.flatMap(blockTexts)]),
  p.method.h2, ...p.method.steps.flatMap(s => [s.title, s.body, ...(s.note ? [s.note.text] : [])]),
  p.captain?.line ?? "", ...p.wrong.flatMap(w => [w.title, w.body]), ...p.faqs.flatMap(f => [f.q, f.a])];
const sh = Object.fromEntries(pages.map(p => [p.slug, shingles(texts(p).join(' '))]));

const results = pages.map(p => {
  const bad = [], row = rows[p.slug], all = texts(p).join('\n');
  // shape
  if (!row) bad.push('no row in rows-guides.json');
  Object.keys(p).forEach(k => !KEYS.has(k) && bad.push(`field "${k}" is not in GuidePage v4 (no sources, no example, no pricesChecked)`));
  bad.push(...coverBad(p));
  if (!GROUPS.includes(p.group)) bad.push(`group ${p.group}`);
  if (!KINDS.includes(p.kind)) bad.push(`kind ${p.kind}`);
  if (p.title.length > 60 || !p.title.endsWith(' | 50agents')) bad.push(`title "${p.title}" (${p.title.length} chars, ends " | 50agents")`);
  if (p.description.length < 120 || p.description.length > 155) bad.push(`description ${p.description.length} chars`);
  // SEO pass 01: the description leads with the query and the answer; the steps heading names the guide's own job
  if (leadsWithAsk(p.description)) bad.push('description opens with "Tell Captain": lead with the query and the answer');
  if (!namesJob(p.method.h2, p.query)) bad.push(`steps heading "${p.method.h2}" does not name the guide's job (${p.query})`);
  // the short answer: two sentences, 40 words at most in total
  if (p.answer.length !== 2 || p.answer.some(a => !/[.?]$/.test(a) || /[.?]\s+[A-Z]/.test(a))) bad.push('the short answer is not two sentences');
  if (words(p.answer.join(' ')) > 40) bad.push(`the short answer is ${words(p.answer.join(' '))} words (40 at most)`);
  // subheaders: one short line
  const heads = [...(p.chooser ? [p.chooser.h2] : []), ...p.sections.map(s => s.h2), p.method.h2];
  heads.forEach(h => words(h) > 10 && bad.push(`subheader over 10 words: "${h}"`));
  // the chooser, only where there is a choice
  if (p.chooser) walk(p.chooser.root, 1, [], bad);
  // context: at most two short sections, short paragraphs, tables with short cells
  if (p.sections.length > 2) bad.push(`${p.sections.length} context sections (0 to 2)`);
  p.sections.forEach(s => s.body.forEach(b => {
    if (b.p && words(b.p) > 60) bad.push(`a paragraph in "${s.h2}" is ${words(b.p)} words (60 at most)`);
    if (b.ul) b.ul.forEach(x => words(x) > 30 && bad.push(`a list item in "${s.h2}" is over 30 words`));
    if (b.table) {
      if (b.table.rows.some(r => r.length !== b.table.head.length)) bad.push(`table in "${s.h2}" has ragged rows`);
      if (b.table.rows.length > 7) bad.push(`table in "${s.h2}" has ${b.table.rows.length} rows (7 at most)`);
      b.table.rows.flat().forEach(c => words(c) > 8 && bad.push(`table cell over 8 words: "${c.slice(0, 50)}"`));
    }
  }));
  // the steps
  const st = p.method.steps;
  if (st.length < 4 || st.length > 7) bad.push(`${st.length} steps (4 to 7)`);
  st.forEach(s => {
    if (words(s.title) > 8) bad.push(`step title over 8 words: "${s.title}"`);
    if (words(s.body) > 40) bad.push(`step "${s.title}" is ${words(s.body)} words (40 at most)`);
    if (s.note) {
      if (!['tip', 'warn'].includes(s.note.type)) bad.push(`note type ${s.note.type}`);
      if (!KINDS.includes(s.note.about)) bad.push(`note about ${s.note.about}`);
      if (words(s.note.text) > 30) bad.push(`note in "${s.title}" over 30 words`);
    }
  });
  if (st.filter(s => s.note).length > 3) bad.push('more than 3 notes (only where they help)');
  // Captain's film, in the step 50agents does
  const c = p.captain;
  if (!c || !Number.isInteger(c.at) || c.at < 0 || c.at >= st.length) bad.push('captain.at is not a step');
  if (c && words(c.line) > 30) bad.push(`captain line is ${words(c.line)} words (30 at most)`);
  if (c?.useCase) {
    if (!USE_CASES[c.useCase]) bad.push(`use case ${c.useCase} is not a live page`);
    if (c.ask) bad.push('links a use case and repeats its ask');
    if (row && row.useCase !== c.useCase) bad.push('use case differs from the row');
  } else if (c) {
    if (!c.ask) bad.push('captain without an ask or a use case');
    if (row && c.ask !== row.ask) bad.push('ask differs from the row');
    if (ucAsks[c.ask]) bad.push(`ask repeats the live use case ${ucAsks[c.ask]}: link it instead`);
    if (row?.plannedUseCase && USE_CASES[row.plannedUseCase]) bad.push(`use case ${row.plannedUseCase} is live now: link it instead`);
  }
  // what can go wrong, questions
  if (p.wrong.length < 3 || p.wrong.length > 5) bad.push(`${p.wrong.length} things that can go wrong (3 to 5)`);
  p.wrong.forEach(w => { if (!KINDS.includes(w.about)) bad.push(`"${w.title}" about ${w.about}`); if (words(w.body) > 40) bad.push(`"${w.title}" is ${words(w.body)} words (40 at most)`); });
  if (p.faqs.length < 5 || p.faqs.length > 7) bad.push(`${p.faqs.length} questions (5 to 7; D260: more questions)`);
  if (new Set(p.faqs.map(f => f.q.toLowerCase())).size !== p.faqs.length) bad.push('a question asked twice');
  p.faqs.forEach(f => words(f.a) > 60 && bad.push(`answer to "${f.q}" over 60 words`));
  p.related.forEach(r => !slugs.has(r) && bad.push(`related ${r} is not a guide`));
  // links: internal only, to pages that exist; no sources, no dates on the page
  if (/\]\(https?:/.test(all)) bad.push('an outside link in the text (no sources on guides)');
  [...all.matchAll(/\]\((\/[^)\s]*)\)/g)].forEach(m => !PATHS.has(m[1]) && bad.push(`link ${m[1]} is not a page`));
  if (/\b(sources?:|prices checked|as of today|read today|checked today)/i.test(all) || /\bUpdated\b/.test(all)) bad.push('a source or date line');
  if (!/^\d{4}-\d\d-\d\d$/.test(p.updated)) bad.push('updated is not an ISO date');
  // style and rules
  bad.push(...style(all));
  if (namesPrices(all) && !/cost/.test(p.slug)) bad.push('names prices (only the cost guide may, for other tools)');
  // uniqueness: against every other guide, and against the use case it links
  for (const q of pages) if (q.slug !== p.slug && overlap(sh[p.slug], sh[q.slug]) >= 0.5) bad.push(`overlaps ${q.slug}`);
  const uc = USE_CASES[c?.useCase ?? row?.plannedUseCase];
  if (uc) { const o = overlap(sh[p.slug], shingles(JSON.stringify(uc))); if (o >= 0.2) bad.push(`repeats use case ${uc.slug} (${o.toFixed(2)})`); }
  // length: to the point
  const n = words(all);
  if (n < 400 || n > 1000) bad.push(`${n} words (400 to 1,000; D258 concise, D260 two or three more questions)`);
  return { slug: p.slug, words: n, bad };
});
for (const r of Object.keys(rows)) if (!slugs.has(r)) results.push({ slug: r, words: 0, bad: ['a row with no page'] });
for (const p of pages) { const r = rows[p.slug]; if (r?.plannedUseCase && !PLANNED_USE_CASES.has(r.plannedUseCase)) results.find(x => x.slug === p.slug).bad.push(`planned use case ${r.plannedUseCase} has no row`); }
report('guides', pages, results, 'node scripts/pages/gates-guides.mjs');
