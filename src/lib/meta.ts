import { sendErrorMessage } from './utils';

export async function getMeta(pageUrl: string) {
  const apiUrl = `${process.env.NEXT_PUBLIC_DB_BASE_URL}/692166171c1fffefdcd63a1e/tblq4ic9e`;

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
      throw new Error(`Failed to fetch metadata: ${res.status}`);
    }

    const data = await res.json();
    return data?.data?.rows;
  } catch (error: any) {
    console.error(error?.response?.data || error.message);
    sendErrorMessage({ error, pageUrl, source: apiUrl });
  }
}


export async function getMetaData(name: string, pageUrl: string) {
  const allMetaData = (await getMeta(pageUrl)) || [];
  const matchedMeta = Array.isArray(allMetaData)
    ? allMetaData.find((obj) => obj?.name === name)
    : null;
  return matchedMeta || null;
}
