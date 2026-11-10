import { MetadataRoute } from 'next';

// Only the listed pages; the old ones are delisted (noindex) for now.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: 'https://50agents.com/', changeFrequency: 'weekly', priority: 1 }];
}
