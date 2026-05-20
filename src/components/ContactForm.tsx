import { useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { useI18n } from "@/lib/i18n";

type ProjectType = "large-format" | "wearables" | "print" | "signage" | "gift-kits" | "other";
type Status = "idle" | "submitting" | "success" | "error";

const BRIEF_MAX = 1500;

export function ContactForm() {
  const { t } = useI18n();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    type: "" as ProjectType | "",
    brief: "",
    website: "", // honeypot
  });

  const update = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (form.name.trim().length < 2) e.name = t("Please enter your name.", "Indiquez votre nom.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = t("Enter a valid email.", "Email invalide.");
    if (form.brief.trim().length < 10)
      e.brief = t("A few more words about the project.", "Quelques mots de plus sur le projet.");
    if (form.brief.length > BRIEF_MAX)
      e.brief = t("Brief is too long.", "Brief trop long.");
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (form.website) return; // honeypot tripped — silently drop
    if (!validate()) return;
    setStatus("submitting");
    // UI-only for now: simulate latency, no network call.
    await new Promise((r) => setTimeout(r, 700));
    setStatus("success");
  };

  if (status === "success") {
    return (
      <div className="mt-10 rounded-xl border border-warm-white/15 bg-warm-white/[0.04] p-8 text-left">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-snap-mint/40 bg-snap-mint/10 text-snap-mint">
          <Check className="h-4 w-4" strokeWidth={2.25} aria-hidden />
        </span>
        <h3 className="display mt-5 text-[26px] leading-tight text-warm-white sm:text-[32px]">
          {t("Brief received.", "Brief reçu.")}
        </h3>
        <p className="mt-3 text-[14px] leading-relaxed text-warm-white/65">
          {t(
            "We'll come back to you within a few hours. In the meantime: ",
            "Nous revenons vers vous sous quelques heures. Entre-temps : ",
          )}
          <a
            href="mailto:hello@snaprint.tn"
            className="text-warm-white underline decoration-warm-white/30 underline-offset-4 transition-colors hover:decoration-warm-white"
          >
            hello@snaprint.tn
          </a>
          {" · "}
          <a
            href="https://wa.me/21653233439"
            target="_blank"
            rel="noreferrer"
            className="text-warm-white underline decoration-warm-white/30 underline-offset-4 transition-colors hover:decoration-warm-white"
          >
            WhatsApp
          </a>
        </p>
      </div>
    );
  }

  const isSubmitting = status === "submitting";
  const briefCount = form.brief.length;

  const fieldBase =
    "mono w-full rounded-lg border border-warm-white/15 bg-warm-white/[0.03] px-4 py-3 text-[13px] text-warm-white placeholder:text-warm-white/35 transition-colors focus:border-warm-white/40 focus:outline-none focus:ring-0 disabled:opacity-50";
  const labelBase = "mono mb-2 block text-[10px] uppercase tracking-[0.18em] text-warm-white/55";
  const errorLine = "mono mt-1.5 text-[10px] uppercase tracking-[0.14em] text-snap-amber";

  const wa = `https://wa.me/21653233439?text=${encodeURIComponent(
    form.brief ? `Bonjour Snaprint — ${form.brief}` : "Bonjour Snaprint",
  )}`;

  return (
    <form onSubmit={onSubmit} className="mt-10 text-left" noValidate>
      {/* honeypot */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={form.website}
        onChange={(e) => update("website", e.target.value)}
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={labelBase}>
            {t("Name", "Nom")} *
          </label>
          <input
            id="cf-name"
            type="text"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            disabled={isSubmitting}
            maxLength={80}
            className={fieldBase}
            placeholder={t("Your name", "Votre nom")}
          />
          {errors.name && <p className={errorLine}>{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="cf-email" className={labelBase}>
            {t("Email", "Email")} *
          </label>
          <input
            id="cf-email"
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            disabled={isSubmitting}
            maxLength={120}
            className={fieldBase}
            placeholder="you@company.tn"
          />
          {errors.email && <p className={errorLine}>{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="cf-company" className={labelBase}>
            {t("Company / Org", "Société / Org")}
          </label>
          <input
            id="cf-company"
            type="text"
            value={form.company}
            onChange={(e) => update("company", e.target.value)}
            disabled={isSubmitting}
            maxLength={120}
            className={fieldBase}
            placeholder={t("Optional", "Optionnel")}
          />
        </div>
        <div>
          <label htmlFor="cf-type" className={labelBase}>
            {t("Project type", "Type de projet")}
          </label>
          <select
            id="cf-type"
            value={form.type}
            onChange={(e) => update("type", e.target.value as ProjectType)}
            disabled={isSubmitting}
            className={fieldBase + " appearance-none"}
          >
            <option value="" className="bg-navy">
              {t("Select…", "Sélectionner…")}
            </option>
            <option value="large-format" className="bg-navy">{t("Large format", "Grand format")}</option>
            <option value="wearables" className="bg-navy">{t("Wearables", "Textile")}</option>
            <option value="print" className="bg-navy">{t("Print", "Imprimé")}</option>
            <option value="signage" className="bg-navy">{t("Signage", "Signalétique")}</option>
            <option value="gift-kits" className="bg-navy">{t("Gift kits", "Coffrets cadeaux")}</option>
            <option value="other" className="bg-navy">{t("Other", "Autre")}</option>
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="cf-brief" className={labelBase}>
          {t("Brief", "Brief")} *
        </label>
        <textarea
          id="cf-brief"
          rows={5}
          value={form.brief}
          onChange={(e) => update("brief", e.target.value.slice(0, BRIEF_MAX))}
          disabled={isSubmitting}
          className={fieldBase + " resize-y"}
          placeholder={t(
            "Quantities, deadline, delivery point, files ready or not…",
            "Quantités, deadline, lieu de livraison, fichiers prêts ou non…",
          )}
        />
        <div className="mt-1.5 flex items-center justify-between">
          {errors.brief ? <p className={errorLine}>{errors.brief}</p> : <span />}
          <span className="mono text-[10px] uppercase tracking-[0.14em] text-warm-white/35">
            {briefCount}/{BRIEF_MAX}
          </span>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
        <button
          type="submit"
          disabled={isSubmitting}
          className="mono inline-flex h-11 items-center gap-3 rounded-lg bg-warm-white px-5 text-[12px] uppercase tracking-[0.14em] text-navy transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {isSubmitting ? t("Sending…", "Envoi…") : t("Send brief", "Envoyer le brief")}
          <span aria-hidden>→</span>
        </button>
        <a
          href={wa}
          target="_blank"
          rel="noreferrer"
          className="mono inline-flex h-11 items-center gap-3 rounded-lg border border-warm-white/25 bg-transparent px-5 text-[12px] uppercase tracking-[0.14em] text-warm-white transition-colors hover:bg-warm-white/10"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-snap-mint" />
          WhatsApp
        </a>
      </div>

      {status === "error" && (
        <div
          role="alert"
          className="mt-4 rounded-lg border border-snap-amber/40 bg-snap-amber/[0.06] px-4 py-3 text-[13px] leading-relaxed text-warm-white/85"
        >
          {t("Something went wrong. Email us directly at ", "Une erreur est survenue. Écrivez-nous à ")}
          <a
            href="mailto:hello@snaprint.tn"
            className="text-warm-white underline decoration-warm-white/30 underline-offset-4 transition-colors hover:decoration-warm-white"
          >
            hello@snaprint.tn
          </a>
          {t(" or reach out on ", " ou contactez-nous sur ")}
          <a
            href="https://wa.me/21653233439"
            target="_blank"
            rel="noreferrer"
            className="text-warm-white underline decoration-warm-white/30 underline-offset-4 transition-colors hover:decoration-warm-white"
          >
            WhatsApp
          </a>
          .
        </div>
      )}



      <p className="mono mt-4 text-center text-[10px] uppercase tracking-[0.18em] text-warm-white/55 sm:text-left">
        {t(
          "Response within hours · Tunis & banlieue · hello@snaprint.tn",
          "Réponse en quelques heures · Tunis & banlieue · hello@snaprint.tn",
        )}
      </p>

      <p className="mono mt-6 text-[10px] uppercase tracking-[0.18em] text-warm-white/40">
        {t(
          "Response within hours · Tunis & banlieue · hello@snaprint.tn",
          "Réponse en quelques heures · Tunis & banlieue · hello@snaprint.tn",
        )}
      </p>
    </form>
  );
}
