// The search pages' layout (pages-brief D1): server-rendered, the homepage's look, no Redux, MUI or old styles.
import localFont from 'next/font/local';
import orgLd from '@/content/site/organization-ld.json';
import { Footer, Header } from '@/site/chrome';
import '@/site/site.css';

// Schibsted Grotesk, committed (src/site/fonts, OFL) so the build fetches nothing: Google's latin subset of the variable font.
const font = localFont({ src: '../../site/fonts/schibsted-grotesk-latin.woff2', weight: '400 800', style: 'normal', display: 'swap', variable: '--font' });

const ORG = {
  '@context': 'https://schema.org',
  ...orgLd,
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
