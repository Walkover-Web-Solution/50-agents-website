// The homepage heroes (iframes, one per A/B variant) must use the site's content band: a 1160px wrap with 32px sides,
// the same edges as the header and every other page (Jii, 20 Nov: "home page width is much larger than all the other pages").
// Fails the build if a live hero file sets a wider outer width again.
import fs from 'fs';
const files = ['orbit.html', 'strip.html', 'stage-films.html'].map(f => `public/landing/hero/${f}`);
const bad = [];
for (const f of files) {
  const s = fs.readFileSync(f, 'utf8');
  for (const m of s.matchAll(/(?<!\()max-width:(\d+)px/g)) if (+m[1] > 1160) bad.push(`${f}: max-width:${m[1]}px`);
  if (f.endsWith('orbit.html') && !s.includes('band/1200')) bad.push(`${f}: the stage no longer scales to the 1096px band`);
}
if (bad.length) { console.error('check-landing-width: the homepage hero is wider than the site:\n  ' + bad.join('\n  ')); process.exit(1); }
console.log('check-landing-width: homepage heroes use the site width');
