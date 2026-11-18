// Glossary terms about automation: automation, workflow, AI workflow, trigger, action, webhook, RPA.
// Product facts: app/src/features/automations/CLAUDE.md and templates/list.ts, read 19 Nov 2026.
import type { Term } from './types';

const U = '2026-11-19';

export const automation: Term = {
  slug: 'automation',
  term: 'Automation',
  title: 'What is an automation? Definition and example | 50agents',
  description:
    'An automation runs the same steps every time an event happens or a schedule comes round, with no person starting it. A plain definition and a real example.',
  definition: [
    'An automation is a set of steps that runs the same way every time something happens or a schedule comes round, with no person starting it.',
    'It follows rules rather than judgement, so the same input gives the same result, run after run.',
  ],
  example: {
    kind: 'auto',
    name: 'Log every payment',
    ask: 'Set up an automation: every new Stripe payment is added as a row to my Google Sheet with the customer, amount and date',
    body: [
      'Two steps: a new payment in Stripe starts it, and a row goes into your sheet with the customer, the amount and the date. No AI is involved in a run.',
      'Captain tries it on a real payment before you build it, and leaves it as a draft until you tap Make it live, so the first run is never a surprise.',
    ],
  },
  confused: {
    with: 'AI agent',
    href: '/learn/ai-agent',
    body: [
      'An automation never decides what to do; its steps are fixed when it is built. An AI agent decides on each run.',
      'They meet in the middle: a 50agents automation can have an AI step, such as sorting an email, and when that step is unsure, the case goes to the automation working as an AI agent.',
    ],
  },
  more: {
    h2: 'What to automate first',
    body: [
      'A job you do the same way at least weekly, that moves data from one app to another, where a mistake is easy to spot and fix. Logging payments, orders and new contacts are the classic first three.',
    ],
  },
  links: [
    { label: 'Automations', href: '/automations' },
    { label: 'What to automate first in a small business', href: '/guides/what-to-automate-first-in-a-small-business' },
    { label: 'What is a trigger?', href: '/learn/trigger' },
    { label: 'What is a workflow?', href: '/learn/workflow' },
  ],
  updated: U,
};

export const workflow: Term = {
  slug: 'workflow',
  term: 'Workflow',
  title: 'What is a workflow? With a worked example | 50agents',
  description:
    'A workflow is the order of steps a piece of work goes through, start to finish. It exists by hand or in software; automating it hands the steps to software.',
  definition: [
    'A workflow is the order of steps a piece of work goes through from start to finish, such as: a contact signs up, they are added to a list, the team is told.',
    'It exists whether people do it by hand or software runs it; automating a workflow means software does some or all of the steps.',
  ],
  example: {
    kind: 'auto',
    name: 'New lead to your sheet and Slack',
    ask: 'Set up an automation: every new HubSpot contact is added as a row to my Google Sheet and posted in a Slack channel',
    body: [
      'By hand, this workflow is three steps: notice the new contact in HubSpot, copy their details into the sheet, write a message in Slack. Easy to forget the second and third on a busy day.',
      'Automated, it is the same three steps in the same order: a new contact starts it, a row is added, a message is posted. The workflow did not change; who does it did.',
    ],
  },
  confused: {
    with: 'automation',
    href: '/learn/automation',
    body: [
      'The workflow is the map of the work; the automation is software walking that map. You can have a workflow with no automation at all, and you should be able to write it down before you automate it.',
    ],
  },
  more: {
    h2: 'Write it down first',
    body: [
      'For each step: what starts it, which app it happens in, and which fields move. If you cannot say which column the email goes in, Captain will ask, and so would any tool.',
    ],
  },
  links: [
    { label: 'Automations', href: '/automations' },
    { label: 'How to automate data entry between two apps', href: '/guides/how-to-automate-data-entry-between-two-apps' },
    { label: 'What is an AI workflow?', href: '/learn/ai-workflow' },
    { label: 'What is an action?', href: '/learn/action' },
  ],
  updated: U,
};

