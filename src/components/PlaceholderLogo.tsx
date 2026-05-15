type Props = {
  label: string;
  className?: string;
};

/**
 * Neutral monogram tile used as a placeholder logo until real SVGs are available.
 * Renders 1–3 initials in foreground color, framed with a thin border.
 */
export function PlaceholderLogo({ label, className = "" }: Props) {
  const initials = label
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();

  return (
    <div
      aria-label={label}
      className={`mono flex h-12 min-w-[88px] items-center justify-center rounded-md border border-border px-4 text-[13px] font-bold tracking-[0.18em] text-ink-soft transition-colors hover:text-foreground ${className}`}
    >
      {initials}
    </div>
  );
}
