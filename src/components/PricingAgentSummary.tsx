/** Server HTML with plan amounts and limits for agents (read.pricing-detail). */
export default function PricingAgentSummary() {
  return (
    <section className="sr-only" aria-label="Pricing summary for agents">
      <h1>Pricing</h1>
      <p>
        AI Note Taker: $0.99 per hour of recorded meeting time, no monthly commitment.
      </p>
      <p>
        Internal application agents: free for the first 1,000 API calls per month per workspace;
        standard metered pricing after that limit.
      </p>
      <p>Every new workspace includes 2,000 credits at signup.</p>
      <p>
        Machine-readable details:{' '}
        <a href="/pricing.md">pricing.md</a>
      </p>
    </section>
  );
}