"use client";

import { useMemo, useState } from "react";
import Reveal from "@/components/ui/Reveal";
import Pill from "@/components/ui/Pill";
import type { FaqIconKey, FaqItem } from "@/lib/content/faq";
import {
  ClipboardCheckIcon,
  LayersIcon,
  CheckBadgeIcon,
  AccessibilityIcon,
  TrendingUpIcon,
  TargetIcon,
  CalendarIcon,
  UsersIcon,
  FlashcardIcon,
  TagIcon,
} from "@/components/ui/icons";

const INITIAL_COUNT = 6;

const ICONS: Record<FaqIconKey, typeof ClipboardCheckIcon> = {
  exam: ClipboardCheckIcon,
  levels: LayersIcon,
  verified: CheckBadgeIcon,
  accessibility: AccessibilityIcon,
  trending: TrendingUpIcon,
  target: TargetIcon,
  calendar: CalendarIcon,
  users: UsersIcon,
  formats: FlashcardIcon,
  payment: TagIcon,
};

function SearchIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="9" cy="9" r="6.5" />
      <path d="M18 18l-4-4" />
    </svg>
  );
}

export default function FaqSection({ items }: { items: FaqItem[] }) {
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (item) =>
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q)
    );
  }, [items, query]);

  const isSearching = query.trim().length > 0;
  const visibleItems =
    isSearching || expanded ? filtered : filtered.slice(0, INITIAL_COUNT);
  const hasMore = !isSearching && items.length > INITIAL_COUNT;

  return (
    <section className="bg-offwhite py-20 sm:py-28">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Pill tone="sage" icon="none" className="uppercase tracking-wide">
            FAQs
          </Pill>
          <h2 className="mt-4 font-heading text-4xl font-extrabold text-charcoal">
            Frequently asked questions
          </h2>
          <p className="mt-3 font-body text-lg text-mid">
            Have questions? We&rsquo;re here to help.
          </p>

          <div className="relative mx-auto mt-8 max-w-md">
            <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-mid" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search questions..."
              aria-label="Search FAQs"
              className="w-full rounded-full border border-[#E5E7E0] bg-white py-3 pl-11 pr-4 font-body text-sm text-charcoal placeholder:text-mid focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </Reveal>

        {visibleItems.length === 0 ? (
          <p className="mt-14 text-center font-body text-base text-mid">
            No questions match &ldquo;{query}&rdquo;. Try another search, or
            reach out below.
          </p>
        ) : (
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visibleItems.map((item, index) => {
              const Icon = ICONS[item.iconKey];
              return (
                <Reveal key={item.question} delay={(index % 6) * 70}>
                  <div className="group flex h-full flex-col rounded-2xl border border-[#E5E7E0] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg">
                    <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-sage text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 font-heading text-lg font-bold text-charcoal">
                      {item.question}
                    </h3>
                    <p className="mt-2 line-clamp-4 font-body text-sm leading-relaxed text-mid">
                      {item.answer}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        )}

        {hasMore && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setExpanded((value) => !value)}
              className="inline-flex items-center gap-2 rounded-full border border-primary px-6 py-3 font-body text-sm font-semibold text-primary transition-all duration-300 hover:bg-primary hover:text-white"
            >
              {expanded ? "Show fewer questions" : "View more questions"}
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
                className={`transition-transform duration-300 ${
                  expanded ? "rotate-180" : ""
                }`}
              >
                <path
                  d="M3 5.5L7 9.5L11 5.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        )}

        <p className="mt-10 text-center font-body text-base text-mid">
          Can&rsquo;t find what you&rsquo;re looking for? Contact our{" "}
          <a
            href="mailto:nutripathcanada@gmail.com"
            className="font-semibold text-primary hover:underline"
          >
            support team
          </a>
          .
        </p>
      </div>
    </section>
  );
}
