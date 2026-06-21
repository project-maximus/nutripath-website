"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { LeafIcon } from "@/components/ui/icons";

const STORAGE_KEY = "nutripath-announcement-dismissed";
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

  if (dismissed) return null;

  return (
    <div className="relative bg-primary px-4 py-2.5 text-center font-body text-sm text-white">
      <p className="mx-auto flex max-w-[calc(100%-2.5rem)] items-center justify-center gap-1.5">
        <LeafIcon className="h-3.5 w-3.5 flex-shrink-0" />
        The CDRE Founding Cohort opens November 2026 —{" "}
        <Link href="#waitlist" className="underline hover:opacity-80">
          join the waitlist
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
