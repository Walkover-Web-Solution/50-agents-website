import { fetchPublicTemplates } from '@/lib/fetch-public-templates';

export async function TemplatesServerOutline() {
  const templates = await fetchPublicTemplates();
  const FALLBACK_TEMPLATES = [
    { name: 'Lead follow-up', description: 'Captures form leads, scores them with AI and schedules the first outreach in your CRM.' },
    { name: 'Invoice reminder', description: 'Watches accounting for overdue invoices and nudges customers on email or WhatsApp.' },
    { name: 'Meeting notes', description: 'Joins selected calls, writes structured notes and posts action items to Slack.' },
    { name: 'Order sync', description: 'Moves new orders from messaging apps into your ledger and confirms stock.' },
    { name: 'Support triage', description: 'Drafts replies from your help docs and escalates edge cases to a human.' },
    { name: 'Weekly digest', description: 'Pulls metrics from dashboards and sends a Monday summary to stakeholders.' },
  ];

  if (templates.length === 0) {
    return (
      <section className="container max-w-5xl py-10" aria-label="Template catalog">
        <h2 className="h2 mb-3 text-center">Example agent templates</h2>
        <p className="sub__h1 text-center max-w-2xl mx-auto mb-8 leading-relaxed">
          Agent templates are ready-made starting points. Pick one, connect your apps, and Captain adapts the workflow
          to your team. The live grid below loads the current catalog; these examples show typical shapes.
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FALLBACK_TEMPLATES.map((t) => (
            <article key={t.name} className="rounded-2xl p-5" style={{ border: '1px solid var(--line)', background: 'var(--wash2)' }}>
              <h3 className="h3 mb-2">{t.name}</h3>
              <p className="sub__h1 leading-relaxed" style={{ fontSize: 15 }}>
                {t.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    );
  }

  const shown = templates.slice(0, 12);

  return (
    <section className="container max-w-5xl py-10" aria-label="Template catalog">
      <h2 className="h2 mb-3 text-center">Public agent templates</h2>
      <p className="sub__h1 text-center max-w-2xl mx-auto mb-10 leading-relaxed">
        Each template connects to real apps through viaSocket. Use one as a starting point, then let Captain adjust
        triggers, steps and approvals for your business.
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((template) => {
          const name = template.agentJson?.name ?? 'Agent template';
          const description =
            template.templateDescription ||
            template.agentJson?.description ||
            'Automation and AI steps you can deploy in a few minutes.';
          return (
            <article key={template._id} className="rounded-2xl p-5" style={{ border: '1px solid var(--line)', background: 'var(--wash2)' }}>
              <h3 className="h3 mb-2">{name}</h3>
              <p className="sub__h1 leading-relaxed" style={{ fontSize: 15 }}>
                {description}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}