// An integration page (pages-brief B3 and B8): one per app in viaSocket's catalog, static HTML from the catalog snapshot.
// The six flagships add their written content (src/content/integrations/flagships); every other app is filled from its data only.
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Crumbs, Face, KINDS, MaybeLink } from '@/site/parts';
import type { Kind } from '@/site/types';
import { FLAGSHIPS } from '@/content/integrations/flagships';
import { CATEGORIES } from '@/content/integrations/categories';
import { BuildLink } from '@/site/integrations/build-link';
import { appIndexable, catalog, groupEvents, loadApp, partnersOf, readDate, topRecipes } from '@/site/integrations/data';
import { BASE, Check, crumbsLd, EventGroup, KindTile, LdScript, Logo, PairCard, RecipeRow, softwareLd } from '@/site/integrations/parts';
import { appWords } from '@/site/integrations/words';
import '@/site/css/integrations.css';

export const dynamicParams = false;
export function generateStaticParams() {
  return catalog().apps.map(a => ({ app: a.s }));
}

// Use cases and guides for apps outside the six flagships that pages-brief B1 and B5 name.
const EXTRA: Record<string, { useCases: { slug: string; kind: Kind; title: string; line: string }[]; guides: { slug: string; title: string }[] }> = {
  'google-calendar': {
    useCases: [{ slug: 'tomorrows-meetings-in-slack', kind: 'ai', title: 'Tomorrow’s meetings in Slack', line: 'An evening brief of your calendar at 18:00.' }],
    guides: [{ slug: 'how-to-get-a-daily-calendar-summary-in-slack', title: 'How to get a daily calendar summary in Slack' }],
  },
};

function meta(slug: string) {
  const app = loadApp(slug)!;
  const f = FLAGSHIPS[slug];
  const t = app.events.filter(e => e.t === 'trigger').length, a = app.events.length - t;
  const title = f?.title ?? (`AI agents, automations and apps for ${app.name}`.length <= 50 ? `AI agents, automations and apps for ${app.name} | 50agents` : `AI agents and automations for ${app.name} | 50agents`);
  const description = f?.description ?? `Connect ${app.name} in 50agents and tell Captain the job. ${t} trigger${t === 1 ? '' : 's'}, ${a} action${a === 1 ? '' : 's'} and ${app.recipes.length} ready recipe${app.recipes.length === 1 ? '' : 's'} from viaSocket’s catalog, each one a copyable ask.`;
  return { app, f, title, description, index: appIndexable({ t, a, r: app.recipes.length }) };
}

