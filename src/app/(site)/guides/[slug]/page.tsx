// A guide, v3 (D253): a reading page in one template, filled from the page's JSON (src/content/guides/pages), written by
// the page pipeline (scripts/pages). The short answer first, the method as numbered steps, a worked example (the ask
// typed into Captain, then its plan; or a link to the use case it overlaps), what can go wrong, questions, sources.
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { GUIDES } from '@/content/guides/pages';
import { Crumbs, Cta, Face, KINDS, MaybeLink } from '@/site/parts';
import { PromptFilm } from '@/site/usecase/film';
import { plain, rich } from '@/site/guides/rich';
import { findUseCase, month, Plan, UseCaseCard } from '@/site/guides/parts';
import { HeroSticky } from '@/site/guides/sticky';
import type { GuideBlock, GuidePage } from '@/site/guides/types';
import '@/site/css/usecase.css';
import '@/site/css/guides.css';

const BASE = 'https://50agents.com';
export const dynamicParams = false;
export function generateStaticParams() {
  return GUIDES.map(g => ({ slug: g.slug }));
}
const find = async (params: Promise<{ slug: string }>) => { const { slug } = await params; return GUIDES.find(x => x.slug === slug); };

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const g = await find(params);
  if (!g) return {};
  const url = `${BASE}/guides/${g.slug}`;
  return {
    title: g.title,
    description: g.description,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: { title: g.h1, description: g.description, url, siteName: '50agents', type: 'article', modifiedTime: g.updated },
    twitter: { card: 'summary_large_image', title: g.h1, description: g.description },
  };
}

