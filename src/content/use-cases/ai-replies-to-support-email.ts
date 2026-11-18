// Use case 5 (pages-brief B1): AI to draft replies to customer emails. An AI agent.
// Product facts: the Playbook "Draft replies to support email" (templates/list.ts); AI agents wake on a schedule only,
// one time a day on chosen days (agents/server/wake.ts; app events start automations, not AI agents, server/asked.ts);
// Memory's facts and knowledge (features/memory/CLAUDE.md); tips mark a handled mail read with Modify Email Labels, which
// is a change and asks first by default (tasks/tips.ts, P36, settings/rules.ts). Catalog: catalog.ts, read 19 Nov 2026.
// Research: scratchpad research-B, read 19 Nov 2026.
import type { UseCase } from '@/site/types';
import { chips, iconOf } from './catalog';

const page: UseCase = {
  slug: 'ai-replies-to-support-email',
  kind: 'ai',
  title: 'AI that drafts replies to customer emails | 50agents',
  description:
    'To have AI draft replies to customer emails, set up an AI agent that reads support email in Gmail, answers from your business facts and asks before sending.',
  h1: 'AI that drafts replies to your customer emails',
  answer: [
    'To have AI draft replies to customer emails, tell Captain to set up an AI agent that reads your new support emails in Gmail and answers each one from what 50agents knows about your business: your prices, hours, policies and documents.',
    'Every reply waits for you to approve, change or decline before it is sent, and when the answer is not in what it knows, it tells you what it needs instead of guessing.',
  ],
  ask: 'Set up an AI agent that reads new support emails, drafts a reply from what you know about my business, and asks me before sending',
  updated: '2026-11-19',
  published: '2026-11-19',
  promises: ['Answers from your own facts and documents', 'Never guesses a price or a policy', 'Nothing is sent without your OK'],
  plan: {
    mode: 'building an AI agent',
    name: 'Support replies',
    line: 'New support email, answered from what you know',
    faces: ['writer'],
    rows: [
      { label: 'When', value: 'Every weekday at 9:00' },
      { label: 'Apps', value: 'Gmail' },
      { label: 'Knows', value: 'Your workspace’s facts and documents' },
      { label: 'Asks first', value: 'Sending any email' },
    ],
  },
  factsLabel: 'AI replies, in numbers',
  facts: [
    {
      figure: '100 replies',
      text: 'is about how many past conversation replies Help Scout’s AI Drafts needs before it starts drafting, on its Plus and Pro plans.',
      source: 'Help Scout docs, updated 14 Nov 2026',
      href: 'https://docs.helpscout.com/article/1570-ai-drafts',
      read: '19 Nov 2026',
    },
    {
      figure: '95%',
      text: 'of consumers want to understand why AI makes the decisions it does, while 37% of organisations explain automated decisions to customers or support staff.',
      source: 'Zendesk CX Trends 2026',
      href: 'https://www.zendesk.com/blog/zendesk-insights/trends/leading-in-the-ai-era-with-contextual-intelligence/',
      read: '19 Nov 2026',
    },
  ],
  seeIt: {
    h2: 'What you get: replies drafted from your own answers',
    intro: 'This is the AI agent’s page in 50agents after a morning run, with example emails. Overview shows a reply waiting for your OK and what the run did with each email, including the one it would not guess; Setup shows its instructions.',
  },
  view: {
    type: 'agent',
    agent: {
      name: 'Support replies',
      face: 'writer',
      status: '3 things wait on you',
      tone: 'warn',
      waiting: 3,
      waits: {
        by: 'Support replies', face: 'writer', where: 'AI agent', ago: 'Today 9:03 AM',
        title: 'Reply to Grace Liu',
        rows: [{ label: 'To', value: 'grace.liu@mail.example' }, { label: 'Subject', value: 'Re: Can I change my delivery day?' }],
        body: [
          'Hi Grace,',
          'Yes. You can move your weekly box to any day from Tuesday to Friday, as long as you tell us by 6pm the day before. I have noted Thursday for you from next week.',
          'If Thursday turns out not to work, just reply here and we will change it.',
          'Thanks,\nMaya at Fernhill Farm Boxes',
        ],
        actions: ['Approve and send', 'Change', 'Decline'],
      },
      latest: {
        title: '5 new emails: 3 replies drafted, 1 it could not answer',
        when: 'Today 9:03 AM',
        summary: 'Read 5 new emails to support; skipped a receipt.',
        result: {
          type: 'list',
          title: 'What it did with each email',
          items: [
            { b: 'Grace Liu: Can I change my delivery day?', t: 'Answered from "Delivery days and cut-off" in Memory', tag: 'Drafted' },
            { b: 'Ben Ortiz: Is the Large box vegan?', t: 'Answered from the product list you added', tag: 'Drafted' },
            { b: 'Hana Sato: Box arrived damaged', t: 'Apology and replacement, from your refund policy', tag: 'Drafted' },
            { b: 'Leo Brandt: Do you deliver to Hamburg?', t: 'Not in what it knows: it needs to know if you deliver outside Berlin', tag: 'For you' },
            { b: 'Stripe: Your receipt', t: 'Not a customer question', tag: 'Skipped' },
          ],
        },
      },
      runs: [
        { title: '3 replies drafted, 1 left for you', when: 'Today 9:03 AM', status: 'Waits on you' },
        { title: '2 replies drafted, both sent', when: 'Yesterday 9:02 AM', status: 'Done' },
        { title: 'No new support email', when: 'Mon 17 Nov 9:00 AM', status: 'Done' },
        { title: '4 replies drafted, 3 sent, 1 declined', when: 'Fri 14 Nov 9:04 AM', status: 'Done' },
      ],
      instructions: [
        'Every weekday at 9:00, read the new emails to support@fernhill.example that you have not handled yet.',
        'Answer each customer question only from what you know about the business: its facts, its policies and the documents in Memory. Write like Maya: short, warm, no jargon, sign off "Maya at Fernhill Farm Boxes".',
        'If the answer is not in what you know, do not guess and do not draft. Say in your summary what you would need to know.',
        'Skip receipts, newsletters and auto-replies. Every reply waits for my OK before it is sent.',
      ],
      facts: { runs: 'Every weekday at 9:00 AM', apps: ['gmail'], alone: 'Reads Gmail and Memory', asks: 'Every reply, and marking an email read' },
    },
  },
  howH2: 'How it drafts replies to support email, step by step',
  planParts: [
    { title: 'Its job', body: 'Read new support email, draft a reply to each customer question from what the business knows.' },
    { title: 'Instructions', body: 'Which inbox or address, the tone and sign-off, what to skip, and to ask rather than guess. Changed in its chat.' },
    { title: 'Its apps', body: 'Gmail, connected once in the chat if it is not already.' },
    { title: 'When it runs', body: 'Once a day at the time you pick, on the days you pick. Say it in the ask or change it on the plan.' },
    { title: 'Asks you first', body: 'Sending any email. Reading runs on its own.' },
  ],
  steps: [
    { title: 'Teach it your answers first', body: 'Tell Captain your hours, prices, delivery rules and refund policy, or add your FAQ page, a document or a link under Memory, Knowledge. Links are read again daily. This is what every reply draws on.' },
    { title: 'Ask, check the plan, build it', body: 'Say the sentence. Captain’s plan shows which address it reads, when it runs and that every send asks you first. Tap Build it and it does a first run on your inbox straight away.' },
    { title: 'It reads the new support email', body: 'At its time each day it reads mail it has not handled yet and sorts it: a customer question it can answer, one it cannot, or not for it (receipts, newsletters, auto-replies).' },
    { title: 'It drafts from what it knows', body: 'For each question it writes a short reply in your tone from your facts and documents. When the answer is not there it drafts nothing, and its summary says what it would need to know. Tell it once, in its chat, and it remembers.' },
    { title: 'You approve each reply', body: 'Replies wait in Needs you: approve and send, change, or decline. Each run’s summary lists every email and what it did with it, and Activity keeps a receipt of every send.' },
  ],
  uses: [
    { app: 'gmail', icon: iconOf('gmail'), name: 'Gmail', why: 'Reads the new support mail, replies in the customer’s thread after your OK, and marks a handled email read so the next run skips it.', chips: chips('gmail', ['Search_Email_Messages', 'Get Gmail Message by ID', 'Reply To Thread', 'Modify Email Labels']) },
    { app: 'file', name: 'What 50agents knows about your business', why: 'Memory: facts Captain keeps (hours, prices, policies, tone) and knowledge you add (documents, pasted text, links read again daily). Every item shows where it came from.', chips: ['Facts', 'Documents', 'Links'] },
  ],
  usesNote: 'Gmail’s actions as listed in viaSocket’s catalog of 2,300+ apps, read 19 Nov 2026. It picks which to call on each run.',
  asksFirst:
    'Every reply. An email to a customer reaches someone outside, so each one waits in Needs you with the customer, the subject and the full text. Marking an email read is a change in Gmail, so out of the box that asks too; let it "Change things" on its own in Settings, Autonomy and only the replies wait for you.',
  table: {
    h2: 'Which emails get a reply, and which come to you',
    label: 'What it does with each email',
    cols: ['The email', 'What it does', 'Ask Captain'],
    intro: 'Out of the box it splits new mail three ways: answer it, ask you, or leave it. Add your own rules in one sentence each.',
    rows: [
      { when: 'A question it can answer', tone: 'Drafts a reply from your facts and documents', ask: '' },
      { when: 'A question it cannot answer', tone: 'No draft; its summary says what it needs to know. It never guesses a price, date or policy', ask: '' },
      { when: 'Receipts, newsletters, auto-replies', tone: 'Leaves them alone', ask: '' },
      { when: 'Refunds and complaints', tone: 'Draft, but flag them first in its summary', ask: 'Put refund requests and complaints at the top of your summary, and draft those replies but never promise money back' },
      { when: 'Mail from your own team', tone: 'Skip it', ask: 'Skip any email from @fernhill.example addresses' },
    ],
    note: 'The three-way split mirrors Zapier’s "route unsure" support pattern, which sends anything uncertain to a person instead of guessing.',
    sources: [
      { label: 'Zapier', href: 'https://zapier.com/automations/customer-service-success/conversational-support/ai-customer-support/draft-replies-for-customer-emails-and-route-unsure' },
    ],
  },
  yoursIntro: 'Change the address, the time or how careful it is. Each of these builds a different AI agent; copy one into Captain.',
  variations: [
    'Set up an AI agent that reads new emails to support@ every weekday at 8:00, drafts a reply from what you know about my business, and asks me before sending',
    'Set up an AI agent that reads new support emails at 17:00 every day, drafts a reply from what you know about my business in Spanish or English to match the customer, and asks me before sending',
    'Set up an AI agent that reads new support emails every weekday at 9:00 and only drafts replies to questions about orders and delivery; list everything else for me',
    'Set up an automation: when a new email arrives at support@, an AI step drafts a reply from what you know about my business, and it asks me before sending',
  ],
  limits: [
    'An AI agent runs on a schedule, once a day at its time, not as each email arrives. For a reply drafted the moment mail lands, ask for an automation that starts on a new email instead (the last ask above).',
    'It answers only from what is in Memory. Add your policies and FAQ first, or many emails come back to you as questions.',
    'Gmail only today.',
    'It drafts replies; it does not track each request to solved. For that, see the customer requests desk.',
  ],
  otherWaysH2: 'Other ways to draft replies to customer emails with AI',
  otherWays: [
    {
      title: 'Gmail’s own AI',
      body: 'Help me write and Suggested Replies match the tone of your past emails and are rolling out to every Gmail user at no cost, per Google’s January 2026 post. Nothing to set up; but you open each email yourself, it does not know your policies, and nothing runs on a schedule.',
      sources: [
        { label: 'Google blog', href: 'https://blog.google/products-and-platforms/products/gmail/gmail-is-entering-the-gemini-era/' },
        { label: 'Suggested Replies', href: 'https://support.google.com/mail/answer/15464729' },
      ],
    },
    {
      title: 'A help desk with AI drafts',
      body: 'Help Scout’s AI Drafts learns from your past conversations and help articles, on its Plus and Pro plans. If several people answer support, a help desk is the better tool: assignment, a shared queue and reporting.',
      sources: [{ label: 'Help Scout AI Drafts', href: 'https://docs.helpscout.com/article/1570-ai-drafts' }],
    },
    {
      title: 'Zapier',
      body: 'The "Draft replies for customer emails and route unsure" pattern reads Gmail, has AI sort each email, saves a Gmail draft and sends a Slack message to a reviewer when it is unsure. You build and maintain the steps.',
      sources: [{ label: 'Zapier', href: 'https://zapier.com/automations/customer-service-success/conversational-support/ai-customer-support/draft-replies-for-customer-emails-and-route-unsure' }],
    },
  ],
  faqs: [
    { q: 'Will it send replies without asking me?', a: 'No. Every reply waits in Needs you until you approve, change or decline it. You can let it send on its own in Settings, Autonomy, and that switch asks you once more before it turns on.' },
    { q: 'Where do its answers come from?', a: 'From Memory: the facts Captain keeps about your business and the documents, text and links you add. It is told to answer only from those, and each fact shows where it came from, so you can correct a wrong one.' },
    { q: 'What happens when it does not know the answer?', a: 'It does not guess and drafts nothing for that email. Its run summary says what it would need to know; tell it in its chat or teach Captain, and the next customer with that question gets a draft.' },
    { q: 'Will it sound like us?', a: 'It writes in the tone and sign-off its instructions give it, and you can correct it in its chat ("shorter, and never say \'Dear\'"). Each change is a new version you can undo.' },
    { q: 'Does it need a help desk?', a: 'No. It works on a plain Gmail inbox or a support@ address that lands in Gmail.' },
  ],
  related: [
    { href: '/use-cases/customer-requests-desk', kind: 'app', title: 'Customer requests desk', line: 'Track every request to solved, by status and urgency, with replies drafted.' },
    { href: '/use-cases/ai-email-triage-every-morning', kind: 'ai', title: 'AI email triage every morning', line: 'Your own inbox, not a support queue: sorted, with replies drafted.' },
    { href: '/use-cases/follow-up-quiet-hubspot-deals', kind: 'ai', title: 'Follow up quiet HubSpot deals', line: 'An AI agent that drafts the follow-up when a deal goes quiet.' },
  ],
  up: [
    { href: '/ai-agents', label: 'AI agents you can build' },
    { href: '/integrations/gmail', label: 'Gmail' },
    { href: '/guides/how-to-draft-email-replies-with-ai-and-still-check-them', label: 'How to draft email replies with AI and still check them' },
    { href: '/guides/how-to-make-an-ai-agent-ask-before-it-acts', label: 'How to make an AI agent ask before it acts' },
  ],
  finalH2: 'Start answering support email with your own answers',
  byline: 'Captain builds this AI agent from the ask above, the same words as the "Draft replies to support email" Playbook in the 50agents app; the views above are drawn from that app, filled with example data.',
};

export default page;
