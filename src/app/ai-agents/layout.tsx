import Script from 'next/script';

export default function AiAgentsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script src="https://tally.so/widgets/embed.js" strategy="afterInteractive" />
      {children}
    </>
  );
}
