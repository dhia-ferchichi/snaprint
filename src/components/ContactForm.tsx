import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useI18n } from "@/lib/i18n";
import { submitContactBrief } from "@/lib/contact.functions";

type ProjectType = "large-format" | "wearables" | "stationery" | "signage" | "gift-kits" | "other";
type Status = "idle" | "submitting" | "success" | "error";

const BRIEF_MAX = 1500;

export function ContactForm() {
  const { t } = useI18n();
  const submit = useServerFn(submitContactBrief);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
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
      e.brief = t("Brief needs at least 10 characters.", "Minimum 10 caractères.");
    if (form.brief.length > BRIEF_MAX)
      e.brief = t("Brief is too long.", "Brief trop long.");
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (form.website) return; // honeypot tripped — silently drop
    if (!validate()) return;
    setSubmitError(null);
    setStatus("submitting");
    try {
      await submit({
        data: {
          name: form.name,
          email: form.email,
          company: form.company,
          type: form.type,
          brief: form.brief,
          website: form.website,
        },
      });
      setStatus("success");
    } catch (err) {
      console.error("[contact-form] submit failed:", err);
      setSubmitError(
        t(
          "Something went wrong. Please try again or message us on WhatsApp.",
          "Une erreur est survenue. Réessayez ou contactez-nous sur WhatsApp.",
        ),
      );
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="mt-10 rounded-xl border border-warm-white/15 bg-warm-white/[0.04] p-8 text-left">
        <div className="mono flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-snap-mint">
          <span className="h-1.5 w-1.5 rounded-full bg-snap-mint" />
          {t("Brief received", "Brief reçu")}
        </div>
        <h3 className="display mt-4 text-[26px] leading-tight text-warm-white sm:text-[32px]">
          {t("Got it. We'll be in touch within hours.", "Bien reçu. Réponse sous quelques heures.")}
        </h3>
        <p className="mt-3 text-[14px] leading-relaxed text-warm-white/65">
          {t(
            "A copy of the brief lands in snaprint.tn@gmail.com. Expect a quote, a few clarifying questions, or both.",
            "Une copie du brief arrive à snaprint.tn@gmail.com. Devis, questions de cadrage, ou les deux.",
          )}
        </p>
        <button
          type="button"
          onClick={() => {
            setForm({ name: "", email: "", company: "", type: "", brief: "", website: "" });
            setErrors({});
            setStatus("idle");
          }}
          className="mono mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-warm-white/70 transition-colors hover:text-warm-white"
        >
          {t("Send another", "Envoyer un autre")} <span aria-hidden>→</span>
        </button>
      </div>
    );
  }

  const isSubmitting = status === "submitting";
  const briefCount = form.brief.length;

  const fieldBase =
    "mono w-full rounded-lg border border-warm-white/15 bg-warm-white/[0.03] px-4 py-3 text-[13px] text-warm-white placeholder:text-warm-white/35 transition-colors focus:border-warm-white/40 focus:outline-none focus:ring-0 disabled:opacity-50";
  const labelBase = "mb-2 block text-[12px] font-medium tracking-wide text-warm-white/80";
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

      {submitError && (
        <p className={errorLine + " mt-6"} role="alert">
          {submitError}
        </p>
      )}

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

      <p className="mono mt-4 text-center text-[10px] uppercase tracking-[0.18em] text-warm-white/55 sm:text-left">
        {t(
          "Response within hours · Tunis & banlieue · snaprint.tn@gmail.com",
          "Réponse en quelques heures · Tunis & banlieue · snaprint.tn@gmail.com",
        )}
      </p>
    </form>
  );
}
