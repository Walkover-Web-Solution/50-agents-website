// The uniqueness gate on the indexed programmatic pages (Search review 01: an indexed page must have 5-word shingle
// overlap under 0.5 with every other indexed page of its family). Reads the indexed pages from the four sitemaps
// (integrations, integrations-test, pairs, pairs-test), fetches each page's server HTML from the dev server, takes the
// page's own text (header and footer left out) and compares. Pages that fail stay noindex: their paths go to
// src/content/integrations/index-gate.json, which the tiers in src/site/integrations/data.ts read; the test cohort then
// fills from the next in line, so the script repeats until the sitemaps stop changing. A failed page stays failed; after
// a template change, empty the list ({ "failed": [] }) and run again.
// Writes report-integrations-index.md. Usage: node scripts/pages/uniqueness-integrations.mjs [http://localhost:3050]
import fs from 'node:fs';
const BASE = process.argv[2] ?? 'http://localhost:3050';
const GATE = 'src/content/integrations/index-gate.json';
// a local server can drop a connection under load: retry a few times before giving up
const get = async u => { for (let i = 0; ; i++) { try { const r = await fetch(BASE + u); if (r.ok || i >= 4) return await r.text(); } catch (e) { if (i >= 4) throw e; } await new Promise(r => setTimeout(r, 500 * (i + 1))); } };
const locs = xml => [...xml.matchAll(/<loc>https:\/\/50agents\.com([^<]+)<\/loc>/g)].map(m => m[1]);
// Shared components are excluded (brief D7): any element marked data-gate="skip" (the full trigger and action lists,
// which are catalog data shared by every page of the app) is cut out before shingling.
const skip = html => {
  let k;
  while ((k = html.indexOf('data-gate="skip"')) >= 0) {
    const start = html.lastIndexOf('<', k), tag = html.slice(start + 1).match(/^[a-z0-9]+/i)[0];
    const re = new RegExp(`<${tag}[\\s>]|</${tag}>`, 'gi');
    re.lastIndex = start + 1;
    let depth = 1, m, end = html.length;
    while ((m = re.exec(html))) { depth += m[0][1] === '/' ? -1 : 1; if (!depth) { end = m.index + m[0].length; break; } }
    html = html.slice(0, start) + ' ' + html.slice(end);
  }
  return html;
};
const text = html0 => {
  const html = skip(html0);
  const i = html.indexOf('class="page uc3 ig3"'), j = html.indexOf('<footer', i);
  return i < 0 ? '' : html.slice(i, j > 0 ? j : undefined).replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, ' ').replace(/\s+/g, ' ').trim();
};
const shingles = t => { const w = t.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter(Boolean), s = new Set(); for (let i = 0; i + 5 <= w.length; i++) s.add(w.slice(i, i + 5).join(' ')); return s; };
const cache = {};
const sleep = ms => new Promise(r => setTimeout(r, ms));

const gateFile = JSON.parse(fs.readFileSync(GATE, 'utf8'));
let failed = new Set(gateFile.failed);
// kept: already-indexed pages that only fail against a newer cohort stay indexed (the newcomer stays out)
const kept = new Set(gateFile.kept ?? []);
let report = [], prev = '';
for (let pass = 1; pass <= 6; pass++) {
  report = [];
  const now = new Set();
  for (const fam of ['integrations', 'pairs']) {
    const listed = [...locs(await get(`/sitemaps/${fam}.xml`)), ...locs(await get(`/sitemaps/${fam}-test.xml`)), ...(fam === 'integrations' ? locs(await get('/sitemaps/integrations-rest.xml')) : locs(await get('/sitemaps/pairs-2.xml')))];
    listed.forEach(p => now.add(p));
    const isPair = p => p.split('/').length === 4;
    const paths = [...new Set([...listed, ...[...failed].filter(p => (fam === 'pairs') === isPair(p))])];
    const known = new Set(failed); // failed in an earlier pass: compared with nothing, and they stay failed (so it converges)
    for (let k = 0; k < paths.length; k += 8) await Promise.all(paths.slice(k, k + 8).filter(p => !cache[p]).map(async p => { cache[p] = shingles(text(await get(p))); }));
    const rows = paths.map(p => {
      let worst = 0, w = '';
      for (const q of paths) {
        if (q === p || known.has(q) || known.has(p)) continue; // compare the pages still in line with each other
        let n = 0; cache[p].forEach(x => cache[q].has(x) && n++);
        const j = n / Math.max(1, Math.min(cache[p].size, cache[q].size));
        if (j > worst) { worst = j; w = q; }
      }
      return { p, worst, w };
    });
    rows.forEach(r => r.worst >= 0.5 && !kept.has(r.p) && failed.add(r.p));
    rows.forEach(r => { if (known.has(r.p)) r.worst = Math.max(r.worst, 0.5); });
    rows.sort((a, b) => b.worst - a.worst);
    const pass_ = rows.filter(r => r.worst < 0.5).length;
    report.push(`## ${fam}: ${pass_} indexed (core and test), ${rows.length - pass_} fail and stay noindex\n\n| Page | Highest overlap | With |\n|---|---|---|\n${rows.map(r => `| ${r.p} | ${r.worst.toFixed(2)}${r.worst >= 0.5 ? ' FAIL' : ''} | ${r.w} |`).join('\n')}\n`);
  }
  fs.writeFileSync(GATE, JSON.stringify({ note: gateFile.note, failed: [...failed].sort(), kept: [...kept].sort() }, null, 1) + '\n');
  const key = [...now].sort().join();
  console.log(`pass ${pass}: ${now.size} in the sitemaps, ${failed.size} failed`);
  if (key === prev) break;
  prev = key;
  await sleep(4000); // the dev server reloads the gate list
}
const md = `# Uniqueness of the indexed integration and pair pages\n\nRun: node scripts/pages/uniqueness-integrations.mjs (dev server running). Threshold: under 0.5. Failing pages stay noindex (src/content/integrations/index-gate.json).\n\n${report.join('\n')}`;
fs.writeFileSync('scripts/pages/report-integrations-index.md', md);
console.log(md.split('\n').filter(l => l.startsWith('##')).join('\n'));
