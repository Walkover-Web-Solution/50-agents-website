export const MCP_SERVER_CARD_SCHEMA =
  'https://static.modelcontextprotocol.io/schemas/v1/server-card.schema.json';

export const MCP_SERVER_CARD_MEDIA_TYPE = 'application/mcp-server-card+json';

/** Static SEP-2127 server card; aligned with public/server.json registry metadata. */
export const MCP_SERVER_CARD = {
  $schema: MCP_SERVER_CARD_SCHEMA,
  name: 'com.50agents/website-docs',
  title: '50agents website',
  version: '0.1.0',
  description: 'Public MCP for 50agents agent templates and site metadata.',
  websiteUrl: 'https://50agents.com',
  repository: {
    url: 'https://github.com/Walkover-Web-Solution/50-agents-website',
    source: 'github' as const,
  },
  remotes: [
    {
      type: 'streamable-http',
      url: 'https://50agents.com/mcp',
      supportedProtocolVersions: ['2025-11-25', '2024-11-05'],
    },
  ],
};