// A glossary page, v3 (D253): one JSON per term (src/content/learn/pages), written by the page pipeline (scripts/pages,
// family "learn") and checked by gates-learn.mjs. Short: the definition, one example in Captain, one small comparison.
import type { Kind } from '../types';
import type { UseCasePage } from '../usecase/types';

export type TermPage = {
  slug: string;
  term: string; // as people search it: "AI agent"
  query: string;
  group: 'AI that acts' | 'Automation' | 'Building blocks'; // its group on /learn
  title: string; // under 60 characters, ends " | 50agents"
  description: string; // 120 to 160 characters
  h1: string; // "What is an AI agent?"
  definition: [string, string]; // two sentences to quote; the first is shown large
  example: { kind: Kind; ask: string; why: string; build: UseCasePage['build'] }; // a real starting ask (app templates/list.ts), why it shows the term, Captain's plan
  vs: { term: string; href?: string; rows: { label: string; a: string; b: string }[] }; // the term people confuse it with: 3 rows, a = this term, b = that one
  sources?: { label: string; href: string }[]; // primary sources for facts about the outside world, shown in one line
  links: { label: string; href: string }[]; // 3 reads
  updated: string; // ISO date
};
