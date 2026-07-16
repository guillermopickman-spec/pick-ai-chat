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
      { title: "PickAIChat — Asistente AI para WhatsApp de tu negocio" },
      {
        name: "description",
        content:
          "Asistente AI para WhatsApp, web y email. Responde automáticamente a tus clientes 24/7 desde un solo motor. Configuración en 24 horas.",
      },
      { property: "og:title", content: "PickAIChat — Asistente AI para tu negocio" },
      {
        property: "og:description",
        content: "Tu negocio responde al instante en WhatsApp. AI que entiende a tus clientes.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/logo/logo-800x437.png" },
      { property: "og:image:width", content: "800" },
      { property: "og:image:height", content: "437" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/logo/logo-800x437.png" },
      { name: "twitter:title", content: "PickAIChat — Asistente AI para tu negocio" },
      {
        name: "twitter:description",
        content: "Tu negocio responde al instante en WhatsApp con AI que entiende a tus clientes.",
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
