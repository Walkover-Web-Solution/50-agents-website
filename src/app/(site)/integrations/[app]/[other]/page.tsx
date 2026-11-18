// A pair page (pages-brief B8): every real recipe between two apps, from the catalog snapshot.
// One canonical order per pair (the trigger app first; alphabetical when recipes run both ways). The other order is
// generated too and answers with a permanent redirect to it (permanentRedirect: 308 from the server, which search
// engines treat as a 301). Indexable only with 3 or more recipes.
import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { Crumbs, Face, MaybeLink } from '@/site/parts';
import { BuildLink } from '@/site/integrations/build-link';
import { catalog, findPair, loadApp, nameOf, pairIndexable, pairPath, pairs, partnersOf, readDate, recipeAsk, type Recipe } from '@/site/integrations/data';
import { BASE, crumbsLd, KindTile, LdScript, Logo, PairCard, RecipeRow, softwareLd } from '@/site/integrations/parts';
import { pairWords } from '@/site/integrations/words';
import { KINDS } from '@/site/parts';
import '@/site/css/integrations.css';

export const dynamicParams = false;
export function generateStaticParams() {
  return pairs().list.flatMap(p => [{ app: p.a, other: p.b }, { app: p.b, other: p.a }]);
}

function load(x: string, y: string) {
  const f = findPair(x, y);
  if (!f) return null;
  const a = loadApp(f.pair.a), b = loadApp(f.pair.b);
  if (!a || !b) return null;
  const recipes: Recipe[] = a.recipes.filter(r => (r.ta === a.slug && r.aa === b.slug) || (r.ta === b.slug && r.aa === a.slug));
  recipes.sort((r, s) => Number(s.ta === a.slug) - Number(r.ta === a.slug));
  return { ...f, a, b, recipes };
}

export async function generateMetadata({ params }: { params: Promise<{ app: string; other: string }> }): Promise<Metadata> {
  const { app, other } = await params;
  const d = load(app, other);
  if (!d || d.reversed || !d.recipes.length) return {};
  const { a, b, recipes, pair } = d;
  const url = `${BASE}${pairPath(pair)}`;
  const title = `${a.name} and ${b.name}: ${recipes.length} ready recipe${recipes.length > 1 ? 's' : ''}`;
  const description = `Connect ${a.name} and ${b.name} in 50agents: ${recipes.length} real recipe${recipes.length > 1 ? 's' : ''} from viaSocket’s catalog, each a copyable ask Captain builds as an automation you approve.`;
  return {
    title: { absolute: title.length < 52 ? `${title} | 50agents` : title },
    description,
    alternates: { canonical: url },
    robots: { index: pairIndexable({ ...pair, n: recipes.length }), follow: true },
    openGraph: { title: `${a.name} and ${b.name} automations`, description, url, siteName: '50agents', type: 'website' },
    twitter: { card: 'summary_large_image', title: `${a.name} and ${b.name} automations`, description },
  };
}

