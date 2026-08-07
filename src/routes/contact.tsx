import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { ContactForm } from "@/components/Contact";
import { PaymentMethods } from "@/components/PaymentMethods";

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>) => ({
    upgrade: search.upgrade === "1",
  }),
  head: () => ({
    meta: [
      { title: "Contact — PickAIChat" },
      {
        name: "description",
        content:
          "Get in touch with PickAIChat. Tell us about your AI chat project and we'll reply with a tailored build plan.",
      },
      { property: "og:title", content: "Contact — PickAIChat" },
      {
        property: "og:description",
        content:
          "Get in touch with PickAIChat. Tell us about your AI chat project and we'll reply with a tailored build plan.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Contact — PickAIChat" },
      {
        name: "twitter:description",
        content:
          "Get in touch with PickAIChat. Tell us about your AI chat project and we'll reply with a tailored build plan.",
      },
    ],
  }),
  component: ContactRoute,
});

function ContactRoute() {
  const { upgrade } = Route.useSearch();
  const upgradeMessage =
    "Hi! I'd like to upgrade to the paid chat plan. Please send me the payment details (bank/PayPal) and I'll pay, then activate my account.";
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background px-4 pt-32 pb-24 text-foreground">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-magenta">
            // Contact
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Let's build your chat engine
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Fill out the form below and we'll reply within 24 hours — your agent goes live in 12–48 business hours after payment.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-2xl space-y-6">
          {upgrade && <PaymentMethods />}
          <ContactForm defaultMessage={upgrade ? upgradeMessage : undefined} />
        </div>
      </main>
    </>
  );
}
