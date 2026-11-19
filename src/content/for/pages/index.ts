// Written by scripts/pages/write-index-family.mjs for: every page JSON of the family. Don't edit by hand.
import type { RolePage } from '@/site/for/types';
import p_sales from './sales.json';
import p_support from './support.json';
import p_finance from './finance.json';
import p_operations from './operations.json';
import p_ecommerce from './ecommerce.json';
import p_agencies from './agencies.json';
import p_hr from './hr.json';
import p_founders from './founders.json';

export const ROLES = [p_sales, p_support, p_finance, p_operations, p_ecommerce, p_agencies, p_hr, p_founders] as RolePage[];
