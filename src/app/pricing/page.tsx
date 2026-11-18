import AgentPageSummary from '@/components/AgentPageSummary';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import PricingSection from './components/PricingSection';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { headers } from 'next/headers';
import { getMetaData } from '@/lib/meta';

const PRICING_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: '50agents',
  description:
    'AI agents, automations, and meeting recording with transparent usage-based pricing.',
  url: 'https://50agents.com/pricing',
  offers: [
    {
      '@type': 'Offer',
      name: 'AI Note Taker',
      price: '0.99',
      priceCurrency: 'USD',
      description: 'Meeting recording billed at $0.99 per recorded hour. No monthly commitment.',
      eligibleQuantity: {
        '@type': 'QuantitativeValue',
        unitText: 'hour',
      },
    },
    {
      '@type': 'Offer',
      name: 'Internal applications',
      price: '0',
      priceCurrency: 'USD',
      description: 'Free for the first 1,000 API calls per month per workspace.',
      eligibleQuantity: {
        '@type': 'QuantitativeValue',
        value: 1000,
        unitText: 'API calls per month',
      },
    },
    {
      '@type': 'Offer',
      name: 'Workspace credits',
      price: '0',
      priceCurrency: 'USD',
      description: 'Every new workspace includes 2,000 credits at signup.',
      eligibleQuantity: {
        '@type': 'QuantitativeValue',
        value: 2000,
        unitText: 'credits',
      },
    },
  ],
};

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
    canonical: '/pricing',
    noIndex: true, // old product page: reachable from the footer, not indexed (SEO, 18 Nov)
    type: meta?.type,
  });
}

function PricingPage() {
  return (
    <div className="min-h-full w-full flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PRICING_JSON_LD) }}
      />
      <Header />
      <div className="flex-1">
        <AgentPageSummary
          heading="Affordable pricing"
          paragraphs={[
            '50agents pricing is usage-based with no monthly lock-in for meeting recording. AI Note Taker costs $0.99 per recorded hour.',
            'Internal application agents are free for the first 1,000 API calls each month, then standard metered pricing applies.',
            'Every workspace includes 2,000 credits at signup for Captain-built automations across 2,300+ integrated apps. See pricing.md for machine-readable plan details.',
          ]}
        />
        <PricingSection />
      </div>
      <Footer />
    </div>
  );
}

export default PricingPage;
