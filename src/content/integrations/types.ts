import type { Kind } from '@/site/types';

// A flagship integration page (pages-brief B3): written by hand, on top of the same catalog data every app page has.
// Event names in `kinds[].uses` and `groups[].events` must be the catalog's exact names (checked by scripts/check-integrations.mjs).
export type Flagship = {
  slug: string;
  title: string; // under about 60 characters
  description: string; // about 140 to 155 characters, answer first
  answer: [string, string];
  heroAsk: string;
  kinds: { kind: Kind; does: string; ask: string; uses: string[] }[];
  groups: { label: string; line: string; events: string[] }[];
  native?: { head: string; body: string; better: string; sources: { label: string; href: string }[] };
  useCases: { slug: string; kind: Kind; title: string; line: string }[];
  guides: { slug: string; title: string }[];
  faqs: { q: string; a: string }[];
  updated: string;
};
