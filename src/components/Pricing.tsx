import { Check, Sparkles } from "lucide-react";
import { useLanguage } from "../lib/LanguageProvider";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

const PLANS = ["1", "2", "3"];

export function Pricing() {
  const { t, lang } = useLanguage();

  return (
    <section id="pricing" className="relative px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <div className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-magenta">
            {t("pricing.section")}
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t("pricing.heading")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            {t("pricing.subtitle")}
          </p>
        </div>

        {/* Free Trial Banner */}
        <div className="mx-auto mb-10 max-w-2xl rounded-2xl border border-magenta/30 bg-magenta/5 p-6 text-center shadow-[0_0_20px_-4px_var(--magenta-glow)]">
          <Sparkles size={24} className="mx-auto mb-2 text-magenta" />
          <h3 className="text-lg font-semibold">{t("pricing.trial.name")}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{t("pricing.trial.desc")}</p>
          <button
            onClick={() => scrollTo("contact")}
            className="mt-4 inline-flex items-center justify-center rounded-lg bg-magenta px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
          >
            {t("pricing.trial.cta")}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {PLANS.map((key) => {
            const features = t(`pricing.${key}.features`) as unknown as string[];
            return (
              <div
                key={key}
                className={
                  "relative flex flex-col rounded-2xl border bg-card p-8 transition hover:-translate-y-1 " +
                  (key === "2"
                    ? "border-magenta shadow-[0_0_24px_-6px_var(--magenta-glow)]"
                    : "border-border")
                }
              >
                {key === "2" && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-magenta px-4 py-1 text-xs font-semibold uppercase tracking-wider text-primary-foreground whitespace-nowrap">
                    {t("pricing.badge")}
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-foreground">
                    {t(`pricing.${key}.name`)}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {t(`pricing.${key}.desc`)}
                  </p>
                </div>

                <div className="mb-8">
                  <span className="text-4xl font-bold text-foreground">
                    {t(`pricing.${key}.price`)}
                  </span>
                  {t(`pricing.${key}.period`) && (
                    <span className="ml-1 text-sm text-muted-foreground">
                      {t(`pricing.${key}.period`)}
                    </span>
                  )}
                </div>

                <ul className="mb-8 flex flex-col gap-3">
                  {Array.isArray(features) && features.map((f: string) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <Check size={16} className="mt-0.5 shrink-0 text-magenta" />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <button
                    onClick={() => scrollTo("contact")}
                    className={
                      "inline-flex w-full items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold transition " +
                      (key === "2"
                        ? "bg-magenta text-primary-foreground hover:brightness-110"
                        : "border border-border text-foreground hover:border-magenta/60 hover:text-magenta")
                    }
                  >
                    {t(`pricing.${key}.cta`)}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}