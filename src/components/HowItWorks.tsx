import { Scan, Sliders, Rocket } from "lucide-react";
import { useLanguage } from "../lib/LanguageProvider";

const STEPS = [
  { icon: Scan, key: "0" },
  { icon: Sliders, key: "1" },
  { icon: Rocket, key: "2" },
];

export function HowItWorks() {
  const { t } = useLanguage();

  return (
    <section id="how-it-works" className="relative px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <div className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-magenta">
            {t("howitworks.section")}
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t("howitworks.heading")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            {t("howitworks.subtitle")}
          </p>
        </div>

        <div className="relative">
          <div
            aria-hidden
            className="absolute top-12 left-0 right-0 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent md:block"
          />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {STEPS.map(({ icon: Icon, key }, idx) => (
              <div key={key} className="relative flex flex-col items-center text-center">
                <div className="relative z-10 mb-6 flex h-24 w-24 flex-col items-center justify-center rounded-full border border-border bg-card">
                  <span className="font-mono text-xs text-magenta">0{idx + 1}</span>
                  <Icon size={20} className="mt-1 text-foreground" strokeWidth={1.75} />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{t(`howitworks.${key}.title`)}</h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
                  {t(`howitworks.${key}.body`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}