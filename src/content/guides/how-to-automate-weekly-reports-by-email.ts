// Guide 12 (pages-brief B5). Research: Looker Studio scheduled delivery docs, Zapier Schedule help, Apps Script quotas,
// Zapier template, Baserow and DEV results for "automate weekly report email", read 19 Nov 2026.
import type { Guide } from './types';
import { APPS } from './apps';

const g: Guide = {
  slug: 'how-to-automate-weekly-reports-by-email',
  n: 12,
  group: 'Automations',
  kind: 'ai',
  title: 'How to automate weekly reports by email | 50agents',
  description:
    'Automate a weekly report email: fix the window to last Monday to Sunday in your timezone, compare with the week before, and make empty or failed weeks say so.',
  h1: 'How to automate weekly reports by email',
  short:
    'Pick three to five numbers, fix the window (last Monday 00:00 to Sunday 23:59 in your timezone), and schedule a tool to read the source every Monday morning, compare with the week before, and email the result. A report that says "0" because the data was late, or never arrives because a step failed, is worse than none, so make it say when something is missing.',
  published: '2026-11-19',
  updated: '2026-11-19',
  sections: [
    {
      id: 'decide',
      h2: 'Decide four things before you build',
      body: [
        {
          table: {
            head: ['Decide', 'Good answer', 'Why it matters'],
            rows: [
              ['The numbers', '3 to 5, each one you would act on', 'A report with 20 numbers gets skimmed, then ignored.'],
              ['The window', 'Monday 00:00 to Sunday 23:59, your timezone', '"Last 7 days" run at 9:00 on Monday includes Monday morning and cuts last Monday morning.'],
              ['The comparison', 'The week before, and the same week last year if seasonal', 'A number alone tells you nothing; a change does.'],
              ['The words', 'One line on what changed and why, if known', 'This is what an AI step adds over a dashboard.'],
            ],
          },
        },
      ],
    },
    {
      id: 'options',
      h2: 'Ways to send it',
      body: [
        {
          table: {
            head: ['Tool', 'Good for', 'Know this'],
            rows: [
              ['Looker Studio scheduled delivery', 'A dashboard you already have', 'Sends a PDF and a link; free schedules run at most daily; up to 50 recipients a schedule; reports with errors are not sent ([Google](https://docs.cloud.google.com/looker/docs/studio/schedule-automatic-report-delivery)).'],
              ['Google Apps Script', 'Numbers already in a Google Sheet', 'Code; 6 minutes per run and daily email quotas ([Google](https://developers.google.com/apps-script/guides/services/quotas)).'],
              ['An automation tool on a schedule', 'Numbers in apps like Stripe, HubSpot, Shopify', 'Check which timezone the schedule uses: Zapier’s follows the account timezone, and its history shows UTC ([Zapier](https://help.zapier.com/hc/en-us/articles/8496288648461)).'],
              ['An AI agent on a schedule', 'Reports that should explain the change in words', 'Costs more per run than fixed steps; worth it when the "why" matters.'],
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
            { title: 'Write the report by hand once', body: 'Open the source, pull last week’s numbers, write the email you would want. That email is your spec.' },
            { title: 'Fix the window in words', body: '"Payments from last Monday 00:00 to Sunday 23:59, Europe/London". Put the timezone in the report itself.' },
            { title: 'Schedule it after the data settles', body: 'If payouts or ad spend arrive overnight, send at 9:00, not 0:05.' },
            { title: 'Make empty and failed weeks visible', body: 'If a source returns nothing, the email should say "no payments found between X and Y", not "$0". If a step fails, you should hear about it the same morning.' },
            { title: 'Send to yourself for two weeks', body: 'Check it against the source by hand. Then add the team.' },
          ],
        },
      ],
    },
    {
      id: 'example',
      h2: 'A worked example in 50agents',
      body: [
        { p: 'In 50agents this is an AI agent: it reads, compares and writes the summary in words each Monday. Captain plans it from one sentence; you see the plan, including when it runs and what asks you first, before it is built.' },
        { ask: 'Set up an AI agent that reads last week\'s payments in Stripe every Monday at 9:00 and emails me the totals and what changed' },
        {
          view: {
            type: 'plan',
            ask: 'Set up an AI agent that reads last week\'s payments in Stripe every Monday at 9:00 and emails me the totals and what changed',
            face: 'ledger',
            name: 'Weekly revenue summary',
            job: 'Every Monday, emails you last week’s Stripe totals and what changed',
            steps: ['Read last week’s successful payments and refunds in Stripe', 'Total them and compare with the week before', 'Write a short summary of what changed', 'Email it to you'],
            when: 'Every Monday at 9:00',
            uses: [APPS.stripe, APPS.gmail],
            asksFirst: 'Sending any email',
          },
          caption: 'Captain’s plan for a weekly report, in 50agents. The email waits for your yes until you give the AI agent more freedom. Example data.',
        },
        { p: 'The same pattern works for any source Captain can reach through 2,300+ apps: HubSpot deals won, Shopify orders, support tickets closed. Say the numbers you want in the sentence.' },
      ],
    },
  ],
  wrong: [
    { title: 'The report says $0', body: 'The data was late or the search found nothing. Make the report say what it searched and that it found nothing, not a zero.' },
    { title: 'The window is off by a day', body: '"Last 7 days" counted from the send time. Use calendar weeks in your timezone.' },
    { title: 'It moved an hour in March', body: 'Daylight saving shifted a schedule set in UTC. Set the schedule in your own timezone.' },
    { title: 'It failed and nobody noticed', body: 'A connection expired and the report simply stopped. Pick a tool that tells you about failed runs, and notice the Monday it does not arrive.' },
    { title: 'The person who built it left', body: 'The schedule ran from their account. Build reports on a shared account or document who owns them.' },
  ],
  faqs: [
    { q: 'Can Google Sheets email a report on a schedule?', a: 'Not by itself. Apps Script can, with a time trigger and a little code, or an automation tool can read the sheet and send the email.' },
    { q: 'Can Looker Studio email a report weekly?', a: 'Yes. Scheduled delivery sends a PDF and a link to up to 50 recipients; free schedules can run at most daily.' },
    { q: 'What timezone does a scheduled report use?', a: 'It depends on the tool: Looker Studio uses your computer’s timezone, Zapier uses the account’s. Always check, and print the window in the report.' },
  ],
  sources: [
    { label: 'Google: Looker Studio scheduled report delivery', href: 'https://docs.cloud.google.com/looker/docs/studio/schedule-automatic-report-delivery' },
    { label: 'Google: Apps Script quotas', href: 'https://developers.google.com/apps-script/guides/services/quotas' },
    { label: 'Zapier help: Schedule by Zapier', href: 'https://help.zapier.com/hc/en-us/articles/8496288648461' },
  ],
  related: ['how-to-log-stripe-payments-in-google-sheets', 'how-to-get-a-daily-calendar-summary-in-slack', 'ai-agents-for-small-business-10-jobs-that-work-today'],
};

export default g;
