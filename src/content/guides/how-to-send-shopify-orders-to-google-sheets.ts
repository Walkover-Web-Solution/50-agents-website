// Guide 10 (pages-brief B5). The method, for any tool. The ready-to-build version is /use-cases/shopify-orders-to-google-sheets.
// Research: Shopify help (exporting orders, Shopify Flow, Flow's Add row to spreadsheet, editing orders), Shopify webhook
// docs, MESA, Zapier and Codewords results, read 19 Nov 2026. Shopify's triggers in viaSocket's catalog read the same day.
import type { Guide } from './types';
import { APPS } from './apps';

const g: Guide = {
  slug: 'how-to-send-shopify-orders-to-google-sheets',
  n: 10,
  group: 'Automations',
  kind: 'auto',
  title: 'How to send Shopify orders to Google Sheets | 50agents',
  description:
    'Send Shopify orders to Google Sheets with Shopify Flow or an automation: decide one row per order or per item first, then catch cancellations and edits too.',
  h1: 'How to send Shopify orders to Google Sheets',
  short:
    'Use Shopify Flow’s "Add row to spreadsheet" action (free on every Shopify plan) or an automation tool that adds a row on each new order, after deciding whether you want one row per order or one row per item. Then add a second step for cancelled orders, because a new-order trigger never touches the row again when an order is edited or cancelled.',
  published: '2026-11-19',
  updated: '2026-11-19',
  sections: [
    {
      id: 'shape',
      h2: 'First decide: one row per order, or one per item',
      body: [
        { p: 'This one choice decides everything after it. Answer it from what you will do with the sheet.' },
        {
          table: {
            head: ['', 'One row per order', 'One row per item'],
            rows: [
              ['Good for', 'Revenue by day, order counts, shipping', 'Best sellers, stock planning, variant sales'],
              ['Columns', 'Order number, date, customer, items as text, total', 'Order number, date, product, variant, SKU, quantity, line price'],
              ['Totals', 'SUM of the total column', 'Order totals repeat across rows; never SUM them'],
              ['In Shopify Flow', 'One "Add row" action', 'Wrap "Add row" in For each over the line items ([Shopify](https://help.shopify.com/en/manual/shopify-flow/reference/connectors/add-row-to-spreadsheet))'],
            ],
          },
        },
        { note: 'Shopify’s own CSV export already puts extra line items on their own rows with most fields left blank ([Shopify](https://help.shopify.com/en/manual/fulfillment/managing-orders/exporting-orders)). If you only need a monthly view, that export may be all you need.' },
      ],
    },
    {
      id: 'options',
      h2: 'Three ways to do it',
      body: [
        {
          table: {
            head: ['Way', 'Cost', 'Watch out for'],
            rows: [
              ['Orders, Export (CSV)', 'Free', 'By hand. Up to 50 orders download at once; bigger exports are emailed to you.'],
              ['Shopify Flow, "Add row to spreadsheet"', 'Free on Basic, Grow, Advanced and Plus ([Shopify](https://help.shopify.com/en/manual/shopify-flow))', 'Row contents are comma-separated, so a comma in a product name splits the row; Shopify suggests a Liquid replace filter.'],
              ['An automation tool', 'The tool’s plan', 'Pick "new order" or "order paid" on purpose; one includes unpaid orders, the other does not.'],
            ],
          },
        },
      ],
    },
    {
      id: 'steps',
      h2: 'How to set it up, step by step',
      body: [
        {
          steps: [
            { title: 'Build the header row', body: 'Order number first, then date, customer, the columns from your choice above, and a Status column. Freeze the header.' },
            { title: 'Pick the trigger', body: 'New order catches every order, paid or not; order paid catches only money in. In viaSocket’s catalog Shopify has "New Order", "Order Paid" and "Order Cancelled" as triggers.' },
            { title: 'Map line items deliberately', body: 'For one row per order, join items into one cell ("2 x Oat Latte Blend, 1 x Grinder"). For one row per item, loop over the line items and repeat the order number on each row.' },
            { title: 'Clean the text', body: 'Strip commas and line breaks from product names and notes, or quote them, so columns stay in place.' },
            { title: 'Catch cancellations', body: 'A second automation on "Order Cancelled" finds the order number in the sheet and sets Status to Cancelled. Do the same for refunds if you report on them.' },
            { title: 'Test with a real order', body: 'Place a test order with two products, one with a comma in its name, then cancel it. You should see one or two rows, then a Cancelled status.' },
          ],
        },
      ],
    },
    {
      id: 'example',
      h2: 'A worked example in 50agents',
      body: [
        { p: 'Here is the one-row-per-order version as Captain builds it in 50agents. It reads a real order from your store to plan the columns, tests the steps on that order, and keeps the automation as a draft until you tap Make it live.' },
        { ask: 'Set up an automation: every new Shopify order is added as a row to my Google Sheet with its items and total' },
        {
          view: {
            type: 'track',
            name: 'New orders to your sheet',
            status: 'Draft: not live yet',
            sample: { title: 'Order #1187 · 2 items · $64.00', sub: 'The real order it planned and tested with' },
            stations: [
              { mark: 'app', app: APPS.shopify, say: 'When a new order comes in to Shopify', passes: ['order number', 'customer', 'line items', 'total'] },
              { mark: 'set', say: 'Join the items into one line, without commas', passes: ['items'], did: 'Ran', values: [['Items', '2 x Oat Latte Blend; 1 x Hand Grinder']] },
              { mark: 'app', app: APPS.sheets, say: 'Add a row to "Orders"', did: 'Ran' },
            ],
            tested: 'Tested on your real data. Ran for real: 2 steps.',
          },
          caption: 'The plan Captain built, tested on a real order and waiting as a draft. A second ask can add the cancellation step. Example data.',
        },
        { ask: 'When a Shopify order is cancelled, find its row in my Orders sheet and set Status to Cancelled' },
        {
          view: {
            type: 'sheet',
            file: 'Store orders',
            tab: 'Orders',
            head: ['Order', 'Date', 'Customer', 'Items', 'Total', 'Status'],
            rows: [
              ['#1185', '18 Nov 2026', 'R. Okafor', '1 x Hand Grinder', '$42.00', 'Paid'],
              ['#1186', '18 Nov 2026', 'M. Chen', '3 x Oat Latte Blend', '$33.00', 'Cancelled'],
              ['#1187', '19 Nov 2026', 'A. Patel', '2 x Oat Latte Blend; 1 x Hand Grinder', '$64.00', 'Paid'],
            ],
            fresh: 1,
          },
          caption: 'The sheet, with one cancelled order marked by the second automation. Example data.',
        },
      ],
    },
  ],
  pair: { href: '/use-cases/shopify-orders-to-google-sheets', label: 'Build it: Shopify orders to Google Sheets', line: 'The ready-made version: the exact ask, the Shopify fields it uses and its variations.' },
  wrong: [
    { title: 'Edited orders leave old numbers', body: 'Shopify lets you add or remove items and change quantities after an order is placed ([Shopify](https://help.shopify.com/en/manual/fulfillment/managing-orders/editing-orders)). A new-order trigger never sees that. Add an update step, or treat the sheet as a log and reconcile from Shopify monthly.' },
    { title: 'Duplicate rows', body: 'Shopify retries webhooks up to 8 times over 4 hours when your endpoint does not answer within 5 seconds ([Shopify](https://shopify.dev/docs/apps/build/webhooks/troubleshooting-webhooks)). Look the order number up before adding.' },
    { title: 'Columns shift', body: 'A comma or a line break in a product name or note splits the row. Clean the text first.' },
    { title: 'Only paid orders arrived', body: 'You picked "order paid" but wanted cash-on-delivery orders too. Switch to new order and keep a Status column.' },
    { title: 'Totals counted twice', body: 'With one row per item, the order total repeats on every row. Sum line prices instead.' },
    { title: 'The sheet slows down', body: 'Google Sheets holds up to 20 million cells ([Google](https://support.google.com/drive/answer/37603)), but a sheet full of formulas gets slow far sooner. Start a new tab each year.' },
  ],
  faqs: [
    { q: 'Can Shopify export orders straight to Google Sheets?', a: 'Not live from the Orders page, which exports CSV files. Shopify Flow’s "Add row to spreadsheet" action can write each order into a Google Sheet as it arrives.' },
    { q: 'Is Shopify Flow free?', a: 'Yes, on Basic, Grow, Advanced and Plus. Its "Send HTTP request" action needs Grow or above, but adding sheet rows does not.' },
    { q: 'How do I get one row per product?', a: 'Loop over the order’s line items and add a row for each, repeating the order number. In Flow that is the For each step around Add row.' },
  ],
  sources: [
    { label: 'Shopify help: Exporting orders', href: 'https://help.shopify.com/en/manual/fulfillment/managing-orders/exporting-orders' },
    { label: 'Shopify help: Shopify Flow', href: 'https://help.shopify.com/en/manual/shopify-flow' },
    { label: 'Shopify help: Flow, Add row to spreadsheet', href: 'https://help.shopify.com/en/manual/shopify-flow/reference/connectors/add-row-to-spreadsheet' },
    { label: 'Shopify help: Editing orders', href: 'https://help.shopify.com/en/manual/fulfillment/managing-orders/editing-orders' },
    { label: 'Shopify dev docs: Troubleshooting webhooks', href: 'https://shopify.dev/docs/apps/build/webhooks/troubleshooting-webhooks' },
    { label: 'Google: Files you can store in Google Drive (Sheets limits)', href: 'https://support.google.com/drive/answer/37603' },
  ],
  related: ['how-to-log-stripe-payments-in-google-sheets', 'how-to-automate-data-entry-between-two-apps', 'webhooks-explained-for-non-developers'],
};

export default g;
