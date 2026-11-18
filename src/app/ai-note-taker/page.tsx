import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { LegacyPageGuide } from '@/components/LegacyPageGuide';
import { AI_NOTE_TAKER_PAGE_GUIDE } from '@/lib/legacy-page-guides';
import HeroNoteTaker from './components/HeroNoteTaker';
import FAQSection from '@/components/FAQSection';
import { getFaqData } from '@/lib/fetchFAQs';
import { headers } from 'next/headers';
import StopTakingNotes from './components/StopTakingNotes';
import NoMoreManual from './components/NoMoreManual';
import PrivateAndSecure from './components/PrivateAndSecure';
import BuiltForTeams from './components/BuiltForTeams';
import ShowAppsMarquee from '@/components/ShowAppsMarquee';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { getMetaData } from '@/lib/meta';

export const runtime = 'edge';

// SEO Metadata for AI Note Taker page
export async function generateMetadata() {
  const headersList = await headers();
  const host = headersList.get("host");
  const proto = headersList.get("x-forwarded-proto") || "http";

  const pageUrl = `${proto}://${host}/ai-note-taker`;

  const meta = await getMetaData("/ai-note-taker", pageUrl);

  return generateSEOMetadata({
    title: meta?.title || 'AI Note Taker - Automate Your Meeting Notes',
    description: meta?.description,
    keywords: meta?.keywords,
    canonical: '/ai-note-taker',
    noIndex: true, // old product page: reachable from the footer, not indexed (SEO, 18 Nov)
    type: meta?.type,
  });
}

const aiNoteTakerPage = async () => {
  const headersList = await headers();
  const host = headersList.get("host");
  const proto = headersList.get("x-forwarded-proto") || "http";
  const pageUrl = `${proto}://${host}/ai-note-taker`;
  const faqData = await getFaqData("/ai-note-taker", pageUrl);
  return (
    <div
      className="min-h-full w-full flex flex-col"
    >
      <Header />
      <div>
        <HeroNoteTaker />
        <div className="divider" />
        <ShowAppsMarquee />
        <div className="divider" />
        <StopTakingNotes />
        <div className="divider" />
        <NoMoreManual />
        <div className="divider" />
        <BuiltForTeams />
        <div className="divider" />
        <PrivateAndSecure />
        <div className="divider" />
        <FAQSection subHeading="Answers to common questions about 50agents and its features. If you have any other questions, please don't hesitate to contact us." faqs={faqData || []} />
        <LegacyPageGuide sections={AI_NOTE_TAKER_PAGE_GUIDE} />
      </div>
      <Footer />
    </div>
  );
};

export default aiNoteTakerPage;
