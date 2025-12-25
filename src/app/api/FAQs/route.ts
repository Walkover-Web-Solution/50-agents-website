import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
    const apiUrl = `${process.env.DB_BASE_URL}/692166171c1fffefdcd63a1e/tbl50g9c6`;

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
            throw new Error(`Failed to fetch FAQs: ${res.status}`);
        }

        const data = await res.json();
        return NextResponse.json(data?.data?.rows || []);
    } catch (error: any) {
        console.error(error?.response?.data || error.message);
        return NextResponse.json({ error: 'Failed to fetch FAQs' }, { status: 500 });
    }
}


