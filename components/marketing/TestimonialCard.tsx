import Pill from "@/components/ui/Pill";

export type Testimonial = {
  badge: string;
  badgeTone: "bright" | "primary" | "mid";
  quote: string;
  name: string;
  role: string;
  featured?: boolean;
};

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const { badge, badgeTone, quote, name, role, featured } = testimonial;

  return (
    <div
      className={`flex h-full flex-col gap-5 rounded-2xl bg-sage p-8 ${
        featured ? "lg:-translate-y-3 lg:shadow-xl" : ""
      }`}
    >
      <Pill tone={badgeTone} icon="none">
        {badge}
      </Pill>
      <p className="flex-1 font-heading text-xl font-bold leading-snug text-charcoal sm:text-[22px]">
        &ldquo;{quote}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary font-body text-sm font-semibold text-white">
          {initials(name)}
        </span>
        <div>
          <p className="font-body text-sm font-semibold text-charcoal">{name}</p>
          <p className="font-body text-xs text-mid">{role}</p>
        </div>
      </div>
    </div>
  );
}
