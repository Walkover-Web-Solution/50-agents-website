// Role page: agencies (pages-brief B7). Jobs from the 50agents app recipes (requests, invoices, leads) and AI agent and
// browser agent templates; apps from viaSocket's catalog, read 19 Nov 2026.
import type { Role } from '@/content/guides/types';
import { APPS } from '@/content/guides/apps';

const r: Role = {
  slug: 'agencies',
  role: 'agencies',
  kind: 'app',
  title: 'AI agents and automations for agencies | 50agents',
  description:
    'What agencies hand off first: client requests on one desk, invoices chased, new-business leads tracked, a weekly client update drafted and client competitors watched.',
  h1: 'AI agents and automations for agencies',
  answer: [
    'Agencies hand off the client admin first: every client request on one desk instead of scattered threads, and late invoices chased without anyone writing the awkward email.',
    'In 50agents each is an app or an AI agent Captain builds from a sentence, on Gmail, Asana, ClickUp, Google Sheets and your other tools, and anything sent to a client waits for your approval.',
  ],
  updated: '2026-11-19',
  jobs: [
    { title: 'Client requests on one desk', kind: 'app', href: '/use-cases/customer-requests-desk', body: 'Every client ask from email becomes a request with a status and an answer-by date; urgent ones first, replies drafted.', ask: 'Keep track of customer requests and draft the replies' },
    { title: 'Chase late invoices', kind: 'app', href: '/use-cases/chase-unpaid-invoices', body: 'An invoices desk by client, late first, with polite reminders drafted for each.', ask: 'Chase my unpaid invoices' },
    { title: 'Track new-business leads', kind: 'app', href: '/use-cases/lead-tracker-from-your-inbox', body: 'Enquiries pulled from your inbox into a pipeline, with follow-ups drafted when a prospect goes quiet.', ask: 'Track my leads and follow up' },
    { title: 'A weekly client update', kind: 'ai', body: 'Every Friday, an AI agent reads the week’s completed tasks in Asana for a client and drafts the update email for you to check.', ask: 'Set up an AI agent that every Friday at 15:00 reads this week’s completed tasks in my Asana project for Northwind and drafts a client update email for me to approve' },
    { title: 'Watch a client’s competitors', kind: 'browser', body: 'A browser agent checks the competitors’ pricing and offer pages each morning and tells you what changed, for the next client call.', ask: 'Set up a browser agent that checks these competitors’ pricing pages every day at 9:00 and tells me when an offer or price changes' },
  ],
  useCases: [
    { href: '/use-cases/customer-requests-desk', kind: 'app', title: 'Customer requests desk', line: 'Every request in one place, with replies drafted.' },
    { href: '/use-cases/chase-unpaid-invoices', kind: 'app', title: 'Chase unpaid invoices automatically', line: 'An invoices desk that drafts reminders.' },
    { href: '/use-cases/lead-tracker-from-your-inbox', kind: 'app', title: 'Lead tracker from your inbox', line: 'A pipeline built from the emails that bring you work.' },
  ],
  apps: [
    { slug: 'gmail', name: 'Gmail', icon: APPS.gmail.icon, line: 'Client email in, replies out' },
    { slug: 'asana', name: 'Asana', icon: APPS.asana.icon, line: 'Task completed; project tasks' },
    { slug: 'clickup', name: 'ClickUp', icon: APPS.clickup.icon, line: 'Task created or updated' },
    { slug: 'trello', name: 'Trello', icon: APPS.trello.icon, line: 'Card moved, comment added' },
    { slug: 'google-sheets', name: 'Google Sheets', icon: APPS.sheets.icon, line: 'Reports your clients already read' },
    { slug: 'hubspot', name: 'HubSpot', icon: APPS.hubspot.icon, line: 'Contacts, deals, tickets' },
    { slug: 'calendly', name: 'Calendly', icon: APPS.calendly.icon, line: 'Meeting booked or cancelled' },
    { slug: 'slack', name: 'Slack', icon: APPS.slack.icon, line: 'Messages to your team' },
  ],
  appsNote: 'Triggers and actions as listed in viaSocket’s catalog, read 19 Nov 2026.',
  example: {
    h2: 'Worked example: every client request on one desk',
    intro: 'Captain builds a requests app from one sentence: a desk by status, an Urgent view, and Desk, an AI agent that sorts each new request by kind and priority, sets an answer-by date and drafts a reply to each question. Drop in an export of open asks to start.',
    ask: 'Keep track of customer requests and draft the replies',
    view: {
      type: 'app',
      face: ['writer'],
      name: 'Client requests',
      status: 'Live · 27 requests',
      rail: ['Overview', 'Desk', 'Urgent', 'All requests'],
      on: 'Overview',
      numbers: [['Open', '9'], ['Late', '2', true], ['Solved this week', '11']],
      table: {
        head: ['Subject', 'Customer', 'Status', 'Answer by'],
        rows: [
          ['Homepage banner for the sale', 'Northwind Studio', 'Waiting on us', '20 Nov'],
          ['Change the logo colour on the deck', 'Lumen Dental', 'New', '21 Nov'],
          ['Can we move the launch a week?', 'Oakridge Builders', 'Waiting on them', '24 Nov'],
        ],
      },
      crew: { face: 'writer', name: 'Desk', word: 'AI agent', does: 'Sorts each new request and drafts a reply to each question from what your business knows. Asks you before sending any email.' },
    },
    caption: 'A requests app in 50agents for client asks: the Overview numbers, the open requests and the AI agent in its crew. Example data.',
    after: [
      'Ask for a change in plain words, such as "add a Client field and a board by client", and it becomes a new version you can undo.',
      'The method for any tool is in [how to build a customer requests desk from your inbox](/guides/how-to-build-a-customer-requests-desk-from-your-inbox).',
    ],
  },
  notYet: [
    'One workspace holds your apps and records; it is not a client portal your clients log in to.',
    'It does not run ad accounts or post on social media for clients.',
    'Client emails always wait for your approval.',
  ],
  guides: ['how-to-build-a-customer-requests-desk-from-your-inbox', 'how-to-automate-invoice-reminders', 'internal-tools-without-code-what-to-build-first'],
  faqs: [
    { q: 'Can I keep clients separate?', a: 'Inside one app, add a Client field and a view per client. People you invite to the workspace see what the workspace holds, so plan who you invite.' },
    { q: 'Can it write client reports?', a: 'An AI agent can read the week’s tasks or a sheet of numbers and draft the update email. You review and send.' },
    { q: 'Does it work with our project tool?', a: 'Asana, ClickUp, Trello, Notion and monday.com are in viaSocket’s catalog. Name yours in the sentence to Captain.' },
  ],
};

export default r;
