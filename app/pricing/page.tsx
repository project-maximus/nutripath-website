import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import FaqSection from "@/components/marketing/FaqSection";
import {
  CalendarIcon,
  ChevronRightIcon,
  LeafIcon,
  TargetIcon,
  LayersIcon,
  ClipboardCheckIcon,
  TrendingUpIcon,
  UsersIcon,
  AccessibilityIcon,
  CheckBadgeIcon,
} from "@/components/ui/icons";
import ComparisonTable from "@/components/marketing/ComparisonTable";
import PricingTiers from "@/components/marketing/PricingTiers";
import BottomCtaBand from "@/components/marketing/BottomCtaBand";
import { comparisonRows } from "@/lib/content/comparison";
import { faqItems } from "@/lib/content/faq";
import { buildFaqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Pricing | NutriPath CDRE Platform",
  description:
    "Transparent, flexible pricing for NutriPath's CDRE platform. Payment plans available. Join the founding cohort waitlist for September 2026 founding member pricing.",
};

const pricingFaqOrder = [9, 4, 2, 3, 7, 8, 5, 6, 0, 1];
const orderedFaqItems = pricingFaqOrder.map((index) => faqItems[index]);

const included = [
  {
    title: "Personalized study plan",
    body: "Mapped to your exam date and how you actually learn — not a one-size template.",
    icon: TargetIcon,
    tone: "sage" as const,
  },
  {
    title: "Multi-format content",
    body: "Text, video, audio, flashcards, and an AI study tutor you can ask anything, any time.",
    icon: LayersIcon,
    tone: "primary" as const,
  },
  {
    title: "Full CDRE mock exams",
    body: "Timed, scored, and structured like the real thing — with detailed performance reports.",
    icon: ClipboardCheckIcon,
    tone: "sage" as const,
  },
  {
    title: "Progress & competency tracking",
    body: "See exactly which competency areas need more attention, in real time.",
    icon: TrendingUpIcon,
    tone: "primary" as const,
  },
  {
    title: "Community access",
    body: "Study alongside other CDRE and KCAT candidates who understand exactly what this season feels like.",
    icon: UsersIcon,
    tone: "sage" as const,
  },
  {
    title: "Accessibility-first design",
    body: "Built toward WCAG 2.1 AA from day one, with Lexend typography and flexible pacing.",
    icon: AccessibilityIcon,
    tone: "primary" as const,
  },
];

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildFaqSchema(orderedFaqItems)),
        }}
      />

      {/* Hero */}
      <section className="overflow-hidden bg-white py-16 sm:py-24">
        <div className="container-page grid items-center gap-8 text-center lg:grid-cols-2 lg:gap-16 lg:text-left">
          <div className="flex flex-col items-center lg:items-start">
            <h1 className="font-heading text-4xl font-extrabold leading-[1.05] text-charcoal sm:text-5xl lg:text-6xl">
              Simple pricing.
              <br />
              Built for <span className="text-primary">your</span> success.
            </h1>
            <p className="mt-6 max-w-md font-body text-lg leading-relaxed text-mid">
              Transparent plans. Honest prep. Everything you need to feel
              confident on exam day.
            </p>

            <a
              href="#waitlist"
              className="mt-7 flex w-full max-w-md items-center gap-4 rounded-2xl bg-offwhite p-4 text-left transition-colors hover:bg-sage/60"
            >
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white text-primary shadow-sm">
                <CalendarIcon className="h-5 w-5" />
              </span>
              <span className="flex-1">
                <span className="block font-body text-sm font-bold text-charcoal">
                  Founding Cohort opens September 2026.
                </span>
                <span className="block font-body text-sm text-mid">
                  Join the waitlist to receive full pricing and priority
                  access.
                </span>
              </span>
              <ChevronRightIcon className="h-4 w-4 flex-shrink-0 text-primary" />
            </a>

            <div className="mt-7 flex flex-wrap justify-center gap-4 lg:justify-start">
              <Button href="#waitlist">Join the waitlist</Button>
              <Button href="/cdre-prep" variant="secondary">
                Explore programs
              </Button>
            </div>
          </div>

          <Image
            src="/images/illustrations/hero-pricingpage.jpeg"
            alt="Illustration of a NutriPath candidate relaxing in a chair, smiling while holding a mug with the NutriPath logo"
            width={1076}
            height={800}
            priority
            sizes="(min-width: 1024px) 32vw, 80vw"
            className="mx-auto h-auto w-full max-w-[420px] lg:mx-0"
          />
        </div>
      </section>

      {/* Pricing tiers */}
      <section className="bg-offwhite py-20 sm:py-28">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="flex items-center justify-center gap-1.5 font-body text-sm font-semibold uppercase tracking-wide text-primary">
              <LeafIcon className="h-3.5 w-3.5" />
              Founding Cohort — September 2026
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-charcoal sm:text-4xl">
              Be one of the first 25 founding members.
            </h2>
            <p className="mt-5 font-body text-base leading-relaxed text-mid">
              Full pricing and payment plan details are shared directly with
              the waitlist before the founding cohort opens.
            </p>
          </Reveal>
          <div className="mt-12">
            <PricingTiers />
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-center font-body text-sm text-mid">
            Payment plans available. Preparation support — never a pass
            guarantee.
          </p>
        </div>
      </section>

      {/* What's included */}
      <section className="py-20 sm:py-28">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-4xl font-extrabold text-charcoal sm:text-5xl">
              What&rsquo;s included, from day one.
            </h2>
            <p className="mt-4 font-body text-lg text-mid">
              Every founding member gets the full platform — no tiers, no
              feature gates.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {included.map((item, index) => {
              const Icon = item.icon;
              const badgeClass =
                item.tone === "primary"
                  ? "bg-primary text-white"
                  : "bg-sage text-primary";
              return (
                <Reveal key={item.title} delay={index * 80}>
                  <div className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-sm">
                    <div className="flex items-start justify-between">
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-xl ${badgeClass}`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-sage text-primary">
                        <CheckBadgeIcon className="h-3.5 w-3.5" />
                      </div>
                    </div>
                    <h3 className="mt-5 font-heading text-lg font-bold text-charcoal">
                      {item.title}
                    </h3>
                    <p className="mt-2 font-body text-sm leading-relaxed text-mid">
                      {item.body}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Payment flexibility */}
      <section className="bg-offwhite py-20 sm:py-28">
        <Reveal className="container-page mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold text-charcoal sm:text-4xl">
            Payment plans, because cost shouldn&rsquo;t be the barrier.
          </h2>
          <p className="mt-5 font-body text-lg leading-relaxed text-mid">
            We know prep costs add up — especially after document
            assessment fees, the KCAT, and everything else the journey to
            registration demands. That&rsquo;s why payment plans are
            available for the CDRE Platform, and why founding members will
            see full pricing and payment options before the cohort opens.
          </p>
          <ul className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-2 font-body text-sm text-mid">
            <li>✓ Payment plans available</li>
            <li>✓ No hidden fees</li>
            <li>✓ Preparation support, never a pass guarantee</li>
          </ul>
        </Reveal>
      </section>

      {/* Comparison table */}
      <section className="py-20 sm:py-28">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-bold text-charcoal sm:text-4xl">
              What you&rsquo;re actually paying for.
            </h2>
            <p className="mt-3 font-body text-lg text-mid">
              Existing CDRE/KCAT resources are expensive, outdated, and
              weren&rsquo;t built by registered dietitians. NutriPath was.
            </p>
          </Reveal>
          <Reveal className="mt-12">
            <ComparisonTable rows={comparisonRows} />
          </Reveal>
        </div>
      </section>

      <FaqSection items={orderedFaqItems} />

      {/* Illustrated CTA */}
      <section className="py-20 sm:py-28">
        <Reveal className="container-page mx-auto max-w-2xl text-center">
          <Image
            src="/images/illustrations/footer-CTA3-cropped.png"
            alt="Illustration of a NutriPath candidate holding a study plan clipboard with the NutriPath logo, with notes reading '7 day streak, keep it going' and 'Plan updated, new goals added'"
            width={971}
            height={692}
            className="mx-auto h-auto w-full max-w-lg"
          />
          <h2 className="mt-8 font-heading text-3xl font-bold text-charcoal sm:text-4xl">
            Stay consistent. Watch your plan come together.
          </h2>
          <p className="mx-auto mt-4 max-w-md font-body text-lg text-mid">
            Founding members get a study plan that adapts as you go — and
            keeps you moving forward.
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="https://app.nutripath.ca" external>
              Secure your founding spot
            </Button>
          </div>
        </Reveal>
      </section>

      <BottomCtaBand />
    </>
  );
}
