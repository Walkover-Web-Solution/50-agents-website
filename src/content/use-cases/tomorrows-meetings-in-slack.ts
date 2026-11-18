// Use case 12 (pages-brief B1): tomorrow's meetings in Slack every evening. An AI agent.
// Product facts: the Playbook "Tomorrow, in one message" (templates/list.ts); schedules in the workspace's time zone
// (agents/server/wake.ts); every send asks first until allowed in Settings, Autonomy (settings/rules.ts, autonomy.ts).
// Catalog: catalog.ts, read 19 Nov 2026. Research: scratchpad research-B, read 19 Nov 2026 (Slack's Google Calendar
// app already offers a night-before rundown; the page says so).
import type { UseCase } from '@/site/types';
import { chips, iconOf } from './catalog';

const page: UseCase = {
  slug: 'tomorrows-meetings-in-slack',
  kind: 'ai',
  title: 'Tomorrow’s Google Calendar in Slack each evening | 50agents',
  description:
    'For a daily calendar summary in Slack, set up an AI agent that reads tomorrow’s Google Calendar every day at 18:00 and sends you the meetings in one message.',
  h1: 'Tomorrow’s meetings in Slack, every evening at 18:00',
  answer: [
    'To get a daily calendar summary in Slack, tell Captain to set up an AI agent that reads tomorrow’s meetings from Google Calendar every day at 18:00 and sends them to you in Slack.',
    'You get one short message the evening before: the first meeting’s time, each meeting in order with who is coming, all-day events apart, and anything that clashes or that you have not answered yet.',
  ],
  ask: 'Set up an AI agent that sends me tomorrow\'s meetings from Google Calendar in Slack every day at 18:00',
  updated: '2026-11-19',
  published: '2026-11-19',
  promises: ['The evening before, not the same morning', 'Clashes and unanswered invites flagged', 'Reads your calendar, changes nothing'],
  plan: {
    mode: 'building an AI agent',
    name: 'Tomorrow',
    line: 'Tomorrow’s meetings, in one Slack message',
    faces: ['writer'],
    rows: [
      { label: 'When', value: 'Every day at 18:00' },
      { label: 'Apps', value: 'Google Calendar · Slack' },
      { label: 'Asks first', value: 'Sending the message, until you let it' },
    ],
  },
  factsLabel: 'What Slack and Google already do',
  facts: [
    {
      figure: 'Night before',
      text: 'is one of the two times Slack’s own Google Calendar app can send its daily rundown of your schedule; the other is each morning. You set the time in the app’s Home tab.',
      source: 'Slack Marketplace, Google Calendar',
      href: 'https://slack.com/marketplace-pages/google-calendar',
      read: '19 Nov 2026',
    },
  ],
  seeIt: {
    h2: 'What you get: tomorrow, in one message, tonight',
    intro: 'This is the AI agent’s page in 50agents after this evening’s run, with an example calendar. Overview shows the Slack message it wrote; Work lists every evening; Setup shows its instructions.',
  },
  view: {
    type: 'agent',
    agent: {
      name: 'Tomorrow',
      face: 'writer',
      status: 'Next run: Tomorrow 6:00 PM',
      tone: 'ok',
      latest: {
        title: 'Thursday: 5 meetings, first at 9:30',
        when: 'Today 6:00 PM',
        summary: 'Read 7 events on your calendar for Thu 20 Nov and sent you a Slack message.',
        result: {
          type: 'slack',
          channel: 'Direct message to you',
          app: 'Slack',
          lines: [
            { b: 'Thursday 20 Nov:', t: '5 meetings, first at 9:30.' },
            { t: 'All day: Lena out of office.' },
            { b: '9:30 to 10:00', t: 'Weekly standup (Google Meet), team of 6' },
            { b: '11:00 to 12:00', t: 'Lumen Dental, proposal review, with Priya Shah. You have not answered this invite.' },
            { b: '11:30 to 12:00', t: 'Dentist. Clashes with Lumen Dental.' },
            { b: '14:00 to 14:45', t: 'Hiring: designer interview, with Jo Kim' },
            { b: '16:30 to 17:00', t: '1:1 with Ben' },
            { t: 'Left out: 1 event you declined, 1 focus-time block.' },
          ],
        },
      },
      runs: [
        { title: 'Thursday: 5 meetings, first at 9:30', when: 'Today 6:00 PM', status: 'Done' },
        { title: 'Wednesday: 3 meetings, first at 10:00', when: 'Yesterday 6:00 PM', status: 'Done' },
        { title: 'Tuesday: nothing on your calendar', when: 'Mon 17 Nov 6:00 PM', status: 'Done' },
        { title: 'Monday: 4 meetings, first at 9:00', when: 'Sun 16 Nov 6:00 PM', status: 'Done' },
        { title: 'Message waited for your OK', when: 'Sat 15 Nov 6:00 PM', status: 'Waits on you' },
      ],
      instructions: [
        'Every day at 18:00, read tomorrow’s events on my main Google Calendar, in my time zone.',
        'Send me one Slack message: the day and how many meetings, the first meeting’s time, then each meeting in order with its time, title and who is coming. Put all-day events first, on their own line.',
        'Leave out events I declined and focus-time or working-location blocks. Say which invites I have not answered and which meetings overlap.',
        'If tomorrow is empty, say so in one line.',
      ],
      facts: { runs: 'Every day at 6:00 PM', apps: ['google-calendar', 'slack'], alone: 'Reads your calendar; sends you its message (allowed in Autonomy)', asks: 'Anything else it would change or send' },
    },
  },
  howH2: 'How it sends tomorrow’s meetings to Slack, step by step',
  planParts: [
    { title: 'Its job', body: 'Read tomorrow’s meetings and send them to you in Slack, the evening before.' },
    { title: 'Instructions', body: 'Which calendar, what to leave out, how to show clashes and unanswered invites.' },
    { title: 'Its apps', body: 'Google Calendar to read, Slack to send. Connected once in the chat.' },
    { title: 'When it runs', body: 'Every day at 18:00, in your workspace’s time zone.' },
    { title: 'Asks you first', body: 'Sending the message. Reading runs on its own.' },
  ],
  steps: [
    { title: 'You ask, Captain plans it', body: 'Say the sentence or tap "Tomorrow, in one message". The plan shows Google Calendar and Slack, every day at 18:00, and that sending asks first. Tap Build it and it runs once, so you see tomorrow straight away.' },
    { title: 'At 18:00 it reads tomorrow', body: 'It lists tomorrow’s events on your calendar, midnight to midnight in your workspace’s time zone, with each one’s time, attendees and your answer to the invite.' },
    { title: 'It decides what matters', body: 'This is the judgement part: declined events and focus blocks go, all-day events go on their own line, overlaps are named, invites you have not answered are flagged.' },
    { title: 'It writes one message', body: 'The day, how many meetings and when the first starts, then each meeting in order. An empty day is one line, so you know it ran.' },
    { title: 'It lands in Slack', body: 'At first the message waits in Needs you; once you let it send on its own in Settings, Autonomy, it arrives every evening. Each evening’s run is under Work.' },
  ],
  uses: [
    { app: 'googlecalendar', icon: iconOf('google-calendar'), name: 'Google Calendar', why: 'Read only: tomorrow’s events with times, attendees and your replies. It changes nothing on your calendar.', chips: chips('google-calendar', ['List all Events']) },
    { app: 'slack', icon: iconOf('slack'), name: 'Slack', why: 'Sends the message to you as a direct message, or to a channel you name.', chips: chips('slack', ['Send Direct Message', 'Send Message']) },
  ],
  usesNote: 'The actions it can call, named as viaSocket’s catalog of 2,300+ apps lists them, read 19 Nov 2026.',
  asksFirst:
    'The Slack message, until you let it go on its own. Every AI agent starts out asking before it sends anything, so the first evenings it waits in Needs you. Allow it to send in Settings, Autonomy, and it arrives at 18:00 by itself. Reading your calendar never asks.',
  table: {
    h2: 'What goes in tomorrow’s message',
    label: 'What the message covers',
    cols: ['Part', 'What it shows', 'Ask Captain'],
    intro: 'The ask covers tomorrow’s meetings. These are the details that make an evening brief useful; Captain’s plan writes most into its instructions, and each is one sentence to change.',
    rows: [
      { when: 'Each meeting', tone: 'Time, title and who is coming, in order', ask: '' },
      { when: 'Clashes and open invites', tone: 'Overlaps named; invites you have not answered flagged', ask: '' },
      { when: 'Left out', tone: 'Declined events, focus time, working location', ask: '' },
      { when: 'Video links', tone: 'The meeting link next to each call', ask: 'Add each meeting’s video link to the message' },
      { when: 'Fridays', tone: 'Monday’s meetings instead of Saturday’s', ask: 'On Fridays, send me Monday’s meetings instead of Saturday’s, and skip weekends' },
      { when: 'Prep notes', tone: 'One line on what each external meeting is about, from your email', ask: 'For meetings with people outside my company, add one line on what we last emailed about' },
    ],
    note: 'Google Calendar marks all-day events with a date instead of a time, and keeps your answer to each invite as needsAction, accepted, tentative or declined; that is what the message reads.',
    sources: [{ label: 'Google Calendar API, events', href: 'https://developers.google.com/workspace/calendar/api/v3/reference/events' }],
  },
  yoursIntro: 'Change the time, the place or what it adds. Each of these builds a different AI agent; copy one into Captain.',
  variations: [
    'Set up an AI agent that sends me tomorrow\'s meetings from Google Calendar in Slack every weekday at 17:30, and on Fridays sends Monday\'s',
    'Set up an AI agent that sends today\'s meetings from Google Calendar to the #team channel in Slack every weekday at 8:30',
    'Set up an AI agent that sends me tomorrow\'s meetings from Google Calendar in Slack every day at 18:00, with one line on what I last emailed each person about',
    'Set up an AI agent that sends me tomorrow\'s meetings from Google Calendar by email every day at 18:00',
  ],
  limits: [
    'It reads one calendar unless you name more in its instructions.',
    'It sends at one time a day. It does not remind you before each meeting.',
    'Times follow your workspace’s time zone in Settings; if you travel, change it there.',
    'The message is a snapshot at 18:00. A meeting added later that evening is not in it.',
  ],
  otherWaysH2: 'Other ways to get your calendar in Slack',
  otherWays: [
    {
      title: 'Slack’s Google Calendar app',
      body: 'It can send a daily rundown each morning or the night before, plus /gcal today and /gcal tomorrow, on a paid Slack plan. If a plain list is all you need, it is the simpler choice; it does not flag clashes or add notes.',
      sources: [
        { label: 'Slack Marketplace', href: 'https://slack.com/marketplace-pages/google-calendar' },
        { label: 'Slack help', href: 'https://slack.com/help/articles/206329808-Google-Calendar-for-Slack' },
      ],
    },
    {
      title: 'Google Calendar’s daily agenda',
      body: 'Turn on Daily agenda under Other notifications and Google emails you the day’s schedule. Free, but it comes by email on the same morning, not in Slack the evening before.',
      sources: [{ label: 'Google Calendar help', href: 'https://support.google.com/a/users/answer/11387073' }],
    },
    {
      title: 'Zapier or n8n',
      body: 'Zapier has "Send daily calendar summary and reminders from Google Calendar to Slack". The templates we read all send today’s schedule in the morning, and one hard-codes a time zone.',
      sources: [{ label: 'Zapier template', href: 'https://zapier.com/templates/details/5ac3281e313f1d5b99143140a41d83cb58d4440ea754d71e4c986eefd77d6c2b' }],
    },
  ],
  faqs: [
    { q: 'Can Slack post my calendar every day?', a: 'Yes: Slack’s own Google Calendar app sends a daily rundown, in the morning or the night before. This AI agent does the same and also names clashes, unanswered invites and anything you ask it to add.' },
    { q: 'Why the evening before instead of the morning?', a: 'So an early meeting or a clash is not news at 8:55. At 18:00 you can still move something or prepare. Change the time in one sentence if you prefer mornings.' },
    { q: 'Why are the times wrong?', a: 'Usually a time zone mismatch. This AI agent reads and writes in your workspace’s time zone, set in Settings; if that is right, the times match your calendar.' },
    { q: 'Can it post to a channel instead of a direct message?', a: 'Yes, name the channel. A post others will see is a send to people outside you, so it asks before posting unless you allow that too, which asks you once more.' },
    { q: 'Can it cover several calendars?', a: 'Yes, name them in its instructions, for example your work and family calendars, and it reads each.' },
  ],
  related: [
    { href: '/use-cases/ai-email-triage-every-morning', kind: 'ai', title: 'AI email triage every morning', line: 'The other end of the day: your inbox sorted at 8:00.' },
    { href: '/use-cases/weekly-stripe-revenue-summary', kind: 'ai', title: 'Weekly Stripe revenue summary', line: 'Another one-message AI agent: last week’s money, each Monday.' },
    { href: '/use-cases/hubspot-contacts-to-google-sheets-and-slack', kind: 'auto', title: 'HubSpot contacts to Sheets and Slack', line: 'New contacts posted in a Slack channel as they come in.' },
  ],
  up: [
    { href: '/ai-agents', label: 'AI agents you can build' },
    { href: '/integrations/google-calendar/slack', label: 'Google Calendar and Slack' },
    { href: '/integrations/slack', label: 'Slack' },
    { href: '/guides/how-to-get-a-daily-calendar-summary-in-slack', label: 'How to get a daily calendar summary in Slack' },
  ],
  finalH2: 'Get tomorrow in Slack tonight',
  byline: 'Captain builds this AI agent from the ask above, the same words as the "Tomorrow, in one message" Playbook in the 50agents app; the views above are drawn from that app, filled with example data.',
};

export default page;
