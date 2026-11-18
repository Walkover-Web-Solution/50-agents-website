// Guide 21 (pages-brief B5). Research: QuickBooks Small Business Late Payments Report 2025, Ramp, InvoiceFly, PayPal and
// Tipalti results for "invoice tracker", read 19 Nov 2026. 50agents: the invoices recipe (fields, statuses, views).
// /use-cases/chase-unpaid-invoices shows the desk's Overview, To collect and Late; this page shows All invoices.
import type { Guide } from './types';

const g: Guide = {
  slug: 'how-to-build-an-invoice-tracker',
  n: 21,
  group: 'Apps',
  kind: 'app',
  title: 'How to build an invoice tracker (columns, rules) | 50agents',
  description:
    'Build an invoice tracker with eight columns, five statuses and two formulas: days late and amount still due. Then a Late view, a weekly check and reminders.',
  h1: 'How to build an invoice tracker',
  short:
    'An invoice tracker is one row per invoice with eight columns (number, client, email, amount, sent date, due date, status, notes), five statuses (Draft, Sent, Reminded, Paid, Written off), and a Late view that shows unpaid invoices past their due date, oldest first. Update the status the day money arrives, and the tracker answers the only two questions that matter: who owes you, and since when.',
  published: '2026-11-19',
  updated: '2026-11-19',
  sections: [
    {
      id: 'why',
      h2: 'Why bother',
      body: [
        { p: 'Late payment is the norm, not the exception. In QuickBooks’ survey of 2,487 US small businesses in January 2025, 56% were owed money on unpaid invoices, $17,500 on average, and 47% had invoices more than 30 days overdue ([QuickBooks](https://quickbooks.intuit.com/r/small-business-data/small-business-late-payments-report-2025/)). Most of that is not refusal; it is invoices nobody followed up.' },
        { note: 'This guide is about invoices you send (money owed to you). Bills you pay are a different tracker with different dates; keep them apart.' },
      ],
    },
    {
      id: 'columns',
      h2: 'The columns and statuses',
      body: [
        {
          table: {
            head: ['Column', 'Example', 'Note'],
            rows: [
              ['Invoice', 'INV-1049', 'Unique. The key for everything else.'],
              ['Client', 'Brightline Physio', ''],
              ['Email', 'billing@brightline.example', 'The accounts address, not your contact’s.'],
              ['Amount', '$1,250', 'Add a currency column if you bill in more than one.'],
              ['Sent', '3 Nov 2026', 'When the client received it.'],
              ['Due', '17 Nov 2026', 'Sent date plus your terms.'],
              ['Status', 'Sent', 'Draft, Sent, Reminded, Paid, Written off.'],
              ['Notes', 'Promised payment Friday', 'One line per contact.'],
            ],
          },
        },
        { p: 'Two formulas make a sheet version useful. Days late: `=IF(AND(G2<>"Paid",F2<TODAY()),TODAY()-F2,"")`. Amount still due, if you allow part payments: a Paid so far column and `=D2-I2`.' },
      ],
    },
    {
      id: 'steps',
      h2: 'How to build it, step by step',
      body: [
        {
          steps: [
            { title: 'Create the list', body: 'The eight columns above, in a sheet or a no-code app. Make Status a dropdown.' },
            { title: 'Bring in every open invoice', body: 'Export from your invoicing or accounting app as CSV, or type them in. Open ones first; paid history can wait.' },
            { title: 'Add a Late view', body: 'Filter: status not Paid or Written off, due date before today. Sort by due date, oldest first.' },
            { title: 'Add totals', body: 'Still to collect (everything Sent or Reminded), Late, and Paid this month. Three numbers you can read in a second.' },
            { title: 'Update it the day money lands', body: 'Check the bank or payment app, mark Paid. A tracker that is a week behind sends you chasing paid invoices.' },
            { title: 'Decide what happens to late ones', body: 'A reminder schedule: see [how to automate invoice reminders](/guides/how-to-automate-invoice-reminders).' },
          ],
        },
      ],
    },
    {
      id: 'example',
      h2: 'A worked example in 50agents',
      body: [
        { p: 'In 50agents, Captain builds this tracker as an app from one sentence: the invoices list with these fields and statuses, three views (To collect, Late, All invoices) and the three totals on its Overview. Drop in your CSV or Excel export and it matches the columns. Its crew member, Collector, an AI agent, drafts a reminder when a Sent invoice is a day past due and waits for your yes before sending.' },
        { ask: 'Track which clients have paid me' },
        {
          view: {
            type: 'app',
            face: ['closer', 'keeper'],
            name: 'Invoices desk',
            status: 'Live · 10 invoices',
            rail: ['Overview', 'To collect', 'Late', 'All invoices'],
            on: 'All invoices',
            table: {
              head: ['Invoice', 'Client', 'Amount', 'Sent', 'Due', 'Status'],
              rows: [
                ['INV-1062', 'Riverside Clinic', '$2,100', '', '17 Dec', 'Draft'],
                ['INV-1060', 'Pinecone Coffee', '$320', '10 Nov', '10 Dec', 'Sent'],
                ['INV-1055', 'Lumen Dental', '$980', '5 Nov', '19 Nov', 'Sent'],
                ['INV-1049', 'Brightline Physio', '$1,250', '3 Nov', '17 Nov', 'Reminded'],
                ['INV-1044', 'Cobalt Fitness', '$1,150', '28 Sep', '28 Oct', 'Paid'],
              ],
            },
          },
          caption: 'The All invoices view of the invoices desk in 50agents, newest sent first. Example data.',
        },
      ],
    },
  ],
  pair: { href: '/use-cases/chase-unpaid-invoices', label: 'Build it: chase unpaid invoices automatically', line: 'The same desk with reminders drafted for you: the Overview, the To collect board and the Late list.' },
  wrong: [
    { title: 'Part payments marked Paid', body: 'Half arrives, the row turns green, the rest is forgotten. Add a Part paid status and the amount still due.' },
    { title: 'Duplicate invoice numbers', body: 'Two invoices called INV-1049 after a template copy. Make the number unique and check before adding.' },
    { title: 'A week behind the bank', body: 'The tracker says late; the client paid on Monday. Update on the day, or connect it to where payments land.' },
    { title: 'Receivables and bills in one list', body: 'Money in and money out mixed up. Keep two trackers.' },
    { title: 'Due dates from the wrong terms', body: 'Net 30 for a client on Net 14. Store terms per client and compute the due date from them.' },
  ],
  faqs: [
    { q: 'What should an invoice tracker include?', a: 'Invoice number, client, billing email, amount, sent date, due date, status and notes. Add currency and amount paid if you need them.' },
    { q: 'How do I track unpaid invoices in Excel or Google Sheets?', a: 'One row per invoice with a Status dropdown, a Days late formula, and a filter view of everything not Paid with a due date before today, sorted oldest first.' },
    { q: 'Should I use my accounting app instead?', a: 'If every invoice is raised there, yes: it already tracks payments. A separate tracker earns its place when invoices come from several places or you want a desk that drafts reminders.' },
  ],
  sources: [
    { label: 'QuickBooks: Small Business Late Payments Report 2025', href: 'https://quickbooks.intuit.com/r/small-business-data/small-business-late-payments-report-2025/' },
    { label: 'Ramp: How to track invoices', href: 'https://ramp.com/blog/how-to-track-invoices' },
  ],
  related: ['how-to-automate-invoice-reminders', 'how-to-build-an-app-from-google-sheets', 'how-to-build-a-simple-crm-without-code'],
};

export default g;
