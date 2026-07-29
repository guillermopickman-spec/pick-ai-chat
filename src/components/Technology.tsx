import { Scan, Sliders, Rocket } from "lucide-react";
import { useLanguage } from "../lib/LanguageProvider";

const MODELS = [
  { key: "0", provider: "anthropic" },
  { key: "1", provider: "openai" },
  { key: "2", provider: "anthropic" },
  { key: "3", provider: "deepseek" },
  { key: "4", provider: "qwen" },
] as const;

const STEPS = [
  { icon: Scan, key: "0" },
  { icon: Sliders, key: "1" },
  { icon: Rocket, key: "2" },
];

const MODEL_LOGOS: Record<string, string> = {
  anthropic: "https://openrouter.ai/images/icons/Anthropic.svg",
  openai: "https://openrouter.ai/images/icons/OpenAI.svg",
  deepseek: "https://openrouter.ai/images/icons/DeepSeek.svg",
  qwen: "https://openrouter.ai/images/icons/Qwen.png",
};

const PRICE_COLORS: Record<string, string> = {
  "$": "text-green-400",
  "$$": "text-yellow-400",
  "$$$": "text-red-400",
};

export function Technology() {
  const { t, lang } = useLanguage();

  return (
    <section id="technology" className="relative px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-16 text-center">
          <div className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-magenta">
            {t("tech.section")}
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t("tech.heading")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            {t("tech.subtitle")}
          </p>
        </div>

        {/* Models grid */}
        <div className="mb-20">
          <h3 className="mb-8 text-center text-lg font-semibold text-foreground">
            {t("tech.models.title")}
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {MODELS.map(({ key, provider }) => (
              <div
                key={key}
                className="group relative flex flex-col rounded-xl border border-border bg-card p-5 transition hover:border-magenta/50 hover:-translate-y-0.5"
              >
                <div className="mb-3 flex items-center gap-3">
                  <img
                    src={MODEL_LOGOS[provider]}
                    alt={provider}
                    className="h-7 w-7 rounded-full"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                  <span className="text-sm font-semibold text-foreground">
                    {t(`tech.model.${key}.name`)}
                  </span>
                </div>
                <div className="mb-2 text-xs text-muted-foreground">
                  {t(`tech.model.${key}.tag`)}
                </div>
                <div className={`text-lg font-bold ${PRICE_COLORS[t(`tech.model.${key}.price`)] || "text-foreground"}`}>
                  {t(`tech.model.${key}.price`)}
                </div>
                <div className="mt-2 text-xs leading-relaxed text-muted-foreground/70">
                  {t(`tech.model.${key}.desc`)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-20">
          <div className="mb-12 text-center">
            <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {t("howitworks.heading")}
            </h3>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
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

        {/* Hermes badge */}
        <div className="mx-auto max-w-2xl rounded-xl border border-border bg-card p-8 text-center">
          <div className="mb-3 inline-flex items-center justify-center rounded-full bg-magenta/10 px-3 py-1 text-xs font-semibold text-magenta">
            Open Source
          </div>
          <h3 className="text-xl font-bold text-foreground sm:text-2xl">
            {t("tech.hermes.title")}
          </h3>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
            {t("tech.hermes.desc")}
          </p>
          <a
            href="https://hermes-agent.nousresearch.com"
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-xs font-medium text-foreground transition hover:border-magenta hover:text-magenta"
          >
            Learn more about Hermes →
          </a>
        </div>
      </div>
    </section>
  );
}