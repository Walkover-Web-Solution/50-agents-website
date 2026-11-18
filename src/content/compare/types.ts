// The shape of a comparison page (pages-brief B4). Facts about tools live in facts.ts; pages hold only the writing.
import type { RowKey, ToolId } from './facts';

type Base = {
  slug: string;
  tool: ToolId; // the tool the page is about
  title: string; // under about 60 characters
  description: string; // about 140 to 155 characters, answer first
  h1: string;
  answer: [string, string]; // the short answer: the first two sentences
  published: string; // ISO
  updated: string; // ISO
  faqs: { q: string; a: string }[];
  related: { href: string; title: string; line: string }[];
  move: { title: string; body: string }[];
};

export type AltEntry = {
  tool: ToolId;
  suits: string; // who it suits, for this page's reader
  limit: string; // one honest limitation, for this reader
  limitUrl: string; // where the limitation is shown
};

export type AltPage = Base & {
  type: 'alternatives';
  why: { h: string; body: string[] }; // why people on this tool look elsewhere
  picks: { need: string; tool: ToolId }[]; // the quick picks
  entries: AltEntry[]; // 50agents plus 4 to 6 real alternatives
  stay: { h: string; items: string[] };
  notice?: { h: string; body: string }; // a shutdown or closing, said first
};

export type VsPage = Base & {
  type: 'versus';
  rows: RowKey[];
  verdict: string[]; // a short plain read of the table
  pick: { us: string[]; them: string[] };
};

export type ComparePage = AltPage | VsPage;
