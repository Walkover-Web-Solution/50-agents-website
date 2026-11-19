// What AI agents get when they ask for text/markdown: today's product only, and the one sign-up destination.
const SIGN_UP = 'https://50agents-app.embarko.app/login?utm_source=50agents.com&utm_medium=website&utm_content=markdown';
const CANONICAL = 'https://50agents.com/';

const HOME_DESCRIPTION =
  '50agents is a product from viaSocket. Tell Captain what you need in plain words, and it builds automations, AI agents, browser agents and apps that work across 2,300+ apps. Every workspace starts free with 2,000 credits.';

export const HOME_MARKDOWN = `---
title: 50agents
description: ${HOME_DESCRIPTION}
canonical: ${CANONICAL}
last_updated: 2026-11-18
---

# 50agents

50agents is a product from viaSocket. You tell Captain, its AI, what you need in plain words, and it builds automations, AI agents, browser agents and apps that do the work in your real apps, with 2,300+ apps through viaSocket.

Every workspace starts free with 2,000 credits.

## Links

- [Sign up or sign in](${SIGN_UP})
- [Site guide for AI agents (llms.txt)](https://50agents.com/llms.txt)
`;

export const NOT_FOUND_MARKDOWN = `# Page not found

This page does not exist on 50agents.com. It may have moved, or it never existed.

## Links

- [Home](https://50agents.com/)
- [Site guide for AI agents (llms.txt)](https://50agents.com/llms.txt)
- [Sign up or sign in](${SIGN_UP})
`;

export const MARKDOWN_HEADERS = {
  'Content-Type': 'text/markdown; charset=utf-8',
  Vary: 'Accept',
  'Cache-Control': 'public, max-age=0, must-revalidate',
  Link: '</index.md>; rel="alternate"; type="text/markdown"',
} as const;