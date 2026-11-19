# Write one 50agents comparison page as JSON (v4, D254)

You write the content of one comparison page on 50agents.com: an alternatives page ("Zapier alternatives") or a
versus page ("50agents vs Zapier"). The page template is fixed; you only fill its fields.
Return one JSON object matching `ComparePage` in src/site/compare/types.ts. No prose outside the JSON.

**Short is the rule (Jii, round 2).** Nobody reads a text-heavy comparison. Every field has a word limit below, and
the gates fail the page above it. Write the essentials and stop. Never load context into a subheader or a cell.

## Input you get
- `row`: slug, type, the tool the page is about, the search query, the exact ask, and for alternatives the tools to list
  (`tools`, 50agents first) or for versus the table rows (`rows`), plus what makes it its own page (`own`).
- `tools`: the checked record of every tool on the page, from src/content/compare/facts.ts: what it is, free plan,
  price, apps, status (shut down or closing), table cells (each with a short `s` the table shows), limits, where it is
  better than 50agents, how work leaves it. Each fact carries the page it was read on.
- `facts`: scripts/pages/product-facts.md, what 50agents can do today. Every claim about 50agents must follow from it.
- `example`: a finished page (src/content/compare/pages/zapier-alternatives.json). Match its shape, length and tone;
  never reuse its sentences.

## Say nothing that might cause issues
- **Competitor facts come only from facts.ts.** Every price, plan, count, limit or feature you say about another tool
  must be in its `tools` record. Copy numbers exactly (10,541+, $19.99, €20, 2.5K). Never estimate, round or add up.
  If a fact is not in the record, leave it out.
- **Neutral and factual.** State what each tool does. No judgement, no mocking, no loaded words (cheap, expensive,
  pricey, clunky, outdated, complicated, confusing, bloated, limited, painful, frustrating, struggle, worse, fed up,
  "too much", "the bill"). Not "why people leave X"; say what X is built for and what 50agents is built for.
- **No claims about their quality, security, reliability, uptime or support.**
- **Nothing about their customers or users** (who uses it, how many, what they think, why they leave).
- **No superlatives about 50agents** (best, only, fastest) and no "better than" about either side, except the one
  honest "better for" line that comes from the other tool's `better` facts.

## Research first (web search)
Search the row's query. Read the top 3 to 5 results and the "People also ask" questions. Use what you read for the
questions and the move steps only; facts about tools still come only from `tools`.

## Fields and limits
- `title` under 60 characters, ends " | 50agents", no year. `description` 120 to 160 characters, answer first.
- `h1`: the query in plain words ("Zapier alternatives", "50agents vs Zapier").
- `answer`: two sentences, **40 words at most in total**, that answer the query on their own.
  Versus: "Pick <tool> for ...", then "Pick 50agents to ...". It feeds the meta and JSON-LD; it is not shown.
- `line`: the hero's one short line under Captain's box (D255), **14 words at most**: what 50agents gives this reader.
- `ask`: exactly the row's ask.
- `lede`: the one line under the table's heading, **14 words at most**. A plain read of the table, no context.
- `notice` (alternatives, only when the tool has a `status`): `h` (5 words) and `body` (30 words at most) from the
  status fact. The only place a date may appear on the page.
- `entries` (alternatives): the row's tools in order, 50agents first. Each:
  `best` (best for, **5 words at most**), `price` (starting price, **6 words at most**, from that tool's `free` and
  `price` facts; "Free to start" for 50agents), `diff` (one key difference, **5 words at most**, neutral, from its
  facts), `src` (the facts.ts URL `diff` is read on; 50agents: https://50agents.com).
- No `stay` row (D255): tables show only where 50agents wins. The other tools' facts are listed neutrally.
- `rows` (versus): exactly the row's rows, each a 50agents win (`isWin` in facts.ts: 50agents' cell is a yes, or for
  apps a higher count). The free and paid rows are drawn first by the template, every cell from facts.ts `s`.
- No `edge` ("Better for") row (D255).
- Apps for people outside your team on your own domain, and export, are yes for 50agents (D255, product-facts.md).
- `strengths`: **3 or 4**, where 50agents is good and what it gives. Each: `title` (5 words at most), `line` (one
  line, 16 words at most), `face` (`lead` for Captain or plain words, `keeper` automation, `writer` AI agent,
  `scout` browser agent, `sorter` app). Pick the strengths that matter to this page's reader.
- `move`: **3 or 4** steps to move work over. `title` 5 words at most, `body` one line, 16 words at most. Use the
  tool's `move` fact when there is one.
- `faqs`: **3 or 4** questions from People also ask, each answered in 40 words at most.
- `related`: 3 other comparison pages (their /compare/ paths), each `line` 8 words at most.
- `updated`: today's date, ISO. It is never shown; it feeds JSON-LD and the sitemap.

## Rules (from the brief, Part A5, word for word where quoted)
- "Write like a sharp operator explaining something to a peer." Short sentences, plain verbs, "you". Show, don't claim.
- Banned words: unlock, unleash, seamless(ly), effortless(ly), leverage, robust, elevate, empower, supercharge, game-changer, revolutionize, cutting-edge, delve, harness, streamline, synergy, journey, landscape, realm, tapestry, navigate (figurative), "in today's fast-paced world", "whether you're a ... or a ...", "look no further", "say goodbye to", "take it to the next level", "imagine a world".
- No em dashes. No exclamation marks. No emojis. No "It's not X, it's Y". No slogans or fake urgency.
- "AI agent" or "browser agent", never a bare "agent". Captain is Captain. viaSocket with a lowercase v. The app count is written 2,300+.
- No credits and no prices for 50agents ("free to start" at most).
- **No dates and no source lines on the page.** No "prices checked", no "as of", no month or year, no "according to
  <tool>'s pricing page". Facts stay checked in facts.ts, which keeps the URLs and read dates. A closing date may
  appear in `notice` only.
- "Use only the triggers, actions and apps in the input. If the data doesn't answer a question, leave the question out."
- Numbers: only numbers that are in the row, the `tools` records or the facts file.
