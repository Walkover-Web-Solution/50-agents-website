// Glossary terms about connecting and building: API, integration, OAuth, MCP, no-code, internal tool, prompt, human in the loop.
// Product facts: app/PRODUCT.md, app/src/features/{connections,apps,needs}/CLAUDE.md, templates/list.ts, apps/recipes.ts,
// and this site's MCP server (src/app/mcp, src/lib/mcp-tools.json, src/lib/mcp-server-card.ts), read 19 Nov 2026.
import type { Term } from './types';

const U = '2026-11-19';

export const api: Term = {
  slug: 'api',
  term: 'API',
  title: 'What is an API? A plain answer for owners | 50agents',
  description:
    'An API is the set of requests an app accepts from other software, like "list last week\'s payments". Why it decides what you can connect and automate.',
  definition: [
    'An API is the published set of requests a piece of software accepts from other software, such as "list last week\'s payments" or "create a contact".',
    'If an app has an API, other tools can read and change its data without anyone opening its screens; if it has none, only something that uses the screens can.',
  ],
  example: {
    kind: 'ai',
    name: 'Weekly revenue summary',
    ask: "Set up an AI agent that reads last week's payments in Stripe every Monday at 9:00 and emails me the totals and what changed",
    body: [
      'Every Monday the AI agent asks Stripe\'s API, through viaSocket, for last week\'s payments. It never sees Stripe\'s dashboard; it gets the payments as data, adds them up and writes what changed.',
      'You never touch the API yourself. You connect Stripe once, and the AI agent uses the requests viaSocket\'s catalog lists for it.',
    ],
  },
  confused: {
    with: 'integration',
    href: '/learn/integration',
    body: [
      'The API is the door an app offers. An integration is a finished connection built on that door, which handles signing in, field names and limits for you.',
    ],
  },
  more: {
    h2: 'Choosing software? Ask about the API',
    body: [
      'An app with an API can be part of automations, AI agents and reports later. An app without one can still be reached by a browser agent through its screens, but that is slower and needs your sign-in.',
      'Most business apps people use daily, from Gmail to Stripe to Shopify, have one. Older industry software and government portals often do not, and those are where browser agents earn their keep.',
    ],
  },
  links: [
    { label: 'AI agents', href: '/ai-agents' },
    { label: 'How to automate a website that has no API', href: '/guides/how-to-automate-a-website-that-has-no-api' },
    { label: 'What is a webhook?', href: '/learn/webhook' },
    { label: 'What is MCP?', href: '/learn/mcp' },
  ],
  updated: U,
};

export const integration: Term = {
  slug: 'integration',
  term: 'Integration',
  title: 'What is an integration? Apps connected, explained | 50agents',
  description:
    'An integration is a ready-made connection between two apps so data moves without copying by hand. Native integrations versus platforms like viaSocket.',
  definition: [
    'An integration is a ready-made connection between two pieces of software, so data moves between them without anyone copying it by hand.',
    'It usually sits on each app\'s API and takes care of signing in, field names and limits, so you choose what should happen rather than how.',
  ],
  example: {
    kind: 'auto',
    name: 'New lead to your sheet and Slack',
    ask: 'Set up an automation: every new HubSpot contact is added as a row to my Google Sheet and posted in a Slack channel',
    body: [
      'Three integrations in one automation: HubSpot, Google Sheets and Slack. 50agents reaches them, and 2,300+ others, through viaSocket.',
      'You connect each app once in Connections. After that, each AI agent or automation uses only the connections it needs, and a connection limited to one AI agent is never borrowed by another.',
    ],
  },
  confused: {
    with: 'API',
    href: '/learn/api',
    body: [
      'An API is what an app offers; an integration is something built on it. There are two kinds of integration worth telling apart: native ones that an app builds for one partner, fixed in what they do, and platforms like viaSocket that connect thousands of apps and let you choose the steps.',
    ],
  },
  more: {
    h2: 'What to check before you rely on one',
    body: [
      'Which events and actions it offers, because that list is all it can do. Whether it starts instantly or checks every few minutes. And who it acts as: in 50agents a connection belongs to the workspace, and you choose whether the whole workspace or only some AI agents may use it.',
    ],
  },
  links: [
    { label: 'Automations', href: '/automations' },
    { label: 'How to automate data entry between two apps', href: '/guides/how-to-automate-data-entry-between-two-apps' },
    { label: 'What is OAuth?', href: '/learn/oauth' },
    { label: 'What is an action?', href: '/learn/action' },
  ],
  updated: U,
};

