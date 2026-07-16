import { Cable, Sliders, Rocket } from "lucide-react";

const STEPS = [
  {
    icon: Cable,
    number: "01",
    title: "Escanear QR",
    body: "Te damos acceso al sistema. Escaneas un código QR con tu móvil y conectas el número de WhatsApp de tu negocio. No necesitas instalar nada.",
  },
  {
    icon: Sliders,
    number: "02",
    title: "Alimentar la AI",
    body: "Subes tus precios, horarios, productos y FAQ. La AI aprende de tu información y empieza a responder como lo harías tú.",
  },
  {
    icon: Rocket,
    number: "03",
    title: "A funcionar",
    body: "En 24 horas tu asistente ya está respondiendo clientes. Tú recibes un resumen diario de lo que ha pasado. Sin complicaciones.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <div className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-magenta">
            // Cómo funciona
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            De escanear un QR a tener tu asistente en 24 horas
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Sin instalaciones complicadas, sin contratar informáticos, sin leer manuales.
            Configuras PickAIChat como configuras el WiFi de tu casa.
          </p>
        </div>

        <div className="relative">
          <div
            aria-hidden
            className="absolute top-12 left-0 right-0 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent md:block"
          />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {STEPS.map(({ icon: Icon, number, title, body }) => (
              <div key={title} className="relative flex flex-col items-center text-center">
                <div className="relative z-10 mb-6 flex h-24 w-24 flex-col items-center justify-center rounded-full border border-border bg-card">
                  <span className="font-mono text-xs text-magenta">{number}</span>
                  <Icon size={20} className="mt-1 text-foreground" strokeWidth={1.75} />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{title}</h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
