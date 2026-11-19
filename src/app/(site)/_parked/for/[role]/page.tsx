// A role page, v3 (D253, D254): one template, filled from the page's JSON (src/content/for/pages), written by the page
// pipeline (scripts/pages). A centred hero with the worked example's ask typed into Captain (no plan card), the 5 jobs the
// role hands off first (linked to their use case pages), "Works with ... 2,300+ apps" over two marquee rows, questions,
// guides. No date and no source line on the page. Every visual is drawn from the data.
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ROLES } from '@/content/for/pages';
import { GUIDES } from '@/content/guides/pages';
import { Crumbs, Cta, Face, KINDS } from '@/site/parts';
import { BuildLink } from '@/site/integrations/build-link';
import { PromptFilm } from '@/site/usecase/film';
import { AppsWall } from '@/site/hubs/apps-wall';
import { findUseCase } from '@/site/guides/parts';
import { plain, rich } from '@/site/guides/rich';
import { HeroSticky } from '@/site/guides/sticky';
import '@/site/css/usecase.css';
import '@/site/css/guides.css';
import '@/site/css/for.css';

const BASE = 'https://50agents.com';
export const dynamicParams = false;
export function generateStaticParams() {
  return ROLES.map(r => ({ role: r.slug }));
}
const find = async (params: Promise<{ role: string }>) => { const { role } = await params; return ROLES.find(x => x.slug === role); };

export async function generateMetadata({ params }: { params: Promise<{ role: string }> }): Promise<Metadata> {
  const r = await find(params);
  if (!r) return {};
  const url = `${BASE}/for/${r.slug}`;
  return {
    title: r.title,
    description: r.description,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: { title: r.h1, description: r.description, url, siteName: '50agents', type: 'website' },
    twitter: { card: 'summary_large_image', title: r.h1, description: r.description },
  };
}

export default async function RoleView({ params }: { params: Promise<{ role: string }> }) {
  const r = await find(params);
  if (!r) notFound();
  const k = KINDS[r.kind];
  const url = `${BASE}/for/${r.slug}`;
  const ask = r.example.ask;
  const guides = r.guides.map(s => GUIDES.find(g => g.slug === s)).filter(g => !!g);
  const others = ROLES.filter(x => x.slug !== r.slug);
  const ld = [
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'For teams', item: `${BASE}/for` },
      { '@type': 'ListItem', position: 3, name: r.h1, item: url },
    ] },
    { '@context': 'https://schema.org', '@type': 'ItemList', name: `The jobs ${r.role} hand off first`, itemListElement: r.jobs.map((j, i) => ({ '@type': 'ListItem', position: i + 1, name: j.title, ...(findUseCase(j.useCase) ? { url: `${BASE}/use-cases/${j.useCase}` } : {}) })) },
  ];

  return (
    <div className="page rl3" style={{ ['--k' as string]: k.tint }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <div className="wrap"><Crumbs trail={[{ label: 'Home', href: '/' }, { label: 'For teams', href: '/for' }, { label: r.h1 }]} /></div>

      {/* Hero: the role, the answer, and the worked example's ask typed into Captain */}
      <section className="wrap uc3-hero">
        <span className="kind"><Face id={k.face} size={22} />For {r.role}</span>
        <h1>{r.h1}</h1>
        <p className="answer">{rich(r.answer[0])} {rich(r.answer[1])}</p>
        <div className="rl3-film" data-hero>
          <PromptFilm ask={ask} button={<Cta page={r.slug} place="hero" campaign="seo-role" ask={ask}>Build it</Cta>} />
        </div>
        <p className="uc3-note">Free to start. Nothing reaches anyone outside your business without your OK.</p>
      </section>

      {/* The 5 jobs: each card opens its use case page, or starts it in Captain when there is no page yet */}
      <section className="wrap sec" id="jobs">
        <div className="sec-h c"><h2>The 5 jobs {r.role} hand off first</h2><p>Each one is a sentence you give Captain.</p></div>
        <div className="rl3-jobs">
          {r.jobs.map((j, i) => {
            const jk = KINDS[j.kind];
            const inner = (
              <>
                <span className="k"><Face id={jk.face} size={20} />{jk.label}</span>
                <b>{j.title}</b>
                <span>{rich(j.body)}</span>
              </>
            );
            return findUseCase(j.useCase)
              ? <a key={j.title} href={`/use-cases/${j.useCase}`} className={i < 2 ? 'big' : undefined}>{inner}</a>
              : <BuildLink key={j.title} page={r.slug} place={`job-${i + 1}`} campaign="seo-role" ask={j.ask} className={i < 2 ? 'big' : ''}>{inner}</BuildLink>;
          })}
        </div>
      </section>

      {/* The apps: "Works with ... 2,300+ apps" over two rows, the role's own first, then its category */}
      <AppsWall apps={r.apps} category={r.category} />

      <section className="wrap sec" id="questions">
        <div className="sec-h c"><h2>Questions people ask</h2></div>
        <div className="qa uc3-qa">
          {r.faqs.map((f, n) => (
            <details key={f.q} open={n === 0}>
              <summary><h3>{f.q}</h3><i aria-hidden="true" /></summary>
              <p>{rich(f.a)}</p>
            </details>
          ))}
        </div>
      </section>

      {guides.length > 0 && (
        <section className="wrap sec" id="guides">
          <div className="sec-h c"><h2>Guides for {r.role}</h2><p>The method behind each job, for any tool.</p></div>
          <div className="cards3">
            {guides.map(g => (
              <a key={g.slug} href={`/guides/${g.slug}`}>
                <span className="k"><Face id={KINDS[g.kind].face} size={20} />Guide · {g.group}</span>
                <b>{g.h1}</b>
                <span>{plain(g.answer[0])}</span>
              </a>
            ))}
          </div>
          <p className="rl3-others">For other teams: {others.map((o, i) => <span key={o.slug}>{i ? ', ' : ''}<a href={`/for/${o.slug}`}>{o.label}</a></span>)}.</p>
        </section>
      )}

      {/* Final: the same ask, one button */}
      <section className="wrap sec">
        <div className="final">
          <h2>Hand off the first job</h2>
          <p>Tell Captain &ldquo;{ask}&rdquo;. It shows you the plan before it builds anything. Free to start.</p>
          <Cta page={r.slug} place="final" campaign="seo-role" ask={ask}>Build it with Captain</Cta>
          <span className="peek l" aria-hidden="true"><Face id="lead" size={50} /><Face id={k.face} size={44} /></span>
          <span className="peek r" aria-hidden="true"><Face id="closer" size={46} /><Face id="scout" size={48} /></span>
        </div>
      </section>

      <HeroSticky><span>{r.h1}</span><Cta page={r.slug} place="sticky" campaign="seo-role" ask={ask}>Build it</Cta></HeroSticky>
    </div>
  );
}
