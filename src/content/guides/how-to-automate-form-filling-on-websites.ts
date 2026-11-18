// Guide 17 (pages-brief B5). Research: Chrome autofill help, NoteForms, Axiom (pricing and form-filling page), Skyvern and
// Magical results for "automate form filling website", read 19 Nov 2026. 50agents: browser agents fill, then ask to submit.
import type { Guide } from './types';

const g: Guide = {
  slug: 'how-to-automate-form-filling-on-websites',
  n: 17,
  group: 'Browser agents',
  kind: 'browser',
  title: 'How to automate form filling on websites | 50agents',
  description:
    'Automate web form filling: keep the data in one list with an ID per row, fill each form, check it, submit only on approval, and save proof that it went through.',
  h1: 'How to automate form filling on websites',
  short:
    'Keep the data in one list with an ID and a Status column per row, then use a browser tool to fill the form from one row at a time, check it, and submit only after you approve, saving the confirmation number back to the row. For your own details on any site, Chrome’s built-in autofill is enough; automation is for the same form filled many times.',
  published: '2026-11-19',
  updated: '2026-11-19',
  sections: [
    {
      id: 'which',
      h2: 'Which kind of form filling do you mean?',
      body: [
        {
          table: {
            head: ['You want to', 'Use', 'Note'],
            rows: [
              ['Fill your own name, address or card faster', 'Your browser’s autofill', 'Chrome fills addresses, contact details, passwords and payment methods; each can be turned off ([Chrome](https://support.google.com/chrome/answer/142893)).'],
              ['Paste the same snippets into many forms', 'A text expander', 'Still you clicking submit.'],
              ['Fill one form many times from a list', 'A browser automation tool or a browser agent', 'This guide.'],
              ['Get form submissions into your own tools', 'An automation on the form app’s trigger', 'Typeform, Google Forms and Jotform have triggers in automation catalogs; no browser needed.'],
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
            { title: 'Put the data in one list', body: 'One row per form to fill, one column per field, plus an ID and a Status (To do, Filled, Submitted, Failed). NoteForms calls this a source of truth, and it is the fix for most failures ([NoteForms](https://noteforms.com/resources/automate-form-filling-guide)).' },
            { title: 'Map columns to fields by their labels', body: 'Write the map once: "Company name" column to the "Business name" field. Labels change less than page layouts.' },
            { title: 'Check before submit', body: 'Required fields filled, dates in the site’s format, nothing cut off. A tool that fills and then shows you the form is worth more than one that is fast.' },
            { title: 'Submit only on approval', body: 'A submitted form usually cannot be taken back. Approve each one, at least until a few dozen have gone through clean.' },
            { title: 'Save proof', body: 'The confirmation number, a reference, or the page title after submit, written back to the row with Status Submitted.' },
            { title: 'Never resubmit without checking', body: 'If a run fails after submit, look for the confirmation before trying again, or you will send it twice.' },
          ],
        },
      ],
    },
    {
      id: 'example',
      h2: 'A worked example: a browser agent that asks before it submits',
      body: [
        { p: 'In 50agents a browser agent submits a form only when its instructions say so, and even then it fills the form, stops, and asks you in Needs you. Approve, and it runs again to submit exactly what you saw.' },
        { p: 'One limit to know: a browser agent on its own works from what you tell it in its chat and from websites; it does not read your Google Sheet. To work through a list, build an app in 50agents to hold the rows; a browser agent in that app\u2019s crew can read and update its records.' },
        { ask: 'Set up a browser agent that registers each espresso machine I tell it about on the warranty form at maker.example, and asks me before it submits' },
        {
          view: {
            type: 'need',
            face: 'scout',
            who: 'Warranty registrations',
            from: 'browser agent',
            when: '11:20',
            label: 'Submit a form',
            title: 'Submit the warranty form on maker.example',
            facts: [['Business', 'Lakeside Cafe'], ['Product', 'EspressoPro 2, serial EP2-88412'], ['Purchase date', '12 Nov 2026'], ['Email', 'owner@lakeside.example']],
            choices: ['Approve', 'Decline'],
          },
          caption: 'A browser agent in 50agents that has filled a form and waits for your approval before it submits. Example data.',
        },
      ],
    },
  ],
  wrong: [
    { title: 'Submitted twice', body: 'A retry after a slow page. Check for the confirmation before any retry, and keep the Status column true.' },
    { title: 'Fields shifted', body: 'The site added a field and everything moved down one. Map by label, and check a filled form before the first submit after any site change.' },
    { title: 'The wrong row', body: 'Two rows with the same name. Use an ID per row and say it in the approval.' },
    { title: 'Personal data in the wrong place', body: 'A form on a look-alike site, or a field that posts publicly. Fill forms only on the exact address in your list.' },
    { title: 'A CAPTCHA appears', body: 'The site does not want automated submits. Some tools sell CAPTCHA bypass; do not use it. Ask the site for a bulk upload or an API instead.' },
  ],
  faqs: [
    { q: 'How do I fill the same web form many times automatically?', a: 'Keep the data in a sheet with one row per form, and use a browser automation tool or browser agent to fill one row at a time. Submit only after a check, and save the confirmation to the row.' },
    { q: 'Can I fill a web form from a spreadsheet?', a: 'Yes. That is the most reliable setup: the sheet is the source, the tool fills from it and writes the result back.' },
    { q: 'What about forms with a CAPTCHA?', a: 'Stop there. A CAPTCHA is the site asking for a person. Do those by hand, or ask the site for a bulk option.' },
  ],
  sources: [
    { label: 'Google Chrome help: Autofill', href: 'https://support.google.com/chrome/answer/142893' },
    { label: 'NoteForms: Automate form filling guide', href: 'https://noteforms.com/resources/automate-form-filling-guide' },
    { label: 'Axiom: Filling out web forms', href: 'https://axiom.ai/automate/filling-out-web-forms' },
  ],
  related: ['how-to-automate-a-website-that-has-no-api', 'browser-automation-without-code', 'how-to-make-an-ai-agent-ask-before-it-acts'],
};

export default g;
