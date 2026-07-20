import { useLanguage } from "../lib/LanguageProvider";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="relative px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Photo */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div
                aria-hidden
                className="absolute -inset-4 rounded-2xl opacity-20 blur-xl"
                style={{ background: "var(--magenta)" }}
              />
              <div className="relative h-72 w-72 overflow-hidden rounded-2xl border border-border sm:h-80 sm:w-80">
                <img
                  src="/logo/logo-only-400.webp"
                  alt="Guillermo Pickman"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="fade-in-up">
            <div className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-magenta">
              {t("about.section")}
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {t("about.heading")}
            </h2>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base whitespace-pre-line">
              {t("about.body")}
            </div>
            <button
              onClick={() => scrollTo("contact")}
              className="mt-8 inline-flex items-center justify-center rounded-lg bg-magenta px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:brightness-110 hover:shadow-[0_0_32px_-4px_var(--magenta-glow)]"
            >
              {t("about.cta")}
              <span className="ml-2">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}