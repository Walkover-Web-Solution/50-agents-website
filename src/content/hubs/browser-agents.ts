// Hub 15 (pages-brief B2): /browser-agents, for "AI browser agent" and "automate web browsing".
// Product facts: app/PRODUCT.md and app/src/features/browser/CLAUDE.md (its tested runs, 11 to 13 Nov), read 19 Nov 2026.
// Competitors: browse.ai/pricing and bardeen.ai/pricing, read 19 Nov 2026.
import type { Hub } from './types';

const hub: Hub = {
  kind: 'browser',
  path: '/browser-agents',
  crumb: 'Browser agents',
  title: 'AI browser agent: automate web browsing | 50agents',
  description:
    'A browser agent reads websites that have no app to connect, such as competitors\' pricing pages, on a schedule, in its own browser that keeps your sign-ins.',
  h1: 'A browser agent for the websites no app reaches',
  answer: [
    'A browser agent in 50agents does work on websites the way you would, in a browser of its own: it opens pages, reads what only shows there, uses a site you signed in to and fills in forms.',
    'Tell Captain which sites and how often, and it builds one that runs on a schedule, shows you live what it is reading, lists every page it visited, and never submits anything without your yes.',
  ],
  promises: ['Its own browser, your sign-ins kept', 'Never gets past a CAPTCHA for you', 'Fills in forms, submits only when you approve'],
  hero: {
    ask: "Set up a browser agent that checks my competitors' pricing pages every day at 9:00 and tells me when a price changes",
    plan: [
      { label: 'Kind', value: 'Browser agent' },
      { label: 'Runs', value: 'Every day at 9:00' },
      { label: 'Sites', value: 'The pricing pages you name' },
      { label: 'Asks first', value: 'Any submit; a sign-in is yours' },
    ],
  },
  view: {
    h2: 'What you see while it works',
    p: 'The browser shows only while it is in use: live, with the page it is reading and its sites as bookmarks. After the run, its work lists the pages it visited. Example data below; the sites are placeholders.',
  },
  can: [
    'Keep one browser per browser agent, cookies included, so a site you signed in to stays signed in from run to run. In testing a sign-in was still held after 19 hours.',
    'Read up to 15 pages in a run of about 8 minutes. A three-page price check ran in 69 to 90 seconds and compared prices with its previous run.',
    'Use the lightest source first: a web search, a site\'s RSS feed or a public API, opening a page in its browser only when the job needs that page.',
    'Show you live what it is doing, and keep a list of every page it visited with each run.',
    'Fill in a form when its instructions say so, then stop and ask you in Needs you. Approve runs it again to submit exactly that.',
    'Work as part of an app\'s crew, such as looking up each new lead\'s company website and adding a note.',
  ],
  cant: [
    'Get past a CAPTCHA or a bot check. It gets the same facts from another source; when one site is the only way, you get a Solve it button and solve it yourself in its browser.',
    'Sign in for you. You sign in yourself in its browser when it asks; a password never goes in a chat or in 50agents.',
    'Keep screenshots. Pages are kept as links and their text.',
    'Be cut off mid-page. Stop ends the run at its next step; the page it is on finishes loading.',
    'Promise how long a site keeps you signed in or a check passed beyond a day. That has not been tested yet.',
    'Do one-off website jobs as a browser agent. Captain does those itself, now; a browser agent is for work that repeats.',
  ],
  limitsNote: 'From the 50agents app\'s browser agent source and the runs tested on 11 to 13 Nov 2026, read 19 Nov 2026.',
  ucIntro: 'One of the twelve ready-made starts is a browser agent, because it is the only one with no app to connect.',
  extraJobs: [
    {
      title: 'A daily news digest from feeds',
      body: 'In testing, an AI news digest browser agent read RSS feeds and articles, opened no search page and asked nothing.',
      ask: 'Set up a browser agent that reads the AI news on these sites every morning at 8:00 and sends me a short digest',
    },
    {
      title: 'Research on each new lead',
      body: 'In the leads app, Scout is a browser agent: for each new lead with a company, it reads the company\'s website and notes what it does and one thing worth knowing.',
    },
    {
      title: 'A form you fill in again and again',
      body: 'It fills the form from what you give it, stops before submitting and asks you. In testing, the submit went through after Approve and the site echoed the values.',
    },
  ],
  apps: {
    intro: 'A browser agent needs no app. It works on public websites and on sites you sign in to in its own browser. When a site does have an app in viaSocket\'s catalog of 2,300+, Captain builds an automation or an AI agent on that app instead, which reads the data directly rather than its pages.',
    list: [],
  },
  others: {
    intro: 'Tools people compare for browser automation and website monitoring. Facts read on each vendor\'s pricing page on 19 Nov 2026.',
    list: [
      {
        name: 'Browse AI',
        href: 'https://www.browse.ai/pricing',
        plan: 'Free forever with 50 credits a month on 2 websites; Personal $19 a month billed yearly ($48 monthly).',
        better: 'Built for extracting data at scale, with 200+ prebuilt robots and SOC 2 Type II stated.',
        note: 'Better for scraping many rows into a table. A 50agents browser agent reads up to 15 pages a run and tells you what it found.',
      },
      {
        name: 'Bardeen',
        href: 'https://www.bardeen.ai/pricing',
        plan: '100 credits free; Basic $10 a month; Premium $50 a month.',
        better: 'Focused on finding and enriching sales leads, with ready-made lead lists.',
        note: 'Now a lead-generation tool for sales teams. A 50agents browser agent does any repeated website job you describe.',
      },
    ],
  },
  faqs: [
    {
      q: 'What is an AI browser agent?',
      a: 'An AI that uses a real web browser to do a job: it opens pages, reads them, clicks and fills in forms, deciding each step as it goes. It is for websites that have no app or API to connect to.',
    },
    {
      q: 'Can it log in to websites?',
      a: 'Yes, with you. When a site needs a sign-in, it asks in Needs you; you tap Do it now, sign in yourself in its browser, and tap Done, carry on. The sign-in stays in its browser for later runs.',
    },
    {
      q: 'Does it get past CAPTCHAs?',
      a: 'No, never. It tries another source first; if one site is the only way, it asks you to solve the check yourself in its browser, or to leave that site out.',
    },
    {
      q: 'Is a browser agent the same as web scraping?',
      a: 'Close, but not the same. A scraper pulls set fields from many pages; a browser agent reads a few pages, understands them and tells you what matters, such as which price changed.',
    },
    {
      q: 'When should I not use a browser agent?',
      a: 'When the site has an app in the catalog. An app connection reads HubSpot\'s data directly, with no pages to load or change under it, so Captain builds an automation or an AI agent there.',
    },
  ],
  related: [
    { label: 'How to monitor competitor prices automatically', href: '/guides/how-to-monitor-competitor-prices-automatically' },
    { label: 'How to automate a website that has no API', href: '/guides/how-to-automate-a-website-that-has-no-api' },
    { label: 'Browser automation without code', href: '/guides/browser-automation-without-code' },
    { label: 'What is a browser agent?', href: '/learn/browser-agent' },
    { label: 'RPA', href: '/learn/rpa' },
    { label: 'Bardeen alternatives', href: '/compare/bardeen-alternatives' },
  ],
  final: {
    h2: 'Point a browser agent at a website',
    p: 'Name the sites and how often. Captain builds it and you watch the first run live. Every workspace starts free with 2,000 credits.',
    cta: 'Build a browser agent with Captain',
  },
  updated: '2026-11-19',
};

export default hub;
