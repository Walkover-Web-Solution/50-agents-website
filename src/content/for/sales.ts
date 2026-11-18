// Role page: sales (pages-brief B7). Jobs from the 50agents templates (app/src/features/templates/list.ts) and the leads
// recipe; apps and their triggers and actions from viaSocket's catalog, read 19 Nov 2026.
import type { Role } from '@/content/guides/types';
import { APPS } from '@/content/guides/apps';

const r: Role = {
  slug: 'sales',
  role: 'sales teams',
  kind: 'ai',
  title: 'AI agents and automations for sales teams | 50agents',
  description:
    'What sales teams hand to AI agents first: quiet deals followed up, leads pulled from email, new contacts logged and posted, and each new lead researched.',
  h1: 'AI agents and automations for sales teams',
  answer: [
    'Sales teams hand off the follow-up first: an AI agent that finds deals with no reply in five days and drafts the next email, and a lead list that fills itself from the inbox.',
    'In 50agents you describe each job to Captain in a sentence; it builds the AI agent, automation or app in HubSpot, Gmail, Slack and the rest of your 2,300+ apps, and every email waits for your yes.',
  ],
  updated: '2026-11-19',
  jobs: [
    { title: 'Follow up quiet deals', kind: 'ai', href: '/use-cases/follow-up-quiet-hubspot-deals', body: 'Each weekday morning, an AI agent finds HubSpot deals with no reply in 5 days, reads the last thread and drafts a follow-up in it for you to approve.', ask: 'Set up an AI agent that finds my HubSpot deals with no reply in 5 days every weekday at 9:00 and drafts a follow-up email for me to approve' },
    { title: 'Track leads from your inbox', kind: 'app', href: '/use-cases/lead-tracker-from-your-inbox', body: 'A leads app with a pipeline board and a Follow up list. Its AI agent adds new people asking to buy from the last day’s email and marks leads Replied when they answer.', ask: 'Track my leads and follow up' },
    { title: 'Log and announce every new contact', kind: 'auto', href: '/use-cases/hubspot-contacts-to-google-sheets-and-slack', body: 'Each new HubSpot contact becomes a row in your Google Sheet and a post in a Slack channel, the same way every time.', ask: 'Set up an automation: every new HubSpot contact is added as a row to my Google Sheet and posted in a Slack channel' },
    { title: 'Research each new lead before the call', kind: 'browser', body: 'In the leads app, Scout, a browser agent, reads each new lead’s company website and adds a note: what they do, roughly how big, one thing worth knowing.' },
    { title: 'Send the pipeline to the team on Monday', kind: 'ai', body: 'An AI agent reads open deals in HubSpot every Monday and sends you what moved, what stalled and what closes this month.', ask: 'Set up an AI agent that reads my open HubSpot deals every Monday at 9:00 and sends me what moved, what stalled and what closes this month' },
  ],
  useCases: [
    { href: '/use-cases/follow-up-quiet-hubspot-deals', kind: 'ai', title: 'Follow up quiet HubSpot deals', line: 'Drafts the next email on deals that went silent.' },
    { href: '/use-cases/lead-tracker-from-your-inbox', kind: 'app', title: 'Lead tracker from your inbox', line: 'A pipeline built from the emails that bring you work.' },
    { href: '/use-cases/hubspot-contacts-to-google-sheets-and-slack', kind: 'auto', title: 'HubSpot contacts to Google Sheets and Slack', line: 'Every new contact logged and announced.' },
  ],
  apps: [
    { slug: 'hubspot', name: 'HubSpot', icon: APPS.hubspot.icon, line: '18 triggers, including deals created or updated' },
    { slug: 'gmail', name: 'Gmail', icon: APPS.gmail.icon, line: 'Reads threads, sends and replies in them' },
    { slug: 'pipedrive', name: 'Pipedrive', icon: APPS.pipedrive.icon, line: 'New deal, deal stage updated, create activity' },
    { slug: 'slack', name: 'Slack', icon: APPS.slack.icon, line: 'Posts and direct messages' },
    { slug: 'google-sheets', name: 'Google Sheets', icon: APPS.sheets.icon, line: 'Rows added, looked up and updated' },
    { slug: 'calendly', name: 'Calendly', icon: APPS.calendly.icon, line: 'Meeting booked, cancelled or no-show' },
    { slug: 'facebook-lead-ads', name: 'Facebook Lead Ads', icon: APPS.fbleads.icon, line: 'New lead submitted' },
    { slug: 'salesforce', name: 'Salesforce', icon: 'https://stuff.thingsofbrand.com/salesforce.com/images/img1_salesforce.png', line: 'In the catalog of 2,300+ apps' },
  ],
  appsNote: 'Triggers and actions as listed in viaSocket’s catalog, read 19 Nov 2026. Each name opens what you can build on that app.',
  example: {
    h2: 'Worked example: the quiet deals AI agent',
    intro: 'Most deals that die go quiet first. This AI agent runs at 9:00 on weekdays, reads your open HubSpot deals, picks the ones with no reply in five days and drafts a short follow-up in the same Gmail thread. Nothing is sent until you tap Approve and send.',
    ask: 'Set up an AI agent that finds my HubSpot deals with no reply in 5 days every weekday at 9:00 and drafts a follow-up email for me to approve',
    view: {
      type: 'agent',
      face: 'writer',
      name: 'Quiet deals follow-up',
      kindWord: 'AI agent',
      status: 'Live · every weekday at 9:00',
      need: {
        type: 'need', face: 'writer', who: 'Quiet deals follow-up', from: 'AI agent', when: '9:03', label: 'Send an email', app: APPS.gmail,
        title: 'Follow up with Parkside Dental',
        mail: { to: 'owen@parkside.example', subject: 'Re: Proposal for the two new clinics', body: ['Hi Owen,', 'Picking this back up: is the proposal still on the table for January? If the scope needs trimming for budget, I can send a two-clinic version this week.', 'Best,', 'Alex'] },
        choices: ['Approve and send', 'Change', 'Decline'],
      },
      latest: { title: '14 open deals, 3 quiet: 3 follow-ups drafted', when: 'Today 9:02, on schedule', summary: 'Parkside Dental, Laurent Studio and Oakridge Builders have had no reply for 5 to 8 days. One follow-up each, in the same thread.', state: 'Waits on you' },
      runs: [
        { title: '13 open deals, 1 quiet: 1 follow-up drafted', when: 'Yesterday 9:01', state: 'Done' },
        { title: '13 open deals, none quiet', when: 'Monday 9:02', state: 'Done' },
      ],
    },
    caption: 'The AI agent’s page in 50agents: a follow-up waiting for approval, its latest run and earlier runs. Example data.',
    after: [
      'Change it by telling it: "skip deals under $1,000", "wait 7 days instead", "never follow up more than twice". Each change is a version you can undo.',
      'Want the method for any tool? Read [how to automate lead follow-up from Gmail](/guides/how-to-automate-lead-follow-up-from-gmail).',
    ],
  },
  notYet: [
    'It does not make calls or send SMS; follow-ups go by email from Gmail.',
    'It drafts, it does not negotiate: discounts and terms stay with you.',
    'It does not send sequences to cold lists; it follows up people already in your pipeline.',
  ],
  guides: ['how-to-automate-lead-follow-up-from-gmail', 'how-to-build-a-simple-crm-without-code', 'how-to-send-new-hubspot-contacts-to-slack'],
  faqs: [
    { q: 'Can an AI agent send follow-ups on its own?', a: 'Not by default. Each email it drafts waits in Needs you; you can give an AI agent more freedom once its drafts need no edits.' },
    { q: 'Does it work with Pipedrive or Salesforce instead of HubSpot?', a: 'Both are in viaSocket’s catalog. Name your CRM in the sentence to Captain and it plans with that app.' },
    { q: 'Will it update deals in HubSpot?', a: 'It can when the job needs it, and any change in your apps asks you first.' },
  ],
};

export default r;
