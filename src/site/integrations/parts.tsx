// The integration family's pieces: recipe rows, kind tiles, grouped triggers and actions, pair cards.
import { AppLogo, Face, KINDS, MaybeLink } from '@/site/parts';
import { CopyAsk } from '@/site/copy';
import type { Kind } from '@/site/types';
import { BuildLink } from './build-link';
import { findPair, iconOf, nameOf, pairPath, plainDesc, recipeAsk, type Event, type Recipe } from './data';

export const BASE = 'https://50agents.com';

export function Logo({ slug, size = 28 }: { slug: string; size?: number }) {
  const icon = iconOf(slug);
  return icon ? <AppLogo app={slug} icon={icon} size={size} /> : <span className="ig-nologo" style={{ width: size, height: size }} aria-hidden="true">{nameOf(slug).charAt(0)}</span>;
}

/** One recipe: trigger chip, arrow, action chip, its ask and its own button (Part C, Pair). */
export function RecipeRow({ r, page, place, campaign }: { r: Recipe; page: string; place: string; campaign: 'seo-integration' | 'seo-pair' | 'seo-category' }) {
  const ask = recipeAsk(r, nameOf);
  return (
    <li className="ig-rec">
      <div className="ig-flow">
        <span className="ig-step"><Logo slug={r.ta} size={22} /><span><em>When</em> {r.te} <i>in {nameOf(r.ta)}</i></span></span>
        <span className="ig-arrow" aria-hidden="true">→</span>
        <span className="ig-step"><Logo slug={r.aa} size={22} /><span><em>Do</em> {r.ae} <i>in {nameOf(r.aa)}</i></span></span>
      </div>
      <div className="ig-rec-ask">
        <CopyAsk text={ask} small />
        <BuildLink page={page} place={place} campaign={campaign} ask={ask} className="btn sm">Build this</BuildLink>
      </div>
    </li>
  );
}

export function KindTile({ kind, does, ask, page, campaign = 'seo-integration' }: { kind: Kind; does: string; ask: string; page: string; campaign?: 'seo-integration' | 'seo-pair' }) {
  const k = KINDS[kind];
  return (
    <div className="ig-kind" style={{ ['--k' as string]: k.tint }}>
      <p className="ig-kind-h"><Face id={k.face} size={30} /><MaybeLink href={k.hub}>{k.label}</MaybeLink></p>
      <p className="ig-kind-p">{does}</p>
      <CopyAsk text={ask} small />
      <BuildLink page={page} place={`kind-${kind}`} campaign={campaign} ask={ask} className="ig-kind-go">Build this with Captain →</BuildLink>
    </div>
  );
}

/** A group of an app's events: triggers first, each with its catalog description when it reads as one. */
export function EventGroup({ label, line, events }: { label: string; line?: string; events: Event[] }) {
  const t = events.filter(e => e.t === 'trigger'), a = events.filter(e => e.t === 'action');
  return (
    <div className="ig-group">
      <h3>{label} <span>{t.length ? `${t.length} trigger${t.length > 1 ? 's' : ''}` : ''}{t.length && a.length ? ' · ' : ''}{a.length ? `${a.length} action${a.length > 1 ? 's' : ''}` : ''}</span></h3>
      {line && <p className="ig-group-line">{line}</p>}
      <ul>
        {[...t, ...a].map(e => (
          <li key={e.t + e.n}>
            <span className={`ig-tag ${e.t}`}>{e.t === 'trigger' ? 'When' : 'Do'}</span>
            <span><b>{e.n.replace(/_/g, ' ')}</b>{plainDesc(e.d) && <span className="ig-ev-d">{plainDesc(e.d)}</span>}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PairCard({ me, other, n }: { me: string; other: string; n: number }) {
  const f = findPair(me, other);
  const href = f ? pairPath(f.pair) : `/integrations/${other}`;
  return (
    <MaybeLink href={href} className="ig-pc">
      <span className="ig-pc-logos"><Logo slug={me} size={26} /><i /><Logo slug={other} size={26} /></span>
      <b>{nameOf(me)} and {nameOf(other)}</b>
      <span>{n} recipe{n > 1 ? 's' : ''}</span>
    </MaybeLink>
  );
}

export function Check() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>;
}

export function crumbsLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((x, i) => ({ '@type': 'ListItem', position: i + 1, name: x.name, item: `${BASE}${x.path}` })),
  };
}

export function softwareLd(name: string, path: string, description: string, modified: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: `${BASE}${path}`,
    description,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', description: 'Every workspace starts free with 2,000 credits.' },
    publisher: { '@type': 'Organization', name: '50agents', url: BASE },
    dateModified: modified,
  };
}

export function LdScript({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
