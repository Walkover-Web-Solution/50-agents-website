'use client';

import { useRouter } from 'next/navigation';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  searchTerm?: string;
  selectedCategory?: string;
  hasNextPage?: boolean; // For cases where we don't know exact total pages
}

export default function Pagination({
  currentPage,
  totalPages,
  searchTerm,
  selectedCategory,
  hasNextPage
}: PaginationProps) {
  const router = useRouter();

  const buildUrl = (page: number) => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (selectedCategory) params.set('category', selectedCategory);
    if (page > 1) params.set('page', page.toString());

    const query = params.toString();
    return query ? `?${query}` : '';
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || (hasNextPage === false && page > currentPage) || page > totalPages) {
      return;
    }
    const url = buildUrl(page);
    router.push(`/ai-agents${url}`);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="mt-12 flex justify-center">
      <div className="flex items-center space-x-2">
        {/* Previous Button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className={`px-4 py-2 rounded-lg transition-colors ${currentPage > 1
              ? 'hover:!bg-gray-100 text-black border border-dark cursor-pointer'
              : 'text-gray-light bg-gray-100 cursor-not-allowed'
            }`}
        >
          Previous
        </button>

        {/* Page Numbers */}
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          let pageNum;
          if (totalPages <= 5) {
            pageNum = i + 1;
          } else if (currentPage <= 3) {
            pageNum = i + 1;
          } else if (currentPage >= totalPages - 2) {
            pageNum = totalPages - 4 + i;
          } else {
            pageNum = currentPage - 2 + i;
          }

          // Don't show page numbers beyond what we know exists
          if (hasNextPage === false && pageNum > currentPage) {
            return null;
          }

          return (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              disabled={currentPage === pageNum}
              className={`px-4 py-2 rounded-lg border border-dark transition-colors ${currentPage === pageNum
                  ? 'bg-black text-white'
                  : 'hover:!bg-gray-100 text-gray-dark cursor-pointer'
                }`}
            >
              {pageNum}
            </button>
          );
        }).filter(Boolean)}

        {/* Next Button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={hasNextPage === false || currentPage >= totalPages}
          className={`px-4 py-2 rounded-lg transition-colors ${(hasNextPage !== false && currentPage < totalPages)
              ? 'hover:!bg-gray-100 text-black border border-dark cursor-pointer'
              : 'text-gray-light bg-gray-100 cursor-not-allowed'
            }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}