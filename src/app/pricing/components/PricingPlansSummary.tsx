/**
 * Server-rendered plan and price text for /pricing (Axien read.pricing).
 */
export default function PricingPlansSummary() {
  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 text-center" aria-label="Pricing plans summary">
      <h2 className="text-lg font-semibold text-black mb-3">Plans and pricing</h2>
      <p className="text-gray-dark leading-relaxed" style={{ fontSize: 15.5 }}>
        Every workspace starts on a <strong>free</strong> plan with 2,000 credits. No monthly commitment on pay-as-you-go products.
      </p>
      <ul className="mt-4 text-left max-w-lg mx-auto space-y-2 text-gray-dark" style={{ fontSize: 15 }}>
        <li><strong>AI Note Taker plan:</strong> $0.99 USD per hour. Pay only for recording time used.</li>
        <li><strong>Internal Application plan:</strong> Free tier includes the first 1,000 API calls per month; standard usage pricing applies after that.</li>
      </ul>
    </section>
  );
}
