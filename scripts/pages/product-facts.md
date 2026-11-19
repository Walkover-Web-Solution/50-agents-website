# What 50agents can do today (the pipeline's source of product truth)

Every product claim a page makes must follow from a line here. Keep it in step with the app
(agentic-apps/app: PRODUCT.md, src/features/*/CLAUDE.md, product/problem-ledger.md). Last checked against the app: Nov 2026.

## The product
- You tell Captain what you need in one sentence; Captain asks a few short questions, shows a plan, and builds it when you tap Build it.
- Four kinds: an **app** (your own lists and screens, run by AI agents), an **automation** (the same steps on an event or schedule; AI can be a step), an **AI agent** (decides what to do on each run, with instructions, connected apps, a schedule, its own chat), a **browser agent** (works websites with no app to connect, in its own browser).
- Works with 2,300+ apps through viaSocket. Name only apps and actions that are in the catalog input.
- Free to start. Never mention credits or prices on use case pages.

## Memory
- The workspace remembers facts about the business (hours, prices, policies, people, tone) and documents, pasted text and links you give it; AI agents answer from these.
- Each AI agent, app and automation has its own memory: instructions, what it learned, lessons from your corrections, its last runs. You can see, correct or forget any item.

## Asking first
- Anything that reaches someone outside the business (an email to a client, a reply to a customer) waits in Needs you: Approve and send, Change, or Decline. The app refuses to build a step that sends outside without asking.
- An automation's post to a Slack channel also waits for approval today.
- AI agents ask before sending, even to you, until you allow it in Settings.

## Runs
- AI agents run on a schedule (a time of day) or when you ask them in their chat; not instantly on each new email.
- Automations run on an app event (a new contact, a new payment, a new order) or a schedule.
- App crews (the AI agents inside an app) start on a record event: a record added, a field becoming a value, or a date passing by N days.
- Browser agents run on a schedule and leave a report; they can't log in for you without your OK.

## Apps (the kind)
- Lists of records with typed fields; views: board (by a choice field, with totals), table (search, sort); numbers on the Overview.
- Bring data in: add by hand, paste a table, or drop a CSV or Excel file (Captain matches the columns). A file import keeps one record per email address today.
- No sync with outside accounting or CRM apps unless an automation is built for it.
- Recipes: invoices (Collector drafts reminders a day after the due date), leads (Closer follows up, Scout reads company websites), requests (Desk drafts replies). The requests recipe has no step that pulls email in by itself.

## Shown as yes on Jii's word (D255)
- Apps for people outside your team, on your own domain ("this is there, we will bring it, so mark it as a yes").
- Exporting what you build ("we will bring the export feature as well").

## Never claim
- An email address per AI agent; Undo for changes made in outside apps; notifications by email or WhatsApp; sending on WhatsApp or SMS; any security certification; customer counts, logos or testimonials; real-time or instant runs for AI agents.
