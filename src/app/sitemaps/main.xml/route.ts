import { familySitemap } from '@/site/sitemaps';

// /sitemaps/main.xml, built once at build time. One static route per family (FAMILIES in src/site/sitemaps.ts): a dynamic
// [name] route would be a Node function, which Cloudflare Pages (next-on-pages) can't run.
export const dynamic = 'force-static';
export function GET() {
  return familySitemap('main');
}
