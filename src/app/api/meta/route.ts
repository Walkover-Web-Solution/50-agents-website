import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  const apiUrl = `${process.env.DB_BASE_URL}/692166171c1fffefdcd63a1e/tblq4ic9e`;

  try {
    const res = await fetch(apiUrl, {
      headers: {
        'auth-key': `${process.env.WEBSITE_DB_KEY}`,
      },
      next: {
        revalidate: 60 * 20, // Cache 20 minutes
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch metadata: ${res.status}`);
    }

    const data = await res.json();
    // never send who edited a row (names and emails) to the public
    return NextResponse.json((data?.data?.rows || []).map(({ createdby, updatedby, ...row }: any) => row));
  } catch (error: any) {
    console.error(error?.response?.data || error.message);
    return NextResponse.json({ error: 'Failed to fetch metadata' }, { status: 500 });
  }
}