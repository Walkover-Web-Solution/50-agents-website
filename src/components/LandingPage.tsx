'use client';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SecuritySection from '@/components/SecuritySection';
import ShowAppsMarquee from '@/components/ShowAppsMarquee';
import FAQSection from '@/components/FAQSection';
import NonTechSection from '@/components/NonTechSection';
import ReliabilitySection from '@/components/ReliabilitySection';
import HeroSection from '@/components/HeroSection';

function LandingPage({ faqData, promptData }: { faqData: Array<{ question: string; answer: string; }> | null; promptData: Array<{ button_label: string; prompt: string; }> | null }) {
  return (
    <div className="min-h-full w-full flex flex-col">
      <Header />
      <div className="flex-1 pt-24 pb-12 flex flex-col">
        <HeroSection promptData={promptData || []}/>
        <div className="divider" />
        <ShowAppsMarquee />
        <div className="divider" />
        <NonTechSection />
        <div className="divider" />
        <ReliabilitySection />
        <div className="divider" />
        <FAQSection subHeading="Answers to common questions about 50Agents and its features. If you have any other questions, please don't hesitate to contact us." faqs={faqData || []} />
        <div className="divider" />
        <SecuritySection />
      </div>
      <Footer />
    </div>
  );
}

export default LandingPage;
