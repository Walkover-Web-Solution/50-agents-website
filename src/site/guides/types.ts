// A guide, v3 (D253): one JSON per page (src/content/guides/pages), written by the page pipeline (scripts/pages) and
// checked by scripts/pages/gates-guides.mjs. A reading page: the short answer, the method as numbered steps, a worked
// example drawn from `example` (the ask typed into Captain, then the plan), what can go wrong, questions, one sources list.
// Text fields take a small markup (./rich.tsx): [label](/path) is an internal link, **bold** is bold. Source links live
// in `sources` only.
import type { Kind } from '../types';
import type { UseCasePage } from '../usecase/types';

export type GuideGroup = 'AI agents' | 'Automations' | 'Browser agents' | 'Apps' | 'Email and calendar' | 'Choosing tools';

/** A block of a context section: a paragraph, a list, or a table (no pictures: the only visual is the worked example). */
export type GuideBlock = { p: string } | { ul: string[] } | { table: { head: string[]; rows: string[][] } };

export type GuidePage = {
  slug: string;
  group: GuideGroup;
  kind: Kind; // the tint the page takes
  query: string; // the search it answers
  title: string; // under 60 characters, ends " | 50agents"
  description: string; // 120 to 160 characters, answer first
  h1: string;
  answer: [string, string]; // "The short answer": the first two sentences
  sections: { id: string; h2: string; body: GuideBlock[] }[]; // 1 to 3 sections of context before the method
  method: { h2: string; intro?: string; steps: { title: string; body: string }[] }; // 4 to 7 numbered steps
  /** The worked example in 50agents: its ask typed into Captain and its plan; or, when the guide overlaps a use case
   *  page (src/content/use-cases/pages), `useCase`, and the page links to it instead of repeating it. */
  example: { h2: string; body: string[]; useCase?: string; kind?: Kind; ask?: string; build?: UseCasePage['build'] };
  wrong: { title: string; body: string }[]; // 3 to 6, calm
  faqs: { q: string; a: string }[]; // 3 to 5
  sources: { label: string; href: string }[]; // every source, once, at the end
  pricesChecked?: string; // ISO date; only on a guide that names other tools' prices
  related: string[]; // guide slugs
  updated: string; // ISO date, shown as "Updated <Month Year>"
};
