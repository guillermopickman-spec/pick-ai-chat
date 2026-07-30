import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { FAQ } from "@/components/FAQ";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — PickAIChat" },
      {
        name: "description",
        content:
          "Frequently asked questions about PickAIChat: What is an AI agent? How does it work? Pricing, channels, and more.",
      },
      { property: "og:title", content: "FAQ — PickAIChat" },
      {
        property: "og:description",
        content:
          "Frequently asked questions about PickAIChat: What is an AI agent? How does it work?",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/logo/logo-800x437.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "FAQ — PickAIChat" },
      {
        name: "twitter:description",
        content:
          "Frequently asked questions about PickAIChat: What is an AI agent? How does it work?",
      },
    ],
  }),
  component: FAQRoute,
});

function FAQRoute() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background px-4 pt-32 pb-24 text-foreground">
        <FAQ />
      </main>
    </>
  );
}