// Every child page the index pages and hubs link to, from pages-brief v3.1 (B1, B4, B5, B6, B7), read 19 Nov 2026.
// A child that is not built yet renders as text through MaybeLink; it goes live when its family registers it in PATHS.
import type { Kind } from '@/site/types';

export const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

// B1: the 12 use cases, each a live Playbook in the app (its exact ask from app/src/features/templates/list.ts).
export type UseCaseRef = { slug: string; title: string; kind: Kind; apps: string[]; ask: string; line: string };
export const USE_CASE_LIST: UseCaseRef[] = [
  { slug: 'chase-unpaid-invoices', title: 'Chase unpaid invoices', kind: 'app', apps: ['Gmail'], ask: 'Chase my unpaid invoices', line: 'An invoices desk: late ones first, a reminder drafted for each.' },
  { slug: 'follow-up-quiet-hubspot-deals', title: 'Follow up quiet HubSpot deals', kind: 'ai', apps: ['HubSpot', 'Gmail'], ask: 'Set up an AI agent that finds my HubSpot deals with no reply in 5 days every weekday at 9:00 and drafts a follow-up email for me to approve', line: 'Each weekday at 9:00, deals with no reply in 5 days get a drafted follow-up.' },
  { slug: 'hubspot-contacts-to-google-sheets-and-slack', title: 'New HubSpot contacts to Sheets and Slack', kind: 'auto', apps: ['HubSpot', 'Google Sheets', 'Slack'], ask: 'Set up an automation: every new HubSpot contact is added as a row to my Google Sheet and posted in a Slack channel', line: 'Every new contact becomes a row and a Slack post.' },
  { slug: 'lead-tracker-from-your-inbox', title: 'A lead tracker filled from your inbox', kind: 'app', apps: ['Gmail'], ask: 'Track my leads and follow up', line: 'A pipeline app that brings leads in from your email.' },
  { slug: 'ai-replies-to-support-email', title: 'AI replies to support email', kind: 'ai', apps: ['Gmail'], ask: 'Set up an AI agent that reads new support emails, drafts a reply from what you know about my business, and asks me before sending', line: 'Drafts each reply from what it knows about your business, then asks.' },
  { slug: 'customer-requests-desk', title: 'A customer requests desk', kind: 'app', apps: ['Gmail'], ask: 'Keep track of customer requests and draft the replies', line: 'Every request tracked by status, urgent ones first.' },
  { slug: 'weekly-stripe-revenue-summary', title: 'Weekly Stripe revenue summary', kind: 'ai', apps: ['Stripe', 'Gmail'], ask: "Set up an AI agent that reads last week's payments in Stripe every Monday at 9:00 and emails me the totals and what changed", line: 'Every Monday, last week in Stripe and what changed, by email.' },
  { slug: 'stripe-payments-to-google-sheets', title: 'Stripe payments to Google Sheets', kind: 'auto', apps: ['Stripe', 'Google Sheets'], ask: 'Set up an automation: every new Stripe payment is added as a row to my Google Sheet with the customer, amount and date', line: 'Each new payment becomes a row: customer, amount, date.' },
  { slug: 'shopify-orders-to-google-sheets', title: 'Shopify orders to Google Sheets', kind: 'auto', apps: ['Shopify', 'Google Sheets'], ask: 'Set up an automation: every new Shopify order is added as a row to my Google Sheet with its items and total', line: 'Each new order becomes a row with its items and total.' },
  { slug: 'track-competitor-prices', title: 'Track competitor prices', kind: 'browser', apps: [], ask: "Set up a browser agent that checks my competitors' pricing pages every day at 9:00 and tells me when a price changes", line: 'Reads their pricing pages each morning and tells you what changed.' },
  { slug: 'ai-email-triage-every-morning', title: 'AI email triage every morning', kind: 'ai', apps: ['Gmail'], ask: 'Go through my unread email now, then every weekday at 8:00, and draft replies', line: 'Your unread email gone through at 8:00, replies drafted.' },
  { slug: 'tomorrows-meetings-in-slack', title: "Tomorrow's meetings in Slack", kind: 'ai', apps: ['Google Calendar', 'Slack'], ask: "Set up an AI agent that sends me tomorrow's meetings from Google Calendar in Slack every day at 18:00", line: 'At 18:00, tomorrow from your calendar in one Slack message.' },
];

