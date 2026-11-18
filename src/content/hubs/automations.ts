// Hub 14 (pages-brief B2): /automations, for "workflow automation for small business".
// Product facts: app/PRODUCT.md, app/src/features/automations/CLAUDE.md, product/problem-ledger.md (P43, P46, P48), read 19 Nov 2026.
// Competitors: zapier.com/pricing, make.com/en/pricing and make.com/en/compare/make-vs-zapier, n8n.io/pricing, read 19 Nov 2026.
import type { Hub } from './types';
import { ICONS } from './apps-icons';

const hub: Hub = {
  kind: 'auto',
  path: '/automations',
  crumb: 'Automations',
  title: 'Workflow automation for small business | 50agents',
  description:
    'Say "when X happens, do Y" and Captain builds the automation, tests it on your real data with sends held back, and turns it on when you say so.',
  h1: 'Workflow automation you describe in one sentence',
  answer: [
    'An automation in 50agents runs the same steps every time something happens or a schedule comes round, such as adding every new Stripe payment to your Google Sheet.',
    'You say what should happen in one sentence; Captain works out the steps in your real apps, tries them on your real data with every send held back, and nothing runs until you tap Make it live.',
  ],
  promises: ['Tested on your real data before it runs', 'Sends to other people ask each time', 'Pauses itself at 0 credits'],
  hero: {
    ask: 'Set up an automation: every new Stripe payment is added as a row to my Google Sheet with the customer, amount and date',
    plan: [
      { label: 'Kind', value: 'Automation' },
      { label: 'Starts', value: 'A new payment in Stripe' },
      { label: 'Does', value: 'Adds a row: customer, amount, date' },
      { label: 'Asks first', value: 'Nothing: the row is in your own sheet' },
    ],
  },
  view: {
    h2: 'An automation, drawn as its track',
    p: 'One picture of the automation is used while it is built, tested and live: a card per start and step with the app\'s icon, and the data each hands on as chips below it. Here is the Stripe-to-Sheets automation with example data.',
  },
  can: [
    'Start on an app event (a new Gmail email, a new Stripe payment), on a schedule, every 1 to 12 hours, or on a call to its own address.',
    'Chain steps of five sorts: a filter, an app action, an AI step, a calculation with no AI, and a wait.',
    'Use AI only in a step that needs it, such as sorting an email or writing a reply. When the AI step is unsure, the case goes to the automation working as an AI agent.',
    'Read real data while it is being planned, so each read step says what it found before you build it.',
    'End the build as a draft: it is tested on your real data with every send held back, and it runs only after you tap Make it live.',
    'Write to your own tools on its own (a row, a label, a contact) and ask first, each run, before it sends to anyone else.',
    'Pause itself when your credits reach 0 and pick up again when you add more.',
  ],
  cant: [
    'Read more than 25 items in one step per run. viaSocket stops a step after about 58 seconds, so a bigger batch is read 25 at a time.',
    'React to a new Gmail email the second it lands. viaSocket checks Gmail for new mail about every 15 minutes.',
    'Start another automation, or remember what it did on its last run. Both wait on viaSocket documenting how.',
    'Use "since the last run" as its window. A window is a number of hours, or since a time of day such as midnight.',
    'Take changes on its track directly. Settings there are read-only; you change it by saying what you want in its chat.',
    'Be built in seconds. Planning takes a minute or two, and so does a change you ask for in its chat.',
  ],
  limitsNote:
    'From the 50agents app\'s automations source and its problem ledger (P43, P46, P48), read 19 Nov 2026.',
  ucIntro: 'Three of the twelve ready-made starts are automations: each moves the same data from one app to another, every time.',
  apps: {
    intro: 'The apps in the automation starts. Any trigger or action in viaSocket\'s catalog of 2,300+ apps can be a step.',
    list: [
      { name: 'Google Sheets', icon: ICONS['Google Sheets'], why: 'Where rows land: every payment, order or new contact.' },
      { name: 'Stripe', icon: ICONS.Stripe, why: 'A new payment starts the run.' },
      { name: 'Shopify', icon: ICONS.Shopify, why: 'A new order starts the run, with its items and total.' },
      { name: 'HubSpot', icon: ICONS.HubSpot, why: 'A new contact starts the run.' },
      { name: 'Slack', icon: ICONS.Slack, why: 'Where a new contact is posted for the team.' },
    ],
  },
  others: {
    intro: 'The tools most people compare for small-business automation. Facts read on each vendor\'s pricing page on 19 Nov 2026.',
    list: [
      {
        name: 'Zapier',
        href: 'https://zapier.com/pricing',
        plan: 'Free with 100 tasks a month; Professional $19.99 a month billed yearly ($29.99 monthly) for 750 tasks.',
        better: 'A much larger app directory than 2,300+, and years of ready-made Zaps to copy.',
        note: 'You build each Zap step by step; in 50agents Captain builds it from your sentence and tests it on your data.',
      },
      {
        name: 'Make',
        href: 'https://www.make.com/en/compare/make-vs-zapier',
        plan: 'Free with 1,000 credits a month; Core from $9 a month for 10,000 credits.',
        better: 'A visual canvas for branching scenarios, and SOC 2 Type II stated on its site.',
        note: 'Worth it if you like building on a canvas. 50agents has no canvas; you change an automation by talking to it.',
      },
      {
        name: 'n8n',
        href: 'https://n8n.io/pricing',
        plan: 'No free cloud plan; Starter is €20 a month billed yearly for 2,500 executions. The self-hosted version is free.',
        better: 'You can run it on your own server and write code in any step.',
        note: 'Suits technical teams. 50agents runs on viaSocket and cannot be self-hosted.',
      },
    ],
  },
  faqs: [
    {
      q: 'What is workflow automation for a small business?',
      a: 'Software that does a repeated job between your apps without you: every new order logged, every new lead posted, every Friday report sent. Start with a job you do the same way at least weekly, where a mistake is cheap to fix.',
    },
    {
      q: 'How do I start an automation in 50agents?',
      a: 'Say what should happen, for example "every new Shopify order is added as a row to my Google Sheet with its items and total". Captain asks only what it cannot guess, such as which sheet, plans the steps, tests them on your real data and leaves the automation as a draft until you make it live.',
    },
    {
      q: 'Does every run use AI?',
      a: 'No. The fixed steps run without AI. An AI step is added only where a step needs judgement, such as sorting an email, and only that step uses AI credits.',
    },
    {
      q: 'What happens when a step fails?',
      a: 'Every step after a failed one is skipped, so nothing goes out after a mistake. The run shows the error in the app\'s own words, with Fix with Captain, and Care is told.',
    },
    {
      q: 'Will an automation email my customers without asking?',
      a: 'No. A send to anyone other than you asks first on every run, in Needs you. Sends to your own address and writes to your own tools, such as a row in your sheet, run on their own.',
    },
  ],
  related: [
    { label: 'How to automate data entry between two apps', href: '/guides/how-to-automate-data-entry-between-two-apps' },
    { label: 'What to automate first in a small business', href: '/guides/what-to-automate-first-in-a-small-business' },
    { label: 'Zapier vs Make vs n8n for a small team', href: '/guides/zapier-vs-make-vs-n8n-for-a-small-team' },
    { label: 'What is a trigger?', href: '/learn/trigger' },
    { label: 'What is a workflow?', href: '/learn/workflow' },
    { label: 'Zapier alternatives', href: '/compare/zapier-alternatives' },
  ],
  final: {
    h2: 'Describe your first automation',
    p: 'Start with "every new ... is added to ...". Captain tests it on your real data before it runs. Every workspace starts free with 2,000 credits.',
    cta: 'Build an automation with Captain',
  },
  updated: '2026-11-19',
};

export default hub;
