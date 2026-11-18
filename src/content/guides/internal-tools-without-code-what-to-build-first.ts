// Guide 23 (pages-brief B5). Research: Lovable, Superblocks, Hostinger and DEV results for "internal tools without code",
// read 19 Nov 2026. 50agents: the app builder (lists, views, crew, Review, Data export) in app/src/features/apps/CLAUDE.md.
import type { Guide } from './types';

const g: Guide = {
  slug: 'internal-tools-without-code-what-to-build-first',
  n: 23,
  group: 'Apps',
  kind: 'app',
  title: 'Internal tools without code: what to build first | 50agents',
  description:
    'Which internal tool to build first without code: score your spreadsheets and inbox routines by how often, how many people and how costly a miss is. A worked list.',
  h1: 'Internal tools without code: what to build first',
  short:
    'Build first the tool that replaces a spreadsheet or inbox routine several people touch every day and that costs money when something is missed, such as a requests desk, an invoice tracker or a lead list. Keep version one to one list, two or three views and one automatic step, and name who owns it before anyone else uses it.',
  published: '2026-11-19',
  updated: '2026-11-19',
  sections: [
    {
      id: 'score',
      h2: 'Score your candidates',
      body: [
        { p: 'List every spreadsheet, shared inbox or "send me a message when" routine your team runs. Score each 1 to 3 on four questions and build the highest total first.' },
        {
          table: {
            head: ['Question', '1', '3'],
            rows: [
              ['How often is it touched?', 'Monthly', 'Several times a day'],
              ['How many people touch it?', 'Just you', 'The whole team'],
              ['What does a miss cost?', 'An annoyance', 'Money or a customer'],
              ['How messy is it now?', 'Tidy sheet', 'Five tabs, colour codes, "ask Sam"'],
            ],
          },
        },
      ],
    },
    {
      id: 'candidates',
      h2: 'Good first tools',
      body: [
        {
          table: {
            head: ['Tool', 'Replaces', 'The automatic step that earns it'],
            rows: [
              ['Customer requests desk', 'A shared inbox and a "who’s got this?" chat', 'Each new email sorted by kind and priority'],
              ['Invoice tracker', 'A sheet of invoices with coloured cells', 'A reminder drafted when one goes late'],
              ['Lead list', 'Leads in email threads and notes', 'New enquiries added from email each morning'],
              ['Approvals (spend, leave, discounts)', 'Requests by message and a reply "ok"', 'The approver gets one list, the asker gets a status'],
              ['Onboarding checklist', 'A document copied for each new client or hire', 'Tasks created and assigned on day one'],
            ],
            caption: 'Lovable’s guide suggests a similar first list: lead trackers, approval and request flows, onboarding checklists and dashboards that replace a manual report ([Lovable](https://lovable.dev/guides/how-to-build-an-internal-tool-without-code)).',
          },
        },
      ],
    },
    {
      id: 'steps',
      h2: 'How to build the first one, step by step',
      body: [
        {
          steps: [
            { title: 'Define the record before the screens', body: 'What is one item (a request, an invoice, a lead) and which fields does it need? Screens built before the data model get rebuilt.' },
            { title: 'Pick two or three views', body: 'The view you work from daily, a board by status, and everything. Not ten.' },
            { title: 'Add one automatic step', body: 'The one that removes the most typing or the most forgetting. Add the second only after a week of use.' },
            { title: 'Set access properly', body: 'A shared link is not access control. Add people by account and decide who can edit.' },
            { title: 'Name an owner', body: 'One person who fixes it when it breaks and decides what changes. Tools without an owner rot.' },
            { title: 'Retire the old way', body: 'Archive the sheet or the label. Two systems for one job means the new one loses.' },
          ],
        },
      ],
    },
    {
      id: 'example',
      h2: 'What it looks like in 50agents',
      body: [
        { p: 'In 50agents an internal tool is an app: you describe it to Captain and it builds the list, the views and the numbers, plus a crew of up to three members (AI agents or browser agents) with duties such as "sorts each new request". Each change you ask for is a version you can undo, Review checks the app each week and suggests fixes, and Data exports any list as CSV, so the tool never traps your records.' },
        { ask: 'Help me answer customer requests' },
        {
          view: {
            type: 'app',
            face: ['writer'],
            name: 'Customer requests',
            status: 'Live · 41 requests',
            rail: ['Overview', 'Desk', 'Urgent', 'All requests'],
            on: 'Urgent',
            numbers: [['Open', '12'], ['Late', '2', true], ['Urgent', '3', true]],
            table: {
              head: ['Subject', 'Customer', 'Status', 'Answer by'],
              rows: [
                ['Charged twice in November', 'Lumen Dental', 'Waiting on us', '20 Nov'],
                ['Site down after update', 'Northgate Physio', 'New', '20 Nov'],
                ['Wrong order shipped', 'Maple & Co. Bakery', 'Waiting on us', '20 Nov'],
              ],
            },
          },
          caption: 'An internal tool built in 50agents: the Urgent view of a customer requests app, soonest answer-by date first. Example data.',
        },
      ],
    },
  ],
  wrong: [
    { title: 'Version one does everything', body: 'Ten views, five automations, nobody uses it. Ship one list, two views, one automatic step.' },
    { title: 'Screens before data', body: 'The fields change and every screen breaks. Define the record first.' },
    { title: 'No owner', body: 'It breaks in month three and nobody fixes it. Name an owner on day one.' },
    { title: 'Everyone sees everything', body: 'Salaries or customer details open to the whole team. Set roles before you invite.' },
    { title: 'The old sheet lives on', body: 'Half the team keeps using it. Archive it the day the tool goes live.' },
  ],
  faqs: [
    { q: 'What internal tools should a small team build first?', a: 'The one replacing a daily, shared routine where a miss costs money: usually a requests desk, an invoice tracker or a lead list.' },
    { q: 'No-code or low-code for internal tools?', a: 'No-code when the tool is lists, views and simple automatic steps. Low-code when you need custom logic or many integrations a developer will maintain.' },
    { q: 'How do I stop an internal tool from becoming a mess?', a: 'One owner, a short list of fields, and a rule that every new view or step replaces something, not adds to it.' },
  ],
  sources: [
    { label: 'Lovable: How to build an internal tool without code', href: 'https://lovable.dev/guides/how-to-build-an-internal-tool-without-code' },
  ],
  related: ['how-to-build-an-app-from-google-sheets', 'how-to-build-a-customer-requests-desk-from-your-inbox', 'what-to-automate-first-in-a-small-business'],
};

export default g;
