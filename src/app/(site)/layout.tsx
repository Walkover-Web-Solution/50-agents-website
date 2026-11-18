// The search pages' layout (pages-brief D1): server-rendered, the homepage's look, no Redux, MUI or old styles.
import { Schibsted_Grotesk } from 'next/font/google';
import { Footer, Header } from '@/site/chrome';
import '@/site/site.css';

const font = Schibsted_Grotesk({ subsets: ['latin'], weight: ['400', '500', '600', '800'], display: 'swap', variable: '--font' });

const ORG = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: '50agents',
  url: 'https://50agents.com',
  logo: 'https://50agents.com/landing/favicon.svg',
  parentOrganization: { '@type': 'Organization', name: 'Walkover', url: 'https://walkover.in' },
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`site ${font.variable}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG) }} />
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
