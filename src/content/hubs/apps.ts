// Hub 16 (pages-brief B2): /apps, for "no code app builder", "build an app from Google Sheets", "internal tool without code".
// Product facts: app/PRODUCT.md, app/src/features/apps/CLAUDE.md and recipes.ts (leads, requests, invoices), read 19 Nov 2026.
// Competitors: glideapps.com/pricing, docs.softr.io/workspace-and-billing/pricing-and-plans, read 19 Nov 2026.
import type { Hub } from './types';
import { ICONS } from './apps-icons';

const hub: Hub = {
  kind: 'app',
  path: '/apps',
  crumb: 'Apps',
  title: 'No-code app builder run by AI agents | 50agents',
  description:
    'Describe what you track and Captain builds your own app: lists, a board, a table and numbers, plus a crew of AI agents that keeps it up to date.',
  h1: 'Build your own business app by describing it',
  answer: [
    'An app in 50agents is your own set of screens and records, such as a leads pipeline or an invoices desk, with a small crew of AI agents that fills it and works on it.',
    'Tell Captain what you need to keep track of, answer two or three questions, and it builds the lists, the board, the tables and the numbers; you bring your data in from a CSV, an Excel file or pasted text.',
  ],
  promises: ['Bring in a CSV or Excel file', 'Every change can be undone', 'Its crew asks before it emails anyone'],
  hero: {
    ask: 'Track my leads and follow up',
    plan: [
      { label: 'Kind', value: 'App' },
      { label: 'Lists', value: 'Leads, with stage and deal size' },
      { label: 'Screens', value: 'Pipeline, Follow up, All leads' },
      { label: 'Crew', value: 'Closer (AI agent), Scout (browser agent)' },
    ],
  },
  view: {
    h2: 'An app with its crew: the leads pipeline',
    p: 'This is the app Captain builds from "Track my leads and follow up", with example leads: the Overview numbers, the Pipeline board by stage with totals, and the crew that brings leads in and follows up.',
  },
  can: [
    'Build lists with typed fields (text, email, phone, money, date, a choice) and screens on them: a board by stage with totals, a sortable table, and numbers on its Overview that open their rows.',
    'Start from one of three recipes (leads, customer requests, invoices) or compose a new app from the same parts when none is close.',
    'Ask you at least once before it builds, with "Use the usual" for every question, so nothing is filled in silently.',
    'Bring data in from an Excel or CSV file, a pasted table or plain text, show where each column goes, and take an import back with Undo import. Export any list as CSV.',
    'Run a crew of up to 3 AI agents or browser agents, each with up to 4 duties, on a time of day or when records change. A duty that emails people outside always asks first.',
    'Keep every change as a version with Undo, and remove records softly, with Undo.',
  ],
  cant: [
    'Stay linked to a Google Sheet. Reading a connected sheet into an app is not built; download the sheet as CSV and bring it in.',
    'Show charts or a calendar. Those parts are not built yet; you get boards, tables and numbers.',
    'Publish an app to people outside your workspace. An app lives in your 50agents workspace, for you and the people you invite.',
    'Hand records from one app to another app.',
    'Link to more than 200 records from one field.',
    'Have more than 3 crew members. The crew stays small on purpose.',
  ],
  limitsNote: 'From the 50agents app\'s apps source, its recipes and its open list, read 19 Nov 2026.',
  ucIntro: 'Three of the twelve ready-made starts are apps, one per recipe the app builder has today.',
  apps: {
    intro: 'All three app recipes start from your email. Your data can also come from any spreadsheet you can save as CSV or Excel.',
    list: [
      { name: 'Gmail', icon: ICONS.Gmail, why: 'Where the crew finds new leads and requests, and sends reminders and follow-ups once you approve.' },
      { name: 'Google Sheets', icon: ICONS['Google Sheets'], why: 'Download a sheet as CSV and bring it in; the app matches its columns to fields. Not a live link.' },
      { name: 'Excel or CSV file', logo: 'file', why: 'Drop the file in; useful columns that fit no field are offered as new ones.' },
    ],
  },
  others: {
    intro: 'The no-code app builders people search for. Facts read on each vendor\'s own pages on 19 Nov 2026.',
    list: [
      {
        name: 'Glide',
        href: 'https://www.glideapps.com/pricing',
        plan: 'Free with limited credits and 10 projects, but no published apps; Basic $25 a month.',
        better: 'Builds directly on a live Google Sheet and makes apps your staff use on their phones. States SOC 2 Type 2.',
        note: 'Pick Glide if the sheet must stay the source of truth. 50agents brings a sheet in once, as a file.',
      },
      {
        name: 'Softr',
        href: 'https://docs.softr.io/workspace-and-billing/pricing-and-plans',
        plan: 'Free for 3 builders and 5 app users; Basic $19 a month billed yearly ($25 monthly).',
        better: 'Connects to 21+ data sources, Google Sheets and Airtable included, and builds portals for clients.',
        note: 'Better for a client portal. A 50agents app is for your own team, with AI agents working inside it.',
      },
    ],
  },
  faqs: [
    {
      q: 'Can I build an app without code?',
      a: 'Yes. You describe it, Captain asks which apps you use today and what the app is for, then shows the plan as a Blueprint. Build it makes the app; nothing is code written by the AI, so a change cannot break it.',
    },
    {
      q: 'Can I build an app from Google Sheets?',
      a: 'You can bring a sheet in: download it as CSV or Excel, drop it into the app, check where each column goes and tap Bring in. The app does not stay linked to the sheet; for a live link, Glide or Softr fit better.',
    },
    {
      q: 'What is an internal tool, and is this one?',
      a: 'An internal tool is software your team uses to run the business, not something customers see: a pipeline, a requests desk, an invoices list. A 50agents app is exactly that, with AI agents doing the routine work in it.',
    },
    {
      q: 'Who does the work in the app?',
      a: 'Its crew. In the leads app, Closer reads your email for new leads each weekday at 9:00, notices replies and drafts follow-ups for leads quiet for 3 days; Scout reads each new lead\'s company website.',
    },
    {
      q: 'Can I change the app after it is built?',
      a: 'Yes, by asking in its chat: add a field, a screen or a duty. Each change is a version with Undo, and removing a field never deletes the records behind it.',
    },
  ],
  related: [
    { label: 'How to build an app from Google Sheets', href: '/guides/how-to-build-an-app-from-google-sheets' },
    { label: 'How to build a simple CRM without code', href: '/guides/how-to-build-a-simple-crm-without-code' },
    { label: 'Internal tools without code: what to build first', href: '/guides/internal-tools-without-code-what-to-build-first' },
    { label: 'What is an internal tool?', href: '/learn/internal-tool' },
    { label: 'What is no-code?', href: '/learn/no-code' },
    { label: '50agents vs Glide', href: '/compare/50agents-vs-glide' },
  ],
  final: {
    h2: 'Describe the app you keep in a spreadsheet',
    p: 'Say what you track. Captain asks two or three things and builds it with its crew. Every workspace starts free with 2,000 credits.',
    cta: 'Build an app with Captain',
  },
  updated: '2026-11-19',
};

export default hub;
