import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import LogoMarquee from "@/components/marketing/LogoMarquee";
import ToolsShowcase from "@/components/marketing/ToolsShowcase";
import HowItWorksTimeline from "@/components/marketing/HowItWorksTimeline";
import StatRow from "@/components/marketing/StatRow";
import FreeResourcesPitch from "@/components/marketing/FreeResourcesPitch";
import BentoGrid from "@/components/marketing/BentoGrid";
import StudyFeedSection from "@/components/marketing/StudyFeedSection";
import TestimonialCard from "@/components/marketing/TestimonialCard";
import ComparisonTable from "@/components/marketing/ComparisonTable";
import PricingTiers from "@/components/marketing/PricingTiers";
import FaqSection from "@/components/marketing/FaqSection";
import BottomCtaBand from "@/components/marketing/BottomCtaBand";
import { howItWorksSteps, deepDiveStats } from "@/lib/content/homepage";
import { testimonials } from "@/lib/content/testimonials";
import { comparisonRows } from "@/lib/content/comparison";
import { faqItems } from "@/lib/content/faq";
import { buildFaqSchema, organizationSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "CDRE Exam Prep Canada | Dietitian Licensing Exam Preparation",
  description:
    "CDRE exam prep built by registered dietitians for Canadian dietitian candidates. Accessibility-first, neurodiverse-friendly, and honest about what preparation can and can't promise.",
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildFaqSchema(faqItems)),
        }}
      />

      {/* Hero — cinematic team photo */}
      <section className="relative isolate flex min-h-[80vh] items-center overflow-hidden sm:min-h-[88vh]">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <Image
            src="/images/illustrations/team-hero.jpeg"
            alt="Three NutriPath team members standing on a hill overlooking the city, arms raised, wearing shirts that read 'Accessible Dietetic Success — Learn, Practice, Pass'"
            fill
            priority
            sizes="100vw"
            className="animate-hero-zoom object-cover object-[center_38%]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/85 via-charcoal/40 to-charcoal/80" />
        </div>

        <div className="container-page relative text-center">
          <span className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-3.5 py-1.5 font-body text-sm font-semibold text-white backdrop-blur-md">
            Built by dietitians, for dietitians
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl font-heading text-5xl font-extrabold leading-[1.05] text-white sm:text-6xl lg:text-7xl">
            Accessible dietetic success.
          </h1>
          <p className="mx-auto mt-4 font-heading text-2xl font-bold text-bright drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)] sm:text-3xl">
            Learn. Practice. Pass.
          </p>
          <p className="mx-auto mt-6 max-w-xl font-body text-lg leading-relaxed text-white/85">
            Personalized CDRE and KCAT prep, built by registered dietitians
            who&rsquo;ve sat the exam themselves — no guesswork, just a
            clear path forward.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-5">
            <Button href="https://app.nutripath.ca" external variant="white">
              Join the Founding Cohort
            </Button>
            <a
              href="/kcat-bootcamp"
              className="font-body text-base font-semibold text-white underline underline-offset-4 hover:text-bright"
            >
              Explore the KCAT Bootcamp
            </a>
          </div>
        </div>
      </section>

      {/* Trust logo marquee */}
      <section className="border-y border-[#E5E7E0] bg-offwhite py-10">
        <div className="container-page">
          <p className="text-center font-body text-xs font-semibold uppercase tracking-[0.12em] text-mid">
            Aligned with leading organizations in dietetics &amp; public health
          </p>
          <div className="mt-6">
            <LogoMarquee />
          </div>
        </div>
      </section>

      <ToolsShowcase />

      {/* Platform tour */}
      <section className="bg-offwhite py-20 sm:py-28">
        <div className="mx-auto max-w-[1360px] px-5">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-bold text-charcoal sm:text-4xl">
              A few minutes a day. A clearer path to exam day.
            </h2>
          </Reveal>
          <Reveal className="mt-14 grid items-center gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
            <div className="overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src="/images/illustrations/nutripath-img2.png"
                alt="NutriPath platform dashboard showing a CDRE study plan, current readiness score, days until exam, and mock exam progress"
                width={1672}
                height={941}
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="h-auto w-full"
              />
            </div>
            <div className="flex flex-col gap-9">
              {[
                {
                  title: "Take a readiness check.",
                  body: "See exactly where you're starting from.",
                },
                {
                  title: "Follow your study plan.",
                  body: "Bite-sized sessions, mapped to your exam date.",
                },
                {
                  title: "Track your progress.",
                  body: "Watch your readiness grow, session by session.",
                },
              ].map((step, index) => (
                <div key={step.title} className="flex items-start gap-5">
                  <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-sage font-heading text-xl font-bold text-primary">
                    0{index + 1}
                  </span>
                  <div>
                    <p className="font-heading text-xl font-bold text-charcoal">
                      {step.title}
                    </p>
                    <p className="mt-1.5 font-body text-base text-mid">
                      {step.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 sm:py-28">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.12em] text-primary">
              How it works
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-charcoal sm:text-4xl">
              Study smarter. Pass with confidence.
            </h2>
          </Reveal>
          <HowItWorksTimeline steps={howItWorksSteps} />
        </div>
      </section>

      {/* Feature deep-dive */}
      <section className="bg-offwhite py-20 sm:py-28">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-bold text-charcoal sm:text-[42px]">
              The CDRE is one of the hardest career moments a dietitian
              faces.
            </h2>
            <p className="mt-5 font-body text-lg leading-relaxed text-mid">
              Only offered twice a year. Three lifetime attempts. Existing
              prep resources that feel scattered, aren&rsquo;t designed for
              accessibility, and cost over $1,200 without guaranteeing
              you&rsquo;d feel prepared.
            </p>
          </Reveal>
          <Reveal className="mt-12">
            <StatRow stats={deepDiveStats} />
          </Reveal>
          <p className="mx-auto mt-8 max-w-xl text-center font-body text-base italic text-charcoal">
            The stakes are real. Your prep should match them.
          </p>

          <FreeResourcesPitch />
        </div>
      </section>

      <BentoGrid />

      <StudyFeedSection />

      {/* Testimonials */}
      <section className="py-20 sm:py-28">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p aria-hidden="true" className="font-heading text-lg text-bright">
              ★★★★★
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-charcoal sm:text-4xl">
              Built by dietitians. For dietitians.
            </h2>
            <p className="mt-3 font-body text-lg text-mid">
              Hear from candidates who&rsquo;ve prepared with NutriPath.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 max-w-3xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Reveal key={testimonial.name + testimonial.badge} delay={index * 100}>
                <TestimonialCard testimonial={testimonial} />
              </Reveal>
            ))}
          </div>
          <p className="mt-10 text-center font-body text-sm text-mid">
            More stories
            <span className="ml-2 rounded-full bg-offwhite px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-mid">
              Coming soon
            </span>
          </p>
        </div>
      </section>

      {/* Comparison table */}
      <section className="bg-offwhite py-20 sm:py-28">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-bold text-charcoal sm:text-4xl">
              Why NutriPath? See how we compare.
            </h2>
            <p className="mt-3 font-body text-lg text-mid">
              Existing CDRE/KCAT resources are expensive, outdated, and
              weren&rsquo;t built by registered dietitians. NutriPath was.
            </p>
          </Reveal>
          <Reveal className="mt-12">
            <ComparisonTable rows={comparisonRows} />
          </Reveal>
          <div className="mt-10 text-center">
            <Button href="https://app.nutripath.ca" external size="sm">
              Join the Founding Cohort
            </Button>
          </div>
        </div>
      </section>

      {/* Founder story strip */}
      <section className="py-20 sm:py-28">
        <Reveal className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative">
            <div className="relative aspect-square w-full max-w-sm overflow-hidden rounded-3xl shadow-xl">
              <Image
                src="/images/illustrations/Berin-Founder.jpg"
                alt="Berin Arikan, MPH, RD, founder of NutriPath, writing in a notebook beside her laptop while wearing a NutriPath t-shirt"
                fill
                sizes="(min-width: 1024px) 384px, 100vw"
                className="object-cover object-[78%_center]"
              />
            </div>
            <div className="absolute -bottom-6 left-4 max-w-[80%] rounded-2xl bg-white p-4 shadow-lg sm:left-8">
              <p className="font-body text-sm text-charcoal">
                &ldquo;Took the CDRE twice. Built this so you don&rsquo;t have
                to go through it alone.&rdquo;
              </p>
            </div>
          </div>
          <div>
            <p className="font-body text-sm font-semibold uppercase tracking-wide text-primary">
              Why NutriPath exists
            </p>
            <h2 className="mt-3 font-heading text-[28px] font-bold leading-tight text-charcoal">
              I sat the CDRE twice. I spent over $1,200 on prep materials
              that felt scattered and inaccessible.
            </h2>
            <p className="mt-5 font-body text-base leading-relaxed text-mid">
              I&rsquo;m also neurodiverse — and the existing resources
              weren&rsquo;t built with people like me in mind. After passing,
              I knew there had to be a better way. So I built it.
            </p>
            <p className="mt-4 font-body text-base leading-relaxed text-mid">
              NutriPath is the platform I wish had existed when I was
              studying. Created by registered dietitians. Designed for
              accessibility from day one. Built on the belief that your
              career shouldn&rsquo;t be decided by how well the prep
              resources worked for someone else&rsquo;s brain.
            </p>
            <p className="mt-5 font-body text-sm font-semibold text-charcoal">
              Berin Arikan, MPH, RD — Founder, NutriPath Canada
            </p>
            <p className="mt-4 font-body text-sm text-mid">
              Full founder story
              <span className="ml-2 rounded-full bg-offwhite px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-mid">
                Coming soon
              </span>
            </p>
          </div>
        </Reveal>
      </section>

      {/* Pricing preview */}
      <section className="bg-offwhite py-20 sm:py-28">
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
          <div className="mt-12">
            <PricingTiers />
          </div>
          <p className="mt-8 text-center font-body text-sm text-mid">
            Payment plans available. Preparation support — never a pass
            guarantee.
          </p>
        </div>
      </section>

      <FaqSection items={faqItems} />

      {/* Illustrated CTA */}
      <section className="py-20 sm:py-28">
        <Reveal className="container-page mx-auto max-w-2xl text-center">
          <Image
            src="/images/illustrations/nutripath-img1.png"
            alt="Illustration of a person holding the NutriPath logo, with notes reading 'CDRE Ready, your goals, our plan' and 'Confidence is up, you're growing'"
            width={1536}
            height={1024}
            className="mx-auto h-auto w-full max-w-md"
          />
          <h2 className="mt-8 font-heading text-3xl font-bold text-charcoal sm:text-4xl">
            Make your next study day the best one.
          </h2>
          <p className="mx-auto mt-4 max-w-md font-body text-lg text-mid">
            See what consistent, supported prep can look like — at your own
            pace.
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="https://app.nutripath.ca" external>
              Join the Founding Cohort
            </Button>
          </div>
        </Reveal>
      </section>

      <BottomCtaBand />
    </>
  );
}
