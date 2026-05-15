import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { SnaprintMark, SnaprintLockup } from "@/components/SnaprintLogo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { PlaceholderLogo } from "@/components/PlaceholderLogo";
import { LogoMarquee } from "@/components/LogoMarquee";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Snaprint — Operational branding & print orchestration · Tunis" },
      {
        name: "description",
        content:
          "Snaprint is a Tunis-based execution layer for physical branding. Two founders, one vehicle, twelve specialised partners. Quotes on Iberis, delivery across Tunis & banlieue.",
      },
      { property: "og:title", content: "Snaprint — Operational branding · Tunis" },
      {
        property: "og:description",
        content:
          "Complex physical branding, executed effortlessly. Vendor orchestration, QA and rapid delivery across Tunisia.",
      },
      { property: "og:type", content: "website" },
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

/* ---------- shared ---------- */

function Eyebrow({ id, label, tone = "default" }: { id: string; label: string; tone?: "default" | "invert" }) {
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

/* ---------- nav ---------- */

function Nav() {
  const items = [
    ["Workflow", "#workflow"],
    ["Speed", "#speed"],
    ["Capabilities", "#capabilities"],
    ["Why Snaprint", "#why"],
  ];
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <Container className="flex h-14 items-center justify-between">
        <Link to="/" className="flex items-center" aria-label="Snaprint home">
          <SnaprintLockup />
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {items.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-[13px] text-ink-soft transition-colors hover:text-foreground"
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="#contact"
            className="mono inline-flex h-9 items-center gap-2 rounded-lg bg-primary px-4 text-[11px] uppercase tracking-[0.14em] text-primary-foreground transition-opacity hover:opacity-90"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-snap-mint" />
            Get a quote
          </a>
        </div>
      </Container>
    </header>
  );
}

/* ---------- hero ---------- */

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-rule) 1px, transparent 1px)",
          backgroundSize: "calc(100%/12) 100%",
        }}
      />
      <Container className="relative pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-8">
            <Eyebrow id="00 / Snaprint" label="Operational branding · Tunis" />
            <motion.h1
              {...fade}
              className="mt-8 text-[44px] font-semibold leading-[1.02] tracking-[-0.025em] text-foreground md:text-[88px]"
            >
              Complex physical branding.
              <br />
              <span className="display text-ink-soft">Executed effortlessly.</span>
            </motion.h1>
            <motion.p
              {...fade}
              transition={{ ...fade.transition, delay: 0.08 }}
              className="mt-8 max-w-xl text-[15px] leading-relaxed text-ink-soft md:text-[17px]"
            >
              Snaprint is the execution layer between your brand and its physical output. Two founders,
              one vehicle, twelve specialised partners — coordinated from Tunis for institutional and
              corporate clients across Tunisia.
            </motion.p>
            <motion.div
              {...fade}
              transition={{ ...fade.transition, delay: 0.16 }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <a
                href="#contact"
                className="mono inline-flex h-11 items-center gap-3 rounded-lg bg-primary px-5 text-[12px] uppercase tracking-[0.14em] text-primary-foreground transition-opacity hover:opacity-90"
              >
                Get a quote
                <span aria-hidden>→</span>
              </a>
              <a
                href="#workflow"
                className="mono inline-flex h-11 items-center gap-3 rounded-lg border border-border bg-card px-5 text-[12px] uppercase tracking-[0.14em] text-foreground transition-colors hover:bg-secondary"
              >
                See the workflow
              </a>
            </motion.div>
          </div>

          {/* operational status card — 2 accents max (amber: in flight, mint: delivered) */}
          <motion.aside
            {...fade}
            transition={{ ...fade.transition, delay: 0.2 }}
            className="col-span-12 md:col-span-4"
          >
            <div className="overflow-hidden rounded-xl border border-border bg-card">
              <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
                <span className="mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                  Live · Production queue
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-snap-mint" />
                  <span className="mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">on time</span>
                </span>
              </div>
              <ul className="divide-y divide-border">
                {[
                  ["JOB-2418", "GIZ · Roll-ups ×6", "Routing", "amber"],
                  ["JOB-2417", "Deloitte · Notebooks ×120", "QA", "amber"],
                  ["JOB-2416", "PNUD · Tote bags DTF", "Production", "amber"],
                  ["JOB-2415", "Linedata · Stationery kit", "Delivered", "mint"],
                ].map(([id, client, stage, color]) => (
                  <li key={id} className="grid grid-cols-12 items-center gap-2 px-4 py-3">
                    <span className="mono col-span-3 text-[11px] text-ink-faint">{id}</span>
                    <span className="col-span-6 text-[13px] text-foreground">{client}</span>
                    <span className="col-span-3 flex items-center justify-end gap-2">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          color === "mint" ? "bg-snap-mint" : "bg-snap-amber"
                        }`}
                      />
                      <span className="mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">
                        {stage}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
              <div className="grid grid-cols-3 border-t border-border">
                {[
                  ["112", "Jobs / mo"],
                  ["12", "Partners"],
                  ["98.4%", "On-time"],
                ].map(([v, l]) => (
                  <div key={l} className="border-r border-border px-4 py-3 last:border-r-0">
                    <div className="text-[18px] font-semibold tracking-tight text-foreground">{v}</div>
                    <div className="mono mt-0.5 text-[10px] uppercase tracking-[0.16em] text-ink-faint">
                      {l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p className="mono mt-3 text-[10px] uppercase tracking-[0.18em] text-ink-faint">
              Tunis · GMT+1 · Iberis · WeTransfer · WhatsApp
            </p>
          </motion.aside>
        </div>
      </Container>
    </section>
  );
}

/* ---------- trust : clients + production network ---------- */

function Trust() {
  const clients = ["GIZ", "PNUD", "Expertise France", "Yunus Social Business", "Deloitte", "Knauf", "Linedata"];
  const network = [
    "Yasmine Press",
    "Vogue Distribution",
    "SBCD",
    "DIGIPRINT",
    "Imagin Print",
    "Horizon Print",
    "Skyflags",
    "Ste Le Tshirt",
    "Sotuplex",
    "Afkar Enseignes",
  ];
  return (
    <section className="border-b border-border bg-background">
      <Container className="py-16">
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-12 md:col-span-3">
            <Eyebrow id="01" label="Trusted execution" />
            <p className="mt-4 text-[14px] leading-relaxed text-ink-soft">
              Recurring production for international institutions and corporates operating in Tunisia —
              fulfilled through a vetted network of local specialists.
            </p>
          </div>

          <div className="col-span-12 md:col-span-9 space-y-8">
            <div>
              <div className="mono mb-3 text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                Clients · Recurring orders
              </div>
              <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-7">
                {clients.map((c) => (
                  <li
                    key={c}
                    className="flex h-16 items-center justify-center bg-background px-3 text-center text-[13px] font-medium tracking-tight text-ink-soft transition-colors hover:text-foreground"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="mono mb-3 text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                Production network · 12 specialised partners
              </div>
              <ul className="flex flex-wrap gap-x-1.5 gap-y-1.5">
                {network.map((n) => (
                  <li
                    key={n}
                    className="mono rounded-md border border-border bg-card px-2.5 py-1.5 text-[11px] uppercase tracking-[0.12em] text-ink-soft"
                  >
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------- workflow : navy band, brand-stable across themes ---------- */

function Workflow() {
  const stages = [
    { n: "01", t: "Client", d: "Brief, quantities, deadline, spec sheet.", meta: "email · whatsapp" },
    { n: "02", t: "File prep", d: "Print-ready vector adaptation, bleed, color profiling.", meta: "free with order" },
    { n: "03", t: "Routing", d: "Vendor matched against medium, volume and lead time.", meta: "iberis · wetransfer", pivot: true },
    { n: "04", t: "QA", d: "Pre-press proof, batch inspection, color & finish check.", meta: "before pickup" },
    { n: "05", t: "Delivery", d: "Consolidated dispatch by Oussama.", meta: "Peugeot Partner K9 · Tunis & banlieue" },
  ];
  return (
    <section id="workflow" className="relative border-y border-border bg-navy text-warm-white">
      <Container className="py-24 md:py-32">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-5">
            <Eyebrow id="02" label="Operational workflow" tone="invert" />
            <h2 className="mt-8 text-[36px] font-semibold leading-[1.05] tracking-[-0.02em] md:text-[56px]">
              Every digital interaction maps to a physical execution.
            </h2>
          </div>
          <p className="col-span-12 mt-2 max-w-md self-end text-[15px] leading-relaxed text-warm-white/70 md:col-span-5 md:col-start-8">
            A single track from brief to delivery. No factory in the middle — just a coordinated network
            and a rigorous handoff between each stage.
          </p>
        </div>

        <ol className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-warm-white/10 bg-warm-white/10 md:grid-cols-5">
          {stages.map((s, i) => (
            <motion.li
              key={s.n}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="relative flex flex-col bg-navy p-6"
            >
              <div className="flex items-center justify-between">
                <span className="mono text-[10px] uppercase tracking-[0.18em] text-warm-white/50">
                  Stage {s.n}
                </span>
                {/* pink-blend signature: exactly one per layout, marks the routing pivot */}
                {s.pivot && (
                  <span
                    aria-hidden
                    title="Transformation moment"
                    className="h-1.5 w-1.5 rounded-full bg-snap-pink shadow-[0_0_12px_var(--color-snap-pink)]"
                  />
                )}
              </div>
              <span className="mt-8 text-[20px] font-semibold tracking-tight">{s.t}</span>
              <span className="mt-2 text-[13px] leading-relaxed text-warm-white/65">{s.d}</span>
              <span className="mt-6 h-px w-10 bg-snap-amber" />
              <span className="mono mt-3 text-[10px] uppercase tracking-[0.14em] text-warm-white/45">
                {s.meta}
              </span>
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
  const tiers = [
    {
      h: "24H",
      t: "Paper & small-format",
      items: ["Business cards", "Flyers", "Letterheads", "Stickers"],
      accent: "bg-snap-amber",
    },
    {
      h: "48H",
      t: "Wearables & UV print",
      items: ["DTF t-shirts", "Tote bags", "Polos", "UV print >50 pcs"],
      accent: "bg-snap-mint",
    },
    {
      h: "72H",
      t: "Large format & signage",
      items: ["Press walls", "Roll-ups", "LED lightboxes", "Event branding"],
      accent: "bg-snap-coral",
    },
  ];
  return (
    <section id="speed" className="border-b border-border">
      <Container className="py-24 md:py-32">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow id="03" label="Speed commitments" />
            <h2 className="mt-6 text-[36px] font-semibold leading-[1.05] tracking-[-0.02em] text-foreground md:text-[56px]">
              Lead times, written down.
            </h2>
          </div>
          <p className="mono max-w-sm text-[11px] uppercase leading-relaxed tracking-[0.12em] text-ink-soft">
            Measured from validated BAT &amp; confirmed PO.
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
                  Service tier
                </span>
                <span className={`h-2 w-2 rounded-full ${tier.accent}`} />
              </div>
              <div className="px-6 pt-10 pb-8">
                <div className="text-[88px] font-semibold leading-none tracking-[-0.04em] text-foreground">
                  {tier.h}
                </div>
                <div className="mt-2 text-[16px] font-medium tracking-tight text-foreground">
                  {tier.t}
                </div>
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
  const caps = [
    { t: "Large format", d: "Press walls, roll-ups, banners, LED lightboxes, vehicle wraps.", tag: "LFP" },
    { t: "Wearables", d: "DTF, screen print, embroidery on t-shirts, polos, tote bags, caps.", tag: "DTF / SP" },
    { t: "Corporate gifts", d: "Notebooks, mugs, gourdes isothermes, tech kits — sourced and personalised.", tag: "Promo" },
    { t: "Print systems", d: "Stationery suites, letterheads, business cards, badges, lanyards.", tag: "Office" },
    { t: "Event branding", d: "End-to-end signage kits, on-site setup, post-event collection.", tag: "Live" },
    { t: "File preparation", d: "Vector adaptation, color separation, mock-ups, BAT proofs.", tag: "Pre-press" },
  ];
  return (
    <section id="capabilities" className="border-b border-border bg-secondary/40">
      <Container className="py-24 md:py-32">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-4">
            <Eyebrow id="04" label="Capabilities" />
            <h2 className="mt-6 text-[36px] font-semibold leading-[1.05] tracking-[-0.02em] text-foreground md:text-[48px]">
              Six surfaces. One operator.
            </h2>
            <p className="mt-6 max-w-sm text-[14px] leading-relaxed text-ink-soft">
              Across every category we handle file prep, vendor matching, QA and delivery — so you brief
              once, not six times.
            </p>
          </div>

          <ul className="col-span-12 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border md:col-span-8 md:grid-cols-2">
            {caps.map((c) => (
              <li
                key={c.t}
                className="group relative flex flex-col bg-background p-6 transition-colors hover:bg-card"
              >
                <div className="flex items-center justify-between">
                  <span className="mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                    {c.tag}
                  </span>
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

/* ---------- why : 4-number strip + four points ---------- */

function Why() {
  const stats = [
    ["02", "founders"],
    ["01", "vehicle"],
    ["00", "employees"],
    ["~12", "partners"],
  ];
  const points = [
    { n: "i.", t: "No factory overhead", d: "We don't run presses. We run a network — leaner, faster, more flexible than any single shop." },
    { n: "ii.", t: "Orchestration model", d: "Each job is routed to the partner best suited for the medium, volume and deadline." },
    { n: "iii.", t: "Network-driven execution", d: "Twelve specialised partners, vetted for quality and timeliness. Capacity scales with demand." },
    { n: "iv.", t: "Quality control layer", d: "Pre-press BAT proofing and on-batch QA sit between the partner and the client — every time." },
  ];
  return (
    <section id="why" className="relative overflow-hidden border-b border-border">
      <Container className="py-24 md:py-32">
        <div className="max-w-3xl">
          <Eyebrow id="05" label="Why Snaprint" />
          <h2 className="mt-6 text-[36px] font-semibold leading-[1.05] tracking-[-0.02em] text-foreground md:text-[64px]">
            An execution layer,
            <br />
            <span className="display text-ink-soft">not a print shop.</span>
          </h2>
        </div>

        {/* operational truth strip */}
        <ul className="mt-14 grid grid-cols-2 overflow-hidden rounded-xl border border-border bg-card md:grid-cols-4">
          {stats.map(([v, l]) => (
            <li
              key={l}
              className="flex flex-col gap-1 border-b border-r border-border px-6 py-7 last:border-r-0 md:border-b-0 [&:nth-child(2)]:border-r-0 md:[&:nth-child(2)]:border-r [&:nth-child(3)]:border-b-0 md:[&:nth-child(3)]:border-r"
            >
              <span className="mono text-[40px] font-bold leading-none tracking-tight text-foreground md:text-[56px]">
                {v}
              </span>
              <span className="mono mt-2 text-[11px] uppercase tracking-[0.16em] text-ink-faint">
                {l}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2">
          {points.map((p) => (
            <motion.div {...fade} key={p.n} className="flex gap-6 border-t border-border pt-6">
              <span className="mono shrink-0 text-[12px] uppercase tracking-[0.18em] text-ink-faint">
                {p.n}
              </span>
              <div>
                <h3 className="text-[22px] font-semibold tracking-tight text-foreground">{p.t}</h3>
                <p className="mt-3 max-w-md text-[14px] leading-relaxed text-ink-soft">{p.d}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ---------- CTA — Tunisia-grounded handshake ---------- */

function CTA() {
  return (
    <section id="contact" className="border-y border-border bg-navy text-warm-white">
      <Container className="py-24 md:py-32">
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-12 md:col-span-7">
            <Eyebrow id="06" label="Brief a job" tone="invert" />
            <h2 className="mt-8 text-[40px] font-semibold leading-[1.05] tracking-[-0.02em] md:text-[68px]">
              Send the brief.
              <br />
              <span className="display text-warm-white/65">We quote on Iberis.</span>
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-warm-white/70">
              Quote within hours. Production starts on validated BAT. Devis · Facture · Bon de livraison
              issued by email. Payment by bank transfer to our RIB Attijari.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="mailto:hello@snaprint.tn?subject=Devis%20Snaprint"
                className="mono inline-flex h-11 items-center gap-3 rounded-lg bg-warm-white px-5 text-[12px] uppercase tracking-[0.14em] text-navy transition-opacity hover:opacity-90"
              >
                Email a brief
                <span aria-hidden>→</span>
              </a>
              <a
                href="https://wa.me/21653233439"
                target="_blank"
                rel="noreferrer"
                className="mono inline-flex h-11 items-center gap-3 rounded-lg border border-warm-white/25 bg-transparent px-5 text-[12px] uppercase tracking-[0.14em] text-warm-white transition-colors hover:bg-warm-white/10"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-snap-mint" />
                WhatsApp · +216 53 233 439
              </a>
            </div>

            <p className="mono mt-6 text-[10px] uppercase tracking-[0.18em] text-warm-white/45">
              Response within hours · WhatsApp prioritised
            </p>
          </div>

          {/* operational handshake card */}
          <div className="col-span-12 md:col-span-5">
            <div className="overflow-hidden rounded-xl border border-warm-white/15 bg-warm-white/5">
              <div className="flex items-center justify-between border-b border-warm-white/10 px-5 py-3">
                <span className="mono text-[10px] uppercase tracking-[0.18em] text-warm-white/55">
                  Snaprint SARL · Tunis
                </span>
                <span className="mono text-[10px] uppercase tracking-[0.18em] text-warm-white/45">
                  RNE · TN
                </span>
              </div>

              {/* contact lanes */}
              <div className="divide-y divide-warm-white/10">
                {[
                  {
                    name: "Dhia",
                    role: "Client & files",
                    detail: "Briefs, quotes, BAT, invoicing.",
                    accent: "bg-snap-amber",
                  },
                  {
                    name: "Oussama",
                    role: "Sourcing & delivery",
                    detail: "Vendors, materials, dispatch.",
                    accent: "bg-snap-mint",
                  },
                ].map((p) => (
                  <div key={p.name} className="flex items-start justify-between gap-4 px-5 py-5">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`h-1.5 w-1.5 rounded-full ${p.accent}`} />
                        <span className="text-[15px] font-semibold tracking-tight text-warm-white">
                          {p.name}
                        </span>
                      </div>
                      <div className="mono mt-1 text-[10px] uppercase tracking-[0.16em] text-warm-white/50">
                        {p.role}
                      </div>
                      <div className="mt-2 text-[13px] text-warm-white/75">{p.detail}</div>
                    </div>
                    <span className="mono shrink-0 text-[10px] uppercase tracking-[0.16em] text-warm-white/40">
                      whatsapp · email
                    </span>
                  </div>
                ))}
              </div>

              {/* operational footer */}
              <dl className="grid grid-cols-2 border-t border-warm-white/10">
                {[
                  ["Email", "hello@snaprint.tn"],
                  ["WhatsApp", "+216 53 233 439"],
                  ["Domain", "snaprint.tn"],
                  ["Coverage", "Tunis & banlieue"],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="border-b border-r border-warm-white/10 px-5 py-3 last:border-r-0 [&:nth-child(2)]:border-r-0 md:[&:nth-child(2)]:border-r [&:nth-last-child(-n+2)]:border-b-0"
                  >
                    <dt className="mono text-[9px] uppercase tracking-[0.18em] text-warm-white/45">
                      {k}
                    </dt>
                    <dd className="mt-1 text-[12px] text-warm-white/85">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------- footer ---------- */

function Footer() {
  return (
    <footer className="bg-background">
      <Container className="flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3 text-foreground">
          <SnaprintMark className="h-6 w-6" />
          <span className="mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
            Snaprint SARL · Operational branding · Tunis
          </span>
        </div>
        <div className="mono flex items-center gap-6 text-[11px] uppercase tracking-[0.18em] text-ink-faint">
          <span>© {new Date().getFullYear()}</span>
          <a href="#workflow" className="hover:text-foreground">Workflow</a>
          <a href="#contact" className="hover:text-foreground">Contact</a>
        </div>
      </Container>
    </footer>
  );
}

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Trust />
      <Workflow />
      <Speed />
      <Capabilities />
      <Why />
      <CTA />
      <Footer />
    </main>
  );
}
