// An index page, v3 (D253, D254): the heading and one short line, then each group under a centred head as link cards
// (`cards3`), then one button with a real ask. /use-cases shows every card under kind chips (KindFilter). No date is shown;
// `updated` goes to JSON-LD only. Children not built yet are left out, never shown as dead cards.
import type { IndexPage } from '@/content/pages/indexes';
import { INDEX_ASK } from '@/content/pages/indexes';
import { Crumbs, Cta, Face, KINDS, LIVE, KindFace } from '../parts';
import { crumbsLd, Ld } from '../hubs/meta';
import { KindFilter } from './kind-filter';
import type { Card } from '@/content/pages/indexes';
import '../css/usecase.css';
import '../css/hubs.css';
import '../css/pages.css';

export function IndexView({ ix }: { ix: IndexPage }) {
  const groups = ix.groups.map(g => ({ ...g, cards: g.cards.filter(c => LIVE.has(c.href)) })).filter(g => g.cards.length);
  const page = `index-${ix.path.slice(1)}`;
  return (
    <div className="page uc3 ix3">
      <Ld data={[crumbsLd([{ name: 'Home' }, { name: ix.crumb, path: ix.path }]), {
        '@context': 'https://schema.org', '@type': 'CollectionPage', name: ix.h1, description: ix.description, url: `https://50agents.com${ix.path}`, dateModified: ix.updated,
      }]} />
      <div className="wrap"><Crumbs trail={[{ label: 'Home', href: '/' }, { label: ix.crumb }]} /></div>
      <section className="wrap ix3-hero">
        <h1>{ix.h1}</h1>
        <p>{ix.line}</p>
      </section>
      {ix.filter ? (
        <section className="wrap sec ixf" aria-label={ix.crumb}>
          <KindFilter kinds={[...new Set(groups.flatMap(g => g.cards.map(c => c.kind!)))]}>
            {groups.flatMap(g => g.cards).map(c => <CardLink key={c.href} c={c} />)}
          </KindFilter>
        </section>
      ) : groups.map((g, n) => (
        <section key={g.head ?? n} className={n === 0 ? 'wrap sec ix3-first' : 'wrap sec'} aria-label={g.head ?? ix.crumb}>
          {g.head && <div className="sec-h c"><h2>{g.head}</h2>{g.p && <p>{g.p}</p>}</div>}
          <div className={`cards3 hub3-n${Math.min(g.cards.length, 3)}`}>
            {g.cards.map(c => <CardLink key={c.href} c={c} />)}
          </div>
        </section>
      ))}
      <section className="wrap sec">
        <div className="final" style={{ ['--k' as string]: '#FFF4D6' }}>
          <h2>Not sure where to start?</h2>
          <p>One sentence to Captain. Free to start.</p>
          <Cta campaign="seo-index" page={page} place="final" ask={INDEX_ASK}>Ask Captain</Cta>
          <span className="peek l" aria-hidden="true"><Face id="writer" size={52} /><Face id="keeper" size={44} /></span>
          <span className="peek r" aria-hidden="true"><Face id="lead" size={50} /><Face id="scout" size={46} /></span>
        </div>
      </section>
    </div>
  );
}

function CardLink({ c }: { c: Card }) {
  return (
    <a href={c.href} data-kind={c.kind}>
      {c.kind && <span className="k"><KindFace kind={c.kind} size={20} />{KINDS[c.kind].label}</span>}
      <b>{c.title}</b>
      {c.line && <span>{c.line}</span>}
    </a>
  );
}
