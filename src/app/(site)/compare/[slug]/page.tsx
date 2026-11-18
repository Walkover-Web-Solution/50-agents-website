// A comparison page (pages-brief B4): 12 alternatives pages and 8 versus pages, static HTML from their content files.
// Answer first, every competitor fact linked and dated from src/content/compare/facts.ts, a sticky contents list on desktop.
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { COMPARE } from '@/content/compare';
import { CHECKED, CHECKED_ISO, TOOLS } from '@/content/compare/facts';
import type { AltPage, VsPage } from '@/content/compare/types';
import { AltCard, MarkIcon, Sources, Toc, VsTable } from '@/site/compare/parts';
import { Crumbs, Cta, Face, MaybeLink } from '@/site/parts';
import '@/site/css/compare.css';

const BASE = 'https://50agents.com';
export const dynamicParams = false;
export function generateStaticParams() {
  return COMPARE.map(p => ({ slug: p.slug }));
}

const find = (slug: string) => COMPARE.find(p => p.slug === slug);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = find(slug);
  if (!p) return {};
  const url = `${BASE}/compare/${p.slug}`;
  return {
    title: { absolute: p.title },
    description: p.description,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: { title: p.h1, description: p.description, url, siteName: '50agents', type: 'article' },
    twitter: { card: 'summary_large_image', title: p.h1, description: p.description },
  };
}

