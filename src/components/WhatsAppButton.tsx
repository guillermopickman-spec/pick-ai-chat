import { MessageCircle, Mail } from "lucide-react";

const WHATSAPP_NUMBER = "34640325994";
const WHATSAPP_MSG = "Hola%2C+quiero+informaci%C3%B3n+sobre+PickAIChat";
const EMAIL = "guillermopickman@gmail.com";
const EMAIL_SUBJECT = "Quiero información sobre PickAIChat";

export function WhatsAppButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
      {/* Email Button */}
      <a
        href={`mailto:${EMAIL}?subject=${encodeURIComponent(EMAIL_SUBJECT)}`}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg transition hover:bg-blue-600 hover:scale-110 hover:shadow-[0_0_24px_-4px_rgba(59,130,246,0.5)]"
        aria-label="Contactar por email"
      >
        <Mail size={22} />
      </a>
      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
        target="_blank"
        rel="noreferrer"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition hover:bg-green-600 hover:scale-110 hover:shadow-[0_0_24px_-4px_rgba(34,197,94,0.5)]"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle size={28} />
      </a>
    </div>
  );
}