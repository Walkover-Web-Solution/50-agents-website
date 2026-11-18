import { sitemapIndex } from '@/site/sitemaps';

// The same sitemap index at a second address: /sitemap.xml is redirected by a Cloudflare rule outside this repo.
// robots.txt points here until that rule is removed (SEO, 18 Nov).
export const dynamic = 'force-static';
export function GET() {
  return sitemapIndex();
}
