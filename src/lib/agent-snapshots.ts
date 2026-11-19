/** HTML-limited agent probes (Axien read.page-structure and related checks). */

export const AGENT_PROBE_UA =
  /Axien\/|ChatGPT-User|Claude-Web|anthropic-ai|GPTBot|OAI-SearchBot|PerplexityBot|Google-Extended/i;

/** Inner pages sampled like Axien; `/` is already static and passes without a snapshot. */
export const AGENT_SNAPSHOT_PATHS = new Set([
  '/pricing',
  '/use-cases',
  '/guides',
  '/about',
  '/contact',
  '/support',
  '/integrations',
  '/ai-agents',
  '/automations',
  '/browser-agents',
  '/apps',
]);

export function agentSnapshotUrl(pathname: string): string | null {
  if (!AGENT_SNAPSHOT_PATHS.has(pathname)) return null;
  const slug = pathname === '/' ? 'home' : pathname.slice(1).replace(/\//g, '_');
  return `/agent-snapshots/${slug}.html`;
}