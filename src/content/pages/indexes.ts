// The five index pages (pages-brief B9): a heading, two lines and a card for every child (B1, B4, B5, B6, B7).
import type { Kind } from '@/site/types';
import { COMPARE_LIST, GUIDE_LIST, ROLE_LIST, USE_CASE_LIST } from './catalog';
import { TERMS } from '@/content/learn';

export type Card = { href: string; title: string; line?: string; kind?: Kind };
export type IndexPage = {
  path: string;
  crumb: string;
  title: string;
  description: string;
  h1: string;
  lines: [string, string];
  groups: { head?: string; cards: Card[] }[];
  updated: string;
};

const KIND_GROUPS: [Kind, string][] = [['ai', 'AI agents'], ['auto', 'Automations'], ['app', 'Apps'], ['browser', 'Browser agents']];
const groupBy = <T extends { group: string }>(xs: T[]) => [...new Set(xs.map(x => x.group))].map(g => ({ g, xs: xs.filter(x => x.group === g) }));

export const INDEXES: IndexPage[] = [
  {
    path: '/use-cases',
    crumb: 'Use cases',
    title: '12 jobs to hand to AI agents and automations | 50agents',
    description:
      'Twelve ready-made jobs for a small business: chase invoices, follow up deals, log payments, watch prices. Each one is a sentence you give Captain.',
    h1: 'Use cases: twelve jobs you can hand off today',
    lines: [
      'Each of these is a Playbook in the 50agents app: one sentence you give Captain, which plans it for your business and builds it when you approve.',
      'They are grouped by what Captain builds: an AI agent, an automation, an app or a browser agent.',
    ],
    groups: KIND_GROUPS.map(([k, head]) => ({
      head,
      cards: USE_CASE_LIST.filter(u => u.kind === k).map(u => ({ href: `/use-cases/${u.slug}`, title: u.title, line: u.line, kind: u.kind })),
    })),
    updated: '2026-11-19',
  },
  {
    path: '/compare',
    crumb: 'Compare',
    title: '50agents compared with Zapier, Make, n8n and more | 50agents',
    description:
      'Honest comparisons of 50agents with Zapier, Make, n8n, Lindy, Glide and others: dated prices, sourced facts, and who should stay where they are.',
    h1: 'Compare 50agents with the tools you know',
    lines: [
      'Every fact about another tool here links to its own page and says the date we read it. Each page also says where the other tool is the better pick.',
      'Alternatives pages list several options for one tool; head-to-head pages put 50agents and one tool side by side.',
    ],
    groups: groupBy(COMPARE_LIST).map(({ g, xs }) => ({ head: g, cards: xs.map(c => ({ href: `/compare/${c.slug}`, title: c.title, line: c.line })) })),
    updated: '2026-11-19',
  },
  {
    path: '/guides',
    crumb: 'Guides',
    title: 'Guides to AI agents, automations and apps | 50agents',
    description:
      'Thirty how-to guides for small businesses: build an AI agent, automate invoice reminders, monitor competitor prices. Each works with any tool.',
    h1: 'Guides: how to do the job, with any tool',
    lines: [
      'Each guide teaches a method you can follow in any tool, then shows it done in 50agents as one worked example.',
      'Every guide has a "what can go wrong" section and the date it was last checked.',
    ],
    groups: groupBy(GUIDE_LIST).map(({ g, xs }) => ({ head: g, cards: xs.map(c => ({ href: `/guides/${c.slug}`, title: c.title })) })),
    updated: '2026-11-19',
  },
  {
    path: '/learn',
    crumb: 'Learn',
    title: 'AI agent and automation glossary: 20 terms | 50agents',
    description:
      'Twenty terms in plain words: AI agent, automation, trigger, webhook, MCP, human in the loop and more, each with a real example and what it is not.',
    h1: 'The words behind AI agents and automation',
    lines: [
      'Twenty terms, each defined in two sentences you can quote, with one real example built in 50agents.',
      'Each page also says which term it gets mixed up with, and how they differ.',
    ],
    groups: [{ cards: TERMS.map(t => ({ href: `/learn/${t.slug}`, title: t.term, line: t.definition[0] })) }],
    updated: '2026-11-19',
  },
  {
    path: '/for',
    crumb: 'For teams',
    title: 'AI agents and automations by team | 50agents',
    description:
      'What sales, support, finance, operations, ecommerce, agency, HR and founder-led teams hand to AI agents and automations first, with real examples.',
    h1: 'What each team hands off first',
    lines: [
      'Eight pages, one per role, each with the five jobs that role usually hands off first and one worked example.',
      'Each links to the use cases and the apps that fit that team.',
    ],
    groups: [{ cards: ROLE_LIST.map(r => ({ href: `/for/${r.slug}`, title: r.title, line: r.line })) }],
    updated: '2026-11-19',
  },
];

export const indexOf = (path: string) => INDEXES.find(i => i.path === path)!;
