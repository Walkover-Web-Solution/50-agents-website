// Written by scripts/pages/write-index.mjs: every use case page JSON. Don't edit by hand.
import type { UseCasePage } from '@/site/usecase/types';
import p_ai_email_triage_every_morning from './ai-email-triage-every-morning.json';
import p_ai_replies_to_support_email from './ai-replies-to-support-email.json';
import p_chase_unpaid_invoices from './chase-unpaid-invoices.json';
import p_customer_requests_desk from './customer-requests-desk.json';
import p_follow_up_quiet_hubspot_deals from './follow-up-quiet-hubspot-deals.json';
import p_hubspot_contacts_to_google_sheets_and_slack from './hubspot-contacts-to-google-sheets-and-slack.json';
import p_lead_tracker_from_your_inbox from './lead-tracker-from-your-inbox.json';
import p_shopify_orders_to_google_sheets from './shopify-orders-to-google-sheets.json';
import p_stripe_payments_to_google_sheets from './stripe-payments-to-google-sheets.json';
import p_tomorrows_meetings_in_slack from './tomorrows-meetings-in-slack.json';
import p_track_competitor_prices from './track-competitor-prices.json';
import p_weekly_stripe_revenue_summary from './weekly-stripe-revenue-summary.json';

export const PAGES = [p_ai_email_triage_every_morning, p_ai_replies_to_support_email, p_chase_unpaid_invoices, p_customer_requests_desk, p_follow_up_quiet_hubspot_deals, p_hubspot_contacts_to_google_sheets_and_slack, p_lead_tracker_from_your_inbox, p_shopify_orders_to_google_sheets, p_stripe_payments_to_google_sheets, p_tomorrows_meetings_in_slack, p_track_competitor_prices, p_weekly_stripe_revenue_summary] as UseCasePage[];
