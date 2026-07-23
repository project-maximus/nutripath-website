type DoodleProps = { className?: string };

function BookDoodle({ className = "" }: DoodleProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <path
        d="M6 10c6-3 12-3 18 0v28c-6-3-12-3-18 0V10z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M42 10c-6-3-12-3-18 0v28c6-3 12-3 18 0V10z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M11 16h9M11 22h9M11 28h9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function PencilDoodle({ className = "" }: DoodleProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <path
        d="M31 8l9 9-19 19H12v-9L31 8z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M27 12l9 9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 36l-3 6 6-3" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function CapDoodle({ className = "" }: DoodleProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <path
        d="M24 12L4 20l20 8 20-8-20-8z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M13 24v8c0 3 5 6 11 6s11-3 11-6v-8" stroke="currentColor" strokeWidth="1.6" />
      <path d="M40 20v10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function BulbDoodle({ className = "" }: DoodleProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <path
        d="M24 6c-7 0-12 5-12 12 0 5 3 8 5 10s2 3 2 5h10c0-2 0-3 2-5s5-5 5-10c0-7-5-12-12-12z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M19 39h10M20 43h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function ChecklistDoodle({ className = "" }: DoodleProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <rect x="8" y="6" width="32" height="38" rx="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M17 4h14v6H17z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M14 20l3 3 6-6M14 32l3 3 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M27 21h8M27 33h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function SparkleDoodle({ className = "" }: DoodleProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 2c0 4-1 8-3 10s-6 3-6 3 4 1 6 3 3 6 3 6 1-4 3-6 6-3 6-3-4-1-6-3-3-6-3-10z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeartDoodle({ className = "" }: DoodleProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 20s-8-5-8-11a5 5 0 019-3 5 5 0 019 3c0 6-8 11-8 11z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const positions = [
  { Icon: BookDoodle, className: "left-[4%] top-[14%] h-14 w-14 -rotate-6 sm:h-16 sm:w-16" },
  { Icon: CapDoodle, className: "right-[6%] top-[16%] h-14 w-14 rotate-6 sm:h-16 sm:w-16" },
  { Icon: PencilDoodle, className: "left-[3%] top-[58%] h-12 w-12 rotate-12 sm:h-14 sm:w-14" },
  { Icon: BulbDoodle, className: "right-[5%] top-[55%] h-12 w-12 -rotate-6 sm:h-14 sm:w-14" },
  { Icon: ChecklistDoodle, className: "left-[7%] top-[84%] h-12 w-12 -rotate-6 sm:h-14 sm:w-14" },
  { Icon: SparkleDoodle, className: "left-[16%] top-[8%] h-5 w-5" },
  { Icon: SparkleDoodle, className: "right-[18%] top-[6%] h-4 w-4" },
  { Icon: SparkleDoodle, className: "left-[10%] top-[38%] h-4 w-4" },
  { Icon: SparkleDoodle, className: "right-[10%] top-[36%] h-5 w-5" },
  { Icon: HeartDoodle, className: "right-[14%] top-[70%] h-5 w-5" },
  { Icon: HeartDoodle, className: "left-[20%] top-[92%] h-4 w-4" },
];

export default function ComingSoonDoodles() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden overflow-hidden opacity-[0.35] sm:block" aria-hidden="true">
      {positions.map(({ Icon, className }, index) => (
        <Icon key={index} className={`absolute text-primary ${className}`} />
      ))}
    </div>
  );
}