export const oauth: Term = {
  slug: 'oauth',
  term: 'OAuth',
  title: 'What is OAuth? Apps connected without passwords | 50agents',
  description:
    'OAuth lets one app act in another on your behalf without your password: you approve what it may do, and it gets a token you can revoke. A real example.',
  definition: [
    'OAuth is the standard way to let one app act in another on your behalf without handing over your password: you sign in to the other app, see what is being asked for, and approve.',
    'The app then holds a token limited to what you approved, which you can take back at any time from the other app\'s settings.',
  ],
  example: {
    kind: 'app',
    name: 'Invoices to collect',
    ask: 'Chase my unpaid invoices',
    body: [
      'The invoices desk sends reminders from your Gmail, so it needs a connection. Captain shows a Connect card in the chat; Google\'s own sign-in window opens, lists what is being asked for, and you approve there.',
      '50agents never sees your Google password. The connection appears in Connections, and you can remove it there or in your Google Account\'s security settings.',
    ],
  },
  confused: {
    with: 'Sign in with Google (SSO)',
    body: [
      '"Sign in with Google" proves who you are to a site. OAuth grants an app permission to do things in another app. They often use the same Google window, which is why they get mixed up; the difference is in the list of permissions it shows.',
    ],
  },
  sources: [{ label: 'RFC 6749, The OAuth 2.0 Authorization Framework (Oct 2012)', href: 'https://www.rfc-editor.org/rfc/rfc6749', read: '19 Nov 2026' }],
  more: {
    h2: 'Read the permission list',
    body: [
      'The consent screen is the one moment you see exactly what you are granting: read email, send email, manage contacts. If an app asks for more than the job needs, stop there.',
      'Tokens can also run out or be cut off when a password changes. In 50agents an expired connection shows as "sign-in expired" in Connections with Reconnect, and Care raises it if an AI agent needs it.',
    ],
  },
  links: [
    { label: 'How to give an AI agent access to your apps safely', href: '/guides/how-to-give-an-ai-agent-access-to-your-apps-safely' },
    { label: 'Apps', href: '/apps' },
    { label: 'What is an integration?', href: '/learn/integration' },
    { label: 'What is an API?', href: '/learn/api' },
  ],
  updated: U,
};

export const mcp: Term = {
  slug: 'mcp',
  term: 'MCP',
  title: 'What is MCP (Model Context Protocol)? | 50agents',
  description:
    'MCP is an open standard for connecting AI apps to outside tools and data. What it is, what the 50agents.com MCP server does, and whether you need MCP at all.',
  definition: [
    'MCP, the Model Context Protocol, is an open standard for connecting AI applications to outside tools and data: a server describes the tools it offers, and an AI client can call them.',
    'Anthropic introduced it on 25 November 2024; the current version of the specification is dated 28 July 2026.',
  ],
  example: {
    kind: 'captain',
    name: 'The 50agents.com MCP server',
    ask: 'https://50agents.com/mcp',
    body: [
      '50agents.com runs a small public MCP server at that address. It is read-only and has one tool, list_agent_templates, which returns the site\'s public template listing a page at a time. It speaks the 2025-11-25 and 2024-11-05 versions of the protocol.',
      'It cannot sign you up, build anything or touch a workspace. Your AI agents and automations in 50agents do not use MCP to reach your apps: they connect through viaSocket.',
    ],
  },
  confused: {
    with: 'API',
    href: '/learn/api',
    body: [
      'An API is one app\'s own set of requests, each in its own shape. MCP is a common shape for describing tools to an AI, so any MCP client can discover and call any MCP server\'s tools without custom code. An MCP server often calls an API underneath.',
    ],
  },
  more: {
    h2: 'Do you need MCP?',
    body: [
      'Only if you want an AI app you already use, such as a desktop assistant, to reach a tool directly. To have AI agents work in your business apps, you can use a product that has already done the connecting; 50agents does it through viaSocket\'s catalog of 2,300+ apps.',
      'The specification says hosts must get the user\'s explicit consent before calling a tool, the same idea as approving each send in 50agents.',
    ],
  },
  sources: [
    { label: 'Anthropic: Introducing the Model Context Protocol (25 Nov 2024)', href: 'https://www.anthropic.com/news/model-context-protocol', read: '19 Nov 2026' },
    { label: 'MCP specification: Versioning', href: 'https://modelcontextprotocol.io/specification/versioning', read: '19 Nov 2026' },
  ],
  links: [
    { label: 'AI agents', href: '/ai-agents' },
    { label: 'What is an API?', href: '/learn/api' },
    { label: 'What is an integration?', href: '/learn/integration' },
    { label: 'How to give an AI agent access to your apps safely', href: '/guides/how-to-give-an-ai-agent-access-to-your-apps-safely' },
  ],
  updated: U,
};

