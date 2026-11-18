import sitemap from '../sitemap';

// The same sitemap at a second address: /sitemap.xml is redirected to a dead dev API by a rule outside this repo
// (Cloudflare). robots.txt points here until that rule is removed (SEO, 18 Nov).
export const runtime = 'edge';

export function GET() {
  const urls = sitemap().map((u) => `<url><loc>${u.url}</loc>${u.lastModified ? `<lastmod>${new Date(u.lastModified).toISOString()}</lastmod>` : ''}${u.changeFrequency ? `<changefreq>${u.changeFrequency}</changefreq>` : ''}${u.priority !== undefined ? `<priority>${u.priority}</priority>` : ''}</url>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, {
    headers: { 'content-type': 'application/xml; charset=utf-8' },
  });
}
