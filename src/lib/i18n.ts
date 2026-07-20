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
    "hero.badge": "⚡ Prueba 7 días gratis · agente AI desde 79€/mes",
    "hero.title": "PickAIChat — El Hub de Agentes AI para tu Negocio",
    "hero.subtitle":
      "Un agente o varios. Escala cuando quieras. Automatiza WhatsApp, email, CRM y más — $1.",
    "hero.subtitle.highlight": "con precios fijos desde 79€/mes.",
    "hero.description":
      "PickAIChat es un hub de agentes AI que automatiza tu negocio 24/7: responde en WhatsApp, gestiona pedidos, sincroniza con tu CRM, envía emails y mucho más. Todo desde un solo panel, por menos de lo que cuesta un café al día.",
    "hero.motto": "Contrata un humano, recibe una IA que trabaja.",
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
    "features.3.title": "7 días de prueba gratis",
    "features.3.body":
      "Prueba PickAIChat durante 7 días sin tarjeta de crédito. Agente completo en WhatsApp y web. Sin compromiso, sin riesgo.",

    /* Social Proof */
    "social.section": "// Quiénes confían",
    "social.heading": "Negocios como el tuyo ya automatizan con AI",
    "social.subtitle":
      "Historias reales de negocios que ya automatizan con PickAIChat.",
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
      "Sin costes ocultos, sin tarifas por mensaje. Precios fijos, sin sorpresas.",
    "pricing.trial.name": "Prueba Gratis — 7 Días",
    "pricing.trial.desc": "Sin tarjeta de crédito. Agente completo en WhatsApp + web. Configuración en 24h.",
    "pricing.trial.cta": "Probar Gratis",
    "pricing.1.name": "Starter",
    "pricing.1.price": "79 €",
    "pricing.1.period": "/mes",
    "pricing.1.desc": "Para el autónomo o pequeño comercio que quiere su primer agente AI.",
    "pricing.1.features": [
      "1 agente WhatsApp",
      "Chat web integrado",
      "Respuestas AI personalizadas",
      "Hasta 1.000 mensajes/mes",
      "Resumen diario de actividad",
      "Soporte por email",
    ],
    "pricing.1.cta": "Empezar",
    "pricing.2.name": "Business",
    "pricing.2.price": "149 €",
    "pricing.2.period": "/mes",
    "pricing.2.desc": "Para el negocio en crecimiento que necesita más canales y capacidad.",
    "pricing.2.features": [
      "2 agentes",
      "WhatsApp + Web + Email",
      "AI entrenada con tus datos",
      "Hasta 5.000 mensajes/mes",
      "Derivación a humano",
      "Panel de control",
      "Soporte prioritario",
    ],
    "pricing.2.cta": "Empezar",
    "pricing.3.name": "Pro",
    "pricing.3.price": "299 €",
    "pricing.3.period": "/mes",
    "pricing.3.desc": "Para empresas que necesitan capacidad total y atención dedicada.",
    "pricing.3.features": [
      "Agentes ilimitados",
      "WhatsApp + Web + Email + Telegram",
      "CRM y herramientas integradas",
      "Mensajes ilimitados",
      "API personalizada",
      "Infraestructura dedicada",
      "Soporte 24/7 prioritario",
    ],
    "pricing.3.cta": "Contactar",
    "pricing.badge": "🏆 Más popular",

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
      "El plan mensual incluye hosting, mantenimiento y actualizaciones. No hay costes ocultos ni sorpresas. Precios desde 79€/mes.",

    /* Contact */
    "contact.section": "// Empieza ahora",
    "contact.heading": "¿Listo para que tu negocio trabaje solo?",
    "contact.subtitle":
      "Cuéntanos qué necesitas y te enviamos un plan personalizado en menos de 24 horas. Sin compromiso, sin tarjeta de crédito.",
    "contact.bullet1": "Sin tarjeta de crédito para empezar",
    "contact.bullet2": "Configuración en 24 horas",
    "contact.bullet3": "Agente AI desde 79€/mes — prueba 7 días gratis",
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

    /* About */
    "about.section": "// Quién está detrás",
    "about.heading": "Un humano, una misión: simplificar la AI para tu negocio",
    "about.body":
      "PickAIChat nació de una idea simple: la AI debería funcionar para el negocio, no al revés. Sin contratos complicados, sin jerga técnica, sin equipos de ingenieros.\n\nSoy Guillermo, creador de PickAIChat. Llevo años construyendo sistemas AI, pero viendo cómo la tecnología se queda solo en manos de grandes empresas. PickAIChat es mi forma de poner agentes AI al alcance de cualquier negocio — desde una ferretería hasta una clínica dental.\n\nEl modelo es sencillo: contratas un humano que entiende de AI, y recibes un sistema que trabaja por ti 24/7. Sin que tengas que aprender nada nuevo.",
    "about.cta": "Hablar con Guillermo",

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
    "hero.badge": "⚡ Try 7 days free · AI agent from €79/mo",
    "hero.title": "PickAIChat — The AI Agent Hub for Your Business",
    "hero.subtitle":
      "One agent or many. Scale as you grow. Automate WhatsApp, email, CRM and more — $1.",
    "hero.subtitle.highlight": "with fixed pricing from €79/mo.",
    "hero.description":
      "PickAIChat is an AI agent hub that automates your business 24/7: replies on WhatsApp, manages orders, syncs with your CRM, sends emails, and more. All from a single panel, for less than the price of a coffee a day.",
    "hero.motto": "Hire a human, get an AI that delivers.",
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
    "features.3.title": "7 days free trial",
    "features.3.body":
      "Try PickAIChat for 7 days with no credit card. Full WhatsApp and web agent. No commitment, no risk.",

    /* Social Proof */
    "social.section": "// Trusted by",
    "social.heading": "Businesses like yours already automate with AI",
    "social.subtitle": "Real stories from businesses already automating with PickAIChat.",
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
      "No hidden costs, no per-message fees. Fixed pricing, no surprises.",
    "pricing.trial.name": "Free Trial — 7 Days",
    "pricing.trial.desc": "No credit card needed. Full WhatsApp + web agent. Setup in 24h.",
    "pricing.trial.cta": "Try Free",
    "pricing.1.name": "Starter",
    "pricing.1.price": "€79",
    "pricing.1.period": "/mo",
    "pricing.1.desc": "For freelancers and small shops wanting their first AI agent.",
    "pricing.1.features": [
      "1 WhatsApp agent",
      "Integrated web chat",
      "Custom AI responses",
      "Up to 1,000 messages/mo",
      "Daily activity summary",
      "Email support",
    ],
    "pricing.1.cta": "Get Started",
    "pricing.2.name": "Business",
    "pricing.2.price": "€149",
    "pricing.2.period": "/mo",
    "pricing.2.desc": "For growing businesses needing more channels and capacity.",
    "pricing.2.features": [
      "2 agents",
      "WhatsApp + Web + Email",
      "AI trained on your data",
      "Up to 5,000 messages/mo",
      "Human handoff",
      "Dashboard",
      "Priority support",
    ],
    "pricing.2.cta": "Get Started",
    "pricing.3.name": "Pro",
    "pricing.3.price": "€299",
    "pricing.3.period": "/mo",
    "pricing.3.desc": "For companies needing full capacity and dedicated attention.",
    "pricing.3.features": [
      "Unlimited agents",
      "WhatsApp + Web + Email + Telegram",
      "CRM and tool integrations",
      "Unlimited messages",
      "Custom API",
      "Dedicated infrastructure",
      "24/7 priority support",
    ],
    "pricing.3.cta": "Contact Us",
    "pricing.badge": "🏆 Most popular",

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
      "The monthly plan includes hosting, maintenance, and updates. No hidden costs or surprises. Pricing from €79/month.",

    /* Contact */
    "contact.section": "// Start now",
    "contact.heading": "Ready to let your business run itself?",
    "contact.subtitle":
      "Tell us what you need and we'll send you a custom plan in under 24 hours. No commitment, no credit card.",
    "contact.bullet1": "No credit card to start",
    "contact.bullet2": "Setup in 24 hours",
    "contact.bullet3": "AI agent from €79/month — try 7 days free",
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

    /* About */
    "about.section": "// Who's behind this",
    "about.heading": "A human with one mission: make AI simple for your business",
    "about.body":
      "PickAIChat was born from a simple idea: AI should work for the business, not the other way around. No complicated contracts, no tech jargon, no engineering teams.\n\nI'm Guillermo, creator of PickAIChat. I've spent years building AI systems, watching the technology stay locked inside big companies. PickAIChat is my way of putting AI agents within reach of any business — from a hardware store to a dental clinic.\n\nThe model is simple: you hire a human who understands AI, and you get a system that works for you 24/7. Without having to learn anything new.",
    "about.cta": "Talk to Guillermo",

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
