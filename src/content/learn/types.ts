// A glossary term (pages-brief B6): a 2-sentence definition to quote, one real example built in 50agents (a starting ask
// from app/src/features/templates/list.ts), how it differs from the term people confuse it with, and links.
import type { Kind, Link } from '@/site/types';

export type Term = {
  slug: string;
  term: string; // as people search it: "AI agent"
  title: string; // under about 60 characters
  description: string; // about 140 to 155 characters
  definition: [string, string];
  example: { kind: Kind | 'captain'; name: string; ask: string; body: string[] };
  confused: { with: string; href?: string; body: string[] };
  more?: { h2: string; body: string[] };
  sources?: { label: string; href: string; read: string }[];
  links: Link[];
  updated: string;
};
