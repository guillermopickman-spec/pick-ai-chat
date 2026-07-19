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
      { title: "PickAIChat — Hub de Agentes AI para WhatsApp y tu negocio" },
      {
        name: "description",
        content:
          "Hub de agentes AI para WhatsApp, web y email. Automatiza tu negocio 24/7 con el agente multi-herramienta más económico del mercado. Configuración en 24 horas.",
      },
      { property: "og:title", content: "PickAIChat — Hub de Agentes AI para tu Negocio" },
      {
        property: "og:description",
        content: "Tu negocio automatizado al instante. El agente AI más económico del mercado.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/logo/logo-800x437.png" },
      { property: "og:image:width", content: "800" },
      { property: "og:image:height", content: "437" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/logo/logo-800x437.png" },
      { name: "twitter:title", content: "PickAIChat — Hub de Agentes AI para tu Negocio" },
      {
        name: "twitter:description",
        content: "Tu negocio automatizado al instante con el agente AI más económico del mercado.",
      },
    ],
    links: [
      { rel: "alternate", hrefLang: "es", href: "https://pickaichat.com" },
      { rel: "alternate", hrefLang: "en", href: "https://pickaichat.com?lang=en" },
      { rel: "alternate", hrefLang: "x-default", href: "https://pickaichat.com" },
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
        {/* Standalone chatbot — visible on mobile (hidden on desktop since it's already in Hero) */}
        <div className="lg:hidden">
          <Chatbot />
        </div>
        <Pricing />
        <FAQ />
        <ContactSection />
      </main>
    </>
  );
}