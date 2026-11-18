// "Which kind do I need": the same table on all four hubs (pages-brief B2). The rules are Captain's own (app/PRODUCT.md,
// D218, read 19 Nov 2026); each example ask is a live starting ask from app/src/features/templates/list.ts.
import type { Kind } from '@/site/types';

export type KindRow = { kind: Kind; pick: string; starts: string; ai: string; example: string };

export const KIND_ROWS: KindRow[] = [
  {
    kind: 'auto',
    pick: 'The same steps every time: "when X happens, do Y".',
    starts: 'An app event, a schedule, or a call to its address',
    ai: 'Only in a step that needs it, such as writing an email',
    example: 'Set up an automation: every new Stripe payment is added as a row to my Google Sheet with the customer, amount and date',
  },
  {
    kind: 'ai',
    pick: 'Judgement decides what to do on each run: which deals, what to say.',
    starts: 'A schedule, or when you ask it in its chat',
    ai: 'Every run',
    example: 'Set up an AI agent that finds my HubSpot deals with no reply in 5 days every weekday at 9:00 and drafts a follow-up email for me to approve',
  },
  {
    kind: 'browser',
    pick: 'The work is on websites with no app to connect, such as a competitor\'s pricing page.',
    starts: 'A schedule, or when you ask it',
    ai: 'Every run, in its own browser',
    example: "Set up a browser agent that checks my competitors' pricing pages every day at 9:00 and tells me when a price changes",
  },
  {
    kind: 'app',
    pick: 'You need screens and records of your own: a pipeline, a desk, a list of what you are owed.',
    starts: 'You open it; its crew of AI agents works on a schedule or when records change',
    ai: 'In its crew, not in the screens',
    example: 'Chase my unpaid invoices',
  },
];

export const KIND_RULE =
  'Captain picks the kind from what you say and tells you which in one line. Your own word wins: ask for an automation and you get one, unless it truly cannot be one, and then Captain says so and asks.';
