import { useI18n } from "@/lib/i18n";

/**
 * Routing diagram — visualises orchestration logic:
 * One brief routed across specialised partner types, consolidated on delivery.
 * Pure JSX + Tailwind, no SVG library, no motion.
 */
export function RoutingDiagram() {
  const { t } = useI18n();
  const nodes = [
    { tag: "OFFSET", label: t("Paper & stationery", "Papier & papeterie") },
    { tag: "DTF", label: t("Wearables", "Textile") },
    { tag: "UV", label: t("Corporate gifts", "Cadeaux d'entreprise") },
    { tag: "SIGNAGE", label: t("Large format", "Grand format") },
  ];

  return (
    <figure className="overflow-hidden rounded-xl border border-border bg-card">
      {/* header */}
      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <span className="mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
          {t("Routing logic", "Logique de routage")}
        </span>
        <span className="mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">
          {t("one brief · many lanes · one delivery", "un brief · plusieurs voies · une livraison")}
        </span>
      </div>

      <div className="px-5 py-10 md:px-10 md:py-14">
        {/* brief */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-3 rounded-md border border-border bg-background px-5 py-3">
            <span className="h-1.5 w-1.5 rounded-full bg-snap-amber" />
            <span className="mono text-[11px] uppercase tracking-[0.18em] text-foreground">
              {t("Brief", "Brief")}
            </span>
          </div>
        </div>

        {/* vertical rule from brief */}
        <div className="mx-auto h-8 w-px bg-border" aria-hidden />

        {/* split caption */}
        <div className="mb-3 flex justify-center">
          <span className="mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
            {t("routed by format · volume · deadline", "routé selon support · volume · délai")}
          </span>
        </div>

        {/* horizontal bus */}
        <div className="relative mx-auto hidden h-px w-full bg-border md:block" aria-hidden />

        {/* partner nodes */}
        <div className="mt-0 grid grid-cols-2 gap-3 md:mt-0 md:grid-cols-4 md:gap-4">
          {nodes.map((n) => (
            <div key={n.tag} className="flex flex-col items-center">
              {/* drop line (desktop only) */}
              <span className="hidden h-6 w-px bg-border md:block" aria-hidden />
              <div className="flex w-full flex-col items-center rounded-md border border-border bg-background px-3 py-4 text-center">
                <span className="mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                  {n.tag}
                </span>
                <span className="mt-2 text-[13px] font-medium text-foreground">{n.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* converge */}
        <div className="mx-auto mt-0 h-8 w-px bg-border" aria-hidden />

        {/* delivery */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-3 rounded-md border border-border bg-background px-5 py-3">
            <span className="h-1.5 w-1.5 rounded-full bg-snap-mint" />
            <span className="mono text-[11px] uppercase tracking-[0.18em] text-foreground">
              {t("Consolidated delivery", "Livraison consolidée")}
            </span>
          </div>
        </div>
      </div>
    </figure>
  );
}
