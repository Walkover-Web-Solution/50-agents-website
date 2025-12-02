import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   images: {
        unoptimized: true,
        loader: 'akamai',
        path: '',
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'placehold.co',
            },
        ],
    },
};

export default nextConfig;
