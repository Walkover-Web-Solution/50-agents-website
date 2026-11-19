// A use case page, v3 (D253): one template, filled from the page's JSON (src/content/use-cases/pages), written by the
// page pipeline (scripts/pages). Hero with the ask typed into Captain, a scroll stepper, the apps, a comparison,
// questions, more use cases. Every visual is drawn from the data, so a new page needs no design work.
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PAGES } from '@/content/use-cases/pages';
import { AppLogo, Crumbs, Cta, Face, KindBadge, KINDS, MaybeLink } from '@/site/parts';
import { StickyBar } from '@/site/sticky';
import { PromptFilm } from '@/site/usecase/film';
import { PlanCard } from '@/site/usecase/plan-card';
import { ScrollStepper } from '@/site/usecase/stepper';
import { stepPicture } from '@/site/usecase/pictures';
import { appIcon, appName, appsIn } from '@/site/usecase/apps-data';
import { CATEGORIES } from '@/content/integrations/categories';
import type { UseCasePage } from '@/site/usecase/types';
import '@/site/css/usecase.css';

const BASE = 'https://50agents.com';
export const dynamicParams = false;
export function generateStaticParams() {
  return PAGES.map(u => ({ slug: u.slug }));
}
const find = async (params: Promise<{ slug: string }>) => { const { slug } = await params; return PAGES.find(x => x.slug === slug); };

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const u = await find(params);
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

const month = (iso: string) => new Date(iso + 'T00:00:00Z').toLocaleDateString('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' });

// More use cases: the same kind first, then shared tags, then the rest; six, linked statically.
function related(u: UseCasePage) {
  const score = (x: UseCasePage) => (x.kind === u.kind ? 2 : 0) + x.tags.filter(t => u.tags.includes(t)).length;
  return PAGES.filter(x => x.slug !== u.slug).sort((a, b) => score(b) - score(a)).slice(0, 6);
}

function Cell({ v, us }: { v: string; us?: boolean }) {
  const t = v.toLowerCase();
  const mark = t.startsWith('yes') ? 'y' : t.startsWith('no') ? 'n' : t.startsWith('partly') || t.startsWith('only') || t.startsWith('if ') || t.startsWith('some') ? 'p' : '';
  return <td className={us ? 'us' : undefined}>{mark && <i className={`mk ${mark}`} aria-hidden="true" />}{v}</td>;
}

