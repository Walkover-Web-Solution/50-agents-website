import Footer from '../../components/Footer';
import Header from '../../components/Header';
import PluginGrid from './components/PluginGrid';
import SearchAndFilterClient from './components/SearchAndFilterClient';
import Pagination from './components/Pagination';
import { generateMetadata as generateSEOMetadata, generateSoftwareApplicationSchema } from '@/lib/seo';
import { headers } from "next/headers";
import { getMetaData } from '@/lib/meta';
import { getBaseUrl } from '@/lib/api';
import CategoryFilter from './components/categoryFilter';

export const runtime = 'edge';

export async function generateMetadata() {
  const headersList = await headers();
  const host = headersList.get("host");
  const proto = headersList.get("x-forwarded-proto") || "http";

  const pageUrl = `${proto}://${host}/ai-agents`;

  const meta = await getMetaData("/ai-agents", pageUrl);

  return generateSEOMetadata({
    title: meta?.title || 'AI agents',
    description: meta?.description,
    keywords: meta?.keywords,
    canonical: meta?.name,
    type: meta?.type,
  });
}

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
    page?: string;
  };
}

async function getTotalAppsCount(): Promise<number> {
  try {
    const response = await fetch(`${getBaseUrl()}/api/plugins/count`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.success ? data.count : 0;
  } catch (error) {
    console.error('Failed to fetch total apps count:', error);
    return 0;
  }
}

async function fetchPlugins(page: number, totalCount: number, limit: number = 40, category?: string): Promise<{ plugins: Plugin[], totalCount: number }> {
  try {
    const response = await fetch(`${getBaseUrl()}/api/plugins?category=${category}&page=${page}&limit=${limit}`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return {
      plugins: data.success ? data.data : [],
      totalCount
    };
  } catch (error) {
    console.error('Failed to fetch plugins:', error);
    return { plugins: [], totalCount: 0 };
  }
}

async function searchPlugins(query: string): Promise<Plugin[]> {
  try {
    const response = await fetch(`${getBaseUrl()}/api/plugins/search?q=${encodeURIComponent(query)}`, {
      next: { revalidate: 300 }, // Revalidate every 5 minutes for search
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Failed to search plugins:', error);
    return [];
  }
}

interface Category {
  name: string;
  appcount: number;
}

async function fetchCategories(): Promise<Category[]> {
  try {
    const response = await fetch(`${getBaseUrl()}/api/plugins/categories`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.success ? data.categories : [];
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return [];
  }
}

async function ServicesPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const searchTerm = resolvedSearchParams.search || '';
  const selectedCategory = resolvedSearchParams.category || '';
  const currentPage = parseInt(resolvedSearchParams.page || '1', 10);
  const itemsPerPage = 40;

  // Get total count and categories from separate fetches
  const [totalAppsCount, categoriesData] = await Promise.all([
    getTotalAppsCount(),
    fetchCategories()
  ]);

  const allCategories = categoriesData.map(cat => ({ name: cat.name, appcount: cat.appcount }));

  // Get current category app count from the categories data
  const currCatAppsCount = selectedCategory
    ? allCategories.find(cat => cat.name === selectedCategory)?.appcount || 0
    : 0;

  let paginatedPlugins: Plugin[] = [];
  let totalItems = 0;
  let totalPages = 1;
  let startIndex = 0;
  let endIndex = 0;
  let hasNextPage = undefined;

  if (searchTerm) {
    const searchResults = await searchPlugins(searchTerm);

    totalItems = searchResults.length;
    totalPages = Math.ceil(totalItems / itemsPerPage);
    startIndex = (currentPage - 1) * itemsPerPage;
    endIndex = startIndex + itemsPerPage;
    paginatedPlugins = searchResults.slice(startIndex, endIndex);
  } else if (selectedCategory) {
    const categoryData = await fetchPlugins(currentPage, currCatAppsCount, itemsPerPage, selectedCategory);

    paginatedPlugins = categoryData.plugins;
    totalItems = currCatAppsCount;
    totalPages = Math.ceil(totalItems / itemsPerPage);
    startIndex = (currentPage - 1) * itemsPerPage;
    endIndex = startIndex + paginatedPlugins.length;
  } else {
    // Regular pagination without search or category filter
    const { plugins, totalCount } = await fetchPlugins(currentPage, totalAppsCount, itemsPerPage, '');
    paginatedPlugins = plugins;

    // Use exact total count from API
    totalItems = totalCount;
    totalPages = Math.ceil(totalCount / itemsPerPage);
    startIndex = (currentPage - 1) * itemsPerPage;
    endIndex = startIndex + plugins.length;
  }

  if (paginatedPlugins.length === 0 && !searchTerm && !selectedCategory) {
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
      <div className="flex-1 pt-16">
        <div className="container mx-auto  pb-8 text-black">
          {/* Page Header */}
          <div className="border border-dark px-4 mb-16 h-[300px] flex items-center mx-auto justify-center bg-cover" style={{
            backgroundImage: 'var(--bg-cross-lines)'
          }}>
            <div className="text-center bg-background w-fit mx-auto p-4 border-dark border-2">
              {selectedCategory ? (
                <h1 className="h1">
                  AI agents for {currCatAppsCount} {selectedCategory} apps
                </h1>
              ) : (
                <h1 className="h1">AI Agents for {Math.floor((+totalAppsCount + 100) / 50) * 50}+ Apps</h1>
              )}
            </div>
          </div>

          {/* Search and Filter Controls */}
          <SearchAndFilterClient
            initialSearch={searchTerm}
          />

          <div className="flex gap-3">
            <CategoryFilter initialCategory={selectedCategory} categories={allCategories} />

            {/* Services Grid */}
            <PluginGrid plugins={paginatedPlugins} />
          </div>
          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            searchTerm={searchTerm}
            selectedCategory={selectedCategory}
            hasNextPage={hasNextPage}
          />
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default ServicesPage;
