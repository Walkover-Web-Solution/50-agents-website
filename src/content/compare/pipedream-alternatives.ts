import type { AltPage } from './types';

const page: AltPage = {
  type: 'alternatives',
  slug: 'pipedream-alternatives',
  tool: 'pipedream',
  title: 'Pipedream alternatives before workflows close | 50agents',
  description: 'Pipedream workflows shut down on 31 Mar 2027. Move code-heavy ones to n8n or Activepieces, simple ones to Zapier, Make or 50agents. Export steps inside.',
  h1: 'Pipedream alternatives',
  answer: [
    'Pipedream\'s docs say its workflows shut down on 31 Mar 2027 and their data is deleted on 30 Apr 2027, so export your projects now; the closest home for code-heavy workflows is n8n (Code node in JavaScript or Python, self-hostable), then Activepieces (TypeScript inline, MIT core).',
    'If your workflows are mostly app-to-app glue with little code, Zapier and Make both run JavaScript or Python steps, and 50agents rebuilds them from a sentence with no code at all.',
  ],
  published: '2026-11-19',
  updated: '2026-11-19',
  notice: {
    h: 'Pipedream workflows are closing',
    body: 'Pipedream\'s docs: "Workflows and String are shutting down on March 31, 2027", and workflow data is deleted on April 30, 2027. Pipedream itself now sells Connect, its integration layer for developers building AI agents.',
  },
  why: {
    h: 'What a Pipedream user should look for',
    body: [
      'Pipedream users are developers. They used it because a step could be real Node.js or Python, next to 3,219 apps. The next tool has to keep code steps first-class, or the move means rewriting logic as drag-and-drop.',
      'The other thing to check is how runs are billed. Pipedream charged by compute time, 1 credit per 30 seconds. Tools that bill per step or per action can cost far more for the same workflow, while tools that bill per run are closer.',
    ],
  },
  picks: [
    { need: 'Code steps first, self-hostable', tool: 'n8n' },
    { need: 'TypeScript inline, MIT core', tool: 'activepieces' },
    { need: 'Hosted, most apps, JS or Python steps', tool: 'zapier' },
    { need: 'Visual, JS or Python, JSON blueprints', tool: 'make' },
    { need: 'Glue workflows rebuilt with no code', tool: 'fifty' },
  ],
  entries: [
    {
      tool: 'fifty',
      suits: 'The workflows a developer built for the business, not for the product: "every new Stripe payment is added as a row to my Google Sheet with the customer, amount and date". Hand those to the person who needs them; they describe it to Captain and approve the plan.',
      limit: 'No code steps, no npm packages, no HTTP endpoints you write yourself. Workflows with real logic belong in one of the tools below.',
      limitUrl: 'https://pipedream.com/docs/workflows/export-workflows',
    },
    {
      tool: 'n8n',
      suits: 'Developers who want code next to visual nodes. The Code node runs JavaScript or Python, one run is one execution however many steps, and you can self-host.',
      limit: 'Cloud prices are in euros and billed yearly, from €20 a month for 2.5K executions; there is no free cloud plan.',
      limitUrl: 'https://n8n.io/pricing/',
    },
    {
      tool: 'activepieces',
      suits: 'TypeScript developers who want to write code inline and own the stack, with Docker or Kubernetes installs.',
      limit: '770+ apps, far fewer than Pipedream\'s 3,219, so check every app your workflows call.',
      limitUrl: 'https://www.activepieces.com/',
    },
    {
      tool: 'zapier',
      suits: 'Teams who want hosted reliability and 10,537+ apps, with JavaScript or Python code steps.',
      limit: 'Code runtime is capped per step (1 second on Free, 30 seconds on Professional), and each code step is a task.',
      limitUrl: 'https://zapier.com/pricing',
    },
    {
      tool: 'make',
      suits: 'Developers fine with a visual canvas, who want JavaScript or Python where needed and JSON blueprints they can version.',
      limit: 'Billed per credit, with most actions costing one, so many-step workflows cost more than they did on compute time.',
      limitUrl: 'https://www.make.com/en/pricing',
    },
  ],
  stay: {
    h: 'Who should stay on Pipedream',
    items: [
      'You use Pipedream Connect to give your own product\'s users access to their apps. Connect is what Pipedream now sells; only workflows are closing.',
      'Nobody can stay on Pipedream workflows after 31 Mar 2027.',
    ],
  },
  move: [
    { title: 'Export every project now', body: 'Pipedream exports each project as a ZIP of workflow JSON files, up to 500 workflows or 256 MB per export. Credentials are removed, so list each workflow\'s connected accounts separately.' },
    { title: 'Copy code steps into a repository', body: 'Pull each code step into files you control. That code is what you carry into n8n\'s Code node or an Activepieces step.' },
    { title: 'Move webhook URLs carefully', body: 'Any app posting to a Pipedream URL needs the new URL. Change each one only when its replacement is live, and keep a list.' },
    { title: 'Finish before 31 Mar 2027', body: 'Workflows stop on that date and data is deleted on 30 Apr 2027. Leave a few weeks of side-by-side running.' },
  ],
  faqs: [
    { q: 'Is Pipedream shutting down?', a: 'Its workflows and String are. Pipedream\'s docs say they shut down on 31 Mar 2027 and workflow data is deleted on 30 Apr 2027. Pipedream Connect, its integration layer for AI agents, continues.' },
    { q: 'What is the closest alternative to Pipedream?', a: 'n8n, for code steps beside app nodes and the option to self-host. Activepieces is the open-source pick for TypeScript developers.' },
    { q: 'Can I import Pipedream workflows into another tool?', a: 'We found no tool that imports it. The export is Pipedream\'s own JSON; use it as the spec for a rebuild.' },
  ],
  related: [
    { href: '/compare/n8n-alternatives', title: 'n8n alternatives', line: 'If n8n is your likely pick' },
    { href: '/compare/activepieces-alternatives', title: 'Activepieces alternatives', line: 'If Activepieces is your likely pick' },
    { href: '/compare/50agents-vs-n8n', title: '50agents vs n8n', line: 'Row by row, sourced' },
  ],
};

export default page;
