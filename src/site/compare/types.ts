// A comparison page, v5 (D255, Jii's round 3; v4 was D254): one JSON per page (src/content/compare/pages), written by the page
// pipeline (scripts/pages, prompt compare.md) and checked by gates-compare.mjs. Short everywhere: every limit below is
// a gate. Facts about other tools are never invented here: the versus table draws them from src/content/compare/facts.ts
// (each cell's short `s`), and every price or count the writing names must match it.
import type { RowKey, ToolId } from '@/content/compare/facts';

export type Strength = {
  title: string; // 5 words at most
  line: string; // one line, 16 words at most
  face: 'lead' | 'keeper' | 'writer' | 'scout' | 'sorter'; // Captain, or the crew blob of the kind it is about
};

type Base = {
  slug: string;
  tool: ToolId; // the tool the page is about
  query: string; // the search it answers
  title: string; // under 60 characters, ends " | 50agents"
  description: string; // 120 to 160 characters, answer first
  h1: string;
  tableH2?: string; // the table's heading when it should carry the query ("The best Zapier alternatives, side by side"); 10 words at most; default is generic
  answer: [string, string]; // the short answer: two sentences, 40 words at most in total (meta and JSON-LD, not shown)
  line: string; // the hero's one short line under Captain's box (D255): what 50agents gives here, 14 words at most
  ask: string; // a real ask, pasted into Captain by every button (exactly the row's ask)
  lede: string; // the one line under the table's heading: 14 words at most
  strengths: Strength[]; // where 50agents is good and what it gives: 3 or 4
  move: { title: string; body: string }[]; // how to move over: 3 or 4 steps, title 5 words, body 16 words at most
  faqs: { q: string; a: string }[]; // 6 to 9 (D260), each answer 40 words at most; an answer may carry [label](/path) links (guides/rich.tsx)
  related: { href: string; title: string; line: string }[]; // 3 other comparison pages, line 8 words at most
  updated: string; // ISO date: JSON-LD dateModified and the sitemap only, never shown
};

export type AltEntry = {
  tool: ToolId;
  best: string; // best for: 5 words at most
  price: string; // starting price, short (6 words at most), from facts.ts only ("Free to start" for 50agents)
  diff: string; // one key difference, neutral: 5 words at most
  src: string; // the facts.ts page `diff` and `price` are read on (50agents: its homepage); never shown
};

export type AltPage = Base & {
  type: 'alternatives';
  notice?: { h: string; body: string }; // a shutdown or closing, said first (from the tool's status fact), 30 words at most
  entries: AltEntry[]; // 50agents first, then 4 to 6 real alternatives (no "Staying on" row, D255)
};

export type VsPage = Base & {
  type: 'versus';
  rows: RowKey[]; // the table's rows after the price rows (drawn first); each a 50agents win (isWin in facts.ts, D255)
};

export type ComparePage = AltPage | VsPage;
