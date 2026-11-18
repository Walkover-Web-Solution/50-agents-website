// The checked facts behind every comparison page (pages-brief B4). One record per tool: each fact, the page it was read on, and the date.
// Read on each tool's own site on 19 Nov 2026. A fact we could not find on the tool's own page is left out, never estimated.
// The Search team re-checks every record every 90 days (next by 17 Feb 2027): open each url, compare, change the fact and its date.

export const CHECKED = '19 Nov 2026';
export const CHECKED_ISO = '2026-11-19';

export type Fact = { fact: string; url: string; read: string };
export type Mark = 'yes' | 'no' | 'partly';
export type Cell = { v: Mark | 'text'; note: string; url: string; read: string };

// The rows a versus table can show. A tool shows only the rows it has a checked cell for.
export type RowKey =
  | 'free' | 'price' | 'apps' | 'prompt' | 'aiAgent' | 'browser' | 'appBuilder' | 'database'
  | 'publicApps' | 'fixed' | 'approval' | 'handEdit' | 'code' | 'selfHost' | 'export';

export const ROWS: Record<RowKey, string> = {
  free: 'Free to start',
  price: 'First paid plan',
  apps: 'Apps it connects to',
  prompt: 'Builds from a plain-language request',
  aiAgent: 'AI agents',
  browser: 'Works in a web browser for you',
  appBuilder: 'Builds apps with your own records and screens',
  database: 'Built-in database',
  publicApps: 'Apps for people outside your team, on your own domain',
  fixed: 'Fixed-step automations (trigger, then actions)',
  approval: 'Waits for your approval before a step',
  handEdit: 'Edit steps by hand in a visual editor',
  code: 'Code steps',
  selfHost: 'Run it on your own servers',
  export: 'Export what you built',
};

export type ToolId =
  | 'fifty' | 'zapier' | 'make' | 'n8n' | 'pipedream' | 'lindy' | 'gumloop' | 'relevance' | 'relay'
  | 'bardeen' | 'activepieces' | 'ifttt' | 'powerautomate' | 'softr' | 'glide' | 'homeassistant' | 'uipath' | 'shortcuts';

export type Tool = {
  id: ToolId;
  name: string;
  site: string;
  what: Fact; // what it is for, in plain words
  free?: Fact;
  price?: Fact;
  apps?: Fact;
  status?: Fact; // shut down or closing
  cells: Partial<Record<RowKey, Cell>>;
  limits: Fact[]; // limitations stated or plainly implied on its own pages
  better: Fact[]; // where it is better than 50agents
  move?: Fact; // how work leaves it
};

const R = CHECKED;
const c = (v: Cell['v'], note: string, url: string): Cell => ({ v, note, url, read: R });
const f = (fact: string, url: string): Fact => ({ fact, url, read: R });

// 50agents' own facts come from the live app's source and its product docs (agentic-apps/app: PRODUCT.md,
// features/*/CLAUDE.md, settings/pricing.ts; gtm/FACTS.md), read 19 Nov 2026. The url is the homepage; the app is the source.
const HOME = 'https://50agents.com';
const fifty: Tool = {
  id: 'fifty',
  name: '50agents',
  site: HOME,
  what: f('You tell Captain what you need in one sentence, and it builds an app, an automation, an AI agent or a browser agent that does the work in your real apps.', HOME),
  free: f('Every workspace starts free with 2,000 credits.', HOME),
  price: f('$1 buys 1,000 credits; you pay for the AI and app work you use.', HOME),
  apps: f('2,300+ apps through viaSocket.', HOME),
  cells: {
    free: c('yes', 'Every workspace starts free with 2,000 credits', HOME),
    price: c('text', '$1 buys 1,000 credits', HOME),
    apps: c('text', '2,300+ apps through viaSocket', HOME),
    prompt: c('yes', 'Captain builds it from one sentence and asks before guessing', HOME),
    aiAgent: c('yes', 'Instructions, connected apps, a schedule or trigger, its own chat', HOME),
    browser: c('yes', 'Browser agents read and use websites that have no app to connect', HOME),
    appBuilder: c('yes', 'Lists, boards, tables and numbers, run by a crew of AI agents', HOME),
    database: c('yes', 'An app keeps its records in 50agents; import and export CSV', HOME),
    publicApps: c('no', 'Apps are for the people in your workspace', HOME),
    fixed: c('yes', 'Automations run the same steps every time, on an event or a schedule', HOME),
    approval: c('yes', 'Anything that reaches people outside, spends money or changes access waits for your yes', HOME),
    handEdit: c('no', 'You see every step, but changes go through chat', HOME),
    code: c('no', 'Steps are fixed blocks; there is no code step', HOME),
    selfHost: c('no', 'Hosted only', HOME),
    export: c('partly', 'App records export as CSV; automations and AI agents do not export', HOME),
  },
  limits: [
    f('It is new: the product went live in November 2026, so it has far fewer finished examples and much less community help than older tools.', HOME),
    f('There is no drag-and-drop editor. You see each step, and you change it by asking in chat.', HOME),
    f('No self-hosting and no code steps.', HOME),
    f('Apps are for your own workspace; there are no customer portals or custom domains.', HOME),
  ],
  better: [],
};

