import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — PickAIChat" },
      { name: "description", content: "Privacy Policy for PickAIChat AI agent services." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-24">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Privacy Policy</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: July 2026</p>

        <div className="mt-10 space-y-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
          <section>
            <h2 className="text-lg font-semibold text-foreground">1. Information We Collect</h2>
            <p className="mt-2">
              When you use PickAIChat, we collect: your name, email address, phone number (WhatsApp),
              business information you provide, and messages exchanged through the AI agent.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">2. How We Use Your Information</h2>
            <p className="mt-2">
              We use your information to: provide and maintain the AI agent service, improve
              our AI models, communicate with you about your account, and send relevant updates.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">3. Data Storage & Security</h2>
            <p className="mt-2">
              Your data is stored on secure servers within the EU. We implement industry-standard
              security measures to protect your information. We do not sell your data to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">4. Third-Party Services</h2>
            <p className="mt-2">
              PickAIChat uses third-party services including OpenAI/OpenRouter for AI processing,
              Resend for email delivery, and WhatsApp/Telegram as messaging platforms. Each service
              has its own privacy policy governing data handling.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">5. Contact</h2>
            <p className="mt-2">
              For privacy-related inquiries, contact us at{" "}
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