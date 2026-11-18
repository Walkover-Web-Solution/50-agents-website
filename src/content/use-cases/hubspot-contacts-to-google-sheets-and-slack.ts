// Use case 3 (pages-brief B1): HubSpot new contact to Google Sheets and a Slack post. An automation.
// Product facts: the Playbook "New lead to your sheet and Slack" (templates/list.ts); automations (features/automations:
// the builder tests on a real item with sends held, builds a draft, Make it live; server/design.ts `finalize`: a step with
// a channel reaches other people and asks each run, a row in your own tools runs on its own; P18: automations ignore the
// Autonomy switches). Catalog: catalog.ts, read 19 Nov 2026. Research: scratchpad research-A, read 19 Nov 2026.
import type { UseCase } from '@/site/types';
import { catalogName, chips, iconOf } from './catalog';

const page: UseCase = {
  slug: 'hubspot-contacts-to-google-sheets-and-slack',
  kind: 'auto',
  title: 'HubSpot new contacts to Google Sheets and Slack | 50agents',
  description:
    'To send each new HubSpot contact to Google Sheets and Slack, ask Captain for an automation: a row added on its own, a Slack post after your OK.',
  h1: 'Send new HubSpot contacts to Google Sheets and Slack',
  answer: [
    'To send every new HubSpot contact to a Google Sheet and a Slack channel, tell Captain to set up an automation that starts when a contact is created in HubSpot.',
    'Each run adds a row with the fields you choose to your sheet on its own, then drafts a post for the channel you pick, which goes out when you approve it.',
  ],
  ask: 'Set up an automation: every new HubSpot contact is added as a row to my Google Sheet and posted in a Slack channel',
  updated: '2026-11-19',
  published: '2026-11-19',
  promises: ['Tested on a real contact before it goes live', 'Rows land on their own', 'The same steps every time'],
  plan: {
    mode: 'building an automation',
    name: 'New contacts to Sheet and Slack',
    line: 'Each new HubSpot contact, logged and shared',
    faces: ['keeper'],
    rows: [
      { label: 'Starts', value: 'A new contact in HubSpot' },
      { label: 'Steps', value: 'Add a row to your sheet · Post in your Slack channel' },
      { label: 'Asks first', value: 'The Slack post, each time' },
    ],
  },
  factsLabel: 'HubSpot to Sheets, in numbers',
  facts: [
    {
      figure: '20 cells',
      text: 'is the most HubSpot’s own "Create Google Sheet row" workflow action writes per row. It only adds rows, sends dates as milliseconds, and needs Professional or Enterprise.',
      source: 'HubSpot Knowledge Base, updated 8 Sep 2026',
      href: 'https://knowledge.hubspot.com/workflows/add-data-to-google-sheets-with-workflows',
      read: '19 Nov 2026',
    },
    {
      figure: '15 minutes',
      text: 'is how often Zapier’s free plan checks HubSpot for new contacts in its "Create Google Sheets rows for new HubSpot contacts" template.',
      source: 'Zapier template page',
      href: 'https://zapier.com/apps/google-sheets/integrations/hubspot/4667/create-google-sheets-rows-for-new-hubspot-contacts',
      read: '19 Nov 2026',
    },
  ],
  seeIt: {
    h2: 'What you get: one automation, three apps, every run on record',
    intro: 'This is the automation’s page in 50agents with example contacts. Overview shows today’s count through each step, the Slack post waiting for your OK and the rows in your sheet; Runs shows one contact step by step; Steps shows every setting.',
  },
  view: {
    type: 'automation',
    automation: {
      name: 'New contacts to Sheet and Slack',
      face: 'keeper',
      status: '1 thing waits on you',
      today: { runs: 6, did: 6, failed: 0, credits: 3 },
      stations: [
        { key: 'start', mark: 'app', app: 'hubspot', say: 'When a contact is created in HubSpot', today: 6, passes: ['First name', 'Last name', 'Email', 'Company', 'Lifecycle stage', 'Owner', 'Create date'],
          settings: [{ label: 'Trigger', value: catalogName('hubspot', 'New Or Updated Contact') }, { label: 'Runs on', value: 'Created only' }, { label: 'Properties', value: 'firstname, lastname, email, company, lifecyclestage, hubspot_owner_id, createdate' }] },
        { key: 'date', mark: 'set', say: 'Turn the create date into a date', today: 6, passes: ['Date added'],
          settings: [{ label: 'Works out', value: 'Date added, from HubSpot’s milliseconds, in your time zone' }] },
        { key: 'row', mark: 'app', app: 'google-sheets', say: 'Add a row to New contacts', today: 6, passes: ['Row number'],
          settings: [{ label: 'Action', value: catalogName('google-sheets', 'Add New Row to Sheet') }, { label: 'Spreadsheet', value: 'Sales leads 2026' }, { label: 'Sheet', value: 'New contacts' }, { label: 'Columns', value: 'Date added, Name, Email, Company, Stage, Owner' }] },
        { key: 'post', mark: 'app', app: 'slack', say: 'Post the contact in #new-leads', today: 6, asks: true,
          settings: [{ label: 'Action', value: catalogName('slack', 'Send Message') }, { label: 'Channel', value: '#new-leads' }, { label: 'Message', value: 'New contact: {Name} ({Company}), {Email}. Stage: {Stage}. Owner: {Owner}' }] },
      ],
      runs: [
        { title: 'Dana Whitfield, Brightline Physio', when: 'Today 10:41 AM', status: 'Waits on you', steps: [
          { say: 'When a contact is created in HubSpot', mark: 'app', app: 'hubspot', did: 'Done', ms: 400, got: [{ label: 'Name', value: 'Dana Whitfield' }, { label: 'Email', value: 'dana@brightline.example' }, { label: 'Company', value: 'Brightline Physio' }, { label: 'Stage', value: 'Lead' }] },
          { say: 'Turn the create date into a date', mark: 'set', did: 'Done', ms: 100, got: [{ label: 'Date added', value: '19 Nov 2026' }] },
          { say: 'Add a row to New contacts', mark: 'app', app: 'google-sheets', did: 'Done', ms: 1300, got: [{ label: 'Row', value: '48' }] },
          { say: 'Post the contact in #new-leads', mark: 'app', app: 'slack', did: 'Waits on you', ms: 0 },
        ] },
        { title: 'Marcus Lee, Cobalt Fitness', when: 'Today 9:12 AM', status: 'Done', steps: [] },
        { title: 'Ana Ruiz, Fieldnote Media', when: 'Yesterday 4:05 PM', status: 'Done', steps: [] },
        { title: 'Tom Okafor, Riverside Clinic', when: 'Yesterday 11:30 AM', status: 'Done', steps: [] },
      ],
      waits: {
        by: 'New contacts to Sheet and Slack', face: 'keeper', where: 'automation', ago: 'Today 10:41 AM',
        title: 'Post in Slack, #new-leads',
        rows: [{ label: 'Channel', value: '#new-leads' }, { label: 'App', value: 'Slack' }],
        body: ['New contact: Dana Whitfield (Brightline Physio), dana@brightline.example. Stage: Lead. Owner: Sam Patel'],
        actions: ['Approve and send', 'Change', 'Decline'],
      },
      sheet: {
        name: 'Sales leads 2026 · New contacts',
        cols: ['Date added', 'Name', 'Email', 'Company', 'Stage', 'Owner'],
        rows: [
          ['18 Nov 2026', 'Ana Ruiz', 'ana@fieldnote.example', 'Fieldnote Media', 'Lead', 'Sam Patel'],
          ['19 Nov 2026', 'Marcus Lee', 'marcus@cobalt.example', 'Cobalt Fitness', 'Subscriber', 'Jo Kim'],
          ['19 Nov 2026', 'Dana Whitfield', 'dana@brightline.example', 'Brightline Physio', 'Lead', 'Sam Patel'],
        ],
      },
    },
  },
  howH2: 'How a new HubSpot contact reaches your sheet and Slack',
  planParts: [
    { title: 'The track', body: 'A card per start and step, each with its app’s icon, filling in as Captain finds the apps.' },
    { title: 'Tested on your data', body: 'Run once on your latest real contact. The row and the post are held and shown, not sent.' },
    { title: 'Runs', body: 'When a contact is created in HubSpot.' },
    { title: 'On its own', body: 'Adding the row: it is your own sheet.' },
    { title: 'Asks you first', body: 'The Slack post, each time: a channel reaches other people.' },
  ],
  steps: [
    { title: 'Captain finds the apps and fields', body: 'It looks up HubSpot’s contact trigger, Google Sheets’ add-a-row action and Slack’s send action, reads your sheet’s column headers and your channels, and asks you which sheet and channel if you did not say.' },
    { title: 'It tests on a real contact', body: 'It runs the steps once on your latest HubSpot contact. Reads happen for real; the row and the Slack post are held and shown to you as "what it would do".' },
    { title: 'It is built as a draft', body: 'Nothing runs until you tap Make it live. Until then you can change any step in its chat, and each change is tested again.' },
    { title: 'Each new contact gets a row', body: 'When a contact is created, the run maps name, email, company, lifecycle stage and owner to your columns, turns HubSpot’s date into a real date, and adds the row on its own.' },
    { title: 'The Slack post waits for your OK', body: 'The post for your channel waits in Needs you. Approve it and it goes out; every run’s steps, with what each got and how long it took, stay under Runs.' },
  ],
  uses: [
    { app: 'hubspot', icon: iconOf('hubspot'), name: 'HubSpot', why: 'Starts each run when a contact is created, set to created only, with the properties you want passed on.', chips: chips('hubspot', ['New Or Updated Contact']) },
    { app: 'googlesheets', icon: iconOf('google-sheets'), name: 'Google Sheets', why: 'Adds one row per contact under your header row. Ask for a lookup first and it skips emails already in the sheet.', chips: chips('google-sheets', ['Add New Row to Sheet', 'Lookup Spreadsheet Rows']) },
    { app: 'slack', icon: iconOf('slack'), name: 'Slack', why: 'Posts the contact in the channel you choose. A private channel shows up once you invite the app to it in Slack.', chips: chips('slack', ['Send Message']) },
  ],
  usesNote: 'Trigger and actions named as viaSocket’s catalog of 2,300+ apps lists them, read 19 Nov 2026.',
  asksFirst:
    'The Slack post, every time. A channel reaches other people, so an automation never posts there on its own: each post waits in Needs you with the channel and the text. The row goes in on its own, because the sheet is yours, and that was approved with the plan.',
  table: {
    h2: 'What goes in each column',
    label: 'Field mapping',
    done: 'In the plan',
    cols: ['Sheet column', 'From HubSpot', 'Ask Captain'],
    intro: 'The plan maps HubSpot’s contact properties to your sheet’s headers, so name your columns first. These six are where it starts; each extra column is one sentence to its chat.',
    rows: [
      { when: 'Date added', tone: 'Create date, turned from milliseconds into a date', ask: '' },
      { when: 'Name', tone: 'First name and Last name, joined', ask: '' },
      { when: 'Email, Company', tone: 'Email, Company name', ask: '' },
      { when: 'Stage, Owner', tone: 'Lifecycle stage, Contact owner', ask: '' },
      { when: 'Phone', tone: 'Phone number', ask: 'Also add the contact’s phone number as a column' },
      { when: 'Source', tone: 'Original source', ask: 'Also add where the contact came from, HubSpot’s original source, as a column' },
    ],
    note: 'HubSpot sends dates as Unix timestamps in milliseconds, which is why a plain copy shows a long number; HubSpot’s own sheet action needs a header row starting at A1.',
    sources: [
      { label: 'HubSpot, Google Sheets in workflows', href: 'https://knowledge.hubspot.com/workflows/add-data-to-google-sheets-with-workflows' },
    ],
  },
  yoursIntro: 'Narrow who gets posted, add columns, or drop Slack. Each of these builds a different automation; copy one into Captain.',
  variations: [
    'Set up an automation: every new HubSpot contact with a company name is added as a row to my Google Sheet and posted in a Slack channel',
    'Set up an automation: every new HubSpot contact is added as a row to my Google Sheet, skipping emails already in the sheet',
    'Set up an automation: every new HubSpot contact is added as a row to my Google Sheet with their phone and original source',
    'Set up an automation: every new HubSpot contact is added as a row to my Google Sheet',
  ],
  limits: [
    'Each Slack post waits for your OK. Automations do not read the Autonomy switches in Settings today, so there is no way to let the post go on its own yet.',
    'It adds a row when a contact is created. A later change to the contact does not update its row.',
    'Contacts created before it went live are not added.',
    'HubSpot merges contacts by email, so one person is one run. A contact imported without an email can arrive more than once.',
  ],
  otherWaysH2: 'Other ways to send HubSpot contacts to Sheets and Slack',
  otherWays: [
    {
      title: 'HubSpot workflows',
      body: 'On Professional or Enterprise, one contact workflow can add a Google Sheet row and send a Slack notification with no other tool, and it is the better choice if you pay for it already. The sheet action adds rows only, up to 20 cells, and a timeout can leave a duplicate.',
      sources: [
        { label: 'Sheets in workflows', href: 'https://knowledge.hubspot.com/workflows/add-data-to-google-sheets-with-workflows' },
        { label: 'Slack notifications', href: 'https://knowledge.hubspot.com/integrations/manage-your-notifications-in-slack' },
      ],
    },
    {
      title: 'Zapier',
      body: 'Its template "Notify team in Slack when new HubSpot contact is added, and log details in Google Sheets" does this job in one Zap, with posts going out on their own. On the free plan it checks for new contacts every 15 minutes.',
      sources: [
        { label: 'Zapier template', href: 'https://zapier.com/templates/details/f8ae2990910fb913df836f477a2b994ba852565a1cf2efc9c76dcb230dbd27bb' },
        { label: 'Zapier, Sheets rows', href: 'https://zapier.com/apps/google-sheets/integrations/hubspot/4667/create-google-sheets-rows-for-new-hubspot-contacts' },
      ],
    },
    {
      title: 'Make',
      body: 'The template "Add new HubSpot contacts to Google Sheets as rows" covers the sheet; add a Slack module yourself for the post.',
      sources: [{ label: 'Make template', href: 'https://www.make.com/en/templates/12706-add-new-hubspot-contacts-to-google-sheets-as-rows' }],
    },
  ],
  faqs: [
    { q: 'Can HubSpot add new contacts to Google Sheets without Zapier?', a: 'Yes, with a workflow on a Professional or Enterprise plan. Free and Starter plans have no workflows, so you need a tool outside HubSpot, such as this automation.' },
    { q: 'Why do I get duplicate rows?', a: 'Usually because the trigger fires on updates as well as new contacts, or a contact came in without an email. This one runs on created only; ask for a lookup on the Email column first and it skips anyone already in the sheet.' },
    { q: 'Why does the date show up as a long number?', a: 'HubSpot sends dates as Unix timestamps in milliseconds. This automation has a step that turns the create date into a normal date before the row is added.' },
    { q: 'Can it post to a private Slack channel?', a: 'Yes, once you invite the app to that channel in Slack; until then the channel does not show in the list.' },
    { q: 'Does every Slack post need my OK?', a: 'Yes, today. A post in a channel reaches other people, so automations always ask first for it. If you only need the sheet, drop the Slack step and nothing waits on you.' },
  ],
  related: [
    { href: '/use-cases/follow-up-quiet-hubspot-deals', kind: 'ai', title: 'Follow up quiet HubSpot deals', line: 'An AI agent that drafts a follow-up when a deal goes quiet.' },
    { href: '/use-cases/stripe-payments-to-google-sheets', kind: 'auto', title: 'Stripe payments to Google Sheets', line: 'Every payment as a row, with the customer, amount and date.' },
    { href: '/use-cases/shopify-orders-to-google-sheets', kind: 'auto', title: 'Shopify orders to Google Sheets', line: 'Every order as a row, with its items and total.' },
  ],
  up: [
    { href: '/automations', label: 'Automations you can build' },
    { href: '/integrations/hubspot/google-sheets', label: 'HubSpot and Google Sheets' },
    { href: '/integrations/hubspot/slack', label: 'HubSpot and Slack' },
    { href: '/guides/how-to-send-new-hubspot-contacts-to-slack', label: 'How to send new HubSpot contacts to Slack' },
  ],
  finalH2: 'Send your new contacts where your team looks',
  byline: 'Captain builds this automation from the ask above, the same words as the "New lead to your sheet and Slack" Playbook in the 50agents app; the views above are drawn from that app, filled with example data.',
};

export default page;
