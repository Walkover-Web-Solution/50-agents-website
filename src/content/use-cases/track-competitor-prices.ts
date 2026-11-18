// Use case 10 (pages-brief B1): monitor competitor prices automatically. A browser agent.
// Product facts: the Playbook "Watch competitor prices" (templates/list.ts); browser agents (features/browser/CLAUDE.md
// and agent-kind.tsx: its own browser kept between runs; up to 15 pages and about 8 minutes a run; never gets past a
// CAPTCHA, asks with Solve it; never types a password; submits only by asking; pages kept as text and links, not pictures;
// a run compares with the last from its memory). Notifications by email are not built (pages-brief A1), so it reports on
// its page and Home. Research: scratchpad research-C, read 19 Nov 2026.
import type { UseCase } from '@/site/types';

const page: UseCase = {
  slug: 'track-competitor-prices',
  kind: 'browser',
  title: 'Monitor competitor prices automatically | 50agents',
  description:
    'To monitor competitor prices automatically, a browser agent reads their pricing pages every day at 9:00 and tells you which price changed and by how much.',
  h1: 'Monitor competitor prices automatically',
  answer: [
    'To monitor competitor prices automatically, tell Captain to set up a browser agent that opens your competitors’ pricing pages every day at 9:00 in its own browser, the way you would.',
    'It compares what it reads with the day before and tells you which plan or product changed, from what to what; no app or API is needed, only the web addresses.',
  ],
  ask: 'Set up a browser agent that checks my competitors\' pricing pages every day at 9:00 and tells me when a price changes',
  updated: '2026-11-19',
  published: '2026-11-19',
  promises: ['No app to connect: just the addresses', 'Says "could not check", never a false "no change"', 'Never types a password'],
  plan: {
    mode: 'building a browser agent',
    name: 'Price watch',
    line: 'Competitors’ pricing pages, read every morning',
    faces: ['scout'],
    rows: [
      { label: 'When', value: 'Every day at 9:00' },
      { label: 'Sites', value: 'The pricing pages you name' },
      { label: 'Asks first', value: 'Nothing: it only reads. A sign-in or a check comes to you.' },
    ],
  },
  factsLabel: 'Price watching, in numbers',
  facts: [
    {
      figure: '2.5 million',
      text: 'price changes a day were made on Amazon in late 2013, up from about 269,000 a year earlier, by Profitero’s count. Old, but the reason daily checks became the norm.',
      source: 'Retail Customer Experience, 11 Dec 2013',
      href: 'https://www.retailcustomerexperience.com/news/study-shows-that-amazoncom-makes-more-than-25-million-price-changes-every-day/',
      read: '19 Nov 2026',
    },
    {
      figure: '5 pages',
      text: 'and 150 checks a month is Visualping’s free plan, which, like this browser agent, never tries to solve a CAPTCHA.',
      source: 'Visualping pricing',
      href: 'https://visualping.io/pricing',
      read: '19 Nov 2026',
    },
  ],
  seeIt: {
    h2: 'What you get: a browser agent that reads pricing pages for you',
    intro: 'This is the browser agent’s page in 50agents during a morning run, with example competitors. Overview shows its browser live, its sites as bookmarks; Work shows the report it left; Setup shows its instructions and sites.',
  },
  view: {
    type: 'browser',
    browser: {
      name: 'Price watch',
      face: 'scout',
      status: 'Working now',
      live: {
        title: 'Pricing | Brightdesk',
        step: 'Reading brightdesk.example/pricing, annual prices',
        pages: 4,
        took: '1 min 12 s',
        marks: [
          { site: 'tallyhq.example', word: 'read', tone: 'done' },
          { site: 'brightdesk.example', word: 'reading', tone: 'now' },
          { site: 'formwell.example', word: 'next', tone: 'idle' },
        ],
        page: {
          site: 'brightdesk.example',
          heading: 'Simple pricing for growing teams',
          plans: [
            { name: 'Starter', price: '$12', note: 'per seat / month, billed yearly' },
            { name: 'Team', price: '$24', note: 'per seat / month, billed yearly' },
            { name: 'Business', price: '$39', note: 'per seat / month, billed yearly' },
          ],
        },
      },
      report: {
        title: '2 prices changed at Brightdesk',
        when: 'Today 9:02 AM · 3 sites, 7 pages',
        changed: [
          { site: 'brightdesk.example', plan: 'Team, yearly', was: '$20 / seat', now: '$24 / seat' },
          { site: 'brightdesk.example', plan: 'Team, monthly', was: '$25 / seat', now: '$29 / seat' },
        ],
        same: ['No change at tallyhq.example (3 plans) or formwell.example (4 plans).', 'Formwell shows a "Black Friday: 30% off" banner; the list prices under it are the same as yesterday.'],
        pages: ['tallyhq.example/pricing', 'brightdesk.example/pricing', 'brightdesk.example/pricing?billing=monthly', 'formwell.example/pricing', 'formwell.example/plans/compare'],
      },
      runs: [
        { title: 'Working now', when: 'Started today 9:00 AM', status: 'Working now' },
        { title: 'No price changes', when: 'Yesterday 9:01 AM', status: 'Done' },
        { title: 'Tally added a Pro plan at $49', when: 'Mon 17 Nov 9:02 AM', status: 'Done' },
        { title: 'Could not check formwell.example: it asked for a person', when: 'Sun 16 Nov 9:01 AM', status: 'Waits on you' },
        { title: 'No price changes', when: 'Sat 15 Nov 9:01 AM', status: 'Done' },
      ],
      instructions: [
        'Every day at 9:00, open these pricing pages: tallyhq.example/pricing, brightdesk.example/pricing, formwell.example/pricing.',
        'For each plan, note the name and the price, monthly and yearly. Click the monthly/yearly switch if there is one. Keep the list price apart from any sale or discount banner.',
        'Compare with yesterday. Report every price that changed, from what to what, and any plan added or removed. If nothing changed, say so in one line.',
        'If a page would not load or asked for a person, say "could not check" for that site. Never report it as no change.',
      ],
      facts: { runs: 'Every day at 9:00 AM', sites: ['tallyhq.example', 'brightdesk.example', 'formwell.example'], alone: 'Opens and reads the pages', asks: 'Anything it would submit on a site; a sign-in or a check is yours to do' },
    },
  },
  howH2: 'How it watches competitor prices, step by step',
  planParts: [
    { title: 'Its job', body: 'Read the pricing pages every morning and report what changed.' },
    { title: 'Instructions', body: 'The exact addresses, what counts as a price, the monthly and yearly switch, sale versus list price.' },
    { title: 'Its sites', body: 'Every address in its instructions. No app to connect.' },
    { title: 'When it runs', body: 'Every day at 9:00, in your workspace’s time zone.' },
    { title: 'Asks you first', body: 'Nothing: it only reads. It would ask before submitting anything on a site.' },
  ],
  steps: [
    { title: 'Name the pages', body: 'Give Captain the exact pricing page addresses, in the ask or when it asks. Captain plans a browser agent: its sites, its instructions, every day at 9:00. Tap Build it and its first run reads today’s prices.' },
    { title: 'It opens each page in its own browser', body: 'A real browser, kept between runs, so pages drawn by JavaScript load as they do for you. It clicks the monthly and yearly switch where there is one. Up to 15 pages and about 8 minutes a run.' },
    { title: 'It notes every plan and price', body: 'Plan names, list prices, per-seat or flat, monthly and yearly. A sale banner is noted apart from the list price, so a weekend discount is not reported as a new price.' },
    { title: 'It compares with yesterday', body: 'From its memory of the last run, it lists each price that changed, from what to what, and any plan added or removed. A quiet day is one line: no change.' },
    { title: 'It leaves you the report', body: 'The report is its run’s work item, with the pages it visited, and its one-line summary shows on Home. If a site wants a person, it says "could not check" and puts a Solve it button in front of you.' },
  ],
  uses: [
    { app: 'file', name: 'Your competitors’ pricing pages', why: 'Just the web addresses. It reads them like a person in its own browser; there is no app or API to connect.', chips: ['Public pages', 'Monthly and yearly switches', 'Pages that need JavaScript'] },
  ],
  usesNote: 'A browser agent uses no app from the catalog. To get the report somewhere else, add Gmail or Slack in one sentence (see Make it yours).',
  asksFirst:
    'Nothing, in normal runs: it only reads. It never types a password and never gets past a CAPTCHA by itself. If a site asks for a person, it stops on that site, says "could not check", and gives you Solve it: its browser opens on that page, you do the check once, and it carries on. A sign-in comes to Needs you the same way.',
  table: {
    h2: 'How often to check, and what to watch',
    label: 'What to watch',
    cols: ['What', 'How it handles it', 'Ask Captain'],
    intro: 'Daily at a set time is what most price trackers default to, and it is what the ask sets up. Here is what else is worth watching; each is one sentence.',
    rows: [
      { when: 'List prices, daily at 9:00', tone: 'Every plan, monthly and yearly, compared with yesterday', ask: '' },
      { when: 'Sales and discount banners', tone: 'Noted apart, so they do not count as a price change', ask: '' },
      { when: 'A page it could not read', tone: '"Could not check", never "no change"', ask: '' },
      { when: 'What a plan includes', tone: 'Seats, limits and features per plan', ask: 'Also tell me when a plan’s limits or included features change' },
      { when: 'A product catalogue', tone: 'Named products on a shop page, not a whole store', ask: 'Check these 10 product pages on rivalshop.example every day at 9:00 and tell me when a price changes' },
    ],
    note: 'A blocked page that reads as "no change" is the classic failure of price scrapers; lowcode.agency calls silent failures indistinguishable from no change. Visualping says it will never attempt to solve CAPTCHAs either.',
    sources: [
      { label: 'lowcode.agency', href: 'https://www.lowcode.agency/blog/automate-competitor-price-monitoring-without-tool' },
      { label: 'Visualping', href: 'https://visualping.io/pricing' },
    ],
  },
  yoursIntro: 'Change the pages, the time or where the report goes. Each of these builds a different browser agent; copy one into Captain.',
  variations: [
    'Set up a browser agent that checks rival-one.com/pricing and rival-two.com/pricing every Monday at 9:00 and tells me when a price changes',
    'Set up a browser agent that checks my competitors\' pricing pages every day at 9:00 and emails me only when a price changes',
    'Set up a browser agent that checks my competitors\' pricing pages every day at 9:00 and tells me when a plan is added, removed or changes its limits',
    'Set up a browser agent that checks these 10 product pages every day at 7:00 and tells me when a price drops below mine',
  ],
  limits: [
    'Up to 15 pages and about 8 minutes a run, so it suits a handful of competitors, not thousands of products.',
    'It never solves a CAPTCHA. A site that asks for a person every time needs your Solve it each time, or leave it out.',
    'It reads a page’s text, not a picture of it, so a price shown only inside an image is missed.',
    'The report lives on its page and Home. An email or Slack message is one more step, and that message asks first until you let it send on its own.',
  ],
  otherWaysH2: 'Other ways to monitor competitor prices',
  otherWays: [
    {
      title: 'A page-change monitor',
      body: 'Visualping and Distill watch a page and alert you when anything on it changes. They check more often than daily and are cheap; Visualping’s free plan covers 5 pages. You get a screenshot diff, not "Team went from $20 to $24".',
      sources: [{ label: 'Visualping', href: 'https://visualping.io/pricing' }, { label: 'Distill', href: 'https://distill.io/pricing/' }],
    },
    {
      title: 'A price intelligence tool',
      body: 'Prisync and Pricefy match your products against rivals’ across whole catalogues, several times a day. For a shop with hundreds of SKUs they are the better tool; Pricefy is free for 50 products and 5 competitors.',
      sources: [{ label: 'Prisync', href: 'https://prisync.com/competitor-price-monitoring/' }, { label: 'Pricefy', href: 'https://www.pricefy.io/features/competitors-monitoring' }],
    },
    {
      title: 'By hand',
      body: 'Bookmark the pricing pages and check them every Monday, noting prices in a sheet. Fine for two or three rivals; the misses come from the weeks you skip.',
    },
  ],
  faqs: [
    { q: 'How often should I check competitor prices?', a: 'Daily, at a set time, suits most software and service pricing; it is what the ask sets up. Shops whose rivals reprice many times a day need a dedicated price tool instead.' },
    { q: 'Is it legal to monitor competitor prices?', a: 'Reading public pricing pages, as a visitor would, is ordinary competitive research. Respect each site’s terms; this browser agent does not sign in, get past checks or submit anything unless you tell it to and approve it.' },
    { q: 'What if a competitor’s page changes its layout?', a: 'It reads the page the way a person does, not by fixed positions, so a redesign usually does not break it. If it cannot find the prices, it says "could not check" for that site.' },
    { q: 'Will it tell me when a price goes down as well as up?', a: 'Yes: every change, with the old and the new price. Ask it to report only drops, or only changes over 10%, in one sentence.' },
    { q: 'Do I need to connect an app?', a: 'No. A browser agent works from web addresses alone. Add Gmail or Slack only if you want the report sent there.' },
  ],
  related: [
    { href: '/use-cases/shopify-orders-to-google-sheets', kind: 'auto', title: 'Shopify orders to Google Sheets', line: 'Your own sales, a row per order, next to their prices.' },
    { href: '/use-cases/weekly-stripe-revenue-summary', kind: 'ai', title: 'Weekly Stripe revenue summary', line: 'An AI agent that writes you last week’s numbers each Monday.' },
    { href: '/use-cases/tomorrows-meetings-in-slack', kind: 'ai', title: 'Tomorrow’s meetings in Slack', line: 'An AI agent that sends your next day’s calendar each evening.' },
  ],
  up: [
    { href: '/browser-agents', label: 'Browser agents you can build' },
    { href: '/guides/how-to-monitor-competitor-prices-automatically', label: 'How to monitor competitor prices automatically' },
    { href: '/guides/how-to-automate-a-website-that-has-no-api', label: 'How to automate a website that has no API' },
  ],
  finalH2: 'Start watching your competitors’ prices',
  byline: 'Captain builds this browser agent from the ask above, the same words as the "Watch competitor prices" Playbook in the 50agents app; the views above are drawn from that app, filled with example data.',
};

export default page;
