import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import Accordion from "@/components/ui/Accordion";
import { CheckBadgeIcon } from "@/components/ui/icons";
import FeatureSpotlight from "@/components/marketing/FeatureSpotlight";
import TestimonialCard from "@/components/marketing/TestimonialCard";
import ComparisonTable from "@/components/marketing/ComparisonTable";
import BottomCtaBand from "@/components/marketing/BottomCtaBand";
import { cdreFeatureIcons, cdreSpotlights } from "@/lib/content/cdre";
import {
  testimonials,
  cdreSpotlightTestimonial,
} from "@/lib/content/testimonials";
import { comparisonRows } from "@/lib/content/comparison";
import { faqItems } from "@/lib/content/faq";
import { buildFaqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "CDRE Prep Platform | Personalized Exam Prep for Dietitians",
  description:
    "CDRE practice exams, personalized study plans, and multi-format content built by registered dietitians. Join NutriPath's founding cohort for the November 2026 CDRE pilot.",
};

const cdreFaqOrder = [0, 1, 5, 6, 2, 3, 4, 7, 8, 9];
const orderedFaqItems = cdreFaqOrder.map((index) => faqItems[index]);

const spotlightVisuals = [
  <div key="plan" className="rounded-2xl bg-sage p-6">
    <div className="rounded-xl bg-white p-5">
      <p className="font-heading text-sm font-bold text-charcoal">
        This week&rsquo;s plan
      </p>
      <ul className="mt-4 flex flex-col gap-3">
        {[
          { label: "MNT Module 1", state: "done" },
          { label: "Community Nutrition", state: "active" },
          { label: "Food Safety Review", state: "upcoming" },
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
  <div key="formats" className="rounded-2xl bg-sage p-6">
    <div className="grid grid-cols-2 gap-3">
      {["Text notes", "Video", "Audio", "Flashcards", "AI tutor"].map((format) => (
        <div
          key={format}
          className="flex items-center gap-2 rounded-xl bg-white px-4 py-3.5"
        >
          <span className="h-2 w-2 rounded-full bg-primary" />
          <span className="font-body text-sm text-charcoal">{format}</span>
        </div>
      ))}
    </div>
  </div>,
  <div key="question-bank" className="rounded-2xl bg-sage p-6">
    <div className="rounded-xl bg-white p-5">
      <p className="font-heading text-sm font-bold text-charcoal">
        Practice by competency
      </p>
      <ul className="mt-4 flex flex-col gap-3">
        {[
          { label: "Medical Nutrition Therapy", accuracy: "82%" },
          { label: "Community Nutrition", accuracy: "87%" },
          { label: "Food Service Systems", accuracy: "84%" },
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
  <div key="community" className="rounded-2xl bg-sage p-6">
    <div className="flex items-center justify-center rounded-xl bg-white p-6">
      <div className="flex -space-x-3">
        {["AJ", "MK", "SR", "DP"].map((label) => (
          <span
            key={label}
            className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-white bg-primary font-body text-xs font-semibold text-white"
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  </div>,
];

export default function CdrePrepPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildFaqSchema(orderedFaqItems)),
        }}
      />

      {/* Hero */}
      <section className="bg-forest pb-44 pt-14 sm:pb-56">
        <div className="container-page text-center">
          <p className="font-body text-sm text-white/60">
            <Link href="/" className="underline hover:text-white">
              Home
            </Link>{" "}
            / CDRE Prep
          </p>
          <h1 className="mx-auto mt-6 max-w-3xl font-heading text-4xl font-extrabold text-white sm:text-5xl">
            CDRE prep that meets you where you are.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl font-body text-lg text-white/80">
            Built by RDs. Designed for accessibility. Structured for your
            exam date.
          </p>
          <p className="mx-auto mt-4 max-w-2xl font-body text-sm text-white/60">
            The CDRE (Canadian Dietetic Registration Examination) is
            Canada&rsquo;s national licensing exam for dietitians, offered
            twice a year with a three-attempt lifetime cap.
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="https://app.nutripath.ca" external variant="white">
              Secure your founding spot
            </Button>
          </div>
          <ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 font-body text-sm text-white/70">
            <li>✓ RD-created content</li>
            <li>✓ Built for IEDs</li>
            <li>✓ Accessibility-first</li>
          </ul>
        </div>
      </section>

      <div className="container-page -mt-36 sm:-mt-48">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl shadow-2xl">
          <Image
            src="/images/illustrations/nutripath-img3.png"
            alt="NutriPath CDRE question bank showing practice by competency area, including Medical Nutrition Therapy, Community Nutrition, Food Service Systems, and Professional Practice & Ethics, each with accuracy tracking"
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
          {cdreFeatureIcons.map((feature, index) => {
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
          {cdreSpotlights.map((spotlight, index) => (
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

      {/* Social proof dark band */}
      <section className="bg-charcoal py-20 sm:py-28">
        <Reveal className="container-page mx-auto max-w-3xl text-center">
          <p className="mx-auto mb-6 inline-block rounded-full bg-bright px-4 py-1.5 font-body text-sm font-semibold text-white">
            {cdreSpotlightTestimonial.badge}
          </p>
          <p className="font-heading text-2xl font-bold leading-snug text-white sm:text-[28px]">
            &ldquo;{cdreSpotlightTestimonial.quote}&rdquo;
          </p>
          <p className="mt-6 font-body text-sm text-white/60">
            {cdreSpotlightTestimonial.name} — {cdreSpotlightTestimonial.role}
          </p>
        </Reveal>
      </section>

      {/* Comparison table */}
      <section className="py-20 sm:py-28">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-bold text-charcoal sm:text-4xl">
              Why NutriPath for your CDRE prep?
            </h2>
            <p className="mt-3 font-body text-lg text-mid">
              Existing CDRE resources are expensive, outdated, and
              weren&rsquo;t built by registered dietitians. NutriPath was.
            </p>
          </Reveal>
          <Reveal className="mt-12">
            <ComparisonTable rows={comparisonRows} />
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
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
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
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-bold text-charcoal sm:text-4xl">
              Simple, transparent pricing.
            </h2>
            <p className="mt-3 font-body text-lg text-mid">
              No hidden fees. Payment plans available. Because cost
              shouldn&rsquo;t be a barrier.
            </p>
          </Reveal>
          <Reveal className="mx-auto mt-12 max-w-md rounded-3xl border-2 border-primary bg-white p-8 text-center">
            <p className="font-heading text-xl font-bold text-charcoal">
              Founding Member Pricing
            </p>
            <p className="mt-3 font-body text-sm leading-relaxed text-mid">
              Full pricing launches with the November 2026 founding cohort.
              Join the waitlist now to lock in founding member rates before
              they&rsquo;re public.
            </p>
            <Button href="#waitlist" className="mt-6" size="sm">
              Join the Waitlist
            </Button>
          </Reveal>
          <p className="mt-6 text-center font-body text-sm text-mid">
            Payment plans available. Preparation support — never a pass
            guarantee.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-offwhite py-20 sm:py-28">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-bold text-charcoal sm:text-4xl">
              Frequently asked questions.
            </h2>
          </Reveal>
          <Reveal className="mx-auto mt-12 max-w-3xl">
            <Accordion items={orderedFaqItems} />
          </Reveal>
        </div>
      </section>

      {/* Illustrated CTA */}
      <section className="py-20 sm:py-28">
        <Reveal className="container-page mx-auto max-w-2xl text-center">
          <Image
            src="/images/illustrations/footer-CTA2-cropped.png"
            alt="Illustration of a NutriPath candidate holding the NutriPath logo with a raised fist, with notes reading 'Weak areas are improving' and 'You're exam ready'"
            width={899}
            height={545}
            className="mx-auto h-auto w-full max-w-lg"
          />
          <h2 className="mt-8 font-heading text-3xl font-bold text-charcoal sm:text-4xl">
            Walk into the CDRE feeling ready.
          </h2>
          <p className="mx-auto mt-4 max-w-md font-body text-lg text-mid">
            See your weak areas turn into strengths — one study session at a
            time.
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
