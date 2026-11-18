import { FAMILIES, familySitemap } from '@/site/sitemaps';

// /sitemaps/<family>.xml, built once at build time.
export const dynamic = 'force-static';
export const dynamicParams = false;
export function generateStaticParams() {
  return Object.keys(FAMILIES).map(name => ({ name: `${name}.xml` }));
}
export async function GET(_: Request, { params }: { params: Promise<{ name: string }> }) {
  return familySitemap((await params).name.replace(/\.xml$/, ''));
}