export const aiWorkflow: Term = {
  slug: 'ai-workflow',
  term: 'AI workflow',
  title: 'What is an AI workflow? vs an AI agent | 50agents',
  description:
    'An AI workflow is a fixed set of steps where one or more steps are done by an AI model. The order never changes; only the AI step uses judgement.',
  definition: [
    'An AI workflow is a fixed set of steps in which one or more steps are done by an AI model, such as reading an email and deciding what kind it is.',
    'The order of steps stays the same on every run; only the AI step uses judgement, and only on its own small part of the work.',
  ],
  example: {
    kind: 'auto',
    name: 'New lead to your sheet and Slack, with a note',
    ask: 'Set up an automation: every new HubSpot contact is added as a row to my Google Sheet and posted in a Slack channel',
    body: [
      'Add "with a one-line note on who they are" to that starting ask and the plan gains an AI step between the trigger and the row: the AI writes the note, and the fixed steps carry it into the sheet and the Slack post.',
      'In 50agents the AI step is told to answer only from what it was given. When the input does not say, it marks itself unsure rather than guessing, and the case goes to an AI agent.',
    ],
  },
  confused: {
    with: 'AI agent',
    href: '/learn/ai-agent',
    body: [
      'Ask who decides the steps. In an AI workflow, you did, when it was built; the AI fills in one step. In an AI agent, the AI decides the steps on each run.',
      'An AI workflow is easier to predict and check. An AI agent handles work that does not fit a fixed path.',
    ],
  },
  links: [
    { label: 'Automations', href: '/automations' },
    { label: 'AI agent vs automation', href: '/guides/ai-agent-vs-automation-which-one-you-need' },
    { label: 'What is a workflow?', href: '/learn/workflow' },
    { label: 'What is an LLM?', href: '/learn/llm' },
  ],
  updated: U,
};

export const trigger: Term = {
  slug: 'trigger',
  term: 'Trigger',
  title: 'What is a trigger in automation? With examples | 50agents',
  description:
    'A trigger is the event that starts an automation: a new order, a new contact, 9:00 on Monday. The three kinds, and why some are not instant.',
  definition: [
    'A trigger is the event that starts an automation: a new order in Shopify, a new contact in HubSpot, 9:00 on a Monday.',
    'Every automation has at least one, and nothing in it runs until a trigger fires.',
  ],
  example: {
    kind: 'auto',
    name: 'New orders to your sheet',
    ask: 'Set up an automation: every new Shopify order is added as a row to my Google Sheet with its items and total',
    body: [
      'The trigger is "new order" in Shopify. It hands the next step the order\'s details, items and total among them, and the step writes them into a row.',
      'A 50agents automation can start three ways: an app event like this one, a schedule (a time of day, or every 1 to 12 hours), or a call to its own address. One automation can have more than one start.',
    ],
  },
  confused: {
    with: 'a condition (filter)',
    body: [
      'A trigger decides when a run starts. A condition decides whether it carries on: "only orders over $500" is a filter after the trigger, not a different trigger.',
      'A filtered-out run still started, which matters on tools that count runs: in 50agents a run a filter stopped leaves no work item.',
    ],
  },
  more: {
    h2: 'Instant or checked every few minutes',
    body: [
      'Some apps tell the automation the moment something happens. Others have to be asked again and again. Gmail is the second kind in viaSocket: new mail is checked about every 15 minutes, so a run can start up to that long after the email lands.',
    ],
  },
  links: [
    { label: 'Automations', href: '/automations' },
    { label: 'What is an action?', href: '/learn/action' },
    { label: 'What is a webhook?', href: '/learn/webhook' },
    { label: 'How to send Shopify orders to Google Sheets', href: '/guides/how-to-send-shopify-orders-to-google-sheets' },
  ],
  updated: U,
};

export const action: Term = {
  slug: 'action',
  term: 'Action',
  title: 'What is an action in automation? Plain answer | 50agents',
  description:
    'An action is one thing software does in an app for you: add a row, send a message, update a deal. Why each app\'s list of actions sets what you can automate.',
  definition: [
    'An action is one thing software does in an app on your behalf: add a row, send a message, update a deal.',
    'Each app offers a fixed list of actions, so what an automation or an AI agent can do in that app is set by that list.',
  ],
  example: {
    kind: 'auto',
    name: 'New lead to your sheet and Slack',
    ask: 'Set up an automation: every new HubSpot contact is added as a row to my Google Sheet and posted in a Slack channel',
    body: [
      'One trigger, two actions: Google Sheets\' "add a row", then Slack\'s "send a message". Each takes fields from the trigger: the contact\'s name and email go into named columns and into the message.',
      'While planning, Captain reads each action\'s fields from viaSocket\'s catalog and your own choices, such as which spreadsheet and which channel, so the plan names real places, not guesses.',
    ],
  },
  confused: {
    with: 'trigger',
    href: '/learn/trigger',
    body: [
      'A trigger listens; an action does. The trigger hands over data, and each action uses some of it. "New contact in HubSpot" is a trigger. "Create a contact in HubSpot" is an action. Many apps offer both, for the same kind of record.',
    ],
  },
  more: {
    h2: 'Reading and changing',
    body: [
      'Some actions only read (find a deal, list payments) and some change things (send, update, delete). 50agents treats them differently: reading runs on its own, and an AI agent\'s change in an app waits for your yes.',
      'So when you wonder whether a tool can do something in an app, the real question is whether that app lists the action. Captain reads that list while planning, so its plan uses only actions the app really has.',
    ],
  },
  links: [
    { label: 'Automations', href: '/automations' },
    { label: 'What is a trigger?', href: '/learn/trigger' },
    { label: 'What is an integration?', href: '/learn/integration' },
    { label: 'How to send new HubSpot contacts to Slack', href: '/guides/how-to-send-new-hubspot-contacts-to-slack' },
  ],
  updated: U,
};

