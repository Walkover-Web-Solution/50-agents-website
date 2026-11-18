// Role page: finance (pages-brief B7). Jobs from the 50agents templates and the invoices recipe; Stripe, QuickBooks, Xero,
// Zoho Books and Razorpay events from viaSocket's catalog, read 19 Nov 2026.
import type { Role } from '@/content/guides/types';
import { APPS } from '@/content/guides/apps';

const r: Role = {
  slug: 'finance',
  role: 'finance teams',
  kind: 'app',
  title: 'AI agents and automations for finance teams | 50agents',
  description:
    'What finance hands to AI first: late invoices chased, each payment logged, a weekly revenue note, failed payments flagged and bills pulled from email into a sheet.',
  h1: 'AI agents and automations for finance teams',
  answer: [
    'Finance teams hand off the chasing and the copying first: reminders drafted for late invoices, every Stripe payment logged as a row, and a Monday note on last week’s revenue.',
    'In 50agents each is one sentence to Captain, built on Stripe, QuickBooks, Xero, Gmail and Google Sheets; nothing that reaches a client or moves money happens without your approval.',
  ],
  updated: '2026-11-19',
  jobs: [
    { title: 'Chase unpaid invoices', kind: 'app', href: '/use-cases/chase-unpaid-invoices', body: 'An invoices desk with what is owed, late first. Its AI agent drafts a reminder when a Sent invoice is a day past due and waits for your yes.', ask: 'Chase my unpaid invoices' },
    { title: 'Log every payment', kind: 'auto', href: '/use-cases/stripe-payments-to-google-sheets', body: 'Each successful Stripe payment becomes a row in your Google Sheet with the customer, amount and date.', ask: 'Set up an automation: every new Stripe payment is added as a row to my Google Sheet with the customer, amount and date' },
    { title: 'A weekly revenue note', kind: 'ai', href: '/use-cases/weekly-stripe-revenue-summary', body: 'Every Monday at 9:00, an AI agent reads last week in Stripe and emails you the totals and what changed, in words.', ask: 'Set up an AI agent that reads last week\'s payments in Stripe every Monday at 9:00 and emails me the totals and what changed' },
    { title: 'Flag failed payments', kind: 'auto', body: 'When a payment fails in Stripe, email you the customer, the amount and the reason the same minute, so you can reach out before the next attempt.', ask: 'Set up an automation: when a Stripe payment fails, email me the customer, amount and failure reason' },
    { title: 'Pull bills out of email', kind: 'auto', body: 'When an email with an attachment arrives from a supplier, an AI step reads the supplier, amount and due date and adds a row to your Bills sheet.', ask: 'Set up an automation: when an email with an invoice attached arrives in Gmail, read the supplier, amount and due date and add a row to my Bills sheet' },
  ],
  useCases: [
    { href: '/use-cases/chase-unpaid-invoices', kind: 'app', title: 'Chase unpaid invoices automatically', line: 'An invoices desk that drafts reminders.' },
    { href: '/use-cases/stripe-payments-to-google-sheets', kind: 'auto', title: 'Stripe payments to Google Sheets', line: 'One row per payment, every time.' },
    { href: '/use-cases/weekly-stripe-revenue-summary', kind: 'ai', title: 'Weekly Stripe revenue summary', line: 'Last week’s money in your inbox every Monday.' },
  ],
  apps: [
    { slug: 'stripe', name: 'Stripe', icon: APPS.stripe.icon, line: '45 triggers: payment succeeds, payment fails, refunds' },
    { slug: 'quickbooks', name: 'QuickBooks', icon: APPS.quickbooks.icon, line: 'New invoice, new bill; find invoices' },
    { slug: 'xero', name: 'Xero', icon: APPS.xero.icon, line: 'New payment, new bill; find invoice' },
    { slug: 'zoho-books', name: 'Zoho Books', icon: APPS.zohobooks.icon, line: 'Sales invoice created; send invoice' },
    { slug: 'razorpay', name: 'Razorpay', icon: APPS.razorpay.icon, line: 'Payment captured, invoice paid' },
    { slug: 'google-sheets', name: 'Google Sheets', icon: APPS.sheets.icon, line: 'The ledger your team already opens' },
    { slug: 'gmail', name: 'Gmail', icon: APPS.gmail.icon, line: 'Reminders sent from your own address' },
    { slug: 'slack', name: 'Slack', icon: APPS.slack.icon, line: 'Alerts to your finance channel' },
  ],
  appsNote: 'Triggers and actions as listed in viaSocket’s catalog, read 19 Nov 2026.',
  example: {
    h2: 'Worked example: failed payments, flagged the same minute',
    intro: 'A failed card payment is cheapest to fix in the first hour, while the customer still remembers buying. This automation runs on Stripe’s "Payment Fails" event and emails you the details. An email to your own address goes without asking; the same alert to a client would ask first.',
    ask: 'Set up an automation: when a Stripe payment fails, email me the customer, amount and failure reason',
    view: {
      type: 'track',
      name: 'Failed payment alert',
      status: 'Live · runs on each failed Stripe payment',
      today: [['Runs today', '3'], ['Did something', '3'], ['Did not work', '0'], ['Credits today', '6']],
      stations: [
        { mark: 'app', app: APPS.stripe, say: 'When a payment fails in Stripe', passes: ['customer', 'amount', 'failure reason'] },
        { mark: 'set', say: 'Amount in dollars', passes: ['amount'], did: 'Ran', values: [['Amount', '240.00']] },
        { mark: 'app', app: APPS.gmail, say: 'Email you: "Payment failed: Harbor Yoga, $240, card declined"', did: 'Ran' },
      ],
    },
    caption: 'The automation’s Overview in 50agents: today’s runs and each step with what it handed on. Example data.',
    after: [
      'Ask for more and it plans more: "and add the failed payment to my Retries sheet", or "only for amounts over $100".',
      'The method behind logging payments is in [how to log Stripe payments in Google Sheets](/guides/how-to-log-stripe-payments-in-google-sheets).',
    ],
  },
  notYet: [
    'It does not sync with QuickBooks or Xero as a ledger; it reads their events and actions, and the invoices desk keeps its own copy.',
    'It never pays, refunds or transfers on its own; anything that moves money asks you.',
    'Reminders go by email, not SMS or WhatsApp.',
  ],
  guides: ['how-to-automate-invoice-reminders', 'how-to-build-an-invoice-tracker', 'how-to-log-stripe-payments-in-google-sheets'],
  faqs: [
    { q: 'Is it safe to connect Stripe?', a: 'Connect only what each job needs. Automations that read Stripe events and add rows change nothing in Stripe; anything that would spend or refund money asks first.' },
    { q: 'Can it read invoices from PDFs?', a: 'An AI step can read the text of an email and its attachment details to pull out the supplier, amount and due date. Check the first runs against the documents.' },
    { q: 'Does it replace my accounting software?', a: 'No. It does the chasing, copying and summarising around it. Your books stay in QuickBooks, Xero or Zoho Books.' },
  ],
};

export default r;
