// The page pipeline's gates (brief D7), in code, on every use case page JSON. Writes report-use-cases.md.
// A page that fails is regenerated once; if it fails again it is listed and kept out of the site.
import fs from 'node:fs';
import { plain, linksIn, leadsWithAsk, namesJob } from './gates-lib.mjs';
import { PATHS } from './checks.mjs';
const DIR = 'src/content/use-cases/pages';
const rows = Object.fromEntries(JSON.parse(fs.readFileSync('scripts/pages/rows-use-cases.json', 'utf8')).map(r => [r.slug, r]));
const index = new Set(JSON.parse(fs.readFileSync('src/content/integrations/catalog/index.json', 'utf8')).apps.map(a => a.s));
const BANNED = ['unlock', 'unleash', 'seamless', 'effortless', 'leverage', 'robust', 'elevate', 'empower', 'supercharge', 'game-changer', 'revolutioniz', 'cutting-edge', 'delve', 'harness', 'streamline', 'synergy', 'journey', 'landscape', 'realm', 'tapestry', "today's fast-paced", 'look no further', 'say goodbye to', 'next level', 'imagine a world'];
const words = s => s.split(/\s+/).filter(Boolean).length;
const raw = p => [p.h2?.how, p.h2?.compare, ...p.faqs.map(f => f.a)].filter(Boolean); // fields that may carry [label](/path) links
const texts = p => [p.title, p.description, p.h1, p.h2?.how ?? '', p.h2?.compare ?? '', ...p.answer, p.build.name, p.build.line, p.build.when, ...p.build.does, p.build.asksFirst,
  ...p.steps.flatMap(s => [s.title, s.body]), ...p.run.flatMap(r => [r.when, r.did]), ...(p.approval ? [p.approval.title, ...p.approval.lines] : []),
  ...(p.result ? [p.result.title, ...p.result.lines] : []), ...p.compare.methods, ...p.compare.rows.flatMap(r => [r.label, ...r.cells]), ...p.faqs.flatMap(f => [f.q, plain(f.a)])];
const shingles = t => { const w = t.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter(Boolean), s = new Set(); for (let i = 0; i + 5 <= w.length; i++) s.add(w.slice(i, i + 5).join(' ')); return s; };

