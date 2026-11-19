// /pricing (Jii, 19 Nov: "then we add the pricing page"): the live plans from src/content/pages/pricing.ts.
import type { Metadata } from 'next';
import { Crumbs, Cta } from '@/site/parts';
import { PLANS, PRICING_FAQS, TOPUP, USES } from '@/content/pages/pricing';
import '@/site/css/pricing.css';

const BASE = 'https://50agents.com';
const url = `${BASE}/pricing`;
const fmt = (n: number) => n.toLocaleString('en-US');

export const metadata: Metadata = {
  title: '50agents pricing: free to start, plans from $19',
  description: 'Every workspace gets 2,000 free credits a month. Plans: Starter $19 for 20,000, Pro $49 for 55,000, Business $99 for 120,000. Top up at $1 per 1,000.',
  alternates: { canonical: url },
  robots: { index: true, follow: true },
  openGraph: { title: '50agents pricing', description: 'Free to start with 2,000 credits a month. Plans from $19.', url, siteName: '50agents', type: 'website' },
  twitter: { card: 'summary_large_image', title: '50agents pricing', description: 'Free to start with 2,000 credits a month. Plans from $19.' },
};

const ld = [
  { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
    { '@type': 'ListItem', position: 2, name: 'Pricing', item: url },
  ] },
  { '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: '50agents', applicationCategory: 'BusinessApplication', operatingSystem: 'Web', url: BASE,
    offers: PLANS.map(p => ({ '@type': 'Offer', name: p.name, price: String(p.price), priceCurrency: 'USD', description: `${fmt(p.credits)} credits a month` })) },
];

export default function PricingPage() {
  return (
    <div className="page pr">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <div className="wrap"><Crumbs trail={[{ label: 'Home', href: '/' }, { label: 'Pricing' }]} /></div>

      <section className="wrap pr-hero">
        <h1>Free to start. Pay for what you run.</h1>
        <p className="pr-lede">Every workspace gets 2,000 free credits a month. Pick a plan when your work grows.</p>
      </section>

      <section className="wrap pr-plans-wrap" aria-label="Plans">
        <div className="pr-plans">
          {PLANS.map(p => (
            <div key={p.id} className={p.id === 'pro' ? 'pr-plan on' : 'pr-plan'}>
              <h2>{p.name}</h2>
              <p className="pr-line">{p.line}</p>
              <p className="pr-price"><b>${p.price}</b><span>{p.price ? 'a month' : 'forever'}</span></p>
              <p className="pr-credits">{fmt(p.credits)} credits a month</p>
              <Cta campaign="seo-page" page="pricing" place={`plan-${p.id}`} ghost={p.id !== 'pro'}>{p.price ? `Start with ${p.name}` : 'Start free'}</Cta>
              <ul>{p.points.map(x => <li key={x}>{x}</li>)}</ul>
            </div>
          ))}
        </div>
        <div className="pr-topup">
          <div><b>Need more in a month?</b><span>Top up at ${TOPUP.price} per {fmt(TOPUP.per)} credits, any whole thousand from {fmt(TOPUP.min)}. Top-ups never expire.</span></div>
        </div>
      </section>

      <section className="wrap sec" id="credits">
        <div className="sec-h c"><h2>What uses credits</h2><p>You see every charge in Usage, by who and on what.</p></div>
        <div className="pr-uses">
          {USES.map(u => (
            <div key={u.what}><h3>{u.what}</h3><p>{u.how}</p><span>{u.example}</span></div>
          ))}
        </div>
      </section>

      <section className="wrap sec" id="questions">
        <div className="sec-h c"><h2>Questions about pricing</h2></div>
        <div className="qa pr-qa">
          {PRICING_FAQS.map((f, n) => (
            <details key={f.q} open={n === 0}>
              <summary><h3>{f.q}</h3><i aria-hidden="true" /></summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="wrap sec">
        <div className="final">
          <h2>Start with the free plan</h2>
          <p>One sentence to Captain. Free to start.</p>
          <Cta campaign="seo-page" page="pricing" place="final">Start free</Cta>
        </div>
      </section>
    </div>
  );
}
