// A link card (the shared `cards3` pattern) for any page of the site, its kind and line read from that page's data:
// a hub, a glossary term, a use case; anything else shows its label alone. Links to pages not built yet are dropped.
import { HUBS } from '@/content/hubs';
import { TERMS } from '@/content/learn';
import { PAGES } from '@/content/use-cases/pages';
import { Face, KINDS, LIVE } from '../parts';

const FAMILY: [string, string][] = [['/guides/', 'Guide'], ['/compare/', 'Compare'], ['/learn/', 'Glossary'], ['/for/', 'For teams'], ['/use-cases/', 'Use case']];

export function ReadCard({ href, label }: { href: string; label: string }) {
  const hub = HUBS.find(h => `/${h.slug}` === href);
  const term = TERMS.find(t => `/learn/${t.slug}` === href);
  const uc = PAGES.find(u => `/use-cases/${u.slug}` === href);
  const kind = hub?.kind ?? uc?.kind;
  const tag = kind ? KINDS[kind].label : FAMILY.find(([p]) => href.startsWith(p))?.[1] ?? '50agents';
  const line = hub?.line ?? (term ? term.definition[0] : uc ? `${uc.build.name}: ${uc.build.line}` : undefined);
  return (
    <a href={href}>
      <span className="k">{kind && <Face id={KINDS[kind].face} size={20} />}{tag}</span>
      <b>{label}</b>
      {line && <span>{line}</span>}
    </a>
  );
}

export const live = <T extends { href: string }>(xs: T[]) => xs.filter(x => LIVE.has(x.href));
