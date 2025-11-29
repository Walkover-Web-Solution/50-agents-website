import { Metadata } from 'next';

interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  type?: 'website' | 'article';
  image?: string;
  noIndex?: boolean;
}

export function generateMetadata(config: SEOConfig): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://50agents.com';
  const siteName = '50Agents';

  const fullTitle = config.title.includes(siteName) ? config.title : `${config.title} | ${siteName}`;

  return {
    title: fullTitle,
    description: config.description,
    keywords: config.keywords,

    // Basic meta tags
    robots: config.noIndex ? 'noindex, nofollow' : 'index, follow',

    // Canonical URL
    alternates: {
      canonical: config.canonical ? `${baseUrl}${config.canonical}` : undefined,
    },

    // Open Graph
    openGraph: {
      title: fullTitle,
      description: config.description,
      url: config.canonical ? `${baseUrl}${config.canonical}` : baseUrl,
      siteName,
      type: config.type || 'website',
      images: config.image
        ? [
            {
              url: config.image.startsWith('http') ? config.image : `${baseUrl}${config.image}`,
              width: 1200,
              height: 630,
              alt: fullTitle,
            },
          ]
        : [
            {
              url: `${baseUrl}/og-image.png`, // Default OG image
              width: 1200,
              height: 630,
              alt: siteName,
            },
          ],
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: config.description,
      images: config.image
        ? [config.image.startsWith('http') ? config.image : `${baseUrl}${config.image}`]
        : [`${baseUrl}/og-image.png`],
      creator: '@50agents',
    },
  };
}

// Structured Data generators
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '50Agents',
    url: 'https://50agents.com',
    logo: 'https://50agents.com/50_agents_logo.png',
    description:
      'Deploy AI agents that perform any task inside 5000+ apps just by typing a prompt. Automate workflows, manage tasks, and boost productivity with intelligent AI agents.',
    sameAs: [
      // Add social media URLs here when available
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: 'English',
    },
  };
}

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: '50Agents',
    url: 'https://50agents.com',
    description: 'AI Agents for Every App - Perform Any Task with Natural Language',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://50agents.com/ai-agents?search={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateSoftwareApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: '50Agents',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description:
      'Deploy AI agents that perform any task inside 5000+ apps just by typing a prompt. Automate workflows, manage tasks, and boost productivity with intelligent AI agents.',
    url: 'https://50agents.com',
    author: {
      '@type': 'Organization',
      name: '50Agents',
    },
    offers: {
      '@type': 'Offer',
      category: 'SaaS',
      priceCurrency: 'USD',
    },
  };
}
