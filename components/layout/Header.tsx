"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

function SoonLabel({ label }: { label: string }) {
  return (
    <span className="flex items-center gap-2 px-4 py-2.5 text-mid">
      {label}
      <span className="rounded-full bg-offwhite px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-mid">
        Soon
      </span>
    </span>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 60);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function onClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setProgramsOpen(false);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setProgramsOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  // Lock body scroll while the mobile overlay is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow ${
        scrolled ? "shadow-[0_2px_16px_rgba(52,52,51,0.08)]" : ""
      }`}
    >
      <div className="container-page flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/illustrations/nutripath-logo-mark.png"
            alt=""
            width={521}
            height={372}
            className="h-9 w-auto"
            priority
          />
          <span className="font-heading text-xl font-extrabold text-charcoal">
            NutriPath
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 font-body text-[15px] font-medium text-charcoal lg:flex"
        >
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              aria-expanded={programsOpen}
              aria-haspopup="true"
              onClick={() => setProgramsOpen((open) => !open)}
              className="flex items-center gap-1.5 rounded-full px-4 py-2.5 transition-colors hover:bg-offwhite"
            >
              Programs
              <svg
                width="11"
                height="11"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
                className={`transition-transform ${programsOpen ? "rotate-180" : ""}`}
              >
                <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {programsOpen && (
              <div className="absolute left-0 top-full mt-2 w-56 rounded-2xl border border-[#E5E7E0] bg-white p-2 shadow-lg">
                <Link
                  href="/cdre-prep"
                  onClick={() => setProgramsOpen(false)}
                  className="block rounded-xl px-4 py-2.5 hover:bg-offwhite"
                >
                  CDRE Prep
                </Link>
                <Link
                  href="/cdre-prep/v2"
                  onClick={() => setProgramsOpen(false)}
                  className="block rounded-xl px-4 py-2.5 hover:bg-offwhite"
                >
                  CDRE Prep V2
                </Link>
                <SoonLabel label="KCAT Prep" />
              </div>
            )}
          </div>

          <SoonLabel label="Resources" />
          <Link
            href="/pricing"
            className="rounded-full px-4 py-2.5 transition-colors hover:bg-offwhite"
          >
            Pricing
          </Link>
          <SoonLabel label="About" />
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="https://app.nutripath.ca"
            rel="noopener"
            className="rounded-full border-2 border-primary px-5 py-2.5 font-body text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
          >
            Login
          </a>
          <Link
            href="#waitlist"
            className="rounded-full bg-primary px-5 py-2.5 font-body text-sm font-semibold text-white transition-colors hover:bg-forest"
          >
            Join the Waitlist
          </Link>
        </div>

        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
          className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-offwhite lg:hidden"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            {mobileOpen ? (
              <path d="M4 4L18 18M18 4L4 18" stroke="#343433" strokeWidth="1.8" strokeLinecap="round" />
            ) : (
              <path d="M3 6H19M3 11H19M3 16H19" stroke="#343433" strokeWidth="1.8" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 top-20 z-40 flex flex-col gap-1 overflow-y-auto bg-forest px-6 py-8 text-white lg:hidden">
          <Link
            href="/cdre-prep"
            onClick={() => setMobileOpen(false)}
            className="rounded-xl px-4 py-4 text-lg font-medium hover:bg-white/10"
          >
            CDRE Prep
          </Link>
          <Link
            href="/cdre-prep/v2"
            onClick={() => setMobileOpen(false)}
            className="rounded-xl px-4 py-4 text-lg font-medium hover:bg-white/10"
          >
            CDRE Prep V2
          </Link>
          <span className="flex items-center gap-2 px-4 py-4 text-lg font-medium text-white/50">
            KCAT Prep
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide">
              Soon
            </span>
          </span>
          <span className="flex items-center gap-2 px-4 py-4 text-lg font-medium text-white/50">
            Resources
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide">
              Soon
            </span>
          </span>
          <Link
            href="/pricing"
            onClick={() => setMobileOpen(false)}
            className="rounded-xl px-4 py-4 text-lg font-medium hover:bg-white/10"
          >
            Pricing
          </Link>
          <span className="flex items-center gap-2 px-4 py-4 text-lg font-medium text-white/50">
            About
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide">
              Soon
            </span>
          </span>

          <div className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-6">
            <a
              href="https://app.nutripath.ca"
              rel="noopener"
              className="rounded-full border-2 border-white px-5 py-3.5 text-center font-semibold text-white"
            >
              Login
            </a>
            <Link
              href="#waitlist"
              onClick={() => setMobileOpen(false)}
              className="rounded-full bg-white px-5 py-3.5 text-center font-semibold text-primary"
            >
              Join the Waitlist
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
