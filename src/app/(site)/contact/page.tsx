// /contact (pages-brief B11, D255). noindex until the contact email is confirmed (a question for Jii).
import type { Metadata } from 'next';
import { ContactPage } from '@/site/pages/trust';
import { CONTACT_EMAIL } from '@/content/pages/support';
import { pageMeta } from '@/site/hubs/meta';

export const metadata: Metadata = pageMeta({
  path: '/contact',
  title: 'Contact the 50agents team | 50agents',
  description: 'How to reach the team behind 50agents, a product of viaSocket by Walkover: support, the Help Center, privacy, careers and viaSocket.',
  index: CONTACT_EMAIL !== null,
});

export default function Page() {
  return <ContactPage />;
}
