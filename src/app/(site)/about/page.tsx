// /about (pages-brief B11).
import type { Metadata } from 'next';
import { AboutPage } from '@/site/pages/trust';
import { pageMeta } from '@/site/hubs/meta';

export const metadata: Metadata = pageMeta({
  path: '/about',
  title: 'About 50agents: a product of viaSocket, by Walkover',
  description: '50agents is a product of viaSocket, made by Walkover: tell Captain what you need and it builds AI agents, automations and apps in 2,300+ apps.',
});

export default function Page() {
  return <AboutPage />;
}
