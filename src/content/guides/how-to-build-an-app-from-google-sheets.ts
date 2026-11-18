// Guide 19 (pages-brief B5). Research: Google Drive storage limits (Sheets), Sheets API limits, AppSheet pricing, Glide and
// Softr Google Sheets docs, Google's AppSheet blog, Adalo and Retool results for "build an app from google sheets",
// read 19 Nov 2026. 50agents: the app builder and its importer (app/src/features/apps/CLAUDE.md).
import type { Guide } from './types';

const g: Guide = {
  slug: 'how-to-build-an-app-from-google-sheets',
  n: 19,
  group: 'Apps',
  kind: 'app',
  title: 'How to build an app from Google Sheets | 50agents',
  description:
    'Build an app from Google Sheets: tidy the sheet into one table per tab with an ID column, then pick AppSheet, Glide, Softr or an AI builder by limits and price.',
  h1: 'How to build an app from Google Sheets',
  short:
    'Tidy the sheet first (one table per tab, one header row, one row per record, an ID column), then point a no-code app builder at it: AppSheet if you are on Google Workspace, Glide or Softr for a polished app on top of the live sheet, or an AI builder that takes your data in and builds the screens for you. The sheet’s shape decides whether the app works far more than the tool does.',
  published: '2026-11-19',
  updated: '2026-11-19',
  sections: [
    {
      id: 'tidy',
      h2: 'Get the sheet into shape',
      body: [
        { p: 'Every builder reads your sheet as a table. Fix these before connecting anything; most "the app is broken" problems start here.' },
        {
          ul: [
            '**One table per tab.** No second table below the first, no totals row at the bottom.',
            '**One header row, in row 1.** Short, unique column names. Softr, for example, needs the field names in the first row and at least one row of data ([Softr](https://docs.softr.io/data-sources/google-sheets)).',
            '**One row per record.** One row per order, per lead, per job. Never one row per customer with orders across columns.',
            '**An ID column.** Something that never changes, so the app can find a row after it is sorted. Do not delete ID columns a tool adds for itself.',
            '**Choices as fixed values.** Status written five ways ("done", "Done", "complete") becomes five statuses. Use Data validation dropdowns ([Google](https://support.google.com/docs/answer/186103)).',
            '**No formulas in empty-looking rows.** Some builders read them as rows with blanks.',
          ],
        },
      ],
    },
    {
      id: 'tools',
      h2: 'Pick the builder by its limits',
      body: [
        {
          table: {
            head: ['Tool', 'Works with the sheet by', 'Know this (read 19 Nov 2026)'],
            rows: [
              ['[AppSheet](https://about.appsheet.com/pricing/) (Google)', 'Reading and writing it live', '$5, $10 or $20 per user a month; Core is included in most paid Google Workspace plans; free to prototype with up to 10 test users.'],
              ['[Glide](https://www.glideapps.com/docs/essentials/data-sources/google-sheets)', 'Syncing it', 'Spreadsheet sources are capped at 25,000 rows in total; check its pricing page for which plans sync Sheets.'],
              ['[Softr](https://docs.softr.io/data-sources/google-sheets)', 'Syncing it', 'Google Sheets works on all plans, Free included; it adds a record ID column you must keep.'],
              ['An AI app builder such as 50agents', 'Importing a copy (CSV, Excel or a pasted table)', 'Builds the screens and the AI agents for you; the app keeps its own records, so the sheet is not updated.'],
            ],
          },
        },
        { p: 'Google Sheets itself holds up to 20 million cells ([Google](https://support.google.com/drive/answer/37603)), and its API allows 300 reads and 300 writes a minute per project ([Google](https://developers.google.com/workspace/sheets/api/limits)). An app with a dozen users will not reach either; a sheet with heavy formulas slows down long before.' },
        { note: 'Decide early whether the sheet stays the source. If people will keep editing the sheet, pick a builder that works on it live. If the app replaces the sheet, import once and retire the sheet.' },
      ],
    },
    {
      id: 'steps',
      h2: 'How to build it, step by step',
      body: [
        {
          steps: [
            { title: 'Name the screens you need', body: 'Usually two or three: a list to find things, a board by status, a form to add one. Write them down before you open a builder.' },
            { title: 'Tidy the sheet', body: 'The checklist above. Make a copy first.' },
            { title: 'Connect or import', body: 'Live connection for AppSheet, Glide or Softr; a CSV or Excel import for builders that keep their own data.' },
            { title: 'Set who can see and change what', body: 'A shared link is not access control. Add users by email and limit who can edit.' },
            { title: 'Add one thing the sheet could not do', body: 'A reminder when a due date passes, a status that moves on its own, an email drafted from a row. This is why you built an app.' },
            { title: 'Hand it to one real user for a week', body: 'Fix what confuses them before you hand it to everyone.' },
          ],
        },
      ],
    },
    {
      id: 'example',
      h2: 'A worked example in 50agents',
      body: [
        { p: 'In 50agents you describe the app to Captain and it builds it: lists with typed fields, views as tables, boards and numbers, and a small crew of AI agents with duties. Then you drop in your sheet as a CSV or Excel file, or paste the table; Captain matches the columns to the fields and offers useful extra columns as new details. The app keeps its own records from then on, and you can export them as CSV any time.' },
        { ask: 'I need a simple ticket desk for support emails' },
        {
          view: {
            type: 'app',
            face: ['writer'],
            name: 'Customer requests',
            status: 'Live · 38 requests',
            rail: ['Overview', 'Desk', 'Urgent', 'All requests'],
            on: 'All requests',
            numbers: [['Open', '12'], ['Late', '3', true], ['Solved this week', '9']],
            table: {
              head: ['Subject', 'Customer', 'Kind', 'Status', 'Priority'],
              rows: [
                ['Charged twice in November', 'Lumen Dental', 'Problem', 'Waiting on us', 'Urgent'],
                ['Can I change my plan?', 'Harbor Yoga', 'Question', 'Waiting on them', 'Normal'],
                ['Invoice address change', 'Cobalt Fitness', 'Request', 'New', 'Low'],
              ],
            },
          },
          caption: 'An app built in 50agents from a sentence, with rows brought in from a spreadsheet: Overview numbers, its views in the rail, and a table. Example data.',
        },
      ],
    },
  ],
  wrong: [
    { title: 'Someone deletes the ID column', body: 'The app loses track of every row. Protect the column, or keep the app’s own copy of the data.' },
    { title: 'Dates and numbers read wrong', body: '03/04/2026 means March in one locale and April in another. Set the sheet’s locale before connecting, and check a few rows.' },
    { title: 'Edits in two places', body: 'People update the sheet and the app, and they drift apart. Pick one place to edit.' },
    { title: 'Phantom rows', body: 'Formulas copied down to row 1,000 look like 900 empty records. Delete them.' },
    { title: 'Everyone can see everything', body: 'The app shared by link shows salaries or customer phone numbers to the whole team. Set roles before you share.' },
  ],
  faqs: [
    { q: 'Can I make an app from a Google Sheet for free?', a: 'Yes, to start: AppSheet is free to prototype with up to 10 test users, and Softr’s free plan connects Google Sheets. Expect to pay once real users need access.' },
    { q: 'Is AppSheet free with Google Workspace?', a: 'AppSheet Core is included in most paid Google Workspace plans, according to Google’s AppSheet pricing page.' },
    { q: 'What is the row limit for an app on Google Sheets?', a: 'Google Sheets holds up to 20 million cells. Builders set their own limits; Glide, for example, caps spreadsheet sources at 25,000 rows.' },
  ],
  sources: [
    { label: 'Google: Files you can store in Google Drive (Sheets limits)', href: 'https://support.google.com/drive/answer/37603' },
    { label: 'Google: Sheets API usage limits', href: 'https://developers.google.com/workspace/sheets/api/limits' },
    { label: 'Google: Create a dropdown list in Sheets', href: 'https://support.google.com/docs/answer/186103' },
    { label: 'AppSheet: Pricing', href: 'https://about.appsheet.com/pricing/' },
    { label: 'Glide docs: Google Sheets', href: 'https://www.glideapps.com/docs/essentials/data-sources/google-sheets' },
    { label: 'Softr docs: Google Sheets', href: 'https://docs.softr.io/data-sources/google-sheets' },
  ],
  related: ['how-to-build-a-simple-crm-without-code', 'internal-tools-without-code-what-to-build-first', 'how-to-build-an-invoice-tracker'],
};

export default g;
