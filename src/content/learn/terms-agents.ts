// Glossary terms about AI that acts: AI agent, browser agent, agentic AI, AI assistant, LLM.
// Product facts: app/PRODUCT.md, app/src/features/{agents,browser,tasks}/CLAUDE.md, templates/list.ts, gtm/FACTS.md, read 19 Nov 2026.
import type { Term } from './types';

const U = '2026-11-19';

export const aiAgent: Term = {
  slug: 'ai-agent',
  term: 'AI agent',
  title: 'What is an AI agent? A plain definition | 50agents',
  description:
    'An AI agent is software with a goal, instructions and tools that decides on each run which steps to take. A plain definition, a real example and its limits.',
  definition: [
    'An AI agent is software that is given a goal, instructions and access to tools, and decides on each run which steps to take to reach that goal.',
    'Where a fixed automation does the same thing every time, an AI agent reads the situation first and chooses: which email needs a reply, which deal has gone quiet, what the reply should say.',
  ],
  example: {
    kind: 'ai',
    name: 'Follow up quiet deals',
    ask: 'Set up an AI agent that finds my HubSpot deals with no reply in 5 days every weekday at 9:00 and drafts a follow-up email for me to approve',
    body: [
      'Each weekday at 9:00 it reads your open deals in HubSpot, checks the last email on each in Gmail, and decides which have really gone quiet.',
      'For each quiet one it drafts a follow-up in the same thread. The drafts wait in Needs you; nothing is sent until you tap Approve and send.',
    ],
  },
  confused: {
    with: 'AI assistant',
    href: '/learn/ai-assistant',
    body: [
      'An AI assistant answers when you ask and stops when you close the chat. An AI agent has its own schedule, its own apps and its own instructions, and keeps working when you are not there.',
      'In 50agents, Captain is the assistant you talk to; the AI agents are what Captain builds for you.',
    ],
  },
  more: {
    h2: 'What makes an AI agent safe to leave running',
    body: [
      'Limits you can read. A 50agents AI agent uses only the apps you give it, reads on its own, and asks before any change in an app. It stops at about 10 app calls a run, and every run leaves a record in Activity.',
      'When a search finds nothing, it says what it searched for rather than reporting "none" as a fact. That rule came from a real case where an AI agent looked for "unread" mail in words Gmail does not use.',
    ],
  },
  links: [
    { label: 'AI agents', href: '/ai-agents' },
    { label: 'How to build an AI agent without code', href: '/guides/how-to-build-an-ai-agent-without-code' },
    { label: 'AI agent vs automation', href: '/guides/ai-agent-vs-automation-which-one-you-need' },
    { label: 'Agentic AI', href: '/learn/agentic-ai' },
  ],
  updated: U,
};

export const browserAgent: Term = {
  slug: 'browser-agent',
  term: 'Browser agent',
  title: 'What is a browser agent? Definition and example | 50agents',
  description:
    'A browser agent is an AI agent that works in a web browser: it opens pages, reads, clicks and fills in forms on sites with no app to connect. A real example.',
  definition: [
    'A browser agent is an AI agent that does its work in a web browser: it opens pages, reads what is on them, clicks and fills in forms, deciding each step as it goes.',
    'It is the tool for websites that offer no app or API to connect to, such as a competitor\'s pricing page or a supplier\'s portal.',
  ],
  example: {
    kind: 'browser',
    name: 'Watch competitor prices',
    ask: "Set up a browser agent that checks my competitors' pricing pages every day at 9:00 and tells me when a price changes",
    body: [
      'Every morning it opens each pricing page you named in its own browser, reads the plans and prices, and compares them with what it found the day before.',
      'Its work for the run says what changed and lists every page it visited. In testing, a three-page check took 69 to 90 seconds.',
    ],
  },
  confused: {
    with: 'RPA',
    href: '/learn/rpa',
    body: [
      'RPA replays steps someone recorded, click by click, and stops when the page changes. A browser agent is told the goal ("tell me when a price changes") and works out the clicks each time, so a redesigned page does not break it the same way.',
      'It is also not a scraper: a scraper pulls the same fields from thousands of pages, while a browser agent reads a few pages and tells you what matters.',
    ],
  },
  more: {
    h2: 'Sign-ins and CAPTCHAs',
    body: [
      'A 50agents browser agent keeps one browser of its own, cookies included, so a site you sign in to stays signed in. You do the signing in, in its browser; a password never goes into a chat.',
      'It never gets past a CAPTCHA or bot check. It looks for the same facts elsewhere, and if one site is the only way, it asks you to solve the check yourself.',
    ],
  },
  links: [
    { label: 'Browser agents', href: '/browser-agents' },
    { label: 'How to automate a website that has no API', href: '/guides/how-to-automate-a-website-that-has-no-api' },
    { label: 'How to monitor competitor prices automatically', href: '/guides/how-to-monitor-competitor-prices-automatically' },
    { label: 'What is an API?', href: '/learn/api' },
  ],
  updated: U,
};

