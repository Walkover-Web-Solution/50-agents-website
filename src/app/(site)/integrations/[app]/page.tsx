// An integration page, v3 round 2 (D253, D254): one template for every app in viaSocket's catalog. The six flagships are
// filled from the JSON the page pipeline wrote (src/content/integrations/pages, scripts/pages); every other app from its
// catalog data (words.ts templatePage). Hero with the app's best template typed into Captain (no plan card), the four
// kinds, triggers and actions in two equal columns with "Load more", templates with "Load more" (D260), pairings,
// questions. No dates and no source lines on the page. Every visual is drawn from the data.
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AppLogo, Crumbs, MaybeLink } from '@/site/parts';
import LIVE_PAIRS from '@/content/integrations/live-pairs.json';
import { PairPicker } from '@/site/integrations/pair-picker';
import { StickyBar } from '@/site/sticky';
import { PromptFilm } from '@/site/usecase/film';
import { CATEGORIES } from '@/content/integrations/categories';
import { BuildLink } from '@/site/integrations/build-link';
import { appIndexable, catalog, loadApp, partnersOf, topRecipes, writtenPage } from '@/site/integrations/data';
import { BASE, crumbsLd, EventsBox, Final, firstRecipe, KindCards, LdScript, Lockup, PairCards, PracticeCards, Questions, softwareLd, TemplatesBox } from '@/site/integrations/parts';
import { appLines } from '@/site/integrations/data';
import type { IntegrationPage } from '@/site/integrations/types';
import { templatePage } from '@/site/integrations/words';
import '@/site/css/usecase.css';
import '@/site/css/integrations.css';
import '@/site/css/integrations-v4.css';
import { loadV4 } from '@/site/integrations/v4-data';
import { Chores, Compare, HeroScene, How, SourcedQuestions } from '@/site/integrations/v4';
import type { IntegrationV4 } from '@/site/integrations/v4-types';
import type { AppFile } from '@/site/integrations/data';

export const dynamicParams = false;
export function generateStaticParams() {
  // Every canonical slug. A raw slug (mixed case, or a duplicate of the same app) 308s to it in src/middleware.ts: not
  // pre-rendered, so two files never differ only by case (they collide on a case-insensitive disk).
  return catalog().apps.map(a => ({ app: a.s }));
}

function load(slug: string) {
  const app = loadApp(slug);
  if (!app) return null;
  const p = writtenPage<IntegrationPage>(slug) ?? templatePage(app);
  return { app, p, v4: loadV4(slug), index: appIndexable({ s: slug }) };
}

export async function generateMetadata({ params }: { params: Promise<{ app: string }> }): Promise<Metadata> {
  const { app: slug } = await params;
  const d = load(slug);
  if (!d) return {};
  const { index } = d;
  const p = d.v4 ?? d.p;
  const url = `${BASE}/integrations/${slug}`;
  return {
    title: { absolute: p.title },
    description: p.description,
    alternates: { canonical: url, ...(d.v4 ? { types: { 'text/markdown': `${url}.md` } } : {}) },
    robots: { index, follow: true },
    openGraph: { title: p.h1, description: p.description, url, siteName: '50agents', type: 'website' },
    twitter: { card: 'summary_large_image', title: p.h1, description: p.description },
  };
}

