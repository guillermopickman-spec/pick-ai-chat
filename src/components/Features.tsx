import { Cable, Brain, ShieldCheck, Layers, Shuffle, Rocket, type LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  body: string;
}

const FEATURES: Feature[] = [
  {
    icon: Cable,
    title: "Multi-Channel Routing",
    body: "One engine handles Telegram, WhatsApp, Web Chat, and Email through a single dispatcher.",
  },
  {
    icon: Brain,
    title: "Session Memory",
    body: "Cross-channel persistence — conversation state follows users wherever they message you.",
  },
  {
    icon: ShieldCheck,
    title: "Rate Limiting & Auth",
    body: "Built-in middleware, API key authentication, and configurable per-user rate limits.",
  },
  {
    icon: Layers,
    title: "Upsell Architecture",
    body: "Drop-in paid addons — CRM sync, analytics, custom flows — without touching the core.",
  },
  {
    icon: Shuffle,
    title: "Provider Agnostic",
    body: "Swap LLM models mid-workflow. OpenRouter, OpenAI, Anthropic, local — your call.",
  },
  {
    icon: Rocket,
    title: "48-Hour Deployment",
    body: "Order to production in two days. Docker-ready with zero-downtime deploys.",
  },
];

export function Features() {
  return (
    <section id="features" className="relative px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <div className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-magenta">
            // Capabilities
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything a real chat engine needs
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Purpose-built for teams shipping AI conversation surfaces to production — not another
            wrapper around a chat completions endpoint.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
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
                <h3 className="text-lg font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
