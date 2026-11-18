// Guide 30 (pages-brief B5). Every price below was read on the vendor's own pricing page on 19 Nov 2026 (links inline).
// Left out because they could not be verified today: Make's paid plans, n8n's monthly-billing prices, Pipedream's workflow
// plans (its pricing page now covers a different product), Relevance AI (Enterprise only on its page). Relay.app has shut down.
// 50agents: $1 = 1,000 credits, 2,000 free (D214); about 24 credits per Captain answer (D227, gtm/FACTS.md).
import type { Guide } from './types';

const g: Guide = {
  slug: 'how-much-automation-costs-credits-tasks-and-runs-compared',
  n: 30,
  group: 'Choosing tools',
  kind: 'auto',
  title: 'How much automation costs: credits, tasks, runs (2026)',
  description:
    'Automation tools charge in tasks, credits, executions or runs, and the unit decides the bill. Each tool’s unit and entry price, read 19 Nov 2026.',
  h1: 'How much automation costs: credits, tasks and runs compared',
  short:
    'Most automation and AI agent tools charge a monthly plan that includes a number of units (tasks, credits, executions or runs) and stop or charge more when you use them up. What counts as one unit differs a lot: Zapier charges per action step, Make per module operation, n8n and Activepieces per whole run, and AI agent builders per credit of AI work, so the same workflow can cost several times more in one tool than another.',
  published: '2026-11-19',
  updated: '2026-11-19',
  sections: [
    {
      id: 'units',
      h2: 'The units, explained',
      body: [
        {
          table: {
            head: ['Unit', 'One unit is', 'Used by'],
            rows: [
              ['Task', 'One action step that succeeds; triggers, filters and failed steps are free', 'Zapier ([help](https://help.zapier.com/hc/en-us/articles/8496196837261))'],
              ['Operation credit', 'One module run on one item; a step over 10 items is 10', 'Make ([help](https://help.make.com/credits))'],
              ['Execution or run', 'The whole workflow, however many steps', 'n8n ([pricing](https://n8n.io/pricing/)), Activepieces ([pricing](https://www.activepieces.com/pricing))'],
              ['AI credit', 'A slice of AI work: tokens read and written, tools called', 'Lindy, Gumloop, 50agents'],
              ['Seat or bot', 'A person or a robot, with action limits', 'Microsoft Power Automate'],
            ],
          },
        },
      ],
    },
    {
      id: 'prices',
      h2: 'Entry prices, read 19 Nov 2026',
      body: [
        {
          table: {
            head: ['Tool', 'Free', 'First paid plan', 'Source'],
            rows: [
              ['Zapier', '100 tasks a month, two-step Zaps', 'Professional: $19.99 a month billed yearly ($29.99 monthly), 750 tasks', '[zapier.com/pricing](https://zapier.com/pricing)'],
              ['Make', '1,000 credits a month', 'Not verified today', '[make.com/en/pricing](https://www.make.com/en/pricing)'],
              ['n8n cloud', 'Trial, 1,000 executions', 'Starter: €20 a month billed yearly, 2,500 executions', '[n8n.io/pricing](https://n8n.io/pricing/)'],
              ['Activepieces', '1,000 credits', 'Plus: $20 a month, 10,000 credits; then $0.007 a credit', '[activepieces.com/pricing](https://www.activepieces.com/pricing)'],
              ['IFTTT', '1,000 credits a month, hourly checks', 'Starter: $2.09 a month billed yearly, 5,000 credits', '[ifttt.com/plans](https://ifttt.com/plans)'],
              ['Power Automate', '30-day trial on the pricing page', 'Premium: $15 per user a month, billed yearly', '[microsoft.com](https://www.microsoft.com/en-us/power-platform/products/power-automate/pricing)'],
              ['Lindy', '$50 of credits for 7 days', 'Team: from $29.99 a month per active user, 3,000 credits', '[lindy.ai/pricing](https://www.lindy.ai/pricing)'],
              ['Gumloop', 'No free plan; 14-day trial', 'Pro: $37 a month, 20,000 credits', '[gumloop.com/pricing](https://www.gumloop.com/pricing)'],
              ['50agents', '2,000 credits to start', 'Credits at $1 per 1,000', 'This site'],
            ],
            caption: 'Prices change often; check the source before you buy. We left out what we could not confirm on the vendor’s page today.',
          },
        },
      ],
    },
    {
      id: 'worked',
      h2: 'A worked example: one workflow, five bills',
      body: [
        { p: 'A workflow with a trigger, a lookup and an add-row step, running 600 times a month (about 30 times a working day).' },
        {
          table: {
            head: ['Tool', 'Units per run', 'Units a month', 'Covered by'],
            rows: [
              ['Zapier', '2 tasks', '1,200', 'Not Professional’s 750; its 1,500-task tier, $39 a month billed yearly'],
              ['Make', 'About 3 credits', 'About 1,800', 'More than the free 1,000'],
              ['n8n', '1 execution', '600', 'Starter (2,500)'],
              ['Activepieces', '1 credit', '600', 'The free 1,000'],
              ['IFTTT', 'Depends on the applet', 'Shown in the applet editor', 'Check before you build'],
            ],
            caption: 'Our arithmetic from each vendor’s counting rules, 19 Nov 2026. Add an AI step and every tool charges more for it.',
          },
        },
      ],
    },
    {
      id: 'steps',
      h2: 'How to estimate your own cost, step by step',
      body: [
        {
          steps: [
            { title: 'List each workflow and its runs a month', body: 'Orders a month, emails a day times 22 working days, and so on.' },
            { title: 'Count the billable steps per run', body: 'Per each tool’s rules. Loops multiply: a step over 5 line items is 5 in some tools.' },
            { title: 'Add AI steps separately', body: 'AI work is priced by how much it reads and writes. Run it 10 times and read the usage log.' },
            { title: 'Add 30% for growth and retries', body: 'Busy months and retried runs happen.' },
            { title: 'Check what happens at the limit', body: 'Some tools stop your workflows; some charge overage. Know which before it happens.' },
          ],
        },
      ],
    },
    {
      id: 'example',
      h2: 'How 50agents charges',
      body: [
        { p: 'In 50agents everything is credits: $1 buys 1,000, and every workspace starts with 2,000 free. Captain’s answers cost about 24 credits each today. An automation is charged per run for its AI steps and the app actions it takes, and an AI agent for its AI work and actions. Usage in Settings shows a log of every charge, by AI agent, so after the test run you can see what your job costs before you schedule it. When credits run out, work stops rather than running up a bill, and you can set spending limits.' },
        {
          view: {
            type: 'track',
            name: 'Log every payment',
            status: 'Live · runs on each successful Stripe payment',
            today: [['Runs today', '31'], ['Did something', '31'], ['Did not work', '0'], ['Credits today', '93']],
            stations: [
              { mark: 'app', app: { name: 'Stripe', icon: 'https://stuff.thingsofbrand.com/stripe.com/images/img67eab239fe_stripe.jpg' }, say: 'When a payment succeeds in Stripe', passes: ['payment'] },
              { mark: 'app', app: { name: 'Google Sheets', icon: 'https://stuff.thingsofbrand.com/google.com/images/img4_googlesheet.png' }, say: 'Look up the payment ID in "Payments"', passes: ['found or not'] },
              { mark: 'app', app: { name: 'Google Sheets', icon: 'https://stuff.thingsofbrand.com/google.com/images/img4_googlesheet.png' }, say: 'Add a row to "Payments"' },
            ],
          },
          caption: 'An automation’s Overview in 50agents shows the credits it used today next to its runs. The numbers here are example data, not a price quote.',
        },
      ],
    },
  ],
  wrong: [
    { title: 'Counting steps the wrong way', body: 'A five-step Zap is four tasks (the trigger is free); a Make step over a list costs one credit per item. Read each tool’s rule.' },
    { title: 'Polling that costs when nothing happens', body: 'Some tools charge for checks that find nothing. Prefer instant triggers.' },
    { title: 'AI steps priced like fixed steps', body: 'An AI step that reads long emails costs far more than one that sorts a subject line. Test with real inputs.' },
    { title: 'Unused credits expire', body: 'Make’s help says unused credits expire at the end of the term; Lindy’s monthly credits do not roll over. Buy for your usual month, not your best one.' },
    { title: 'Quotas stop the business', body: 'Running out mid-month stops order logging on your busiest day. Set an alert at 80%.' },
  ],
  faqs: [
    { q: 'How much does Zapier cost per task?', a: 'On Professional billed yearly, $19.99 buys 750 tasks, about 2.7 cents a task. Larger tiers cost less per task.' },
    { q: 'Is a run cheaper than a task?', a: 'For long workflows, yes: one run covers every step, where tasks or operations count each one. For one-step workflows they are about the same.' },
    { q: 'What does an AI agent cost per run?', a: 'It depends on how much it reads and writes. Run your AI agent on real inputs a few times and read the usage log; most builders show it per run.' },
  ],
  sources: [
    { label: 'Zapier: Pricing', href: 'https://zapier.com/pricing' },
    { label: 'Zapier help: How is task usage measured', href: 'https://help.zapier.com/hc/en-us/articles/8496196837261' },
    { label: 'Make: Pricing', href: 'https://www.make.com/en/pricing' },
    { label: 'Make help: Credits', href: 'https://help.make.com/credits' },
    { label: 'n8n: Pricing', href: 'https://n8n.io/pricing/' },
    { label: 'Activepieces: Pricing', href: 'https://www.activepieces.com/pricing' },
    { label: 'IFTTT: Plans', href: 'https://ifttt.com/plans' },
    { label: 'Microsoft: Power Automate pricing', href: 'https://www.microsoft.com/en-us/power-platform/products/power-automate/pricing' },
    { label: 'Lindy: Pricing', href: 'https://www.lindy.ai/pricing' },
    { label: 'Gumloop: Pricing', href: 'https://www.gumloop.com/pricing' },
  ],
  related: ['zapier-vs-make-vs-n8n-for-a-small-team', 'how-to-choose-an-ai-agent-builder', 'what-to-automate-first-in-a-small-business'],
};

export default g;
