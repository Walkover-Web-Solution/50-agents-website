// Phone sticky bar: public/site/sticky.js toggles .on once the hero button scrolls away.
export function StickyBar({ children }: { children: React.ReactNode }) {
  return <div className="sticky" data-sticky-bar>{children}</div>;
}