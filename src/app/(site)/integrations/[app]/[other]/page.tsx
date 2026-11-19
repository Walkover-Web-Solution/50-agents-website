// A pair page, v3 (D253): the app template, short. Every real recipe between two apps from the catalog snapshot.
// One canonical order per pair (the trigger app first; alphabetical when recipes run both ways). The other order is
// generated too and answers with a permanent redirect to it (permanentRedirect: 308 from the server, which search
// engines treat as a 301). Indexable only with 3 or more recipes.
import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { Crumbs, KINDS, MaybeLink } from '@/site/parts';
import { StickyBar } from '@/site/sticky';
import { PromptFilm } from '@/site/usecase/film';
import { BuildLink } from '@/site/integrations/build-link';
import { catalog, findPair, loadApp, nameOf, pairIndexable, pairPath, pairRecipes, pairs, recipeAsk } from '@/site/integrations/data';
import { canon } from '@/content/integrations/slugs';
import { BASE, crumbsLd, Final, HeroPlan, LdScript, Lockup, PairEvents, Questions, RecipeRows, softwareLd } from '@/site/integrations/parts';
import { pairWords, recipeBuild } from '@/site/integrations/words';
import '@/site/css/usecase.css';
import '@/site/css/integrations.css';

export const dynamicParams = false;
export function generateStaticParams() {
  // Both orders of every canonical pair, plus the raw mixed-case or duplicate slugs, which redirect to the canonical pair.
  const raw = pairs().raw.filter(p => p.a !== canon(p.a) || p.b !== canon(p.b)).flatMap(p => [{ app: p.a, other: p.b }, { app: p.b, other: p.a }]);
  return [...pairs().list.flatMap(p => [{ app: p.a, other: p.b }, { app: p.b, other: p.a }]), ...raw];
}

function load(x: string, y: string) {
  const f = findPair(canon(x), canon(y));
  if (!f) return null;
  const a = loadApp(f.pair.a), b = loadApp(f.pair.b);
  if (!a || !b) return null;
  // Not canonical when reversed, or asked with a mixed-case or duplicate slug: the page redirects.
  const moved = f.reversed || x !== canon(x) || y !== canon(y);
  return { ...f, moved, a, b, recipes: pairRecipes(a.slug, b.slug) };
}

export async function generateMetadata({ params }: { params: Promise<{ app: string; other: string }> }): Promise<Metadata> {
  const { app, other } = await params;
  const d = load(app, other);
  if (!d || d.moved || !d.recipes.length) return {};
  const { a, b, pair } = d;
  const url = `${BASE}${pairPath(pair)}`;
  const title = `${a.name} and ${b.name} automations`;
  const description = `Connect ${a.name} and ${b.name} in 50agents: every ready recipe between them from viaSocket’s catalog, each one an ask Captain builds as an automation you approve.`;
  return {
    title: { absolute: title.length < 48 ? `${title} | 50agents` : title },
    description,
    alternates: { canonical: url },
    robots: { index: pairIndexable(pair), follow: true },
    openGraph: { title, description, url, siteName: '50agents', type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function PairPage({ params }: { params: Promise<{ app: string; other: string }> }) {
  const { app, other } = await params;
  const d = load(app, other);
  if (!d) notFound();
  if (d.moved) permanentRedirect(pairPath(d.pair));
  if (!d.recipes.length) notFound();
  const { a, b, recipes, pair } = d;
  const read = catalog().read;
  const w = pairWords(a, b, recipes);
  const path = pairPath(pair);
  const page = `${a.slug}-${b.slug}`;
  const ask = recipeAsk(recipes[0], nameOf);
  const C = 'seo-pair' as const;

  return (
    <div className="page uc3 ig3" style={{ ['--k' as string]: KINDS.auto.tint }}>
      <LdScript data={[crumbsLd([{ name: 'Home', path: '' }, { name: 'Integrations', path: '/integrations' }, { name: a.name, path: `/integrations/${a.slug}` }, { name: `${a.name} and ${b.name}`, path }]), softwareLd(`50agents for ${a.name} and ${b.name}`, path, w.answer.join(' '), read)]} />
      <div className="wrap">
        <Crumbs trail={[{ label: 'Home', href: '/' }, { label: 'Integrations', href: '/integrations' }, { label: a.name, href: `/integrations/${a.slug}` }, { label: `${a.name} and ${b.name}` }]} />
      </div>

      <section className="wrap uc3-hero ig3-hero">
        <Lockup apps={[a.slug, b.slug]} />
        <h1>{w.h1}</h1>
        <p className="answer">{w.answer[0]} {w.answer[1]}</p>
        <PromptFilm ask={ask} button={<span className="hero-cta"><BuildLink page={page} place="hero" campaign={C} ask={ask}>Build it</BuildLink></span>}>
          <HeroPlan build={recipeBuild(recipes[0])} />
        </PromptFilm>
        <p className="uc3-note">Free to start. Nothing reaches anyone outside your business without your OK.</p>
      </section>

      <section className="wrap sec" id="recipes">
        <div className="sec-h c"><h2>Every {a.name} and {b.name} recipe</h2></div>
        <RecipeRows recipes={recipes.slice(0, 10)} more={recipes.slice(10)} page={page} campaign={C} />
      </section>

      <section className="wrap sec" id="steps">
        <div className="sec-h c"><h2>What each step does</h2></div>
        <PairEvents a={a} b={b} recipes={recipes} />
      </section>

      <section className="wrap sec" id="questions">
        <div className="sec-h c"><h2>Questions about {a.name} and {b.name}</h2></div>
        <Questions faqs={w.faqs} />
        <p className="uc3-more-apps"><MaybeLink href={`/integrations/${a.slug}`}>All {a.name} integrations</MaybeLink> · <MaybeLink href={`/integrations/${b.slug}`}>All {b.name} integrations</MaybeLink> · <MaybeLink href="/integrations">Every app, A to Z</MaybeLink></p>
      </section>

      <Final h2={`Connect ${a.name} and ${b.name}`} p="Or pick another recipe above. Free to start." ask={ask} page={page} campaign={C} updated={read} />

      <StickyBar><span>{a.name} and {b.name}</span><BuildLink page={page} place="sticky" campaign={C} ask={ask} className="btn">Build it</BuildLink></StickyBar>
    </div>
  );
}
