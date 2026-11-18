export const OAUTH_ISSUER = 'https://50agents.com';
export const MCP_RESOURCE = 'https://50agents.com/mcp';
export const OAUTH_SCOPES = ['mcp:tools:read', 'mcp:templates:list'] as const;

export const oauthProtectedResourceMetadata = {
  resource: MCP_RESOURCE,
  authorization_servers: [OAUTH_ISSUER],
  scopes_supported: [...OAUTH_SCOPES],
  bearer_methods_supported: ['header'],
};

export const oauthAuthorizationServerMetadata = {
  issuer: OAUTH_ISSUER,
  authorization_endpoint: 'https://50agents-app.embarko.app/login',
  token_endpoint: `${OAUTH_ISSUER}/oauth/token`,
  registration_endpoint: `${OAUTH_ISSUER}/oauth/register`,
  code_challenge_methods_supported: ['S256'],
  response_types_supported: ['code'],
  grant_types_supported: ['authorization_code', 'refresh_token'],
  scopes_supported: [...OAUTH_SCOPES],
};