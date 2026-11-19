// The page pipeline's gates for the role pages (src/content/for/pages/*.json): shape, style, facts against the catalog,
// the use case pages and the guides, uniqueness and length. Writes report-for.md. Run: node scripts/pages/gates-for.mjs
import { pagesIn, read, words, style, shingles, overlap, report, CATALOG, CATEGORIES, USE_CASES, PLANNED_USE_CASES } from './gates-lib.mjs';

const pages = pagesIn('src/content/for/pages');
const rows = Object.fromEntries(read('scripts/pages/rows-for.json').map(r => [r.slug, r]));
const guides = new Set(pagesIn('src/content/guides/pages').map(g => g.slug));
const ucAsks = Object.fromEntries(Object.values(USE_CASES).map(u => [u.ask, u.slug]));
const KINDS = ['app', 'auto', 'ai', 'browser'];
const texts = p => [p.title, p.description, p.h1, ...p.answer, p.example.build.name, p.example.build.line, p.example.build.when, ...p.example.build.does, p.example.build.asksFirst,
  ...p.jobs.flatMap(j => [j.title, j.body]), ...p.faqs.flatMap(f => [f.q, f.a])];
const sh = Object.fromEntries(pages.map(p => [p.slug, shingles(texts(p).join(' '))]));

const results = pages.map(p => {
  const bad = [], row = rows[p.slug], all = texts(p).join('\n');
  if (!row) bad.push('no row in rows-for.json');
  if (!KINDS.includes(p.kind)) bad.push(`kind ${p.kind}`);
  if (p.title.length > 60 || !p.title.endsWith(' | 50agents')) bad.push(`title ${p.title.length} chars or no " | 50agents"`);
  if (p.description.length < 120 || p.description.length > 155) bad.push(`description ${p.description.length} chars`);
  if (p.answer.length !== 2 || p.answer.some(a => !/[.?]$/.test(a) || /[.?]\s+[A-Z]/.test(a))) bad.push('answer is not two sentences');
  // D254: the hero answer is 40 words at most in total
  if (words(p.answer.join(' ')) > 40) bad.push(`answer is ${words(p.answer.join(' '))} words (40 at most in total)`);
  // the worked example
  const ex = p.example;
  if (!KINDS.includes(ex.kind) || !ex.ask || !ex.build) bad.push('example without kind, ask and plan');
  if (row && ex.ask !== row.ask) bad.push('ask differs from the row');
  if (ex.useCase && (!USE_CASES[ex.useCase] || USE_CASES[ex.useCase].ask !== ex.ask)) bad.push(`example use case ${ex.useCase} is not live or has another ask`);
  if (!ex.useCase && ucAsks[ex.ask]) bad.push(`example is the use case ${ucAsks[ex.ask]}: name it`);
  ex.build.apps.forEach(a => !CATALOG.has(a) && bad.push(`app ${a} not in the catalog`));
  if (ex.build.does.length < 2 || ex.build.does.length > 3) bad.push('plan does: 2 or 3 lines');
  // the jobs
  if (p.jobs.length !== 5) bad.push(`${p.jobs.length} jobs (5)`);
  p.jobs.forEach(j => {
    if (!KINDS.includes(j.kind)) bad.push(`job "${j.title}" kind`);
    if (!j.ask) bad.push(`job "${j.title}" has no ask`);
    if (words(j.body) > 30) bad.push(`job "${j.title}" is ${words(j.body)} words`);
    if (j.useCase && !USE_CASES[j.useCase] && !PLANNED_USE_CASES.has(j.useCase)) bad.push(`job "${j.title}": no use case ${j.useCase}`);
    if (j.useCase && USE_CASES[j.useCase] && USE_CASES[j.useCase].ask !== j.ask) bad.push(`job "${j.title}" ask differs from its use case`);
    if (!j.useCase && ucAsks[j.ask]) bad.push(`job "${j.title}" is the use case ${ucAsks[j.ask]}: link it`);
  });
  // apps and links
  if (!CATEGORIES.has(p.category)) bad.push(`category ${p.category}`);
  if (p.apps.length < 6 || p.apps.length > 8) bad.push(`${p.apps.length} apps (6 to 8)`);
  p.apps.forEach(a => !CATALOG.has(a) && bad.push(`app ${a} not in the catalog`));
  p.guides.forEach(g => !guides.has(g) && bad.push(`guide ${g} does not exist`));
  if (p.faqs.length < 4 || p.faqs.length > 5) bad.push(`${p.faqs.length} questions (4 or 5)`);
  if (/\]\(https?:/.test(all)) bad.push('a source link in the text');
  bad.push(...style(all));
  for (const q of pages) if (q.slug !== p.slug && overlap(sh[p.slug], sh[q.slug]) >= 0.5) bad.push(`overlaps ${q.slug}`);
  const n = words(all);
  if (n < 300) bad.push(`only ${n} words of its own (300 at least; D254 made heroes and subheaders shorter)`);
  return { slug: p.slug, words: n, bad };
});
for (const r of Object.keys(rows)) if (!pages.some(p => p.slug === r)) results.push({ slug: r, words: 0, bad: ['a row with no page'] });
report('for', pages, results, 'node scripts/pages/gates-for.mjs');
