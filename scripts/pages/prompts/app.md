# Write the lines of one 50agents app page as JSON (T65)

You write three short pieces for one app's page on 50agents.com (for example `/integrations/hubspot`): what teams use
this app for with 50agents, its most useful template (or single trigger or action) and why, and one thing to watch out
for. They show as three compact cards under the hero ("<App> in practice"). Return one JSON object, saved as
`src/content/integrations/app-lines/<slug>.json`:

    { "usedFor": "...", "bestTemplate": { "name": "...", "why": "..." }, "watchOut": "..." }

No prose outside the JSON. Write every app from its own input; never carry a sentence or an example from one app to
another. If the input does not support an honest line, write no file and list the slug and the reason.

## Input (scripts/pages/inputs/apps/<slug>.json, built by build-inputs-apps.mjs)
- `name`, `labels`, `about`: the app from viaSocket's catalog.
- `triggers` (with `delivery`: `hook` is pushed when it happens, `polling` is checked on a schedule) and `actions`
  (lookup-only actions are left out), each with the catalog's description.
- `templates`: real templates between this app and another app, written “<trigger>” in <App>, then “<action>” in <App>.
- The product facts: scripts/pages/product-facts.md. A product claim must follow from it.

## The three fields (each ONE sentence, 20 words at most)
- `usedFor`: the job this app does for a team in 50agents, from what the app holds and its real triggers and actions.
  Name at least one real trigger or action in curly quotes. The app's catalog `name` appears exactly as written.
- `bestTemplate`: `name` is one template from `templates` copied exactly; when `templates` is empty, one real trigger or
  action of this app written “<Event Name>” in <App>. `why`: why it is the most useful, from what the trigger carries and
  what the action does.
- `watchOut`: one real thing to check, from the input: a `polling` trigger (checks on a schedule), an action that needs
  an ID or a required field, one that deletes, a trigger that fires on updates as well as new records, or the product
  facts (anything that reaches someone outside waits for approval; AI agents run on a schedule or when asked). Never
  invent a limit, field or behaviour.

## Rules
- Short sentences, plain verbs, "you". No em dashes, no exclamation marks, no emojis, no slogans.
- Banned words: unlock, unleash, seamless(ly), effortless(ly), leverage, robust, elevate, empower, supercharge,
  game-changer, revolutionize, cutting-edge, delve, harness, streamline, synergy, journey, landscape, realm, tapestry.
- "AI agent" or "browser agent", never a bare "agent". Captain is Captain. viaSocket lowercase v. No counts of triggers,
  actions or templates, no prices, credits or dates. "template", never "recipe".
- Name only this app, plus the other app inside a quoted template from `templates`. Never name WhatsApp or another app
  outside that.
- SMS, MMS or WhatsApp sends go "through your <App> account"; never say 50agents sends them.
- Vary openings; never open with "<App> lets you" or "It fires when".
- Skip (no file) a junk or test app, or one whose input supports no honest line.
