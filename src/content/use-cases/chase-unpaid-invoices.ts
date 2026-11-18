// Use case 1 (pages-brief B1): chase unpaid invoices automatically.
// Every product fact here comes from the 50agents app's invoices recipe (app/src/features/apps/recipes.ts, read 19 Nov 2026):
// Captain's questions, the list's fields, the three views, the Overview numbers and the Collector's duty.
// Market facts and competitor notes: gtm/seo/research/usecase-chase-unpaid-invoices-serp.md (read 19 Nov 2026).
import type { UseCase } from '@/site/types';

const page: UseCase = {
  slug: 'chase-unpaid-invoices',
  kind: 'app',
  title: 'Chase unpaid invoices automatically | 50agents',
  description:
    'Tell Captain "Chase my unpaid invoices" to get an invoices desk: late invoices first, a polite reminder drafted for each, sent from Gmail when you OK it.',
  h1: 'Chase unpaid invoices automatically',
  answer: [
    'To chase unpaid invoices automatically, tell Captain "Chase my unpaid invoices" in 50agents.',
    'It builds you an invoices desk that lists what is late, oldest first, with an AI agent that drafts a polite reminder for each one and sends it from your Gmail only after you approve it.',
  ],
  ask: 'Chase my unpaid invoices',
  updated: '2026-11-19',
  published: '2026-11-19',
  facts: [
    {
      figure: '59%',
      text: 'of US small businesses have invoices more than 30 days overdue, up from 47% a year earlier (a survey of 1,305 owners, December 2025).',
      source: 'QuickBooks Small Business Late Payments Report 2026',
      href: 'https://quickbooks.intuit.com/r/small-business-data/small-business-late-payments-report-2026/',
      read: '19 Nov 2026',
    },
    {
      figure: '8.6 days',
      text: 'is how late US small businesses using Xero were paid on average in the September 2026 quarter.',
      source: 'Xero Small Business Insights, 29 Oct 2026',
      href: 'https://www.xero.com/us/resources/small-business-insights/latest-united-states',
      read: '19 Nov 2026',
    },
  ],
  // The build, as the app runs it: Captain's questions are the recipe's slots, in order.
  questions: [
    { q: 'Which apps do you use for this today?', choices: ['Gmail', 'Google Sheets', 'None yet'], picked: 'Gmail' },
    { q: 'Where are your invoices now?', choices: ['In my email', 'A spreadsheet', 'My accounting app', "I'll add them"], picked: 'A spreadsheet' },
    { q: 'Which currency?', choices: ['USD', 'INR', 'EUR', 'GBP'], picked: 'USD' },
    { q: 'Should reminders go out from your email?', choices: ['Yes, after I approve each one', 'No, just tell me'], picked: 'Yes, after I approve each one' },
  ],
  steps: [
    {
      title: 'You ask, Captain asks back',
      body: 'Say "Chase my unpaid invoices". Captain asks four things: the apps you use today, where your invoices are now, the currency, and whether reminders should go out from your email. Each has a usual answer you can take with one tap.',
    },
    {
      title: 'It builds your invoices desk',
      body: 'One list of invoices with the invoice number, client, email, amount, sent date, due date, status and notes. Three views on it: To collect (a board by status, with totals), Late (overdue, oldest due date first) and All invoices.',
    },
    {
      title: 'You bring your invoices in',
      body: 'Add invoices one at a time, paste a table, or drop in a CSV or Excel file, and mark the ones you have sent as Sent. The desk then shows what you are still owed, what is late and what was paid this month.',
    },
    {
      title: 'Collector drafts the reminders',
      body: 'Collector, the desk\'s AI agent, watches for invoices marked Sent that are a day past their due date. For each one it writes a short, polite reminder to the client: the invoice, the amount, the due date and how to pay, if you have told it how.',
    },
    {
      title: 'You approve, and it goes from your Gmail',
      body: 'Each reminder waits in Needs you, the one place for everything that needs your yes. Approve and send, change it, or decline it. Collector marks the invoice Reminded and notes on it what it wrote.',
    },
  ],
  uses: [
    {
      app: 'gmail',
      name: 'Gmail',
      why: 'Sends each reminder you approve, from your own address, so replies come back to you.',
      chips: ['Send Email'],
    },
    {
      app: 'file',
      name: 'Your spreadsheet or accounting export',
      why: 'Where your invoices come from: typed in, a pasted table, or a CSV or Excel file. The desk keeps its own copy, so nothing in your books changes.',
      chips: ['Add by hand', 'Paste a table', 'CSV or Excel'],
    },
  ],
  asksFirst:
    'Every email. A reminder reaches someone outside your business, so the app will not build a step that sends one without asking first. You see the client, the subject and the full text before it goes, and you can change any of it.',
  cadence: {
    intro:
      'Out of the box, Collector drafts one reminder the day after an invoice is due. Most guides chase again every week or two, firmer each time. Here is a schedule to start from; Collector can take up to three more stages, one sentence each.',
    rows: [
      { when: '1 day after due', tone: 'Polite: the invoice, the amount, how to pay', ask: '' },
      { when: '7 days late', tone: 'A nudge, asking when to expect payment', ask: 'Send a second reminder to invoices still Reminded 7 days after the due date' },
      { when: '14 days late', tone: 'Clear, with an offer to split the payment', ask: 'At 14 days late, send a firmer reminder that offers to split the payment' },
      { when: '30 days late', tone: 'Firm: a final notice', ask: 'At 30 days late, send a final notice' },
    ],
    note: 'Our starting point. Chaser suggests chasing every 10 to 14 days after the due date; n8n\'s collection template chases at 7, 14, 21 and 28 days late; GoCardless keeps the first reminders light and face-saving.',
    sources: [
      { label: 'Chaser', href: 'https://chaserhq.com/blog/how-often-should-you-chase-invoice-payments' },
      { label: 'n8n', href: 'https://n8n.io/workflows/5391-smart-invoice-collection-system-with-gpt-41-gmail-and-google-sheets/' },
      { label: 'GoCardless', href: 'https://gocardless.com/en-us/guides/posts/how-to-chase-an-overdue-invoice' },
    ],
  },
  variations: [
    'Chase my unpaid invoices, only those over $500',
    'Chase my unpaid invoices in INR',
    'Chase my unpaid invoices, and send a firmer second reminder 14 days after the due date',
    'Chase my unpaid invoices, but just tell me which are late instead of emailing clients',
  ],
  limits: [
    'Reminders go by email from Gmail only, not WhatsApp or SMS.',
    'It does not sync with QuickBooks or Xero. Bring invoices in, and mark them Paid in the desk as money arrives.',
    'A file import keeps one invoice per client email today, so add a second invoice to the same client by hand. We are fixing this.',
    'Reminders do not attach the invoice PDF. Replies land in your Gmail as usual.',
  ],
  otherWays: [
    {
      title: 'By hand',
      body: 'Sort your invoices by due date, check which are paid, then write each reminder yourself. It works for a handful of clients and stops working when you are busy, which is when invoices slip.',
    },
    {
      title: 'Your accounting app\'s own reminders',
      body: 'If every invoice is raised in your accounting app, check its reminder settings first: it already knows what is paid, so there is nothing to keep in step.',
    },
    {
      title: 'Zapier, Make or n8n',
      body: 'Each has invoice reminder templates where you pick the apps and set up each step yourself. n8n\'s AI collection template, for example, needs an n8n account, Gmail and Google Sheets connected, and an OpenAI key.',
      sources: [
        { label: 'Zapier', href: 'https://zapier.com/automation/use-case/send-reminders-and-notifications-for-unpaid-invoices' },
        { label: 'Make', href: 'https://www.make.com/workflows/recover-overdue-invoices-with-escalating-reminders' },
        { label: 'n8n', href: 'https://n8n.io/workflows/5391-smart-invoice-collection-system-with-gpt-41-gmail-and-google-sheets/' },
      ],
    },
  ],
  faqs: [
    {
      q: 'Will it email my clients without asking me?',
      a: 'No. Every reminder waits in Needs you until you approve it, change it or decline it. The app will not build a step that emails someone outside your business without asking first.',
    },
    {
      q: 'How long should I wait before chasing an unpaid invoice?',
      a: 'Send the first reminder within a day or two of the due date, while it is still an easy fix for the client. Then chase every week or two, firmer each time; Chaser suggests every 10 to 14 days.',
    },
    {
      q: 'What if the client has already paid, or disputes the invoice?',
      a: 'Collector only chases invoices marked Sent. Mark one Paid and decline any reminder already waiting for it, and it is never chased again. For disputes, ask Captain to add a Disputed status; anything not marked Sent is left alone.',
    },
    {
      q: 'Does it work with QuickBooks or Xero?',
      a: 'Not directly: it does not sync with them. Export your open invoices as a CSV and drop the file into the desk, and Captain matches the columns. Mark invoices Paid in the desk as money comes in.',
    },
    {
      q: 'What should a payment reminder email say?',
      a: 'The invoice number, the amount, the due date and how to pay, in a few friendly lines, and a question about when to expect payment. Collector writes exactly that, and adds how to pay once you have told it, for example your payment link.',
    },
  ],
  related: [
    { href: '/use-cases/lead-tracker-from-your-inbox', kind: 'app', title: 'Lead tracker from your inbox', line: 'A pipeline built from the emails that bring you work.' },
    { href: '/use-cases/customer-requests-desk', kind: 'app', title: 'Customer requests desk', line: 'Every request in one place, with replies drafted.' },
    { href: '/use-cases/weekly-stripe-revenue-summary', kind: 'ai', title: 'Weekly Stripe revenue summary', line: 'Last week\'s money in your inbox every Monday.' },
  ],
  up: [
    { href: '/apps', label: 'Apps you can build' },
    { href: '/integrations/gmail', label: 'Gmail' },
    { href: '/guides/how-to-automate-invoice-reminders', label: 'How to automate invoice reminders' },
  ],
};

export default page;
