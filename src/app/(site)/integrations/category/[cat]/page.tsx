// A category of the A to Z (pages-brief B8): one of 20 curated categories, its members mapped from the catalog's own labels.
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Crumbs, Face, MaybeLink } from '@/site/parts';
import { CATEGORIES } from '@/content/integrations/categories';
import { BuildLink } from '@/site/integrations/build-link';
import { catalog, loadApp, nameOf, readDate, recipeAsk, topRecipes, type Recipe } from '@/site/integrations/data';
import { DirSearch } from '@/site/integrations/dir-search';
import { BASE, crumbsLd, LdScript, Logo, RecipeRow } from '@/site/integrations/parts';
import '@/site/css/integrations.css';

export const dynamicParams = false;
export function generateStaticParams() {
  return CATEGORIES.map(c => ({ cat: c.slug }));
}

const list = (xs: string[]) => (xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`);

function load(slug: string) {
  const c = CATEGORIES.find(x => x.slug === slug);
  if (!c) return null;
  const members = catalog().apps.filter(a => a.c.includes(c.slug)); // popularity order
  return { c, members };
}

export async function generateMetadata({ params }: { params: Promise<{ cat: string }> }): Promise<Metadata> {
  const { cat } = await params;
  const d = load(cat);
  if (!d) return {};
  const { c, members } = d;
  const title = `${c.name} integrations for AI agents and automations`;
  const description = `${c.name} apps 50agents works with through viaSocket, such as ${list(members.slice(0, 3).map(m => m.n))}, each with real triggers, actions and recipes for Captain.`;
  const url = `${BASE}/integrations/category/${c.slug}`;
  return {
    title: { absolute: title.length <= 48 ? `${title} | 50agents` : `${c.name} integrations | 50agents` },
    description,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: { title, description, url, siteName: '50agents', type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ cat: string }> }) {
  const { cat } = await params;
  const d = load(cat);
  if (!d) notFound();
  const { c, members } = d;
  const read = catalog().read;
  const sorted = [...members].sort((a, b) => a.n.localeCompare(b.n, 'en', { sensitivity: 'base' }));
  // One top recipe from each of the best known members that has one, so the examples span the category.
  const examples: Recipe[] = [];
  for (const m of members) {
    if (examples.length >= 6) break;
    if (!m.r) continue;
    const r = topRecipes(loadApp(m.s)!)[0];
    if (r && !examples.some(e => e.ta === r.ta && e.aa === r.aa)) examples.push(r);
  }
  const top = members.slice(0, 3).map(m => m.n);
  const ask = examples[0] ? recipeAsk(examples[0], nameOf) : `Tell me what you would build with my ${c.short} apps`;
  const others = CATEGORIES.filter(x => x.slug !== c.slug);
  const h1 = `${c.name} integrations for AI agents and automations`;
  const page = `category-${c.slug}`;

  return (
    <div className="page ig">
      <LdScript data={crumbsLd([{ name: 'Home', path: '' }, { name: 'Integrations', path: '/integrations' }, { name: c.name, path: `/integrations/category/${c.slug}` }])} />
      <div className="wrap">
        <Crumbs trail={[{ label: 'Home', href: '/' }, { label: 'Integrations', href: '/integrations' }, { label: c.name }]} />
      </div>

      <section className="wrap" style={{ paddingTop: 36 }}>
        <div className="sec-head" style={{ maxWidth: 840 }}>
          <h1>{h1}</h1>
          <p className="answer" style={{ color: 'var(--ink)' }}>
            50agents builds automations, AI agents and apps on {c.short} apps such as {list(top)}, through viaSocket. {c.about}
          </p>
        </div>
        <nav className="ig-cats" aria-label="Categories">
          <MaybeLink href="/integrations">All apps</MaybeLink>
          {CATEGORIES.map(x => x.slug === c.slug ? <span key={x.slug} aria-current="page">{x.name}</span> : <MaybeLink key={x.slug} href={`/integrations/category/${x.slug}`}>{x.name}</MaybeLink>)}
        </nav>
      </section>

      {examples.length > 0 && (
        <section className="wrap band" style={{ paddingTop: 56 }} id="recipes">
          <div className="sec-head">
            <h2>What people build with {c.short} apps</h2>
            <p>One ready recipe from each of the most used {c.short} apps. Each is a real trigger and action from the catalog.</p>
          </div>
          <ul className="ig-recs">
            {examples.map((r, i) => <RecipeRow key={i} r={r} page={page} place={`recipe-${i + 1}`} campaign="seo-category" />)}
          </ul>
        </section>
      )}

      <section className="wrap band" style={{ paddingTop: 56 }} aria-label={`${c.name} apps`}>
        <div className="ig-dir-tools">
          <DirSearch label={`Search ${c.short} apps`} />
        </div>
        <div className="ig-letter" data-letter="all" style={{ paddingTop: 20 }}>
          <h2>{c.name} apps, A to Z</h2>
          <ul className="ig-grid">
            {sorted.map(a => (
              <li key={a.s} data-app={`${a.n} ${a.s}`.toLowerCase()}>
                <a href={`/integrations/${a.s}`} className="ig-tile"><Logo slug={a.s} size={24} /><b>{a.n}</b></a>
              </li>
            ))}
          </ul>
        </div>
        <p className="src">Members are the apps viaSocket&rsquo;s catalog labels {c.name.toLowerCase()} (its labels mapped into 20 categories), read {readDate(read)}.</p>
      </section>

      <section className="wrap band" id="related">
        <h2>Other categories</h2>
        <p className="also">{others.slice(0, 8).map((x, i) => <span key={x.slug}>{i ? ' · ' : ''}<MaybeLink href={`/integrations/category/${x.slug}`}>{x.name}</MaybeLink></span>)} · Up: <MaybeLink href="/integrations">All integrations, A to Z</MaybeLink></p>
      </section>

      <section className="wrap">
        <div className="final">
          <h2>Build on your {c.short} apps</h2>
          <p>Tell Captain the job in plain words. Every workspace starts free with 2,000 credits.</p>
          <BuildLink page={page} place="final" campaign="seo-category" ask={ask} />
          <span className="peek l" aria-hidden="true"><Face id="keeper" size={52} /><Face id="writer" size={44} /></span>
          <span className="peek r" aria-hidden="true"><Face id="scout" size={50} /><Face id="sorter" size={46} /></span>
        </div>
        <p className="byline">By the 50agents team · Last updated {readDate(read)} · From viaSocket&rsquo;s catalog, read {readDate(read)}. {nameOf(members[0]?.s ?? '')} and the rest each have their own page with every trigger and action.</p>
      </section>

      <div className="sticky"><span>{c.name} apps</span><BuildLink page={page} place="sticky" campaign="seo-category" ask={ask} className="btn">Build it</BuildLink></div>
    </div>
  );
}
