import type { Metadata } from "next";
import Reveal from "@/components/ui/Reveal";
import WebinarsSection from "@/components/marketing/WebinarsSection";
import BottomCtaBand from "@/components/marketing/BottomCtaBand";
import { TargetIcon, ChatIcon, ClipboardCheckIcon } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Webinars | NutriPath Canada",
  description:
    "Free live webinars with NutriPath's partner organizations — real CDRE and KCAT strategies, live Q&A, and recordings you can revisit anytime.",
};

const STEPS = [
  {
    icon: TargetIcon,
    title: "Save your spot",
    body: "Drop your email and you're in — no fees, no account required.",
  },
  {
    icon: ChatIcon,
    title: "Join live",
    body: "Ask questions in real time as our partner walks through the material.",
  },
  {
    icon: ClipboardCheckIcon,
    title: "Rewatch anytime",
    body: "Can't make it live? Every session is recorded and sent to registrants after.",
  },
];

export default function WebinarsPage() {
  return (
    <>
      <WebinarsSection />

      {/* How it works */}
      <section className="py-20 sm:py-28">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="font-body text-sm font-semibold uppercase tracking-wide text-primary">
              How it works
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-charcoal sm:text-4xl">
              Three steps. Zero cost.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <Reveal key={step.title} delay={index * 100}>
                  <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sage text-primary">
                      <Icon className="h-7 w-7" />
                    </span>
                    <p className="mt-4 font-body text-xs font-semibold uppercase tracking-wide text-mid">
                      Step {index + 1}
                    </p>
                    <h3 className="mt-1 font-heading text-lg font-bold text-charcoal">
                      {step.title}
                    </h3>
                    <p className="mt-2 font-body text-sm leading-relaxed text-mid">
                      {step.body}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <BottomCtaBand />
    </>
  );
}
