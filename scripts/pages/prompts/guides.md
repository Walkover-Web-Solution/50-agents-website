# Write one 50agents guide as JSON (v4, D254)

You write the content of one guide on 50agents.com: a method that works with any tool, with 50agents doing one step
of it. Guides are among the most important pages; Jii's brief for them: "more interactive and to the point
information". The page template is fixed (src/app/(site)/guides/[slug]/page.tsx); you only fill its fields.
Return one JSON object matching `GuidePage` in src/site/guides/types.ts. No prose outside the JSON.
The gates (scripts/pages/gates-guides.mjs) check every number below; a page that fails them is not shipped.

## Input you get
- `row`: slug, the search query it answers, group, kind, and either `ask` (the exact ask typed into Captain) or
  `useCase` (the use case page this guide overlaps), and what makes it its own page (`own`).
- `useCase`: when the row names one, that page's JSON. Link it; never repeat its steps, its table or its questions.
- `catalog`: for each app the ask uses, its real triggers and actions. Use only these names.
- `facts`: scripts/pages/product-facts.md, what 50agents can do today. Every product claim must follow from it.
- `example`: a finished guide (src/content/guides/pages/how-to-automate-invoice-reminders.json). Match its shape, length
  and tone; never reuse its sentences.

## Research first (web search)
Search the row's query. Read the top 3 to 5 results, the vendors' own help pages for every tool you name, and the
"People also ask" questions. Note what searchers still don't get answered: that is the page's reason to exist.
Facts about other tools come from those tools' own pages. Keep your notes out of the page: guides show no sources.

## To the point (Jii, round 2)
The short answer first, then steps a reader can act on. Cut every sentence that only sets up the next one: no
"In this guide", no "Let's look at", no restating the heading, no closing summary. If a section would only repeat the
steps, leave it out. 400 to 1,100 words in all.

## Fields
- `title` under 60 characters, ends " | 50agents", and starts with the query's own words (add a step count only when the page has that many steps: "How to build an AI agent without code in 7 steps"). `description` 120 to 155 characters. **Lead with the query and the answer** (SEO pass 01): the first words are the search the page answers, then the answer in the same sentence, product second. Never open with "Tell Captain". Check the length (155 characters at most) before you return it.
- `h1`: the query's wording when it reads well.
- `answer`: "The short answer", two sentences, **40 words at most in total**. The first answers the question outright,
  for any tool.
- `chooser` (optional): "Which one do I need", only when the reader has a real choice to make (which tool, which kind,
  which approach, what to do first). `h2` (a short question) and `root`, a question with 2 to 4 options (labels of 7
  words at most); each option leads `then` to another question or to an answer, and every path ends in an answer
  within 3 taps. An answer: `answer` (10 words at most), `why` (35 at most), `kind` when the answer is a kind of tool
  (its blob is drawn), `href` when a page answers it better (a guide or use case path that exists). No chooser for a
  guide whose steps are the same for everyone.
- `sections`: 0 to 2 short sections of context before the steps (`id`, `h2`, blocks: `p` of 60 words at most, `ul`
  items of 30 at most, or `table`). A table only where it compares, at most 7 rows, every cell 8 words at most (start
  a cell with Yes, No or Partly and the page draws the mark). No pictures.
- `method`: `h2` (it names the guide's job and holds the query's words, 10 words at most: "How to automate invoice reminders, step by step"; never "How to set it up" or "How to build it") and 4 to 7 steps. Each step: `title` (an action, under 8 words), `body` (40 words at most, concrete:
  what to click, type, name or decide), and an optional `note`: `{ type: "tip" | "warn", text (30 words at most),
  about }`. At most 3 notes per guide, only where a reader would otherwise get it wrong. `about` is the kind of tool the
  note is about (app, auto, ai, browser): the page draws that kind's crew blob beside it, so pick the true one.
- `captain`: `at`, the 0-based index of the step 50agents does for you (where Captain's film appears inside the steps),
  and `line`, 30 words at most on what Captain builds for that step. Then either `useCase` (exactly the row's; the
  step links to it) or `ask` (exactly the row's ask). Captain is drawn as the yellow blob; never describe it as a chip
  or a badge.
- `wrong`: "What can go wrong", 3 to 5 items: a short title, a body of two calm sentences (the problem, then the fix,
  40 words at most), and `about`, the kind of tool the problem lives in (its blob is drawn beside it).
- `faqs`: 3 or 4 questions from People also ask, each answered in 2 or 3 sentences (60 words at most).
- `related`: 3 guide slugs. `updated`: today's date, ISO (it goes to JSON-LD and the sitemap only; never on the page).

## Rules (from the brief, Part A5, word for word where quoted; and D254)
- "Write like a sharp operator explaining something to a peer." Short sentences, plain verbs, "you". Show, don't claim.
- Banned words: unlock, unleash, seamless(ly), effortless(ly), leverage, robust, elevate, empower, supercharge, game-changer, revolutionize, cutting-edge, delve, harness, streamline, synergy, journey, landscape, realm, tapestry, navigate (figurative), "in today's fast-paced world", "whether you're a ... or a ...", "look no further", "say goodbye to", "take it to the next level", "imagine a world".
- No em dashes. No exclamation marks. No emojis. No "It's not X, it's Y". No slogans or fake urgency.
- "AI agent" or "browser agent", never a bare "agent". Captain is Captain. viaSocket with a lowercase v. The app count is written 2,300+.
- **No dates anywhere on the page**: no years, no "Updated", no "Prices checked", no "as of", no "today" about a fact.
- **No sources**: no source list, no source lines, no outside links, no "according to X's help page". State the fact plainly.
- **Subheaders are one short line**: every `h2` 10 words at most.
- No credits, no prices for 50agents ("free to start" at most). Only the cost guide names other tools' prices.
- "Use only the triggers, actions and apps in the input. If the data doesn't answer a question, leave the question out."
- Numbers: only those in the row, the catalog, or another tool's own pages.
- Internal links are written [label](/path) and only to pages that exist (src/site/routes.ts). Link the matching use case and sibling guides in the body text, not only in the sitewide blocks.
- The "Read next" cards are plain links, not headings: never add a heading that is another page's title.
- No stats blocks: at most one number used as evidence, as a sentence.
