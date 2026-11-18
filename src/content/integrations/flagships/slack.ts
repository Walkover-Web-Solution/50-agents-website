// Slack (pages-brief B3). Triggers and actions: viaSocket's catalog (scripts/snapshot-catalog.mjs), read 19 Nov 2026.
// Slackbot: Slack's own page, read 19 Nov 2026. Add-on "Weekly numbers in Slack": app/src/features/apps/CLAUDE.md.
import type { Flagship } from '../types';

const page: Flagship = {
  slug: 'slack',
  title: 'AI agents, automations and apps for Slack | 50agents',
  description:
    'Connect Slack and tell Captain what to post and when: new leads in a channel, tomorrow’s meetings at 18:00, or an AI agent that acts on a message.',
  answer: [
    'In 50agents you connect Slack and tell Captain what should reach your team there, for example “send me tomorrow’s meetings from Google Calendar in Slack every day at 18:00”.',
    'Captain builds an automation that posts on an event in another app, or an AI agent that reads channels, threads and mentions and decides what to post, reply or ask.',
  ],
  heroAsk: 'Set up an AI agent that sends me tomorrow’s meetings from Google Calendar in Slack every day at 18:00',
  kinds: [
    {
      kind: 'auto',
      does: 'Posts the same message every time something happens elsewhere: a new HubSpot contact, a paid Shopify order, a failed Stripe payment, into the channel you pick.',
      ask: 'Set up an automation: every new HubSpot contact is added as a row to my Google Sheet and posted in a Slack channel',
      uses: ['Send Message'],
    },
    {
      kind: 'ai',
      does: 'Reads what it needs, writes the message, and decides who should see it: tomorrow’s meetings as one note, a reply in a thread when it is mentioned, or a question with buttons when it needs your call.',
      ask: 'Set up an AI agent that sends me tomorrow’s meetings from Google Calendar in Slack every day at 18:00',
      uses: ['Send Direct Message', 'New Mention', 'Send Message as Thread', 'Send Interactive Message'],
    },
    {
      kind: 'browser',
      does: 'Checks websites that have no app, and reports what changed. Slack is where you read the result; the browser agent does the looking.',
      ask: 'Set up a browser agent that checks my competitors’ pricing pages every day at 9:00 and tells me when a price changes',
      uses: [],
    },
    {
      kind: 'app',
      does: 'An app keeps the records; Slack gets the summary. Apps in 50agents have an add-on that posts their weekly numbers in Slack.',
      ask: 'Track my leads and follow up',
      uses: [],
    },
  ],
  groups: [
    { label: 'Messages coming in', line: 'Start on a new message in chosen channels, anywhere in Slack, in a thread, or when someone mentions you or your app.', events: ['New Message Posted in Channel Instant', 'New Message in Channels', 'New Message on Slack', 'New Thread Message Instant', 'New Thread Message', 'New Mention'] },
    { label: 'Sending', line: 'Post or schedule a message to a channel, a person or a thread; send Block Kit layouts, buttons and forms; edit what was sent; add a reaction.', events: ['Send Message', 'Send Direct Message', 'Send Message as Thread', 'Message Private Channel', 'Send Block Kit Message', 'Send Interactive Message', 'Send Block/buttons/Intractive message using AI', 'Edit Channel Message', 'Chat_update slack block or message using messageTs', 'View_open BlockKit Modal using JSON', 'Add Reaction to a Message'] },
    { label: 'Reading', line: 'Pull messages from a channel or thread for a time range, and read thread replies.', events: ['Get Messages from Slack', 'Get Thread Replies'] },
    { label: 'Channels', line: 'Create public or private channels, set a topic, add people, and list or find channels.', events: ['Create Channel', 'Create Private Channel', 'Set Channel Topic', 'Add Users to Channel', 'Find Public channel', 'List all Public Channels', 'List all Private Channels', 'Get all Channel Members'] },
    { label: 'People', line: 'Start when someone joins the workspace or a channel; look up a person and their full profile.', events: ['New User Joined or Updated in Your Org', 'New member join/leave or updated in channel', 'Get User Information', 'Get User Complete Profile Details by ID'] },
    { label: 'Canvases and files', line: 'Create and edit canvases, find their sections, and make a file public.', events: ['Create Canvas', 'Update Canvas', 'Lookup Canvas Sections', 'Make Slack File Public'] },
  ],
  native: {
    head: 'Slack’s own AI, and what 50agents adds',
    body:
      'Slack calls Slackbot its built-in AI agent for personal productivity, on its Business+ and Enterprise+ plans, and it connects to Salesforce’s Agentforce. 50agents is not inside Slack: it uses Slack as one of your 2,300+ apps, so an AI agent or automation can start from HubSpot, Stripe or Gmail and post the outcome in the channel where your team will see it.',
    better: 'For questions about what is already in your Slack, such as finding a decision in old threads, Slackbot works where the messages are and needs nothing set up.',
    sources: [{ label: 'Slack: What is Slackbot', href: 'https://slack.com/intl/en-in/resources/using-slack/what-is-slackbot' }],
  },
  useCases: [
    { slug: 'tomorrows-meetings-in-slack', kind: 'ai', title: 'Tomorrow’s meetings in Slack', line: 'An evening brief of your calendar at 18:00.' },
    { slug: 'hubspot-contacts-to-google-sheets-and-slack', kind: 'auto', title: 'HubSpot contacts to Google Sheets and Slack', line: 'Each new contact posted in a channel.' },
  ],
  guides: [
    { slug: 'how-to-send-new-hubspot-contacts-to-slack', title: 'How to send new HubSpot contacts to Slack' },
    { slug: 'how-to-get-a-daily-calendar-summary-in-slack', title: 'How to get a daily calendar summary in Slack' },
  ],
  faqs: [
    {
      q: 'Can it post into a private channel?',
      a: 'Yes, with Message Private Channel. Slack only lets an app see private channels it has been invited to, so add the app to the channel in Slack first.',
    },
    {
      q: 'Can an AI agent ask me something in Slack before it acts?',
      a: 'Slack’s side is there: Send Interactive Message posts a message with buttons or a form to collect an answer. In 50agents itself, approvals wait in Needs you, on Home and in the chat the request came from.',
    },
    {
      q: 'Will it reply in threads or in the channel?',
      a: 'Either. Send Message as Thread replies under a message, and Send Message posts to the channel or a person. Tell Captain which you want in the ask.',
    },
  ],
  updated: '2026-11-19',
};
export default page;
