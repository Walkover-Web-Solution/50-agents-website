// The A to Z of integrations (pages-brief B8): every app in viaSocket's catalog in the HTML, a search on the client,
// letters, and the 20 curated categories. Replaces the old app grid on /ai-agents.
import type { Metadata } from 'next';
import { Crumbs, Face, MaybeLink } from '@/site/parts';
import { CATEGORIES } from '@/content/integrations/categories';
import { FLAGSHIPS } from '@/content/integrations/flagships';
import { catalog, readDate } from '@/site/integrations/data';
import { BuildLink } from '@/site/integrations/build-link';
import { DirSearch } from '@/site/integrations/dir-search';
import { BASE, crumbsLd, LdScript, Logo } from '@/site/integrations/parts';
import '@/site/css/integrations.css';

const TITLE = 'Integrations: the apps 50agents works with, A to Z';
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

export default function IntegrationsIndex() {
  const { apps, read } = catalog();
  const sorted = [...apps].sort((a, b) => a.n.localeCompare(b.n, 'en', { sensitivity: 'base' }));
  const letters = new Map<string, typeof apps>();
  for (const a of sorted) (letters.get(letterOf(a.n)) ?? letters.set(letterOf(a.n), []).get(letterOf(a.n))!).push(a);
  const order = [...letters.keys()].sort((a, b) => (a === '#' ? -1 : b === '#' ? 1 : a.localeCompare(b)));
  const lead = Object.keys(FLAGSHIPS).map(s => catalog().by.get(s)!).filter(Boolean);
  const ask = 'Tell me which of my apps you can work with, and what you would build first';

  return (
    <div className="page ig">
      <LdScript data={crumbsLd([{ name: 'Home', path: '' }, { name: 'Integrations', path: '/integrations' }])} />
      <div className="wrap">
        <Crumbs trail={[{ label: 'Home', href: '/' }, { label: 'Integrations' }]} />
      </div>

      <section className="wrap" style={{ paddingTop: 36 }}>
        <div className="sec-head" style={{ maxWidth: 820 }}>
          <h1>The apps 50agents works with, A to Z</h1>
          <p className="answer" style={{ color: 'var(--ink)' }}>50agents works with 2,300+ apps through viaSocket, so Captain can build automations, AI agents and apps on the tools you already use. Find yours in viaSocket’s public catalog below to see its real triggers and actions, and the recipes you can build on it today.</p>
        </div>
      </section>

      <section className="wrap" aria-labelledby="start">
        <h2 id="start" className="ig-count" style={{ fontSize: 14, fontWeight: 600, letterSpacing: 0, marginBottom: 12 }}>Start with the most used</h2>
        <div className="ig-top">
          {lead.map(a => (
            <a key={a.s} href={`/integrations/${a.s}`} className="ig-tile">
              <Logo slug={a.s} size={32} /><b>{a.n}</b><span>{a.t} triggers · {a.a} actions</span>
            </a>
          ))}
          <MaybeLink href="/integrations/google-calendar" className="ig-tile"><Logo slug="google-calendar" size={32} /><b>Google Calendar</b><span>{catalog().by.get('google-calendar')?.t ?? 0} triggers · {catalog().by.get('google-calendar')?.a ?? 0} actions</span></MaybeLink>
          <MaybeLink href="/integrations/google-drive" className="ig-tile"><Logo slug="google-drive" size={32} /><b>Google Drive</b><span>{catalog().by.get('google-drive')?.t ?? 0} triggers · {catalog().by.get('google-drive')?.a ?? 0} actions</span></MaybeLink>
        </div>
      </section>

      <section className="wrap band" style={{ paddingTop: 56 }} aria-label="Categories">
        <h2 style={{ fontSize: 28 }}>Browse by category</h2>
        <nav className="ig-cats" style={{ marginTop: 14 }}>
          {CATEGORIES.map(c => <MaybeLink key={c.slug} href={`/integrations/category/${c.slug}`}>{c.name}</MaybeLink>)}
        </nav>
      </section>

      <section className="wrap band" style={{ paddingTop: 40 }} aria-label="All apps, A to Z">
        <div className="ig-dir-tools">
          <DirSearch />
          <nav className="ig-letters" aria-label="Letters">
            {order.map(l => <a key={l} href={`#letter-${l === '#' ? 'num' : l}`}>{l}</a>)}
          </nav>
        </div>
        {order.map(l => (
          <div key={l} className="ig-letter" id={`letter-${l === '#' ? 'num' : l}`} data-letter={l}>
            <h2>{l}</h2>
            <ul className="ig-grid">
              {letters.get(l)!.map(a => (
                <li key={a.s} data-app={`${a.n} ${a.s}`.toLowerCase()}>
                  <a href={`/integrations/${a.s}`} className="ig-tile"><Logo slug={a.s} size={24} /><b>{a.n}</b></a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <p className="src">Every app in viaSocket&rsquo;s public catalog list, read {readDate(read)}.</p>
      </section>

      <section className="wrap">
        <div className="final">
          <h2>Not sure where to start?</h2>
          <p>Tell Captain which apps you use, and it says what it would build first. Every workspace starts free with 2,000 credits.</p>
          <BuildLink page="integrations" place="final" campaign="seo-index" ask={ask}>Ask Captain</BuildLink>
          <span className="peek l" aria-hidden="true"><Face id="scout" size={52} /><Face id="keeper" size={44} /></span>
          <span className="peek r" aria-hidden="true"><Face id="writer" size={50} /><Face id="sorter" size={46} /></span>
        </div>
        <p className="byline">By the 50agents team · Last updated {readDate(read)} · From viaSocket&rsquo;s catalog, read {readDate(read)}. Also: <MaybeLink href="/use-cases">Use cases</MaybeLink> · <MaybeLink href="/automations">Automations</MaybeLink> · <MaybeLink href="/ai-agents">AI agents</MaybeLink></p>
      </section>

      <div className="sticky"><span>Every app, A to Z</span><BuildLink page="integrations" place="sticky" campaign="seo-index" ask={ask} className="btn">Ask Captain</BuildLink></div>
    </div>
  );
}
