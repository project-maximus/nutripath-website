"use client";

import { useEffect, useRef, useState } from "react";
import {
  AccessibilityIcon,
  CloseIcon,
  ContrastIcon,
  MotionIcon,
  ResetIcon,
  SpacingIcon,
  UnderlineIcon,
} from "@/components/ui/icons";

const STORAGE_KEY = "nutripath-a11y-prefs";

const FONT_SCALES = [
  { value: 100, glyph: 13 },
  { value: 112, glyph: 16 },
  { value: 125, glyph: 19 },
  { value: 150, glyph: 22 },
];

type Prefs = {
  fontScale: number;
  contrast: boolean;
  reduceMotion: boolean;
  underlineLinks: boolean;
  dyslexia: boolean;
};

const DEFAULT_PREFS: Prefs = {
  fontScale: 100,
  contrast: false,
  reduceMotion: false,
  underlineLinks: false,
  dyslexia: false,
};

function applyPrefs(prefs: Prefs) {
  const root = document.documentElement;
  root.style.fontSize = prefs.fontScale === 100 ? "" : `${prefs.fontScale}%`;
  root.classList.toggle("a11y-contrast", prefs.contrast);
  root.classList.toggle("a11y-motion-off", prefs.reduceMotion);
  root.classList.toggle("a11y-underline-links", prefs.underlineLinks);
  root.classList.toggle("a11y-dyslexia", prefs.dyslexia);
}

function Toggle({
  checked,
  onChange,
  label,
  icon,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between gap-3 rounded-2xl px-2.5 py-2.5 text-left transition-colors hover:bg-offwhite"
    >
      <span className="flex items-center gap-3">
        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-sage text-primary">
          {icon}
        </span>
        <span className="font-body text-sm font-semibold text-charcoal">
          {label}
        </span>
      </span>
      <span
        className={`relative h-6 w-11 flex-shrink-0 rounded-full transition-colors duration-300 ${
          checked ? "bg-primary" : "bg-[#E5E7E0]"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-300 ${
            checked ? "translate-x-[22px]" : "translate-x-0.5"
          }`}
        />
      </span>
    </button>
  );
}

export default function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState<Prefs>(DEFAULT_PREFS);
  const [ready, setReady] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Load saved prefs once on mount and apply them.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = { ...DEFAULT_PREFS, ...JSON.parse(saved) };
        setPrefs(parsed);
        applyPrefs(parsed);
      }
    } catch {
      // ignore malformed storage
    }
    setReady(true);
  }, []);

  function update(next: Partial<Prefs>) {
    setPrefs((current) => {
      const merged = { ...current, ...next };
      applyPrefs(merged);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      } catch {
        // ignore storage failures (private browsing, quota, etc.)
      }
      return merged;
    });
  }

  function handleReset() {
    update(DEFAULT_PREFS);
  }

  useEffect(() => {
    if (!open) return;
    function onClickOutside(event: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const hasCustomPrefs =
    ready &&
    (prefs.fontScale !== 100 ||
      prefs.contrast ||
      prefs.reduceMotion ||
      prefs.underlineLinks ||
      prefs.dyslexia);

  return (
    <div ref={panelRef} className="fixed bottom-5 left-5 z-[60] sm:bottom-6 sm:left-6">
      {open && (
        <div className="a11y-panel-in absolute bottom-full left-0 mb-4 w-[320px] max-w-[calc(100vw-2.5rem)] rounded-3xl border border-[#E5E7E0] bg-white p-5 shadow-2xl">
          <div className="flex items-center justify-between">
            <p className="font-heading text-base font-bold text-charcoal">
              Accessibility
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close accessibility menu"
              className="flex h-8 w-8 items-center justify-center rounded-full text-mid transition-colors hover:bg-offwhite hover:text-charcoal"
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          </div>

          <p className="mt-4 font-body text-xs font-semibold uppercase tracking-wide text-primary">
            Text size
          </p>
          <div className="mt-2 flex items-center gap-2">
            {FONT_SCALES.map((scale) => (
              <button
                key={scale.value}
                type="button"
                aria-pressed={prefs.fontScale === scale.value}
                onClick={() => update({ fontScale: scale.value })}
                className={`flex h-11 flex-1 items-center justify-center rounded-xl border-2 font-heading font-bold transition-colors ${
                  prefs.fontScale === scale.value
                    ? "border-primary bg-sage text-primary"
                    : "border-[#E5E7E0] text-charcoal hover:border-primary/40"
                }`}
                style={{ fontSize: scale.glyph }}
              >
                A
              </button>
            ))}
          </div>

          <div className="mt-4 flex flex-col gap-1 border-t border-[#E5E7E0] pt-3">
            <Toggle
              checked={prefs.contrast}
              onChange={(value) => update({ contrast: value })}
              label="High contrast"
              icon={<ContrastIcon className="h-[18px] w-[18px]" />}
            />
            <Toggle
              checked={prefs.underlineLinks}
              onChange={(value) => update({ underlineLinks: value })}
              label="Underline links"
              icon={<UnderlineIcon className="h-[18px] w-[18px]" />}
            />
            <Toggle
              checked={prefs.dyslexia}
              onChange={(value) => update({ dyslexia: value })}
              label="Dyslexia-friendly spacing"
              icon={<SpacingIcon className="h-[18px] w-[18px]" />}
            />
            <Toggle
              checked={prefs.reduceMotion}
              onChange={(value) => update({ reduceMotion: value })}
              label="Reduce motion"
              icon={<MotionIcon className="h-[18px] w-[18px]" />}
            />
          </div>

          <button
            type="button"
            onClick={handleReset}
            disabled={!hasCustomPrefs}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-[#E5E7E0] py-2.5 font-body text-sm font-semibold text-mid transition-colors hover:bg-offwhite hover:text-charcoal disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
          >
            <ResetIcon className="h-4 w-4" />
            Reset to default
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Close accessibility menu" : "Open accessibility menu"}
        aria-expanded={open}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-forest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        {!open && (
          <span
            aria-hidden="true"
            className="a11y-fab-ring absolute inset-0 rounded-full bg-bright/60"
          />
        )}
        {open ? (
          <CloseIcon className="h-5 w-5" />
        ) : (
          <AccessibilityIcon className="h-6 w-6" />
        )}
        {hasCustomPrefs && !open && (
          <span
            aria-hidden="true"
            className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-bright"
          />
        )}
      </button>
    </div>
  );
}
