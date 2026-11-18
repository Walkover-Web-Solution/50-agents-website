// Guide 13 (pages-brief B5). Research: G2 "How to automate data entry", Zapier deduplication help, Make template, Google
// Sheets API limits, read 19 Nov 2026. Facebook Lead Ads, HubSpot and Slack events from viaSocket's catalog, same day.
import type { Guide } from './types';
import { APPS } from './apps';

const g: Guide = {
  slug: 'how-to-automate-data-entry-between-two-apps',
  n: 13,
  group: 'Automations',
  kind: 'auto',
  title: 'How to automate data entry between two apps | 50agents',
  description:
    'Automate data entry between two apps: pick the source of truth, a matching key such as email, a field map, and create-or-update logic so nothing is entered twice.',
  h1: 'How to automate data entry between two apps',
  short:
    'Choose which app is the source of truth, pick a key both apps share (usually an email or an order number), map each field, and use "create or update" instead of "create" so the second app never gets duplicates. Run it beside your manual entry for a week before you stop typing.',
  published: '2026-11-19',
  updated: '2026-11-19',
  sections: [
    {
      id: 'four-decisions',
      h2: 'The four decisions',
      body: [
        {
          table: {
            head: ['Decision', 'Ask yourself', 'Example: form leads into a CRM'],
            rows: [
              ['Source of truth', 'Where is a record first created, and which app wins if they disagree?', 'The ad form creates; the CRM wins after that.'],
              ['Matching key', 'Which field identifies the same record in both apps?', 'Email address.'],
              ['Create or update', 'If the record exists, update it or skip it?', 'Update: a lead who fills two forms stays one contact.'],
              ['Direction', 'One way, or both?', 'One way. Two-way sync is a different, harder job.'],
            ],
          },
        },
        { note: 'Duplicates are the whole game. Zapier’s help says its polling triggers skip items they have seen before, but only inside one Zap, and instant triggers do not deduplicate at all; what the second app does with a repeat depends on that app ([Zapier](https://help.zapier.com/hc/en-us/articles/8496260269965)). Create-or-update on a key is the fix in every tool.' },
      ],
    },
    {
      id: 'map',
      h2: 'Write the field map',
      body: [
        { p: 'A field map is a two-column list. Write it before you build; it shows you every gap.' },
        {
          table: {
            head: ['From (Facebook Lead Ads)', 'To (HubSpot)', 'Note'],
            rows: [
              ['full_name', 'First name, Last name', 'Split on the first space; keep the original in a note.'],
              ['email', 'Email', 'The key. Lower-case it.'],
              ['phone_number', 'Phone', 'Keep the + and country code.'],
              ['Form name', 'Lead source', 'Fixed text per form, so you can report by form.'],
              ['created_time', 'Create date', 'Convert from UTC.'],
              ['(none)', 'Lifecycle stage', 'Set to Lead.'],
            ],
          },
        },
      ],
    },
    {
      id: 'steps',
      h2: 'How to set it up, step by step',
      body: [
        {
          steps: [
            { title: 'Find the trigger in the source app', body: 'The event that means "new record": a form submitted, an order placed, a row added. In viaSocket’s catalog Facebook Lead Ads has "New Lead Submitted".' },
            { title: 'Find a create-or-update action in the destination', body: 'HubSpot has "Create or Update Contact"; where an app has only "Create", add a find step first and stop if the record exists.' },
            { title: 'Clean values on the way', body: 'Trim spaces, lower-case emails, fix date formats, split names. Most "the automation broke" reports are a format the second app rejected.' },
            { title: 'Test with 10 to 20 real records', body: 'Include awkward ones: no phone, a name with three parts, an email in capitals. G2 suggests this step, then running both ways side by side for one to two weeks ([G2](https://learn.g2.com/how-to-automate-data-entry)).' },
            { title: 'Run it beside manual entry, then stop typing', body: 'Compare the two for a week. When they match, switch off the manual step.' },
            { title: 'Backfill old records separately', body: 'Import the history once, by file, and let the automation handle new records only.' },
          ],
        },
      ],
    },
    {
      id: 'example',
      h2: 'A worked example in 50agents',
      body: [
        { p: 'In 50agents you describe the job and Captain plans an automation: it reads one real lead from your form to see the fields, maps them, and tests the steps on that lead before you build. Writing to your own CRM runs on its own; a step that would email or message someone else would ask you first.' },
        { ask: 'Set up an automation: every new Facebook lead is added to HubSpot as a contact, or updated if the email already exists' },
        {
          view: {
            type: 'track',
            name: 'Facebook leads to HubSpot',
            status: 'Live · runs on each new Facebook lead',
            sample: { title: 'Lead from "Spring offer" form · priya@example.com', sub: 'The real lead it planned and tested with' },
            stations: [
              { mark: 'app', app: APPS.fbleads, say: 'When a new lead is submitted in Facebook Lead Ads', passes: ['full_name', 'email', 'phone_number', 'form'] },
              { mark: 'set', say: 'Split the name, lower-case the email', passes: ['first name', 'last name', 'email'], did: 'Ran', values: [['First name', 'Priya'], ['Email', 'priya@example.com']] },
              { mark: 'app', app: APPS.hubspot, say: 'Create or update the contact in HubSpot, matched on email', did: 'Ran' },
            ],
            tested: 'Tested on your real data. Ran for real: 2 steps.',
          },
          caption: 'The automation in 50agents: the trigger, a calculation step that cleans the values, and a create-or-update so a repeat lead never becomes a second contact. Example data.',
        },
      ],
    },
  ],
  wrong: [
    { title: 'Duplicates', body: 'The destination used "create" and the same person came through twice. Use create-or-update on a key, or a find step first.' },
    { title: 'Ping-pong between two apps', body: 'App A updates B, which updates A, forever. Run one direction only, or add a check that skips changes made by the automation.' },
    { title: 'A field the other app does not have', body: 'Data silently drops. List every source field in the map, and put the ones with no home into a notes field.' },
    { title: 'Dates and numbers in the wrong format', body: '03/04 is March in one app and April in another. Convert to an unambiguous format on the way.' },
    { title: 'A backfill hits rate limits', body: 'Pushing 5,000 old records through an automation trips the destination’s limits; Google Sheets, for example, allows 300 writes a minute per project ([Google](https://developers.google.com/sheets/api/limits)). Import history by file instead.' },
  ],
  faqs: [
    { q: 'Can I sync two apps both ways?', a: 'You can, but it is a different job: you need a rule for which change wins, and a guard against loops. Start one way, and only add the other direction if you truly edit in both.' },
    { q: 'How do I stop duplicate records?', a: 'Match on a key both apps share, such as email or order number, and use create-or-update. Where the destination has only create, find first and skip if it exists.' },
    { q: 'What if the data needs judgement, like sorting free text?', a: 'Add an AI step for that one field, for example "sort this message into billing, bug or question", and keep the rest of the steps fixed.' },
  ],
  sources: [
    { label: 'Zapier help: How Zapier handles duplicate data', href: 'https://help.zapier.com/hc/en-us/articles/8496260269965' },
    { label: 'G2: How to automate data entry (3 Nov 2026)', href: 'https://learn.g2.com/how-to-automate-data-entry' },
    { label: 'Google: Sheets API usage limits', href: 'https://developers.google.com/sheets/api/limits' },
    { label: 'viaSocket catalog: Facebook Lead Ads', href: 'https://plug-service.viasocket.com/api/v1/plugins/recommend/integrations?service=facebook-lead-ads' },
  ],
  related: ['webhooks-explained-for-non-developers', 'how-to-send-new-hubspot-contacts-to-slack', 'ai-agent-vs-automation-which-one-you-need'],
};

export default g;
