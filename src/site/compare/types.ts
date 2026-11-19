// A comparison page, v3 (D253): one JSON per page (src/content/compare/pages), written by the page pipeline
// (scripts/pages, prompt compare.md) and checked by gates-compare.mjs. Facts about other tools are never written here:
// the table draws them from src/content/compare/facts.ts, and every price or count the writing names must match it.
import type { RowKey, ToolId } from '@/content/compare/facts';

type Base = {
  slug: string;
  tool: ToolId; // the tool the page is about
  query: string; // the search it answers
  title: string; // under 60 characters, ends " | 50agents"
  description: string; // 120 to 160 characters, answer first
  h1: string;
  answer: [string, string]; // the short answer: the first two sentences, 40 words at most each
  ask: string; // a real ask, pasted into Captain by every button (exactly the row's ask)
  lede: string; // one sentence under the comparison heading
  pick: {
    us: string[]; // "Pick 50agents if": 2 or 3 lines
    them: string[]; // "Stay on <tool> if" (alternatives) or "Pick <tool> if" (versus): where the other tool is better, 2 or 3 lines
  };
  move: { title: string; body: string }[]; // how to move over: 3 or 4 short numbered rows
  faqs: { q: string; a: string }[]; // 3 to 5, each answer 2 or 3 sentences
  related: { href: string; title: string; line: string }[]; // 3 other comparison pages
  updated: string; // ISO date: the sitemap and "Updated <Month Year>" in the byline
};

export type AltEntry = {
  tool: ToolId;
  suits: string; // who it suits, for this page's reader: 30 words at most
  price: string; // short, from facts.ts only ("Free to start" for 50agents)
  limit: string; // one honest limitation, for this reader: 35 words at most
  limitUrl: string; // the facts.ts page the limitation is read on (50agents: its homepage)
};

export type AltPage = Base & {
  type: 'alternatives';
  notice?: { h: string; body: string }; // a shutdown or closing, said first (sourced from the tool's status fact)
  entries: AltEntry[]; // 50agents first, then 4 to 6 real alternatives
};

export type VsPage = Base & {
  type: 'versus';
  rows: RowKey[]; // the table's rows after Price (free and price are drawn first); each needs a facts.ts cell for both tools
};

export type ComparePage = AltPage | VsPage;
