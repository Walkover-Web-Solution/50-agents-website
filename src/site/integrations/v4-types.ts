// The upgraded app page (Search S51, S52, step 2 of G31): for the apps picked as winnable, a written page that shows every
// job a user can do with the app on 50agents, grouped by chore, each with a small scene drawn from the data, plus how it
// works, a fair comparison, sourced questions and a markdown twin for agents (/integrations/<app>.md). One JSON per app in
// src/content/integrations/v4/<slug>.json. Apps without one keep the v3 page.
import type { Kind } from '../types';

/** One side of a scene: the app it happens in and what you see there, in a few words (example data, labelled on the page). */
export type SceneSide = { app: string; label: string; text: string };

export type V4Job = {
  kind: Kind;
  title: string; // under 8 words: the job
  body: string; // 30 words at most: what it does, plainly
  ask: string; // the plain-words ask pasted into Captain by "Build this"
  in: SceneSide; // what starts it (a trigger in an app, a schedule, a question)
  out: SceneSide; // what you get
  uses: string[]; // the app's catalog event names it relies on (exact names)
};

export type IntegrationV4 = {
  slug: string;
  query: string; // the main search it answers
  title: string; // under 60 characters, ends " | 50agents"
  description: string; // 120 to 160 characters, answer first
  h1: string;
  answer: [string, string]; // two sentences an AI answer can quote
  asks: string[]; // 3 to 5 plain asks, typed into the hero's Captain box in turn
  hero: { kind: Kind; title: string; in: SceneSide; steps: string[]; out: SceneSide }; // the hero's scene
  chores: { label: string; line: string; jobs: V4Job[] }[]; // 3 to 5 chores, 8 to 14 jobs in all
  compare?: { intro: string; rows: { q: string; us: string; zapier: string; make: string }[]; fair: string };
  faqs: { q: string; a: string; source?: { label: string; href: string } }[]; // 5 to 8, from real questions
  film?: { src: string; poster: string; caption: string };
  updated: string; // ISO date
};
