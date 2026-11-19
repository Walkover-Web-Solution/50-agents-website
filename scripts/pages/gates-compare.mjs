// The page pipeline's gates for the comparison family (D253), on every page JSON in src/content/compare/pages.
// Shape, facts (every price or count named must match src/content/compare/facts.ts for a tool named in the same
// sentence), style (house rules), uniqueness (5-word shingles under 0.5) and length. Writes report-compare.md.
// Run from the repo root: node scripts/pages/gates-compare.mjs  (Node 23+ reads facts.ts directly)
import fs from 'node:fs';
const { TOOLS, ROWS } = await import(new URL('../../src/content/compare/facts.ts', import.meta.url));
const DIR = 'src/content/compare/pages';
const rows = Object.fromEntries(JSON.parse(fs.readFileSync('scripts/pages/rows-compare.json', 'utf8')).map(r => [r.slug, r]));
const PATHS = new Set(JSON.parse(fs.readFileSync('scripts/pages/rows-compare.json', 'utf8')).map(r => `/compare/${r.slug}`));
const BANNED = ['unlock', 'unleash', 'seamless', 'effortless', 'leverage', 'robust', 'elevate', 'empower', 'supercharge', 'game-changer', 'revolutioniz', 'cutting-edge', 'delve', 'harness', 'streamline', 'synergy', 'journey', 'landscape', 'realm', 'tapestry', "today's fast-paced", 'look no further', 'say goodbye to', 'next level', 'imagine a world', "whether you're"];
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

