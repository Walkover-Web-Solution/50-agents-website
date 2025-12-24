import { NextResponse } from 'next/server';

export const runtime = 'edge';

interface Category {
  name: string;
  appcount: number;
  hidden: boolean;
}

interface CategoryApiResponse {
  data: {
    rows: Category[];
  };
}

export async function GET() {
  try {
    const response = await fetch(`${process.env.DB_BASE_URL}/65d2ed33fa9d1a94a5224235/tblh9c91k`, {
      headers: {
        'auth-key': `${process.env.VIASOCKET_DB_KEY}`,
      },
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: CategoryApiResponse = await response.json();

    // Filter categories with not hidden, sort by name and category name is not all
    const filteredCategories = data?.data?.rows
      ?.filter(category => category.hidden !== true && category.name.toLowerCase() !== 'all');

    return NextResponse.json({
      success: true,
      categories: filteredCategories,
      totalCategories: filteredCategories?.length ?? 0,
    });
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch categories',
        categories: [],
      },
      { status: 500 }
    );
  }
}
