// A role page (pages-brief B7): the five jobs a role hands off first, the use cases and integrations that fit, and one
// worked example drawn in the app's own look. Static HTML from src/content/for/<role>.ts.
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ROLES } from '@/content/for';
import { GUIDES } from '@/content/guides';
import { AppLogo, Crumbs, Cta, Face, KINDS, MaybeLink } from '@/site/parts';
import { CopyAsk } from '@/site/copy';
import { ProductView } from '@/site/guides/views';
import { plain, rich } from '@/site/guides/rich';
import '@/site/css/guides.css';
import '@/site/css/for.css';

const BASE = 'https://50agents.com';
export const dynamicParams = false;
export function generateStaticParams() {
  return ROLES.map(r => ({ role: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ role: string }> }): Promise<Metadata> {
  const { role } = await params;
  const r = ROLES.find(x => x.slug === role);
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

const longDate = (iso: string) => new Date(iso + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

export default async function RolePage({ params }: { params: Promise<{ role: string }> }) {
  const { role } = await params;
  const r = ROLES.find(x => x.slug === role);
  if (!r) notFound();
  const k = KINDS[r.kind];
  const url = `${BASE}/for/${r.slug}`;
  const guides = r.guides.map(s => GUIDES.find(g => g.slug === s)).filter(Boolean) as typeof GUIDES;
  const others = ROLES.filter(x => x.slug !== r.slug);
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'For teams', item: `${BASE}/for` },
      { '@type': 'ListItem', position: 3, name: r.h1, item: url },
    ],
  };

  return (
    <div className="page rl" style={{ ['--k' as string]: k.tint }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <div className="wrap">
        <Crumbs trail={[{ label: 'Home', href: '/' }, { label: 'For teams', href: '/for' }, { label: r.h1 }]} />
      </div>

      <header className="wrap rl-hero">
        <div>
          <p className="gd-eyebrow"><span className="kind" style={{ ['--k' as string]: k.tint }}><Face id={k.face} size={22} />For {r.role}</span></p>
          <h1>{r.h1}</h1>
          <p className="answer">{rich(r.answer[0])} {rich(r.answer[1])}</p>
          <div className="hero-cta">
            <Cta page={r.slug} place="hero" campaign="seo-role" ask={r.example.ask}>Build the example with Captain</Cta>
            <span className="hero-note">Free to start with 2,000 credits</span>
          </div>
          <p className="gd-by">By the 50agents team · Last updated {longDate(r.updated)}</p>
        </div>
      </header>

      <section className="wrap band" id="jobs">
        <div className="sec-head">
          <h2>The 5 jobs {r.role} hand off first</h2>
          <p>Each one is something 50agents builds today from one sentence to Captain. Copy the words, or open the page for the job.</p>
        </div>
        <ol className="rl-jobs">
          {r.jobs.map(j => (
            <li key={j.title}>
              <div className="rl-job-h">
                <span className="rl-k" style={{ ['--k' as string]: KINDS[j.kind].tint }}><Face id={KINDS[j.kind].face} size={18} />{KINDS[j.kind].label}</span>
                <h3>{j.href ? <MaybeLink href={j.href}>{j.title}</MaybeLink> : j.title}</h3>
              </div>
              <p>{rich(j.body)}</p>
              {j.ask && <CopyAsk text={j.ask} small />}
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap band" id="example">
        <div className="rl-ex">
          <div className="rl-ex-copy">
            <h2>{r.example.h2}</h2>
            <p>{rich(r.example.intro)}</p>
            <CopyAsk text={r.example.ask} />
            {r.example.after.map(a => <p key={a}>{rich(a)}</p>)}
            <div className="inline-cta"><Cta page={r.slug} place="inline" campaign="seo-role" ask={r.example.ask}>Build this with Captain</Cta></div>
          </div>
          <div className="rl-ex-view"><ProductView view={r.example.view} caption={r.example.caption} /></div>
        </div>
      </section>

      <section className="wrap band" id="use-cases">
        <div className="sec-head"><h2>Use cases that fit</h2></div>
        <div className="related">
          {r.useCases.map(u => (
            <MaybeLink key={u.href} href={u.href} className="rel">
              <span className="rel-k"><Face id={KINDS[u.kind].face} size={18} />{KINDS[u.kind].label}</span>
              <b>{u.title}</b>
              <span>{u.line}</span>
            </MaybeLink>
          ))}
        </div>
      </section>

      <section className="wrap band" id="apps">
        <div className="sec-head"><h2>Apps {r.role} connect</h2><p>{rich(r.appsNote)}</p></div>
        <div className="rl-apps">
          {r.apps.map(a => (
            <MaybeLink key={a.slug} href={`/integrations/${a.slug}`} className="rl-app">
              <span className="use-logo"><AppLogo app={a.slug} icon={a.icon} size={26} /></span>
              <span><b>{a.name}</b><span>{a.line}</span></span>
            </MaybeLink>
          ))}
        </div>
      </section>

      <section className="wrap band" id="not-yet">
        <div className="limits">
          <h2>What it does not do yet</h2>
          <ul>{r.notYet.map(n => <li key={n}>{rich(n)}</li>)}</ul>
        </div>
      </section>

      {guides.length > 0 && (
        <section className="wrap band" id="guides">
          <div className="sec-head"><h2>Guides for {r.role}</h2><p>The method behind each job, for any tool.</p></div>
          <div className="gd-more">
            {guides.map(g => (
              <MaybeLink key={g.slug} href={`/guides/${g.slug}`} className="rel">
                <span className="rel-k"><Face id={KINDS[g.kind].face} size={18} />Guide · {g.group}</span>
                <b>{g.h1}</b>
                <span>{plain(g.short).split('. ')[0]}.</span>
              </MaybeLink>
            ))}
          </div>
        </section>
      )}

      <section className="wrap band narrow" id="questions">
        <h2>Questions people ask</h2>
        <div className="faqs">
          {r.faqs.map(f => (
            <details key={f.q} open>
              <summary><h3>{f.q}</h3></summary>
              <p>{rich(f.a)}</p>
            </details>
          ))}
        </div>
        {r.sources && <p className="src">Sources: {r.sources.map((s, i) => <span key={s.href}>{i ? ' · ' : ''}<a href={s.href} target="_blank" rel="noopener">{s.label}</a></span>)}, read 19 Nov 2026.</p>}
      </section>

      <section className="wrap band" id="other-teams">
        <h2>For other teams</h2>
        <p className="rl-others">{others.map((o, i) => <span key={o.slug}>{i ? ' · ' : ''}<MaybeLink href={`/for/${o.slug}`}>{o.role[0].toUpperCase() + o.role.slice(1)}</MaybeLink></span>)}</p>
        <p className="also">Also: <MaybeLink href="/for">All teams</MaybeLink> · <MaybeLink href="/use-cases">Use cases</MaybeLink> · <MaybeLink href="/guides">Guides</MaybeLink> · <MaybeLink href="/integrations">Integrations</MaybeLink></p>
      </section>

      <section className="wrap">
        <div className="final">
          <h2>Hand off the first job</h2>
          <p>Tell Captain &ldquo;{r.example.ask}&rdquo;. It shows you the plan before it builds anything. Every workspace starts free with 2,000 credits.</p>
          <Cta page={r.slug} place="final" campaign="seo-role" ask={r.example.ask} />
          <span className="peek l" aria-hidden="true"><Face id="lead" size={50} /><Face id={k.face} size={44} /></span>
          <span className="peek r" aria-hidden="true"><Face id="closer" size={46} /><Face id="scout" size={48} /></span>
        </div>
        <p className="byline">By the 50agents team · Last updated {longDate(r.updated)} · Captain builds each job above from the words shown; the view is drawn from the 50agents app&rsquo;s own screens and filled with example data.</p>
      </section>

      <div className="sticky"><span>{r.h1}</span><Cta page={r.slug} place="sticky" campaign="seo-role" ask={r.example.ask}>Build it</Cta></div>
    </div>
  );
}
