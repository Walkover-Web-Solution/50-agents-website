type AgentPageSummaryProps = {
  heading: string;
  paragraphs: string[];
};

/** Plain HTML copy for crawlers and agents that do not run JavaScript (Axien read.inner-pages). */
export default function AgentPageSummary({
  heading,
  paragraphs,
}: AgentPageSummaryProps) {
  return (
    <section className="container mx-auto px-4 pt-24 pb-6 max-w-3xl" aria-label="Page summary">
      <h1 className="h1 mb-4">{heading}</h1>
      {paragraphs.map((p) => (
        <p key={p.slice(0, 48)} className="sub__h1 mb-4" style={{ color: 'var(--mute)' }}>
          {p}
        </p>
      ))}
    </section>
  );
}