import LegitimacyPage from '@/components/LegitimacyPage';
import { generateContactPageSchema, generateMetadata as generateSEOMetadata } from '@/lib/seo';

export const runtime = 'edge';

export async function generateMetadata() {
  return generateSEOMetadata({
    title: 'Contact',
    description: 'Reach the Walkover team behind 50agents: book a call or use the Help Center.',
    canonical: '/contact',
    noIndex: true,
  });
}

export default function ContactPage() {
  const jsonLd = generateContactPageSchema();

  return (
    <LegitimacyPage title="Contact" jsonLd={jsonLd}>
      <p>
        50agents is built and supported by Walkover Web Solutions. If you have questions about the
        product, pricing or your workspace, we are happy to help.
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Book a call:</strong>{' '}
          <a href="https://cal.id/pushpendra">Schedule time with the team</a>
        </li>
        <li>
          <strong>Company:</strong>{' '}
          <a href="https://walkover.in">Walkover Web Solutions</a>
        </li>
        <li>
          <strong>Help center:</strong>{' '}
          <a href="https://50agents.com/help">50agents.com/help</a>
        </li>
      </ul>
      <p>
        For account access, use{' '}
        <a href="https://50agents-app.embarko.app/login">sign up or sign in</a> in the app.
      </p>
    </LegitimacyPage>
  );
}