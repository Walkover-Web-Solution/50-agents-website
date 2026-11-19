# Write one 50agents guide as JSON

You write the content of one guide on 50agents.com: a method that works with any tool, with 50agents as one worked
example. The page template is fixed (src/app/(site)/guides/[slug]/page.tsx); you only fill its fields.
Return one JSON object matching `GuidePage` in src/site/guides/types.ts. No prose outside the JSON.

## Input you get
- `row`: slug, the search query it answers, group, kind, and either `ask` (the worked example's exact ask) or `useCase`
  (the use case page this guide overlaps), and what makes it its own page (`own`).
- `useCase`: when the row names one, that page's JSON. Link it; never repeat its steps, its table or its questions.
- `catalog`: for each app the example uses, its real triggers and actions. Use only these names.
- `facts`: scripts/pages/product-facts.md, what 50agents can do today. Every product claim must follow from it.
- `example`: a finished guide (src/content/guides/pages/how-to-automate-invoice-reminders.json). Match its shape, length
  and tone; never reuse its sentences.

## Research first (web search)
Search the row's query. Read the top 3 to 5 results, the vendors' own help and pricing pages for every tool you name, and
the "People also ask" questions. Note what searchers still don't get answered: that is the page's reason to exist.
Every fact about another tool comes from that tool's own page, read today, and goes in `sources`.

## Fields
- `title` under 60 characters, ends " | 50agents". `description` 120 to 155 characters, answer first.
- `h1`: the query's wording when it reads well.
- `answer`: "The short answer", two sentences, 45 words at most each. The first answers the question outright, for any tool.
- `sections`: 1 to 3 sections of context before the method (`id`, `h2`, and blocks: `p`, `ul`, or `table`). A table
  only where it compares; no pictures, no screenshots, no mock-ups.
- `method`: the method as 4 to 7 numbered steps (title under 8 words, body 60 words at most), optional one-line `intro`.
- `example`: `h2` and one or two paragraphs on how 50agents does this job. Then either `useCase` (the row's use case;
  nothing else) or `kind`, `ask` (exactly the row's ask) and `build` (name, line, when, does, apps, asksFirst, as in
  src/site/usecase/types.ts). The page draws the ask typed into Captain and the plan card from these; no other visual.
- `wrong`: "What can go wrong", 3 to 6 items: a short title and two calm sentences, the problem and the fix.
- `faqs`: 3 to 5 questions from People also ask, each answered in 2 or 3 sentences.
- `sources`: every page you used, once, as `{ label, href }`. Labels name the publisher and the page, no dates. Never put
  a source link in the text; the page lists them at the end.
- `pricesChecked`: only on the cost guide, today's date. Other guides name no prices for any tool; link the cost guide.
- `related`: 3 guide slugs. `updated`: today's date, ISO.

## Rules (from the brief, Part A5, word for word where quoted)
- "Write like a sharp operator explaining something to a peer." Short sentences, plain verbs, "you". Show, don't claim.
- Banned words: unlock, unleash, seamless(ly), effortless(ly), leverage, robust, elevate, empower, supercharge, game-changer, revolutionize, cutting-edge, delve, harness, streamline, synergy, journey, landscape, realm, tapestry, navigate (figurative), "in today's fast-paced world", "whether you're a ... or a ...", "look no further", "say goodbye to", "take it to the next level", "imagine a world".
- No em dashes. No exclamation marks. No emojis. No "It's not X, it's Y". No slogans or fake urgency.
- "AI agent" or "browser agent", never a bare "agent". Captain is Captain. viaSocket with a lowercase v. The app count is written 2,300+.
- No dates in the text, no credits, no prices for 50agents ("free to start" at most).
- "Use only the triggers, actions and apps in the input. If the data doesn't answer a question, leave the question out."
- Numbers: only the stat above, and numbers that are in the row or the catalog.
- Internal links are written [label](/path) and only to pages that exist (src/site/routes.ts).
- No stats blocks: at most one sourced number, as a sentence.
- In a guide, facts about other tools (limits, plans, settings) may be named when read today on their own pages and listed in `sources`.