const ZAP_PRICING = 'https://zapier.com/pricing';
const zapier: Tool = {
  id: 'zapier',
  name: 'Zapier',
  site: 'https://zapier.com',
  what: f('Fixed-step automations (Zaps) across a very large app catalog, plus Tables, Forms and Zapier Agents.', 'https://zapier.com/'),
  free: f('Free plan: 100 tasks a month, two-step Zaps only, 15-minute polling.', ZAP_PRICING),
  price: f('Professional: $19.99 a month billed yearly, or $29.99 billed monthly, for 750 tasks a month.', ZAP_PRICING),
  apps: f('"Zapier connects 10537+ apps."', 'https://zapier.com/apps'),
  cells: {
    free: c('yes', '100 tasks a month, two-step Zaps', ZAP_PRICING),
    price: c('text', '$19.99 a month billed yearly (750 tasks)', ZAP_PRICING),
    apps: c('text', '10,537+ apps', 'https://zapier.com/apps'),
    prompt: c('yes', 'Copilot builds Zaps from chat', ZAP_PRICING),
    aiAgent: c('yes', 'Zapier Agents, billed in activities', ZAP_PRICING),
    browser: c('partly', 'The Zapier Agents Chrome extension works on the page you have open', 'https://help.zapier.com/hc/en-us/articles/29025734470925-Use-Zapier-Agents-Chrome-extension'),
    appBuilder: c('yes', 'Tables and Forms', 'https://zapier.com/interfaces'),
    fixed: c('yes', 'Zaps', 'https://zapier.com/'),
    approval: c('yes', 'Human in the Loop, on Professional and up', 'https://help.zapier.com/hc/en-us/articles/38731463206029-Request-approval-to-keep-your-workflow-running-with-Human-in-the-Loop'),
    handEdit: c('yes', 'The Zap editor', 'https://zapier.com/'),
    code: c('yes', 'JavaScript or Python steps', ZAP_PRICING),
    export: c('partly', 'JSON export of Zaps on Team and Enterprise only', 'https://help.zapier.com/hc/en-us/articles/8496308481933-Import-and-export-Zaps-in-your-Team-or-Enterprise-account'),
  },
  limits: [
    f('Every action step counts as a task, code and AI steps included, so a five-step Zap uses up to five tasks a run.', ZAP_PRICING),
    f('Exporting Zaps as JSON is only on Team and Enterprise; Free and Professional cannot export.', 'https://help.zapier.com/hc/en-us/articles/8496308481933-Import-and-export-Zaps-in-your-Team-or-Enterprise-account'),
  ],
  better: [
    f('It connects far more apps: 10,537+ against 50agents\' 2,300+.', 'https://zapier.com/apps'),
    f('Mature admin controls for large companies, such as SCIM and role-based access.', 'https://zapier.com/'),
  ],
  move: f('Team and Enterprise accounts can export Zaps as JSON.', 'https://help.zapier.com/hc/en-us/articles/8496308481933-Import-and-export-Zaps-in-your-Team-or-Enterprise-account'),
};

