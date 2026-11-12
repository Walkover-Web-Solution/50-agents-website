import SignupLink from '@/components/SignupLink';

// 404 in the landing's design (landing/design-system, shared tokens): the crew, one line, the way back.
export default function NotFound() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'grid', placeItems: 'center', padding: 24, background: '#FFFFFF', color: '#111214', fontFamily: "'Schibsted Grotesk', system-ui, sans-serif", textAlign: 'center' }}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@500;600;800&display=swap" />
      <div style={{ maxWidth: 560 }}>
        <img src="/landing/favicon.svg" alt="" width={88} height={88} style={{ display: 'block', margin: '0 auto 28px' }} />
        <h1 style={{ margin: 0, fontSize: 'clamp(36px, 6vw, 56px)', lineHeight: 1.04, fontWeight: 500, letterSpacing: '-.025em' }}>This page isn&rsquo;t here.</h1>
        <p style={{ margin: '16px auto 0', fontSize: 19, lineHeight: 1.5, color: '#4F535B' }}>It may have moved, or it never existed.</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginTop: 32 }}>
          <a href="/" style={{ background: '#111214', color: '#fff', fontWeight: 600, fontSize: 17, padding: '14px 24px', borderRadius: 10, textDecoration: 'none' }}>Back to home</a>
          <SignupLink button="404" style={{ color: '#111214', fontWeight: 600, fontSize: 17, padding: '14px 24px', borderRadius: 10, textDecoration: 'none', boxShadow: 'inset 0 0 0 1px #E7E8EB' }}>Get started</SignupLink>
        </div>
      </div>
    </div>
  );
}
