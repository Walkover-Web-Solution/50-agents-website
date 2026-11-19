// An integration page, v3 (D253): one typed object per app. The six flagships are JSON written by the page pipeline
// (scripts/pages: rows-integrations.json, prompts/integration.md, gates-integrations.mjs) in src/content/integrations/pages;
// every other app gets the same object from its catalog data (words.ts templatePage) until the pipeline writes it.
// The template draws every visual from these fields, so no app page is designed by hand.
import type { Kind } from '../types';
import type { Recipe } from './data';

export type IntegrationPage = {
  slug: string; // the app's catalog slug
  query: string; // the search it answers
  title: string; // under 60 characters, ends " | 50agents"
  description: string; // 120 to 160 characters, answer first
  h1: string;
  answer: [string, string]; // the first two sentences
  ask: string; // the hero's ask: the app's best real recipe, in plain words; pasted into Captain by the hero buttons
  recipe?: Recipe; // that recipe as the catalog lists it (trigger app and event, action app and event); flagships always have one
  build: {
    name: string; // what Captain makes: "Deals to Slack"
    line: string; // under 10 words
    when: string; // when it runs
    does: string[]; // 1 to 3 short lines
    apps: string[]; // catalog slugs
    asksFirst: string; // under 8 words
  };
  kinds: {
    kind: Kind;
    title: string; // under 8 words: the job, not the kind
    body: string; // 40 words at most
    ask: string; // pasted into Captain by this card's button
    uses: string[]; // the app's catalog event names this kind would use (may be empty)
    useCase?: string; // a use case page slug, when one exists
  }[]; // the four kinds, auto, ai, browser, app
  groups: { label: string; line?: string; events: string[] }[]; // every catalog event, each in one group, by its exact name
  faqs: { q: string; a: string }[]; // 4 to 6
  sources?: { label: string; href: string }[]; // pages read for the answers about the app's own AI, shown once under the questions
  updated: string; // ISO date: the sitemap, and "Updated <Month Year>" in the byline
};
