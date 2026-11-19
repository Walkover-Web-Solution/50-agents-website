// An integration page, v3 round 2 (D253, D254): one template for every app in viaSocket's catalog. The six flagships are
// filled from the JSON the page pipeline wrote (src/content/integrations/pages, scripts/pages); every other app from its
// catalog data (words.ts templatePage). Hero with the app's best template typed into Captain (no plan card), the four
// kinds, triggers and actions in two equal columns with "Load more", templates with "Load more" (D260), pairings,
// questions. No dates and no source lines on the page. Every visual is drawn from the data.
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Crumbs, MaybeLink } from '@/site/parts';
import { StickyBar } from '@/site/sticky';
import { PromptFilm } from '@/site/usecase/film';
import { CATEGORIES } from '@/content/integrations/categories';
import { BuildLink } from '@/site/integrations/build-link';
import { appIndexable, catalog, loadApp, partnersOf, topRecipes, writtenPage } from '@/site/integrations/data';
import { BASE, crumbsLd, EventsBox, Final, firstRecipe, KindCards, LdScript, Lockup, PairCards, Questions, softwareLd, TemplatesBox } from '@/site/integrations/parts';
import type { IntegrationPage } from '@/site/integrations/types';
import { templatePage } from '@/site/integrations/words';
import '@/site/css/usecase.css';
import '@/site/css/integrations.css';

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
  return { app, p, index: appIndexable({ s: slug }) };
}

export async function generateMetadata({ params }: { params: Promise<{ app: string }> }): Promise<Metadata> {
  const { app: slug } = await params;
  const d = load(slug);
  if (!d) return {};
  const { p, index } = d;
  const url = `${BASE}/integrations/${slug}`;
  return {
    title: { absolute: p.title },
    description: p.description,
    alternates: { canonical: url },
    robots: { index, follow: true },
    openGraph: { title: p.h1, description: p.description, url, siteName: '50agents', type: 'website' },
    twitter: { card: 'summary_large_image', title: p.h1, description: p.description },
  };
}

export default async function IntegrationPageView({ params }: { params: Promise<{ app: string }> }) {
  const { app: slug } = await params;
  const d = load(slug);
  if (!d) notFound();
  const { app, p } = d;
  const N = app.name;
  const path = `/integrations/${slug}`;
  const recipes = topRecipes(app);
  const shown = recipes.slice(0, 24);
  const partners = partnersOf(app).slice(0, 6).map(x => x.slug);
  const cats = CATEGORIES.filter(c => app.categories.includes(c.slug));
  const C = 'seo-integration' as const;

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
