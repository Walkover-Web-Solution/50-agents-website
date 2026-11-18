// HubSpot (pages-brief B3). Triggers and actions: viaSocket's catalog (scripts/snapshot-catalog.mjs), read 19 Nov 2026.
// Breeze: HubSpot's own AI pages, read 19 Nov 2026. Asks: the 50agents app's templates (app/src/features/templates/list.ts).
import type { Flagship } from '../types';

const page: Flagship = {
  slug: 'hubspot',
  title: 'AI agents, automations and apps for HubSpot | 50agents',
  description:
    'Tell Captain what you need in HubSpot: an AI agent that drafts deal follow-ups, an automation from new contacts to Slack, or a lead app.',
  answer: [
    'In 50agents you connect HubSpot once and tell Captain the job in plain words, such as following up quiet deals or copying new contacts to a sheet and Slack.',
    'Captain builds an automation for fixed steps, or an AI agent when each deal needs judgement, on HubSpot’s real triggers and actions; anything that emails a customer waits for your approval.',
  ],
  heroAsk: 'Set up an AI agent that finds my HubSpot deals with no reply in 5 days every weekday at 9:00 and drafts a follow-up email for me to approve',
  kinds: [
    {
      kind: 'auto',
      does: 'Same steps on every new or changed record. A contact comes in, it lands as a row in your Google Sheet and as a message in your sales channel, with no AI deciding anything.',
      ask: 'Set up an automation: every new HubSpot contact is added as a row to my Google Sheet and posted in a Slack channel',
      uses: ['New Or Updated Contact'],
    },
    {
      kind: 'ai',
      does: 'Reads your deals and their notes each morning, decides which ones have gone quiet and what to say, and drafts the follow-up in Gmail for you to approve.',
      ask: 'Set up an AI agent that finds my HubSpot deals with no reply in 5 days every weekday at 9:00 and drafts a follow-up email for me to approve',
      uses: ['Search a Deal', 'Get Deal Notes', 'Add Notes to Contact'],
    },
    {
      kind: 'browser',
      does: 'HubSpot has an API, so you rarely need one for HubSpot itself. Use a browser agent for the websites around your deals, such as a prospect’s own site before a call.',
      ask: 'Set up a browser agent that opens the website of each company I give it and tells me what they sell and who they sell to',
      uses: [],
    },
    {
      kind: 'app',
      does: 'Your own screens next to the CRM: a pipeline board, a follow-up list and the numbers you check, with a crew of AI agents keeping it filled.',
      ask: 'Track my leads and follow up',
      uses: [],
    },
  ],
  groups: [
    { label: 'Contacts', line: 'Start when a contact is added or changes stage, then create, update, find or add notes to contacts.', events: ['New Or Updated Contact', "Update Contact's Lifecycle Stage", "Update Contact's Lead Status", 'Merge Contacts', 'Delete Contact', 'Create Contact', 'Create or Update Contact', 'Update Contact', 'Find Contact', 'Add Notes to Contact'] },
    { label: 'Deals', line: 'Start when a deal is created, updated, merged or deleted; create, search and update deals and read their notes.', events: ['When a deal is created or updated', 'Merge Deals', 'Deal Deleted', 'Create Deal', 'Search a Deal', 'Update Deal', 'Get Deal Notes'] },
    { label: 'Companies', line: 'Start on new or changed companies; create, search and update them.', events: ['When a company is created or updated', 'Merge Companies', 'Delete Company', 'Create Company', 'Search Company', 'Update Company'] },
    { label: 'Tickets', line: 'Start when a support ticket is created, updated, merged or deleted, and search tickets.', events: ['Ticket Created or Updated', 'Merge Tickets', 'Delete Ticket', 'Search a Ticket'] },
    { label: 'Tasks, notes and activity', line: 'Start when a task falls due; log emails, meetings and notes against records, and send a message into a conversation thread.', events: ['New Task Due', 'Create Engagement', 'Create Email Engagement', 'Create Meeting Engagement', 'Get Note', 'Send Message'] },
    { label: 'Invoices and products', line: 'Start on new invoices and products; search invoices and read their line items.', events: ['New Invoice Created', 'Search Invoices', 'Get Invoice Line Items', 'List All Line Items', 'New Product Created', 'Delete Product', 'Search a Product'] },
    { label: 'Owners', line: 'Look up the HubSpot user who owns a record, by email or ID.', events: ['Get Owner by Email or by ID'] },
  ],
  native: {
    head: 'HubSpot’s own AI, Breeze, and what 50agents adds',
    body:
      'HubSpot’s AI lives in Agent Hub and Breeze Assistant. Its ready-made AI agents include a Prospecting agent, a Customer agent that answers customer questions, a Data agent that answers from your CRM, calls and documents, and a Revenue agent for invoice follow-up, plus an Agent Builder for your own. Agent Hub is in HubSpot’s Starter, Professional and Enterprise editions, and many of its AI features run on HubSpot Credits. 50agents sits beside it: one Captain for HubSpot and the rest of your 2,300+ apps through viaSocket, AI agents and automations that act in Gmail, Sheets or Slack as well as the CRM, apps with your own screens, and a yes from you before anything goes out to a customer.',
    better:
      'If your team works inside HubSpot all day and the job only touches HubSpot records, Breeze is closer to the data and needs no extra product. Its AI agents are built by HubSpot for HubSpot’s own objects.',
    sources: [
      { label: 'HubSpot: AI and Agent Hub', href: 'https://www.hubspot.com/products/artificial-intelligence' },
      { label: 'HubSpot: Breeze AI agents', href: 'https://www.hubspot.com/products/artificial-intelligence/breeze-ai-agents' },
    ],
  },
  useCases: [
    { slug: 'follow-up-quiet-hubspot-deals', kind: 'ai', title: 'Follow up quiet HubSpot deals', line: 'Finds deals with no reply in 5 days and drafts the follow-up.' },
    { slug: 'hubspot-contacts-to-google-sheets-and-slack', kind: 'auto', title: 'HubSpot contacts to Google Sheets and Slack', line: 'Each new contact as a sheet row and a Slack post.' },
    { slug: 'lead-tracker-from-your-inbox', kind: 'app', title: 'A lead tracker from your inbox', line: 'A pipeline app filled from the leads in your email.' },
  ],
  guides: [
    { slug: 'how-to-send-new-hubspot-contacts-to-slack', title: 'How to send new HubSpot contacts to Slack' },
    { slug: 'how-to-build-a-simple-crm-without-code', title: 'How to build a simple CRM without code' },
    { slug: 'how-to-make-an-ai-agent-ask-before-it-acts', title: 'How to make an AI agent ask before it acts' },
  ],
  faqs: [
    {
      q: 'Can an AI agent follow up HubSpot deals for me?',
      a: 'Yes, with a draft you approve. The AI agent searches your deals, reads their notes, and writes a follow-up in Gmail; nothing reaches the customer until you press approve in Needs you.',
    },
    {
      q: 'Is this the same as HubSpot workflows?',
      a: 'No. HubSpot workflows run inside HubSpot. A 50agents automation starts from a HubSpot trigger and can act in any of the 2,300+ apps viaSocket connects, such as adding a row to Google Sheets or posting in Slack.',
    },
    {
      q: 'Does 50agents change my HubSpot data on its own?',
      a: 'Only through the actions you asked for, such as Create Contact or Update Deal, and each one is listed in Activity. Changes made in HubSpot cannot be undone from 50agents, so anything that reaches customers asks you first.',
    },
  ],
  updated: '2026-11-19',
};
export default page;
