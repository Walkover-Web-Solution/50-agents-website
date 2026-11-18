# Open Questions

Questions the repository does not answer. An owner should decide and update `docs/VISION.md` when resolved.

## Product scope on this domain

1. **Website vs app boundary** — Sign-up CTAs point to `https://50agents-app.embarko.app/login`, but this repo still ships `/login`, `/org`, Redux APIs under `NEXT_PUBLIC_BASE_URL`, and template workspace selection. Should this repository remain an authenticated surface, or should all signed-in product UI live only on the app host?
2. **Work Management positioning** — `/work-management` links to `https://work.50agents.com/` as a separate product. Is Work Management a first-class 50agents offering marketed from this site, a sibling product, or legacy positioning?
3. **AI Note Taker vs core “crew” narrative** — The static home page emphasizes apps, automations, AI agents, and browser agents; `/ai-note-taker` and pricing foreground meeting recording. Is the note taker the primary entry offer, one SKU among many, or transitional landing focus?

## Content and sources of truth

4. **Landing source repo** — `next.config.ts` notes the home page is built from `agentic-apps/landing` with `build-live.py`. What is the canonical workflow to sync `public/landing/` from that repo, and who approves copy changes?
5. **Legacy Next.js home** — `src/app/page.tsx` and `LandingPage.tsx` still exist while `/` rewrites to `public/landing/index.html`. Should the old home be removed after audit, and what is the audit exit criteria?
6. **Sitemap coverage** — `sitemap.ts` currently lists only `/`. Should programmatic `/ai-agents/*`, pricing, templates, and product pages be indexed, and who owns SEO policy?
7. **Security and compliance claims** — Landing FAQs de-emphasize unsourced badges; some inner pages (e.g. `SecuritySection`) still use strong compliance language. Which claims are approved for public marketing, and where is the evidence documented?

## Pricing and conversion

8. **Pricing accuracy** — `/pricing` states $0.99/hour for AI Note Taker and free first 1,000 calls/month for internal applications. Are these figures authoritative for `50agents.com`, or placeholders pending product/pricing owners?
9. **Get started destinations** — CTAs use `APP_LOGIN`, `NEXT_PUBLIC_INTERNAL_URL`, and `work.50agents.com` in different places. What is the single mapping of page → destination for new visitors?

## Operations and success

10. **Success metrics** — The repository does not define conversion, SEO, or experiment KPIs for hero variants (`orbit` / `stage` / `strip`). What should agents optimize for?
11. **Deployment target** — `wrangler.toml` and `@cloudflare/next-on-pages` imply Cloudflare Pages. Is that the only production target, and are `.env.dev` / `.env.prod` documented for contributors?

## Help and legal

12. **Help center hosting** — Footer links point to `https://50agents.com/help/*`. Is help served from this Next.js app, another deployment, or an external CMS?