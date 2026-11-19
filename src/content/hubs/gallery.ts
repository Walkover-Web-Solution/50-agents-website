// The possibilities gallery on the four kind hubs (D259): "What you can build with <kind>", 20 to 30 jobs per kind under
// team filters. The data lives in gallery.json (so scripts/pages/gates-hubs.mjs can read it) and is typed here.
// `from: 'app'` is a starting ask in the app (agentic-apps/app/src/features/templates/list.ts, `template` is its key);
// `from: 'site'` was written for the site within scripts/pages/product-facts.md and the catalog's real triggers and actions.
import type { Kind } from '@/site/types';
import data from './gallery.json';

export type Team = 'sales' | 'support' | 'finance' | 'operations' | 'ecommerce' | 'personal';

export type GalleryCard = {
  team: Team;
  job: string; // one plain-language job, the card's title
  apps: string[]; // catalog slugs; none means no app is needed
  ask: string; // what Captain gets, under 300 characters
  from: 'app' | 'site';
  template?: string; // list.ts key, when from 'app'
};

export const TEAMS: { slug: Team; label: string }[] = [
  { slug: 'sales', label: 'Sales' },
  { slug: 'support', label: 'Support' },
  { slug: 'finance', label: 'Finance' },
  { slug: 'operations', label: 'Operations' },
  { slug: 'ecommerce', label: 'E-commerce' },
  { slug: 'personal', label: 'Personal' },
];

export const GALLERY = data as unknown as Record<Kind, GalleryCard[]>;

/** The section's heading and its one line, per kind. */
export const GALLERY_HEAD: Record<Kind, string> = {
  ai: 'What you can build with AI agents',
  auto: 'What you can build with automations',
  browser: 'What you can build with browser agents',
  app: 'What you can build as an app',
};
export const GALLERY_LINE = 'Pick one: Captain starts from it and shows you a plan first.';
