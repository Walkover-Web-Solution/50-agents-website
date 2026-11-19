// The integration family's pieces, v3 (D253): the hero lockup, the four kinds as link cards, the triggers and actions
// as a calm two-column list, recipe rows with one button each, pairing cards, questions and the final block.
// Shared pieces (PromptFilm, PlanCard, the qa accordion, cards, StickyBar) are reused as they are.
import { AppLogo, Face, KINDS, MaybeLink } from '@/site/parts';
import { PlanCard } from '@/site/usecase/plan-card';
import type { UseCasePage } from '@/site/usecase/types';
import { BuildLink } from './build-link';
import { catalog, findPair, iconOf, nameOf, pairPath, plainDesc, recipeAsk, recipeClause, type AppFile, type Event, type Recipe } from './data';
import type { IntegrationPage } from './types';
import { plainEvent } from './words';

export const BASE = 'https://50agents.com';
export type Campaign = 'seo-integration' | 'seo-pair' | 'seo-category' | 'seo-index';
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const month = (iso: string) => new Date(iso + 'T00:00:00Z').toLocaleDateString('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' });

export function Logo({ slug, size = 28 }: { slug: string; size?: number }) {
  const icon = iconOf(slug);
  return icon ? <AppLogo app={slug} icon={icon} size={size} /> : <span className="ig-nologo" style={{ width: size, height: size }} aria-hidden="true">{nameOf(slug).charAt(0)}</span>;
}

/** The hero's lockup: the app's logo (or two apps' logos) beside the 50agents wordmark. */
export function Lockup({ apps }: { apps: string[] }) {
  return (
    <p className="ig3-lock" aria-hidden="true">
      {apps.map((a, i) => <span key={a} className="ig3-lock-logo">{i > 0 && <i className="ig3-lock-and" />}<Logo slug={a} size={40} /></span>)}
      <span className="ig3-lock-plus">+</span>
      <span className="wm-w ig3-lock-wm">5<Face id="keeper" size={26} />agents</span>
    </p>
  );
}

/** Captain's plan under the hero's prompt: the shared PlanCard, fed only the fields it reads (kind and build). */
export function HeroPlan({ build }: { build: IntegrationPage['build'] }) {
  return <PlanCard u={{ kind: 'auto', build } as unknown as UseCasePage} />;
}

