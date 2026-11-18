// Use case 7 (pages-brief B1): a weekly Stripe revenue summary by email. An AI agent.
// Product facts: the Playbook "Weekly revenue summary" (templates/list.ts); schedules in the workspace's zone
// (agents/server/wake.ts); an email to your own connected address is "Send to you", which asks first until allowed
// (settings/rules.ts, settings/server/autonomy.ts). The catalog's Stripe actions have no balance transactions, so no fees.
// Catalog: catalog.ts, read 19 Nov 2026. Research: scratchpad research-C, read 19 Nov 2026.
import type { UseCase } from '@/site/types';
import { chips, iconOf } from './catalog';

const page: UseCase = {
  slug: 'weekly-stripe-revenue-summary',
  kind: 'ai',
  title: 'Weekly Stripe revenue report by email | 50agents',
  description:
    'For a weekly Stripe revenue report by email, an AI agent reads last week’s payments every Monday at 9:00 and emails you the totals and what changed.',
  h1: 'A weekly Stripe revenue report in your inbox',
  answer: [
    'To get a weekly Stripe revenue report by email, tell Captain to set up an AI agent that reads last week’s Stripe payments every Monday at 9:00 and emails you the totals and what changed.',
    'The email is written, not a CSV: what came in, how that compares with the week before, and which customers made the difference, with every currency kept apart.',
  ],
  ask: 'Set up an AI agent that reads last week\'s payments in Stripe every Monday at 9:00 and emails me the totals and what changed',
  updated: '2026-11-19',
  published: '2026-11-19',
  promises: ['Written for you, not a file to download', 'Reads Stripe, changes nothing there', 'Asks before its first emails'],
  plan: {
    mode: 'building an AI agent',
    name: 'Monday revenue',
    line: 'Last week in Stripe, in one email',
    faces: ['sprout'],
    rows: [
      { label: 'When', value: 'Every Monday at 9:00' },
      { label: 'Apps', value: 'Stripe · Gmail' },
      { label: 'Asks first', value: 'Sending the email, until you let it' },
    ],
  },
  factsLabel: 'Stripe’s own weekly numbers',
  facts: [
    {
      figure: '2pm UTC',
      text: 'on Monday is when Stripe says its Sigma weekly scheduled queries, covering the week to Sunday midnight UTC, are usually ready. The email links to a CSV.',
      source: 'Stripe docs, Sigma scheduled queries',
      href: 'https://docs.stripe.com/sigma/scheduled-queries',
      read: '19 Nov 2026',
    },
    {
      figure: '135+',
      text: 'currencies are supported by Stripe, and amounts come in each currency’s smallest unit, so a mixed week only adds up once each currency is kept apart.',
      source: 'Stripe docs, supported currencies',
      href: 'https://docs.stripe.com/currencies',
      read: '19 Nov 2026',
    },
  ],
  seeIt: {
    h2: 'What you get: the week in Stripe, in a few lines',
    intro: 'This is the AI agent’s page in 50agents after Monday’s run, with example numbers. Overview shows the email it wrote; Work lists the weeks; Setup shows its instructions and what it may do alone.',
  },
  view: {
    type: 'agent',
    agent: {
      name: 'Monday revenue',
      face: 'sprout',
      status: 'Next run: Mon 24 Nov 9:00 AM',
      tone: 'ok',
      latest: {
        title: 'Week of 10 to 16 Nov: $18,420, up 12%',
        when: 'Mon 17 Nov 9:01 AM',
        summary: 'Read 212 payments in two currencies and emailed you.',
        result: {
          type: 'email',
          to: 'sam@fernhill.example (you)',
          subject: 'Stripe, 10 to 16 Nov: $18,420, up 12%',
          body: [
            'Last week you took $18,420 from 204 payments (week before: $16,450 from 187). Plus €1,180 from 8 payments in EUR.',
            'What changed: annual plans brought in $3,600, three times the usual, all from the Black Friday early-access email on Tuesday. Monthly plans were flat at $11,200.',
            'Biggest payers: Cobalt Fitness ($1,800, annual), Lumen Dental ($1,200), Harbor Yoga ($960).',
            'Worth a look: 6 payments did not go through, 4 of them on cards from one customer, Pinecone Coffee.',
          ],
        },
      },
      runs: [
        { title: 'Week of 10 to 16 Nov: $18,420, up 12%', when: 'Mon 17 Nov 9:01 AM', status: 'Done' },
        { title: 'Week of 3 to 9 Nov: $16,450, down 4%', when: 'Mon 10 Nov 9:01 AM', status: 'Done' },
        { title: 'Week of 27 Oct to 2 Nov: $17,130, up 9%', when: 'Mon 3 Nov 9:02 AM', status: 'Done' },
        { title: 'Email waited for your OK', when: 'Mon 27 Oct 9:01 AM', status: 'Waits on you' },
      ],
      instructions: [
        'Every Monday at 9:00, read last week’s payments in Stripe: Monday 00:00 to Sunday 23:59 in my time zone.',
        'Email me the totals: money in, number of payments, and the week before for comparison. Keep each currency separate; never add USD and EUR together.',
        'Then say what changed in two or three sentences: which plans, customers or days made the difference. Name payments that did not go through.',
        'Short and plain, no tables. Say which dates and time zone you used.',
      ],
      facts: { runs: 'Every Monday at 9:00 AM', apps: ['stripe', 'gmail'], alone: 'Reads Stripe payments and customers; sends the email to you (allowed in Autonomy)', asks: 'Anything else it would change or send' },
    },
  },
  howH2: 'How it writes your weekly Stripe report, step by step',
  planParts: [
    { title: 'Its job', body: 'Read last week’s Stripe payments and email you the totals and what changed.' },
    { title: 'Instructions', body: 'The week’s dates and time zone, currencies kept apart, what counts as a change worth a sentence.' },
    { title: 'Its apps', body: 'Stripe to read, Gmail to send. Connected once in the chat.' },
    { title: 'When it runs', body: 'Every Monday at 9:00, in your workspace’s time zone.' },
    { title: 'Asks you first', body: 'Sending the email. Reading runs on its own.' },
  ],
  steps: [
    { title: 'You ask, Captain plans it', body: 'Say the sentence or tap the Playbook. The plan card shows its job, its instructions, Stripe and Gmail, Monday at 9:00, and that sending asks first. Tap Build it; it runs once straight away on last week.' },
    { title: 'Monday 9:00: it reads the week', body: 'It reads every payment from Monday 00:00 to Sunday 23:59 in your time zone, and the week before for comparison. Amounts come from Stripe in cents; it turns them into dollars and keeps each currency apart.' },
    { title: 'It works out what changed', body: 'Totals, the number of payments and the comparison are sums. The sentences are judgement: which plans, customers or days moved the number, and what did not go through.' },
    { title: 'It writes you the email', body: 'A subject that carries the number, then three or four short lines. No attachment and no table, so it reads well on a phone.' },
    { title: 'It sends it, once you let it', body: 'Out of the box the email waits in Needs you. Turn on Send to you for it in Settings, Autonomy, and from then on it arrives on its own every Monday. Each run is listed under Work.' },
  ],
  uses: [
    { app: 'stripe', icon: iconOf('stripe'), name: 'Stripe', why: 'Read only: last week’s payments and the customers behind them. It changes nothing in Stripe.', chips: chips('stripe', ['Find Payment Intents', 'Search Customer', 'List Invoice']) },
    { app: 'gmail', icon: iconOf('gmail'), name: 'Gmail', why: 'Sends the summary to you, from your own connected address.', chips: chips('gmail', ['Send Email']) },
  ],
  usesNote: 'The Stripe and Gmail actions it can call, named as viaSocket’s catalog of 2,300+ apps lists them, read 19 Nov 2026. It picks which to call on each run.',
  asksFirst:
    'The email, until you say otherwise. Every AI agent starts out asking before it changes or sends anything, even to you, so the first Mondays it waits in Needs you. In Settings, Autonomy, turn on "Send to you" for it and it sends on its own; anything sent to someone else still asks.',
  table: {
    h2: 'What goes in the Monday email',
    label: 'What the email covers',
    cols: ['Part', 'What it says', 'Ask Captain'],
    intro: 'The ask covers totals and what changed. Add a line or a recipient in one sentence each.',
    rows: [
      { when: 'Totals', tone: 'Money in and number of payments, each currency apart', ask: '' },
      { when: 'Against last week', tone: 'Up or down, in money and per cent', ask: '' },
      { when: 'What changed', tone: 'Two or three sentences: plans, customers, days', ask: '' },
      { when: 'New customers', tone: 'Who paid for the first time', ask: 'Also list customers who paid for the first time last week' },
      { when: 'Month view', tone: 'The month so far against last month', ask: 'On the first Monday of each month, also compare the whole month with the month before' },
      { when: 'Your co-founder', tone: 'The same email to them', ask: 'Send the Monday email to me and to alex@mybusiness.com' },
    ],
    note: 'An email to anyone but you always asks first, unless you also turn on "Send to people outside", which asks you once more.',
    sources: [{ label: 'Stripe scheduled reports, for comparison', href: 'https://docs.stripe.com/reports/scheduled-reports' }],
  },
  yoursIntro: 'Change the day, the channel or what it looks at. Each of these builds a different AI agent; copy one into Captain.',
  variations: [
    'Set up an AI agent that reads last week\'s payments in Stripe every Monday at 9:00 and sends me the totals and what changed in Slack',
    'Set up an AI agent that reads yesterday\'s payments in Stripe every weekday at 8:00 and emails me the totals',
    'Set up an AI agent that reads last month\'s payments in Stripe on the 1st of every month at 9:00 and emails me the totals and what changed',
    'Set up an AI agent that reads last week\'s payments in Stripe every Monday at 9:00 and emails me only if revenue fell more than 10%',
  ],
  limits: [
    'Totals are what customers paid, before Stripe’s fees: the catalog’s Stripe actions do not read balance transactions, so fees, net and payouts are not in it.',
    'It is a written summary, not accounting. For numbers that match your payouts to the cent, use Stripe’s own reports.',
    'It runs once a week at its time; it does not alert you mid-week.',
    'Each run uses credits from your workspace’s balance; every workspace starts with 2,000 free.',
  ],
  otherWaysH2: 'Other ways to get a weekly Stripe report',
  otherWays: [
    {
      title: 'Stripe’s own reports',
      body: 'Scheduled reports run daily, weekly or monthly and reconcile to your payouts, which makes them the right source for your books. Stripe emails a notice and you download the file from the Dashboard; Sigma’s weekly queries need SQL and send a CSV link.',
      sources: [
        { label: 'Scheduled reports', href: 'https://docs.stripe.com/reports/scheduled-reports' },
        { label: 'Sigma scheduled queries', href: 'https://docs.stripe.com/sigma/scheduled-queries' },
      ],
    },
    {
      title: 'n8n',
      body: 'Its weekly business metrics template pulls gross, net, refunds and counts on Mondays at 08:00 and has Claude write the story, sent by SendGrid. It is the richest output we read, and needs four credentials and eleven settings.',
      sources: [{ label: 'n8n template', href: 'https://n8n.io/workflows/15791-generate-a-weekly-business-metrics-report-with-stripe-notion-sheets-claude-sendgrid-and-slack/' }],
    },
    {
      title: 'Zapier',
      body: '"Track payments in Stripe, format date, append to digest, and send email summary" collects each payment into a digest and emails the list. It lists payments rather than saying what changed.',
      sources: [{ label: 'Zapier template', href: 'https://zapier.com/templates/details/2df372680a2743376a70ddea0bed3b91f8f1dd5f58c0fec20be2e229d6e5beff' }],
    },
  ],
  faqs: [
    { q: 'Does Stripe send a weekly revenue email by itself?', a: 'Not with the numbers in it. Stripe’s scheduled reports email you that a file is ready to download, and Sigma’s scheduled queries email a CSV link. This AI agent puts the totals and the change in the email itself.' },
    { q: 'Is Monday at 9:00 too early for last week’s numbers?', a: 'Not for this: it reads the payments themselves, so Sunday evening’s are there. Stripe’s own Sigma weekly results arrive later, usually by 2pm UTC on Monday.' },
    { q: 'Does it include fees and refunds?', a: 'It reports what customers paid, before fees. Stripe’s fees and payouts are not in the actions it can call today, so check net in Stripe’s balance report.' },
    { q: 'What if I sell in more than one currency?', a: 'Each currency gets its own total; it never adds dollars and euros together. Stripe gives amounts in the smallest unit, cents for USD, and it converts them before writing.' },
    { q: 'Will it email me without asking?', a: 'Not at first: every AI agent asks before sending, even to you. Turn on "Send to you" for it in Settings, Autonomy and it sends on its own from then on.' },
  ],
  related: [
    { href: '/use-cases/stripe-payments-to-google-sheets', kind: 'auto', title: 'Stripe payments to Google Sheets', line: 'Want every payment as a row instead? An automation, no AI.' },
    { href: '/use-cases/tomorrows-meetings-in-slack', kind: 'ai', title: 'Tomorrow’s meetings in Slack', line: 'Another AI agent that writes you one message on a schedule.' },
    { href: '/use-cases/chase-unpaid-invoices', kind: 'app', title: 'Chase unpaid invoices', line: 'Money still owed to you, chased with reminders you approve.' },
  ],
  up: [
    { href: '/ai-agents', label: 'AI agents you can build' },
    { href: '/integrations/stripe', label: 'Stripe' },
    { href: '/integrations/gmail', label: 'Gmail' },
    { href: '/guides/how-to-automate-weekly-reports-by-email', label: 'How to automate weekly reports by email' },
  ],
  finalH2: 'Get your Monday revenue email',
  byline: 'Captain builds this AI agent from the ask above, the same words as the "Weekly revenue summary" Playbook in the 50agents app; the views above are drawn from that app, filled with example data.',
};

export default page;
