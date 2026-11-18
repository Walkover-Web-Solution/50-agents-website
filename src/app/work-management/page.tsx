import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { LegacyPageGuide } from '@/components/LegacyPageGuide';
import { WORK_MANAGEMENT_PAGE_GUIDE } from '@/lib/legacy-page-guides';
import FAQSection from '@/components/FAQSection';
import { getFaqData } from '@/lib/fetchFAQs';
import { headers } from 'next/headers';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { getMetaData } from '@/lib/meta';
import HeroWorkManagement from './components/HeroWorkManagement';
import SmarterWork from './components/SmarterWork';
import BuildWorkflow from './components/BuildWorkflow';
import AISecretWeapon from './components/AISecretWeapon';
import CTASection from './components/CTASection';

export const runtime = 'edge';

// SEO Metadata for AI Note Taker page
export async function generateMetadata() {
  const headersList = await headers();
  const host = headersList.get("host");
  const proto = headersList.get("x-forwarded-proto") || "http";

  const pageUrl = `${proto}://${host}/work-management`;

  const meta = await getMetaData("/work-management", pageUrl);

  return generateSEOMetadata({
    title: meta?.title || 'Work Management - Automate Your Work',
    description: meta?.description,
    keywords: meta?.keywords,
    canonical: '/work-management',
    noIndex: true, // old product page: reachable from the footer, not indexed (SEO, 18 Nov)
    type: meta?.type,
  });
}

const workManagementPage = async () => {
  const headersList = await headers();
  const host = headersList.get("host");
  const proto = headersList.get("x-forwarded-proto") || "http";
  const pageUrl = `${proto}://${host}/work-management`;
  const faqData = await getFaqData("/work-management", pageUrl);
  return (
    <div
      className="min-h-full w-full flex flex-col"
    >
      <Header />
      <div>
        <HeroWorkManagement />
        <div className="divider" />
        <SmarterWork />
        <div className="divider" />
        <BuildWorkflow />
        <div className="divider" />
        <AISecretWeapon />
        <div className="divider" />
        <CTASection />
        <div className="divider" />
        <FAQSection subHeading="Answers to common questions about 50agents and its features. If you have any other questions, please don't hesitate to contact us." faqs={faqData || []} />
        <LegacyPageGuide sections={WORK_MANAGEMENT_PAGE_GUIDE} />
      </div>
      <Footer />
    </div>
  );
};

export default workManagementPage;
