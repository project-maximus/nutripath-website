const PARTNERS = [
  "Dietitians of Canada",
  "CDRE Exam Authority",
  "HealthNet",
  "University & Agency Partners",
  "UN SDG 3 · 4 · 8 · 10",
];

function LogoRow() {
  return (
    <div className="flex shrink-0 items-center gap-12 pr-12">
      {PARTNERS.map((name) => (
        <span
          key={name}
          className="whitespace-nowrap font-heading text-lg font-bold text-charcoal/40 grayscale transition-all duration-300 hover:text-primary hover:grayscale-0"
        >
          {name}
        </span>
      ))}
    </div>
  );
}

export default function LogoMarquee() {
  return (
    <div className="marquee-group overflow-hidden">
      <div className="marquee-track flex w-max">
        <LogoRow />
        <LogoRow />
      </div>
    </div>
  );
}
