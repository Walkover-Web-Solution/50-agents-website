'use client';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import MissionSection from '@/components/MissionSection';
import TemplateGrid from '@/components/TemplateGrid';
import SecuritySection from '@/components/SecuritySection';
import ShowAppsMarquee from '@/components/ShowAppsMarquee';
import FAQSection from '@/components/FAQSection';

function LandingPage({ faqData }: { faqData: Array<{ question: string; answer: string; }> }) {
  return (
    <div className="min-h-full w-full flex flex-col">
      <Header />
      <div className="flex-1 pt-24 pb-12 flex flex-col gap-28">
        <TemplateGrid showHeader={true} />
        <MissionSection />
        <ShowAppsMarquee />
        <FAQSection subHeading="" faqs={faqData || []} />
        <SecuritySection />
      </div>
      <Footer />
    </div>
  );
}

export default LandingPage;
