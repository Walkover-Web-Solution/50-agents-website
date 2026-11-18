import type { AltPage } from './types';

const page: AltPage = {
  type: 'alternatives',
  slug: 'power-automate-alternatives',
  tool: 'powerautomate',
  title: 'Power Automate alternatives, priced and dated | 50agents',
  description: 'Power Automate alternatives: UiPath for desktop RPA, Zapier and Make for non-Microsoft apps, n8n to self-host, 50agents to build from a sentence.',
  h1: 'Power Automate alternatives',
  answer: [
    'If you need desktop RPA beyond Power Automate\'s, UiPath is the enterprise alternative and has a free Community plan; if most of your apps are not Microsoft\'s, Zapier (10,537+ apps) and Make (3,500+) connect more of them without a per-user licence.',
    'If you want to self-host, n8n runs on your own servers, and if the people who need automations will not learn a flow designer, 50agents builds them from a sentence.',
  ],
  published: '2026-11-19',
  updated: '2026-11-19',
  why: {
    h: 'Why teams look past Power Automate',
    body: [
      'The licence is the usual reason. The free licence for work and school accounts covers cloud flows without sharing and standard connectors only. Many non-Microsoft apps sit behind premium connectors, which need Power Automate Premium at $15.00 per user a month, paid yearly. A 20-person team that needs one premium connector pays $3,600 a year.',
      'The second is unattended RPA. A bot that runs desktop flows on its own is the Process plan, $150.00 per bot a month paid yearly, and each bot runs one desktop flow at a time.',
    ],
  },
  picks: [
    { need: 'Desktop and legacy-app RPA at scale', tool: 'uipath' },
    { need: 'Non-Microsoft apps, the most of them', tool: 'zapier' },
    { need: 'Visual flows with a free plan', tool: 'make' },
    { need: 'Self-hosted on your own servers', tool: 'n8n' },
    { need: 'Open source, flat team price', tool: 'activepieces' },
    { need: 'Describe it in a sentence, no flow designer', tool: 'fifty' },
  ],
  entries: [
    {
      tool: 'fifty',
      suits: 'Teams outside IT who need cloud jobs done in their web apps, such as "every new Shopify order is added as a row to my Google Sheet with its items and total". Captain builds it, tests it on a real order and shows you before it goes live.',
      limit: 'No desktop RPA and no Windows apps. It works with web apps (2,300+ through viaSocket) and websites, not with software installed on your PC.',
      limitUrl: 'https://www.microsoft.com/en-us/power-platform/products/power-automate',
    },
    {
      tool: 'uipath',
      suits: 'Enterprises whose automation is mostly robots working in desktop and legacy apps. The Community plan is "free forever", and Basic starts at $25 a month.',
      limit: 'Above Basic, Standard and Enterprise prices are only through sales.',
      limitUrl: 'https://www.uipath.com/pricing',
    },
    {
      tool: 'zapier',
      suits: 'Teams whose apps are mostly not Microsoft\'s. Zapier lists 10,537+ apps, and its plans are not priced per connector.',
      limit: 'Each action step is a task; Professional starts at 750 tasks a month for $19.99 billed yearly.',
      limitUrl: 'https://zapier.com/pricing',
    },
    {
      tool: 'make',
      suits: 'Teams who like Power Automate\'s designer but want 3,500+ apps and a free plan of 1,000 credits.',
      limit: 'No desktop RPA; Make works with cloud apps.',
      limitUrl: 'https://www.make.com/en',
    },
    {
      tool: 'n8n',
      suits: 'IT teams who want automations inside their own network, with a Code node and human approval for AI tool calls.',
      limit: 'Your team runs and upgrades the server; the cloud version has no free plan.',
      limitUrl: 'https://n8n.io/pricing/',
    },
    {
      tool: 'activepieces',
      suits: 'Small teams who want a flat price, not per user: Plus is $20 a month for 10,000 credits and up to 5 users, and it can be self-hosted.',
      limit: '770+ apps, fewer than Power Automate\'s 1,400+ connectors.',
      limitUrl: 'https://www.activepieces.com/',
    },
  ],
  stay: {
    h: 'Who should stay on Power Automate',
    items: [
      'You automate old Windows apps with no API. Desktop flows do that, and the cloud tools above do not.',
      'Your work lives in Outlook, Teams, SharePoint and Excel, and the free licence with standard connectors covers it.',
      'You use approvals and process mining inside Microsoft 365; nothing else here plugs in as deeply.',
    ],
  },
  move: [
    { title: 'Export flows as packages', body: 'Power Automate exports a flow as a package (.zip) or inside a solution. Keep them; they import back into Power Automate only.' },
    { title: 'Move the premium-connector flows first', body: 'Flows that force a Premium licence are where the savings are. Desktop flows usually stay.' },
    { title: 'Reconnect Microsoft apps in the new tool', body: 'Outlook, OneDrive and Teams connections are made again in the new tool with your Microsoft account; check your admin allows it.' },
    { title: 'Turn flows off, then reduce licences', body: 'Turn each flow off once its replacement has run a week, then drop Premium licences at renewal.' },
  ],
  faqs: [
    { q: 'Is Power Automate free?', a: 'Microsoft Learn describes a free licence for work or school accounts: cloud flows without sharing, attended desktop flows on your own machine, standard connectors only. Premium is $15.00 per user a month, paid yearly.' },
    { q: 'What is the best alternative to Power Automate Desktop?', a: 'UiPath, for desktop RPA. Cloud tools such as Zapier, Make and 50agents do not automate Windows apps.' },
    { q: 'How many connectors does Power Automate have?', a: 'Microsoft\'s product page says more than 1,400 prebuilt, certified connectors.' },
  ],
  related: [
    { href: '/compare/zapier-alternatives', title: 'Zapier alternatives', line: 'If Zapier is your likely pick' },
    { href: '/compare/make-alternatives', title: 'Make alternatives', line: 'If Make is your likely pick' },
    { href: '/compare/50agents-vs-zapier', title: '50agents vs Zapier', line: 'Row by row, sourced' },
  ],
};

export default page;
