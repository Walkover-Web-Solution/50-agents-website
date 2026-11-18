// Guide 28 (pages-brief B5). Research: Glean's agent builder guide, Salesforce, G2 and others for "how to choose an ai agent
// builder"; Lindy, Gumloop and Activepieces pricing pages; relay.app's shutdown notice, read 19 Nov 2026.
import type { Guide } from './types';
import { APPS } from './apps';

const g: Guide = {
  slug: 'how-to-choose-an-ai-agent-builder',
  n: 28,
  group: 'Choosing tools',
  kind: 'ai',
  title: 'How to choose an AI agent builder: 8 questions | 50agents',
  description:
    'Choose an AI agent builder by testing one real job: does it reach your apps, ask before it acts, show what it did, and cost what you expect?',
  h1: 'How to choose an AI agent builder',
  short:
    'Take one real job, build it in two or three builders on their free tiers, and compare them on eight questions: does it reach your apps, can you limit what it does, does it ask before risky actions, can you see every run, what does one run cost, how do you fix it, can you leave, and will the company be around. Feature lists matter less than how the tool behaves on your job.',
  published: '2026-11-19',
  updated: '2026-11-19',
  sections: [
    {
      id: 'questions',
      h2: 'The eight questions',
      body: [
        {
          table: {
            head: ['Question', 'What a good answer looks like'],
            rows: [
              ['1. Does it reach my apps?', 'Your apps, and the specific actions the job needs, are in its catalog.'],
              ['2. Can I limit what each AI agent touches?', 'Per-agent apps and accounts, not one key for everything.'],
              ['3. Does it ask before risky actions?', 'Sends, payments and deletions wait for a person, enforced by the product.'],
              ['4. Can I see what it did?', 'Each run with what it read, what it decided and what it changed.'],
              ['5. What does one run cost?', 'A clear unit (credits, tasks, runs) and the cost of your job’s run shown after testing.'],
              ['6. How do I fix it?', 'Change it in words or in a form; a version history with undo.'],
              ['7. Can I leave?', 'Export your data and instructions; no lock-in to one model.'],
              ['8. Will it be around?', 'A company with a track record. Relay.app, often recommended in these lists, says on its own site it shut down in September 2026 ([relay.app](https://relay.app/)).'],
            ],
          },
        },
        { p: 'Glean’s guide weights capabilities 25%, integrations 20%, security 20%, ease 15%, vendor 10% and cost 10% ([Glean](https://www.glean.com/blog/choose-best-ai-agent-builder)). For a small team we would move cost and ease up: an AI agent you cannot afford to run daily, or cannot fix yourself, does not get used.' },
      ],
    },
    {
      id: 'pricing',
      h2: 'How the builders charge (read 19 Nov 2026)',
      body: [
        {
          table: {
            head: ['Builder', 'Unit', 'Start'],
            rows: [
              ['[Lindy](https://www.lindy.ai/pricing)', 'Credits, used while it works: 2 to 250 for everyday asks, more for big jobs', '$50 of free credits for 7 days; Team from $29.99 a month per active user for 3,000 credits'],
              ['[Gumloop](https://www.gumloop.com/pricing)', 'Credits at $0.005 each: model tokens, compute and paid tool calls, plus an 8% fee', 'No free plan, 14-day trial; Pro $37 a month for 20,000 credits'],
              ['[Activepieces](https://www.activepieces.com/pricing)', '1 credit per run, plus 2 to 20 for AI steps', 'Free 1,000 credits; Plus $20 a month for 10,000'],
              ['50agents', 'Credits: $1 buys 1,000; Captain’s answers cost about 24 credits each today', 'Every workspace starts free with 2,000 credits'],
            ],
          },
        },
      ],
    },
    {
      id: 'steps',
      h2: 'How to run the test, step by step',
      body: [
        {
          steps: [
            { title: 'Pick one real job', body: 'One you do weekly, with real apps and a send at the end. "Follow up quiet deals" is a good test.' },
            { title: 'Shortlist two or three builders', body: 'By question 1: they must reach your apps.' },
            { title: 'Build it in each on the free tier', body: 'Time how long it takes and note where you got stuck.' },
            { title: 'Run each on the same 10 real cases', body: 'Compare the outputs side by side. Count edits needed.' },
            { title: 'Check the run log and the bill', body: 'Can you see why it did what it did? What did the 10 runs cost?' },
            { title: 'Break it on purpose', body: 'Disconnect an app, feed it an odd case. See what it tells you.' },
          ],
        },
      ],
    },
    {
      id: 'example',
      h2: 'Running the test in 50agents',
      body: [
        { p: 'In 50agents you start the test with one sentence. Captain shows the plan with the apps it uses and what asks you first before anything is built, the AI agent’s runs and their receipts are on its page and in Activity, and Usage in Settings logs every credit charged.' },
        { ask: 'Set up an AI agent that finds my HubSpot deals with no reply in 5 days every weekday at 9:00 and drafts a follow-up email for me to approve' },
        {
          view: {
            type: 'plan',
            ask: 'Set up an AI agent that finds my HubSpot deals with no reply in 5 days every weekday at 9:00 and drafts a follow-up email for me to approve',
            face: 'writer',
            name: 'Quiet deals follow-up',
            job: 'Finds open deals with no reply in 5 days and drafts a follow-up for you to approve',
            steps: ['Read open deals in HubSpot and their last activity', 'Read the last email thread for each quiet deal', 'Draft a follow-up in the same thread'],
            when: 'Every weekday at 9:00',
            uses: [APPS.hubspot, APPS.gmail],
            asksFirst: 'Sending any email, any change in your apps',
          },
          caption: 'The test job as a plan in 50agents: apps, schedule and approvals visible before you build. Example data.',
        },
      ],
    },
  ],
  wrong: [
    { title: 'Choosing from a feature list', body: 'Every list says "integrations" and "memory". Only a real job shows the difference.' },
    { title: 'Costs you cannot predict', body: 'Usage per run varies with what the AI agent reads. Run your job 10 times and look at the bill before scheduling it.' },
    { title: 'An AI agent stuck in a loop', body: 'It retries and spends. Prefer builders that cap runs and show failed runs plainly.' },
    { title: 'Weak logs', body: 'You cannot explain to a customer why they got an email. Make question 4 a hard requirement.' },
    { title: 'The vendor goes away', body: 'It happens. Keep your instructions and data exportable.' },
  ],
  faqs: [
    { q: 'What is the best no-code AI agent builder?', a: 'The one that runs your real job well, in your apps, at a cost you accept. Test two or three on the same job rather than trusting rankings.' },
    { q: 'AI agent builder or automation tool?', a: 'An automation tool for fixed steps; an AI agent builder when each case needs judgement. Many jobs need a bit of both. See [AI agent vs automation](/guides/ai-agent-vs-automation-which-one-you-need).' },
    { q: 'How much do AI agents cost to run?', a: 'From a fraction of a cent to a few cents a run for small jobs, more for AI agents that read a lot. Builders price in credits, so test your job and read the usage log.' },
  ],
  sources: [
    { label: 'Glean: How to choose the best AI agent builder', href: 'https://www.glean.com/blog/choose-best-ai-agent-builder' },
    { label: 'Lindy: Pricing', href: 'https://www.lindy.ai/pricing' },
    { label: 'Gumloop: Pricing', href: 'https://www.gumloop.com/pricing' },
    { label: 'Activepieces: Pricing', href: 'https://www.activepieces.com/pricing' },
    { label: 'relay.app (shutdown notice)', href: 'https://relay.app/' },
  ],
  related: ['how-to-build-an-ai-agent-without-code', 'zapier-vs-make-vs-n8n-for-a-small-team', 'how-much-automation-costs-credits-tasks-and-runs-compared'],
};

export default g;
