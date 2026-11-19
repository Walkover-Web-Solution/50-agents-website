# Search pages launch: handoff to the Search session (19 Nov 2026)

Jii signed off the pages locally and asked to plan the deployment with Search. Everything below is on branch
`search-pages` (local, 17 commits ahead of `main`, last `b7483b8`), repo `Walkover-Web-Solution/50-agents-website`,
which Cloudflare Pages deploys on merge to `main`. Nothing is pushed.

## What's in the branch

| Area | Pages | Notes |
|---|---|---|
| Use cases | 12 + /use-cases | Pipeline JSON, gates pass |
| Kind hubs | 4 | Possibilities gallery, cycling hero asks |
| Integrations | 6 written flagships, ~1,900 generated, 20 categories, A to Z | Index tiers: 266 apps indexed (core + test) |
| Pairs | 169 indexed with their own lines | The rest render noindex |
| Comparisons | 20 | Facts in `src/content/compare/facts.ts` (fact-checked, review 02) |
| Guides | 30 + /guides | Per-guide covers |
| Pricing | /pricing | Live plans: Free 2,000/mo, Starter $19/20k, Pro $49/55k, Business $99/110k, top-ups $1/1k |
| Trust | /about, /contact, /support | viaSocket's channels (D256) |
| Parked | /learn, /for | Code kept in `src/app/(site)/_parked`; 404 |

- **Header** (every page and the homepage): Use cases, Build menu, Integrations, Pricing, Get started.
- **Footer:** Build, Popular integrations, Compare, Guides, Company.
- **Old content (D257):** 410 for the old products and the non-catalog `/ai-agents` pages; catalog apps' old URLs 308 to
  `/integrations/<slug>` (middleware, `src/content/integrations/old-map.json`); /templates to /use-cases; /login and /org
  to the app.
- **Sitemaps:** an index at `/sitemap.xml` and `/sitemap-main.xml`, one sitemap per family, indexable pages only.
- **Every gate passes** (`scripts/pages/gates*.mjs`). Your page_audit flags only Jii's no-dates rule and sourced
  competitor counts.

## Blockers before the production build

1. **Pair routes exceed Cloudflare Pages' file limit.** `src/app/(site)/integrations/[app]/[other]/page.tsx`
   pre-renders every pair in both orders: about 31,000 pairs, so roughly 62,000 routes. Each static route is at least one
   file (HTML, plus RSC payloads), and Cloudflare Pages caps a deployment at about 20,000 files; check the current limit
   for this account.
   - **Recommendation:** pre-render only the indexable pairs (169) and the ~1,900 app pages. Serve every other pair on
     demand (edge runtime, noindex), or don't serve them at all (404) until a tier opens. Search decides which (S8
     tiers); the website session builds it.
2. **Run the Cloudflare build** (`pnpm build` then `pnpm build:pages`, next-on-pages) with the dev server stopped, and
   fix what it reports: static versus edge routes, the 21 MB catalog snapshot, the middleware bundle size (old-map is
   1,970 entries).
3. **Clean `package.json`:** the old site's packages are unused now (MUI, emotion, redux, sass, tailwind, motion, etc.).
   Removing them needs the lockfile refreshed in the same commit, or Cloudflare's install fails.
4. **Merge `main` into the branch:** `main` has PR #53 (the MCP protocol update) that the branch doesn't.
5. **The homepage's source** (`agentic-apps/landing/build-live.py`, `site/sections.html`, `site/site.css`,
   `hero/crew.js`) changed for the new header and footer. It's in the harness repo, uncommitted; the manager commits the
   harness. `public/landing` in the website repo already has the built result.

## After the merge (Search's runbook)

- 301/410 checks on the old URLs.
- Sitemaps submitted (Search Console, Bing), IndexNow for the changed URLs.
- Cloudflare: Always Use HTTPS plus a cache purge for robots.txt (the cached-redirect issue), Rocket Loader off, and
  noindex for the old DocStar `/help` meeting-agent pages (Jii's DocStar call, T44).
- The weekly watch.

## First round after launch (Search's recheck of 2774c5b, 19 Nov)

- 20 integration-page descriptions are 166 to 177 characters where app names are long (google-business-profile,
  microsoft-dynamics-365-business-central, sharepoint): give them the pairs' short fallback (under 155).
- /integrations/heltar's description is only 109 characters.
- `microsftteams` stays misspelled (viaSocket's catalog slug); its title and H1 already say "Microsoft Teams".

## Held developer PRs

#42, #48, #50, #51 and #52 are held: they edit or advertise old pages, which the launch removes. #50's ai-catalog and
agent-skills parts are worth a clean redo after launch.

## Where things are

- **Page system rules:** `docs/page-system.md` (rounds 1 to 5).
- **Pipeline:** `scripts/pages/` (rows, prompts, product-facts, gates, generators).
- **Decisions:** `agentic-apps/decisions.md` D252 to D262.
- **Local review list:** http://localhost:8765/wireframes/review.html. Dev server: http://localhost:3050.