/** The four kinds on this app, as cards: the job, two sentences, one button with its ask, and its use case if there is one. */
export function KindCards({ kinds, page, campaign }: { kinds: IntegrationPage['kinds'] | { kind: IntegrationPage['kinds'][number]['kind']; title: string; body: string; ask: string; useCase?: string }[]; page: string; campaign: Campaign }) {
  return (
    <div className={kinds.length === 1 ? 'ig3-kinds one' : 'ig3-kinds'}>
      {kinds.map(k => {
        const K = KINDS[k.kind];
        return (
          <div key={k.kind + k.title} className="ig3-kind" style={{ ['--k' as string]: K.tint }}>
            <span className="ig3-kind-k"><span className="ig3-kind-face"><Face id={K.face} size={22} /></span>{K.label}</span>
            <h3>{k.title}</h3>
            <p>{k.body}</p>
            <div className="ig3-kind-go">
              <BuildLink page={page} place={`kind-${k.kind}`} campaign={campaign} ask={k.ask} className="btn sm ghost">Build this</BuildLink>
              {k.useCase && <MaybeLink href={`/use-cases/${k.useCase}`} className="ig3-kind-more">How it works</MaybeLink>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

const SHOW = 8;
/** One trigger or action: its name in plain words and, under it, the catalog's own description when it reads as one. */
function Ev({ e, app }: { e: Event; app: string }) {
  const d = plainDesc(e.d);
  return <li><b>{plainEvent(e.n, app)}</b>{d && <span>{d}</span>}</li>;
}
function EventCol({ head, events, app }: { head: React.ReactNode; events: Event[]; app: string }) {
  if (!events.length) return null;
  const first = events.slice(0, SHOW), rest = events.slice(SHOW);
  return (
    <div className="ig3-col">
      <p className="ig3-col-h">{head}</p>
      <ul>{first.map(e => <Ev key={e.t + e.n} e={e} app={app} />)}</ul>
      {rest.length > 0 && (
        <details className="ig3-more">
          <summary>{rest.length} more</summary>
          <ul>{rest.map(e => <Ev key={e.t + e.n} e={e} app={app} />)}</ul>
        </details>
      )}
    </div>
  );
}

/** A pair's steps: the triggers and actions its recipes use, each app in its own column with the catalog's descriptions. */
export function PairEvents({ a, b, recipes }: { a: AppFile; b: AppFile; recipes: Recipe[] }) {
  const used = (app: AppFile) => {
    const names = new Set(recipes.flatMap(r => [r.ta === app.slug ? r.te : '', r.aa === app.slug ? r.ae : ''].filter(Boolean)));
    return app.events.filter(e => names.has(e.n)).sort((x, y) => Number(y.t === 'trigger') - Number(x.t === 'trigger'));
  };
  return (
    <div className="ig3-cols ig3-pair-evs">
      {[a, b].map(app => <EventCol key={app.slug} head={<><Logo slug={app.slug} size={22} />{app.name}</>} events={used(app)} app={app.name} />)}
    </div>
  );
}

/** Triggers and actions, grouped by what they act on: the group and its plain-words line, then what starts the work and what it can do. */
export function EventGroups({ groups, app }: { groups: IntegrationPage['groups']; app: AppFile }) {
  const by = new Map(app.events.map(e => [e.n, e]));
  return (
    <div className="ig3-groups">
      {groups.map(g => {
        const evs = g.events.map(n => by.get(n)).filter((e): e is Event => !!e);
        const t = evs.filter(e => e.t === 'trigger'), a = evs.filter(e => e.t === 'action');
        if (!evs.length) return null;
        return (
          <section key={g.label} className="ig3-group">
            <div className="ig3-group-h"><h3>{g.label}</h3>{g.line && <p>{g.line}</p>}</div>
            <div className={t.length && a.length ? 'ig3-cols' : 'ig3-cols one'}>
              <EventCol head="Starts the work when" events={t} app={app.name} />
              <EventCol head="Can do" events={a} app={app.name} />
            </div>
          </section>
        );
      })}
    </div>
  );
}

/** Recipe rows: the two apps, the recipe in a sentence, and one "Build this" that pastes its ask. */
export function RecipeRows({ recipes, page, campaign, more }: { recipes: Recipe[]; page: string; campaign: Campaign; more?: Recipe[] }) {
  const row = (r: Recipe, i: number) => (
    <li key={i}>
      <span className="ig3-rec-logos"><Logo slug={r.ta} size={28} /><Logo slug={r.aa} size={28} /></span>
      <p>{cap(recipeClause(r, nameOf))}</p>
      <BuildLink page={page} place={`recipe-${i + 1}`} campaign={campaign} ask={recipeAsk(r, nameOf)} className="btn sm ghost">Build this</BuildLink>
    </li>
  );
  return (
    <>
      <ul className="ig3-recs">{recipes.map(row)}</ul>
      {more && more.length > 0 && (
        <details className="ig3-recs-more">
          <summary>See {more.length} more recipes</summary>
          <ul className="ig3-recs">{more.map((r, i) => row(r, recipes.length + i))}</ul>
        </details>
      )}
    </>
  );
}

/** The first recipe between two apps, for a pairing card's line. */
export const firstRecipe = (recipes: Recipe[], me: string, o: string) => recipes.find(x => (x.ta === me && x.aa === o) || (x.ta === o && x.aa === me));

/** Pairing cards: the two logos, the pair's name and its first recipe, linked to the pair page. */
export function PairCards({ items }: { items: { me: string; other: string; recipe?: Recipe }[] }) {
  return (
    <div className="cards3 ig3-pairs">
      {items.map(({ me, other: o, recipe: r }) => {
        const f = findPair(me, o);
        const body = (
          <>
            <span className="ig3-pair-logos"><Logo slug={me} size={30} /><i /><Logo slug={o} size={30} /></span>
            <b>{nameOf(me)} and {nameOf(o)}</b>
            <span>{r ? `${cap(recipeClause(r, nameOf))}.` : `Recipes between ${nameOf(me)} and ${nameOf(o)}.`}</span>
          </>
        );
        return f ? <a key={me + o} href={pairPath(f.pair)}>{body}</a> : <MaybeLink key={me + o} href={`/integrations/${o}`}>{body}</MaybeLink>;
      })}
    </div>
  );
}

export function Questions({ faqs, sources }: { faqs: { q: string; a: string }[]; sources?: { label: string; href: string }[] }) {
  return (
    <>
      <div className="qa uc3-qa">
        {faqs.map((f, n) => (
          <details key={f.q} open={n === 0}>
            <summary><h3>{f.q}</h3><i aria-hidden="true" /></summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
      {sources && sources.length > 0 && (
        <p className="uc3-src">From their own pages: {sources.map((x, i) => <span key={x.href}>{i ? ', ' : ''}<a href={x.href} target="_blank" rel="noopener">{x.label}</a></span>)}.</p>
      )}
    </>
  );
}

/** The last block: the page's ask, one button, the crew peeking in; then the one byline. */
export function Final({ h2, p, ask, page, campaign, updated, button = 'Build it with Captain' }: { h2: string; p: React.ReactNode; ask: string; page: string; campaign: Campaign; updated: string; button?: string }) {
  return (
    <section className="wrap sec">
      <div className="final">
        <h2>{h2}</h2>
        <p>{p}</p>
        <BuildLink page={page} place="final" campaign={campaign} ask={ask}>{button}</BuildLink>
        <span className="peek l" aria-hidden="true"><Face id="keeper" size={52} /><Face id="closer" size={44} /></span>
        <span className="peek r" aria-hidden="true"><Face id="lead" size={50} /><Face id="sorter" size={46} /></span>
      </div>
      <p className="byline">By the 50agents team · Updated {month(updated)}</p>
    </section>
  );
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
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', description: 'Free to start.' },
    publisher: { '@type': 'Organization', name: '50agents', url: BASE },
    dateModified: modified,
  };
}

export function LdScript({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

/** The categories as link cards: the three best-connected apps' logos and the name. */
export function CategoryCards({ cats }: { cats: { slug: string; name: string }[] }) {
  return (
    <div className="ig3-cats">
      {cats.map(c => {
        const top = catalog().apps.filter(a => a.c.includes(c.slug) && a.i).slice(0, 3);
        return (
          <MaybeLink key={c.slug} href={`/integrations/category/${c.slug}`} className="ig3-cat">
            <span className="ig3-cat-logos">{top.map(a => <Logo key={a.s} slug={a.s} size={28} />)}</span>
            <b>{c.name}</b>
          </MaybeLink>
        );
      })}
    </div>
  );
}

/** A calm grid of app tiles (logo and name), each findable by the search (data-app). */
export function AppGrid({ apps }: { apps: { s: string; n: string }[] }) {
  return (
    <ul className="ig3-grid">
      {apps.map(a => (
        <li key={a.s} data-app={`${a.n} ${a.s}`.toLowerCase()}>
          <a href={`/integrations/${a.s}`}><Logo slug={a.s} size={32} /><b>{a.n}</b></a>
        </li>
      ))}
    </ul>
  );
}
