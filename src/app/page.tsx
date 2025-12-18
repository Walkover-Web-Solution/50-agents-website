import LandingPage from '@/components/LandingPage';
import { generateMetadata as generateSEOMetadata, generateWebsiteSchema, generateOrganizationSchema } from '@/lib/seo';
import { headers } from 'next/headers';
import { getMetaData } from '@/lib/meta';
import { getFaqData } from '@/lib/fetchFAQs';
import { sendErrorMessage } from '@/lib/utils';

export const runtime = 'edge';

// SEO Metadata for Homepage
export async function generateMetadata() {
  const headersList = await headers();
  const host = headersList.get("host");
  const proto = headersList.get("x-forwarded-proto") || "http";

  const pageUrl = `${proto}://${host}/`;

  const meta = await getMetaData("/", pageUrl);

  return generateSEOMetadata({
    title: meta?.title || '50Agents',
    description: meta?.description,
    keywords: meta?.keywords,
    canonical: meta?.name,
    type: meta?.type,
  });
}

const HomePage = async () => {
  // Generate structured data
  const websiteSchema = generateWebsiteSchema();
  const organizationSchema = generateOrganizationSchema();

  const headersList = await headers();
  const host = headersList.get("host");
  const proto = headersList.get("x-forwarded-proto") || "http";
  const pageUrl = `${proto}://${host}/`;
  const faqData = await getFaqData("/", pageUrl);
  
  // Fetch prompt data from API route
  let promptData = null;
  try {
    const promptResponse = await fetch(`${pageUrl}api/prompts`, {
      next: { revalidate: 60 * 20 } // Cache for 20 minutes
    });
    if (promptResponse.ok) {
      promptData = await promptResponse.json();
    } else {
      throw new Error(`API responded with status: ${promptResponse.status}`);
    }
  } catch (error: any) {
    console.error('Failed to fetch prompt data:', error);
    sendErrorMessage({ 
      error, 
      pageUrl, 
      source: `${pageUrl}api/prompts` 
    });
  }

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <LandingPage faqData={faqData} promptData={promptData} />
    </>
  );
};

export default HomePage;
