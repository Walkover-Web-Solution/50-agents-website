import type { AltPage } from './types';

const page: AltPage = {
  type: 'alternatives',
  slug: 'n8n-alternatives',
  tool: 'n8n',
  title: 'n8n alternatives for technical teams, checked | 50agents',
  description: 'n8n alternatives: Activepieces to self-host under MIT, Make or Zapier for hosted ease, Gumloop for AI agents, 50agents to skip building. Prices dated.',
  h1: 'n8n alternatives',
  answer: [
    'If you want to keep self-hosting but under a plain MIT licence, Activepieces is the closest n8n alternative; if you want to stop running servers, Make and Zapier are the mature hosted choices.',
    'If the workflows you build in n8n are mostly AI agents, Gumloop is built around AI agents, and if the person who needs the automation is not the person who can build it, 50agents lets them describe it in one sentence instead.',
  ],
  published: '2026-11-19',
  updated: '2026-11-19',
  why: {
    h: 'Why technical teams look past n8n',
    body: [
      'Self-hosting is n8n\'s strength and its cost. The server, the database, the upgrades and the backups are yours, and the hours go somewhere. The cloud version avoids that, but it has no free plan and the cheapest tier, Starter at €20 a month billed yearly, stops at 2.5K executions.',
      'The other reason is the licence and the audience. n8n\'s own pricing says its Business plan is self-hosted only and needs a licence key that checks in daily. And a workflow only a developer can change becomes a queue of small requests from the rest of the team.',
    ],
  },
  picks: [
    { need: 'Self-host, open source, MIT core', tool: 'activepieces' },
    { need: 'Hosted, visual, and still good with branches', tool: 'make' },
    { need: 'Hosted, the most apps, least setup', tool: 'zapier' },
    { need: 'AI agents with a browser and team controls', tool: 'gumloop' },
    { need: 'Non-developers describe it; it gets built', tool: 'fifty' },
  ],
  entries: [
    {
      tool: 'fifty',
      suits: 'The ops lead, founder or salesperson who keeps asking the developer for "one more workflow". They tell Captain what they need, for example "every new HubSpot contact goes into my Google Sheet and posts in Slack", review the plan and the test run on their real data, and approve it.',
      limit: 'For an n8n user this is the big one: no code steps, no self-hosting and no canvas to edit by hand. If you need a custom HTTP call with signed headers, keep n8n for that workflow.',
      limitUrl: 'https://n8n.io/',
    },
    {
      tool: 'activepieces',
      suits: 'Developers who like n8n\'s model but want an MIT-licensed core, Docker or Kubernetes installs (air-gapped too), and TypeScript written inline in a step.',
      limit: '770+ apps against n8n\'s 2,829 listed integrations, and AI steps cost 2 to 20 credits each depending on the model.',
      limitUrl: 'https://www.activepieces.com/pricing',
    },
    {
      tool: 'make',
      suits: 'Teams who want n8n\'s visual canvas without running it. Make\'s scenarios also branch and loop, take JavaScript or Python, and export as JSON blueprints.',
      limit: 'Billing is per credit and most actions use one, so a long scenario costs more per run than the same workflow does as one n8n execution.',
      limitUrl: 'https://www.make.com/en/pricing',
    },
    {
      tool: 'zapier',
      suits: 'Teams who want the least setup and the longest list of apps (10,537+), with code steps in JavaScript or Python for the edges.',
      limit: 'Every action step is a task. Long n8n workflows with dozens of nodes get expensive quickly when each node becomes a task.',
      limitUrl: 'https://zapier.com/pricing',
    },
    {
      tool: 'gumloop',
      suits: 'Teams whose n8n canvases are mostly an AI Agent node with tools hung off it. Gumloop is built around shared AI agents, with a code sandbox and a cloud browser with saved logins.',
      limit: 'No free plan (a 14-day trial with a card), and AI agents stop when the credit overage cap is reached.',
      limitUrl: 'https://docs.gumloop.com/core-concepts/credits.md',
    },
  ],
  stay: {
    h: 'Who should stay on n8n',
    items: [
      'Your data cannot leave your network. Self-hosted n8n keeps runs and credentials on your servers; none of the hosted tools here can say that.',
      'Your workflows are long. n8n charges one execution per run regardless of steps, which is hard to beat at volume.',
      'You lean on the Code node and custom HTTP calls. Tools built for non-developers will slow you down.',
    ],
  },
  move: [
    { title: 'Export the workflows as JSON', body: 'Download each workflow from its menu, or export them all with n8n\'s command line. The JSON is your record of every node and setting, even if the tool you move to cannot import it.' },
    { title: 'Sort them by who changes them', body: 'Workflows only developers touch can stay in n8n or move to Activepieces. Workflows that business people keep asking to change are the ones to move to a tool they can use themselves.' },
    { title: 'Recreate credentials, not just steps', body: 'Credentials do not travel. Make a list of every app connection a workflow uses and reconnect each one in the new tool before you rebuild.' },
    { title: 'Run in parallel, then deactivate', body: 'Keep the n8n workflow active until the new one has handled a week of real events, compare outputs, then deactivate in n8n. Keep the JSON.' },
  ],
  faqs: [
    { q: 'What is the best open-source alternative to n8n?', a: 'Activepieces. Its core is MIT-licensed and it self-hosts with Docker or Kubernetes, including air-gapped. It has fewer apps (770+) than n8n.' },
    { q: 'Is n8n free?', a: 'n8n\'s pricing page lists no free cloud plan: there is a trial with 1,000 executions, and Starter is €20 a month billed yearly. It says a self-hosted version is available on GitHub.' },
    { q: 'What is easier than n8n for non-developers?', a: 'Zapier and Make are easier to learn. 50agents removes the building step: you describe the job in one sentence and approve the plan Captain shows.' },
  ],
  related: [
    { href: '/compare/50agents-vs-n8n', title: '50agents vs n8n', line: 'Self-hosted workflows against built-from-a-sentence' },
    { href: '/compare/activepieces-alternatives', title: 'Activepieces alternatives', line: 'If you are weighing the open-source options' },
    { href: '/compare/pipedream-alternatives', title: 'Pipedream alternatives', line: 'For developers whose Pipedream workflows close in 2027' },
  ],
};

export default page;
