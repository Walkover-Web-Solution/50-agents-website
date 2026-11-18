---
covers: ["*"]
verified_at: 987b4ee
verified_on: 2026-11-18
---

# Product Vision & Strategic Direction

**50agents** (marketed at [50agents.com](https://50agents.com)) is a Walkover product, built on [viaSocket](https://viasocket.com), that lets people describe how their business works in plain language and get apps, automations, AI agents, and browser agents that run work across 2,300+ connected apps. **This repository** is the public marketing and discovery website: it explains that product, drives sign-up, surfaces integrations and templates for SEO, and hands visitors to the live application with consistent attribution—not the agent runtime itself.

## Authoritative Sources & Status

**Sources used (2026-11-18, codebase at `6d07997`):**

| Source | Role |
|--------|------|
| `public/landing/index.html`, `sections.html`, `site.js` | Primary home-page positioning, FAQs, CTAs, hero variants |
| `src/app/layout.tsx`, `next.config.ts` | Global SEO defaults, `/` rewrite to static landing |
| `src/lib/app.ts`, `src/components/SignupLink.tsx` | Sign-up URL and UTM contract to the app |
| Product routes: `/ai-agents`, `/ai-agents/[slug]`, `/templates`, `/pricing`, `/ai-note-taker`, `/work-management` | Feature marketing and conversion paths |
| `src/lib/seo.ts`, `src/app/sitemap.ts` | Metadata and indexing policy |
| `package.json`, `wrangler.toml` | Stack (Next.js 16, Cloudflare Pages) |
| Recent git history (e.g. PR #27 FAQ/claim cleanup) | Direction on substantiated marketing copy |
| `README.md` | Scaffold only (not product truth) |

**No `AGENTS.md`, root `VISION.md`, or PRDs** were found in this repository.

### Approved Direction

- **Product promise (as stated on the site):** Visitors describe work in natural language; 50agents builds and runs apps, automations, AI agents, and browser agents on their existing tools (via viaSocket) or from scratch, including sites without connectors via browser agents.
- **Audience:** Operators and team leads at small and mid-sized businesses who juggle many SaaS tools and manual “work between tools,” without requiring them to code (per landing FAQs and hero narratives).
- **Trust line:** From viaSocket / Walkover; integrations scale via viaSocket’s app catalog; human-in-the-loop when rules or risk require a person (landing “people” section, FAQs).
- **Website role:** Market the product, attribute traffic (UTM / variant `lv`), list integrations and templates, publish pricing and feature pages, and route “Get started” to `https://50agents-app.embarko.app/login` (see `src/lib/app.ts` and `public/landing/site.js`).
- **Copy discipline:** Do not publish security, compliance, or performance claims unless sourced and approved (consistent with recent landing cleanup).

### Current Implementation

- **Home:** `next.config.ts` rewrites `/` to static `public/landing/` (built per comment from `agentic-apps/landing`); three hero variants (`orbit`, `stage`, `strip`) with persisted `50a-variant`.
- **Marketing pages:** Next.js App Router pages with shared header/footer, design tokens aligned to landing variants (`src/app/layout.tsx`).
- **Integration catalog:** Edge API routes proxy `INTEGRATION_URL` / `plug-service.viasocket.com` for list, search, categories, and per-app SEO pages under `/ai-agents/[slug]`.
- **Templates:** Grid loads ideas via RTK Query; unauthenticated users redirect toward login with `pendingTemplateId`.
- **Legacy / transitional surfaces:** `src/app/page.tsx` + `LandingPage` (superseded at `/` but still in tree); `/login` and `/org` with `proxy_auth_token` and Redux APIs pointed at `NEXT_PUBLIC_BASE_URL` paths (`/agent`, `/chat`, `/template`, etc.)—overlap with the separate app host.
- **Hosting signals:** Edge runtime on many routes; `@cloudflare/next-on-pages` and `wrangler.toml` for Cloudflare deployment.
- **Sitemap:** Only `/` listed today (`src/app/sitemap.ts`).

### Proposals & Roadmaps

- **Landing repositioning (Nov 2026):** Comments in `next.config.ts` and `src/lib/app.ts` reference a new home page and open sign-up on the embarko app; old `page.tsx` home awaits “site audit.”
- **Hero experimentation:** Random or `?v=` forced assignment of landing variants for conversion learning (not documented beyond code).
- **Work Management:** Dedicated page promoting `work.50agents.com` (separate URL—not defined whether fully merged into 50agents narrative).

### Unknowns & Ambiguities

See [docs/OPEN_QUESTIONS.md](./OPEN_QUESTIONS.md) for owner decisions (app vs website boundary, pricing authority, SEO/sitemap scope, help center hosting, success metrics).

---

## Target Audience & Ideal Customer Profile (ICP)

### Primary persona

| Attribute | Description |
|-----------|-------------|
| **Role** | Business owner, ops lead, or functional lead (finance, sales, support) at an SMB |
| **Workflow** | Coordinates orders, invoices, customer comms, and reporting across many apps (e.g. Xero, Shopify, Slack, WhatsApp) with manual handoffs |
| **Technical level** | Non-developer; comfortable with SaaS tools and plain-language instructions; does not want to build or maintain integrations by hand |

### Secondary personas

| Persona | Interest on this site |
|---------|----------------------|
| **Team admin** | Pricing, security copy, workspace/org selection flows (where still on-domain) |
| **Evaluator / collaborator** | Integration pages, templates, help links, Chrome extension |
| **Auditor / security reviewer** | Privacy policy links, FAQ answers, any substantiated compliance statements |

---

## Problems Solved & Value Proposition

| Customer problem | How 50agents addresses it (per site copy) | What sets it apart (as stated) |
|------------------|-------------------------------------------|--------------------------------|
| Manual work between tools (retyping orders, chasing payments, copying data) | Agents and automations run across connected apps; browser agents for sites without APIs | “Your crew” metaphor—multiple agent types (app, automation, AI, browser) built around *your* workflow |
| Building custom software is slow and expensive | Describe the job in plain words; platform builds apps/screens around the workflow | No-code setup emphasized in FAQs |
| Tool sprawl (2,300+ apps) | viaSocket connectivity; searchable `/ai-agents` catalog | Heritage from viaSocket integration network |
| Fear of autonomous AI changing production data | Human approval for exceptions; configurable autonomy (FAQ) | Slack/team loop illustrated on landing |
| Meeting follow-up overhead | AI Note Taker product page and pricing tier | Low hourly pricing message on `/pricing` |
| Discovering what to automate first | Templates gallery, use-case wall on landing, per-app agent pages | Template → login → workspace handoff |

---

## Core Principles & Design Philosophy

1. **Plain-language promise, not technical jargon**  
   *Trade-off:* Engineering precision in UI copy is secondary to what a business operator understands in one read.

2. **Show the work, don’t abstract it**  
   Landing demos use concrete scenarios (orders, invoices, Slack approvals).  
   *Trade-off:* Less generic “platform” language; more maintenance when narratives change.

3. **Convert with measured handoff**  
   Every serious CTA should preserve `utm_source`, `utm_medium`, `utm_campaign` (variant), and `utm_content` (button id) into the app login URL.  
   *Trade-off:* Extra client-side logic; inconsistent paths (`APP_LOGIN` vs `NEXT_PUBLIC_INTERNAL_URL`) must not fragment attribution.

4. **SEO through real integrations**  
   Programmatic pages per connected app, structured data in `src/lib/seo.ts`, canonical URLs on agent detail routes.  
   *Trade-off:* Dependency on upstream plugin APIs; empty/error states must not emit thin spam pages.

5. **Substantiated trust only**  
   Avoid badges, uptime, or compliance claims without approved sources (see landing FAQ refresh and PR #27).  
   *Trade-off:* Weaker-sounding security sections until legal/product supplies evidence.

6. **Edge-friendly marketing site**  
   Prefer static landing + edge-rendered catalog pages; cache integration responses sensibly.  
   *Trade-off:* Not a place for heavy server-side product logic.

---

## Strategic Priorities & Success Measures

**Stated in repository (priorities implied by structure and recent changes):**

1. Ship and iterate the static landing as the canonical home experience.
2. Maintain accurate, searchable integration marketing (`/ai-agents`).
3. Funnel sign-ups to the embarko-hosted app with variant and button attribution.
4. Keep marketing claims aligned with what the product can defend.

**Success metrics:** Not stated in the repository. See [OPEN_QUESTIONS.md](./OPEN_QUESTIONS.md#operations-and-success).

---

## Boundaries & Non-Goals

**This repository deliberately does not:**

- Execute agent tasks, host chat threads, or store customer workspace data (that lives behind `NEXT_PUBLIC_BASE_URL` / the embarko app).
- Invent integration or agent APIs; website routes are proxies and presentation only.
- Replace product documentation in the Help Center (`50agents.com/help` links are out of band until hosting is confirmed).
- Present unsourced SOC, GDPR, uptime, or certification claims as facts.

**Anti-patterns (break the vision):**

- Adding “mock” backend endpoints or fake integrations instead of documenting real contracts in `docs/CONTRACTS.md`.
- Expanding authenticated product UI here while CTAs explicitly migrate users to `50agents-app.embarko.app`.
- Reintroducing delisted or unverified marketing claims removed from landing.
- Duplicating hero/home implementations without retiring the superseded path.
- SEO tricks (mass thin pages, keyword stuffing) that misrepresent per-app capabilities from API text.

---

## How Future Agents Must Evaluate Requests

1. **Compare to approved direction** — Does the change help explain 50agents, improve discovery/SEO, or improve attributed conversion? If it builds product behavior, it likely belongs in the app/backend repos, not here.

2. **Check ICP and scenarios** — Copy and UX should still read for non-technical operators juggling real tools; avoid developer-only defaults on public pages.

3. **Apply principles** — Preserve UTM/variant attribution, edge/static performance, and substantiated claims.

4. **Respect non-goals** — Decline or redirect requests for agent runtime features, fabricated APIs, or unverified trust badges.

5. **Clarify ambiguous requests** — If a request could mean either marketing-site or platform work, stop and ask (see OPEN_QUESTIONS). Use `needs_decision` when vision is silent.

6. **Conflicts** — Explain the conflict against this file; recommend declining or narrowing scope; never rewrite this vision to bypass a conflict without an explicit owner decision to change direction.

7. **Direction changes** — If owners approve a new strategic direction, implement the code/docs change **and** update this file in the same PR.

8. **Missing backend capabilities** — If a website feature needs a new API, describe the request/response contract in `docs/CONTRACTS.md` (create or extend it). Do not ship pretend endpoints or hard-coded sample data presented as live integrations.

**Owner gate:** This draft must be reviewed and approved before merge; after approval, treat this file as the gate for all automated and human requests against this repository.