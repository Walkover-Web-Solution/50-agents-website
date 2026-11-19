// The possibilities gallery (D259), right after a hub's hero: "What you can build with <kind>", one card per job under
// team filters. A card is one plain-language job and the logos of its apps; a tap opens Captain with that exact ask.
// A job that has its own use case page also links "See how" to it. Calm: hairline borders, no faces, no tints.
import type { Kind } from '../types';
import { GALLERY, GALLERY_HEAD, GALLERY_LINE, TEAMS } from '@/content/hubs/gallery';
import { PAGES } from '@/content/use-cases/pages';
import { AppLogo, LIVE } from '../parts';
import { BuildLink } from '../integrations/build-link';
import { appIcon, appName } from '../usecase/apps-data';
import { GalleryFilter } from './gallery-filter';

export function Gallery({ kind, page, label }: { kind: Kind; page: string; label: string }) {
  const cards = GALLERY[kind];
  const teams = TEAMS.map(t => ({ ...t, count: cards.filter(c => c.team === t.slug).length })).filter(t => t.count);
  return (
    <section className="wrap sec gal" id="possibilities">
      <div className="sec-h c"><h2>{GALLERY_HEAD[kind]}</h2><p>{GALLERY_LINE}</p></div>
      <GalleryFilter teams={teams} total={cards.length} label={label}>
        {cards.map(c => {
          const uc = PAGES.find(u => u.ask === c.ask);
          const how = uc && LIVE.has(`/use-cases/${uc.slug}`) ? `/use-cases/${uc.slug}` : null;
          return (
            <article key={c.ask} className="gal-card" data-team={c.team}>
              <div className="gal-apps">
                {c.apps.length
                  ? c.apps.map(a => <span key={a} title={appName(a)}><AppLogo app={a} icon={appIcon(a)} size={26} /><span className="sr">{appName(a)}</span></span>)
                  : <span className="gal-none">{kind === 'browser' ? 'Any website' : 'No app needed'}</span>}
              </div>
              <h3><BuildLink className="gal-go" page={page} place="gallery" campaign="seo-hub" ask={c.ask}>{c.job}</BuildLink></h3>
              <div className="gal-foot">
                <span className="gal-ask" aria-hidden="true">Ask Captain <span>→</span></span>
                {how && <a className="gal-how" href={how}>See how</a>}
              </div>
            </article>
          );
        })}
      </GalleryFilter>
    </section>
  );
}
