import LandingPage from '@/components/LandingPage';
import { generateMetadata as generateSEOMetadata, generateWebsiteSchema, generateOrganizationSchema } from '@/lib/seo';
import { headers } from 'next/headers';
import { getMetaData } from '@/lib/meta';
import { getFaqData } from '@/lib/fetchFAQs';

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
      <LandingPage faqData={faqData} />
    </>
  );
};

export default HomePage;
