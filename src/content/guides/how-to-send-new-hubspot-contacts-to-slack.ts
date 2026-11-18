// Guide 8 (pages-brief B5). The method, for any tool. The ready-to-build version is
// /use-cases/hubspot-contacts-to-google-sheets-and-slack; this page links to it and does not repeat it.
// Research: HubSpot knowledge base (Slack notifications, Slack workflow actions), Zapier, Bardeen, Tray results, read
// 19 Nov 2026. HubSpot's triggers in viaSocket's catalog read the same day.
import type { Guide } from './types';
import { APPS } from './apps';

const g: Guide = {
  slug: 'how-to-send-new-hubspot-contacts-to-slack',
  n: 8,
  group: 'Automations',
  kind: 'auto',
  title: 'How to send new HubSpot contacts to Slack | 50agents',
  description:
    'Send new HubSpot contacts to Slack with a workflow (Professional plans) or an automation tool: trigger on new contacts only, filter the noise, pick the fields.',
  h1: 'How to send new HubSpot contacts to Slack',
  short:
    'HubSpot’s free Slack app does not post new contacts, so you need either a HubSpot workflow with the "Send a Slack notification" action, which needs a Professional or Enterprise plan, or an automation tool that watches HubSpot for new contacts and posts to a channel. Whichever you use, filter to the contacts someone should act on and say who owns each one, or the channel turns into noise within a week.',
  published: '2026-11-19',
  updated: '2026-11-19',
  sections: [
    {
      id: 'options',
      h2: 'Your three options, and what each needs',
      body: [
        {
          table: {
            head: ['Option', 'Needs', 'Posts new contacts?'],
            rows: [
              ['HubSpot’s Slack app, notifications only', 'Any HubSpot plan', 'No. It sends mentions, form submissions, task assignments, chats and activity on linked records ([HubSpot](https://knowledge.hubspot.com/integrations/manage-your-notifications-in-slack)).'],
              ['A HubSpot workflow with "Send a Slack notification"', 'Professional or Enterprise ([HubSpot](https://knowledge.hubspot.com/integrations/use-slack-workflow-actions))', 'Yes, with properties, @mentions of the owner and buttons.'],
              ['An automation tool (Zapier, Make, n8n, 50agents)', 'A HubSpot connection and a Slack connection', 'Yes, from a trigger on new contacts.'],
            ],
          },
        },
        { p: 'If you already pay for a HubSpot Professional hub, the workflow is the cleanest route: HubSpot decides who is new, and you enrol only the contacts you care about. On a free or Starter plan, an automation tool is the way.' },
        { note: 'If the only thing you want is to hear about form fills, check the free notifications first: form submissions are on the list, and they need no workflow at all.' },
      ],
    },
    {
      id: 'trigger',
      h2: 'Choose the trigger carefully: new, or new or updated',
      body: [
        { p: 'Most tools offer two HubSpot triggers that sound alike. Zapier lists both "New Contact" and "Contact Recently Created or Updated" ([Zapier](https://zapier.com/apps/hubspot/integrations/slack)). The second fires every time a property changes, so one contact can post five times in a day.' },
        { p: 'In viaSocket’s catalog, which 50agents uses, HubSpot’s contact trigger is "New Or Updated Contact" (catalog read 19 Nov 2026). When the only trigger fires on updates too, add a check right after it that keeps only contacts created since the last run. Every tool can do this with a filter on the create date.' },
      ],
    },
    {
      id: 'steps',
      h2: 'How to set it up, step by step',
      body: [
        {
          steps: [
            { title: 'Decide which contacts deserve a ping', body: 'All new contacts is rarely right. Pick a rule a salesperson would agree with: from a form, lifecycle stage Lead or later, a country you sell in, or a company email domain.' },
            { title: 'Create the channel and add the app to it', body: 'A dedicated channel such as #new-leads keeps alerts out of chat. For a private channel, add the HubSpot or automation app to the channel first, or posts fail without a sound ([HubSpot](https://knowledge.hubspot.com/integrations/use-slack-workflow-actions)).' },
            { title: 'Set the trigger and the filter', body: 'Trigger on new contacts. If your tool only has new or updated, filter on create date. Then add your rule from step 1 as a second filter.' },
            { title: 'Write the message', body: 'Name, company, email, source, and the owner. Four or five fields read at a glance; fifteen do not. Put a link to the contact record last so people can click through.' },
            { title: 'Handle empty fields', body: 'A contact with no company or no owner prints a blank. Give each field a fallback ("no company given", "unassigned") so the message still reads.' },
            { title: 'Test with a real contact, then watch the first day', body: 'Create a test contact that matches the rule and one that does not. Check that only one posts, then delete both.' },
          ],
        },
      ],
    },
    {
      id: 'example',
      h2: 'A worked example in 50agents',
      body: [
        { p: 'In 50agents you describe it to Captain in one sentence, and it plans an automation: the same steps every time, no AI needed on each run. It reads one real contact from your HubSpot to plan the fields, tests the steps on it with every send held back, and leaves the automation as a draft until you make it live.' },
        { note: 'One thing to know before you build it here: 50agents treats a post to a Slack channel as reaching other people, so today each post waits in Needs you for your yes. Adding the row to your sheet runs on its own. If you want posts with no approval, a HubSpot workflow or another automation tool fits this job better.' },
        { ask: 'Set up an automation: every new HubSpot contact is added as a row to my Google Sheet and posted in a Slack channel' },
        {
          view: {
            type: 'track',
            name: 'New lead to your sheet and Slack',
            status: 'Live · runs on each new HubSpot contact',
            today: [['Runs today', '14'], ['Did something', '9'], ['Did not work', '0'], ['Credits today', '41']],
            stations: [
              { mark: 'app', app: APPS.hubspot, say: 'When a contact is created or updated in HubSpot', passes: ['name', 'email', 'company', 'created', 'owner'] },
              { mark: 'if', say: 'Only contacts created since the last run', passes: ['the contact'] },
              { mark: 'app', app: APPS.sheets, say: 'Add a row to "Leads 2026" in Google Sheets', passes: ['row number'], did: 'Ran' },
              { mark: 'app', app: APPS.slack, say: 'Post in #new-leads: name, company, source, owner', asks: true },
            ],
            tested: 'Tested on your real data. Ran for real: 2 steps.',
          },
          caption: 'The automation’s Overview in 50agents: today in numbers, then each step with the app it uses and the data it hands on. Of 14 runs today, 9 were new contacts; the rest were edits the filter let pass by. The Slack step is marked Asks you first. Example data.',
        },
        {
          view: { type: 'slack', channel: 'new-leads', from: '50agents', time: '10:42', lines: ['New lead: Dana Ruiz, Fieldstone Logistics', 'dana@fieldstone.example · Source: Website form · Owner: Marco'] },
          caption: 'What lands in Slack once you approve it. Example data.',
        },
      ],
    },
  ],
  pair: { href: '/use-cases/hubspot-contacts-to-google-sheets-and-slack', label: 'Build it: HubSpot contacts to Google Sheets and Slack', line: 'The ready-made version with the exact ask, the field mapping and ways to change it.' },
  wrong: [
    { title: 'A CSV import floods the channel', body: 'Importing 400 contacts creates 400 new contacts. Pause the automation before a big import, or filter out the import source.' },
    { title: 'One contact posts again and again', body: 'The trigger fires on updates. Filter on create date, or switch to a new-only trigger if your tool has one.' },
    { title: 'Nothing arrives in a private channel', body: 'The app was never added to the channel. Add it, then send a test.' },
    { title: 'Nobody is tagged', body: 'New contacts often have no owner yet, so the @mention is empty. Post to the channel and let the owner field read "unassigned" until routing runs.' },
    { title: 'Personal data in a busy channel', body: 'Phone numbers and notes in a 60-person channel are more exposure than the job needs. Post the name, company and a link; keep the rest in HubSpot.' },
  ],
  faqs: [
    { q: 'Can HubSpot notify Slack about new contacts without Zapier?', a: 'Yes, with a workflow and the "Send a Slack notification" action, on a Professional or Enterprise plan. The free Slack notifications cover form submissions and mentions, not every new contact.' },
    { q: 'Can I post only qualified leads?', a: 'Yes. In a HubSpot workflow, set the enrolment rule on lifecycle stage or lead status. In an automation tool, add a filter step after the trigger.' },
    { q: 'Can I tag the contact owner in the message?', a: 'HubSpot’s own workflow action can @mention the record owner, for users who have mapped their email. In other tools, look up the owner’s Slack user from their email, or post their name as text.' },
  ],
  sources: [
    { label: 'HubSpot: Manage your HubSpot notifications in Slack (updated 10 Aug 2026)', href: 'https://knowledge.hubspot.com/integrations/manage-your-notifications-in-slack' },
    { label: 'HubSpot: Use Slack workflow actions (updated 10 Aug 2026)', href: 'https://knowledge.hubspot.com/integrations/use-slack-workflow-actions' },
    { label: 'Zapier: HubSpot and Slack integrations', href: 'https://zapier.com/apps/hubspot/integrations/slack' },
    { label: 'viaSocket catalog: HubSpot triggers and actions', href: 'https://plug-service.viasocket.com/api/v1/plugins/recommend/integrations?service=hubspot' },
  ],
  related: ['how-to-automate-data-entry-between-two-apps', 'ai-agent-vs-automation-which-one-you-need', 'how-to-automate-lead-follow-up-from-gmail'],
};

export default g;
