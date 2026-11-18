# Open questions

What this repository still does not settle. When the owner decides one, move the answer into `docs/VISION.md` and delete it here.

## Product and site

1. **Earlier product's surfaces.** `/login`, `/org` and the template workspace flow still talk to the earlier app (`NEXT_PUBLIC_BASE_URL`, `NEXT_PUBLIC_INTERNAL_URL`). When the old site is retired, do they go, or move behind the new app?
2. **Pricing.** `/pricing` shows the earlier product's prices and is linked from the footer only. What replaces it, and when?
3. **Retiring the old pages.** The old pages are kept, noindex, so they can come back. What decides when they are removed or redirected (for example to the planned integration pages)?

## Search

4. **The planned search pages.** Which old URLs redirect to the new pages when they land, and which pages are indexed then?

## Operations

5. **Success measures.** Which numbers decide the hero A/B/C test (for example sign-ups per version by `lv`), and over what window?
6. **Cloudflare settings outside this repo.** Edge caching of the home page, Rocket Loader, "Always Use HTTPS", and routing for `/help`. Exact `/help` and `/help/` must hit this website worker first (static hub + `public/_redirects`); `/help/*` articles may stay on DocStar. The DocStar proxy must not take exact `/help` before this app. Who owns that worker order?
