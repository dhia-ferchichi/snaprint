import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SnaprintMark } from "@/components/SnaprintLogo";
import { PlaceholderLogo } from "@/components/PlaceholderLogo";
import { LogoMarquee } from "@/components/LogoMarquee";
import { RoutingDiagram } from "@/components/RoutingDiagram";
import { BatStamp } from "@/components/BatStamp";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";
import { ContactForm } from "@/components/ContactForm";
import { useI18n } from "@/lib/i18n";

const SITE_URL = "https://snaprint.lovable.app";

const FAQ_LD = [
  {
    q: "Do you issue a facture fiscale?",
    a: "Yes. Snaprint SARL issues conforme facture fiscale, devis and bon de livraison for every order. Documents are sent by email after delivery; originals on request.",
  },
  {
    q: "Is there a minimum order?",
    a: "No fixed minimum. We handle one-off urgent jobs and recurring institutional contracts. Pricing reflects volume but small orders are welcome.",
  },
  {
    q: "How do payments work?",
    a: "Standard terms: virement bancaire to our RIB Attijari, on receipt of facture. New clients may be asked for 50% on confirmation. Cash and chèque accepted on small orders.",
  },
  {
    q: "How many BAT revisions are included?",
    a: "Two free revisions per item. Beyond that, additional revisions are billed at cost. Production is paused until BAT is validated in writing.",
  },
  {
    q: "What happens if a print is rejected?",
    a: "Our QA catches most issues before delivery. If a defect slips through, we reprint at our cost. Reported within 48h of delivery.",
  },
  {
    q: "Do you deliver outside Tunis?",
    a: "Tunis & banlieue: same-day or next-day by our Peugeot Partner K9. Other governorates: Aramex / Jax with tracking, usually 24–48h.",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Snaprint — Operational branding & print orchestration · Tunis" },
      {
        name: "description",
        content:
          "Snaprint is a Tunis-based execution layer for physical branding. Two co-founders, ~12 specialised partners, one delivery vehicle — coordinated for institutional clients across Tunisia.",
      },
      { property: "og:title", content: "Snaprint — Operational branding · Tunis" },
      {
        property: "og:description",
        content:
          "Complex physical branding, executed effortlessly. Vendor orchestration, QA and rapid delivery across Tunisia.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:locale", content: "en_US" },
      { property: "og:locale:alternate", content: "fr_FR" },
      { name: "twitter:title", content: "Snaprint — Operational branding · Tunis" },
      {
        name: "twitter:description",
        content:
          "Complex physical branding, executed effortlessly. Vendor orchestration, QA and rapid delivery across Tunisia.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Snaprint",
          url: SITE_URL,
          description:
            "B2B printing and branding orchestration for NGOs, corporates and institutions across Tunisia.",
          address: { "@type": "PostalAddress", addressLocality: "Tunis", addressCountry: "TN" },
          areaServed: "TN",
          priceRange: "$$",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ_LD.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: Index,
});

const fade = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
};

// For above-the-fold content: animate on mount, not on scroll.
// whileInView with a negative root margin doesn't reliably fire for
// elements that are already in the viewport at first paint.
const fadeIn = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
};

/* ---------- shared ---------- */

function Eyebrow({ id, label, tone = "default" }: { id: React.ReactNode; label: string; tone?: "default" | "invert" }) {
  const isInvert = tone === "invert";
  return (
    <div
      className={`mono flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] ${
        isInvert ? "text-warm-white/60" : "text-ink-soft"
      }`}
    >
      <span className={isInvert ? "text-warm-white/45" : "text-ink-faint"}>{id}</span>
      <span className={`h-px w-8 ${isInvert ? "bg-warm-white/20" : "bg-border"}`} />
      <span>{label}</span>
    </div>
  );
}

