import { sendErrorMessage } from './utils';

export async function getFaq(pageUrl: string) {
  const apiUrl = `${process.env.NEXT_PUBLIC_DB_BASE_URL}/692166171c1fffefdcd63a1e/tbl50g9c6`;

  try {
    const res = await fetch(apiUrl, {
      headers: {
        'auth-key': `${process.env.NEXT_PUBLIC_DB_KEY}`,
      },
      next: {
        revalidate: 60 * 20, // Cache 20 minutes
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch FAQs: ${res.status}`);
    }

    const data = await res.json();
    return data?.data?.rows;
  } catch (error: any) {
    console.error(error?.response?.data || error.message);
   sendErrorMessage({ error, pageUrl, source: apiUrl });
  }
}

export async function getFaqData(page: string, pageUrl: string) {
    const allFaqData = await getFaq(pageUrl);

    const matchedFaqs = allFaqData.filter((obj: any) => obj.name === page);
    return matchedFaqs;
}


