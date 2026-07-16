import { Cable, Brain, ShieldCheck, Layers, Shuffle, Rocket, type LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  body: string;
}

const FEATURES: Feature[] = [
  {
    icon: Cable,
    title: "WhatsApp + Web + Email",
    body: "Un solo asistente AI que funciona en WhatsApp, en tu página web y por email. Tus clientes te escriben donde prefieran, el motor responde igual.",
  },
  {
    icon: Brain,
    title: "Responde como tu negocio",
    body: "Cárgale tus precios, horarios, catálogo y FAQ. La AI responde con tu información real, no inventa. Sin entrenar, sin configurar.",
  },
  {
    icon: ShieldCheck,
    title: "Disponible 24/7",
    body: "Mientras duermes, tu asistente sigue respondiendo. Preguntas frecuentes, disponibilidad, precios — todo al instante, siempre.",
  },
  {
    icon: Layers,
    title: "Escala contigo",
    body: "De 10 a 10.000 mensajes al día. Añade canales, integra tu CRM, conecta con tu equipo humano cuando haga falta.",
  },
  {
    icon: Shuffle,
    title: "Sin ataduras",
    body: "No pagas por agente, no pagas por mensaje. Funciona con tu propio hardware o en la nube. Tú controlas todo.",
  },
  {
    icon: Rocket,
    title: "Configuración en 24 horas",
    body: "Te damos acceso, escaneas un QR con tu móvil y el asistente ya está respondiendo. En un día laboral, no en meses.",
  },
];

export function Features() {
  return (
    <section id="features" className="relative px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <div className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-magenta">
            // Lo que hace
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Tu cliente pregunta, PickAIChat responde
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            No es un chatbot de reglas fijas. Es una AI entrenada con TU información, que habla con
            el tono de TU negocio y nunca deja un mensaje sin responder.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition hover:border-magenta/50 hover:-translate-y-0.5"
            >
              <div
                aria-hidden
                className="absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition group-hover:opacity-100"
                style={{ background: "var(--magenta)" }}
              />
              <div className="relative">
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-background text-magenta">
                  <Icon size={20} strokeWidth={1.75} />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