const make: Tool = {
  id: 'make',
  name: 'Make',
  site: 'https://www.make.com',
  what: f('A visual canvas for building automations (scenarios) and AI agents.', 'https://www.make.com/en'),
  free: f('Free plan: 1,000 credits a month.', 'https://www.make.com/en/pricing'),
  price: f('Paid plans start at $9 a month for 10,000 credits (Core), as Make\'s own comparison page states.', 'https://www.make.com/compare/make-vs-zapier'),
  apps: f('"Connect 3,500+ apps out of the box."', 'https://www.make.com/en'),
  cells: {
    free: c('yes', '1,000 credits a month', 'https://www.make.com/en/pricing'),
    price: c('text', 'From $9 a month for 10,000 credits (Core)', 'https://www.make.com/compare/make-vs-zapier'),
    apps: c('text', '3,500+ apps', 'https://www.make.com/en'),
    prompt: c('partly', 'Maia builds scenarios from a prompt; public beta on paid plans', 'https://help.make.com/introduction-to-maia-by-make'),
    aiAgent: c('yes', 'Make AI Agents', 'https://www.make.com/en/ai-agents'),
    appBuilder: c('partly', 'Data stores, but no screens or interfaces', 'https://www.make.com/en/pricing'),
    fixed: c('yes', 'Scenarios', 'https://www.make.com/en'),
    approval: c('yes', 'Manual approvals in AI agents', 'https://www.make.com/en/ai-agents'),
    handEdit: c('yes', 'The visual canvas', 'https://www.make.com/en'),
    code: c('yes', 'JavaScript or Python', 'https://www.make.com/en'),
    export: c('yes', 'Scenarios export as a blueprint (.json)', 'https://help.make.com/blueprints'),
  },
  limits: [
    f('Billing is per credit and "most actions consume 1 credit", so every module in a scenario adds to the cost of each run.', 'https://www.make.com/en/pricing'),
    f('Maia, the prompt builder, is a public beta on paid plans, with a 30-day trial on Free.', 'https://help.make.com/introduction-to-maia-by-make'),
  ],
  better: [
    f('A mature visual canvas for branching, looping scenarios you can edit module by module.', 'https://www.make.com/en'),
    f('More apps: 3,500+ against 50agents\' 2,300+.', 'https://www.make.com/en'),
  ],
  move: f('A scenario exports as a blueprint, a .json file you can import elsewhere in Make.', 'https://help.make.com/blueprints'),
};

const N8N_PRICING = 'https://n8n.io/pricing/';
const n8n: Tool = {
  id: 'n8n',
  name: 'n8n',
  site: 'https://n8n.io',
  what: f('A workflow builder for technical teams, with an AI Agent node, that you can run in n8n\'s cloud or on your own servers.', 'https://n8n.io/'),
  free: f('No free cloud plan: a free trial with 1,000 executions. A self-hosted version is "available on GitHub".', N8N_PRICING),
  price: f('Starter: €20 a month billed yearly, for 2.5K workflow executions. Pro: €50 a month billed yearly, for 10K.', N8N_PRICING),
  apps: f('The integrations directory lists 2829 integrations.', 'https://n8n.io/integrations/'),
  cells: {
    free: c('partly', 'Cloud trial with 1,000 executions; self-hosted version on GitHub', N8N_PRICING),
    price: c('text', '€20 a month billed yearly (2.5K executions)', N8N_PRICING),
    apps: c('text', '2,829 integrations listed', 'https://n8n.io/integrations/'),
    prompt: c('yes', 'The AI Assistant helps create and edit workflows', 'https://docs.n8n.io/build/ways-of-building-workflows/ai-assistant'),
    aiAgent: c('yes', 'AI Agent node on all plans', N8N_PRICING),
    appBuilder: c('partly', 'Data tables, no app screens', 'https://docs.n8n.io/build/work-with-data/data-tables'),
    fixed: c('yes', 'Workflows', 'https://n8n.io/'),
    approval: c('yes', 'Human approval for tool calls', N8N_PRICING),
    handEdit: c('yes', 'The node canvas', 'https://n8n.io/'),
    code: c('yes', 'Code node in JavaScript or Python', 'https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.code'),
    selfHost: c('yes', 'Self-host on your own servers', 'https://n8n.io/'),
    export: c('yes', 'Workflows download as JSON', 'https://docs.n8n.io/workflows/export-import/'),
  },
  limits: [
    f('There is no free cloud plan, and Starter is capped at 2.5K executions a month.', N8N_PRICING),
    f('Prices are shown in euros and billed yearly; the Business plan (€667 a month) is self-hosted only.', N8N_PRICING),
  ],
  better: [
    f('You can run it on your own servers and keep every run and credential in your own network.', 'https://n8n.io/'),
    f('One price per run, however many steps: "An execution is a single run of your entire workflow."', N8N_PRICING),
  ],
  move: f('Each workflow downloads as JSON, or exports in bulk from the command line.', 'https://docs.n8n.io/workflows/export-import/'),
};

