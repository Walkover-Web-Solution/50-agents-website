import { Inter } from 'next/font/google';
import ClientLayout from './ClientLayout';
import './globals.css';
import '../styles/_import.scss';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter', // Define a CSS variable
});

export const metadata = {
  title: {
    template: '%s | 50Agents',
    default: '50Agents | AI Agents for Every App - Perform Any Task with Natural Language',
  },
  description:
    'Deploy AI agents that perform any task inside 5000+ apps just by typing a prompt. Automate workflows, manage tasks, and boost productivity with intelligent AI agents. No code required.',
  category: 'technology',
  generator: '50Agents',
  applicationName: '50Agents',
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
  authors: [{ name: '50Agents Team' }],
  creator: '50Agents',
  publisher: '50Agents',
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
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var mode = prefersDark ? 'dark' : 'light';
                  
                  document.documentElement.setAttribute('data-theme', mode);
                  if (mode === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={inter.variable} style={{ height: '100vh' }}>
        <ClientLayout fontClass={inter.variable}>{children}</ClientLayout>
      </body>
    </html>
  );
}
