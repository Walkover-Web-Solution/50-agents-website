import type { VsPage } from './types';

const page: VsPage = {
  type: 'versus',
  slug: '50agents-vs-n8n',
  tool: 'n8n',
  title: '50agents vs n8n: self-hosted or built for you | 50agents',
  description: 'n8n is a self-hostable workflow builder with code nodes and per-run pricing; 50agents builds automations, AI agents and apps from a sentence. Sourced.',
  h1: '50agents vs n8n',
  answer: [
    'Pick n8n if you are technical, want to self-host, need code nodes, or run long workflows where paying once per run matters; pick 50agents if the people who need the work done will describe it rather than build it.',
    'n8n has no free cloud plan (a trial with 1,000 executions) and Starter is €20 a month billed yearly for 2.5K executions; 50agents starts every workspace free with 2,000 credits.',
  ],
  published: '2026-11-19',
  updated: '2026-11-19',
  rows: ['free', 'price', 'apps', 'prompt', 'fixed', 'aiAgent', 'appBuilder', 'approval', 'handEdit', 'code', 'selfHost', 'export'],
  verdict: [
    'n8n wins every row a developer cares about: self-hosting, a Code node in JavaScript or Python, JSON export, and a node canvas you control. Its pricing counts a whole run as one execution, which is cheap for long workflows.',
    '50agents wins where nobody on the team wants to build. Captain makes the plan, reads real data to get the fields right and tests it; the result can be an app with screens and an AI agent crew, which n8n\'s data tables do not give you. It is hosted only.',
  ],
  pick: {
    us: [
      'Nobody on the team will maintain a server or a canvas.',
      'You want an app (a leads tracker, an invoices desk) as well as automations, from the same place.',
      'You want to start free, without picking a plan or a server size first.',
    ],
    them: [
      'Data must stay on your own servers.',
      'You need code, custom HTTP calls or nodes you write yourself.',
      'Your workflows are long and run often; one execution per run is hard to beat.',
    ],
  },
  move: [
    { title: 'Keep the JSON', body: 'Download each workflow as JSON before you change anything.' },
    { title: 'Move the business workflows, keep the technical ones', body: 'Workflows with Code nodes and custom HTTP stay in n8n. Workflows a non-developer keeps asking to change are the ones to rebuild in 50agents.' },
    { title: 'Describe, test, switch', body: 'Tell Captain the outcome, check the test run against n8n\'s last execution, then deactivate the n8n workflow.' },
  ],
  faqs: [
    { q: 'Can I self-host 50agents?', a: 'No. 50agents is hosted only. If self-hosting is a requirement, n8n or Activepieces fit.' },
    { q: 'Which has more integrations?', a: 'n8n\'s directory lists 2,829 integrations; 50agents works with 2,300+ through viaSocket.' },
    { q: 'Does 50agents have code steps?', a: 'No. Automations are made of fixed blocks (filter, AI, action, set, delay), and Captain writes no code.' },
  ],
  related: [
    { href: '/compare/n8n-alternatives', title: 'n8n alternatives', line: 'Activepieces, Make, Zapier and more' },
    { href: '/compare/50agents-vs-make', title: '50agents vs Make', line: 'Row by row, sourced' },
    { href: '/compare/activepieces-alternatives', title: 'Activepieces alternatives', line: 'The other open-source route' },
  ],
};

export default page;
