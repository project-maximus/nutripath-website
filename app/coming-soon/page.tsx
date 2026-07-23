import type { Metadata } from "next";
import Image from "next/image";
import KineticGrid from "@/components/ui/kinetic-grid";
import CountdownTimer from "@/components/marketing/CountdownTimer";
import WaitlistForm from "@/components/marketing/WaitlistForm";

export const metadata: Metadata = {
  title: "Coming Soon | NutriPath Canada",
  description:
    "The NutriPath platform is almost here. Join the waitlist and we'll email you the moment you can log in.",
  robots: { index: false, follow: true },
};

export default function ComingSoonPage() {
  return (
    <KineticGrid
      className="h-svh w-full"
      backgroundColor="#1a3d06"
      baseColor="#e8f4e0"
      accentColor="#54b51b"
    >
      <div className="flex h-full flex-col items-center justify-center overflow-hidden px-6 text-center">
        <div className="flex items-center gap-2">
          <Image
            src="/images/illustrations/nutripath-logo-mark.png"
            alt=""
            width={521}
            height={372}
            className="h-8 w-auto"
            priority
          />
          <span className="font-heading text-lg font-extrabold text-white">
            NutriPath
          </span>
        </div>

        <span className="mt-6 rounded-full border border-white/15 px-3 py-1 font-body text-xs font-medium tracking-wide text-white/70">
          CDRE Prep Platform &middot; Coming Soon
        </span>

        <h1 className="mt-5 max-w-3xl text-balance font-heading text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
          Something great is{" "}
          <span className="text-bright drop-shadow-[0_0_28px_rgba(84,181,27,0.55)]">
            coming soon.
          </span>
        </h1>

        <p className="mt-4 max-w-md font-body text-base leading-relaxed text-white/60 sm:text-lg">
          Personalized study plans, mock exams, and RD-verified AI support —
          built for how you actually learn.
        </p>

        <div className="mt-7 scale-90 sm:scale-100">
          <CountdownTimer />
        </div>

        <div className="mt-7 w-full max-w-md">
          <WaitlistForm variant="dark" />
        </div>
      </div>
    </KineticGrid>
  );
}
