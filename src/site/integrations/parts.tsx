// The integration family's pieces, v3 round 4 (D258): the hero lockup, the four kinds as link cards, triggers and actions
// as two columns that scroll inside themselves, templates in a box that fits its rows up to a cap, pairing cards, questions, the final block, and the
// directory panel. Visible copy says "templates" (the 50agents app's word); the code keeps the catalog's name, recipe.
import { AppLogo, Face, KINDS, MaybeLink } from '@/site/parts';
import { BuildLink } from './build-link';
import { CatPick, Directory, EventBoard, ListBox } from './boxes';
import { CATEGORIES } from '@/content/integrations/categories';
import { findPair, iconOf, nameOf, pairPath, plainDesc, recipeAsk, recipeClause, type AppFile, type Event, type Recipe } from './data';
import type { IntegrationPage } from './types';
import { plainEvent } from './words';

export const BASE = 'https://50agents.com';
export type Campaign = 'seo-integration' | 'seo-pair' | 'seo-category' | 'seo-index';
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function Logo({ slug, size = 28, eager }: { slug: string; size?: number; eager?: boolean }) {
  const icon = iconOf(slug);
  return icon ? <AppLogo app={slug} icon={icon} size={size} eager={eager} /> : <span className="ig-nologo" style={{ width: size, height: size }} aria-hidden="true">{nameOf(slug).charAt(0)}</span>;
}

/** The hero's lockup: the app's logo, or two apps' logos joined. No 50agents wordmark (D255 round 3): the header carries
 *  it, and the H1 or the line under the chat box names 50agents. */
export function Lockup({ apps }: { apps: string[] }) {
  return (
    <p className="ig3-lock" aria-hidden="true">
      {apps.map((a, i) => <span key={a} className="ig3-lock-logo">{i > 0 && <i className="ig3-lock-and" />}<Logo slug={a} size={40} eager /></span>)}
    </p>
  );
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
              {k.useCase && <MaybeLink href={`/use-cases/${k.useCase}`} className="ig3-kind-more">See the use case</MaybeLink>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ---- triggers and actions: two columns, each scrolling inside itself (D258); templates in a capped box ----
/** One trigger or action: its name in plain words and one line, the catalog's own description. The whole description is
 *  in the HTML; CSS shows two lines. */
function evLine(e: Event, app: string) {
  return plainDesc(e.d).trim() || (e.t === 'trigger' ? `Starts the work when it happens in ${app}.` : `Runs as a step in ${app}.`);
}
function EvCol({ word, events, app }: { word: 'Triggers' | 'Actions'; events: Event[]; app: AppFile }) {
  return (
    <div className="ig5-col" data-col="">
      <div className="ig5-col-h"><h3>{word}</h3><span className="ig5-count" data-n="">{events.length}</span></div>
      <div className="ig5-scroll" data-scroll="" tabIndex={0} role="region" aria-label={`${app.name} ${word.toLowerCase()}`}>
        <ul className="ig5-items">
          {events.map((e, i) => {
            const name = plainEvent(e.n, app.name), line = evLine(e, app.name);
            return <li key={`${i}-${e.n}`} data-q={`${name} ${line} ${app.name}`.toLowerCase()}><b>{name}</b><span>{line}</span></li>;
          })}
        </ul>
        <p className="ig5-none" data-none="" hidden>No {word.toLowerCase()} match.</p>
      </div>
    </div>
  );
}
/** One app's two columns: triggers on the left, actions on the right; the longer list gets the wider column. */
function EvBoard({ app, hidden }: { app: AppFile; hidden?: boolean }) {
  const t = app.events.filter(e => e.t === 'trigger'), a = app.events.filter(e => e.t === 'action');
  const cls = !t.length || !a.length ? 'ig5-cols one' : t.length > a.length ? 'ig5-cols tl' : 'ig5-cols';
  return (
    <div className={cls} data-board={app.slug} hidden={hidden}>
      {t.length > 0 && <EvCol word="Triggers" events={t} app={app} />}
      {a.length > 0 && <EvCol word="Actions" events={a} app={app} />}
    </div>
  );
}

/** data-gate="skip": the lists are shared catalog data, so the uniqueness gate leaves them out (brief D7). */
/** An app's triggers and actions: two columns, one search. */
export function EventsBox({ app }: { app: AppFile }) {
  return (
    <div data-gate="skip">
      <EventBoard search="Search triggers and actions"><EvBoard app={app} /></EventBoard>
    </div>
  );
}

/** A pair's triggers and actions: every one of both apps (D255 round 3), the same two columns per app, an app switcher
 *  above them and one search across both apps. */
export function PairEventsBox({ a, b }: { a: AppFile; b: AppFile }) {
  const apps = [a, b].filter(x => x.events.length > 0);
  return (
    <div data-gate="skip">
      <EventBoard search="Search both apps" apps={apps.map(x => ({ key: x.slug, name: x.name, label: <><Logo slug={x.slug} size={22} /><span>{x.name}</span></> }))}>
        {apps.map((x, i) => <EvBoard key={x.slug} app={x} hidden={i > 0} />)}
      </EventBoard>
    </div>
  );
}

/** Templates: the two apps, the template in a sentence, one "Build this" that pastes its ask; in the same scrolling box. */
export function TemplatesBox({ recipes, page, campaign, search }: { recipes: Recipe[]; page: string; campaign: Campaign; search?: string }) {
  const per = 8;
  return (
    <ListBox tabs={[{ key: 'templates', label: 'Templates' }]} per={per} fixed={recipes.length > per} search={recipes.length > per ? search : undefined} empty="No template matches">
      <ul className="ig4-items ig4-tpls" data-panel="templates">
        {recipes.map((r, i) => {
          const line = cap(recipeClause(r, nameOf));
          return (
            <li key={i} data-q={`${line} ${nameOf(r.ta)} ${nameOf(r.aa)}`.toLowerCase()} hidden={i >= per}>
              <span className="ig4-tpl-logos"><Logo slug={r.ta} size={26} /><Logo slug={r.aa} size={26} /></span>
              <p>{line}</p>
              <BuildLink page={page} place={`template-${i + 1}`} campaign={campaign} ask={recipeAsk(r, nameOf)} className="btn sm ghost">Build this</BuildLink>
            </li>
          );
        })}
      </ul>
    </ListBox>
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
            <span>{r ? `${cap(recipeClause(r, nameOf))}.` : `Templates for ${nameOf(me)} and ${nameOf(o)}.`}</span>
          </>
        );
        return f ? <a key={me + o} href={pairPath(f.pair)}>{body}</a> : <MaybeLink key={me + o} href={`/integrations/${o}`}>{body}</MaybeLink>;
      })}
    </div>
  );
}

