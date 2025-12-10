'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface SearchAndFilterClientProps {
  initialSearch: string;
}

export default function SearchAndFilterClient({
  initialSearch,
}: SearchAndFilterClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (searchTerm) {
      params.set('search', searchTerm);
    } else {
      params.delete('search');
    }

    // Check if search or category has changed from initial values
    const searchChanged = searchTerm !== initialSearch;

    // Reset to page 1 only when search or category changes from their initial values
    if (searchChanged) {
      params.delete('page');
    }

    const newQuery = params.toString();
    const currentQuery = searchParams.toString();

    if (newQuery === currentQuery) {
      return;
    }

    const newUrl = newQuery ? `?${newQuery}` : '';
    router.replace(`/ai-agents${newUrl}`, { scroll: false });
  }, [searchTerm, initialSearch]);

  return (
    <div className="mb-12 max-w-4xl mx-auto">
      {/* Search Input */}
      <div>
        <div className="relative">
          <svg
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-dark w-5 h-5 z-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search agents..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full h-12 pl-12 pr-4 py-3 border-2 border-dark rounded-lg placeholder-gray-500 text-base transition-all duration-300 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 hover:border-gray-500"
          />
        </div>
      </div>
    </div>
  );
}
