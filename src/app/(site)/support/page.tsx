// /support (D255, round 3): viaSocket's support page carried over to 50agents (src/content/pages/support.ts).
// noindex and out of the sitemap while any channel is a placeholder for Jii.
import type { Metadata } from 'next';
import { SupportPage } from '@/site/pages/trust';
import { SUPPORT_OPEN } from '@/content/pages/support';
import { pageMeta } from '@/site/hubs/meta';

export const metadata: Metadata = pageMeta({
  path: '/support',
  title: '50agents support: Help Center and the team | 50agents',
  description: 'Get help with 50agents: guides and answers in the Help Center, the Privacy Policy, and the ways to reach the team behind 50agents.',
  index: SUPPORT_OPEN.length === 0,
});

export default function Page() {
  return <SupportPage />;
}
