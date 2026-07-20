import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — PickAIChat" },
      { name: "description", content: "Terms of Service for PickAIChat AI agent services." },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-24">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Terms of Service</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: July 2026</p>

        <div className="mt-10 space-y-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
          <section>
            <h2 className="text-lg font-semibold text-foreground">1. Service Description</h2>
            <p className="mt-2">
              PickAIChat provides AI agent services for businesses, including WhatsApp automation,
              web chat, email processing, and CRM integration. The service is provided on a
              subscription basis as described on our pricing page.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">2. User Responsibilities</h2>
            <p className="mt-2">
              You agree to: provide accurate information, maintain the security of your account,
              use the service in compliance with applicable laws, and not misuse the AI agent
              for spam, harassment, or illegal activities.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">3. Limitations of Liability</h2>
            <p className="mt-2">
              PickAIChat is provided "as is" without warranty of any kind. While we strive for
              99.9% uptime, we are not liable for losses resulting from service interruptions,
              AI errors, or data loss. The AI agent is a tool to assist your business, not a
              replacement for human judgment in critical decisions.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">4. Subscription & Billing</h2>
            <p className="mt-2">
              Subscriptions are billed monthly. You may cancel at any time. No refunds are
              provided for partial months. Price changes will be communicated 30 days in advance.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">5. Contact</h2>
            <p className="mt-2">
              For questions about these terms, contact us at{" "}
              <a href="mailto:hello@pickaichat.com" className="text-magenta hover:underline">
                hello@pickaichat.com
              </a>.
            </p>
          </section>
        </div>

        <div className="mt-12">
          <Link
            to="/"
            className="text-sm text-magenta hover:underline"
          >
            ← Back to home
          </Link>
        </div>
      </main>
    </>
  );
}