// An integration page, v3 (D253): one template for every app in viaSocket's catalog. The six flagships are filled from
// the JSON the page pipeline wrote (src/content/integrations/pages, scripts/pages); every other app from its catalog data
// (words.ts templatePage). Hero with the app's best recipe typed into Captain, the four kinds, triggers and actions,
// recipes, pairings, questions. Every visual is drawn from the data, so a new app needs no design work.
import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { Crumbs, KINDS, MaybeLink } from '@/site/parts';
import { StickyBar } from '@/site/sticky';
import { PromptFilm } from '@/site/usecase/film';
import { CATEGORIES } from '@/content/integrations/categories';
import { BuildLink } from '@/site/integrations/build-link';
import { appIndexable, catalog, loadApp, partnersOf, rawRedirects, topRecipes, writtenPage } from '@/site/integrations/data';
import { BASE, crumbsLd, EventGroups, Final, HeroPlan, firstRecipe, KindCards, LdScript, Lockup, PairCards, Questions, RecipeRows, softwareLd } from '@/site/integrations/parts';
import type { IntegrationPage } from '@/site/integrations/types';
import { templatePage } from '@/site/integrations/words';
import '@/site/css/usecase.css';
import '@/site/css/integrations.css';

export const dynamicParams = false;
export function generateStaticParams() {
  // Every canonical slug, plus each raw slug that redirects to one (mixed case, or a duplicate of the same app).
  return [...catalog().apps.map(a => ({ app: a.s })), ...rawRedirects().map(([raw]) => ({ app: raw }))];
}
const redirectTo = (slug: string) => rawRedirects().find(([raw]) => raw === slug)?.[1];

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
  const to = redirectTo(slug);
  if (to) permanentRedirect(`/integrations/${to}`);
  const d = load(slug);
  if (!d) notFound();
  const { app, p } = d;
  const N = app.name;
  const path = `/integrations/${slug}`;
  const recipes = topRecipes(app);
  const shown = recipes.slice(0, 8);
  const partners = partnersOf(app).slice(0, 6).map(x => x.slug);
  const cats = CATEGORIES.filter(c => app.categories.includes(c.slug));
  const C = 'seo-integration' as const;

  return (
    <div className="page uc3 ig3" style={{ ['--k' as string]: KINDS.auto.tint }}>
      <LdScript data={[crumbsLd([{ name: 'Home', path: '' }, { name: 'Integrations', path: '/integrations' }, { name: N, path }]), softwareLd(`50agents for ${N}`, path, p.answer.join(' '), p.updated)]} />
      <div className="wrap"><Crumbs trail={[{ label: 'Home', href: '/' }, { label: 'Integrations', href: '/integrations' }, { label: N }]} /></div>

      {/* Hero: the app beside 50agents, the answer, and its best recipe typed into Captain with the plan under it */}
      <section className="wrap uc3-hero ig3-hero">
        <Lockup apps={[slug]} />
        <h1>{p.h1}</h1>
        <p className="answer">{p.answer[0]} {p.answer[1]}</p>
        <PromptFilm ask={p.ask} button={<span className="hero-cta"><BuildLink page={slug} place="hero" campaign={C} ask={p.ask}>Build it</BuildLink></span>}>
          <HeroPlan build={p.build} />
        </PromptFilm>
        <p className="uc3-note">Free to start. Nothing reaches anyone outside your business without your OK.</p>
      </section>

      {/* The four kinds on this app */}
      <section className="wrap sec" id="kinds">
        <div className="sec-h c"><h2>What you can build on {N}</h2></div>
        <KindCards kinds={p.kinds} page={slug} campaign={C} />
      </section>

      {/* Triggers and actions, grouped in plain words */}
      {app.events.length > 0 && (
        <section className="wrap sec" id="triggers-and-actions">
          <div className="sec-h c"><h2>{N} triggers and actions</h2><p>What starts the work, and what can be done in {N}.</p></div>
          <EventGroups groups={p.groups} app={app} />
        </section>
      )}

      {/* Top recipes, one button each */}
      {shown.length > 0 && (
        <section className="wrap sec" id="recipes">
          <div className="sec-h c"><h2>Ready-made {N} recipes</h2></div>
          <RecipeRows recipes={shown} page={slug} campaign={C} />
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
        <Questions faqs={p.faqs} sources={p.sources} />
      </section>

      <Final h2={`Build on ${N}`} p={<>Tell Captain &ldquo;{p.ask}&rdquo;, or the job in your own words. Free to start.</>} ask={p.ask} page={slug} campaign={C} updated={p.updated} />

      <StickyBar><span>{N} in 50agents</span><BuildLink page={slug} place="sticky" campaign={C} ask={p.ask} className="btn">Build it</BuildLink></StickyBar>
    </div>
  );
}
