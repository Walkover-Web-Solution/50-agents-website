import type { NextConfig } from "next";
import { HOME_AGENT_LINK_HEADER } from "./src/lib/home-link-header";

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
                        value: HOME_AGENT_LINK_HEADER,
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
