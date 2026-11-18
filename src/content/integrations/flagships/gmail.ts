// Gmail (pages-brief B3). Triggers and actions: viaSocket's catalog (scripts/snapshot-catalog.mjs), read 19 Nov 2026.
// Asks: the 50agents app's templates (app/src/features/templates/list.ts), read 19 Nov 2026.
import type { Flagship } from '../types';

const page: Flagship = {
  slug: 'gmail',
  title: 'AI agents, automations and apps for Gmail | 50agents',
  description:
    'Connect Gmail and tell Captain the job: an AI agent that drafts replies to unread email, a desk for customer requests, or an automation on new mail.',
  answer: [
    'In 50agents you connect Gmail and tell Captain what to do with your email, for example “Go through my unread email now, then every weekday at 8:00, and draft replies”.',
    'Captain builds an AI agent, an automation or an app that reads, labels, drafts and sends through your own Gmail, and every email to someone outside waits for your approval first.',
  ],
  heroAsk: 'Go through my unread email now, then every weekday at 8:00, and draft replies',
  kinds: [
    {
      kind: 'auto',
      does: 'Fixed steps on each new email or attachment: save the attachment, add a label, log the sender in a sheet. AI can be one step, such as sorting the email into a category.',
      ask: 'Set up an automation: when a new email with an attachment arrives in Gmail, add the sender, subject and date as a row to my Google Sheet',
      uses: ['New Attachment', 'Get Email Attachment'],
    },
    {
      kind: 'ai',
      does: 'Reads each unread thread, decides which need you and which can wait, and saves a reply as a Gmail draft in your voice. You check the drafts and send.',
      ask: 'Go through my unread email now, then every weekday at 8:00, and draft replies',
      uses: ['Search_Email_Messages', 'Get Thread Replies', 'Create Email Draft', 'Modify Email Labels'],
    },
    {
      kind: 'browser',
      does: 'Gmail is connected through its API, so a browser agent is for what an email points to: a supplier’s order page, a tracking link or a portal with no app to connect.',
      ask: 'Set up a browser agent that checks my competitors’ pricing pages every day at 9:00 and tells me when a price changes',
      uses: [],
    },
    {
      kind: 'app',
      does: 'Turns an inbox into a desk: customer requests, leads or unpaid invoices as records with a status, and a crew of AI agents that files new email and drafts the replies.',
      ask: 'Keep track of customer requests and draft the replies',
      uses: ['New Email Arrives', 'Reply To Thread'],
    },
  ],
  groups: [
    { label: 'New mail', line: 'Start when an email arrives (filtered by label, sender or subject), when you send one, or when one carries an attachment.', events: ['New Email Arrives', 'New Email Sent', 'New Attachment'] },
    { label: 'Read and search', line: 'Search your mail, list it by label, open one message, read a whole thread or pull an attachment.', events: ['Search_Email_Messages', 'List_all_Mails', 'Get Gmail Message by ID', 'Get Thread Replies', 'Get Email Attachment'] },
    { label: 'Write and send', line: 'Save a draft, reply in a thread, or send a new email with attachments, CC and BCC.', events: ['Create Email Draft', 'Reply To Thread', 'Send Email'] },
    { label: 'Organise', line: 'Add or remove labels on a message or thread.', events: ['Modify Email Labels'] },
  ],
  useCases: [
    { slug: 'ai-email-triage-every-morning', kind: 'ai', title: 'AI email triage every morning', line: 'Your unread email gone through and replies drafted by 8:00.' },
    { slug: 'ai-replies-to-support-email', kind: 'ai', title: 'AI replies to support email', line: 'Answers from what it knows about your business, asks before sending.' },
    { slug: 'chase-unpaid-invoices', kind: 'app', title: 'Chase unpaid invoices', line: 'An invoices desk, late first, reminders sent from your Gmail.' },
    { slug: 'customer-requests-desk', kind: 'app', title: 'A customer requests desk', line: 'Requests from email tracked by status, urgent first.' },
    { slug: 'lead-tracker-from-your-inbox', kind: 'app', title: 'A lead tracker from your inbox', line: 'Leads pulled from email into a pipeline.' },
    { slug: 'follow-up-quiet-hubspot-deals', kind: 'ai', title: 'Follow up quiet HubSpot deals', line: 'Follow-ups drafted in Gmail for deals with no reply.' },
    { slug: 'weekly-stripe-revenue-summary', kind: 'ai', title: 'Weekly Stripe revenue summary', line: 'Last week’s payments emailed to you every Monday.' },
  ],
  guides: [
    { slug: 'how-to-triage-your-inbox-with-ai', title: 'How to triage your inbox with AI' },
    { slug: 'how-to-draft-email-replies-with-ai-and-still-check-them', title: 'How to draft email replies with AI and still check them' },
    { slug: 'how-to-automate-lead-follow-up-from-gmail', title: 'How to automate lead follow-up from Gmail' },
    { slug: 'how-to-build-a-customer-requests-desk-from-your-inbox', title: 'How to build a customer requests desk from your inbox' },
    { slug: 'how-to-automate-invoice-reminders', title: 'How to automate invoice reminders' },
  ],
  faqs: [
    {
      q: 'Will an AI agent send email from my Gmail without asking?',
      a: 'Not by default. Anything sent to people outside your workspace becomes a Needs you item, and it goes from your Gmail only after you approve it. Drafts saved with Create Email Draft sit in your Gmail drafts until you send them.',
    },
    {
      q: 'Can it reply inside the same thread?',
      a: 'Yes. Reply To Thread answers an existing thread and lets you pick the recipients (the sender, everyone, or specific people), so the reply stays with the conversation.',
    },
    {
      q: 'Does it work with Outlook too?',
      a: 'This page covers Gmail. Microsoft Outlook is a separate app in viaSocket’s catalog with its own triggers and actions, and Captain can use it the same way once you connect it.',
    },
  ],
  updated: '2026-11-19',
};
export default page;
