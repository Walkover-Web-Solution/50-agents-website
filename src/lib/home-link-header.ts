/** HTTP Link header on `/` for agent discovery (Axien find.link-headers). */
export const HOME_AGENT_LINK_HEADER =
  '</llms.txt>; rel="describedby"; type="text/plain", </llms-full.txt>; rel="alternate"; type="text/plain"; title="Full agent context", </.well-known/api-catalog>; rel="api-catalog", </.well-known/ai-catalog.json>; rel="ai-catalog"; type="application/ai-catalog+json", </openapi.json>; rel="service-desc"; type="application/json", </server.json>; rel="service-desc"; type="application/json", </mcp/server-card>; rel="service-desc"; type="application/mcp-server-card+json", </sitemap-main.xml>; rel="sitemap"';

export function applyHomeAgentLinkHeaders(headers: Headers): void {
  headers.set('Link', HOME_AGENT_LINK_HEADER);
}