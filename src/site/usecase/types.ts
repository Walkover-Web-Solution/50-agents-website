// A use case page, v3 (D253): one JSON per page, written by the page pipeline (scripts/pages) and checked by its gates.
// Every visual on the page is drawn from these fields, so no page is designed by hand.
import type { Kind } from '../types';

export type StepKey = 'ask' | 'plan' | 'connect' | 'run' | 'approve' | 'result';

export type UseCasePage = {
  slug: string;
  kind: Kind;
  query: string; // the search it answers
  category: string; // catalog category for the apps wall (src/content/integrations/categories.ts)
  title: string; // under 60 characters
  description: string; // 140 to 155 characters, answer first
  h1: string;
  /** The page's own section headings (SEO pass 01): they name the job, never "How it works" or "Other ways to do it". */
  h2: {
    how: string; // "How to <the job>" over the stepper, the query's own words, 10 words at most
    compare: string; // "Other ways to <the job>" over the comparison table, 10 words at most
  };
  answer: [string, string]; // the first two sentences
  ask: string; // the words that build it; pasted into Captain by every button
  stat?: { text: string; source: string; href: string }; // at most one, a sentence, never a big figure
  build: {
    name: string; // what Captain makes: "Invoices desk"
    line: string; // one line under the name
    when: string; // when it runs: "A day after each invoice is due"
    does: string[]; // 2 or 3 short lines
    apps: string[]; // catalog slugs it connects (may be empty for browser agents)
    asksFirst: string; // short: "Every email to a client"
  };
  steps: { key: StepKey; title: string; body: string }[]; // 4 or 5, each body 25 words at most
  run: { when: string; did: string }[]; // 3 example lines for the "it runs" picture
  approval?: { title: string; to?: string; lines: string[]; button: string }; // the Needs you picture
  result?: { title: string; lines: string[] }; // the result picture, when nothing waits for approval
  compare: {
    methods: string[]; // 3 other ways, then 50agents is added last
    rows: { label: string; cells: string[] }[]; // 4 or 5; each cell "Yes", "No", "Partly" or 6 words at most; last cell is 50agents
    sources?: { label: string; href: string }[];
  };
  faqs: { q: string; a: string }[]; // 4 to 6, each answer 2 or 3 sentences; an answer may carry [label](/path) links (rich.tsx) to a guide or comparison
  tags: string[]; // for related use cases
  updated: string; // ISO date, used in the sitemap and as "Updated <Month Year>"
};
