// Google Sheets (pages-brief B3). Triggers and actions: viaSocket's catalog (scripts/snapshot-catalog.mjs), read 19 Nov 2026.
// Asks: the 50agents app's templates (app/src/features/templates/list.ts); importer: app/src/features/apps/CLAUDE.md, read 19 Nov 2026.
import type { Flagship } from '../types';

const page: Flagship = {
  slug: 'google-sheets',
  title: 'AI agents, automations and apps for Google Sheets | 50agents',
  description:
    'Connect Google Sheets and tell Captain the job: log every Stripe payment or Shopify order as a row, start work when a row changes, or turn a sheet into an app.',
  answer: [
    'In 50agents you connect Google Sheets and tell Captain what should land in it or start from it, such as “every new Stripe payment is added as a row to my Google Sheet”.',
    'Captain builds an automation that adds, updates or looks up rows, an AI agent that reads a sheet and acts on what it finds, or an app with real screens built from your spreadsheet’s columns.',
  ],
  heroAsk: 'Set up an automation: every new Stripe payment is added as a row to my Google Sheet with the customer, amount and date',
  kinds: [
    {
      kind: 'auto',
      does: 'A row for every event in another app: each Stripe payment, Shopify order or HubSpot contact, mapped to your columns. Or start work in another app when a row is added or changed.',
      ask: 'Set up an automation: every new Shopify order is added as a row to my Google Sheet with its items and total',
      uses: ['Add New Row to Sheet', 'Row Added Or Updated'],
    },
    {
      kind: 'ai',
      does: 'Reads the rows and decides what to do with each, such as which leads in a list to follow up, then writes the outcome back into the row so the sheet stays the record.',
      ask: 'Set up an AI agent that reads my leads sheet every weekday at 9:00, picks the ones nobody has contacted in a week, and drafts a follow-up email for me to approve',
      uses: ['List Rows in Sheet', 'Lookup Spreadsheet Rows', 'Update Spreadsheet Row'],
    },
    {
      kind: 'browser',
      does: 'Fills a sheet from websites that have no app to connect, such as competitors’ pricing pages, one row per check.',
      ask: 'Set up a browser agent that checks my competitors’ pricing pages every day at 9:00 and tells me when a price changes',
      uses: [],
    },
    {
      kind: 'app',
      does: 'When a sheet has outgrown itself: bring its rows into an app with typed fields, a board, a table and numbers, and AI agents that keep it up to date. Paste the table or drop in a CSV or Excel file.',
      ask: 'Track my leads and follow up',
      uses: [],
    },
  ],
  groups: [
    { label: 'Rows', line: 'Start when a row is added or updated; add one row or many, update, look up, read, clear, format or delete rows.', events: ['Row Added Or Updated', 'Add New Row to Sheet', 'Add Multiple Rows', 'Update Spreadsheet Row', 'Update Multiple Rows', 'Lookup Spreadsheet Rows', 'List Rows in Sheet', 'Get Rows From Range', 'Get Row Details', 'Clear Spreadsheet Row', 'Format Spreadsheet Row', 'Delete Rows'] },
    { label: 'Cells and columns', line: 'Update many cells at once, add a column, or colour cells by their values.', events: ['Batch Update Cell Values', 'Create Sheet Column', 'Add Conditional Formatting Rule'] },
    { label: 'Tabs', line: 'Add, find, list, rename or copy the tabs inside a spreadsheet.', events: ['Create Subsheet', 'Find Subsheet', 'List Spreadsheet Tabs', 'Update Sheet Name', 'Copy Sheet To Spreadsheet'] },
    { label: 'Spreadsheets', line: 'Create a spreadsheet, start one from a template, list them, or delete one for good.', events: ['Create a Spreadsheet', 'Create Spreadsheet From Template', 'List Spreadsheets', 'Permanently Delete Spreadsheet'] },
  ],
  useCases: [
    { slug: 'stripe-payments-to-google-sheets', kind: 'auto', title: 'Stripe payments to Google Sheets', line: 'Each payment as a row with customer, amount and date.' },
    { slug: 'shopify-orders-to-google-sheets', kind: 'auto', title: 'Shopify orders to Google Sheets', line: 'Each order as a row with its items and total.' },
    { slug: 'hubspot-contacts-to-google-sheets-and-slack', kind: 'auto', title: 'HubSpot contacts to Google Sheets and Slack', line: 'Each new contact as a row and a Slack post.' },
  ],
  guides: [
    { slug: 'how-to-log-stripe-payments-in-google-sheets', title: 'How to log Stripe payments in Google Sheets' },
    { slug: 'how-to-send-shopify-orders-to-google-sheets', title: 'How to send Shopify orders to Google Sheets' },
    { slug: 'how-to-build-an-app-from-google-sheets', title: 'How to build an app from Google Sheets' },
    { slug: 'how-to-automate-data-entry-between-two-apps', title: 'How to automate data entry between two apps' },
  ],
  faqs: [
    {
      q: 'Can it update a row instead of adding a new one each time?',
      a: 'Yes. Lookup Spreadsheet Rows finds the row that matches a value, such as an order number, and Update Spreadsheet Row changes its columns, so the same record is not added twice.',
    },
    {
      q: 'Can a change in my sheet start something?',
      a: 'Yes. Row Added Or Updated starts an automation or an AI agent when someone adds or edits a row, for example to post the new row in Slack or email the person named in it.',
    },
    {
      q: 'Can I turn my spreadsheet into an app?',
      a: 'Yes. Ask Captain for the app you need, then bring your rows in by pasting the table or dropping in a CSV or Excel export. Captain maps the columns to the app’s fields and shows you where each one goes before anything is added.',
    },
  ],
  updated: '2026-11-19',
};
export default page;
