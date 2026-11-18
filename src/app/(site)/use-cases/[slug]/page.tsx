// A use case page (pages-brief B1): static HTML from its content file, answer first, the product shown working.
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { USE_CASES } from '@/content/use-cases';
import { AppLogo, Crumbs, Cta, Face, KindBadge, KINDS, MaybeLink } from '@/site/parts';
import { CopyAsk } from '@/site/copy';
import { StickyBar } from '@/site/sticky';
import { CaptainBuild } from '@/site/product/captain';
import { ProductView } from '@/site/product/view';
import '@/site/css/use-cases.css';

const BASE = 'https://50agents.com';
export const dynamicParams = false;
export function generateStaticParams() {
  return USE_CASES.map(u => ({ slug: u.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const u = USE_CASES.find(x => x.slug === slug);
  if (!u) return {};
  const url = `${BASE}/use-cases/${u.slug}`;
  return {
    title: u.title,
    description: u.description,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: { title: u.h1, description: u.description, url, siteName: '50agents', type: 'website' },
    twitter: { card: 'summary_large_image', title: u.h1, description: u.description },
  };
}

const longDate = (iso: string) => new Date(iso + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

export default async function UseCasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const u = USE_CASES.find(x => x.slug === slug);
  if (!u) notFound();
  const k = KINDS[u.kind];
  const url = `${BASE}/use-cases/${u.slug}`;
  const ld = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'Use cases', item: `${BASE}/use-cases` },
        { '@type': 'ListItem', position: 3, name: u.h1, item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: `50agents: ${u.h1}`,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      url,
      description: u.answer.join(' '),
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', description: 'Every workspace starts free with 2,000 credits.' },
      publisher: { '@type': 'Organization', name: '50agents', url: BASE },
      dateModified: u.updated,
    },
  ];

  return (
    <div className="page" style={{ ['--k' as string]: k.tint }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <div className="wrap">
        <Crumbs trail={[{ label: 'Home', href: '/' }, { label: 'Use cases', href: '/use-cases' }, { label: u.h1 }]} />
      </div>

      {/* Hero: the job, the answer in two sentences, one button. Captain building it beside. */}
      <section className="wrap hero2">
        <div>
          <KindBadge kind={u.kind} />
          <h1>{u.h1}</h1>
          <p className="answer">{u.answer[0]} {u.answer[1]}</p>
          <div className="hero-cta">
            <Cta page={u.slug} place="hero" ask={u.ask} />
            <span className="hero-note">Free to start with 2,000 credits</span>
          </div>
        </div>
        <div className="hero-side">
          <CaptainBuild ask={u.ask} plan={u.plan} />
        </div>
      </section>

      {/* The real thing, large, on the kind's tint; the sourced facts as plain sentences under it */}
      <section className="wrap sec" id="see-it">
        <div className="sec-h">
          <h2>{u.seeIt.h2}</h2>
          <p>{u.seeIt.intro}</p>
        </div>
        <div className="stage">
          <ProductView view={u.view} />
          {u.facts.length > 0 && (
            <div className="stage-cap" aria-label={u.factsLabel}>
              {u.facts.map(f => (
                <p key={f.figure}><b>{f.figure}</b> {f.text}<a href={f.href} target="_blank" rel="noopener">{f.source}, read {f.read}</a></p>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How it works: the run, step by step */}
      <section className="wrap sec split" id="how">
        <div className="split-h">
          <h2>{u.howH2}</h2>
          <p>{u.promises.join('. ')}.</p>
        </div>
        <ol className="rows">
          {u.steps.map((st, n) => (
            <li key={st.title}><span className="n">{n + 1}</span><div><h3>{st.title}</h3><p>{st.body}</p></div></li>
          ))}
        </ol>
      </section>

      {/* What it works with, and what asks you first */}
      <section className="wrap sec split" id="uses">
        <div className="split-h">
          <h2>What it works with</h2>
          <p>{u.usesNote}</p>
        </div>
        <ul className="rows">
          {u.uses.map(x => (
            <li key={x.name}>
              <span className="logo-cell"><AppLogo app={x.app} icon={x.icon} size={24} /></span>
              <div><h3>{x.name}</h3><p>{x.why}</p>{x.chips.length > 0 && <p className="meta">{x.chips.join(' · ')}</p>}</div>
            </li>
          ))}
          <li className="hl"><span className="n" aria-hidden="true"><Face id="lead" size={26} /></span><div><h3>What asks you first</h3><p>{u.asksFirst}</p></div></li>
        </ul>
      </section>

      {/* The schedule or table people ask about, sourced */}
      {u.table && (
        <section className="wrap sec split" id="schedule">
          <div className="split-h">
            <h2>{u.table.h2}</h2>
            <p>{u.table.intro}</p>
          </div>
          <div>
          <div className="tbl2" role="table" aria-label={u.table.label}>
            {u.table.rows.map(r => (
              <div key={r.when} className={r.ask ? '' : 'on'} role="row">
                <b role="cell">{r.when}</b>
                <span role="cell">{r.tone}<em>{r.ask ? <>Ask: &ldquo;{r.ask}&rdquo;</> : (u.table!.done ?? 'Built in')}</em></span>
              </div>
            ))}
          </div>
          <p className="sec-src">{u.table.note} Sources: {u.table.sources.map((x, i) => <span key={x.href}>{i ? ', ' : ''}<a href={x.href} target="_blank" rel="noopener">{x.label}</a></span>)}, read 19 Nov 2026.</p>
          </div>
        </section>
      )}

      {/* Make it yours: asks to copy */}
      <section className="wrap sec split" id="yours">
        <div className="split-h">
          <h2>Make it yours</h2>
          <p>{u.yoursIntro}</p>
          <Cta page={u.slug} place="inline" ask={u.ask} />
        </div>
        <div className="asks-rows">
          {u.variations.map(v => <CopyAsk key={v} text={v} />)}
        </div>
      </section>

      {/* Other ways, honestly, and what it doesn't do yet */}
      <section className="wrap sec split" id="other-ways">
        <div className="split-h">
          <h2>{u.otherWaysH2}</h2>
        </div>
        <div>
          <ul className="rows plain">
            {u.otherWays.map(w => (
              <li key={w.title}><div><h3>{w.title}</h3><p>{w.body}</p>{w.sources && <p className="sec-src">{w.sources.map((x, i) => <span key={x.href}>{i ? ' · ' : ''}<a href={x.href} target="_blank" rel="noopener">{x.label}</a></span>)} · read 19 Nov 2026</p>}</div></li>
            ))}
            <li className="hl grey"><div><h3>What it doesn&rsquo;t do yet</h3>{u.limits.map(l => <p key={l}>{l}</p>)}</div></li>
          </ul>
        </div>
      </section>

      {/* Questions */}
      <section className="wrap sec split" id="questions">
        <div className="split-h">
          <h2>Questions people ask</h2>
        </div>
        <div className="qa">
          {u.faqs.map((f, n) => (
            <details key={f.q} open={n === 0}>
              <summary><h3>{f.q}</h3><i aria-hidden="true" /></summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Related: across to siblings, up to the hub */}
      <section className="wrap sec" id="related">
        <div className="sec-h"><h2>Related</h2></div>
        <div className="cards3">
          {u.related.map(r => (
            <MaybeLink key={r.href} href={r.href}>
              <span className="k"><Face id={KINDS[r.kind].face} size={20} />{KINDS[r.kind].label}</span>
              <b>{r.title}</b>
              <span>{r.line}</span>
            </MaybeLink>
          ))}
        </div>
        <p className="also">Also: {u.up.map((l, i) => <span key={l.href}>{i ? ' · ' : ''}<MaybeLink href={l.href}>{l.label}</MaybeLink></span>)}</p>
      </section>

      {/* Final CTA, with the crew peeking */}
      <section className="wrap sec">
        <div className="final">
          <h2>{u.finalH2}</h2>
          <p>Tell Captain &ldquo;{u.ask}&rdquo;. Every workspace starts free with 2,000 credits.</p>
          <Cta page={u.slug} place="final" ask={u.ask} />
          <span className="peek l" aria-hidden="true"><Face id="closer" size={52} /><Face id="keeper" size={44} /></span>
          <span className="peek r" aria-hidden="true"><Face id="lead" size={50} /><Face id="sorter" size={46} /></span>
        </div>
        <p className="byline">By the 50agents team · Last updated {longDate(u.updated)} · {u.byline}</p>
      </section>

      <StickyBar><span>{u.h1}</span><Cta page={u.slug} place="sticky" ask={u.ask}>Build it</Cta></StickyBar>
    </div>
  );
}
