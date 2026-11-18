// The typed content behind the search pages (pages-brief Part A3: each page is a content file rendered by its layout).
export type Kind = 'app' | 'auto' | 'ai' | 'browser';
export type Link = { label: string; href: string };

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
  facts: { figure: string; text: string; source: string; href: string; read: string }[];
  questions: { q: string; choices: string[]; picked: string }[];
  steps: { title: string; body: string }[];
  uses: { app: string; name: string; why: string; chips: string[] }[];
  asksFirst: string;
  cadence?: { intro: string; rows: { when: string; tone: string; ask: string }[]; note: string; sources: Link[] };
  limits: string[];
  variations: string[];
  otherWays: { title: string; body: string; sources?: Link[] }[];
  faqs: { q: string; a: string }[];
  related: { href: string; kind: Kind; title: string; line: string }[];
  up: Link[];
};
