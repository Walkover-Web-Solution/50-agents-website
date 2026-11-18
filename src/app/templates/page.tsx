import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { LegacyPageGuide } from '@/components/LegacyPageGuide';
import { TemplatesServerOutline } from '@/components/TemplatesServerOutline';
import { TEMPLATES_PAGE_GUIDE } from '@/lib/legacy-page-guides';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { headers } from 'next/headers';
import { getMetaData } from '@/lib/meta';
import TemplateGrid from './components/TemplateGrid';

export const runtime = 'edge';

// SEO Metadata for Pricing page
export async function generateMetadata() {
  const headersList = await headers();
  const host = headersList.get("host");
  const proto = headersList.get("x-forwarded-proto") || "http";

  const pageUrl = `${proto}://${host}/templates`;

  const meta = await getMetaData("/templates", pageUrl);

  return generateSEOMetadata({
    title: meta?.title || 'Templates',
    description: meta?.description,
    keywords: meta?.keywords,
    canonical: '/templates',
    noIndex: true, // old product page: reachable from the footer, not indexed (SEO, 18 Nov)
    type: meta?.type,
  });
}

function TemplatesPage() {
  return (
    <div
      className="min-h-full w-full flex flex-col"
    >
      <Header />
      <div className="flex-1 pt-20">
        <TemplatesServerOutline />
        <TemplateGrid />
        <LegacyPageGuide sections={TEMPLATES_PAGE_GUIDE} />
      </div>
      <Footer />
    </div>
  );
}

export default TemplatesPage;
