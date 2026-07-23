import type { Metadata } from "next";
import { termsIntro, termsAgreement, termsSections } from "@/lib/content/terms";

export const metadata: Metadata = {
  title: "Terms & Conditions | NutriPath Canada",
  description:
    "Terms & Conditions for using NutriPath's educational content and exam-preparation materials.",
};

export default function TermsPage() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container-page mx-auto max-w-2xl">
        <h1 className="font-heading text-4xl font-extrabold text-charcoal sm:text-5xl">
          Terms &amp; Conditions
        </h1>

        <p className="mt-6 font-body text-base leading-relaxed text-mid">
          {termsIntro}
        </p>
        <p className="mt-4 font-body text-base leading-relaxed text-mid">
          {termsAgreement}
        </p>

        <div className="mt-10 flex flex-col gap-8">
          {termsSections.map((section) => (
            <div key={section.title}>
              <h2 className="font-heading text-xl font-bold text-charcoal">
                {section.title}
              </h2>
              {section.body && (
                <p className="mt-2 font-body text-base leading-relaxed text-mid">
                  {section.body}
                </p>
              )}
              {section.bullets && (
                <ul className="mt-3 flex flex-col gap-2">
                  {section.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-2.5 font-body text-base leading-relaxed text-mid"
                    >
                      <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
