import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { CheckBadgeIcon } from "@/components/ui/icons";
import FeatureSpotlight from "@/components/marketing/FeatureSpotlight";
import KcatQuiz from "@/components/marketing/KcatQuiz";
import TestimonialCard from "@/components/marketing/TestimonialCard";
import ComparisonTable from "@/components/marketing/ComparisonTable";
import FaqSection from "@/components/marketing/FaqSection";
import BottomCtaBand from "@/components/marketing/BottomCtaBand";
import { kcatFeatureIcons, kcatSpotlights } from "@/lib/content/kcat";
import {
  testimonials,
  kcatSpotlightTestimonial,
} from "@/lib/content/testimonials";
import { comparisonPlans } from "@/lib/content/comparison";
import { faqItems, FAQ_RANGES } from "@/lib/content/faq";
import { buildFaqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "KCAT Bootcamp | Live KCAT Prep for Internationally Educated Dietitians",
  description:
    "A live, cohort-based KCAT bootcamp running mid to end July 2026 — built by registered dietitians for internationally educated dietitians preparing for the Knowledge and Competency Assessment Tool.",
};

const orderedFaqItems = faqItems.slice(...FAQ_RANGES.kcat);

const spotlightVisuals = [
  <div key="ied-path" className="rounded-2xl bg-sage p-6">
    <div className="rounded-xl bg-white p-5">
      <p className="font-heading text-sm font-bold text-charcoal">
        We account for your whole path
      </p>
      <ul className="mt-4 flex flex-col gap-3">
        {[
          { label: "Document assessment", state: "done" },
          { label: "KCAT preparation", state: "active" },
          { label: "CDRE-level licensing", state: "upcoming" },
        ].map((row) => (
          <li key={row.label} className="flex items-center gap-3">
            <span
              className={`h-2.5 w-2.5 flex-shrink-0 rounded-full ${
                row.state === "done"
                  ? "bg-bright"
                  : row.state === "active"
                  ? "bg-primary"
                  : "border-2 border-mid/40"
              }`}
            />
            <span className="font-body text-sm text-charcoal">{row.label}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>,
  <div key="schedule" className="rounded-2xl bg-sage p-6">
    <div className="rounded-xl bg-white p-5">
      <p className="font-heading text-sm font-bold text-charcoal">
        Bootcamp schedule
      </p>
      <ul className="mt-4 flex flex-col gap-3">
        {[
          { label: "Week 1 — Orientation & Live Kickoff", state: "done" },
          { label: "Week 2 — Core Content & Live Q&A", state: "active" },
          { label: "Week 3 — Mock KCAT & Review", state: "upcoming" },
          { label: "Week 4 — Live Capstone Workshop", state: "upcoming" },
        ].map((row) => (
          <li key={row.label} className="flex items-center gap-3">
            <span
              className={`h-2.5 w-2.5 flex-shrink-0 rounded-full ${
                row.state === "done"
                  ? "bg-bright"
                  : row.state === "active"
                  ? "bg-primary"
                  : "border-2 border-mid/40"
              }`}
            />
            <span className="font-body text-sm text-charcoal">{row.label}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>,
  <div key="competency" className="rounded-2xl bg-sage p-6">
    <div className="rounded-xl bg-white p-5">
      <p className="font-heading text-sm font-bold text-charcoal">
        Practice by competency
      </p>
      <ul className="mt-4 flex flex-col gap-3">
        {[
          { label: "Nutrition Care Process", accuracy: "85%" },
          { label: "Food Safety & Service", accuracy: "79%" },
          { label: "Professional Practice", accuracy: "88%" },
        ].map((row) => (
          <li
            key={row.label}
            className="flex items-center justify-between gap-3"
          >
            <span className="font-body text-sm text-charcoal">
              {row.label}
            </span>
            <span className="font-body text-sm font-semibold text-primary">
              {row.accuracy}
            </span>
          </li>
        ))}
      </ul>
    </div>
  </div>,
  <div key="workshop" className="rounded-2xl bg-sage p-6">
    <div className="rounded-xl bg-white p-5 text-center">
      <span className="inline-flex items-center rounded-full bg-primary px-3 py-1 font-body text-xs font-semibold text-white">
        Capstone
      </span>
      <p className="mt-4 font-heading text-lg font-bold text-charcoal">
        1-Hour Live Session
      </p>
      <p className="mt-1 font-body text-sm text-mid">
        Answering Practice Questions
      </p>
      <p className="mt-3 font-body text-xs font-semibold uppercase tracking-wide text-primary">
        End of bootcamp · July 2026
      </p>
    </div>
  </div>,
];

export default function KcatBootcampPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildFaqSchema(orderedFaqItems)),
        }}
      />

      {/* Hero */}
      <section className="bg-forest pb-24 pt-10 sm:pb-32">
        <div className="container-page text-center">
          <p className="font-body text-sm text-white/60">
            <Link href="/" className="underline hover:text-white">
              Home
            </Link>{" "}
            / KCAT Bootcamp
          </p>
          <h1 className="mx-auto mt-6 max-w-3xl font-heading text-4xl font-extrabold text-white sm:text-5xl">
            KCAT prep built for internationally educated dietitians.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl font-body text-lg text-white/80">
            Built by RDs. Designed for accessibility. A live bootcamp, not
            just another self-paced course.
          </p>
          <p className="mx-auto mt-4 max-w-2xl font-body text-sm text-white/60">
            The KCAT (Knowledge and Competency Assessment Tool) is a written
            exam required for internationally educated dietitians (IEDs) as
            part of the Canadian registration pathway — a checkpoint before
            CDRE-level licensing.
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href="#waitlist"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-center font-body text-base font-semibold text-primary transition-colors hover:bg-sage"
            >
              Join the KCAT Bootcamp waitlist
            </a>
          </div>
          <ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 font-body text-sm text-white/70">
            <li>✓ RD-created content</li>
            <li>✓ Built for IEDs</li>
            <li>✓ Live cohort format</li>
          </ul>
        </div>
      </section>

      <div className="container-page -mt-24 sm:-mt-36">
        <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl shadow-2xl">
          <Image
            src="/images/illustrations/KCAT-hero.png"
            alt="NutriPath KCAT Live Bootcamp dashboard showing the mid-July to end-July schedule, live online sessions, content timeline, and a 1-hour live practice question session"
            width={1672}
            height={941}
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="h-auto w-full"
            priority
          />
        </div>
      </div>

      {/* Feature icon grid */}
      <section className="py-20 sm:py-28">
        <div className="container-page grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {kcatFeatureIcons.map((feature, index) => {
            const Icon = feature.icon;
            const badgeClass =
              feature.tone === "primary"
                ? "bg-primary text-white"
                : "bg-sage text-primary";
            return (
              <Reveal key={feature.title} delay={index * 80}>
                <div className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
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
                    {feature.title}
                  </h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-mid">
                    {feature.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Feature spotlights */}
      <section className="bg-offwhite py-20 sm:py-28">
        <div className="container-page flex flex-col gap-20 sm:gap-28">
          {kcatSpotlights.map((spotlight, index) => (
            <FeatureSpotlight
              key={spotlight.title}
              index={index}
              eyebrow={spotlight.eyebrow}
              title={spotlight.title}
              body={spotlight.body}
              visual={spotlightVisuals[index]}
            />
          ))}
        </div>
      </section>

      {/* Sample quiz */}
      <section className="py-20 sm:py-28">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="font-body text-sm font-semibold uppercase tracking-wide text-primary">
              Try it yourself
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-charcoal sm:text-4xl">
              Think you&rsquo;re ready? Try 3 real KCAT-style questions.
            </h2>
            <p className="mt-3 font-body text-lg text-mid">
              Case-based, competency-mapped, and explained — just like the
              bootcamp.
            </p>
          </Reveal>
          <Reveal className="mt-12">
            <KcatQuiz />
          </Reveal>
        </div>
      </section>

      {/* Social proof dark band */}
      <section className="bg-charcoal py-20 sm:py-28">
        <Reveal className="container-page mx-auto max-w-3xl text-center">
          <p className="mx-auto mb-6 inline-block rounded-full bg-bright px-4 py-1.5 font-body text-sm font-semibold text-white">
            {kcatSpotlightTestimonial.badge}
          </p>
          <p className="font-heading text-2xl font-bold leading-snug text-white sm:text-[28px]">
            &ldquo;{kcatSpotlightTestimonial.quote}&rdquo;
          </p>
          <p className="mt-6 font-body text-sm text-white/60">
            {kcatSpotlightTestimonial.name} — {kcatSpotlightTestimonial.role}
          </p>
        </Reveal>
      </section>

      {/* Comparison table */}
      <section className="py-20 sm:py-28">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-bold text-charcoal sm:text-4xl">
              A comparison that disqualifies.
            </h2>
            <p className="mt-3 font-body text-lg italic text-mid">
              Telling the wrong student &ldquo;not this one&rdquo; makes every
              other promise credible.
            </p>
          </Reveal>
          <Reveal className="mt-12">
            <ComparisonTable plans={comparisonPlans} />
          </Reveal>
        </div>
      </section>

      {/* More testimonials */}
      <section className="bg-offwhite py-20 sm:py-28">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-bold text-charcoal sm:text-4xl">
              Candidates studying with NutriPath.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 max-w-3xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Reveal key={testimonial.name + testimonial.badge} delay={index * 100}>
                <TestimonialCard testimonial={testimonial} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 sm:py-28">
        <Reveal className="container-page mx-auto max-w-2xl rounded-3xl border-2 border-primary bg-white p-8 text-center">
          <p className="font-heading text-xl font-bold text-charcoal">
            KCAT Bootcamp Pricing
          </p>
          <p className="mt-3 font-body text-sm leading-relaxed text-mid">
            Pricing and payment plan details are shared directly with the
            waitlist ahead of the mid–end July 2026 bootcamp. Payment plans
            available — cost shouldn&rsquo;t be a barrier.
          </p>
          <a
            href="#waitlist"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-body text-sm font-semibold text-white transition-colors hover:bg-forest"
          >
            Join the KCAT waitlist
          </a>
        </Reveal>
      </section>

      <FaqSection items={orderedFaqItems} />

      {/* Illustrated CTA */}
      <section className="py-20 sm:py-28">
        <Reveal className="container-page mx-auto max-w-2xl text-center">
          <Image
            src="/images/illustrations/KCAT-cta.png"
            alt="Illustration of a NutriPath candidate preparing for the KCAT Bootcamp Mid-End July cohort, with a laptop showing a live session, a calendar, and notes on the 1-hour live session on how to answer practice questions"
            width={1536}
            height={1024}
            className="mx-auto h-auto w-full max-w-lg"
          />
          <h2 className="mt-8 font-heading text-3xl font-bold text-charcoal sm:text-4xl">
            Walk into the KCAT feeling ready.
          </h2>
          <p className="mx-auto mt-4 max-w-md font-body text-lg text-mid">
            Live sessions, real community, and a clear plan — built for the
            IED pathway from day one.
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href="#waitlist"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-center font-body text-base font-semibold text-white transition-colors hover:bg-forest"
            >
              Join the KCAT Bootcamp waitlist
            </a>
          </div>
        </Reveal>
      </section>

      <BottomCtaBand />
    </>
  );
}