const pipedream: Tool = {
  id: 'pipedream',
  name: 'Pipedream',
  site: 'https://pipedream.com',
  what: f('Now sold as Connect, "the integration layer for AI agents": app connections for developers to put inside their own products.', 'https://pipedream.com/'),
  status: f('"Workflows and String are shutting down on March 31, 2027." Workflow data is deleted on April 30, 2027.', 'https://pipedream.com/docs/workflows/export-workflows'),
  free: f('A $0 plan whose credits are for development only, not production.', 'https://pipedream.com/pricing'),
  price: f('Startup: $99 a month billed yearly, or $150 billed monthly, for 10,000 credits.', 'https://pipedream.com/pricing'),
  apps: f('3,219 apps listed.', 'https://pipedream.com/apps'),
  cells: {},
  limits: [
    f('Workflows close on 31 Mar 2027, so new workflow builds there have a short life.', 'https://pipedream.com/docs/workflows/export-workflows'),
  ],
  better: [
    f('An SDK for putting app connections inside your own product, which 50agents does not offer.', 'https://pipedream.com/'),
  ],
  move: f('Each project exports as a ZIP of workflow JSON files, up to 500 workflows or 256 MB per export, with credentials removed.', 'https://pipedream.com/docs/workflows/export-workflows'),
};

const LINDY_PRICING = 'https://www.lindy.ai/pricing';
const lindy: Tool = {
  id: 'lindy',
  name: 'Lindy',
  site: 'https://www.lindy.ai',
  what: f('An AI assistant sold as an AI employee: it works in your inbox, calendar and tools and waits for your OK on anything with outside impact.', 'https://www.lindy.ai/'),
  free: f('$50 in free credits that last 7 days.', LINDY_PRICING),
  price: f('Team: from $29.99 a month for 3,000 credits, billed for every active user.', LINDY_PRICING),
  apps: f('"connects to 2,733 apps listed below, plus any MCP server."', 'https://www.lindy.ai/integrations'),
  cells: {
    free: c('partly', '$50 in credits for 7 days', LINDY_PRICING),
    price: c('text', 'From $29.99 a month per active user (3,000 credits)', LINDY_PRICING),
    apps: c('text', '2,733 apps plus MCP servers', 'https://www.lindy.ai/integrations'),
    prompt: c('yes', 'Describe it and Lindy builds it', 'https://docs.lindy.ai/teammate/apps.md'),
    aiAgent: c('yes', 'Lindy is the AI agent', 'https://www.lindy.ai/'),
    browser: c('yes', 'Drives a browser, Pro and up', 'https://www.lindy.ai/'),
    appBuilder: c('yes', 'Simple internal tools and Artifacts', 'https://docs.lindy.ai/teammate/artifacts.md'),
    fixed: c('partly', 'Routines run on a schedule or event', 'https://docs.lindy.ai/teammate/routines.md'),
    approval: c('yes', 'Outside actions wait for your OK', 'https://www.lindy.ai/'),
  },
  limits: [
    f('When the credit pool runs low, Lindy pauses credit-using actions until the next cycle, and monthly credits do not roll over.', LINDY_PRICING),
    f('Every active user in the workspace is billed.', LINDY_PRICING),
  ],
  better: [
    f('It works where you already talk: Slack, iMessage and email.', 'https://www.lindy.ai/'),
    f('It can learn a task from one demonstration ("Teach a task").', 'https://www.lindy.ai/'),
  ],
};

