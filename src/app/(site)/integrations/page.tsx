// The directory of integrations, v3 round 2 (D254): laid out like viaSocket's own /integrations, in 50agents' look. A
// centred head, then one panel: the categories down the left (a select on a phone) and every app in viaSocket's catalog
// as a hairline grid, most used first, with one search and numbered pages. Every app is in the HTML; the pages only
// hide the rest, so the page never grows.
import type { Metadata } from 'next';
import { Crumbs, KINDS } from '@/site/parts';
import { StickyBar } from '@/site/sticky';
import { catalog } from '@/site/integrations/data';
import { BuildLink } from '@/site/integrations/build-link';
import { BASE, crumbsLd, DirectoryPanel, Final, LdScript } from '@/site/integrations/parts';
import '@/site/css/usecase.css';
import '@/site/css/integrations.css';

const TITLE = 'Every app 50agents works with';
const DESC = '50agents works with 2,300+ apps through viaSocket. Find yours by name or category, with its real triggers, actions and ready templates for Captain.';

export const metadata: Metadata = {
  title: { absolute: 'Integrations: the apps 50agents works with | 50agents' },
  description: DESC,
  alternates: { canonical: `${BASE}/integrations` },
  robots: { index: true, follow: true },
  openGraph: { title: TITLE, description: DESC, url: `${BASE}/integrations`, siteName: '50agents', type: 'website' },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESC },
};

const ASK = 'Tell me which of my apps you can work with, and what you would build first';

export default function IntegrationsIndex() {
  const { apps } = catalog(); // most used first

  return (
    <div className="page uc3 ig3" style={{ ['--k' as string]: KINDS.auto.tint }}>
      <LdScript data={crumbsLd([{ name: 'Home', path: '' }, { name: 'Integrations', path: '/integrations' }])} />
      <div className="wrap"><Crumbs trail={[{ label: 'Home', href: '/' }, { label: 'Integrations' }]} /></div>

      <section className="wrap uc3-hero ig3-hero ig3-dir-hero">
        <h1>{TITLE}</h1>
        <p className="answer">50agents works with 2,300+ apps through viaSocket. Find yours to see its triggers, actions and templates for Captain.</p>
        <div className="hero-cta ig3-dir-cta"><BuildLink page="integrations" place="hero" campaign="seo-index" ask={ASK} className="btn ghost">Not sure? Ask Captain</BuildLink></div>
      </section>

      <section className="wrap ig4-dir-sec" aria-label="All apps">
        <DirectoryPanel apps={apps} current="/integrations" head={<h2>All apps</h2>} label="Search apps, such as HubSpot or Notion" />
      </section>

      <Final h2="Not sure where to start?" p="Tell Captain which apps you use, and it says what it would build first. Free to start." ask={ASK} page="integrations" campaign="seo-index" button="Ask Captain" />

      <StickyBar><span>Every app 50agents works with</span><BuildLink page="integrations" place="sticky" campaign="seo-index" ask={ASK} className="btn">Ask Captain</BuildLink></StickyBar>
    </div>
  );
}
