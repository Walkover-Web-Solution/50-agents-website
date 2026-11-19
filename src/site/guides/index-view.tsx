// The /guides index, v5 (D255 round 3, "lifeless"): the heading, one featured guide drawn large with its cover, then
// every guide as a card with its cover under category filters. The covers come from each guide's data (./cover.tsx).
// All text is server-rendered; the filter only hides cards. No dates, no authors, no sources.
import type { IndexPage } from '@/content/pages/indexes';
import { INDEX_ASK } from '@/content/pages/indexes';
import { GUIDES } from '@/content/guides/pages';
import { Crumbs, Cta, Face, LIVE } from '../parts';
import { crumbsLd, Ld } from '../hubs/meta';
import { GuideCard } from './card';
import { GuideCover } from './cover';
import { GroupFilter } from './filter';
import { groupSlug, metaLine } from './meta';
import { rich } from './rich';
import type { GuideGroup } from './types';
import '../css/usecase.css';
import '../css/pages.css';
import '../css/guides.css';

const ORDER: GuideGroup[] = ['AI agents', 'Automations', 'Browser agents', 'Apps', 'Email and calendar', 'Choosing tools'];

export function GuidesIndex({ ix }: { ix: IndexPage }) {
  const live = GUIDES.filter(g => LIVE.has(`/guides/${g.slug}`));
  const all = ORDER.flatMap(o => live.filter(g => g.group === o));
  const feat = all.find(g => g.slug === ix.featured) ?? all[0];
  const groups = ORDER.map(o => ({ slug: groupSlug(o), label: o, count: all.filter(g => g.group === o).length })).filter(g => g.count);
  return (
    <div className="page gx">
      <Ld data={[crumbsLd([{ name: 'Home' }, { name: ix.crumb, path: ix.path }]), {
        '@context': 'https://schema.org', '@type': 'CollectionPage', name: ix.h1, description: ix.description, url: `https://50agents.com${ix.path}`, dateModified: ix.updated,
        mainEntity: { '@type': 'ItemList', itemListElement: all.map((g, i) => ({ '@type': 'ListItem', position: i + 1, url: `https://50agents.com/guides/${g.slug}`, name: g.h1 })) },
      }]} />
      <div className="wrap"><Crumbs trail={[{ label: 'Home', href: '/' }, { label: ix.crumb }]} /></div>
      <section className="wrap ix3-hero">
        <h1>{ix.h1}</h1>
        <p>{ix.line}</p>
      </section>

      <section className="wrap sec gx-first" aria-label="Start here">
        <a className="gfeat" href={`/guides/${feat.slug}`}>
          <GuideCover g={feat} size="feature" />
          <span className="gfeat-t">
            <span className="gcard-k">Start here · {feat.group}</span>
            <h2>{feat.h1}</h2>
            <span className="gfeat-l">{rich(feat.answer[0])} {rich(feat.answer[1])}</span>
            <span className="gcard-m">{metaLine(feat)}</span>
            <span className="gfeat-go">Read the guide <span aria-hidden="true">→</span></span>
          </span>
        </a>
      </section>

      <section className="wrap sec" aria-labelledby="every">
        <div className="sec-h c"><h2 id="every">Every guide</h2><p>Each one works with any tool. Pick a category to narrow it down.</p></div>
        <GroupFilter groups={groups} total={all.length}>
          {all.map(g => <GuideCard key={g.slug} g={g} feat={g.slug === feat.slug} />)}
        </GroupFilter>
      </section>

      <section className="wrap sec">
        <div className="final">
          <h2>Not sure where to start?</h2>
          <p>Tell Captain &ldquo;{INDEX_ASK}&rdquo;. Free to start.</p>
          <Cta campaign="seo-index" page="index-guides" place="final" ask={INDEX_ASK}>Ask Captain</Cta>
          <span className="peek l" aria-hidden="true"><Face id="writer" size={52} /><Face id="keeper" size={44} /></span>
          <span className="peek r" aria-hidden="true"><Face id="lead" size={50} /><Face id="scout" size={46} /></span>
        </div>
      </section>
    </div>
  );
}
