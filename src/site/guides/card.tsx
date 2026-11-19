// A guide's link card (the /guides grid and "More guides" at the end of a guide): its cover, its category, the title,
// the first sentence of its short answer and its reading time. The whole card is the link.
import { GuideCover } from './cover';
import { groupSlug, metaLine } from './meta';
import { plain } from './rich';
import type { GuidePage } from './types';

export function GuideCard({ g, h = 'h3', feat = false }: { g: GuidePage; h?: 'h2' | 'h3' | 'p'; feat?: boolean }) {
  const H = h;
  return (
    <a className="gcard" href={`/guides/${g.slug}`} data-group={groupSlug(g.group)} data-feat={feat || undefined}>
      <GuideCover g={g} />
      <span className="gcard-k">{g.group}</span>
      <H className="gcard-t">{g.h1}</H>
      <span className="gcard-l">{plain(g.answer[0])}</span>
      <span className="gcard-m">{metaLine(g)}</span>
    </a>
  );
}
