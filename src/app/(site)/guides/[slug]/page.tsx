// A guide, v5 (D255 round 3, "lifeless"): an article. The cover (drawn from the guide's data, ./cover.tsx), a strong H1,
// the short answer and the reading time; an editorial column beside sticky contents that follow the reading; related
// guides with their covers at the end. Before that, v4 (D254, Jii's round 2): a reading page in one template, filled from the page's JSON
// (src/content/guides/pages), written by the page pipeline (scripts/pages). To the point: the short answer, a "which one
// do I need" chooser where the reader has a choice, short context, steps the reader ticks off (progress in the contents)
// with Captain's film inside the step where 50agents does the job, what can go wrong, questions. Crew blobs only where
// they explain (the kind a tip or a problem is about); Captain is always the yellow blob. No sources, no dates shown.
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { GUIDES } from '@/content/guides/pages';
import { PAGES as USE_CASES } from '@/content/use-cases/pages';
import { Crumbs, Cta, Face, KINDS, MaybeLink } from '@/site/parts';
import { PromptFilm } from '@/site/usecase/film';
import { plain, rich } from '@/site/guides/rich';
import { findUseCase } from '@/site/guides/parts';
import { Chooser } from '@/site/guides/chooser';
import { Progress } from '@/site/guides/progress';
import { HeroSticky } from '@/site/guides/sticky';
import { GuideCard } from '@/site/guides/card';
import { GuideCover } from '@/site/guides/cover';
import { readMinutes } from '@/site/guides/meta';
import { ReadProgress } from '@/site/guides/read-progress';
import type { About, GuideBlock, GuidePage } from '@/site/guides/types';
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

