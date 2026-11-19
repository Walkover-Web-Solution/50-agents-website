// A comparison page, v3 (D253): 12 alternatives pages and 8 versus pages, one template filled from each page's JSON
// (src/content/compare/pages), written by the page pipeline (scripts/pages, prompt compare.md, gates-compare.mjs).
// A centred hero with the short answer and the ask in Captain's box, then the table (the visual centre, every competitor
// fact from facts.ts, one sources line under it), who should pick which, how to move over, questions, related pages.
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { COMPARE } from '@/content/compare/pages';
import { TOOLS } from '@/content/compare/facts';
import { AltTable, PickCards, SourcesLine, VsTable } from '@/site/compare/parts';
import { Crumbs, Cta, Face, MaybeLink } from '@/site/parts';
import { StickyBar } from '@/site/sticky';
import { PromptFilm } from '@/site/usecase/film';
import '@/site/css/usecase.css';
import '@/site/css/compare.css';

const BASE = 'https://50agents.com';
export const dynamicParams = false;
export function generateStaticParams() {
  return COMPARE.map(p => ({ slug: p.slug }));
}
const find = async (params: Promise<{ slug: string }>) => { const { slug } = await params; return COMPARE.find(p => p.slug === slug); };

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = await find(params);
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

const month = (iso: string) => new Date(iso + 'T00:00:00Z').toLocaleDateString('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' });

export default async function ComparePageView({ params }: { params: Promise<{ slug: string }> }) {
  const p = await find(params);
  if (!p) notFound();
  const url = `${BASE}/compare/${p.slug}`;
  const them = TOOLS[p.tool];
  const ld = [
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Compare', item: `${BASE}/compare` },
      { '@type': 'ListItem', position: 3, name: p.h1, item: url },
    ] },
    { '@context': 'https://schema.org', '@type': 'Article', headline: p.h1, description: p.answer.join(' '), mainEntityOfPage: url,
      author: { '@type': 'Organization', name: '50agents', url: BASE }, publisher: { '@type': 'Organization', name: '50agents', url: BASE }, dateModified: p.updated },
    ...(p.type === 'alternatives' ? [{ '@context': 'https://schema.org', '@type': 'ItemList', name: p.h1,
      itemListElement: p.entries.map((e, i) => ({ '@type': 'ListItem', position: i + 1, name: TOOLS[e.tool].name, url: TOOLS[e.tool].site })) }] : []),
  ];

  return (
    <div className="page cmp3" style={{ ['--k' as string]: '#E2E9FF' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <div className="wrap"><Crumbs trail={[{ label: 'Home', href: '/' }, { label: 'Compare', href: '/compare' }, { label: p.h1 }]} /></div>

      {/* Hero: the question, the short answer in two sentences, and one real ask in Captain's box */}
      <section className="wrap cmp3-hero">
        <h1>{p.h1}</h1>
        <p className="answer">{p.answer[0]} {p.answer[1]}</p>
        {p.type === 'alternatives' && p.notice && (
          <p className="cmp3-notice"><b>{p.notice.h}.</b> {p.notice.body} <a href={them.status?.url ?? them.site} target="_blank" rel="noopener">{them.name}&rsquo;s own page</a></p>
        )}
        <div className="hero-cta cmp3-film">
          <PromptFilm ask={p.ask} button={<Cta campaign="seo-compare" page={p.slug} place="hero" ask={p.ask}>Build it</Cta>}>{null}</PromptFilm>
        </div>
        <p className="uc3-note">Try one real job in 50agents. Free to start.</p>
      </section>

      {/* The comparison: the visual centre, one table, every competitor fact from facts.ts, sources in one line */}
      <section className="wrap sec" id="compare">
        <div className="sec-h c">
          <h2>{p.type === 'alternatives' ? 'The alternatives, side by side' : `50agents and ${them.name}, side by side`}</h2>
          <p>{p.lede}</p>
        </div>
        {p.type === 'alternatives' ? <AltTable p={p} /> : <VsTable p={p} />}
        <SourcesLine p={p} />
      </section>

      {/* Who should pick which: two cards, and where the other tool is better */}
      <section className="wrap sec" id="pick">
        <div className="sec-h c"><h2>Who should pick which</h2><p>We make 50agents, so we say where the other tool is the better choice.</p></div>
        <PickCards p={p} />
      </section>

      {/* How to move over: short numbered rows */}
      <section className="wrap sec" id="move">
        <div className="sec-h c"><h2>How to move over</h2></div>
        <ol className="rows cmp3-move">
          {p.move.map((m, i) => (
            <li key={m.title}><span className="n">{String(i + 1).padStart(2, '0')}</span><div><h3>{m.title}</h3><p>{m.body}</p></div></li>
          ))}
        </ol>
      </section>

      {/* Questions */}
      <section className="wrap sec" id="questions">
        <div className="sec-h c"><h2>Questions people ask</h2></div>
        <div className="qa uc3-qa">
          {p.faqs.map((f, n) => (
            <details key={f.q} open={n === 0}>
              <summary><h3>{f.q}</h3><i aria-hidden="true" /></summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Related comparisons */}
      <section className="wrap sec" id="more">
        <div className="sec-h c"><h2>More comparisons</h2></div>
        <div className="cards3">
          {p.related.map(r => (
            <MaybeLink key={r.href} href={r.href}>
              <b>{r.title}</b>
              <span>{r.line}</span>
            </MaybeLink>
          ))}
        </div>
        <div className="uc3-all"><MaybeLink href="/compare" className="btn ghost">See all comparisons</MaybeLink></div>
      </section>

      {/* Final: the same ask, one button */}
      <section className="wrap sec">
        <div className="final">
          <h2>Describe the job instead of building it</h2>
          <p>Tell Captain &ldquo;{p.ask}&rdquo;. Free to start.</p>
          <Cta campaign="seo-compare" page={p.slug} place="final" ask={p.ask}>Build it with Captain</Cta>
          <span className="peek l" aria-hidden="true"><Face id="keeper" size={50} /><Face id="writer" size={44} /></span>
          <span className="peek r" aria-hidden="true"><Face id="scout" size={48} /><Face id="sorter" size={46} /></span>
        </div>
        <p className="byline">By the 50agents team, who make 50agents · Updated {month(p.updated)}</p>
      </section>

      <StickyBar><span>{p.h1}</span><Cta campaign="seo-compare" page={p.slug} place="sticky" ask={p.ask}>Build it</Cta></StickyBar>
    </div>
  );
}