const GUM_CREDITS = 'https://docs.gumloop.com/core-concepts/credits.md';
const gumloop: Tool = {
  id: 'gumloop',
  name: 'Gumloop',
  site: 'https://www.gumloop.com',
  what: f('A team AI agent builder: describe the work, pick any model, and IT controls who uses which tools.', 'https://www.gumloop.com/'),
  free: f('No free plan: a 14-day Pro trial that needs a card.', GUM_CREDITS),
  price: f('Pro: $37 a month for 20,000 credits.', GUM_CREDITS),
  apps: f('"100+ MCP integrations."', 'https://www.gumloop.com/'),
  cells: {
    free: c('no', '14-day Pro trial, card needed', GUM_CREDITS),
    price: c('text', '$37 a month (20,000 credits)', GUM_CREDITS),
    apps: c('text', '100+ MCP integrations', 'https://www.gumloop.com/'),
    prompt: c('yes', 'Describe work in plain language', 'https://www.gumloop.com/'),
    aiAgent: c('yes', 'AI agents your team shares', 'https://www.gumloop.com/'),
    browser: c('yes', 'AI agent browser with saved logins', 'https://docs.gumloop.com/core-concepts/agent_browser.md'),
    appBuilder: c('partly', 'Live artifacts: HTML pages with live data', 'https://docs.gumloop.com/core-concepts/live_artifacts.md'),
    approval: c('yes', 'Gated tool calls wait for your go-ahead', 'https://docs.gumloop.com/core-concepts/human_in_the_loop.md'),
    code: c('yes', 'Code sandbox', 'https://docs.gumloop.com/core-concepts/agent_sandbox_and_secrets.md'),
    export: c('partly', 'AI agent configuration exports as JSON through the API; no import documented', 'https://docs.gumloop.com/api-reference/agents/list-agent-versions.md'),
  },
  limits: [
    f('There is no free plan; the trial needs a card and turns into a paid Pro plan unless you cancel.', GUM_CREDITS),
    f('Credits do not roll over (except on Enterprise), and AI agents stop once the overage cap is reached.', GUM_CREDITS),
  ],
  better: [
    f('A cloud browser with a credential vault, where you can watch or take over the AI agent\'s browser.', 'https://docs.gumloop.com/core-concepts/agent_browser.md'),
    f('Team controls for IT: which tools and models each person may use.', 'https://www.gumloop.com/'),
  ],
  move: f('An AI agent\'s configuration can be exported as JSON through its API and CLI.', 'https://docs.gumloop.com/api-reference/agents/list-agent-versions.md'),
};

const REL_PRICING = 'https://relevanceai.com/docs/get-started/pricing';
const relevance: Tool = {
  id: 'relevance',
  name: 'Relevance AI',
  site: 'https://relevanceai.com',
  what: f('Teams of AI agents for sales and go-to-market work ("AI Factories for GTM").', 'https://relevanceai.com/'),
  free: f('No free plan: "The Free plan is retired for new signups and existing accounts."', REL_PRICING),
  price: f('Pro: $19 a month billed yearly, or $29 billed monthly, for 2,500 actions a month. Team: $234 a month billed yearly, or $349 monthly.', REL_PRICING),
  apps: f('"2,000+ integrations"; the directory lists 2,728.', 'https://relevanceai.com/integrations'),
  cells: {
    free: c('no', 'Free plan retired', REL_PRICING),
    price: c('text', '$19 a month billed yearly (2,500 actions)', REL_PRICING),
    apps: c('text', '2,000+ integrations', 'https://relevanceai.com/pricing'),
    prompt: c('yes', 'Describe the work; Invent asks questions', 'https://relevanceai.com/'),
    aiAgent: c('yes', 'Specialist AI agents and an AI workforce', 'https://relevanceai.com/'),
    browser: c('partly', 'Through third-party browser integrations only', 'https://relevanceai.com/integrations'),
    fixed: c('yes', 'Tools: a no-code workflow builder', 'https://relevanceai.com/docs'),
    approval: c('yes', '"Approval required" steps; approve drafts from Slack or Teams', 'https://relevanceai.com/'),
    code: c('yes', 'Python code steps', 'https://relevanceai.com/docs/get-started/core-concepts/tools'),
  },
  limits: [
    f('No free plan, and extra actions cost $80 per 1,000.', REL_PRICING),
  ],
  better: [
    f('Ready-made sales AI agent teams wired into Salesforce, HubSpot and Gong.', 'https://relevanceai.com/'),
    f('AI agent evaluations and A/B tests (Enterprise), for teams running AI agents at volume.', 'https://relevanceai.com/'),
  ],
};

