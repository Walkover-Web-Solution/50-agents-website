// Guide 7 (pages-brief B5). The method, for any tool. The ready-to-build version is /use-cases/chase-unpaid-invoices:
// this page links to it and repeats none of its text (its cadence table, its steps and its FAQs stay there).
// Research: QuickBooks, Stripe, Activepieces and Zoho results for "how to automate invoice reminders", read 19 Nov 2026.
import type { Guide } from './types';
import { APPS } from './apps';

const g: Guide = {
  slug: 'how-to-automate-invoice-reminders',
  n: 7,
  group: 'Automations',
  kind: 'app',
  title: 'How to automate invoice reminders (any tool) | 50agents',
  description:
    'Automate invoice reminders in four parts: one list of open invoices, a rule for who is due a nudge, a message per stage, and a stop the moment money lands.',
  h1: 'How to automate invoice reminders',
  short:
    'Keep one list of open invoices with a due date and a status, and let a tool email only the ones marked sent, unpaid and past due, on a fixed schedule. Switch on your accounting app’s own reminders first if every invoice lives there; reach for an automation or an AI agent when invoices are spread across tools or you want to read each email before it goes.',
  published: '2026-11-19',
  updated: '2026-11-19',
  sections: [
    {
      id: 'parts',
      h2: 'The four parts every reminder setup needs',
      body: [
        { p: 'Every tool that sends invoice reminders, from QuickBooks to a spreadsheet script, runs on the same four parts. Get them right on paper and the tool choice becomes easy.' },
        {
          table: {
            head: ['Part', 'What it is', 'The usual mistake'],
            rows: [
              ['The list', 'Each open invoice with number, client email, amount, due date and a status (Sent, Paid, Disputed).', 'Keeping paid status somewhere the reminder tool cannot see.'],
              ['The rule', 'Who is due a reminder today: status is Sent, not paid, due date before today, not on hold.', 'Chasing drafts, disputed invoices or clients on a payment plan.'],
              ['The message', 'One short email per stage, with the invoice number, amount, due date and how to pay.', 'One generic template for day 1 and day 45.'],
              ['The stop', 'Whatever ends the chase: marked Paid, a reply promising payment, a dispute.', 'Nothing stops it, so a client who paid at 9:00 gets a reminder at 9:05.'],
            ],
          },
        },
        { p: 'The stop matters most. A reminder to someone who has already paid costs you more goodwill than a late reminder ever would.' },
      ],
    },
    {
      id: 'choose',
      h2: 'Pick the tool by where your invoices live',
      body: [
        { p: 'The right tool is the one that already knows when an invoice is paid. Use this to decide:' },
        {
          table: {
            head: ['Your invoices live in', 'Start with', 'Why'],
            rows: [
              ['One accounting app (QuickBooks, Zoho Books, Xero)', 'Its built-in reminders', 'It sees payments the moment they are recorded, so the stop is free.'],
              ['Stripe Invoicing', 'Stripe’s reminder emails', 'Stripe marks the invoice paid itself when the card or transfer clears.'],
              ['A spreadsheet, or several places', 'An automation tool or an AI agent', 'Something has to read your list each day; you keep the Paid column true.'],
              ['Anywhere, and you want to read each email first', 'A tool with approvals', 'Built-in reminders send on their own; approvals put you in the loop.'],
            ],
          },
        },
        {
          p: 'Two built-in options, as their own help pages describe them today. QuickBooks Online sends up to three automatic reminders, each set up to 90 days before or after the due date, and only for unpaid invoices you have already emailed from QuickBooks: Settings, Account and settings, Sales, Reminders ([QuickBooks help](https://quickbooks.intuit.com/learn-support/en-us/help-article/invoicing/send-invoice-reminders-automatically-manually/L84cQjpxo_US_en_US)). Stripe sends reminders for unpaid invoices before, on or after the due date from its billing email settings, and keeps email logs for 60 days ([Stripe docs](https://docs.stripe.com/invoicing/send-email)).',
        },
        { note: 'If you use a built-in option, do not also run a second reminder tool on the same invoices. Two systems chasing one client is the most common way this goes wrong.' },
      ],
    },
    {
      id: 'steps',
      h2: 'How to set it up, step by step',
      body: [
        {
          steps: [
            { title: 'Make one list of open invoices', body: 'Export open invoices from wherever you raise them (most accounting apps export CSV). Keep these columns: invoice number, client name, client email, amount, currency, sent date, due date, status. One row per invoice, never one row per client.' },
            { title: 'Write the rule in one sentence', body: 'For example: "status is Sent, due date is before today, and no reminder went in the last 6 days". Add exceptions as statuses (Disputed, On a plan) rather than as notes, so the tool can read them.' },
            { title: 'Decide the stages and the gap between them', body: 'A first nudge a day or two after the due date, then one every week or two, firmer each time, then a final notice. Write the stage on the invoice when a reminder goes, so the next run knows where it is.' },
            { title: 'Write one email per stage', body: 'Subject with the invoice number and amount. Two or three lines: what is due, since when, how to pay (a payment link if you have one), and a question that asks for a date. No attachments you cannot keep up to date.' },
            { title: 'Send from your own address and test on yourself', body: 'Replies should come back to the inbox you read. Run the setup once with your own email as the client and check every field fills in, including the currency.' },
            { title: 'Close the loop every day', body: 'Mark invoices Paid as money arrives, or connect the tool to where payments land. Then look at what went out this week; a quick read catches a wrong amount before a client does.' },
          ],
        },
      ],
    },
    {
      id: 'example',
      h2: 'A worked example: an invoices desk in 50agents',
      body: [
        { p: 'Here is the same method built in 50agents. You tell Captain, the AI that builds things, one sentence. It asks where your invoices are and in which currency, then builds an app: the list, a Late view sorted by due date, and Collector, an AI agent that drafts a reminder for each Sent invoice a day after it falls due. The rule and the stage live in the app; the stop is the Paid status.' },
        { ask: 'Chase my unpaid invoices' },
        {
          view: {
            type: 'need',
            face: 'closer',
            who: 'Collector',
            from: 'Invoices desk',
            when: '4 min ago',
            label: 'Send an email',
            app: APPS.gmail,
            title: 'Email Brightline Physio',
            mail: {
              to: 'billing@brightline.example',
              subject: 'Invoice INV-1049 for $1,250, due 17 Nov',
              body: ['Hi Priya,', 'Invoice INV-1049 for $1,250 was due on 17 November and still shows as open on our side. You can pay it here: pay.example.com/inv-1049. Could you tell me when to expect it?', 'Thanks,', 'Sam'],
            },
            choices: ['Approve and send', 'Change', 'Decline'],
          },
          caption: 'A reminder waiting in Needs you, the one place in 50agents for everything that needs your yes. Nothing reaches a client until you tap Approve and send. Example data.',
        },
        { p: 'The approval is the part most reminder tools skip. It costs you a tap per email, and it is what lets you hold a reminder for the client who called yesterday to say the payment is on its way.' },
      ],
    },
  ],
  pair: { href: '/use-cases/chase-unpaid-invoices', label: 'Build it: chase unpaid invoices automatically', line: 'The ready-made version: the desk, the reminder schedule to start from, and what it does not do yet.' },
  wrong: [
    { title: 'A client gets chased after paying', body: 'The payment landed after the tool read the list. Run reminders once a day at a fixed time, after you have marked the morning’s payments, and keep the gap between the read and the send short.' },
    { title: 'Two tools chase the same invoice', body: 'Your accounting app’s reminders are on and so is your new automation. Pick one per invoice and switch the other off.' },
    { title: 'Invoices that were never emailed get no reminder', body: 'QuickBooks only reminds on invoices sent from QuickBooks. If you send invoices as PDFs from your own mail, its reminders will skip them; use a list-based tool instead.' },
    { title: 'Partial payments read as unpaid', body: 'A client pays half and still gets a full reminder. Add a Part paid status and an amount still due, and say the remaining amount in the email.' },
    { title: 'The wrong currency or amount', body: 'Imports turn 1.250,00 into 1.25 or lose the currency. Check a few rows after every import, and test one email on yourself before the first real run.' },
    { title: 'Disputes keep getting chased', body: 'A client who has raised a problem gets a firmer email a week later. Give disputes their own status and leave them out of the rule.' },
  ],
  faqs: [
    { q: 'Is it rude to send automatic payment reminders?', a: 'Not when they read like a person wrote them: short, specific, and polite on the first one. Clients forget invoices far more often than they refuse them, and a clear reminder with a payment link is a help.' },
    { q: 'Should the reminder include the invoice PDF?', a: 'A link to pay or to view the invoice is better than a file, because a link always shows the current amount. If your tool cannot attach the current PDF, leave it out and quote the number and amount in the subject.' },
    { q: 'Can I automate reminders without an accounting app?', a: 'Yes. A spreadsheet with a Status column is enough for an automation tool or an AI agent to read each day. The cost is that you keep Paid up to date by hand.' },
  ],
  sources: [
    { label: 'QuickBooks: Send invoice reminders automatically or manually', href: 'https://quickbooks.intuit.com/learn-support/en-us/help-article/invoicing/send-invoice-reminders-automatically-manually/L84cQjpxo_US_en_US' },
    { label: 'Stripe docs: Invoicing emails and reminders', href: 'https://docs.stripe.com/invoicing/send-email' },
  ],
  related: ['how-to-build-an-invoice-tracker', 'how-to-make-an-ai-agent-ask-before-it-acts', 'what-to-automate-first-in-a-small-business'],
};

export default g;
