import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    question: "What channels are supported out of the box?",
    answer:
      "Telegram, WhatsApp, Web Chat, and Email are supported through a single dispatcher. Additional channels can be added via the modular adapter architecture.",
  },
  {
    question: "Can I use my own LLM API key?",
    answer:
      "Yes. PickAIChat is provider-agnostic. Bring your OpenRouter, OpenAI, Anthropic, or local model credentials and configure them in one place.",
  },
  {
    question: "What does the 48-hour deployment include?",
    answer:
      "It covers a working PickAIChat instance with your chosen channels, auth, rate limiting, and memory configured. Docker manifests and deployment guidance are included.",
  },
  {
    question: "Is there ongoing maintenance?",
    answer:
      "The one-time build is yours to run. Enterprise plans include SLA and priority support. Business plans include analytics and CRM sync updates as needed.",
  },
  {
    question: "How does the upsell architecture work?",
    answer:
      "Core engine stays untouched. Add-ons like CRM sync, analytics dashboards, and custom flows are built as separate modules that hook into the dispatcher.",
  },
  {
    question: "Do I own the infrastructure?",
    answer:
      "Yes. PickAIChat is delivered as source + Docker manifests. You host it on your own cloud account with no per-seat or usage tax.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="relative px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <div className="mb-16 text-center">
          <div className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-magenta">
            // FAQ
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Questions? Answered.</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Everything you need to know before starting your PickAIChat build.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map(({ question, answer }) => (
            <details
              key={question}
              className="group details-marker-none rounded-xl border border-border bg-card open:border-magenta/40"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between p-5">
                <span className="pr-4 text-sm font-semibold text-foreground">{question}</span>
                <ChevronDown
                  size={18}
                  className="shrink-0 text-muted-foreground transition group-open:rotate-180"
                />
              </summary>
              <div className="px-5 pb-5">
                <p className="text-sm leading-relaxed text-muted-foreground">{answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