const pages = fs.readdirSync(DIR).filter(f => f.endsWith('.json')).map(f => JSON.parse(fs.readFileSync(`${DIR}/${f}`, 'utf8')));
const sh = Object.fromEntries(pages.map(p => [p.slug, shingles(texts(p).join(' '))]));
const report = [];
let failed = 0;
for (const p of pages) {
  const bad = [], row = rows[p.slug], all = texts(p).join('\n');
  // shape
  if (!row) bad.push('no row in rows-use-cases.json');
  if (row && p.ask !== row.ask) bad.push('ask differs from the row');
  if (p.title.length > 60) bad.push(`title ${p.title.length} chars`);
  if (p.description.length < 120 || p.description.length > 160) bad.push(`description ${p.description.length} chars`);
  if (p.answer.length !== 2) bad.push('answer is not two sentences');
  if (words(p.answer.join(' ')) > 40) bad.push(`answer is ${words(p.answer.join(' '))} words (40 at most)`);
  if (p.steps.length < 4 || p.steps.length > 5) bad.push('steps not 4 or 5');
  p.steps.forEach(s => words(s.body) > 30 && bad.push(`step "${s.title}" is ${words(s.body)} words`));
  if (p.steps.at(-1).key === 'approve' && !p.approval) bad.push('approve step without approval');
  if (p.steps.at(-1).key === 'result' && !p.result) bad.push('result step without result');
  if (p.faqs.length < 7 || p.faqs.length > 9) bad.push('faqs not 7 to 9');
  // SEO pass 01: the description leads with the query and the answer; the section headings name the page's own job
  if (leadsWithAsk(p.description)) bad.push('description opens with "Tell Captain": lead with the query and the answer');
  if (!p.h2 || !p.h2.how || !p.h2.compare) bad.push('h2.how and h2.compare are required');
  else {
    if (!/^How\b/.test(p.h2.how)) bad.push(`h2.how "${p.h2.how}" does not start with "How"`);
    if (!/^Other ways to\b/.test(p.h2.compare)) bad.push(`h2.compare "${p.h2.compare}" does not start with "Other ways to"`);
    for (const k of ['how', 'compare']) {
      if (words(p.h2[k]) > 12) bad.push(`h2.${k} is ${words(p.h2[k])} words (12 at most)`);
      if (!namesJob(p.h2[k], p.query)) bad.push(`h2.${k} "${p.h2[k]}" does not name the page's job (${p.query})`);
      if (p.h2[k].toLowerCase() === p.h1.toLowerCase()) bad.push(`h2.${k} repeats the H1`);
    }
  }
  // links in answers are internal, to pages that exist
  raw(p).flatMap(linksIn).forEach(l => !PATHS.has(l) && bad.push(`link ${l} is not a page`));
  if (raw(p).some(t => /\]\(https?:/.test(t))) bad.push('an outside link in the text');
  // Make it yours (D259): 3 or 4 variations, each ask under 200 characters, in house style
  const vars = p.variations ?? [];
  if (vars.length < 3 || vars.length > 4) bad.push(`variations: ${vars.length} (3 or 4)`);
  vars.forEach((v, i) => {
    if (!v.ask || !v.change) bad.push(`variation ${i + 1} needs an ask and a change`);
    if ((v.ask ?? '').length >= 200) bad.push(`variation ${i + 1} ask is ${v.ask.length} chars (under 200)`);
    if (v.ask === p.ask) bad.push(`variation ${i + 1} repeats the page's ask`);
    const t = `${v.ask ?? ''} ${v.change ?? ''}`, lo = t.toLowerCase();
    BANNED.forEach(b => lo.includes(b) && bad.push(`variation ${i + 1} banned: ${b}`));
    if (/—/.test(t)) bad.push(`variation ${i + 1} em dash`);
    if (/credit/i.test(t)) bad.push(`variation ${i + 1} mentions credits`);
    if (/\b(whatsapp|sms)\b/i.test(t)) bad.push(`variation ${i + 1} WhatsApp or SMS`);
    if (/\b(19|20)\d\d\b/.test(t)) bad.push(`variation ${i + 1} a year in the text`);
  });
  if (p.compare.rows.length < 4 || p.compare.rows.length > 5) bad.push('compare rows not 4 or 5');
  p.compare.rows.forEach(r => r.cells.length !== p.compare.methods.length + 1 && bad.push(`compare row "${r.label}" has ${r.cells.length} cells`));
  // facts
  p.build.apps.forEach(a => !index.has(a) && bad.push(`app ${a} not in the catalog`));
  if (row) p.build.apps.forEach(a => !row.apps.includes(a) && bad.push(`app ${a} not in the row`));
  // style
  if (/—/.test(all)) bad.push('em dash');
  if (/!/.test(all)) bad.push('exclamation mark');
  BANNED.forEach(b => all.toLowerCase().includes(b) && bad.push(`banned: ${b}`));
  if (/ViaSocket/.test(all)) bad.push('ViaSocket');
  if (/credit/i.test(all)) bad.push('mentions credits');
  if (/\b(19|20)\d\d\b|\b(January|February|March|April|June|July|August|September|October|November|December) \d{4}\b/.test(all.replace(/INV-\d+/g, ''))) bad.push('a date or year in the text');
  const bare = [...all.matchAll(/(\S+)\s+agents?\b/gi)].map(m => m[1]).filter(w => !/^(AI|browser|50)$/i.test(w));
  if (/^agents?\b/im.test(all) || bare.length) bad.push(`bare "agent" after: ${[...new Set(bare)].join(', ')}`);
  const counts = (all.match(/\b\d{1,3}(,\d{3})+\+?/g) || []).filter(n => n !== '2,300+');
  if (counts.length) bad.push(`numbers to check: ${counts.join(', ')}`);
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
const md = `# Gate report: use cases\n\nPages ${pages.length}, passed ${pages.length - failed}, failed ${failed}. Run: node scripts/pages/gates.mjs\n\n| Page | Words | Result |\n|---|---|---|\n${report.join('\n')}\n`;
fs.writeFileSync('scripts/pages/report-use-cases.md', md);
console.log(md);
process.exit(failed ? 1 : 0);
