// Role page: operations (pages-brief B7). Jobs from the 50agents templates (orders log, competitor prices) plus automations
// on catalog events (Typeform, Asana, Trello), read from viaSocket's catalog 19 Nov 2026.
import type { Role } from '@/content/guides/types';
import { APPS } from '@/content/guides/apps';

const r: Role = {
  slug: 'operations',
  role: 'operations teams',
  kind: 'auto',
  title: 'AI agents and automations for operations teams | 50agents',
  description:
    'What operations hands off first: orders logged, form requests turned into tasks, competitor prices watched, a daily schedule in Slack and a weekly ops report.',
  h1: 'AI agents and automations for operations teams',
  answer: [
    'Operations teams hand off the copying between tools first: each order or form becomes a row or a task in the right place, the same way every time.',
    'In 50agents you describe it to Captain and it builds automations across Google Sheets, Asana, Trello, ClickUp and your other apps, plus browser agents for websites with no app.',
  ],
  updated: '2026-11-19',
  jobs: [
    { title: 'Log every order', kind: 'auto', href: '/use-cases/shopify-orders-to-google-sheets', body: 'Each new Shopify order is added to your Google Sheet with its items and total.', ask: 'Set up an automation: every new Shopify order is added as a row to my Google Sheet with its items and total' },
    { title: 'Turn form requests into tasks', kind: 'auto', body: 'When someone submits your request form in Typeform, create a task in the right Asana project with the details filled in.', ask: 'Set up an automation: when my Typeform request form is submitted, create a task in my Asana Requests project with the answers in the description' },
    { title: 'Watch competitor or supplier prices', kind: 'browser', href: '/use-cases/track-competitor-prices', body: 'A browser agent checks a list of pricing pages each morning and tells you only what changed.', ask: 'Set up a browser agent that checks my competitors\' pricing pages every day at 9:00 and tells me when a price changes' },
    { title: 'Tomorrow’s schedule in Slack', kind: 'ai', href: '/use-cases/tomorrows-meetings-in-slack', body: 'Each evening, tomorrow’s meetings from Google Calendar in one Slack message.', ask: 'Set up an AI agent that sends me tomorrow\'s meetings from Google Calendar in Slack every day at 18:00' },
    { title: 'A weekly ops report', kind: 'ai', body: 'Every Monday, an AI agent reads last week’s orders sheet and writes the counts, the late ones and anything unusual.', ask: 'Set up an AI agent that every Monday at 9:00 reads last week’s rows in my Orders sheet and emails me the counts, late orders and anything unusual' },
  ],
  useCases: [
    { href: '/use-cases/shopify-orders-to-google-sheets', kind: 'auto', title: 'Shopify orders to Google Sheets', line: 'Every order as a row, with its items.' },
    { href: '/use-cases/track-competitor-prices', kind: 'browser', title: 'Track competitor prices', line: 'Pricing pages checked every morning.' },
    { href: '/use-cases/tomorrows-meetings-in-slack', kind: 'ai', title: 'Tomorrow’s meetings in Slack', line: 'An evening brief for the next day.' },
  ],
  apps: [
    { slug: 'google-sheets', name: 'Google Sheets', icon: APPS.sheets.icon, line: 'Row added or updated; 23 actions' },
    { slug: 'asana', name: 'Asana', icon: APPS.asana.icon, line: 'Task completed; create task or subtask' },
    { slug: 'trello', name: 'Trello', icon: APPS.trello.icon, line: 'Card moved; create card' },
    { slug: 'clickup', name: 'ClickUp', icon: APPS.clickup.icon, line: 'Task created or updated; create task' },
    { slug: 'notion', name: 'Notion', icon: APPS.notion.icon, line: 'New data source item; create page' },
    { slug: 'airtable', name: 'Airtable', icon: APPS.airtable.icon, line: 'Record created or updated' },
    { slug: 'typeform', name: 'Typeform', icon: APPS.typeform.icon, line: 'When a form is submitted' },
    { slug: 'slack', name: 'Slack', icon: APPS.slack.icon, line: 'Messages to people and channels' },
  ],
  appsNote: 'Triggers and actions as listed in viaSocket’s catalog, read 19 Nov 2026.',
  example: {
    h2: 'Worked example: form requests become Asana tasks',
    intro: 'Requests that arrive by form and get retyped into a task tool are the classic ops chore. This automation runs on each Typeform submission and creates the task with the answers in it. Creating a task in your own Asana runs on its own.',
    ask: 'Set up an automation: when my Typeform request form is submitted, create a task in my Asana Requests project with the answers in the description',
    view: {
      type: 'track',
      name: 'Requests form to Asana',
      status: 'Live · runs on each form submission',
      sample: { title: 'Submission: "Replace the walk-in fridge seal" · Kitchen, Riverside site', sub: 'The real submission it planned and tested with' },
      stations: [
        { mark: 'app', app: APPS.typeform, say: 'When the Requests form is submitted in Typeform', passes: ['title', 'site', 'urgency', 'details'] },
        { mark: 'app', app: APPS.asana, say: 'Create a task in "Requests" with the answers in the description', did: 'Ran', values: [['Task', 'Replace the walk-in fridge seal (Riverside)']] },
      ],
      tested: 'Tested on your real data. Ran for real: 1 step.',
    },
    caption: 'The automation in 50agents, tested on a real submission before it went live. Example data.',
    after: [
      'Add judgement where it helps: "and mark it urgent if the details mention a leak or no power" adds an AI step in the middle.',
      'For the general method, read [how to automate data entry between two apps](/guides/how-to-automate-data-entry-between-two-apps).',
    ],
  },
  notYet: [
    'A browser agent will not get past CAPTCHAs or bot checks; sites that block automated visits stay manual.',
    'It does not two-way sync two apps; each automation runs in one direction.',
    'Posting to a shared Slack channel asks for your approval each time today.',
  ],
  guides: ['how-to-automate-data-entry-between-two-apps', 'how-to-monitor-competitor-prices-automatically', 'how-to-send-shopify-orders-to-google-sheets'],
  faqs: [
    { q: 'Can it work with our task tool?', a: 'Asana, Trello, ClickUp, Notion and monday.com are all in viaSocket’s catalog. Name yours in the sentence to Captain.' },
    { q: 'What if a site we use has no app?', a: 'A browser agent can read it like a person would, and asks before it submits anything. See [how to automate a website that has no API](/guides/how-to-automate-a-website-that-has-no-api).' },
    { q: 'How do I know an automation stopped working?', a: 'Each automation’s Overview shows runs and failures today, and Care, the maintenance AI, notices failed runs and expired connections.' },
  ],
};

export default r;
