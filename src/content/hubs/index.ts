import type { Hub } from './types';
import aiAgents from './ai-agents';
import automations from './automations';
import browserAgents from './browser-agents';
import apps from './apps';

// The four kind hubs (pages-brief B2), in the order of the "which kind" table's footer links.
export const HUBS: Hub[] = [aiAgents, automations, browserAgents, apps];
export const hubOf = (path: string) => HUBS.find(h => h.path === path)!;
