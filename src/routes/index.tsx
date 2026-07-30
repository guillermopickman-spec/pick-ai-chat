import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Features } from "@/components/Features";
import { SocialProof } from "@/components/SocialProof";
import { Pricing } from "@/components/Pricing";
import { DemoChat } from "@/components/DemoChat";
import { FAQ } from "@/components/FAQ";
import { ContactSection } from "@/components/Contact";
import { About } from "@/components/About";
import { Technology } from "@/components/Technology";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PickAIChat — Hub de Agentes AI para WhatsApp y tu negocio" },
      {
        name: "description",
        content:
          "Hub de agentes AI para WhatsApp, web y email. Automatiza tu negocio 24/7 con AI asequible. Configuración en 24 horas.",
      },
      { property: "og:title", content: "PickAIChat — Hub de Agentes AI para tu Negocio" },
      {
        property: "og:description",
        content: "Tu negocio automatizado al instante. AI asequible para cada negocio.",
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
        content: "Tu negocio automatizado al instante con AI asequible para cada negocio.",
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
  // Restore scroll position on page refresh
  useEffect(() => {
    const saved = sessionStorage.getItem("pickaichat_scroll");
    if (saved) {
      const pos = parseInt(saved, 10);
      sessionStorage.removeItem("pickaichat_scroll");
      // Retry with delays to wait for content to render
      [50, 200, 500].forEach((ms) => setTimeout(() => window.scrollTo(0, pos), ms));
    }
    const handleBeforeUnload = () => {
      sessionStorage.setItem("pickaichat_scroll", window.scrollY.toString());
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background text-foreground">
        <Hero />
        {/* Demo chat on mobile (desktop shows it in Hero) */}
        <div className="lg:hidden">
          <DemoChat />
        </div>
        <Features />
        <Technology />
        <SocialProof />
        <Pricing />
        <About />
        <FAQ />
        <ContactSection />
      </main>
    </>
  );
}