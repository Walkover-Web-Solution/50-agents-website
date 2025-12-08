import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  try {
    const response = await fetch(`${process.env.INTEGRATION_URL}/get-apps-count`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      count: data.count || 0,
    });
  } catch (error) {
    console.error('Failed to fetch total apps count:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch total apps count',
        count: 0,
      },
      { status: 500 }
    );
  }
}
