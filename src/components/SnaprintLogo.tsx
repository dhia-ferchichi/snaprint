type Props = { className?: string; mark?: "color" | "mono-light" | "mono-dark" };

export function SnaprintMark({ className, mark = "color" }: Props) {
  const c =
    mark === "mono-light"
      ? { circle: "#FFFFF8", left: "#FFFFF8", right: "#FFFFF8", dot: "#FFFFF8", lines: "#032241" }
      : mark === "mono-dark"
      ? { circle: "#032241", left: "#032241", right: "#032241", dot: "#032241", lines: "#FFFFF8" }
      : { circle: "#A36EE0", left: "#1049D5", right: "#FFC07B", dot: "#A36EE0", lines: "#FFFFF8", mint: "#A2E0E5", coral: "#FF9D83" };

  return (
    <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden>
      {mark === "color" ? (
        <>
          <circle cx="100" cy="160.5" r="21.1" fill="#A36EE0" />
          <path
            d="M111.4,178.1c-9.8,6.4-22.9,3.6-29.2-6.2L23.4,81.4c-6.4-9.8-3.6-22.9,6.2-29.2c9.8-6.4,22.9-3.6,29.2,6.2l58.8,90.5C124,158.6,121.2,171.7,111.4,178.1z"
            fill="#1049D5"
          />
          <path
            d="M88.5,178.1c-9.8-6.4-12.6-19.4-6.2-29.2l58.8-90.5c6.4-9.8,19.4-12.6,29.2-6.2c9.8,6.4,12.6,19.4,6.2,29.2l-58.8,90.5C111.4,181.7,98.3,184.5,88.5,178.1z"
            fill="#FFC07B"
          />
          <circle cx="100" cy="160.5" r="21.1" fill="#A36EE0" />
          <circle cx="41.1" cy="69.8" r="21.1" fill="#A2E0E5" />
          <circle cx="158.9" cy="69.8" r="21.1" fill="#FF9D83" />
          <path d="M77.9,49.8c-1.7,1.1-4,0.6-5.1-1.1l-10.4-16c-1.1-1.7-0.6-4,1.1-5.1c1.7-1.1,4-0.6,5.1,1.1l10.4,16C80.1,46.4,79.6,48.7,77.9,49.8z" fill="#FFFFF8" />
          <path d="M100,44.8c-2,0-3.7-1.6-3.7-3.7v-19c0-2,1.6-3.7,3.7-3.7c2,0,3.7,1.6,3.7,3.7v19C103.7,43.1,102,44.8,100,44.8z" fill="#FFFFF8" />
          <path d="M122.1,49.8c-1.7-1.1-2.2-3.4-1.1-5.1l10.4-16c1.1-1.7,3.4-2.2,5.1-1.1c1.7,1.1,2.2,3.4,1.1,5.1l-10.4,16C126.1,50.4,123.8,50.9,122.1,49.8z" fill="#FFFFF8" />
        </>
      ) : (
        <>
          <circle cx="100" cy="160.5" r="21.1" fill={c.circle} />
          <circle cx="41.1" cy="69.8" r="21.1" fill={c.left} />
          <circle cx="158.9" cy="69.8" r="21.1" fill={c.right} />
          <path d="M77.9,49.8c-1.7,1.1-4,0.6-5.1-1.1l-10.4-16c-1.1-1.7-0.6-4,1.1-5.1c1.7-1.1,4-0.6,5.1,1.1l10.4,16C80.1,46.4,79.6,48.7,77.9,49.8z" fill={c.lines} />
          <path d="M100,44.8c-2,0-3.7-1.6-3.7-3.7v-19c0-2,1.6-3.7,3.7-3.7c2,0,3.7,1.6,3.7,3.7v19C103.7,43.1,102,44.8,100,44.8z" fill={c.lines} />
          <path d="M122.1,49.8c-1.7-1.1-2.2-3.4-1.1-5.1l10.4-16c1.1-1.7,3.4-2.2,5.1-1.1c1.7,1.1,2.2,3.4,1.1,5.1l-10.4,16C126.1,50.4,123.8,50.9,122.1,49.8z" fill={c.lines} />
        </>
      )}
    </svg>
  );
}

export function SnaprintWordmark({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className ?? ""}`}>
      <SnaprintMark className="h-7 w-7" />
      <span className="text-[17px] font-semibold tracking-tight text-foreground">snaprint</span>
    </div>
  );
}
