import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";

import { SnaprintLockup, SnaprintMark } from "@/components/SnaprintLogo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LangToggle } from "@/components/LangToggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useI18n } from "@/lib/i18n";

function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1280px] px-6 md:px-10 ${className}`}>{children}</div>;
}

export function SiteNav() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const items: [string, string][] = [
    [t("Workflow", "Workflow"), "/#workflow"],
    [t("Speed", "Délais"), "/#speed"],
    [t("Capabilities", "Savoir-faire"), "/#capabilities"],
    [t("Work", "Réalisations"), "/#work"],
    [t("Studio", "Studio"), "/studio"],
  ];

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <Container className="flex h-14 items-center justify-between gap-3">
        <Link to="/" className="flex items-center" aria-label="Snaprint home">
          <SnaprintLockup />
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {items.map(([label, href]) =>
            href.startsWith("/#") ? (
              <a key={href} href={href} className="text-[13px] text-ink-soft transition-colors hover:text-foreground">
                {label}
              </a>
            ) : (
              <Link
                key={href}
                to={href}
                className="text-[13px] text-ink-soft transition-colors hover:text-foreground"
                activeProps={{ className: "text-[13px] text-foreground" }}
              >
                {label}
              </Link>
            ),
          )}
        </nav>
        <div className="flex items-center gap-2">
          <LangToggle />
          <ThemeToggle />
          <a
            href="/#contact"
            className="mono hidden h-9 items-center gap-2 rounded-lg bg-primary px-4 text-[11px] uppercase tracking-[0.14em] text-primary-foreground transition-opacity hover:opacity-90 md:inline-flex"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-snap-mint" />
            {t("Get in touch", "Nous contacter")}
          </a>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label={t("Open menu", "Ouvrir le menu")}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:bg-secondary md:hidden"
              >
                <Menu className="h-4 w-4" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col p-0">
              <div className="flex items-center gap-2.5 border-b border-border px-6 py-4 text-foreground">
                <SnaprintMark className="h-6 w-6" />
                <span className="mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">
                  {t("Menu", "Menu")}
                </span>
              </div>
              <nav className="flex flex-1 flex-col">
                {items.map(([label, href]) =>
                  href.startsWith("/#") ? (
                    <a
                      key={href}
                      href={href}
                      onClick={close}
                      className="mono flex h-14 items-center border-b border-border px-6 text-[12px] uppercase tracking-[0.16em] text-foreground transition-colors hover:bg-secondary"
                    >
                      {label}
                    </a>
                  ) : (
                    <Link
                      key={href}
                      to={href}
                      onClick={close}
                      className="mono flex h-14 items-center border-b border-border px-6 text-[12px] uppercase tracking-[0.16em] text-foreground transition-colors hover:bg-secondary"
                    >
                      {label}
                    </Link>
                  ),
                )}
              </nav>
              <div className="border-t border-border p-6">
                <a
                  href="/#contact"
                  onClick={close}
                  className="mono flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-[12px] uppercase tracking-[0.14em] text-primary-foreground transition-opacity hover:opacity-90"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-snap-mint" />
                  {t("Get in touch", "Nous contacter")}
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}

export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="bg-background">
      <Container className="flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3 text-foreground">
          <SnaprintMark className="h-6 w-6" />
          <span className="mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
            {t("Snaprint SARL · Operational branding · Tunis", "Snaprint SARL · Branding opérationnel · Tunis")}
          </span>
        </div>
        <div className="mono flex flex-wrap items-center gap-6 text-[11px] uppercase tracking-[0.18em] text-ink-faint">
          <span>© {new Date().getFullYear()}</span>
          <a href="/#workflow" className="hover:text-foreground">{t("Workflow", "Workflow")}</a>
          <Link to="/studio" className="hover:text-foreground">{t("Studio", "Studio")}</Link>
          <a href="/#contact" className="hover:text-foreground">{t("Contact", "Contact")}</a>
        </div>
      </Container>
    </footer>
  );
}
