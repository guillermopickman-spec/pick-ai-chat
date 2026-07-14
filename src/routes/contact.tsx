import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { ContactForm } from "@/components/Contact";

export const Route = createFileRoute("/contact")({
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
            Fill out the form below and we'll reply with a tailored plan within 24 hours.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-2xl">
          <ContactForm />
        </div>
      </main>
    </>
  );
}
