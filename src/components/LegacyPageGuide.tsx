// Server-rendered outline for legacy product pages: one extra block of H2/H3 and prose so
// crawlers that do not execute JavaScript still see sectioned headings and enough plain text.
export type LegacyGuideSection = {
  title: string;
  paragraphs: string[];
  subsections?: Array<{ title: string; paragraphs: string[] }>;
};

export function LegacyPageGuide({ sections }: { sections: LegacyGuideSection[] }) {
  return (
    <section
      className="w-full"
      style={{ borderTop: '1px solid var(--line)', background: 'var(--wash2)' }}
      aria-label="About this page"
    >
      <div className="container max-w-3xl py-14 md:py-16 space-y-10">
        {sections.map((section) => (
          <div key={section.title}>
            <h2 className="h2 mb-4">{section.title}</h2>
            {section.paragraphs.map((paragraph, i) => (
              <p key={i} className="mb-4 sub__h1 leading-relaxed">
                {paragraph}
              </p>
            ))}
            {section.subsections?.map((sub) => (
              <div key={sub.title}>
                <h3 className="h3 mt-6 mb-3">{sub.title}</h3>
                {sub.paragraphs.map((paragraph, i) => (
                  <p key={i} className="mb-3 sub__h1 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}