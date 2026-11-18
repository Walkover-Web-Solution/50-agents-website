// Use case 11 (pages-brief B1): AI inbox triage, replies drafted. An AI agent on your own inbox.
// Product facts: the Playbook "Morning email, replies drafted" (templates/list.ts, Onboarding's first start); AI agents
// wake on a schedule (agents/server/wake.ts) and do a first run when built ("now"); Gmail's unread is the UNREAD label and
// a handled mail is marked read with Modify Email Labels, a change that asks first by default (tasks/tips.ts, P36,
// settings/rules.ts). Catalog: catalog.ts, read 19 Nov 2026. Research: scratchpad research-B, read 19 Nov 2026.
// What sets it apart from 5 (support replies from business knowledge) and 6 (a tracked desk): your own, mixed inbox.
import type { UseCase } from '@/site/types';
import { chips, iconOf } from './catalog';

const page: UseCase = {
  slug: 'ai-email-triage-every-morning',
  kind: 'ai',
  title: 'AI inbox triage every morning, replies drafted | 50agents',
  description:
    'For AI inbox triage, set up an AI agent that goes through your unread Gmail now and every weekday at 8:00, sorts it and drafts the replies for you to check.',
  h1: 'AI inbox triage every morning, with replies drafted',
  answer: [
    'To triage your inbox with AI, tell Captain "Go through my unread email now, then every weekday at 8:00, and draft replies".',
    'It builds an AI agent that reads your unread Gmail right away and then every weekday morning, tells you what needs you and what can wait, and drafts a reply to each email that needs one, which you send, change or drop.',
  ],
  ask: 'Go through my unread email now, then every weekday at 8:00, and draft replies',
  updated: '2026-11-19',
  published: '2026-11-19',
  promises: ['Starts on your inbox right now', 'Drafts in your voice; you send', 'Learns from your corrections'],
  plan: {
    mode: 'building an AI agent',
    name: 'Morning inbox',
    line: 'Unread email sorted, replies drafted',
    faces: ['rosa'],
    rows: [
      { label: 'When', value: 'Now, then every weekday at 8:00' },
      { label: 'Apps', value: 'Gmail' },
      { label: 'Asks first', value: 'Sending any reply' },
    ],
  },
  factsLabel: 'What Gmail does on its own',
  facts: [
    {
      figure: 'No cost',
      text: 'is what Google said Help Me Write and Suggested Replies would cost every Gmail user, rolling out from January 2026. Its AI Inbox, which builds a to-do briefing, launched to trusted testers only.',
      source: 'Google blog, 8 Jan 2026',
      href: 'https://blog.google/products-and-platforms/products/gmail/gmail-is-entering-the-gemini-era/',
      read: '19 Nov 2026',
    },
  ],
  seeIt: {
    h2: 'What you get: your inbox sorted before you open it',
    intro: 'This is the AI agent’s page in 50agents after an 8:00 run, with example email. Overview shows a reply waiting for your OK and the morning’s sort; Work lists every morning; Setup shows its instructions.',
  },
  view: {
    type: 'agent',
    agent: {
      name: 'Morning inbox',
      face: 'rosa',
      status: '4 things wait on you',
      tone: 'warn',
      waiting: 4,
      waits: {
        by: 'Morning inbox', face: 'rosa', where: 'AI agent', ago: 'Today 8:04 AM',
        title: 'Reply to Alex Moreno',
        rows: [{ label: 'To', value: 'alex@northwind.example' }, { label: 'Subject', value: 'Re: Thursday’s workshop, can we move it?' }],
        body: [
          'Hi Alex,',
          'Thursday is tight on my side too. Friday 10:00 or 14:00 both work; pick one and I will move the invite.',
          'Sam',
        ],
        actions: ['Approve and send', 'Change', 'Decline'],
      },
      latest: {
        title: '23 unread: 4 replies drafted, 3 for you to read',
        when: 'Today 8:04 AM',
        summary: 'Sorted 23 unread emails since yesterday 18:00.',
        result: {
          type: 'list',
          title: 'This morning’s inbox',
          items: [
            { b: 'Needs a reply (4)', t: 'Alex Moreno, workshop date; Priya Shah, contract question; your accountant, two receipts; Jo Kim, Friday lunch', tag: 'Drafted' },
            { b: 'For you to read (3)', t: 'Board update from Lena; new terms from your bank; a quote from the printer', tag: 'Read' },
            { b: 'Waiting on others (2)', t: 'You asked Ben for the invoice on Monday; Tom has not sent the slides', tag: 'Waiting' },
            { b: 'Meetings (3)', t: 'Two invites accepted by others, one moved to 15:00', tag: 'FYI' },
            { b: 'Newsletters and notifications (11)', t: 'Left unread, not drafted', tag: 'Skipped' },
          ],
        },
      },
      runs: [
        { title: '23 unread: 4 replies drafted', when: 'Today 8:04 AM', status: 'Waits on you' },
        { title: '17 unread: 2 replies drafted, both sent', when: 'Yesterday 8:03 AM', status: 'Done' },
        { title: '31 unread: 5 replies drafted, 4 sent', when: 'Mon 17 Nov 8:05 AM', status: 'Done' },
        { title: 'First run: 64 unread, 9 replies drafted', when: 'Fri 14 Nov 4:12 PM', status: 'Done' },
      ],
      instructions: [
        'Go through my unread Gmail in the inbox: now, then every weekday at 8:00.',
        'Sort each email: needs a reply from me, for me to read, waiting on someone else, meetings, or newsletters and notifications. Give me the sort in short lines, most important first.',
        'For each email that needs a reply, draft one in my voice: short, plain, signed "Sam". If you need a fact you do not have, leave a gap in [brackets] instead of guessing.',
        'Never reply to newsletters or notifications. Every reply waits for my OK.',
      ],
      facts: { runs: 'Every weekday at 8:00 AM (first run when built)', apps: ['gmail'], alone: 'Reads your Gmail', asks: 'Every reply, and marking email read' },
    },
  },
  howH2: 'How it triages your inbox each morning, step by step',
  planParts: [
    { title: 'Its job', body: 'Sort your unread email and draft a reply to each one that needs it.' },
    { title: 'Instructions', body: 'The sort, your voice and sign-off, what never gets a reply. Changed in its chat.' },
    { title: 'Its apps', body: 'Gmail, connected in the chat if it is not yet.' },
    { title: 'When it runs', body: 'Once as soon as it is built, then every weekday at 8:00.' },
    { title: 'Asks you first', body: 'Sending any email. Reading runs on its own.' },
  ],
  steps: [
    { title: 'You ask; it starts right away', body: 'Say the sentence or tap "Morning email, replies drafted". Captain plans the AI agent; tap Build it and its first run goes through your unread email there and then, so you see it work on your real inbox.' },
    { title: 'Weekdays at 8:00 it reads the unread', body: 'It reads mail in your inbox that is still unread, in your workspace’s time zone, so the sort is ready before you sit down.' },
    { title: 'It sorts by what you need to do', body: 'Not by sender: needs a reply, for you to read, waiting on someone else, meetings, newsletters and notifications. The summary puts the few that need you first.' },
    { title: 'It drafts the replies', body: 'For each email that needs a reply it writes a short one in the thread, in the voice its instructions give it. Where it needs a fact it does not have, it leaves a gap in brackets.' },
    { title: 'You send, change or drop each one', body: 'Drafts wait in Needs you and on Home. Correct its tone in its chat ("never start with ‘Hope you are well’") and every change is a version you can undo.' },
  ],
  uses: [
    { app: 'gmail', icon: iconOf('gmail'), name: 'Gmail', why: 'Reads the unread mail in your inbox, replies in the thread after your OK, and marks handled mail read so tomorrow’s run skips it.', chips: chips('gmail', ['Search_Email_Messages', 'Get Gmail Message by ID', 'Reply To Thread', 'Modify Email Labels', 'Create Email Draft']) },
  ],
  usesNote: 'Gmail’s actions as listed in viaSocket’s catalog of 2,300+ apps, read 19 Nov 2026. It picks which to call on each run.',
  asksFirst:
    'Every reply, before it is sent. Reading your mail runs on its own. Marking mail read and saving a draft into Gmail are changes, and an AI agent asks before any change until you let it: in Settings, Autonomy, turn on "Change things" for it and only the sends still wait for you.',
  table: {
    h2: 'How it sorts your morning',
    label: 'Inbox sort',
    cols: ['Pile', 'What it does with it', 'Ask Captain'],
    intro: 'The ask covers drafting replies. The sort below is what Captain’s instructions usually spell out; change any pile in one sentence.',
    rows: [
      { when: 'Needs a reply', tone: 'Drafts a reply in the thread for your OK', ask: '' },
      { when: 'For you to read', tone: 'One line each, most important first', ask: 'Put anything from my bank, my accountant or a lawyer at the top of your summary' },
      { when: 'Waiting on others', tone: 'Threads where you asked and they have not answered', ask: 'Also list threads where I asked a question 3 days ago and got no answer, and draft a nudge' },
      { when: 'Meetings', tone: 'What moved or changed', ask: 'Leave calendar invites out of your summary' },
      { when: 'Newsletters and notifications', tone: 'Left alone, never answered', ask: 'Mark newsletters read without listing them' },
    ],
    note: 'Sorting by the action needed, not by sender, is how the inbox tools we read work too: Fyxer files mail into to respond, FYI, meeting update and notification.',
    sources: [{ label: 'Fyxer', href: 'https://www.fyxer.com' }],
  },
  yoursIntro: 'Change the time, the days or how far it goes. Each of these builds a different AI agent; copy one into Captain.',
  variations: [
    'Go through my unread email now, then every day at 7:00 including weekends, and draft replies',
    'Go through my unread email now, then every weekday at 8:00, and only draft replies to clients and my team',
    'Go through my unread email now, then every weekday at 8:00, sort it and tell me what needs me, but do not draft anything',
    'Go through my unread email now, then every weekday at 8:00, draft replies, and send me the summary in Slack',
  ],
  limits: [
    'It works from Gmail’s unread mark: an email you already opened, on your phone say, is left out.',
    'Once a day at its time, not as mail arrives.',
    'A first run on thousands of unread emails will not get through them all. Mark old mail read first, or tell it to look at the last 7 days only.',
    'Gmail only today; one inbox per AI agent.',
  ],
  otherWaysH2: 'Other ways to triage your inbox with AI',
  otherWays: [
    {
      title: 'Gmail’s own AI',
      body: 'Help Me Write and Suggested Replies draft one reply when you open an email, at no cost. Nothing runs before you open your inbox, and nothing sorts it for you; AI Inbox, which does, started with trusted testers only.',
      sources: [{ label: 'Google blog', href: 'https://blog.google/products-and-platforms/products/gmail/gmail-is-entering-the-gemini-era/' }],
    },
    {
      title: 'An AI email assistant',
      body: 'Fyxer sorts Gmail and Outlook into labels and leaves drafts ready to review and send; Superhuman’s auto drafts are on its Business and Enterprise plans. If you want triage inside your mail client all day, they are the better fit.',
      sources: [{ label: 'Fyxer', href: 'https://www.fyxer.com' }],
    },
    {
      title: 'Zapier',
      body: '"Draft friendly email replies from new inbox messages" drafts a reply and labels each email as it arrives, rather than once a morning.',
      sources: [{ label: 'Zapier', href: 'https://zapier.com/automations/personal-productivity/email-management/responding-to-emails/draft-friendly-email-replies-from-new-inbox-messages' }],
    },
  ],
  faqs: [
    { q: 'Can AI tell me which emails need a reply?', a: 'Yes, that is the sort: it reads each unread email and decides whether it needs you to reply, read, wait or nothing. Tell it to put anything it is unsure about under "for you to read", and nothing slips past you.' },
    { q: 'Will it send emails for me?', a: 'Not without your yes. Every reply waits in Needs you, where you send it, change it or decline it.' },
    { q: 'How does it learn how I write?', a: 'From its instructions and your corrections. Tell its chat what to change ("shorter", "sign off with just my initial") and it keeps that as a new version you can undo.' },
    { q: 'How is this different from an AI agent for support email?', a: 'That one reads a support address and answers customers from your business’s facts. This one reads your own mixed inbox, where most mail is not a question and the job is deciding what needs you.' },
    { q: 'Why 8:00 on weekdays?', a: 'So the sort is ready before you start. Change the time or the days in one sentence; it runs once a day at the time you set.' },
  ],
  related: [
    { href: '/use-cases/ai-replies-to-support-email', kind: 'ai', title: 'AI replies to support email', line: 'A support address, answered from your business’s facts.' },
    { href: '/use-cases/tomorrows-meetings-in-slack', kind: 'ai', title: 'Tomorrow’s meetings in Slack', line: 'The evening before: tomorrow’s calendar in one message.' },
    { href: '/use-cases/customer-requests-desk', kind: 'app', title: 'Customer requests desk', line: 'Requests that need tracking to solved, not just a reply.' },
  ],
  up: [
    { href: '/ai-agents', label: 'AI agents you can build' },
    { href: '/integrations/gmail', label: 'Gmail' },
    { href: '/guides/how-to-triage-your-inbox-with-ai', label: 'How to triage your inbox with AI' },
    { href: '/guides/how-to-draft-email-replies-with-ai-and-still-check-them', label: 'How to draft email replies with AI and still check them' },
  ],
  finalH2: 'Start your mornings with a sorted inbox',
  byline: 'Captain builds this AI agent from the ask above, the same words as the "Morning email, replies drafted" Playbook in the 50agents app; the views above are drawn from that app, filled with example data.',
};

export default page;
