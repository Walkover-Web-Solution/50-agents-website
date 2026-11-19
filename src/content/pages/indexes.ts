// The index pages (pages-brief B9), hand-written: a heading, one short line and a link card for every child, in groups.
// /use-cases is built from the use case pages (PAGES), /learn from the glossary JSONs and /for from the role JSONs, so a new
// page shows up by itself.
import type { Kind } from '@/site/types';
import { GUIDE_LIST } from './catalog';
import { ROLES } from '@/content/for/pages';
import { TERMS } from '@/content/learn';
import { PAGES } from '@/content/use-cases/pages';

export type Card = { href: string; title: string; line?: string; kind?: Kind };
export type IndexPage = {
  path: string;
  crumb: string;
  title: string;
  description: string;
  h1: string;
  line: string; // one short line under the heading, 14 words at most (D254)
  groups: { head?: string; p?: string; cards: Card[] }[];
  /** Cards filtered in the browser by kind chips (All, AI agent, ...); every card stays in the HTML. */
  filter?: boolean;
  updated: string; // ISO date, for JSON-LD only: no date is shown on the page (D254)
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
    line: 'Each job is one sentence you give Captain. Filter by what it builds.',
    filter: true,
    groups: [{ cards: KIND_ORDER.flatMap(k => PAGES.filter(u => u.kind === k))
      .map(u => ({ href: `/use-cases/${u.slug}`, title: u.h1, line: `${u.build.name}: ${u.build.line}`, kind: u.kind })) }],
    updated: '2026-11-19',
  },
  {
    path: '/guides',
    crumb: 'Guides',
    title: 'Guides to AI agents, automations and apps | 50agents',
    description:
      'How-to guides for small businesses: build an AI agent, automate invoice reminders, monitor competitor prices. Each method works with any tool.',
    h1: 'Guides: how to do the job, with any tool',
    line: 'How to do each job in any tool, then done once in 50agents.',
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
    line: 'Each term in two plain sentences, with a real example built in 50agents.',
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
    line: 'One page per team: the jobs it hands off first, and a worked example.',
    groups: [{ cards: ROLES.map(r => ({ href: `/for/${r.slug}`, title: `For ${r.label === 'HR' ? 'HR' : r.label.toLowerCase()}`, line: r.answer[0] })) }],
    updated: '2026-11-19',
  },
];

export const indexOf = (path: string) => INDEXES.find(i => i.path === path)!;
