import Footer from '@/components/Footer';
import Header from '@/components/Header';
import PricingSection from '@/components/PricingSection';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { headers } from 'next/headers';
import { getMetaData } from '@/lib/meta';

export const runtime = 'edge';

// SEO Metadata for Pricing page
export async function generateMetadata() {
  const headersList = await headers();
  const host = headersList.get("host");
  const proto = headersList.get("x-forwarded-proto") || "http";

  const pageUrl = `${proto}://${host}/pricing`;

  const meta = await getMetaData("/pricing", pageUrl);

  return generateSEOMetadata({
    title: meta?.title || 'Pricing Plans',
    description: meta?.description,
    keywords: meta?.keywords,
    canonical: meta?.name,
    type: meta?.type,
  });
}

function PricingPage() {
  return (
    <div
      className="min-h-full w-full flex flex-col"
    >
      <Header />
      <div className="flex-1 pt-20">
        <PricingSection />
      </div>
      <Footer />
    </div>
  );
}

export default PricingPage;
