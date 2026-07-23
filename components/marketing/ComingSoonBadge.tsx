import Image from "next/image";

function StarBubbleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2l2.4 7.2H22l-6 4.4 2.3 7.2-6.3-4.5-6.3 4.5 2.3-7.2-6-4.4h7.6z"
        fill="white"
      />
    </svg>
  );
}

function HeartBubbleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 20s-8-5-8-11a5 5 0 019-3 5 5 0 019 3c0 6-8 11-8 11z"
        fill="white"
      />
    </svg>
  );
}

function CheckBubbleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 12.5l5 5L20 6" stroke="white" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Bubble({
  icon,
  line1,
  line2,
  className,
}: {
  icon: React.ReactNode;
  line1: string;
  line2: string;
  className: string;
}) {
  return (
    <div
      className={`absolute flex items-center gap-2.5 rounded-2xl bg-white px-3.5 py-2.5 shadow-md ${className}`}
    >
      <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary">
        {icon}
      </span>
      <span className="text-left font-body text-xs leading-tight text-mid">
        {line1}
        <br />
        <span className="font-bold text-primary">{line2}</span>
      </span>
    </div>
  );
}

export default function ComingSoonBadge() {
  return (
    <div className="relative mx-auto mt-16 h-[280px] w-full max-w-md sm:h-[320px]">
      <div
        className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sage sm:h-64 sm:w-64"
        aria-hidden="true"
      />
      <div
        className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-primary/30 sm:h-52 sm:w-52"
        aria-hidden="true"
      />
      <div className="absolute left-1/2 top-1/2 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg sm:h-36 sm:w-36">
        <Image
          src="/images/illustrations/nutripath-logo-mark.png"
          alt="NutriPath"
          width={521}
          height={372}
          className="h-16 w-auto sm:h-[4.5rem]"
        />
      </div>

      <Bubble
        icon={<StarBubbleIcon />}
        line1="Smarter prep."
        line2="Better results."
        className="left-0 top-6 sm:left-2 sm:top-8"
      />
      <Bubble
        icon={<HeartBubbleIcon />}
        line1="Built by dietitians."
        line2="For future dietitians."
        className="right-0 top-0 sm:right-2"
      />
      <Bubble
        icon={<CheckBubbleIcon />}
        line1="You've got this."
        line2="We've got you."
        className="bottom-4 right-2 sm:bottom-8 sm:right-6"
      />
    </div>
  );
}