export default async function IntegrationPageView({ params }: { params: Promise<{ app: string }> }) {
  const { app: slug } = await params;
  const d = load(slug);
  if (!d) notFound();
  if (d.v4) return <V4View app={d.app} v={d.v4} />;
  const { app, p } = d;
  const N = app.name;
  const path = `/integrations/${slug}`;
  const recipes = topRecipes(app);
  const shown = recipes.slice(0, 24);
  const partners = partnersOf(app).slice(0, 6).map(x => x.slug);
  const cats = CATEGORIES.filter(c => app.categories.includes(c.slug));
  const C = 'seo-integration' as const;
  const lines = appLines(slug);
  // Round B, B7: the pair picker. Only the pairs that have their own live, indexable page (live-pairs.json), in its order.
  const pairsHere = (LIVE_PAIRS.pairs as string[]).filter(x => x.split('/').includes(slug)).map(x => {
    const [a, b] = x.split('/');
    const other = loadApp(a === slug ? b : a);
    return other ? { href: `/integrations/${x}`, name: other.name, slug: other.slug, icon: other.icon } : null;
  }).filter((x): x is { href: string; name: string; slug: string; icon: string } => !!x);

  return (
    <div className="page uc3 ig3">
      <LdScript data={[crumbsLd([{ name: 'Home', path: '' }, { name: 'Integrations', path: '/integrations' }, { name: N, path }]), softwareLd(`50agents for ${N}`, path, p.answer.join(' '), p.updated)]} />
      <div className="wrap"><Crumbs trail={[{ label: 'Home', href: '/' }, { label: 'Integrations', href: '/integrations' }, { label: N }]} /></div>

      {/* Hero (D255 round 3): the app's logo, the H1, and its best template typed into Captain as the subheader; one line */}
      <section className="wrap uc3-hero ig3-hero">
        <Lockup apps={[slug]} />
        <h1>{p.h1}</h1>
        <PromptFilm ask={p.ask} button={<span className="hero-cta"><BuildLink page={slug} place="hero" campaign={C} ask={p.ask}>Build it</BuildLink></span>} />
        <p className="uc3-note">{p.answer[1]}</p>
      </section>

      {/* Round B, B7: pick a second app and land on the two-app page, high on the page (Jii's review), searchable, two
          rows until "See all". Only apps with a live pair page; left out when there are none. */}
      {pairsHere.length > 0 && (
        <section className="wrap sec ig3-pair-sec" id="pair-with">
          <div className="sec-h c"><h2>Pair {N} with another app</h2><p>Pick one to see what the two do together.</p></div>
          <PairPicker app={N} total={pairsHere.length}>
            <ul className="ig3-pick">
              {pairsHere.map((o, i) => (
                <li key={o.href} data-q={o.name.toLowerCase()} hidden={i >= 8}><a href={o.href}><AppLogo app={o.slug} icon={o.icon} size={28} /><span>{o.name}</span></a></li>
              ))}
            </ul>
          </PairPicker>
        </section>
      )}

      {/* T65: the app's own lines (used for, best template, watch out), written from its real triggers and actions */}
      {lines && (
        <section className="wrap sec" id="in-practice">
          <div className="sec-h c"><h2>{N} in practice</h2></div>
          <PracticeCards lines={lines} />
        </section>
      )}

      {/* The four kinds on this app */}
      <section className="wrap sec" id="kinds">
        <div className="sec-h c"><h2>What you can build on {N}</h2></div>
        <KindCards kinds={p.kinds} page={slug} campaign={C} />
      </section>

      {/* Triggers and actions: two equal columns, one search, "Load more" in each (D260) */}
      {app.events.length > 0 && (
        <section className="wrap sec" id="triggers-and-actions">
          <div className="sec-h c"><h2>{N} triggers and actions</h2><p>A trigger starts the work; actions are the steps in {N}.</p></div>
          <EventsBox app={app} />
        </section>
      )}

      {/* Templates, one button each, in the same box */}
      {shown.length > 0 && (
        <section className="wrap sec" id="templates">
          <div className="sec-h c"><h2>Templates for {N}</h2><p>Pick one and Captain builds it with you.</p></div>
          <TemplatesBox recipes={shown} page={slug} campaign={C} search="Search templates" />
        </section>
      )}

      {/* Best pairings */}
      {partners.length > 0 && (
        <section className="wrap sec" id="pairings">
          <div className="sec-h c"><h2>Apps that work best with {N}</h2></div>
          <PairCards items={partners.map(o => ({ me: slug, other: o, recipe: firstRecipe(app.recipes, slug, o) }))} />
          <p className="uc3-more-apps">
            {cats.map((c, i) => <span key={c.slug}>{i ? ' · ' : ''}<MaybeLink href={`/integrations/category/${c.slug}`}>All {c.short} apps</MaybeLink></span>)}
            {cats.length ? ' · ' : ''}<MaybeLink href="/integrations">Every app, A to Z</MaybeLink>
          </p>
        </section>
      )}

      {/* Questions */}
      <section className="wrap sec" id="questions">
        <div className="sec-h c"><h2>Questions about {N} in 50agents</h2></div>
        <Questions faqs={p.faqs} />
      </section>

      <Final h2={`Build on ${N}`} p="One sentence to Captain. Free to start." ask={p.ask} page={slug} campaign={C} />

      <StickyBar><span>{N} in 50agents</span><BuildLink page={slug} place="sticky" campaign={C} ask={p.ask} className="btn">Build it</BuildLink></StickyBar>
    </div>
  );
}

/** The upgraded page (Search S51, S52): answer first, the hero job as a scene, every job grouped by chore, how it works,
 *  pairs, triggers and actions, a fair comparison, sourced questions. Its markdown twin is /integrations/<app>.md. */
