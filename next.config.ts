import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        unoptimized: true,
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
