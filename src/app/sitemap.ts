import { MetadataRoute } from 'next';

// Only indexable pages: the home page. The old product pages are noindex and stay out (SEO, 18 Nov).
// lastModified is the date the landing last changed: update it with each landing deploy (a request-time date would be false).
const HOME_UPDATED = '2026-11-18';
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: 'https://50agents.com/', lastModified: HOME_UPDATED, changeFrequency: 'weekly', priority: 1 }];
}
