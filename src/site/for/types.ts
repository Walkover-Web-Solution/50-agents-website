// A role page, v3 (D253): one JSON per page (src/content/for/pages), written by the page pipeline (scripts/pages) and
// checked by scripts/pages/gates-for.mjs. A centred hero with the worked example's ask typed into Captain and its plan,
// the 5 jobs the role hands off first (linked to their use case pages where those exist), the role's apps, questions.
import type { Kind } from '../types';
import type { UseCasePage } from '../usecase/types';

export type RolePage = {
  slug: string;
  role: string; // "sales teams", as it reads mid-sentence
  label: string; // "Sales", for links to the page
  kind: Kind; // the tint the page takes
  query: string;
  title: string; // under 60 characters, ends " | 50agents"
  description: string; // 120 to 160 characters, answer first
  h1: string;
  answer: [string, string]; // the first two sentences
  /** The worked example: its ask is typed into Captain in the hero and pasted by every button; its plan shows under it. */
  example: { kind: Kind; ask: string; build: UseCasePage['build']; useCase?: string };
  jobs: { title: string; body: string; kind: Kind; ask: string; useCase?: string }[]; // exactly 5, body 30 words at most
  category: string; // catalog category for the apps wall (src/content/integrations/categories.ts)
  apps: string[]; // 6 to 8 catalog slugs this role uses most, shown first
  faqs: { q: string; a: string }[]; // 4 or 5; one says what it does not do yet
  sources?: { label: string; href: string }[];
  guides: string[]; // guide slugs
  updated: string; // ISO date, shown as "Updated <Month Year>"
};
