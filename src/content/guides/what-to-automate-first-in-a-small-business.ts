// Guide 29 (pages-brief B5). Research: vcita, Capsule, Keap and Titan results for "what to automate first small business",
// read 19 Nov 2026. 50agents: the "website" template ("Read my website and tell me what you would take off my plate").
import type { Guide } from './types';
import { APPS } from './apps';

const g: Guide = {
  slug: 'what-to-automate-first-in-a-small-business',
  n: 29,
  group: 'Choosing tools',
  kind: 'auto',
  title: 'What to automate first in a small business | 50agents',
  description:
    'What to automate first: score each repeated task by how often, how long and what a mistake costs, then start with the frequent, low-risk ones.',
  h1: 'What to automate first in a small business',
  short:
    'Automate first the tasks you do every day or week that follow the same steps and are cheap to get wrong, such as logging payments, sorting email or sending yourself a summary. Leave tasks that move money, commit you to something or decide about a person until last, and automate those with an approval step.',
  published: '2026-11-19',
  updated: '2026-11-19',
  sections: [
    {
      id: 'score',
      h2: 'Score your tasks',
      body: [
        { p: 'Write down every task you repeated last week. For each, fill in three numbers and multiply the first two.' },
        {
          table: {
            head: ['Task', 'Times a month', 'Minutes each', 'Minutes saved', 'Cost of a mistake'],
            rows: [
              ['Copy each order into the sheet', '120', '2', '240', 'Low'],
              ['Sort and answer support email', '200', '3', '600', 'Medium'],
              ['Chase late invoices', '15', '10', '150', 'Medium'],
              ['Weekly sales summary', '4', '30', '120', 'Low'],
              ['Approve refunds', '10', '5', '50', 'High'],
            ],
            caption: 'Example numbers. Start from the top of "minutes saved" among the Low and Medium rows.',
          },
        },
        { p: 'High-risk tasks still benefit, just later and with a person approving each action. Most guides list jobs to automate; vcita\u2019s list of first wins, for example, is scheduling and reminders, invoicing and payment follow-ups, client messages and simple marketing ([vcita](https://www.vcita.com/blog/time-management/what-small-businesses-need-to-automate-first)). Few say which to leave alone. A rule we use: anything that touches money, contracts or a relationship gets a human yes.' },
      ],
    },
    {
      id: 'first-five',
      h2: 'Five good first automations',
      body: [
        {
          table: {
            head: ['Automation', 'Kind', 'Why it is a good first one'],
            rows: [
              ['[Log each payment or order in a sheet](/guides/how-to-log-stripe-payments-in-google-sheets)', 'Automation', 'Fixed steps, no judgement, easy to check'],
              ['[Morning email triage with drafts](/guides/how-to-triage-your-inbox-with-ai)', 'AI agent', 'Saves time daily; you still send'],
              ['[A weekly numbers email](/guides/how-to-automate-weekly-reports-by-email)', 'AI agent', 'Low risk; replaces a dull half hour'],
              ['[Invoice reminders](/guides/how-to-automate-invoice-reminders)', 'App', 'Money comes in sooner; each email approved'],
              ['[New lead alerts](/guides/how-to-send-new-hubspot-contacts-to-slack)', 'Automation', 'Nobody waits a day for a reply'],
            ],
          },
        },
      ],
    },
    {
      id: 'steps',
      h2: 'How to start, step by step',
      body: [
        {
          steps: [
            { title: 'List last week’s repeated tasks', body: 'From your calendar, sent mail and to-do list. Aim for 15.' },
            { title: 'Score them', body: 'Times a month times minutes each, and the cost of a mistake.' },
            { title: 'Pick one Low-risk task from the top', body: 'One. Not three.' },
            { title: 'Fix the process before automating it', body: 'If the task is messy by hand (three places to look, steps in your head), tidy it first. Automating a broken process makes it break faster.' },
            { title: 'Build it, check it for a week', body: 'Look at every run. Then pick the next one.' },
          ],
        },
      ],
    },
    {
      id: 'example',
      h2: 'Let 50agents suggest the first one',
      body: [
        { p: 'In 50agents you can ask Captain to read your website and say which work it would take off your plate first; it answers straight away, without building anything. Then pick one of its suggestions, or one of the jobs above, and it plans it. For example, the first automation most shops start with:' },
        { ask: 'Read my website and tell me what you would take off my plate' },
        {
          view: {
            type: 'track',
            name: 'New orders to your sheet',
            status: 'Draft: not live yet',
            stations: [
              { mark: 'app', app: APPS.shopify, say: 'When a new order comes in to Shopify', passes: ['order number', 'line items', 'total'] },
              { mark: 'set', say: 'Join the items into one line', passes: ['items'] },
              { mark: 'app', app: APPS.sheets, say: 'Add a row to "Orders"' },
            ],
            tested: 'Tested on your real data.',
          },
          caption: 'A first automation planned by Captain in 50agents: fixed steps, low risk, easy to check. Example data.',
        },
      ],
    },
  ],
  wrong: [
    { title: 'Starting with the hardest task', body: 'The one you hate most is often the one with the most judgement. Win with a dull one first.' },
    { title: 'Automating a mess', body: 'The automation copies every inconsistency. Tidy the process by hand first.' },
    { title: 'Messages that sound like a robot', body: 'Clients notice. Keep anything customer-facing as a draft you approve.' },
    { title: 'Reminders to people who already paid', body: 'The automation did not know. Make sure it reads the latest status right before it sends.' },
    { title: 'Tool sprawl', body: 'Five tools for five automations. Prefer one place where you can see them all.' },
  ],
  faqs: [
    { q: 'Where should a small business start with automation?', a: 'With a task done daily or weekly, the same way each time, where a mistake is cheap: logging orders or payments, sorting email, a weekly summary.' },
    { q: 'What should I not automate?', a: 'Anything that commits you (contracts, refunds, discounts) or decides about a person (hiring, firing) without a human approving it.' },
    { q: 'How much does it cost to start?', a: 'Most tools have a free tier or free credits enough to build and test one automation. See [how much automation costs](/guides/how-much-automation-costs-credits-tasks-and-runs-compared).' },
  ],
  sources: [
    { label: 'vcita: What small businesses need to automate first (4 Jan 2026)', href: 'https://www.vcita.com/blog/time-management/what-small-businesses-need-to-automate-first' },
  ],
  related: ['ai-agents-for-small-business-10-jobs-that-work-today', 'how-much-automation-costs-credits-tasks-and-runs-compared', 'internal-tools-without-code-what-to-build-first'],
};

export default g;
