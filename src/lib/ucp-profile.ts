/** UCP business profile for agent checkout discovery (50agents.com). */
export const ucpBusinessProfile = {
  ucp: {
    version: '2026-04-08',
    services: {
      'dev.ucp.shopping': [
        {
          version: '2026-04-08',
          spec: 'https://ucp.dev/2026-04-08/specification/overview',
          transport: 'embedded',
          endpoint: 'https://50agents.com/pricing',
        },
      ],
    },
    capabilities: {
      'dev.ucp.shopping.checkout': [
        {
          version: '2026-04-08',
          spec: 'https://ucp.dev/2026-04-08/specification/checkout',
          schema: 'https://ucp.dev/2026-04-08/schemas/shopping/checkout.json',
        },
      ],
    },
    payment_handlers: {},
  },
} as const;