const longDate = (iso: string) => new Date(iso + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

export default async function ComparePageView({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = find(slug);
  if (!p) notFound();
  const url = `${BASE}/compare/${p.slug}`;
  const ld = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'Compare', item: `${BASE}/compare` },
        { '@type': 'ListItem', position: 3, name: p.h1, item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: p.h1,
      description: p.description,
      mainEntityOfPage: url,
      author: { '@type': 'Organization', name: '50agents', url: BASE },
      publisher: { '@type': 'Organization', name: '50agents', url: BASE },
      datePublished: p.published,
      dateModified: p.updated,
    },
  ];
  const toc = p.type === 'alternatives'
    ? [
        ...(p.notice ? [{ id: 'notice', label: p.notice.h }] : []),
        { id: 'why', label: p.why.h }, { id: 'picks', label: 'Quick picks' }, { id: 'alternatives', label: 'The alternatives' },
        { id: 'stay', label: p.stay.h }, { id: 'move', label: 'How to move over' }, { id: 'questions', label: 'Questions' }, { id: 'sources', label: 'Sources' },
      ]
    : [
        { id: 'table', label: 'Side by side' }, { id: 'verdict', label: 'What the table means' }, { id: 'pick', label: 'Who should pick which' },
        { id: 'move', label: 'How to move over' }, { id: 'questions', label: 'Questions' }, { id: 'sources', label: 'Sources' },
      ];
  const tools = p.type === 'alternatives' ? p.entries.map(e => e.tool) : (['fifty', p.tool] as const).slice();

  return (
    <div className="page cmp" style={{ ['--k' as string]: '#EEF0F3' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <div className="wrap">
        <Crumbs trail={[{ label: 'Home', href: '/' }, { label: 'Compare', href: '/compare' }, { label: p.h1 }]} />
      </div>

      <section className="wrap cmp-hero">
        <p className="cmp-checked"><Check /> Facts checked on {CHECKED}</p>
        <h1>{p.h1}</h1>
        <div className="cmp-short" id="answer">
          <p className="cmp-short-h">The short answer</p>
          <p>{p.answer[0]}</p>
          <p>{p.answer[1]}</p>
        </div>
        <p className="cmp-by">By the 50agents team · Last updated {longDate(p.updated)} · We make 50agents, so we list its limits the same way as everyone else&rsquo;s.</p>
        <div className="hero-cta"><Cta campaign="seo-compare" page={p.slug} place="hero">Try 50agents free</Cta><span className="hero-note">Every workspace starts free with 2,000 credits</span></div>
      </section>

      <div className="wrap cmp-grid">
        <aside className="cmp-side"><Toc items={toc} /><div className="cmp-side-cta"><Cta campaign="seo-compare" page={p.slug} place="inline">Try 50agents free</Cta><span>2,000 credits to start</span></div></aside>
        <article className="cmp-body">
          {p.type === 'alternatives' ? <Alternatives p={p} /> : <Versus p={p} />}

          <section id="move" className="cmp-sec">
            <h2>How to move over</h2>
            <ol className="cmp-steps">
              {p.move.map(m => <li key={m.title}><h3>{m.title}</h3><p>{m.body}</p></li>)}
            </ol>
          </section>

          <section id="questions" className="cmp-sec">
            <h2>Questions people ask</h2>
            <div className="faqs">
              {p.faqs.map(f => (
                <details key={f.q} open>
                  <summary><h3>{f.q}</h3></summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          <section id="sources" className="cmp-sec">
            <h2>Sources</h2>
            <p className="cmp-lede">Every fact about another tool on this page was read on that tool&rsquo;s own site on {CHECKED}. Facts about 50agents are from the live app on the same day. We re-check them every 90 days; a fact we could not find on a tool&rsquo;s own pages is left out.</p>
            <Sources tools={[...tools]} />
          </section>

          <section className="cmp-sec" aria-labelledby="related-h">
            <h2 id="related-h">Related</h2>
            <div className="related cmp-related">
              {p.related.map(r => (
                <MaybeLink key={r.href} href={r.href} className="rel">
                  <b>{r.title}</b>
                  <span>{r.line}</span>
                </MaybeLink>
              ))}
            </div>
            <p className="also">Also: <MaybeLink href="/compare">All comparisons</MaybeLink> · <MaybeLink href="/automations">Automations</MaybeLink> · <MaybeLink href="/ai-agents">AI agents</MaybeLink> · <MaybeLink href="/browser-agents">Browser agents</MaybeLink> · <MaybeLink href="/apps">Apps</MaybeLink></p>
          </section>
        </article>
      </div>

      <section className="wrap">
        <div className="final">
          <h2>Try the sentence instead of the setup</h2>
          <p>Tell Captain what you need, and it builds the automation, AI agent, browser agent or app in your real apps. Every workspace starts free with 2,000 credits.</p>
          <Cta campaign="seo-compare" page={p.slug} place="final">Start free with Captain</Cta>
          <span className="peek l" aria-hidden="true"><Face id="keeper" size={50} /><Face id="writer" size={44} /></span>
          <span className="peek r" aria-hidden="true"><Face id="scout" size={48} /><Face id="sorter" size={46} /></span>
        </div>
      </section>

      <div className="sticky"><span>{p.h1}</span><Cta campaign="seo-compare" page={p.slug} place="sticky">Try free</Cta></div>
    </div>
  );
}

function Alternatives({ p }: { p: AltPage }) {
  return (
    <>
      {p.notice && (
        <section id="notice" className="cmp-sec cmp-notice" role="note">
          <h2>{p.notice.h}</h2>
          <p>{p.notice.body} <a href={TOOLS[p.tool].status?.url ?? TOOLS[p.tool].site} target="_blank" rel="noopener">Source, read {CHECKED}</a></p>
        </section>
      )}
      <section id="why" className="cmp-sec">
        <h2>{p.why.h}</h2>
        {p.why.body.map(b => <p key={b.slice(0, 32)} className="cmp-p">{b}</p>)}
      </section>

      <section id="picks" className="cmp-sec">
        <h2>Quick picks</h2>
        <table className="picks">
          <thead><tr><th scope="col">If you need</th><th scope="col">Look at</th></tr></thead>
          <tbody>
            {p.picks.map(k => (
              <tr key={k.need}><td>{k.need}</td><td><a href={`#alt-${k.tool}`}>{TOOLS[k.tool].name}</a></td></tr>
            ))}
          </tbody>
        </table>
      </section>

      <section id="alternatives" className="cmp-sec">
        <h2>The alternatives, with prices and one honest limitation each</h2>
        <p className="cmp-lede">50agents is listed first because this is our site. Its limits are written the same way as everyone else&rsquo;s.</p>
        <div className="alts">
          {p.entries.map((e, i) => <AltCard key={e.tool} e={e} n={i + 1} />)}
        </div>
      </section>

      <section id="stay" className="cmp-sec">
        <h2>{p.stay.h}</h2>
        <ul className="cmp-list">{p.stay.items.map(s => <li key={s.slice(0, 32)}>{s}</li>)}</ul>
      </section>
    </>
  );
}

function Versus({ p }: { p: VsPage }) {
  const them = TOOLS[p.tool];
  return (
    <>
      <section id="table" className="cmp-sec">
        <h2>50agents and {them.name}, side by side</h2>
        <p className="cmp-lede"><MarkIcon v="yes" /> <MarkIcon v="partly" /> <MarkIcon v="no" /> as each tool&rsquo;s own pages state it.</p>
        <VsTable tool={p.tool} rows={p.rows} />
      </section>

      <section id="verdict" className="cmp-sec">
        <h2>What the table means</h2>
        {p.verdict.map(v => <p key={v.slice(0, 32)} className="cmp-p">{v}</p>)}
      </section>

      <section id="pick" className="cmp-sec">
        <h2>Who should pick which</h2>
        <div className="pick">
          <div className="pick-c us">
            <h3><Face id="keeper" size={22} /> Pick 50agents if</h3>
            <ul>{p.pick.us.map(s => <li key={s.slice(0, 32)}>{s}</li>)}</ul>
          </div>
          <div className="pick-c">
            <h3>Pick {them.name} if</h3>
            <ul>{p.pick.them.map(s => <li key={s.slice(0, 32)}>{s}</li>)}</ul>
          </div>
        </div>
      </section>
    </>
  );
}

function Check() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>;
}

