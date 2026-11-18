// Stripe (pages-brief B3). Triggers and actions: viaSocket's catalog (scripts/snapshot-catalog.mjs), read 19 Nov 2026.
// Stripe's own agent tooling: docs.stripe.com/agents, read 19 Nov 2026. Asks: app/src/features/templates/list.ts.
import type { Flagship } from '../types';

const page: Flagship = {
  slug: 'stripe',
  title: 'AI agents, automations and apps for Stripe | 50agents',
  description:
    'Connect Stripe and tell Captain the job: each payment as a row in Google Sheets, last week’s revenue emailed every Monday, or a heads-up on failed payments.',
  answer: [
    'In 50agents you connect Stripe and tell Captain what to do with your payments, for example “every new Stripe payment is added as a row to my Google Sheet with the customer, amount and date”.',
    'Captain builds an automation that fires on Stripe events such as a payment, refund, failed payment or new subscription, or an AI agent that reads your payments and writes you a summary of what changed.',
  ],
  heroAsk: 'Set up an AI agent that reads last week’s payments in Stripe every Monday at 9:00 and emails me the totals and what changed',
  kinds: [
    {
      kind: 'auto',
      does: 'One event, the same steps every time: a payment becomes a sheet row, a failed payment becomes a Slack message, a new subscriber is added to your CRM.',
      ask: 'Set up an automation: every new Stripe payment is added as a row to my Google Sheet with the customer, amount and date',
      uses: ['When a payment succeeds', 'Payment Fails', 'Customer Subscribes'],
    },
    {
      kind: 'ai',
      does: 'Reads a week of payments, invoices and refunds, works out what moved and why it matters, and emails you a short summary instead of a log.',
      ask: 'Set up an AI agent that reads last week’s payments in Stripe every Monday at 9:00 and emails me the totals and what changed',
      uses: ['Find Payment Intents', 'List Invoice', 'Find a Subscription'],
    },
    {
      kind: 'browser',
      does: 'Stripe is connected through its API. A browser agent is for pages with no app, such as checking competitors’ public pricing.',
      ask: 'Set up a browser agent that checks my competitors’ pricing pages every day at 9:00 and tells me when a price changes',
      uses: [],
    },
    {
      kind: 'app',
      does: 'An invoices desk for money you are owed: late invoices first and a reminder drafted for each, sent from your Gmail when you approve it.',
      ask: 'Chase my unpaid invoices',
      uses: [],
    },
  ],
  groups: [
    { label: 'Payments and charges', line: 'Start when a payment succeeds or fails, a payment intent or charge is created, a charge succeeds or is refunded, or a checkout completes; find payment intents and collect a payment.', events: ['When a payment succeeds', 'Payment Fails', 'When a new payment intent is created', 'New Charge Is Created', 'When a charge succeeds', 'Charge Refunded', 'New Refund Created', 'When a checkout session is completed', 'Find Payment Intents', 'Collect Payment'] },
    { label: 'Customers', line: 'Start when a customer is created or changed; create, find, update or delete customers.', events: ['New Customer Created', 'Customer Updated', 'Create Customer', 'Find Customer', 'Search Customer', 'Update Customer', 'Delete Customer'] },
    { label: 'Subscriptions and plans', line: 'Start when a customer subscribes or a subscription ends; find and cancel subscriptions, list plans and billing meters.', events: ['Customer Subscribes', 'Subscription Ends', 'New Plan', 'Plan Updated', 'Plan Deleted', 'Find a Subscription', 'Cancel Subscription', 'List All Plans', 'List Billing Meters'] },
    { label: 'Invoices', line: 'Start when an invoice is finalized or paid, or an invoice item is created; create, list and search invoices.', events: ['Invoice Is Finalized', 'When an invoice is paid', 'Invoice Item Created', 'Create Invoice', 'List Invoice', 'Search Invoice Details'] },
    { label: 'Products, prices and payment links', line: 'Start on new or changed products, prices and payment links; create products, prices and payment links, or turn a link off.', events: ['New Product', 'Product Updated', 'Product Deleted', 'New Price', 'Price Updated', 'Price Deleted', 'Payment Link Created', 'Payment Link Updated', 'Create Product', 'Create Price', 'Create Payment Link', 'Deactivate Payment Link'] },
    { label: 'Coupons, promotions and quotes', line: 'Start when a coupon or promotion code is created or a quote is accepted or cancelled; list coupons.', events: ['Coupon Created', 'New Promotion Code', 'Promotion Code Updated', 'Quote Accepted', 'Quote Canceled', 'List Coupons'] },
    { label: 'Payment methods', line: 'Start when a card or other payment method is attached to a customer, detached, updated by you, or updated automatically by the card network.', events: ['Payment Method Attached', 'Payment Method Detached', 'Payment Method Updated', 'Payment Method Automatically Updated'] },
    { label: 'Payouts and accounts',  line: 'Start when a payout is created, paid, updated, cancelled or fails, or when a person on the account is added, changed or removed; list transfers and read accounts.', events: ['New Payout', 'Payout Paid', 'Payout Updated', 'Payout Canceled', 'Payout Failed', 'New Person', 'Person Updated', 'Person Deleted', 'List Transfers', 'Get Accounts'] },
    { label: 'Any Stripe event', line: 'Start on any event your Stripe account sends, when none of the triggers above fits.', events: ['New Event Occurs'] },
  ],
  native: {
    head: 'Stripe’s own AI tools, and what 50agents adds',
    body:
      'Stripe’s own pages on AI agents are written for developers: an MCP server, plugins and tools for selling through AI agents. 50agents is for the person who owns the Stripe account: you describe the job, and Captain builds it on Stripe’s events and actions without code.',
    better: 'If you have developers building your own AI product on Stripe, Stripe’s MCP server and AI agent toolkit are the direct route.',
    sources: [{ label: 'Stripe docs: Agents', href: 'https://docs.stripe.com/agents' }],
  },
  useCases: [
    { slug: 'stripe-payments-to-google-sheets', kind: 'auto', title: 'Stripe payments to Google Sheets', line: 'Each payment as a row with customer, amount and date.' },
    { slug: 'weekly-stripe-revenue-summary', kind: 'ai', title: 'Weekly Stripe revenue summary', line: 'Totals and what changed, emailed every Monday.' },
    { slug: 'chase-unpaid-invoices', kind: 'app', title: 'Chase unpaid invoices', line: 'An invoices desk with reminders you approve.' },
  ],
  guides: [
    { slug: 'how-to-log-stripe-payments-in-google-sheets', title: 'How to log Stripe payments in Google Sheets' },
    { slug: 'how-to-automate-weekly-reports-by-email', title: 'How to automate weekly reports by email' },
    { slug: 'how-to-automate-invoice-reminders', title: 'How to automate invoice reminders' },
  ],
  faqs: [
    {
      q: 'Can it tell me when a payment fails?',
      a: 'Yes. Payment Fails starts an automation when Stripe reports it, so it can post in Slack or add the customer to a follow-up list. Emailing the customer about it waits for your approval.',
    },
    {
      q: 'Will it refund or charge customers on its own?',
      a: 'No. Anything that spends or moves money asks you first in Needs you. An action like Collect Payment runs only after your yes.',
    },
    {
      q: 'Can it log refunds as well as payments?',
      a: 'Yes. Charge Refunded and New Refund Created are separate triggers, so refunds can go to their own rows or their own tab in the same sheet.',
    },
  ],
  updated: '2026-11-19',
};
export default page;
