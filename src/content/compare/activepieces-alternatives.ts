import type { AltPage } from './types';

const page: AltPage = {
  type: 'alternatives',
  slug: 'activepieces-alternatives',
  tool: 'activepieces',
  title: 'Activepieces alternatives, open source and hosted | 50agents',
  description: 'Activepieces alternatives: n8n to keep self-hosting with more integrations, Make or Zapier for hosted apps, 50agents to build from one sentence.',
  h1: 'Activepieces alternatives',
  answer: [
    'If you chose Activepieces to self-host and now need more integrations, n8n is the other mature self-hosted option, with 2,829 integrations listed against Activepieces\' 770+.',
    'If you no longer want to run it yourself, Make (3,500+ apps) and Zapier (10,537+) are the hosted choices with the most apps, and 50agents builds the automation from one sentence for the people on your team who will never open a flow builder.',
  ],
  published: '2026-11-19',
  updated: '2026-11-19',
  why: {
    h: 'Why people outgrow Activepieces',
    body: [
      'The usual reason is a missing app. Activepieces lists 770+ apps, and its pieces are open source, so you can write a missing one, but that is a development job, not an afternoon. Teams that hit two or three missing apps start looking at tools with bigger catalogs.',
      'The second is AI cost. On Activepieces an AI step costs 2 credits on a fast model, 10 on a smart one and 20 on a frontier one, so the free 1,000 credits go quickly once flows lean on AI.',
    ],
  },
  picks: [
    { need: 'Self-host, more integrations', tool: 'n8n' },
    { need: 'Hosted, visual, 3,500+ apps', tool: 'make' },
    { need: 'Hosted, the most apps', tool: 'zapier' },
    { need: 'Your company runs on Microsoft 365', tool: 'powerautomate' },
    { need: 'Teammates describe it; it gets built', tool: 'fifty' },
  ],
  entries: [
    {
      tool: 'fifty',
      suits: 'Teams where one person runs Activepieces and everyone else sends them requests. With 50agents the person who needs "every new Stripe payment added as a row to my Google Sheet" can ask Captain for it directly and approve the plan.',
      limit: 'No self-hosting and no open-source core. If running on your own servers is why you chose Activepieces, 50agents is not a replacement.',
      limitUrl: 'https://www.activepieces.com/docs/install/overview',
    },
    {
      tool: 'n8n',
      suits: 'Developers who want to keep self-hosting and need more integrations, a Code node in JavaScript or Python, and human approval for AI tool calls.',
      limit: 'n8n\'s self-hosted Business plan needs a licence key that checks in daily, and its cloud has no free plan.',
      limitUrl: 'https://n8n.io/pricing/',
    },
    {
      tool: 'make',
      suits: 'Teams ready to stop hosting who want a visual builder with more apps and JSON blueprints they can export.',
      limit: 'Billed per credit with most actions costing one, so long flows cost more per run than on a flat plan.',
      limitUrl: 'https://www.make.com/en/pricing',
    },
    {
      tool: 'zapier',
      suits: 'Teams whose main problem was missing apps: Zapier lists 10,537+.',
      limit: 'Free is 100 tasks a month and two-step Zaps; Professional is $19.99 a month billed yearly for 750 tasks.',
      limitUrl: 'https://zapier.com/pricing',
    },
    {
      tool: 'powerautomate',
      suits: 'Teams inside Microsoft 365 who can use the free licence for cloud flows with standard connectors.',
      limit: 'The free licence cannot share flows and covers standard connectors only.',
      limitUrl: 'https://learn.microsoft.com/en-us/power-platform/admin/power-automate-licensing/types',
    },
  ],
  stay: {
    h: 'Who should stay on Activepieces',
    items: [
      'You need air-gapped or on-premises installs. Activepieces documents both, and of the others here only n8n self-hosts.',
      'You want a flat team price: Plus is $20 a month for 10,000 credits and up to 5 users, not per seat.',
      'Your apps are all in its 770+, or you are happy to write the missing pieces.',
    ],
  },
  move: [
    { title: 'List flows and the pieces they use', body: 'Note each flow\'s trigger, pieces and any inline TypeScript. Code steps are the hardest to move, so flag them.' },
    { title: 'Check every app in the new catalog', body: 'Look each piece up in the new tool\'s app directory before you commit; this is where moves usually stall.' },
    { title: 'Move the AI-heavy flows first', body: 'They cost the most credits on Activepieces, so they show the savings, or the lack of them, fastest.' },
    { title: 'Keep the old instance running for a month', body: 'Turn flows off one by one rather than shutting the server down.' },
  ],
  faqs: [
    { q: 'Is Activepieces free?', a: 'Its Free plan is $0 with 1,000 credits, unlimited flows and up to 5 users. Self-hosting the MIT-licensed core is also an option.' },
    { q: 'What is the best open-source alternative to Activepieces?', a: 'n8n is the most established self-hosted alternative. Its pricing page says a self-hosted version is available on GitHub; read the licence in its repository before you rely on it, since Activepieces\' core is MIT and n8n\'s terms differ by plan.' },
    { q: 'Should I move to Pipedream?', a: 'Not for workflows. Pipedream\'s docs say its workflows shut down on 31 Mar 2027.' },
  ],
  related: [
    { href: '/compare/n8n-alternatives', title: 'n8n alternatives', line: 'The other self-hosted choice, and its rivals' },
    { href: '/compare/pipedream-alternatives', title: 'Pipedream alternatives', line: 'Where to go before workflows close in 2027' },
    { href: '/compare/50agents-vs-n8n', title: '50agents vs n8n', line: 'Row by row, sourced' },
  ],
};

export default page;
