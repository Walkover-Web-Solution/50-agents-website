// The homepage heroes (iframes, one per A/B variant) and every other page share one band, the homepage's own: a 1360px wrap with 40px sides
// (content up to 1280px). Jii, 20 Nov: "match the width of every other page TO HOME PAGE'S" (D267).
// Fails the build if a hero or the site's wrap drifts from it.
import fs from 'fs';
const files = ['orbit.html', 'strip.html', 'stage-films.html'].map(f => `public/landing/hero/${f}`);
const bad = [];
for (const f of files) {
  const s = fs.readFileSync(f, 'utf8');
  for (const m of s.matchAll(/(?<!\()max-width:(\d+)px/g)) if (+m[1] > 1360) bad.push(`${f}: max-width:${m[1]}px`);
  if (f.endsWith('orbit.html') && !s.includes('band=Math.min(innerWidth-80,1280)')) bad.push(`${f}: the stage no longer scales to the 1280px band`);
}
const css = fs.readFileSync('src/site/site.css', 'utf8');
if (!/\.wrap,\.hd-in,[^{]*\{max-width:1360px;padding-left:40px;padding-right:40px\}/.test(css)) bad.push('src/site/site.css: the site wrap is not the homepage band (1360px, 40px sides)');
if (bad.length) { console.error('check-landing-width: the pages and the homepage no longer share one width:\n  ' + bad.join('\n  ')); process.exit(1); }
console.log('check-landing-width: every page uses the homepage band');
