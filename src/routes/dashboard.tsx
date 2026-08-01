import { createFileRoute, redirect, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { auth } from "@clerk/tanstack-react-start/server";
import { useUser } from "@clerk/tanstack-react-start";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { useLanguage } from "@/lib/LanguageProvider";
import { getClientAgentUrl } from "@/utils/api";
import {
  MessageSquare, Sparkles, Bot, ArrowRight, Check,
  Store, Utensils, Stethoscope, Laptop, Building2,
  ChevronRight,
} from "lucide-react";

const protectRoute = createServerFn().handler(async () => {
  const { isAuthenticated } = await auth();
  if (!isAuthenticated) {
    throw redirect({ to: "/" });
  }
  return {};
});

export const Route = createFileRoute("/dashboard")({
  beforeLoad: async () => {
    await protectRoute();
  },
  head: () => ({
    meta: [
      { title: "Dashboard — PickAIChat" },
      { name: "description", content: "Your PickAIChat dashboard." },
    ],
  }),
  component: DashboardPage,
});

/* ── Onboarding Wizard ─────────────────────────────────────────── */

type BusinessType = "restaurant" | "clinic" | "store" | "freelance" | "other";

const BUSINESS_ICONS: Record<BusinessType, React.ReactNode> = {
  restaurant: <Utensils size={24} />,
  clinic: <Stethoscope size={24} />,
  store: <Store size={24} />,
  freelance: <Laptop size={24} />,
  other: <Building2 size={24} />,
};

const BUSINESS_LABELS: Record<BusinessType, string> = {
  restaurant: "Restaurant / Café",
  clinic: "Clinic / Office",
  store: "Store / Shop",
  freelance: "Freelance",
  other: "Other",
};

const BUSINESS_LABELS_ES: Record<BusinessType, string> = {
  restaurant: "Restaurante / Cafetería",
  clinic: "Clínica / Consultorio",
  store: "Tienda / Comercio",
  freelance: "Freelance",
  other: "Otro",
};

function OnboardingWizard({ onComplete }: { onComplete: (data: OnboardingData) => void }) {
  const { lang } = useLanguage();
  const isES = lang === "es";
  const labels = isES ? BUSINESS_LABELS_ES : BUSINESS_LABELS;
  const [step, setStep] = useState(0);
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState<BusinessType | null>(null);
  const [goal, setGoal] = useState("");

  return (
    <div className="mx-auto max-w-lg">
      {/* Steps indicator */}
      <div className="mb-10 flex items-center justify-center gap-2">
        {[0, 1, 2].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition ${
                s < step
                  ? "bg-magenta text-white"
                  : s === step
                    ? "border-2 border-magenta text-magenta"
                    : "border border-border text-muted-foreground"
              }`}
            >
              {s < step ? <Check size={14} /> : s + 1}
            </div>
            {s < 2 && <div className={`h-px w-10 ${s < step ? "bg-magenta" : "bg-border"}`} />}
          </div>
        ))}
      </div>

      {step === 0 && (
        <div className="text-center">
          <Sparkles size={40} className="mx-auto mb-4 text-magenta" />
          <h2 className="mb-2 text-2xl font-bold text-foreground">
            {isES ? "¡Bienvenido a PickAIChat! 🎉" : "Welcome to PickAIChat! 🎉"}
          </h2>
          <p className="mb-8 text-sm text-muted-foreground">
            {isES
              ? "En 3 pasos tendrás tu agente AI listo para atender a tus clientes."
              : "In 3 steps your AI agent will be ready to serve your customers."}
          </p>

          <div className="mb-8 space-y-4 text-left">
            {[
              { icon: <Store size={18} />, title: isES ? "¿Qué tipo de negocio eres?" : "What type of business?", desc: isES ? "Cuéntanos sobre ti" : "Tell us about yourself" },
              { icon: <Bot size={18} />, title: isES ? "Personaliza tu agente" : "Customize your agent", desc: isES ? "Elige cómo hablará" : "Choose how it talks" },
              { icon: <MessageSquare size={18} />, title: isES ? "¡Ya está en vivo!" : "You're live!", desc: isES ? "Empieza a conversar" : "Start chatting" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-magenta/10 text-magenta">
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setStep(1)}
            className="inline-flex items-center gap-2 rounded-lg bg-magenta px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
          >
            {isES ? "Empezar" : "Let's Start"}
            <ArrowRight size={16} />
          </button>
        </div>
      )}

      {step === 1 && (
        <div>
          <h2 className="mb-6 text-center text-xl font-bold text-foreground">
            {isES ? "Cuéntanos sobre tu negocio" : "Tell us about your business"}
          </h2>

          {/* Business Name */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-foreground">
              {isES ? "Nombre del negocio" : "Business name"}
            </label>
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder={isES ? "Ej: Ferretería Mendoza" : "e.g. Mendoza Hardware"}
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-magenta focus:outline-none"
            />
          </div>

          {/* Business Type */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-foreground">
              {isES ? "Tipo de negocio" : "Business type"}
            </label>
            <div className="grid grid-cols-2 gap-3">
              {(Object.keys(BUSINESS_ICONS) as BusinessType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => setBusinessType(type)}
                  className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-sm transition ${
                    businessType === type
                      ? "border-magenta bg-magenta/5 text-magenta"
                      : "border-border bg-card text-muted-foreground hover:border-magenta/40"
                  }`}
                >
                  {BUSINESS_ICONS[type]}
                  <span className="text-xs font-medium">{labels[type]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Goal */}
          <div className="mb-8">
            <label className="mb-2 block text-sm font-medium text-foreground">
              {isES ? "¿Qué necesitas?" : "What do you need?"}
            </label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-magenta focus:outline-none"
            >
              <option value="">{isES ? "Selecciona una opción..." : "Select an option..."}</option>
              <option value="faq">{isES ? "Responder preguntas frecuentes" : "Answer FAQs"}</option>
              <option value="orders">{isES ? "Tomar pedidos / reservas" : "Take orders / bookings"}</option>
              <option value="support">{isES ? "Atención al cliente" : "Customer support"}</option>
              <option value="all">{isES ? "Todo lo anterior" : "All of the above"}</option>
            </select>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setStep(0)}
              className="rounded-lg border border-border px-5 py-3 text-sm font-medium text-muted-foreground transition hover:text-foreground"
            >
              {isES ? "Atrás" : "Back"}
            </button>
            <button
              onClick={() => setStep(2)}
              disabled={!businessName || !businessType || !goal}
              className="inline-flex items-center gap-2 rounded-lg bg-magenta px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-40"
            >
              {isES ? "Siguiente" : "Next"}
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10">
            <Check size={40} className="text-green-500" />
          </div>
          <h2 className="mb-2 text-2xl font-bold text-foreground">
            {isES ? "¡Todo listo! 🎉" : "All set! 🎉"}
          </h2>
          <p className="mb-2 text-sm text-muted-foreground">
            {isES
              ? `Tu agente AI para ${businessName} está configurado.`
              : `Your AI agent for ${businessName} is configured.`}
          </p>
          <p className="mb-8 text-sm text-muted-foreground">
            {isES
              ? "Ahora ve al chat y empieza a conversar con tu agente."
              : "Now go to the chat and start talking to your agent."}
          </p>

          <div className="mb-8 space-y-3 text-left">
            <div className="flex items-center gap-3 rounded-lg border border-border/50 bg-card/30 p-3 text-sm text-muted-foreground">
              <Check size={16} className="text-green-500 shrink-0" />
              {isES ? `Negocio: ${businessName}` : `Business: ${businessName}`}
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-border/50 bg-card/30 p-3 text-sm text-muted-foreground">
              <Check size={16} className="text-green-500 shrink-0" />
              {isES ? `Tipo: ${labels[businessType!]}` : `Type: ${labels[businessType!]}`}
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-border/50 bg-card/30 p-3 text-sm text-muted-foreground">
              <Check size={16} className="text-green-500 shrink-0" />
              {isES ? `Objetivo: ${goal === "faq" ? "Responder preguntas" : goal === "orders" ? "Pedidos" : goal === "support" ? "Soporte" : "Todo"}` : `Goal: ${goal === "faq" ? "Answer FAQs" : goal === "orders" ? "Orders" : goal === "support" ? "Support" : "All"}`}
            </div>
          </div>

          <button
            onClick={() => onComplete({ businessName, businessType: businessType!, goal })}
            className="inline-flex items-center gap-2 rounded-lg bg-magenta px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
          >
            {isES ? "Ir al Dashboard" : "Go to Dashboard"}
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}

/* ── Onboarding Data ────────────────────────────────────────────── */

interface OnboardingData {
  businessName: string;
  businessType: BusinessType;
  goal: string;
}

/* ── Dashboard ──────────────────────────────────────────────────── */

function Dashboard() {
  const { t, lang } = useLanguage();
  const isES = lang === "es";
  const { user } = useUser();
  const canUsePaidChat =
    user?.primaryEmailAddress?.emailAddress === "pickaichat@gmail.com" ||
    (user?.publicMetadata as { plan?: string } | undefined)?.plan === "paid" ||
    (user?.primaryEmailAddress?.emailAddress
      ? getClientAgentUrl(user.primaryEmailAddress.emailAddress) !== undefined
      : false);
  const email = user?.primaryEmailAddress?.emailAddress ?? "";
  const [onboarding, setOnboarding] = useState<OnboardingData | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("pickaichat_onboarding");
    if (saved) {
      try { setOnboarding(JSON.parse(saved)); } catch { /* ignore */ }
    }
  }, []);

  const handleOnboardingComplete = (data: OnboardingData) => {
    localStorage.setItem("pickaichat_onboarding", JSON.stringify(data));
    setOnboarding(data);
  };

  const resetOnboarding = () => {
    localStorage.removeItem("pickaichat_onboarding");
    setOnboarding(null);
  };

  // Show onboarding if not completed
  if (!onboarding) {
    return <OnboardingWizard onComplete={handleOnboardingComplete} />;
  }

  const initials = email[0]?.toUpperCase() || "?";

  return (
    <div>
      {/* Welcome Header */}
      <div className="mb-8 rounded-2xl border border-border bg-gradient-to-br from-card to-card/50 p-6 sm:p-8">
        <div className="flex items-start justify-between">
          <div>
            <div className="mb-1 font-mono text-xs uppercase tracking-[0.2em] text-magenta">
              // Dashboard
            </div>
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
              {isES ? `¡Hola de nuevo!` : `Welcome back!`}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {isES
                ? `Tu agente AI para ${onboarding.businessName} está activo.`
                : `Your AI agent for ${onboarding.businessName} is live.`}
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-magenta/10 text-lg font-bold text-magenta">
            {initials}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-xl border border-border/50 bg-background/50 p-4">
            <MessageSquare size={18} className="mb-2 text-magenta" />
            <p className="text-2xl font-bold text-foreground">0</p>
            <p className="text-xs text-muted-foreground">{isES ? "Conversaciones" : "Conversations"}</p>
          </div>
          <div className="rounded-xl border border-border/50 bg-background/50 p-4">
            <Bot size={18} className="mb-2 text-magenta" />
            <p className="text-2xl font-bold text-foreground">1</p>
            <p className="text-xs text-muted-foreground">{isES ? "Agentes activos" : "Active agents"}</p>
          </div>
          <div className="rounded-xl border border-border/50 bg-background/50 p-4">
            <Sparkles size={18} className="mb-2 text-magenta" />
            <p className="text-2xl font-bold text-foreground">10</p>
            <p className="text-xs text-muted-foreground">{isES ? "Mensajes gratis" : "Free messages"}</p>
          </div>
          <div className="rounded-xl border border-border/50 bg-background/50 p-4">
            <Check size={18} className="mb-2 text-green-500" />
            <p className="text-2xl font-bold text-foreground">{isES ? "Activo" : "Active"}</p>
            <p className="text-xs text-muted-foreground">{isES ? "Estado" : "Status"}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          {isES ? "Acciones rápidas" : "Quick Actions"}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            to={canUsePaidChat ? "/chat" : "/free-chat"}
            className="group flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition hover:border-magenta/40 hover:-translate-y-0.5"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-magenta/10 text-magenta group-hover:bg-magenta/20 transition">
              <MessageSquare size={22} />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                {isES ? "Ir al Chat" : "Go to Chat"}
              </p>
              <p className="text-xs text-muted-foreground">
                {isES ? "Conversa con tu agente AI" : "Chat with your AI agent"}
              </p>
            </div>
            <ChevronRight size={18} className="ml-auto text-muted-foreground" />
          </Link>

          <button
            onClick={resetOnboarding}
            className="group flex items-center gap-4 rounded-xl border border-border bg-card p-5 text-left transition hover:border-magenta/40 hover:-translate-y-0.5"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-magenta/10 text-magenta group-hover:bg-magenta/20 transition">
              <Bot size={22} />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                {isES ? "Reconfigurar" : "Reconfigure"}
              </p>
              <p className="text-xs text-muted-foreground">
                {isES ? "Cambiar la configuración de tu agente" : "Change your agent settings"}
              </p>
            </div>
            <ChevronRight size={18} className="ml-auto text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Business Info Card */}
      <div className="rounded-xl border border-border bg-card p-5">
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          {isES ? "Tu negocio" : "Your Business"}
        </h2>
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between rounded-lg bg-background/50 px-4 py-3">
            <span className="text-muted-foreground">{isES ? "Nombre" : "Name"}</span>
            <span className="font-medium text-foreground">{onboarding.businessName}</span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-background/50 px-4 py-3">
            <span className="text-muted-foreground">{isES ? "Tipo" : "Type"}</span>
            <span className="font-medium text-foreground">{(isES ? BUSINESS_LABELS_ES : BUSINESS_LABELS)[onboarding.businessType]}</span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-background/50 px-4 py-3">
            <span className="text-muted-foreground">{isES ? "Objetivo" : "Goal"}</span>
            <span className="font-medium text-foreground">{onboarding.goal}</span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-background/50 px-4 py-3">
            <span className="text-muted-foreground">{isES ? "Plan" : "Plan"}</span>
            <span className="font-medium text-foreground">{isES ? "Gratis" : "Free"}</span>
          </div>
        </div>
      </div>

      {/* Upgrade prompt */}
      <div className="mt-8 rounded-xl border border-magenta/20 bg-magenta/5 p-5 text-center">
        <p className="text-sm text-muted-foreground">
          {isES
            ? "¿Necesitas más capacidad? Ve los planes disponibles."
            : "Need more capacity? Check out our plans."}
        </p>
        <Link
          to="/pricing"
          className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-magenta hover:underline"
        >
          {isES ? "Ver planes" : "View plans"}
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}

/* ── Page Layout ────────────────────────────────────────────────── */

function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 px-4 pt-24 pb-16">
        <div className="mx-auto max-w-4xl">
          <Dashboard />
        </div>
      </main>
    </div>
  );
}