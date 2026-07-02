import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";

export function FloatingContactCTA() {
  const { t } = useI18n();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const target = document.getElementById("contact");
    if (!target) return;
    const io = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { threshold: 0.15 },
    );
    io.observe(target);
    return () => io.disconnect();
  }, []);

  return (
    <a
      href="/#contact"
      aria-label={t("Get in touch", "Nous contacter")}
      className={`mono fixed right-4 z-40 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-[11px] uppercase tracking-[0.14em] text-primary-foreground shadow-lg shadow-black/20 transition-all duration-300 md:hidden ${
        hidden ? "pointer-events-none translate-y-6 opacity-0" : "opacity-100"
      }`}
      style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 1rem)" }}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-snap-mint" />
      {t("Get in touch", "Nous contacter")}
    </a>
  );
}