// A table cell that starts with Yes, No or Partly gets the use case table's drawn mark.
function Mark({ v }: { v: string }) {
  const t = v.toLowerCase();
  const k = /^yes\b/.test(t) ? 'y' : /^no\b/.test(t) ? 'n' : /^(partly|some|depends)\b/.test(t) ? 'p' : '';
  if (!k) return null;
  return (
    <svg className={`mk ${k}`} width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="10" />
      {k === 'y' && <path d="M6 10.2l2.6 2.6L14 7.4" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />}
      {k === 'n' && <path d="M7 7l6 6M13 7l-6 6" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" />}
      {k === 'p' && <path d="M6 10h8" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" />}
    </svg>
  );
}

function Block({ b }: { b: GuideBlock }) {
  if ('p' in b) return <p>{rich(b.p)}</p>;
  if ('ul' in b) return <ul className="gd4-ul">{b.ul.map(x => <li key={x}>{rich(x)}</li>)}</ul>;
  return (
    <div className="gd4-tw">
      <table>
        <thead><tr>{b.table.head.map((h, j) => <th key={j} scope="col">{h || <span className="sr">Compared</span>}</th>)}</tr></thead>
        <tbody>{b.table.rows.map(r => <tr key={r.join('|')}>{r.map((c, j) => j === 0 ? <th key={j} scope="row">{rich(c)}</th> : <td key={j} data-h={b.table.head[j]}><span className="cell"><Mark v={c} /><span>{rich(c)}</span></span></td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

// A crew blob beside a tip, a warning or a problem: the face of the kind it is about, standing on the page (no box),
// named for screen readers. A warning or a problem gets the worried face (the crew's own frown and brows).
function Blob({ about, mood }: { about: About; mood: 'tip' | 'warn' }) {
  const k = KINDS[about];
  return <span className={`gd5-blob ${mood}`} title={`About the ${k.label.toLowerCase()}`}><Face id={k.face} size={40} /><span className="sr">About the {k.label.toLowerCase()}: </span></span>;
}

// More guides: the page's own picks first, then the same group; three.
function more(g: GuidePage) {
  const picked = g.related.map(s => GUIDES.find(x => x.slug === s)).filter((x): x is GuidePage => !!x);
  const rest = GUIDES.filter(x => x.slug !== g.slug && !g.related.includes(x.slug) && x.group === g.group);
  return [...picked, ...rest].slice(0, 3);
}

// The words of a chooser answer's link: the guide's or the use case's title.
function linkLabel(href: string) {
  const s = href.split('/').pop();
  if (href.startsWith('/guides/')) return `Read: ${GUIDES.find(x => x.slug === s)?.h1 ?? s}`;
  if (href.startsWith('/use-cases/')) return `See the ready-made version: ${USE_CASES.find(x => x.slug === s)?.h1 ?? s}`;
  return 'Read more';
}

export default async function GuideView({ params }: { params: Promise<{ slug: string }> }) {
  const g = await find(params);
  if (!g) notFound();
  const k = KINDS[g.kind];
  const url = `${BASE}/guides/${g.slug}`;
  const uc = findUseCase(g.captain.useCase);
  const ask = uc?.ask ?? g.captain.ask!;
  const steps = g.method.steps;
  const toc = [
    ...(g.chooser ? [{ id: 'which', label: g.chooser.h2 }] : []),
    ...g.sections.map(s => ({ id: s.id, label: s.h2 })),
    { id: 'steps', label: g.method.h2 },
    { id: 'what-can-go-wrong', label: 'What can go wrong' },
    { id: 'questions', label: 'Questions people ask' },
  ];
  const ld = [
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: `${BASE}/guides` },
      { '@type': 'ListItem', position: 3, name: g.h1, item: url },
    ] },
    { '@context': 'https://schema.org', '@type': 'Article', headline: g.h1, description: g.description, abstract: plain(g.answer.join(' ')), url, mainEntityOfPage: url,
      dateModified: g.updated, timeRequired: `PT${readMinutes(g)}M`, inLanguage: 'en', author: { '@type': 'Organization', name: '50agents', url: BASE },
      publisher: { '@type': 'Organization', name: '50agents', url: BASE, logo: { '@type': 'ImageObject', url: `${BASE}/landing/favicon.svg` } } },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: g.faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: plain(f.a) } })) },
  ];

  return (
    <div className="page gd4 gd5">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <ReadProgress />
      <div className="wrap"><Crumbs trail={[{ label: 'Home', href: '/' }, { label: 'Guides', href: '/guides' }, { label: g.h1 }]} /></div>

      {/* Hero: the cover, the question, the short answer, the reading time */}
      <header className="wrap gd5-hero">
        <div className="gd5-hero-t">
          <span className="kind" style={{ ['--k' as string]: k.tint }}><Face id={k.face} size={22} />{g.group}</span>
          <h1>{g.h1}</h1>
          <div className="gd5-short" data-hero>
            <h2>The short answer</h2>
            <p>{rich(g.answer[0])} {rich(g.answer[1])}</p>
          </div>
          <p className="gd5-meta"><span>{readMinutes(g)} min read</span><span>{steps.length} steps</span><span>Works with any tool</span></p>
        </div>
        <GuideCover g={g} size="hero" />
      </header>

      <div className="wrap gd5-grid">
        <nav className="gd5-toc" aria-label="Contents">
          <p>Contents</p>
          <ol>{toc.map(t => <li key={t.id}><a href={`#${t.id}`}>{t.label}</a></li>)}</ol>
          <Progress slug={g.slug} total={steps.length} restore />
        </nav>

        <article className="gd5-col">
          {g.chooser && (
            <section id="which">
              <h2>{g.chooser.h2}</h2>
              <Chooser root={g.chooser.root} id={`ch-${g.slug}`} label={linkLabel} />
            </section>
          )}

          {g.sections.map(s => (
            <section key={s.id} id={s.id}>
              <h2>{s.h2}</h2>
              {s.body.map((b, i) => <Block key={i} b={b} />)}
            </section>
          ))}

          {/* The steps: they work with any tool; the reader ticks them off. Captain's film sits in the step 50agents does. */}
          <section id="steps">
            <div className="gd4-steps-h">
              <h2>{g.method.h2}</h2>
              <div className="gd4-prog-inline"><Progress slug={g.slug} total={steps.length} /></div>
            </div>
            <ol className="gd4-steps">
              {steps.map((s, i) => (
                <li key={s.title} id={`step-${i + 1}`}>
                  <input type="checkbox" id={`done-${i + 1}`} className="gd4-tick-in" />
                  <label htmlFor={`done-${i + 1}`} className="gd4-tick">
                    <span className="n" aria-hidden="true">{i + 1}</span>
                    <svg className="t" viewBox="0 0 20 20" aria-hidden="true"><path d="M5.5 10.4l3 3L14.5 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    <span className="sr">Step {i + 1} done</span>
                  </label>
                  <div className="gd4-step">
                    <h3>{s.title}</h3>
                    <p>{rich(s.body)}</p>
                    {s.note && (
                      <div className={`gd5-note ${s.note.type}`} role="note">
                        <Blob about={s.note.about} mood={s.note.type === 'warn' ? 'warn' : 'tip'} />
                        <p><b>{s.note.type === 'tip' ? 'Tip.' : 'Watch out.'}</b> {rich(s.note.text)}</p>
                      </div>
                    )}
                    {g.captain.at === i && (
                      <div className="gd4-try">
                        <h4>Do this step in 50agents</h4>
                        <PromptFilm ask={ask} button={<Cta page={g.slug} place="step" campaign="seo-guide" ask={ask}>Build it</Cta>} />
                        <p>{rich(g.captain.line)}{uc && <> <a href={`/use-cases/${uc.slug}`}>See the ready-made version</a>.</>}</p>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section id="what-can-go-wrong">
            <h2>What can go wrong</h2>
            <ul className="gd5-wrong">
              {g.wrong.map(w => (
                <li key={w.title}>
                  <Blob about={w.about} mood="warn" />
                  <div><h3>{w.title}</h3><p>{rich(w.body)}</p></div>
                </li>
              ))}
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
        </article>
      </div>

      <section className="wrap sec" id="more" aria-labelledby="more-h">
        <div className="sec-h c"><h2 id="more-h">Read next</h2></div>
        <div className="gx-grid gx-three">
          {more(g).map(r => <GuideCard key={r.slug} g={r} />)}
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
