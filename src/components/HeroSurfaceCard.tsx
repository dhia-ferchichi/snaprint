import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import useEmblaCarousel from "embla-carousel-react";

import { useI18n } from "@/lib/i18n";

/**
 * Placeholder "close-up print" tile.
 * Stand-in for real product photography. Uses brand accents + paper grain so
 * it reads as a printed surface, not a marketing illustration. Swap with real
 * photos by replacing the body of this component.
 */
function PrintTile({
  accent,
  label,
  index,
}: {
  accent: string;
  label: string;
  index: string;
}) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[var(--warm-white)]">
      {/* paper grain */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.18] mix-blend-multiply"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(3,34,65,0.35) 0, transparent 40%), radial-gradient(circle at 80% 70%, rgba(3,34,65,0.25) 0, transparent 35%)",
        }}
      />
      {/* color band (ink lay-down) */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-2/3"
        style={{ background: `linear-gradient(135deg, ${accent} 0%, ${accent} 55%, transparent 100%)` }}
      />
      {/* cut/registration marks */}
      <div aria-hidden className="absolute inset-3 border border-[var(--navy)]/15" />
      <div aria-hidden className="absolute left-3 top-3 h-3 w-3 border-l border-t border-[var(--navy)]/40" />
      <div aria-hidden className="absolute right-3 top-3 h-3 w-3 border-r border-t border-[var(--navy)]/40" />
      <div aria-hidden className="absolute left-3 bottom-3 h-3 w-3 border-l border-b border-[var(--navy)]/40" />
      <div aria-hidden className="absolute right-3 bottom-3 h-3 w-3 border-r border-b border-[var(--navy)]/40" />
      {/* typographic foreground — the "print" */}
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <div className="mono text-[10px] uppercase tracking-[0.22em] text-[var(--navy)]/60">
          {index}
        </div>
        <div className="mt-1 text-[22px] font-semibold leading-tight tracking-tight text-[var(--navy)]">
          {label}
        </div>
      </div>
    </div>
  );
}

type Surface = {
  id: string;
  label: string;
  caption: string;
  accent: string;
};

export function HeroSurfaceCard() {
  const { t, lang } = useI18n();

  const surfaces: Surface[] = [
    {
      id: "01",
      label: t("Business cards", "Cartes de visite"),
      caption: t("350gsm · matte lamination · spot UV", "350g · pelliculage mat · vernis sélectif"),
      accent: "var(--snap-blue)",
    },
    {
      id: "02",
      label: t("Notebooks", "Carnets"),
      caption: t("Hardcover · debossed mark · 96 pages", "Couverture rigide · marquage à sec · 96 pages"),
      accent: "var(--snap-amber)",
    },
    {
      id: "03",
      label: t("Tote bags", "Tote bags"),
      caption: t("Cotton 220g · DTF transfer · 3 colors", "Coton 220g · transfert DTF · 3 couleurs"),
      accent: "var(--snap-mint)",
    },
    {
      id: "04",
      label: t("Roll-ups", "Roll-ups"),
      caption: t("85×200 cm · aluminum base · carry case", "85×200 cm · base aluminium · housse"),
      accent: "var(--snap-coral)",
    },
    {
      id: "05",
      label: t("Corporate gifts", "Cadeaux d'entreprise"),
      caption: t("Mugs · keychains · bottles · custom kit", "Mugs · porte-clés · bouteilles · kit sur-mesure"),
      accent: "var(--snap-purple)",
    },
  ];

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Desktop autoplay
  useEffect(() => {
    if (paused || reduced) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % surfaces.length);
    }, 3500);
    return () => window.clearInterval(id);
  }, [paused, reduced, surfaces.length]);

  // Mobile carousel
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [mobileIndex, setMobileIndex] = useState(0);
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setMobileIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const current = surfaces[active];

  const commitments: [string, string][] = [
    [t("2 BAT", "2 BAT"), t("revisions", "inclus")],
    [t("Same-day", "Jour même"), t("Tunis & banlieue", "Tunis & banlieue")],
    [t("Facture fiscale", "Facture fiscale"), t("conforme", "conforme")],
  ];

  return (
    <motion.aside
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="col-span-12 md:col-span-4"
    >
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        {/* header rail */}
        <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
          <span className="mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
            {t("Recent surfaces", "Surfaces récentes")}
          </span>
          <span className="mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">
            {String((mobileIndex || active) + 1).padStart(2, "0")} / {String(surfaces.length).padStart(2, "0")}
          </span>
        </div>

        {/* desktop: auto-flipping frame */}
        <div
          className="relative hidden md:block"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--warm-white)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id + lang}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <PrintTile accent={current.accent} label={current.label} index={current.id} />
              </motion.div>
            </AnimatePresence>
          </div>
          {/* caption */}
          <div className="border-t border-border px-4 py-3">
            <AnimatePresence mode="wait">
              <motion.p
                key={current.id + "-cap-" + lang}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3 }}
                className="text-[12px] leading-snug text-ink-soft"
              >
                <span className="text-foreground">{current.label}</span>
                <span className="text-ink-faint"> — {current.caption}</span>
              </motion.p>
            </AnimatePresence>
          </div>
          {/* dots */}
          <div className="flex items-center justify-center gap-1.5 border-t border-border py-2.5">
            {surfaces.map((s, i) => (
              <button
                key={s.id}
                type="button"
                aria-label={`Show ${s.label}`}
                onClick={() => setActive(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === active ? "w-5 bg-foreground" : "w-1.5 bg-ink-faint/40 hover:bg-ink-faint"
                }`}
              />
            ))}
          </div>
        </div>

        {/* mobile: swipe carousel */}
        <div className="md:hidden">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {surfaces.map((s) => (
                <div key={s.id} className="min-w-0 shrink-0 grow-0 basis-full">
                  <div className="aspect-[4/5] w-full">
                    <PrintTile accent={s.accent} label={s.label} index={s.id} />
                  </div>
                  <div className="border-t border-border px-4 py-3">
                    <p className="text-[12px] leading-snug text-ink-soft">
                      <span className="text-foreground">{s.label}</span>
                      <span className="text-ink-faint"> — {s.caption}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center gap-1.5 border-t border-border py-2.5">
            {surfaces.map((s, i) => (
              <button
                key={s.id}
                type="button"
                aria-label={`Go to ${s.label}`}
                onClick={() => emblaApi?.scrollTo(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === mobileIndex ? "w-5 bg-foreground" : "w-1.5 bg-ink-faint/40"
                }`}
              />
            ))}
          </div>
        </div>

        {/* commitments strip */}
        <div className="grid grid-cols-3 border-t border-border">
          {commitments.map(([v, l]) => (
            <div key={v + l} className="border-r border-border px-3 py-3 last:border-r-0">
              <div className="text-[13px] font-semibold leading-tight tracking-tight text-foreground">
                {v}
              </div>
              <div className="mono mt-1 text-[9px] uppercase tracking-[0.16em] text-ink-faint">
                {l}
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="mono mt-3 text-[10px] uppercase tracking-[0.18em] text-ink-faint">
        Tunis · GMT+1 · WeTransfer · WhatsApp
      </p>
    </motion.aside>
  );
}
