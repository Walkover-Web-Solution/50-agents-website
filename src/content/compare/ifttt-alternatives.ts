import type { AltPage } from './types';

const page: AltPage = {
  type: 'alternatives',
  slug: 'ifttt-alternatives',
  tool: 'ifttt',
  title: 'IFTTT alternatives for home, phone and work | 50agents',
  description: 'IFTTT alternatives: Apple Shortcuts for your iPhone, Home Assistant for a local smart home, Zapier or Make for work apps, 50agents for email chores.',
  h1: 'IFTTT alternatives',
  answer: [
    'For automations on your iPhone, Apple Shortcuts already runs them on your device, and for a smart home you control locally, Home Assistant lists 1,600+ integrations and keeps your data at home.',
    'If you have moved from personal Applets to work apps (Gmail, Sheets, Slack, a CRM), Zapier and Make have free plans with multi-step workflows, and 50agents builds an AI agent for chores like drafting replies to your unread email from one sentence.',
  ],
  published: '2026-11-19',
  updated: '2026-11-19',
  why: {
    h: 'Why people look past IFTTT',
    body: [
      'IFTTT is cheap and simple, and for many people it is enough. The friction is speed and depth. On the free plan IFTTT checks for new events once an hour, so "when I post a photo, save it to Drive" can take an hour to happen. Starter, at $25.08 a year, brings that to 15 minutes.',
      'The other reason is that Applets are short. Once you want "if this, then that, then that, but only if", or you are doing it for a small business rather than your living room, you want a tool built for longer workflows.',
    ],
  },
  picks: [
    { need: 'Automations on your iPhone or iPad', tool: 'shortcuts' },
    { need: 'A smart home that runs locally', tool: 'homeassistant' },
    { need: 'Work apps, the most of them', tool: 'zapier' },
    { need: 'Longer workflows with a generous free plan', tool: 'make' },
    { need: 'Email and calendar chores handled by an AI agent', tool: 'fifty' },
  ],
  entries: [
    {
      tool: 'fifty',
      suits: 'People who use IFTTT for their own admin and want more judgement than an Applet has, for example "set up an AI agent that sends me tomorrow\'s meetings from Google Calendar in Slack every day at 18:00", or one that drafts replies to your unread email every weekday at 8:00, with nothing sent without your yes.',
      limit: 'No smart-home devices, no phone app and no location triggers. It works with web apps, not your lights or your thermostat.',
      limitUrl: 'https://ifttt.ai/',
    },
    {
      tool: 'shortcuts',
      suits: 'iPhone and iPad owners. Automations start from things only your phone knows: the time of day, arriving at a place, opening an app.',
      limit: 'Automations are "specific to a device", so they run on your phone, not in the cloud while it is off.',
      limitUrl: 'https://support.apple.com/guide/shortcuts/intro-to-automation-shortcuts-apd690170742/ios',
    },
    {
      tool: 'homeassistant',
      suits: 'Smart-home fans who want everything to run at home, without a cloud, with an automation engine for "lights on at sunset" and "garage door left open".',
      limit: 'You run it yourself on a device at home, so setup and updates are your job.',
      limitUrl: 'https://www.home-assistant.io/',
    },
    {
      tool: 'zapier',
      suits: 'People who moved from personal to work automations and need the long tail of business apps: 10,537+.',
      limit: 'The free plan is 100 tasks a month and two-step Zaps only, less than IFTTT\'s free 1,000 credits.',
      limitUrl: 'https://zapier.com/pricing',
    },
    {
      tool: 'make',
      suits: 'Tinkerers who want longer, branching workflows and a free plan of 1,000 credits a month, drawn on a visual canvas.',
      limit: 'Most actions cost a credit each, so a long workflow uses the free credits faster than a one-step Applet.',
      limitUrl: 'https://www.make.com/en/pricing',
    },
  ],
  stay: {
    h: 'Who should stay on IFTTT',
    items: [
      'Your automations involve smart-home devices or your phone. IFTTT covers both, with apps for iOS and Android.',
      'Your Applets are one step and an hour\'s delay is fine. The free plan, with unlimited Applets, is hard to beat.',
      'You want it cheap: Starter is $25.08 a year and Pro is $65.88 a year.',
    ],
  },
  move: [
    { title: 'Sort Applets by where they run', body: 'Phone and location ones go to Shortcuts, device ones to Home Assistant or stay on IFTTT, and web-app ones to a work automation tool.' },
    { title: 'Note each Applet\'s trigger and action', body: 'We found no Applet export on IFTTT\'s own pages, so write them down: "If new email from X, then add a row to my sheet".' },
    { title: 'Rebuild the web-app ones in a sentence', body: 'In 50agents you can type the Applet as you wrote it; Captain turns it into an automation and asks which sheet or which inbox.' },
    { title: 'Turn off, then delete', body: 'Turn each Applet off once its replacement has run for a week.' },
  ],
  faqs: [
    { q: 'Is there a free alternative to IFTTT?', a: 'Yes. Make (1,000 credits a month), Zapier (100 tasks) and 50agents (2,000 credits to start) have free plans. Home Assistant is open source, and Apple Shortcuts is Apple\'s own app on iPhone, iPad and Mac.' },
    { q: 'What is the best IFTTT alternative for a smart home?', a: 'Home Assistant, if you are happy to run it at home: 1,600+ integrations and local control.' },
    { q: 'How much does IFTTT cost now?', a: 'Free gives 1,000 credits a month with hourly checks. Starter is $2.09 a month billed $25.08 yearly, Pro is $5.49 a month billed $65.88 yearly, and Pro+ is $13.99 a month billed $167.88 yearly.' },
  ],
  related: [
    { href: '/compare/zapier-alternatives', title: 'Zapier alternatives', line: 'If you are choosing a work automation tool' },
    { href: '/compare/power-automate-alternatives', title: 'Power Automate alternatives', line: 'For work automations on Microsoft 365' },
    { href: '/ai-agents', title: 'AI agents', line: 'What an AI agent in 50agents does for you' },
  ],
};

export default page;
