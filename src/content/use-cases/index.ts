import type { UseCase } from '@/site/types';
import chaseUnpaidInvoices from './chase-unpaid-invoices';
import followUpQuietHubspotDeals from './follow-up-quiet-hubspot-deals';
import hubspotContactsToGoogleSheetsAndSlack from './hubspot-contacts-to-google-sheets-and-slack';
import leadTrackerFromYourInbox from './lead-tracker-from-your-inbox';
import aiRepliesToSupportEmail from './ai-replies-to-support-email';
import customerRequestsDesk from './customer-requests-desk';
import weeklyStripeRevenueSummary from './weekly-stripe-revenue-summary';
import stripePaymentsToGoogleSheets from './stripe-payments-to-google-sheets';
import shopifyOrdersToGoogleSheets from './shopify-orders-to-google-sheets';
import trackCompetitorPrices from './track-competitor-prices';
import aiEmailTriageEveryMorning from './ai-email-triage-every-morning';
import tomorrowsMeetingsInSlack from './tomorrows-meetings-in-slack';

// Every use case page, in the order of pages-brief B1. Registering one here makes links to it live (src/site/routes.ts).
export const USE_CASES: UseCase[] = [
  chaseUnpaidInvoices,
  followUpQuietHubspotDeals,
  hubspotContactsToGoogleSheetsAndSlack,
  leadTrackerFromYourInbox,
  aiRepliesToSupportEmail,
  customerRequestsDesk,
  weeklyStripeRevenueSummary,
  stripePaymentsToGoogleSheets,
  shopifyOrdersToGoogleSheets,
  trackCompetitorPrices,
  aiEmailTriageEveryMorning,
  tomorrowsMeetingsInSlack,
];
