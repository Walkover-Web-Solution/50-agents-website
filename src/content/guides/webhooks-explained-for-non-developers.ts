// Guide 14 (pages-brief B5). Research: Stripe webhooks docs, Shopify webhook docs (HTTPS delivery, troubleshooting),
// Zapier "What are webhooks?", TechTarget and Tray results for "what is a webhook", read 19 Nov 2026.
// 50agents: an automation can start on an app event, a schedule or a call (app/src/features/automations/CLAUDE.md).
import type { Guide } from './types';
import { APPS } from './apps';

const g: Guide = {
  slug: 'webhooks-explained-for-non-developers',
  n: 14,
  group: 'Automations',
  kind: 'auto',
  title: 'Webhooks explained for non-developers | 50agents',
  description:
    'A webhook is a message one app sends to a web address the moment something happens. What is inside one, why they arrive twice, and how to use one without code.',
  h1: 'Webhooks explained for non-developers',
  short:
    'A webhook is a message one app sends to a web address you give it the moment something happens, such as "a payment just succeeded", carrying the details of that event. Automation tools give you that address and start your steps when a message arrives; the things to know are that the same message can arrive twice, out of order, or not at all if the address is down.',
  published: '2026-11-19',
  updated: '2026-11-19',
  sections: [
    {
      id: 'plain',
      h2: 'Webhooks in plain words',
      body: [
        { p: 'There are two ways for one app to learn what happened in another. It can keep asking ("anything new?") every few minutes, which is called polling. Or the other app can tell it the moment something happens, by sending a message to an address. That message is a webhook.' },
        {
          table: {
            head: ['', 'Polling', 'Webhook'],
            rows: [
              ['Who starts it', 'Your tool asks on a timer', 'The other app sends when something happens'],
              ['Speed', 'As slow as the timer, often 1 to 15 minutes', 'Seconds'],
              ['Cost', 'Every check counts, even empty ones, in some tools', 'Only real events'],
              ['Setup', 'Pick the app and the event', 'Paste an address into the other app, or let the tool do it'],
            ],
          },
        },
        { p: 'An API is the set of things you can ask an app to do or tell you. A webhook is the app telling you without being asked. Most apps that offer webhooks also have an API, and automation tools use both.' },
      ],
    },
    {
      id: 'inside',
      h2: 'What is inside one',
      body: [
        { p: 'A webhook is a small block of text, usually JSON, sent to your address. For a Stripe payment it names the event type, an event ID, the time, and the payment with its amount and customer. You do not need to read JSON; your automation tool shows the fields as a list you can pick from.' },
        {
          table: {
            head: ['Part', 'Example', 'Why you care'],
            rows: [
              ['Event type', 'payment_intent.succeeded', 'Decides which steps run.'],
              ['Event ID', 'evt_1Q8k...', 'Your guard against duplicates.'],
              ['The record', 'amount 48000, currency usd', 'The data your steps use. Stripe sends cents.'],
              ['A signature', 'A code in a header', 'Proves the message really came from that app.'],
            ],
          },
        },
      ],
    },
    {
      id: 'rules',
      h2: 'Four things that will happen to you',
      body: [
        {
          steps: [
            { title: 'The same event arrives twice', body: 'If your address does not answer fast enough, the app sends again. Stripe retries for up to 3 days in live mode ([Stripe](https://docs.stripe.com/webhooks)); Shopify retries up to 8 times over 4 hours and expects an answer within 5 seconds ([Shopify](https://shopify.dev/docs/apps/build/webhooks/troubleshooting-webhooks)). Keep the event or record ID and skip ones you have done.' },
            { title: 'Events arrive out of order', body: '"Refunded" can land before "paid". Do not assume order; look the record up when it matters.' },
            { title: 'Your address goes down', body: 'Retries stop eventually. Shopify removes a webhook that keeps failing. If your tool was off for a day, check for missed events with a one-off read.' },
            { title: 'Someone sends a fake one', body: 'An address on the internet can receive anything. Real senders sign their messages: Stripe in a Stripe-Signature header, Shopify in X-Shopify-Hmac-SHA256 ([Shopify](https://shopify.dev/docs/apps/build/webhooks/subscribe/https)). Good automation tools check this for you on their built-in triggers.' },
          ],
        },
      ],
    },
    {
      id: 'example',
      h2: 'How 50agents uses them',
      body: [
        { p: 'Most of the time you never see a webhook. When you ask Captain for an automation that starts on an app event, such as a new Stripe payment, it sets up that start with the app for you. When you need your own address, for example so a form on your website can start an automation, ask for an automation that starts when called: it runs each time a message is posted to its address, and the message’s fields become the data its steps use.' },
        { ask: 'Set up an automation that starts when my website form posts to it, and adds each submission as a row to my Enquiries sheet' },
        {
          view: {
            type: 'track',
            name: 'Website enquiries to sheet',
            status: 'Live · starts when called',
            stations: [
              { mark: 'call', say: 'When its address is called with a form submission', passes: ['name', 'email', 'message'] },
              { mark: 'app', app: APPS.sheets, say: 'Add a row to "Enquiries"', did: 'Ran' },
            ],
            tested: 'Tested on made-up items in your app’s real format (none real yet).',
          },
          caption: 'An automation in 50agents that starts when called: its address is the webhook, and the fields it receives pass to the next step. Example data.',
        },
      ],
    },
  ],
  wrong: [
    { title: 'Duplicate rows or emails', body: 'A retry ran your steps twice. Skip IDs you have already handled.' },
    { title: 'A slow step causes retries', body: 'Your endpoint took too long to answer, so the sender tried again. Tools built for webhooks answer at once and do the work after.' },
    { title: 'A webhook silently stopped', body: 'After repeated failures, some apps remove the subscription. If events stop arriving, check the sending app’s webhook page.' },
    { title: 'A redirect counts as a failure', body: 'Stripe treats a redirect as a failed delivery. Use the exact address your tool gives you.' },
    { title: 'Test events mixed with real ones', body: 'Test mode and live mode send to the same address if you let them. Use separate addresses or check the mode field.' },
  ],
  faqs: [
    { q: 'What is the difference between a webhook and an API?', a: 'With an API, your tool asks the app for data. With a webhook, the app sends data to your tool when something happens. Most integrations use both.' },
    { q: 'Are webhooks secure?', a: 'They can be: the sender signs each message, and the receiver checks the signature. A webhook address with no signature check will accept anything, so keep it private.' },
    { q: 'Do I need a developer to use webhooks?', a: 'Not for automation tools: they create and check the address for you. You need one if you are building your own endpoint.' },
  ],
  sources: [
    { label: 'Stripe docs: Webhooks', href: 'https://docs.stripe.com/webhooks' },
    { label: 'Shopify dev docs: Troubleshooting webhooks', href: 'https://shopify.dev/docs/apps/build/webhooks/troubleshooting-webhooks' },
    { label: 'Shopify dev docs: Deliver webhooks through HTTPS', href: 'https://shopify.dev/docs/apps/build/webhooks/subscribe/https' },
    { label: 'Zapier: What are webhooks?', href: 'https://zapier.com/blog/what-are-webhooks/' },
  ],
  related: ['how-to-automate-data-entry-between-two-apps', 'how-to-log-stripe-payments-in-google-sheets', 'how-to-automate-a-website-that-has-no-api'],
};

export default g;
