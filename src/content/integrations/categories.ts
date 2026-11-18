// The 20 curated categories of the A to Z (pages-brief B8). Members come from the catalog's own category labels,
// mapped in scripts/snapshot-catalog.mjs (CATEGORIES); `about` is the one line written for each, naming what the apps hold.
export type Category = { slug: string; name: string; short: string; about: string };

export const CATEGORIES: Category[] = [
  { slug: 'crm', name: 'CRM', short: 'CRM', about: 'CRMs hold your contacts, companies and deals, so they are where most sales follow-ups start and end.' },
  { slug: 'email', name: 'Email', short: 'email', about: 'Email apps send, receive and file messages; newsletter and transactional senders sit here too.' },
  { slug: 'ecommerce', name: 'E-commerce', short: 'e-commerce', about: 'Store platforms hold orders, products, customers and stock, and fire an event at each change.' },
  { slug: 'accounting', name: 'Accounting', short: 'accounting', about: 'Accounting and invoicing apps hold invoices, bills, payments received and the books behind them.' },
  { slug: 'project-management', name: 'Project management', short: 'project management', about: 'Project and task tools hold tasks, owners, due dates and status, which other apps can create or move.' },
  { slug: 'customer-support', name: 'Customer support', short: 'customer support', about: 'Help desks hold tickets and conversations with customers, each with a status and an owner.' },
  { slug: 'forms', name: 'Forms', short: 'forms', about: 'Form and survey tools collect answers, and each new submission can start work in another app.' },
  { slug: 'scheduling', name: 'Scheduling', short: 'scheduling', about: 'Calendars and booking tools hold meetings and bookings, with events for new, changed and cancelled ones.' },
  { slug: 'payments', name: 'Payments', short: 'payments', about: 'Payment processors record charges, refunds, subscriptions and payouts as they happen.' },
  { slug: 'marketing-automation', name: 'Marketing automation', short: 'marketing', about: 'Marketing tools hold audiences, campaigns and ads, and the lists that other apps add people to.' },
  { slug: 'social-media', name: 'Social media', short: 'social media', about: 'Social apps publish posts and collect comments, messages and leads from pages and accounts.' },
  { slug: 'databases', name: 'Databases and spreadsheets', short: 'database', about: 'Spreadsheets and databases hold rows and records that other apps read from and write to.' },
  { slug: 'documents', name: 'Documents and files', short: 'documents', about: 'Document, storage and e-signature apps hold files, notes and signed agreements.' },
  { slug: 'communication', name: 'Communication', short: 'communication', about: 'Chat and meeting apps carry messages and calls, so they are where people get told what happened.' },
  { slug: 'hr', name: 'HR', short: 'HR', about: 'HR and recruiting apps hold people, candidates, leave and payroll records.' },
  { slug: 'analytics', name: 'Analytics', short: 'analytics', about: 'Analytics and BI tools hold the numbers and reports that summaries and alerts are built from.' },
  { slug: 'ai-tools', name: 'AI tools', short: 'AI', about: 'AI services write, transcribe, read documents and make images, as one step inside a bigger job.' },
  { slug: 'developer-tools', name: 'Developer tools', short: 'developer', about: 'Developer and IT tools hold code, issues, incidents and servers, with events for each change.' },
  { slug: 'phone-and-sms', name: 'Phone and SMS', short: 'phone and SMS', about: 'Phone and SMS services send texts and track calls, for reminders and alerts outside email.' },
  { slug: 'app-builders', name: 'App and website builders', short: 'app builder', about: 'App and website builders hold the pages, forms and records of sites and tools you have built.' },
];
