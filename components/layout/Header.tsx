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

type MobileLink = { label: string; href?: string; soon?: boolean };

const mobileLinks: MobileLink[] = [
  { label: "Home", href: "/" },
  { label: "CDRE Prep", href: "/cdre-prep" },
  { label: "KCAT Bootcamp", href: "/kcat-bootcamp" },
  { label: "KCAT Prep", soon: true },
  { label: "Resources", href: "/resources" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

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
      const target = event.target as Node;
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setProgramsOpen(false);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setProgramsOpen(false);
      }
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
          <Link
            href="/"
            className="rounded-full px-4 py-2.5 transition-colors hover:bg-offwhite"
          >
            Home
          </Link>

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
                  href="/kcat-bootcamp"
                  onClick={() => setProgramsOpen(false)}
                  className="block rounded-xl px-4 py-2.5 hover:bg-offwhite"
                >
                  KCAT Bootcamp
                </Link>
                <SoonLabel label="KCAT Prep" />
              </div>
            )}
          </div>

          <Link
            href="/resources"
            className="rounded-full px-4 py-2.5 transition-colors hover:bg-offwhite"
          >
            Resources
          </Link>
          <Link
            href="/pricing"
            className="rounded-full px-4 py-2.5 transition-colors hover:bg-offwhite"
          >
            Pricing
          </Link>
          <Link
            href="/about"
            className="rounded-full px-4 py-2.5 transition-colors hover:bg-offwhite"
          >
            About
          </Link>
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

      <div
        aria-hidden={!mobileOpen}
        className={`fixed inset-x-0 bottom-0 top-20 z-40 flex flex-col overflow-y-auto bg-forest/95 px-6 py-8 text-white backdrop-blur-xl transition-all duration-500 ease-out lg:hidden ${
          mobileOpen
            ? "translate-y-0 opacity-100"
            : "invisible translate-y-full opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1" aria-label="Mobile">
          {mobileLinks.map((link, index) => (
            <div
              key={link.label}
              className={`transition-all duration-500 ease-out ${
                mobileOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
              style={{ transitionDelay: mobileOpen ? `${150 + index * 60}ms` : "0ms" }}
            >
              {link.soon ? (
                <span className="flex items-center gap-2 px-4 py-3.5 font-heading text-2xl font-bold text-white/40">
                  {link.label}
                  <span className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide">
                    Soon
                  </span>
                </span>
              ) : (
                <Link
                  href={link.href!}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3.5 font-heading text-2xl font-bold transition-colors hover:text-bright"
                >
                  {link.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div
          className={`mt-auto flex flex-col gap-3 border-t border-white/10 pt-6 transition-all duration-500 ease-out ${
            mobileOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
          style={{
            transitionDelay: mobileOpen
              ? `${150 + mobileLinks.length * 60}ms`
              : "0ms",
          }}
        >
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
    </header>
  );
}
