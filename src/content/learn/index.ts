import type { Term } from './types';
import { aiAgent, browserAgent, agenticAi, aiAssistant, llm } from './terms-agents';
import { automation, workflow, aiWorkflow, trigger, action, webhook, rpa } from './terms-automation';
import { api, integration, oauth, mcp, noCode, internalTool, prompt, humanInTheLoop } from './terms-build';

// The 20 glossary terms (pages-brief B6), in the brief's order.
export const TERMS: Term[] = [
  aiAgent, browserAgent, automation, workflow, trigger, action, webhook, api, integration, noCode,
  mcp, aiWorkflow, agenticAi, humanInTheLoop, oauth, internalTool, rpa, llm, prompt, aiAssistant,
];
export const termOf = (slug: string) => TERMS.find(t => t.slug === slug);
