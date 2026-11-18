import type { AltPage } from './types';

const page: AltPage = {
  type: 'alternatives',
  slug: 'relay-app-alternatives',
  tool: 'relay',
  title: 'Relay.app alternatives after the shutdown | 50agents',
  description: 'Relay.app shut down in September 2026 and deleted all workflows. Alternatives with approval steps: Zapier, Make, n8n, Activepieces and 50agents.',
  h1: 'Relay.app alternatives',
  answer: [
    'Relay.app shut down in September 2026 and permanently deleted all accounts, workflows and run history, so every Relay workflow has to be rebuilt somewhere else.',
    'The tools that keep what Relay users liked most, a step that waits for a person to approve, are Zapier (Human in the Loop, Professional and up), Make (manual approvals in AI agents), n8n (human approval for tool calls), Activepieces (flow approvals) and 50agents, where anything sent to people outside waits for your yes by default.',
  ],
  published: '2026-11-19',
  updated: '2026-11-19',
  notice: {
    h: 'Relay.app is closed',
    body: 'Relay.app\'s homepage says it "shut down in September 2026" and that "All accounts, workflows, and run history have been permanently deleted." There is nothing to export. If you kept notes, screenshots or emails from your workflows, they are now your only record.',
  },
  why: {
    h: 'What Relay users need from the next tool',
    body: [
      'People replacing Relay usually want the same mix it offered: fixed workflows with AI steps inside, and a person in the loop at the steps that matter, so a draft could wait for a teammate before it went to a customer. That is the test to apply to every alternative.',
      'Because the workflows are gone, this is a rebuild from memory, not a migration. Pick the tool where you can describe a workflow fastest and check it before it runs.',
    ],
  },
  picks: [
    { need: 'Approvals on by default; describe and it is built', tool: 'fifty' },
    { need: 'The most apps, with Human in the Loop', tool: 'zapier' },
    { need: 'Visual scenarios, AI agents with approvals', tool: 'make' },
    { need: 'Self-hosted, with approval on tool calls', tool: 'n8n' },
    { need: 'Open source with flow approvals', tool: 'activepieces' },
  ],
  entries: [
    {
      tool: 'fifty',
      suits: 'Relay users who remember what their workflows did but not every step. Say it in a sentence; Captain asks what it cannot know, tests the plan on your real data, and any send to someone outside your workspace waits in Needs you until a person approves it.',
      limit: 'Approvals go to the people in your 50agents workspace, in the app; there are no email or Slack notifications for them yet.',
      limitUrl: 'https://50agents.com',
    },
    {
      tool: 'zapier',
      suits: 'Teams who want the biggest app catalog (10,537+) and an approval step that pauses a Zap for review.',
      limit: 'Human in the Loop is on Professional, Team and Enterprise only, not the free plan.',
      limitUrl: 'https://help.zapier.com/hc/en-us/articles/38731463206029-Request-approval-to-keep-your-workflow-running-with-Human-in-the-Loop',
    },
    {
      tool: 'make',
      suits: 'Teams who liked seeing the whole workflow; Make\'s AI agents can "add manual approvals, or stop the Agent at specific points".',
      limit: 'Approvals are described for AI agents; check that your scenario can pause where you need it before you rebuild.',
      limitUrl: 'https://www.make.com/en/ai-agents',
    },
    {
      tool: 'n8n',
      suits: 'Teams with a developer who want approvals on what an AI agent does, and runs on their own servers.',
      limit: 'No free cloud plan, and the workflow is built node by node.',
      limitUrl: 'https://n8n.io/pricing/',
    },
    {
      tool: 'activepieces',
      suits: 'Small teams who want a free plan for up to 5 users, approvals that gate steps touching money or customers, and an open-source core.',
      limit: '770+ apps; check the ones your Relay workflows used.',
      limitUrl: 'https://www.activepieces.com/',
    },
  ],
  stay: {
    h: 'Can anyone stay on Relay.app?',
    items: [
      'No. The service is closed and its pricing page returns an error. Anything still pointing at Relay, such as a webhook in another app, is failing silently; remove it.',
      'Relay links to a July 2026 copy of its homepage on the Internet Archive, which can remind you what the product did. It holds none of your workflows.',
    ],
  },
  move: [
    { title: 'Rebuild your list from the edges', body: 'Look in the apps your workflows touched: Gmail filters and sent mail, Slack messages your workflows posted, rows a workflow used to add. Each one points to a workflow you had.' },
    { title: 'Write each as one sentence', body: 'For example "every new HubSpot contact is added as a row to my Google Sheet and posted in a Slack channel", and say where a person used to approve.' },
    { title: 'Rebuild the customer-facing ones first', body: 'Anything that emailed customers is what is now not happening. Start there, with the approval step in place.' },
    { title: 'Clean up old connections', body: 'Revoke Relay\'s access in Google, Slack and your other apps\' connected-apps settings.' },
  ],
  faqs: [
    { q: 'When did Relay.app shut down?', a: 'Its homepage says September 2026, and that all accounts, workflows and run history were permanently deleted.' },
    { q: 'Can I get my Relay workflows back?', a: 'Not from Relay. Its homepage says everything was permanently deleted. Rebuild from your own notes and from the traces in the apps your workflows used.' },
    { q: 'Which alternative is closest to Relay.app?', a: 'For fixed steps with a person approving at key points, Zapier with Human in the Loop or 50agents with Needs you. For AI agents with approvals, Make or n8n.' },
  ],
  related: [
    { href: '/compare/zapier-alternatives', title: 'Zapier alternatives', line: 'If Zapier is on your list, its rivals too' },
    { href: '/compare/gumloop-alternatives', title: 'Gumloop alternatives', line: 'For teams moving to AI agents' },
    { href: '/compare/50agents-vs-zapier', title: '50agents vs Zapier', line: 'Row by row, sourced' },
  ],
};

export default page;