const relay: Tool = {
  id: 'relay',
  name: 'Relay.app',
  site: 'https://www.relay.app',
  what: f('Relay.app helped businesses automate their work with AI, with human-in-the-loop steps.', 'https://www.relay.app/'),
  status: f('"Relay.app shut down in September 2026. All accounts, workflows, and run history have been permanently deleted."', 'https://www.relay.app/'),
  cells: {},
  limits: [],
  better: [],
};

const bardeen: Tool = {
  id: 'bardeen',
  name: 'Bardeen',
  site: 'https://www.bardeen.ai',
  what: f('A sales prospecting tool: an AI web scraper finds leads, qualifies them and adds contact details.', 'https://www.bardeen.ai/'),
  free: f('"You will always get 100 credits for free"; unused credits expire each billing period.', 'https://www.bardeen.ai/pricing'),
  price: f('Basic: $10 a month for 100 more credits. Premium: $50 a month, or $480 a year, for 1,000 credits.', 'https://www.bardeen.ai/pricing'),
  cells: {},
  limits: [
    f('Credits are charged per row: 1 for scraping or web search, 3 for enrichment, so Basic\'s 100 credits enrich about 33 leads.', 'https://www.bardeen.ai/pricing'),
  ],
  better: [
    f('Ready-made scrapers and contact enrichment built for prospecting, with free CSV downloads.', 'https://www.bardeen.ai/pricing'),
  ],
  move: f('Results download as CSV at no cost, or go to Google Sheets, Airtable or Notion.', 'https://www.bardeen.ai/pricing'),
};

const AP_PRICING = 'https://www.activepieces.com/pricing';
const activepieces: Tool = {
  id: 'activepieces',
  name: 'Activepieces',
  site: 'https://www.activepieces.com',
  what: f('Open-source automations and AI agents, hosted or on your own servers, with an MIT-licensed core.', 'https://www.activepieces.com/'),
  free: f('Free: 1,000 credits, unlimited flows, up to 5 users, no card.', AP_PRICING),
  price: f('Plus: $20 a month flat for 10,000 credits and up to 5 users. Team: $200 a month for 50,000 credits and 25 users.', AP_PRICING),
  apps: f('"770+ apps."', 'https://www.activepieces.com/'),
  cells: {},
  limits: [
    f('AI steps cost 2, 10 or 20 credits depending on the model, so AI-heavy flows use up the free credits fast.', AP_PRICING),
    f('770+ apps is a smaller catalog than Zapier, Make or n8n.', 'https://www.activepieces.com/'),
  ],
  better: [
    f('Open source and self-hostable with Docker or Kubernetes, including air-gapped installs.', 'https://www.activepieces.com/docs/install/overview'),
    f('Flat team pricing rather than per user.', AP_PRICING),
  ],
};

const ifttt: Tool = {
  id: 'ifttt',
  name: 'IFTTT',
  site: 'https://ifttt.ai',
  what: f('Simple automations (Applets) between consumer apps, phones and smart-home devices.', 'https://ifttt.ai/'),
  free: f('Free: 1,000 credits a month, unlimited Applets, checks for new events every hour.', 'https://ifttt.com/plans'),
  price: f('Starter: $2.09 a month ($25.08 billed yearly) for 5,000 credits and 15-minute checks. Pro: $5.49 a month ($65.88 yearly).', 'https://ifttt.com/plans'),
  apps: f('"All 1,000+ services & apps."', 'https://ifttt.com/plans'),
  cells: {},
  limits: [
    f('The free plan checks for new events only once an hour, so a trigger can wait up to an hour.', 'https://ifttt.com/plans'),
  ],
  better: [
    f('Smart-home devices and phone apps for iOS and Android.', 'https://ifttt.ai/'),
    f('It costs very little: Starter is $25.08 a year.', 'https://ifttt.com/plans'),
  ],
};

