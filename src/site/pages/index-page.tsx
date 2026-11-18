// An index page (pages-brief B9): a heading, two lines and a card for every child. Children not built yet show as text.
import type { IndexPage } from '@/content/pages/indexes';
import { Crumbs, Face, KINDS, LIVE, MaybeLink } from '../parts';
import { crumbsLd, Ld, longDate } from '../hubs/meta';
import '../css/pages.css';

const SIBLINGS: { href: string; label: string }[] = [
  { href: '/use-cases', label: 'Use cases' }, { href: '/guides', label: 'Guides' }, { href: '/compare', label: 'Compare' },
  { href: '/learn', label: 'Learn' }, { href: '/for', label: 'For teams' },
];

export function IndexView({ ix }: { ix: IndexPage }) {
  const all = ix.groups.flatMap(g => g.cards);
  const live = all.filter(c => LIVE.has(c.href)).length;
  return (
    <div className="page">
      <Ld data={crumbsLd([{ name: 'Home' }, { name: ix.crumb, path: ix.path }])} />
      <div className="wrap">
        <Crumbs trail={[{ label: 'Home', href: '/' }, { label: ix.crumb }]} />
        <header className="ix-head">
          <h1>{ix.h1}</h1>
          <p>{ix.lines[0]}</p>
          <p>{ix.lines[1]}</p>
        </header>
        {ix.groups.map((g, n) => (
          <section key={g.head ?? n} className="ix-group" aria-label={g.head ?? ix.crumb}>
            {g.head && <h2>{g.head} <span className="mute" style={{ fontSize: '0.6em' }}>{g.cards.length}</span></h2>}
            <div className="ix-grid">
              {g.cards.map(c => (
                <MaybeLink key={c.href} href={c.href} className="ix-card">
                  {c.kind && <em className="ix-k" style={{ ['--k' as string]: KINDS[c.kind].tint }}><Face id={KINDS[c.kind].face} size={16} />{KINDS[c.kind].label}</em>}
                  <b>{c.title}</b>
                  {c.line && <span>{c.line}</span>}
                </MaybeLink>
              ))}
            </div>
          </section>
        ))}
        <p className="ix-note">{live} of {all.length} pages are up; the rest are on their way and show here without a link until they are. Also: {SIBLINGS.filter(s => s.href !== ix.path).map((s, i) => <span key={s.href}>{i ? ' · ' : ''}<MaybeLink href={s.href}>{s.label}</MaybeLink></span>)}</p>
        <p className="byline">By the 50agents team · Last updated {longDate(ix.updated)}</p>
      </div>
    </div>
  );
}
