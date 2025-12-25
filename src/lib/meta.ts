import { sendErrorMessage } from './utils';
import { getBaseUrl } from './api';

export async function getMetaData(name: string, pageUrl: string) {
  try {
    const allMetaResponse = await fetch(`${getBaseUrl()}/api/meta`, {
      next: { revalidate: 60 * 20 } // Cache for 20 minutes
    });

    if (!allMetaResponse.ok) {
      throw new Error(`API responded with status: ${allMetaResponse.status}`);
    }

    const allMetaData = await allMetaResponse.json();
    const matchedMeta = Array.isArray(allMetaData)
      ? allMetaData.find((obj) => obj?.name === name)
      : null;
    return matchedMeta || null;
  } catch (error: any) {
    console.error('Failed to fetch meta data:', error);
    sendErrorMessage({
      error,
      pageUrl,
      source: `${getBaseUrl()}/api/meta`
    });
  }
}