export const noCode: Term = {
  slug: 'no-code',
  term: 'No-code',
  title: 'What is no-code? Describe it, get it built | 50agents',
  description:
    'No-code means building working software without writing code. How it moved from drag-and-drop canvases to describing what you want, with a real example.',
  definition: [
    'No-code means building working software without writing programming code, by choosing, arranging or describing what you want.',
    'Early no-code tools meant drag-and-drop canvases; newer ones, 50agents among them, let you describe the result in a sentence and answer a few questions.',
  ],
  example: {
    kind: 'app',
    name: 'Invoices to collect',
    ask: 'Chase my unpaid invoices',
    body: [
      'Four words. Captain asks which apps you use today, where your invoices are now, which currency, and whether reminders should go out from your email, each with a usual answer you can take in one tap.',
      'Then it builds an invoices list, a To collect board, a Late list and an AI agent that drafts reminders. The AI writes no code: the app is data, built from parts that are already tested, so a change cannot break it.',
    ],
  },
  confused: {
    with: 'low-code',
    body: [
      'Low-code tools let you build mostly visually but expect some code for the hard parts. No-code tools aim for none, and accept limits in return: in 50agents, an app gets boards, tables and numbers, but no charts yet.',
    ],
  },
  more: {
    h2: 'What no-code still asks of you',
    body: [
      'Decisions. Which currency, who may be emailed, whether a reminder needs your OK. A good no-code tool asks those plainly instead of filling them in silently.',
      'And a look at the result before it goes live. In 50agents an app is drawn as a Blueprint until you tap Build it, and an automation is tested on your real data and kept as a draft until you make it live.',
    ],
  },
  links: [
    { label: 'Apps', href: '/apps' },
    { label: 'How to build an AI agent without code', href: '/guides/how-to-build-an-ai-agent-without-code' },
    { label: 'Internal tools without code', href: '/guides/internal-tools-without-code-what-to-build-first' },
    { label: 'What is an internal tool?', href: '/learn/internal-tool' },
  ],
  updated: U,
};

export const internalTool: Term = {
  slug: 'internal-tool',
  term: 'Internal tool',
  title: 'What is an internal tool? With examples | 50agents',
  description:
    'An internal tool is software a business makes for its own team, not customers: a pipeline, a requests desk. Most start as a spreadsheet. A real example.',
  definition: [
    'An internal tool is software a business makes for its own team to run its work, not for customers to use: a sales pipeline, a requests desk, a list of what is owed.',
    'Most begin life as a spreadsheet that grew too big to keep straight.',
  ],
  example: {
    kind: 'app',
    name: 'Customer requests desk',
    ask: 'Keep track of customer requests and draft the replies',
    body: [
      'Captain builds a Requests list with subject, customer, email, status, priority, kind and an answer-by date, then three screens: a Desk board by status, an Urgent list, and All requests.',
      'Its crew member, Desk, sorts each new request by kind and priority and drafts a reply to each question from what it knows about your business. Each reply waits for your OK.',
    ],
  },
  confused: {
    with: 'SaaS',
    body: [
      'SaaS is software you rent that works the same for every customer. An internal tool is shaped around your own fields and stages. Many internal tools pull data from SaaS apps rather than replacing them.',
    ],
  },
  more: {
    h2: 'Start from the spreadsheet you have',
    body: [
      'Save it as CSV or Excel and drop it into the app. 50agents shows where each column will go and offers useful leftover columns as new fields; Undo import takes it all back.',
      'Then let the tool do one job the spreadsheet never could: in the requests desk, the Urgent list and the Late count on the Overview update themselves, and nobody has to remember to sort the sheet.',
    ],
  },
  links: [
    { label: 'Apps', href: '/apps' },
    { label: 'Internal tools without code: what to build first', href: '/guides/internal-tools-without-code-what-to-build-first' },
    { label: 'How to build a customer requests desk from your inbox', href: '/guides/how-to-build-a-customer-requests-desk-from-your-inbox' },
    { label: 'What is no-code?', href: '/learn/no-code' },
  ],
  updated: U,
};

