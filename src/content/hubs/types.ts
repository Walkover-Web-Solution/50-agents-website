// The typed content of a kind hub (pages-brief B2). Product facts come from the 50agents app's source and the problem
// ledger; competitor facts carry their link and the date read.
import type { Kind, Link } from '@/site/types';

export type HubApp = { name: string; icon?: string; logo?: string; why: string };
export type Other = { name: string; href: string; plan: string; better: string; note: string };

export type Hub = {
  kind: Kind;
  path: string; // '/ai-agents'
  crumb: string; // 'AI agents'
  title: string;
  description: string;
  h1: string;
  answer: [string, string];
  promises: string[];
  hero: { ask: string; plan: { label: string; value: string }[] };
  view: { h2: string; p: string };
  can: string[];
  cant: string[];
  limitsNote: string;
  ucIntro: string;
  extraJobs?: { title: string; body: string; ask?: string }[];
  apps: { intro: string; list: HubApp[] };
  others: { intro: string; list: Other[] };
  faqs: { q: string; a: string }[];
  related: Link[];
  final: { h2: string; p: string; cta: string };
  updated: string;
};
