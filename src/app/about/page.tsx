import LegitimacyPage from '@/components/LegitimacyPage';
import { generateMetadata as generateSEOMetadata, generateWebPageSchema } from '@/lib/seo';

export const runtime = 'edge';

export async function generateMetadata() {
  return generateSEOMetadata({
    title: 'About 50agents',
    description:
      '50agents is a product from viaSocket, built by Walkover Web Solutions. Tell Captain what you need and it builds AI agents, browser agents, automations and apps across 2,300+ apps.',
    canonical: '/about',
    noIndex: true,
  });
}

export default function AboutPage() {
  const jsonLd = generateWebPageSchema({
    name: 'About 50agents',
    description:
      'Who builds 50agents and how it connects to viaSocket and MSG91.',
    path: '/about',
  });

  return (
    <LegitimacyPage title="About 50agents" jsonLd={jsonLd}>
      <p>
        50agents is a product from <a href="https://viasocket.com">viaSocket</a>. You tell Captain,
        its AI, what you need in plain words, and it builds automations, AI agents, browser agents and
        apps that do the work in your real apps, across 2,300+ apps through viaSocket.
      </p>
      <p>
        This public website explains the product and connects visitors to the workspace app. The product
        itself runs at{' '}
        <a href="https://50agents-app.embarko.app/login">50agents-app.embarko.app</a>, not on this site.
      </p>
      <p>
        50agents is built by <a href="https://walkover.in">Walkover Web Solutions</a>, the team behind
        viaSocket and <a href="https://msg91.com">MSG91</a>. Walkover connects businesses to the apps they
        already use and to the channels their customers use every day.
      </p>
      <p>Every workspace starts free with 2,000 credits.</p>
    </LegitimacyPage>
  );
}