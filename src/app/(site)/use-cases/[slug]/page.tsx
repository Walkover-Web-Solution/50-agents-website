// A use case page (pages-brief B1): static HTML from its content file, answer first, the product shown working.
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { USE_CASES } from '@/content/use-cases';
import { AppLogo, Crumbs, Cta, Face, KindBadge, KINDS, MaybeLink } from '@/site/parts';
import { CopyAsk } from '@/site/copy';
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

const COUNT = ['no', 'one', 'two', 'three', 'four', 'five', 'six'];
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

      {/* 1. Hero: the job, the answer in two sentences, the button; Captain building it beside */}
      <section className="wrap hero">
        <div className="hero-copy">
          <KindBadge kind={u.kind} />
          <h1>{u.h1}</h1>
          <p className="answer">{u.answer[0]} {u.answer[1]}</p>
          <div className="hero-cta">
            <Cta page={u.slug} place="hero" ask={u.ask} />
            <span className="hero-note">Free to start with 2,000 credits</span>
          </div>
          <ul className="promises">
            {u.promises.map(p => <li key={p}><Check />{p}</li>)}
          </ul>
        </div>
        <div className="hero-side">
          <CaptainBuild ask={u.ask} q={u.heroQuestion !== undefined ? u.questions?.[u.heroQuestion] : undefined} plan={u.plan} />
        </div>
      </section>

      {/* Why it matters: two sourced numbers */}
      <section className={u.facts.length === 1 ? 'wrap facts uc-one' : 'wrap facts'} aria-label={u.factsLabel}>
        {u.facts.map(f => (
          <p key={f.figure} className="fact">
            <b>{f.figure}</b> <span>{f.text}</span>
            <a href={f.href} target="_blank" rel="noopener">{f.source}, read {f.read}</a>
          </p>
        ))}
      </section>

      {/* 3. The real thing: the app it builds, working */}
      <section className="wrap band" id="see-it">
        <div className="sec-head">
          <h2>{u.seeIt.h2}</h2>
          <p>{u.seeIt.intro}</p>
        </div>
        <ProductView view={u.view} />
      </section>

      {/* 2. What it does, step by step */}
      <section className="wrap band" id="how">
        <div className="sec-head">
          <h2>{u.howH2}</h2>
        </div>
        <ol className="steps">
          {u.steps.map(s => (
            <li key={s.title}><h3>{s.title}</h3><p>{s.body}</p></li>
          ))}
        </ol>
        {u.questions && (
          <div className="qs">
            <p className="qs-h"><Face id="lead" size={22} /> The {COUNT[u.questions.length]} questions Captain asks first</p>
            <div className={`qs-grid n${u.questions.length}`}>
              {u.questions.map(q => (
                <div key={q.q}><p>{q.q}</p><div>{q.choices.map(c => <span key={c}>{c}</span>)}</div></div>
              ))}
            </div>
          </div>
        )}
        {u.planParts && (
          <div className="qs">
            <p className="qs-h"><Face id="lead" size={22} /> What Captain&rsquo;s plan shows before you tap Build it</p>
            <div className={`qs-grid uc-parts n${u.planParts.length}`}>
              {u.planParts.map(x => (
                <div key={x.title}><p>{x.title}</p><span className="uc-part">{x.body}</span></div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* 4 and 5. What it uses, what asks you first */}
      <section className="wrap band split" id="uses">
        <div>
          <h2>What it uses</h2>
          <div className="uses">
            {u.uses.map(x => (
              <div key={x.name} className="use">
                <span className="use-logo"><AppLogo app={x.app} icon={x.icon} size={26} /></span>
                <div>
                  <h3>{x.name}</h3>
                  <p>{x.why}</p>
                  <p className="chips">{x.chips.map(c => <span key={c}>{c}</span>)}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="src">{u.usesNote}</p>
        </div>
        <div className="asks">
          <h2>What asks you first</h2>
          <p>{u.asksFirst}</p>
        </div>
      </section>

      {/* The schedule people ask about, sourced */}
      {u.table && (
        <section className="wrap band" id="schedule">
          <div className="sec-head">
            <h2>{u.table.h2}</h2>
            <p>{u.table.intro}</p>
          </div>
          <div className="cadence" role="table" aria-label={u.table.label}>
            <div className="cad-row cad-h" role="row">{u.table.cols.map(c => <span key={c} role="columnheader">{c}</span>)}</div>
            {u.table.rows.map(r => (
              <div key={r.when} className={`cad-row${r.ask ? '' : ' cad-on'}`} role="row">
                <span role="cell"><b>{r.when}</b></span>
                <span role="cell">{r.tone}</span>
                <span role="cell">{r.ask ? <CopyAsk text={r.ask} small /> : <em>{u.table!.done ?? 'Built in'}</em>}</span>
              </div>
            ))}
          </div>
          <p className="src">{u.table.note} Sources: {u.table.sources.map((s, i) => <span key={s.href}>{i ? ', ' : ''}<a href={s.href} target="_blank" rel="noopener">{s.label}</a></span>)}, read 19 Nov 2026.</p>
        </section>
      )}

      {/* 6. Make it yours */}
      <section className="wrap band" id="yours">
        <div className="sec-head">
          <h2>Make it yours</h2>
          <p>{u.yoursIntro}</p>
        </div>
        <div className="asks-list">
          {u.variations.map(v => <CopyAsk key={v} text={v} />)}
        </div>
        <div className="inline-cta"><Cta page={u.slug} place="inline" ask={u.ask} /></div>
      </section>

      {/* 7. By hand or with another tool */}
      <section className="wrap band" id="other-ways">
        <div className="sec-head"><h2>{u.otherWaysH2}</h2></div>
        <div className="ways">
          {u.otherWays.map(w => (
            <div key={w.title} className="way">
              <h3>{w.title}</h3>
              <p>{w.body}</p>
              {w.sources && <p className="src">{w.sources.map((s, i) => <span key={s.href}>{i ? ' · ' : ''}<a href={s.href} target="_blank" rel="noopener">{s.label}</a></span>)} · read 19 Nov 2026</p>}
            </div>
          ))}
        </div>
      </section>

      {/* Limits today: what it does not do, said plainly */}
      <section className="wrap band" id="limits">
        <div className="limits">
          <h2>Limits today</h2>
          <ul>{u.limits.map(l => <li key={l}>{l}</li>)}</ul>
        </div>
      </section>

      {/* 8. Questions */}
      <section className="wrap band narrow" id="questions">
        <h2>Questions people ask</h2>
        <div className="faqs">
          {u.faqs.map(f => (
            <details key={f.q} open>
              <summary><h3>{f.q}</h3></summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* 9. Related: up to the hub, across to siblings */}
      <section className="wrap band" id="related">
        <h2>Related</h2>
        <div className="related">
          {u.related.map(r => (
            <MaybeLink key={r.href} href={r.href} className="rel">
              <span className="rel-k"><Face id={KINDS[r.kind].face} size={18} />{KINDS[r.kind].label}</span>
              <b>{r.title}</b>
              <span>{r.line}</span>
            </MaybeLink>
          ))}
        </div>
        <p className="also">Also: {u.up.map((l, i) => <span key={l.href}>{i ? ' · ' : ''}<MaybeLink href={l.href}>{l.label}</MaybeLink></span>)}</p>
      </section>

      {/* Final CTA, with the crew peeking */}
      <section className="wrap">
        <div className="final">
          <h2>{u.finalH2}</h2>
          <p>Tell Captain &ldquo;{u.ask}&rdquo;. Every workspace starts free with 2,000 credits.</p>
          <Cta page={u.slug} place="final" ask={u.ask} />
          <span className="peek l" aria-hidden="true"><Face id="closer" size={52} /><Face id="keeper" size={44} /></span>
          <span className="peek r" aria-hidden="true"><Face id="lead" size={50} /><Face id="sorter" size={46} /></span>
        </div>
        <p className="byline">By the 50agents team · Last updated {longDate(u.updated)} · {u.byline}</p>
      </section>

      <div className="sticky"><span>{u.h1}</span><Cta page={u.slug} place="sticky" ask={u.ask}>Build it</Cta></div>
    </div>
  );
}

function Check() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>;
}
