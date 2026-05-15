import { motion } from "motion/react";

/**
 * "BAT validé" stamp — appears with a slight rotation + scale, ink-on-paper feel.
 * Used on Workflow stage 04 to dramatize the proof-validation moment.
 */
export function BatStamp({ label = "BAT validé" }: { label?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.6, rotate: -18 }}
      whileInView={{ opacity: 1, scale: 1, rotate: -8 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      aria-hidden
      className="mono pointer-events-none select-none rounded-md border-[2px] border-snap-pink px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-snap-pink"
      style={{ boxShadow: "0 0 0 1px var(--color-snap-pink) inset" }}
    >
      {label}
    </motion.div>
  );
}
