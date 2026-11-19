# The 50agents.com page system (v3, 19 Nov 2026, D253)

The use case page is the reference: http://localhost:3050/use-cases/chase-unpaid-invoices.
Code: `src/app/(site)/use-cases/[slug]/page.tsx`, `src/site/usecase/*`, `src/site/css/usecase.css`. The pipeline: `scripts/pages/*`.
Every family follows it. Jii's words: not context-heavy, no small elements flying here and there, clear hierarchy, layout,
typography and spacing, visuals that support the text (or no visual), better than the competitors' pages.

## Rules for every page
- **Frame:** the homepage's header edges and footer (`src/site/chrome.tsx`). Don't change them.
- **Section heads are centred** over full-width content (`.sec-h.c`). Never a heading on the left with an empty right.
- **One rhythm:** sections are `.sec` (144px apart, 88px on a phone). More space above a heading than below it.
- **Visuals support the text or don't exist.** Every visual is drawn from the page's data with a shared component, never
  designed per page: `PromptFilm` (the page's ask typed into Captain, then a plan card), `ScrollStepper` (steps that move
  with the scroll, one picture each), the apps wall (`appsIn(category)` logos), the comparison table, `cards3` (link
  cards), the `qa` accordion. If nothing honest fits, use text.
- **No stats blocks.** At most one sourced number per page, as a sentence (it helps AI engines cite the page).
- **No dates in the text.** One "Updated <Month Year>" in the byline. Comparison pages may keep one line, "Prices
  checked <Month Year>", under their table, because those facts go stale; never a date on each fact.
- **No credits, no prices for 50agents.** "Free to start" at most.
- **Every button pastes the page's ask into Captain** (`Cta` with `ask`, which the app keeps through sign-in).
- **No small floating things:** no chips rows, no copy buttons in tables, no badges beyond the one kind badge, no
  small grey source lines in every section (sources gather in one line where the facts are).
- **Phone:** one column, left-aligned hero, the sticky button only after the hero's button scrolls away (`StickyBar`).
- House rules still hold: viaSocket lowercase v, no em dashes, 2,300+, "AI agent" or "browser agent", Captain.

## Every page is data, written by the pipeline
- One JSON per page, typed (`src/site/<family>/types.ts`). The template renders every visual from it.
- `scripts/pages/rows-<family>.json`: one row per page (slug, query, the facts that make it its own page).
- `scripts/pages/prompts/<family>.md`: the writer prompt (house rules word for word, the fields, the research step).
- `scripts/pages/gates-<family>.mjs` (or one shared gates script): shape, style, facts against the catalog and
  `scripts/pages/product-facts.md`, uniqueness (5-word shingles under 0.5), length; writes `report-<family>.md`.
- `scripts/pages/generate.mjs` runs the prompt with Claude when ANTHROPIC_API_KEY is set; until then a Claude Code
  session runs the same prompt on the same inputs.
- A new page is a new row. A design change is a component change, and every page follows.

## Round 2 (D254, Jii's review)
- **No dates at all** on the page: no byline date, no "Prices checked", no "read <date>". Dates live only in JSON-LD
  `dateModified`, the sitemap and the content files.
- **No source lines** ("From each tool's own pages", "Sources: ..."). Facts stay checked in the data files.
- **Subheaders are one short line** (under about 14 words), direct and concise. The hero's two-sentence answer is
  40 words at most in total.
- **Use the width:** heroes and content go wide (the hero film is 940px; tables use the full container).
- **The hero film** (`PromptFilm`) is Captain's yellow blob beside its chat box with the ask typing in. No plan card.
- **Apps sections** say "Works with <apps> and 2,300+ apps" and show two marquee rows of logos (see the use case page).
- **Tables** follow the use case comparison table: short cells (a mark plus at most 5 words), the 50agents column
  raised on the kind's tint, drawn tick, cross and partly icons. No prose in cells.
- **Headers** are the shared ones (68px, no border). Don't override them.
- **Captain is the yellow blob** (`Face id="lead"`); use the crew blobs where they help explain, never as decoration.
- **Guides v4** (`src/app/(site)/guides/[slug]/page.tsx`, `src/site/guides/*`): to the point (answer, then steps). Interactions
  are native inputs in the server HTML, so they work by keyboard and without JavaScript: a "which one do I need" chooser
  (radios, branches shown by `:has`, an answer within 3 taps, only where there is a real choice), steps the reader ticks
  off with progress in the sticky contents, and Captain's film inside the step 50agents does. Tips, warnings and "what
  can go wrong" items carry the blob of the kind they are about. Tabs ("any tool" vs "in 50agents") were left out: they
  would hide the steps or repeat them. Prompt `scripts/pages/prompts/guides.md`, gates `scripts/pages/gates-guides.mjs`.