const texts = p => [p.title, p.description, p.h1, ...p.answer, p.lede, ...(p.notice ? [p.notice.h, p.notice.body] : []),
  ...(p.entries ?? []).flatMap(e => [e.suits, e.price, e.limit]), ...p.pick.us, ...p.pick.them,
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
  // shape
  if (!row) bad.push('no row in rows-compare.json');
  else {
    if (p.ask !== row.ask) bad.push('ask differs from the row');
    if (p.type !== row.type || p.tool !== row.tool) bad.push('type or tool differs from the row');
  }
  if (!them) bad.push(`tool ${p.tool} not in facts.ts`);
  if (p.title.length > 60 || !p.title.endsWith(' | 50agents')) bad.push(`title ${p.title.length} chars or no " | 50agents"`);
  if (p.description.length < 120 || p.description.length > 160) bad.push(`description ${p.description.length} chars`);
  if (p.answer.length !== 2) bad.push('answer is not two sentences');
  p.answer.forEach((a, i) => words(a) > 40 && bad.push(`answer ${i + 1} is ${words(a)} words`));
  if (words(p.lede) > 30) bad.push(`lede ${words(p.lede)} words`);
  if (p.pick.us.length < 2 || p.pick.us.length > 3 || p.pick.them.length < 2 || p.pick.them.length > 3) bad.push('pick cards need 2 or 3 lines each');
  [...p.pick.us, ...p.pick.them].forEach(s => words(s) > 30 && bad.push(`pick line ${words(s)} words`));
  if (p.move.length < 3 || p.move.length > 4) bad.push('move not 3 or 4 rows');
  p.move.forEach(m => words(m.body) > 45 && bad.push(`move "${m.title}" ${words(m.body)} words`));
  if (p.faqs.length < 3 || p.faqs.length > 5) bad.push('faqs not 3 to 5');
  p.faqs.forEach(f => words(f.a) > 70 && bad.push(`faq "${f.q}" ${words(f.a)} words`));
  if (p.related.length !== 3) bad.push('related not 3');
  p.related.forEach(r => (!PATHS.has(r.href) || r.href === `/compare/${p.slug}`) && bad.push(`related ${r.href} is not another comparison page`));
  if (p.type === 'alternatives') {
    const ids = p.entries.map(e => e.tool);
    if (ids.length < 5 || ids.length > 7) bad.push(`${ids.length} entries (50agents plus 4 to 6)`);
    if (ids[0] !== 'fifty') bad.push('50agents is not first');
    if (new Set(ids).size !== ids.length) bad.push('a tool is listed twice');
    if (row && row.tools.join() !== ids.join()) bad.push('entries differ from the row');
    if (ids.includes(p.tool)) bad.push('the page\'s own tool is in its alternatives');
    for (const e of p.entries) {
      if (!TOOLS[e.tool]) { bad.push(`entry ${e.tool} not in facts.ts`); continue; }
      if (words(e.suits) > 30) bad.push(`${e.tool} suits ${words(e.suits)} words`);
      if (words(e.limit) > 35) bad.push(`${e.tool} limit ${words(e.limit)} words`);
      if (words(e.price) > 16) bad.push(`${e.tool} price ${words(e.price)} words`);
      if (e.tool === 'fifty' && e.price !== 'Free to start') bad.push('50agents price is not "Free to start"');
      if (!e.limit) bad.push(`${e.tool} has no limitation`);
      if (![e.tool, 'fifty', p.tool, ...ids].some(id => factUrls(id).has(e.limitUrl))) bad.push(`${e.tool} limitUrl is not a facts.ts page`);
      // the entry's price and words are checked against its own facts and any tool they name
      for (const [field, s] of [['price', e.price], ['suits', e.suits], ['limit', e.limit]]) {
        const ok = new Set([...allowed([e.tool, ...named(s)]), ...askNums]);
        numbers(s).filter(n => !ok.has(n.key)).forEach(n => bad.push(`${e.tool} ${field}: "${n.raw}" not in facts.ts`));
      }
    }
    if (them?.status && !p.notice) bad.push(`${them.name} is closing but the page has no notice`);
    if (p.notice && !them?.status) bad.push('notice without a status fact');
  } else {
    if (p.rows.length < 5 || p.rows.length > 12) bad.push(`${p.rows.length} table rows (5 to 12)`);
    p.rows.forEach(r => {
      if (!ROWS[r]) bad.push(`row ${r} unknown`);
      else if (r === 'free' || r === 'price') bad.push(`row ${r} is drawn by the template`);
      else if (!them?.cells[r] || !TOOLS.fifty.cells[r]) bad.push(`row ${r} has no checked cell for both tools`);
    });
    if (row && row.rows.join() !== p.rows.join()) bad.push('rows differ from the row');
  }
  // facts: every price or count in the writing matches facts.ts for a tool its sentence names (or the page's tools)
  const prose = texts(p).filter(s => !(p.entries ?? []).some(e => [e.suits, e.price, e.limit].includes(s)));
  for (const s of prose.flatMap(sentences)) {
    const ids = named(s);
    const ok = new Set([...allowed(ids.filter(i => i !== 'fifty').length ? ids : pageTools), ...askNums]);
    numbers(s).filter(n => !ok.has(n.key)).forEach(n => bad.push(`"${n.raw}" not in facts.ts for ${ids.length ? ids.join(', ') : 'the page\'s tools'}: ${s.slice(0, 60)}`));
    if (/\b(50agents|Captain)\b/.test(s) && !ids.some(i => i !== 'fifty') && /credit|[$€£]\d/i.test(s)) bad.push(`credits or a price for 50agents: ${s.slice(0, 60)}`);
  }
  const all = texts(p).join('\n');
  if (/(?<![\d,])2,000 credits|\$1 (buys|per)/.test(all)) bad.push('50agents credits or price');
  // style
  if (/—/.test(all)) bad.push('em dash');
  if (/!/.test(all)) bad.push('exclamation mark');
  BANNED.forEach(b => all.toLowerCase().includes(b) && bad.push(`banned: ${b}`));
  if (/ViaSocket/.test(all)) bad.push('ViaSocket');
  const dated = texts({ ...p, notice: undefined }).join('\n');
  if (/\b(19|20)\d\d\b|\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]* \d{4}\b|\b\d{1,2} (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/.test(dated)) bad.push('a date or year outside the notice');
  const bare = [...all.matchAll(/(\S+)\s+agents?\b/gi)].map(m => m[1]).filter(w => !/^(AI|browser|50|Zapier|Softr)$/i.test(w));
  if (/(^|\n)agents?\b/i.test(all) || bare.length) bad.push(`bare "agent" after: ${[...new Set(bare)].join(', ')}`);
  // uniqueness, within the same type
  for (const q of pages) {
    if (q.slug === p.slug || q.type !== p.type) continue;
    const a = sh[p.slug], b = sh[q.slug]; let n = 0; a.forEach(x => b.has(x) && n++);
    const j = n / Math.max(1, Math.min(a.size, b.size));
    if (j >= 0.5) bad.push(`overlaps ${q.slug} (${j.toFixed(2)})`);
  }
  // length (the table's facts come from facts.ts and are not counted)
  const min = p.type === 'alternatives' ? 500 : 300; // a versus table's rows are facts.ts text, not counted
  if (words(all) < min) bad.push(`only ${words(all)} words of its own`);
  if (bad.length) failed++;
  report.push(`| ${p.slug} | ${words(all)} | ${bad.length ? 'FAIL: ' + bad.join('; ') : 'pass'} |`);
}
const md = `# Gate report: comparisons\n\nPages ${pages.length}, passed ${pages.length - failed}, failed ${failed}. Run: node scripts/pages/gates-compare.mjs\n\n| Page | Words | Result |\n|---|---|---|\n${report.join('\n')}\n`;
fs.writeFileSync('scripts/pages/report-compare.md', md);
console.log(md);
process.exit(failed ? 1 : 0);
