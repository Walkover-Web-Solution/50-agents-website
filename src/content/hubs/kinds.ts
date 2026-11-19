// "Which kind do I need": the same comparison on all four hubs, in the use case table's style (D254): short cells, a mark
// plus at most 5 words. The rules are Captain's own (app/PRODUCT.md, D218, scripts/pages/product-facts.md); each example
// is a use case page built from a live starting ask (app/src/features/templates/list.ts).
// A cell starting "Yes", "No", "Only" or "Partly" gets a drawn mark (src/site/hubs/marks.tsx); "Yes"/"No" is then dropped.
import type { Kind } from '@/site/types';

export const KIND_ORDER: Kind[] = ['ai', 'auto', 'browser', 'app'];

/** One row per thing that tells the kinds apart; `cells` in KIND_ORDER. */
export const KIND_ROWS: { label: string; cells: Record<Kind, string> }[] = [
  { label: 'Best for', cells: { ai: 'A judgement on each run', auto: 'The same steps every time', browser: 'Websites with no app', app: 'Your own lists and screens' } },
  { label: 'Starts on an app event', cells: { ai: 'No, a schedule or its chat', auto: 'Yes', browser: 'No, a schedule or when asked', app: 'Only on its own records' } },
  { label: 'Decides on each run', cells: { ai: 'Yes', auto: 'Only in an AI step', browser: 'Yes, in its own browser', app: 'Only in its crew' } },
  { label: 'Screens of its own', cells: { ai: 'No, its own chat', auto: 'No', browser: 'No, it leaves a report', app: 'Yes, lists and boards' } },
];

/** The use case page each kind's "For example" cell links to. */
export const KIND_EXAMPLES: Record<Kind, string> = {
  ai: 'follow-up-quiet-hubspot-deals',
  auto: 'stripe-payments-to-google-sheets',
  browser: 'track-competitor-prices',
  app: 'chase-unpaid-invoices',
};

/** The line under "Which kind do I need?": one short line (D254). */
export const KIND_RULE = 'Captain picks the kind from what you say. Your own word wins.';
