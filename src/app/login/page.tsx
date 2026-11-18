import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { LegacyPageGuide } from '@/components/LegacyPageGuide';
import { LOGIN_PAGE_GUIDE } from '@/lib/legacy-page-guides';
import { Suspense } from 'react';
import LoginClient from './LoginClient';

export const runtime = 'edge';

export default function LoginPage() {
  return (
    <div className="min-h-full w-full flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <div className="container max-w-2xl text-center py-10 px-4">
          <h1 className="h1 mb-3">Sign in to 50agents</h1>
          <h2 className="h2 mb-4">Open your workspace</h2>
          <h3 className="h3 mb-3">Secure access for your crew</h3>
          <p className="sub__h1 leading-relaxed mb-2">
            Use the secure sign-in below to continue to the apps, automations and AI agents Captain built for your
            team. If you do not have a workspace yet, the same flow creates one with free starter credits.
          </p>
          <p className="sub__h1 leading-relaxed">
            Returning users land in their org dashboard. OAuth and embed flows that send you here with a token apply it
            automatically, then route you to the workspace or template you started from.
          </p>
        </div>
        <Suspense fallback={<p className="text-center py-8">Loading sign-in…</p>}>
          <LoginClient />
        </Suspense>
        <LegacyPageGuide sections={LOGIN_PAGE_GUIDE} />
      </main>
      <Footer />
    </div>
  );
}