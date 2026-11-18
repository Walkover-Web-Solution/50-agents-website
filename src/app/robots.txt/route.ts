export const runtime = 'edge';

const ROBOTS = `User-agent: *
Allow: /
Disallow: /org
Disallow: /api/
Disallow: /ingest
Content-Signal: search=yes, ai-input=yes, ai-train=no

User-agent: Googlebot
Allow: /
Disallow: /org
Disallow: /api/
Disallow: /ingest

Host: https://50agents.com
Sitemap: https://50agents.com/sitemap-main.xml
`;

export function GET() {
  return new Response(ROBOTS, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}