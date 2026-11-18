// Guide 15 (pages-brief B5). Research: Pricefy and Prisync pricing pages, Google's robots.txt introduction, RCFP on hiQ v.
// LinkedIn, Browse AI, LowCode Agency and MESA results for "monitor competitor prices automatically", read 19 Nov 2026.
// 50agents: browser agents (app/src/features/browser/CLAUDE.md): one browser each, no CAPTCHA solving, up to 15 pages a run.
import type { Guide } from './types';

const g: Guide = {
  slug: 'how-to-monitor-competitor-prices-automatically',
  n: 15,
  group: 'Browser agents',
  kind: 'browser',
  title: 'How to monitor competitor prices automatically | 50agents',
  description:
    'Monitor competitor prices: list the exact pages, check daily, store the last price, alert on a change, and treat a failed check as a failure.',
  h1: 'How to monitor competitor prices automatically',
  short:
    'List the exact competitor pages and the price on each you care about, then have a tool open them once a day, compare each price with the one it saw last time, and tell you only when one changes. Treat a page that would not load or a price it could not find as its own alert, because a broken check that reads as "no change" is how price monitoring quietly fails.',
  published: '2026-11-19',
  updated: '2026-11-19',
  sections: [
    {
      id: 'setup',
      h2: 'What to write down first',
      body: [
        {
          table: {
            head: ['Write down', 'Example', 'Why'],
            rows: [
              ['The exact page', 'acme.example/pricing', 'Home pages change daily; pricing pages change when prices do.'],
              ['Which price', '"Team plan, billed monthly"', 'Most pricing pages show three to five prices and a monthly and yearly toggle.'],
              ['Your matching product', 'Our Pro plan', 'An alert is only useful next to your own price.'],
              ['How often', 'Daily at 9:00', 'Software and service prices rarely change more than weekly; daily is plenty.'],
              ['What counts as a change', 'Any change in the number, or a plan added or removed', 'Rounding and currency switches cause noise if you do not say.'],
            ],
          },
        },
      ],
    },
    {
      id: 'options',
      h2: 'Your options',
      body: [
        {
          table: {
            head: ['Option', 'Fits', 'Cost, from the vendor’s page'],
            rows: [
              ['Check by hand, weekly', 'Under 5 pages', 'Your time'],
              ['A price-tracking tool (Pricefy, Prisync)', 'Retail catalogues with many SKUs', 'Pricefy: free for up to 50 SKUs and 5 competitors, one update a day; paid from $49 a month ([Pricefy](https://www.pricefy.io/pricing)). Prisync: from $99 a month for 100 products, 14-day trial ([Prisync](https://prisync.com/pricing/)).'],
              ['A scraper plus a sheet and an alert', 'Builders who want control', 'The scraper’s plan, plus upkeep when pages change'],
              ['A browser agent', 'A handful of pricing pages that change layout', 'Usage-based; reads pages the way a person does'],
            ],
          },
        },
        { p: 'Price trackers win on catalogues: matching thousands of products across shops is their job. For a dozen software pricing pages or local competitors’ menus, a browser agent or a weekly check is simpler.' },
      ],
    },
    {
      id: 'rules',
      h2: 'Stay on the right side of the sites you read',
      body: [
        { p: 'Reading a public pricing page once a day is what any customer does. Keep it that way: stay on public pages, check no more than you need, and stop at bot checks. A site’s robots.txt file says which parts it wants automated visitors to avoid; Google notes that it cannot enforce anything and that well-behaved crawlers follow it ([Google](https://developers.google.com/search/docs/crawling-indexing/robots/intro)).' },
        { p: 'On the law, a US appeals court said in hiQ v. LinkedIn (2019) that scraping public data was likely not "without authorization" under the federal anti-hacking law, while drawing a line at data behind a login ([RCFP](https://www.rcfp.org/scraping-not-violation-cfaa/)). Site terms and contract claims still apply, and laws differ by country. If a page needs a login or shows a CAPTCHA, take that as a no.' },
      ],
    },
    {
      id: 'steps',
      h2: 'How to set it up, step by step',
      body: [
        {
          steps: [
            { title: 'Make the list of pages and prices', body: 'One row per price: competitor, page, plan, the price today. That first price is your baseline.' },
            { title: 'Pick a time of day and keep it', body: 'Same time each day, so a change shows on the day it happened.' },
            { title: 'Store the last price seen', body: 'Each check compares with the last one and then replaces it. Without this, you get the same alert every day.' },
            { title: 'Alert only on change, with both numbers', body: '"Acme Team plan: $29 to $35 a month" is useful; "prices checked" is not.' },
            { title: 'Alert on failures separately', body: 'Page did not load, price not found, layout changed: each should say so. A silent failure looks exactly like "no change".' },
            { title: 'Review the list monthly', body: 'Competitors rename plans and move pages. Update the list when they do.' },
          ],
        },
      ],
    },
    {
      id: 'example',
      h2: 'A worked example: a browser agent in 50agents',
      body: [
        { p: 'In 50agents this is a browser agent: it uses websites the way a person would, with no app to connect. Tell Captain the sentence below and the pages; each morning it opens them in its own browser, reads the prices, and tells you what changed. It uses the lightest source first, opens at most 15 pages a run, and never tries to get past a CAPTCHA or bot check: it gets the price another way or tells you it could not.' },
        { ask: 'Set up a browser agent that checks my competitors\' pricing pages every day at 9:00 and tells me when a price changes' },
        {
          view: {
            type: 'browser',
            name: 'Price watch',
            page: { title: 'Pricing · Acme Scheduling', url: 'acme.example/pricing' },
            sites: ['acme.example', 'bookwell.example', 'slotly.example'],
            reading: 'acme.example/pricing',
            progress: '2 of 3 pages, 40 s',
            item: {
              title: 'One price changed: Acme Team plan',
              summary: 'Acme raised its Team plan from $29 to $35 a month (billed monthly). Bookwell and Slotly are unchanged.',
              rows: [['Acme', 'Team, monthly', '$29 → $35'], ['Bookwell', 'Studio, monthly', '$32, same'], ['Slotly', 'Pro, monthly', '$30, same']],
              pages: ['acme.example/pricing', 'bookwell.example/pricing', 'slotly.example/plans'],
            },
          },
          caption: 'A browser agent in 50agents while it works: its browser, the sites it checks, the page it is reading. Below, its report for the day with the pages it visited. Example data.',
        },
      ],
    },
  ],
  pair: { href: '/use-cases/track-competitor-prices', label: 'Build it: track competitor prices', line: 'The ready-made version, with the exact ask and ways to change it.' },
  wrong: [
    { title: 'A broken check reads as "no change"', body: 'The page moved and the tool found no price, so nothing changed. Make "price not found" an alert of its own.' },
    { title: 'The same alert every day', body: 'The last price was never updated after the first alert. Store the new price each time.' },
    { title: 'Noise from promotions', body: 'A weekend sale triggers two alerts. Say whether you care about sale prices, and note them as such.' },
    { title: 'Blocked or challenged', body: 'You checked too often or the site does not want bots. Check less, and if a page shows a bot check, stop and drop it from the list.' },
    { title: 'Monthly and yearly mixed up', body: 'The page defaulted to yearly prices one day. Name the billing period in the list and in the alert.' },
  ],
  faqs: [
    { q: 'Is it legal to monitor competitor prices?', a: 'Reading public pricing pages is common and, in the US, was treated as likely lawful in hiQ v. LinkedIn. Respect site terms, avoid anything behind a login or a CAPTCHA, and check the law where you operate.' },
    { q: 'How often should I check competitor prices?', a: 'Daily is enough for most businesses; retail catalogues with frequent repricing may need more, which is what dedicated price trackers are built for.' },
    { q: 'Is there a free way to do it?', a: 'For a few pages, a weekly check by hand. Pricefy’s free plan covers up to 50 SKUs and 5 competitors with one update a day.' },
  ],
  sources: [
    { label: 'Pricefy: Pricing', href: 'https://www.pricefy.io/pricing' },
    { label: 'Prisync: Pricing', href: 'https://prisync.com/pricing/' },
    { label: 'Google Search Central: Introduction to robots.txt', href: 'https://developers.google.com/search/docs/crawling-indexing/robots/intro' },
    { label: 'RCFP: Scraping is not a violation of the CFAA (hiQ v. LinkedIn)', href: 'https://www.rcfp.org/scraping-not-violation-cfaa/' },
  ],
  related: ['how-to-automate-a-website-that-has-no-api', 'browser-automation-without-code', 'how-to-automate-form-filling-on-websites'],
};

export default g;
