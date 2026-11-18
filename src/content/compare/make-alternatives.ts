import type { AltPage } from './types';

const page: AltPage = {
  type: 'alternatives',
  slug: 'make-alternatives',
  tool: 'make',
  title: 'Make.com alternatives, compared on cost per run | 50agents',
  description: 'Make.com alternatives: n8n bills one execution per run, Zapier has the most apps, Activepieces is open source, 50agents builds from a sentence.',
  h1: 'Make.com alternatives',
  answer: [
    'If Make\'s credits run out because every module costs one, n8n charges one execution for a whole run however many steps it has, and Activepieces gives you 10,000 credits for $20 a month flat for up to 5 users.',
    'If you want more apps than Make\'s 3,500+, Zapier lists 10,537+, and if you are tired of building scenarios module by module, 50agents builds the automation from one sentence and shows you each step before it runs.',
  ],
  published: '2026-11-19',
  updated: '2026-11-19',
  why: {
    h: 'Why people move off Make',
    body: [
      'Make moved to credits, and on its pricing page "most actions consume 1 credit", while some AI features use more. So a scenario with ten action modules costs roughly ten credits every time it runs, and more when it loops over a list of items. The canvas makes big scenarios easy to build, which makes them easy to overspend on.',
      'The other complaint is time. A good Make scenario takes an afternoon of mapping fields between modules, and the person who built it is often the only one who can read it six months later.',
    ],
  },
  picks: [
    { need: 'Long scenarios at the lowest cost per run', tool: 'n8n' },
    { need: 'The most apps, the simplest editor', tool: 'zapier' },
    { need: 'Open source with a flat team price', tool: 'activepieces' },
    { need: 'Microsoft 365 shops', tool: 'powerautomate' },
    { need: 'AI agents rather than scenarios', tool: 'gumloop' },
    { need: 'Say what you want; skip the mapping', tool: 'fifty' },
  ],
  entries: [
    {
      tool: 'fifty',
      suits: 'People who use Make for the usual jobs (new order to a sheet, new lead to Slack, a weekly summary email) and are tired of mapping fields. Captain finds the apps, reads a real event to get the fields right, tests the plan on your data and only then asks you to make it live.',
      limit: 'No canvas, no routers you can drag, no iterators you set up by hand. If your scenario has nested branches and error handlers you tuned yourself, Make still does that better.',
      limitUrl: 'https://www.make.com/en',
    },
    {
      tool: 'n8n',
      suits: 'Make users comfortable with a bit of JavaScript who run long scenarios. n8n\'s canvas will feel familiar, and one run of the whole workflow is one execution.',
      limit: 'No free cloud plan, and the cloud prices are in euros and billed yearly, from €20 a month for 2.5K executions.',
      limitUrl: 'https://n8n.io/pricing/',
    },
    {
      tool: 'zapier',
      suits: 'Teams who want the widest app coverage and a simpler, linear editor that more people on the team can follow.',
      limit: 'Zapier counts each action step as a task, which is usually more expensive than Make for the same multi-step work.',
      limitUrl: 'https://zapier.com/pricing',
    },
    {
      tool: 'activepieces',
      suits: 'Small teams who want a predictable bill: a flat $20 a month for 10,000 credits and up to 5 users, with the option to self-host later.',
      limit: '770+ apps, well under Make\'s 3,500+.',
      limitUrl: 'https://www.activepieces.com/',
    },
    {
      tool: 'powerautomate',
      suits: 'Teams whose scenarios mostly move data between Outlook, SharePoint, Teams and Excel, where Microsoft\'s own connectors are deepest.',
      limit: 'Non-Microsoft apps often need premium connectors, at $15 per user a month billed yearly.',
      limitUrl: 'https://www.microsoft.com/en-us/power-platform/products/power-automate/pricing',
    },
    {
      tool: 'gumloop',
      suits: 'Teams who started using Make\'s AI modules and realised they want an AI agent with tools, not a fixed path.',
      limit: 'There is no free plan; Pro is $37 a month for 20,000 credits after a 14-day trial with a card.',
      limitUrl: 'https://docs.gumloop.com/core-concepts/credits.md',
    },
  ],
  stay: {
    h: 'Who should stay on Make',
    items: [
      'You build complex scenarios with routers, iterators and error handlers, and you like seeing them. Make\'s canvas is still the best place for that.',
      'You have dozens of scenarios saved as blueprints and a team that knows them. The migration cost is real.',
      'Your apps are in Make\'s 3,500+ and not in the others\'. Check before you switch.',
    ],
  },
  move: [
    { title: 'Export blueprints', body: 'In each scenario, export the blueprint (.json). It imports back into Make only, but it records every module, filter and mapping, which is what you rebuild from.' },
    { title: 'Find the credit-hungry scenarios', body: 'Open your usage, sort scenarios by credits used and start with the top three. They decide whether the move saves money.' },
    { title: 'Rebuild one and compare outputs', body: 'In 50agents, describe the scenario as you would to a colleague, for example "every new Shopify order is added as a row to my Google Sheet with its items and total". Check Captain\'s test run against the last real bundle in Make\'s history.' },
    { title: 'Switch off in Make', body: 'Once a week of runs match, turn the scenario off in Make. Keep the blueprint.' },
  ],
  faqs: [
    { q: 'What is cheaper than Make?', a: 'For long scenarios, n8n, because it bills per run, not per module. For a small team, Activepieces is $20 a month flat for 10,000 credits. Both have limits listed above.' },
    { q: 'Does Make have a free plan?', a: 'Yes: 1,000 credits a month. Its own comparison page says paid plans start at $9 a month for 10,000 credits (Core).' },
    { q: 'Can I move Make scenarios to another tool automatically?', a: 'No. Blueprints import only into Make. Every alternative means rebuilding, so start with the scenarios that cost the most.' },
  ],
  related: [
    { href: '/compare/50agents-vs-make', title: '50agents vs Make', line: 'The canvas against the sentence, row by row' },
    { href: '/compare/zapier-alternatives', title: 'Zapier alternatives', line: 'The same question from the Zapier side' },
    { href: '/compare/n8n-alternatives', title: 'n8n alternatives', line: 'If n8n is on your shortlist' },
  ],
};

export default page;
