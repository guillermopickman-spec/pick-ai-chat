import { MessageCircle, Puzzle, Layers, Sparkles, type LucideIcon } from "lucide-react";
import { useLanguage } from "../lib/LanguageProvider";

interface Feature {
  icon: LucideIcon;
  key: string;
}

const FEATURES: Feature[] = [
  { icon: MessageCircle, key: "0" },
  { icon: Puzzle, key: "1" },
  { icon: Layers, key: "2" },
  { icon: Sparkles, key: "3" },
];

export function Features() {
  const { t } = useLanguage();

  return (
    <section id="features" className="relative px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <div className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-magenta">
            {t("features.section")}
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t("features.heading")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            {t("features.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {FEATURES.map(({ icon: Icon, key }) => (
            <div
              key={key}
              className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition hover:border-magenta/50 hover:-translate-y-0.5"
            >
              <div
                aria-hidden
                className="absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition group-hover:opacity-100"
                style={{ background: "var(--magenta)" }}
              />
              <div className="relative">
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-background text-magenta">
                  <Icon size={20} strokeWidth={1.75} />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{t(`features.${key}.title`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t(`features.${key}.body`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}