// B4: 12 alternatives pages and 8 head-to-heads.
export type Ref = { slug: string; title: string; line: string; group: string };
const ALT: [string, string, string][] = [
  ['zapier', 'Zapier', 'For teams outgrowing per-task pricing or wanting AI agents beside their Zaps.'],
  ['n8n', 'n8n', 'For people who like n8n but would rather describe the job than wire nodes.'],
  ['make', 'Make', 'For Make users who want the scenario built from a sentence.'],
  ['lindy', 'Lindy', 'For people who want AI assistants plus automations and apps.'],
  ['gumloop', 'Gumloop', 'For AI workflows without building on a canvas.'],
  ['relevance-ai', 'Relevance AI', 'For small teams who want AI agents without a sales call.'],
  ['relay-app', 'Relay.app', 'For human-in-the-loop automations, compared.'],
  ['bardeen', 'Bardeen', 'For browser work beyond lead lists.'],
  ['activepieces', 'Activepieces', 'For open-source fans who want the build done for them.'],
  ['ifttt', 'IFTTT', 'For when personal applets turn into business jobs.'],
  ['power-automate', 'Power Automate', 'For small teams that are not all-in on Microsoft.'],
  ['pipedream', 'Pipedream', 'For non-developers who need what Pipedream does.'],
];
const VS: [string, string][] = [
  ['zapier', 'Zapier'], ['make', 'Make'], ['n8n', 'n8n'], ['lindy', 'Lindy'], ['gumloop', 'Gumloop'], ['relevance-ai', 'Relevance AI'], ['softr', 'Softr'], ['glide', 'Glide'],
];
export const COMPARE_LIST: Ref[] = [
  ...ALT.map(([s, n, line]) => ({ slug: `${s}-alternatives`, title: `${n} alternatives`, line, group: 'Alternatives' })),
  ...VS.map(([s, n]) => ({ slug: `50agents-vs-${s}`, title: `50agents vs ${n}`, line: `A dated, sourced table and who should pick which.`, group: 'Head to head' })),
];

// B5: 30 guides; slugs come from the titles (pages-brief: "Slugs come from the titles").
const GUIDES: [string, string[]][] = [
  ['AI agents', [
    'How to build an AI agent without code',
    'AI agent vs automation: which one you need',
    'How to give an AI agent access to your apps safely',
    'How to write instructions for an AI agent',
    'How to make an AI agent ask before it acts',
    'AI agents for small business: 10 jobs that work today',
  ]],
  ['Automations', [
    'How to automate invoice reminders',
    'How to send new HubSpot contacts to Slack',
    'How to log Stripe payments in Google Sheets',
    'How to send Shopify orders to Google Sheets',
    'How to automate lead follow-up from Gmail',
    'How to automate weekly reports by email',
    'How to automate data entry between two apps',
    'Webhooks explained for non-developers',
  ]],
  ['Browser agents', [
    'How to monitor competitor prices automatically',
    'How to automate a website that has no API',
    'How to automate form filling on websites',
    'Browser automation without code',
  ]],
  ['Apps', [
    'How to build an app from Google Sheets',
    'How to build a simple CRM without code',
    'How to build an invoice tracker',
    'How to build a customer requests desk from your inbox',
    'Internal tools without code: what to build first',
  ]],
  ['Email and calendar', [
    'How to triage your inbox with AI',
    'How to draft email replies with AI and still check them',
    'How to get a daily calendar summary in Slack',
  ]],
  ['Choosing tools', [
    'Zapier vs Make vs n8n for a small team',
    'How to choose an AI agent builder',
    'What to automate first in a small business',
    'How much automation costs: credits, tasks and runs compared',
  ]],
];
export const GUIDE_LIST: Ref[] = GUIDES.flatMap(([group, titles]) => titles.map(title => ({ slug: slugify(title), title, line: '', group })));
export const guideHref = (title: string) => `/guides/${slugify(title)}`;

// B7: the 8 roles.
export const ROLE_LIST: Ref[] = [
  { slug: 'sales', title: 'For sales', line: 'Leads in from email, quiet deals followed up, contacts logged.', group: '' },
  { slug: 'support', title: 'For support', line: 'Requests tracked, replies drafted for you to approve.', group: '' },
  { slug: 'finance', title: 'For finance', line: 'Invoices chased, payments logged, a weekly revenue note.', group: '' },
  { slug: 'operations', title: 'For operations', line: 'Orders logged, competitor prices watched, reports sent.', group: '' },
  { slug: 'ecommerce', title: 'For ecommerce', line: 'Shopify orders, Stripe payments and customer questions.', group: '' },
  { slug: 'agencies', title: 'For agencies', line: 'Client requests, invoices and leads in one workspace.', group: '' },
  { slug: 'hr', title: 'For HR', line: 'Keka, Personio, Greenhouse and the other HR apps in the catalog.', group: '' },
  { slug: 'founders', title: 'For founders', line: 'The first jobs to hand off when you do everything yourself.', group: '' },
];
