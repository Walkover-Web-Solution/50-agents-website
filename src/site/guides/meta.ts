// What a guide's cards and byline say about it, from its own data: reading time (all of its text at 200 words a minute)
// only (D258: no step counts). No dates, no author names, no sources (D254).
import { plain } from './rich';
import type { Choice, ChoiceAnswer, GuidePage } from './types';

const isChoice = (x: Choice | ChoiceAnswer): x is Choice => 'q' in x;
const chooser = (c: Choice): string[] => [c.q, ...c.options.flatMap(o => [o.label, ...(isChoice(o.then) ? chooser(o.then) : [o.then.answer, o.then.why])])];

export function guideWords(g: GuidePage) {
  const t = [g.h1, ...g.answer, ...(g.chooser ? [g.chooser.h2, ...chooser(g.chooser.root)] : []),
    ...g.sections.flatMap(s => [s.h2, ...s.body.flatMap(b => ('p' in b ? [b.p] : 'ul' in b ? b.ul : b.table.rows.flat()))]),
    g.method.h2, ...g.method.steps.flatMap(s => [s.title, s.body, s.note?.text ?? '']), g.captain.line,
    ...g.wrong.flatMap(w => [w.title, w.body]), ...g.faqs.flatMap(f => [f.q, f.a])];
  return plain(t.join(' ')).split(/\s+/).filter(Boolean).length;
}

export const readMinutes = (g: GuidePage) => Math.max(2, Math.round(guideWords(g) / 200));
export const metaLine = (g: GuidePage) => `${readMinutes(g)} min read`;
export const groupSlug = (group: string) => group.toLowerCase().replace(/[^a-z0-9]+/g, '-');
