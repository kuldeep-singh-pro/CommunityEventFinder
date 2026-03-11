import { Link } from "react-router-dom";

export default function Logo({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const color1 = variant === "light" ? "#FFFFFF" : "#3B82F6";
  const color2 = variant === "light" ? "#E5E7EB" : "#2563EB";
  const textColor = variant === "light" ? "text-white" : "text-gray-900";
  const accentColor = variant === "light" ? "text-white" : "text-blue-600";

  return (
    <Link
      to="/"
      className="flex items-center gap-3 text-[18px] font-semibold tracking-tight"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" className="animate-spin-slow">
        <defs>
          <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={color1} />
            <stop offset="100%" stopColor={color2} />
          </linearGradient>
        </defs>

        <circle cx="12" cy="3.5" r="1.9" fill="url(#logoGrad)" />
        <circle cx="19.5" cy="8" r="1.9" fill="url(#logoGrad)" />
        <circle cx="19.5" cy="16" r="1.9" fill="url(#logoGrad)" />
        <circle cx="12" cy="20.5" r="1.9" fill="url(#logoGrad)" />
        <circle cx="4.5" cy="16" r="1.9" fill="url(#logoGrad)" />
        <circle cx="4.5" cy="8" r="1.9" fill="url(#logoGrad)" />
      </svg>

      <span className={textColor}>
        Event<span className={accentColor}>Finder</span>
      </span>
    </Link>
  );
}