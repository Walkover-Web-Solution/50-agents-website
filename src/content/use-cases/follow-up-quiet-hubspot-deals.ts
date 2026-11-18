// Use case 2 (pages-brief B1): follow up HubSpot deals with no reply. An AI agent.
// Product facts: the Playbook "Follow up quiet deals" (app/src/features/templates/list.ts), the AI agent's page and plan
// (features/agents), its rules (D188, settings/rules.ts: reading runs alone, every change and send asks first).
// Catalog: content/use-cases/catalog.ts (read 19 Nov 2026). Search research: scratchpad research-A, read 19 Nov 2026.
import type { UseCase } from '@/site/types';
import { chips, iconOf } from './catalog';

const ASK = 'Set up an AI agent that finds my HubSpot deals with no reply in 5 days every weekday at 9:00 and drafts a follow-up email for me to approve';

const page: UseCase = {
  slug: 'follow-up-quiet-hubspot-deals',
  kind: 'ai',
  title: 'Follow up HubSpot deals with no reply | 50agents',
  description:
    'To follow up HubSpot deals with no reply, an AI agent checks every weekday at 9:00, finds the quiet ones and drafts a Gmail follow-up you approve first.',
  h1: 'Follow up HubSpot deals with no reply',
  answer: [
    'To follow up HubSpot deals that have gone quiet, tell Captain to set up an AI agent that checks every weekday at 9:00 for deals whose contact has not replied in 5 days.',
    'For each one it reads your last Gmail thread with that contact and drafts a short follow-up in the same thread, and nothing is sent until you approve it.',
  ],
  ask: ASK,
  updated: '2026-11-19',
  published: '2026-11-19',
  promises: ['Every email waits for your OK', 'Replies in your own Gmail thread', 'Reads HubSpot, changes nothing there'],
  plan: {
    mode: 'building an AI agent',
    name: 'Deal follow-ups',
    line: 'Quiet HubSpot deals, a follow-up drafted for each',
    faces: ['closer'],
    rows: [
      { label: 'When', value: 'Every weekday at 9:00' },
      { label: 'Apps', value: 'HubSpot · Gmail' },
      { label: 'Asks first', value: 'Sending any email. Reading runs on its own.' },
    ],
  },
  factsLabel: 'Following up, in numbers',
  facts: [
    {
      figure: '16% to 27%',
      text: 'is how much one follow-up raised the reply rate to sales emails, in Outplay data that HubSpot’s sales blog cites.',
      source: 'HubSpot blog, updated 2 Sep 2025',
      href: 'https://blog.hubspot.com/sales/how-to-send-a-follow-up-email-after-no-response',
      read: '19 Nov 2026',
    },
    {
      figure: 'Professional',
      text: 'is the lowest Sales Hub or Service Hub tier with sequences, HubSpot’s own follow-up emails that stop when a contact replies. Each user also needs a seat.',
      source: 'HubSpot Knowledge Base, updated 12 Nov 2026',
      href: 'https://knowledge.hubspot.com/sequences/create-and-edit-sequences',
      read: '19 Nov 2026',
    },
  ],
  seeIt: {
    h2: 'What you get: an AI agent with its follow-ups waiting for you',
    intro: 'This is the AI agent’s page in 50agents after this morning\u2019s run, with example deals. Overview shows the follow-up waiting for your OK and what the run found; Work lists every run; Setup shows its instructions and what it may do alone.',
  },
  view: {
    type: 'agent',
    agent: {
      name: 'Deal follow-ups',
      face: 'closer',
      status: '1 thing waits on you',
      tone: 'warn',
      waits: {
        by: 'Deal follow-ups', face: 'closer', where: 'AI agent', ago: 'Today 9:02 AM',
        title: 'Email Priya Shah at Lumen Dental',
        rows: [{ label: 'To', value: 'priya@lumendental.example' }, { label: 'Subject', value: 'Re: Lumen Dental, 12-seat proposal' }],
        body: [
          'Hi Priya,',
          'Following up on the proposal I sent last Tuesday for the 12 seats. Did the numbers work for your team, or is there something I should change before you take it to Dr. Ellis?',
          'I could do a 15-minute call on Thursday or Friday morning if that is easier.',
          'Best,\nSam',
        ],
        actions: ['Approve and send', 'Change', 'Decline'],
      },
      latest: {
        title: '3 quiet deals, 3 follow-ups drafted',
        when: 'Today 9:02 AM',
        summary: 'Read 14 open deals; 3 had no reply in 5 days or more.',
        result: {
          type: 'list',
          title: 'What it found',
          items: [
            { b: 'Lumen Dental · $4,800', t: 'Proposal sent 6 days ago, no reply', tag: 'Drafted' },
            { b: 'Oakridge Builders · $9,500', t: 'Pricing questions answered 5 days ago, no reply', tag: 'Drafted' },
            { b: 'Harbor Yoga · $1,200', t: 'Demo recap sent 8 days ago, no reply', tag: 'Drafted' },
            { b: 'Pinecone Coffee · $900', t: 'Replied yesterday', tag: 'Left alone' },
          ],
        },
      },
      runs: [
        { title: '3 follow-ups drafted', when: 'Today 9:02 AM', status: 'Waits on you' },
        { title: 'No quiet deals today', when: 'Yesterday 9:01 AM', status: 'Done' },
        { title: '2 follow-ups drafted, both sent', when: 'Fri 14 Nov 9:03 AM', status: 'Done' },
        { title: 'HubSpot needs reconnecting', when: 'Thu 13 Nov 9:00 AM', status: 'Did not work' },
        { title: '1 follow-up drafted, sent', when: 'Wed 12 Nov 9:02 AM', status: 'Done' },
      ],
      instructions: [
        'Every weekday at 9:00, find my open HubSpot deals where the contact has not replied to my last email in 5 days or more.',
        'Start from Gmail: threads I sent to a deal contact with no reply since. Match each one to its contact and deal in HubSpot, and skip deals that are won or lost.',
        'For each one, read the thread and the deal notes, then draft a follow-up in the same thread: friendly, under 90 words, one clear next step. It waits for my OK before it goes.',
        'If they replied, leave it and say so in your summary.',
      ],
      facts: { runs: 'Every weekday at 9:00 AM', apps: ['hubspot', 'gmail'], alone: 'Reads HubSpot deals and contacts, and your Gmail threads', asks: 'Every email, and any change in HubSpot' },
    },
  },
  howH2: 'How it follows up quiet deals, step by step',
  planParts: [
    { title: 'Its job', body: 'Find HubSpot deals with no reply in 5 days and draft a follow-up for each.' },
    { title: 'Instructions', body: 'How to tell a deal is quiet, what to skip, how long and in what tone to write. Kept in its memory, changed in its chat.' },
    { title: 'Its apps', body: 'HubSpot and Gmail. If one is not connected, Captain asks you to connect it right there.' },
    { title: 'When it runs', body: 'Every weekday at 9:00, in your workspace’s time zone.' },
    { title: 'Asks you first', body: 'Sending any email. Reading runs on its own.' },
  ],
  steps: [
    { title: 'You ask, Captain plans it', body: 'Say the sentence, or tap the Playbook. Captain shows a plan card: the AI agent’s job, instructions, apps, schedule and what asks you first. Nothing is built until you tap Build it.' },
    { title: 'Build it, and it runs once', body: 'Captain checks HubSpot and Gmail are connected, sets its rules and schedule, then does a first run in your apps, so you see real quiet deals straight away.' },
    { title: 'Every weekday at 9:00 it looks', body: 'It reads the threads you sent to deal contacts, keeps those with no reply in 5 days, and finds each contact and deal in HubSpot. Deals that are won, lost or answered are left alone.' },
    { title: 'It drafts a follow-up for each', body: 'It reads the thread and the deal’s notes, then writes a short reply in the same thread with one next step: a call time, a changed quote, a yes or no.' },
    { title: 'You approve each email', body: 'Each draft waits in Needs you. Approve and send, change it, or decline it. The run’s summary says what it found and what it left alone, and Activity keeps a receipt.' },
  ],
  uses: [
    { app: 'hubspot', icon: iconOf('hubspot'), name: 'HubSpot', why: 'Where it finds the contact, the deal and its notes. It reads only; it changes nothing in HubSpot unless you ask, and then it asks first.', chips: chips('hubspot', ['Find Contact', 'Search a Deal', 'Get Deal Notes']) },
    { app: 'gmail', icon: iconOf('gmail'), name: 'Gmail', why: 'Where it checks who replied, and where each follow-up goes out, in the same thread, from your own address.', chips: chips('gmail', ['Search_Email_Messages', 'Get Thread Replies', 'Reply To Thread']) },
  ],
  usesNote: 'The HubSpot and Gmail actions it can call, named as viaSocket’s catalog of 2,300+ apps lists them, read 19 Nov 2026. It picks which to call on each run.',
  asksFirst:
    'Every email. A follow-up reaches a customer, so each one waits in Needs you with the contact, the subject and the full text, and goes only when you approve it. Reading HubSpot and Gmail runs on its own. Logging the email on the deal in HubSpot is a change, so that asks too.',
  table: {
    h2: 'How long to wait, and when to stop',
    label: 'Follow-up timing',
    cols: ['When', 'What it writes', 'Ask Captain'],
    intro: 'Out of the box it drafts one follow-up after 5 days of silence, every weekday. Most teams add a second and then stop. Here is a timing to start from; each row is one sentence to its chat.',
    rows: [
      { when: '5 days, no reply', tone: 'A short nudge in the same thread, with one next step', ask: '' },
      { when: '5 more days', tone: 'A second, shorter note offering two call times', ask: 'If a deal is still quiet 5 days after your follow-up, draft one more that offers two call times' },
      { when: 'After 3 follow-ups', tone: 'Stop writing; list the deal for you instead', ask: 'Stop after three follow-ups and list those deals for me in your summary' },
      { when: 'Big deals', tone: 'Draft sooner, at 3 days', ask: 'For deals over $10,000, draft the follow-up after 3 days instead of 5' },
    ],
    note: 'Our starting point. n8n’s stalled-deal template skips any contact emailed in the last 7 days; HubSpot’s sequences stop on their own when a contact replies or books a meeting.',
    sources: [
      { label: 'n8n', href: 'https://n8n.io/workflows/11183-re-engage-stalled-hubspot-deals-with-gpt-5-mini-gmail-and-slack/' },
      { label: 'HubSpot sequences', href: 'https://knowledge.hubspot.com/sequences/create-and-edit-sequences' },
    ],
  },
  yoursIntro: 'Change the wait, the stages or what it does instead of emailing. Each of these builds a different AI agent; copy one into Captain.',
  variations: [
    'Set up an AI agent that finds my HubSpot deals with no reply in 7 days every Monday at 9:00 and drafts a follow-up email for me to approve',
    'Set up an AI agent that finds my HubSpot deals in the Proposal sent stage with no reply in 5 days every weekday at 9:00 and drafts a follow-up email for me to approve',
    'Set up an AI agent that finds my HubSpot deals over $5,000 with no reply in 5 days every weekday at 9:00 and drafts a follow-up email for me to approve',
    'Set up an AI agent that finds my HubSpot deals with no reply in 5 days every weekday at 9:00 and sends me the list in Slack instead of drafting emails',
  ],
  limits: [
    'HubSpot’s actions in the catalog find a deal by its name, not by last activity, so it starts from your Gmail threads. A deal whose emails went from another inbox, or from HubSpot’s own email tool, is not seen.',
    'Follow-ups go from Gmail only.',
    'It does not log the email on the HubSpot deal unless you ask it to add a note, and that note asks first.',
    'It runs on credits: every workspace starts with 2,000 free, and each run’s cost shows in Settings, Usage.',
  ],
  otherWaysH2: 'Other ways to follow up quiet HubSpot deals',
  otherWays: [
    {
      title: 'A saved view in HubSpot',
      body: 'Filter open deals, sort by Last activity date and go through the list once a week. It is free. Last activity counts notes and tasks too, so a deal can look busy while the contact has not answered; HubSpot’s Recent Sales Email Replied Date shows the last time they actually emailed you.',
      sources: [{ label: 'HubSpot default contact properties', href: 'https://knowledge.hubspot.com/properties/hubspots-default-contact-properties' }],
    },
    {
      title: 'HubSpot sequences and workflows',
      body: 'If you already pay for Sales Hub Professional or Enterprise, sequences are the better fit: they stop on their own when the contact replies or books a meeting, and a manual email step lets you check each one. Free and Starter plans do not have them.',
      sources: [{ label: 'HubSpot sequences', href: 'https://knowledge.hubspot.com/sequences/create-and-edit-sequences' }],
    },
    {
      title: 'n8n',
      body: 'Its template "Re-engage stalled HubSpot deals with GPT-5-mini, Gmail, and Slack" picks deals from one stage and sends the email straight away, with no approval step. You host n8n and bring an OpenAI key.',
      sources: [{ label: 'n8n template', href: 'https://n8n.io/workflows/11183-re-engage-stalled-hubspot-deals-with-gpt-5-mini-gmail-and-slack/' }],
    },
  ],
  faqs: [
    { q: 'How long should I wait before following up on a deal?', a: 'Five days is the default here, and a good middle: long enough that you are not chasing, short enough that the deal is still warm. Change it in one sentence, for example 3 days for big deals and 7 for small ones.' },
    { q: 'How many follow-ups before I stop?', a: 'Two or three, then stop writing and decide. Tell the AI agent to stop after three and list those deals in its summary, so a cold deal comes back to you instead of getting a fourth email.' },
    { q: 'Will it send emails without asking me?', a: 'No. Every follow-up waits in Needs you until you approve it, change it or decline it. You can let it send on its own in Settings, Autonomy, and that switch asks you once more before it turns on.' },
    { q: 'What if the contact replied by phone or from another address?', a: 'It only sees replies in your Gmail, so it would draft a follow-up. You see the draft before it goes; decline it, and tell its chat about the reply so it leaves that deal alone.' },
    { q: 'Do I need a paid HubSpot plan?', a: 'No. It reads deals and contacts through your HubSpot connection, which works on the free CRM. HubSpot’s own sequences need Professional or Enterprise.' },
  ],
  related: [
    { href: '/use-cases/lead-tracker-from-your-inbox', kind: 'app', title: 'Lead tracker from your inbox', line: 'No CRM yet? A pipeline built from the emails that bring you work.' },
    { href: '/use-cases/hubspot-contacts-to-google-sheets-and-slack', kind: 'auto', title: 'HubSpot contacts to Sheets and Slack', line: 'Every new contact as a row and a post, the same way every time.' },
    { href: '/use-cases/ai-email-triage-every-morning', kind: 'ai', title: 'AI email triage every morning', line: 'Your unread mail sorted, and replies drafted, before you start.' },
  ],
  up: [
    { href: '/ai-agents', label: 'AI agents you can build' },
    { href: '/integrations/hubspot', label: 'HubSpot' },
    { href: '/integrations/gmail', label: 'Gmail' },
    { href: '/guides/how-to-automate-lead-follow-up-from-gmail', label: 'How to automate lead follow-up from Gmail' },
    { href: '/guides/how-to-make-an-ai-agent-ask-before-it-acts', label: 'How to make an AI agent ask before it acts' },
  ],
  finalH2: 'Start following up your quiet deals',
  byline: 'Captain builds this AI agent from the ask above, the same words as the "Follow up quiet deals" Playbook in the 50agents app; the views above are drawn from that app, filled with example data.',
};

export default page;
