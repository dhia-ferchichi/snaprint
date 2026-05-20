import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";
import { SnaprintMark } from "@/components/SnaprintLogo";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/studio")({
  head: () => ({
    meta: [
      { title: "Studio — Snaprint · The two co-founders behind the network" },
      {
        name: "description",
        content:
          "Behind Snaprint: two co-founders, one Peugeot Partner K9, and a vetted network of twelve production partners across Tunis. The story, in two paragraphs.",
      },
      { property: "og:title", content: "Studio — Snaprint" },
      {
        property: "og:description",
        content:
          "The two co-founders behind Snaprint and the operational philosophy of the network.",
      },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "https://snaprint.lovable.app/studio" },
      { property: "og:locale", content: "en_US" },
      { property: "og:locale:alternate", content: "fr_FR" },
      { name: "twitter:title", content: "Studio — Snaprint" },
      {
        name: "twitter:description",
        content:
          "The two co-founders behind Snaprint and the operational philosophy of the network.",
      },
    ],
    links: [{ rel: "canonical", href: "https://snaprint.lovable.app/studio" }],
  }),
  component: StudioPage,
});

function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1080px] px-6 md:px-10 ${className}`}>{children}</div>;
}

function Eyebrow({ id, label }: { id: string; label: string }) {
  return (
    <div className="mono flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-ink-soft">
      <span className="text-ink-faint">{id}</span>
      <span className="h-px w-8 bg-border" />
      <span>{label}</span>
    </div>
  );
}

const fadeIn = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
};

function StudioPage() {
  const { t } = useI18n();
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteNav />

      {/* hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.3]"
          style={{
            backgroundImage: "linear-gradient(to right, var(--color-rule) 1px, transparent 1px)",
            backgroundSize: "calc(100%/8) 100%",
          }}
        />
        <Container className="relative pt-20 pb-16 md:pt-28 md:pb-24">
          <Eyebrow id="00 / Studio" label={t("Two co-founders · One vehicle", "Deux co-fondateurs · Un véhicule")} />
          <motion.h1
            {...fadeIn}
            className="mt-8 text-[40px] font-semibold leading-[1.04] tracking-[-0.025em] text-foreground sm:text-[56px] md:text-[80px]"
          >
            {t("A handshake,", "Une poignée de main,")}
            <br />
            <span className="display text-ink-soft">{t("and a network.", "et un réseau.")}</span>
          </motion.h1>
          <motion.p
            {...fadeIn}
            transition={{ ...fadeIn.transition, delay: 0.1 }}
            className="mt-8 max-w-2xl text-[16px] leading-relaxed text-ink-soft md:text-[18px]"
          >
            {t(
              "Snaprint started in 2024 with a simple observation: institutional clients in Tunis were being asked to coordinate five vendors for a single event. We took that coordination off their plate.",
              "Snaprint est né en 2024 d'un constat simple : les clients institutionnels de Tunis devaient coordonner cinq fournisseurs pour un seul évènement. Nous avons pris cette coordination en charge.",
            )}
          </motion.p>
          <motion.p
            {...fadeIn}
            transition={{ ...fadeIn.transition, delay: 0.18 }}
            className="mt-6 max-w-2xl text-[16px] leading-relaxed text-ink-soft md:text-[18px]"
          >
            {t(
              "We chose not to own presses. Owning machinery means defending its utilisation rate; coordinating specialists means picking the right one for each job. The first model serves the shop. The second serves the client — and pays partners fairly for the work they actually do best.",
              "Nous avons choisi de ne pas posséder de presses. Posséder une machine, c'est défendre son taux d'utilisation ; coordonner des spécialistes, c'est choisir le bon pour chaque commande. Le premier modèle sert l'atelier. Le second sert le client — et rémunère justement les partenaires pour ce qu'ils font vraiment de mieux.",
            )}
          </motion.p>
        </Container>
      </section>

      {/* founders */}
      <section className="border-b border-border">
        <Container className="py-20 md:py-28">
          <Eyebrow id="01" label={t("The two-person company", "L'entreprise à deux")} />
          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-ink-soft">
            {t(
              "Briefs and quotes are shared. The rest splits naturally.",
              "Les briefs et les devis sont partagés. Le reste se répartit naturellement.",
            )}
          </p>

          {/* founders + K9 photo placeholder */}
          <div className="mt-10 overflow-hidden rounded-xl border border-border bg-card">
            <div className="flex aspect-[16/9] items-center justify-center bg-secondary/60">
              <span className="mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
                {t("Photo · Dhia, Oussama & the K9 — coming soon", "Photo · Dhia, Oussama & le K9 — à venir")}
              </span>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
            <motion.article {...fadeIn}>
              <div className="mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                {t("Co-founder", "Co-fondateur")}
              </div>
              <h2 className="mt-3 text-[36px] font-semibold tracking-tight text-foreground md:text-[44px]">
                Dhia Ferchichi
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-ink-soft">
                {t(
                  "File preparation, production briefs, invoicing, and the long-tail client relationship. First email, last invoice, thank-you note.",
                  "Préparation fichier, briefs de production, facturation et relation client sur la durée. Premier email, dernière facture, mot de remerciement.",
                )}
              </p>
              <a
                href="https://www.linkedin.com/in/dhiaferchichi/"
                target="_blank"
                rel="noreferrer"
                className="mono mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-ink-soft transition-colors hover:text-foreground"
              >
                <span aria-hidden>→</span> linkedin.com/in/dhiaferchichi
              </a>
            </motion.article>

            <motion.article {...fadeIn} transition={{ ...fadeIn.transition, delay: 0.08 }}>
              <div className="mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                {t("Co-founder", "Co-fondateur")}
              </div>
              <h2 className="mt-3 text-[36px] font-semibold tracking-tight text-foreground md:text-[44px]">
                Oussama Mhimdi
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-ink-soft">
                {t(
                  "Production floor: partner relationships, price negotiation, payment scheduling, on-batch QA and last-mile delivery in the K9. Main touchpoint for several recurring clients.",
                  "Production : relations partenaires, négociation des prix, échéancier de paiement, QA par lot et livraison dernier kilomètre dans le K9. Interlocuteur principal pour plusieurs clients récurrents.",
                )}
              </p>
              <a
                href="https://www.linkedin.com/in/oussamamhimdi/"
                target="_blank"
                rel="noreferrer"
                className="mono mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-ink-soft transition-colors hover:text-foreground"
              >
                <span aria-hidden>→</span> linkedin.com/in/oussamamhimdi
              </a>
            </motion.article>
          </div>
        </Container>
      </section>

      {/* the K9 */}
      <section className="border-b border-border bg-navy text-warm-white">
        <Container className="py-20 md:py-28">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-5">
              <div className="mono flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-warm-white/60">
                <span className="text-warm-white/45">02</span>
                <span className="h-px w-8 bg-warm-white/20" />
                <span>{t("The vehicle", "Le véhicule")}</span>
              </div>
              <h2 className="mt-6 text-[32px] font-semibold leading-[1.05] tracking-[-0.02em] sm:text-[40px] md:text-[52px]">
                Peugeot Partner K9.
                <br />
                <span className="display text-warm-white/65">{t("White, dependable, ours.", "Blanc, fiable, le nôtre.")}</span>
              </h2>
            </div>
            <div className="md:col-span-7">
              <div className="overflow-hidden rounded-xl border border-warm-white/10 bg-warm-white/5 p-8 md:p-10">
                <p className="text-[15px] leading-relaxed text-warm-white/75 md:text-[17px]">
                  {t(
                    "One vehicle. One driver. Every order routed through it. The K9 is small enough to navigate Bab Bhar, big enough to swallow six roll-ups and 500 tote bags in a single trip — and it means every delivery is on Snaprint's schedule, not a third-party courier's.",
                    "Un véhicule. Un chauffeur. Chaque commande passe par lui. Le K9 est assez petit pour traverser Bab Bhar, assez grand pour avaler six roll-ups et 500 tote bags en un seul trajet — et chaque livraison est à l'heure de Snaprint, pas d'un coursier tiers.",
                  )}
                </p>
                <div className="mt-8 grid grid-cols-3 gap-4 border-t border-warm-white/10 pt-6">
                  {[
                    ["1.6L", t("HDi diesel", "HDi diesel")],
                    ["3.3m³", t("cargo volume", "volume cargo")],
                    [t("Tunis", "Tunis"), t("& banlieue", "& banlieue")],
                  ].map(([v, l], i) => (
                    <div key={i}>
                      <div className="text-[20px] font-semibold tracking-tight md:text-[24px]">{v}</div>
                      <div className="mono mt-1 text-[10px] uppercase tracking-[0.16em] text-warm-white/45">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* philosophy */}
      <section className="border-b border-border">
        <Container className="py-24 md:py-40">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-10 h-px w-16 bg-border" aria-hidden />
            <Eyebrow id="03" label={t("Philosophy", "Philosophie")} />
            <motion.p
              {...fadeIn}
              className="display mt-10 text-[26px] leading-[1.25] text-foreground md:text-[40px]"
            >
              {t(
                "We don't run presses. We run a network. That's the whole proposition: instead of one shop trying to do six things, twelve specialised partners each doing the one thing they do best — coordinated by us, accountable to you.",
                "Nous n'exploitons pas de presses. Nous exploitons un réseau. C'est toute la proposition : au lieu d'un atelier qui essaie de faire six choses, douze partenaires spécialisés qui font chacun la chose qu'ils maîtrisent — coordonnés par nous, redevables envers vous.",
              )}
            </motion.p>
            <motion.p
              {...fadeIn}
              transition={{ ...fadeIn.transition, delay: 0.1 }}
              className="mt-10 text-[14px] leading-relaxed text-ink-faint md:text-[15px]"
            >
              {t(
                "The network is the product. We measure it weekly: capacity, on-time rate, defect rate, partner health. If a partner slips, the work moves. The client never sees the friction.",
                "Le réseau est le produit. Nous le mesurons chaque semaine : capacité, taux de ponctualité, taux de défauts, santé partenaire. Si un partenaire flanche, le travail se déplace. Le client ne voit jamais la friction.",
              )}
            </motion.p>
          </div>
        </Container>
      </section>

      {/* mark band */}
      <section aria-hidden className="bg-navy">
        <Container className="flex items-center justify-center py-20 md:py-28">
          <SnaprintMark className="h-10 w-10 text-warm-white/70" />
        </Container>
      </section>

      {/* CTA */}
      <section className="border-t border-warm-white/10 bg-navy text-warm-white">
        <Container className="py-20 md:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-[32px] font-semibold leading-[1.05] tracking-[-0.02em] sm:text-[40px] md:text-[52px]">
              {t("Want to put us to work?", "Envie de nous mettre au travail ?")}
            </h2>
            <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-warm-white/70">
              {t(
                "Send the brief. We'll quote within hours and route it through the right partner.",
                "Envoyez le brief. Nous devisons sous quelques heures et routons vers le bon partenaire.",
              )}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="/#contact"
                className="mono inline-flex h-11 items-center gap-3 rounded-lg bg-warm-white px-5 text-[12px] uppercase tracking-[0.14em] text-navy transition-opacity hover:opacity-90"
              >
                {t("Get in touch", "Nous contacter")}
                <span aria-hidden>→</span>
              </a>
              <a
                href="https://wa.me/21653233439?text=Bonjour%20Snaprint"
                target="_blank"
                rel="noreferrer"
                className="mono inline-flex h-11 items-center gap-3 rounded-lg border border-warm-white/25 bg-transparent px-5 text-[12px] uppercase tracking-[0.14em] text-warm-white transition-colors hover:bg-warm-white/10"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-snap-mint" />
                WhatsApp
              </a>
            </div>
          </div>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}
