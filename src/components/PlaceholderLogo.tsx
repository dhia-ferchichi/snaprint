type Props = {
  label: string;
  className?: string;
  variant?: "grid" | "marquee";
};

/**
 * Intentional monogram tile used as a placeholder until real logo SVGs land.
 * Reads as an identity mark (initials + underline rule), not as truncated text.
 */
export function PlaceholderLogo({ label, className = "", variant = "grid" }: Props) {
  const initials = label
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();

  const size = variant === "marquee" ? "h-11 w-11" : "h-14 w-14";
  const type = variant === "marquee" ? "text-[13px]" : "text-[15px]";

  return (
    <div
      aria-label={label}
      title={label}
      className={`inline-flex ${size} flex-col items-center justify-center rounded-lg border border-border bg-secondary/60 text-foreground/80 transition-colors hover:text-foreground ${className}`}
    >
      <span className={`font-sans font-semibold leading-none ${type}`}>{initials}</span>
      <span aria-hidden className="mt-1.5 h-px w-5 bg-ink-faint/60" />
    </div>
  );
}
