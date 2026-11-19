// A use case page, v3 (D253): one template, filled from the page's JSON (src/content/use-cases/pages), written by the
// page pipeline (scripts/pages). Hero with the ask typed into Captain, a scroll stepper, the apps, a comparison,
// questions, more use cases. Every visual is drawn from the data, so a new page needs no design work.
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PAGES } from '@/content/use-cases/pages';
import { AppLogo, Crumbs, Cta, Face, KindBadge, KINDS, MaybeLink } from '@/site/parts';
import { StickyBar } from '@/site/sticky';
import { PromptFilm } from '@/site/usecase/film';
import { ScrollStepper } from '@/site/usecase/stepper';
import { stepPicture } from '@/site/usecase/pictures';
import { appIcon, appName, appsIn, topApps } from '@/site/usecase/apps-data';
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


// More use cases: the same kind first, then shared tags, then the rest; six, linked statically.
function related(u: UseCasePage) {
  const score = (x: UseCasePage) => (x.kind === u.kind ? 2 : 0) + x.tags.filter(t => u.tags.includes(t)).length;
  return PAGES.filter(x => x.slug !== u.slug).sort((a, b) => score(b) - score(a)).slice(0, 6);
}

// The 50agents wordmark, small, for table headers (D255: our logo, not a kind face)
function Logo50() {
  return <span className="logo50" aria-label="50agents"><span aria-hidden="true">5<Face id="keeper" size={17} />agents</span></span>;
}

function Mark({ v }: { v: string }) {
  const t = v.toLowerCase();
  const k = /^yes\b/.test(t) ? 'y' : /^no\b/.test(t) ? 'n' : /^(partly|only|if |some|depends)/.test(t) ? 'p' : '';
  if (!k) return null;
  return (
    <svg className={`mk ${k}`} width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="10" />
      {k === 'y' && <path d="M6 10.2l2.6 2.6L14 7.4" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />}
      {k === 'n' && <path d="M7 7l6 6M13 7l-6 6" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" />}
      {k === 'p' && <path d="M6 10h8" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" />}
    </svg>
  );
}
// A cell's words without the leading Yes/No when the mark already says it ("Yes, always" -> "Always").
const rest = (v: string) => { const m = v.match(/^(yes|no)\b[,.]?\s*(.*)$/i); return m ? (m[2] ? m[2][0].toUpperCase() + m[2].slice(1) : '') : v; };
function Cell({ v, us }: { v: string; us?: boolean }) {
  return <td className={us ? 'us' : undefined}><span className="cell"><Mark v={v} /><span>{rest(v) || (v.toLowerCase().startsWith('yes') ? 'Yes' : 'No')}</span></span></td>;
}

export default async function UseCasePageView({ params }: { params: Promise<{ slug: string }> }) {
  const u = await find(params);
  if (!u) notFound();
  const k = KINDS[u.kind];
  const url = `${BASE}/use-cases/${u.slug}`;
  const own = u.build.apps.map(a => ({ s: a, n: appName(a), i: appIcon(a) ?? '' }));
  const cat = appsIn(u.category, 24, u.build.apps);
  const rowA = [...own, ...cat.slice(0, 14)];
  const rowB = [...cat.slice(14), ...topApps(30, [...u.build.apps, ...cat.map(a => a.s)])].slice(0, 18);
  const more = related(u);
  // apps named in the H1 show their logos above it (D255)
  const named = u.build.apps.filter(a => u.h1.toLowerCase().includes(appName(a).toLowerCase()));
  // the comparison shows only the points where 50agents wins (D255): our cell is a yes or a plain strength, not a no or a "partly"
  const wins = u.compare.rows.filter(r => { const t = (r.cells.at(-1) ?? '').toLowerCase(); return !/^(no\b|partly|only|if |some|depends)/.test(t); });
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
        <div className="uc3-top">
          <KindBadge kind={u.kind} />
          {named.length > 0 && <span className="uc3-named">{named.map(a => <AppLogo key={a} app={a} icon={appIcon(a)} size={28} eager />)}</span>}
        </div>
        <h1>{u.h1}</h1>
        {/* the chat box is the subheader (D255): the ask says what to do; one short line says what you get */}
        <PromptFilm ask={u.ask} button={<Cta page={u.slug} place="hero" ask={u.ask}>Build it</Cta>} />
        <p className="uc3-note">{u.answer[1]}</p>
      </section>

      {/* How it works: a stepper that moves with the scroll */}
      <section className="wrap sec" id="how">
        <ScrollStepper head={<div className="sec-h c"><h2>How it works</h2></div>} steps={u.steps} pictures={u.steps.map(s => <div key={s.key}>{stepPicture(s.key, u)}</div>)} />
      </section>

      {/* The apps: how many, and two rows of them moving (this job's apps and its category first) */}
      <section className="sec" id="apps">
        <div className="wrap sec-h c"><h2>Works with {u.build.apps.length ? u.build.apps.map(appName).join(', ') + ' and ' : ''}2,300+ apps</h2></div>
        <div className="uc3-wall" aria-label="Apps 50agents works with">
          {[rowA, rowB].map((row, n) => (
            <div key={n} className={n ? 'uc3-wall-row rev' : 'uc3-wall-row'}>
              {[...row, ...row].map((a, i) => (
                <span key={a.s + i} className="uc3-tile" title={a.n} aria-hidden={i >= row.length ? 'true' : undefined}><AppLogo app={a.s} icon={a.i} size={34} eager /><span className="sr">{a.n}</span></span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Compared: the other ways to do this job, honestly, against 50agents */}
      <section className="wrap sec" id="compare">
        <div className="sec-h c"><h2>Other ways to do it, compared</h2>{u.stat && <p>{u.stat.text}</p>}</div>
        <div className="uc3-cmp">
          <table>
            <thead><tr><th scope="col"><span className="sr">What matters</span></th><th scope="col" className="us"><span className="uc3-us"><Logo50 /></span></th>{u.compare.methods.map(m => <th key={m} scope="col">{m}</th>)}</tr></thead>
            <tbody>
              {wins.map(r => (
                <tr key={r.label}><th scope="row">{r.label}</th><Cell v={r.cells.at(-1)!} us />{r.cells.slice(0, -1).map((c, i) => <Cell key={i} v={c} />)}</tr>
              ))}
            </tbody>
          </table>
        </div>
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
      </section>

      <StickyBar><span>{u.h1}</span><Cta page={u.slug} place="sticky" ask={u.ask}>Build it</Cta></StickyBar>
    </div>
  );
}
