import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

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

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '40', 10);
    const offset = (page - 1) * limit;
    const category = searchParams.get('category') || '';

    const response = await fetch(
      `${process.env.INTEGRATION_URL}/api/v1/plugins/all?category=${category}&limit=${limit}&offset=${offset}`,
      {
        next: { revalidate: 3600 }, // Revalidate every hour
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ApiResponse = await response.json();

    return NextResponse.json({
      success: true,
      data: data.data,
      pagination: {
        page,
        limit,
        offset,
      },
    });
  } catch (error) {
    console.error('Failed to fetch plugins:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch plugins',
        data: [],
      },
      { status: 500 }
    );
  }
}
