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
  // the public address, fixed: the env value pointed canonicals at api.50agents.com (SEO audit, 18 Nov)
  const baseUrl = 'https://50agents.com';
  const siteName = '50agents';

  const fullTitle = config.title.includes(siteName) ? config.title : `${config.title} | ${siteName}`;

  return {
    title: fullTitle,
    description: config.description,
    keywords: config.keywords,

    // Basic meta tags
    robots: config.noIndex ? 'noindex, follow' : 'index, follow',

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

/** Official profiles and support contacts (privacy policy, 25 Apr 2025). Keep in sync with public/landing/index.html JSON-LD. */
export const ORGANIZATION_SAME_AS = [
  'https://github.com/Walkover-Web-Solution/50-agents-website',
  'https://chromewebstore.google.com/detail/50-agents/cbnmcgaklkfcengkfcheejpkjghilfio',
  'https://viasocket.com',
] as const;

export const ORGANIZATION_CONTACT_POINT = {
  '@type': 'ContactPoint',
  contactType: 'customer service',
  email: 'support@viasocket.com',
  telephone: '+91-731-2560056',
  availableLanguage: 'English',
} as const;

// Structured Data generators
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '50agents',
    url: 'https://50agents.com',
    logo: 'https://50agents.com/50_agents_logo.png',
    description:
      'Deploy AI agents that perform any task inside 2,300+ apps just by typing a prompt. Automate workflows, manage tasks, and boost productivity with intelligent AI agents.',
    sameAs: [...ORGANIZATION_SAME_AS],
    contactPoint: { ...ORGANIZATION_CONTACT_POINT },
  };
}

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: '50agents',
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
    name: '50agents',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description:
      'Deploy AI agents that perform any task inside 2,300+ apps just by typing a prompt. Automate workflows, manage tasks, and boost productivity with intelligent AI agents.',
    url: 'https://50agents.com',
    author: {
      '@type': 'Organization',
      name: '50agents',
    },
    offers: {
      '@type': 'Offer',
      category: 'SaaS',
      priceCurrency: 'USD',
    },
  };
}
