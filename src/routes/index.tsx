import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Features } from "@/components/Features";
import { SocialProof } from "@/components/SocialProof";
import { HowItWorks } from "@/components/HowItWorks";
import { Pricing } from "@/components/Pricing";
import { Chatbot } from "@/components/Chatbot";
import { FAQ } from "@/components/FAQ";
import { ContactSection } from "@/components/Contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PickAIChat — Universal AI Chat Engine" },
      {
        name: "description",
        content:
          "Universal AI Chat Engine. Build once, deploy everywhere — Telegram, WhatsApp, Web Chat, and Email with cross-channel memory, auth, and provider-agnostic LLM routing.",
      },
      { property: "og:title", content: "PickAIChat — Universal AI Chat Engine" },
      {
        property: "og:description",
        content: "One engine. Every channel. Production-ready AI chat with 48-hour deployment.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/logo/logo-800x437.png" },
      { property: "og:image:width", content: "800" },
      { property: "og:image:height", content: "437" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/logo/logo-800x437.png" },
      { name: "twitter:title", content: "PickAIChat — Universal AI Chat Engine" },
      {
        name: "twitter:description",
        content: "One engine. Every channel. Production-ready AI chat with 48-hour deployment.",
      },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background text-foreground">
        <Hero />
        <Features />
        <SocialProof />
        <HowItWorks />
        <Chatbot />
        <Pricing />
        <FAQ />
        <ContactSection />
      </main>
    </>
  );
}
