// Use case 6 (pages-brief B1): track customer requests from email. An app.
// Every product fact comes from the 50agents app's requests recipe (app/src/features/apps/recipes.ts, read 19 Nov 2026):
// the questions (build.ts TOOLS, then the slots), the list's fields and statuses, the three views, the Overview numbers and
// the Desk's two duties (sorts each new request; drafts a reply to each question, asks before sending). The recipe has no
// duty that reads Gmail by itself, so the page says to ask for one. Importer: one record per email (importer.ts).
// Research: scratchpad research-B, read 19 Nov 2026.
import type { UseCase } from '@/site/types';
import { chips, iconOf } from './catalog';

const page: UseCase = {
  slug: 'customer-requests-desk',
  kind: 'app',
  title: 'Track customer requests from email, to solved | 50agents',
  description:
    'To track customer requests from email, tell Captain "Keep track of customer requests and draft the replies": a desk by status, urgent first, replies drafted.',
  h1: 'Track customer requests from email until they are solved',
  answer: [
    'To track customer requests from your email, tell Captain "Keep track of customer requests and draft the replies" in 50agents.',
    'It builds a requests desk where every request has a status, a priority and an answer-by date, urgent ones first, with an AI agent that sorts each new request and drafts a reply to each question for you to approve.',
  ],
  ask: 'Keep track of customer requests and draft the replies',
  updated: '2026-11-19',
  published: '2026-11-19',
  promises: ['Every request kept until it is solved', 'Urgent ones first, with an answer-by date', 'Replies go only after your OK'],
  plan: {
    mode: 'building an app',
    name: 'Customer requests',
    line: 'A desk for every request, the urgent ones first',
    faces: ['sorter'],
    rows: [
      { label: 'Views', value: 'Desk · Urgent · All requests' },
      { label: 'Numbers', value: 'Open · Late · Urgent · Solved this week' },
      { label: 'Crew', value: 'Desk, an AI agent: sorts each request, drafts replies, asks before sending any email', face: 'sorter' },
    ],
  },
  heroQuestion: 1,
  factsLabel: 'Support requests, in numbers',
  facts: [
    {
      figure: '62%',
      text: 'of customers expect a reply to an email within 24 hours, a Statista figure quoted by ProProfs Help Desk.',
      source: 'ProProfs Help Desk blog, 15 Oct 2025',
      href: 'https://www.proprofsdesk.com/blog/track-customer-requests/',
      read: '19 Nov 2026',
    },
    {
      figure: '4 days',
      text: 'after a ticket is marked Solved, Zendesk closes it for good, and a customer reply before then reopens it. Its statuses run New, Open, Pending, On-hold, Solved, Closed.',
      source: 'Zendesk help center (undated)',
      href: 'https://support.zendesk.com/hc/en-us/articles/8263915942938',
      read: '19 Nov 2026',
    },
  ],
  seeIt: {
    h2: 'What you get: a requests desk that sorts and answers',
    intro: 'This is the app Captain builds from that sentence, shown with example requests. Switch between the overview, with a reply waiting for your OK, the desk by status and the Urgent list, earliest answer-by date first.',
  },
  view: {
    type: 'desk',
    desk: {
      name: 'Customer requests',
      faces: ['sorter'],
      count: 'Live · 14 requests',
      add: '+ Add request',
      views: ['Overview', 'Desk', 'Urgent'],
      rest: ['All requests', 'Crew · 1', 'Review', 'Data · 14', 'Setup', 'Memory'],
      numbers: [
        { label: 'Open', value: '9' },
        { label: 'Late', value: '2', warn: true },
        { label: 'Urgent', value: '3' },
        { label: 'Solved this week', value: '5' },
      ],
      asks: 'Desk asks you',
      waiting: '2 waiting',
      need: {
        by: 'Desk', face: 'sorter', where: 'Customer requests', ago: '4 min ago',
        title: 'Email Omar Farouk',
        rows: [{ label: 'To', value: 'omar@brightline.example' }, { label: 'Subject', value: 'Re: How do I add a second location?' }],
        body: [
          'Hi Omar,',
          'You can add a second location under Settings, Locations, Add location. Each location gets its own opening hours and booking link, and both show on your one account.',
          'If you want, send me the address and hours and I will check it is set up the way you need.',
          'Best,\nRiya, Support',
        ],
        actions: ['Approve and send', 'Change', 'Decline'],
      },
      crew: [
        { face: 'sorter', name: 'Desk', tint: '#E2E9FF', line: 'Sorts each new request (kind, priority, answer-by date), and drafts a reply to each question from what your business knows. Asks before sending any email.' },
      ],
      board: [
        { name: 'New', tone: '#EEF3FF', dot: '#3355CC', count: 2, cards: [{ b: 'Invoice shows wrong VAT number', lines: ['Lumen Dental', 'Urgent', 'Answer by: Nov 20'] }, { b: 'Can you open Sundays?', lines: ['Harbor Yoga', 'Low', 'Answer by: Nov 21'] }] },
        { name: 'Waiting on us', tone: '#FFF1EC', dot: '#B4410B', count: 3, cards: [{ b: 'Booking page not loading', lines: ['Cobalt Fitness', 'Urgent', 'Answer by: Nov 19'] }, { b: 'How do I add a second location?', lines: ['Brightline Physio', 'Normal', 'Answer by: Nov 21'] }] },
        { name: 'Waiting on them', tone: '#F1EEFF', dot: '#6C5CE7', count: 4, cards: [{ b: 'Refund for double charge', lines: ['Pinecone Coffee', 'Urgent', 'Answer by: Nov 18'] }, { b: 'Change of billing email', lines: ['Fieldnote Media', 'Normal', 'Answer by: Nov 20'] }] },
        { name: 'Solved', tone: '#EDF7F1', dot: '#17703F', count: 5, cards: [{ b: 'Export last month’s bookings', lines: ['Riverside Clinic', 'Normal', 'Answer by: Nov 17'] }] },
      ],
      table: {
        search: 'Search requests',
        shown: '3 of 14',
        cols: ['Subject', 'Customer', 'Answer by ↑', 'Status'],
        rows: [
          { cells: ['Refund for double charge', 'Pinecone Coffee', 'Nov 18'], flag: '1 day late', pill: 'Waiting on them' },
          { cells: ['Booking page not loading', 'Cobalt Fitness', 'Nov 19'], flag: 'Today', pill: 'Waiting on us', pillTone: 'warn' },
          { cells: ['Invoice shows wrong VAT number', 'Lumen Dental', 'Nov 20'], pill: 'New' },
        ],
      },
    },
  },
  howH2: 'How it tracks a customer request to solved, step by step',
  questions: [
    { q: 'Which apps do you use for this today?', choices: ['Gmail', 'Google Sheets', 'None yet'], picked: 'Gmail' },
    { q: 'Where do requests come in?', choices: ['Email', 'A form on my website', 'WhatsApp', 'I add them by hand'], picked: 'Email' },
    { q: 'Should replies go out from your email?', choices: ['Yes, after I approve each one', "No, I'll reply myself"], picked: 'Yes, after I approve each one' },
  ],
  steps: [
    { title: 'You ask, Captain asks back', body: 'Captain asks three things: the apps you use, where requests come in, and whether replies should go out from your email. Answer Email, and say which address, so its plan includes bringing them in.' },
    { title: 'It builds your requests desk', body: 'One list of requests with subject, customer, email, status, priority, kind and an answer-by date. Three views: the Desk board by status, Urgent (not solved, earliest answer-by first) and All requests.' },
    { title: 'Desk sorts each new request', body: 'As a request lands on the desk, Desk sets its kind (question, problem, request or complaint) and its priority. Urgent is for something broken, money at stake or an upset customer; it is due tomorrow, the rest in 2 days.' },
    { title: 'It drafts a reply to each question', body: 'For a question it writes a short reply from what your business knows. When it is not sure of the answer it does not guess: it notes on the request what it would need to know.' },
    { title: 'You approve, the status moves', body: 'The reply waits in Needs you. Once it is sent, Desk sets the request to Waiting on them and notes what it wrote. You mark it Solved when it is done, and the Overview counts what is open, late and urgent.' },
  ],
  uses: [
    { app: 'gmail', icon: iconOf('gmail'), name: 'Gmail', why: 'Where requests are read from, when your plan brings them in, and where each approved reply goes out, from your own address.', chips: chips('gmail', ['Search_Email_Messages', 'Reply To Thread', 'Send Email']) },
    { app: 'file', name: 'Requests you already have', why: 'Bring in what is open now: type one in, paste a table, or drop a CSV or Excel file and Captain matches the columns.', chips: ['Add by hand', 'Paste a table', 'CSV or Excel'] },
  ],
  usesNote: 'Gmail’s actions as listed in viaSocket’s catalog of 2,300+ apps, read 19 Nov 2026.',
  asksFirst:
    'Every reply to a customer. Sorting, setting priorities and notes happen on your own desk, so they run on their own. A reply reaches someone outside, so it waits in Needs you with the customer, the subject and the full text.',
  table: {
    h2: 'The four statuses, and what each one means',
    label: 'Request statuses',
    cols: ['Status', 'What it means (Zendesk’s name)', 'Ask Captain'],
    intro: 'Each request sits in one status until it is solved. They match the ones help desks use, minus On-hold, which one sentence adds.',
    rows: [
      { when: 'New', tone: 'Just in, not looked at yet (New)', ask: '' },
      { when: 'Waiting on us', tone: 'Our move: answer or fix it (Open)', ask: '' },
      { when: 'Waiting on them', tone: 'We replied; the customer’s move (Pending)', ask: '' },
      { when: 'Solved', tone: 'Done; drops off Urgent and Late (Solved)', ask: '' },
      { when: 'On hold', tone: 'Waiting on a supplier or a third party (On-hold)', ask: 'Add an On hold status for requests waiting on a supplier' },
    ],
    note: 'In Zendesk a customer reply moves a pending ticket back to open; here, ask Captain for the same rule if you want it.',
    sources: [{ label: 'Zendesk ticket statuses', href: 'https://support.zendesk.com/hc/en-us/articles/8263915942938' }],
  },
  yoursIntro: 'Say it your way. Each of these builds a different desk; copy one into Captain.',
  variations: [
    'Keep track of customer requests from support@ in my Gmail every morning and draft the replies',
    'Keep track of customer requests and draft the replies, and mark anything about refunds Urgent',
    "Keep track of customer requests, but I'll reply myself",
    'Keep track of customer requests and draft the replies, and move a request back to Waiting on us when the customer replies',
  ],
  limits: [
    'Out of the box the desk sorts and answers what is on it; it does not read your inbox by itself. Say where requests come in and check that Captain’s plan shows a duty that brings them in from Gmail before you tap Build it.',
    'A file import keeps one request per customer email address. Add a second request from the same customer by hand.',
    'Replies go out by email from Gmail only, not WhatsApp, even if you pick WhatsApp as where requests come in.',
    'It is one shared desk without assignment to people, SLA timers or reports. A help desk does those.',
  ],
  otherWaysH2: 'Other ways to track customer requests from email',
  otherWays: [
    {
      title: 'Gmail labels and stars',
      body: 'A label per status and a star for urgent works for a few requests a week. Gmail has no status, priority or due date of its own, so nothing tells you a request is late.',
    },
    {
      title: 'A shared inbox inside Gmail',
      body: 'Hiver adds statuses (Open, Pending, Closed), assignment and alerts when a reply is overdue, inside Gmail. If two or more people answer requests, that is the better fit.',
      sources: [{ label: 'Hiver in Gmail', href: 'https://hiverhq.com/products/hiver-in-gmail' }],
    },
    {
      title: 'A sheet with Zapier',
      body: 'Zapier’s "Create support tracker rows from labeled support emails" adds a row for each labelled email. Every row starts as Open, with no priority, and you keep the rest up to date by hand.',
      sources: [{ label: 'Zapier', href: 'https://zapier.com/automations/customer-service-success/omnichannel-support/email-to-ticket-conversion/create-support-tracker-rows-from-labeled-support-emails' }],
    },
  ],
  faqs: [
    { q: 'How do I track customer requests in Gmail without a help desk?', a: 'Give each request a record with a status and a date to answer by, outside the inbox, and check the late ones daily. This desk does that, with an AI agent that sorts each request and drafts the replies.' },
    { q: 'How is this different from an AI agent that drafts replies?', a: 'The desk keeps every request as a record until it is solved: status, priority, an answer-by date, what was sent. An AI agent that drafts replies answers email and keeps nothing, which is enough if every question is a one-reply answer.' },
    { q: 'How does it decide what is urgent?', a: 'Urgent when something is broken, money is at stake or the customer is upset; otherwise Normal or Low. Urgent requests are due tomorrow and the rest in 2 days. Change the rule in one sentence, for example "anything about refunds is urgent".' },
    { q: 'Will it reply to customers without asking me?', a: 'No. Every reply waits in Needs you until you approve, change or decline it. If you answer "No, I’ll reply myself", it drafts nothing to send.' },
  ],
  related: [
    { href: '/use-cases/ai-replies-to-support-email', kind: 'ai', title: 'AI replies to support email', line: 'Only need replies drafted? A lighter AI agent, no desk.' },
    { href: '/use-cases/lead-tracker-from-your-inbox', kind: 'app', title: 'Lead tracker from your inbox', line: 'The same kind of desk, for people who might buy.' },
    { href: '/use-cases/chase-unpaid-invoices', kind: 'app', title: 'Chase unpaid invoices', line: 'An invoices desk with reminders drafted.' },
  ],
  up: [
    { href: '/apps', label: 'Apps you can build' },
    { href: '/integrations/gmail', label: 'Gmail' },
    { href: '/guides/how-to-build-a-customer-requests-desk-from-your-inbox', label: 'How to build a customer requests desk from your inbox' },
  ],
  finalH2: 'Start your requests desk',
  byline: 'Captain builds this from the customer requests recipe in the 50agents app; the views above are drawn from that app, filled with example data.',
};

export default page;
