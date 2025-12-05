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
    const query = searchParams.get('q');

    if (!query) {
      return NextResponse.json(
        {
          success: false,
          error: 'Search query is required',
          data: [],
        },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${process.env.INTEGRATION_URL}/plugins/search?key=${encodeURIComponent(query)}&integrationOnly=true`,
      {
        next: { revalidate: 300 }, // Revalidate every 5 minutes for search
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ApiResponse = await response.json();

    return NextResponse.json({
      success: true,
      data: data.data,
      query,
    });
  } catch (error) {
    console.error('Failed to search plugins:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to search plugins',
        data: [],
      },
      { status: 500 }
    );
  }
}
