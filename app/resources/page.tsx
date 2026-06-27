import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { ClipboardCheckIcon, LayersIcon, ChatIcon } from "@/components/ui/icons";
import BottomCtaBand from "@/components/marketing/BottomCtaBand";

export const metadata: Metadata = {
  title: "Resources | NutriPath Canada",
  description:
    "CDRE and KCAT study guides and resources for Canadian dietitian candidates, built by registered dietitians.",
};

export default function ResourcesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-offwhite py-16 sm:py-24">
        <div className="container-page text-center">
          <h1 className="font-heading text-4xl font-extrabold text-charcoal sm:text-5xl">
            Resources
          </h1>
          <p className="mx-auto mt-5 max-w-xl font-body text-lg leading-relaxed text-mid">
            Guides and support for your CDRE and KCAT journey, built by
            registered dietitians.
          </p>
        </div>
      </section>

      {/* KCAT Study Guide */}
      <section className="py-20 sm:py-28">
        <div className="container-page">
          <Reveal className="rounded-3xl border-2 border-primary bg-white p-6 sm:p-10">
            <span className="inline-flex items-center rounded-full bg-sage px-3 py-1 font-body text-xs font-semibold uppercase tracking-wide text-primary">
              Coming Soon
            </span>
            <div className="mt-4 flex items-start gap-4">
              <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-sage text-primary">
                <ClipboardCheckIcon className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-heading text-2xl font-bold text-charcoal sm:text-3xl">
                  NutriPath KCAT Study Guide
                </h2>
                <p className="mt-2 max-w-2xl font-body text-base leading-relaxed text-mid">
                  An independent educational resource designed to support
                  candidates preparing for the Knowledge and Competency
                  Assessment Tool (KCAT) in Canada.
                </p>
              </div>
            </div>

            <Button href="#waitlist" className="mt-6">
              Get notified when it&rsquo;s ready
            </Button>

            <div className="mt-8 flex flex-col gap-3 border-t border-[#E5E7E0] pt-6 font-body text-xs leading-relaxed text-mid">
              <p>
                NutriPath is not affiliated with, endorsed by, or reviewed
                by any provincial dietetic regulatory body or national
                dietetic organization.
              </p>
              <p>
                All content is provided for educational and
                exam-preparation purposes only and does not replace formal
                education, supervised practice, mentorship, or professional
                judgment. No guarantees are made regarding exam results,
                registration outcomes, or timelines.
              </p>
              <p>
                Any references to study time, costs, or career outcomes
                are informational only and not guaranteed.
              </p>
              <p>
                By using this resource, you acknowledge that exam success
                depends on individual effort and that use of this guide
                does not create a professional or client&ndash;dietitian
                relationship.
              </p>
              <p>
                For official registration and exam requirements, please
                consult your provincial dietetic regulatory body directly.
              </p>
            </div>
          </Reveal>

          {/* Other resources */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <Reveal delay={80} className="flex h-full flex-col rounded-3xl border border-[#E5E7E0] bg-white p-6 shadow-sm">
              <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-sage text-primary">
                <LayersIcon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-heading text-lg font-bold text-charcoal">
                CDRE Study Guide
              </h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-mid">
                A structured, competency-by-competency guide to CDRE prep —
                built by registered dietitians who&rsquo;ve sat the exam.
              </p>
              <span className="mt-4 inline-flex w-fit items-center rounded-full bg-offwhite px-2.5 py-1 font-body text-xs font-semibold uppercase tracking-wide text-mid">
                Coming soon
              </span>
            </Reveal>

            <Reveal delay={160}>
              <Link
                href="/blog"
                className="flex h-full flex-col rounded-3xl border border-[#E5E7E0] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-sage text-primary">
                  <ChatIcon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-heading text-lg font-bold text-charcoal">
                  Blog
                </h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-mid">
                  Honest, practical writing on CDRE and KCAT prep, accessibility
                  in dietetics education, and the path to registration.
                </p>
                <span className="mt-4 inline-flex w-fit items-center font-body text-sm font-semibold text-primary">
                  Read the blog &rarr;
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <BottomCtaBand />
    </>
  );
}
