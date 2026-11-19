// A kind hub, v3 (D253): one template, filled from the hub's JSON (src/content/hubs/pages), written by the page pipeline.
// The kind in two sentences with a real ask typed into Captain, the "which kind" comparison, the use cases of this kind
// (from the use case pages), the apps wall, questions, more to read. Every visual is a shared, data-driven component.
import type { HubPage } from './types';
import type { UseCasePage } from '../usecase/types';
import { HUBS } from '@/content/hubs';
import { PAGES } from '@/content/use-cases/pages';
import { AppLogo, Crumbs, Cta, Face, KindBadge, KINDS, MaybeLink } from '../parts';
import { StickyBar } from '../sticky';
import { PromptFilm } from '../usecase/film';
import { PlanCard } from '../usecase/plan-card';
import { appIcon, appName } from '../usecase/apps-data';
import { KindTable } from './kind-table';
import { KIND_RULE } from '@/content/hubs/kinds';
import { topApps } from './apps';
import { ReadCard, live } from './cards';
import { appLd, crumbsLd, Ld, month } from './meta';
import '../css/usecase.css';
import '../css/hubs.css';

export function HubView({ h }: { h: HubPage }) {
  const k = KINDS[h.kind];
  const path = `/${h.slug}`;
  const page = `hub-${h.slug}`;
  const ucs = PAGES.filter(u => u.kind === h.kind);
  const wall = topApps(30, h.apps.slugs);
  // PlanCard draws from a use case's kind and build; a hub's example carries exactly those.
  const plan = { kind: h.kind, build: h.example.build } as UseCasePage;
  const reads = [
    ...HUBS.filter(o => o.kind !== h.kind).map(o => ({ href: `/${o.slug}`, label: o.h1 })),
    ...live(h.links),
  ].slice(0, 6);

  return (
    <div className="page uc3 hub3" style={{ ['--k' as string]: k.tint }}>
      <Ld data={[crumbsLd([{ name: 'Home' }, { name: h.crumb, path }]), appLd({ name: `50agents: ${h.crumb}`, path, description: h.answer.join(' '), updated: h.updated })]} />
      <div className="wrap"><Crumbs trail={[{ label: 'Home', href: '/' }, { label: h.crumb }]} /></div>

      {/* Hero: the kind in two sentences, and a real ask of this kind typed into Captain, its plan under it */}
      <section className="wrap uc3-hero">
        <KindBadge kind={h.kind} />
        <h1>{h.h1}</h1>
        <p className="answer">{h.answer[0]} {h.answer[1]}</p>
        <div className="hero-cta hub3-film">
          <PromptFilm ask={h.example.ask} button={<Cta campaign="seo-hub" page={page} place="hero" ask={h.example.ask}>Build it</Cta>}>
            <PlanCard u={plan} />
          </PromptFilm>
        </div>
        <p className="uc3-note">Free to start. Nothing reaches anyone outside your business without your OK.</p>
      </section>

      {/* Which kind: the same comparison on all four hubs, this kind in its tint */}
      <section className="wrap sec" id="which-kind">
        <div className="sec-h c"><h2>Which kind do I need?</h2><p>{KIND_RULE}</p></div>
        <KindTable current={h.kind} />
      </section>

      {/* Use cases of this kind, from the use case pages */}
      {ucs.length > 0 && (
        <section className="wrap sec" id="use-cases">
          <div className="sec-h c"><h2>Ready-made {h.crumb.startsWith('AI') ? h.crumb : h.crumb.toLowerCase()} to start from</h2><p>{h.useCases}</p></div>
          <div className={`cards3 hub3-n${Math.min(ucs.length, 3)}`}>
            {ucs.map(u => (
              <a key={u.slug} href={`/use-cases/${u.slug}`}>
                <span className="k"><Face id={k.face} size={20} />{k.label}</span>
                <b>{u.h1}</b>
                <span>{u.build.name}: {u.build.line}</span>
              </a>
            ))}
          </div>
          <div className="uc3-all"><a className="btn ghost" href="/use-cases">See all use cases</a></div>
        </section>
      )}

      {/* The apps: the ones this kind leans on, large, then the most connected apps in the catalog */}
      <section className="wrap sec" id="apps">
        <div className="sec-h c"><h2>{h.apps.h2}</h2><p>{h.apps.p}</p></div>
        {h.apps.slugs.length > 0 && (
          <div className="uc3-apps">
            {h.apps.slugs.map(a => (
              <MaybeLink key={a} href={`/integrations/${a}`} className="uc3-app"><AppLogo app={a} icon={appIcon(a)} size={44} /><b>{appName(a)}</b></MaybeLink>
            ))}
          </div>
        )}
        <div className="uc3-wall" aria-label="Apps in viaSocket's catalog">
          <div className="uc3-wall-row">
            {[...wall, ...wall].map((a, i) => (
              <span key={a.s + i} className="uc3-tile" title={a.n} aria-hidden={i >= wall.length ? 'true' : undefined}><AppLogo app={a.s} icon={a.i} size={34} /><span className="sr">{a.n}</span></span>
            ))}
          </div>
        </div>
        <p className="uc3-more-apps"><MaybeLink href="/integrations">See all 2,300+ apps</MaybeLink></p>
      </section>

      {/* Questions */}
      <section className="wrap sec" id="questions">
        <div className="sec-h c"><h2>Questions people ask</h2></div>
        <div className="qa uc3-qa">
          {h.faqs.map((f, n) => (
            <details key={f.q} open={n === 0}>
              <summary><h3>{f.q}</h3><i aria-hidden="true" /></summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* The other kinds, and more to read */}
      <section className="wrap sec" id="more">
        <div className="sec-h c"><h2>Keep reading</h2></div>
        <div className="cards3">{reads.map(r => <ReadCard key={r.href} href={r.href} label={r.label} />)}</div>
      </section>

      {/* Final: the same ask, one button */}
      <section className="wrap sec">
        <div className="final">
          <h2>{h.final}</h2>
          <p>Tell Captain &ldquo;{h.example.ask}&rdquo;. Free to start.</p>
          <Cta campaign="seo-hub" page={page} place="final" ask={h.example.ask}>Build it with Captain</Cta>
          <span className="peek l" aria-hidden="true"><Face id={k.face} size={52} /><Face id="keeper" size={44} /></span>
          <span className="peek r" aria-hidden="true"><Face id="lead" size={50} /><Face id="rosa" size={46} /></span>
        </div>
        <p className="byline">By the 50agents team · Updated {month(h.updated)}</p>
      </section>

      <StickyBar><span>{h.crumb}</span><Cta campaign="seo-hub" page={page} place="sticky" ask={h.example.ask}>Build it</Cta></StickyBar>
    </div>
  );
}
