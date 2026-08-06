import { CalendarCheck, Users, GraduationCap, Headphones, type LucideIcon } from "lucide-react";
import { useLanguage } from "../lib/LanguageProvider";

/**
 * "Get Started" — the human hand-holding / service layer.
 * Differentiator: PickAIChat sets you up and stays close — you're never alone.
 * Real-time (human) + on-demand (tutorials) = concierge now, scalable later.
 */
type Step = { icon: LucideIcon; key: string };

const STEPS: Step[] = [
  { icon: Headphones, key: "0" }, // setup call
  { icon: CalendarCheck, key: "1" }, // group onboarding dates
  { icon: Users, key: "2" }, // open doors / recurring sessions
  { icon: GraduationCap, key: "3" }, // tutorials
];

export function GetStarted() {
  const { t } = useLanguage();

  return (
    <section id="get-started" className="relative scroll-mt-16 px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <div className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-magenta">
            {t("getstarted.section")}
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t("getstarted.heading")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            {t("getstarted.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ icon: Icon, key }, i) => (
            <div
              key={key}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-magenta/50"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-background text-magenta">
                  <Icon size={20} strokeWidth={1.75} />
                </div>
                <span className="font-mono text-xs text-muted-foreground/50">
                  0{i + 1}
                </span>
              </div>
              <h3 className="text-base font-semibold text-foreground">
                {t(`getstarted.${key}.title`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {t(`getstarted.${key}.body`)}
              </p>
            </div>
          ))}
        </div>

        {/* Concierge banner */}
        <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-magenta/25 bg-magenta/5 px-6 py-8 text-center">
          <h3 className="text-xl font-bold text-foreground">
            {t("getstarted.banner.title")}
          </h3>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground">
            {t("getstarted.banner.body")}
          </p>
          <button
            onClick={() => {
              const el = document.getElementById("contact");
              el?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-magenta px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
          >
            {t("getstarted.banner.cta")}
          </button>
        </div>
      </div>
    </section>
  );
}