export const prompt: Term = {
  slug: 'prompt',
  term: 'Prompt',
  title: 'What is a prompt in AI? Plain answer | 50agents',
  description:
    'A prompt is the text that tells an AI model what to do: the task, the context and the limits. How a prompt in a chat differs from one that runs every day.',
  definition: [
    'A prompt is the text you give an AI model to tell it what to do: the task, the context it needs and any limits.',
    'In a chat you write a new prompt each time; inside an AI agent or an automation, a fixed prompt runs again and again on new data.',
  ],
  example: {
    kind: 'ai',
    name: 'Draft replies to support email',
    ask: 'Set up an AI agent that reads new support emails, drafts a reply from what you know about my business, and asks me before sending',
    body: [
      'That sentence is a prompt to Captain. Tapping the Playbook sends it with ". Fit it to my business." added, so Captain shapes the plan to what it knows about you before building.',
      'The AI agent it builds gets a prompt of its own: its instructions, kept in its memory and used on every run. You change them by asking in its chat, and each change is a version you can undo.',
    ],
  },
  confused: {
    with: 'instructions (system prompt)',
    body: [
      'A prompt is usually one request. Instructions are the standing prompt that frames every request: who the AI agent works for, what it may do, what it must ask about. Most surprises in AI agents come from the instructions, not the request.',
    ],
  },
  more: {
    h2: 'What makes a standing prompt work',
    body: [
      'Say what done looks like ("a draft in the same thread, under 120 words"), what to leave alone, and what to ask about. A prompt that runs a hundred times will meet every odd case you did not mention, so name the likely ones.',
    ],
  },
  links: [
    { label: 'How to write instructions for an AI agent', href: '/guides/how-to-write-instructions-for-an-ai-agent' },
    { label: 'AI agents', href: '/ai-agents' },
    { label: 'What is an LLM?', href: '/learn/llm' },
    { label: 'What is an AI agent?', href: '/learn/ai-agent' },
  ],
  updated: U,
};

export const humanInTheLoop: Term = {
  slug: 'human-in-the-loop',
  term: 'Human in the loop',
  title: 'What is human in the loop? AI that asks first | 50agents',
  description:
    'Human in the loop means a person approves or decides at set points while AI does the rest. Which steps should wait for you, with a real example.',
  definition: [
    'Human in the loop means a person approves, corrects or decides at set points while AI or automation does the rest of the work.',
    'The point is to keep people on the decisions that are costly to get wrong, not on every step.',
  ],
  example: {
    kind: 'ai',
    name: 'Draft replies to support email',
    ask: 'Set up an AI agent that reads new support emails, drafts a reply from what you know about my business, and asks me before sending',
    body: [
      'The AI agent reads and drafts on its own. Each reply becomes a Needs you item with Approve and send, Change and Decline, shown on its own screen, on Home and in the chat it came from, until you answer.',
      'What you change is not lost: corrections in its chat become lessons in its memory for the next drafts.',
    ],
  },
  confused: {
    with: 'human on the loop',
    body: [
      'In the loop, the work stops until a person says yes. On the loop, the work goes ahead and a person watches and can step in. Activity in 50agents is the "on the loop" view: everything done, by whom, from where to where.',
    ],
  },
  more: {
    h2: 'Which steps should wait for you',
    body: [
      '50agents\' default: anything that spends money, reaches people outside your workspace, or changes who has access asks first. Reading, and writing to your own tools, such as a row in your own sheet, run on their own.',
    ],
  },
  links: [
    { label: 'How to make an AI agent ask before it acts', href: '/guides/how-to-make-an-ai-agent-ask-before-it-acts' },
    { label: 'How to draft email replies with AI and still check them', href: '/guides/how-to-draft-email-replies-with-ai-and-still-check-them' },
    { label: 'AI agents', href: '/ai-agents' },
    { label: 'Agentic AI', href: '/learn/agentic-ai' },
  ],
  updated: U,
};
