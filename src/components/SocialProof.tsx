import { Quote } from "lucide-react";

const PLACEHOLDER_LOGOS = ["Acme Corp", "Globex", "Initech", "Massive Dynamic", "Umbrella"];

const TESTIMONIALS = [
  {
    quote:
      "PickAIChat cut our multi-channel support rollout from weeks to two days. The dispatcher architecture is exactly what we needed.",
    name: "Alex Rivera",
    role: "Head of Engineering",
    company: "Acme Corp",
    initials: "AR",
  },
  {
    quote:
      "Finally a chat engine that doesn't lock us into one LLM provider. Swapping models mid-project was painless.",
    name: "Sam Chen",
    role: "CTO",
    company: "Globex Labs",
    initials: "SC",
  },
  {
    quote:
      "The upsell architecture let us ship CRM sync and analytics as paid addons without touching the core engine.",
    name: "Jordan Patel",
    role: "Product Lead",
    company: "Initech",
    initials: "JP",
  },
];

export function SocialProof() {
  return (
    <section id="social-proof" className="relative px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <div className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-magenta">
            // Trusted by builders
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Built for teams shipping AI to production
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground">
            Replace the placeholder logos and testimonials below with your real clients and quotes.
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
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="relative rounded-xl border border-border bg-card p-6 transition hover:border-magenta/40"
            >
              <Quote size={24} className="absolute right-6 top-6 text-magenta/20" />
              <p className="relative text-sm leading-relaxed text-foreground/90">“{t.quote}”</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background font-mono text-xs font-semibold text-magenta">
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {t.role}, {t.company}
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
