// /pricing: the live plans, from the app's billing (agentic-apps/app/src/features/settings/CLAUDE.md, "Credits";
// D243 free credits monthly, D261 Pro $49 for 55,000, D262 Business stays at 110,000). Change these only when the app does.
export type Plan = { id: string; name: string; price: number; credits: number; line: string; points: string[] };

export const FREE_CREDITS = 2000;
export const PLANS: Plan[] = [
  { id: 'free', name: 'Free', price: 0, credits: FREE_CREDITS, line: 'Try it on real work', points: ['2,000 credits every month', 'Every kind: apps, automations, AI agents, browser agents', 'Works with 2,300+ apps'] },
  { id: 'starter', name: 'Starter', price: 19, credits: 20000, line: 'One or two jobs running every day', points: ['20,000 credits a month', 'Everything in Free', 'Top up any time'] },
  { id: 'pro', name: 'Pro', price: 49, credits: 55000, line: 'A few AI agents and apps for a small team', points: ['55,000 credits a month', 'Everything in Starter', 'Top up any time'] },
  { id: 'business', name: 'Business', price: 99, credits: 110000, line: 'Many jobs across the business', points: ['110,000 credits a month', 'Everything in Pro', 'Top up any time'] },
];
export const TOPUP = { per: 1000, price: 1, min: 5000 };

// What uses credits, in plain words (the app's charging rules).
export const USES = [
  { what: 'An app action', how: '1 credit to read something in an app, 2 to change something', example: 'Reading a new email, adding a row to a sheet' },
  { what: 'An AI answer', how: 'Credits by the work the AI model does: a short reply uses few, a long summary more', example: 'Drafting a reminder, summing up the week' },
  { what: 'Building with Captain', how: 'The chat with Captain uses AI answers like any other', example: 'Describing the job and changing the plan' },
];

export const PRICING_FAQS = [
  { q: 'Is there a free plan?', a: 'Yes. Every workspace gets 2,000 free credits every month, with every kind of AI agent, automation and app. They end with the month and come back fresh.' },
  { q: 'What happens when I run out of credits?', a: 'Work waits rather than failing, and one item in Needs you says so. Top up or move to a plan, and it carries on.' },
  { q: 'Do unused credits roll over?', a: 'Free and plan credits end with the month. Top-ups never expire, and plan credits are used before them.' },
  { q: 'How do top-ups work?', a: 'Pay as you go at $1 per 1,000 credits, any whole thousand from 5,000. They stay until you use them.' },
  { q: 'How do I upgrade?', a: 'In the app, open Settings, then Usage, and pick a plan. You add a card once and pay; the credits arrive when the payment goes through.' },
  { q: 'Does a plan replace the free credits?', a: 'Yes. A plan’s monthly credits take the place of the free 2,000 for as long as the plan is paid.' },
  { q: 'Can I see what used my credits?', a: 'Yes. Usage in Settings shows every charge: who used it, on what, and when, with a CSV download.' },
];
