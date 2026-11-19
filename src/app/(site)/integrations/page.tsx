// The A to Z of integrations, v3 (D253): a centred head, one search, the 20 categories as link cards, and every app in
// viaSocket's catalog as a calm logo grid, all in the HTML; the search only hides what doesn't match.
import type { Metadata } from 'next';
import { Crumbs, KINDS } from '@/site/parts';
import { StickyBar } from '@/site/sticky';
import { CATEGORIES } from '@/content/integrations/categories';
import { catalog } from '@/site/integrations/data';
import { BuildLink } from '@/site/integrations/build-link';
import { DirSearch } from '@/site/integrations/dir-search';
import { AppGrid, BASE, CategoryCards, crumbsLd, Final, LdScript } from '@/site/integrations/parts';
import '@/site/css/usecase.css';
import '@/site/css/integrations.css';

const TITLE = 'The apps 50agents works with, A to Z';
const DESC = '50agents works with 2,300+ apps through viaSocket. Find yours A to Z or by category, with its real triggers, actions and ready recipes for Captain.';

export const metadata: Metadata = {
  title: { absolute: 'Integrations: the apps 50agents works with | 50agents' },
  description: DESC,
  alternates: { canonical: `${BASE}/integrations` },
  robots: { index: true, follow: true },
  openGraph: { title: TITLE, description: DESC, url: `${BASE}/integrations`, siteName: '50agents', type: 'website' },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESC },
};

const letterOf = (n: string) => (/^[a-z]/i.test(n) ? n[0].toUpperCase() : '#');
const ASK = 'Tell me which of my apps you can work with, and what you would build first';

export default function IntegrationsIndex() {
  const { apps, read } = catalog();
  const sorted = [...apps].sort((a, b) => a.n.localeCompare(b.n, 'en', { sensitivity: 'base' }));
  const letters = new Map<string, typeof apps>();
  for (const a of sorted) (letters.get(letterOf(a.n)) ?? letters.set(letterOf(a.n), []).get(letterOf(a.n))!).push(a);
  const order = [...letters.keys()].sort((a, b) => (a === '#' ? -1 : b === '#' ? 1 : a.localeCompare(b)));

  return (
    <div className="page uc3 ig3" style={{ ['--k' as string]: KINDS.auto.tint }}>
      <LdScript data={crumbsLd([{ name: 'Home', path: '' }, { name: 'Integrations', path: '/integrations' }])} />
      <div className="wrap"><Crumbs trail={[{ label: 'Home', href: '/' }, { label: 'Integrations' }]} /></div>

      <section className="wrap uc3-hero ig3-hero ig3-dir-hero">
        <h1>{TITLE}</h1>
        <p className="answer">50agents works with 2,300+ apps through viaSocket, so Captain can build automations, AI agents and apps on the tools you already use. Find yours to see its real triggers and actions, and the recipes you can build on it.</p>
        <div className="ig3-search"><DirSearch label="Search apps, such as HubSpot or Notion" /></div>
        <div className="hero-cta ig3-dir-cta"><BuildLink page="integrations" place="hero" campaign="seo-index" ask={ASK} className="btn ghost">Not sure? Ask Captain</BuildLink></div>
      </section>

      <section className="wrap sec" id="categories" data-hide-on-search>
        <div className="sec-h c"><h2>Browse by category</h2><p>Twenty groups, from CRM to phone and SMS. Each lists its apps, most used first.</p></div>
        <CategoryCards cats={CATEGORIES} />
      </section>

      <section className="wrap sec ig3-az" id="a-to-z" aria-label="All apps, A to Z">
        <div className="sec-h c"><h2>Every app, A to Z</h2></div>
        <nav className="ig3-letters" aria-label="Letters">
          {order.map(l => <a key={l} href={`#letter-${l === '#' ? 'num' : l}`}>{l}</a>)}
        </nav>
        {order.map(l => (
          <div key={l} className="ig3-letter" id={`letter-${l === '#' ? 'num' : l}`} data-letter={l}>
            <h3 className="ig3-letter-h"><span>{l}</span></h3>
            <AppGrid apps={letters.get(l)!} />
          </div>
        ))}
      </section>

      <Final h2="Not sure where to start?" p="Tell Captain which apps you use, and it says what it would build first. Free to start." ask={ASK} page="integrations" campaign="seo-index" updated={read} button="Ask Captain" />

      <StickyBar><span>Every app, A to Z</span><BuildLink page="integrations" place="sticky" campaign="seo-index" ask={ASK} className="btn">Ask Captain</BuildLink></StickyBar>
    </div>
  );
}
