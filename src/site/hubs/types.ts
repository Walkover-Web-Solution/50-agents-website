// A kind hub, v3 (D253): one JSON per hub (src/content/hubs/pages), written by the page pipeline (scripts/pages, family
// "hubs") and checked by gates-hubs.mjs. The template draws every visual from these fields and from the use case pages.
import type { Kind } from '../types';
import type { UseCasePage } from '../usecase/types';

export type HubPage = {
  slug: string; // 'ai-agents': the page is at /<slug>
  kind: Kind;
  query: string; // the searches it answers
  title: string; // under 60 characters, ends " | 50agents"
  description: string; // 120 to 160 characters, answer first
  crumb: string; // 'AI agents'
  h1: string;
  line: string; // one line for link cards on other pages, under 12 words
  answer: [string, string]; // the kind in two sentences, 40 words at most in total (D254)
  example: { ask: string; build: UseCasePage['build'] }; // a real starting ask of this kind (app templates/list.ts); `build` is kept as a fact, not drawn
  asks: string[]; // the hero film's asks (D260): 5 or 6, the first is example.ask, each one of this kind's gallery asks
  useCases: string; // the line under the use case cards' heading, 14 words at most
  apps: string[]; // the apps it is most used with (catalog slugs): the first three are named in "Works with ...", all lead the marquee
  faqs: { q: string; a: string }[]; // 5 to 7, each answer 2 or 3 sentences; an answer may carry [label](/path) links (guides/rich.tsx)
  links: { label: string; href: string }[]; // 3 reads: a guide, a glossary term, a comparison
  final: string; // the closing heading
  updated: string; // ISO date, for JSON-LD dateModified only: no date is shown (D254)
};