export const webhook: Term = {
  slug: 'webhook',
  term: 'Webhook',
  title: 'What is a webhook? Explained for non-developers | 50agents',
  description:
    'A webhook is a web address one app calls the moment something happens, sending the details, so another app can act straight away. With a real example.',
  definition: [
    'A webhook is a web address that one app calls the moment something happens, sending the details along, so another app can act on it straight away.',
    'It is how apps push news to each other, instead of one app asking the other "anything new?" every few minutes.',
  ],
  example: {
    kind: 'auto',
    name: 'Log every payment',
    ask: 'Set up an automation: every new Stripe payment is added as a row to my Google Sheet with the customer, amount and date',
    body: [
      'Every 50agents automation runs as a viaSocket flow, and each flow has an address of its own. One of the three ways an automation can start is a call to that address: a webhook.',
      'Run now uses the same door. It sends the real payment Captain read while planning to the automation\'s address, and the automation runs on it exactly as it would on a new one.',
    ],
  },
  confused: {
    with: 'API',
    href: '/learn/api',
    body: [
      'With an API, your tool asks the app for data when it wants it. With a webhook, the app tells your tool when something happens. Most apps that offer webhooks also have an API; the reverse is not always true.',
    ],
  },
  more: {
    h2: 'When an app has no webhook',
    body: [
      'Then something has to ask on a schedule, which is why some triggers are not instant. You do not set either up by hand in 50agents: Captain sets up the start when it builds the automation.',
      'If you do set one up yourself in another tool, treat the address like a key: anyone who has it can start the automation, so keep it out of public pages and shared documents.',
    ],
  },
  links: [
    { label: 'Webhooks explained for non-developers', href: '/guides/webhooks-explained-for-non-developers' },
    { label: 'Automations', href: '/automations' },
    { label: 'What is a trigger?', href: '/learn/trigger' },
    { label: 'What is an API?', href: '/learn/api' },
  ],
  updated: U,
};

export const rpa: Term = {
  slug: 'rpa',
  term: 'RPA',
  title: 'What is RPA (robotic process automation)? | 50agents',
  description:
    'RPA is software that replays a person\'s recorded clicks in an app\'s screens. How it differs from a browser agent, with a real example from 50agents.',
  definition: [
    'RPA, robotic process automation, is software that copies the clicks and keystrokes a person makes in an application\'s screens and replays them to do repetitive office work.',
    'It follows the recorded path exactly, so it works well on screens that never change and stops when one does.',
  ],
  example: {
    kind: 'browser',
    name: 'Watch competitor prices',
    ask: "Set up a browser agent that checks my competitors' pricing pages every day at 9:00 and tells me when a price changes",
    body: [
      'An RPA bot for this would be recorded: open page one, read the box at this position, open page two. If a competitor redesigns the page, the bot reads the wrong box or fails.',
      'The 50agents browser agent is given the goal instead. It reads each page the way a person would, finds the plans and prices wherever they now sit, and says what changed.',
    ],
  },
  confused: {
    with: 'browser agent',
    href: '/learn/browser-agent',
    body: [
      'Both work through screens rather than an API. RPA repeats recorded steps; a browser agent decides each step from the goal. RPA is the safer pick for a fixed, high-volume task on one internal system; a browser agent suits changing public websites and jobs that need reading.',
    ],
  },
  sources: [{ label: 'IBM: What is robotic process automation?', href: 'https://www.ibm.com/think/topics/rpa', read: '19 Nov 2026' }],
  more: {
    h2: 'Before either: check for an app',
    body: [
      'Screens are the last resort for both. If the system has an app in viaSocket\'s catalog of 2,300+, an automation or an AI agent can read its data directly, and nothing breaks when the screens are redesigned.',
    ],
  },
  links: [
    { label: 'Browser agents', href: '/browser-agents' },
    { label: 'Browser automation without code', href: '/guides/browser-automation-without-code' },
    { label: 'What is a browser agent?', href: '/learn/browser-agent' },
    { label: 'What is an automation?', href: '/learn/automation' },
  ],
  updated: U,
};