const PA = 'https://www.microsoft.com/en-us/power-platform/products/power-automate';
const PA_PRICING = 'https://www.microsoft.com/en-us/power-platform/products/power-automate/pricing';
const powerautomate: Tool = {
  id: 'powerautomate',
  name: 'Power Automate',
  site: PA,
  what: f('Microsoft\'s automation platform: cloud flows, desktop RPA and process mining, built into Microsoft 365.', PA),
  free: f('A free licence for work or school accounts covers cloud flows without sharing and standard connectors only.', 'https://learn.microsoft.com/en-us/power-platform/admin/power-automate-licensing/types'),
  price: f('Premium: $15.00 per user a month, paid yearly. Process: $150.00 per bot a month, paid yearly, for unattended RPA.', PA_PRICING),
  apps: f('"More than 1,400 prebuilt, certified connectors."', PA),
  cells: {},
  limits: [
    f('Premium connectors and attended RPA need the $15 per user Premium licence; each unattended bot is $150 a month and runs one desktop flow at a time.', PA_PRICING),
  ],
  better: [
    f('Desktop RPA for old Windows apps with no API.', PA),
    f('Deep Microsoft 365 integration, with approvals and process mining.', PA),
  ],
  move: f('Flows export as a package (.zip) or inside a solution.', 'https://learn.microsoft.com/en-us/power-automate/export-import-flow-non-solution'),
};

const SOFTR_PRICING = 'https://www.softr.io/pricing';
const softr: Tool = {
  id: 'softr',
  name: 'Softr',
  site: 'https://www.softr.io',
  what: f('A no-code builder for business apps such as client portals and internal tools, with its own database, workflows and AI agents.', 'https://www.softr.io/'),
  free: f('Free forever: up to 3 builders, 5 app users, 5K records, 500 workflow actions a month.', SOFTR_PRICING),
  price: f('Basic: $19 a month billed yearly ($228 a year), or $25 billed monthly. Pro: $99 a month billed yearly, or $119 monthly.', SOFTR_PRICING),
  cells: {
    free: c('yes', '5 app users, 5K records, 500 workflow actions a month', SOFTR_PRICING),
    price: c('text', '$19 a month billed yearly (Basic)', SOFTR_PRICING),
    prompt: c('yes', 'AI Co-Builder makes and changes apps from plain language', 'https://docs.softr.io/start-here/ai-co-builder'),
    aiAgent: c('yes', 'Softr Agents, in apps or on a schedule', 'https://docs.softr.io/agents/overview'),
    appBuilder: c('yes', 'Portals and internal tools', 'https://www.softr.io/'),
    database: c('yes', 'Softr Databases', 'https://docs.softr.io/softr-databases/softr-databases-overview'),
    publicApps: c('yes', 'Client users and a custom domain, from Basic', 'https://docs.softr.io/publishing/add-a-custom-domain-to-your-app'),
    fixed: c('yes', 'Softr Workflows', 'https://docs.softr.io/workflows/workflows'),
    handEdit: c('yes', 'A visual editor beside the AI builder', 'https://www.softr.io/'),
    export: c('partly', 'Table data downloads as CSV or XLSX', 'https://docs.softr.io/actions/export'),
  },
  limits: [
    f('App users are capped per plan (5 on Free), and "When you hit your monthly workflow execution limit, your workflows are paused."', SOFTR_PRICING),
  ],
  better: [
    f('Branded client portals on your own domain, with separate team and client users.', 'https://docs.softr.io/publishing/add-a-custom-domain-to-your-app'),
    f('A visual editor, so you can lay out pages by hand without AI.', 'https://www.softr.io/'),
  ],
  move: f('Table data downloads as CSV or XLSX.', 'https://docs.softr.io/actions/export'),
};

