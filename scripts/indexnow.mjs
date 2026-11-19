// IndexNow (Search T32): tells Bing and the other IndexNow engines which 50agents.com URLs changed.
// The key is public by design: public/<key>.txt holds it and is served at https://50agents.com/<key>.txt.
//   node scripts/indexnow.mjs --all            every URL in the live sitemaps (after a big launch)
//   node scripts/indexnow.mjs /pricing /apps   only the URLs a deploy changed
// Run it after the deploy is live, so the engines fetch the new pages.
import fs from 'node:fs';

const HOST = '50agents.com';
const key = fs.readdirSync('public').map(f => f.match(/^([0-9a-f]{32})\.txt$/)?.[1]).find(Boolean);
if (!key) throw new Error('indexnow: no public/<key>.txt');

async function sitemapUrls() {
  const get = async u => (await (await fetch(u)).text());
  const locs = x => [...x.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].trim());
  const index = locs(await get(`https://${HOST}/sitemap.xml`));
  const urls = [];
  for (const s of index) urls.push(...locs(await get(s)));
  return [...new Set(urls)];
}

const args = process.argv.slice(2);
const urls = args.includes('--all') ? await sitemapUrls() : args.map(a => (a.startsWith('http') ? a : `https://${HOST}${a}`));
if (!urls.length) { console.log('indexnow: no URLs given'); process.exit(0); }
for (let i = 0; i < urls.length; i += 10000) {
  const urlList = urls.slice(i, i + 10000);
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key, keyLocation: `https://${HOST}/${key}.txt`, urlList }),
  });
  console.log(`indexnow: ${urlList.length} URLs -> HTTP ${res.status} ${res.statusText}`);
}
