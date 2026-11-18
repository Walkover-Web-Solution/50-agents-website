// Hub 13 (pages-brief B2): /ai-agents, for "AI agent builder" and "AI agents for small business".
// Product facts: app/PRODUCT.md, app/src/features/agents/CLAUDE.md, product/problem-ledger.md (P36, P39), read 19 Nov 2026.
// Competitors: lindy.ai/pricing, relevanceai.com/pricing, zapier.com/agents and zapier.com/pricing, read 19 Nov 2026.
import type { Hub } from './types';
import { ICONS } from './apps-icons';

const hub: Hub = {
  kind: 'ai',
  path: '/ai-agents',
  crumb: 'AI agents',
  title: 'AI agent builder for small business | 50agents',
  description:
    'Describe the job and Captain builds an AI agent that works in your apps on a schedule, drafts instead of sending, and asks you before any change.',
  h1: 'Build an AI agent by describing the job',
  answer: [
    'An AI agent in 50agents is a worker with instructions, the apps you give it, a schedule and its own chat, and it uses judgement on each run: which deals need a nudge, what a reply should say.',
    'You describe the job to Captain in plain words, approve the plan it shows you, and the AI agent is built; it reads on its own, and any change in an app waits for your yes.',
  ],
  promises: ['Reads on its own, asks before it changes anything', 'Only the apps you give it', 'Every change to it can be undone'],
  hero: {
    ask: 'Set up an AI agent that finds my HubSpot deals with no reply in 5 days every weekday at 9:00 and drafts a follow-up email for me to approve',
    plan: [
      { label: 'Kind', value: 'AI agent' },
      { label: 'Runs', value: 'Weekdays at 9:00' },
      { label: 'Apps', value: 'HubSpot, Gmail' },
      { label: 'Asks first', value: 'Sending any email' },
    ],
  },
  view: {
    h2: 'What an AI agent looks like once it is built',
    p: 'Each AI agent gets its own page: what waits on you, its latest work, its runs, how it works and what it learned. This is the quiet-deals AI agent with example data, drawn from the app\'s own screens.',
  },
  can: [
    'Follow instructions you write in plain words, kept in its memory, and change them from its chat. Every change is a version you can undo.',
    'Use only the apps you give it, from the ones your workspace has connected. 50agents reaches 2,300+ apps through viaSocket.',
    'Run on a schedule in your time zone, or when you ask it in its chat.',
    'Read on its own. Any change in an app, such as sending an email or updating a deal, waits in Needs you until you approve it.',
    'End every run with a piece of work you can read: a title, a summary, what it wrote and what waits on you, plus a receipt in Activity.',
    'Get looked after by Care, which notices failed runs and expired connections and fixes them or asks you.',
  ],
  cant: [
    'Start on an app event, such as "when a new email arrives". Captain builds that as an automation instead, which can hand an unclear case to an AI agent.',
    'Have an email address of its own. It sends from the apps you connect, such as your Gmail.',
    'Undo what it did in another app. Writes in your outside apps are logged in Activity, not reversible; Undo covers its own setup and 50agents records.',
    'Notify you by email or WhatsApp. What needs you shows in the app: on Needs you, on Home and in the chat it came from.',
    'Make more than about 10 app calls in one run; its instructions stop it there.',
    'Be sure a search that finds nothing means nothing is there. After a Gmail case where "unread" found no mail, its runs now say what they searched for instead of reporting "none" as a fact.',
  ],
  limitsNote:
    'From the 50agents app\'s source and its problem ledger (P36, P39), read 19 Nov 2026. The Gmail fix for unread mail is shipped and waiting on its live check.',
  ucIntro: 'Five of the twelve ready-made starts are AI agents. Each is a Playbook in the app: tap it and Captain plans it for your business.',
  apps: {
    intro: 'The apps the AI agent starts lean on today. Any of the 2,300+ apps in viaSocket\'s catalog can be given to an AI agent once your workspace connects it.',
    list: [
      { name: 'Gmail', icon: ICONS.Gmail, why: 'Reads mail, drafts replies and follow-ups. In four of the five AI agent starts.' },
      { name: 'HubSpot', icon: ICONS.HubSpot, why: 'Finds deals with no reply, so the AI agent knows whom to follow up.' },
      { name: 'Stripe', icon: ICONS.Stripe, why: 'Reads last week\'s payments for a Monday summary of what changed.' },
      { name: 'Google Calendar', icon: ICONS['Google Calendar'], why: 'Reads tomorrow\'s meetings for an evening brief.' },
      { name: 'Slack', icon: ICONS.Slack, why: 'Where a brief or a summary lands, if you would rather not get email.' },
    ],
  },
  others: {
    intro: 'If you are comparing AI agent builders, these are the ones people search for alongside "AI agent builder". Facts read on each vendor\'s own page on 19 Nov 2026.',
    list: [
      {
        name: 'Lindy',
        href: 'https://www.lindy.ai/pricing',
        plan: 'Free trial with $50 in credits for 7 days; Team plan $29.99 a month for 3,000 credits.',
        better: 'States SOC 2 Type II on its site and lists more integrations than 50agents. 50agents has no security certification.',
        note: 'Built around one AI assistant you hire; 50agents builds separate AI agents, automations, browser agents and apps.',
      },
      {
        name: 'Relevance AI',
        href: 'https://relevanceai.com/pricing',
        plan: 'No public price: the pricing page shows Enterprise and "Talk to sales".',
        better: 'Offers hosting in the US, EU or Australia and states SOC 2 Type II.',
        note: 'Aimed at go-to-market teams in larger companies; 50agents starts free without a call.',
      },
      {
        name: 'Zapier Agents',
        href: 'https://zapier.com/pricing',
        plan: 'Free with 400 activities a month; Pro about $33.33 a month billed yearly for 1,500 activities.',
        better: 'Sits on Zapier\'s app directory, far larger than 2,300+ apps.',
        note: 'You set up the AI agent yourself in Zapier; in 50agents Captain plans it from your sentence and you approve the plan.',
      },
    ],
  },
  faqs: [
    {
      q: 'What is an AI agent builder?',
      a: 'A tool that turns a description of a job into software that does the job in your apps on its own schedule. In 50agents the builder is Captain: you describe the job, it asks what it cannot guess, shows a plan, and builds the AI agent when you tap Build it.',
    },
    {
      q: 'Can I build an AI agent without code?',
      a: 'Yes. Everything is in plain words: the ask, Captain\'s plan, the AI agent\'s instructions and the changes you make later in its chat. There is no canvas to wire and no code to write.',
    },
    {
      q: 'Will an AI agent send emails without asking me?',
      a: 'Not by default. Reading runs on its own; sending, updating a record, spending money or changing access waits in Needs you for one tap. You can change how much each AI agent does alone.',
    },
    {
      q: 'AI agent or automation: which do I need?',
      a: 'If the steps are the same every time, an automation: it uses AI only in a step that needs it, and it can start on an app event. If each run needs a decision, such as which deals are worth a follow-up, an AI agent. Captain picks and tells you which; the table above shows the rule.',
    },
    {
      q: 'How much does an AI agent cost to run?',
      a: 'Every workspace starts free with 2,000 credits, and $1 buys 1,000 more. A run costs credits for its AI and its app calls, and each run shows its cost. At 0 credits no run starts until you add more.',
    },
  ],
  related: [
    { label: 'How to build an AI agent without code', href: '/guides/how-to-build-an-ai-agent-without-code' },
    { label: 'AI agent vs automation: which one you need', href: '/guides/ai-agent-vs-automation-which-one-you-need' },
    { label: 'How to make an AI agent ask before it acts', href: '/guides/how-to-make-an-ai-agent-ask-before-it-acts' },
    { label: 'What is an AI agent?', href: '/learn/ai-agent' },
    { label: 'Human in the loop', href: '/learn/human-in-the-loop' },
    { label: 'Lindy alternatives', href: '/compare/lindy-alternatives' },
  ],
  final: {
    h2: 'Describe your first AI agent',
    p: 'Tell Captain the job in one sentence. It plans it, you approve, it builds. Every workspace starts free with 2,000 credits.',
    cta: 'Build an AI agent with Captain',
  },
  updated: '2026-11-19',
};

export default hub;
