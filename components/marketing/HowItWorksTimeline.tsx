"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/ui/Reveal";

type Step = {
  number: string;
  title: string;
  body: string;
};

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Fires once, true, when the observed element scrolls into view. */
function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, inView] as const;
}

function entranceStyle(
  inView: boolean,
  delayMs: number,
  direction: "down" | "up" | "scale"
) {
  const reduced = prefersReducedMotion();
  const offset = direction === "down" ? -14 : direction === "up" ? 14 : 0;
  const restTransform = direction === "scale" ? "scale(1)" : "translateY(0)";
  const startTransform =
    direction === "scale" ? "scale(0.5)" : `translateY(${offset}px)`;

  return {
    opacity: inView ? 1 : 0,
    transform: reduced ? "none" : inView ? restTransform : startTransform,
    transition: reduced
      ? "opacity 200ms linear"
      : `opacity 450ms cubic-bezier(0.16,1,0.3,1), transform 450ms cubic-bezier(0.16,1,0.3,1)`,
    transitionDelay: inView && !reduced ? `${delayMs}ms` : "0ms",
  };
}

function StepCard({
  step,
  align = "center",
}: {
  step: Step;
  align?: "center" | "left" | "right";
}) {
  const alignClass =
    align === "center" ? "text-center" : align === "left" ? "text-left" : "text-right";

  return (
    <div
      className={`rounded-2xl border border-white/60 bg-white/50 p-3 shadow-md backdrop-blur-lg transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:bg-white/80 hover:shadow-xl sm:p-5 ${alignClass}`}
    >
      <p className="font-heading text-sm font-bold text-charcoal sm:text-lg">
        {step.title}
      </p>
      <p className="mt-1.5 font-body text-xs leading-relaxed text-mid sm:mt-2 sm:text-sm">
        {step.body}
      </p>
    </div>
  );
}

const ROW_HEIGHT = "210px";
const STEP_DELAY_MS = 480;
const LINE_DURATION_MS = STEP_DELAY_MS * 3 + 500;

export default function HowItWorksTimeline({ steps }: { steps: Step[] }) {
  const [desktopRef, desktopInView] = useInView<HTMLDivElement>();

  return (
    <div className="mt-14">
      {/* Mobile / tablet: vertical timeline, alternating left/right */}
      <div className="relative lg:hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/4 h-56 w-56 -translate-x-1/2 rounded-full bg-bright/20 blur-3xl" />
          <div className="absolute left-1/2 bottom-0 h-56 w-56 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
        </div>

        <div className="absolute bottom-2 left-1/2 top-2 w-px -translate-x-1/2 overflow-hidden">
          <Reveal
            direction="scale-y"
            className="h-full w-full origin-top bg-[#E5E7E0]"
          />
        </div>

        <div className="flex flex-col gap-6">
          {steps.map((step, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div
                key={step.number}
                className="group relative grid grid-cols-2 items-center gap-x-3 sm:gap-x-6"
              >
                <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
                  <Reveal
                    delay={index * 100}
                    className="flex h-9 w-9 items-center justify-center rounded-full border-4 border-white bg-primary font-heading text-xs font-bold text-white shadow-md transition-transform duration-300 group-hover:scale-110 sm:h-10 sm:w-10 sm:text-sm"
                  >
                    {step.number}
                  </Reveal>
                </div>

                <div className="flex justify-end">
                  {isLeft && (
                    <Reveal delay={index * 100} className="w-full">
                      <StepCard step={step} align="right" />
                    </Reveal>
                  )}
                </div>

                <div className="flex justify-start">
                  {!isLeft && (
                    <Reveal delay={index * 100} className="w-full">
                      <StepCard step={step} align="left" />
                    </Reveal>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Desktop: horizontal zigzag timeline */}
      <div ref={desktopRef} className="relative hidden lg:block">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/4 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-bright/25 blur-3xl" />
          <div className="absolute left-3/4 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />
        </div>

        {/* Track */}
        <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-[#E5E7E0]" />
        {/* Progress fill — sweeps left to right as the steps reveal */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-1/2 h-[3px] w-full origin-left -translate-y-1/2 rounded-full bg-primary"
          style={{
            transform: desktopInView ? "scaleX(1)" : "scaleX(0)",
            transition: prefersReducedMotion()
              ? "none"
              : `transform ${LINE_DURATION_MS}ms cubic-bezier(0.65,0,0.35,1)`,
          }}
        />

        <div
          className="grid grid-cols-4"
          style={{ gridTemplateRows: `${ROW_HEIGHT} auto ${ROW_HEIGHT}` }}
        >
          {steps.map((step, index) => {
            const isAbove = index % 2 === 0;
            const column = index + 1;
            const delay = index * STEP_DELAY_MS;

            return (
              <div key={step.number} style={{ display: "contents" }} className="group">
                <div
                  className="flex flex-col justify-end px-3 pb-6"
                  style={{ gridColumn: column, gridRow: 1 }}
                >
                  {isAbove && (
                    <div style={entranceStyle(desktopInView, delay, "down")}>
                      <StepCard step={step} />
                    </div>
                  )}
                </div>

                <div
                  className="relative z-10 flex items-center justify-center"
                  style={{ gridColumn: column, gridRow: 2 }}
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-primary font-heading text-sm font-bold text-white shadow-md transition-transform duration-300 group-hover:scale-110"
                    style={entranceStyle(desktopInView, delay, "scale")}
                  >
                    {step.number}
                  </div>
                </div>

                <div
                  className="flex flex-col justify-start px-3 pt-6"
                  style={{ gridColumn: column, gridRow: 3 }}
                >
                  {!isAbove && (
                    <div style={entranceStyle(desktopInView, delay, "up")}>
                      <StepCard step={step} />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
