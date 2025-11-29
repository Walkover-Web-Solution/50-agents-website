import LandingPage from '@/components/LandingPage';
import { generateMetadata as generateSEOMetadata, generateWebsiteSchema, generateOrganizationSchema } from '@/lib/seo';

// SEO Metadata for Homepage
export const metadata = generateSEOMetadata({
  title: '50Agents | AI Agents for Every App - Perform Any Task with Natural Language',
  description:
    'Deploy AI agents that perform any task inside 5000+ apps just by typing a prompt. Automate workflows, manage tasks, and boost productivity with intelligent AI agents. No code required.',
  keywords:
    '50agents, ai agents, ai automation, ai task automation, ai workflow automation, intelligent agents, ai productivity tools, no code ai, ai assistant platform, ai agent deployment, task automation ai, ai powered productivity, automated workflows, ai business automation, smart ai agents, ai agent templates, ai integration platform, artificial intelligence agents, ai productivity suite, ai workflow management, ai task management, enterprise ai agents, ai automation platform, conversational ai agents, ai process automation, intelligent task automation, ai digital assistant, ai virtual assistant, business process automation ai, ai operational efficiency, automated ai tasks',
  canonical: '/',
  type: 'website',
});

const HomePage = () => {
  // Generate structured data
  const websiteSchema = generateWebsiteSchema();
  const organizationSchema = generateOrganizationSchema();

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
      <LandingPage />
    </>
  );
};

export default HomePage;
