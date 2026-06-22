"use client";

import { useId, useState } from "react";

export type AccordionItem = {
  question: string;
  answer: string;
};

type AccordionProps = {
  items: AccordionItem[];
  variant?: "card" | "flat";
  revealAnswer?: boolean;
};

function AnimatedAnswer({ text }: { text: string }) {
  const words = text.split(" ");

  return (
    <p className="font-body text-base leading-relaxed text-mid">
      {words.map((word, index) => (
        <span
          key={index}
          className="word-reveal inline-block"
          style={{ animationDelay: `${index * 18}ms` }}
        >
          {word}
          {index < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}

export default function Accordion({
  items,
  variant = "card",
  revealAnswer = false,
}: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();
  const isFlat = variant === "flat";

  return (
    <div
      className={
        isFlat
          ? "divide-y divide-[#E5E7E0]"
          : "divide-y divide-[#E5E7E0] rounded-2xl border border-[#E5E7E0] bg-white"
      }
    >
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const buttonId = `${baseId}-button-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <div key={item.question}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className={`flex w-full items-center justify-between gap-4 text-left font-body text-base font-medium text-charcoal transition-colors hover:text-primary sm:text-lg ${
                  isFlat ? "py-4" : "px-5 py-5 sm:px-6"
                }`}
              >
                <span>{item.question}</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                  className={`flex-shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                >
                  <path
                    d="M3 6L8 11L13 6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={`accordion-panel ${isOpen ? "is-open" : ""}`}
            >
              <div>
                <div className={isFlat ? "pb-4" : "px-5 pb-5 sm:px-6"}>
                  {revealAnswer ? (
                    isOpen && <AnimatedAnswer text={item.answer} />
                  ) : (
                    <p className="font-body text-base leading-relaxed text-mid">
                      {item.answer}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
