// Guide 27 (pages-brief B5). Pricing and unit rules read on each vendor's own pages on 19 Nov 2026: zapier.com/pricing and
// Zapier's task help article, make.com/en/pricing and help.make.com/credits, n8n.io/pricing. Make's paid prices and n8n's
// monthly-billing prices did not load and are left out. Research on the ranking pages (Zapier blog and others) the same day.
import type { Guide } from './types';
import { APPS } from './apps';

const g: Guide = {
  slug: 'zapier-vs-make-vs-n8n-for-a-small-team',
  n: 27,
  group: 'Choosing tools',
  kind: 'auto',
  title: 'Zapier vs Make vs n8n for a small team (Nov 2026) | 50agents',
  description:
    'Zapier vs Make vs n8n for a small team: Zapier is quickest to learn, Make shows branching visually, n8n charges per run and can self-host.',
  h1: 'Zapier vs Make vs n8n for a small team',
  short:
    'Pick Zapier if the team wants the quickest start and the widest choice of apps, Make if your workflows branch a lot and you like to see them as a diagram, and n8n if you have someone technical and want to pay per whole workflow run or host it yourself. The way each counts usage (tasks, credits, executions) matters more to your bill than the headline price.',
  published: '2026-11-19',
  updated: '2026-11-19',
  sections: [
    {
      id: 'table',
      h2: 'The three side by side',
      body: [
        {
          table: {
            head: ['', 'Zapier', 'Make', 'n8n (cloud)'],
            rows: [
              ['What you pay for', 'Tasks: one per successful action step', 'Credits: one per module operation, per item it handles', 'Executions: one per whole workflow run'],
              ['Free', '100 tasks a month; two-step Zaps; checks for new data every 15 minutes', '1,000 credits a month', 'A trial with 1,000 executions'],
              ['First paid plan', 'Professional: $19.99 a month billed yearly, $29.99 monthly, for 750 tasks', 'Could not verify today', 'Starter: €20 a month billed yearly, 2,500 executions'],
              ['Not counted', 'Triggers, filters, formatter, paths, delays, failed steps', 'Routers and error handlers', 'Steps inside a run'],
              ['Self-host', 'No', 'No', 'Yes, free, you run the server'],
              ['Feels like', 'A list of steps', 'A diagram of modules', 'A diagram of nodes, closer to code'],
            ],
            caption: 'Read on [Zapier pricing](https://zapier.com/pricing) and [how Zapier counts tasks](https://help.zapier.com/hc/en-us/articles/8496196837261), [Make pricing](https://www.make.com/en/pricing) and [how Make counts credits](https://help.make.com/credits), and [n8n pricing](https://n8n.io/pricing/), 19 Nov 2026. n8n prices are in euros.',
          },
        },
      ],
    },
    {
      id: 'who',
      h2: 'Who should pick which',
      body: [
        {
          table: {
            head: ['Pick', 'If'],
            rows: [
              ['Zapier', 'Several non-technical people will build; you use niche apps; you want help docs for everything. It is where most app makers build their integration first.'],
              ['Make', 'Your workflows branch, loop over lists and handle errors in specific ways, and someone on the team likes to see the whole flow.'],
              ['n8n', 'You have someone comfortable with JSON and a little code; your workflows have many steps (so per-run pricing wins); or your data must stay on your own server.'],
            ],
          },
        },
        { p: 'Where each is better, plainly: Zapier has the most apps and the gentlest start. Make gives the most control per dollar for visual builders. n8n is the only one of the three you can run yourself, and its per-run pricing is far cheaper for long workflows.' },
      ],
    },
    {
      id: 'cost',
      h2: 'One workflow, three bills',
      body: [
        { p: 'Take a workflow that runs 600 times a month: a trigger, a lookup and an add-row step.' },
        {
          table: {
            head: ['Tool', 'How it counts this', 'Monthly usage', 'Fits in'],
            rows: [
              ['Zapier', '2 action steps per run (the trigger is free)', '1,200 tasks', 'More than Professional’s 750; the 1,500-task tier is $39 billed yearly'],
              ['Make', 'About 3 module operations per run, trigger included', 'About 1,800 credits', 'More than the free 1,000; a paid plan'],
              ['n8n', '1 execution per run', '600 executions', 'Starter’s 2,500'],
            ],
            caption: 'Our arithmetic from each vendor’s counting rules, 19 Nov 2026. Polling triggers in Make can use credits even when nothing new arrives; check how often yours checks.',
          },
        },
      ],
    },
    {
      id: 'steps',
      h2: 'How to choose in an afternoon',
      body: [
        {
          steps: [
            { title: 'Write your three most likely workflows', body: 'The apps, the trigger, the steps, and how often each runs a month.' },
            { title: 'Check every app is supported', body: 'Search each tool’s app directory for each app, and for the specific trigger and action you need, not just the app name.' },
            { title: 'Work out the monthly units', body: 'Tasks, credits or executions, using the rules above. This usually decides it.' },
            { title: 'Build the hardest one on each free tier', body: 'Branching, a loop over line items, an error case. An hour each is enough to feel the difference.' },
            { title: 'Ask who will fix it at 7:00 on a Monday', body: 'Pick the tool that person can read.' },
          ],
        },
      ],
    },
    {
      id: 'example',
      h2: 'Where 50agents fits',
      body: [
        { p: '50agents is a different shape: you do not build the steps, you tell Captain the job and it plans the automation, an AI agent, a browser agent or an app, through viaSocket’s 2,300+ apps. If you enjoy building flows and want every setting in your hands, the three tools above give you more control. If you would rather describe the job, check the plan, and approve what reaches customers, try the same workflow there.' },
        { ask: 'Set up an automation: every new Stripe payment is added as a row to my Google Sheet with the customer, amount and date' },
        {
          view: {
            type: 'track',
            name: 'Log every payment',
            status: 'Draft: not live yet',
            stations: [
              { mark: 'app', app: APPS.stripe, say: 'When a payment succeeds in Stripe', passes: ['id', 'amount', 'customer', 'created'] },
              { mark: 'app', app: APPS.sheets, say: 'Look up the payment ID in "Payments"', passes: ['found or not'] },
              { mark: 'app', app: APPS.sheets, say: 'Add a row with the customer, amount and date' },
            ],
            tested: 'Tested on your real data.',
          },
          caption: 'The same kind of workflow as a plan in 50agents, from one sentence. Example data.',
        },
      ],
    },
  ],
  wrong: [
    { title: 'The bill is not the headline price', body: 'Usage beyond the plan is where costs grow. Count your units before choosing.' },
    { title: 'Polling uses credits', body: 'A trigger that checks every few minutes can spend credits on empty checks in some tools. Use instant triggers where offered.' },
    { title: 'Self-hosting is not free', body: 'n8n on your own server costs the server and someone’s time for updates and backups.' },
    { title: 'Nobody can read the flow', body: 'The builder leaves and the diagram is a mystery. Name steps in plain words and keep a one-line note per workflow.' },
    { title: 'Quotas stop your workflows', body: 'When credits or tasks run out, workflows stop. Set alerts before the limit.' },
  ],
  faqs: [
    { q: 'Is n8n free?', a: 'Self-hosted n8n is free to use; you pay for the server and the upkeep. n8n cloud is paid, with a trial.' },
    { q: 'Which is cheapest for a small team?', a: 'It depends on workflow length. For long workflows n8n’s per-run pricing is usually cheapest; for short two-step jobs the free tiers of Zapier or Make may cover you.' },
    { q: 'Which is easiest?', a: 'Zapier, for most non-technical people. Make is a step up in control; n8n another step.' },
  ],
  sources: [
    { label: 'Zapier: Pricing', href: 'https://zapier.com/pricing' },
    { label: 'Zapier help: How is task usage measured', href: 'https://help.zapier.com/hc/en-us/articles/8496196837261' },
    { label: 'Make: Pricing', href: 'https://www.make.com/en/pricing' },
    { label: 'Make help: Credits', href: 'https://help.make.com/credits' },
    { label: 'n8n: Pricing', href: 'https://n8n.io/pricing/' },
  ],
  related: ['how-much-automation-costs-credits-tasks-and-runs-compared', 'how-to-choose-an-ai-agent-builder', 'ai-agent-vs-automation-which-one-you-need'],
};

export default g;
