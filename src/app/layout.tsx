// The root of every page: the document, the font connections and cookieless analytics (public/ph.js).
// Old pages add their own layout in (legacy); the search pages theirs in (site).
export const metadata = {
  metadataBase: new URL('https://50agents.com'),
  applicationName: '50agents',
  icons: {
    icon: [{ url: '/landing/favicon.svg', type: 'image/svg+xml' }, { url: '/favicon.ico', sizes: '48x48' }],
    shortcut: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <script defer src="/ph.js" data-cfasync="false" />
      </head>
      <body>{children}</body>
    </html>
  );
}
