// The page pipeline's gates for the glossary (family "learn"), on every src/content/learn/pages/*.json. Writes report-learn.md.
import fs from 'node:fs';
import { words, shingles, overlap, style, example, PATHS, report } from './checks.mjs';
const DIR = 'src/content/learn/pages';
const rows = Object.fromEntries(JSON.parse(fs.readFileSync('scripts/pages/rows-learn.json', 'utf8')).map(r => [r.slug, r]));
const GROUPS = ['AI that acts', 'Automation', 'Building blocks'];
// The plan card is copied from the use case page, so it is checked as a fact, not counted as the page's own words.
const texts = p => [p.title, p.description, p.h1, ...p.definition, p.example.why, p.vs.term, ...p.vs.rows.flatMap(r => [r.label, r.a, r.b])];
const pages = fs.readdirSync(DIR).filter(f => f.endsWith('.json')).map(f => JSON.parse(fs.readFileSync(`${DIR}/${f}`, 'utf8')));
const sh = Object.fromEntries(pages.map(p => [p.slug, shingles(texts(p).join(' '))]));
const out = pages.map(p => {
  const bad = [], row = rows[p.slug], all = texts(p).join('\n');
  // shape
  if (!row) bad.push('no row in rows-learn.json');
  if (row && p.example.ask !== row.ask) bad.push('ask differs from the row');
  if (row && p.vs.term !== row.vs) bad.push('confused term differs from the row');
  if (!GROUPS.includes(p.group)) bad.push(`group ${p.group}`);
  if (p.title.length > 60 || !p.title.endsWith(' | 50agents')) bad.push(`title ${p.title.length} chars or no " | 50agents"`);
  if (p.description.length < 120 || p.description.length > 160) bad.push(`description ${p.description.length} chars`);
  if (p.definition.length !== 2) bad.push('definition is not two sentences');
  if (words(p.definition[0]) > 40) bad.push(`definition's first sentence is ${words(p.definition[0])} words`);
  if (words(p.example.why) > 40) bad.push(`example "why" is ${words(p.example.why)} words`);
  if (p.vs.rows.length !== 3) bad.push('comparison rows not 3');
  p.vs.rows.forEach(r => (words(r.a) > 12 || words(r.b) > 12) && bad.push(`comparison cell over 12 words in "${r.label}"`));
  if (p.links.length !== 3) bad.push('links not 3');
  // facts
  bad.push(...example(p.example, p.example.kind));
  p.links.forEach(l => !PATHS.has(l.href) && bad.push(`link to a page that does not exist: ${l.href}`));
  if (p.vs.href && !PATHS.has(p.vs.href)) bad.push(`comparison link does not exist: ${p.vs.href}`);
  (p.sources ?? []).forEach(s => !/^https:\/\//.test(s.href) && bad.push(`source not https: ${s.href}`));
  // style
  bad.push(...style(all));
  // uniqueness
  pages.forEach(q => { if (q.slug !== p.slug) { const j = overlap(sh[p.slug], sh[q.slug]); if (j >= 0.5) bad.push(`overlaps ${q.slug} (${j.toFixed(2)})`); } });
  // length: short on purpose
  if (words(all) < 120 || words(all) > 320) bad.push(`${words(all)} words of its own (120 to 320)`);
  return { slug: p.slug, words: words(all), bad };
});
report('learn', pages.length, out, 'gates-learn.mjs');
