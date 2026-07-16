import { ChevronDown } from "lucide-react";
import { useLanguage } from "../lib/LanguageProvider";

const FAQ_KEYS = ["0", "1", "2", "3", "4", "5"];

export function FAQ() {
  const { t } = useLanguage();

  return (
    <section id="faq" className="relative px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <div className="mb-16 text-center">
          <div className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-magenta">
            {t("faq.section")}
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("faq.heading")}</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            {t("faq.subtitle")}
          </p>
        </div>

        <div className="space-y-4">
          {FAQ_KEYS.map((key) => (
            <details
              key={key}
              className="group details-marker-none rounded-xl border border-border bg-card open:border-magenta/40"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between p-5">
                <span className="pr-4 text-sm font-semibold text-foreground">
                  {t(`faq.${key}.q`)}
                </span>
                <ChevronDown
                  size={18}
                  className="shrink-0 text-muted-foreground transition group-open:rotate-180"
                />
              </summary>
              <div className="px-5 pb-5">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {t(`faq.${key}.a`)}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}