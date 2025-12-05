export function getBaseUrl(): string {
  if (typeof window !== 'undefined') {
    // Client-side
    return '';
  }
  
  // Server-side
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL;
  }
  
  return 'https://50agents.com';
}
