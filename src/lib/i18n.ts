export type Lang = "es" | "en";

type TranslationValue = string | string[];

export const translations: Record<Lang, Record<string, TranslationValue>> = {
  es: {
    /* Navbar */
    "nav.features": "Funciones",
    "nav.demo": "Demo",
    "nav.pricing": "Precios",
    "nav.faq": "FAQ",
    "nav.cta": "Empezar",

    /* Hero */
    "hero.badge": "v1.0 · funcionando 24/7 · configuración en 24h",
    "hero.title": "PickAIChat — Asistente AI para tu negocio",
    "hero.subtitle":
      "Tu negocio responde al instante en WhatsApp — $1 AI que entiende a tus clientes.",
    "hero.subtitle.highlight": "con AI que entiende a tus clientes.",
    "hero.description":
      "PickAIChat conecta con WhatsApp, web y email para responder automáticamente las preguntas de tus clientes 24/7. Sin instalar nada, sin equipos grandes.",
    "hero.cta.try": "Probar el Chatbot",
    "hero.cta.pricing": "Ver Precios",

    /* Features */
    "features.section": "// Lo que hace",
    "features.heading": "Tu cliente pregunta, PickAIChat responde",
    "features.subtitle":
      "No es un chatbot de reglas fijas. Es una AI entrenada con TU información, que habla con el tono de TU negocio y nunca deja un mensaje sin responder.",
    "features.0.title": "WhatsApp + Web + Email",
    "features.0.body":
      "Un solo asistente AI que funciona en WhatsApp, en tu página web y por email. Tus clientes te escriben donde prefieran, el motor responde igual.",
    "features.1.title": "Responde como tu negocio",
    "features.1.body":
      "Cárgale tus precios, horarios, catálogo y FAQ. La AI responde con tu información real, no inventa. Sin entrenar, sin configurar.",
    "features.2.title": "Disponible 24/7",
    "features.2.body":
      "Mientras duermes, tu asistente sigue respondiendo. Preguntas frecuentes, disponibilidad, precios — todo al instante, siempre.",
    "features.3.title": "Escala contigo",
    "features.3.body":
      "De 10 a 10.000 mensajes al día. Añade canales, integra tu CRM, conecta con tu equipo humano cuando haga falta.",
    "features.4.title": "Sin ataduras",
    "features.4.body":
      "No pagas por agente, no pagas por mensaje. Funciona con tu propio hardware o en la nube. Tú controlas todo.",
    "features.5.title": "Configuración en 24 horas",
    "features.5.body":
      "Te damos acceso, escaneas un QR con tu móvil y el asistente ya está respondiendo. En un día laboral, no en meses.",

    /* Social Proof */
    "social.section": "// Quiénes confían",
    "social.heading": "Negocios como el tuyo ya responden con AI",
    "social.subtitle":
      "Próximamente: casos reales de clientes usando PickAIChat en sus negocios.",

    /* How It Works */
    "howitworks.section": "// Cómo funciona",
    "howitworks.heading": "De escanear un QR a tener tu asistente en 24 horas",
    "howitworks.subtitle":
      "Sin instalaciones complicadas, sin contratar informáticos, sin leer manuales. Configuras PickAIChat como configuras el WiFi de tu casa.",
    "howitworks.0.title": "Escanear QR",
    "howitworks.0.body":
      "Te damos acceso al sistema. Escaneas un código QR con tu móvil y conectas el número de WhatsApp de tu negocio. No necesitas instalar nada.",
    "howitworks.1.title": "Alimentar la AI",
    "howitworks.1.body":
      "Subes tus precios, horarios, productos y FAQ. La AI aprende de tu información y empieza a responder como lo harías tú.",
    "howitworks.2.title": "A funcionar",
    "howitworks.2.body":
      "En 24 horas tu asistente ya está respondiendo clientes. Tú recibes un resumen diario de lo que ha pasado. Sin complicaciones.",

    /* Pricing */
    "pricing.section": "// Precios",
    "pricing.heading": "Planes para cada negocio",
    "pricing.subtitle":
      "Sin costes ocultos, sin tarifas por mensaje. Elige el plan que mejor se adapte a tu negocio y empieza hoy.",
    "pricing.0.name": "Individual",
    "pricing.0.price": "29 €",
    "pricing.0.period": "/mes",
    "pricing.0.desc": "Para el autónomo o pequeño comercio que quiere responder 24/7 sin esfuerzo.",
    "pricing.0.features": [
      "1 número de WhatsApp",
      "Chat web integrado",
      "Respuestas AI personalizadas",
      "Resumen diario de actividad",
      "Soporte por email",
    ],
    "pricing.0.cta": "Empezar",
    "pricing.1.name": "Profesional",
    "pricing.1.price": "99 €",
    "pricing.1.period": "/mes",
    "pricing.1.desc": "Para el negocio en crecimiento que necesita más canales y control.",
    "pricing.1.features": [
      "WhatsApp + Web + Email",
      "Hasta 3 números de WhatsApp",
      "AI entrenada con tus datos",
      "Derivación a humano",
      "Panel de control",
      "Soporte prioritario",
    ],
    "pricing.1.cta": "Empezar",
    "pricing.2.name": "Enterprise",
    "pricing.2.price": "Personalizado",
    "pricing.2.period": "",
    "pricing.2.desc": "Para empresas con necesidades específicas. Integración CRM, API, equipo dedicado.",
    "pricing.2.features": [
      "Todo lo del plan Profesional",
      "CRM y ERP integrados",
      "API personalizada",
      "Infraestructura dedicada",
      "Soporte 24/7 prioritario",
      "Formación del equipo",
    ],
    "pricing.2.cta": "Contactar",

    /* Chatbot Demo */
    "chatbot.section": "// Demo en vivo",
    "chatbot.heading": "Prueba el asistente",
    "chatbot.subtitle":
      "Escribe cualquier pregunta que haría un cliente y mira cómo responde PickAIChat. Puedes cambiar de canal para ver cómo funciona en WhatsApp, web chat y Telegram.",
    "chatbot.config": "Configurar",
    "chatbot.channel": "canal:",
    "chatbot.thinking": "pickaichat está pensando",
    "chatbot.placeholder": "Enviar como $1…",
    "chatbot.send": "Enviar",

    /* FAQ */
    "faq.section": "// FAQ",
    "faq.heading": "¿Dudas? Resueltas.",
    "faq.subtitle": "Todo lo que necesitas saber antes de probar PickAIChat en tu negocio.",
    "faq.0.q": "¿Qué canales puedo conectar?",
    "faq.0.a":
      "WhatsApp, web chat y email. Un solo asistente responde en todos lados. Si tu cliente te escribe por WhatsApp, le responde por WhatsApp. Si usa el chat de tu web, lo mismo.",
    "faq.1.q": "¿Tengo que instalar algo en mi ordenador?",
    "faq.1.a":
      "No. Solo escaneas un código QR con tu móvil para conectar tu WhatsApp. El resto funciona solo. Nosotros nos encargamos de que el sistema esté siempre activo.",
    "faq.2.q": "¿La AI alucina o inventa respuestas?",
    "faq.2.a":
      "No. La AI solo responde con la información que tú le das: tus precios, horarios, productos y FAQ. Si no sabe algo, te lo deriva a ti en lugar de inventar.",
    "faq.3.q": "¿Puedo seguir usando WhatsApp normal en mi móvil?",
    "faq.3.a":
      "Sí. Tu WhatsApp sigue funcionando exactamente igual. PickAIChat se conecta como un 'dispositivo vinculado' adicional, igual que WhatsApp Web. No interfiere con tu uso normal.",
    "faq.4.q": "¿Qué pasa si la AI no sabe responder?",
    "faq.4.a":
      "Te reenvía la conversación a ti con todo el contexto. Tú respondes y la AI aprende para la próxima. También puedes configurar horarios en los que solo respondes tú.",
    "faq.5.q": "¿Cuánto cuesta mantenerlo?",
    "faq.5.a":
      "El plan mensual incluye hosting, mantenimiento y actualizaciones. No hay costes ocultos ni sorpresas. Si quieres probar antes de comprometerte, tenemos una demo gratuita.",

    /* Contact */
    "contact.section": "// Empieza ahora",
    "contact.heading": "¿Listo para que tu negocio responda solo?",
    "contact.subtitle":
      "Cuéntanos qué necesitas y te enviamos un plan personalizado en menos de 24 horas. Sin compromiso, sin tarjeta de crédito.",
    "contact.bullet1": "Sin tarjeta de crédito para empezar",
    "contact.bullet2": "Configuración en 24 horas",
    "contact.bullet3": "Soporte en español, de Sevilla para el mundo",
    "contact.form.name": "Nombre",
    "contact.form.namePlaceholder": "Tu nombre",
    "contact.form.email": "Email",
    "contact.form.emailPlaceholder": "tu@email.com",
    "contact.form.company": "Empresa",
    "contact.form.companyPlaceholder": "Nombre de tu negocio",
    "contact.form.message": "Mensaje",
    "contact.form.messagePlaceholder": "Cuéntanos qué necesitas...",
    "contact.form.submit": "Enviar mensaje",
    "contact.form.orEmail": "O envíanos un email directamente a",
    "contact.form.error.nameRequired": "El nombre es obligatorio",
    "contact.form.error.nameMax": "El nombre no puede superar los $1 caracteres",
    "contact.form.error.emailRequired": "El email es obligatorio",
    "contact.form.error.emailMax": "El email no puede superar los $1 caracteres",
    "contact.form.error.emailInvalid": "Introduce un email válido",
    "contact.form.error.messageRequired": "El mensaje es obligatorio",
    "contact.form.error.messageMax": "El mensaje no puede superar los $1 caracteres",
    "contact.form.success.title": "Mensaje listo en tu correo",
    "contact.form.success.body":
      "Solo tienes que darle a enviar en tu aplicación de email y te responderemos en menos de 24 horas.",
    "contact.form.success.new": "Enviar otro mensaje",
    "contact.form.subject": "PickAIChat — consulta de $1 ($2)",
    "contact.form.body": "Nombre: $1\nEmail: $2\nEmpresa: $3\n\nMensaje:\n$4",
    "contact.form.sentAs": " (Sin empresa)",
    "contact.form.na": "N/A",

    /* Footer */
    "footer.built": "Built by Guillermo Pickman —",
    "footer.role": "3D Character Artist & AI Engineer",
    "footer.made": "© 2026 PickAIChat. Hecho en Sevilla.",

    /* Meta */
    "meta.title": "PickAIChat — Asistente AI para WhatsApp de tu negocio",
    "meta.description":
      "Asistente AI para WhatsApp, web y email. Responde automáticamente a tus clientes 24/7 desde un solo motor. Configuración en 24 horas.",
    "meta.ogTitle": "PickAIChat — Asistente AI para tu negocio",
    "meta.ogDescription":
      "Tu negocio responde al instante en WhatsApp. AI que entiende a tus clientes.",
    "meta.twitterDescription":
      "Tu negocio responde al instante en WhatsApp con AI que entiende a tus clientes.",
  },

  en: {
    /* Navbar */
    "nav.features": "Features",
    "nav.demo": "Demo",
    "nav.pricing": "Pricing",
    "nav.faq": "FAQ",
    "nav.cta": "Get Started",

    /* Hero */
    "hero.badge": "v1.0 · running 24/7 · setup in 24h",
    "hero.title": "PickAIChat — AI Assistant for your Business",
    "hero.subtitle":
      "Your business replies instantly on WhatsApp — $1 that understands your customers.",
    "hero.subtitle.highlight": "with AI that understands your customers.",
    "hero.description":
      "PickAIChat connects WhatsApp, web, and email to automatically answer your customers' questions 24/7. No installation, no large teams.",
    "hero.cta.try": "Try the Chatbot",
    "hero.cta.pricing": "See Pricing",

    /* Features */
    "features.section": "// What it does",
    "features.heading": "Your customer asks, PickAIChat answers",
    "features.subtitle":
      "Not a rigid rule-based chatbot. It's AI trained on YOUR information, speaking with YOUR business tone, and never leaving a message unanswered.",
    "features.0.title": "WhatsApp + Web + Email",
    "features.0.body":
      "A single AI assistant that works on WhatsApp, your website, and email. Your customers write wherever they prefer, the engine answers the same.",
    "features.1.title": "Answers like your business",
    "features.1.body":
      "Upload your prices, hours, catalog and FAQ. The AI answers with your real information — no hallucinations. No training, no setup.",
    "features.2.title": "Available 24/7",
    "features.2.body":
      "While you sleep, your assistant keeps answering. FAQs, availability, pricing — instantly, always.",
    "features.3.title": "Scales with you",
    "features.3.body":
      "From 10 to 10,000 messages per day. Add channels, integrate your CRM, connect with your human team when needed.",
    "features.4.title": "No lock-in",
    "features.4.body":
      "No per-agent fees, no per-message charges. Runs on your own hardware or in the cloud. You stay in control.",
    "features.5.title": "Setup in 24 hours",
    "features.5.body":
      "We give you access, scan a QR with your phone, and your assistant is already answering. In a business day, not months.",

    /* Social Proof */
    "social.section": "// Trusted by",
    "social.heading": "Businesses like yours already reply with AI",
    "social.subtitle": "Coming soon: real customer stories using PickAIChat in their businesses.",

    /* How It Works */
    "howitworks.section": "// How it works",
    "howitworks.heading": "From scanning a QR to having your assistant in 24 hours",
    "howitworks.subtitle":
      "No complicated installations, no hiring IT people, no reading manuals. You set up PickAIChat like you set up your home WiFi.",
    "howitworks.0.title": "Scan QR",
    "howitworks.0.body":
      "We give you system access. Scan a QR code with your phone and connect your business WhatsApp number. No installation needed.",
    "howitworks.1.title": "Feed the AI",
    "howitworks.1.body":
      "Upload your prices, hours, products and FAQ. The AI learns from your information and starts answering just like you would.",
    "howitworks.2.title": "Go live",
    "howitworks.2.body":
      "In 24 hours your assistant is already answering customers. You receive a daily summary of what happened. No complications.",

    /* Pricing */
    "pricing.section": "// Pricing",
    "pricing.heading": "Plans for every business",
    "pricing.subtitle":
      "No hidden costs, no per-message fees. Choose the plan that best fits your business and start today.",
    "pricing.0.name": "Starter",
    "pricing.0.price": "€29",
    "pricing.0.period": "/mo",
    "pricing.0.desc": "For freelancers and small shops that want to reply 24/7 without effort.",
    "pricing.0.features": [
      "1 WhatsApp number",
      "Integrated web chat",
      "Custom AI responses",
      "Daily activity summary",
      "Email support",
    ],
    "pricing.0.cta": "Get Started",
    "pricing.1.name": "Professional",
    "pricing.1.price": "€99",
    "pricing.1.period": "/mo",
    "pricing.1.desc": "For growing businesses that need more channels and control.",
    "pricing.1.features": [
      "WhatsApp + Web + Email",
      "Up to 3 WhatsApp numbers",
      "AI trained on your data",
      "Human handoff",
      "Dashboard",
      "Priority support",
    ],
    "pricing.1.cta": "Get Started",
    "pricing.2.name": "Enterprise",
    "pricing.2.price": "Custom",
    "pricing.2.period": "",
    "pricing.2.desc": "For companies with specific needs. CRM integration, API, dedicated team.",
    "pricing.2.features": [
      "Everything in Professional",
      "CRM and ERP integration",
      "Custom API",
      "Dedicated infrastructure",
      "24/7 priority support",
      "Team training",
    ],
    "pricing.2.cta": "Contact Us",

    /* Chatbot Demo */
    "chatbot.section": "// Live Demo",
    "chatbot.heading": "Try the assistant",
    "chatbot.subtitle":
      "Type any question a customer would ask and see how PickAIChat responds. Switch channels to see it work on WhatsApp, web chat, and Telegram.",
    "chatbot.config": "Configure",
    "chatbot.channel": "channel:",
    "chatbot.thinking": "pickaichat is thinking",
    "chatbot.placeholder": "Send as $1…",
    "chatbot.send": "Send",

    /* FAQ */
    "faq.section": "// FAQ",
    "faq.heading": "Questions? Answered.",
    "faq.subtitle": "Everything you need to know before trying PickAIChat for your business.",
    "faq.0.q": "What channels can I connect?",
    "faq.0.a":
      "WhatsApp, web chat, and email. A single assistant answers everywhere. If your customer writes on WhatsApp, it replies on WhatsApp. If they use your website chat, same thing.",
    "faq.1.q": "Do I need to install anything on my computer?",
    "faq.1.a":
      "No. Just scan a QR code with your phone to connect your WhatsApp. Everything else works on its own. We keep the system running 24/7.",
    "faq.2.q": "Does the AI hallucinate or make things up?",
    "faq.2.a":
      "No. The AI only answers using the information you provide: your prices, hours, products, and FAQ. If it doesn't know something, it forwards it to you instead of inventing.",
    "faq.3.q": "Can I still use WhatsApp normally on my phone?",
    "faq.3.a":
      "Yes. Your WhatsApp works exactly as before. PickAIChat connects as an additional 'linked device', just like WhatsApp Web. It doesn't interfere with your normal use.",
    "faq.4.q": "What if the AI doesn't know how to answer?",
    "faq.4.a":
      "It forwards the conversation to you with full context. You reply and the AI learns for next time. You can also set hours when only you respond.",
    "faq.5.q": "How much does it cost to maintain?",
    "faq.5.a":
      "The monthly plan includes hosting, maintenance, and updates. No hidden costs or surprises. If you want to try before committing, we have a free demo.",

    /* Contact */
    "contact.section": "// Start now",
    "contact.heading": "Ready to let your business reply on its own?",
    "contact.subtitle":
      "Tell us what you need and we'll send you a custom plan in under 24 hours. No commitment, no credit card.",
    "contact.bullet1": "No credit card to start",
    "contact.bullet2": "Setup in 24 hours",
    "contact.bullet3": "Support in English, from Seville to the world",
    "contact.form.name": "Name",
    "contact.form.namePlaceholder": "Your name",
    "contact.form.email": "Email",
    "contact.form.emailPlaceholder": "you@email.com",
    "contact.form.company": "Company",
    "contact.form.companyPlaceholder": "Your business name",
    "contact.form.message": "Message",
    "contact.form.messagePlaceholder": "Tell us what you need...",
    "contact.form.submit": "Send message",
    "contact.form.orEmail": "Or email us directly at",
    "contact.form.error.nameRequired": "Name is required",
    "contact.form.error.nameMax": "Name cannot exceed $1 characters",
    "contact.form.error.emailRequired": "Email is required",
    "contact.form.error.emailMax": "Email cannot exceed $1 characters",
    "contact.form.error.emailInvalid": "Enter a valid email",
    "contact.form.error.messageRequired": "Message is required",
    "contact.form.error.messageMax": "Message cannot exceed $1 characters",
    "contact.form.success.title": "Message ready in your inbox",
    "contact.form.success.body":
      "Just click send in your email app and we'll reply within 24 hours.",
    "contact.form.success.new": "Send another message",
    "contact.form.subject": "PickAIChat — inquiry from $1 ($2)",
    "contact.form.body": "Name: $1\nEmail: $2\nCompany: $3\n\nMessage:\n$4",
    "contact.form.sentAs": " (No company)",
    "contact.form.na": "N/A",

    /* Footer */
    "footer.built": "Built by Guillermo Pickman —",
    "footer.role": "3D Character Artist & AI Engineer",
    "footer.made": "© 2026 PickAIChat. Made in Seville.",

    /* Meta */
    "meta.title": "PickAIChat — AI WhatsApp Assistant for your Business",
    "meta.description":
      "AI assistant for WhatsApp, web, and email. Automatically answers your customers 24/7 from a single engine. Setup in 24 hours.",
    "meta.ogTitle": "PickAIChat — AI Assistant for your Business",
    "meta.ogDescription": "Your business replies instantly on WhatsApp. AI that understands your customers.",
    "meta.twitterDescription":
      "Your business replies instantly on WhatsApp with AI that understands your customers.",
  },
};

export function t(lang: Lang, key: string, ...args: string[]): string {
  let value = translations[lang]?.[key] ?? translations["es"][key] ?? key;
  for (let i = 0; i < args.length; i++) {
    value = value.replace(`$${i + 1}`, args[i]);
  }
  return value;
}