function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1280px] px-6 md:px-10 ${className}`}>{children}</div>;
}

/* ---------- hero ---------- */

function Hero() {
  const { t } = useI18n();
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: "linear-gradient(to right, var(--color-rule) 1px, transparent 1px)",
          backgroundSize: "calc(100%/12) 100%",
        }}
      />
      <Container className="relative pt-16 pb-20 md:pt-28 md:pb-32">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-8">
            <Eyebrow
              id={<><span className="sm:hidden">00</span><span className="hidden sm:inline">00 / Snaprint</span></>}
              label={t("Operational branding · Tunis", "Branding opérationnel · Tunis")}
            />
            <motion.h1
              {...fadeIn}
              className="mt-8 text-[40px] font-semibold leading-[1.02] tracking-[-0.025em] text-foreground sm:text-[56px] md:text-[88px]"
            >
              {t("Complex physical branding.", "Branding physique complexe.")}
              <br />
              <span className="display text-ink-soft">
                {t("Executed effortlessly.", "Exécuté sans effort.")}
              </span>
            </motion.h1>
            <motion.p
              {...fadeIn}
              transition={{ ...fadeIn.transition, delay: 0.08 }}
              className="mt-8 max-w-xl text-[15px] leading-relaxed text-ink-soft md:text-[17px]"
            >
              {t(
                "Snaprint is the execution layer between your brand and its physical output. From a 100-card urgent run to a full event rollout, we coordinate the production chain — so you deal with one operator instead of five vendors.",
                "Snaprint est la couche d'exécution entre votre marque et sa production physique. D'un tirage urgent de 100 cartes au déploiement complet d'un évènement, nous coordonnons la chaîne de production — pour que vous ne traitiez qu'avec un seul opérateur, pas cinq fournisseurs.",
              )}
            </motion.p>
            <motion.div
              {...fadeIn}
              transition={{ ...fadeIn.transition, delay: 0.16 }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <a
                href="#contact"
                className="mono inline-flex h-11 items-center gap-3 rounded-lg bg-primary px-5 text-[12px] uppercase tracking-[0.14em] text-primary-foreground transition-opacity hover:opacity-90"
              >
                {t("Get in touch", "Nous contacter")}
                <span aria-hidden>→</span>
              </a>
              <a
                href="#workflow"
                className="mono inline-flex h-11 items-center gap-3 rounded-lg border border-border bg-card px-5 text-[12px] uppercase tracking-[0.14em] text-foreground transition-colors hover:bg-secondary"
              >
                {t("See the workflow", "Voir le workflow")}
              </a>
            </motion.div>
          </div>

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
        </div>
      </Container>
    </section>
  );
}

/* ---------- trust ---------- */

function Trust() {
  const { t } = useI18n();
  const clients = [
    "Fondation Tunisie Pour Le Développement",
    "Institut des Statistiques de l'Union Africaine",
    "Open Tunisia",
    "Yunus Social Business",
    "Expertise France",
    "Westerwelle Foundation",
    "Deloitte",
    "GIZ",
    "Enactus Tunisie",
    "GOMYCODE",
    "Tunisian Startups",
    "Knauf",
    "Forum de Carthage",
    "Columbia Global Centers",
    "Our Digital Future",
  ];
  const network = [
    "Yasmine Press", "Vogue Distribution", "SBCD", "DIGIPRINT", "Imagin Print",
    "Horizon Print", "Skyflags", "Ste Le Tshirt", "Sotuplex", "Afkar Enseignes",
    "Ben Ghorbel", "Omnia Textile",
  ];
  return (
    <section className="border-b border-border bg-background">
      <Container className="py-20">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <Eyebrow id="01" label={t("Trusted execution", "Exécution de confiance")} />
          <p className="mono max-w-md text-[11px] uppercase tracking-[0.14em] text-ink-faint">
            {t(
              "Recurring orders for institutions & corporates · fulfilled through a vetted network.",
              "Commandes récurrentes pour institutions & corporates · réalisées via un réseau qualifié.",
            )}
          </p>
        </div>

        <div className="mt-12">
          <div className="mono mb-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] uppercase tracking-[0.18em] text-ink-faint">
            <span>{t("Clients", "Clients")}</span>
            <span className="text-ink-faint/60">·</span>
            <span className="text-ink-soft">
              {t(
                "Institutions · Ecosystem enablers · Corporates",
                "Institutions · Accélérateurs & fonds · Entreprises",
              )}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            {clients.map((c) => (
              <PlaceholderLogo key={c} label={c} />
            ))}
          </div>
        </div>

        <div className="mt-16">
          <div className="mono mb-5 text-[10px] uppercase tracking-[0.18em] text-ink-faint">
            {t("Orchestration", "Orchestration")}
          </div>
          <RoutingDiagram />
          <p className="mono mt-3 text-[10px] uppercase tracking-[0.16em] text-ink-faint">
            {t(
              "One brief, routed across specialised partners, consolidated on delivery.",
              "Un brief, réparti entre partenaires spécialisés, consolidé à la livraison.",
            )}
          </p>
        </div>

        <div className="mt-14">
          <div className="mono mb-5 text-[10px] uppercase tracking-[0.18em] text-ink-faint">
            {t("Production network · ~12 specialised partners", "Réseau de production · ~12 partenaires spécialisés")}
          </div>
          <LogoMarquee items={network} />
        </div>
      </Container>
    </section>
  );
}

function BreathingBand({ children }: { children: React.ReactNode }) {
  return (
    <section className="bg-background">
      <Container className="py-24 md:py-40">
        <motion.div
          {...fade}
          className="display mx-auto max-w-3xl text-center text-[26px] leading-[1.2] text-ink-soft md:text-[44px]"
        >
          {children}
        </motion.div>
      </Container>
    </section>
  );
}

/* ---------- workflow ---------- */

function Workflow() {
  const { t } = useI18n();
  const stages = [
    { n: "01", t: t("Client", "Client"), d: t("Brief, quantities, deadline, spec sheet.", "Brief, quantités, deadline, fiche technique."), meta: t("email · whatsapp", "email · whatsapp") },
    { n: "02", t: t("File prep", "Préparation fichier"), d: t("Print-ready vector adaptation, bleed, color profiling.", "Adaptation vectorielle prêt-à-imprimer, fonds perdus, profil couleur."), meta: t("free with order", "offert à la commande") },
    { n: "03", t: t("Routing", "Routage"), d: t("Vendor matched against medium, volume and lead time.", "Partenaire choisi selon support, volume et délai."), meta: "wetransfer · whatsapp" },
    { n: "04", t: t("Production", "Production"), d: t("Digital file becomes physical object — printed, cut, finished.", "Le fichier numérique devient objet physique — imprimé, découpé, fini."), meta: t("vetted partner network", "réseau partenaires qualifié"), pivot: true },
    { n: "05", t: t("Delivery", "Livraison"), d: t("QA-checked dispatch by Oussama.", "Expédition contrôlée par Oussama."), meta: t("Peugeot Partner K9 · Tunis & banlieue", "Peugeot Partner K9 · Tunis & banlieue") },
  ];
  return (
    <section id="workflow" className="relative border-y border-border bg-navy text-warm-white">
      <Container className="py-20 md:py-32">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-5">
            <Eyebrow id="02" label={t("Operational workflow", "Workflow opérationnel")} tone="invert" />
            <h2 className="mt-8 text-[32px] font-semibold leading-[1.05] tracking-[-0.02em] sm:text-[40px] md:text-[56px]">
              {t("Every digital interaction maps to a physical execution.", "Chaque interaction digitale correspond à une exécution physique.")}
            </h2>
          </div>
          <p className="col-span-12 mt-2 max-w-md self-end text-[15px] leading-relaxed text-warm-white/70 md:col-span-5 md:col-start-8">
            {t(
              "A single track from brief to delivery. You validate the design — we take it from there: file prep, partner routing, QA and shipping all run on our side.",
              "Un seul fil du brief à la livraison. Vous validez le design — nous prenons le relais : préparation fichier, routage partenaire, QA et livraison, tout est géré chez nous.",
            )}
          </p>
        </div>

        <ol className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-warm-white/10 bg-warm-white/10 sm:grid-cols-2 md:grid-cols-5">
          {stages.map((s, i) => (
            <motion.li
              key={s.n}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: s.pivot ? 0.6 : 0.2 }}
              transition={{ duration: 0.4, delay: s.pivot ? 0.15 : i * 0.06 }}
              className="relative flex flex-col bg-navy p-6"
            >
              <div className="flex items-center justify-between">
                <span className="mono text-[10px] uppercase tracking-[0.18em] text-warm-white/50">
                  {t("Stage", "Étape")} {s.n}
                </span>
                {s.pivot && (
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 rounded-full bg-snap-pink shadow-[0_0_12px_var(--color-snap-pink)]"
                  />
                )}
              </div>
              <span className="mt-8 text-[20px] font-semibold tracking-tight">{s.t}</span>
              <span className="mt-2 text-[13px] leading-relaxed text-warm-white/65">{s.d}</span>
              <span className="mt-6 h-px w-10 bg-snap-amber" />
              <span className="mono mt-3 text-[10px] uppercase tracking-[0.14em] text-warm-white/45">{s.meta}</span>

              {/* BAT validé stamp on the production pivot */}
              {s.pivot && (
                <div className="absolute right-4 top-4 origin-top-right">
                  <BatStamp label={t("BAT validé", "BAT validé")} />
                </div>
              )}

              {i < stages.length - 1 && (
                <span
                  aria-hidden
                  className="mono pointer-events-none absolute -right-2 top-1/2 hidden -translate-y-1/2 bg-navy px-1 text-[14px] text-warm-white/40 md:inline"
                >
                  →
                </span>
              )}
            </motion.li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

/* ---------- speed ---------- */

function Speed() {
  const { t } = useI18n();
  const tiers = [
    { h: "24H", t: t("Paper & small-format", "Papier & petit format"), items: [t("Business cards","Cartes de visite"), t("Flyers","Flyers"), t("Letterheads","Têtes de lettre"), t("Stickers","Stickers")], accent: "bg-snap-amber" },
    { h: "48H", t: t("Apparel & customised gifts (medium runs)", "Textile & cadeaux personnalisés (séries moyennes)"), items: [t("DTF t-shirts","T-shirts DTF"), t("Tote bags & polos","Tote bags & polos"), t("Mugs · notebooks · UV gifts","Mugs · carnets · cadeaux UV"), t("50–200 pcs","50–200 pcs")], accent: "bg-snap-mint" },
    { h: "72H", t: t("Rollout, signage & high-volume runs (500+)", "Déploiement, signalétique & séries 500+"), items: [t("Press walls & roll-ups","Press walls & roll-ups"), t("LED lightboxes","Caissons LED"), t("Vehicle wraps","Covering véhicule"), t("Event branding & large print runs","Branding évènementiel & gros tirages")], accent: "bg-snap-coral" },
  ];
  return (
    <section id="speed" className="border-b border-border">
      <Container className="py-20 md:py-32">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow id="03" label={t("Speed commitments", "Engagements de délai")} />
            <h2 className="mt-6 text-[32px] font-semibold leading-[1.05] tracking-[-0.02em] text-foreground sm:text-[40px] md:text-[56px]">
              {t("Lead times, written down.", "Des délais, écrits noir sur blanc.")}
            </h2>
          </div>
          <p className="mono max-w-sm text-[11px] uppercase leading-relaxed tracking-[0.12em] text-ink-soft">
            {t("Measured from validated BAT & confirmed PO.", "Mesurés à partir du BAT validé & du bon de commande.")}
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {tiers.map((tier) => (
            <motion.article
              {...fade}
              key={tier.h}
              className="relative flex flex-col overflow-hidden rounded-xl border border-border bg-card"
            >
              <div className="flex items-center justify-between border-b border-border px-6 py-3">
                <span className="mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                  {t("Service tier", "Niveau de service")}
                </span>
                <span className={`h-2 w-2 rounded-full ${tier.accent}`} />
              </div>
              <div className="px-6 pt-10 pb-8">
                <div className="text-[52px] font-semibold leading-none tracking-[-0.04em] text-foreground sm:text-[72px] md:text-[88px]">
                  {tier.h}
                </div>
                <div className="mt-2 text-[16px] font-medium tracking-tight text-foreground">{tier.t}</div>
              </div>
              <ul className="mono mt-auto divide-y divide-border border-t border-border text-[11px] uppercase tracking-[0.12em] text-ink-soft">
                {tier.items.map((it) => (
                  <li key={it} className="flex items-center justify-between px-6 py-3">
                    <span>{it}</span>
                    <span className="text-ink-faint">✓</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ---------- capabilities ---------- */

function Capabilities() {
  const { t } = useI18n();
  const caps = [
    { t: t("Print & stationery", "Impression & papeterie"), d: t("Business cards, flyers, brochures, letterheads, notebooks, badges, lanyards.", "Cartes de visite, flyers, brochures, têtes de lettre, carnets, badges, tours de cou."), tag: "Print" },
    { t: t("Stickers & small signage", "Stickers & petite signalétique"), d: t("Vinyl stickers, plaques, small adhesives — quick turnaround.", "Stickers vinyle, plaques, petits adhésifs — délais courts."), tag: "Adhesive" },
    { t: t("Apparel & merch", "Textile & merch"), d: t("T-shirts, polos, tote bags, caps — team kits, launch packs, event apparel (50–200 pcs).", "T-shirts, polos, tote bags, casquettes — kits équipe, packs de lancement, textile évènementiel (50–200 pcs)."), tag: "Apparel" },
    { t: t("Customised corporate gifts", "Cadeaux corporate personnalisés"), d: t("Mugs, gourdes, notebooks, tech kits, keychains. Catalogue sourcing + UV, engraving, sublimation.", "Mugs, gourdes, carnets, kits tech, porte-clés. Sourcing catalogue + UV, gravure, sublimation."), tag: "Gifts" },
    { t: t("Event & large format", "Évènementiel & grand format"), d: t("Roll-ups, press walls, banners, event flags, on-site setup.", "Roll-ups, press walls, banderoles, drapeaux, installation sur site."), tag: "Live" },
    { t: t("Rollout & signage", "Déploiement & signalétique"), d: t("LED lightboxes, vehicle wraps, large-format runs 500+, press walls at scale.", "Caissons LED, covering véhicule, séries grand format 500+, press walls à l'échelle."), tag: "Scale" },
  ];
  return (
    <section id="capabilities" className="border-b border-border bg-secondary/40">
      <Container className="py-20 md:py-32">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-4">
            <Eyebrow id="04" label={t("Capabilities", "Savoir-faire")} />
            <h2 className="mt-6 text-[32px] font-semibold leading-[1.05] tracking-[-0.02em] text-foreground sm:text-[40px] md:text-[48px]">
              {t("Six surfaces. One operator.", "Six surfaces. Un seul opérateur.")}
            </h2>
            <p className="mt-6 max-w-sm text-[14px] leading-relaxed text-ink-soft">
              {t(
                "File prep, BAT proofing and QA are included — across every category.",
                "Préparation fichier, validation BAT et QA — inclus sur chaque catégorie.",
              )}
            </p>
          </div>

          <ul className="col-span-12 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border md:col-span-8 md:grid-cols-2">
            {caps.map((c) => (
              <li key={c.t} className="group relative flex flex-col bg-background p-6 transition-colors hover:bg-card">
                <div className="flex items-center justify-between">
                  <span className="mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">{c.tag}</span>
                  <span className="h-px w-6 bg-border transition-all group-hover:w-10 group-hover:bg-foreground" />
                </div>
                <h3 className="mt-10 text-[20px] font-semibold tracking-tight text-foreground">{c.t}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">{c.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

/* ---------- recent work gallery ---------- */

function Work() {
  const { t } = useI18n();
  // Free Unsplash photos — print, branding, events. Tagged loosely.
  const items = [
    { src: "https://images.unsplash.com/photo-1561070791-2526d30994b8?w=900&q=70&auto=format&fit=crop", tag: "Roll-ups", caption: t("Institutional campaign · 6 units", "Campagne institutionnelle · 6 unités") },
    { src: "https://images.unsplash.com/photo-1572375992501-4b0892d50c69?w=900&q=70&auto=format&fit=crop", tag: "DTF", caption: t("Tote bags · 500 pcs", "Tote bags · 500 pcs") },
    { src: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=900&q=70&auto=format&fit=crop", tag: "Stationery", caption: t("Notebook & business card suite", "Suite carnet & carte de visite") },
    { src: "https://images.unsplash.com/photo-1493612276216-ee3925520721?w=900&q=70&auto=format&fit=crop", tag: "Gifts", caption: t("Corporate gift kits ×120", "Kits cadeaux corporate ×120") },
    { src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=900&q=70&auto=format&fit=crop", tag: "Event", caption: t("Conference signage · Tunis", "Signalétique conférence · Tunis") },
    { src: "https://images.unsplash.com/photo-1542744095-291d1f67b221?w=900&q=70&auto=format&fit=crop", tag: "Print", caption: t("Annual report · 250 pcs", "Rapport annuel · 250 pcs") },
    { src: "https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=900&q=70&auto=format&fit=crop", tag: "Wearables", caption: t("Polo embroidery · launch crew", "Broderie polo · équipe de lancement") },
    { src: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=900&q=70&auto=format&fit=crop", tag: "Signage", caption: t("LED lightbox · retail", "Caisson LED · retail") },
    { src: "https://images.unsplash.com/photo-1551817958-d9d86fb29431?w=900&q=70&auto=format&fit=crop", tag: "Print", caption: t("Brochure run · 1 200 pcs", "Brochure · 1 200 pcs") },
  ];
  return (
    <section id="work" className="border-b border-border">
      <Container className="py-20 md:py-32">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow id="05" label={t("Recent work", "Réalisations récentes")} />
            <h2 className="mt-6 text-[32px] font-semibold leading-[1.05] tracking-[-0.02em] text-foreground sm:text-[40px] md:text-[56px]">
              {t("Executed, delivered, on time.", "Exécuté, livré, à l'heure.")}
            </h2>
          </div>
          <p className="mono max-w-sm text-[11px] uppercase leading-relaxed tracking-[0.12em] text-ink-soft">
            {t("Selected jobs · last 90 days · client names anonymised.", "Sélection · 90 derniers jours · noms de clients anonymisés.")}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {items.map((it, i) => (
            <motion.figure
              key={it.src}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.05 }}
              className="group relative overflow-hidden rounded-lg border border-border bg-card"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={it.src}
                  alt={it.caption}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <figcaption className="flex items-center justify-between gap-2 border-t border-border bg-background/80 px-3 py-2.5 backdrop-blur-sm">
                <span className="text-[12px] text-foreground line-clamp-1">{it.caption}</span>
                <span className="mono shrink-0 text-[9px] uppercase tracking-[0.18em] text-ink-faint">{it.tag}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ---------- why ---------- */

function Why() {
  const { t } = useI18n();
  const stats: [string, string][] = [
    ["02", t("co-founders", "co-fondateurs")],
    ["~12", t("production partners", "partenaires de production")],
    ["01", t("delivery vehicle", "véhicule de livraison")],
  ];
  const points = [
    { n: "i.", t: t("No factory overhead", "Aucune charge d'usine"), d: t("We don't run presses. We run a network — leaner, faster, more flexible than any single shop.", "Nous n'exploitons pas de presses. Nous exploitons un réseau — plus léger, plus rapide, plus flexible qu'un atelier unique.") },
    { n: "ii.", t: t("Orchestration model", "Modèle d'orchestration"), d: t("Each job is routed to the partner best suited for the medium, volume and deadline.", "Chaque commande est confiée au partenaire le mieux placé pour le support, le volume et le délai.") },
    { n: "iii.", t: t("Network-driven execution", "Exécution par le réseau"), d: t("Twelve specialised partners, vetted for quality and timeliness. Capacity scales with demand.", "Douze partenaires spécialisés, qualifiés pour la qualité et la ponctualité. La capacité s'adapte à la demande.") },
    { n: "iv.", t: t("Quality control layer", "Couche de contrôle qualité"), d: t("Pre-press BAT proofing and on-batch QA sit between the partner and the client — every time.", "Validation BAT pré-presse et QA par lot — entre le partenaire et le client, à chaque commande.") },
  ];
  return (
    <section id="why" className="relative overflow-hidden border-b border-border">
      <Container className="py-20 md:py-32">
        <div className="max-w-3xl">
          <Eyebrow id="06" label={t("Why Snaprint", "Pourquoi Snaprint")} />
          <h2 className="mt-6 text-[32px] font-semibold leading-[1.05] tracking-[-0.02em] text-foreground sm:text-[44px] md:text-[64px]">
            {t("An execution layer,", "Une couche d'exécution,")}
            <br />
            <span className="display text-ink-soft">{t("not a print shop.", "pas une imprimerie.")}</span>
          </h2>
        </div>

        <ul className="mt-14 grid grid-cols-1 overflow-hidden rounded-xl border border-border bg-card sm:grid-cols-3">
          {stats.map(([v, l]) => (
            <li
              key={l}
              className="flex flex-col gap-1 border-b border-border px-6 py-7 last:border-b-0 sm:border-b-0 sm:border-r sm:[&:last-child]:border-r-0"
            >
              <span className="mono text-[36px] font-bold leading-none tracking-tight text-foreground sm:text-[44px] md:text-[56px]">{v}</span>
              <span className="mono mt-2 text-[11px] uppercase tracking-[0.16em] text-ink-faint">{l}</span>
            </li>
          ))}
        </ul>

        <div className="mx-auto mt-20 max-w-2xl space-y-10">
          {points.map((p) => (
            <motion.div {...fade} key={p.n} className="flex gap-6 border-t border-border pt-6">
              <span className="mono shrink-0 text-[12px] uppercase tracking-[0.18em] text-ink-faint">{p.n}</span>
              <div>
                <h3 className="text-[20px] font-semibold tracking-tight text-foreground sm:text-[22px]">{p.t}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">{p.d}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ---------- FAQ ---------- */

function FAQ() {
  const { t } = useI18n();
  const items = [
    {
      q: t("Do you issue a facture fiscale?", "Émettez-vous une facture fiscale ?"),
      a: t(
        "Yes. Snaprint SARL issues conforme facture fiscale, devis and bon de livraison for every order. Documents are sent by email after delivery; originals on request.",
        "Oui. Snaprint SARL émet facture fiscale, devis et bon de livraison conformes pour chaque commande. Les documents sont envoyés par email après livraison ; originaux sur demande.",
      ),
    },
    {
      q: t("Is there a minimum order?", "Y a-t-il une commande minimum ?"),
      a: t(
        "No fixed minimum. We handle one-off urgent jobs (e.g. 50 business cards before tomorrow morning) and recurring institutional contracts. Pricing reflects volume but small orders are welcome.",
        "Pas de minimum imposé. Nous gérons aussi bien des urgences ponctuelles (ex. 50 cartes de visite avant demain matin) que des contrats institutionnels récurrents. Le prix reflète le volume, mais les petites commandes sont les bienvenues.",
      ),
    },
    {
      q: t("How do payments work?", "Comment se passent les paiements ?"),
      a: t(
        "Standard terms: virement bancaire to our RIB Attijari, or bank cheque, on receipt of facture. For first-time clients we may request 50% on order confirmation. Cash also accepted on small orders.",
        "Conditions standards : virement bancaire sur notre RIB Attijari, ou chèque bancaire, à réception de facture. Pour les nouveaux clients, nous pouvons demander 50% à la confirmation. Espèces également acceptées sur petites commandes.",
      ),
    },
    {
      q: t("How many BAT revisions are included?", "Combien de révisions de BAT sont incluses ?"),
      a: t(
        "Two free revisions per item. Beyond that, additional revisions are billed at cost. We pause production until the BAT is validated in writing — no surprises in the final output.",
        "Deux révisions de BAT offertes par article. Au-delà, les révisions supplémentaires sont facturées au coût. La production est mise en pause jusqu'à validation écrite du BAT — pas de mauvaise surprise finale.",
      ),
    },
    {
      q: t("What happens if a print is rejected?", "Que se passe-t-il en cas de rejet d'impression ?"),
      a: t(
        "Our QA layer catches most issues before delivery. If a defect slips through, we reprint at our cost — Snaprint absorbs the partner's mistake, the client never does. Reported within 48h of delivery.",
        "Notre couche QA détecte la plupart des défauts avant livraison. Si un défaut passe, nous réimprimons à nos frais — Snaprint absorbe l'erreur du partenaire, jamais le client. À signaler dans les 48 h suivant la livraison.",
      ),
    },
    {
      q: t("Do you deliver outside Tunis?", "Livrez-vous en dehors de Tunis ?"),
      a: t(
        "Tunis & banlieue: same-day or next-day by our Peugeot Partner K9. Other governorates: dispatched via Aramex / Jax with tracking — usually 24–48h. Event setups handled in person nationwide on request.",
        "Tunis & banlieue : livraison le jour même ou le lendemain par notre Peugeot Partner K9. Autres gouvernorats : envoi via Aramex / Jax avec suivi — généralement 24–48 h. Installations évènementielles assurées sur tout le territoire sur demande.",
      ),
    },
  ];
  return (
    <section id="faq" className="border-b border-border bg-secondary/30">
      <Container className="py-20 md:py-32">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-4">
            <Eyebrow id="07" label="FAQ" />
            <h2 className="mt-6 text-[32px] font-semibold leading-[1.05] tracking-[-0.02em] text-foreground sm:text-[40px] md:text-[48px]">
              {t("Procurement, answered.", "Procurement, en clair.")}
            </h2>
            <p className="mt-6 max-w-sm text-[14px] leading-relaxed text-ink-soft">
              {t(
                "The questions institutional buyers ask before sending the first PO.",
                "Les questions que posent les acheteurs institutionnels avant le premier bon de commande.",
              )}
            </p>
          </div>

          <div className="col-span-12 md:col-span-8">
            <Accordion type="single" collapsible className="overflow-hidden rounded-xl border border-border bg-background">
              {items.map((it, i) => (
                <AccordionItem key={i} value={`q-${i}`} className="border-border px-5 last:border-b-0">
                  <AccordionTrigger className="py-5 text-[15px] font-medium text-foreground hover:no-underline">
                    <span className="flex items-start gap-4">
                      <span className="mono mt-1 text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{it.q}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pl-12 pr-2 pb-5 text-[14px] leading-relaxed text-ink-soft">
                    {it.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------- pre-CTA breathing band ---------- */

function MarkBand() {
  return (
    <section aria-hidden className="bg-navy">
      <Container className="flex items-center justify-center py-24 md:py-32">
        <SnaprintMark className="h-10 w-10 text-warm-white/70" />
      </Container>
    </section>
  );
}

/* ---------- CTA ---------- */

function CTA() {
  const { t } = useI18n();
  return (
    <section id="contact" className="border-t border-warm-white/10 bg-navy text-warm-white">
      <Container className="py-20 md:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow id="08" label={t("Get in touch", "Nous contacter")} tone="invert" />
          <h2 className="mt-8 text-[32px] font-semibold leading-[1.05] tracking-[-0.02em] sm:text-[44px] md:text-[64px]">
            {t("Send the brief.", "Envoyez le brief.")}
            <br />
            <span className="display text-warm-white/65">{t("We quote within hours.", "Devis sous quelques heures.")}</span>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-warm-white/70">
            {t(
              "Request a quote or just get in touch. Production starts on validated BAT. Devis · Facture · BL by email. Payment by virement (RIB Attijari) or bank cheque.",
              "Demandez un devis ou contactez-nous simplement. Production lancée au BAT validé. Devis · Facture · BL par email. Paiement par virement (RIB Attijari) ou chèque bancaire.",
            )}
          </p>

          <ContactForm />
        </div>
      </Container>
    </section>
  );
}

function Index() {
  const { t } = useI18n();
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <Hero />
      <Trust />
      <BreathingBand>
        <p>{t("Coordination over fabrication.", "Coordination plutôt que fabrication.")}</p>
        <p className="mt-8 text-[18px] italic leading-snug text-ink-faint md:text-[24px]">
          {t(
            "Brands and agencies bring the vision. We make it land — files, partners, QA, delivery.",
            "Les marques et les agences apportent la vision. Nous la faisons aboutir — fichiers, partenaires, QA, livraison.",
          )}
        </p>
      </BreathingBand>
      <Workflow />
      <Speed />
      <Capabilities />
      <Work />
      <Why />
      <FAQ />
      <MarkBand />
      <CTA />
      <SiteFooter />
    </main>
  );
}
