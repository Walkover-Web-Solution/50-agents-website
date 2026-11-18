// Guide 18 (pages-brief B5). Research: Browse AI, Axiom, Bardeen and UI.Vision pricing pages; Browserless, Octoparse and
// Thunderbit guides; a Latenode community thread, for "browser automation without code", read 19 Nov 2026.
import type { Guide } from './types';

const g: Guide = {
  slug: 'browser-automation-without-code',
  n: 18,
  group: 'Browser agents',
  kind: 'browser',
  title: 'Browser automation without code: tools and limits | 50agents',
  description:
    'No-code browser automation comes in three kinds: recorders, scrapers and AI browser agents. What each is good at, what they cost today, and where they break.',
  h1: 'Browser automation without code',
  short:
    'No-code browser automation comes in three kinds: recorders that replay your clicks, scrapers you train to pull data from pages, and AI browser agents that read a page and decide what to do. Pick by the job: scrapers for the same data from many pages, recorders for the same clicks on a stable site, browser agents for a few pages that change or need judgement.',
  published: '2026-11-19',
  updated: '2026-11-19',
  sections: [
    {
      id: 'kinds',
      h2: 'The three kinds',
      body: [
        {
          table: {
            head: ['Kind', 'You set it up by', 'Good at', 'Breaks when'],
            rows: [
              ['Recorder', 'Clicking through once while it records', 'The same clicks on a stable site, many times', 'A button moves or a pop-up appears'],
              ['Scraper', 'Pointing at the data on one page', 'The same fields from hundreds of similar pages', 'The page layout changes'],
              ['AI browser agent', 'Describing the job in words', 'A few pages, layouts that shift, reading and judging', 'A page is ambiguous; it may guess'],
            ],
          },
        },
      ],
    },
    {
      id: 'tools',
      h2: 'Tools people use, and what they cost today',
      body: [
        { p: 'Prices as each vendor’s pricing page showed them on 19 November 2026. Plans change often; check before you buy.' },
        {
          table: {
            head: ['Tool', 'Kind', 'Free', 'First paid plan'],
            rows: [
              ['[Browse AI](https://www.browse.ai/pricing)', 'Scraper and page monitor', '50 credits a month, 2 websites', 'Personal: $19 a month billed yearly, $48 billed monthly'],
              ['[Axiom](https://axiom.ai/pricing)', 'No-code browser bots', '2 hours of runtime to try', 'Starter: $15 a month for 5 hours of runtime'],
              ['[Bardeen](https://www.bardeen.ai/pricing)', 'Scraping and enrichment for sales', '100 credits', 'Basic: $10 a month; a scrape costs 1 credit per row'],
              ['[UI.Vision](https://ui.vision/pricing)', 'Open-source recorder (browser extension)', 'Free', 'Paid editions exist; the page showed no prices'],
            ],
          },
        },
        { p: 'Two details hide in these plans. Runtime- and credit-based pricing charges for failed runs on some tools and not others (Axiom says failed runs do not count against runtime). And desktop runs need your computer awake, while cloud runs do not.' },
      ],
    },
    {
      id: 'steps',
      h2: 'How to pick and start, step by step',
      body: [
        {
          steps: [
            { title: 'Write the job as clicks', body: 'Which site, which pages, what to read or fill, how often. Count the pages per run.' },
            { title: 'Pick the kind from the table', body: 'Many pages, same layout: scraper. Same clicks daily on a stable tool: recorder. A few pages that move or need reading: browser agent.' },
            { title: 'Check cloud or desktop', body: 'If it must run at 6:00 while your laptop sleeps, you need cloud runs.' },
            { title: 'Plan the sign-in', body: 'Sites behind a login need a kept session. Avoid tools that want your password stored in a text field.' },
            { title: 'Run it for a week with a check at the end', body: 'A count, a confirmation, a file. Look at every run that week.' },
          ],
        },
      ],
    },
    {
      id: 'example',
      h2: 'The browser agent kind in 50agents',
      body: [
        { p: 'A 50agents browser agent is the third kind. You describe the job to Captain; the browser agent runs on a schedule with its own browser, shows the page live while it works, and lists the pages it visited in each report. It reads before it clicks: web search, a feed or a public page first, its browser only when the job needs that page. Up to 15 pages and about 8 minutes a run.' },
        { ask: 'Set up a browser agent that reads the new listings on rentals.example each morning and tells me the ones under $2,000 in Riverside' },
        {
          view: {
            type: 'browser',
            name: 'Riverside rentals',
            page: { title: 'Riverside · 2 bed · rentals.example', url: 'rentals.example/riverside?beds=2' },
            sites: ['rentals.example'],
            reading: 'rentals.example/riverside?beds=2',
            progress: '1 of 1 page, 22 s',
            item: {
              title: '3 new listings under $2,000',
              summary: 'Three listings in Riverside posted since yesterday are under $2,000 a month.',
              rows: [['rentals.example', '14 Elm St, 2 bed', '$1,850'], ['rentals.example', '3 Quay Rd, 2 bed', '$1,920'], ['rentals.example', '88 Mill Ln, 1 bed', '$1,600']],
              pages: ['rentals.example/riverside?beds=2'],
            },
          },
          caption: 'A browser agent at work in 50agents, and the report it leaves with the pages it visited. Example data.',
        },
      ],
    },
  ],
  wrong: [
    { title: '"No code" turns into code', body: 'Users of several tools report needing custom scripts for anything past the basics. Try your hardest page in the free tier before you commit.' },
    { title: 'Credits burned on failures', body: 'A broken page retried all night. Check how failed runs are billed, and cap retries.' },
    { title: 'The laptop went to sleep', body: 'A desktop-only tool missed the 6:00 run. Use cloud runs for anything scheduled.' },
    { title: 'Quietly wrong data', body: 'A scraper picked the wrong column after a redesign. Spot-check a few values each week.' },
  ],
  faqs: [
    { q: 'Is there a free browser automation tool?', a: 'UI.Vision is open source and free. Browse AI and Bardeen have free tiers with small monthly limits; Axiom gives a short free runtime to try.' },
    { q: 'Can browser automation run on a schedule?', a: 'Yes, on cloud plans. Desktop tools run only while your computer is on and awake.' },
    { q: 'What is the difference between a browser agent and a scraper?', a: 'A scraper pulls the same fields from pages you trained it on. A browser agent reads the page and decides what to do from your description, so it can handle pages it has not seen, and can also misjudge them.' },
  ],
  sources: [
    { label: 'Browse AI: Pricing', href: 'https://www.browse.ai/pricing' },
    { label: 'Axiom: Pricing', href: 'https://axiom.ai/pricing' },
    { label: 'Bardeen: Pricing', href: 'https://www.bardeen.ai/pricing' },
    { label: 'UI.Vision: Pricing', href: 'https://ui.vision/pricing' },
    { label: 'Latenode community: No-code headless browser automation', href: 'https://community.latenode.com/t/no-code-headless-browser-automation-is-it-actually-possible-or-just-marketing/59673' },
  ],
  related: ['how-to-automate-a-website-that-has-no-api', 'how-to-monitor-competitor-prices-automatically', 'how-to-automate-form-filling-on-websites'],
};

export default g;
