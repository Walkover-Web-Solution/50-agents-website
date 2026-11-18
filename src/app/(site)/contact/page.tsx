// /contact (pages-brief B11). noindex until the contact email is confirmed (a question for Jii).
import type { Metadata } from 'next';
import { ContactPage, CONTACT_EMAIL } from '@/site/pages/trust';
import { pageMeta } from '@/site/hubs/meta';

export const metadata: Metadata = pageMeta({
  path: '/contact',
  title: 'Contact the 50agents team | 50agents',
  description: 'How to reach the team behind 50agents, a product of viaSocket by Walkover: email, the Help Center for how-to questions, privacy and careers.',
  index: CONTACT_EMAIL !== null,
});

export default function Page() {
  return <ContactPage />;
}
