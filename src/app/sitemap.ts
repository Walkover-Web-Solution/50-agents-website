import { MetadataRoute } from 'next';

// Only indexable pages: the home page. The old product pages are noindex and stay out (SEO, 18 Nov).
// lastModified is the build time: the site only changes when it is rebuilt and deployed.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: 'https://50agents.com/', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 }];
}