export async function generateMetadata({ params }: { params: Promise<{ app: string }> }): Promise<Metadata> {
  const { app: slug } = await params;
  if (!loadApp(slug)) return {};
  const { app, title, description, index } = meta(slug);
  const url = `${BASE}/integrations/${slug}`;
  const h1 = `AI agents, automations and apps for ${app.name}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    robots: { index, follow: true },
    openGraph: { title: h1, description, url, siteName: '50agents', type: 'website' },
    twitter: { card: 'summary_large_image', title: h1, description },
  };
}

export default async function IntegrationPage({ params }: { params: Promise<{ app: string }> }) {
  const { app: slug } = await params;
  if (!loadApp(slug)) notFound();
  const { app, f } = meta(slug);
  const read = catalog().read;
  const words = appWords(app);
  const answer = f?.answer ?? words.answer;
  const kinds = f ? f.kinds : words.kinds;
  const triggers = app.events.filter(e => e.t === 'trigger'), actions = app.events.filter(e => e.t === 'action');
  const byName = new Map(app.events.map(e => [e.n, e]));
  const groups = f
    ? f.groups.map(g => ({ label: g.label, line: g.line, events: g.events.map(n => byName.get(n)!).filter(Boolean) }))
    : groupEvents(app.events).map(g => ({ label: g.label, line: undefined as string | undefined, events: [...g.triggers, ...g.actions] }));
  const recipes = topRecipes(app);
  const shown = recipes.slice(0, 10);
  const partners = partnersOf(app);
  const extra = f ?? EXTRA[slug];
  const cats = CATEGORIES.filter(c => app.categories.includes(c.slug));
  const siblings = catalog().apps.filter(x => x.s !== slug && cats.length && x.c.includes(cats[0].slug) && x.t + x.a >= 5).slice(0, 4);
  const h1 = `AI agents, automations and apps for ${app.name}`;
  const path = `/integrations/${slug}`;
  const heroAsk = f?.heroAsk ?? kinds[0]?.ask;
  const updated = f?.updated ?? read;
  const faqs = [...(f?.faqs ?? []), ...words.faqs];

  return (
    <div className="page ig" style={{ ['--k' as string]: KINDS.auto.tint }}>
      <LdScript data={[crumbsLd([{ name: 'Home', path: '' }, { name: 'Integrations', path: '/integrations' }, { name: app.name, path }]), softwareLd(`50agents for ${app.name}`, path, answer.join(' '), updated)]} />
      <div className="wrap">
        <Crumbs trail={[{ label: 'Home', href: '/' }, { label: 'Integrations', href: '/integrations' }, { label: app.name }]} />
      </div>

      {/* Hero: the app beside 50agents, the answer in two sentences, the button */}
      <section className="wrap hero ig-hero">
        <div className="hero-copy">
          <p className="ig-join"><Logo slug={slug} size={40} /><span className="ig-plus" aria-hidden="true">+</span><span className="ig-50"><Face id="keeper" size={34} /></span><span className="ig-join-t">{app.name} in 50agents</span></p>
          <h1>{h1}</h1>
          <p className="answer">{answer[0]} {answer[1]}</p>
          <div className="hero-cta">
            <BuildLink page={slug} place="hero" campaign="seo-integration" ask={heroAsk} />
            <span className="hero-note">Free to start with 2,000 credits</span>
          </div>
          <ul className="promises">
            <li><Check />Connect {app.name} once</li>
            <li><Check />You approve the plan</li>
            <li><Check />Anything sent outside asks first</li>
          </ul>
        </div>
        <div className="hero-side ig-card">
          <div className="ig-card-in">
            <p className="ig-card-h"><Logo slug={slug} size={30} /><b>{app.name}</b>{app.domain && <span>{app.domain}</span>}</p>
            <dl className="ig-nums">
              <div><dt>Triggers</dt><dd>{triggers.length}</dd></div>
              <div><dt>Actions</dt><dd>{actions.length}</dd></div>
              <div><dt>Recipes</dt><dd>{recipes.length.toLocaleString('en-US')}</dd></div>
              <div><dt>Paired apps</dt><dd>{partners.length.toLocaleString('en-US')}</dd></div>
            </dl>
            {heroAsk && <div className="ig-card-ask"><span>Ask Captain</span><p>&ldquo;{heroAsk}&rdquo;</p></div>}
            <p className="ig-card-src">From viaSocket&rsquo;s catalog of 2,300+ apps, read {readDate(read)}.</p>
          </div>
        </div>
      </section>

      {/* What each of the four kinds would do with this app */}
      <section className="wrap band" id="kinds">
        <div className="sec-head">
          <h2>What you can build on {app.name}</h2>
          <p>Captain picks the kind from what you ask: fixed steps become an automation, judgement makes it an AI agent, websites with no app need a browser agent, and screens and records make an app.</p>
        </div>
        <div className="ig-kinds">
          {kinds.map(k => <KindTile key={k.kind} kind={k.kind} does={k.does} ask={k.ask} page={slug} />)}
        </div>
      </section>

      {/* Triggers and actions, grouped */}
      {app.events.length > 0 && (
        <section className="wrap band" id="triggers-and-actions">
          <div className="sec-head">
            <h2>{app.name} triggers and actions</h2>
            <p>A trigger starts the work (&ldquo;When&rdquo;); an action is something done in {app.name} (&ldquo;Do&rdquo;). These are every one viaSocket lists for {app.name}, grouped by what they act on.</p>
          </div>
          <div className="ig-groups">
            {groups.map(g => <EventGroup key={g.label} label={g.label} line={g.line} events={g.events} />)}
          </div>
          <p className="src">{triggers.length} triggers and {actions.length} actions, as listed in viaSocket&rsquo;s catalog, read {readDate(read)}. Descriptions are the catalog&rsquo;s own.</p>
        </section>
      )}

      {/* Top recipes, each with its own ask and button */}
      {shown.length > 0 && (
        <section className="wrap band" id="recipes">
          <div className="sec-head">
            <h2>Ready-made {app.name} recipes</h2>
            <p>Each one is a real trigger and a real action from the catalog. Copy the ask into Captain, or press Build this to sign up with it typed in.</p>
          </div>
          <ul className="ig-recs">
            {shown.map((r, i) => <RecipeRow key={i} r={r} page={slug} place={`recipe-${i + 1}`} campaign="seo-integration" />)}
          </ul>
          {recipes.length > shown.length && <p className="src">{(recipes.length - shown.length).toLocaleString('en-US')} more recipes are on the pairing pages below.</p>}
        </section>
      )}

      {/* Best pairings */}
      {partners.length > 0 && (
        <section className="wrap band" id="pairings">
          <div className="sec-head">
            <h2>Apps that work with {app.name}</h2>
            <p>The apps with the most recipes alongside {app.name}. Each page lists every recipe between the two.</p>
          </div>
          <div className="ig-pcs">
            {partners.slice(0, 12).map(p => <PairCard key={p.slug} me={slug} other={p.slug} n={p.n} />)}
          </div>
        </section>
      )}

      {/* Breeze, Slackbot, Sidekick: the app's own AI, said plainly */}
      {f?.native && (
        <section className="wrap band" id="native">
          <div className="ig-native">
            <h2>{f.native.head}</h2>
            <p>{f.native.body}</p>
            <p className="ig-better"><b>Where it is better:</b> {f.native.better}</p>
            <p className="src">Sources: {f.native.sources.map((s, i) => <span key={s.href}>{i ? ', ' : ''}<a href={s.href} target="_blank" rel="noopener">{s.label}</a></span>)}, read 19 Nov 2026.</p>
          </div>
        </section>
      )}

      {/* Use cases and guides that use it */}
      {extra && (
        <section className="wrap band" id="use-cases">
          <div className="sec-head"><h2>Use cases and guides with {app.name}</h2></div>
          <div className="related">
            {extra.useCases.map(u => (
              <MaybeLink key={u.slug} href={`/use-cases/${u.slug}`} className="rel">
                <span className="rel-k"><Face id={KINDS[u.kind].face} size={18} />{KINDS[u.kind].label}</span>
                <b>{u.title}</b>
                <span>{u.line}</span>
              </MaybeLink>
            ))}
          </div>
          {extra.guides.length > 0 && (
            <p className="also">Guides: {extra.guides.map((g, i) => <span key={g.slug}>{i ? ' · ' : ''}<MaybeLink href={`/guides/${g.slug}`}>{g.title}</MaybeLink></span>)}</p>
          )}
        </section>
      )}

      {/* Questions */}
      <section className="wrap band narrow" id="questions">
        <h2>Questions about {app.name} in 50agents</h2>
        <div className="faqs">
          {faqs.map(x => (
            <details key={x.q} open>
              <summary><h3>{x.q}</h3></summary>
              <p>{x.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Related: up to the A to Z and categories, across to siblings */}
      <section className="wrap band" id="related">
        <h2>Related</h2>
        {siblings.length > 0 && (
          <div className="ig-sibs">
            {siblings.map(s => (
              <MaybeLink key={s.s} href={`/integrations/${s.s}`} className="ig-tile">
                <Logo slug={s.s} size={28} /><b>{s.n}</b>
              </MaybeLink>
            ))}
          </div>
        )}
        <p className="also">
          Up: <MaybeLink href="/integrations">All integrations, A to Z</MaybeLink>
          {cats.map(c => <span key={c.slug}> · <MaybeLink href={`/integrations/category/${c.slug}`}>{c.name} apps</MaybeLink></span>)}
          {' · '}<MaybeLink href="/automations">Automations</MaybeLink> · <MaybeLink href="/ai-agents">AI agents</MaybeLink>
        </p>
      </section>

      <section className="wrap">
        <div className="final">
          <h2>Build on {app.name}</h2>
          <p>Tell Captain what you need from {app.name} in your own words. Every workspace starts free with 2,000 credits.</p>
          <BuildLink page={slug} place="final" campaign="seo-integration" ask={heroAsk} />
          <span className="peek l" aria-hidden="true"><Face id="closer" size={52} /><Face id="keeper" size={44} /></span>
          <span className="peek r" aria-hidden="true"><Face id="lead" size={50} /><Face id="sorter" size={46} /></span>
        </div>
        <p className="byline">By the 50agents team · Last updated {readDate(updated)} · Triggers, actions and recipes from viaSocket&rsquo;s catalog, read {readDate(read)}. Captain builds each ask as a plan you approve before anything runs.</p>
      </section>

      <div className="sticky"><span>{app.name} in 50agents</span><BuildLink page={slug} place="sticky" campaign="seo-integration" ask={heroAsk} className="btn">Build it</BuildLink></div>
    </div>
  );
}
