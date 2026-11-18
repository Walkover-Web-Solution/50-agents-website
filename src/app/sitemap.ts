import { MetadataRoute } from 'next';

const baseUrl = 'https://50agents.com';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${baseUrl}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/pricing`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/ai-agents`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/templates`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/work-management`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/ai-note-taker`, changeFrequency: 'monthly', priority: 0.7 },
  ];
}
