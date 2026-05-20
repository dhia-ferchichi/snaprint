import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { SnaprintMark } from "@/components/SnaprintLogo";

export const Route = createFileRoute("/$")({
  head: () => ({
    meta: [
      { title: "404 — Snaprint" },
      { name: "robots", content: "noindex,nofollow" },
      { name: "description", content: "Route not found." },
    ],
  }),
  component: NotFoundPage,
});

function NotFoundPage() {
  return (
    <main className="relative flex min-h-screen flex-col bg-navy text-warm-white">
      <header className="px-6 pt-6 md:px-10 md:pt-8">
        <Link to="/" aria-label="Snaprint home" className="inline-flex items-center gap-2">
          <SnaprintMark className="h-6 w-6 text-warm-white" />
        </Link>
      </header>

      <section className="flex flex-1 items-center justify-center px-6 py-16 md:py-24">
        <div className="mx-auto flex w-full max-w-xl flex-col items-center text-center">
          <motion.div
            animate={{ opacity: [1, 0.6, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="text-[120px] font-semibold leading-none tracking-[-0.03em] md:text-[180px]"
          >
            404
          </motion.div>

          <h1 className="mt-8 text-[28px] font-semibold leading-tight tracking-[-0.02em] sm:text-[36px] md:text-[44px]">
            Route not found.
          </h1>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-warm-white/65 md:text-[16px]">
            The page you requested doesn't exist or has moved.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/"
              className="mono inline-flex h-11 items-center gap-3 rounded-lg bg-warm-white px-5 text-[12px] uppercase tracking-[0.14em] text-navy transition-opacity hover:opacity-90"
            >
              Return home
              <span aria-hidden>→</span>
            </Link>
            <a
              href="/#contact"
              className="mono inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-warm-white/70 transition-colors hover:text-warm-white"
            >
              Send us a brief <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </section>

      <footer className="px-6 pb-8 md:px-10 md:pb-10">
        <p className="mono text-center text-[10px] uppercase tracking-[0.2em] text-warm-white/35">
          REF · SNP-404 · snaprint.tn
        </p>
      </footer>
    </main>
  );
}
