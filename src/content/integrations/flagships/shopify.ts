// Shopify (pages-brief B3). Triggers and actions: viaSocket's catalog (scripts/snapshot-catalog.mjs), read 19 Nov 2026.
// Sidekick: Shopify's own page, read 19 Nov 2026.
import type { Flagship } from '../types';

const page: Flagship = {
  slug: 'shopify',
  title: 'AI agents, automations and apps for Shopify | 50agents',
  description:
    'Connect Shopify and tell Captain the job: every order as a row in Google Sheets, an AI agent that follows up abandoned checkouts, or alerts on cancellations.',
  answer: [
    'In 50agents you connect your Shopify store and tell Captain what should happen around it, such as “every new Shopify order is added as a row to my Google Sheet with its items and total”.',
    'Captain builds an automation for steps that never change, like logging orders or tagging them, or an AI agent for work that needs a judgement, like which abandoned checkout to follow up and what to say.',
  ],
  heroAsk: 'Set up an automation: every new Shopify order is added as a row to my Google Sheet with its items and total',
  kinds: [
    {
      kind: 'auto',
      does: 'The same steps on every order event: a new order to a sheet row, a paid order to a Slack post, a cancelled order to your accounting app.',
      ask: 'Set up an automation: every new Shopify order is added as a row to my Google Sheet with its items and total',
      uses: ['New Order', 'Order Paid', 'Order Cancelled'],
    },
    {
      kind: 'ai',
      does: 'Looks at each abandoned checkout or delivered order, decides whether to reach out and what to say, and drafts the email for your approval. It can look up the customer and their past orders first.',
      ask: 'Set up an AI agent that looks at each abandoned checkout in Shopify, checks the customer’s past orders, and drafts a short follow-up email for me to approve',
      uses: ['Abandoned Checkout', 'Find Customers', 'Find Orders'],
    },
    {
      kind: 'browser',
      does: 'Shopify is connected through its API. A browser agent watches the websites around your store, such as competitors’ product and pricing pages.',
      ask: 'Set up a browser agent that checks my competitors’ pricing pages every day at 9:00 and tells me when a price changes',
      uses: [],
    },
    {
      kind: 'app',
      does: 'Screens Shopify does not give you: customer requests about orders as a desk with status and urgency, and replies drafted for you to approve.',
      ask: 'Keep track of customer requests and draft the replies',
      uses: ['Get Order Status'],
    },
  ],
  groups: [
    { label: 'Orders', line: 'Start when an order is created, paid, edited, cancelled, deleted or delivered; create, find, update, tag, fulfil or cancel orders.', events: ['New Order', 'Order Paid', 'Order Line Items Are Edited', 'Order Cancelled', 'Order Deleted', 'When an order is marked as delivered', 'Create Order', 'Find Orders', 'Get Order Status', 'Update Order', 'Add Tag to an Order', 'Create Fulfillment', 'Cancel Order'] },
    { label: 'Checkouts and draft orders', line: 'Start when a checkout is abandoned; create and find draft orders and add or remove their discount codes.', events: ['Abandoned Checkout', 'Create Draft Order', 'Find Draft Orders', 'Add Discount Code to Draft Order', 'Remove Discount Code', 'Get all Discount Coupon Codes'] },
    { label: 'Customers', line: 'Start when a customer is created or updated; create, find and update customers.', events: ['New Customer', 'Customer Updated', 'Create Customer', 'Find Customers', 'Update Customer'] },
    { label: 'Products and stock', line: 'Start on new or changed products; create, find, update and delete products, and set stock at a location.', events: ['New Product', 'Product Updated', 'Watch Product', 'Create Product', 'Find Products', 'Update Product', 'Delete Product', 'Adjust Inventory Quantity'] },
    { label: 'Collections, segments and markets', line: 'Start on new or updated collections and customer segments; list markets and their currencies.', events: ['New Collection', 'Collection Updated', 'New Segment', 'Segment Updated', 'List Markets and Currencies'] },
    { label: 'Store content', line: 'Start when a blog article is published; write articles, find blogs, build navigation menus. Shopify Forms submissions forwarded through Shopify Flow can start work too.', events: ['New Blog Article', 'Create Blog Article', 'Find Blogs', 'Create Navigation Menu', 'New Form Submission'] },
    { label: 'Companies and locations', line: 'Start when a B2B company or a store location is created, updated or deactivated.', events: ['New Company', 'Company Updated', 'New Location', 'Location Updated', 'Location Deactivated'] },
  ],
  native: {
    head: 'Shopify’s own AI, Sidekick, and what 50agents adds',
    body:
      'Shopify’s Sidekick is an AI assistant included in every Shopify plan; it works with your store data and can take actions in your Shopify admin. 50agents works from outside the store: it starts from a Shopify event and acts in the other apps you run the business on, such as Google Sheets, Gmail, Slack or your accounting app, and it asks before anything reaches a customer.',
    better: 'For changes inside the store itself, like editing products or asking about this month’s sales, Sidekick is already in your admin and needs no connection.',
    sources: [{ label: 'Shopify: Sidekick', href: 'https://www.shopify.com/sidekick' }],
  },
  useCases: [
    { slug: 'shopify-orders-to-google-sheets', kind: 'auto', title: 'Shopify orders to Google Sheets', line: 'Each order as a row with its items and total.' },
    { slug: 'customer-requests-desk', kind: 'app', title: 'A customer requests desk', line: 'Order questions tracked by status, urgent first.' },
  ],
  guides: [
    { slug: 'how-to-send-shopify-orders-to-google-sheets', title: 'How to send Shopify orders to Google Sheets' },
    { slug: 'how-to-monitor-competitor-prices-automatically', title: 'How to monitor competitor prices automatically' },
  ],
  faqs: [
    {
      q: 'Can it log each line item, not just the order?',
      a: 'Say so in the ask: “one row per item”. Captain plans the automation that way, and Google Sheets’ Add Multiple Rows action writes several rows in one step. Check the plan before you approve it.',
    },
    {
      q: 'Can it follow up abandoned checkouts?',
      a: 'Yes. The Abandoned Checkout trigger fires when a customer leaves checkout after giving an email or phone number. An AI agent can draft the follow-up, and it waits for your approval before it goes out.',
    },
    {
      q: 'Can it cancel or refund orders?',
      a: 'The catalog has Cancel Order, which can refund through the original payment or store credit and restock items. Anything that moves money asks you first in 50agents.',
    },
  ],
  updated: '2026-11-19',
};
export default page;
