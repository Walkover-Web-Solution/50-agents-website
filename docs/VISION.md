---
covers: ["*"]
verified_on: 2026-11-18
---

# Product vision and direction for this repository

**50agents** ([50agents.com](https://50agents.com)) is a product from [viaSocket](https://viasocket.com). You tell **Captain**, its AI, what you need in plain words, and it builds automations, AI agents, browser agents and apps that do the work in your real apps, across 2,300+ apps through viaSocket. Every workspace starts free with 2,000 credits.

**This repository is the public website.** It explains the product, gets found in search and by AI assistants, and sends visitors to sign up in the app at `https://50agents-app.embarko.app/login` with attribution. It does not run the product: no AI agents, automations, chats or workspace data live here.

## What is decided

### The home page is the site

- `/` is the static landing in `public/landing/`, built from the landing source with `build-live.py` and inlined at build by `scripts/sync-landing-sections.mjs`. Copy and design changes start in the landing source, not in `public/landing/`.
- It runs an A/B/C test of three hero versions: `orbit`, `stage` and `strip`. Each visitor keeps their version (localStorage key `50a-variant`); `?v=` previews one. Only the hero differs between versions: the page title and every section below the hero are shared.
- It is the only page visitors are led to. The header carries the wordmark and one button, **Get started**, and no page links.

### Old pages: kept, not promoted

- `/ai-note-taker`, `/work-management`, `/templates`, `/ai-agents`, every `/ai-agents/<slug>`, and `/pricing` describe the earlier product.
- They stay live and reachable from the footer only, and they are `noindex, follow` with self canonicals. Nothing is deleted, so any of them can come back.
- Their own buttons may still point at the earlier app; that is intended.

### Sign-up and attribution

- Every Get started goes to `https://50agents-app.embarko.app/login` (`src/lib/app.ts`, `public/landing/site.js`). That page handles both sign-up and sign-in.
- Every link carries `utm_source=50agents.com`, `utm_medium=website`, `utm_campaign=<version>`, `utm_content=<button>`, and always `lv=<version>`. UTMs the visitor arrived with win; `lv` always survives. The app stores them at sign-up.
- Do not add a second destination or drop a parameter.

### Search and AI visibility

- Only the home page is indexed today. `sitemap.ts` lists it alone, and the old pages stay out.
- The home page sends its H1, subline and sections in the server HTML, so crawlers that do not run JavaScript can read them.
- Structured data on the home page is Organization plus SoftwareApplication only. `public/llms.txt` describes today's product.
- Agent discovery files under `public/.well-known/` (`ai-catalog.json`, `poppy.json`, `api-catalog`) and MCP/OpenAPI stay linked from the home page for readiness checks.
- A rebuild of search pages (written pages and integration pages in their own route group) is planned. Until it lands, avoid structural changes to `src/app`.

### Copy rules

- Claim nothing beyond the facts in the first paragraph. In particular: no security certifications (no SOC 2, ISO, GDPR or "secure" claims), no uptime figures, no customer counts, logos or testimonials, until there is a source.
- Write viaSocket with a lowercase v. The only integration number is 2,300+. No em dashes anywhere.
- Say "AI agent" or "browser agent", never just "agent". Captain is always Captain.

## Who it is for

Non-technical owners and operators of small and mid-size businesses who lose time to the work between their tools: orders, invoices, customer messages, reports. Write so they understand it in one read, and show the work rather than describe a platform.

## Principles

1. **Plain words first.** What an operator understands in one read beats technical precision.
2. **Show the work.** Concrete scenarios (orders, invoices, approvals), not abstract platform language.
3. **Measured handoff.** Every call to action keeps the attribution above.
4. **Only defensible claims.** Weaker-sounding copy is better than an unsourced claim.
5. **Fast and static where possible.** The home page is static; heavy logic belongs in the app.

## Not in this repository

- Running AI agents, automations or chats, or storing workspace data (that is the app).
- Mock endpoints or sample data presented as live integrations. A website feature that needs a new API gets its contract written down first.
- Unsourced trust claims, thin mass-generated pages, or keyword stuffing.
- A second home page. The old Next.js home (`src/app/page.tsx`, `LandingPage.tsx`) stays in the tree, unused, until the old site is retired.

## How to judge a request

1. Does it help a visitor understand 50agents, help it get found, or improve attributed sign-up? If it builds product behaviour, it belongs in the app.
2. Does it keep the decisions above (one destination, attribution, old pages noindex, copy rules)?
3. If a request conflicts with this file, say so and narrow or decline it. Change this file only when the owner changes direction, and in the same pull request as the change.
4. If it is unclear, check [OPEN_QUESTIONS.md](./OPEN_QUESTIONS.md) and ask.
