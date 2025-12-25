import { sendErrorMessage } from './utils';
import { getBaseUrl } from './api';

export async function getFaqData(page: string, pageUrl: string) {
  try {
    const allFaqResponse = await fetch(`${getBaseUrl()}/api/FAQs`, {
      next: { revalidate: 60 * 20 } // Cache for 20 minutes
    });

    if (!allFaqResponse.ok) {
      throw new Error(`API responded with status: ${allFaqResponse.status}`);
    }

    const allFaqData = await allFaqResponse.json();
    const matchedFaqs = allFaqData.filter((obj: any) => obj.name === page);
    return matchedFaqs;
  } catch (error: any) {
    console.error('Failed to fetch FAQ data:', error);
    sendErrorMessage({
      error,
      pageUrl,
      source: `${getBaseUrl()}/api/FAQs`
    });
  }
}