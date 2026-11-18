// Guide 22 (pages-brief B5). Research: Google Groups Collaborative Inbox help, SupportBee, HappyFox, BoldDesk and Zoho
// results for "shared inbox vs help desk", read 19 Nov 2026. 50agents: the requests recipe (app/src/features/apps/recipes.ts).
import type { Guide } from './types';

const g: Guide = {
  slug: 'how-to-build-a-customer-requests-desk-from-your-inbox',
  n: 22,
  group: 'Apps',
  kind: 'app',
  title: 'Build a customer requests desk from your inbox | 50agents',
  description:
    'Turn your inbox into a requests desk: one record per request with status, priority and an answer-by date, a board by status, and replies drafted for approval.',
  h1: 'How to build a customer requests desk from your inbox',
  short:
    'Give every customer email that needs an answer its own record with a status (New, Waiting on us, Waiting on them, Solved), a priority and an answer-by date, and work from a board of those records instead of the inbox. You can do it with Gmail labels for a few a day, a shared inbox for a small team, or a desk app that pulls requests from email and drafts the replies.',
  published: '2026-11-19',
  updated: '2026-11-19',
  sections: [
    {
      id: 'options',
      h2: 'Three ways, by volume',
      body: [
        {
          table: {
            head: ['Setup', 'Fits', 'Gives you', 'Misses'],
            rows: [
              ['Gmail labels and stars', 'One person, a few requests a day', 'Free, nothing new to learn', 'No answer-by dates, no view of what is late'],
              ['A shared inbox (Google Groups Collaborative Inbox, Front, Hiver)', 'A small team', 'Assign to a person, mark done, filter unresolved ([Google](https://support.google.com/a/users/answer/167430))', 'Little reporting; priority lives in people’s heads'],
              ['A help desk (Zendesk, Freshdesk)', '10+ people, many channels', 'Tickets, SLAs, macros, reports', 'Cost and a migration; heavy for a small team'],
              ['A requests desk app', 'A small team that wants a desk without leaving email', 'Records from email, board by status, replies drafted', 'Not a full help desk: no live chat, no phone'],
            ],
          },
        },
        { p: 'SupportBee, which sells both, puts the line at about 10 support staff or 200 requests a day: below it a shared inbox works, above it a help desk pays off ([SupportBee](https://supportbee.com/blog/shared-inbox-vs-help-desk-which-does-your-team-need)). Its signs it is time to move: two people answering the same email, messages missed, and more time spent coordinating than answering.' },
      ],
    },
    {
      id: 'record',
      h2: 'What each request record holds',
      body: [
        {
          table: {
            head: ['Field', 'Values', 'Why'],
            rows: [
              ['Subject, Customer, Email', 'From the email', 'Who and what'],
              ['Status', 'New, Waiting on us, Waiting on them, Solved', 'Separates "we owe a reply" from "they do"'],
              ['Priority', 'Low, Normal, Urgent', 'Urgent only when something is broken, money is at stake or the customer is upset'],
              ['Kind', 'Question, Problem, Request, Complaint', 'Tells you what to fix in the product or the policy'],
              ['Answer by', 'A date', 'Tomorrow for urgent, two days for the rest'],
              ['Details', 'Long text', 'The ask in one line, plus what was done'],
            ],
            caption: 'These are the fields of the customer requests recipe in 50agents.',
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
            { title: 'Pick one address for requests', body: 'support@ or help@. Requests to personal inboxes get lost when someone is away.' },
            { title: 'Decide what becomes a request', body: 'A question, a problem, a change, a complaint. Not newsletters, invoices or sales pitches.' },
            { title: 'Create a record per request', body: 'By hand from a label, or automatically from new email. Keep the thread link on the record.' },
            { title: 'Sort each one', body: 'Kind, priority and answer-by date as it arrives. Rules first, then judgement for the unclear ones.' },
            { title: 'Work from the board', body: 'Waiting on us, oldest first, urgent at the top. The inbox becomes where replies go out, not where work is tracked.' },
            { title: 'Close the loop', body: 'Waiting on them for three days with no reply: a short check-in, then Solved.' },
          ],
        },
      ],
    },
    {
      id: 'example',
      h2: 'A worked example in 50agents',
      body: [
        { p: 'Captain builds this desk from one sentence. It asks where requests come in and whether replies should go out from your email, then builds the requests list, a Desk board by status, an Urgent view and the Overview numbers. Its AI agent, Desk, sorts each new request (kind, priority, answer-by date, a line on why) and drafts a reply to each question from what your business knows; if it is not sure of an answer it says what it would need instead of guessing. Every reply waits for your yes.' },
        { ask: 'Keep track of customer requests and draft the replies' },
        {
          view: {
            type: 'app',
            face: ['writer'],
            name: 'Customer requests',
            status: 'Live · 41 requests',
            rail: ['Overview', 'Desk', 'Urgent', 'All requests'],
            on: 'Desk',
            board: [
              { name: 'New', tone: '#EEF3FF', dot: '#3355CC', cards: [{ title: 'Invoice address change', lines: ['Cobalt Fitness', 'Low', 'Answer by 21 Nov'] }] },
              { name: 'Waiting on us', tone: '#FFF1EC', dot: '#B4410B', cards: [{ title: 'Charged twice in November', lines: ['Lumen Dental', 'Urgent', 'Answer by 20 Nov'] }, { title: 'Export my data', lines: ['Fieldnote Media', 'Normal', 'Answer by 21 Nov'] }] },
              { name: 'Waiting on them', tone: '#F1EEFF', dot: '#6C5CE7', cards: [{ title: 'Can I change my plan?', lines: ['Harbor Yoga', 'Normal'] }] },
              { name: 'Solved', tone: '#EDF7F1', dot: '#17703F', cards: [{ title: 'Password reset', lines: ['Pinecone Coffee', 'Normal'] }] },
            ],
            crew: { face: 'writer', name: 'Desk', word: 'AI agent', does: 'Sorts each new request and drafts a reply to each question from what your business knows. Asks you before sending any email.' },
          },
          caption: 'The Desk board of a customer requests app in 50agents, by status, with Desk, the AI agent that sorts requests and drafts replies. Example data.',
        },
      ],
    },
  ],
  pair: { href: '/use-cases/customer-requests-desk', label: 'Build it: a customer requests desk', line: 'The ready-made version, with the exact ask and what it asks you first.' },
  wrong: [
    { title: 'Two people answer the same email', body: 'Nobody could see who had it. Assign each request to one person, or have one person own the desk.' },
    { title: 'A thread splits', body: 'The customer replies with a new subject and it becomes a new request. Match on the customer’s email and merge.' },
    { title: 'Everything is urgent', body: 'Priority by gut feel drifts up. Write the rule for Urgent in one sentence and stick to it.' },
    { title: 'Forwarded requests lose the customer', body: 'A colleague forwards an email and the request shows the colleague as the customer. Read the original sender from the forwarded text.' },
    { title: 'Drafts that promise too much', body: 'An AI-drafted reply offers a refund you would not give. Keep policies in its memory, and review every draft before it goes.' },
  ],
  faqs: [
    { q: 'Shared inbox or help desk?', a: 'A shared inbox for a small team with modest volume; a help desk once you have many support staff, several channels or service-level targets to report on.' },
    { q: 'How do I stop two people replying to the same email?', a: 'Assign each conversation to one person. Google Groups’ Collaborative Inbox lets members take a conversation; a desk app shows each request’s owner and status.' },
    { q: 'How do I track open customer requests?', a: 'Give each one a record with a status and an answer-by date, and work from a view of everything Waiting on us, oldest first.' },
  ],
  sources: [
    { label: 'Google: Collaborative Inbox in Google Groups', href: 'https://support.google.com/a/users/answer/167430' },
    { label: 'SupportBee: Shared inbox vs help desk', href: 'https://supportbee.com/blog/shared-inbox-vs-help-desk-which-does-your-team-need' },
  ],
  related: ['how-to-draft-email-replies-with-ai-and-still-check-them', 'how-to-triage-your-inbox-with-ai', 'internal-tools-without-code-what-to-build-first'],
};

export default g;
