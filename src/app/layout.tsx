import Script from 'next/script';
import ClientLayout from './ClientLayout';
import './globals.css';
import '../styles/_import.scss';

export const metadata = {
  title: {
    template: '%s',
    default: '50agents: apps, AI agents and automations that do the work',
  },
  description:
    'Apps, automations, AI agents and browser agents, built around how your business works. Works with 2,300+ apps.',
  category: 'technology',
  generator: '50agents',
  applicationName: '50agents',
  referrer: 'origin-when-cross-origin',
  keywords: [
    '50agents',
    '50 agents',
    'ai agents',
    'ai automation',
    'ai task automation',
    'ai workflow automation',
    'intelligent agents',
    'ai productivity tools',
    'no code ai',
    'ai assistant platform',
    'ai agent deployment',
    'task automation ai',
    'ai powered productivity',
    'automated workflows',
    'ai business automation',
    'smart ai agents',
    'ai agent templates',
    'ai integration platform',
    'artificial intelligence agents',
    'ai productivity suite',
    'ai workflow management',
    'ai task management',
    'enterprise ai agents',
    'ai automation platform',
    'conversational ai agents',
    'ai process automation',
    'intelligent task automation',
    'ai digital assistant',
    'ai virtual assistant',
    'business process automation ai',
    'ai operational efficiency',
    'automated ai tasks',
  ],
  authors: [{ name: '50agents' }],
  creator: '50agents',
  publisher: '50agents',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://50agents.com'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
        {/* the visitor's A/B/C version from the home page (or a new one, kept), so every page wears the same design (D152) */}
        <script defer src="/variant-init.js" data-cfasync="false" />
        {/* cookieless analytics, loaded after render (public/ph.js) */}
        <script defer src="/ph.js" data-cfasync="false" />
      </head>
      <body style={{ height: '100vh' }}>
        <Script src="https://tally.so/widgets/embed.js" strategy="afterInteractive" />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
