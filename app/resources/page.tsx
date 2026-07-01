import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import ResourceCard from "@/components/marketing/ResourceCard";
import BottomCtaBand from "@/components/marketing/BottomCtaBand";

export const metadata: Metadata = {
  title: "Free Resources | NutriPath Canada",
  description:
    "Download free CDRE and KCAT study guides from NutriPath — built by registered dietitians. Enter your email and get them sent straight to your inbox.",
};

export default function ResourcesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-offwhite py-16 sm:py-24">
        <div className="container-page text-center">
          <span className="inline-flex items-center rounded-full bg-sage px-3 py-1 font-body text-xs font-semibold uppercase tracking-wide text-primary">
            Free download
          </span>
          <h1 className="mt-4 font-heading text-4xl font-extrabold text-charcoal sm:text-5xl">
            Free guides for your journey.
          </h1>
          <p className="mx-auto mt-5 max-w-xl font-body text-lg leading-relaxed text-mid">
            Pick the guide you need. Enter your email. We&rsquo;ll send it straight
            to your inbox — no account, no paywall.
          </p>
        </div>
      </section>

      {/* Guide cards */}
      <section className="py-20 sm:py-28">
        <div className="container-page">
          <div className="grid gap-8 sm:grid-cols-2 lg:max-w-4xl lg:mx-auto">
            <Reveal>
              <ResourceCard
                guide="cdre"
                coverImage="/images/resources/cdre-cover.jpg"
                coverAlt="First page of the NutriPath CDRE Study Tips guide — 'NUTRIPATH CANADA study tips' with succulents and the NutriPath logo"
                tag="CDRE"
                title="CDRE Study Tips"
                description="Practical exam strategies for the CDRE — competency breakdowns, scheduling templates, and exam-day advice from registered dietitians who've sat it themselves."
              />
            </Reveal>
            <Reveal delay={80}>
              <ResourceCard
                guide="kcat"
                coverImage="/images/resources/kcat-cover.jpg"
                coverAlt="First page of the NutriPath KCAT Ethics Study Guide"
                tag="KCAT"
                title="KCAT Ethics Study Guide"
                description="Ethics principles and professional standards tested on the KCAT — with case-based scenarios, worked answers, and the reasoning frameworks that matter most."
              />
            </Reveal>
          </div>

          {/* Disclaimer */}
          <Reveal className="mt-14 lg:max-w-4xl lg:mx-auto">
            <div className="rounded-2xl border border-[#E5E7E0] bg-offwhite p-5">
              <p className="font-body text-xs leading-relaxed text-mid">
                <span className="font-semibold text-charcoal">Disclaimer: </span>
                NutriPath is not affiliated with, endorsed by, or reviewed by any
                provincial dietetic regulatory body or national dietetic organization.
                All content is for educational and exam-preparation purposes only.
                No guarantees are made regarding exam results or registration outcomes.{" "}
                <Link href="/disclaimer" className="underline hover:text-charcoal">
                  Full disclaimer →
                </Link>
              </p>
            </div>
          </Reveal>

          {/* Blog teaser */}
          <Reveal className="mt-6 lg:max-w-4xl lg:mx-auto">
            <Link
              href="/blog"
              className="group flex items-center justify-between rounded-2xl border border-[#E5E7E0] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div>
                <p className="font-body text-xs font-semibold uppercase tracking-wide text-primary">
                  Also free
                </p>
                <h3 className="mt-1 font-heading text-lg font-bold text-charcoal transition-colors group-hover:text-primary">
                  Read the NutriPath Blog
                </h3>
                <p className="mt-1 font-body text-sm text-mid">
                  Practical articles on CDRE and KCAT prep, written by registered dietitians.
                </p>
              </div>
              <span className="ml-6 flex-shrink-0 font-body text-sm font-semibold text-primary">
                Read →
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      <BottomCtaBand />
    </>
  );
}
