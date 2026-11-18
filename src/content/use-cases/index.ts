import type { UseCase } from '@/site/types';
import chaseUnpaidInvoices from './chase-unpaid-invoices';

// Every use case page, in the order of pages-brief B1.
export const USE_CASES: UseCase[] = [chaseUnpaidInvoices];
