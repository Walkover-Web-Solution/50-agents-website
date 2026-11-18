// The typed content behind the guides (pages-brief B5) and the role pages (B7), and the product views they draw.
// Text fields take a small markup (src/site/guides/rich.tsx): [label](https://...) is a source link, [label](/path) an
// internal link (drawn as text until that page exists), **bold** is bold.
import type { Kind } from '@/site/types';

export type Src = { label: string; href: string; read?: string };

// ---------- product views (D252: drawn from the 50agents app's own screens, labels as the app writes them) ----------

/** An app as the app shows it: its name and, when known, its catalog icon (viaSocket's catalog, read 19 Nov 2026). */
export type AppRef = { name: string; icon?: string };

/** Captain's plan card for an ask (agents/parts.tsx PlanCard): name, job, steps, When, Uses, Asks first, Build it. */
export type PlanView = {
  type: 'plan';
  ask: string;
  face: string; // crew face id
  name: string;
  job: string;
  steps: string[];
  when: string;
  uses: AppRef[];
  asksFirst: string;
  question?: { q: string; choices: string[]; picked: string };
};

/** An automation's track (automations/track.tsx): one card per start and step, data passed on, Asks you first. */
export type Station = { mark: 'app' | 'ai' | 'if' | 'set' | 'clock' | 'delay' | 'call'; app?: AppRef; say: string; passes?: string[]; asks?: boolean; did?: 'Ran' | 'Held, not sent' | 'Not needed this time' | 'Did not work'; values?: [string, string][] };
export type TrackView = {
  type: 'track';
  name: string;
  status: string; // e.g. "Live · next run Monday 9:00"
  today?: [string, string][]; // the Overview numbers: Runs today, Did something, Did not work, Credits today
  sample?: { title: string; sub?: string };
  stations: Station[];
  tested?: string;
};

/** A Needs you card (needs/card.tsx): who asks, where from, the question or the email, one button per answer. */
export type NeedView = {
  type: 'need';
  face: string;
  who: string;
  from: string;
  when: string;
  title: string;
  label?: string; // the kind line, e.g. "SEND AN EMAIL"
  app?: AppRef;
  mail?: { to: string; subject: string; body: string[] };
  facts?: [string, string][];
  suggests?: string;
  choices: string[];
};

/** An AI agent's page (agents/client.tsx): header, rail, Overview with Waits on you, Latest work and Recent runs. */
export type AgentView = {
  type: 'agent';
  face: string;
  name: string;
  kindWord: 'AI agent' | 'browser agent' | 'automation';
  status: string;
  latest: { title: string; when: string; summary: string; body?: string[]; state: 'Done' | 'Waits on you' | 'Did not work' };
  need?: NeedView;
  runs: { title: string; when: string; state: 'Done' | 'Waits on you' | 'Did not work' }[];
  setup?: [string, string][];
};

/** A browser agent at work (browser/agent-kind.tsx): its window, bookmarks, the page it reads; then its work item. */
export type BrowserView = {
  type: 'browser';
  name: string;
  page: { title: string; url: string };
  sites: string[];
  reading: string;
  progress: string;
  item: { title: string; summary: string; rows?: [string, string, string][]; pages: string[] };
};

/** An app built by Captain (apps recipes): its rail of views, Overview numbers, and one view as a table or a board. */
export type AppDeskView = {
  type: 'app';
  face: string[];
  name: string;
  status: string;
  rail: string[];
  on: string;
  numbers?: [string, string, boolean?][];
  table?: { head: string[]; rows: string[][] };
  board?: { name: string; tone: string; dot: string; total?: string; cards: { title: string; lines: string[] }[] }[];
  crew?: { face: string; name: string; word: string; does: string };
};

/** The other app the work lands in, drawn plainly (pages-brief Part C: "the Google Sheet with the rows added",
 *  "the Slack message arriving"). Never a mock-up of 50agents' own screens. */
export type SheetView = { type: 'sheet'; file: string; tab: string; head: string[]; rows: string[][]; fresh?: number };
export type SlackView = { type: 'slack'; channel: string; from: string; time: string; lines: string[] };

export type View = PlanView | TrackView | NeedView | AgentView | BrowserView | AppDeskView | SheetView | SlackView;

// ---------- the guide ----------

export type Block =
  | { p: string }
  | { ul: string[] }
  | { steps: { title: string; body: string }[] }
  | { table: { head: string[]; rows: string[][]; caption?: string } }
  | { note: string }
  | { ask: string }
  | { view: View; caption: string };

export type Section = { id: string; h2: string; body: Block[] };

export type Guide = {
  slug: string;
  n: number; // its number in pages-brief B5
  group: 'AI agents' | 'Automations' | 'Browser agents' | 'Apps' | 'Email and calendar' | 'Choosing tools';
  kind: Kind; // the tint the page takes
  title: string; // under about 60 characters
  description: string; // about 140 to 155 characters, answer first
  h1: string;
  short: string; // "The short answer": the answer in the first two sentences
  published: string;
  updated: string;
  sections: Section[];
  wrong: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
  sources: Src[];
  /** The ready-to-build page this guide pairs with (B5: guides 7 to 10). */
  pair?: { href: string; label: string; line: string };
  related: string[]; // guide slugs
};

// ---------- the role page ----------

export type Role = {
  slug: string;
  role: string; // "sales teams"
  kind: Kind;
  title: string;
  description: string;
  h1: string;
  answer: [string, string];
  updated: string;
  jobs: { title: string; body: string; kind: Kind; ask?: string; href?: string }[];
  useCases: { href: string; title: string; line: string; kind: Kind }[];
  apps: { slug: string; name: string; icon: string; line: string }[];
  appsNote: string;
  example: { h2: string; intro: string; ask: string; view: View; caption: string; after: string[] };
  notYet: string[];
  guides: string[]; // guide slugs
  faqs: { q: string; a: string }[];
  sources?: Src[];
};
