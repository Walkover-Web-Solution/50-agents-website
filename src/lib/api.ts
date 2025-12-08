export function getBaseUrl(): string {
  if (typeof window !== 'undefined') {
    // Client-side
    return '';
  }
  
  // Server-side
  if (process.env.BASE_URL) {
    return process.env.BASE_URL;
  }
  
  return 'https://50agents.com';
}
