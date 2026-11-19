// The use case gates' checks (gates.mjs), shared by the hubs and learn gates: style, house rules, uniqueness, facts helpers.
import fs from 'node:fs';
export const BANNED = ['unlock', 'unleash', 'seamless', 'effortless', 'leverage', 'robust', 'elevate', 'empower', 'supercharge', 'game-changer', 'revolutioniz', 'cutting-edge', 'delve', 'harness', 'streamline', 'synergy', 'journey', 'landscape', 'realm', 'tapestry', "today's fast-paced", 'look no further', 'say goodbye to', 'next level', 'imagine a world'];
export const words = s => s.split(/\s+/).filter(Boolean).length;
export const shingles = t => { const w = t.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter(Boolean), s = new Set(); for (let i = 0; i + 5 <= w.length; i++) s.add(w.slice(i, i + 5).join(' ')); return s; };
export const overlap = (a, b) => { let n = 0; a.forEach(x => b.has(x) && n++); return n / Math.max(1, Math.min(a.size, b.size)); };

/** Style and house rules on all of a page's text; returns the problems. */
export function style(all) {
  const bad = [];
  if (/—/.test(all)) bad.push('em dash');
  if (/!/.test(all)) bad.push('exclamation mark');
  BANNED.forEach(b => all.toLowerCase().includes(b) && bad.push(`banned: ${b}`));
  if (/ViaSocket/.test(all)) bad.push('ViaSocket');
  if (/credit/i.test(all)) bad.push('mentions credits');
  if (/\b(19|20)\d\d\b|\b(January|February|March|April|June|July|August|September|October|November|December) \d{4}\b/.test(all)) bad.push('a date or year in the text');
  const bare = [...all.matchAll(/(\S+)\s+agents?\b/gi)].map(m => m[1]).filter(w => !/^(AI|browser|50)$/i.test(w));
  if (/^agents?\b/im.test(all) || bare.length) bad.push(`bare "agent" after: ${[...new Set(bare)].join(', ')}`);
  const counts = (all.match(/\b\d{1,3}(,\d{3})+\+?/g) || []).filter(n => n !== '2,300+');
  if (counts.length) bad.push(`numbers to check: ${counts.join(', ')}`);
  if (/\b(real-time|instantly)\b/i.test(all)) bad.push('claims real-time or instant runs');
  if (/\bemail address of its own\b/i.test(all) && !/\bno email address of its own\b/i.test(all)) bad.push('claims an email address per AI agent');
  return bad;
}

// Facts: the catalog, the app's starting asks (app/src/features/templates/list.ts) and the pages that exist.
export const CATALOG = new Set(JSON.parse(fs.readFileSync('src/content/integrations/catalog/index.json', 'utf8')).apps.map(a => a.s));
const LIST = fs.readFileSync('../app/src/features/templates/list.ts', 'utf8');
const KIND = { normal: 'ai', automation: 'auto', app: 'app', browser: 'browser', once: 'once' };
/** ask -> kind, for every starting ask in the app. */
export const ASKS = new Map([...LIST.matchAll(/kind: "(\w+)"[\s\S]*?ask: "([^"]+)"/g)].map(m => [m[2], KIND[m[1]]]));
const strings = f => [...fs.readFileSync(f, 'utf8').matchAll(/'(\/[a-z0-9/-]+)'/g)].map(m => m[1]);
const dir = d => fs.readdirSync(d).filter(f => f.endsWith('.json')).map(f => f.replace(/\.json$/, ''));
export const UC_PAGES = dir('src/content/use-cases/pages').map(s => JSON.parse(fs.readFileSync(`src/content/use-cases/pages/${s}.json`, 'utf8')));
export const PATHS = new Set([
  ...strings('src/content/guides/paths.ts'), ...strings('src/content/compare/paths.ts'), ...strings('src/content/hubs/paths.ts'), ...strings('src/content/pages/paths.ts'),
  ...dir('src/content/learn/pages').map(s => `/learn/${s}`), '/learn', ...UC_PAGES.map(u => `/use-cases/${u.slug}`),
  ...['sales', 'support', 'finance', 'operations', 'ecommerce', 'agencies', 'hr', 'founders'].map(r => `/for/${r}`), '/integrations',
]);

/** The example (ask + build) against the app's asks, the catalog and the use case page with the same ask. */
export function example(ex, kind) {
  const bad = [];
  if (!ASKS.has(ex.ask)) bad.push('ask is not a starting ask in app templates/list.ts');
  else if (kind && ASKS.get(ex.ask) !== kind) bad.push(`ask is a ${ASKS.get(ex.ask)}, page says ${kind}`);
  ex.build.apps.forEach(a => !CATALOG.has(a) && bad.push(`app ${a} not in the catalog`));
  const uc = UC_PAGES.find(u => u.ask === ex.ask);
  if (uc && JSON.stringify(uc.build) !== JSON.stringify(ex.build)) bad.push(`plan differs from the use case page ${uc.slug}`);
  if (ex.build.does.length < 2 || ex.build.does.length > 3) bad.push('plan "does" not 2 or 3 lines');
  return bad;
}

export function report(family, pages, rows, run) {
  const failed = rows.filter(r => r.bad.length).length;
  const md = `# Gate report: ${family}\n\nPages ${pages}, passed ${pages - failed}, failed ${failed}. Run: node scripts/pages/${run}\n\n| Page | Words | Result |\n|---|---|---|\n${rows.map(r => `| ${r.slug} | ${r.words} | ${r.bad.length ? 'FAIL: ' + r.bad.join('; ') : 'pass'} |`).join('\n')}\n`;
  fs.writeFileSync(`scripts/pages/report-${family}.md`, md);
  console.log(md);
  process.exit(failed ? 1 : 0);
}
