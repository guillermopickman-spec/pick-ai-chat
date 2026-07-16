import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useLanguage } from "../lib/LanguageProvider";

function scrollToHash(hash: string) {
  const el = document.getElementById(hash);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function Navbar() {
  const { t, lang, setLang } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const NAV_LINKS = [
    { label: t("nav.features"), to: "/", hash: "features" },
    { label: t("nav.demo"), to: "/", hash: "chatbot" },
    { label: t("nav.pricing"), to: "/", hash: "pricing" },
    { label: t("nav.faq"), to: "/", hash: "faq" },
  ];

  useEffect(() => {
    const onScroll = () => {
      const heroHeight = window.innerHeight * 0.85;
      setVisible(window.scrollY > heroHeight);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={
        "fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur transition-transform duration-300 " +
        (visible ? "translate-y-0" : "-translate-y-full")
      }
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2"
        >
          <div className="hidden h-7 w-7 overflow-hidden rounded-full sm:block">
            <img
              src="/logo/logo-only-200.webp"
              alt="PickAIChat"
              width={28}
              height={28}
              className="h-full w-full object-cover"
            />
          </div>
          <span className="font-mono text-lg font-semibold text-magenta">PickAIChat</span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <button
              key={link.hash}
              onClick={() => scrollToHash(link.hash)}
              className="text-sm text-muted-foreground transition hover:text-foreground"
            >
              {link.label}
            </button>
          ))}

          <div className="flex items-center gap-1 border-l border-border pl-4">
            <button
              onClick={() => setLang("es")}
              className={`rounded px-2 py-1 text-xs font-mono transition ${
                lang === "es"
                  ? "bg-magenta/20 text-magenta"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              ES
            </button>
            <span className="text-xs text-muted-foreground/40">/</span>
            <button
              onClick={() => setLang("en")}
              className={`rounded px-2 py-1 text-xs font-mono transition ${
                lang === "en"
                  ? "bg-magenta/20 text-magenta"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              EN
            </button>
          </div>

          <Link
            to="/contact"
            className="rounded-lg bg-magenta px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
          >
            {t("nav.cta")}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((s) => !s)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition hover:text-foreground md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-border bg-background px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <button
                key={link.hash}
                onClick={() => {
                  setMobileOpen(false);
                  scrollToHash(link.hash);
                }}
                className="text-left text-sm text-muted-foreground transition hover:text-foreground"
              >
                {link.label}
              </button>
            ))}
            <div className="flex items-center gap-2 border-t border-border pt-3">
              <button
                onClick={() => { setLang("es"); setMobileOpen(false); }}
                className={`rounded px-3 py-1.5 text-xs font-mono transition ${
                  lang === "es"
                    ? "bg-magenta/20 text-magenta"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                ES
              </button>
              <button
                onClick={() => { setLang("en"); setMobileOpen(false); }}
                className={`rounded px-3 py-1.5 text-xs font-mono transition ${
                  lang === "en"
                    ? "bg-magenta/20 text-magenta"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                EN
              </button>
            </div>
            <Link
              to="/contact"
              onClick={() => setMobileOpen(false)}
              className="mt-1 rounded-lg bg-magenta px-4 py-2 text-center text-sm font-semibold text-primary-foreground transition hover:brightness-110"
            >
              {t("nav.cta")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}