import { PLANS, PRICING_FAQS, TOPUP, USES } from '@/content/pages/pricing';

const fmt = (n: number) => n.toLocaleString('en-US');

/** Machine-readable /pricing.md for agents (read.pricing-detail). */
export function pricingMarkdown(): string {
  const lines = [
    '# 50agents pricing',
    '',
    'Every workspace gets 2,000 free credits a month. Paid plans bill monthly in US dollars. Top-ups are pay-as-you-go.',
    '',
    '## Plans',
    '',
  ];
  for (const p of PLANS) {
    lines.push(
      `### ${p.name}`,
      '',
      `- Price: $${p.price} ${p.price ? 'per month' : '(free)'}`,
      `- Credits: ${fmt(p.credits)} credits per month`,
      `- ${p.line}`,
      '',
    );
  }
  lines.push(
    '## Top-ups',
    '',
    `- $${TOPUP.price} per ${fmt(TOPUP.per)} credits`,
    `- Minimum purchase: ${fmt(TOPUP.min)} credits`,
    '- Top-up credits never expire',
    '',
    '## What uses credits',
    '',
  );
  for (const u of USES) {
    lines.push(`### ${u.what}`, '', `- ${u.how}`, `- Example: ${u.example}`, '');
  }
  lines.push('## Questions', '');
  for (const f of PRICING_FAQS) {
    lines.push(`### ${f.q}`, '', f.a, '');
  }
  lines.push('[Sign up](https://50agents-app.embarko.app/login?utm_source=50agents.com&utm_medium=website&utm_content=pricing-md)');
  return lines.join('\n');
}