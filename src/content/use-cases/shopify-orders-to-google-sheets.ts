// Use case 9 (pages-brief B1): Shopify orders to Google Sheets. An automation.
// Product facts: the Playbook "New orders to your sheet" (templates/list.ts); automations (features/automations: tested on
// a real order with writes held, built as a draft, Make it live; a `set` step joins a list into one cell; an action can
// run once per item, 25 by default, 50 at most). Catalog: catalog.ts, read 19 Nov 2026.
// Shopify specifics: Shopify help and Admin API docs, read 19 Nov 2026 (research-C).
// What sets it apart from use case 8 (Stripe): line items, variants, cancellations, one row per order or per item.
import type { UseCase } from '@/site/types';
import { catalogName, chips, iconOf } from './catalog';

const page: UseCase = {
  slug: 'shopify-orders-to-google-sheets',
  kind: 'auto',
  title: 'Shopify orders to Google Sheets, items and total | 50agents',
  description:
    'To send Shopify orders to Google Sheets, ask Captain for an automation: each new order becomes a row with its items, variants, quantities and total.',
  h1: 'Send every Shopify order to Google Sheets',
  answer: [
    'To send Shopify orders to Google Sheets, tell Captain to set up an automation that starts on each new Shopify order and adds it to your sheet.',
    'By default each order is one row, with its items, variants and quantities in one cell and the order total beside them; ask for one row per item instead and every product gets its own line.',
  ],
  ask: 'Set up an automation: every new Shopify order is added as a row to my Google Sheet with its items and total',
  updated: '2026-11-19',
  published: '2026-11-19',
  promises: ['One row per order, or per item', 'Items and variants in plain words', 'Runs alone: it is your own sheet'],
  plan: {
    mode: 'building an automation',
    name: 'Shopify orders to Sheet',
    line: 'Every new order, with its items and total',
    faces: ['sunny'],
    rows: [
      { label: 'Starts', value: 'A new order in Shopify' },
      { label: 'Steps', value: 'List the items · Add a row' },
      { label: 'On its own', value: 'All of it: the sheet is yours' },
    ],
  },
  factsLabel: 'Shopify orders, in numbers',
  facts: [
    {
      figure: '50 orders',
      text: 'is the most Shopify’s own order export downloads at once; bigger exports arrive by email. In the CSV, each extra item of an order goes on its own line.',
      source: 'Shopify Help Center, exporting orders',
      href: 'https://help.shopify.com/en/manual/fulfillment/managing-orders/exporting-orders',
      read: '19 Nov 2026',
    },
    {
      figure: '1 row',
      text: 'per run is what Shopify Flow’s "Add row to spreadsheet" writes, with each comma starting a new column, so a product name with a comma splits; one row per item needs a "For each" loop.',
      source: 'Shopify Help Center, Flow',
      href: 'https://help.shopify.com/en/manual/shopify-flow/reference/connectors/add-row-to-spreadsheet',
      read: '19 Nov 2026',
    },
  ],
  seeIt: {
    h2: 'What you get: every order in your sheet as it comes in',
    intro: 'This is the automation’s page in 50agents with example orders. Overview shows today’s count through each step and the rows it added; Runs shows one order step by step, from Shopify’s line items to your row; Steps shows every setting.',
  },
  view: {
    type: 'automation',
    automation: {
      name: 'Shopify orders to Sheet',
      face: 'sunny',
      status: 'Last run: today 12:18 PM',
      today: { runs: 17, did: 17, failed: 0, credits: 6 },
      stations: [
        { key: 'start', mark: 'app', app: 'shopify', say: 'When a new order comes in on Shopify', today: 17, passes: ['Order number', 'Customer', 'Line items', 'Total', 'Currency', 'Created at'],
          settings: [{ label: 'Trigger', value: catalogName('shopify', 'New Order') }, { label: 'Store', value: 'fernhill-candles.myshopify.com' }] },
        { key: 'items', mark: 'set', say: 'List the items in one cell', today: 17, passes: ['Items', 'Item count', 'Date'],
          settings: [{ label: 'Items', value: 'Each line item as "quantity × title (variant)", joined with " | "' }, { label: 'Item count', value: 'Sum of quantities' }, { label: 'Date', value: 'Created at, as a date in your time zone' }] },
        { key: 'row', mark: 'app', app: 'google-sheets', say: 'Add a row to Orders', today: 17, passes: ['Row number'],
          settings: [{ label: 'Action', value: catalogName('google-sheets', 'Add New Row to Sheet') }, { label: 'Spreadsheet', value: 'Fernhill Candles orders' }, { label: 'Sheet', value: 'Orders' }, { label: 'Columns', value: 'Date, Order, Customer, Items, Item count, Total, Currency' }] },
      ],
      runs: [
        { title: 'Order #1047, Grace Liu, $86.00', when: 'Today 12:18 PM', status: 'Done', steps: [
          { say: 'When a new order comes in on Shopify', mark: 'app', app: 'shopify', did: 'Done', ms: 300, got: [{ label: 'Order', value: '#1047' }, { label: 'Line items', value: '2' }, { label: 'Total', value: '86.00' }, { label: 'Currency', value: 'USD' }] },
          { say: 'List the items in one cell', mark: 'set', did: 'Done', ms: 100, got: [{ label: 'Items', value: '2 × Cedar & Smoke candle (Large) | 1 × Wick trimmer (Brass)' }, { label: 'Item count', value: '3' }] },
          { say: 'Add a row to Orders', mark: 'app', app: 'google-sheets', did: 'Done', ms: 1100, got: [{ label: 'Row', value: '412' }] },
        ] },
        { title: 'Order #1046, Ben Ortiz, $24.00', when: 'Today 11:02 AM', status: 'Done', steps: [] },
        { title: 'Order #1045, Hana Sato, $142.50', when: 'Today 9:47 AM', status: 'Done', steps: [] },
        { title: 'Order #1044, Leo Brandt, $38.00', when: 'Yesterday 8:15 PM', status: 'Done', steps: [] },
      ],
      sheet: {
        name: 'Fernhill Candles orders · Orders',
        cols: ['Date', 'Order', 'Customer', 'Items', 'Item count', 'Total', 'Currency'],
        rows: [
          ['19 Nov 2026', '#1045', 'Hana Sato', '3 × Fig & Linen candle (Small) | 1 × Gift box', '4', '142.50', 'USD'],
          ['19 Nov 2026', '#1046', 'Ben Ortiz', '1 × Cedar & Smoke candle (Small)', '1', '24.00', 'USD'],
          ['19 Nov 2026', '#1047', 'Grace Liu', '2 × Cedar & Smoke candle (Large) | 1 × Wick trimmer (Brass)', '3', '86.00', 'USD'],
        ],
      },
    },
  },
  howH2: 'How a Shopify order becomes a row, step by step',
  planParts: [
    { title: 'The track', body: 'Shopify’s new-order event, a step that writes the items in plain words, and the row.' },
    { title: 'Tested on your data', body: 'Run once on your latest real order. The row is held and shown, not added.' },
    { title: 'Runs', body: 'When a new order comes in on Shopify.' },
    { title: 'On its own', body: 'Adding the row, in your own sheet, approved with this plan.' },
    { title: 'Asks you first', body: 'Nothing: it reaches no one.' },
  ],
  steps: [
    { title: 'Captain finds the order event', body: 'It picks Shopify’s "New Order" trigger, reads your sheet’s headers, and asks which sheet if you did not say. Ask for paid orders only and it starts from "Order Paid" instead.' },
    { title: 'It tests on your last order', body: 'It runs the steps once on your latest real order and shows the row it would add, items written out. Nothing is written yet; change a column in its chat and it tests again.' },
    { title: 'Make it live', body: 'It is built as a draft. Tap Make it live and every order from then on goes in.' },
    { title: 'Each order: items in plain words', body: 'Shopify sends an order’s line items as a list. A step with no AI writes each one as "2 × Cedar & Smoke candle (Large)", joins them in one cell with " | ", and adds up the quantities.' },
    { title: 'The row goes in on its own', body: 'Your sheet is yours, so nothing waits for you. Every run, with what each step got, stays under Runs, and a step that fails says why in Shopify’s or Google’s words.' },
  ],
  uses: [
    { app: 'shopify', icon: iconOf('shopify'), name: 'Shopify', why: 'Starts each run on a new order and passes its number, customer, line items, total and currency.', chips: chips('shopify', ['New Order', 'Order Paid', 'Order Cancelled']) },
    { app: 'googlesheets', icon: iconOf('google-sheets'), name: 'Google Sheets', why: 'Adds one row per order; for one row per item it adds several rows at once.', chips: chips('google-sheets', ['Add New Row to Sheet', 'Add Multiple Rows']) },
  ],
  usesNote: 'Triggers and actions named as viaSocket’s catalog of 2,300+ apps lists them, read 19 Nov 2026.',
  asksFirst:
    'Nothing, once it is live. A row in your own sheet reaches no one, so it runs on its own, approved when you tapped Build it and Make it live. Add a step that emails the customer, and that step asks each time.',
  table: {
    h2: 'One row per order, or one row per item?',
    label: 'Sheet layouts',
    done: 'In the plan',
    cols: ['Layout', 'Best for', 'Ask Captain'],
    intro: 'Decide before the first order lands: it sets what your sheet can answer. The plan starts with one row per order.',
    rows: [
      { when: 'One row per order', tone: 'Counting orders and revenue; items listed in one cell', ask: '' },
      { when: 'One row per item', tone: 'Which products and variants sell; the order total repeats on each line', ask: 'Set up an automation: every new Shopify order is added to my Google Sheet as one row per item, with the order number, product, variant, quantity and price' },
      { when: 'Two tabs', tone: 'Both: Orders for totals, Items for products, joined by order number', ask: 'Set up an automation: every new Shopify order is added as a row to an Orders tab, and each of its items as a row to an Items tab, both with the order number' },
      { when: 'Cancellations', tone: 'Marking cancelled orders, so totals stay true', ask: 'Also when a Shopify order is cancelled, add the order number and date to a Cancelled tab' },
    ],
    note: 'Shopify’s own CSV puts each item on its own line; MESA’s template writes one row per product; CodeWords suggests an orders tab plus a line-items tab.',
    sources: [
      { label: 'Shopify export', href: 'https://help.shopify.com/en/manual/fulfillment/managing-orders/exporting-orders' },
      { label: 'MESA', href: 'https://www.getmesa.com/templates/send-shopify-orders-to-google-sheets' },
      { label: 'CodeWords', href: 'https://www.codewords.ai/blog/automate-shopify-order-to-google-sheets' },
    ],
  },
  yoursIntro: 'Choose the layout, paid only, or a filter. Each of these builds a different automation; copy one into Captain.',
  variations: [
    'Set up an automation: every paid Shopify order is added as a row to my Google Sheet with its items and total',
    'Set up an automation: every new Shopify order is added as a row to my Google Sheet with its items, total, shipping country and discount code',
    'Set up an automation: every new Shopify order over $200 is added as a row to my Google Sheet with its items and total',
    'Set up an automation: every new Shopify order is added as a row to a tab for its month in my Google Sheet',
  ],
  limits: [
    'It adds a row when an order is created. Edits, refunds and cancellations later do not change that row; add a Cancelled tab (above) to keep totals true.',
    'Orders from before it went live are not added. Export those once from Shopify.',
    'Product and variant names are as they were when the order was placed; renaming a product later does not update old rows.',
    'One row per item writes up to 50 items per order in one run.',
  ],
  otherWaysH2: 'Other ways to get Shopify orders into Google Sheets',
  otherWays: [
    {
      title: 'Shopify Flow',
      body: 'Flow’s "Add row to spreadsheet" action writes a row per run from inside Shopify, which is the better fit if your team already builds in Flow. Each comma is a new column, and one row per item needs a "For each" loop.',
      sources: [{ label: 'Shopify Flow', href: 'https://help.shopify.com/en/manual/shopify-flow/reference/connectors/add-row-to-spreadsheet' }],
    },
    {
      title: 'Make or Zapier',
      body: 'Make has "Save new paid Shopify orders to a Google Sheets spreadsheet" and a separate template for cancelled orders; Zapier has "Add new paid Shopify orders as Google Sheets rows". You map the line items yourself.',
      sources: [
        { label: 'Make, paid orders', href: 'https://www.make.com/en/templates/3075-save-new-paid-shopify-orders-to-a-google-sheets-spreadsheet' },
        { label: 'Make, cancelled', href: 'https://www.make.com/en/templates/5814-add-cancelled-orders-from-shopify-to-a-google-sheet' },
      ],
    },
    {
      title: 'A Shopify app',
      body: 'Apps from the Shopify App Store sync orders to a sheet; OSync, for one, also updates rows when an order changes, which this automation does not. MESA’s template writes one row per product with 12 fields.',
      sources: [{ label: 'OSync', href: 'https://apps.shopify.com/osync-export-orders-to-sheets' }, { label: 'MESA', href: 'https://www.getmesa.com/templates/send-shopify-orders-to-google-sheets' }],
    },
  ],
  faqs: [
    { q: 'Does each product get its own row?', a: 'Not by default: each order is one row, with its items listed in one cell. Ask for one row per item and every product and variant gets its own line, with the order number on each.' },
    { q: 'Should it start on a new order or a paid order?', a: 'A new order catches everything, including orders paid later or by bank transfer. If you only want money that has come in, start from "Order Paid" instead.' },
    { q: 'What happens when an order is cancelled or refunded?', a: 'The row stays as it was. Add a second start on Shopify’s "Order Cancelled" that writes the order to a Cancelled tab, so you can take those out of your totals.' },
    { q: 'Why do commas split my columns?', a: 'Some tools write a row as comma-separated text, so a product called "Fig, Linen & Oak" splits in two. This automation maps each value to its column by header, so commas stay inside the cell.' },
    { q: 'Can I add past orders?', a: 'It starts with the next order. For history, export your orders as a CSV from Shopify once and paste them in above the new rows.' },
  ],
  related: [
    { href: '/use-cases/stripe-payments-to-google-sheets', kind: 'auto', title: 'Stripe payments to Google Sheets', line: 'Paid through Stripe? Every payment as a row, in dollars.' },
    { href: '/use-cases/track-competitor-prices', kind: 'browser', title: 'Track competitor prices', line: 'A browser agent that tells you when a rival changes a price.' },
    { href: '/use-cases/hubspot-contacts-to-google-sheets-and-slack', kind: 'auto', title: 'HubSpot contacts to Sheets and Slack', line: 'Every new contact as a row and a Slack post.' },
  ],
  up: [
    { href: '/automations', label: 'Automations you can build' },
    { href: '/integrations/shopify/google-sheets', label: 'Shopify and Google Sheets' },
    { href: '/integrations/shopify', label: 'Shopify' },
    { href: '/guides/how-to-send-shopify-orders-to-google-sheets', label: 'How to send Shopify orders to Google Sheets' },
  ],
  finalH2: 'Start your Shopify orders sheet',
  byline: 'Captain builds this automation from the ask above, the same words as the "New orders to your sheet" Playbook in the 50agents app; the views above are drawn from that app, filled with example data.',
};

export default page;