## Round 3 (D255)
- **Colour:** no kind tint on big surfaces. `.page` pins `--k` to a neutral warm grey (#F2F1ED); kind tints stay on the
  small kind badge and on cards that are about one kind. The "partly" mark is grey. No orange anywhere.
- **Comparison tables show only where 50agents wins**, with 50agents as the first column and our wordmark (not a kind
  face) in its header. Rows where another way is better are dropped from the table.
- **Rhythm:** every section is a `.sec` (128px above, 80px on a phone) with no extra top or bottom margins of its own;
  the heading block is 40px above its content. Check the gaps between every pair of sections.
- **Heroes:** the chat box (`PromptFilm`) is the subheader. One short line under it at most.
- **Comparison pages (/compare):** versus tables keep only rows where 50agents wins (`isWin` in `src/content/compare/facts.ts`:
  our cell is a yes, or for apps a higher count; no "Better for" row); alternatives tables list 50agents first and the
  other tools' facts neutrally (no "Staying on" row). Both put our wordmark (`Logo50`) at the head. The hero is the use
  case hero with a `line` field (14 words) under the box; the move-over stepper (`.cmp5-steps`) runs its line centre to
  centre. Apps on your own domain and export are yes for 50agents (product-facts.md). Gates: `gates-compare.mjs`.
- **Hubs:** the hero is the use case hero (`answer[1]` under the box). "Which kind do I need?" is a bento of the four
  kinds (`src/site/hubs/kind-bento.tsx`, copy in `src/content/hubs/kinds.ts`): the homepage's kind cards, smaller, each
  with a small drawn picture on its tint; the hub's own kind leads at full width, the others link to their hubs.
- **Trust pages:** /about (crew, how it works, the four kinds strip, what it does today from product-facts.md, who
  makes it, reach the team; no security claims, no counts), /contact and /support (`src/site/pages/trust.tsx`).
  Support channels are carried over from viasocket.com/support in `src/content/pages/support.ts`; a channel without a
  confirmed 50agents address is `href: null`, drawn as a dashed placeholder in development only. /support is noindex
  and out of the sitemap while any placeholder is open; /contact while `CONTACT_EMAIL` is null.
- **Parked:** /learn and /for (code in `src/app/(site)/_parked`, out of the site and the sitemaps).
- **Guides v5** ("lifeless", studied Linear, Notion, Zapier, Stripe, Vercel, Intercom): every guide has a cover drawn from its
  data by one component (`src/site/guides/cover.tsx`): the category sets the scene, the kind sets the crew face and the one
  small tinted element, a seed from the slug varies the rest; the frame is neutral. /guides (`src/site/guides/index-view.tsx`)
  is a featured guide (`featured` in `src/content/pages/indexes.ts`), then every guide as a cover card under category filters
  (buttons, kept in the address, cards stay in the HTML). The guide is an article: cover, H1, short answer, "n min read · n
  steps"; sticky contents that mark the section being read and fill as you read (a thin bar on a phone); tips and problems
  said by the crew (worried face for warnings); "Read next" as cover cards. Pull quotes and author lines were left out: no
  quotes and no authors to show honestly.

## Pair pages and the pipeline (Search S24)
- Launch with the pairs that pass the uniqueness gate (24 today); the rest stay noindex. The gate keeps skipping the
  shared trigger and action lists (`data-gate="skip"`).
- When the API key arrives (Search T5), the pipeline writes each pair's own lines: what this pair is used for, the most
  useful template and why, and what to watch out for between these two apps. Then re-run
  `scripts/pages/uniqueness-integrations.mjs`. No looser gate.

## Round 4 (D258)
- **Frame:** the header sits in the homepage's band (`max(40px, (100vw - 1280px) / 2)` each side), opaque, with Use cases,
  Build and Integrations on the right. Compare and Guides are footer only. Content and marquees stay inside `.wrap`.
- **Rhythm:** `.sec` is 176px (96px on a phone).
- **The logo never wears an automation blob:** wordmarks use `writer` (or a random non-automation face on the homepage).
- **Use case heroes:** app icons first, then the kind label (an app shows a small crew; other kinds no blob). The
  comparison section is removed; its replacement is being decided with Jii.
- **Guides supersede the earlier guide notes:** calm covers built from data (a few carry Captain, no crowds); the hero is
  the H1 and "The short answer" in a soft grey box, centred; plain numbered steps, no ticking or step counter; small
  icons for tips and warnings.
- **Integrations:** triggers left and actions right (superseded in round 5: each shows 8 with "Load more", no inner scroll).

## Round 5 (D260)
- **Rhythm:** `.sec` is 204px (110px on a phone); space under the footer's crowd; no browser default body margin.
- **Breadcrumbs:** the current page underlined, in normal weight.
- **Final calls to action:** "One sentence to Captain. Free to start." Never repeat the full ask there.
- **Hero film:** hubs cycle 5 or 6 real asks (`PromptFilm` with `asks` and `link`); the Build button follows the ask on screen.
- **Nothing traps the page scroll:** no inner scrolling boxes. Lists show a set number with "Load more" (triggers and
  actions half and half, templates, galleries) or pagination with arrows inside the container (the app directory).
- **More questions:** every page answers 3 to 5 questions the page itself doesn't cover.
- **Guides:** each guide's JSON has a `cover` (its apps, key object, a few words); the gate refuses two identical covers.
  The hero is one centred axis (820px), the short answer in a pale tint from the guide's category.
