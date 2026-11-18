// Role page: ecommerce (pages-brief B7). Jobs from the 50agents templates (orders log, prices, support replies, revenue)
// plus automations on Shopify's catalog events ("Order Cancelled", "Find Orders"), read 19 Nov 2026.
import type { Role } from '@/content/guides/types';
import { APPS } from '@/content/guides/apps';

const r: Role = {
  slug: 'ecommerce',
  role: 'ecommerce teams',
  kind: 'auto',
  title: 'AI agents and automations for ecommerce stores | 50agents',
  description:
    'What online stores hand off first: orders and cancellations logged, "where is my order" replies drafted from Shopify, competitor prices watched, a weekly sales note.',
  h1: 'AI agents and automations for ecommerce stores',
  answer: [
    'Online stores hand off the order admin and the "where is my order" emails first: every order logged, cancellations marked, and replies drafted with the order’s real status.',
    'In 50agents you tell Captain the job and it builds it on Shopify, WooCommerce, Stripe, Razorpay and Gmail; every email to a customer waits for your approval.',
  ],
  updated: '2026-11-19',
  jobs: [
    { title: 'Log every order in a sheet', kind: 'auto', href: '/use-cases/shopify-orders-to-google-sheets', body: 'Each new Shopify order becomes a row with its items and total.', ask: 'Set up an automation: every new Shopify order is added as a row to my Google Sheet with its items and total' },
    { title: 'Mark cancelled orders', kind: 'auto', body: 'When an order is cancelled in Shopify, find its row and set Status to Cancelled, so the sheet’s totals stay true.', ask: 'When a Shopify order is cancelled, find its row in my Orders sheet and set Status to Cancelled' },
    { title: 'Answer "where is my order"', kind: 'ai', body: 'An AI agent reads new customer emails, looks the order up in Shopify, and drafts a reply with its real status for you to approve.', ask: 'Set up an AI agent that reads new customer emails every 3 hours, looks up their order in Shopify, and drafts a reply with the order status for me to approve' },
    { title: 'Watch competitor prices', kind: 'browser', href: '/use-cases/track-competitor-prices', body: 'A browser agent checks rival product pages each morning and tells you what changed.', ask: 'Set up a browser agent that checks my competitors\' pricing pages every day at 9:00 and tells me when a price changes' },
    { title: 'A weekly sales note', kind: 'ai', href: '/use-cases/weekly-stripe-revenue-summary', body: 'Every Monday, last week’s payments, totals and what changed, in your inbox.', ask: 'Set up an AI agent that reads last week\'s payments in Stripe every Monday at 9:00 and emails me the totals and what changed' },
  ],
  useCases: [
    { href: '/use-cases/shopify-orders-to-google-sheets', kind: 'auto', title: 'Shopify orders to Google Sheets', line: 'Every order as a row, with its items.' },
    { href: '/use-cases/track-competitor-prices', kind: 'browser', title: 'Track competitor prices', line: 'Pricing pages checked every morning.' },
    { href: '/use-cases/ai-replies-to-support-email', kind: 'ai', title: 'AI replies to support email', line: 'Customer questions answered in drafts.' },
  ],
  apps: [
    { slug: 'shopify', name: 'Shopify', icon: APPS.shopify.icon, line: 'New order, order paid, order cancelled; find orders' },
    { slug: 'woocommerce', name: 'WooCommerce', icon: APPS.woocommerce.icon, line: 'New order created, order updated' },
    { slug: 'stripe', name: 'Stripe', icon: APPS.stripe.icon, line: 'Payment succeeds, refunds, disputes' },
    { slug: 'razorpay', name: 'Razorpay', icon: APPS.razorpay.icon, line: 'Payment captured, order paid' },
    { slug: 'google-sheets', name: 'Google Sheets', icon: APPS.sheets.icon, line: 'Rows added, looked up and updated' },
    { slug: 'gmail', name: 'Gmail', icon: APPS.gmail.icon, line: 'Customer email in, replies out' },
    { slug: 'facebook-lead-ads', name: 'Facebook Lead Ads', icon: APPS.fbleads.icon, line: 'New lead submitted' },
    { slug: 'slack', name: 'Slack', icon: APPS.slack.icon, line: 'Messages to your team' },
  ],
  appsNote: 'Triggers and actions as listed in viaSocket’s catalog, read 19 Nov 2026.',
  example: {
    h2: 'Worked example: "where is my order" replies with the real status',
    intro: 'Most store inboxes are half order-status questions. This AI agent reads new customer email every few hours, finds each customer’s order in Shopify with its fulfilment status, and drafts a reply that says exactly where it is. You approve each one.',
    ask: 'Set up an AI agent that reads new customer emails every 3 hours, looks up their order in Shopify, and drafts a reply with the order status for me to approve',
    view: {
      type: 'need', face: 'writer', who: 'Order questions', from: 'AI agent', when: '15:02', label: 'Send an email', app: APPS.gmail,
      title: 'Reply to Maria Chen about order #1186',
      mail: { to: 'maria.chen@example.com', subject: 'Re: Where is my order?', body: ['Hi Maria,', 'Your order #1186 (3 x Oat Latte Blend) shipped yesterday with tracking number 1Z 999 AA1 0123 4567 84. The carrier shows it arriving on Friday.', 'Thanks for your patience,', 'The Fernhill team'] },
      facts: [['From Shopify', 'Order #1186, fulfilled 18 Nov, tracking added']],
      choices: ['Approve and send', 'Change', 'Decline'],
    },
    caption: 'A drafted reply in Needs you, with the Shopify facts it used. Example data.',
    after: [
      'If an order cannot be found from the sender’s email, the AI agent asks you instead of guessing an order.',
      'The method for logging orders is in [how to send Shopify orders to Google Sheets](/guides/how-to-send-shopify-orders-to-google-sheets).',
    ],
  },
  notYet: [
    'It does not cancel, refund or edit orders on its own; any change in Shopify asks you first.',
    'Customer replies go by email; it does not answer Instagram or WhatsApp messages today.',
    'A browser agent will not get past bot checks on competitor sites.',
  ],
  guides: ['how-to-send-shopify-orders-to-google-sheets', 'how-to-monitor-competitor-prices-automatically', 'how-to-draft-email-replies-with-ai-and-still-check-them'],
  faqs: [
    { q: 'Does it work with WooCommerce?', a: 'Yes, WooCommerce is in viaSocket’s catalog with order, product and customer triggers. Name it in the sentence to Captain.' },
    { q: 'Can it send tracking emails automatically?', a: 'It drafts them and you approve. Shopify’s own shipping notifications are the right tool for automatic tracking emails.' },
    { q: 'Will it slow down my store?', a: 'No. It reads orders through Shopify’s app connection, not your storefront.' },
  ],
};

export default r;
