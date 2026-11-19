// The page pipeline's gates for the guides (src/content/guides/pages/*.json): shape, style, facts against the catalog and
// the use case pages, uniqueness and length. Writes report-guides.md. Run: node scripts/pages/gates-guides.mjs
import { pagesIn, read, words, style, namesPrices, labelDates, shingles, overlap, report, CATALOG, USE_CASES, PLANNED_USE_CASES } from './gates-lib.mjs';

const pages = pagesIn('src/content/guides/pages');
const rows = Object.fromEntries(read('scripts/pages/rows-guides.json').map(r => [r.slug, r]));
const slugs = new Set(pages.map(p => p.slug));
const ucAsks = Object.fromEntries(Object.values(USE_CASES).map(u => [u.ask, u.slug]));
const GROUPS = ['AI agents', 'Automations', 'Browser agents', 'Apps', 'Email and calendar', 'Choosing tools'];
const KINDS = ['app', 'auto', 'ai', 'browser'];
const texts = p => [p.title, p.description, p.h1, ...p.answer,
  ...p.sections.flatMap(s => [s.h2, ...s.body.flatMap(b => b.p ? [b.p] : b.ul ? b.ul : [...b.table.head, ...b.table.rows.flat()])]),
  p.method.h2, p.method.intro ?? '', ...p.method.steps.flatMap(s => [s.title, s.body]),
  p.example.h2, ...p.example.body, ...(p.example.build ? [p.example.build.name, p.example.build.line, p.example.build.when, ...p.example.build.does, p.example.build.asksFirst] : []),
  ...p.wrong.flatMap(w => [w.title, w.body]), ...p.faqs.flatMap(f => [f.q, f.a])];
const sh = Object.fromEntries(pages.map(p => [p.slug, shingles(texts(p).join(' '))]));

const results = pages.map(p => {
  const bad = [], row = rows[p.slug], all = texts(p).join('\n');
  // shape
  if (!row) bad.push('no row in rows-guides.json');
  if (!GROUPS.includes(p.group)) bad.push(`group ${p.group}`);
  if (!KINDS.includes(p.kind)) bad.push(`kind ${p.kind}`);
  if (p.title.length > 60 || !p.title.endsWith(' | 50agents')) bad.push(`title "${p.title}" (${p.title.length} chars, ends " | 50agents")`);
  if (p.description.length < 120 || p.description.length > 155) bad.push(`description ${p.description.length} chars`);
  if (p.answer.length !== 2 || p.answer.some(a => !/[.?]$/.test(a) || /[.?]\s+[A-Z]/.test(a))) bad.push('the short answer is not two sentences');
  if (p.answer.some(a => words(a) > 45)) bad.push('a short-answer sentence over 45 words');
  if (p.sections.length < 1 || p.sections.length > 3) bad.push(`${p.sections.length} context sections (1 to 3)`);
  p.sections.forEach(s => s.body.forEach(b => b.table && b.table.rows.some(r => r.length !== b.table.head.length) && bad.push(`table in "${s.h2}" has ragged rows`)));
  if (p.method.steps.length < 4 || p.method.steps.length > 7) bad.push(`${p.method.steps.length} method steps (4 to 7)`);
  p.method.steps.forEach(s => words(s.body) > 60 && bad.push(`step "${s.title}" is ${words(s.body)} words`));
  const ex = p.example;
  if (ex.useCase) {
    if (!USE_CASES[ex.useCase]) bad.push(`use case ${ex.useCase} is not a live page`);
    if (ex.ask || ex.build) bad.push('links a use case and repeats its ask or plan');
    if (row && row.useCase !== ex.useCase) bad.push('use case differs from the row');
  } else {
    if (!ex.ask || !ex.build || !KINDS.includes(ex.kind)) bad.push('example without kind, ask and plan');
    if (row && ex.ask !== row.ask) bad.push('ask differs from the row');
    if (ucAsks[ex.ask]) bad.push(`example repeats the live use case ${ucAsks[ex.ask]}: link it instead`);
    if (row?.plannedUseCase && USE_CASES[row.plannedUseCase]) bad.push(`use case ${row.plannedUseCase} is live now: link it instead`);
    ex.build?.apps.forEach(a => !CATALOG.has(a) && bad.push(`app ${a} not in the catalog`));
  }
  if (p.wrong.length < 3 || p.wrong.length > 6) bad.push(`${p.wrong.length} things that can go wrong (3 to 6)`);
  if (p.faqs.length < 3 || p.faqs.length > 5) bad.push(`${p.faqs.length} questions (3 to 5)`);
  if (!p.sources.length) bad.push('no sources');
  if (new Set(p.sources.map(s => s.href)).size !== p.sources.length) bad.push('a source twice');
  p.sources.forEach(s => (!/^https:\/\//.test(s.href) || s.label.length < 6 || 'read' in s) && bad.push(`source "${s.label}"`));
  p.related.forEach(r => !slugs.has(r) && bad.push(`related ${r} is not a guide`));
  labelDates(p.sources.map(s => s.label)).forEach(l => bad.push(`a date in source "${l}"`));
  if (/\]\(https?:/.test(all)) bad.push('a source link in the text (sources go in the list)');
  if (!/^\d{4}-\d\d-\d\d$/.test(p.updated)) bad.push('updated is not an ISO date');
  // style and rules
  bad.push(...style(all));
  if (namesPrices(all) && !p.pricesChecked) bad.push('names prices without a "Prices checked" date');
  if (p.pricesChecked && !/cost/.test(p.slug)) bad.push('prices are for the cost guide only');
  // uniqueness: against every other guide, and against the use case it links
  for (const q of pages) if (q.slug !== p.slug && overlap(sh[p.slug], sh[q.slug]) >= 0.5) bad.push(`overlaps ${q.slug}`);
  const uc = USE_CASES[ex.useCase ?? row?.plannedUseCase];
  if (uc) { const o = overlap(sh[p.slug], shingles(JSON.stringify(uc))); if (o >= 0.2) bad.push(`repeats use case ${uc.slug} (${o.toFixed(2)})`); }
  // length
  const n = words(all);
  if (n < 650 || n > 1900) bad.push(`${n} words (650 to 1,900)`);
  return { slug: p.slug, words: n, bad };
});
for (const r of Object.keys(rows)) if (!slugs.has(r)) results.push({ slug: r, words: 0, bad: ['a row with no page'] });
for (const p of pages) { const r = rows[p.slug]; if (r?.plannedUseCase && !PLANNED_USE_CASES.has(r.plannedUseCase)) results.find(x => x.slug === p.slug).bad.push(`planned use case ${r.plannedUseCase} has no row`); }
report('guides', pages, results, 'node scripts/pages/gates-guides.mjs');