export function Questions({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <div className="qa uc3-qa">
      {faqs.map((f, n) => (
        <details key={f.q} open={n === 0}>
          <summary><h3>{f.q}</h3><i aria-hidden="true" /></summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}

/** The last block: the page's ask, one button, the crew peeking in. No byline and no date (D254). */
export function Final({ h2, p, ask, page, campaign, button = 'Build it with Captain' }: { h2: string; p: React.ReactNode; ask: string; page: string; campaign: Campaign; button?: string }) {
  return (
    <section className="wrap sec">
      <div className="final">
        <h2>{h2}</h2>
        <p>{p}</p>
        <BuildLink page={page} place="final" campaign={campaign} ask={ask}>{button}</BuildLink>
        <span className="peek l" aria-hidden="true"><Face id="keeper" size={52} /><Face id="closer" size={44} /></span>
        <span className="peek r" aria-hidden="true"><Face id="lead" size={50} /><Face id="sorter" size={46} /></span>
      </div>
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

/** The directory panel (like viaSocket's own A to Z): the categories down the left (a select on a phone), and the apps as
 *  a hairline grid with one search and "Load more" (D258). Every app is in the HTML; the rest are only hidden. */
export const DIR_PER = 48;
export function DirectoryPanel({ apps, current, head, label }: { apps: { s: string; n: string }[]; current: string; head: React.ReactNode; label: string }) {
  const cats = [{ href: '/integrations', name: 'All apps' }, ...CATEGORIES.map(c => ({ href: `/integrations/category/${c.slug}`, name: c.name }))];
  return (
    <div className="ig4-dir" id="apps">
      <aside className="ig4-side">
        <CatPick cats={cats} current={current} />
        <nav aria-label="Categories">
          <ul>{cats.map(c => <li key={c.href}><MaybeLink href={c.href} className={c.href === current ? 'on' : undefined}>{c.name}</MaybeLink></li>)}</ul>
        </nav>
      </aside>
      <Directory per={DIR_PER} label={label} head={head}>
        <ul className="ig4-grid">
          {apps.map((a, i) => (
            <li key={a.s} data-app="" data-q={`${a.n} ${a.s}`.toLowerCase()} hidden={i >= DIR_PER}>
              <a href={`/integrations/${a.s}`}><Logo slug={a.s} size={28} /><b>{a.n}</b></a>
            </li>
          ))}
        </ul>
      </Directory>
    </div>
  );
}
