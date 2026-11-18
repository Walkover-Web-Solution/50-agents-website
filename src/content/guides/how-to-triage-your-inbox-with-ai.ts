// Guide 24 (pages-brief B5). Research: Google's Gemini in Gmail page and help, Microsoft's Copilot in Outlook FAQ, Hiver,
// eesel, Superhuman and Lindy results for "ai inbox triage", read 19 Nov 2026. 50agents: the "email" template (templates/list.ts).
import type { Guide } from './types';

const g: Guide = {
  slug: 'how-to-triage-your-inbox-with-ai',
  n: 24,
  group: 'Email and calendar',
  kind: 'ai',
  title: 'How to triage your inbox with AI (and keep control) | 50agents',
  description:
    'Triage your inbox with AI: sort unread mail into reply, read, file and ignore, draft the replies, and never let it delete, unsubscribe or send without you.',
  h1: 'How to triage your inbox with AI',
  short:
    'Have an AI read your unread email at set times, sort each message into four piles (needs a reply, needs reading, file it, ignore it), draft replies for the first pile, and leave everything in your inbox for you to send or archive. Start with labels and drafts only; letting AI delete, unsubscribe or send on its own is where triage goes wrong.',
  published: '2026-11-19',
  updated: '2026-11-19',
  sections: [
    {
      id: 'piles',
      h2: 'The four piles',
      body: [
        {
          table: {
            head: ['Pile', 'What goes in', 'What the AI does'],
            rows: [
              ['Reply', 'A person asking you something', 'Drafts a reply in the thread, for you to check'],
              ['Read', 'Updates, reports, things you should know', 'One-line summary each'],
              ['File', 'Receipts, invoices, confirmations', 'A label; nothing else'],
              ['Ignore', 'Newsletters you never open, notifications', 'A label you can review weekly'],
            ],
          },
        },
        { p: 'Four piles, not twelve. Every extra category is a decision the AI can get wrong and you have to check.' },
      ],
    },
    {
      id: 'built-in',
      h2: 'What Gmail and Outlook already do',
      body: [
        {
          table: {
            head: ['', 'Gemini in Gmail', 'Copilot in Outlook'],
            rows: [
              ['Summarise a thread', 'Yes', 'Yes'],
              ['Draft a reply', 'Help me write', 'Draft'],
              ['Sort by importance', 'Search and smart suggestions', '"Prioritize my inbox": high, normal or low, with a reason'],
              ['Which plans', 'Google says all Workspace plans, and Gmail users on a Google AI plan ([Google](https://workspace.google.com/products/gmail/ai/))', 'Its Chat needs a business Microsoft Copilot subscription and a work or school account ([Microsoft](https://support.microsoft.com/en-us/outlook/frequently-asked-questions-about-copilot-in-outlook))'],
              ['Runs on its own on a schedule', 'No: you open it', 'No: you open it'],
            ],
          },
        },
        { p: 'Both are good when you are already in the inbox. What they do not do is go through your mail at 8:00 before you arrive and have the drafts waiting. That is the job for an AI agent or an automation with an AI step.' },
        { note: 'Google’s own help warns that Gemini may suggest inaccurate information ([Google](https://support.google.com/mail/answer/14355636)). Treat every draft from any tool as a draft.' },
      ],
    },
    {
      id: 'steps',
      h2: 'How to set it up, step by step',
      body: [
        {
          steps: [
            { title: 'Write your four piles in one line each', body: '"Reply: a client or supplier asking me something. Read: reports and team updates. File: receipts and invoices. Ignore: newsletters."' },
            { title: 'Pick the times', body: 'Once before you start (8:00) and once after lunch is plenty. Every few minutes costs more and interrupts more.' },
            { title: 'Give it your voice and facts', body: 'Three sentences on how you write, your sign-off, and the facts it will need (prices, hours, links). Without them, drafts sound like nobody.' },
            { title: 'Start with labels and drafts only', body: 'No archiving, deleting, unsubscribing or sending. You stay the one who moves mail out of the inbox.' },
            { title: 'Read the first week’s piles', body: 'Look for anything important in Ignore. Fix the one-line rules until nothing important is misfiled for a week.' },
          ],
        },
      ],
    },
    {
      id: 'example',
      h2: 'A worked example in 50agents',
      body: [
        { p: 'In 50agents this is one sentence to Captain. It builds an AI agent that goes through your unread email now, then every weekday at 8:00, and drafts the replies. It marks handled mail so the next run skips it, says what it searched for when it finds nothing, and asks you before any email leaves.' },
        { ask: 'Go through my unread email now, then every weekday at 8:00, and draft replies' },
        {
          view: {
            type: 'agent',
            face: 'writer',
            name: 'Morning email',
            kindWord: 'AI agent',
            status: 'Live · every weekday at 8:00',
            latest: {
              title: '19 unread: 4 replies drafted, 6 to read',
              when: 'Today 8:01, on schedule',
              summary: 'Four people asked you something; replies are drafted in each thread. Six updates to read, summarised below. Nine receipts and newsletters labelled.',
              body: ['Northgate Physio: can you move Thursday’s call to Friday? Drafted: yes, 10:00.', 'Accountant: Q3 VAT figures attached; needs a reply by Monday.', 'Bank: new statement available (filed).'],
              state: 'Waits on you',
            },
            runs: [
              { title: '7 unread: 2 replies drafted', when: 'Yesterday 8:00', state: 'Done' },
              { title: '23 unread: 5 replies drafted', when: 'Monday 8:01', state: 'Done' },
            ],
          },
          caption: 'An AI agent in 50agents after its 8:00 run: the piles, the drafts waiting, and its earlier runs. Example data.',
        },
      ],
    },
  ],
  pair: { href: '/use-cases/ai-email-triage-every-morning', label: 'Build it: AI email triage every morning', line: 'The ready-made version, with the exact ask and how to change it.' },
  wrong: [
    { title: 'An invoice in Ignore', body: 'A rule like "ignore anything automated" catches bills. Name what must never be ignored: invoices, contracts, anything from your bank.' },
    { title: 'Auto-archive hides mail', body: 'You never see what was archived. Keep everything in the inbox with labels until you trust the rules.' },
    { title: 'Unsubscribed from something you needed', body: 'Do not let AI unsubscribe for you. Review the Ignore pile and unsubscribe yourself.' },
    { title: 'Encrypted or shared mailboxes skipped', body: 'Copilot cannot read S/MIME or Double Key Encryption mail, and shared and group mailboxes have limits, according to Microsoft’s FAQ. Other tools have similar gaps; check yours.' },
    { title: '"No unread email" when there was', body: 'The tool searched for the word "unread" instead of using the unread state. Ask it to say what it searched for.' },
  ],
  faqs: [
    { q: 'Can AI manage my inbox for me?', a: 'It can sort, summarise and draft. Keep sending, deleting and unsubscribing for yourself, at least until its drafts and labels are right week after week.' },
    { q: 'Does Gmail have AI sorting built in?', a: 'Gmail has its own categories and filters, and Gemini can summarise and draft. Neither runs a scheduled pass that drafts replies before you open your inbox.' },
    { q: 'Is it safe to give AI access to my email?', a: 'Limit what it may do: read, label, draft. Every send should wait for you. Read the vendor’s data terms before connecting.' },
  ],
  sources: [
    { label: 'Google Workspace: Gemini in Gmail', href: 'https://workspace.google.com/products/gmail/ai/' },
    { label: 'Gmail help: Gemini in Gmail', href: 'https://support.google.com/mail/answer/14355636' },
    { label: 'Microsoft: Frequently asked questions about Copilot in Outlook', href: 'https://support.microsoft.com/en-us/outlook/frequently-asked-questions-about-copilot-in-outlook' },
  ],
  related: ['how-to-draft-email-replies-with-ai-and-still-check-them', 'how-to-build-a-customer-requests-desk-from-your-inbox', 'how-to-get-a-daily-calendar-summary-in-slack'],
};

export default g;
