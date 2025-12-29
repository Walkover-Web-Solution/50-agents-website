'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface CategoryFilterProps {
    initialCategory: string;
  categories: { name: string; appcount: number }[];
}

const CategoryFilter = ({ initialCategory, categories }: CategoryFilterProps) => {
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const router = useRouter();
    const searchParams = useSearchParams();

      useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());
    
        if (selectedCategory) {
          params.set('category', selectedCategory);
        } else {
          params.delete('category');
        }
    
        // Check if search or category has changed from initial values
        const categoryChanged = selectedCategory !== initialCategory;
    
        // Reset to page 1 only when search or category changes from their initial values
        if (categoryChanged) {
          params.delete('page');
        }
    
        const newQuery = params.toString();
        const currentQuery = searchParams.toString();
    
        if (newQuery === currentQuery) {
          return;
        }
    
        const newUrl = newQuery ? `?${newQuery}` : '';
        router.replace(`/ai-agents${newUrl}`, { scroll: false });
      }, [selectedCategory, initialCategory]);
    return (
        <div className="min-w-[252px] hidden sm:block h-full border-2 border-dark overflow-y-auto scrollbar-thin py-2 max-h-[800px]">
            <div>
                <ul>
                    <li
                        onClick={() => setSelectedCategory('')}
                        className={`cursor-pointer transition-all duration-300 px-4 py-2 ${
                            selectedCategory === '' 
                                ? 'border-l-4 border-[var(--primary-color)]' 
                                : 'bg-transparent hover:bg-gray-100 border-gray-300 hover:border-dark'
                        }`}
                    >
                        <span className="text-base font-medium">All Categories</span>
                    </li>
                    {categories.map(category => (
                        <li
                            key={category.name}
                            onClick={() => setSelectedCategory(category.name)}
                            className={`cursor-pointer transition-all duration-300 px-4 py-2 flex justify-between items-center ${
                                selectedCategory === category.name 
                                    ? 'border-l-4 border-[var(--primary-color)]' 
                                    : 'bg-transparent hover:bg-gray-100 border-gray-300 hover:border-dark'
                            }`}
                        >
                            <span className="text-base font-medium">{category.name}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CategoryFilter;
