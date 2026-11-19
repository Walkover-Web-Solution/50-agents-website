// A glossary page, v3 (D253): one template, filled from the term's JSON (src/content/learn/pages), written by the page
// pipeline. Short: the definition in large type, one real ask typed into Captain with its plan, a small two-column
// comparison with the term people confuse it with, and three reads. Every visual is a shared, data-driven component.
import type { TermPage } from './types';
import type { UseCasePage } from '../usecase/types';
import { PAGES } from '@/content/use-cases/pages';
import { Crumbs, Cta, Face, KINDS, MaybeLink } from '../parts';
import { StickyBar } from '../sticky';
import { PromptFilm } from '../usecase/film';
import { PlanCard } from '../usecase/plan-card';
import { ReadCard, live } from '../hubs/cards';
import { BASE, crumbsLd, Ld, month } from '../hubs/meta';
import '../css/usecase.css';
import '../css/hubs.css';
import '../css/learn.css';

const ONE: Record<string, string> = { ai: 'an AI agent', auto: 'an automation', browser: 'a browser agent', app: 'an app' };

export function TermView({ t }: { t: TermPage }) {
  const k = KINDS[t.example.kind];
  const page = `learn-${t.slug}`;
  const ask = t.example.ask;
  // PlanCard draws from a use case's kind and build; the example carries exactly those.
  const plan = { kind: t.example.kind, build: t.example.build } as UseCasePage;
  const uc = PAGES.find(u => u.ask === ask);
  const reads = live([...t.links, ...(uc ? [{ label: uc.h1, href: `/use-cases/${uc.slug}` }] : [])]).slice(0, 3);
  return (
    <div className="page uc3 lg3" style={{ ['--k' as string]: k.tint }}>
      <Ld
        data={[
          crumbsLd([{ name: 'Home' }, { name: 'Learn', path: '/learn' }, { name: t.term, path: `/learn/${t.slug}` }]),
          {
            '@context': 'https://schema.org',
            '@type': 'DefinedTerm',
            name: t.term,
            description: t.definition.join(' '),
            url: `${BASE}/learn/${t.slug}`,
            inDefinedTermSet: { '@type': 'DefinedTermSet', name: '50agents glossary', url: `${BASE}/learn` },
          },
        ]}
      />
      <div className="wrap"><Crumbs trail={[{ label: 'Home', href: '/' }, { label: 'Learn', href: '/learn' }, { label: t.term }]} /></div>

      {/* The definition, in large type */}
      <section className="wrap lg3-hero">
        <h1>{t.h1}</h1>
        <p className="lg3-def">{t.definition[0]}</p>
        <p className="lg3-def2">{t.definition[1]}</p>
        {t.sources && <p className="lg3-src">Sources: {t.sources.map((s, i) => <span key={s.href}>{i ? ', ' : ''}<a href={s.href} target="_blank" rel="noopener">{s.label}</a></span>)}.</p>}
      </section>

      {/* One example: a real ask typed into Captain, Captain's plan under it */}
      <section className="wrap sec" id="example">
        <div className="sec-h c"><h2>An example, built in 50agents</h2><p>{t.example.why}</p></div>
        <div className="hero-cta lg3-film">
          <PromptFilm ask={ask} button={<Cta campaign="seo-learn" page={page} place="example" ask={ask}>Build it</Cta>}>
            <PlanCard u={plan} />
          </PromptFilm>
        </div>
      </section>

      {/* How it differs from the term people confuse it with */}
      <section className="wrap sec" id="vs">
        <div className="sec-h c"><h2>{t.term} vs {t.vs.href ? <MaybeLink href={t.vs.href}>{t.vs.term}</MaybeLink> : t.vs.term}</h2></div>
        <div className="lg3-vs">
          <table>
            <thead><tr><th scope="col"><span className="sr">What differs</span></th><th scope="col" className="us">{t.term}</th><th scope="col">{t.vs.term[0].toUpperCase() + t.vs.term.slice(1)}</th></tr></thead>
            <tbody>
              {t.vs.rows.map(r => <tr key={r.label}><th scope="row">{r.label}</th><td className="us">{r.a}</td><td>{r.b}</td></tr>)}
            </tbody>
          </table>
        </div>
      </section>

      {/* Reads */}
      <section className="wrap sec" id="more">
        <div className="sec-h c"><h2>Read next</h2></div>
        <div className={`cards3 hub3-n${Math.min(reads.length, 3)}`}>{reads.map(r => <ReadCard key={r.href} href={r.href} label={r.label} />)}</div>
        <div className="uc3-all"><a className="btn ghost" href="/learn">All glossary terms</a></div>
      </section>

      <section className="wrap sec">
        <div className="final">
          <h2>See {ONE[t.example.kind]} built from one sentence</h2>
          <p>Tell Captain &ldquo;{ask}&rdquo;. Free to start.</p>
          <Cta campaign="seo-learn" page={page} place="final" ask={ask}>Build it with Captain</Cta>
          <span className="peek l" aria-hidden="true"><Face id={k.face} size={52} /><Face id="keeper" size={44} /></span>
          <span className="peek r" aria-hidden="true"><Face id="lead" size={50} /><Face id="rosa" size={46} /></span>
        </div>
        <p className="byline">By the 50agents team · Updated {month(t.updated)}</p>
      </section>

      <StickyBar><span>{t.term}</span><Cta campaign="seo-learn" page={page} place="sticky" ask={ask}>Build it</Cta></StickyBar>
    </div>
  );
}
