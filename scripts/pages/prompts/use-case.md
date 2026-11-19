# Write one 50agents use case page as JSON

You write the content of one use case page on 50agents.com. The page template is fixed; you only fill its fields.
Return one JSON object matching `UseCasePage` in src/site/usecase/types.ts. No prose outside the JSON.

## Input you get
- `row`: slug, the search query it answers, kind, apps (catalog slugs), category, the exact ask, and what makes it its own page.
- `catalog`: for each app, its real triggers and actions (name and description). Use only these names.
- `facts`: scripts/pages/product-facts.md, what 50agents can do today. Every product claim must follow from it.
- `example`: a finished page (src/content/use-cases/pages/chase-unpaid-invoices.json). Match its shape, length and tone; never reuse its sentences.

## Research first (web search)
Search the row's query. Read the top 3 to 5 results and the "People also ask" questions. Note how each competitor does this job
(by hand, the app's own feature, Zapier, Make, n8n or a specialist tool) and what searchers still don't get answered.

## Fields
- `title` under 60 characters, ends " | 50agents", and starts with the query's own words ("Track leads from email: a simple lead tracker"). `description` 140 to 155 characters. **Lead with the query and the answer** (SEO pass 01): the first words are the search the page answers, then the answer in the same sentence, product second. Never open with "Tell Captain". Check the length (155 characters at most) before you return it. Example: "To chase unpaid invoices automatically, list what is overdue, oldest first, and draft a polite reminder for each. You OK every one before Gmail sends it."
- `h2`: the page's own section headings (SEO pass 01), 12 words at most each, each sharing words with the query. `how` starts "How" and names the job ("How to chase unpaid invoices automatically"); `compare` starts "Other ways to" and names the job ("Other ways to chase unpaid invoices"). Never "How it works", "Other ways to do it, compared" or the H1 repeated.
- `h1`: the job in plain words (the query's wording when it reads well).
- `answer`: two sentences, 40 words at most in total. The first starts with "To <job>, tell Captain" and quotes the ask (shorten a long ask to its first clause inside the quote only if over 90 characters, keeping `ask` exact). The second says what Captain builds and what asks first.
- `ask`: exactly the row's ask.
- `stat`: at most one, only a number you read today on its primary source page, as one sentence, with the source name and URL. Leave it out if you have none.
- `build`: name (2 or 3 words), line (under 10 words), when (when it runs, true to the facts file), does (2 or 3 lines, under 9 words each), apps (the row's apps), asksFirst (under 8 words).
- `steps`: 5 steps with keys in this order: ask, plan, connect, run, then approve (if anything waits for approval) or result. Titles under 7 words; bodies 25 words at most, specific to this job.
- `run`: 3 example run lines (when, what it did), believable for this job.
- `approval` (when the last step is approve): the Needs you card: title, to (an example.com style address if an email), 1 or 2 body lines, button ("Approve and send" for emails, "Approve and post" for Slack).
- `result` (when the last step is result): a title and 2 or 3 example lines of what it produced.
- `compare`: 3 other ways people do this job (from your research), and 4 or 5 rows that matter to this searcher. Cells: "Yes", "No", "Partly" or up to 6 words; the last cell of each row is 50agents. Be fair: include at least one row where another way is better. `sources`: the competitor pages you read.
- `faqs`: 4 to 6 questions from People also ask and your research, each answered in 2 or 3 sentences, from the facts file and the catalog only. Answer a question only when the facts file or the catalog settles it; if it needs facts about another tool, leave it out and list it. Links go in answers as `[label](/path)`: link the page's matching guide (its title as the label) in the answer where the guide helps, and, on every AI agent use case, link /guides/how-to-make-an-ai-agent-ask-before-it-acts from the answer to "Will it email ... without asking me?". Only to pages that exist (src/site/routes.ts).
- `tags`: 3 to 5 lowercase words (the department, the apps, the object).
- `updated`: today's date, ISO.

## Rules (from the brief, Part A5, word for word where quoted)
- "Write like a sharp operator explaining something to a peer." Short sentences, plain verbs, "you". Show, don't claim.
- Banned words: unlock, unleash, seamless(ly), effortless(ly), leverage, robust, elevate, empower, supercharge, game-changer, revolutionize, cutting-edge, delve, harness, streamline, synergy, journey, landscape, realm, tapestry, navigate (figurative), "in today's fast-paced world", "whether you're a ... or a ...", "look no further", "say goodbye to", "take it to the next level", "imagine a world".
- No em dashes. No exclamation marks. No emojis. No "It's not X, it's Y". No slogans or fake urgency.
- "AI agent" or "browser agent", never a bare "agent". Captain is Captain. viaSocket with a lowercase v. The app count is written 2,300+.
- No dates in the text, no credits, no prices for 50agents ("free to start" at most).
- "Use only the triggers, actions and apps in the input. If the data doesn't answer a question, leave the question out."
- Numbers: only the stat above, and numbers that are in the row or the catalog.
