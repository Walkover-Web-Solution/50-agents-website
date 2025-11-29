import Footer from '../../components/Footer';
import Header from '../../components/Header';
import PluginGrid from './components/PluginGrid';
import SearchAndFilterClient from './components/SearchAndFilterClient';
import { generateMetadata as generateSEOMetadata, generateSoftwareApplicationSchema } from '@/lib/seo';

export const runtime = 'edge';

// SEO Metadata for AI Agents page
export const metadata = generateSEOMetadata({
  title: 'AI Agents Directory - 5000+ Intelligent Automation Tools',
  description:
    'Browse our comprehensive directory of 5000+ AI agents that automate tasks across popular apps. Find the perfect AI agent for your workflow needs - from CRM automation to social media management.',
  keywords:
    'ai agents directory, automation tools, intelligent agents, workflow automation, ai integrations, business automation, productivity agents, ai apps, automated workflows, ai assistant tools',
  canonical: '/ai-agents',
  type: 'website',
});

// Interface for the plugin data structure based on the API response
interface Plugin {
  rowid: string;
  name: string;
  description: string;
  appslugname: string;
  iconurl: string;
  category: string[];
  domain: string;
  brandcolor: string;
  autonumber: number;
}

interface ApiResponse {
  message: string;
  data: Plugin[];
}

interface PageProps {
  searchParams: {
    search?: string;
    category?: string;
  };
}

async function fetchPlugins(): Promise<Plugin[]> {
  try {
    const response = await fetch('https://plugservice-api.viasocket.com/api/v1/plugins/all?limit=100', {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ApiResponse = await response.json();
    return data.data;
  } catch (error) {
    console.error('Failed to fetch plugins:', error);
    return [];
  }
}

async function ServicesPage({ searchParams }: PageProps) {
  const plugins = await fetchPlugins();
  const resolvedSearchParams = await searchParams;
  const searchTerm = resolvedSearchParams.search || '';
  const selectedCategory = resolvedSearchParams.category || '';

  // Get unique categories for filtering
  const allCategories = Array.from(new Set(plugins.flatMap(plugin => plugin.category)))
    .filter(Boolean)
    .sort();

  // Filter plugins based on search term and category
  const filteredPlugins = plugins.filter(plugin => {
    const matchesSearch =
      !searchTerm ||
      plugin.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plugin.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || plugin.category?.includes(selectedCategory);

    return matchesSearch && matchesCategory;
  });

  if (plugins.length === 0) {
    return (
      <div className="min-h-screen w-full flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center pt-20">
          <div className="text-center p-8 rounded-lg shadow-md max-w-md">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Services</h2>
            <p className="text-gray-600 mb-4">Failed to load agents from the API</p>
          </div>
        </div>
      </div>
    );
  }

  // Generate structured data
  const structuredData = generateSoftwareApplicationSchema();

  return (
    <div className="min-h-screen w-full flex flex-col">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <Header />
      <div className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="h1">Available Services</h1>
            <p className="sub__h1 mb-4">Discover and integrate powerful agents into your workflow</p>
            <div className="inline-flex items-center bg-base text-black px-6 py-3 rounded-full font-bold text-lg">
              🎯 {filteredPlugins.length} Services Available
            </div>
          </div>

          {/* Search and Filter Controls */}
          <SearchAndFilterClient
            initialSearch={searchTerm}
            initialCategory={selectedCategory}
            categories={allCategories}
          />

          {/* Services Grid */}
          <PluginGrid plugins={filteredPlugins} />
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default ServicesPage;
