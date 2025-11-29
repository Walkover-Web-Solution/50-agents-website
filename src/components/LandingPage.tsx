'use client';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import MissionSection from '@/components/MissionSection';
import TemplateGrid from '@/components/TemplateGrid';

function LandingPage() {
  return (
    <div className="min-h-full w-full flex flex-col">
      <Header />
      <div className="flex-1 pt-24 pb-12 container">
        <TemplateGrid showHeader={true} />
        <MissionSection />
      </div>
      <Footer />
    </div>
  );
}

export default LandingPage;
