import type { VsPage } from './types';

const page: VsPage = {
  type: 'versus',
  slug: '50agents-vs-softr',
  tool: 'softr',
  title: '50agents vs Softr: apps for your team or clients | 50agents',
  description: 'Softr builds client portals and internal tools on your own domain; 50agents builds team apps run by AI agents from one sentence. Every row sourced.',
  h1: '50agents vs Softr',
  answer: [
    'Pick Softr if you need a client portal or an app for people outside your team, on your own domain, laid out in a visual editor; pick 50agents if the app is for your own team and you want AI agents to work its records for you, built from one sentence.',
    'Softr is free for up to 5 app users and 5K records, and Basic is $19 a month billed yearly; 50agents starts every workspace free with 2,000 credits.',
  ],
  published: '2026-11-19',
  updated: '2026-11-19',
  rows: ['free', 'price', 'prompt', 'appBuilder', 'database', 'publicApps', 'aiAgent', 'fixed', 'handEdit', 'export'],
  verdict: [
    'Softr is the better app builder in the usual sense: portals, custom domains, team and client users, a visual editor you can use without AI, and its own database, workflows and AI agents.',
    '50agents builds a narrower kind of app: lists, boards, tables and numbers for your own workspace. What it adds is the crew: AI agents that work the records on a schedule, such as drafting a reminder for each late invoice and waiting for your OK, plus the automations and browser agents around the app.',
  ],
  pick: {
    us: [
      'The app is for your team, and you want AI agents doing the follow-up work inside it.',
      'You want the app, its automations and its AI agents from one sentence, for example "chase my unpaid invoices".',
      'You would rather not lay out pages.',
    ],
    them: [
      'Clients or partners need to log in to it.',
      'You need your own domain and your branding.',
      'You want to design each page yourself in a visual editor.',
    ],
  },
  move: [
    { title: 'Download your tables', body: 'Softr table data downloads as CSV or XLSX.' },
    { title: 'Ask for the app, then bring the data in', body: 'Tell Captain what the app is for. Once it is built, drop the CSV into the app\'s list; columns are matched to fields, and you can undo the import.' },
    { title: 'Keep Softr for anything client-facing', body: '50agents apps are for your workspace; keep portals where they are.' },
  ],
  faqs: [
    { q: 'Can I build a client portal with 50agents?', a: 'No. 50agents apps are for the people in your workspace. Softr is built for portals.' },
    { q: 'Do both build apps from a prompt?', a: 'Yes. Softr\'s AI Co-Builder creates and changes apps from plain language; Captain builds 50agents apps from one sentence and asks what it needs to know.' },
    { q: 'Which is cheaper to start?', a: 'Both start free. Softr\'s free plan allows 5 app users and 5K records; 50agents starts with 2,000 credits.' },
  ],
  related: [
    { href: '/compare/50agents-vs-glide', title: '50agents vs Glide', line: 'The other app builder, row by row' },
    { href: '/use-cases/chase-unpaid-invoices', title: 'Chase unpaid invoices', line: 'An app built from one sentence, shown working' },
    { href: '/apps', title: 'Apps', line: 'What an app in 50agents is' },
  ],
};

export default page;
