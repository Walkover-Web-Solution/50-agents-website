// The typed content behind the search pages (pages-brief Part A3: each page is a content file rendered by its layout).
export type Kind = 'app' | 'auto' | 'ai' | 'browser';
export type Link = { label: string; href: string };

// ---------- the product views (src/site/product/), drawn from the 50agents app, filled with labelled example data ----------

/** A run's status as the app words it (agents/parts.tsx RUN_WORD). */
export type RunStatus = 'Done' | 'Waits on you' | 'Did not work' | 'Working now';
/** A Needs you card for something that reaches outside: who, the subject, the body, the app's three answers. */
export type NeedCard = { by: string; face: string; where: string; ago: string; title: string; rows: { label: string; value: string }[]; body: string[]; actions: string[] };

/** An AI agent's page (features/agents: AgentPage, Overview, Work, Setup) and a result it produced. */
export type AgentView = {
  name: string;
  face: string;
  status: string; // its status line, e.g. "Next run: Tomorrow 9:00 AM"
  tone: 'ok' | 'warn';
  waits?: NeedCard; // Overview: Waits on you
  waiting?: number; // how many wait (default 1)
  latest: { title: string; when: string; summary: string; result: ResultBlock }; // Overview: Latest work
  runs: { title: string; when: string; status: RunStatus }[]; // Overview: Recent runs; Work
  instructions: string[]; // Setup: How it works
  facts: { runs: string; apps: string[]; alone: string; asks: string }; // Setup: The facts
};
/** What a run produced, drawn as the destination shows it. */
export type ResultBlock =
  | { type: 'email'; to: string; subject: string; body: string[] }
  | { type: 'slack'; channel: string; app: string; lines: { b?: string; t: string }[] }
  | { type: 'list'; title: string; items: { b: string; t: string; tag?: string }[] };

/** An automation's page (features/automations: HomeTrack, Steps, RunSteps). */
export type TrackStation = { key: string; mark: 'app' | 'ai' | 'if' | 'set'; app?: string; appName?: string; say: string; today?: number; asks?: boolean; passes?: string[]; settings?: { label: string; value: string }[] };
export type AutomationView = {
  name: string;
  face: string;
  status: string;
  today: { runs: number; did: number; failed: number; credits: number };
  stations: TrackStation[];
  runs: { title: string; when: string; status: RunStatus; steps: { say: string; mark: TrackStation['mark']; app?: string; did: string; ms: number; got?: { label: string; value: string }[] }[] }[];
  waits?: NeedCard;
  sheet?: { name: string; cols: string[]; rows: string[][] }; // the result in the destination
};

/** A browser agent's page (features/browser: its window with sites as bookmarks, Latest work with "Pages it visited"). */
export type BrowserView = {
  name: string;
  face: string;
  status: string;
  live: { title: string; step: string; pages: number; took: string; marks: { site: string; word: string; tone: 'done' | 'now' | 'idle' }[]; page: { site: string; heading: string; plans: { name: string; price: string; note?: string }[] } };
  report: { title: string; when: string; changed: { site: string; plan: string; was: string; now: string }[]; same: string[]; pages: string[] };
  runs: { title: string; when: string; status: RunStatus }[];
  instructions: string[];
  facts: { runs: string; sites: string[]; alone: string; asks: string };
};

/** An app's desk (features/apps: rail, Overview numbers, a board, a table, the crew, a Needs you card), as the invoices desk. */
export type DeskView = {
  name: string;
  faces: string[];
  count: string; // "Live · 12 leads"
  add: string; // "+ Add lead"
  views: [string, string, string]; // Overview, a board, a table: the rail's first three
  rest: string[]; // the rail's other items: the third screen, Crew, Review, Data, Setup, Memory
  numbers: { label: string; value: string; warn?: boolean }[];
  asks: string; // "Closer asks you"
  waiting: string; // "2 waiting"
  need: NeedCard;
  crew: { face: string; name: string; tint: string; line: string }[];
  board: { name: string; tone: string; dot: string; count: number; total?: string; cards: { b: string; lines: string[] }[] }[];
  table: { search: string; shown: string; cols: string[]; rows: { cells: string[]; pill: string; pillTone?: 'warn' | 'ok' | 'info'; flag?: string }[] };
};

export type ProductView =
  | { type: 'invoices' }
  | { type: 'desk'; desk: DeskView }
  | { type: 'agent'; agent: AgentView }
  | { type: 'automation'; automation: AutomationView }
  | { type: 'browser'; browser: BrowserView };

/** Captain's side of the build in the hero: the ask, one question (apps) and the plan card with Build it. */
export type CaptainPlan = { mode: string; name: string; line: string; faces: string[]; rows: { label: string; value: string; face?: string }[] };

export type UseCase = {
  slug: string;
  kind: Kind;
  title: string; // under about 60 characters
  description: string; // about 140 to 155 characters, answer first
  h1: string;
  answer: [string, string]; // the first two sentences
  ask: string; // the words that build it
  updated: string; // ISO date
  published: string;
  promises: string[]; // the three ticks under the hero button
  plan: CaptainPlan; // Captain's plan card in the hero
  heroQuestion?: number; // which of `questions` the hero card shows (apps)
  factsLabel: string;
  facts: { figure: string; text: string; source: string; href: string; read: string }[];
  seeIt: { h2: string; intro: string };
  view: ProductView;
  howH2: string;
  questions?: { q: string; choices: string[]; picked: string }[]; // an app recipe's slots, in order
  planParts?: { title: string; body: string }[]; // AI agents, automations, browser agents: the plan card's parts
  steps: { title: string; body: string }[];
  uses: { app: string; icon?: string; name: string; why: string; chips: string[] }[];
  usesNote: string;
  asksFirst: string;
  table?: { h2: string; intro: string; label: string; done?: string; cols: [string, string, string]; rows: { when: string; tone: string; ask: string }[]; note: string; sources: Link[] };
  yoursIntro: string;
  limits: string[];
  variations: string[];
  otherWaysH2: string;
  otherWays: { title: string; body: string; sources?: Link[] }[];
  faqs: { q: string; a: string }[];
  related: { href: string; kind: Kind; title: string; line: string }[];
  up: Link[];
  finalH2: string;
  byline: string; // how Captain builds it, after the date
};
