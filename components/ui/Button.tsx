import Link from "next/link";
import type { ButtonHTMLAttributes } from "react";

type CommonProps = {
  variant?: "primary" | "secondary" | "white";
  size?: "md" | "sm";
  showArrow?: boolean;
  className?: string;
  children: React.ReactNode;
};

type LinkProps = CommonProps & {
  href: string;
  external?: boolean;
};

type NativeButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-body font-semibold transition-all duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2";

const sizes: Record<"md" | "sm", string> = {
  md: "px-6 py-3.5 text-base min-h-[44px]",
  sm: "px-5 py-2.5 text-sm min-h-[40px]",
};

const variants: Record<"primary" | "secondary" | "white", string> = {
  primary:
    "bg-primary text-white hover:bg-forest hover:shadow-lg hover:-translate-y-0.5",
  secondary:
    "border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white",
  white:
    "bg-white text-primary hover:bg-sage hover:-translate-y-0.5 hover:shadow-lg",
};

function Arrow() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="transition-transform duration-200 group-hover:translate-x-0.5"
    >
      <path
        d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Button({
  variant = "primary",
  size = "md",
  showArrow = true,
  className = "",
  children,
  ...props
}: LinkProps | NativeButtonProps) {
  const classes = `group ${base} ${sizes[size]} ${variants[variant]} ${className}`;

  if ("href" in props && props.href) {
    const { href, external } = props;
    if (external || href.startsWith("http")) {
      return (
        <a
          href={href}
          rel="noopener"
          className={classes}
        >
          {children}
          {showArrow && <Arrow />}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
        {showArrow && <Arrow />}
      </Link>
    );
  }

  const buttonProps = props as NativeButtonProps;

  return (
    <button className={classes} {...buttonProps}>
      {children}
      {showArrow && <Arrow />}
    </button>
  );
}
