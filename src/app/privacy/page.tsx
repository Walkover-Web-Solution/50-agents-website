import LegitimacyPage from '@/components/LegitimacyPage';
import { generateMetadata as generateSEOMetadata, generateWebPageSchema } from '@/lib/seo';

export const runtime = 'edge';

export async function generateMetadata() {
  return generateSEOMetadata({
    title: 'Privacy',
    description:
      'How 50agents and Walkover handle data on this website and in the product workspace.',
    canonical: '/privacy',
    noIndex: true,
  });
}

export default function PrivacyPage() {
  const jsonLd = generateWebPageSchema({
    name: 'Privacy at 50agents',
    description: 'Privacy overview for the 50agents website and workspace.',
    path: '/privacy',
  });

  return (
    <LegitimacyPage title="Privacy" jsonLd={jsonLd}>
      <p>
        This page summarizes how we handle information for 50agents. The full policy with legal
        details lives in our{' '}
        <a href="https://50agents.com/help/privacy-policy">Help Center privacy policy</a>.
      </p>
      <h2 className="text-xl font-semibold mt-4">What this website collects</h2>
      <p>
        The public site at 50agents.com may use standard web analytics and attribution parameters on
        links to the workspace app so we understand how visitors find 50agents. We do not run AI
        agents or store your business data on this website.
      </p>
      <h2 className="text-xl font-semibold mt-4">What the product stores</h2>
      <p>
        When you use the 50agents workspace app, your automations, connected apps and workspace
        content are stored to run the product you configure. You control what tools you connect and
        what each AI agent is allowed to do.
      </p>
      <h2 className="text-xl font-semibold mt-4">Who operates 50agents</h2>
      <p>
        50agents is operated by Walkover Web Solutions, builder of viaSocket and MSG91. Questions
        about privacy: use <a href="/contact">our contact page</a> or the{' '}
        <a href="https://50agents.com/help">Help Center</a>.
      </p>
      <p>
        <em>Last updated: 18 November 2026.</em>
      </p>
    </LegitimacyPage>
  );
}