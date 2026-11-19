// The four kinds, as cards (D255, round 3): the bento on the four hubs and the strip on /about. The homepage's kind cards
// (landing "Whatever the work needs, built for you"), smaller. Every line follows from scripts/pages/product-facts.md.
import type { Kind } from '@/site/types';

export const KIND_ORDER: Kind[] = ['ai', 'auto', 'browser', 'app'];

/** One card per kind: the homepage's title, two or three lines about the kind, a short line for the /about strip. */
export const KIND_CARDS: Record<Kind, { title: string; body: string; short: string }> = {
  ai: {
    title: 'AI agents that read, write and decide',
    body: 'Give one a job in plain words. It decides what to do on each run, on a schedule or when you ask in its chat, and asks before it sends.',
    short: 'Decides what to do on each run.',
  },
  auto: {
    title: 'Rules that run on their own',
    body: 'When something happens in one app, the next steps happen in the others. The same steps every time; AI can be one of them.',
    short: 'The same steps on every event.',
  },
  browser: {
    title: 'Browser agents that work any website',
    body: 'Where a site has no app to connect, it opens the pages in its own browser, on a schedule, and leaves you a report.',
    short: 'Works websites with no app.',
  },
  app: {
    title: 'Apps made for how you work',
    body: 'Your own lists, boards and tables, with a crew of AI agents that act when a record changes.',
    short: 'Your own lists and screens.',
  },
};

/** The line under the bento's heading: one short line (D254). */
export const KIND_RULE = 'Captain picks the kind from what you say. Your own word wins.';
