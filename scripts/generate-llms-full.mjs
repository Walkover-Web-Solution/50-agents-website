/**
 * Builds public/llms-full.txt for agent one-shot context (read.llms-full).
 * Run via prebuild on each publish.
 */
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const outPath = path.join(root, 'public/llms-full.txt');
const llmsPath = path.join(root, 'public/llms.txt');

// Search S52: the upgraded app pages, listed in llms.txt (between markers, rewritten on every build) with their markdown
// twins, and their full markdown appended to llms-full.txt below.
const v4Dir = path.join(root, 'src/content/integrations/v4');
const v4 = fs.existsSync(v4Dir) ? fs.readdirSync(v4Dir).filter(f => f.endsWith('.json')).sort().map(f => JSON.parse(fs.readFileSync(path.join(v4Dir, f), 'utf8'))) : [];
if (fs.existsSync(llmsPath)) {
  const START = '<!-- apps:start -->', END = '<!-- apps:end -->';
  const section = v4.length ? `${START}\n## Apps, in depth\n\nEverything you can do with each app on 50agents, by chore, with asks that open Captain.\n\n${v4.map(p => `- [${p.h1}](https://50agents.com/integrations/${p.slug}) ([markdown](https://50agents.com/integrations/${p.slug}.md)): ${p.answer[0]}`).join('\n')}\n${END}` : '';
  let t = fs.readFileSync(llmsPath, 'utf8');
  t = t.includes(START) ? t.replace(new RegExp(`${START}[\\s\\S]*?${END}`), section) : `${t.trimEnd()}\n\n${section}\n`;
  fs.writeFileSync(llmsPath, t.replace(/\n{3,}/g, '\n\n'));
}
const llmsTxt = fs.existsSync(llmsPath)
  ? fs.readFileSync(llmsPath, 'utf8').trim()
  : '';

const body = `${llmsTxt}

## Product overview

50agents (https://50agents.com) is a product from viaSocket. You tell Captain, its AI, what you need in plain words, and it builds automations, AI agents, browser agents and apps that do the work in your real apps, across 2,300+ apps through viaSocket.

Every workspace starts free with 2,000 credits. Sign up or sign in at https://50agents-app.embarko.app/login.

### The four kinds of thing Captain builds

- **Automations:** the same steps every time, on an event or a schedule (for example: an invoice is paid, a thank-you email goes out, a message is posted in Slack). AI can be one step inside an automation, such as writing an email.
- **AI agents:** judgement decides what to do on each run. An AI agent has instructions, its connected apps, a schedule or trigger, and its own chat.
- **Browser agents:** work on websites where there is no app to connect, such as a supplier portal or a competitor's pricing page, by using the site the way a person would.
- **Apps:** your own screens and records, built for you and run by AI agents, such as a lead tracker or an invoices desk.

### How it fits your team

Drafts wait for approval, and anything that spends money, reaches people outside your business, or changes access asks you first. You decide how much each AI agent does on its own.

### Company

50agents is from viaSocket (2,300+ app connections), by the team behind viaSocket and MSG91.

## Site map

| Path | Summary |
|------|---------|
| / | Home: what 50agents is, how it works, FAQs |
| /use-cases | Ready-made jobs Captain builds, one page each |
| /ai-agents, /automations, /browser-agents, /apps | One hub per kind of thing Captain builds |
| /integrations | Every app 50agents works with, A to Z; /integrations/<app> for one app, /integrations/<app>/<app> for a pair |
| /guides, /compare | How-to guides and comparisons |
| /pricing | Plans, credits and top-ups (also /pricing.md) |
| /about, /contact, /support | The company and how to reach it |
| https://50agents-app.embarko.app/login | Sign up for a free workspace, or sign in |
| /llms.txt | Short guide for AI agents |
| /llms-full.txt | This file: the full public context in one request |
| /index.md | The home page in markdown |
| /ask | NLWeb natural-language query over the public pages |

## FAQs (from the live site)

**What is 50agents?**
You tell it how your business works, and it builds the apps, AI agents and automations that do that work for you, across the tools you already use.

**Do I need to code or set anything up?**
No. You describe the job in plain words. It builds it, connects your tools and runs it.

**Which tools does it work with?**
2,300+ apps through viaSocket, from Gmail and Slack to Shopify and QuickBooks. Where a website has no connection, a browser agent uses it the way a person would.

**Will it act without asking me?**
Only as far as you allow. You decide how much each AI agent does on its own, and anything that changes something in your apps asks you first until you say otherwise.

**What does it cost to start?**
Nothing. Every workspace starts free with 2,000 credits.

**Who makes it?**
The team behind viaSocket and MSG91.

## For AI agents

- /.well-known/ai-catalog.json: every machine-readable resource on this site
- /.well-known/agent-skills.json: what an agent can do here today
- /index.md and /pricing.md: the home and pricing pages in markdown
- /sitemap.xml: every indexed page, one sitemap per family
- /ask: NLWeb query over the public pages
- /products.json: product manifest and probe questions
- The Link header on / lists llms.txt, llms-full.txt, the home page in markdown, the AI catalog, the agent skills and the sitemap.

To open Captain with a person's job already typed, link them to https://50agents-app.embarko.app/login?draft=<the job, URL-encoded, up to 499 characters>. The draft is kept through sign-up or sign-in; nothing is built until the person taps Build it.

## Canonical answers for common questions

**What is 50agents?** You tell Captain what you need in plain words, and it builds automations, AI agents, browser agents and apps that do the work across 2,300+ apps through viaSocket.

**Which tools?** 2,300+ apps through viaSocket; browser agents cover websites without a connection.

**How do I start?** Sign up at https://50agents-app.embarko.app/login. Every workspace starts free with 2,000 credits.

**Where do I see what 50agents does with one app?** https://50agents.com/integrations/<app>, with its triggers, actions and templates; the integration sitemaps list every indexed app.

**How do I search the site?** POST /ask with a natural-language question.

---

End of the 50agents public context. The product itself is the app at https://50agents-app.embarko.app; this file covers the website only.
`;

const KL = { auto: 'Automation', ai: 'AI agent', browser: 'Browser agent', app: 'App' };
const apps = v4.map(p => [`## ${p.h1}`, '', p.answer.join(' '), '', `Page: https://50agents.com/integrations/${p.slug} (markdown: https://50agents.com/integrations/${p.slug}.md)`, '',
  ...p.chores.flatMap(c => [`### ${c.label}`, '', ...c.jobs.map(j => `- ${j.title} (${KL[j.kind]}): ${j.body} Ask: "${j.ask}"`), '']),
  ...p.faqs.flatMap(f => [`**${f.q}** ${f.a}`, ''])].join('\n')).join('\n');
const full = apps ? body.replace('\n---\n\nEnd of the 50agents public context', `\n# Apps, in depth\n\n${apps}\n---\n\nEnd of the 50agents public context`) : body;
fs.writeFileSync(outPath, full, 'utf8');
const size = Buffer.byteLength(full, 'utf8');
if (size < 5000) {
  console.error(`generate-llms-full: output only ${size} bytes (need 5000+)`);
  process.exit(1);
}
console.log(`generate-llms-full: wrote ${outPath} (${size} bytes)`);