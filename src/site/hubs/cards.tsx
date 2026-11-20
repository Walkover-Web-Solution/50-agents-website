// A link card (the shared `cards3` pattern) for any page of the site, its kind and line read from that page's data:
// a hub, a glossary term, a use case; anything else shows its label alone. Links to pages not built yet are dropped.
import { HUBS } from '@/content/hubs';
import { TERMS } from '@/content/learn';
import { PAGES } from '@/content/use-cases/pages';
import { GUIDES } from '@/content/guides/pages';
import { COMPARE } from '@/content/compare/pages';
import { Face, KINDS, LIVE, KindFace } from '../parts';

const FAMILY: [string, string][] = [['/guides/', 'Guide'], ['/compare/', 'Compare'], ['/learn/', 'Glossary'], ['/for/', 'For teams'], ['/use-cases/', 'Use case']];

export function ReadCard({ href, label }: { href: string; label: string }) {
  const hub = HUBS.find(h => `/${h.slug}` === href);
  const term = TERMS.find(t => `/learn/${t.slug}` === href);
  const uc = PAGES.find(u => `/use-cases/${u.slug}` === href);
  const guide = GUIDES.find(g => `/guides/${g.slug}` === href);
  const cmp = COMPARE.find(c => `/compare/${c.slug}` === href);
  const kind = hub?.kind ?? uc?.kind ?? guide?.kind;
  const fam = FAMILY.find(([p]) => href.startsWith(p))?.[1];
  const tag = guide || cmp ? fam! : kind ? KINDS[kind].label : fam ?? '50agents';
  // Round 6 (Jii, "no one is gonna want to click here"): every card says what you get from the page, wears its kind's
  // soft tint, and ends with a "Read" cue.
  const line = hub?.line ?? (term ? term.definition[0] : uc ? `${uc.build.name}: ${uc.build.line}` : guide ? guide.description : cmp ? cmp.line : undefined);
  return (
    <a href={href} className="readcard" style={{ ['--k' as string]: kind ? KINDS[kind].tint : '#F2F1ED' }}>
      {/* Round B, B5: a cover in the kind's colour with its crew, so the card reads as something to open */}
      <span className="rc-cover" aria-hidden="true">{kind ? <KindFace kind={kind} size={46} /> : <Face id="lead" size={46} />}<Face id={cmp ? 'closer' : guide ? 'keeper' : 'rosa'} size={34} /></span>
      <span className="k">{kind && <KindFace kind={kind} size={20} />}{tag}</span>
      <b>{label}</b>
      {line && <span className="rc-line">{line}</span>}
      <span className="rc-go" aria-hidden="true">Read <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h9.5M8.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
    </a>
  );
}

export const live = <T extends { href: string }>(xs: T[]) => xs.filter(x => LIVE.has(x.href));
