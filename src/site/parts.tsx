// Small shared pieces of the search pages: crew faces, app logos, the kind badge, breadcrumbs, the button.
import { BuildLink } from './integrations/build-link';
import { FACES } from './faces';
import type { Kind } from './types';

// The kinds, each with its homepage tint and the crew member who stands for it (landing design system).
export const KINDS: Record<Kind, { label: string; tint: string; face: string; hub: string }> = {
  app: { label: 'App', tint: '#E2E9FF', face: 'sorter', hub: '/apps' },
  auto: { label: 'Automation', tint: '#FFEDC2', face: 'keeper', hub: '/automations' },
  ai: { label: 'AI agent', tint: '#FFE1D6', face: 'writer', hub: '/ai-agents' },
  browser: { label: 'Browser agent', tint: '#E8E0FF', face: 'scout', hub: '/browser-agents' },
};

import { LIVE } from './routes';
export { LIVE };
// A link to a page that doesn't exist yet is drawn as plain text, never a 404.
export function MaybeLink({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
  return LIVE.has(href) ? <a href={href} className={className}>{children}</a> : <span className={className} data-soon={href}>{children}</span>;
}

// A kind's face: one crew member, and for apps a small crew (Jii, round 6: "blob crew for apps"), since an app is a
// team of AI agents and automations around your records.
export const APP_CREW = ['sorter', 'closer', 'writer'];
export function KindFace({ kind, size = 24 }: { kind: Kind; size?: number }) {
  if (kind !== 'app') return <Face id={KINDS[kind].face} size={size} />;
  const s = Math.round(size * 0.78);
  return <span className="kind-crew" aria-hidden="true">{APP_CREW.map(id => <Face key={id} id={id} size={s} />)}</span>;
}

export function Face({ id, size = 24, className = '' }: { id: string; size?: number; className?: string }) {
  return <span className={`face ${className}`} style={{ height: size }} aria-hidden="true" dangerouslySetInnerHTML={{ __html: FACES[id] ?? FACES.keeper }} />;
}

const APP_COLOUR: Record<string, string> = { gmail: '#EA4335', googlesheets: '#34A853', hubspot: '#FF7A59', slack: '#4A154B', stripe: '#635BFF', quickbooks: '#2CA01C', xero: '#13B5EA' };
// An app's logo: its catalog icon when given (viaSocket's catalog, e.g. stuff.thingsofbrand.com), else simple-icons.
export function AppLogo({ app, size = 20, icon, eager = false }: { app: string; size?: number; icon?: string; eager?: boolean }) {
  // eslint-disable-next-line @next/next/no-img-element
  if (icon) return <img src={icon} alt="" width={size} height={size} loading={eager ? 'eager' : 'lazy'} style={{ borderRadius: size / 5, objectFit: 'contain', flex: 'none' }} />;
  if (app === 'file')
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#111214" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5M9 13h6M9 17h6" />
      </svg>
    );
  const url = `https://cdn.jsdelivr.net/npm/simple-icons@13.21.0/icons/${app}.svg`;
  return <i className="applogo" aria-hidden="true" style={{ width: size, height: size, background: APP_COLOUR[app] ?? '#111214', WebkitMask: `url(${url}) center/contain no-repeat`, mask: `url(${url}) center/contain no-repeat` }} />;
}

export function KindBadge({ kind }: { kind: Kind }) {
  const k = KINDS[kind];
  return (
    <a className="kind" href={LIVE.has(k.hub) ? k.hub : undefined} style={{ ['--k' as string]: k.tint }}>
      <KindFace kind={kind} size={22} />
      {k.label}
    </a>
  );
}

export function Crumbs({ trail }: { trail: { label: string; href?: string }[] }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol>
        {trail.map((t, i) => (
          <li key={i}>{t.href && i < trail.length - 1 ? <MaybeLink href={t.href}>{t.label}</MaybeLink> : <span aria-current={i === trail.length - 1 ? 'page' : undefined}>{t.label}</span>}</li>
        ))}
      </ol>
    </nav>
  );
}

// "Build this with Captain": sign-up with the page's UTMs (campaign seo-<family>, content <page>__<place>) and its ask as
// `draft`, which the app keeps through sign-in and puts in Captain's box (app/src/server/auth.ts, spec search-draft).
export function Cta({ page, place, children = 'Build this with Captain', ghost = false, ask, campaign = 'seo-use-case' }: { page: string; place: string; children?: React.ReactNode; ghost?: boolean; ask?: string; campaign?: string }) {
  return <BuildLink page={page} place={place} campaign={campaign} ask={ask} className={ghost ? 'btn ghost' : 'btn'}>{children}</BuildLink>;
}

export function Wordmark({ face = 'writer', size = 26 }: { face?: string; size?: number }) {
  return (
    <a className="wm" href="/" aria-label="50agents, from viaSocket" style={{ fontSize: size }}>
      <span className="wm-w" aria-hidden="true">5<Face id={face} size={size * 0.92} />agents</span>
      <span className="wm-by" aria-hidden="true">from viaSocket</span>
      <span className="sr">50agents, from viaSocket</span>
    </a>
  );
}
