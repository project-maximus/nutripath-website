import Link from "next/link";

function SoonItem({ label }: { label: string }) {
  return (
    <span className="flex items-center gap-2 text-white/40">
      {label}
      <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide">
        Soon
      </span>
    </span>
  );
}

export default function Footer() {
  return (
    <footer className="bg-forest text-white">
      <div className="container-page grid grid-cols-2 gap-x-6 gap-y-10 py-16 lg:grid-cols-4">
        <div className="col-span-2 flex flex-col items-center text-center lg:col-span-1 lg:items-start lg:text-left">
          <Link href="/" className="font-heading text-xl font-extrabold">
            NutriPath
          </Link>
          <p className="mt-3 max-w-xs font-body text-sm leading-relaxed text-white/70">
            CDRE and KCAT exam prep built by registered dietitians — accessible,
            honest, and designed for how you actually learn.
          </p>
          <a
            href="https://www.linkedin.com"
            rel="noopener"
            aria-label="NutriPath on LinkedIn"
            className="mt-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 hover:bg-white/10"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden="true">
              <path d="M4.98 3.5C4.98 4.88 3.94 6 2.5 6S0 4.88 0 3.5 1.06 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8.5h4.56V23H.22V8.5zM8.34 8.5h4.37v1.98h.06c.61-1.16 2.1-2.38 4.32-2.38 4.62 0 5.47 3.04 5.47 7v8.4h-4.56v-7.45c0-1.78-.03-4.06-2.48-4.06-2.48 0-2.86 1.94-2.86 3.94V23H8.34V8.5z" />
            </svg>
          </a>
        </div>

        <div className="flex flex-col items-center gap-3 text-center font-body text-sm lg:items-start lg:text-left">
          <h2 className="font-heading text-base font-bold">Programs</h2>
          <Link href="/cdre-prep" className="text-white/70 hover:text-white">
            CDRE Prep
          </Link>
          <Link href="/kcat-bootcamp" className="text-white/70 hover:text-white">
            KCAT Bootcamp
          </Link>
          <SoonItem label="KCAT Prep" />
          <SoonItem label="About the Exams" />
        </div>

        <div className="flex flex-col items-center gap-3 text-center font-body text-sm lg:items-start lg:text-left">
          <Link href="/resources" className="font-heading text-base font-bold hover:text-bright">
            Resources
          </Link>
          <Link href="/blog" className="text-white/70 hover:text-white">
            Blog
          </Link>
          <SoonItem label="CDRE Study Guide" />
          <Link href="/resources" className="text-white/70 hover:text-white">
            KCAT Study Guide
          </Link>
          <SoonItem label="Accessibility" />
        </div>

        <div className="col-span-2 flex flex-col items-center gap-3 text-center font-body text-sm lg:col-span-1 lg:items-start lg:text-left">
          <h2 className="font-heading text-base font-bold">Connect</h2>
          <SoonItem label="Contact" />
          <SoonItem label="Partnership Inquiries" />
          <a
            href="mailto:nutripathcanada@gmail.com"
            className="text-white/70 hover:text-white"
          >
            nutripathcanada@gmail.com
          </a>
          <a
            href="https://www.linkedin.com"
            rel="noopener"
            className="text-white/70 hover:text-white"
          >
            LinkedIn
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 font-body text-xs text-white/60 sm:flex-row">
          <p>© 2026 NutriPath Canada</p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="text-white/70 hover:text-white">
              Terms &amp; Conditions
            </Link>
            <SoonItem label="Accessibility Statement" />
            <SoonItem label="Privacy Policy" />
          </div>
          <p>Built by Maxxlab</p>
        </div>
        <div className="container-page pb-6">
          <p className="font-body text-xs text-white/50">
            CDRE & KCAT built by dietitians
          </p>
        </div>
      </div>
    </footer>
  );
}
