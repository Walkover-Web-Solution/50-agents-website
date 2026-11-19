// Written by scripts/pages/write-family-index.mjs hubs: every page JSON of the family. Don't edit by hand.
import type { HubPage } from '@/site/hubs/types';
import p_ai_agents from './ai-agents.json';
import p_apps from './apps.json';
import p_automations from './automations.json';
import p_browser_agents from './browser-agents.json';

export const HUB_PAGES = [p_ai_agents, p_apps, p_automations, p_browser_agents] as HubPage[];