const GLIDE_PRICING = 'https://www.glideapps.com/pricing';
const glide: Tool = {
  id: 'glide',
  name: 'Glide',
  site: 'https://www.glideapps.com',
  what: f('GlideOS, an AI that builds internal business apps from spreadsheets, prompts or files. The older platform is now Glide Classic.', 'https://www.glideapps.com/'),
  free: f('Free: limited credits, 2 team members, 10 projects, 0 published apps, 0 enabled workflows.', GLIDE_PRICING),
  price: f('Basic: $25 a month for 100 credits, 2 published apps and 1 workflow. Plus: $50 a month. "Annual plans are coming soon."', GLIDE_PRICING),
  apps: f('"GlideOS works with more than 1,000 services."', 'https://www.glideapps.com/integrations'),
  cells: {
    free: c('partly', 'Free to build; publishing an app or a workflow needs a paid plan', GLIDE_PRICING),
    price: c('text', '$25 a month (Basic)', GLIDE_PRICING),
    apps: c('text', '1,000+ services', 'https://www.glideapps.com/integrations'),
    prompt: c('yes', 'Start from a prompt, a PDF or a screenshot', GLIDE_PRICING),
    aiAgent: c('yes', 'Turns spreadsheets into apps and AI agents', 'https://www.glideapps.com/'),
    appBuilder: c('yes', 'Internal business apps', 'https://www.glideapps.com/docs/os/data'),
    database: c('yes', 'Every project has one database', 'https://www.glideapps.com/docs/os/data'),
    publicApps: c('yes', 'Public apps from Plus', 'https://www.glideapps.com/docs/os/publishing-and-sharing'),
    fixed: c('yes', 'Workflows, on paid plans', 'https://www.glideapps.com/docs/os/workflows'),
    export: c('partly', 'Any table exports to CSV', 'https://www.glideapps.com/docs/os/data'),
  },
  limits: [
    f('On the free plan you cannot publish an app or enable a workflow.', GLIDE_PRICING),
    f('There is no tool to move Glide Classic apps to GlideOS.', GLIDE_PRICING),
  ],
  better: [
    f('Public or guest apps that install on a phone\'s home screen.', 'https://www.glideapps.com/docs/os/publishing-and-sharing'),
    f('A Postgres connection string, so BI tools can read and write the app\'s data.', 'https://www.glideapps.com/docs/os/data'),
  ],
  move: f('Any table in a project exports to CSV.', 'https://www.glideapps.com/docs/os/data'),
};

const homeassistant: Tool = {
  id: 'homeassistant',
  name: 'Home Assistant',
  site: 'https://www.home-assistant.io',
  what: f('"Open source home automation that puts local control and privacy first."', 'https://www.home-assistant.io/'),
  apps: f('"Browse 1600+ integrations."', 'https://www.home-assistant.io/'),
  cells: {},
  limits: [
    f('You run it yourself on a device at home, so setup and updates are yours.', 'https://www.home-assistant.io/'),
  ],
  better: [
    f('"Home Assistant keeps your data local, no need for a cloud."', 'https://www.home-assistant.io/'),
  ],
};

const uipath: Tool = {
  id: 'uipath',
  name: 'UiPath',
  site: 'https://www.uipath.com',
  what: f('Enterprise robotic process automation (RPA) and AI agents, built in UiPath Studio, low-code or code-first.', 'https://www.uipath.com/pricing'),
  free: f('Community: "free forever".', 'https://www.uipath.com/pricing'),
  price: f('Basic: "Starting at $25 per month". Standard and Enterprise: contact sales.', 'https://www.uipath.com/pricing'),
  cells: {},
  limits: [
    f('Above Basic, prices are only through sales.', 'https://www.uipath.com/pricing'),
  ],
  better: [
    f('Desktop and legacy-app robots at enterprise scale.', 'https://www.uipath.com/pricing'),
  ],
};

const shortcuts: Tool = {
  id: 'shortcuts',
  name: 'Apple Shortcuts',
  site: 'https://support.apple.com/guide/shortcuts/welcome/ios',
  what: f('Apple\'s app for iPhone, iPad and Mac that runs one or more tasks with your apps, by tap or by automation.', 'https://support.apple.com/guide/shortcuts/welcome/ios'),
  cells: {},
  limits: [
    f('Automations are "specific to a device", so they run on your iPhone, not in the cloud.', 'https://support.apple.com/guide/shortcuts/intro-to-automation-shortcuts-apd690170742/ios'),
  ],
  better: [
    f('Automations start from things only your phone knows: time of day, arriving somewhere, opening an app.', 'https://support.apple.com/guide/shortcuts/intro-to-automation-shortcuts-apd690170742/ios'),
  ],
};

export const TOOLS: Record<ToolId, Tool> = {
  fifty, zapier, make, n8n, pipedream, lindy, gumloop, relevance, relay, bardeen, activepieces, ifttt, powerautomate, softr, glide, homeassistant, uipath, shortcuts,
};
