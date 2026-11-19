// The possibilities gallery (D259, D260), right after a hub's hero: "What you can build with <kind>", one card per job under
// team filters. A card is one plain-language job and the logos of its apps; the whole card opens Captain with that exact
// ask, and a small round arrow at its corner says so. Four rows show, "Load more" adds four; every card is in the HTML.
import type { Kind } from '../types';
import { GALLERY, GALLERY_HEAD, GALLERY_LINE, TEAMS } from '@/content/hubs/gallery';
import { AppLogo, KINDS, KindFace } from '../parts';
import { BuildLink } from '../integrations/build-link';
import { appIcon, appName } from '../usecase/apps-data';
import { GalleryFilter } from './gallery-filter';

// Each card wears a very soft tint of its lead app's brand colour (Jii, round 6: "very soft apps-used based colors");
// the lead app is the first one that is not Gmail, so the many Gmail cards don't all turn red. No app: the kind's tint.
const BRAND: Record<string, string> = {
  hubspot: '#FF7A59', 'google-calendar': '#4285F4', pipedrive: '#1A9E5A', calendly: '#006BFF', gmail: '#EA4335', freshdesk: '#25C16F',
  stripe: '#635BFF', quickbooks: '#2CA01C', xero: '#13B5EA', 'google-docs': '#4285F4', slack: '#E01E5A', clickup: '#7B68EE',
  notion: '#8A8A8A', shopify: '#95BF47', woocommerce: '#7F54B3', 'facebook-lead-ads': '#1877F2', typeform: '#8A8A8A',
  docusign: '#FFB800', 'google-forms': '#673AB7', intercom: '#1F8DED', razorpay: '#3395FF', chargebee: '#FF3300',
  jotform: '#FF6100', 'google-drive': '#1FA463', trello: '#0079BF', 'google-sheets': '#34A853',
};
function tint(apps: string[], kind: Kind) {
  const lead = apps.find(a => a !== 'gmail' && BRAND[a]) ?? apps.find(a => BRAND[a]);
  return lead ? BRAND[lead] : KINDS[kind].tint;
}

export function Gallery({ kind, page, label }: { kind: Kind; page: string; label: string }) {
  const cards = GALLERY[kind];
  const teams = TEAMS.map(t => ({ ...t, count: cards.filter(c => c.team === t.slug).length })).filter(t => t.count);
  return (
    <section className="wrap sec gal" id="possibilities">
      <div className="sec-h c"><h2>{GALLERY_HEAD[kind]}</h2><p>{GALLERY_LINE}</p></div>
      <GalleryFilter teams={teams} total={cards.length} label={label}>
        {cards.map(c => (
          <article key={c.ask} className="gal-card" data-team={c.team} style={{ ['--app' as string]: tint(c.apps, kind) }}>
            <div className="gal-apps">
              {c.apps.length
                ? c.apps.map(a => <span key={a} title={appName(a)}><AppLogo app={a} icon={appIcon(a)} size={26} /><span className="sr">{appName(a)}</span></span>)
                : <span className="gal-kind" style={{ background: KINDS[kind].tint }} aria-hidden="true"><KindFace kind={kind} size={18} /></span>}
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
