// Guide 20 (pages-brief B5). Research: HubSpot "CRM in Google Sheets", Zapier spreadsheet CRM template, Better Sheets and
// Softr results for "build a simple crm without code", Google Sheets dropdown help, read 19 Nov 2026.
// 50agents: the leads recipe (app/src/features/apps/recipes.ts).
import type { Guide } from './types';

const g: Guide = {
  slug: 'how-to-build-a-simple-crm-without-code',
  n: 20,
  group: 'Apps',
  kind: 'app',
  title: 'How to build a simple CRM without code | 50agents',
  description:
    'Build a simple CRM without code: ten fields, five stages, a next follow-up date on every open lead and a daily list of who to contact.',
  h1: 'How to build a simple CRM without code',
  short:
    'A simple CRM is one list of leads with about ten fields, five stages from New to Won or Lost, and a "next follow-up" date on every open lead, plus a view sorted by that date so you know who to contact today. Build it in a sheet or a no-code app; the part that keeps it alive is getting new leads in from your email and forms without typing them.',
  published: '2026-11-19',
  updated: '2026-11-19',
  sections: [
    {
      id: 'fields',
      h2: 'The fields and stages',
      body: [
        { p: 'Start with these. Every field earns its place by a decision you make with it.' },
        {
          table: {
            head: ['Field', 'Type', 'Used for'],
            rows: [
              ['Name, Email, Phone, Company', 'Text', 'Reaching them; email is the key that stops duplicates'],
              ['Source', 'Choice: Website, Referral, Email, Event, Other', 'Knowing which channel brings buyers'],
              ['Stage', 'Choice: New, Contacted, Replied, Won, Lost', 'The pipeline board'],
              ['Deal size', 'Money', 'Sorting and the open total'],
              ['Last contact', 'Date', 'Spotting leads that went quiet'],
              ['Next follow-up', 'Date', 'Today’s list'],
              ['Notes', 'Long text', 'One line per conversation'],
            ],
            caption: 'These are the fields and stages of the leads recipe in 50agents. HubSpot’s own Google Sheets CRM template suggests similar "next step" and "next step date" columns ([HubSpot](https://blog.hubspot.com/sales/crm-google-sheets)).',
          },
        },
        { p: 'Make Stage and Source dropdowns, not free text, so they sort and count. In Google Sheets that is Insert, Dropdown ([Google](https://support.google.com/docs/answer/186103)).' },
      ],
    },
    {
      id: 'views',
      h2: 'The three views you will use',
      body: [
        {
          table: {
            head: ['View', 'Shows', 'You open it'],
            rows: [
              ['Follow up', 'Open leads with a next follow-up date, soonest first', 'Every morning'],
              ['Pipeline', 'A board by stage, with the deal size total per column', 'Weekly'],
              ['All leads', 'Everything, newest first, searchable', 'When someone calls'],
            ],
          },
        },
      ],
    },
    {
      id: 'steps',
      h2: 'How to build it, step by step',
      body: [
        {
          steps: [
            { title: 'Make the list with the fields above', body: 'In a sheet, one tab, one row per lead. In a no-code app, one table.' },
            { title: 'Add the three views', body: 'A filter view or sorted tab for Follow up; a board for Pipeline if your tool has one.' },
            { title: 'Bring in what you have', body: 'Paste last quarter’s leads from email and your notes. Fill Stage and Next follow-up for every open one.' },
            { title: 'Decide how new leads get in', body: 'Form entries, enquiry emails, referrals. Each needs a route into the list, or the CRM goes stale in a month.' },
            { title: 'Set the follow-up rule', body: 'Every time you contact a lead, set Last contact to today and Next follow-up to a date. No open lead without a date.' },
            { title: 'Review the pipeline weekly', body: 'Move dead leads to Lost. A pipeline full of ghosts hides the real ones.' },
          ],
        },
      ],
    },
    {
      id: 'when-to-move',
      h2: 'When a sheet stops being enough',
      body: [
        { p: 'HubSpot suggests a sheet strains past about 100 active leads or 500 records ([HubSpot](https://blog.hubspot.com/sales/crm-google-sheets)); it sells a CRM, so treat the number as a hint. The better signals are practical: two people editing the same lead, follow-ups slipping because nothing reminds you, and leads arriving faster than you can type them in. That is the point to move to an app that captures leads and reminds you, or a full CRM if you have a sales team.' },
      ],
    },
    {
      id: 'example',
      h2: 'A worked example in 50agents',
      body: [
        { p: 'Captain builds this CRM from one sentence, with the fields, stages and views above. What a sheet cannot do, its crew does: Closer, an AI agent, reads the last day’s email each weekday at 9:00 and adds new people asking to buy, marks leads Replied when they answer, and drafts follow-ups for your approval; Scout, a browser agent, looks up each new lead’s company and adds a note.' },
        { ask: 'I need a simple CRM for my sales' },
        {
          view: {
            type: 'app',
            face: ['closer', 'scout'],
            name: 'Leads',
            status: 'Live · 23 leads',
            rail: ['Overview', 'Pipeline', 'Follow up', 'All leads'],
            on: 'Pipeline',
            board: [
              { name: 'New', tone: '#EEF3FF', dot: '#3355CC', total: '$9,500', cards: [{ title: 'Fieldstone Logistics', lines: ['$6,000', 'Next: 20 Nov'] }, { title: 'Brightline Physio', lines: ['$3,500', 'Next: 21 Nov'] }] },
              { name: 'Contacted', tone: '#F1EEFF', dot: '#6C5CE7', total: '$14,200', cards: [{ title: 'Parkside Dental', lines: ['$8,200', 'Next: 18 Nov'] }, { title: 'Laurent Studio', lines: ['$6,000', 'Next: 19 Nov'] }] },
              { name: 'Replied', tone: '#FFF1EC', dot: '#B4410B', total: '$12,000', cards: [{ title: 'Northgate Physio', lines: ['$12,000', 'Next: 21 Nov'] }] },
              { name: 'Won', tone: '#EDF7F1', dot: '#17703F', total: '$4,800', cards: [{ title: 'Maple & Co. Bakery', lines: ['$4,800'] }] },
            ],
            crew: { face: 'scout', name: 'Scout', word: 'browser agent', does: 'Looks up each new lead’s company: what it does, how big it is, one thing worth knowing before the first call.' },
          },
          caption: 'The Pipeline view of a leads app in 50agents, with deal size totals per stage, and Scout, the browser agent in its crew. Example data.',
        },
      ],
    },
  ],
  pair: { href: '/use-cases/lead-tracker-from-your-inbox', label: 'Build it: a lead tracker from your inbox', line: 'The ready-made version, filled from your email.' },
  wrong: [
    { title: 'Duplicate leads', body: 'The same person entered from a form and an email. Use email as the key and search before adding.' },
    { title: 'Open leads with no date', body: 'They never come up in Follow up, so they are forgotten. Make Next follow-up required for every open stage.' },
    { title: 'Stages nobody agrees on', body: '"Qualified" means three things to three people. Keep five stages with plain names and write one line on what each means.' },
    { title: 'It goes stale', body: 'Leads arrive by email and never reach the list. Automate capture, or set ten minutes a day to add them.' },
    { title: 'Two people, one sheet', body: 'Edits overwrite each other and there is no history. Move to an app with records and a change log.' },
  ],
  faqs: [
    { q: 'Can Google Sheets be a CRM?', a: 'Yes, for one person or a small team with a few dozen open leads. Add the fields above, dropdowns for stage and source, and a Follow up view sorted by date.' },
    { q: 'What columns should a simple CRM have?', a: 'Name, email, phone, company, source, stage, deal size, last contact, next follow-up and notes. Add more only when you make a decision with them.' },
    { q: 'When should I move to a real CRM?', a: 'When several people work the same leads, when you need email tracking and sequences, or when follow-ups keep slipping despite the sheet.' },
  ],
  sources: [
    { label: 'HubSpot: How to build a CRM in Google Sheets (updated 16 Dec 2025)', href: 'https://blog.hubspot.com/sales/crm-google-sheets' },
    { label: 'Zapier: Spreadsheet CRM template', href: 'https://zapier.com/blog/spreadsheet-crm' },
    { label: 'Google: Create a dropdown list in Sheets', href: 'https://support.google.com/docs/answer/186103' },
  ],
  related: ['how-to-automate-lead-follow-up-from-gmail', 'how-to-build-an-app-from-google-sheets', 'internal-tools-without-code-what-to-build-first'],
};

export default g;
