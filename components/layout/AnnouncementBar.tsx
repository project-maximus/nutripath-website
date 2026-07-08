"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { LeafIcon } from "@/components/ui/icons";

const STORAGE_KEY = "nutripath-announcement-dismissed";
const ROTATE_MS = 5500;

const messages = [
  {
    text: "The CDRE Founding Cohort opens September 2026",
    linkLabel: "join the waitlist",
    href: "#waitlist",
  },
  {
    text: "KCAT Live Bootcamp enrolment is now open",
    linkLabel: "view the upcoming cohort",
    href: "/kcat-bootcamp",
  },
];

const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function getSnapshot() {
  return sessionStorage.getItem(STORAGE_KEY) === "true";
}

function getServerSnapshot() {
  return false;
}

function dismiss() {
  sessionStorage.setItem(STORAGE_KEY, "true");
  listeners.forEach((listener) => listener());
}

export default function AnnouncementBar() {
  const dismissed = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (dismissed) return;
    const id = setInterval(() => {
      setIndex((current) => (current + 1) % messages.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [dismissed]);

  if (dismissed) return null;

  const message = messages[index];

  return (
    <div className="relative bg-primary px-4 py-2.5 text-center font-body text-sm text-white">
      <p
        key={index}
        className="mx-auto flex max-w-[calc(100%-2.5rem)] flex-wrap items-center justify-center gap-x-1.5 gap-y-0.5 animate-announcement-fade"
      >
        <LeafIcon className="h-3.5 w-3.5 flex-shrink-0" />
        {message.text} —{" "}
        <Link href={message.href} className="underline hover:opacity-80">
          {message.linkLabel}
        </Link>
      </p>
      <button
        type="button"
        aria-label="Dismiss announcement"
        onClick={dismiss}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path
            d="M1 1L13 13M13 1L1 13"
            stroke="white"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}
