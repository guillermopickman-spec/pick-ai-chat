import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    question: "¿Qué canales puedo conectar?",
    answer:
      "WhatsApp, web chat y email. Un solo asistente responde en todos lados. Si tu cliente te escribe por WhatsApp, le responde por WhatsApp. Si usa el chat de tu web, lo mismo.",
  },
  {
    question: "¿Tengo que instalar algo en mi ordenador?",
    answer:
      "No. Solo escaneas un código QR con tu móvil para conectar tu WhatsApp. El resto funciona solo. Nosotros nos encargamos de que el sistema esté siempre activo.",
  },
  {
    question: "¿La AI alucina o inventa respuestas?",
    answer:
      "No. La AI solo responde con la información que tú le das: tus precios, horarios, productos y FAQ. Si no sabe algo, te lo deriva a ti en lugar de inventar.",
  },
  {
    question: "¿Puedo seguir usando WhatsApp normal en mi móvil?",
    answer:
      "Sí. Tu WhatsApp sigue funcionando exactamente igual. PickAIChat se conecta como un 'dispositivo vinculado' adicional, igual que WhatsApp Web. No interfiere con tu uso normal.",
  },
  {
    question: "¿Qué pasa si la AI no sabe responder?",
    answer:
      "Te reenvía la conversación a ti con todo el contexto. Tú respondes y la AI aprende para la próxima. También puedes configurar horarios en los que solo respondes tú.",
  },
  {
    question: "¿Cuánto cuesta mantenerlo?",
    answer:
      "El plan mensual incluye hosting, mantenimiento y actualizaciones. No hay costes ocultos ni sorpresas. Si quieres probar antes de comprometerte, tenemos una demo gratuita.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="relative px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <div className="mb-16 text-center">
          <div className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-magenta">
            // FAQ
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">¿Dudas? Resueltas.</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Todo lo que necesitas saber antes de probar PickAIChat en tu negocio.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map(({ question, answer }) => (
            <details
              key={question}
              className="group details-marker-none rounded-xl border border-border bg-card open:border-magenta/40"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between p-5">
                <span className="pr-4 text-sm font-semibold text-foreground">{question}</span>
                <ChevronDown
                  size={18}
                  className="shrink-0 text-muted-foreground transition group-open:rotate-180"
                />
              </summary>
              <div className="px-5 pb-5">
                <p className="text-sm leading-relaxed text-muted-foreground">{answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
