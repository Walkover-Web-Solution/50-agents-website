'use client';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SecuritySection from '@/components/SecuritySection';
import ShowAppsMarquee from '@/components/ShowAppsMarquee';
import FAQSection from '@/components/FAQSection';
import NonTechSection from '@/components/NonTechSection';
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
        <FAQSection subHeading="Answers to common questions about 50Agents and its features. If you have any other questions, please don't hesitate to contact us." faqs={faqData || []} />
        <div className="divider" />
        <SecuritySection heading="50Agents is the Trusted Choice for Building Secure AI Agents" description="Your AI agents run safely with us—secure, private, and designed with protection in mind at every step, so you can automate confidently." />
      </div>
      <Footer />
    </div>
  );
}

export default LandingPage;
