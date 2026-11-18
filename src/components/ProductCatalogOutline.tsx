type CatalogItem = { id: string; title: string; description: string };

export function ProductCatalogOutline({
  heading,
  intro,
  items,
}: {
  heading: string;
  intro: string;
  items: CatalogItem[];
}) {
  if (items.length === 0) return null;

  return (
    <section className="container max-w-5xl py-8" aria-label={heading}>
      <h2 className="h2 mb-3">{heading}</h2>
      <p className="sub__h1 leading-relaxed mb-8 max-w-3xl">{intro}</p>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.id}
            className="rounded-2xl p-4"
            style={{ border: '1px solid var(--line)', background: 'var(--wash2)' }}
          >
            <h3 className="h3 mb-2">{item.title}</h3>
            <p className="sub__h1 leading-relaxed" style={{ fontSize: 15 }}>
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}