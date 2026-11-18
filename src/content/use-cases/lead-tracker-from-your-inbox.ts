// Use case 4 (pages-brief B1): a lead tracker filled from your inbox. An app.
// Every product fact comes from the 50agents app's leads recipe (app/src/features/apps/recipes.ts, read 19 Nov 2026):
// the questions (build.ts TOOLS, then the recipe's slots), the list's fields, the three views, the Overview numbers and the
// crew's duties (Closer: bring in, replies, follow up; Scout: research). Importer: one record per email (importer.ts).
// Research: scratchpad research-A, read 19 Nov 2026.
import type { UseCase } from '@/site/types';
import { chips, iconOf } from './catalog';

const page: UseCase = {
  slug: 'lead-tracker-from-your-inbox',
  kind: 'app',
  title: 'A simple lead tracker that fills itself from Gmail',
  description:
    'To track leads from email, tell Captain "Track my leads and follow up": a pipeline whose AI agent adds leads from Gmail and drafts follow-ups you approve.',
  h1: 'A simple lead tracker that fills itself from your inbox',
  answer: [
    'To track leads from your email, tell Captain "Track my leads and follow up" in 50agents.',
    'It builds a lead tracker with a pipeline and a list of who to follow up today, and an AI agent that each weekday morning adds new leads from your Gmail, notices replies and drafts follow-ups that go only when you approve them.',
  ],
  ask: 'Track my leads and follow up',
  updated: '2026-11-19',
  published: '2026-11-19',
  promises: ['New leads from your Gmail, each weekday', 'Follow-ups wait for your OK', 'No CRM to set up'],
  plan: {
    mode: 'building an app',
    name: 'Leads',
    line: 'A pipeline for your leads, with who to follow up today',
    faces: ['closer', 'scout'],
    rows: [
      { label: 'Views', value: 'Pipeline · Follow up · All leads' },
      { label: 'Numbers', value: 'New this week · Follow up today · Open deals · Won' },
      { label: 'Crew', value: 'Closer, an AI agent: brings in leads from your email, follows up, asks before sending', face: 'closer' },
      { label: 'And', value: 'Scout, a browser agent: looks up each new lead’s company', face: 'scout' },
    ],
  },
  heroQuestion: 1,
  factsLabel: 'When a spreadsheet stops being enough',
  facts: [
    {
      figure: '10 a week',
      text: 'is the point, more than 10 new leads a week or 75 active contacts, at which HubSpot’s lead tracker page says to move from a spreadsheet to a CRM. It gives no basis for the numbers.',
      source: 'HubSpot lead tracker template page (undated)',
      href: 'https://www.hubspot.com/resources/templates/lead-tracker',
      read: '19 Nov 2026',
    },
  ],
  seeIt: {
    h2: 'What you get: a lead tracker that brings its own leads in',
    intro: 'This is the app Captain builds from those five words, shown with example leads. Switch between the overview, with a follow-up waiting for your OK, the pipeline by stage and the Follow up list, soonest first.',
  },
  view: {
    type: 'desk',
    desk: {
      name: 'Leads',
      faces: ['closer', 'scout'],
      count: 'Live · 12 leads',
      add: '+ Add lead',
      views: ['Overview', 'Pipeline', 'Follow up'],
      rest: ['All leads', 'Crew · 2', 'Review', 'Data · 12', 'Setup', 'Memory'],
      numbers: [
        { label: 'New this week', value: '4' },
        { label: 'Follow up today', value: '3', warn: true },
        { label: 'Open deals', value: '$38,400' },
        { label: 'Won', value: '2' },
      ],
      asks: 'Closer asks you',
      waiting: '1 waiting',
      need: {
        by: 'Closer', face: 'closer', where: 'Leads', ago: '6 min ago',
        title: 'Email Jordan Reyes at Fernway Studio',
        rows: [{ label: 'To', value: 'jordan@fernway.example' }, { label: 'Subject', value: 'Re: Website redesign quote' }],
        body: [
          'Hi Jordan,',
          'Just checking you got the quote I sent on Friday for the redesign. Happy to walk you through it, or to split it into two phases if that suits your budget better.',
          'Would a quick call on Thursday work?',
          'Best,\nSam',
        ],
        actions: ['Approve and send', 'Change', 'Decline'],
      },
      crew: [
        { face: 'closer', name: 'Closer', tint: '#FFE7EF', line: 'Brings in new leads from your email each weekday at 9:00, notices replies, and follows up leads that have been quiet for 3 days. Asks before sending any email.' },
        { face: 'scout', name: 'Scout', tint: '#EFEAFF', line: 'Looks up each new lead’s company website and adds a note: what they do, about how big, one thing worth knowing before the first call.' },
      ],
      board: [
        { name: 'New', tone: '#EEF3FF', dot: '#3355CC', count: 3, total: '$9,000', cards: [{ b: 'Northwind Studio', lines: ['$4,500', 'Next follow-up: Nov 20'] }, { b: 'Maple & Co. Bakery', lines: ['$1,200', 'Next follow-up: Nov 21'] }] },
        { name: 'Contacted', tone: '#F1EEFF', dot: '#6C5CE7', count: 4, total: '$21,400', cards: [{ b: 'Fernway Studio', lines: ['$8,000', 'Next follow-up: Nov 19'] }, { b: 'Oakridge Builders', lines: ['$9,600', 'Next follow-up: Nov 19'] }] },
        { name: 'Replied', tone: '#FFF1EC', dot: '#B4410B', count: 2, total: '$8,000', cards: [{ b: 'Lumen Dental', lines: ['$6,000', 'Next follow-up: Nov 24'] }] },
        { name: 'Won', tone: '#EDF7F1', dot: '#17703F', count: 2, total: '$7,300', cards: [{ b: 'Cobalt Fitness', lines: ['$4,100', 'Won 12 Nov'] }] },
        { name: 'Lost', tone: '#F3F3F1', dot: '#8A8F98', count: 1, total: '$2,000', cards: [{ b: 'Harbor Yoga', lines: ['$2,000', 'Went elsewhere'] }] },
      ],
      table: {
        search: 'Search leads',
        shown: '5 of 12',
        cols: ['Name', 'Company', 'Last contact', 'Next follow-up ↑', 'Stage'],
        rows: [
          { cells: ['Jordan Reyes', 'Fernway Studio', 'Nov 14', 'Nov 19'], flag: 'Today', pill: 'Contacted' },
          { cells: ['Ellen Park', 'Oakridge Builders', 'Nov 14', 'Nov 19'], flag: 'Today', pill: 'Contacted' },
          { cells: ['Noor Haddad', 'Northwind Studio', 'Nov 17', 'Nov 20'], pill: 'New' },
          { cells: ['Luis Mendes', 'Maple & Co. Bakery', 'Nov 18', 'Nov 21'], pill: 'New' },
          { cells: ['Priya Shah', 'Lumen Dental', 'Nov 18', 'Nov 24'], pill: 'Replied', pillTone: 'warn' },
        ],
      },
    },
  },
  howH2: 'How it tracks leads from your email, step by step',
  questions: [
    { q: 'Which apps do you use for this today?', choices: ['Gmail', 'Google Sheets', 'None yet'], picked: 'Gmail' },
    { q: 'Where do new leads come from?', choices: ['Emails to me', 'My website form', 'A spreadsheet', 'I add them by hand'], picked: 'Emails to me' },
    { q: 'Should follow-ups go out from your email?', choices: ['Yes, after I approve each one', 'No, just remind me'], picked: 'Yes, after I approve each one' },
  ],
  steps: [
    { title: 'You ask, Captain asks back', body: 'Say "Track my leads and follow up". Captain asks three things: the apps you use today, where new leads come from, and whether follow-ups should go out from your email. Each has a usual answer you take with one tap.' },
    { title: 'It builds your lead tracker', body: 'One list of leads with name, email, phone, company, source, stage, deal size, last contact, next follow-up and notes. Three views: a Pipeline board by stage with totals, Follow up (soonest first, won and lost left out) and All leads.' },
    { title: 'Closer brings leads in each morning', body: 'Every weekday at 9:00 it reads the last day of Gmail, picks out new people asking to buy, asking for a quote or filling in your website form, checks they are not already in Leads by email, and adds each one at stage New with a line on what they asked. It never replies to them.' },
    { title: 'It notices replies, Scout does the homework', body: 'The same morning it looks for replies from leads at Contacted and moves them to Replied with a note. Scout, a browser agent, reads each new lead’s company website and adds what they do and one thing worth knowing.' },
    { title: 'Quiet leads get a follow-up you approve', body: 'When a Contacted lead has been quiet for 3 days, Closer reads your last thread and writes a short follow-up in it. It waits in Needs you; once sent, Closer sets Last contact to today and the next follow-up 3 days out.' },
  ],
  uses: [
    { app: 'gmail', icon: iconOf('gmail'), name: 'Gmail', why: 'Where new leads and their replies are read from, and where your approved follow-ups go out, in the same thread.', chips: chips('gmail', ['Search_Email_Messages', 'Reply To Thread', 'Send Email']) },
    { app: 'file', name: 'Leads you already have', why: 'Bring in the ones you have now: type them in, paste a table, or drop a CSV or Excel file and Captain matches the columns.', chips: ['Add by hand', 'Paste a table', 'CSV or Excel'] },
  ],
  usesNote: 'Gmail’s actions as listed in viaSocket’s catalog of 2,300+ apps, read 19 Nov 2026. Scout uses its own browser and no app.',
  asksFirst:
    'Every email to a lead. Bringing leads in, noticing replies and Scout’s notes only read Gmail and websites and write to your own tracker, so they run on their own. A follow-up reaches someone outside, so it waits in Needs you with the lead, the subject and the full text.',
  table: {
    h2: 'Which stage a lead is in, and who moves it',
    label: 'Pipeline stages',
    done: 'Built in',
    cols: ['Stage', 'What it means and who moves it', 'Ask Captain'],
    intro: 'The tracker comes with five stages. Closer moves leads between the first three on its own; you decide Won and Lost. Want a stage of your own? One sentence adds it.',
    rows: [
      { when: 'New', tone: 'Closer adds the lead from an email: they asked to buy or for a quote', ask: '' },
      { when: 'Contacted', tone: 'You wrote to them; Closer follows up after 3 quiet days', ask: '' },
      { when: 'Replied', tone: 'Closer saw their reply and notes what they said', ask: '' },
      { when: 'Won or Lost', tone: 'You set it; both drop off the Follow up list', ask: '' },
      { when: 'Proposal sent', tone: 'A stage between Replied and Won, with its own follow-up', ask: 'Add a Proposal sent stage after Replied, and follow up 5 days after a proposal' },
    ],
    note: 'Stage names vary: HubSpot’s tracker template uses Lead, Opportunity, Demo and Quote; OnePageCRM’s uses Leads, Prospects, Clients and Partners.',
    sources: [
      { label: 'HubSpot', href: 'https://www.hubspot.com/resources/templates/lead-tracker' },
      { label: 'OnePageCRM', href: 'https://www.onepagecrm.com/blog/free-lead-tracker-template/' },
    ],
  },
  yoursIntro: 'Say it your way. Each of these builds a different tracker; copy one into Captain.',
  variations: [
    'Track my leads and follow up, only emails to sales@ count as leads',
    'Track my leads from my website form and follow up after 5 days',
    'Track my leads and follow up, but just remind me instead of drafting emails',
    'Track my leads and follow up, and post a summary of the week in Slack every Monday',
  ],
  limits: [
    'Leads come in from Gmail once a weekday at 9:00, not the minute an email arrives.',
    'It decides who is a lead from what the email says. A newsletter or a supplier can slip in; set the lead to Lost, or tell Captain which address leads write to.',
    'A file import keeps one lead per email address, so a second row for the same person fills gaps in the first instead of adding a new lead.',
    'It is its own tracker. It does not sync with HubSpot, Pipedrive or another CRM.',
  ],
  otherWaysH2: 'Other ways to track leads from your inbox',
  otherWays: [
    {
      title: 'A spreadsheet',
      body: 'Name, company, email, source, stage, value, last contact and next follow-up as columns, sorted by the follow-up date each morning. Free templates from OnePageCRM and HubSpot start you off; you still copy every lead in by hand.',
      sources: [
        { label: 'OnePageCRM', href: 'https://www.onepagecrm.com/blog/free-lead-tracker-template/' },
        { label: 'HubSpot', href: 'https://www.hubspot.com/resources/templates/lead-tracker' },
      ],
    },
    {
      title: 'Streak, inside Gmail',
      body: 'Streak builds a pipeline inside Gmail and can propose stages and columns from a description. It is the better pick for a sales team that wants a proven, shared pipeline in the inbox today.',
      sources: [{ label: 'Streak', href: 'https://support.streak.com/en/articles/2761787-creating-and-editing-a-pipeline' }],
    },
    {
      title: 'A CRM with Zapier',
      body: 'If you already use Pipedrive or HubSpot, Zapier’s "Track and update leads in Pipedrive from new Gmail emails" moves inbox leads into it. You set the rules for which emails count yourself.',
      sources: [{ label: 'Zapier template', href: 'https://zapier.com/templates/details/01cb688df65c21500106ec1f7e704092d041e2d3f53f9724b4244d90ffd25a03' }],
    },
  ],
  faqs: [
    { q: 'What should a simple lead tracker include?', a: 'Who they are (name, email, company), where they came from, the stage, what the deal is worth, when you last spoke and when to follow up next. The next follow-up date matters most: it is what tells you who to write to today.' },
    { q: 'How does it know which emails are leads?', a: 'Closer reads each day’s email and picks out new people asking to buy, asking for a quote or filling in your website form. It checks Leads by email first, so nobody is added twice, and it never replies to them.' },
    { q: 'Will it email my leads without asking me?', a: 'No. Every follow-up waits in Needs you until you approve it, change it or decline it. If you answer "No, just remind me" when Captain asks, it only reminds you.' },
    { q: 'When should I move from a tracker to a CRM?', a: 'When several people sell, or you need email sequences, call logging and forecasts. HubSpot’s template page puts the line at more than 10 new leads a week or 75 active contacts.' },
  ],
  related: [
    { href: '/use-cases/follow-up-quiet-hubspot-deals', kind: 'ai', title: 'Follow up quiet HubSpot deals', line: 'Already on HubSpot? An AI agent that drafts the follow-ups there.' },
    { href: '/use-cases/customer-requests-desk', kind: 'app', title: 'Customer requests desk', line: 'Every request tracked to solved, with replies drafted.' },
    { href: '/use-cases/chase-unpaid-invoices', kind: 'app', title: 'Chase unpaid invoices', line: 'Once they buy: an invoices desk that chases what you are owed.' },
  ],
  up: [
    { href: '/apps', label: 'Apps you can build' },
    { href: '/integrations/gmail', label: 'Gmail' },
    { href: '/guides/how-to-build-a-simple-crm-without-code', label: 'How to build a simple CRM without code' },
    { href: '/guides/how-to-automate-lead-follow-up-from-gmail', label: 'How to automate lead follow-up from Gmail' },
  ],
  finalH2: 'Start your lead tracker',
  byline: 'Captain builds this from the leads recipe in the 50agents app; the views above are drawn from that app, filled with example data.',
};

export default page;
