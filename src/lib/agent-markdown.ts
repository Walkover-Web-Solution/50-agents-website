// What AI agents get when they ask for text/markdown: today's product only, and the one sign-up destination.
const SIGN_UP = 'https://50agents-app.embarko.app/login?utm_source=50agents.com&utm_medium=website&utm_content=markdown';

export const HOME_MARKDOWN = `---
title: 50agents
description: Tell it how you work. 50agents builds apps, AI agents and automations on your tools or from scratch, working across 2,300+ apps. From viaSocket.
canonical: https://50agents.com/
last_updated: 2026-11-19
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
} as const;
