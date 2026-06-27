"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { termsIntro, termsAgreement, termsSections } from "@/lib/content/terms";

type TermsModalProps = {
  triggerClassName?: string;
  onAgree?: () => void;
};

export default function TermsModal({
  triggerClassName = "",
  onAgree,
}: TermsModalProps) {
  const [open, setOpen] = useState(false);
  const [scrolledToBottom, setScrolledToBottom] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function handleScroll(event: React.UIEvent<HTMLDivElement>) {
    const target = event.currentTarget;
    const isAtBottom =
      target.scrollHeight - target.scrollTop - target.clientHeight < 16;
    if (isAtBottom) setScrolledToBottom(true);
  }

  function handleOpen() {
    setScrolledToBottom(false);
    setOpen(true);
  }

  function handleAgree() {
    setOpen(false);
    onAgree?.();
  }

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className={
          triggerClassName ||
          "font-semibold underline underline-offset-2 hover:no-underline"
        }
      >
        Terms &amp; Conditions
      </button>

      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-charcoal/60 p-4 backdrop-blur-sm"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setOpen(false);
            }}
          >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="flex max-h-[85vh] w-full max-w-lg flex-col rounded-3xl bg-white shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4 border-b border-[#E5E7E0] p-6">
              <div>
                <h2
                  id={titleId}
                  className="font-heading text-xl font-bold text-charcoal"
                >
                  Terms &amp; Conditions
                </h2>
                <p className="mt-1 font-body text-sm text-mid">
                  Please read and scroll to the bottom to accept.
                </p>
              </div>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-mid hover:bg-offwhite"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M3 3L13 13M13 3L3 13"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex-1 overflow-y-auto p-6"
            >
              <div className="flex flex-col gap-5 font-body text-sm leading-relaxed text-mid">
                <p>{termsIntro}</p>
                <p>{termsAgreement}</p>
                {termsSections.map((section) => (
                  <div key={section.title}>
                    <h3 className="font-heading text-base font-bold text-charcoal">
                      {section.title}
                    </h3>
                    {section.body && <p className="mt-1.5">{section.body}</p>}
                    {section.bullets && (
                      <ul className="mt-2 flex flex-col gap-1.5">
                        {section.bullets.map((bullet) => (
                          <li key={bullet} className="flex gap-2">
                            <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-primary" />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-[#E5E7E0] p-6">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full px-5 py-2.5 font-body text-sm font-semibold text-mid hover:bg-offwhite"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!scrolledToBottom}
                onClick={handleAgree}
                className="rounded-full bg-primary px-5 py-2.5 font-body text-sm font-semibold text-white transition-colors hover:bg-forest disabled:cursor-not-allowed disabled:bg-mid/30 disabled:text-mid"
              >
                I Agree
              </button>
            </div>
          </div>
          </div>,
          document.body
        )}
    </>
  );
}
