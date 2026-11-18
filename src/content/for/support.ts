// Role page: support (pages-brief B7). Jobs from the 50agents templates and the requests recipe; Zendesk, Freshdesk and
// Intercom triggers from viaSocket's catalog, read 19 Nov 2026.
import type { Role } from '@/content/guides/types';
import { APPS } from '@/content/guides/apps';

const r: Role = {
  slug: 'support',
  role: 'support teams',
  kind: 'app',
  title: 'AI agents and automations for support teams | 50agents',
  description:
    'What support teams hand to AI first: replies drafted from your own answers, a requests desk by status, email sorted on arrival, urgent tickets flagged, a weekly summary.',
  h1: 'AI agents and automations for support teams',
  answer: [
    'Support teams hand off the first draft: an AI agent that reads each new support email and writes the reply from what your business knows, and a desk that tracks every request by status.',
    'In 50agents you describe the job to Captain and it builds it on Gmail, Zendesk, Freshdesk or Intercom; every reply waits for a person to approve, change or decline it.',
  ],
  updated: '2026-11-19',
  jobs: [
    { title: 'Draft replies to support email', kind: 'ai', href: '/use-cases/ai-replies-to-support-email', body: 'An AI agent reads new support email, answers from your policies and facts in its memory, and says what it is missing instead of guessing.', ask: 'Set up an AI agent that reads new support emails, drafts a reply from what you know about my business, and asks me before sending' },
    { title: 'Track every request on one desk', kind: 'app', href: '/use-cases/customer-requests-desk', body: 'A requests app: New, Waiting on us, Waiting on them, Solved. Its AI agent sorts each request by kind and priority and sets an answer-by date.', ask: 'Keep track of customer requests and draft the replies' },
    { title: 'Sort email as it arrives', kind: 'auto', body: 'An automation with one AI step labels each new email to support@ as billing, bug or question and logs it in a sheet.', ask: 'When a support email arrives, sort it into billing, bug or question and add it to my Support sheet' },
    { title: 'Flag urgent tickets', kind: 'auto', body: 'When a ticket is created in Zendesk or Freshdesk, check it for words like "down", "charged twice" or "cancel" and post it to your team. Posts to a channel ask you first today.', ask: 'Set up an automation: when a new Freshdesk ticket mentions an outage or a double charge, post it in #support-urgent' },
    { title: 'Send a weekly support summary', kind: 'ai', body: 'Every Friday, an AI agent reads the week’s requests and writes what came in, what is still open and the three most common questions.', ask: 'Set up an AI agent that every Friday at 16:00 reads this week’s support emails and sends me the most common questions and what is still open' },
  ],
  useCases: [
    { href: '/use-cases/ai-replies-to-support-email', kind: 'ai', title: 'AI replies to support email', line: 'Drafts from what you know, asks before sending.' },
    { href: '/use-cases/customer-requests-desk', kind: 'app', title: 'Customer requests desk', line: 'Every request in one place, with replies drafted.' },
    { href: '/use-cases/ai-email-triage-every-morning', kind: 'ai', title: 'AI email triage every morning', line: 'Your own inbox sorted and drafted by 8:00.' },
  ],
  apps: [
    { slug: 'gmail', name: 'Gmail', icon: APPS.gmail.icon, line: 'New email arrives; reply to thread' },
    { slug: 'zendesk-support', name: 'Zendesk Support', icon: APPS.zendesk.icon, line: 'Ticket created or updated; add comment' },
    { slug: 'freshdesk', name: 'Freshdesk', icon: APPS.freshdesk.icon, line: 'New ticket; add notes, update ticket' },
    { slug: 'intercom', name: 'Intercom', icon: APPS.intercom.icon, line: 'Conversation closed, new ticket, add note' },
    { slug: 'slack', name: 'Slack', icon: APPS.slack.icon, line: 'Post to a channel or a person' },
    { slug: 'google-sheets', name: 'Google Sheets', icon: APPS.sheets.icon, line: 'A log of every request' },
    { slug: 'shopify', name: 'Shopify', icon: APPS.shopify.icon, line: 'Find orders to answer "where is my order"' },
    { slug: 'typeform', name: 'Typeform', icon: APPS.typeform.icon, line: 'When a form is submitted' },
  ],
  appsNote: 'Triggers and actions as listed in viaSocket’s catalog, read 19 Nov 2026.',
  example: {
    h2: 'Worked example: replies drafted from your own answers',
    intro: 'The AI agent reads new support email a few times a day. For each question it writes a short reply from your returns policy, delivery times and prices in its memory; for anything it cannot answer from those, it drafts nothing and tells you what it would need.',
    ask: 'Set up an AI agent that reads new support emails, drafts a reply from what you know about my business, and asks me before sending',
    view: {
      type: 'need', face: 'writer', who: 'Support replies', from: 'AI agent', when: '12:03', label: 'Send an email', app: APPS.gmail,
      title: 'Reply to Pinecone Coffee',
      mail: { to: 'orders@pinecone.example', subject: 'Re: Return for order #1172', body: ['Hi Jo,', 'You can return unopened items within 30 days. Reply with the items you want to send back and I will email a prepaid label; the refund reaches your card 3 to 5 working days after we receive them.', 'Thanks,', 'The Fernhill team'] },
      facts: [['From memory', 'Returns: 30 days, unopened, prepaid label'], ['Kind', 'Question']],
      choices: ['Approve and send', 'Change', 'Decline'],
    },
    caption: 'A reply waiting in Needs you, with the facts from memory it used. Example data.',
    after: [
      'When you change a draft, say why in its chat ("we never promise delivery dates by email"); that becomes a lesson for its next drafts.',
      'The method for any tool is in [how to draft email replies with AI and still check them](/guides/how-to-draft-email-replies-with-ai-and-still-check-them).',
    ],
  },
  notYet: [
    'No live chat or phone: it works on email, and on tickets in apps like Zendesk and Freshdesk through their actions.',
    'It does not issue refunds or credits; anything that moves money asks you, and the reply only says what you have decided.',
    'A post to a Slack channel waits for your approval today, so urgent alerts are not instant.',
  ],
  guides: ['how-to-draft-email-replies-with-ai-and-still-check-them', 'how-to-build-a-customer-requests-desk-from-your-inbox', 'how-to-triage-your-inbox-with-ai'],
  faqs: [
    { q: 'Will the AI make up answers?', a: 'Its instructions say to answer only from what it knows and to tell you when it cannot. You still read every draft before it goes.' },
    { q: 'Do I need a help desk for this?', a: 'No. A requests desk app in 50agents works straight from your Gmail. If you already use Zendesk or Freshdesk, the AI agent can work with their tickets.' },
    { q: 'Can it reply on its own for simple questions?', a: 'By default every reply asks first. You can give an AI agent more freedom later in its settings, one kind of action at a time.' },
  ],
};

export default r;
