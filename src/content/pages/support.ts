// /support and /contact (D255, round 3; D256: "everything viasocket for now", so every channel is viaSocket's own):
// viaSocket's support page (https://viasocket.com/support, read 19 Nov 2026),
// carried over channel by channel and pointed at the 50agents equivalent where one is confirmed. A channel whose 50agents
// address is not confirmed has `href: null`: it is a placeholder for Jii, never drawn on the live site (and drawn as a
// dashed "placeholder" card in development only, so the structure can be reviewed). Never fill one by guessing.
//
// Left out on purpose (viaSocket's, with no 50agents counterpart): "Hire an automation expert", "Build your app
// integration" and the SaaS links (List your app, Embed, MCP), the issue form (no form backend here), the mobile app.

export type Channel = {
  id: string;
  label: string; // the card's heading
  line: string; // one line about it
  href: string | null; // null: a placeholder until Jii confirms the 50agents address
  cta: string; // the link's words
  was: string; // what viaSocket's page offers here, for Jii
};

export type ChannelGroup = { id: string; h2: string; p: string; channels: Channel[] };

export const SUPPORT: ChannelGroup[] = [
  {
    id: 'self',
    h2: 'Find the answer yourself',
    p: 'Most questions about Captain and connections are answered here.',
    channels: [
      { id: 'help', label: 'Help Center', line: 'Guides and answers for 50agents, step by step.', href: 'https://50agents.com/help', cta: 'Open the Help Center', was: 'Help & Documentation, viasocket.com/help' },
      { id: 'privacy', label: 'Privacy', line: 'How 50agents handles your data.', href: 'https://50agents.com/help/privacy-policy', cta: 'Read the Privacy Policy', was: 'a Privacy Policy link in the footer' },
      { id: 'community', label: 'Community', line: 'Questions and answers from other people building with 50agents.', href: 'https://viasocket.com/community', cta: 'Join the community', was: 'viasocket.com/community' },
      { id: 'ideas', label: 'Request a feature', line: 'Ask for what 50agents should do next.', href: 'https://roadmap.viasocket.com/b/n0elp3vg/feature-ideas', cta: 'Suggest a feature', was: 'roadmap.viasocket.com' },
    ],
  },
  {
    id: 'person',
    h2: 'Talk to a person',
    p: 'Say which AI agent, automation or app it was, and roughly when.',
    channels: [
      { id: 'email', label: 'Email support', line: 'Write to the team about your workspace.', href: 'mailto:support@viasocket.com', cta: 'support@viasocket.com', was: 'support@viasocket.com' },
      { id: 'chat', label: 'Chat with us', line: 'For a quick question that does not need a call.', href: 'https://viasocket.com/support', cta: 'Start a chat', was: '"Talk to Human" chat on the page' },
      { id: 'call', label: 'Live support call', line: 'Share your screen with someone from the team.', href: 'https://viasocket.com/support', cta: 'Join a call', was: '"Live Support" by Google Meet' },
      { id: 'meeting', label: 'Book a meeting', line: 'Pick a time to go through your setup together.', href: 'https://cal.id/team/viasocket/workflow-setup-discussion', cta: 'Book a time', was: 'a cal.id booking form' },
      { id: 'phone', label: 'Call or WhatsApp', line: 'Phone or WhatsApp, the viaSocket team.', href: 'tel:+13154442439', cta: '+1 315 444 2439', was: '+1 315 444 2439, phone and WhatsApp, "available daily for 18 hours"' },
    ],
  },
  {
    id: 'founders',
    h2: 'Still stuck? Write to the founders',
    p: 'If the team could not help, the people who run 50agents will read it.',
    channels: [
      { id: 'founders', label: 'The founders', line: 'Write to them directly.', href: 'mailto:rpaliwal@msg91.com,pushpendra@walkover.in', cta: 'Email the founders', was: 'the viaSocket founders’ own addresses' },
    ],
  },
];

/** Every placeholder still open, for Jii. /support is indexed and in the sitemap only when this is empty. */
export const SUPPORT_OPEN = SUPPORT.flatMap(g => g.channels.filter(c => c.href === null).map(c => c.id));

/** Confirmed links the trust pages share. */
export const LINKS = {
  help: 'https://50agents.com/help',
  privacy: 'https://50agents.com/help/privacy-policy',
  careers: 'https://walkover.in/careers',
  viasocketSupport: 'https://viasocket.com/support',
};

/** The team's email for /contact. null until Jii confirms it: /contact stays noindex until then. */
export const CONTACT_EMAIL: string | null = 'support@viasocket.com';
