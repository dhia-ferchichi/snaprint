type Props = {
  className?: string;
  size?: number;
};

export function TikTokIcon({ className = "", size = 16 }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M19.6 6.32a5.5 5.5 0 0 1-3.24-1.05 5.5 5.5 0 0 1-2.15-3.27h-3.35v13.06a2.72 2.72 0 1 1-2.72-2.72c.28 0 .55.04.8.12v-3.4a6.13 6.13 0 0 0-.8-.05 6.11 6.11 0 1 0 6.11 6.12V8.68a8.8 8.8 0 0 0 5.35 1.82V7.13a5.55 5.55 0 0 1-0-0.81z" />
    </svg>
  );
}
