import type { Flagship } from '../types';
import hubspot from './hubspot';
import gmail from './gmail';
import googleSheets from './google-sheets';
import slack from './slack';
import shopify from './shopify';
import stripe from './stripe';

// The six flagship integration pages (pages-brief B3), written one by one.
export const FLAGSHIPS: Record<string, Flagship> = { hubspot, gmail, 'google-sheets': googleSheets, slack, shopify, stripe };
