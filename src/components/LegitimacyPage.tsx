import Footer from '@/components/Footer';
import Header from '@/components/Header';

interface LegitimacyPageProps {
  title: string;
  children: React.ReactNode;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

export default function LegitimacyPage({ title, children, jsonLd }: LegitimacyPageProps) {
  const blocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <div className="min-h-screen w-full flex flex-col text-black">
      {blocks.map((data, index) => (
        <script
          // eslint-disable-next-line react/no-danger
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
      <Header />
      <div className="flex-1 pt-20">
        <div className="container mx-auto max-w-3xl px-6 py-16">
          <h1 className="h1 mb-8">{title}</h1>
          <div className="space-y-6 text-base leading-relaxed text-gray-800">{children}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}