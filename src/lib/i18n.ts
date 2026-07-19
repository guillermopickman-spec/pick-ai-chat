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
    "hero.badge": "⚡ El agente AI más económico del mercado · configurable en 24h",
    "hero.title": "PickAIChat — El Hub de Agentes AI para tu Negocio",
    "hero.subtitle":
      "Un agente o varios. Escala cuando quieras. Automatiza WhatsApp, email, CRM y más — $1.",
    "hero.subtitle.highlight": "al precio más bajo del mercado.",
    "hero.description":
      "PickAIChat es un hub de agentes AI que automatiza tu negocio 24/7: responde en WhatsApp, gestiona pedidos, sincroniza con tu CRM, envía emails y mucho más. Todo desde un solo panel, por menos de lo que cuesta un café al día.",
    "hero.cta.try": "Probar el Agente",
    "hero.cta.pricing": "Ver Precios",
    "hero.cta.whatsapp": "Conectar con WhatsApp",

    /* Features */
    "features.section": "// Qué hace",
    "features.heading": "Un agente que hace más que hablar",
    "features.subtitle":
      "No es un chatbot. Es un hub de agentes AI que actúan por ti: responden, gestionan, sincronizan y automatizan tu negocio al completo.",
    "features.0.title": "Agente WhatsApp 24/7",
    "features.0.body":
      "Tu cliente escribe por WhatsApp y el agente responde al instante: precios, horarios, disponibilidad, reservas. Mientras tú duermes, él trabaja.",
    "features.1.title": "Multi-herramienta integrado",
    "features.1.body":
      "Conecta con Google Calendar, HubSpot, Gmail, Notion y más. Un solo agente que sincroniza tu CRM, gestiona pedidos y envía emails automáticamente.",
    "features.2.title": "Escalable: de 1 a N agentes",
    "features.2.body":
      "Empieza con un agente para WhatsApp. Cuando crezcas, añade más agentes: email marketing, atención al cliente, gestión de inventario. Sin límites.",
    "features.3.title": "El precio más bajo del mercado",
    "features.3.body":
      "Por menos de 30€ al mes tienes un agente AI completo. Sin costes por mensaje, sin tarifas ocultas, sin pagar por agente adicional. Imbatible.",

    /* Social Proof */
    "social.section": "// Quiénes confían",
    "social.heading": "Negocios como el tuyo ya automatizan con AI",
    "social.subtitle":
      "Próximamente: casos reales de clientes usando PickAIChat en sus negocios.",
    "social.0.name": "Carlos Mendoza",
    "social.0.role": "Dueño",
    "social.0.company": "Ferretería Mendoza",
    "social.0.quote":
      "Desde que tengo el agente en WhatsApp, no he perdido una sola venta fuera de horario. Responde como si estuviera yo.",
    "social.0.initials": "CM",
    "social.1.name": "Laura García",
    "social.1.role": "CEO",
    "social.1.company": "Clínica DentalCare",
    "social.1.quote":
      "El agente gestiona las citas por WhatsApp automáticamente. Mis pacientes contentos y yo sin estrés.",
    "social.1.initials": "LG",
    "social.2.name": "Miguel Ángel",
    "social.2.role": "Fundador",
    "social.2.company": "Pizzería Da Miguel",
    "social.2.quote":
      "Pedidos por WhatsApp, sincronizados con mi cocina, todo automático. El agente me ha cambiado el negocio.",
    "social.2.initials": "MA",

    /* How It Works */
    "howitworks.section": "// Cómo funciona",
    "howitworks.heading": "De escanear un QR a tener tu agente en 24 horas",
    "howitworks.subtitle":
      "Sin instalaciones complicadas, sin contratar informáticos, sin leer manuales. Configuras PickAIChat como configuras el WiFi de tu casa.",
    "howitworks.0.title": "Escanear QR",
    "howitworks.0.body":
      "Te damos acceso al sistema. Escaneas un código QR con tu móvil y conectas el número de WhatsApp de tu negocio. El agente ya está listo.",
    "howitworks.1.title": "Configurar tu agente",
    "howitworks.1.body":
      "Subes tus precios, horarios, productos y FAQ. El agente aprende de tu información y empieza a actuar como lo harías tú.",
    "howitworks.2.title": "A funcionar",
    "howitworks.2.body":
      "En 24 horas tu agente ya está trabajando. Responde clientes, gestiona pedidos, sincroniza datos. Tú recibes un resumen diario de todo.",

    /* Pricing */
    "pricing.section": "// Precios",
    "pricing.heading": "Planes para cada negocio",
    "pricing.subtitle":
      "Sin costes ocultos, sin tarifas por mensaje, sin pagar por agente. Elige el plan que mejor se adapte a tu negocio y empieza hoy.",
    "pricing.0.name": "Individual",
    "pricing.0.price": "29 €",
    "pricing.0.period": "/mes",
    "pricing.0.desc": "Para el autónomo o pequeño comercio que quiere un agente AI 24/7 al mejor precio.",
    "pricing.0.features": [
      "1 agente WhatsApp",
      "Chat web integrado",
      "Respuestas AI personalizadas",
      "Resumen diario de actividad",
      "Soporte por email",
    ],
    "pricing.0.cta": "Empezar",
    "pricing.1.name": "Profesional",
    "pricing.1.price": "49 €",
    "pricing.1.period": "/mes",
    "pricing.1.desc": "Para el negocio en crecimiento que necesita más agentes y canales.",
    "pricing.1.features": [
      "Hasta 3 agentes",
      "WhatsApp + Web + Email",
      "AI entrenada con tus datos",
      "Derivación a humano",
      "Panel de control",
      "Soporte prioritario",
    ],
    "pricing.1.cta": "Empezar",
    "pricing.2.name": "Enterprise",
    "pricing.2.price": "Personalizado",
    "pricing.2.period": "",
    "pricing.2.desc": "Para empresas con necesidades específicas. Agentes ilimitados, integración CRM, API, equipo dedicado.",
    "pricing.2.features": [
      "Agentes ilimitados",
      "CRM y ERP integrados",
      "API personalizada",
      "Infraestructura dedicada",
      "Soporte 24/7 prioritario",
      "Formación del equipo",
    ],
    "pricing.2.cta": "Contactar",
    "pricing.badge": "🏆 Mejor precio del mercado",

    /* Chatbot Demo */
    "chatbot.section": "// Demo en vivo",
    "chatbot.heading": "Prueba el agente en acción",
    "chatbot.subtitle":
      "Escribe cualquier pregunta que haría un cliente y mira cómo responde PickAIChat. Cambia de canal para ver cómo funciona en WhatsApp, web chat y Telegram.",
    "chatbot.config": "Configurar",
    "chatbot.channel": "canal:",
    "chatbot.thinking": "pickaichat está pensando",
    "chatbot.placeholder": "Enviar como $1…",
    "chatbot.send": "Enviar",

    /* FAQ */
    "faq.section": "// FAQ",
    "faq.heading": "¿Dudas? Resueltas.",
    "faq.subtitle": "Todo lo que necesitas saber antes de probar PickAIChat en tu negocio.",
    "faq.0.q": "¿Qué es un agente AI? ¿Es lo mismo que un chatbot?",
    "faq.0.a":
      "No. Un chatbot solo responde preguntas. Un agente AI actúa: puede gestionar pedidos, modificar reservas, sincronizar tu CRM, enviar emails y mucho más. PickAIChat es un hub de agentes: empiezas con uno y añades más cuando los necesites.",
    "faq.1.q": "¿Qué canales puede usar mi agente?",
    "faq.1.a":
      "WhatsApp, web chat y email. Un solo agente responde en todos lados. Si tu cliente te escribe por WhatsApp, le responde por WhatsApp. Si usa el chat de tu web, lo mismo. Y si necesitas más canales, añades otro agente.",
    "faq.2.q": "¿Tengo que instalar algo en mi ordenador?",
    "faq.2.a":
      "No. Solo escaneas un código QR con tu móvil para conectar tu WhatsApp. El resto funciona solo. Nosotros nos encargamos de que el sistema esté siempre activo.",
    "faq.3.q": "¿La AI alucina o inventa respuestas?",
    "faq.3.a":
      "No. La AI solo responde con la información que tú le das: tus precios, horarios, productos y FAQ. Si no sabe algo, te lo deriva a ti en lugar de inventar.",
    "faq.4.q": "¿Puedo tener varios agentes trabajando a la vez?",
    "faq.4.a":
      "Sí. PickAIChat es un hub de agentes escalable. Puedes tener un agente para WhatsApp, otro para email marketing, otro para gestión de pedidos… Todos trabajan juntos desde un solo panel. Contrata solo los que necesites.",
    "faq.5.q": "¿Cuánto cuesta mantenerlo?",
    "faq.5.a":
      "El plan mensual incluye hosting, mantenimiento y actualizaciones. No hay costes ocultos ni sorpresas. Somos el agente AI más económico del mercado, por menos de 30€ al mes.",

    /* Contact */
    "contact.section": "// Empieza ahora",
    "contact.heading": "¿Listo para que tu negocio trabaje solo?",
    "contact.subtitle":
      "Cuéntanos qué necesitas y te enviamos un plan personalizado en menos de 24 horas. Sin compromiso, sin tarjeta de crédito.",
    "contact.bullet1": "Sin tarjeta de crédito para empezar",
    "contact.bullet2": "Configuración en 24 horas",
    "contact.bullet3": "Agente AI desde 29€/mes — el mejor precio del mercado",
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
    "meta.title": "PickAIChat — Hub de Agentes AI para WhatsApp y tu negocio",
    "meta.description":
      "Hub de agentes AI para WhatsApp, web y email. Automatiza tu negocio 24/7 con el agente multi-herramienta más económico del mercado. Configuración en 24 horas.",
    "meta.ogTitle": "PickAIChat — Hub de Agentes AI para tu Negocio",
    "meta.ogDescription":
      "Tu negocio automatizado al instante. El agente AI más económico del mercado.",
    "meta.twitterDescription":
      "Tu negocio automatizado al instante con el agente AI más económico del mercado.",
  },

  en: {
    /* Navbar */
    "nav.features": "Features",
    "nav.demo": "Demo",
    "nav.pricing": "Pricing",
    "nav.faq": "FAQ",
    "nav.cta": "Get Started",

    /* Hero */
    "hero.badge": "⚡ The most affordable AI agent on the market · setup in 24h",
    "hero.title": "PickAIChat — The AI Agent Hub for Your Business",
    "hero.subtitle":
      "One agent or many. Scale as you grow. Automate WhatsApp, email, CRM and more — $1.",
    "hero.subtitle.highlight": "at the lowest price on the market.",
    "hero.description":
      "PickAIChat is an AI agent hub that automates your business 24/7: replies on WhatsApp, manages orders, syncs with your CRM, sends emails, and more. All from a single panel, for less than the price of a coffee a day.",
    "hero.cta.try": "Try the Agent",
    "hero.cta.pricing": "See Pricing",
    "hero.cta.whatsapp": "Connect with WhatsApp",

    /* Features */
    "features.section": "// What it does",
    "features.heading": "An agent that does more than talk",
    "features.subtitle":
      "Not a chatbot. It's an AI agent hub that acts for you: replies, manages, syncs, and automates your entire business.",
    "features.0.title": "24/7 WhatsApp Agent",
    "features.0.body":
      "Your customer writes on WhatsApp and the agent replies instantly: prices, hours, availability, bookings. While you sleep, it works.",
    "features.1.title": "Multi-tool Integrated",
    "features.1.body":
      "Connects with Google Calendar, HubSpot, Gmail, Notion and more. A single agent that syncs your CRM, manages orders, and sends emails automatically.",
    "features.2.title": "Scalable: 1 to N agents",
    "features.2.body":
      "Start with one agent for WhatsApp. As you grow, add more agents: email marketing, customer support, inventory management. No limits.",
    "features.3.title": "Lowest price on the market",
    "features.3.body":
      "For less than €30/month you get a full AI agent. No per-message costs, no hidden fees, no paying per extra agent. Unbeatable.",

    /* Social Proof */
    "social.section": "// Trusted by",
    "social.heading": "Businesses like yours already automate with AI",
    "social.subtitle": "Coming soon: real customer stories using PickAIChat in their businesses.",
    "social.0.name": "Carlos Mendoza",
    "social.0.role": "Owner",
    "social.0.company": "Mendoza Hardware Store",
    "social.0.quote":
      "Since I got the agent on WhatsApp, I haven't lost a single sale after hours. It answers just like I would.",
    "social.0.initials": "CM",
    "social.1.name": "Laura García",
    "social.1.role": "CEO",
    "social.1.company": "DentalCare Clinic",
    "social.1.quote":
      "The agent handles appointment booking via WhatsApp automatically. Happy patients and no stress for me.",
    "social.1.initials": "LG",
    "social.2.name": "Miguel Ángel",
    "social.2.role": "Founder",
    "social.2.company": "Da Miguel Pizzeria",
    "social.2.quote":
      "Orders via WhatsApp, synced to my kitchen, all automatic. The agent has transformed my business.",
    "social.2.initials": "MA",

    /* How It Works */
    "howitworks.section": "// How it works",
    "howitworks.heading": "From scanning a QR to having your agent in 24 hours",
    "howitworks.subtitle":
      "No complicated installations, no hiring IT people, no reading manuals. You set up PickAIChat like you set up your home WiFi.",
    "howitworks.0.title": "Scan QR",
    "howitworks.0.body":
      "We give you system access. Scan a QR code with your phone and connect your business WhatsApp number. Your agent is ready.",
    "howitworks.1.title": "Configure your agent",
    "howitworks.1.body":
      "Upload your prices, hours, products and FAQ. The agent learns from your information and starts acting just like you would.",
    "howitworks.2.title": "Go live",
    "howitworks.2.body":
      "In 24 hours your agent is already working. Replying to customers, managing orders, syncing data. You receive a daily summary of everything.",

    /* Pricing */
    "pricing.section": "// Pricing",
    "pricing.heading": "Plans for every business",
    "pricing.subtitle":
      "No hidden costs, no per-message fees, no paying per agent. Choose the plan that best fits your business and start today.",
    "pricing.0.name": "Starter",
    "pricing.0.price": "€29",
    "pricing.0.period": "/mo",
    "pricing.0.desc": "For freelancers and small shops that want an AI agent 24/7 at the best price.",
    "pricing.0.features": [
      "1 WhatsApp agent",
      "Integrated web chat",
      "Custom AI responses",
      "Daily activity summary",
      "Email support",
    ],
    "pricing.0.cta": "Get Started",
    "pricing.1.name": "Professional",
    "pricing.1.price": "€49",
    "pricing.1.period": "/mo",
    "pricing.1.desc": "For growing businesses that need more agents and channels.",
    "pricing.1.features": [
      "Up to 3 agents",
      "WhatsApp + Web + Email",
      "AI trained on your data",
      "Human handoff",
      "Dashboard",
      "Priority support",
    ],
    "pricing.1.cta": "Get Started",
    "pricing.2.name": "Enterprise",
    "pricing.2.price": "Custom",
    "pricing.2.period": "",
    "pricing.2.desc": "For companies with specific needs. Unlimited agents, CRM integration, API, dedicated team.",
    "pricing.2.features": [
      "Unlimited agents",
      "CRM and ERP integration",
      "Custom API",
      "Dedicated infrastructure",
      "24/7 priority support",
      "Team training",
    ],
    "pricing.2.cta": "Contact Us",
    "pricing.badge": "🏆 Best price on the market",

    /* Chatbot Demo */
    "chatbot.section": "// Live Demo",
    "chatbot.heading": "Try the agent in action",
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
    "faq.0.q": "What is an AI agent? Is it the same as a chatbot?",
    "faq.0.a":
      "No. A chatbot only answers questions. An AI agent acts: it can manage orders, modify bookings, sync your CRM, send emails, and much more. PickAIChat is an agent hub: start with one and add more as you need them.",
    "faq.1.q": "What channels can my agent use?",
    "faq.1.a":
      "WhatsApp, web chat, and email. A single agent answers everywhere. If your customer writes on WhatsApp, it replies on WhatsApp. If they use your website chat, same thing. Need more channels? Add another agent.",
    "faq.2.q": "Do I need to install anything on my computer?",
    "faq.2.a":
      "No. Just scan a QR code with your phone to connect your WhatsApp. Everything else works on its own. We keep the system running 24/7.",
    "faq.3.q": "Does the AI hallucinate or make things up?",
    "faq.3.a":
      "No. The AI only answers using the information you provide: your prices, hours, products, and FAQ. If it doesn't know something, it forwards it to you instead of inventing.",
    "faq.4.q": "Can I have multiple agents working at the same time?",
    "faq.4.a":
      "Yes. PickAIChat is a scalable agent hub. You can have one agent for WhatsApp, another for email marketing, another for order management… They all work together from a single panel. Only pay for what you need.",
    "faq.5.q": "How much does it cost to maintain?",
    "faq.5.a":
      "The monthly plan includes hosting, maintenance, and updates. No hidden costs or surprises. We're the most affordable AI agent on the market — less than €30/month.",

    /* Contact */
    "contact.section": "// Start now",
    "contact.heading": "Ready to let your business run itself?",
    "contact.subtitle":
      "Tell us what you need and we'll send you a custom plan in under 24 hours. No commitment, no credit card.",
    "contact.bullet1": "No credit card to start",
    "contact.bullet2": "Setup in 24 hours",
    "contact.bullet3": "AI agent from €29/month — the best price on the market",
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
    "meta.title": "PickAIChat — AI Agent Hub for WhatsApp & Your Business",
    "meta.description":
      "AI agent hub for WhatsApp, web, and email. Automate your business 24/7 with the most affordable multi-tool agent on the market. Setup in 24 hours.",
    "meta.ogTitle": "PickAIChat — AI Agent Hub for Your Business",
    "meta.ogDescription":
      "Your business automated instantly. The most affordable AI agent on the market.",
    "meta.twitterDescription":
      "Your business automated instantly with the most affordable AI agent on the market.",
  },
};

export function t(lang: Lang, key: string, ...args: string[]): string {
  const raw = translations[lang]?.[key] ?? translations["es"][key] ?? key;
  let value = typeof raw === "string" ? raw : key;
  for (let i = 0; i < args.length; i++) {
    value = value.replace(`$${i + 1}`, args[i]);
  }
  return value;
}
