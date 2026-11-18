// Role page: founders (pages-brief B7). Jobs from the 50agents templates, including the "website" start (Captain reads your
// site and says what it would take off your plate) and onboarding's Start here (app/src/features/templates/list.ts).
import type { Role } from '@/content/guides/types';
import { APPS } from '@/content/guides/apps';

const r: Role = {
  slug: 'founders',
  role: 'founders',
  kind: 'ai',
  title: 'AI agents and automations for founders | 50agents',
  description:
    'What founders doing everything themselves hand off first: the morning inbox, tomorrow’s meetings, unpaid invoices, a weekly revenue note and new leads.',
  h1: 'AI agents and automations for founders',
  answer: [
    'Founders hand off the inbox first: an AI agent that goes through unread email each morning and drafts the replies, then the jobs that leak money when nobody has time, like chasing invoices.',
    'In 50agents you tell Captain what you need, or ask it to read your website and say what it would take off your plate; it builds each job and asks you before anything leaves your business.',
  ],
  updated: '2026-11-19',
  jobs: [
    { title: 'Morning email, replies drafted', kind: 'ai', href: '/use-cases/ai-email-triage-every-morning', body: 'Goes through your unread email now, then every weekday at 8:00, and drafts the replies for you to check.', ask: 'Go through my unread email now, then every weekday at 8:00, and draft replies' },
    { title: 'Tomorrow, in one message', kind: 'ai', href: '/use-cases/tomorrows-meetings-in-slack', body: 'Each evening, tomorrow’s meetings from Google Calendar in Slack.', ask: 'Set up an AI agent that sends me tomorrow\'s meetings from Google Calendar in Slack every day at 18:00' },
    { title: 'Chase unpaid invoices', kind: 'app', href: '/use-cases/chase-unpaid-invoices', body: 'A desk of what you are owed, late first, reminders drafted.', ask: 'Chase my unpaid invoices' },
    { title: 'A weekly revenue note', kind: 'ai', href: '/use-cases/weekly-stripe-revenue-summary', body: 'Every Monday, last week in Stripe: totals and what changed.', ask: 'Set up an AI agent that reads last week\'s payments in Stripe every Monday at 9:00 and emails me the totals and what changed' },
    { title: 'Leads you would otherwise lose', kind: 'app', href: '/use-cases/lead-tracker-from-your-inbox', body: 'Enquiries from your inbox in one pipeline, with follow-ups drafted when they go quiet.', ask: 'Track my leads and follow up' },
  ],
  useCases: [
    { href: '/use-cases/ai-email-triage-every-morning', kind: 'ai', title: 'AI email triage every morning', line: 'Your inbox sorted and drafted by 8:00.' },
    { href: '/use-cases/chase-unpaid-invoices', kind: 'app', title: 'Chase unpaid invoices automatically', line: 'An invoices desk that drafts reminders.' },
    { href: '/use-cases/weekly-stripe-revenue-summary', kind: 'ai', title: 'Weekly Stripe revenue summary', line: 'Last week’s money in your inbox every Monday.' },
  ],
  apps: [
    { slug: 'gmail', name: 'Gmail', icon: APPS.gmail.icon, line: 'Your inbox, read and drafted' },
    { slug: 'google-calendar', name: 'Google Calendar', icon: APPS.calendar.icon, line: 'New or updated event; list events' },
    { slug: 'stripe', name: 'Stripe', icon: APPS.stripe.icon, line: 'Payments, refunds, failed payments' },
    { slug: 'slack', name: 'Slack', icon: APPS.slack.icon, line: 'Messages to you and your team' },
    { slug: 'google-sheets', name: 'Google Sheets', icon: APPS.sheets.icon, line: 'The sheets you already keep' },
    { slug: 'hubspot', name: 'HubSpot', icon: APPS.hubspot.icon, line: 'Contacts and deals' },
    { slug: 'shopify', name: 'Shopify', icon: APPS.shopify.icon, line: 'Orders, customers, products' },
    { slug: 'notion', name: 'Notion', icon: APPS.notion.icon, line: 'Pages and databases' },
  ],
  appsNote: 'Triggers and actions as listed in viaSocket’s catalog, read 19 Nov 2026.',
  example: {
    h2: 'Worked example: the morning inbox, drafted before you open it',
    intro: 'Captain plans an AI agent from one sentence. It runs once now so you see what it does with today’s mail, then every weekday at 8:00. It sorts what needs you from what does not and drafts replies in each thread; you send them.',
    ask: 'Go through my unread email now, then every weekday at 8:00, and draft replies',
    view: {
      type: 'plan',
      ask: 'Go through my unread email now, then every weekday at 8:00, and draft replies',
      face: 'writer',
      name: 'Morning email',
      job: 'Goes through your unread email and drafts the replies for you to check',
      steps: ['Read unread email from the last day in Gmail', 'Pick out the messages from people that need a reply', 'Draft a reply in each thread', 'Send you a short list of what needs you and what can wait'],
      when: 'Now, then every weekday at 8:00',
      uses: [APPS.gmail],
      asksFirst: 'Sending any email, any change in your apps',
    },
    caption: 'Captain’s plan card in 50agents, shown before anything is built. Example data.',
    after: [
      'Not sure where to start? Ask Captain "Read my website and tell me what you would take off my plate". It answers straight away, without building anything.',
      'For a way to rank your own tasks, read [what to automate first in a small business](/guides/what-to-automate-first-in-a-small-business).',
    ],
  },
  notYet: [
    'It does not send email as you without your approval, and it has no email address of its own.',
    'It does not make calls, book travel or pay for anything.',
    'Notifications come inside the app (Needs you, Home), not by SMS or WhatsApp.',
  ],
  guides: ['what-to-automate-first-in-a-small-business', 'how-to-triage-your-inbox-with-ai', 'ai-agents-for-small-business-10-jobs-that-work-today'],
  faqs: [
    { q: 'How much does it cost to start?', a: 'Every workspace starts free with 2,000 credits; after that, $1 buys 1,000 credits. Usage in Settings shows every charge.' },
    { q: 'How long does it take to set up?', a: 'Minutes per job: you write a sentence, answer Captain’s questions, check the plan and tap Build it.' },
    { q: 'What if I want to change something later?', a: 'Tell the AI agent or app in its chat. Each change is a version you can undo.' },
  ],
};

export default r;
