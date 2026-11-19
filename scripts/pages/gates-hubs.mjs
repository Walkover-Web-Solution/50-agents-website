// The page pipeline's gates for the kind hubs (family "hubs"), on every src/content/hubs/pages/*.json. Writes report-hubs.md.
import fs from 'node:fs';
import { words, shingles, overlap, style, example, CATALOG, PATHS, report } from './checks.mjs';
const DIR = 'src/content/hubs/pages';
const rows = Object.fromEntries(JSON.parse(fs.readFileSync('scripts/pages/rows-hubs.json', 'utf8')).map(r => [r.slug, r]));
const texts = p => [p.title, p.description, p.h1, p.line, ...p.answer, p.useCases, p.apps.h2, p.apps.p, ...p.faqs.flatMap(f => [f.q, f.a]), p.final];
const pages = fs.readdirSync(DIR).filter(f => f.endsWith('.json')).map(f => JSON.parse(fs.readFileSync(`${DIR}/${f}`, 'utf8')));
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
  p.answer.forEach((a, i) => words(a) > 45 && bad.push(`answer ${i + 1} is ${words(a)} words`));
  if (words(p.line) > 12) bad.push('line over 12 words');
  if (p.faqs.length < 5 || p.faqs.length > 6) bad.push('faqs not 5 or 6');
  p.faqs.forEach(f => words(f.a) > 70 && bad.push(`answer to "${f.q}" is ${words(f.a)} words`));
  if (p.links.length !== 3) bad.push('links not 3');
  // facts
  bad.push(...example(p.example, p.kind));
  p.apps.slugs.forEach(a => !CATALOG.has(a) && bad.push(`app ${a} not in the catalog`));
  if (row) p.apps.slugs.forEach(a => !row.apps.includes(a) && bad.push(`app ${a} not in the row`));
  p.links.forEach(l => !PATHS.has(l.href) && bad.push(`link to a page that does not exist: ${l.href}`));
  // style
  bad.push(...style(all));
  // uniqueness
  pages.forEach(q => { if (q.slug !== p.slug) { const j = overlap(sh[p.slug], sh[q.slug]); if (j >= 0.5) bad.push(`overlaps ${q.slug} (${j.toFixed(2)})`); } });
  // length
  if (words(all) < 400 || words(all) > 900) bad.push(`${words(all)} words of its own (400 to 900)`);
  return { slug: p.slug, words: words(all), bad };
});
report('hubs', pages.length, out, 'gates-hubs.mjs');
