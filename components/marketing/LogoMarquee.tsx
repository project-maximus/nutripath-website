import Image from "next/image";

const PARTNERS = [
  {
    name: "University of Toronto Scarborough — Sam Ibrahim Centre for Inclusive Excellence in Entrepreneurship, Innovation & Leadership",
    src: "/images/trusties/UOFT-SICIEEIL-trimmed.png",
    width: 900,
    height: 119,
    heightClass: "h-10 sm:h-11",
  },
  {
    name: "HealthNet Canada",
    src: "/images/trusties/helnet-trimmed.png",
    width: 760,
    height: 900,
    heightClass: "h-16 sm:h-20",
  },
  {
    name: "ICUBE UTM",
    src: "/images/trusties/icube-trimmed.png",
    width: 700,
    height: 161,
    heightClass: "h-7 sm:h-8",
  },
  {
    name: "Maxlab",
    src: "/images/illustrations/maxlab-logo.png",
    width: 929,
    height: 345,
    heightClass: "h-9 sm:h-10",
  },
  {
    name: "Business in the Streets",
    src: "/images/trusties/business-trimmed.png",
    width: 324,
    height: 254,
    heightClass: "h-12 sm:h-14",
  },
];

function LogoRow() {
  return (
    <div className="flex shrink-0 items-center gap-10 pr-10">
      {PARTNERS.map((partner) => (
        <div
          key={partner.name}
          className={`flex items-center ${partner.heightClass}`}
        >
          <Image
            src={partner.src}
            alt={partner.name}
            width={partner.width}
            height={partner.height}
            loading="eager"
            className="h-full w-auto object-contain opacity-50 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
          />
        </div>
      ))}
    </div>
  );
}

export default function LogoMarquee() {
  return (
    <div className="marquee-group overflow-hidden">
      <div className="marquee-track flex w-max">
        <LogoRow />
        <LogoRow />
      </div>
    </div>
  );
}
