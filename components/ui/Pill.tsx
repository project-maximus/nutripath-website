import { LeafIcon } from "@/components/ui/icons";

type PillProps = {
  children: React.ReactNode;
  tone?: "bright" | "primary" | "mid" | "white" | "glass" | "sage";
  icon?: "check" | "leaf" | "none";
  className?: string;
};

const tones: Record<
  "bright" | "primary" | "mid" | "white" | "glass" | "sage",
  string
> = {
  bright: "bg-bright text-white",
  primary: "bg-primary text-white",
  mid: "bg-mid text-white",
  white: "bg-white text-primary",
  glass:
    "border border-white/40 bg-white/30 text-primary shadow-sm backdrop-blur-md",
  sage: "bg-sage text-primary",
};

export default function Pill({
  children,
  tone = "bright",
  icon = "check",
  className = "",
}: PillProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-body text-sm font-semibold ${tones[tone]} ${className}`}
    >
      {icon === "check" && <span aria-hidden="true">✓</span>}
      {icon === "leaf" && <LeafIcon className="h-3.5 w-3.5" />}
      {children}
    </span>
  );
}
