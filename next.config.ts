import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
            {
                source: '/services/:path*',
                destination: '/ai-agents/:path*',
                permanent: true,
            },
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
                            '</index.md>; rel="alternate"; type="text/markdown"; title="Markdown mirror", </llms.txt>; rel="describedby"; type="text/plain", </llms-full.txt>; rel="alternate"; type="text/plain"; title="Full agent context", </.well-known/api-catalog>; rel="api-catalog", </.well-known/ai-catalog.json>; rel="ai-catalog"; type="application/ai-catalog+json", </openapi.json>; rel="service-desc"; type="application/json", </server.json>; rel="service-desc"; type="application/json", </mcp/server-card>; rel="service-desc"; type="application/mcp-server-card+json", </sitemap-main.xml>; rel="sitemap"',
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
