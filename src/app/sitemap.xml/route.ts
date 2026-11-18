import { sitemapIndex } from '@/site/sitemaps';

// The sitemap index (one sitemap per family), also at /sitemap-main.xml, which robots.txt names.
export const dynamic = 'force-static';
export function GET() {
  return sitemapIndex();
}
