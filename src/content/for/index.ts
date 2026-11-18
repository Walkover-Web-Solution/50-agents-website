import type { Role } from '@/content/guides/types';
import sales from './sales';
import support from './support';
import finance from './finance';
import operations from './operations';
import ecommerce from './ecommerce';
import agencies from './agencies';
import hr from './hr';
import founders from './founders';

// Every role page, in the order of pages-brief B7.
export const ROLES: Role[] = [sales, support, finance, operations, ecommerce, agencies, hr, founders];
