// "Which kind do I need": the same comparison on all four hubs. The rules are Captain's own (app/PRODUCT.md, D218);
// each example is a use case page built from a live starting ask (app/src/features/templates/list.ts).
import type { Kind } from '@/site/types';

export type KindRow = { kind: Kind; pick: string; starts: string; ai: string; example: string };

export const KIND_ROWS: KindRow[] = [
  { kind: 'ai', pick: 'Each run needs judgement: which deals, what to say', starts: 'A schedule, or when you ask it in its chat', ai: 'Every run', example: 'follow-up-quiet-hubspot-deals' },
  { kind: 'auto', pick: 'The same steps every time: when X happens, do Y', starts: 'An app event, a schedule, or a call to its address', ai: 'Only in a step that needs it', example: 'stripe-payments-to-google-sheets' },
  { kind: 'browser', pick: 'The work is on websites with no app to connect', starts: 'A schedule, or when you ask it', ai: 'Every run, in its own browser', example: 'track-competitor-prices' },
  { kind: 'app', pick: 'You need screens and records of your own', starts: 'You open it; its crew works on a schedule or when records change', ai: 'In its crew, not in the screens', example: 'chase-unpaid-invoices' },
];

export const KIND_LABELS: [keyof Omit<KindRow, 'kind'>, string][] = [['pick', 'Pick it when'], ['starts', 'Starts on'], ['ai', 'AI on each run'], ['example', 'For example']];

export const KIND_RULE =
  'Captain picks the kind from what you say and tells you which in one line. Your own word wins: ask for an automation and you get one, unless it truly cannot be one.';
