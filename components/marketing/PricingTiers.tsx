"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

type BillingPeriod = "monthly" | "yearly";

type Tier = {
  name: string;
  subtitle: string;
  price: string;
  billingNote?: Record<BillingPeriod, string>;
  ctaLabel: string;
  ctaHref: string;
  external?: boolean;
  highlighted?: boolean;
  features: string[];
};

const tiers: Tier[] = [
  {
    name: "Self-Study",
    subtitle: "For candidates preparing independently, at their own pace.",
    price: "Revealed to the waitlist",
    billingNote: {
      monthly: "Billed monthly, once pricing launches",
      yearly: "Billed yearly — better value, once pricing launches",
    },
    ctaLabel: "Join the waitlist",
    ctaHref: "#waitlist",
    features: [
      "Personalized study plan",
      "Multi-format content (text, video, audio, flashcards)",
      "Full CDRE mock exams",
      "Progress & competency tracking",
    ],
  },
  {
    name: "Founding Member",
    subtitle: "The November 2026 CDRE founding cohort — limited to 25 spots.",
    price: "Founding pricing, locked in",
    billingNote: {
      monthly: "Billed monthly, once pricing launches",
      yearly: "Billed yearly — better value, once pricing launches",
    },
    ctaLabel: "Secure your founding spot",
    ctaHref: "https://app.nutripath.ca",
    external: true,
    highlighted: true,
    features: [
      "Everything in Self-Study",
      "AI study tutor",
      "Community access",
      "Direct input into the platform",
      "Payment plans available",
      "Your name in the founding story",
    ],
  },
  {
    name: "Institutional & Partners",
    subtitle: "For universities, agencies, and newcomer settlement organizations.",
    price: "Custom",
    ctaLabel: "Let's talk",
    ctaHref: "mailto:nutripathcanada@gmail.com",
    external: true,
    features: [
      "Multi-seat access for cohorts",
      "Partner reporting",
      "Dedicated onboarding",
      "Volume pricing",
    ],
  },
];

export default function PricingTiers() {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("monthly");

  return (
    <div>
      <div className="mb-10 flex justify-center">
        <div className="inline-flex rounded-full bg-offwhite p-1">
          {(["monthly", "yearly"] as const).map((period) => (
            <button
              key={period}
              type="button"
              onClick={() => setBillingPeriod(period)}
              aria-pressed={billingPeriod === period}
              className={`rounded-full px-6 py-2 font-body text-sm font-semibold capitalize transition-colors ${
                billingPeriod === period
                  ? "bg-white text-primary shadow-sm"
                  : "text-mid hover:text-charcoal"
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {tiers.map((tier, index) => (
          <Reveal key={tier.name} delay={index * 100}>
            <div
              className={`relative flex h-full flex-col overflow-visible rounded-3xl p-7 ${
                tier.highlighted
                  ? "border-2 border-primary bg-white shadow-xl"
                  : "border border-[#E5E7E0] bg-white"
              }`}
            >
              {tier.highlighted && (
                <Image
                  src="/images/illustrations/pricingpage-girl.webp"
                  alt=""
                  aria-hidden="true"
                  width={578}
                  height={1115}
                  className="pointer-events-none absolute -right-[8px] -top-[10px] z-10 hidden h-auto w-[58px] select-none object-contain min-[360px]:block sm:-right-[12px] sm:-top-[12px] sm:w-[68px] lg:-right-[16px] lg:-top-[15px] lg:w-[78px]"
                />
              )}
              <h3 className="font-heading text-xl font-bold text-charcoal">
                {tier.name}
              </h3>
              <p className="mt-1.5 font-body text-sm text-mid">
                {tier.subtitle}
              </p>

              <p className="mt-6 font-heading text-lg font-bold text-primary">
                {tier.price}
              </p>
              {tier.billingNote && (
                <p className="mt-1 font-body text-xs text-mid">
                  {tier.billingNote[billingPeriod]}
                </p>
              )}

              <Button
                href={tier.ctaHref}
                external={tier.external}
                variant={tier.highlighted ? "primary" : "secondary"}
                className="mt-5 w-full"
              >
                {tier.ctaLabel}
              </Button>

              <div className="mt-7 flex-1">
                <p className="font-body text-sm font-semibold text-charcoal">
                  What&rsquo;s included:
                </p>
                <ul className="mt-4 flex flex-col gap-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <span
                        aria-hidden="true"
                        className="mt-0.5 flex-shrink-0 font-heading text-sm font-bold text-primary"
                      >
                        ✓
                      </span>
                      <span className="font-body text-sm text-mid">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
