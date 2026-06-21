import { Fragment } from "react";
import Reveal from "@/components/ui/Reveal";

type Step = {
  number: string;
  title: string;
  body: string;
};

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
      className={`rounded-2xl border border-white/60 bg-white/50 p-3 shadow-md backdrop-blur-lg transition-all duration-300 group-hover:-translate-y-1.5 group-hover:bg-white/75 group-hover:shadow-xl sm:p-5 ${alignClass}`}
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

export default function HowItWorksTimeline({ steps }: { steps: Step[] }) {
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
      <div className="relative hidden lg:block">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/4 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-bright/25 blur-3xl" />
          <div className="absolute left-3/4 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />
        </div>

        <Reveal
          direction="scale-x"
          className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-[#E5E7E0]"
        />

        <div
          className="grid grid-cols-4"
          style={{ gridTemplateRows: `${ROW_HEIGHT} auto ${ROW_HEIGHT}` }}
        >
          {steps.map((step, index) => {
            const isAbove = index % 2 === 0;
            const column = index + 1;

            return (
              <Fragment key={step.number}>
                <div
                  className="group flex flex-col justify-end px-3 pb-6"
                  style={{ gridColumn: column, gridRow: 1 }}
                >
                  {isAbove && (
                    <Reveal direction="down" delay={index * 120}>
                      <StepCard step={step} />
                    </Reveal>
                  )}
                </div>

                <div
                  className="group relative z-10 flex items-center justify-center"
                  style={{ gridColumn: column, gridRow: 2 }}
                >
                  <Reveal
                    delay={index * 120}
                    className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-primary font-heading text-sm font-bold text-white shadow-md transition-transform duration-300 group-hover:scale-110"
                  >
                    {step.number}
                  </Reveal>
                </div>

                <div
                  className="group flex flex-col justify-start px-3 pt-6"
                  style={{ gridColumn: column, gridRow: 3 }}
                >
                  {!isAbove && (
                    <Reveal direction="up" delay={index * 120}>
                      <StepCard step={step} />
                    </Reveal>
                  )}
                </div>
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
