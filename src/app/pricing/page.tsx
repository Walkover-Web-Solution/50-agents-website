import Footer from '@/components/Footer';
import Header from '@/components/Header';
import PricingSection from '@/components/PricingSection';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';

// SEO Metadata for Pricing page
export const metadata = generateSEOMetadata({
  title: 'Pricing Plans - Affordable AI Agent Automation for Every Business',
  description:
    'Choose the perfect pricing plan for your AI automation needs. Start free and scale with flexible plans designed for individuals, teams, and enterprises. No hidden fees.',
  keywords:
    'ai agent pricing, automation pricing, ai tools cost, business automation plans, enterprise ai pricing, ai agent subscription, workflow automation cost, ai productivity pricing',
  canonical: '/pricing',
  type: 'website',
});

function PricingPage() {
  return (
    <div
      className="min-h-full w-full flex flex-col"
      style={{ backgroundColor: 'var(--mui-palette-background-default)' }}
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