function V4View({ app, v }: { app: AppFile; v: IntegrationV4 }) {
  const slug = app.slug, N = app.name, path = `/integrations/${slug}`;
  const C = 'seo-integration' as const;
  const pairsHere = (LIVE_PAIRS.pairs as string[]).filter(x => x.split('/').includes(slug)).map(x => {
    const [a, b] = x.split('/');
    const other = loadApp(a === slug ? b : a);
    return other ? { href: `/integrations/${x}`, name: other.name, slug: other.slug, icon: other.icon } : null;
  }).filter((x): x is { href: string; name: string; slug: string; icon: string } => !!x);
  const howTo = {
    '@context': 'https://schema.org', '@type': 'HowTo', name: `How to set up an AI agent or automation for ${N} in 50agents`,
    step: [
      { '@type': 'HowToStep', name: 'Say the job', text: `Tell Captain the job in plain words, for example: ${v.asks[0]}` },
      { '@type': 'HowToStep', name: 'Check the plan', text: `Captain shows the plan: ${v.hero.steps.join('; ')}.` },
      { '@type': 'HowToStep', name: 'Let it run', text: 'It runs on its own; every run is shown and can be paused.' },
    ],
  };
  const jobsCount = v.chores.reduce((n, c) => n + c.jobs.length, 0);
  return (
    <div className="page uc3 ig3 v4">
      <LdScript data={[crumbsLd([{ name: 'Home', path: '' }, { name: 'Integrations', path: '/integrations' }, { name: N, path }]), softwareLd(`50agents for ${N}`, path, v.answer.join(' '), v.updated), howTo]} />
      <div className="wrap"><Crumbs trail={[{ label: 'Home', href: '/' }, { label: 'Integrations', href: '/integrations' }, { label: N }]} /></div>

      <section className="wrap v4-hero">
        <div className="v4-hero-l">
          <Lockup apps={[slug]} />
          <h1>{v.h1}</h1>
          <p className="v4-answer">{v.answer[0]} {v.answer[1]}</p>
          <PromptFilm ask={v.asks[0]} asks={v.asks} button={<span className="hero-cta"><BuildLink page={slug} place="hero" campaign={C} ask={v.asks[0]}>Build it</BuildLink></span>} />
          <p className="v4-free">Free to start with 2,000 credits. Works with 2,300+ apps.</p>
        </div>
        <HeroScene p={v} />
      </section>

      <section className="wrap sec" id="everything">
        <div className="sec-h c"><h2>Everything you can do with {N}</h2><p>{jobsCount} jobs, grouped by the chore they take off your plate. Each one is a sentence to Captain.</p></div>
        <Chores p={v} />
      </section>

      <section className="wrap sec" id="how">
        <div className="sec-h c"><h2>How it works</h2></div>
        <How p={v} />
      </section>

      {pairsHere.length > 0 && (
        <section className="wrap sec ig3-pair-sec" id="pair-with">
          <div className="sec-h c"><h2>{N} with your other apps</h2><p>Pick one to see what the two do together.</p></div>
          <PairPicker app={N} total={pairsHere.length}>
            <ul className="ig3-pick">
              {pairsHere.map((o, i) => (
                <li key={o.href} data-q={o.name.toLowerCase()} hidden={i >= 8}><a href={o.href}><AppLogo app={o.slug} icon={o.icon} size={28} /><span>{o.name}</span></a></li>
              ))}
            </ul>
          </PairPicker>
        </section>
      )}

      {app.events.length > 0 && (
        <section className="wrap sec" id="triggers-and-actions">
          <div className="sec-h c"><h2>{N} triggers and actions</h2><p>A trigger starts the work; actions are the steps in {N}.</p></div>
          <EventsBox app={app} />
        </section>
      )}

      {v.compare && (
        <section className="wrap sec" id="compare">
          <div className="sec-h c"><h2>{N} in 50agents, Zapier or Make</h2></div>
          <Compare p={v} />
        </section>
      )}

      <section className="wrap sec" id="questions">
        <div className="sec-h c"><h2>Questions about {N} and AI agents</h2></div>
        <SourcedQuestions faqs={v.faqs} />
      </section>

      <Final h2={`Put ${N} to work`} p="One sentence to Captain. Free to start." ask={v.asks[0]} page={slug} campaign={C} />
      <StickyBar><span>{N} in 50agents</span><BuildLink page={slug} place="sticky" campaign={C} ask={v.asks[0]} className="btn">Build it</BuildLink></StickyBar>
    </div>
  );
}
