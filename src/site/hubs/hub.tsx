// A kind hub, v3 (D253, D254, D255): one template, filled from the hub's JSON (src/content/hubs/pages), written by the page
// pipeline. The hero is the use case page's: a real ask typed into Captain as the subheader and one short line under it.
// Then the four kinds as a bento (this kind leads), the use cases of this kind, "Works with ... 2,300+ apps" over two
// marquee rows, questions, more to read. No date on the page: `updated` goes to JSON-LD only.
import type { HubPage } from './types';
import { PAGES } from '@/content/use-cases/pages';
import { Crumbs, Cta, Face, KindBadge, KINDS } from '../parts';
import { StickyBar } from '../sticky';
import { PromptFilm } from '../usecase/film';
import { KindBento } from './kind-bento';
import { KIND_RULE } from '@/content/hubs/kinds';
import { AppsWall } from './apps-wall';
import { ReadCard, live } from './cards';
import { appLd, crumbsLd, Ld } from './meta';
import '../css/usecase.css';
import '../css/hubs.css';

export function HubView({ h }: { h: HubPage }) {
  const k = KINDS[h.kind];
  const path = `/${h.slug}`;
  const page = `hub-${h.slug}`;
  const ucs = PAGES.filter(u => u.kind === h.kind);
  // The other hubs are in the bento, so "Keep reading" is this hub's own reads.
  const reads = live(h.links).slice(0, 6);

  return (
    <div className="page uc3 hub3" style={{ ['--k' as string]: k.tint }}>
      <Ld data={[crumbsLd([{ name: 'Home' }, { name: h.crumb, path }]), appLd({ name: `50agents: ${h.crumb}`, path, description: h.answer.join(' '), updated: h.updated })]} />
      <div className="wrap"><Crumbs trail={[{ label: 'Home', href: '/' }, { label: h.crumb }]} /></div>

      {/* Hero: the chat box is the subheader (D255), a real ask of this kind; one short line under it */}
      <section className="wrap uc3-hero">
        <KindBadge kind={h.kind} />
        <h1>{h.h1}</h1>
        <PromptFilm ask={h.example.ask} button={<Cta campaign="seo-hub" page={page} place="hero" ask={h.example.ask}>Build it</Cta>} />
        <p className="uc3-note">{h.answer[1]}</p>
      </section>

      {/* Which kind: the four kinds as cards, this kind leading; the others link to their hubs */}
      <section className="wrap sec" id="which-kind">
        <div className="sec-h c"><h2>Which kind do I need?</h2><p>{KIND_RULE}</p></div>
        <KindBento current={h.kind} />
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

      {/* The apps: "Works with ... 2,300+ apps" over two rows, the ones this kind leans on first */}
      <AppsWall apps={h.apps} />

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
      {reads.length > 0 && (
        <section className="wrap sec" id="more">
          <div className="sec-h c"><h2>Keep reading</h2></div>
          <div className={`cards3 hub3-n${Math.min(reads.length, 3)}`}>{reads.map(r => <ReadCard key={r.href} href={r.href} label={r.label} />)}</div>
        </section>
      )}

      {/* Final: the same ask, one button */}
      <section className="wrap sec">
        <div className="final">
          <h2>{h.final}</h2>
          <p>Tell Captain &ldquo;{h.example.ask}&rdquo;. Free to start.</p>
          <Cta campaign="seo-hub" page={page} place="final" ask={h.example.ask}>Build it with Captain</Cta>
          <span className="peek l" aria-hidden="true"><Face id={k.face} size={52} /><Face id="keeper" size={44} /></span>
          <span className="peek r" aria-hidden="true"><Face id="lead" size={50} /><Face id="rosa" size={46} /></span>
        </div>
      </section>

      <StickyBar><span>{h.crumb}</span><Cta campaign="seo-hub" page={page} place="sticky" ask={h.example.ask}>Build it</Cta></StickyBar>
    </div>
  );
}
