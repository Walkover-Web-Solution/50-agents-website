// The page pipeline's gates for the comparison family (v5, D255: Jii's round 3; v4 was D254), on every page JSON in
// src/content/compare/pages. Shape and word limits (short everywhere), facts (every price or count named must match
// src/content/compare/facts.ts for a tool named in the same sentence, every table cell 5 words at most), safe wording
// (neutral, nothing about competitors' quality, security, reliability or customers), style (house rules, no dates),
// uniqueness (5-word shingles under 0.5). D255: tables show only where 50agents wins (no "Better for" or "Staying on"
// rows, every versus row a win by isWin in facts.ts), and nothing says 50agents can't do apps outside the team or export.
// Writes report-compare.md.
// Run from the repo root: node scripts/pages/gates-compare.mjs  (Node 23+ reads facts.ts directly)
import fs from 'node:fs';
const { TOOLS, ROWS, isWin } = await import(new URL('../../src/content/compare/facts.ts', import.meta.url));
const DIR = 'src/content/compare/pages';
const ROWS_IN = JSON.parse(fs.readFileSync('scripts/pages/rows-compare.json', 'utf8'));
const rows = Object.fromEntries(ROWS_IN.map(r => [r.slug, r]));
const PATHS = new Set(ROWS_IN.map(r => `/compare/${r.slug}`));
const FACES = new Set(['lead', 'keeper', 'writer', 'scout', 'sorter']);
const BANNED = ['unlock', 'unleash', 'seamless', 'effortless', 'leverage', 'robust', 'elevate', 'empower', 'supercharge', 'game-changer', 'revolutioniz', 'cutting-edge', 'delve', 'harness', 'streamline', 'synergy', 'journey', 'landscape', 'realm', 'tapestry', "today's fast-paced", 'look no further', 'say goodbye to', 'next level', 'imagine a world', "whether you're"];
// Jii, round 2: "ensure that we don't say anything that might cause issues". Judgemental or loaded words, anywhere.
const LOADED = /\b(cheap(er|est)?|expensive|pricey|overpriced|costly|clunky|outdated|dated|old-fashioned|complicated|complex|confusing|bloated|limited|limiting|lacks?|lacking|painful|pain|frustrat\w*|annoy\w*|struggl\w*|worse|worst|the best|best (tool|alternative|option|choice|pick)|better than|easiest|fastest|only tool|fed up|too much|the bill|hidden|gotcha|trap|catch|mess|messy|broken|fails?|failing)\b/i;
// No claims about another tool's quality, security or reliability (checked in any sentence that names one).
const QUALITY = /\b(secur\w*|safe(ty|r)?|reliab\w*|unreliab\w*|uptime|downtime|outages?|breach\w*|bugs?|buggy|quality|stable|unstable|slow(er)?|support team|customer support|trust\w*)\b/i;
// Nothing about their customers or users, and no "why people leave".
const PEOPLE = /(?<!\d,?\d* )\b(customers|users|clients|community|fans)\b/i; // "up to 5 users" is a plan fact, not their users
const LEAVE = /\b(why (people|teams|users|companies)|people (leave|switch|move off|outgrow)|teams (leave|switch|outgrow)|outgrow\w*|move(d)? off|ditch\w*|abandon\w*)\b/i;
const MONTHS = 'January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec';
const DATE = new RegExp(`\\b(19|20)\\d\\d\\b|\\b(${MONTHS}) \\d{4}\\b|\\b\\d{1,2} (${MONTHS})\\b|\\b(${MONTHS}) \\d{1,2}\\b|prices checked|as of\\b|\\bread \\d`, 'i');
const SOURCE = /\b(sources?:|sourced|according to|from (its|their|each tool's) own pages?|pricing page says|per (its|their) (site|website|docs))\b/i;

const words = s => s.split(/\s+/).filter(Boolean).length;
const sentences = s => s.split(/(?<=[.?:;])\s+(?=[A-Z0-9"'(])/).filter(Boolean);

// Tool names as a reader writes them, so a sentence's numbers are checked against the tools it names.
const NAMES = Object.values(TOOLS).map(t => [t.id, [t.name, ...({ powerautomate: ['Microsoft'], relevance: ['Relevance'], relay: ['Relay'], shortcuts: ['Shortcuts'], fifty: ['Captain'] }[t.id] ?? [])]]);
const named = s => NAMES.filter(([, ns]) => ns.some(n => new RegExp(`(^|[^\\w])${n.replace(/[.+]/g, '\\$&')}(?![\\w])`, 'i').test(s))).map(([id]) => id);
const factText = id => { const t = TOOLS[id]; return [t.what, t.free, t.price, t.apps, t.status, t.move, ...t.limits, ...t.better].filter(Boolean).map(f => f.fact).concat(Object.values(t.cells).map(c => c.note)).join(' \n '); };
const factUrls = id => { const t = TOOLS[id]; return new Set([t.site, ...[t.what, t.free, t.price, t.apps, t.status, t.move, ...t.limits, ...t.better].filter(Boolean).map(f => f.url), ...Object.values(t.cells).map(c => c.url)]); };

// Numbers: money always; other numbers when 100 or more, or followed by a unit a price or plan is counted in.
const UNIT = /^(users?|credits?|tasks?|executions?|apps?|integrations?|actions?|connectors?|services?|records?|workflows?|runs?|builders?|projects?|members?|days?|months?|per|a)\b/i;
function numbers(s, all = false) {
  const out = [];
  const re = /([$€£])\s?(\d[\d,]*(?:\.\d+)?)|(?<![\w:.$€£])(\d[\d,]*(?:\.\d+)?)(K\b|\+)?(?![\d:])/g;
  let m;
  while ((m = re.exec(s))) {
    if (m[1]) { out.push({ key: `${m[1]}${parseFloat(m[2].replace(/,/g, ''))}`, raw: m[0] }); continue; }
    const v = parseFloat(m[3].replace(/,/g, '')) * (m[4] === 'K' ? 1000 : 1);
    const next = s.slice(m.index + m[0].length).trimStart();
    if (all || v >= 100 || UNIT.test(next)) out.push({ key: `#${v}`, raw: m[0] });
  }
  return out;
}
const allowed = ids => new Set(ids.flatMap(id => numbers(factText(id), true).map(n => n.key)).concat(['#2300']));

// facts.ts itself: every table cell's short `s` is 5 words at most and names no number its note does not hold.
const factsBad = [];
for (const t of Object.values(TOOLS)) for (const [k, c] of Object.entries(t.cells)) {
  if (!c.s) factsBad.push(`${t.id}.${k} has no short`);
  else if (words(c.s) > 5) factsBad.push(`${t.id}.${k} short is ${words(c.s)} words`);
  const ok = new Set(numbers(c.note, true).map(n => n.key));
  if (c.s) numbers(c.s, true).filter(n => !ok.has(n.key) && !(t.id === 'fifty')).forEach(n => factsBad.push(`${t.id}.${k} short "${n.raw}" not in its note`));
}

const alts = p => p.type === 'alternatives' ? p.entries : [];
const cellTexts = p => alts(p).flatMap(e => [e.best, e.price, e.diff]).filter(Boolean);
// D255 (product-facts.md): apps for people outside your team on your own domain, and export, are shown as yes.
const DENIES = /(workspace only|(for|to) the people in your workspace|apps are for your (own )?(team|workspace)|no (customer |client )?portals?|no custom domains?|(can't|cannot|can not|does not|doesn't|do not|don't) export|no export)/i;
const texts = p => [p.title, p.description, p.h1, ...p.answer, p.line, p.lede, ...(p.notice ? [p.notice.h, p.notice.body] : []),
  ...cellTexts(p), ...(p.strengths ?? []).flatMap(s => [s.title, s.line]),
  ...p.move.flatMap(m => [m.title, m.body]), ...p.faqs.flatMap(f => [f.q, f.a]), ...p.related.flatMap(r => [r.title, r.line])];
const shingles = t => { const w = t.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter(Boolean), s = new Set(); for (let i = 0; i + 5 <= w.length; i++) s.add(w.slice(i, i + 5).join(' ')); return s; };

const pages = fs.readdirSync(DIR).filter(f => f.endsWith('.json')).map(f => JSON.parse(fs.readFileSync(`${DIR}/${f}`, 'utf8')));
const sh = Object.fromEntries(pages.map(p => [p.slug, shingles(texts(p).join(' '))]));
const report = [];
let failed = 0;
for (const p of pages) {
  const bad = [], row = rows[p.slug], them = TOOLS[p.tool];
  const pageTools = [p.tool, ...(p.entries ?? []).map(e => e.tool)];
  const askNums = numbers(p.ask, true).map(n => n.key); // the ask may be quoted
  const max = (s, n, what) => s && words(s) > n && bad.push(`${what} ${words(s)} words (max ${n})`);
  // shape and limits
  if (!row) bad.push('no row in rows-compare.json');
  else {
    if (p.ask !== row.ask) bad.push('ask differs from the row');
    if (p.type !== row.type || p.tool !== row.tool) bad.push('type or tool differs from the row');
  }
  if (!them) bad.push(`tool ${p.tool} not in facts.ts`);
  if (p.title.length > 60 || !p.title.endsWith(' | 50agents')) bad.push(`title ${p.title.length} chars or no " | 50agents"`);
  if (p.description.length < 120 || p.description.length > 160) bad.push(`description ${p.description.length} chars`);
  if (!Array.isArray(p.answer) || p.answer.length !== 2) bad.push('answer is not two sentences');
  else max(p.answer.join(' '), 40, 'answer');
  max(p.lede, 14, 'lede');
  if (!p.line) bad.push('no hero line (D255)'); else max(p.line, 14, 'hero line');
  if ('pick' in p) bad.push('old "pick" field: use strengths and the table\'s last row');
  if (!Array.isArray(p.strengths) || p.strengths.length < 3 || p.strengths.length > 4) bad.push('strengths not 3 or 4');
  else p.strengths.forEach(s => { max(s.title, 5, `strength "${s.title}" title`); max(s.line, 16, `strength "${s.title}" line`); if (!FACES.has(s.face)) bad.push(`strength face ${s.face}`); });
  if (p.move.length < 3 || p.move.length > 4) bad.push('move not 3 or 4 steps');
  p.move.forEach(m => { max(m.title, 5, `move "${m.title}" title`); max(m.body, 16, `move "${m.title}" body`); });
  if (p.faqs.length < 3 || p.faqs.length > 4) bad.push('faqs not 3 or 4');
  p.faqs.forEach(f => max(f.a, 40, `faq "${f.q}"`));
  if (p.related.length !== 3) bad.push('related not 3');
  p.related.forEach(r => { max(r.line, 8, `related ${r.href} line`); if (!PATHS.has(r.href) || r.href === `/compare/${p.slug}`) bad.push(`related ${r.href} is not another comparison page`); });
  if (p.type === 'alternatives') {
    const ids = p.entries.map(e => e.tool);
    if (ids.length < 5 || ids.length > 7) bad.push(`${ids.length} entries (50agents plus 4 to 6)`);
    if (ids[0] !== 'fifty') bad.push('50agents is not first');
    if (new Set(ids).size !== ids.length) bad.push('a tool is listed twice');
    if (row && row.tools.join() !== ids.join()) bad.push('entries differ from the row');
    if (ids.includes(p.tool)) bad.push('the page\'s own tool is in its alternatives');
    if ('stay' in p) bad.push('a "Staying on" row (dropped in D255: the table shows only where 50agents wins)');
    for (const e of alts(p)) {
      if (!TOOLS[e.tool]) { bad.push(`entry ${e.tool} not in facts.ts`); continue; }
      ['best', 'price', 'diff', 'src'].forEach(k => !e[k] && bad.push(`${e.tool} has no ${k}`));
      max(e.best, 5, `${e.tool} best for`); max(e.diff, 5, `${e.tool} key difference`); max(e.price, 6, `${e.tool} price`);
      if (e.tool === 'fifty' && e.price !== 'Free to start') bad.push('50agents price is not "Free to start"');
      if (e.src && !factUrls(e.tool).has(e.src) && !(e.tool === 'fifty' && factUrls('fifty').has(e.src))) bad.push(`${e.tool} src is not one of its facts.ts pages`);
      for (const [field, s] of [['price', e.price], ['best', e.best], ['diff', e.diff]]) {
        const ok = new Set([...allowed([e.tool, ...named(s ?? '')]), ...askNums]);
        numbers(s ?? '').filter(n => !ok.has(n.key)).forEach(n => bad.push(`${e.tool} ${field}: "${n.raw}" not in facts.ts`));
      }
    }
    if (them?.status && !p.notice) bad.push(`${them.name} is closing but the page has no notice`);
    if (p.notice && !them?.status) bad.push('notice without a status fact');
    if (p.notice) { max(p.notice.h, 6, 'notice heading'); max(p.notice.body, 30, 'notice'); }
  } else {
    if (p.rows.length < 5 || p.rows.length > 10) bad.push(`${p.rows.length} table rows (5 to 10)`);
    p.rows.forEach(r => {
      if (!ROWS[r]) bad.push(`row ${r} unknown`);
      else if (r === 'free' || r === 'price') bad.push(`row ${r} is drawn by the template`);
      else if (!them?.cells[r] || !TOOLS.fifty.cells[r]) bad.push(`row ${r} has no checked cell for both tools`);
      else if (!isWin(r, them.cells, TOOLS.fifty.cells)) bad.push(`row ${r} is not a 50agents win (D255)`);
    });
    if (row && row.rows.join() !== p.rows.join()) bad.push('rows differ from the row');
    if ('edge' in p) bad.push('a "Better for" row (dropped in D255: the table shows only where 50agents wins)');
  }
  // facts: every price or count in the writing matches facts.ts for a tool its sentence names (or the page's tools)
  const prose = texts(p).filter(s => !cellTexts(p).includes(s));
  for (const s of prose.flatMap(sentences)) {
    const ids = named(s);
    const ok = new Set([...allowed(ids.filter(i => i !== 'fifty').length ? ids : pageTools), ...askNums]);
    numbers(s).filter(n => !ok.has(n.key)).forEach(n => bad.push(`"${n.raw}" not in facts.ts for ${ids.length ? ids.join(', ') : 'the page\'s tools'}: ${s.slice(0, 60)}`));
    if (/\b(50agents|Captain)\b/.test(s) && !ids.some(i => i !== 'fifty') && /credit|[$€£]\d/i.test(s)) bad.push(`credits or a price for 50agents: ${s.slice(0, 60)}`);
  }
  // safe wording: neutral, nothing on their quality, security, reliability or customers
  const safe = texts(p).filter(s => s !== p.title && s !== p.h1);
  for (const s of safe.flatMap(sentences)) {
    const other = named(s).some(i => i !== 'fifty');
    const l = s.match(LOADED); if (l) bad.push(`loaded word "${l[0]}": ${s.slice(0, 60)}`);
    const q = s.match(QUALITY); if (q && other) bad.push(`quality, security or reliability of another tool ("${q[0]}"): ${s.slice(0, 60)}`);
    const c = s.match(PEOPLE); if (c && named(s).some(i => i !== 'fifty')) bad.push(`another tool's ${c[0]}: ${s.slice(0, 60)}`);
    const v = s.match(LEAVE); if (v) bad.push(`why people leave ("${v[0]}"): ${s.slice(0, 60)}`);
  }
  const all = texts(p).join('\n');
  const deny = all.match(DENIES); if (deny) bad.push(`says 50agents can't (D255 marks it yes): "${deny[0]}"`);
  if (/(?<![\d,])2,000 credits|\$1 (buys|per)/.test(all)) bad.push('50agents credits or price');
  // style
  if (/—/.test(all)) bad.push('em dash');
  if (/!/.test(all)) bad.push('exclamation mark');
  BANNED.forEach(b => all.toLowerCase().includes(b) && bad.push(`banned: ${b}`));
  if (/ViaSocket/.test(all)) bad.push('ViaSocket');
  // no dates and no source lines (a closing date may sit in the notice only)
  const dated = texts({ ...p, notice: undefined }).join('\n');
  const d = dated.match(DATE); if (d) bad.push(`a date outside the notice: "${d[0]}"`);
  const src = all.match(SOURCE); if (src) bad.push(`a source line: "${src[0]}"`);
  const bare = [...all.matchAll(/(\S+)\s+agents?\b/gi)].map(m => m[1]).filter(w => !/^(AI|browser|50|Zapier|Softr)$/i.test(w));
  if (/(^|\n)agents?\b/i.test(all) || bare.length) bad.push(`bare "agent" after: ${[...new Set(bare)].join(', ')}`);
  // uniqueness, within the same type
  for (const q of pages) {
    if (q.slug === p.slug || q.type !== p.type) continue;
    const a = sh[p.slug], b = sh[q.slug]; let n = 0; a.forEach(x => b.has(x) && n++);
    const j = n / Math.max(1, Math.min(a.size, b.size));
    if (j >= 0.5) bad.push(`overlaps ${q.slug} (${j.toFixed(2)})`);
  }
  // length: short pages, but never empty (the table's facts.ts cells are not counted)
  const [min, cap] = p.type === 'alternatives' ? [200, 520] : [170, 460];
  if (words(all) < min) bad.push(`only ${words(all)} words of its own (min ${min})`);
  if (words(all) > cap) bad.push(`${words(all)} words: too text-heavy (max ${cap})`);
  if (bad.length) failed++;
  report.push(`| ${p.slug} | ${words(all)} | ${bad.length ? 'FAIL: ' + bad.join('; ').replace(/\|/g, '/') : 'pass'} |`);
}
if (factsBad.length) failed++;
const md = `# Gate report: comparisons (v5, D255)\n\nPages ${pages.length}, passed ${pages.length - failed + (factsBad.length ? 1 : 0)}, failed ${failed - (factsBad.length ? 1 : 0)}. facts.ts cells: ${factsBad.length ? 'FAIL: ' + factsBad.join('; ') : 'pass'}. Run: node scripts/pages/gates-compare.mjs\n\n| Page | Words | Result |\n|---|---|---|\n${report.join('\n')}\n`;
fs.writeFileSync('scripts/pages/report-compare.md', md);
console.log(md);
process.exit(failed ? 1 : 0);
