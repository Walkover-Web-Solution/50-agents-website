# Building the 50agents.com search pages: rules for every builder (19 Nov 2026)

Jii (owner) asked for every search page to be built locally, in the best possible UI, with real data, researched and compared with the pages they compete against. Nothing is pushed or deployed; he reviews on localhost first.

## Read first

1. The finished reference page: http://localhost:3050/use-cases/chase-unpaid-invoices, and its code:
   - `src/app/(site)/use-cases/[slug]/page.tsx` (template), `src/content/use-cases/chase-unpaid-invoices.ts` (typed content),
   - `src/site/parts.tsx` (Face, AppLogo, KindBadge, Crumbs, Cta, MaybeLink, Wordmark, KINDS), `src/site/copy.tsx` (CopyAsk),
   - `src/site/chrome.tsx` (header, footer), `src/site/site.css` (tokens and shared classes), `src/site/product/invoices.tsx` (a product view drawn from the real app).
   Match its look, its quality and its honesty. Reuse its classes (`wrap`, `band`, `sec-head`, `hero`, `answer`, `btn`, `kind`, `crumbs`, `src`, `faqs`, `related`, `rel`, `final`, `peek`, `byline`, `sticky`, `ask`, `chips`, `limits`) before adding new ones.
2. The spec: `/Users/shreyasarora/Developer/Projects/viaSocket/agentic-apps/gtm/seo/handoff/pages-brief.md` (v3.1): A4 quality bar, A5 writing, your family's section in Part B, Part C design ideas, Part D2 SEO musts.
3. The product, so no page claims what it can't do: `/Users/shreyasarora/Developer/Projects/viaSocket/agentic-apps/app/` (`PRODUCT.md`, `DESIGN.md`, `src/features/*/CLAUDE.md`, `src/features/templates/list.ts` for the real starting asks, `src/features/apps/recipes.ts`) and `/Users/shreyasarora/Developer/Projects/viaSocket/agentic-apps/product/problem-ledger.md` (known gaps). Product facts: `/Users/shreyasarora/Developer/Projects/viaSocket/agentic-apps/FACTS.md` if present, else `agentic-apps/gtm/FACTS.md`.

## Where your files go (several builders work in this repo at once)

- Pages: `src/app/(site)/<your routes>/`. Content: `src/content/<your family>/`. Components: `src/site/<your family>/`. Styles: `src/site/css/<your family>.css`, imported by your page files.
- Register every page you build in `src/content/<family>/paths.ts` (`PATHS`), so links to it go live. Link to other pages with `MaybeLink` (from `parts.tsx`): a page that doesn't exist yet renders as text.
- **Do not edit** `src/site/parts.tsx`, `chrome.tsx`, `site.css`, `routes.ts`, `layout.tsx` files, another family's folders, `next.config.ts` or `package.json`. Need a shared change? Put it in your report.
- **Never** commit, switch branches, stash, run `git reset` or `next build` (the dev server on :3050 is shared and uses `.next`). Check pages with `curl -s http://localhost:3050/<path>` (HTML has the text) and the Browser pane (desktop 1280 and phone 375: no sideways scroll).
- Pages are static: `generateStaticParams` plus `export const dynamicParams = false` for dynamic routes; no `headers()`, no runtime fetches (snapshot data into content files with the date it was read).

## Every page

- Metadata: unique title under about 60 characters, description about 140 to 155, answer first; canonical `https://50agents.com/<path>` (no trailing slash); `robots: index, follow` (or `noindex, follow` where the spec's threshold isn't met); OG and `twitter: summary_large_image`.
- JSON-LD: `BreadcrumbList` always; `SoftwareApplication` (price 0 USD, "Every workspace starts free with 2,000 credits.", no ratings) on use cases, hubs and integrations; `Article` (author Organization "50agents", datePublished, dateModified) on guides and comparisons. **No FAQPage or HowTo.**
- One H1. Breadcrumbs. The answer in the first two sentences. "By the 50agents team · Last updated <date>". Links up to the parent and across to at least 2 siblings.
- Buttons: `<Cta page="<slug>" place="hero|inline|final|sticky">` (sign-up with UTMs). Phone gets the sticky bar.
- Product views: drawn in HTML in the real app's look (D252: from the real panel, filled with labelled example data, real labels, nothing the app doesn't have). Study the app's source for the exact screens and words. **Never run live AI agents or builds in the app** (credits). No mock-up of a different product.

## House rules (a page that breaks one doesn't ship)

- viaSocket with a lowercase v. **No em dashes.** The integration count is **2,300+**. Say "AI agent" or "browser agent", never a bare "agent". Captain is Captain.
- No trust claims without a source covering 50agents: no SOC 2, ISO, "secure", uptime, customer counts, logos or testimonials.
- Every competitor or market fact has a link and the date read, read by you on the source page today. Say where the other tool is better. Unknowns are left out, never guessed.
- Plain words, specific, no marketing filler, no paragraph repeated across pages (swap the app or job name and the page must read wrong).
- Nothing the live app doesn't do today. When unsure, leave it out and list it in your report.

## Your report (under 300 words)

Pages built (paths), what each is based on (data, sources), anything you left out or are unsure of, shared changes you need, and questions for Jii.
