import type { HubPage } from '@/site/hubs/types';
import { HUB_PAGES } from './pages';

// The four kind hubs, in the order of the "which kind" table.
const ORDER = ['ai-agents', 'automations', 'browser-agents', 'apps'];
export const HUBS: HubPage[] = ORDER.map(s => HUB_PAGES.find(h => h.slug === s)).filter((h): h is HubPage => !!h);
export const hubOf = (slug: string) => HUBS.find(h => h.slug === slug)!;
