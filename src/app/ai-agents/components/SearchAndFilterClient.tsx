'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface SearchAndFilterClientProps {
  initialSearch: string;
  initialCategory: string;
  categories: string[];
}

export default function SearchAndFilterClient({
  initialSearch,
  initialCategory,
  categories,
}: SearchAndFilterClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (searchTerm) {
      params.set('search', searchTerm);
    } else {
      params.delete('search');
    }

    if (selectedCategory) {
      params.set('category', selectedCategory);
    } else {
      params.delete('category');
    }

    const newQuery = params.toString();
    const currentQuery = searchParams.toString();

    if (newQuery === currentQuery) {
      return;
    }

    const newUrl = newQuery ? `?${newQuery}` : '';
    router.replace(`/ai-agents${newUrl}`, { scroll: false });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="mb-12 max-w-3xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search Input - 2/3 width */}
        <div className="flex-[2]">
          <div className="relative">
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
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
              className="w-full h-12 pl-12 pr-4 py-3  backdrop-blur-sm border border-dark rounded-lg  placeholder-gray-500 text-base transition-all duration-300 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 hover:border-gray-500"
            />
          </div>
        </div>
        {/* Category Dropdown - 1/3 width */}
        <div className="relative flex-1">
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="appearance-none h-12  backdrop-blur-sm border border-dark rounded-lg  text-base transition-all duration-300 cursor-pointer px-4 py-3 pr-10 shadow-lg w-full"
            style={{
              minWidth: '150px',
            }}
          >
            <option value="" className=" px-4" style={{ lineHeight: '1.2', height: '32px' }}>
              All Categories
            </option>
            {categories.map(category => (
              <option
                key={category}
                value={category}
                className="bg-gray-800 text-white px-4"
                style={{ lineHeight: '1.2', height: '32px' }}
              >
                {category}
              </option>
            ))}
          </select>
          {/* Custom dropdown arrow */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none z-10">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4M16 15l-4 4-4-4" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
