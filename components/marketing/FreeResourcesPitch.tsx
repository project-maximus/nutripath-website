import Image from "next/image";
import Link from "next/link";

const TICKER_ITEMS = [
  "100% free",
  "CDRE Study Tips",
  "KCAT Ethics Guide",
  "No paywall, ever",
  "Sent straight to your inbox",
];

function TickerRow() {
  return (
    <div className="flex shrink-0 items-center gap-3 pr-3" aria-hidden="true">
      {TICKER_ITEMS.map((item, index) => (
        <span key={index} className="flex items-center gap-3">
          <span className="font-body text-sm font-semibold uppercase tracking-wide text-white/90">
            {item}
          </span>
          <span className="size-1 rounded-full bg-bright" />
        </span>
      ))}
    </div>
  );
}

export default function FreeResourcesPitch() {
  return (
    <Link
      href="/resources"
      className="group relative mt-16 block overflow-hidden rounded-3xl bg-[radial-gradient(120%_140%_at_15%_0%,#3a760d_0%,#1a3d06_55%)] shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
    >

      <div className="relative flex flex-col-reverse items-center gap-8 px-6 py-8 sm:flex-row sm:justify-center sm:gap-12 sm:px-10 sm:py-10">
        <div className="text-center sm:max-w-sm sm:text-left">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 font-body text-xs font-semibold uppercase tracking-wide text-bright backdrop-blur-sm">
            Free download
          </span>
          <h3 className="mt-4 font-heading text-2xl font-extrabold leading-tight text-white sm:text-3xl">
            Not ready to commit?
            <br />
            Grab 2 free study guides.
          </h3>
          <p className="mt-3 font-body text-base leading-relaxed text-white/75">
            Built by registered dietitians. Enter your email and we&rsquo;ll
            send them straight to your inbox — no paywall.
          </p>
          <span className="relative mt-6 inline-flex items-center gap-2 overflow-hidden rounded-full bg-bright px-6 py-3 font-body text-sm font-extrabold text-forest shadow-lg transition-transform duration-300 group-hover:scale-105">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 bg-white/40 animate-shine"
            />
            <span className="relative">Get the guides free</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
              className="relative transition-transform duration-300 group-hover:translate-x-1"
            >
              <path
                d="M2.5 7H11.5M8 3.5L11.5 7L8 10.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>

        <div className="relative flex h-48 w-56 flex-shrink-0 items-center justify-center sm:h-60 sm:w-72">
          <div className="absolute h-44 w-32 -rotate-6 overflow-hidden rounded-xl border-2 border-white/80 shadow-lg transition-transform duration-500 ease-out group-hover:-translate-x-3 group-hover:-rotate-[10deg] sm:h-56 sm:w-40">
            <Image
              src="/images/resources/cdre-cover.jpg"
              alt="First page of the NutriPath CDRE Study Tips guide"
              fill
              sizes="160px"
              className="object-cover object-top"
            />
          </div>
          <div className="absolute h-44 w-32 rotate-6 overflow-hidden rounded-xl border-2 border-white/80 shadow-lg transition-transform duration-500 ease-out group-hover:translate-x-3 group-hover:rotate-[10deg] sm:h-56 sm:w-40">
            <Image
              src="/images/resources/kcat-cover.jpg"
              alt="First page of the NutriPath KCAT Ethics Study Guide"
              fill
              sizes="160px"
              className="object-cover object-top"
            />
          </div>
          <span className="absolute -top-1 right-6 flex h-9 w-9 items-center justify-center rounded-full bg-bright text-[10px] font-extrabold text-forest shadow-md sm:right-4">
            FREE
          </span>
        </div>
      </div>

      <div className="relative overflow-hidden border-t border-white/10 bg-black/15 py-3">
        <div className="resource-ticker-track flex w-max">
          <TickerRow />
          <TickerRow />
        </div>
      </div>
    </Link>
  );
}
