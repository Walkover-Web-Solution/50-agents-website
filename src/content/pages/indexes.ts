// The index pages (pages-brief B9), hand-written: a heading, two lines and a link card for every child, in groups.
// /use-cases is built from the use case pages (PAGES), /learn from the glossary JSONs and /for from the role JSONs, so a new
// page shows up by itself.
import type { Kind } from '@/site/types';
import { COMPARE_LIST, GUIDE_LIST } from './catalog';
import { ROLES } from '@/content/for/pages';
import { TERMS } from '@/content/learn';
import { PAGES } from '@/content/use-cases/pages';
import { HUBS } from '@/content/hubs';

export type Card = { href: string; title: string; line?: string; kind?: Kind };
export type IndexPage = {
  path: string;
  crumb: string;
  title: string;
  description: string;
  h1: string;
  lines: [string, string];
  groups: { head?: string; p?: string; cards: Card[] }[];
  updated: string;
};

/** The ask every index page's button pastes into Captain: a real starting ask (app templates/list.ts). */
export const INDEX_ASK = 'Read my website and tell me what you would take off my plate';

const KIND_ORDER: Kind[] = ['ai', 'auto', 'app', 'browser'];
const groupBy = <T extends { group: string }>(xs: T[]) => [...new Set(xs.map(x => x.group))].map(g => ({ g, xs: xs.filter(x => x.group === g) }));

export const INDEXES: IndexPage[] = [
  {
    path: '/use-cases',
    crumb: 'Use cases',
    title: 'Jobs to hand to AI agents and automations | 50agents',
    description:
      'Ready-made jobs for a small business: chase invoices, follow up deals, log payments, watch prices. Each one is a sentence you give Captain.',
    h1: 'Use cases: jobs you can hand off today',
    lines: [
      'Each of these is a Playbook in the 50agents app: one sentence you give Captain, which plans it for your business and builds it when you approve.',
      'They are grouped by what Captain builds: an AI agent, an automation, an app or a browser agent.',
    ],
    groups: KIND_ORDER.map(k => ({ k, hub: HUBS.find(h => h.kind === k), cards: PAGES.filter(u => u.kind === k) }))
      .filter(g => g.cards.length)
      .map(({ k, hub, cards }) => ({
        head: hub?.crumb ?? k,
        p: hub?.line,
        cards: cards.map(u => ({ href: `/use-cases/${u.slug}`, title: u.h1, line: `${u.build.name}: ${u.build.line}`, kind: u.kind })),
      })),
    updated: '2026-11-19',
  },
  {
    path: '/compare',
    crumb: 'Compare',
    title: '50agents compared with Zapier, Make, n8n and more | 50agents',
    description:
      'Honest comparisons of 50agents with Zapier, Make, n8n, Lindy, Glide and others: sourced facts, and who should stay where they are.',
    h1: 'Compare 50agents with the tools you know',
    lines: [
      'Every fact about another tool here links to its own page. Each page also says where the other tool is the better pick.',
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
      'How-to guides for small businesses: build an AI agent, automate invoice reminders, monitor competitor prices. Each method works with any tool.',
    h1: 'Guides: how to do the job, with any tool',
    lines: [
      'Each guide teaches a method you can follow in any tool, then shows it done in 50agents as one worked example.',
      'Every guide has a "what can go wrong" section.',
    ],
    groups: groupBy(GUIDE_LIST).map(({ g, xs }) => ({ head: g, cards: xs.map(c => ({ href: `/guides/${c.slug}`, title: c.title })) })),
    updated: '2026-11-19',
  },
  {
    path: '/learn',
    crumb: 'Learn',
    title: 'AI agent and automation glossary | 50agents',
    description:
      'The terms in plain words: AI agent, automation, trigger, webhook, MCP, human in the loop and more, each with a real example and what it is not.',
    h1: 'The words behind AI agents and automation',
    lines: [
      'Each term is defined in two sentences you can quote, with one real example built in 50agents.',
      'Each page also says which term it gets mixed up with, and how they differ.',
    ],
    groups: groupBy(TERMS).map(({ g, xs }) => ({ head: g, cards: xs.map(t => ({ href: `/learn/${t.slug}`, title: t.term, line: t.definition[0] })) })),
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
      'One page per role, each with the jobs that role usually hands off first and one worked example.',
      'Each links to the use cases and the apps that fit that team.',
    ],
    groups: [{ cards: ROLES.map(r => ({ href: `/for/${r.slug}`, title: `For ${r.label === 'HR' ? 'HR' : r.label.toLowerCase()}`, line: r.answer[0] })) }],
    updated: '2026-11-19',
  },
];

export const indexOf = (path: string) => INDEXES.find(i => i.path === path)!;