export const agenticAi: Term = {
  slug: 'agentic-ai',
  term: 'Agentic AI',
  title: 'What is agentic AI? Meaning, with a real example | 50agents',
  description:
    'Agentic AI is AI that pursues a goal over several steps on its own: planning, using tools, checking and deciding. What that looks like in a small business.',
  definition: [
    'Agentic AI describes AI that pursues a goal over several steps on its own: it plans, uses tools, checks what came back and decides what to do next.',
    'The word is about how much the AI does without being told each step, not about any one product; an AI agent is the usual unit of agentic AI.',
  ],
  example: {
    kind: 'ai',
    name: 'Morning email, replies drafted',
    ask: 'Go through my unread email now, then every weekday at 8:00, and draft replies',
    body: [
      'Nobody tells it which emails matter. It reads your unread mail, decides which need an answer, and drafts those replies.',
      'It runs once now so you see the result, then every weekday at 8:00. The drafts wait for you; it does not send on its own.',
    ],
  },
  confused: {
    with: 'generative AI',
    body: [
      'Generative AI makes content when asked: a paragraph, an image, a summary. Agentic AI uses that ability inside a loop of steps, with tools, toward a goal.',
      'A model writing a reply is generative. The same model deciding which five of forty emails need a reply, drafting them and filing the rest is agentic.',
    ],
  },
  more: {
    h2: 'How much should it do alone?',
    body: [
      'That is a setting, not a property of the AI. In 50agents the default is: reading runs on its own, and anything that spends money, reaches people outside your workspace or changes who has access waits for a yes. You can give each AI agent more or less room.',
    ],
  },
  links: [
    { label: 'AI agents', href: '/ai-agents' },
    { label: 'What is an AI agent?', href: '/learn/ai-agent' },
    { label: 'How to triage your inbox with AI', href: '/guides/how-to-triage-your-inbox-with-ai' },
    { label: 'Human in the loop', href: '/learn/human-in-the-loop' },
  ],
  updated: U,
};

export const aiAssistant: Term = {
  slug: 'ai-assistant',
  term: 'AI assistant',
  title: 'What is an AI assistant? vs an AI agent | 50agents',
  description:
    'An AI assistant answers and does tasks when you ask, inside a conversation. How it differs from an AI agent, with a real example from 50agents.',
  definition: [
    'An AI assistant is AI you talk to that answers questions and does tasks when you ask, such as drafting an email or reading a web page.',
    'It works while you are in the conversation; an AI agent keeps working on its own schedule after you leave.',
  ],
  example: {
    kind: 'captain',
    name: 'Captain, the assistant in 50agents',
    ask: 'Read my website and tell me what you would take off my plate',
    body: [
      'This one is done now, by Captain, with nothing built: it reads your website and answers with the work it would hand to AI agents first.',
      'Ask Captain for something that repeats, such as a Monday revenue summary, and it builds an AI agent or an automation instead, because that work has to happen when you are not in the chat.',
    ],
  },
  confused: {
    with: 'AI agent',
    href: '/learn/ai-agent',
    body: [
      'The test is who starts the work. An assistant waits for your message. An AI agent starts on its own schedule, uses the apps it was given, and leaves you a record of what it did.',
    ],
  },
  more: {
    h2: 'When to use which',
    body: [
      'Use an assistant for one-off work you will check straight away: a draft, an answer, a look at a web page. Use an AI agent for work that has to happen again without you: every Monday, every new email, every quiet deal.',
      'If you catch yourself asking an assistant the same thing every week, that is an AI agent waiting to be built. Captain notices this too: an app action you ask it for three or more times in 30 days gets an offer to make it automatic.',
    ],
  },
  links: [
    { label: 'AI agents', href: '/ai-agents' },
    { label: 'What is an AI agent?', href: '/learn/ai-agent' },
    { label: 'What is an LLM?', href: '/learn/llm' },
    { label: 'AI agents for small business: 10 jobs that work today', href: '/guides/ai-agents-for-small-business-10-jobs-that-work-today' },
  ],
  updated: U,
};

export const llm: Term = {
  slug: 'llm',
  term: 'LLM',
  title: 'What is an LLM (large language model)? | 50agents',
  description:
    'An LLM is an AI model trained on huge amounts of text to predict the next word. On its own it only writes; it acts only when a product gives it tools.',
  definition: [
    'An LLM, a large language model, is an AI model trained on very large amounts of text to predict the next word, which lets it write, summarise, sort and answer in plain language.',
    'On its own it only produces text; it acts in the world only when a product gives it tools, such as a connection to your email.',
  ],
  example: {
    kind: 'ai',
    name: 'Weekly revenue summary',
    ask: "Set up an AI agent that reads last week's payments in Stripe every Monday at 9:00 and emails me the totals and what changed",
    body: [
      'The LLM is the part that writes a line such as "Revenue was up 12% on the week before, mostly from two annual plans". Reading the payments from Stripe and sending the email are tools 50agents gives it.',
      'New AI agents in 50agents run on a model called gpt-6-luna, through viaSocket, and you can change an AI agent\'s model in its Setup. Each change is a version you can undo.',
    ],
  },
  confused: {
    with: 'AI assistant',
    href: '/learn/ai-assistant',
    body: [
      'The LLM is the engine; the assistant is the product built around it, with a chat, memory and tools. Two products on the same model can behave very differently because of what surrounds it.',
    ],
  },
  more: {
    h2: 'Why it matters for cost',
    body: [
      'Every answer from an LLM is paid for by the amount of text read and written. In 50agents that shows as credits: an answer from Captain costs about 24 credits, so the 2,000 free credits cover about 80 answers.',
    ],
  },
  links: [
    { label: 'AI agents', href: '/ai-agents' },
    { label: 'What is a prompt?', href: '/learn/prompt' },
    { label: 'How much automation costs', href: '/guides/how-much-automation-costs-credits-tasks-and-runs-compared' },
    { label: 'Agentic AI', href: '/learn/agentic-ai' },
  ],
  updated: U,
};
