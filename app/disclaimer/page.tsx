import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Disclaimer | NutriPath Canada",
  description:
    "Important disclaimer regarding NutriPath's educational resources, including the KCAT Study Guide and CDRE prep materials.",
};

export default function DisclaimerPage() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container-page max-w-3xl">
        <p className="font-body text-sm font-semibold uppercase tracking-wide text-primary">
          Legal
        </p>
        <h1 className="mt-3 font-heading text-4xl font-extrabold text-charcoal sm:text-5xl">
          Disclaimer
        </h1>
        <p className="mt-4 font-body text-base text-mid">
          Last updated: July 1, 2026
        </p>

        <div className="mt-10 flex flex-col gap-8 font-body text-base leading-relaxed text-charcoal">
          <div>
            <h2 className="font-heading text-xl font-bold text-charcoal">
              About Our Resources
            </h2>
            <p className="mt-3 text-mid">
              The NutriPath KCAT Study Guide and all related materials are
              independent educational resources designed to support candidates
              preparing for the Knowledge and Competency Assessment Tool
              (KCAT) in Canada.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-charcoal">
              No Affiliation with Regulatory Bodies
            </h2>
            <p className="mt-3 text-mid">
              NutriPath is not affiliated with, endorsed by, or reviewed by
              any provincial dietetic regulatory body or national dietetic
              organization.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-charcoal">
              Educational Purpose Only
            </h2>
            <p className="mt-3 text-mid">
              All content is provided for educational and exam-preparation
              purposes only and does not replace formal education, supervised
              practice, mentorship, or professional judgment. No guarantees
              are made regarding exam results, registration outcomes, or
              timelines.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-charcoal">
              No Guarantees
            </h2>
            <p className="mt-3 text-mid">
              Any references to study time, costs, or career outcomes are
              informational only and not guaranteed.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-charcoal">
              Your Acknowledgement
            </h2>
            <p className="mt-3 text-mid">
              By using any NutriPath resource, you acknowledge that exam
              success depends on individual effort and that use of our
              materials does not create a professional or
              client&ndash;dietitian relationship.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-charcoal">
              Official Requirements
            </h2>
            <p className="mt-3 text-mid">
              For official registration and exam requirements, please consult
              your provincial dietetic regulatory body directly.
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-[#E5E7E0] pt-8">
          <p className="font-body text-sm text-mid">
            Questions about this disclaimer?{" "}
            <a
              href="mailto:nutripathcanada@gmail.com"
              className="font-semibold text-primary hover:underline"
            >
              nutripathcanada@gmail.com
            </a>
          </p>
          <p className="mt-4 font-body text-sm text-mid">
            See also:{" "}
            <Link href="/terms" className="font-semibold text-primary hover:underline">
              Terms &amp; Conditions
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
