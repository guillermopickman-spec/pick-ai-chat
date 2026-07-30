import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Features } from "@/components/Features";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Features — PickAIChat" },
      {
        name: "description",
        content:
          "Discover PickAIChat features: 24/7 WhatsApp agent, multi-tool integration, scalable agents, and 7-day free trial.",
      },
      { property: "og:title", content: "Features — PickAIChat" },
      {
        property: "og:description",
        content:
          "Discover PickAIChat features: 24/7 WhatsApp agent, multi-tool integration, scalable agents, and 7-day free trial.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/logo/logo-800x437.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Features — PickAIChat" },
      {
        name: "twitter:description",
        content:
          "Discover PickAIChat features: 24/7 WhatsApp agent, multi-tool integration, scalable agents, and 7-day free trial.",
      },
    ],
  }),
  component: FeaturesRoute,
});

function FeaturesRoute() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background px-4 pt-32 pb-24 text-foreground">
        <Features />
      </main>
    </>
  );
}