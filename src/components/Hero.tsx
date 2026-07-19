import { useLanguage } from "../lib/LanguageProvider";
import { Chatbot } from "./Chatbot";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[90vh] flex flex-col overflow-hidden px-4 py-12 sm:py-16 lg:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 50% 40%, rgba(217,70,239,0.18), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(217,70,239,1) 1px, transparent 1px), linear-gradient(90deg, rgba(217,70,239,1) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col items-center gap-8 lg:flex-row lg:items-center">
        {/* Left: Hero text */}
        <div className="flex w-full max-w-2xl flex-col items-center text-center lg:items-start lg:text-left lg:pr-8 fade-in-up">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs font-mono text-muted-foreground backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-terminal shadow-[0_0_8px_var(--terminal)]" />
            {t("hero.badge")}
          </div>

          <div className="mb-6 flex items-center justify-center lg:hidden">
            <div className="mx-auto h-32 w-32 overflow-hidden rounded-full sm:h-40 sm:w-40 drop-shadow-[0_0_30px_rgba(217,70,239,0.4)]">
              <img
                src="/logo/logo-only-400.webp"
                alt="PickAIChat"
                width={160}
                height={160}
                className="h-full w-full object-cover"
                loading="eager"
              />
            </div>
          </div>

          <img
            src="/logo/LOGO-NAME.png"
            alt="PickAIChat"
            className="mx-auto max-w-[200px] sm:max-w-[260px] lg:mx-0 h-auto drop-shadow-[0_0_30px_rgba(217,70,239,0.4)]"
            loading="eager"
          />

          <h1 className="sr-only">{t("hero.title")}</h1>

          <p className="mt-6 max-w-2xl text-lg font-medium text-foreground sm:text-xl">
            {t("hero.subtitle", t("hero.subtitle.highlight"))}
          </p>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
            {t("hero.description")}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => scrollTo("chatbot")}
              className="group inline-flex items-center justify-center rounded-lg bg-magenta px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:brightness-110 hover:shadow-[0_0_32px_-4px_var(--magenta-glow)]"
            >
              {t("hero.cta.try")}
              <span className="ml-2 transition group-hover:translate-x-0.5">→</span>
            </button>
            <button
              onClick={() => scrollTo("pricing")}
              className="inline-flex items-center justify-center rounded-lg border border-border bg-card/60 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur transition hover:border-magenta/60 hover:text-magenta"
            >
              {t("hero.cta.pricing")}
            </button>
          </div>
        </div>

        {/* Right: Chatbot demo on desktop */}
        <div className="hidden w-full max-w-lg lg:block fade-in-up [animation-delay:200ms]">
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-4 rounded-2xl opacity-30 blur-xl"
              style={{ background: "var(--magenta)" }}
            />
            <Chatbot compact />
          </div>
        </div>
      </div>
    </section>
  );
}