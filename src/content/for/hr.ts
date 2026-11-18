// Role page: HR (pages-brief B7). Every HR app named here is in viaSocket's catalog, read 19 Nov 2026 from
// plug-service.viasocket.com/api/v1/plugins/recommend/integrations?service=<slug> (Keka, Personio, Greenhouse, Recruitee,
// Breezy HR, Teamtailor, Calamari, RotaCloud, Zoho People). BambooHR is not in the catalog today, so it is not named.
// Triggers and actions quoted are the catalog's own names.
import type { Role } from '@/content/guides/types';
import { APPS } from '@/content/guides/apps';

const r: Role = {
  slug: 'hr',
  role: 'HR teams',
  kind: 'auto',
  title: 'AI agents and automations for HR teams | 50agents',
  description:
    'What HR teams hand off first: approved leave on the team calendar, new hires announced, daily applicant summaries, interview briefs and staff policy questions drafted.',
  h1: 'AI agents and automations for HR teams',
  answer: [
    'HR teams hand off the copying between the HR system and everything else first: approved leave onto the team calendar, a new hire announced the day the offer is signed, a daily summary of applicants.',
    'In 50agents Captain builds these on HR apps in viaSocket’s catalog such as Keka, Personio, Greenhouse and Recruitee; decisions about people stay with people.',
  ],
  updated: '2026-11-19',
  jobs: [
    { title: 'Put leave on the team calendar', kind: 'auto', body: 'When an absence is created in Personio, add an all-day event to the team’s Google Calendar with the person and the dates.', ask: 'Set up an automation: when an absence period is created in Personio, add an all-day event for it to our Team calendar in Google Calendar' },
    { title: 'Announce new hires', kind: 'auto', body: 'When a candidate is marked hired in Greenhouse, add them to the onboarding sheet and post a welcome in your team channel (the post asks you first).', ask: 'Set up an automation: when a candidate is hired in Greenhouse, add them as a row to my Onboarding sheet and post a welcome in #team' },
    { title: 'A daily applicant summary', kind: 'ai', body: 'Each morning, an AI agent reads yesterday’s new applications in Greenhouse or Recruitee and sends you a short list by role, with what stands out in each.', ask: 'Set up an AI agent that every weekday at 9:00 reads yesterday’s new applications in Greenhouse and sends me a short summary by job' },
    { title: 'Brief interviewers', kind: 'auto', body: 'When an interview is scheduled in Greenhouse, send the interviewer the candidate’s name, role and time. Each email waits for your yes today.', ask: 'Set up an automation: when a new interview is scheduled in Greenhouse, email the interviewer the candidate, the job and the time' },
    { title: 'Answer staff policy questions', kind: 'ai', body: 'An AI agent reads questions sent to hr@ and drafts answers from your handbook in its memory; it leaves anything personal or sensitive for you.', ask: 'Set up an AI agent that reads new emails to hr@, drafts answers to policy questions from our handbook, and leaves anything personal for me' },
  ],
  useCases: [
    { href: '/use-cases/ai-replies-to-support-email', kind: 'ai', title: 'AI replies to email', line: 'The same pattern for an hr@ inbox: drafts from your handbook.' },
    { href: '/use-cases/customer-requests-desk', kind: 'app', title: 'Requests desk', line: 'Staff requests tracked by status instead of a shared inbox.' },
    { href: '/use-cases/tomorrows-meetings-in-slack', kind: 'ai', title: 'Tomorrow’s meetings in Slack', line: 'Tomorrow’s interviews in one evening message.' },
  ],
  apps: [
    { slug: 'keka', name: 'Keka', icon: APPS.keka.icon, line: 'Employee clocks in; create leave request, find employees' },
    { slug: 'personio', name: 'Personio', icon: APPS.personio.icon, line: 'Person created, absence period created, employment started' },
    { slug: 'greenhouse', name: 'Greenhouse', icon: APPS.greenhouse.icon, line: 'New application, candidate hired, interview scheduled' },
    { slug: 'recruitee', name: 'Recruitee', icon: APPS.recruitee.icon, line: 'New candidates, candidate moved to stage' },
    { slug: 'breezy-hr', name: 'Breezy HR', icon: APPS.breezy.icon, line: 'New candidate, new active position' },
    { slug: 'teamtailor', name: 'Teamtailor', icon: APPS.teamtailor.icon, line: 'Find or create candidate, create note' },
    { slug: 'calamari', name: 'Calamari', icon: APPS.calamari.icon, line: 'Search people, find absence requests' },
    { slug: 'rotacloud', name: 'RotaCloud', icon: APPS.rotacloud.icon, line: 'Create shift, create leave' },
  ],
  appsNote: 'Triggers and actions as listed in viaSocket’s catalog, read 19 Nov 2026. Keka has one trigger (Employee Clocks In) and 91 actions; Zoho People is also listed, with two actions.',
  example: {
    h2: 'Worked example: approved leave lands on the team calendar',
    intro: 'Nobody should have to check the HR system to know who is off on Thursday. This automation runs when an absence is created in Personio and adds an all-day event to the team’s calendar. Writing to your own calendar runs on its own.',
    ask: 'Set up an automation: when an absence period is created in Personio, add an all-day event for it to our Team calendar in Google Calendar',
    view: {
      type: 'track',
      name: 'Leave on the team calendar',
      status: 'Live · runs on each new absence in Personio',
      today: [['Runs today', '4'], ['Did something', '4'], ['Did not work', '0'], ['Credits today', '8']],
      stations: [
        { mark: 'app', app: APPS.personio, say: 'When an absence period is created in Personio', passes: ['employee', 'type', 'start', 'end'] },
        { mark: 'app', app: APPS.calendar, say: 'Create an all-day event in "Team": "Priya off (holiday)"', did: 'Ran', values: [['Dates', '24 to 28 Nov']] },
      ],
    },
    caption: 'The automation’s Overview in 50agents: today’s runs and its two steps. Example data.',
    after: [
      'Want only approved leave? Ask Captain to add "only when the status is approved"; Personio also has an "Absence Period Status Updated" trigger.',
      'Leave types stay private if you ask: "show only the name, not the type of leave".',
    ],
  },
  notYet: [
    'BambooHR is not in viaSocket’s catalog today, so it cannot be connected.',
    'It does not run payroll, and it never decides on hiring, pay or leave; those stay with people.',
    'Some HR apps have few triggers (Keka has one), so jobs on them run on a schedule rather than the moment something changes.',
    'Posting to a team Slack channel waits for your approval today.',
  ],
  guides: ['how-to-automate-data-entry-between-two-apps', 'how-to-draft-email-replies-with-ai-and-still-check-them', 'how-to-give-an-ai-agent-access-to-your-apps-safely'],
  faqs: [
    { q: 'Which HR apps does it work with?', a: 'Those in viaSocket’s catalog, including Keka, Personio, Greenhouse, Recruitee, Breezy HR, Teamtailor, Calamari, RotaCloud and Zoho People. What you can build depends on each app’s triggers and actions.' },
    { q: 'Is employee data safe?', a: 'Connect only the apps a job needs and keep personal details out of shared channels. Say in the job what may be shared; the AI agents ask before sending anything to people.' },
    { q: 'Can AI screen candidates?', a: 'It can summarise applications for you. Decisions about people should stay with people, and in many places the law says so.' },
  ],
};

export default r;
