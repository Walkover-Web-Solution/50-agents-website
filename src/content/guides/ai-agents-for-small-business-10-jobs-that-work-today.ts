// Guide 6 (pages-brief B5). Research: US Chamber of Commerce "Empowering Small Business" 2026 (PDF), US Census Bureau
// BTOS story (May 2026), Lindy, Botpress and rework results for "ai agents for small business", read 19 Nov 2026.
// The 10 jobs are the 50agents templates (app/src/features/templates/list.ts) plus the app recipes; each is live today.
import type { Guide } from './types';
import { APPS } from './apps';

const g: Guide = {
  slug: 'ai-agents-for-small-business-10-jobs-that-work-today',
  n: 6,
  group: 'AI agents',
  kind: 'ai',
  title: 'AI agents for small business: 10 jobs that work today',
  description:
    'Ten jobs small businesses hand to AI agents and automations today, from email triage to chasing invoices, with the apps each needs and what each cannot do yet.',
  h1: 'AI agents for small business: 10 jobs that work today',
  short:
    'The jobs that work today are narrow and repeated: drafting email replies, following up quiet leads, chasing late invoices, summarising last week’s sales, logging payments and orders, and watching competitors’ prices. Each reads from apps you already use and asks before it sends anything; jobs that need a phone call, a signature or a judgement you could not explain to a new hire are not ready yet.',
  published: '2026-11-19',
  updated: '2026-11-19',
  sections: [
    {
      id: 'numbers',
      h2: 'How many small businesses use AI now',
      body: [
        { p: 'Two surveys, two very different numbers, and both are right about what they measure. The US Chamber of Commerce found 66% of small businesses use AI in 2026, up from 23% in 2023, and 24% use an "agentic" AI tool; it surveyed 3,732 businesses with fewer than 250 staff in July and August 2026 ([US Chamber](https://www.uschamber.com/assets/documents/Empowering-Small-Business-The-Impact-of-Technology-on-U.S.-Small-Business-Small-Business-Report-2026.pdf)).' },
        { p: 'The US Census Bureau puts it at 19.8% of all firms as of May 2026, and under 20% for firms with 1 to 4 staff ([Census Bureau](https://census.gov/library/stories/2026/05/ai-use-businesses.html)). It asks whether AI was used in a business function in the past two weeks, a much stricter question than "do you use any AI tool".' },
        { note: 'Read together: most owners have tried AI, and far fewer have it doing a job every week. The jobs below are the ones that make that jump.' },
      ],
    },
    {
      id: 'jobs',
      h2: 'The 10 jobs',
      body: [
        {
          table: {
            head: ['Job', 'Kind', 'Apps', 'What it does'],
            rows: [
              ['Morning email triage', 'AI agent', 'Gmail', 'Reads unread email each weekday at 8:00 and drafts replies for you to check.'],
              ['Support replies', 'AI agent', 'Gmail', 'Drafts answers to support email from what it knows about your business; asks before sending.'],
              ['Follow up quiet deals', 'AI agent', 'HubSpot, Gmail', 'Finds deals with no reply in 5 days and drafts a follow-up.'],
              ['Weekly revenue summary', 'AI agent', 'Stripe, Gmail', 'Every Monday, emails you last week’s totals and what changed.'],
              ['Tomorrow’s meetings', 'AI agent', 'Google Calendar, Slack', 'Each evening, sends you tomorrow’s meetings.'],
              ['Chase unpaid invoices', 'App', 'Gmail', 'A desk of what you are owed, late first, with reminders drafted.'],
              ['Track leads', 'App', 'Gmail', 'A pipeline filled from your email, with who to follow up today.'],
              ['Customer requests desk', 'App', 'Gmail', 'Every request by status, urgent first, replies drafted.'],
              ['Log payments and orders', 'Automation', 'Stripe or Shopify, Google Sheets', 'Each payment or order becomes a row, the same way every time.'],
              ['Watch competitor prices', 'Browser agent', 'None, it reads websites', 'Checks pricing pages each morning and tells you what changed.'],
            ],
            caption: 'Each job is a ready-made starting point in 50agents today. The kinds are explained in [AI agent vs automation](/guides/ai-agent-vs-automation-which-one-you-need).',
          },
        },
      ],
    },
    {
      id: 'not-yet',
      h2: 'What does not work yet',
      body: [
        {
          ul: [
            '**Phone calls and voice.** Booking by phone or answering calls needs voice tools most small teams do not run.',
            '**Signing, paying or committing for you.** Contracts, payments and refunds should always wait for a person; any honest tool will ask.',
            '**Judgement you cannot write down.** If you cannot explain to a new hire when to give a discount, an AI agent cannot do it either.',
            '**Systems with no app and a login wall.** Some can be reached by a browser agent with your sign-in; some cannot, and scraping behind a login has its own legal risk.',
          ],
        },
      ],
    },
    {
      id: 'steps',
      h2: 'How to start with one, step by step',
      body: [
        {
          steps: [
            { title: 'Pick the job you did three times this week', body: 'Frequency beats size. A 10-minute job done daily saves more than a 2-hour job done quarterly. [What to automate first](/guides/what-to-automate-first-in-a-small-business) has a scoring sheet.' },
            { title: 'Check its apps are ones you use', body: 'The jobs above run on Gmail, Google Sheets, Slack, HubSpot, Stripe, Shopify and Google Calendar. If yours are different, check the tool connects to them.' },
            { title: 'Keep the first version read-and-draft', body: 'Let it read and draft; you send. Move to fewer approvals once its drafts need no edits.' },
            { title: 'Give it a week, then decide', body: 'Count the minutes it saved and the drafts you threw away. Keep it, fix the instructions, or switch it off.' },
          ],
        },
      ],
    },
    {
      id: 'example',
      h2: 'A worked example: the weekly revenue summary',
      body: [
        { p: 'Here is one of the ten built in 50agents. You tell Captain the sentence below; it plans an AI agent with Stripe and Gmail, shows you the plan, and builds it on your yes. Each Monday it reads last week’s payments and writes what changed, in words, not a table dump.' },
        { ask: 'Set up an AI agent that reads last week\'s payments in Stripe every Monday at 9:00 and emails me the totals and what changed' },
        {
          view: {
            type: 'agent',
            face: 'ledger',
            name: 'Weekly revenue summary',
            kindWord: 'AI agent',
            status: 'Live · every Monday at 9:00',
            latest: {
              title: 'Week of 10 Nov: $18,420, up 12%',
              when: 'Monday 9:02, on schedule',
              summary: '64 payments, $18,420 in total, up 12% on the week before. Two refunds ($120).',
              body: ['Most of the rise came from 3 annual plans renewed on Thursday.', 'Average payment: $288, up from $262.', 'Emailed to you at owner@fernhill.example.'],
              state: 'Done',
            },
            runs: [
              { title: 'Week of 3 Nov: $16,445, down 4%', when: '10 Nov', state: 'Done' },
              { title: 'Week of 27 Oct: $17,130, up 6%', when: '3 Nov', state: 'Done' },
            ],
          },
          caption: 'The AI agent’s page in 50agents: its latest report and earlier runs. By default its email waits in Needs you for your yes; you can give an AI agent more freedom in its settings once you trust it. Example data.',
        },
      ],
    },
  ],
  wrong: [
    { title: 'Starting with the hardest job', body: 'The job you dread is usually the one with the most judgement. Start with a frequent, dull one and build trust.' },
    { title: 'Five AI agents in week one', body: 'Each needs a week of checking. Add the next one when the last one runs without edits.' },
    { title: 'Nobody reads the reports', body: 'An AI agent whose output nobody reads is a cost. Put its reports where you already look: your inbox, Slack, one approvals screen.' },
    { title: 'Costs you did not expect', body: 'AI agents that read whole inboxes or run every few minutes spend more. Check the cost of one run before you schedule it.' },
    { title: 'Customer data in a new tool', body: 'An AI agent that reads customer email moves that data through another service. Read the tool’s data terms before you connect anything sensitive.' },
  ],
  faqs: [
    { q: 'What is the best AI agent for a small business?', a: 'The one that does your most repeated job in the apps you already use. Start from the job, then pick the tool; [how to choose an AI agent builder](/guides/how-to-choose-an-ai-agent-builder) has the questions to ask.' },
    { q: 'How much do AI agents cost a small business?', a: 'Most tools charge by usage (credits, tasks or runs) on top of a plan. A daily AI agent that reads a few emails costs little; one that reads hundreds an hour does not. [How much automation costs](/guides/how-much-automation-costs-credits-tasks-and-runs-compared) compares the units.' },
    { q: 'Is my data safe with an AI agent?', a: 'It depends on what you connect and what it may do. Connect only what the job needs, keep sends behind approvals, and read the vendor’s data terms.' },
  ],
  sources: [
    { label: 'US Chamber of Commerce: Empowering Small Business, 2026 (PDF)', href: 'https://www.uschamber.com/assets/documents/Empowering-Small-Business-The-Impact-of-Technology-on-U.S.-Small-Business-Small-Business-Report-2026.pdf' },
    { label: 'US Census Bureau: AI use among businesses (26 May 2026)', href: 'https://census.gov/library/stories/2026/05/ai-use-businesses.html' },
  ],
  related: ['what-to-automate-first-in-a-small-business', 'how-to-build-an-ai-agent-without-code', 'how-to-choose-an-ai-agent-builder'],
};

export default g;
