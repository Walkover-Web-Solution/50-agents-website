import type { TermPage } from '@/site/learn/types';
import { TERM_PAGES } from './pages';

// The 20 glossary terms, in the brief's order. Content: one JSON per term in ./pages, written by the page pipeline.
const ORDER = [
  'ai-agent', 'browser-agent', 'automation', 'workflow', 'trigger', 'action', 'webhook', 'api', 'integration', 'no-code',
  'mcp', 'ai-workflow', 'agentic-ai', 'human-in-the-loop', 'oauth', 'internal-tool', 'rpa', 'llm', 'prompt', 'ai-assistant',
];
export const TERMS: TermPage[] = ORDER.map(s => TERM_PAGES.find(t => t.slug === s)).filter((t): t is TermPage => !!t);
export const termOf = (slug: string) => TERMS.find(t => t.slug === slug);
