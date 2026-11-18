// Guide 25 (pages-brief B5). Research: Lindy email drafting docs, Gmelius reply assistant help, Microsoft's Copilot in
// Outlook FAQ, Gmail's Gemini help, Zapier templates, for "ai draft email replies", read 19 Nov 2026.
// 50agents: the support-replies template and Needs you's Change and Decline.
import type { Guide } from './types';
import { APPS } from './apps';

const g: Guide = {
  slug: 'how-to-draft-email-replies-with-ai-and-still-check-them',
  n: 25,
  group: 'Email and calendar',
  kind: 'ai',
  title: 'Draft email replies with AI and still check them | 50agents',
  description:
    'Let AI draft your email replies and check each one in under a minute: a five-point review for facts, promises, prices, dates and recipients, before you send.',
  h1: 'How to draft email replies with AI and still check them',
  short:
    'Let the AI write drafts into the thread, never send, and check each one in under a minute against five things: facts, promises, prices and dates, recipients, and tone. Give it your facts and two or three sample replies so the drafts sound like you, and correct it in words when it gets something wrong so the next draft is better.',
  published: '2026-11-19',
  updated: '2026-11-19',
  sections: [
    {
      id: 'review',
      h2: 'The one-minute review',
      body: [
        { p: 'Read every AI draft for these five, in this order. The first three are where the expensive mistakes hide.' },
        {
          table: {
            head: ['Check', 'Look for', 'Why'],
            rows: [
              ['Facts', 'Order numbers, names, what happened', 'A draft can fill a gap with something plausible and wrong.'],
              ['Promises', '"We will refund", "by Friday", "free of charge"', 'You are bound by what you send, not what you meant.'],
              ['Prices and dates', 'Every number', 'Old prices in memory, wrong year, wrong timezone.'],
              ['Recipients', 'To, Cc, reply-all', 'A reply-all to a thread with a supplier on it.'],
              ['Tone', 'Too stiff, too cheerful, too long', 'Matters least, and is easiest to fix.'],
            ],
          },
        },
        { note: 'Google’s help says Gemini "may suggest inaccurate or inappropriate information" ([Google](https://support.google.com/mail/answer/14355636)). Every vendor says something similar. The review is not optional.' },
      ],
    },
    {
      id: 'sound-like-you',
      h2: 'Make the drafts sound like you',
      body: [
        {
          ul: [
            '**Three real replies you liked**, pasted in as examples of tone and length.',
            '**Your sign-off and greeting**, exactly as you write them.',
            '**The facts it will be asked about**: prices, hours, policies, links. Kept somewhere the AI reads every time, and updated when they change.',
            '**What you never say**: "unfortunately", discounts, legal opinions. Give the reason so it applies the rule sensibly.',
            '**Corrections, in words.** When you change a draft, tell the tool why ("we never offer refunds by email, offer a call"). Lindy, for one, learns from your edits but needs you to save what it learned ([Lindy](https://www.lindy.ai/docs/features/inbox-management/email-drafting.md)).',
          ],
        },
      ],
    },
    {
      id: 'steps',
      h2: 'How to set it up, step by step',
      body: [
        {
          steps: [
            { title: 'Choose which emails get drafts', body: 'Questions from customers to support@, or all mail from people (not newsletters) to you. Narrow is better.' },
            { title: 'Drafts only, never auto-send', body: 'Drafts in the thread, or a card to approve. Turn off any auto-send setting before the first run.' },
            { title: 'Load your facts and examples', body: 'The list above. Without facts, the AI writes friendly replies that answer nothing.' },
            { title: 'Tell it what to do when it does not know', body: '"If the answer is not in what you know, do not draft. Tell me what is missing." A gap you see is better than a guess you send.' },
            { title: 'Review for two weeks, then decide', body: 'Count drafts sent unchanged, edited, and thrown away. Fix the facts behind the thrown-away ones.' },
          ],
        },
      ],
    },
    {
      id: 'example',
      h2: 'A worked example in 50agents',
      body: [
        { p: 'In 50agents an AI agent drafts replies from what your business knows (its memory, which you can read and correct), and every reply waits in Needs you with the full text. You can approve it as it is, change it, or decline it. Corrections you make in its chat become lessons it uses next time.' },
        { ask: 'Set up an AI agent that reads new support emails, drafts a reply from what you know about my business, and asks me before sending' },
        {
          view: {
            type: 'need',
            face: 'writer',
            who: 'Support replies',
            from: 'AI agent',
            when: '12:04',
            label: 'Send an email',
            app: APPS.gmail,
            title: 'Reply to Harbor Yoga',
            mail: {
              to: 'hello@harboryoga.example',
              subject: 'Re: Can I change my plan?',
              body: ['Hi Lena,', 'Yes. You can move from Studio to Studio Plus at any time from Settings, Billing, and the difference is charged pro rata for the rest of the month. Your next invoice will show it on its own line.', 'If you would rather I switch it for you, reply with "go ahead".', 'Best,', 'The Fernhill team'],
            },
            facts: [['From memory', 'Plan changes: any time, pro rata (updated 2 Nov)']],
            choices: ['Approve and send', 'Change', 'Decline'],
          },
          caption: 'A drafted reply in Needs you, with the fact from memory it relied on. Check the promise ("pro rata") and the price wording before you approve. Example data.',
        },
      ],
    },
  ],
  pair: { href: '/use-cases/ai-replies-to-support-email', label: 'Build it: AI replies to support email', line: 'The ready-made version, with the exact ask and what it asks you first.' },
  wrong: [
    { title: 'A promise you did not make', body: 'The draft offered a refund or a deadline. Keep policies in the AI’s facts and list what it may never offer.' },
    { title: 'Stale prices', body: 'Last year’s price in its memory. Update facts the day they change, and date them.' },
    { title: 'Reply-all to the wrong people', body: 'A thread with a supplier on Cc. Check recipients every time; it takes a second.' },
    { title: 'Auto-send left on', body: 'A setting you did not notice sent drafts on their own. Check before the first run, and again after any update.' },
    { title: 'Everything sounds the same', body: 'Generic drafts with no examples. Paste in three of your own replies.' },
  ],
  faqs: [
    { q: 'Can AI reply to my emails for me?', a: 'It can draft them well. Sending should stay with you, at least for anything that reaches a customer.' },
    { q: 'How do I make AI emails sound like me?', a: 'Give it three replies you wrote and liked, your exact greeting and sign-off, and correct it in words when it misses.' },
    { q: 'Should I tell people a reply was drafted by AI?', a: 'If you read and approve it, it is your reply. If something goes out unreviewed, say so, or better, do not let it.' },
  ],
  sources: [
    { label: 'Gmail help: Gemini in Gmail', href: 'https://support.google.com/mail/answer/14355636' },
    { label: 'Lindy docs: Email drafting', href: 'https://www.lindy.ai/docs/features/inbox-management/email-drafting.md' },
    { label: 'Gmelius help: Email reply assistant', href: 'https://help.gmelius.com/ai/email-reply-assistant' },
  ],
  related: ['how-to-triage-your-inbox-with-ai', 'how-to-make-an-ai-agent-ask-before-it-acts', 'how-to-write-instructions-for-an-ai-agent'],
};

export default g;
