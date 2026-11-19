// A pair page, v3 round 3 (D253 to D255): the app template, short. Every real template (the catalog's recipes) between two
// apps from the catalog snapshot, six at a time with "Load more"; every trigger and action of both apps, in two columns;
// the pair's own lines as three short cards (D260).
// One canonical order per pair (the trigger app first; alphabetical when recipes run both ways). The other order is
// generated too and answers with a permanent redirect to it (permanentRedirect: 308 from the server, which search
// engines treat as a 301). Indexable only with 3 or more recipes.
import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { Crumbs, MaybeLink } from '@/site/parts';
import { StickyBar } from '@/site/sticky';
import { PromptFilm } from '@/site/usecase/film';
import { BuildLink } from '@/site/integrations/build-link';
import { findPair, loadApp, nameOf, pairIndexable, pairLines, pairPath, pairRecipes, pairs, recipeAsk } from '@/site/integrations/data';
import { canon } from '@/content/integrations/slugs';
import { BASE, crumbsLd, Final, LdScript, Lockup, PairEventsBox, PracticeCards, Questions, softwareLd, TemplatesBox } from '@/site/integrations/parts';
import { pairWords } from '@/site/integrations/words';
import { catalog } from '@/site/integrations/data';
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
  const description = `Connect ${a.name} and ${b.name} in 50agents: every ready template between them from viaSocket’s catalog, each one an ask Captain builds as an automation you approve.`;
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
  const lines = pairLines(pair.a, pair.b);

  return (
    <div className="page uc3 ig3">
      <LdScript data={[crumbsLd([{ name: 'Home', path: '' }, { name: 'Integrations', path: '/integrations' }, { name: a.name, path: `/integrations/${a.slug}` }, { name: `${a.name} and ${b.name}`, path }]), softwareLd(`50agents for ${a.name} and ${b.name}`, path, w.answer.join(' '), read)]} />
      <div className="wrap">
        <Crumbs trail={[{ label: 'Home', href: '/' }, { label: 'Integrations', href: '/integrations' }, { label: a.name, href: `/integrations/${a.slug}` }, { label: `${a.name} and ${b.name}` }]} />
      </div>

      {/* Hero (D255 round 3): the two apps joined, the H1, and the chat box as the subheader; one line names 50agents */}
      <section className="wrap uc3-hero ig3-hero">
        <Lockup apps={[a.slug, b.slug]} />
        <h1>{w.h1}</h1>
        <PromptFilm ask={ask} button={<span className="hero-cta"><BuildLink page={page} place="hero" campaign={C} ask={ask}>Build it</BuildLink></span>} />
        <p className="uc3-note">{w.note}</p>
      </section>

      {lines && (
        <section className="wrap sec" id="in-practice">
          <div className="sec-h c"><h2>{a.name} and {b.name} in practice</h2></div>
          <PracticeCards lines={lines} />
        </section>
      )}

      <section className="wrap sec" id="templates">
        <div className="sec-h c"><h2>{a.name} and {b.name} templates</h2><p>Pick one and Captain builds it with you.</p></div>
        <TemplatesBox recipes={recipes} page={page} campaign={C} search="Search templates" />
      </section>

      <section className="wrap sec" id="triggers-and-actions">
        <div className="sec-h c"><h2>{a.name} and {b.name} triggers and actions</h2><p>Every one of both apps. A trigger starts the work; actions are the steps.</p></div>
        <PairEventsBox a={a} b={b} />
      </section>

      <section className="wrap sec" id="questions">
        <div className="sec-h c"><h2>Questions about {a.name} and {b.name}</h2></div>
        <Questions faqs={w.faqs} />
        <p className="uc3-more-apps"><MaybeLink href={`/integrations/${a.slug}`}>All {a.name} integrations</MaybeLink> · <MaybeLink href={`/integrations/${b.slug}`}>All {b.name} integrations</MaybeLink> · <MaybeLink href="/integrations">Every app, A to Z</MaybeLink></p>
      </section>

      <Final h2={`Connect ${a.name} and ${b.name}`} p="Or pick another template above. Free to start." ask={ask} page={page} campaign={C} />

      <StickyBar><span>{a.name} and {b.name}</span><BuildLink page={page} place="sticky" campaign={C} ask={ask} className="btn">Build it</BuildLink></StickyBar>
    </div>
  );
}
