import Reveal from "@/components/ui/Reveal";

export default function FeatureSpotlight({
  index,
  eyebrow,
  title,
  body,
  visual,
}: {
  index: number;
  eyebrow: string;
  title: string;
  body: string;
  visual: React.ReactNode;
}) {
  const reversed = index % 2 === 1;

  return (
    <Reveal
      className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
        reversed ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      <div>
        <p className="font-body text-sm font-semibold uppercase tracking-wide text-primary">
          {eyebrow}
        </p>
        <h3 className="mt-3 font-heading text-2xl font-bold text-charcoal sm:text-[28px]">
          {title}
        </h3>
        <p className="mt-4 font-body text-base leading-relaxed text-mid">
          {body}
        </p>
      </div>
      <div>{visual}</div>
    </Reveal>
  );
}
