// The possibilities gallery (D259, D260), right after a hub's hero: "What you can build with <kind>", one card per job under
// team filters. A card is one plain-language job and the logos of its apps; the whole card opens Captain with that exact
// ask, and a small round arrow at its corner says so. Four rows show, "Load more" adds four; every card is in the HTML.
import type { Kind } from '../types';
import { GALLERY, GALLERY_HEAD, GALLERY_LINE, TEAMS } from '@/content/hubs/gallery';
import { AppLogo } from '../parts';
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
        {cards.map(c => (
          <article key={c.ask} className="gal-card" data-team={c.team}>
            <div className="gal-apps">
              {c.apps.length
                ? c.apps.map(a => <span key={a} title={appName(a)}><AppLogo app={a} icon={appIcon(a)} size={26} /><span className="sr">{appName(a)}</span></span>)
                : <span className="gal-none">{kind === 'browser' ? 'Any website' : 'No app needed'}</span>}
            </div>
            <h3><BuildLink className="gal-go" page={page} place="gallery" campaign="seo-hub" ask={c.ask}>{c.job}<span className="sr"> (opens Captain)</span></BuildLink></h3>
            <span className="gal-arrow" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h9.5M8.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
          </article>
        ))}
      </GalleryFilter>
    </section>
  );
}
