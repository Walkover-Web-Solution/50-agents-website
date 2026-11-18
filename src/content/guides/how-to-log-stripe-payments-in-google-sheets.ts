// Guide 9 (pages-brief B5). The method, for any tool. The ready-to-build version is /use-cases/stripe-payments-to-google-sheets.
// Research: Stripe docs (currencies, payment intents, balance transactions, refunds, webhooks), Google Sheets API limits,
// Zapier, Mixed Analytics and Relay results, read 19 Nov 2026. Stripe's triggers in viaSocket's catalog read the same day.
import type { Guide } from './types';
import { APPS } from './apps';

const g: Guide = {
  slug: 'how-to-log-stripe-payments-in-google-sheets',
  n: 9,
  group: 'Automations',
  kind: 'auto',
  title: 'How to log Stripe payments in Google Sheets | 50agents',
  description:
    'Log Stripe payments in Google Sheets on each successful payment: one row per payment ID, amounts divided by 100, refunds as their own rows, fees looked up.',
  h1: 'How to log Stripe payments in Google Sheets',
  short:
    'Trigger on each successful payment in Stripe and add one row per payment to your sheet with its ID, date, customer, amount and currency, dividing the amount by 100 because Stripe sends cents. Log refunds as their own rows from a refund trigger, and skip any payment ID already in the sheet so a retried event never makes a duplicate.',
  published: '2026-11-19',
  updated: '2026-11-19',
  sections: [
    {
      id: 'four-facts',
      h2: 'Four Stripe facts that decide your columns',
      body: [
        { p: 'Most Stripe-to-Sheets templates stop at "new payment, add row". These four details are where the sheet goes wrong.' },
        {
          table: {
            head: ['Fact', 'What it means for the sheet'],
            rows: [
              ['Amounts are in the smallest currency unit', '1000 means $10.00. Divide by 100 for USD, EUR and most currencies; zero-decimal currencies such as JPY are already whole ([Stripe](https://docs.stripe.com/currencies)).'],
              ['A refund does not change the payment', 'The PaymentIntent stays succeeded; the refund is a separate event ([Stripe](https://docs.stripe.com/payments/payment-intents/verifying-status), [refunds](https://docs.stripe.com/refunds)). Log it as its own row with a negative amount.'],
              ['Fees are not on the payment', 'Fee and net live on the balance transaction ([Stripe](https://docs.stripe.com/api/balance_transactions/object)). If you want net revenue, look them up or reconcile from payouts monthly.'],
              ['Events can arrive twice and out of order', 'Stripe retries failed deliveries for up to 3 days and does not promise order ([Stripe](https://docs.stripe.com/webhooks)). Keep the payment ID in a column and skip IDs you already have.'],
            ],
          },
        },
      ],
    },
    {
      id: 'columns',
      h2: 'The columns to keep',
      body: [
        { p: 'One row per payment, these columns, in this order. Keep the ID first so a lookup is quick.' },
        {
          table: {
            head: ['Column', 'From Stripe', 'Note'],
            rows: [
              ['Payment ID', 'The payment intent or charge ID', 'Your duplicate check.'],
              ['Date', 'Created time', 'Stripe sends UTC; convert to your timezone or say UTC in the header.'],
              ['Customer', 'Customer name or email', 'Guest checkouts may have only an email.'],
              ['Amount', 'Amount divided by 100', 'Format the column as currency.'],
              ['Currency', 'Currency code', 'Never sum USD and EUR in one total.'],
              ['Description', 'Description or product', 'Often empty; fall back to the invoice number.'],
              ['Type', 'Payment or Refund', 'Lets one SUMIF give you net of refunds.'],
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
            { title: 'Make the sheet first', body: 'Create the tab with the header row above, and freeze it. Tools map fields to the headers they find, so name them before you connect anything.' },
            { title: 'Trigger on successful payments only', body: 'Use the "payment succeeded" event, not "payment intent created", which fires before the money moves. In viaSocket’s catalog the Stripe trigger is "When a payment succeeds".' },
            { title: 'Check the ID before adding', body: 'Look the payment ID up in the sheet. If it is there, stop. This one step removes every duplicate from retries.' },
            { title: 'Convert, then add the row', body: 'Divide the amount by 100 (unless the currency has no decimals), convert the time, and add the row.' },
            { title: 'Add a second automation for refunds', body: 'Trigger on refunds and add a row with Type Refund and a negative amount, so totals stay true without editing old rows.' },
            { title: 'Backfill the past once', body: 'Export payments from the Stripe Dashboard as CSV for the months before you started, paste them in under the same headers, and let the automation carry on from today.' },
          ],
        },
      ],
    },
    {
      id: 'example',
      h2: 'A worked example in 50agents',
      body: [
        { p: 'In 50agents, Captain turns one sentence into an automation. Before you build it, it reads one real payment from your Stripe account to work out the fields, and tests the steps on it. Writing a row to your own sheet runs on its own; nothing here reaches anyone outside your business, so nothing waits for approval.' },
        { ask: 'Set up an automation: every new Stripe payment is added as a row to my Google Sheet with the customer, amount and date' },
        {
          view: {
            type: 'track',
            name: 'Log every payment',
            status: 'Live · runs on each successful Stripe payment',
            sample: { title: 'pi_3Q8k... · $480.00 · Harbor Yoga', sub: 'The payment it planned and tested with' },
            stations: [
              { mark: 'app', app: APPS.stripe, say: 'When a payment succeeds in Stripe', passes: ['id', 'amount', 'currency', 'customer', 'created'] },
              { mark: 'app', app: APPS.sheets, say: 'Look up the payment ID in "Payments"', passes: ['found or not'], did: 'Ran', values: [['Found', 'no']] },
              { mark: 'set', say: 'Amount in dollars, date in your timezone', passes: ['amount', 'date'], did: 'Ran', values: [['Amount', '480.00'], ['Date', '19 Nov 2026 10:12']] },
              { mark: 'app', app: APPS.sheets, say: 'Add a row to "Payments"', did: 'Ran' },
            ],
            tested: 'Tested on your real data. Ran for real: 3 steps.',
          },
          caption: 'The automation in 50agents, with the real payment it was tested on: a lookup that stops duplicates, a calculation step for cents and timezone, then the row. Example data.',
        },
        {
          view: {
            type: 'sheet',
            file: 'Payments',
            tab: 'Payments',
            head: ['Payment ID', 'Date', 'Customer', 'Amount', 'Currency', 'Type'],
            rows: [
              ['pi_3Q8a...', '18 Nov 2026 16:40', 'Lumen Dental', '980.00', 'USD', 'Payment'],
              ['re_3Q8c...', '18 Nov 2026 17:02', 'Pinecone Coffee', '-40.00', 'USD', 'Refund'],
              ['pi_3Q8k...', '19 Nov 2026 10:12', 'Harbor Yoga', '480.00', 'USD', 'Payment'],
            ],
            fresh: 1,
          },
          caption: 'The sheet it writes to, with a refund logged as its own row. The newest row is shaded. Example data.',
        },
      ],
    },
  ],
  pair: { href: '/use-cases/stripe-payments-to-google-sheets', label: 'Build it: Stripe payments to Google Sheets', line: 'The ready-made version: the exact ask, what it reads from Stripe and how to change it.' },
  wrong: [
    { title: 'Amounts 100 times too big', body: 'The amount went in as Stripe sent it, in cents. Divide by 100, and check one row against the Dashboard.' },
    { title: 'The same payment twice', body: 'A retried event added a second row. Look the ID up before adding, every time.' },
    { title: 'Refunds missing from the totals', body: 'Only payments were logged. Add the refund automation, and total with a SUMIF on Type, or sum the signed amounts.' },
    { title: 'Test payments mixed with real ones', body: 'Your automation was connected to test mode while you set it up. Delete those rows, and check the connection is the live account.' },
    { title: 'The sheet stops accepting rows', body: 'Google’s API allows 300 writes a minute per project and 60 per user ([Google](https://developers.google.com/sheets/api/limits)); a busy sale can hit that. Spread a backfill out, and keep one tab per year so the sheet stays small.' },
  ],
  faqs: [
    { q: 'Why is my Stripe amount 100 times too large in Google Sheets?', a: 'Stripe sends amounts in the smallest currency unit, so $25.00 arrives as 2500. Divide by 100, except for zero-decimal currencies such as JPY.' },
    { q: 'How do I include Stripe fees?', a: 'Fees are on the balance transaction, not the payment. Either add a step that fetches it, or reconcile fees monthly from your payout report, which is simpler and matches your bank.' },
    { q: 'Can I log old payments too?', a: 'Yes, once: export them from the Stripe Dashboard as CSV and paste them under the same headers. The automation only sees payments from the moment it goes live.' },
  ],
  sources: [
    { label: 'Stripe docs: Supported currencies (minor units)', href: 'https://docs.stripe.com/currencies' },
    { label: 'Stripe docs: Verifying payment status', href: 'https://docs.stripe.com/payments/payment-intents/verifying-status' },
    { label: 'Stripe docs: The balance transaction object', href: 'https://docs.stripe.com/api/balance_transactions/object' },
    { label: 'Stripe docs: Refunds', href: 'https://docs.stripe.com/refunds' },
    { label: 'Stripe docs: Webhooks (retries, duplicates)', href: 'https://docs.stripe.com/webhooks' },
    { label: 'Google: Sheets API usage limits', href: 'https://developers.google.com/sheets/api/limits' },
  ],
  related: ['how-to-send-shopify-orders-to-google-sheets', 'webhooks-explained-for-non-developers', 'how-to-automate-weekly-reports-by-email'],
};

export default g;
