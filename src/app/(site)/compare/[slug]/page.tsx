// A comparison page, v5 (D255, Jii's round 3): 12 alternatives pages and 8 versus pages, one template filled from each
// page's JSON (src/content/compare/pages), written by the page pipeline (scripts/pages, prompt compare.md, gates-compare.mjs).
// The use case page's hero (the ask in Captain's box as the subheader, one short line), then the table (50agents first under
// our wordmark, only where it wins), where 50agents is good, how to move over (a stepper), questions, related pages.
// No dates and no source lines on the page. The full two-sentence answer stays in the JSON-LD.
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { COMPARE } from '@/content/compare/pages';
import { TOOLS } from '@/content/compare/facts';
import { AltTable, MoveSteps, Strengths, VsTable } from '@/site/compare/parts';
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

export default async function ComparePageView({ params }: { params: Promise<{ slug: string }> }) {
  const p = await find(params);
  if (!p) notFound();
  const url = `${BASE}/compare/${p.slug}`;
  const them = TOOLS[p.tool];
  const ld = [
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name: p.h1, item: url },
    ] },
    { '@context': 'https://schema.org', '@type': 'Article', headline: p.h1, description: p.answer.join(' '), mainEntityOfPage: url,
      author: { '@type': 'Organization', name: '50agents', url: BASE }, publisher: { '@type': 'Organization', name: '50agents', url: BASE }, dateModified: p.updated },
    ...(p.type === 'alternatives' ? [{ '@context': 'https://schema.org', '@type': 'ItemList', name: p.h1,
      itemListElement: p.entries.map((e, i) => ({ '@type': 'ListItem', position: i + 1, name: TOOLS[e.tool].name, url: TOOLS[e.tool].site })) }] : []),
  ];

  return (
    <div className="page cmp3">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <div className="wrap"><Crumbs trail={[{ label: 'Home', href: '/' }, { label: p.h1 }]} /></div>

      {/* Hero (D255, as the use case page): the question, the ask typed into Captain's box as the subheader, one short line */}
      <section className="wrap uc3-hero cmp5-hero">
        <h1>{p.h1}</h1>
        <PromptFilm ask={p.ask} button={<Cta campaign="seo-compare" page={p.slug} place="hero" ask={p.ask}>Build it</Cta>} />
        <p className="uc3-note">{p.line}</p>
        {p.type === 'alternatives' && p.notice && (
          <p className="cmp3-notice"><b>{p.notice.h}.</b> {p.notice.body}</p>
        )}
      </section>

      {/* The comparison: the visual centre, one table of short cells, every competitor fact from facts.ts */}
      <section className="wrap sec" id="compare">
        <div className="sec-h c">
          <h2>{p.type === 'alternatives' ? 'The alternatives, side by side' : `50agents and ${them.name}, side by side`}</h2>
          <p>{p.lede}</p>
        </div>
        {p.type === 'alternatives' ? <AltTable p={p} /> : <VsTable p={p} />}
      </section>

      {/* Where 50agents is good: 3 or 4 strengths, each a crew blob, a title and one line */}
      <section className="wrap sec" id="strengths">
        <div className="sec-h c"><h2>Where 50agents is good</h2><p>You describe the job. Captain builds it and runs it.</p></div>
        <Strengths items={p.strengths} />
      </section>

      {/* How to move over: a horizontal stepper that stacks on a phone */}
      <section className="wrap sec" id="move">
        <div className="sec-h c"><h2>How to move over</h2></div>
        <MoveSteps steps={p.move} />
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
        <p className="byline">By the 50agents team, who make 50agents</p>
      </section>

      <StickyBar><span>{p.h1}</span><Cta campaign="seo-compare" page={p.slug} place="sticky" ask={p.ask}>Build it</Cta></StickyBar>
    </div>
  );
}
