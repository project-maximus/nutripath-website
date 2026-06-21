"use client";

import { useState } from "react";
import StudyPlanMockup from "@/components/marketing/StudyPlanMockup";

type Tab = { title: string; body: string };

export default function FeatureDeepDive({ tabs }: { tabs: Tab[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div className="flex flex-col" role="tablist" aria-label="Platform features">
        {tabs.map((tab, index) => {
          const active = index === activeIndex;
          return (
            <button
              key={tab.title}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setActiveIndex(index)}
              className={`border-l-2 px-6 py-5 text-left transition-colors ${
                active
                  ? "border-primary bg-sage/50"
                  : "border-transparent hover:bg-offwhite"
              }`}
            >
              <p
                className={`font-heading text-lg font-bold ${
                  active ? "text-primary" : "text-charcoal"
                }`}
              >
                {tab.title}
              </p>
              {active && (
                <p className="mt-2 font-body text-sm leading-relaxed text-mid">
                  {tab.body}
                </p>
              )}
            </button>
          );
        })}
      </div>
      <StudyPlanMockup activeIndex={activeIndex} />
    </div>
  );
}
