import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Pricing } from "@/components/Pricing";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — PickAIChat" },
      {
        name: "description",
        content:
          "PickAIChat pricing plans: Free, Starter, Business, and Pro. Affordable AI agents for your business, no complicated contracts.",
      },
      { property: "og:title", content: "Pricing — PickAIChat" },
      {
        property: "og:description",
        content:
          "PickAIChat pricing plans: Free, Starter, Business, and Pro. Affordable AI agents for your business.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/logo/logo-800x437.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Pricing — PickAIChat" },
      {
        name: "twitter:description",
        content:
          "PickAIChat pricing plans: Free, Starter, Business, and Pro. Affordable AI agents for your business.",
      },
    ],
  }),
  component: PricingRoute,
});

function PricingRoute() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background px-4 pt-32 pb-24 text-foreground">
        <Pricing />
      </main>
    </>
  );
}