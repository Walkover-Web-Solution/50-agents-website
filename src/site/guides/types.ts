// A guide, v4 (D254, Jii's round 2): one JSON per page (src/content/guides/pages), written by the page pipeline
// (scripts/pages, prompt scripts/pages/prompts/guides.md) and checked by scripts/pages/gates-guides.mjs.
// A reading page, to the point: the short answer, an optional "which one do I need" chooser, at most two short sections
// of context, the steps (the reader ticks them off; Captain's film sits inside the step where 50agents does the job),
// what can go wrong, questions. No sources, no dates on the page, no prices or credits for 50agents.
// Text fields take a small markup (./rich.tsx): [label](/path) is an internal link, **bold** is bold.
import type { Kind } from '../types';

export type GuideGroup = 'AI agents' | 'Automations' | 'Browser agents' | 'Apps' | 'Email and calendar' | 'Choosing tools';

/** A block of a context section: a paragraph, a list, or a table with short cells (no pictures). */
export type GuideBlock = { p: string } | { ul: string[] } | { table: { head: string[]; rows: string[][] } };

/** The crew blob that says a tip, a warning or a "what can go wrong" item: the kind of tool it is about
 *  (app, automation, AI agent, browser agent), drawn as that kind's face, the same face its badge carries. */
export type About = Kind;

/** "Which one do I need": a question with 2 to 4 options; each leads to another question or to an answer. Every path
 *  ends in an answer within 3 taps. Drawn with native radios, so it works by keyboard and without JavaScript. */
export type Choice = { q: string; options: { label: string; then: Choice | ChoiceAnswer }[] };
export type ChoiceAnswer = { answer: string; why: string; kind?: Kind; href?: string };

export type GuideStep = {
  title: string; // under 8 words, an action
  body: string; // 40 words at most
  note?: { type: 'tip' | 'warn'; text: string; about: About }; // at most 3 per guide, where it helps
};

export type GuidePage = {
  slug: string;
  group: GuideGroup;
  kind: Kind; // the tint the page takes
  query: string; // the search it answers
  title: string; // under 60 characters, ends " | 50agents"
  description: string; // 120 to 155 characters, answer first
  h1: string;
  answer: [string, string]; // "The short answer": two sentences, 40 words at most in total
  chooser?: { h2: string; root: Choice }; // only where the reader has a real choice to make
  sections: { id: string; h2: string; body: GuideBlock[] }[]; // 0 to 2 short sections of context before the steps
  method: { h2: string; steps: GuideStep[] }; // 4 to 7 steps that work with any tool
  /** Captain's film inside step `at` (0-based): the ask typed into Captain, one line on what it builds. When the guide
   *  overlaps a use case page, `useCase` names it, the ask is that page's, and the step links to it. */
  captain: { at: number; line: string; useCase?: string; ask?: string };
  wrong: { title: string; body: string; about: About }[]; // 3 to 5: the problem and the fix, two calm sentences
  faqs: { q: string; a: string }[]; // 3 or 4
  related: string[]; // guide slugs
  updated: string; // ISO date: JSON-LD dateModified and the sitemap only, never shown
};
