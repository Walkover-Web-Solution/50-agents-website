import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // PostHog's endpoints end in a slash (/ingest/e/); Next must not redirect them away (posthog.com/docs/libraries/next-js)
    skipTrailingSlashRedirect: true,
    // The catalog snapshot (21 MB) and the pages' JSON are read at build time only (every page that reads them is
    // pre-rendered), so no server function carries them. Traced in, they bloat every function's config, and next-on-pages
    // fails converting 2,000+ pre-rendered pages ("Invalid string length").
    outputFileTracingExcludes: {
        '*': ['src/content/**/*.json'],
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'stuff.thingsofbrand.com',
            },
            {
                protocol: 'https',
                hostname: 'thingsofbrand.com',
            },
            {
                protocol: 'https',
                hostname: 'mailmeteor.com',
            },
            {
                protocol: 'https',
                hostname: 'upload.wikimedia.org',
            },
            {
                protocol: 'https',
                hostname: 'storage.googleapis.com',
            }
        ],
    },
    // The new home page (repositioning, Nov 2026): the landing is static files in public/landing, served at /.
    // Built from agentic-apps/landing with build-live.py; the old page.tsx stays until the site audit.
    async rewrites() {
        const wantsMarkdown = [
            { type: 'header' as const, key: 'accept', value: '(.*)text/(x-)?markdown(.*)' },
        ];
        return {
            beforeFiles: [
                { source: '/', has: wantsMarkdown, destination: '/index.md' },
                { source: '/', destination: '/landing/index.html' },
            ],
            fallback: [{ source: '/:path*', has: wantsMarkdown, destination: '/missing.md' }],
        };
    },
    async redirects() {
        return [
            // /services/* and old app pages are redirected by src/middleware.ts (one hop to /integrations when the app is in the catalog)
        ];
    },
    async headers() {
        return [
            {
                source: '/',
                headers: [
                    {
                        key: 'Link',
                        value:
                            '</llms.txt>; rel="describedby"; type="text/plain", </llms-full.txt>; rel="alternate"; type="text/plain"; title="Full agent context", </.well-known/api-catalog>; rel="api-catalog", </.well-known/ai-catalog.json>; rel="ai-catalog"; type="application/ai-catalog+json", </openapi.json>; rel="service-desc"; type="application/json", </server.json>; rel="service-desc"; type="application/json", </server-card>; rel="service-desc"; type="application/mcp-server-card+json", </mcp/server-card>; rel="service-desc"; type="application/mcp-server-card+json", </sitemap-main.xml>; rel="sitemap"',
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