export default async function UseCasePageView({ params }: { params: Promise<{ slug: string }> }) {
  const u = await find(params);
  if (!u) notFound();
  const k = KINDS[u.kind];
  const url = `${BASE}/use-cases/${u.slug}`;
  const cat = CATEGORIES.find(c => c.slug === u.category);
  const wall = appsIn(u.category, 30, u.build.apps);
  const more = related(u);
  const ld = [
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Use cases', item: `${BASE}/use-cases` },
      { '@type': 'ListItem', position: 3, name: u.h1, item: url },
    ] },
    { '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: `50agents: ${u.h1}`, applicationCategory: 'BusinessApplication', operatingSystem: 'Web', url,
      description: u.answer.join(' '), offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', description: 'Free to start.' },
      publisher: { '@type': 'Organization', name: '50agents', url: BASE }, dateModified: u.updated },
  ];

  return (
    <div className="page uc3" style={{ ['--k' as string]: k.tint }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <div className="wrap"><Crumbs trail={[{ label: 'Home', href: '/' }, { label: 'Use cases', href: '/use-cases' }, { label: u.h1 }]} /></div>

      {/* Hero: the job, the answer, and the ask typed into Captain with Captain's plan under it */}
      <section className="wrap uc3-hero">
        <KindBadge kind={u.kind} />
        <h1>{u.h1}</h1>
        <p className="answer">{u.answer[0]} {u.answer[1]}</p>
        <PromptFilm ask={u.ask} button={<Cta page={u.slug} place="hero" ask={u.ask}>Build it</Cta>}>
          <PlanCard u={u} />
        </PromptFilm>
        <p className="uc3-note">Free to start. Nothing reaches anyone outside your business without your OK.</p>
      </section>

      {/* How it works: a stepper that moves with the scroll */}
      <section className="wrap sec" id="how">
        <div className="sec-h c"><h2>How it works</h2><p>From one sentence to {u.build.name.toLowerCase()} running for you.</p></div>
        <ScrollStepper steps={u.steps} pictures={u.steps.map(s => <div key={s.key}>{stepPicture(s.key, u)}</div>)} />
      </section>

      {/* The apps: this job's apps large, then the category from the catalog, and 2,300+ */}
      <section className="wrap sec" id="apps">
        <div className="sec-h c">
          <h2>{u.build.apps.length ? <>Works with {u.build.apps.map(appName).join(' and ')}, and 2,300+ more apps</> : <>No app needed. And 2,300+ apps when you want them</>}</h2>
          <p>Through viaSocket&rsquo;s catalog. Swap in the {cat?.short ?? 'other'} apps you already use.</p>
        </div>
        <div className="uc3-apps">
          {u.build.apps.map(a => (
            <MaybeLink key={a} href={`/integrations/${a}`} className="uc3-app"><AppLogo app={a} icon={appIcon(a)} size={44} /><b>{appName(a)}</b></MaybeLink>
          ))}
        </div>
        {wall.length > 0 && (
          <div className="uc3-wall" aria-label={`${cat?.name ?? 'More'} apps in the catalog`}>
            <div className="uc3-wall-row">
              {[...wall, ...wall].map((a, i) => (
                <span key={a.s + i} className="uc3-tile" title={a.n} aria-hidden={i >= wall.length ? 'true' : undefined}><AppLogo app={a.s} icon={a.i} size={34} /><span className="sr">{a.n}</span></span>
              ))}
            </div>
          </div>
        )}
        <p className="uc3-more-apps"><MaybeLink href={cat ? `/integrations/category/${cat.slug}` : '/integrations'}>See all {cat?.short ?? ''} apps</MaybeLink></p>
      </section>

      {/* Compared: the other ways to do this job, honestly, against 50agents */}
      <section className="wrap sec" id="compare">
        <div className="sec-h c"><h2>Other ways to do it, compared</h2>{u.stat && <p>{u.stat.text} <a href={u.stat.href} target="_blank" rel="noopener">{u.stat.source}</a></p>}</div>
        <div className="uc3-cmp">
          <table>
            <thead><tr><th scope="col"><span className="sr">What matters</span></th>{u.compare.methods.map(m => <th key={m} scope="col">{m}</th>)}<th scope="col" className="us"><span className="uc3-us"><Face id={k.face} size={20} />50agents</span></th></tr></thead>
            <tbody>
              {u.compare.rows.map(r => (
                <tr key={r.label}><th scope="row">{r.label}</th>{r.cells.map((c, i) => <Cell key={i} v={c} us={i === r.cells.length - 1} />)}</tr>
              ))}
            </tbody>
          </table>
        </div>
        {u.compare.sources && <p className="uc3-src">From each tool&rsquo;s own pages: {u.compare.sources.map((x, i) => <span key={x.href}>{i ? ', ' : ''}<a href={x.href} target="_blank" rel="noopener">{x.label}</a></span>)}.</p>}
      </section>

      {/* Questions */}
      <section className="wrap sec" id="questions">
        <div className="sec-h c"><h2>Questions people ask</h2></div>
        <div className="qa uc3-qa">
          {u.faqs.map((f, n) => (
            <details key={f.q} open={n === 0}>
              <summary><h3>{f.q}</h3><i aria-hidden="true" /></summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* More use cases, and the way to all of them */}
      <section className="wrap sec" id="more">
        <div className="sec-h c"><h2>More things Captain can build</h2></div>
        <div className="cards3">
          {more.map(r => (
            <a key={r.slug} href={`/use-cases/${r.slug}`}>
              <span className="k"><Face id={KINDS[r.kind].face} size={20} />{KINDS[r.kind].label}</span>
              <b>{r.h1}</b>
              <span>{r.build.name}: {r.build.line}</span>
            </a>
          ))}
        </div>
        <div className="uc3-all"><a className="btn ghost" href="/use-cases">See all use cases</a></div>
      </section>

      {/* Final: the same ask, one button */}
      <section className="wrap sec">
        <div className="final">
          <h2>{u.h1}</h2>
          <p>Tell Captain &ldquo;{u.ask}&rdquo;. Free to start.</p>
          <Cta page={u.slug} place="final" ask={u.ask}>Build it with Captain</Cta>
          <span className="peek l" aria-hidden="true"><Face id={k.face} size={52} /><Face id="keeper" size={44} /></span>
          <span className="peek r" aria-hidden="true"><Face id="lead" size={50} /><Face id="rosa" size={46} /></span>
        </div>
        <p className="byline">By the 50agents team · Updated {month(u.updated)}</p>
      </section>

      <StickyBar><span>{u.h1}</span><Cta page={u.slug} place="sticky" ask={u.ask}>Build it</Cta></StickyBar>
    </div>
  );
}
