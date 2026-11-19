// The integration family's pieces, v3 round 5 (D260): the hero lockup, the four kinds as link cards, triggers and actions
// as two equal columns that each grow with "Load more", templates that grow with "Load more", a pair's "in practice" cards,
// pairing cards, questions, the final block, and the directory panel with numbered pages. Nothing scrolls inside itself. Visible copy says "templates" (the 50agents app's word); the code keeps the catalog's name, recipe.
import { AppLogo, Face, KINDS, MaybeLink, KindFace } from '@/site/parts';
import { BuildLink } from './build-link';
import { CatPick, Directory, EventBoard, ListBox } from './boxes';
import { CATEGORIES } from '@/content/integrations/categories';
import { findPair, iconOf, nameOf, pairIndexable, pairPath, plainDesc, recipeAsk, recipeClause, type AppFile, type Event, type Recipe } from './data';
import type { IntegrationPage, PairLines } from './types';
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
            <span className="ig3-kind-k"><span className="ig3-kind-face"><KindFace kind={k.kind} size={22} /></span>{K.label}</span>
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

// ---- triggers and actions: two equal columns, each with its own "Load more" (D260); templates the same ----
const EV_PER = 5; // Jii, round 6: "show like 5 rows at once"
/** One trigger or action: its name in plain words and one line, the catalog's own description. The whole description is
 *  in the HTML; CSS shows two lines. */
function evLine(e: Event, app: string) {
  return plainDesc(e.d).trim() || (e.t === 'trigger' ? `Starts the work when it happens in ${app}.` : `Runs as a step in ${app}.`);
}
function EvCol({ word, events, app }: { word: 'Triggers' | 'Actions'; events: Event[]; app: AppFile }) {
  return (
    <div className="ig5-col" data-col={word.toLowerCase()} role="region" aria-label={`${app.name} ${word.toLowerCase()}`}>
      <div className="ig5-col-h"><h3>{word}</h3><span className="ig5-count" data-n="">{events.length}</span></div>
      <ul className="ig5-items">
        {events.map((e, i) => {
          const name = plainEvent(e.n, app.name), line = evLine(e, app.name);
          return <li key={`${i}-${e.n}`} data-q={`${name} ${line} ${app.name}`.toLowerCase()} hidden={i >= EV_PER}><b>{name}</b><span>{line}</span></li>;
        })}
      </ul>
      <p className="ig5-none" data-none="" hidden>No {word.toLowerCase()} match.</p>
      <div className="ig5-more" data-more="" hidden={events.length <= EV_PER}><button type="button" className="btn sm ghost">Load more {word.toLowerCase()}</button></div>
    </div>
  );
}
/** One app's two equal columns: triggers on the left, actions on the right. */
function EvBoard({ app, hidden }: { app: AppFile; hidden?: boolean }) {
  const t = app.events.filter(e => e.t === 'trigger'), a = app.events.filter(e => e.t === 'action');
  const cls = !t.length || !a.length ? 'ig5-cols one' : 'ig5-cols';
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
      <EventBoard search="Search triggers and actions" per={EV_PER}><EvBoard app={app} /></EventBoard>
    </div>
  );
}

/** A pair's triggers and actions: every one of both apps (D255 round 3), the same two columns per app, an app switcher
 *  above them and one search across both apps. */
export function PairEventsBox({ a, b }: { a: AppFile; b: AppFile }) {
  const apps = [a, b].filter(x => x.events.length > 0);
  return (
    <div data-gate="skip">
      <EventBoard search="Search both apps" per={EV_PER} apps={apps.map(x => ({ key: x.slug, name: x.name, label: <><Logo slug={x.slug} size={22} /><span>{x.name}</span></> }))}>
        {apps.map((x, i) => <EvBoard key={x.slug} app={x} hidden={i > 0} />)}
      </EventBoard>
    </div>
  );
}

/** Templates: the two apps, the template in a sentence, one "Build this" that pastes its ask. Six show, then "Load more"
 *  reveals six more in place (D260). */
export function TemplatesBox({ recipes, page, campaign, search }: { recipes: Recipe[]; page: string; campaign: Campaign; search?: string }) {
  const per = 6;
  return (
    <ListBox tabs={[{ key: 'templates', label: 'Templates' }]} per={per} search={recipes.length > per ? search : undefined} empty="No template matches">
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

/** Pairing cards: the two logos, the pair's name and its first recipe, linked to the pair page when it exists (indexable,
 *  Search S26), otherwise to the other app's page. */
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
        return f && pairIndexable(f.pair) ? <MaybeLink key={me + o} href={pairPath(f.pair)}>{body}</MaybeLink> : <MaybeLink key={me + o} href={`/integrations/${o}`}>{body}</MaybeLink>;
      })}
    </div>
  );
}

/** A pair "in practice" (D260): three short cards in one bordered row, each one fact with a small icon. The lines are the
 *  pair's own (src/content/integrations/pairs), so they stay in the uniqueness gate. */
const PI = {
  use: <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-5a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0-3.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Z" />,
  best: <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" />,
  watch: <path d="M12 4 2.8 19.5h18.4L12 4Zm0 6v4.5m0 2.5v.01" />,
};
export function PracticeCards({ lines }: { lines: PairLines }) {
  const cards: { k: keyof typeof PI; h: string; body: React.ReactNode }[] = [
    { k: 'use', h: 'Used for', body: lines.usedFor },
    { k: 'best', h: 'Best template', body: <><b>{lines.bestTemplate.name}.</b> {lines.bestTemplate.why}</> },
    { k: 'watch', h: 'Watch out', body: lines.watchOut },
  ];
  return (
    <div className="ig6-practice">
      {cards.map(c => (
        <div key={c.k} className="ig6-pc">
          <h3><span className="ig6-pc-i" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{PI[c.k]}</svg></span>{c.h}</h3>
          <p>{c.body}</p>
        </div>
      ))}
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
 *  a hairline grid with one search and numbered pages at the bottom of the box (D260). Every app is in the HTML; the
 *  other pages are only hidden. */
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
      <Directory per={DIR_PER} total={apps.length} label={label} head={head}>
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