function Block({ b }: { b: GuideBlock }) {
  if ('p' in b) return <p>{rich(b.p)}</p>;
  if ('ul' in b) return <ul className="gd3-ul">{b.ul.map(x => <li key={x}>{rich(x)}</li>)}</ul>;
  return (
    <div className="gd3-tw">
      <table>
        <thead><tr>{b.table.head.map(h => <th key={h} scope="col">{h}</th>)}</tr></thead>
        <tbody>{b.table.rows.map(r => <tr key={r.join('|')}>{r.map((c, j) => j === 0 ? <th key={j} scope="row">{rich(c)}</th> : <td key={j} data-h={b.table.head[j]}>{rich(c)}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

// More guides: the page's own picks first, then the same group; three.
function more(g: GuidePage) {
  const picked = g.related.map(s => GUIDES.find(x => x.slug === s)).filter((x): x is GuidePage => !!x);
  const rest = GUIDES.filter(x => x.slug !== g.slug && !g.related.includes(x.slug) && x.group === g.group);
  return [...picked, ...rest].slice(0, 3);
}

export default async function GuideView({ params }: { params: Promise<{ slug: string }> }) {
  const g = await find(params);
  if (!g) notFound();
  const k = KINDS[g.kind];
  const url = `${BASE}/guides/${g.slug}`;
  const ex = g.example;
  const uc = findUseCase(ex.useCase);
  const ask = uc?.ask ?? ex.ask!;
  const toc = [
    ...g.sections.map(s => ({ id: s.id, label: s.h2 })),
    { id: 'method', label: g.method.h2 },
    { id: 'example', label: ex.h2 },
    { id: 'what-can-go-wrong', label: 'What can go wrong' },
    { id: 'questions', label: 'Questions people ask' },
    { id: 'sources', label: 'Sources' },
  ];
  const ld = [
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: `${BASE}/guides` },
      { '@type': 'ListItem', position: 3, name: g.h1, item: url },
    ] },
    { '@context': 'https://schema.org', '@type': 'Article', headline: g.h1, description: g.description, abstract: plain(g.answer.join(' ')), url, mainEntityOfPage: url,
      dateModified: g.updated, inLanguage: 'en', author: { '@type': 'Organization', name: '50agents', url: BASE },
      publisher: { '@type': 'Organization', name: '50agents', url: BASE, logo: { '@type': 'ImageObject', url: `${BASE}/landing/favicon.svg` } },
      citation: g.sources.map(s => s.href) },
  ];

  return (
    <div className="page gd3" style={{ ['--k' as string]: k.tint }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <div className="wrap"><Crumbs trail={[{ label: 'Home', href: '/' }, { label: 'Guides', href: '/guides' }, { label: g.h1 }]} /></div>

      <div className="wrap gd3-grid">
        {/* Hero: the question and the short answer, in the reading column */}
        <header className="gd3-hero">
          <span className="kind"><Face id={k.face} size={22} />Guide · {g.group}</span>
          <h1>{g.h1}</h1>
          <p className="gd3-by">By the 50agents team · Updated {month(g.updated)}</p>
          <div className="gd3-short" data-hero>
            <h2>The short answer</h2>
            <p>{rich(g.answer[0])} {rich(g.answer[1])}</p>
          </div>
        </header>

        <nav className="gd3-toc" aria-label="Contents">
          <p>Contents</p>
          <ol>{toc.map(t => <li key={t.id}><a href={`#${t.id}`}>{t.label}</a></li>)}</ol>
        </nav>

        <article className="gd3-col">
          {g.sections.map(s => (
            <section key={s.id} id={s.id}>
              <h2>{s.h2}</h2>
              {s.body.map((b, i) => <Block key={i} b={b} />)}
            </section>
          ))}

          {/* The method: numbered steps that work with any tool */}
          <section id="method">
            <h2>{g.method.h2}</h2>
            {g.method.intro && <p>{rich(g.method.intro)}</p>}
            <ol className="gd3-steps">
              {g.method.steps.map(s => <li key={s.title}><h3>{s.title}</h3><p>{rich(s.body)}</p></li>)}
            </ol>
          </section>

          {/* The worked example in 50agents: the ask typed into Captain and its plan, or the use case page it overlaps */}
          <section id="example">
            <h2>{ex.h2}</h2>
            {ex.body.map(p => <p key={p}>{rich(p)}</p>)}
            {uc ? (
              <UseCaseCard u={uc} />
            ) : (
              <PromptFilm ask={ask} button={<Cta page={g.slug} place="example" campaign="seo-guide" ask={ask}>Build it</Cta>}>
                <Plan kind={ex.kind!} build={ex.build!} />
              </PromptFilm>
            )}
          </section>

          <section id="what-can-go-wrong">
            <h2>What can go wrong</h2>
            <ul className="gd3-wrong">
              {g.wrong.map(w => <li key={w.title}><h3>{w.title}</h3><p>{rich(w.body)}</p></li>)}
            </ul>
          </section>

          <section id="questions">
            <h2>Questions people ask</h2>
            <div className="qa">
              {g.faqs.map((f, n) => (
                <details key={f.q} open={n === 0}>
                  <summary><h3>{f.q}</h3><i aria-hidden="true" /></summary>
                  <p>{rich(f.a)}</p>
                </details>
              ))}
            </div>
          </section>

          <section id="sources">
            <h2>Sources</h2>
            <ol className="gd3-src">
              {g.sources.map(s => <li key={s.href}><a href={s.href} target="_blank" rel="noopener">{s.label}</a></li>)}
            </ol>
            {g.pricesChecked && <p className="gd3-checked">Prices checked {month(g.pricesChecked)}.</p>}
          </section>
        </article>
      </div>

      <section className="wrap sec" id="more">
        <div className="sec-h c"><h2>More guides</h2></div>
        <div className="cards3">
          {more(g).map(r => (
            <a key={r.slug} href={`/guides/${r.slug}`}>
              <span className="k"><Face id={KINDS[r.kind].face} size={20} />{r.group}</span>
              <b>{r.h1}</b>
              <span>{plain(r.answer[0])}</span>
            </a>
          ))}
        </div>
        <div className="uc3-all"><MaybeLink className="btn ghost" href="/guides">See all guides</MaybeLink></div>
      </section>

      <section className="wrap sec">
        <div className="final">
          <h2>Or let Captain build it</h2>
          <p>Tell Captain &ldquo;{ask}&rdquo;. It shows you the plan before it builds anything. Free to start.</p>
          <Cta page={g.slug} place="final" campaign="seo-guide" ask={ask}>Build it with Captain</Cta>
          <span className="peek l" aria-hidden="true"><Face id="lead" size={50} /><Face id={k.face} size={44} /></span>
          <span className="peek r" aria-hidden="true"><Face id="sorter" size={46} /><Face id="writer" size={48} /></span>
        </div>
      </section>

      <HeroSticky><span>{g.h1}</span><Cta page={g.slug} place="sticky" campaign="seo-guide" ask={ask}>Build it</Cta></HeroSticky>
    </div>
  );
}
