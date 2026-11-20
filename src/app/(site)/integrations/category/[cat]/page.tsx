// A category of the directory, v3 round 2 (D254): one of 20 curated categories, its members mapped from the catalog's own
// labels. A centred head, then the directory panel with this category picked (its apps most used first, one search,
// numbered pages), then a few real templates.
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Crumbs } from '@/site/parts';
import { StickyBar } from '@/site/sticky';
import { CATEGORIES } from '@/content/integrations/categories';
import { BuildLink } from '@/site/integrations/build-link';
import { catalog, loadApp, nameOf, recipeAsk, topRecipes, type Recipe } from '@/site/integrations/data';
import { BASE, crumbsLd, DirectoryPanel, Final, LdScript, TemplatesBox } from '@/site/integrations/parts';
import '@/site/css/usecase.css';
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
  // 155 characters at most: name three example apps, or fewer when their names run long
  const describe = (n: number) => `${c.name} apps 50agents works with through viaSocket, such as ${list(members.slice(0, n).map(m => m.n))}, each with real triggers, actions and templates for Captain.`;
  const description = c.description ?? [3, 2, 1].map(describe).find(d => d.length <= 155) ?? describe(1).slice(0, 155);
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
  const page = `category-${c.slug}`;
  const C = 'seo-category' as const;

  return (
    <div className="page uc3 ig3">
      <LdScript data={crumbsLd([{ name: 'Home', path: '' }, { name: 'Integrations', path: '/integrations' }, { name: c.name, path: `/integrations/category/${c.slug}` }])} />
      <div className="wrap"><Crumbs trail={[{ label: 'Home', href: '/' }, { label: 'Integrations', href: '/integrations' }, { label: c.name }]} /></div>

      <section className="wrap uc3-hero ig3-hero ig3-dir-hero">
        <h1>{c.name} integrations for AI agents and automations</h1>
        <p className="answer">{c.intro ? `${c.intro} 50agents builds automations, AI agents and apps on them, such as ${list(top)}, through viaSocket.` : `50agents builds automations, AI agents and apps on ${c.short} apps such as ${list(top)}, through viaSocket. ${c.about}`}</p>
      </section>

      <section className="wrap sec" aria-label={`${c.name} apps`}>
        <DirectoryPanel apps={members} current={`/integrations/category/${c.slug}`} head={<h2>{/tools$/i.test(c.name) ? c.name : `${c.name} apps`}</h2>} label={`Search ${c.short} apps`} />
      </section>

      {/* T67: what teams do with these apps, written per category where two categories read alike */}
      {c.uses && (
        <section className="wrap sec" id="uses">
          <div className="sec-h c"><h2>What teams do with {c.short} apps</h2></div>
          <ul className="cat-uses">{c.uses.map(u => <li key={u}>{u}</li>)}</ul>
        </section>
      )}

      {examples.length > 0 && (
        <section className="wrap sec" id="templates">
          <div className="sec-h c"><h2>{c.short[0].toUpperCase() + c.short.slice(1)} templates</h2><p>One from each of the most used {c.short} apps.</p></div>
          <TemplatesBox recipes={examples} page={page} campaign={C} />
        </section>
      )}

      <Final h2={`Build on your ${c.short} apps`} p="One sentence to Captain. Free to start." ask={ask} page={page} campaign={C} />

      <StickyBar><span>{c.name} apps</span><BuildLink page={page} place="sticky" campaign={C} ask={ask} className="btn">Build it</BuildLink></StickyBar>
    </div>
  );
}
