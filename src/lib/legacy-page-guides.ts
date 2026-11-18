import type { LegacyGuideSection } from '@/components/LegacyPageGuide';

export const PRICING_PAGE_GUIDE: LegacyGuideSection[] = [
  {
    title: 'How 50agents pricing works',
    paragraphs: [
      'Every workspace starts with free credits so you can try automations, AI agents and apps without a credit card. When you need more capacity, you pay for usage: meeting recording is billed by the hour, and agent calls are metered after the included monthly allowance on internal applications.',
      'Pricing on this page reflects an earlier product slice. The current home page explains how Captain builds all four kinds of work — automations, AI agents, browser agents and apps — in one workspace.',
    ],
    subsections: [
      {
        title: 'What is included for free',
        paragraphs: [
          'Starter workspaces include enough credits to run real automations against your connected apps. Meeting recording, agent calls and browser-agent minutes all draw from the same balance so you can try combinations before you scale.',
        ],
      },
      {
        title: 'Transparent metering',
        paragraphs: [
          'You only pay for what runs. There are no surprise platform fees for connecting apps through viaSocket, and you can see credit use in your workspace before anything that spends money or reaches customers runs without approval.',
        ],
      },
      {
        title: 'Get started',
        paragraphs: [
          'Create a free workspace at 50agents-app.embarko.app, describe the first job in plain language, and Captain proposes the automations or agents to run it.',
        ],
      },
    ],
  },
];

export const AI_NOTE_TAKER_PAGE_GUIDE: LegacyGuideSection[] = [
  {
    title: 'About the AI meeting recorder',
    paragraphs: [
      'The AI Note Taker listens in meetings you choose, writes structured notes, and surfaces follow-ups so your team does not retype decisions into Slack, email or your CRM.',
      'It is one capability inside 50agents. The home page shows how the same workspace can also run order-to-cash flows, browser agents on sites without APIs, and custom apps.',
    ],
    subsections: [
      {
        title: 'Privacy and control',
        paragraphs: [
          'Recordings stay under your workspace policies. You decide which calendars and meetings are in scope, and any outbound message can wait for approval.',
        ],
      },
    ],
  },
];

export const TEMPLATES_PAGE_GUIDE: LegacyGuideSection[] = [
  {
    title: 'Using agent templates',
    paragraphs: [
      'Templates are published examples of automations and AI agents that teams already run on 50agents. Each one lists the apps it connects, the triggers that start it, and the actions it performs so you can see the shape of the work before you deploy it in your workspace.',
      'When you choose a template, Captain copies the structure into your org, swaps in your connections, and asks approval on anything that reaches customers or spends money.',
    ],
    subsections: [
      {
        title: 'Categories you will see',
        paragraphs: [
          'Sales and CRM templates follow up on leads and sync notes to your pipeline. Operations templates move orders, invoices and deliveries across accounting and messaging apps. Support templates draft replies and escalate exceptions to a human.',
        ],
      },
      {
        title: 'No perfect match',
        paragraphs: [
          'Describe the outcome on the home page instead. Captain can mix browser agents, custom apps and viaSocket connections in one flow, not only template-sized pieces.',
        ],
      },
    ],
  },
];

export const LOGIN_PAGE_GUIDE: LegacyGuideSection[] = [
  {
    title: 'Why sign in',
    paragraphs: [
      'Signing in opens your 50agents workspace: the apps, automations and AI agents Captain built for your team. New visitors can create a workspace from the same flow.',
      'Workspaces are private to your organization. Nothing runs against production data until you connect an app and approve the steps that need it.',
    ],
    subsections: [
      {
        title: 'Single sign-on',
        paragraphs: [
          'Authentication is handled through MSG91 proxy auth. After verification you land in your org workspace or return to the page that sent you here.',
        ],
      },
      {
        title: 'Having trouble',
        paragraphs: [
          'If the widget below does not load, disable blockers for msg91.com, refresh, or start from the home page Get started link. Corporate networks that intercept auth scripts may need an allowlist for proxy.msg91.com and 50agents-app.embarko.app.',
        ],
      },
    ],
  },
];