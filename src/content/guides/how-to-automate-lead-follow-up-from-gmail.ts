// Guide 11 (pages-brief B5). Research: Google Workspace and Gmail sending limits, Apps Script quotas, GMass, Mixmax,
// Simular and Lindy results for "automate follow up emails gmail", read 19 Nov 2026. 50agents: the leads recipe
// (app/src/features/apps/recipes.ts): fields, Pipeline and Follow up views, Closer's duties.
import type { Guide } from './types';

const g: Guide = {
  slug: 'how-to-automate-lead-follow-up-from-gmail',
  n: 11,
  group: 'Automations',
  kind: 'app',
  title: 'How to automate lead follow-up from Gmail | 50agents',
  description:
    'Automate lead follow-up from Gmail: log each lead with a last-contact date, follow up in the same thread after N quiet days, and stop the moment they reply.',
  h1: 'How to automate lead follow-up from Gmail',
  short:
    'Keep a list of leads with a stage and a last-contact date, and have a tool check each morning for leads you contacted three or more days ago who have not replied, then draft a short follow-up in the same Gmail thread. The part most setups get wrong is the stop: a reply from the lead, from a colleague of theirs or in a new thread must end the sequence.',
  published: '2026-11-19',
  updated: '2026-11-19',
  sections: [
    {
      id: 'loop',
      h2: 'The follow-up loop',
      body: [
        { p: 'Every follow-up tool, from a Gmail add-on to a CRM sequence, runs the same loop. Knowing it lets you judge any tool in five minutes.' },
        {
          table: {
            head: ['Step', 'What happens', 'What decides it'],
            rows: [
              ['Capture', 'A new lead lands in the list', 'An email from someone new asking to buy, a form, or you add them'],
              ['Contact', 'You send the first email', 'Stage moves to Contacted, last contact is today'],
              ['Wait', 'Nothing for N days', 'Your gap: 3 days is common for warm leads'],
              ['Check', 'Did they reply?', 'A reply in the thread, from the lead or their domain'],
              ['Follow up', 'A short email in the same thread', 'Not replied, not Won, not Lost'],
              ['Stop', 'No more emails', 'A reply, a meeting booked, or the last step reached'],
            ],
          },
        },
      ],
    },
    {
      id: 'gmail-options',
      h2: 'What Gmail can do on its own',
      body: [
        { p: 'Gmail can remind you, not send for you. Its nudges suggest emails to follow up on, and you write the follow-up yourself. To send or draft follow-ups automatically, you need an add-on (GMass, Mixmax and others work inside Gmail), a CRM with sequences, or an automation tool that reads your Gmail.' },
        { p: 'Whatever you use sends from your account, so Gmail’s limits apply to it. A Google Workspace user can send up to 2,000 messages a day, 500 on a trial, and hitting the limit stops all your sending for up to 24 hours ([Google Workspace](https://knowledge.workspace.google.com/admin/gmail/gmail-sending-limits-in-google-workspace)). A personal Gmail account is limited around 500 emails a day ([Gmail help](https://support.google.com/mail/answer/22839)). Follow-ups to a few dozen leads are nowhere near either; a bulk sequence can be.' },
      ],
    },
    {
      id: 'steps',
      h2: 'How to set it up, step by step',
      body: [
        {
          steps: [
            { title: 'Make the lead list', body: 'Name, email, company, stage (New, Contacted, Replied, Won, Lost), last contact and next follow-up. A sheet works; a CRM works; the columns are what matter.' },
            { title: 'Decide the gap and the number of follow-ups', body: 'Three days for warm leads, a week for cold ones, and two or three follow-ups at most. Write it down; it becomes the rule.' },
            { title: 'Write each follow-up to move one step', body: 'Not "just checking in". Offer the next step: a call time, a shorter version of the quote, a question that is easy to answer.' },
            { title: 'Send in the same thread', body: 'A reply in the original thread keeps the context for the lead and keeps your reply detection simple.' },
            { title: 'Detect replies before every send', body: 'Read the thread just before sending, not only when the list was last updated. Count a reply from anyone at their domain as a reply.' },
            { title: 'Update the list after each email', body: 'Last contact to today, next follow-up to the next gap, and a note of what you sent.' },
          ],
        },
      ],
    },
    {
      id: 'example',
      h2: 'A worked example: a leads app in 50agents',
      body: [
        { p: 'In 50agents, one sentence to Captain builds you a leads app on the steps above. It asks where new leads come from and whether follow-ups should go from your email, then builds the list (name, email, phone, company, source, stage, deal size, last contact, next follow-up, notes), a Pipeline board and a Follow up view. Its AI agent, Closer, brings new leads in from the last day’s email each weekday at 9:00, marks a lead Replied when they answer, and drafts a follow-up in the same thread when a Contacted lead has been quiet for 3 days. Every follow-up waits for your yes.' },
        { ask: 'Track my leads and follow up' },
        {
          view: {
            type: 'app',
            face: ['closer', 'scout'],
            name: 'Leads',
            status: 'Live · 23 leads',
            rail: ['Overview', 'Pipeline', 'Follow up', 'All leads'],
            on: 'Follow up',
            numbers: [['New this week', '6'], ['Follow up today', '4', true], ['Open deals', '$38,200']],
            table: {
              head: ['Name', 'Company', 'Stage', 'Last contact', 'Next follow-up'],
              rows: [
                ['Dana Ruiz', 'Fieldstone Logistics', 'Contacted', '14 Nov', '17 Nov'],
                ['Owen Park', 'Parkside Dental', 'Contacted', '15 Nov', '18 Nov'],
                ['Mia Laurent', 'Laurent Studio', 'Contacted', '16 Nov', '19 Nov'],
                ['Sam Idowu', 'Northgate Physio', 'Replied', '18 Nov', '21 Nov'],
              ],
            },
            crew: { face: 'closer', name: 'Closer', word: 'AI agent', does: 'Brings in new leads from your email, notices replies, and follows up quiet leads. Asks you before sending any email.' },
          },
          caption: 'The leads app’s Follow up view in 50agents, soonest first, with Closer, the AI agent that drafts each follow-up for your approval. A second crew member, Scout, a browser agent, looks up each new lead’s company. Example data.',
        },
      ],
    },
  ],
  pair: { href: '/use-cases/lead-tracker-from-your-inbox', label: 'Build it: a lead tracker from your inbox', line: 'The ready-made version, with the exact ask and what it asks you first.' },
  wrong: [
    { title: 'A follow-up after they replied', body: 'They answered from a colleague’s address, or started a new thread. Check the thread and their domain right before each send.' },
    { title: 'An out-of-office stops the sequence', body: 'An auto-reply counts as a reply. Treat replies that say "out of office" or "automatic reply" as not replied, and follow up after their return date.' },
    { title: 'Your whole Gmail stops sending', body: 'A big sequence hit the daily limit, which blocks all your mail, not just the automation. Keep automated sends well under it.' },
    { title: 'Follow-ups at 3 in the morning', body: 'The tool ran in another timezone. Set sends for working hours in the lead’s timezone where you know it.' },
    { title: 'The same email three times', body: 'Each follow-up is a copy of the first. Write each one to offer something new, or stop after one.' },
  ],
  faqs: [
    { q: 'Does Gmail have automatic follow-ups built in?', a: 'No. Gmail’s nudges remind you to follow up; they do not send anything. Sending needs an add-on, a CRM sequence or an automation tool.' },
    { q: 'How long should I wait before following up with a lead?', a: 'Two to three working days for a lead who asked you something, a week for a cold contact. Stop after two or three follow-ups with no reply.' },
    { q: 'Will automated follow-ups hurt my deliverability?', a: 'A few dozen personal follow-ups in the same thread will not. Hundreds of near-identical emails a day from one account can, and they also risk Gmail’s sending limits.' },
  ],
  sources: [
    { label: 'Google Workspace: Gmail sending limits', href: 'https://knowledge.workspace.google.com/admin/gmail/gmail-sending-limits-in-google-workspace' },
    { label: 'Gmail help: Sending limits', href: 'https://support.google.com/mail/answer/22839' },
    { label: 'Google Apps Script: Quotas', href: 'https://developers.google.com/apps-script/guides/services/quotas' },
  ],
  related: ['how-to-build-a-simple-crm-without-code', 'how-to-draft-email-replies-with-ai-and-still-check-them', 'how-to-send-new-hubspot-contacts-to-slack'],
};

export default g;