export default async function PairPage({ params }: { params: Promise<{ app: string; other: string }> }) {
  const { app, other } = await params;
  const d = load(app, other);
  if (!d || !d.recipes.length) notFound();
  if (d.reversed) permanentRedirect(pairPath(d.pair));
  const { a, b, recipes, pair } = d;
  const read = catalog().read;
  const words = pairWords(a, b, recipes);
  const path = pairPath(pair);
  const page = `${a.slug}-${b.slug}`;
  const h1 = `${a.name} and ${b.name} automations`;
  const first = recipes[0];
  const firstAsk = recipeAsk(first, nameOf);
  const moreA = partnersOf(a).filter(p => p.slug !== b.slug).slice(0, 3);
  const moreB = partnersOf(b).filter(p => p.slug !== a.slug).slice(0, 3);

  return (
    <div className="page ig" style={{ ['--k' as string]: KINDS.auto.tint }}>
      <LdScript data={[crumbsLd([{ name: 'Home', path: '' }, { name: 'Integrations', path: '/integrations' }, { name: a.name, path: `/integrations/${a.slug}` }, { name: `${a.name} and ${b.name}`, path }]), softwareLd(`50agents for ${a.name} and ${b.name}`, path, words.answer.join(' '), read)]} />
      <div className="wrap">
        <Crumbs trail={[{ label: 'Home', href: '/' }, { label: 'Integrations', href: '/integrations' }, { label: a.name, href: `/integrations/${a.slug}` }, { label: `${a.name} and ${b.name}` }]} />
      </div>

      <section className="wrap hero ig-hero">
        <div className="hero-copy">
          <p className="ig-duo"><Logo slug={a.slug} size={44} /><i /><Logo slug={b.slug} size={44} /></p>
          <h1>{h1}</h1>
          <p className="answer">{words.answer[0]} {words.answer[1]}</p>
          <div className="hero-cta">
            <BuildLink page={page} place="hero" campaign="seo-pair" ask={firstAsk} />
            <span className="hero-note">Free to start with 2,000 credits</span>
          </div>
        </div>
        <div className="hero-side">
          <div className="ig-flowcard">
            <span className="ig-step"><Logo slug={first.ta} size={24} /><span><em>When</em> {first.te} <i>in {nameOf(first.ta)}</i></span></span>
            <span className="ig-down" aria-hidden="true">↓</span>
            <span className="ig-step"><Logo slug={first.aa} size={24} /><span><em>Do</em> {first.ae} <i>in {nameOf(first.aa)}</i></span></span>
            <p>One of {recipes.length} recipe{recipes.length > 1 ? 's' : ''} in viaSocket&rsquo;s catalog, read {readDate(read)}.</p>
          </div>
        </div>
      </section>

      <section className="wrap band" id="recipes">
        <div className="sec-head">
          <h2>Every {a.name} and {b.name} recipe</h2>
          <p>Each is a real trigger in one app and a real action in the other. Copy the ask into Captain, or press Build this to sign up with it typed in.</p>
        </div>
        <ul className="ig-recs">
          {recipes.map((r, i) => <RecipeRow key={i} r={r} page={page} place={`recipe-${i + 1}`} campaign="seo-pair" />)}
        </ul>
        <p className="src">From viaSocket&rsquo;s catalog, read {readDate(read)}. The catalog suggests recipes for each app; this page lists every one we read for this pair.</p>
      </section>

      {words.agent && (
        <section className="wrap band" id="ai-agent">
          <div className="sec-head">
            <h2>An AI agent across {a.name} and {b.name}</h2>
            <p>When the steps change from one run to the next, an AI agent with both apps connected decides what to do each time.</p>
          </div>
          <div className="ig-kinds" style={{ gridTemplateColumns: 'minmax(0,1fr)' }}>
            <KindTile kind="ai" does={words.agent.does} ask={words.agent.ask} page={page} campaign="seo-pair" />
          </div>
        </section>
      )}

      <section className="wrap band narrow" id="questions">
        <h2>Questions about {a.name} and {b.name}</h2>
        <div className="faqs">
          {words.faqs.map(x => (
            <details key={x.q} open>
              <summary><h3>{x.q}</h3></summary>
              <p>{x.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="wrap band" id="related">
        <h2>Related</h2>
        <div className="ig-pcs">
          {moreA.map(p => <PairCard key={`a${p.slug}`} me={a.slug} other={p.slug} n={p.n} />)}
          {moreB.slice(0, 4 - moreA.length).map(p => <PairCard key={`b${p.slug}`} me={b.slug} other={p.slug} n={p.n} />)}
        </div>
        <p className="also">Both apps: <MaybeLink href={`/integrations/${a.slug}`}>{a.name} integrations</MaybeLink> · <MaybeLink href={`/integrations/${b.slug}`}>{b.name} integrations</MaybeLink> · Up: <MaybeLink href="/integrations">All integrations, A to Z</MaybeLink></p>
      </section>

      <section className="wrap">
        <div className="final">
          <h2>Connect {a.name} and {b.name}</h2>
          <p>Pick a recipe above or say it your own way. Every workspace starts free with 2,000 credits.</p>
          <BuildLink page={page} place="final" campaign="seo-pair" ask={firstAsk} />
          <span className="peek l" aria-hidden="true"><Face id="keeper" size={52} /><Face id="closer" size={44} /></span>
          <span className="peek r" aria-hidden="true"><Face id="sorter" size={50} /><Face id="lead" size={46} /></span>
        </div>
        <p className="byline">By the 50agents team · Last updated {readDate(read)} · Recipes from viaSocket&rsquo;s catalog, read {readDate(read)}. Captain builds each ask as a plan you approve before anything runs.</p>
      </section>

      <div className="sticky"><span>{a.name} and {b.name}</span><BuildLink page={page} place="sticky" campaign="seo-pair" ask={firstAsk} className="btn">Build it</BuildLink></div>
    </div>
  );
}
