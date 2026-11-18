// Guide 26 (pages-brief B5). Research: Slack help (Google Calendar for Slack), Slack's "Today" briefing post, Zapier, n8n
// and Tray results for "daily calendar summary slack", read 19 Nov 2026. 50agents: the "tomorrow" template.
import type { Guide } from './types';
import { APPS } from './apps';

const g: Guide = {
  slug: 'how-to-get-a-daily-calendar-summary-in-slack',
  n: 26,
  group: 'Email and calendar',
  kind: 'ai',
  title: 'How to get a daily calendar summary in Slack | 50agents',
  description:
    'Get a daily calendar summary in Slack: the Google Calendar app on paid Slack plans, an automation, or an AI agent that sends tomorrow’s meetings each evening.',
  h1: 'How to get a daily calendar summary in Slack',
  short:
    'On a paid Slack plan, the Google Calendar for Slack app can send you a daily schedule: open the app’s Home tab, then Settings, and pick the time. On a free plan, or if you want tomorrow’s meetings the evening before with what to prepare, use an automation or an AI agent that reads your calendar at a set time and sends you a direct message.',
  published: '2026-11-19',
  updated: '2026-11-19',
  sections: [
    {
      id: 'options',
      h2: 'Your options',
      body: [
        {
          table: {
            head: ['Option', 'Needs', 'Gives you'],
            rows: [
              ['Google Calendar for Slack, daily schedule', 'A paid Slack plan ([Slack](https://slack.com/help/articles/206329808))', 'Today’s events each morning, at a time you pick in the app’s settings'],
              ['Slack’s "Today" briefing', 'In open beta from May 2026, Enterprise plans with AI first ([Slack](https://slack.com/blog/news/today-daily-briefing))', 'An agenda from Google or Outlook calendars among other things'],
              ['An automation (calendar, then Slack)', 'An automation tool', 'A fixed list at a fixed time; free Slack works'],
              ['An AI agent', 'An AI agent builder', 'The list plus judgement: clashes, gaps, what to prepare'],
            ],
          },
        },
        { p: 'The built-in app is the least work. It sends today’s schedule; if you plan the night before, or want a line on each meeting, build your own.' },
      ],
    },
    {
      id: 'steps',
      h2: 'How to set it up, step by step',
      body: [
        {
          steps: [
            { title: 'Pick the calendar and the window', body: 'Your primary calendar, or a shared team one. Today from 00:00 to 23:59, or tomorrow, in your timezone.' },
            { title: 'Pick the time', body: '18:00 for tomorrow lets you prepare tonight; 8:00 for today is a morning check.' },
            { title: 'Send it to yourself, not a channel', body: 'A direct message keeps private event titles private. Post team schedules to a channel only from a team calendar.' },
            { title: 'Decide what each line shows', body: 'Time, title, who, and where (room or video link). Skip descriptions; they are long and often private.' },
            { title: 'Handle the edge cases', body: 'All-day events, declined invites, recurring events moved this once, and travel across timezones. Test a day with each.' },
          ],
        },
      ],
    },
    {
      id: 'example',
      h2: 'A worked example in 50agents',
      body: [
        { p: 'In 50agents this is an AI agent: Captain builds it from one sentence with Google Calendar and Slack. Each evening it reads tomorrow’s meetings and sends you one message: the meetings in order, any clash, and anything worth preparing. If a step would reach other people, it asks you first.' },
        { ask: 'Set up an AI agent that sends me tomorrow\'s meetings from Google Calendar in Slack every day at 18:00' },
        {
          view: {
            type: 'plan',
            ask: 'Set up an AI agent that sends me tomorrow\'s meetings from Google Calendar in Slack every day at 18:00',
            face: 'booker',
            name: 'Tomorrow, in one message',
            job: 'Each evening, sends you tomorrow’s meetings in Slack',
            steps: ['Read tomorrow’s events in Google Calendar', 'Note clashes and back-to-back meetings', 'Send you one Slack message with the day in order'],
            when: 'Every day at 18:00',
            uses: [APPS.calendar, APPS.slack],
            asksFirst: 'Any change in your apps',
          },
          caption: 'Captain’s plan card for the evening summary in 50agents. Example data.',
        },
        {
          view: { type: 'slack', channel: 'direct message', from: '50agents', time: '18:00', lines: ['Tomorrow, Thu 20 Nov: 4 meetings', '9:30 Weekly team (30 min, Meet)', '11:00 Northgate Physio, scope call (45 min). Their reply is in your inbox.', '11:30 Clash: dentist (personal), overlaps the call', '15:00 Accountant, Q3 VAT (Zoom)'] },
          caption: 'The message it sends. Example data.',
        },
      ],
    },
  ],
  pair: { href: '/use-cases/tomorrows-meetings-in-slack', label: 'Build it: tomorrow’s meetings in Slack', line: 'The ready-made version, with the exact ask and how to change the time.' },
  wrong: [
    { title: 'No schedule on free Slack', body: 'The Google Calendar app’s daily schedule needs a paid plan. Use an automation or an AI agent instead.' },
    { title: 'Times off by an hour', body: 'The tool used UTC or the wrong timezone. Set the window and the send time in your timezone.' },
    { title: 'Private events in a channel', body: '"Doctor" or "Interview: Jane Doe" posted for the team. Send personal schedules as direct messages.' },
    { title: 'Declined meetings still listed', body: 'Filter out events you declined, and say which are tentative.' },
    { title: 'Status sync fights you', body: 'Slack’s calendar status follows your primary calendar only and will not override a status you set yourself, according to Slack’s help. Expect gaps there.' },
  ],
  faqs: [
    { q: 'Can Slack show my daily schedule?', a: 'Yes, on paid plans, through the Google Calendar for Slack app’s daily schedule notification. Turn it on in the app’s Home tab, under Settings.' },
    { q: 'Can I get tomorrow’s meetings the night before?', a: 'Not from the built-in app, which sends today’s schedule. An automation or AI agent on an evening schedule can.' },
    { q: 'Does it work with Outlook calendars?', a: 'Slack has an Outlook Calendar app too, and automation tools connect to Outlook. The steps above are the same.' },
  ],
  sources: [
    { label: 'Slack help: Google Calendar for Slack', href: 'https://slack.com/help/articles/206329808' },
    { label: 'Slack: Today, your daily briefing (6 May 2026)', href: 'https://slack.com/blog/news/today-daily-briefing' },
  ],
  related: ['how-to-triage-your-inbox-with-ai', 'how-to-automate-weekly-reports-by-email', 'ai-agents-for-small-business-10-jobs-that-work-today'],
};

export default g;
