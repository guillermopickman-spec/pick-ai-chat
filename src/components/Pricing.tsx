import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

interface Tier {
  name: string;
  price: string;
  suffix?: string;
  tagline: string;
  features: string[];
  highlight?: boolean;
  cta: string;
}

const TIERS: Tier[] = [
  {
    name: "Standard",
    price: "$450",
    tagline: "PickAIChat core + one channel",
    features: [
      "PickAIChat engine",
      "Web Chat or Email channel",
      "Session memory",
      "API key auth",
      "48h deploy",
    ],
    cta: "Start Standard",
  },
  {
    name: "Business",
    price: "$850",
    tagline: "Full omnichannel + CRM sync",
    features: [
      "Everything in Standard",
      "Telegram + WhatsApp + Web + Email",
      "CRM sync (HubSpot, Airtable, custom)",
      "Rate limiting middleware",
      "Analytics dashboard",
    ],
    cta: "Start Business",
  },
  {
    name: "Enterprise",
    price: "$1,500",
    suffix: "+",
    tagline: "Full suite, Docker, zero-downtime",
    features: [
      "Everything in Business",
      "Docker + Kubernetes manifests",
      "Zero-downtime blue/green deploys",
      "Custom upsell modules",
      "SLA + priority support",
    ],
    highlight: true,
    cta: "Talk to Sales",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <div className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-magenta">
            // Pricing
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            One-time build. Yours forever.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            No per-seat pricing. No usage tax. Own your infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={
                "relative flex flex-col rounded-2xl border bg-card p-8 transition " +
                (tier.highlight
                  ? "border-magenta border-glow-magenta lg:scale-[1.03]"
                  : "border-border hover:border-magenta/40")
              }
            >
              {tier.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-magenta px-3 py-1 text-xs font-semibold text-primary-foreground">
                  Most Complete
                </div>
              )}
              <h3 className="text-sm font-mono uppercase tracking-widest text-muted-foreground">
                {tier.name}
              </h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-5xl font-bold text-foreground">{tier.price}</span>
                {tier.suffix && (
                  <span className="text-2xl font-semibold text-magenta">{tier.suffix}</span>
                )}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{tier.tagline}</p>

              <ul className="mt-8 space-y-3">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check
                      size={16}
                      className={tier.highlight ? "mt-0.5 text-magenta" : "mt-0.5 text-terminal"}
                      strokeWidth={2.5}
                    />
                    <span className="text-foreground/90">{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/contact"
                className={
                  "mt-10 inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold transition " +
                  (tier.highlight
                    ? "bg-magenta text-primary-foreground hover:brightness-110"
                    : "border border-border bg-background text-foreground hover:border-magenta hover:text-magenta")
                }
              >
                {tier.cta}
              </Link>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                {tier.highlight
                  ? "No credit card required to talk"
                  : "One-time payment, no usage tax"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
