// Shared checks for the guide and role page gates (gates-guides.mjs, gates-for.mjs): house style, facts against the
// catalog, uniqueness by 5-word shingles, and the report. The use case gates (gates.mjs) keep their own copy.
import fs from 'node:fs';

export const read = f => JSON.parse(fs.readFileSync(f, 'utf8'));
export const pagesIn = dir => fs.readdirSync(dir).filter(f => f.endsWith('.json')).sort().map(f => read(`${dir}/${f}`));
export const CATALOG = new Set(read('src/content/integrations/catalog/index.json').apps.map(a => a.s));
export const CATEGORIES = new Set([...fs.readFileSync('src/content/integrations/categories.ts', 'utf8').matchAll(/slug: '([^']+)'/g)].map(m => m[1]));
export const USE_CASES = Object.fromEntries(pagesIn('src/content/use-cases/pages').map(p => [p.slug, p]));
export const PLANNED_USE_CASES = new Set(read('scripts/pages/rows-use-cases.json').map(r => r.slug));

const BANNED = ['unlock', 'unleash', 'seamless', 'effortless', 'leverage', 'robust', 'elevate', 'empower', 'supercharge', 'game-changer', 'revolutioniz', 'cutting-edge', 'delve', 'harness', 'streamline', 'synergy', 'journey', 'landscape', 'realm', 'tapestry', "today's fast-paced", 'today’s fast-paced', 'look no further', 'say goodbye to', 'next level', 'imagine a world'];
export const words = s => s.split(/\s+/).filter(Boolean).length;
/** The visible words of a marked-up string: "[label](/path)" is its label. */
export const plain = s => s.replace(/\[([^\]]+)\]\(\/[^)\s]*\)/g, '$1');
/** The internal links in a marked-up string. */
export const linksIn = s => [...s.matchAll(/\]\((\/[^)\s]*)\)/g)].map(m => m[1]);
// SEO pass 01: a description leads with the query and the answer, not with an instruction to the reader.
export const leadsWithAsk = d => /^(Tell|Ask) (Captain|it)\b/i.test(d);
const STOP = new Set('how to a an the of in for with from and your you it is on at by or what which one'.split(' '));
const stem = w => w.replace(/s$/, '');
const toks = s => s.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter(w => w && !STOP.has(w)).map(stem);
const GENERIC_H2 = /^(how it works|how to set it up|how to build it|how to start|how to get started|other ways to do it(, compared)?|the alternatives, side by side|how to use it)$/i;
/** A section heading names the page's own job: not a generic template line, and it shares a word with the page's query. */
export function namesJob(h2, query) {
  if (!h2 || GENERIC_H2.test(h2.trim())) return false;
  const q = new Set(toks(query));
  return toks(h2).some(t => q.has(t));
}
const MONTHS = 'January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec';

/** House style and the 50agents rules on every text of a page. Returns the problems found. */
export function style(all) {
  const bad = [];
  if (/—/.test(all)) bad.push('em dash');
  if (/!/.test(all)) bad.push('exclamation mark');
  const low = all.toLowerCase();
  BANNED.forEach(b => low.includes(b) && bad.push(`banned: ${b}`));
  if (/ViaSocket/.test(all)) bad.push('ViaSocket');
  // dates: no years, no "Month Year", no "read <date>"
  const y = all.match(new RegExp(`\\b(19|20)\\d\\d\\b|\\b(${MONTHS}) \\d{4}\\b|\\b\\d{1,2} (${MONTHS})\\b|\\bread \\d`, 'g'));
  if (y) bad.push(`a date in the text: ${[...new Set(y)].join(', ')}`);
  // "AI agent" or "browser agent", never a bare "agent"
  const bare = [...all.matchAll(/(\S+)\s+agents?\b/gi)].map(m => m[1].replace(/[^\w-]/g, '')).filter(w => !/^(AI|browser|50|50agents)$/i.test(w));
  if (/(^|[.:;]\s+)agents?\b/im.test(all) || bare.length) bad.push(`bare "agent" after: ${[...new Set(bare)].join(', ') || 'start of a sentence'}`);
  // the app count is 2,300+
  const counts = all.match(/\b\d[\d,]*\+? (?:more )?apps\b/g)?.filter(n => /\d,\d{3}/.test(n) && !n.startsWith('2,300+'));
  if (counts?.length) bad.push(`app count: ${counts.join(', ')}`);
  // no credits and no prices for 50agents: any sentence about 50agents, Captain or Needs you that names credits or money
  for (const s of all.replace(/ \| 50agents/g, '').split(/(?<=[.?:])\s+|\n/)) {
    if (/50agents|Captain|Needs you|every workspace/i.test(s) && /credit|\$\s?\d|€\s?\d|per month|a month|pricing|price of 50agents/i.test(s)) bad.push(`50agents credits or price: "${s.slice(0, 90)}"`);
  }
  if (/2,000 credits|free with \d/i.test(all)) bad.push('50agents credits');
  return bad;
}

/** Tool prices ("$19.99 a month", "€20 per user") need the page's one "Prices checked" line. */
/** Dates in source labels ("read 19 Nov", "(26 May 2026)") are left out too. */
export const labelDates = labels => labels.filter(l => /\b(19|20)\d\d\b|\d{1,2} (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/.test(l));

export const namesPrices = all => /(\$|€|£)\s?\d[\d.,]*\s*(a|per|\/)\s*(month|user|year|seat|mo)\b/i.test(all);

export const shingles = t => {
  const w = t.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter(Boolean), s = new Set();
  for (let i = 0; i + 5 <= w.length; i++) s.add(w.slice(i, i + 5).join(' '));
  return s;
};
export const overlap = (a, b) => { let n = 0; a.forEach(x => b.has(x) && n++); return n / Math.max(1, Math.min(a.size, b.size)); };

export function report(family, pages, results, run) {
  const failed = results.filter(r => r.bad.length).length;
  const md = `# Gate report: ${family}\n\nPages ${pages.length}, passed ${pages.length - failed}, failed ${failed}. Run: ${run}\n\n| Page | Words | Result |\n|---|---|---|\n${results.map(r => `| ${r.slug} | ${r.words} | ${r.bad.length ? 'FAIL: ' + r.bad.join('; ').replace(/\|/g, '/') : 'pass'} |`).join('\n')}\n`;
  fs.writeFileSync(`scripts/pages/report-${family}.md`, md);
  console.log(md);
  process.exit(failed ? 1 : 0);
}
