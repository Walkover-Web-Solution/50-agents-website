// Guide 3 (pages-brief B5). Research: OWASP LLM06:2025 Excessive Agency, Google OAuth 2.0 policies, MCP security best
// practices, WorkOS, read 19 Nov 2026. 50agents: Connections and the rules in app/PRODUCT.md (D188, D225, D226).
import type { Guide } from './types';
import { APPS } from './apps';

const g: Guide = {
  slug: 'how-to-give-an-ai-agent-access-to-your-apps-safely',
  n: 3,
  group: 'AI agents',
  kind: 'ai',
  title: 'How to give an AI agent access to your apps safely | 50agents',
  description:
    'Give an AI agent only the apps its job needs, read access by default, and an approval on every send, payment or permission change. A checklist with sources.',
  h1: 'How to give an AI agent access to your apps safely',
  short:
    'Connect only the apps one job needs, let the AI agent read on its own, and make every send, payment, deletion or permission change wait for a person to approve it, enforced by the tool rather than by a line in the prompt. Then keep a log of every action it takes and know how to cut its access in one click.',
  published: '2026-11-19',
  updated: '2026-11-19',
  sections: [
    {
      id: 'risk',
      h2: 'What actually goes wrong',
      body: [
        { p: 'OWASP, the security group behind the best-known list of web risks, names this one "Excessive Agency" in its 2025 list for AI applications. It has three causes: the AI agent has more functions than the job needs, more permissions than it needs, or more freedom to act without a check ([OWASP](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/)).' },
        { p: 'Its worked example is worth knowing by heart. An assistant that summarises your email can also send email. Someone mails you a message with hidden instructions; the assistant reads it and forwards your private mail to them. Nothing was hacked. The assistant did what text told it, with a permission it never needed.' },
        { note: 'The lesson: text an AI agent reads (emails, web pages, documents) can carry instructions. You cannot stop it reading them, so limit what it can do after reading.' },
      ],
    },
    {
      id: 'checklist',
      h2: 'The checklist',
      body: [
        {
          steps: [
            { title: 'One job, its own apps', body: 'Connect the apps this job needs and nothing else. An AI agent that drafts replies needs your inbox, not your accounting app.' },
            { title: 'Read by default', body: 'Reading is low risk; changing is not. Start every AI agent read-only and add write actions one by one, when a job needs them.' },
            { title: 'Narrow scopes on the consent screen', body: 'Google’s policy for apps is to ask for the smallest set of permissions a feature needs, at the moment the person uses it ([Google](https://developers.google.com/identity/protocols/oauth2/policies)). If a tool asks for full access to everything on day one, ask why.' },
            { title: 'Approvals the tool enforces', body: 'A sentence in the instructions saying "ask before sending" guides the AI but cannot stop it. The approval must be a step the software will not skip: the send waits until a person taps yes.' },
            { title: 'Sort actions by what they can break', body: 'Sends to customers, payments, deleting, sharing and adding people are high risk; label changes and notes in your own tools are low. OpenAI suggests rating each tool low, medium or high on whether it writes, whether it can be undone and whether money moves ([OpenAI](https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf)).' },
            { title: 'A log of every action', body: 'What it did, in which app, and why. You will need it the first time a customer asks "why did I get this email?".' },
            { title: 'Know how to cut it off', body: 'Pause the AI agent, and know where to revoke its connection: in the tool, and in the app’s own security settings (Google Account, Microsoft, HubSpot).' },
          ],
        },
      ],
    },
    {
      id: 'questions',
      h2: 'Questions to ask any vendor',
      body: [
        {
          ul: [
            'Does the AI agent use my login, or a connection I can limit to some AI agents?',
            'Which actions can it take without me, and can I change that per AI agent?',
            'Is the approval enforced by the product, or written in the prompt?',
            'Where is the log of what it did, and how far back does it go?',
            'When I disconnect an app, what stops working, and what keeps its data?',
          ],
        },
      ],
    },
    {
      id: 'example',
      h2: 'How it works in 50agents',
      body: [
        { p: 'In 50agents you connect an app once for the workspace, and each AI agent uses only the apps in its plan. A connection can be limited to some AI agents; an AI agent that needs one it cannot use stops and asks "Give <agent> access". By default an AI agent reads on its own and asks in Needs you before any change in your apps. Anything that spends money, reaches people outside your workspace or changes who has access always asks first. Every action lands in Activity with what and why.' },
        {
          view: {
            type: 'agent',
            face: 'writer',
            name: 'Support replies',
            kindWord: 'AI agent',
            status: 'Live · every 3 hours on weekdays · next run 15:00',
            latest: { title: '3 support emails, 2 replies drafted', when: 'Today 12:00, on schedule', summary: 'Two questions answered from your returns policy. One message about a damaged parcel left for you: I did not know your rule for replacements.', state: 'Waits on you' },
            runs: [
              { title: '1 support email, 1 reply drafted', when: 'Today 9:00', state: 'Done' },
              { title: 'No new support email', when: 'Yesterday 18:00', state: 'Done' },
            ],
            setup: [['Uses', 'Gmail (the support@ mailbox)'], ['Does alone', 'Reads email, reads memory'], ['Asks first', 'Sending any email, any change in your apps']],
          },
          caption: 'An AI agent’s page in 50agents: its latest work, its runs, and in Setup the apps it uses, what it does alone and what asks you first. Example data.',
        },
      ],
    },
  ],
  wrong: [
    { title: 'Prompt injection through email or web pages', body: 'A message tells the AI agent to do something. If the AI agent can only read and draft, the worst case is a bad draft you decline.' },
    { title: 'It inherited all your access', body: 'You connected your admin account to an AI agent that needed one mailbox. Use a narrower account or a shared mailbox where you can.' },
    { title: 'Approval fatigue', body: 'Fifty approvals a day and you start tapping yes without reading. Cut what asks to what matters, and batch the rest into one report.' },
    { title: 'A stale connection keeps working', body: 'Someone left, or a project ended, and the AI agent still has their access. Review connections monthly and remove what no AI agent uses.' },
    { title: 'Customer data in the wrong place', body: 'An AI agent copies contact details into a shared channel or a sheet anyone can open. Say in its instructions where data may go, and check its first runs.' },
  ],
  faqs: [
    { q: 'Should an AI agent use my login or its own account?', a: 'Its own, limited one where the app allows it (a shared mailbox, a restricted user). Where it must use yours, limit what it may do without asking.' },
    { q: 'Are OAuth permissions enough on their own?', a: 'No. They decide what the AI agent can reach, not what it should do. Pair them with approvals on risky actions and a log.' },
    { q: 'How do I take access away?', a: 'Pause or delete the AI agent, disconnect the app in the tool, and revoke the app in the provider’s security settings, for example your Google Account’s third-party access page.' },
  ],
  sources: [
    { label: 'OWASP: LLM06:2025 Excessive Agency', href: 'https://genai.owasp.org/llmrisk/llm062025-excessive-agency/' },
    { label: 'Google: OAuth 2.0 policies', href: 'https://developers.google.com/identity/protocols/oauth2/policies' },
    { label: 'Model Context Protocol: Security best practices', href: 'https://modelcontextprotocol.io/specification/draft/basic/security_best_practices' },
    { label: 'OpenAI: A practical guide to building agents (PDF)', href: 'https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf' },
  ],
  related: ['how-to-make-an-ai-agent-ask-before-it-acts', 'how-to-write-instructions-for-an-ai-agent', 'how-to-choose-an-ai-agent-builder'],
};

export default g;
