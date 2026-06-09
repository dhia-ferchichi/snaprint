// Reserved for private.snaprint.tn dashboard — needs real data source.
// Pulled out of the public landing-page hero on 2026-06-09 because the
// numbers and job IDs were mock data and the "Live" indicator was not
// truthful. Keep this for when an actual production-queue feed exists.
//
// Underscore-prefixed folder so the TanStack route generator ignores it.
// Not imported anywhere. Safe to delete if/when the dashboard is built
// fresh elsewhere.

import { motion } from "motion/react";

const fadeIn = {
  initial: { opacity: 0, y: 8 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
};

type T = (en: string, fr: string) => string;

export function ProductionQueueWidget({ t }: { t: T }) {
  return (
    <motion.aside
      {...fadeIn}
      transition={{ ...fadeIn.transition, delay: 0.2 }}
      className="col-span-12 md:col-span-4"
    >
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
          <span className="mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
            {t("Live · Production queue", "En direct · File de production")}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-snap-mint" />
            <span className="mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">
              {t("on time", "à l'heure")}
            </span>
          </span>
        </div>
        <ul className="divide-y divide-border">
          {[
            ["JOB-2418", "GIZ · Roll-ups ×6", t("Routing", "Routage"), "amber"],
            ["JOB-2417", "Deloitte · Notebooks ×120", "QA", "amber"],
            ["JOB-2416", "PNUD · Tote bags DTF", t("Production", "Production"), "amber"],
            ["JOB-2415", "Linedata · Stationery kit", t("Delivered", "Livré"), "mint"],
          ].map(([id, client, stage, color]) => (
            <li key={id} className="grid grid-cols-12 items-center gap-2 px-4 py-3">
              <span className="mono col-span-3 text-[11px] text-ink-faint">{id}</span>
              <span className="col-span-6 text-[13px] text-foreground">{client}</span>
              <span className="col-span-3 flex items-center justify-end gap-2">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${color === "mint" ? "bg-snap-mint" : "bg-snap-amber"}`}
                />
                <span className="mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">{stage}</span>
              </span>
            </li>
          ))}
        </ul>
        <div className="grid grid-cols-3 border-t border-border">
          {[
            ["112", t("Jobs / mo", "Jobs / mois")],
            ["12", t("Partners", "Partenaires")],
            ["98.4%", t("On-time", "À l'heure")],
          ].map(([v, l]) => (
            <div key={l} className="border-r border-border px-4 py-3 last:border-r-0">
              <div className="text-[18px] font-semibold tracking-tight text-foreground">{v}</div>
              <div className="mono mt-0.5 text-[10px] uppercase tracking-[0.16em] text-ink-faint">{l}</div>
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
