// Guide 4 (pages-brief B5). Research: OpenAI agents guide (PDF), Anthropic's Claude prompting best practices, Mistral's
// agent instructions help page, JetBrains, read 19 Nov 2026.
import type { Guide } from './types';
import { APPS } from './apps';

const g: Guide = {
  slug: 'how-to-write-instructions-for-an-ai-agent',
  n: 4,
  group: 'AI agents',
  kind: 'ai',
  title: 'How to write instructions for an AI agent | 50agents',
  description:
    'Write AI agent instructions as a job description: the job, the case it handles, the steps, the output, the reason behind each rule, and what to do when unsure.',
  h1: 'How to write instructions for an AI agent',
  short:
    'Write them like a job description for a careful new hire: the one job, which cases it handles, the steps in order, what the output looks like, and what to do when information is missing. Give the reason behind each rule instead of shouting it in capitals, and test the instructions on real cases every time you change them.',
  published: '2026-11-19',
  updated: '2026-11-19',
  sections: [
    {
      id: 'template',
      h2: 'A template that works',
      body: [
        { p: 'Seven short parts, in this order. Most AI agents need 100 to 250 words; if yours runs past a page, it is probably two jobs.' },
        {
          table: {
            head: ['Part', 'What to write', 'Example (support replies)'],
            rows: [
              ['Job', 'One sentence', 'Reply to customer questions that arrive at support@.'],
              ['Cases', 'What it handles and what it leaves', 'Questions about orders, delivery and returns. Leave complaints and refunds for me.'],
              ['Steps', 'Numbered, each with an action', '1. Read new email from the last 3 hours. 2. Look up the order. 3. Draft a reply.'],
              ['Facts to use', 'Where the answers live', 'Use the returns policy and delivery times in memory. Never quote a price that is not there.'],
              ['Output', 'The exact shape', 'Under 120 words, greeting with first name, sign off as "The Fernhill team".'],
              ['When unsure', 'The fallback', 'If you cannot answer from what you know, do not draft. Tell me what you would need.'],
              ['Why', 'The reasons behind the rules', 'Customers screenshot replies, so a wrong promise costs more than a slow answer.'],
            ],
          },
        },
      ],
    },
    {
      id: 'principles',
      h2: 'What the model makers say',
      body: [
        { p: 'OpenAI’s guide for AI agent builders gives four habits: start from the procedures, scripts and policies you already have; break dense text into numbered steps; tie every step to a clear action or output, down to the wording of messages; and spell out edge cases, such as what to do when the customer leaves out an order number ([OpenAI](https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf)).' },
        { p: 'Anthropic adds two that surprise people. First, explain why: its example swaps "never use ellipses" for the reason (a voice engine cannot read them), and the model then applies the rule more sensibly. Second, drop the capitals: newer models follow instructions closely, so "CRITICAL: you MUST" makes them overdo it; plain "use this when..." works better ([Anthropic](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices)).' },
        { p: 'Anthropic also notes that models take requests literally. "Suggest changes" may get you suggestions and no changes. Say which you want: act, or only propose.' },
      ],
    },
    {
      id: 'before-after',
      h2: 'Before and after',
      body: [
        {
          table: {
            head: ['Before', 'After'],
            rows: [
              ['Be helpful and answer customer emails professionally.', 'Reply to questions about orders, delivery and returns sent to support@ in the last 3 hours. Leave complaints and refund requests for me.'],
              ['NEVER make anything up.', 'Answer only from the returns policy and delivery times in memory. If the answer is not there, do not draft; tell me what is missing. A wrong promise to a customer is worse than a late reply.'],
              ['Keep it short.', 'Under 120 words. First name in the greeting. Sign off as "The Fernhill team". No bullet points.'],
              ['Handle edge cases appropriately.', 'If the email has no order number, ask for it in one line. If it is in another language, reply in that language.'],
            ],
          },
        },
      ],
    },
    {
      id: 'steps',
      h2: 'How to write and test them, step by step',
      body: [
        {
          steps: [
            { title: 'Start from what you already tell people', body: 'Your returns policy, the email you send new staff, your canned replies. Paste them in as facts; do not rewrite them from memory.' },
            { title: 'Write the job and the cases first', body: 'One sentence for the job, then what it handles and what it leaves. Most bad AI agents fail here, not in the details.' },
            { title: 'Number the steps', body: 'One action per step. If a step says "and", it is probably two.' },
            { title: 'Describe the output exactly', body: 'Length, tone, greeting, sign-off, format. Paste one good example if you have it.' },
            { title: 'Write the unsure line', body: 'What it does when the facts are missing, the case is unclear, or a search finds nothing. "Skip it and tell me why" is a good default.' },
            { title: 'Test on 10 real cases', body: 'Include the awkward ones. Change one thing at a time and run the same cases again, so you know which change helped.' },
          ],
        },
      ],
    },
    {
      id: 'example',
      h2: 'A worked example in 50agents',
      body: [
        { p: 'In 50agents, Captain writes the first version of an AI agent’s instructions from your sentence, and shows them on the plan before you build. After that, you change them by telling the AI agent in its chat ("never reply to complaints, flag them for me"); each change is a version you can undo. The facts it uses, such as your returns policy, live in its memory, where you can read and correct them.' },
        { ask: 'Set up an AI agent that reads new support emails, drafts a reply from what you know about my business, and asks me before sending' },
        {
          view: {
            type: 'agent',
            face: 'writer',
            name: 'Support replies',
            kindWord: 'AI agent',
            status: 'Live · every weekday at 9:00, 12:00 and 15:00',
            latest: { title: '4 support emails, 3 replies drafted', when: 'Today 12:00, on schedule', summary: 'Three answered from your returns policy and delivery times. One left for you: it asks for a refund, which your instructions say is yours to answer.', state: 'Waits on you' },
            runs: [
              { title: '2 support emails, 2 replies drafted', when: 'Today 9:00', state: 'Done' },
              { title: 'Version 3: refunds are left for you', when: 'Yesterday 16:20', state: 'Done' },
            ],
            setup: [['Instructions', 'Reply to questions about orders, delivery and returns... Leave complaints and refunds for me...'], ['Uses', 'Gmail'], ['Asks first', 'Sending any email']],
          },
          caption: 'The AI agent’s page: its latest run followed the new rule from version 3 and left a refund request for the owner. Example data.',
        },
      ],
    },
  ],
  wrong: [
    { title: 'It does more than you meant', body: 'The instructions said what to do but not what to leave. Add the cases it should not touch.' },
    { title: 'It applies a rule too literally', body: 'A bare rule with no reason. Add the why, and the model can tell when the rule applies.' },
    { title: 'The important rule gets lost', body: 'The instructions grew to two pages. Cut what the AI agent never uses, and move reference facts into memory.' },
    { title: 'It reports "nothing found" when there was something', body: 'It searched the wrong way (for the word "unread" instead of the unread label, for example). Tell it what to search and to say what it searched for when it finds nothing.' },
    { title: 'Changes break what worked', body: 'You fixed one case and broke another. Keep your 10 test cases and run all of them after each change.' },
  ],
  faqs: [
    { q: 'How long should AI agent instructions be?', a: 'As short as covers the job, the cases, the steps, the output and the unsure case. For most small-business AI agents that is 100 to 250 words, plus reference facts kept separately.' },
    { q: 'Should I include examples?', a: 'One good example of the output helps a lot, especially for tone. Several examples of inputs belong in your test set, not in the instructions.' },
    { q: 'What goes in instructions and what goes in memory?', a: 'Instructions say how to do the job. Memory holds facts that change: prices, policies, opening hours. Keeping them apart means you update a price without touching the job.' },
  ],
  sources: [
    { label: 'OpenAI: A practical guide to building agents (PDF)', href: 'https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf' },
    { label: 'Anthropic: Claude prompting best practices', href: 'https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices' },
  ],
  related: ['how-to-build-an-ai-agent-without-code', 'how-to-make-an-ai-agent-ask-before-it-acts', 'how-to-draft-email-replies-with-ai-and-still-check-them'],
};

export default g;
