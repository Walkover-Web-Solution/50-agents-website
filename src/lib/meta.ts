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
    if (!matchedMeta) return null;
    // one spelling of the name and no em dashes, whatever the content table holds (D152)
    const clean = (v: any) => (typeof v === 'string' ? v.replace(/50\s?agents/gi, '50agents').replace(/5,?000\+/g, '2,300+').replace(/\s*—\s*/g, ', ') : v);
    return Object.fromEntries(Object.entries(matchedMeta).map(([k, v]) => [k, clean(v)]));
  } catch (error: any) {
    console.error('Failed to fetch meta data:', error);
    sendErrorMessage({
      error,
      pageUrl,
      source: `${getBaseUrl()}/api/meta`
    });
  }
}
