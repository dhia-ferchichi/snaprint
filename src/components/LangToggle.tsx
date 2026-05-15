import { useI18n } from "@/lib/i18n";

export function LangToggle() {
  const { lang, setLang } = useI18n();
  return (
    <button
      type="button"
      onClick={() => setLang(lang === "fr" ? "en" : "fr")}
      aria-label={`Switch to ${lang === "fr" ? "English" : "French"}`}
      className="mono inline-flex h-9 items-center gap-1 rounded-lg border border-border bg-card px-2.5 text-[10px] uppercase tracking-[0.18em] text-foreground transition-colors hover:bg-secondary"
    >
      <span className={lang === "en" ? "text-foreground" : "text-ink-faint"}>EN</span>
      <span className="text-ink-faint">/</span>
      <span className={lang === "fr" ? "text-foreground" : "text-ink-faint"}>FR</span>
    </button>
  );
}
