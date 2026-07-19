import { Quote } from "lucide-react";
import { useLanguage } from "../lib/LanguageProvider";

const PLACEHOLDER_LOGOS = ["Ferretería Mendoza", "Clínica DentalCare", "Pizzería Da Miguel", "Tienda Sol", "Taller García"];

const SOCIAL_KEYS = ["0", "1", "2"];

export function SocialProof() {
  const { t } = useLanguage();

  return (
    <section id="social-proof" className="relative px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <div className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-magenta">
            {t("social.section")}
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t("social.heading")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground">
            {t("social.subtitle")}
          </p>
        </div>

        <div className="mb-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 border-y border-border py-8">
          {PLACEHOLDER_LOGOS.map((name) => (
            <span
              key={name}
              className="font-mono text-sm uppercase tracking-widest text-muted-foreground/60 transition hover:text-muted-foreground"
            >
              {name}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {SOCIAL_KEYS.map((key) => (
            <div
              key={key}
              className="relative rounded-xl border border-border bg-card p-6 transition hover:border-magenta/40"
            >
              <Quote size={24} className="absolute right-6 top-6 text-magenta/20" />
              <p className="relative text-sm leading-relaxed text-foreground/90">“{t(`social.${key}.quote`)}”</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background font-mono text-xs font-semibold text-magenta">
                  {t(`social.${key}.initials`)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{t(`social.${key}.name`)}</div>
                  <div className="text-xs text-muted-foreground">
                    {t(`social.${key}.role`)}, {t(`social.${key}.company`)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}