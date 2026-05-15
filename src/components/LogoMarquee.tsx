import { PlaceholderLogo } from "./PlaceholderLogo";

type Props = {
  items: string[];
  durationSec?: number;
};

/**
 * Pure-CSS auto-scrolling marquee. Children are duplicated so the loop is seamless.
 * Pauses on hover. No JS animation, no motion library.
 */
export function LogoMarquee({ items, durationSec = 40 }: Props) {
  const loop = [...items, ...items];
  return (
    <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
      <div
        className="marquee-track flex w-max items-center gap-4"
        style={{ animationDuration: `${durationSec}s` }}
      >
        {loop.map((label, i) => (
          <PlaceholderLogo key={`${label}-${i}`} label={label} />
        ))}
      </div>
    </div>
  );
}
