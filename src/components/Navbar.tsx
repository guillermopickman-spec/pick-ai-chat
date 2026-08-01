import { useState } from "react";
import { Link, useLocation, useRouter } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useLanguage } from "../lib/LanguageProvider";
import { useUser, useClerk } from "@clerk/tanstack-react-start";

const ADMIN_EMAIL = "pickaichat@gmail.com";

export function Navbar() {
  const { t, lang, setLang } = useLanguage();
  const { user, isLoaded, isSignedIn } = useUser();
  const clerk = useClerk();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const router = useRouter();
  const isHome = location.pathname === "/";
  const isAdmin = user?.primaryEmailAddress?.emailAddress === ADMIN_EMAIL;
  // Paid users are manually appointed via Clerk publicMetadata.plan = "paid"
  // (automated once the payment system lands). Admins can always reach the
  // Hermes chat for testing/admin purposes.
  const canUsePaidChat =
    isAdmin ||
    (user?.publicMetadata as { plan?: string } | undefined)?.plan === "paid";
  const chatHref = canUsePaidChat ? "/chat" : "/free-chat";

  const NAV_LINKS = [
    { label: t("nav.features"), hash: "features", path: "/features" },
    { label: t("nav.pricing"), hash: "pricing", path: "/pricing" },
    { label: t("nav.faq"), hash: "faq", path: "/faq" },
  ];

  function isActive(path: string) {
    return location.pathname === path;
  }

  function handleNavClick(hash: string) {
    if (isHome) {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      router.navigate({ to: `/${hash}` });
    }
  }

  const handleSignIn = () => {
    clerk.redirectToSignIn();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur">
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

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <button
              key={link.hash}
              onClick={() => handleNavClick(link.hash)}
              className={`text-sm transition ${
                !isHome && isActive(link.path)
                  ? "text-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
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

          {isLoaded && isSignedIn ? (
            <div className="flex items-center gap-2">
              <Link
                to="/dashboard"
                className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-foreground transition hover:border-magenta hover:text-magenta"
              >
                Dashboard
              </Link>
              <Link
                to="/tycoon"
                className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-foreground transition hover:border-green-500 hover:text-green-500"
              >
                🏢 Tycoon
              </Link>
              <Link
                to={chatHref}
                className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-foreground transition hover:border-magenta hover:text-magenta"
              >
                Chat
              </Link>
              <Link
                to="/mail"
                className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-foreground transition hover:border-magenta hover:text-magenta"
              >
                Mail
              </Link>
              {isAdmin && (
                <Link
                  to="/admin"
                  className="rounded-lg border border-magenta/40 px-3 py-1.5 text-xs font-semibold text-magenta transition hover:border-magenta hover:bg-magenta/10"
                >
                  Admin
                </Link>
              )}
              <button
                onClick={() => clerk.signOut()}
                className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-foreground transition hover:border-red-500 hover:text-red-500"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <>
            <Link
              to="/try"
              className="rounded-lg border border-magenta/40 px-3 py-1.5 text-xs font-semibold text-magenta transition hover:border-magenta hover:bg-magenta/10"
            >
              Try Free
            </Link>
            <button
              onClick={handleSignIn}
              className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-foreground transition hover:border-magenta hover:text-magenta"
            >
              Sign In
            </button>
            </>
          )}

          <Link
            to="/contact"
            className="rounded-lg bg-magenta px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
          >
            {t("nav.cta")}
          </Link>
        </div>

        {/* Hamburger (mobile only) */}
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

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-background px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <button
                key={link.hash}
                onClick={() => {
                  setMobileOpen(false);
                  handleNavClick(link.hash);
                }}
                className={`text-left text-sm transition ${
                  !isHome && isActive(link.path)
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
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
            {/* Mobile auth buttons */}
            <div className="border-t border-border pt-3">
              {isLoaded && isSignedIn ? (
                <div className="flex items-center gap-2">
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 rounded-lg border border-border px-3 py-1.5 text-center text-xs font-semibold text-foreground transition hover:border-magenta hover:text-magenta"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/tycoon"
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 rounded-lg border border-border px-3 py-1.5 text-center text-xs font-semibold text-foreground transition hover:border-green-500 hover:text-green-500"
                  >
                    🏢 Tycoon
                  </Link>
                  <Link
                    to={chatHref}
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 rounded-lg border border-border px-3 py-1.5 text-center text-xs font-semibold text-foreground transition hover:border-magenta hover:text-magenta"
                  >
                    Chat
                  </Link>
                  <Link
                    to="/mail"
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 rounded-lg border border-border px-3 py-1.5 text-center text-xs font-semibold text-foreground transition hover:border-magenta hover:text-magenta"
                  >
                    Mail
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setMobileOpen(false)}
                      className="flex-1 rounded-lg border border-magenta/40 px-3 py-1.5 text-center text-xs font-semibold text-magenta transition hover:border-magenta hover:bg-magenta/10"
                    >
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={() => { setMobileOpen(false); clerk.signOut(); }}
                    className="flex-1 rounded-lg border border-border px-3 py-1.5 text-center text-xs font-semibold text-foreground transition hover:border-red-500 hover:text-red-500"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => { setMobileOpen(false); handleSignIn(); }}
                  className="w-full rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-foreground transition hover:border-magenta hover:text-magenta"
                >
                  Sign In
                </button>
              )}
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