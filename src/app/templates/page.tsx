import AgentPageSummary from '@/components/AgentPageSummary';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
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
      <div className="flex-1">
        <AgentPageSummary
          heading="Agent templates"
          paragraphs={[
            'Browse ready-made AI agent templates you can launch in a 50agents workspace. Templates cover sales follow-ups, support triage, reporting, and common cross-app workflows.',
            'Each template describes what the agent does, which apps it connects to, and how to customize it with Captain. Use the grid below to explore categories and start from a proven pattern.',
          ]}
        />
        <TemplateGrid />
      </div>
      <Footer />
    </div>
  );
}

export default TemplatesPage;
