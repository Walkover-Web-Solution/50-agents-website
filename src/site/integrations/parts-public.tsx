// Integration UI without client list boxes (Axien read.page-structure): safe for /integrations index imports.
import { Face, MaybeLink } from '@/site/parts';
import { BuildLink } from './build-link';
import { CatPick, Directory } from './directory';
import { CATEGORIES } from '@/content/integrations/categories';
export const BASE = 'https://50agents.com';
export type Campaign = 'seo-integration' | 'seo-pair' | 'seo-category' | 'seo-index';

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

export function LdScript({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

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
              <a href={`/integrations/${a.s}`}><b>{a.n}</b></a>
            </li>
          ))}
        </ul>
      </Directory>
    </div>
  );
}