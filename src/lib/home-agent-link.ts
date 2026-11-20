/** HTTP Link header on GET / so agents can find llms.txt, the AI catalog and the markdown home page without parsing HTML.
 *  Only resources that exist (agent readiness redo, fixes-02 item 5.3): the old site's MCP, OpenAPI and API catalog are retired. */
export const HOME_AGENT_LINK =
  '</llms.txt>; rel="describedby"; type="text/plain", </llms-full.txt>; rel="alternate"; type="text/plain"; title="Full site context", </index.md>; rel="alternate"; type="text/markdown"; title="Home page (markdown)", </.well-known/ai-catalog.json>; rel="ai-catalog"; type="application/ai-catalog+json", </.well-known/agent-skills.json>; rel="describedby"; type="application/json"; title="Agent skills", </sitemap.xml>; rel="sitemap"';
