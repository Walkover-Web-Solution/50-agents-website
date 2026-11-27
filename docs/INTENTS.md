# Intents (lasting rules)

## INT-K7M2P9

- **kind:** constraint
- **module:** routing
- **title:** Home HTML via middleware only
- **what:** GET `/` as HTML must be served through `src/middleware.ts` rewrite to `/landing/index.html`, not a `next.config` `beforeFiles` rewrite to that static path.
- **why:** Cloudflare serves the static rewrite without `HOME_AGENT_LINK` on the response.
- **paths:** `next.config.ts`, `src/middleware.ts`, `src/lib/home-agent-link.ts`

## INT-R4N8W1

- **kind:** business_rule
- **module:** agent-discovery
- **title:** Public site OpenAPI at a stable URL
- **what:** `public/openapi.json` documents every public HTTP API on 50agents.com (today: NLWeb `/ask`). Link it from `llms.txt`, `products.json`, the AI catalog, and the home `Link` header.
- **why:** Agents need a machine-readable contract; the product app APIs are out of scope for this repository.
- **paths:** `public/openapi.json`, `public/llms.txt`, `public/products.json`, `public/.well-known/ai-catalog.json`