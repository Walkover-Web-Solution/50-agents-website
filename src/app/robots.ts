import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://50agents.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/org', '/api/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/org', '/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap-main.xml`, // /sitemap.xml is redirected outside this repo; see sitemap-main.xml/route.ts
    host: baseUrl,
  };
}
