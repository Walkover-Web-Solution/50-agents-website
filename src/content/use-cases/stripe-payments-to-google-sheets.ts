// Use case 8 (pages-brief B1): Stripe payments to Google Sheets. An automation.
// Product facts: the Playbook "Log every payment" (templates/list.ts); automations (features/automations: tested on a
// real event with writes held, built as a draft, Make it live; a `set` step turns numbers, money and dates with no AI;
// a row in your own sheet runs on its own; one flow per start). Catalog: catalog.ts, read 19 Nov 2026.
// Stripe specifics: Stripe docs (currencies, refunds, payment intents, balance transactions), read 19 Nov 2026 (research-C).
// What sets it apart from use case 9 (Shopify): Stripe's events, cents, currencies, refunds and fees.
import type { UseCase } from '@/site/types';
import { catalogName, chips, iconOf } from './catalog';

const page: UseCase = {
  slug: 'stripe-payments-to-google-sheets',
  kind: 'auto',
  title: 'Stripe payments to Google Sheets, one row each | 50agents',
  description:
    'To log Stripe payments in Google Sheets, ask Captain for an automation: each successful payment becomes a row with the customer, amount in dollars and date.',
  h1: 'Log every Stripe payment in Google Sheets',
  answer: [
    'To log Stripe payments in Google Sheets, tell Captain to set up an automation that starts each time a payment succeeds in Stripe and adds a row to your sheet.',
    'Each row has the customer, the amount in dollars rather than Stripe’s cents, the currency and the date, and refunds can go in as their own rows.',
  ],
  ask: 'Set up an automation: every new Stripe payment is added as a row to my Google Sheet with the customer, amount and date',
  updated: '2026-11-19',
  published: '2026-11-19',
  promises: ['A row per successful payment', 'Cents turned into dollars', 'Runs alone: it is your own sheet'],
  plan: {
    mode: 'building an automation',
    name: 'Stripe payments to Sheet',
    line: 'Every payment, a row with the customer, amount and date',
    faces: ['ledger'],
    rows: [
      { label: 'Starts', value: 'A payment succeeds in Stripe' },
      { label: 'Steps', value: 'Look up the customer · Amount and date · Add a row' },
      { label: 'On its own', value: 'All of it: the sheet is yours' },
    ],
  },
  factsLabel: 'Stripe data, in numbers',
  facts: [
    {
      figure: '1000',
      text: 'is how Stripe writes $10.00: amounts come in the currency’s smallest unit, so a plain copy into a sheet shows every dollar figure 100 times too big. Yen has no cents, so 10 is ¥10.',
      source: 'Stripe docs, supported currencies',
      href: 'https://docs.stripe.com/currencies',
      read: '19 Nov 2026',
    },
    {
      figure: '2,000 rows',
      text: 'is where IFTTT’s "Log new Stripe payments to Google Sheets" applet starts a new spreadsheet. On IFTTT’s free plan it checks Stripe once an hour.',
      source: 'IFTTT applet page',
      href: 'https://ifttt.com/applets/ZvR4m7Gi-log-new-stripe-payments-to-google-sheets',
      read: '19 Nov 2026',
    },
  ],
  seeIt: {
    h2: 'What you get: every payment in your sheet, in dollars',
    intro: 'This is the automation’s page in 50agents with example payments. Overview shows today’s count through each step and the rows it added; Runs shows one payment step by step, from Stripe’s cents to your row; Steps shows every setting.',
  },
  view: {
    type: 'automation',
    automation: {
      name: 'Stripe payments to Sheet',
      face: 'ledger',
      status: 'Last run: today 11:52 AM',
      today: { runs: 23, did: 23, failed: 0, credits: 9 },
      stations: [
        { key: 'start', mark: 'app', app: 'stripe', say: 'When a payment succeeds in Stripe', today: 23, passes: ['Payment ID', 'Amount (cents)', 'Currency', 'Customer ID', 'Created'],
          settings: [{ label: 'Trigger', value: catalogName('stripe', 'When a payment succeeds') }, { label: 'Account', value: 'Fernhill Farm Boxes (live mode)' }] },
        { key: 'customer', mark: 'app', app: 'stripe', say: 'Look up the customer', today: 23, passes: ['Name', 'Email'],
          settings: [{ label: 'Action', value: catalogName('stripe', 'Find Customer') }, { label: 'By', value: 'Customer ID from the payment' }, { label: 'No customer', value: 'Leave Name and Email empty' }] },
        { key: 'money', mark: 'set', say: 'Amount in dollars, date in your time zone', today: 23, passes: ['Amount', 'Date'],
          settings: [{ label: 'Amount', value: 'Amount (cents) ÷ 100, two decimals; yen and other zero-decimal currencies as they are' }, { label: 'Date', value: 'Created, as a date in Europe/Berlin' }] },
        { key: 'row', mark: 'app', app: 'google-sheets', say: 'Add a row to Payments', today: 23, passes: ['Row number'],
          settings: [{ label: 'Action', value: catalogName('google-sheets', 'Add New Row to Sheet') }, { label: 'Spreadsheet', value: 'Fernhill money 2026' }, { label: 'Sheet', value: 'Payments' }, { label: 'Columns', value: 'Date, Customer, Email, Amount, Currency, Payment ID' }] },
      ],
      runs: [
        { title: '$240.00 from Harbor Yoga', when: 'Today 11:52 AM', status: 'Done', steps: [
          { say: 'When a payment succeeds in Stripe', mark: 'app', app: 'stripe', did: 'Done', ms: 300, got: [{ label: 'Payment ID', value: 'pi_3QxR...8Lk' }, { label: 'Amount', value: '24000' }, { label: 'Currency', value: 'usd' }, { label: 'Created', value: '1763549520' }] },
          { say: 'Look up the customer', mark: 'app', app: 'stripe', did: 'Done', ms: 900, got: [{ label: 'Name', value: 'Harbor Yoga' }, { label: 'Email', value: 'billing@harboryoga.example' }] },
          { say: 'Amount in dollars, date in your time zone', mark: 'set', did: 'Done', ms: 100, got: [{ label: 'Amount', value: '240.00' }, { label: 'Date', value: '19 Nov 2026' }] },
          { say: 'Add a row to Payments', mark: 'app', app: 'google-sheets', did: 'Done', ms: 1200, got: [{ label: 'Row', value: '1,284' }] },
        ] },
        { title: '€36.00 from Ben Ortiz', when: 'Today 10:07 AM', status: 'Done', steps: [] },
        { title: '$59.00 from Lumen Dental', when: 'Today 9:31 AM', status: 'Done', steps: [] },
        { title: '$120.00 from Grace Liu', when: 'Yesterday 6:40 PM', status: 'Done', steps: [] },
      ],
      sheet: {
        name: 'Fernhill money 2026 · Payments',
        cols: ['Date', 'Customer', 'Email', 'Amount', 'Currency', 'Payment ID'],
        rows: [
          ['19 Nov 2026', 'Lumen Dental', 'accounts@lumendental.example', '59.00', 'USD', 'pi_3QxN...2Pa'],
          ['19 Nov 2026', 'Ben Ortiz', 'ben@mail.example', '36.00', 'EUR', 'pi_3QxP...7Qe'],
          ['19 Nov 2026', 'Harbor Yoga', 'billing@harboryoga.example', '240.00', 'USD', 'pi_3QxR...8Lk'],
        ],
      },
    },
  },
  howH2: 'How a Stripe payment becomes a row, step by step',
  planParts: [
    { title: 'The track', body: 'Stripe’s payment event, a customer lookup, a step that works out the amount and date, and the row.' },
    { title: 'Tested on your data', body: 'Run once on your latest real payment. The reads happen; the row is held and shown, not added.' },
    { title: 'Runs', body: 'When a payment succeeds in Stripe.' },
    { title: 'On its own', body: 'Adding the row, in your own sheet, approved with this plan.' },
    { title: 'Asks you first', body: 'Nothing: it reaches no one.' },
  ],
  steps: [
    { title: 'Captain finds the Stripe event', body: 'It picks Stripe’s "When a payment succeeds", which fires once per completed payment, reads your sheet’s headers and asks which sheet if you did not say.' },
    { title: 'It tests on your last payment', body: 'It runs the steps once on your latest real payment and shows you the row it would add, with the dollars and date worked out. Nothing is written yet.' },
    { title: 'It is built as a draft', body: 'Change any column in its chat first; each change is tested again. Tap Make it live and it starts with the next payment.' },
    { title: 'Each payment: customer, dollars, date', body: 'It looks up the customer’s name and email, turns 24000 cents into 240.00, turns Stripe’s timestamp into a date in your time zone, and keeps the currency next to the amount.' },
    { title: 'The row goes in on its own', body: 'The sheet is yours, so nothing waits for you. Every run, with what each step got and how long it took, is under Runs; a step that fails says why in Stripe’s or Google’s words.' },
  ],
  uses: [
    { app: 'stripe', icon: iconOf('stripe'), name: 'Stripe', why: 'Starts each run when a payment succeeds, then looks up who paid. It reads only.', chips: chips('stripe', ['When a payment succeeds', 'Find Customer']) },
    { app: 'googlesheets', icon: iconOf('google-sheets'), name: 'Google Sheets', why: 'Adds one row per payment under your header row.', chips: chips('google-sheets', ['Add New Row to Sheet']) },
  ],
  usesNote: 'Triggers and actions named as viaSocket’s catalog of 2,300+ apps lists them, read 19 Nov 2026. Stripe’s other events, such as Charge Refunded, are in the table below.',
  asksFirst:
    'Nothing, once it is live. Adding a row to your own sheet reaches no one, so it runs on its own; you approved that when you tapped Build it and Make it live. If you add a step that emails a customer, that step asks each time.',
  table: {
    h2: 'Which Stripe event should start it',
    label: 'Stripe triggers',
    done: 'In the plan',
    cols: ['Stripe trigger', 'Gives you a row for', 'Ask Captain'],
    intro: 'Stripe has several "a payment happened" events, and the choice decides what lands in your sheet. The plan starts from the first; add a second start for refunds.',
    rows: [
      { when: catalogName('stripe', 'When a payment succeeds'), tone: 'Each completed payment, once, however many card retries it took', ask: '' },
      { when: catalogName('stripe', 'Charge Refunded'), tone: 'Each refund, full or partial, as its own row', ask: 'Also when a charge is refunded in Stripe, add a row with the refund as a negative amount' },
      { when: catalogName('stripe', 'When an invoice is paid'), tone: 'Subscription and invoice payments, with the invoice number', ask: 'Set up an automation: every paid Stripe invoice is added as a row to my Google Sheet with the customer, invoice number, amount and date' },
      { when: catalogName('stripe', 'New Charge Is Created'), tone: 'Every attempt, failed ones too: noisy for a payments log', ask: 'Also log failed Stripe payments to a second sheet called Failed' },
    ],
    note: 'One payment can have several charges when a card is retried, which is why a charge-based log can show the same sale twice. Stripe keeps its processing fee when you refund.',
    sources: [
      { label: 'Stripe payment intents', href: 'https://docs.stripe.com/payments/payment-intents' },
      { label: 'Stripe refunds', href: 'https://docs.stripe.com/refunds' },
    ],
  },
  yoursIntro: 'Add refunds, columns or a filter. Each of these builds a different automation; copy one into Captain.',
  variations: [
    'Set up an automation: every new Stripe payment is added as a row to my Google Sheet with the customer, amount and date, and every refund as a negative row',
    'Set up an automation: every new Stripe payment over $500 is added as a row to my Google Sheet with the customer, amount and date',
    'Set up an automation: every new Stripe payment is added as a row to a tab for its month in my Google Sheet',
    'Set up an automation: every new Stripe payment is added as a row to my Google Sheet with the customer, amount, date and the product they bought',
  ],
  limits: [
    'No fees or net per row: the payment event does not carry Stripe’s fee, and the catalog’s Stripe actions do not read balance transactions.',
    'It logs payments from the moment it goes live. Past payments are not added; export those from Stripe once.',
    'Amounts stay in the currency they were paid in. It does not convert euros to dollars.',
    'A payment with no Stripe customer attached (a one-off Payment Link, say) gets a row with Name and Email empty.',
  ],
  otherWaysH2: 'Other ways to get Stripe payments into Google Sheets',
  otherWays: [
    {
      title: 'Zapier',
      body: '"Add new Stripe payments to Google Sheets row(s)" is a two-step Zap on Stripe’s New Payment trigger. It copies fields as they come, so set up the cents and date conversion yourself.',
      sources: [{ label: 'Zapier template', href: 'https://zapier.com/apps/google-sheets/integrations/stripe/1126286/add-new-stripe-payments-to-google-sheets-rows' }],
    },
    {
      title: 'Coupler.io',
      body: 'Syncs whole Stripe tables, refunds and payouts included, into a sheet on a schedule. It is the better choice for history and reconciliation; plans start at $32 a month.',
      sources: [{ label: 'Coupler.io', href: 'https://coupler.io/google-sheets-integrations/stripe-to-google-sheets' }],
    },
    {
      title: 'By hand',
      body: 'Export payments as a CSV from the Stripe Dashboard and paste them into your sheet once a week. Fine for a few dozen payments a month; it gets slow and error-prone past that.',
    },
  ],
  faqs: [
    { q: 'Does Stripe have a built-in Google Sheets export?', a: 'No. You can export a CSV from the Dashboard by hand; for a row per payment as it happens you need a tool in between, such as this automation, Zapier or Coupler.io.' },
    { q: 'Why are my Stripe amounts 100 times too big?', a: 'Stripe sends amounts in the smallest unit of the currency: 24000 means $240.00. This automation divides by 100 before writing, and leaves zero-decimal currencies such as yen as they are.' },
    { q: 'How do I log refunds?', a: 'Add a second start on Stripe’s Charge Refunded event that writes the refund as a negative row. Your sheet’s total then matches what you kept, before fees.' },
    { q: 'Can I see fees and net per payment?', a: 'Not with this automation today: fees live on Stripe’s balance transaction, which the catalog’s Stripe actions do not read. Stripe’s balance report has them.' },
    { q: 'How do I stop duplicate rows?', a: 'Start from "When a payment succeeds", which fires once per payment, not on each card attempt. Keep the Payment ID column; if a row ever repeats, that ID shows it.' },
  ],
  related: [
    { href: '/use-cases/shopify-orders-to-google-sheets', kind: 'auto', title: 'Shopify orders to Google Sheets', line: 'Selling on Shopify? Orders with their items, one row each.' },
    { href: '/use-cases/weekly-stripe-revenue-summary', kind: 'ai', title: 'Weekly Stripe revenue summary', line: 'The week’s totals and what changed, written for you each Monday.' },
    { href: '/use-cases/hubspot-contacts-to-google-sheets-and-slack', kind: 'auto', title: 'HubSpot contacts to Sheets and Slack', line: 'Every new contact as a row and a Slack post.' },
  ],
  up: [
    { href: '/automations', label: 'Automations you can build' },
    { href: '/integrations/stripe/google-sheets', label: 'Stripe and Google Sheets' },
    { href: '/integrations/stripe', label: 'Stripe' },
    { href: '/guides/how-to-log-stripe-payments-in-google-sheets', label: 'How to log Stripe payments in Google Sheets' },
  ],
  finalH2: 'Start your Stripe payments log',
  byline: 'Captain builds this automation from the ask above, the same words as the "Log every payment" Playbook in the 50agents app; the views above are drawn from that app, filled with example data.',
};

export default page;
