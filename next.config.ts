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
        return { beforeFiles: [{ source: '/', destination: '/landing/index.html' }] };
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
};

export default nextConfig;
