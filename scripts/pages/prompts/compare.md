# Write one 50agents comparison page as JSON

You write the content of one comparison page on 50agents.com: an alternatives page ("Zapier alternatives") or a
versus page ("50agents vs Zapier"). The page template is fixed; you only fill its fields.
Return one JSON object matching `ComparePage` in src/site/compare/types.ts. No prose outside the JSON.

## Input you get
- `row`: slug, type, the tool the page is about, the search query, the exact ask, and for alternatives the tools to list
  (`tools`, 50agents first) or for versus the table rows (`rows`), plus what makes it its own page (`own`).
- `tools`: the checked record of every tool on the page, from src/content/compare/facts.ts: what it is, free plan,
  price, apps, status (shut down or closing), table cells, limits, where it is better than 50agents, how work leaves it.
  Each fact carries the page it was read on.
- `facts`: scripts/pages/product-facts.md, what 50agents can do today. Every claim about 50agents must follow from it.
- `example`: a finished page (src/content/compare/pages/zapier-alternatives.json). Match its shape, length and tone;
  never reuse its sentences.

## Competitor facts come only from facts.ts
- Every price, plan, count, limit or feature you say about another tool must be in its `tools` record. Copy numbers
  exactly as written there (10,537+, $19.99, €20, 2.5K). Never estimate, round, add up or work out a new number.
- If a fact you want is not in the record, leave it out and write the field without it. New facts reach facts.ts only
  through the Search team's check, never through a page.
- The table draws its facts from facts.ts itself. Your `price` per alternative is a short line from that tool's
  `free` and `price` facts. The gates check every number you write against facts.ts and fail the page on a mismatch.
- Every page says where the other tool is better: `pick.them` comes from the tool's `better` facts and cells.

## Research first (web search)
Search the row's query. Read the top 3 to 5 results and the "People also ask" questions. Note what searchers still
don't get answered (an honest limitation, how to move work over). Use what you read for the questions and the move
steps only; facts about tools still come only from `tools`.

## Fields
- `title` under 60 characters, ends " | 50agents", no year. `description` 120 to 160 characters, answer first.
- `h1`: the query in plain words ("Zapier alternatives", "50agents vs Zapier").
- `answer`: two sentences, 40 words at most each, that answer the query on their own. Versus: "Pick <tool> if ...", then "Pick 50agents if ...".
- `ask`: exactly the row's ask.
- `lede`: one sentence (30 words at most) under the table's heading: why people look, or the plain read of the table.
- `notice` (alternatives, only when the tool has a `status`): `h` and a `body` quoting the status fact. The only place a date may appear.
- `entries` (alternatives): the row's tools in order, 50agents first. `suits` (30 words at most) for this page's reader,
  `price` ("Free to start" for 50agents), `limit` (one honest limitation, 35 words at most), `limitUrl` (the facts.ts page it is read on).
- `rows` (versus): exactly the row's rows. Price is drawn first by the template.
- `pick`: `us` (Pick 50agents if) and `them` (where the other tool is better), 2 or 3 lines each, 30 words at most.
- `move`: 3 or 4 short numbered steps to move work over, 45 words at most each, from the tool's `move` fact when there is one.
- `faqs`: 3 to 5 questions from People also ask, each answered in 2 or 3 sentences, 70 words at most.
- `related`: 3 other comparison pages (their /compare/ paths), each with a short line.
- `updated`: today's date, ISO.

## Rules (from the brief, Part A5, word for word where quoted)
- "Write like a sharp operator explaining something to a peer." Short sentences, plain verbs, "you". Show, don't claim.
- Banned words: unlock, unleash, seamless(ly), effortless(ly), leverage, robust, elevate, empower, supercharge, game-changer, revolutionize, cutting-edge, delve, harness, streamline, synergy, journey, landscape, realm, tapestry, navigate (figurative), "in today's fast-paced world", "whether you're a ... or a ...", "look no further", "say goodbye to", "take it to the next level", "imagine a world".
- No em dashes. No exclamation marks. No emojis. No "It's not X, it's Y". No slogans or fake urgency.
- "AI agent" or "browser agent", never a bare "agent". Captain is Captain. viaSocket with a lowercase v. The app count is written 2,300+.
- No dates in the text, no credits, no prices for 50agents ("free to start" at most).
- "Use only the triggers, actions and apps in the input. If the data doesn't answer a question, leave the question out."
- Numbers: only numbers that are in the row, the `tools` records or the facts file.
- Comparison pages only: the one date on the page is "Prices checked <Month Year>" under the table, which the template writes. A closing date may appear in `notice` only.
