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
    "hero.badge": "⚡ Prueba 7 días gratis · AI asequible para tu negocio",
    "hero.title": "PickAIChat — El Hub de Agentes AI para tu Negocio",
    "hero.subtitle":
      "Un agente o varios. Escala cuando quieras. Automatiza WhatsApp, email, CRM y más.",
    "hero.subtitle.highlight": "planes flexibles y asequibles.",
    "hero.description":
      "PickAIChat es un hub de agentes AI que automatiza tu negocio 24/7: responde en WhatsApp, gestiona pedidos, sincroniza con tu CRM, envía emails y mucho más. AI asequible, sin contratos complicados.",
    "hero.motto": "Contrata un humano, recibe una IA que trabaja.",
    "hero.cta.try": "Probar el Agente",
    "hero.cta.pricing": "Contactar",
    "hero.cta.whatsapp": "Conectar con WhatsApp",
    "hero.cta.models": "Ver modelos",

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
    "social.0.name": "José Wilson",
    "social.0.role": "Fundador",
    "social.0.company": "Come2Ireland",
    "social.0.quote":
      "El agente atiende a mis clientes por email y web 24/7 y me avisa de cada consulta. Yo no tengo que estar pendiente — todo llega y se responde solo.",
    "social.0.initials": "JW",
    "social.1.name": "Una arrendadora",
    "social.1.role": "Pequeña propietaria",
    "social.1.company": "Pisos en alquiler",
    "social.1.quote":
      "Gestiono mis pisos con el agente: contesta dudas de los inquilinos, coordina visitas y me avisa de cada cosa. Casi no tengo que hacer nada.",
    "social.1.initials": "AR",
    "social.2.name": "Un hostelero",
    "social.2.role": "Dueño",
    "social.2.company": "Bar local",
    "social.2.quote":
      "El agente responde y toma reservas por el móvil aunque esté en la barra. Mis clientes siempre encuentran respuesta al momento.",
    "social.2.initials": "DU",

    /* How It Works */
    "howitworks.section": "// Cómo funciona",
    "howitworks.heading": "De contarnos tu negocio a tener tu agente en 24 horas",
    "howitworks.subtitle":
      "Sin instalaciones complicadas, sin contratar informáticos, sin leer manuales. Nosotros nos encargamos de todo por ti.",
    "howitworks.0.title": "Cuéntanos tu negocio",
    "howitworks.0.body":
      "Una llamada corta o un mensaje. Nos hablas de tu negocio, tus clientes y qué quieres automatizar. Nosotros hacemos el resto.",
    "howitworks.1.title": "Te lo montamos nosotros",
    "howitworks.1.body":
      "Configuramos tu agente con tus precios, horarios, productos y FAQ. Lo dejamos listo para que responda como lo harías tú, en los canales que uses.",
    "howitworks.2.title": "A funcionar",
    "howitworks.2.body":
      "En 24 horas tu agente ya está trabajando. Responde clientes, gestiona pedidos, sincroniza datos. Tú recibes un resumen diario de todo, y te acompañamos en el camino.",

    /* Pricing */
    "pricing.section": "// Precios",
    "pricing.heading": "Planes para cada negocio",
    "pricing.subtitle":
      "Cada negocio es único. Cuéntanos qué necesitas y te preparamos un plan a medida.",
    "pricing.0.name": "Gratis",
    "pricing.0.price": "0 €",
    "pricing.0.period": "/mes",
    "pricing.0.desc": "Para probar el agente sin compromiso. Modelos gratuitos de OpenRouter, capacidad limitada.",
    "pricing.0.features": [
      "1 agente WhatsApp",
      "Chat web integrado",
      "Modelos OpenRouter gratuitos",
      "Hasta 500 mensajes/mes",
      "Sin tarjeta de crédito",
    ],
    "pricing.0.cta": "Empezar Gratis",
    "pricing.trial.name": "Prueba Gratis — 7 Días",
    "pricing.trial.desc": "Sin tarjeta de crédito. Agente completo en WhatsApp + web. Configuración en 24h.",
    "pricing.trial.cta": "Probar Gratis",
    "pricing.1.name": "Starter",
    "pricing.1.price": "29 €",
    "pricing.1.period": "/mes",
    "pricing.1.model": "🧠 DeepSeek V4 incluido",
    "pricing.1.desc": "Para el autónomo o pequeño comercio que quiere su primer agente AI profesional.",
    "pricing.1.features": [
      "1 agente WhatsApp",
      "Chat web integrado",
      "Respuestas AI personalizadas",
      "Hasta 2.000 mensajes/mes",
      "Resumen diario de actividad",
      "Soporte por email",
    ],
    "pricing.1.cta": "Empezar",
    "pricing.2.name": "Business",
    "pricing.2.price": "79 €",
    "pricing.2.period": "/mes",
    "pricing.2.model": "🧠 DeepSeek V4 incluido",
    "pricing.2.desc": "Para el negocio en crecimiento que necesita más canales y capacidad.",
    "pricing.2.features": [
      "3 agentes",
      "WhatsApp + Web + Email",
      "AI entrenada con tus datos",
      "Hasta 8.000 mensajes/mes",
      "Derivación a humano",
      "Panel de control",
      "Soporte prioritario",
    ],
    "pricing.2.cta": "Elegir Business",
    "pricing.3.name": "Pro",
    "pricing.3.price": "199 €",
    "pricing.3.period": "/mes",
    "pricing.3.model": "🧠 DeepSeek V4 incluido",
    "pricing.3.desc": "Para empresas que necesitan capacidad total y atención dedicada.",
    "pricing.3.features": [
      "10 agentes",
      "WhatsApp + Web + Email + Telegram",
      "CRM y herramientas integradas",
      "Hasta 25.000 mensajes/mes",
      "API personalizada",
      "Infraestructura dedicada",
      "Soporte 24/7 prioritario",
    ],
    "pricing.3.cta": "Elegir Pro",
    "pricing.badge": "🏆 Más popular",
    "pricing.upgrades.title": "🚀 Mejora tu modelo",
    "pricing.upgrades.desc": "Elige el modelo que prefieras. Disponible como añadido a cualquier plan.",
    "pricing.upgrades.options": [
      "DeepSeek V4",
      "Claude Sonnet",
    ],
    "pricing.addons.title": "📱 Extras disponibles",
    "pricing.addons.desc": "WhatsApp incluido en todos los planes. Añade más capacidad o canales extra a tu plan.",
    "pricing.addons.options": [
      "WhatsApp Business incluido en tu plan",
    ],
    "pricing.disclaimer":
      "WhatsApp está incluido en todos los planes. El uso razonable está cubierto; el uso excesivo (volumen anormalmente alto de mensajes) se cobrará aparte según el coste real.",

    /* Get Started — hand-holding / service layer */
    "getstarted.section": "// Te acompañamos",
    "getstarted.heading": "No estás solo: te lo montamos nosotros",
    "getstarted.subtitle":
      "Contrata y empieza. Nosotros configuramos tu agente, te enseñamos a usarlo y seguimos a tu lado. Humanidad hoy, tutoriales y automatización mañana.",
    "getstarted.0.title": "Llamada de configuración 1:1",
    "getstarted.0.body":
      "Una llamada personal para entender tu negocio y montar tu agente a tu medida. Tú hablas, nosotros hacemos.",
    "getstarted.1.title": "Onboarding en grupo",
    "getstarted.1.body":
      "Sesiones grupales con otros negocios nuevos: configuramos juntos y resolvemos dudas en directo.",
    "getstarted.2.title": "Puertas abiertas",
    "getstarted.2.body":
      "Fechas recurrentes cada mes para pasar, preguntar y mejorar tu agente. Sin compromiso.",
    "getstarted.3.title": "Tutoriales",
    "getstarted.3.body":
      "Vídeos y guías paso a paso para que algún día lo hagas tú solo. Aprendizaje bajo demanda.",
    "getstarted.banner.title": "Concierge de verdad",
    "getstarted.banner.body":
      "A diferencia de un simple SaaS, tenemos a una persona que te configura el agente y te acompaña. Preferimos un trato cercano y que funcione.",
    "getstarted.banner.cta": "Empezar hoy",

    /* Payment methods */
    "payment.title": "💳 Cómo pagar",
    "payment.desc": "Sin empresa ni autónomo: paga con tu cuenta personal. Elige el método que prefieras.",
    "payment.copied": "¡Copiado!",

    /* Chatbot Demo */
    "chatbot.section": "// Demo en vivo",
    "chatbot.heading": "Prueba el agente en acción",
    "chatbot.subtitle":
      "Escribe cualquier pregunta que haría un cliente y mira cómo responde PickAIChat. Cambia de canal para ver cómo funciona en WhatsApp, web chat y Telegram.",
    "chatbot.config": "Configurar",
    "chatbot.channel": "canal:",
    "chatbot.thinking": "pickaichat está pensando",
    "chatbot.placeholder": "Escribe un mensaje…",
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
      "El plan mensual incluye hosting, mantenimiento y actualizaciones. Sin costes ocultos ni sorpresas. Cada plan se adapta a tus necesidades.",

    /* Contact */
    "contact.section": "// Empieza ahora",
    "contact.heading": "¿Listo para que tu negocio trabaje solo?",
    "contact.subtitle":
      "Cuéntanos qué necesitas y te enviamos un plan personalizado en menos de 24 horas. Sin compromiso, sin tarjeta de crédito.",
    "contact.bullet1": "Sin tarjeta de crédito para empezar",
    "contact.bullet2": "Configuración en 24 horas",
    "contact.bullet3": "Agente AI asequible — prueba 7 días gratis",
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
      "PickAIChat nació de una idea simple: la AI debería funcionar para el negocio, no al revés. Sin contratos complicados, sin jerga técnica, sin equipos de ingenieros.\n\nSoy Guillermo, creador de PickAIChat. Llevo años construyendo sistemas AI, pero viendo cómo la tecnología se queda solo en manos de grandes empresas. PickAIChat es mi forma de poner agentes AI al alcance de cualquier negocio — con un trato cercano y a medida.\n\nEl modelo es sencillo: contratas un humano que entiende de AI, y recibes un sistema que trabaja por ti 24/7. Sin que tengas que aprender nada nuevo.",
    "about.cta": "Hablar con Guillermo",

    /* Technology */
    "tech.section": "// Tecnología",
    "tech.heading": "Modelos agentivos de primer nivel",
    "tech.subtitle": "Acceso a los mejores modelos de IA del mercado a través de OpenRouter. Todos los planes incluyen modelos gratuitos y de pago.",
    "tech.models.title": "Modelos disponibles",
    "tech.model.0.name": "Claude Opus 5",
    "tech.model.0.tag": "Top notch, best agent",
    "tech.model.0.price": "$$$",
    "tech.model.0.desc": "El modelo más potente para tareas complejas, razonamiento profundo y agentes autónomos. Ideal para empresas que necesitan lo mejor.",
    "tech.model.1.name": "GPT-5",
    "tech.model.1.tag": "Enterprise powerhouse",
    "tech.model.1.price": "$$$",
    "tech.model.1.desc": "El buque insignia de OpenAI. Excelente para razonamiento, código y análisis. La opción preferida por grandes empresas.",
    "tech.model.2.name": "Claude Sonnet 4",
    "tech.model.2.tag": "Best value agent",
    "tech.model.2.price": "$$",
    "tech.model.2.desc": "El equilibrio perfecto entre calidad y precio. Capacidades agentivas sólidas a un coste moderado.",
    "tech.model.3.name": "DeepSeek V4",
    "tech.model.3.tag": "Best general AI that just works",
    "tech.model.3.price": "$",
    "tech.model.3.desc": "La mejor IA general que funciona y es económica. Ideal para el día a día de tu negocio.",
    "tech.model.4.name": "Qwen3.7 Flash",
    "tech.model.4.tag": "Fast, free-tier friendly",
    "tech.model.4.price": "$",
    "tech.model.4.desc": "Rápido, gratuito y con 1M de contexto. Perfecto para el plan gratuito y tareas sencillas.",
    "tech.hermes.title": "Impulsado por Hermes Agent",
    "tech.hermes.desc": "PickAIChat está construido sobre Hermes Agent de Nous Research, el agente open-source más utilizado del mercado. Tecnología de primer nivel, gratuita y transparente.",

    /* Meta */
    "meta.title": "PickAIChat — Hub de Agentes AI para WhatsApp y tu negocio",
    "meta.description":
      "Hub de agentes AI para WhatsApp, web y email. Automatiza tu negocio 24/7 con AI asequible. Configuración en 24 horas.",
    "meta.ogTitle": "PickAIChat — Hub de Agentes AI para tu Negocio",
    "meta.ogDescription":
      "Tu negocio automatizado al instante. AI asequible para cada negocio.",
    "meta.twitterDescription":
      "Tu negocio automatizado al instante con AI asequible para cada negocio.",
  },

  en: {
    /* Navbar */
    "nav.features": "Features",
    "nav.demo": "Demo",
    "nav.pricing": "Pricing",
    "nav.faq": "FAQ",
    "nav.cta": "Get Started",

    /* Hero */
    "hero.badge": "⚡ Try 7 days free · affordable AI for your business",
    "hero.title": "PickAIChat — The AI Agent Hub for Your Business",
    "hero.subtitle":
      "One agent or many. Scale as you grow. Automate WhatsApp, email, CRM and more.",
    "hero.subtitle.highlight": "flexible, affordable plans.",
    "hero.description":
      "PickAIChat is an AI agent hub that automates your business 24/7: replies on WhatsApp, manages orders, syncs with your CRM, sends emails, and more. Affordable AI, without complicated contracts.",
    "hero.motto": "Hire a human, get an AI that delivers.",
    "hero.cta.try": "Try the Agent",
    "hero.cta.pricing": "Contact Us",
    "hero.cta.whatsapp": "Connect with WhatsApp",
    "hero.cta.models": "See models",

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
    "social.0.name": "José Wilson",
    "social.0.role": "Founder",
    "social.0.company": "Come2Ireland",
    "social.0.quote":
      "The agent answers my clients by email and web 24/7 and alerts me to every inquiry. I don't have to watch it — everything arrives and gets answered on its own.",
    "social.0.initials": "JW",
    "social.1.name": "A landlord",
    "social.1.role": "Small property owner",
    "social.1.company": "Rental apartments",
    "social.1.quote":
      "I run my apartments with the agent: it answers tenant questions, coordinates viewings and keeps me posted on everything. I barely have to do anything.",
    "social.1.initials": "AR",
    "social.2.name": "A bar owner",
    "social.2.role": "Owner",
    "social.2.company": "Local bar",
    "social.2.quote":
      "The agent replies and takes bookings on my phone even while I'm at the bar. My customers always get an instant answer.",
    "social.2.initials": "BO",

    /* How It Works */
    "howitworks.section": "// How it works",
    "howitworks.heading": "From telling us about your business to having your agent in 24 hours",
    "howitworks.subtitle":
      "No complicated installations, no hiring IT people, no reading manuals. We handle everything for you.",
    "howitworks.0.title": "Tell us about your business",
    "howitworks.0.body":
      "A short call or a message. Tell us about your business, your customers and what you want to automate. We take care of the rest.",
    "howitworks.1.title": "We set it up for you",
    "howitworks.1.body":
      "We configure your agent with your prices, hours, products and FAQ. Ready to reply just like you would, on the channels you use.",
    "howitworks.2.title": "Go live",
    "howitworks.2.body":
      "In 24 hours your agent is already working. Replying to customers, managing orders, syncing data. You receive a daily summary — and we stay by your side.",

    /* Pricing */
    "pricing.section": "// Pricing",
    "pricing.heading": "Plans for every business",
    "pricing.subtitle":
      "Every business is different. Tell us what you need and we'll build a custom plan.",
    "pricing.0.name": "Free",
    "pricing.0.price": "$0",
    "pricing.0.period": "/mo",
    "pricing.0.desc": "Try the agent with no commitment. Free OpenRouter models, limited capacity.",
    "pricing.0.features": [
      "1 WhatsApp agent",
      "Integrated web chat",
      "Free OpenRouter models",
      "Up to 500 messages/mo",
      "No credit card",
    ],
    "pricing.0.cta": "Start Free",
    "pricing.trial.name": "Free Trial — 7 Days",
    "pricing.trial.desc": "No credit card needed. Full WhatsApp + web agent. Setup in 24h.",
    "pricing.trial.cta": "Try Free",
    "pricing.1.name": "Starter",
    "pricing.1.price": "$29",
    "pricing.1.period": "/mo",
    "pricing.1.model": "🧠 DeepSeek V4 included",
    "pricing.1.desc": "For freelancers and small shops wanting their first professional AI agent.",
    "pricing.1.features": [
      "1 WhatsApp agent",
      "Integrated web chat",
      "Custom AI responses",
      "Up to 2,000 messages/mo",
      "Daily activity summary",
      "Email support",
    ],
    "pricing.1.cta": "Start",
    "pricing.2.name": "Business",
    "pricing.2.price": "$79",
    "pricing.2.period": "/mo",
    "pricing.2.model": "🧠 DeepSeek V4 included",
    "pricing.2.desc": "For growing businesses needing more channels and capacity.",
    "pricing.2.features": [
      "3 agents",
      "WhatsApp + Web + Email",
      "AI trained on your data",
      "Up to 8,000 messages/mo",
      "Human handoff",
      "Dashboard",
      "Priority support",
    ],
    "pricing.2.cta": "Choose Business",
    "pricing.3.name": "Pro",
    "pricing.3.price": "$199",
    "pricing.3.period": "/mo",
    "pricing.3.model": "🧠 DeepSeek V4 included",
    "pricing.3.desc": "For companies needing full capacity and dedicated attention.",
    "pricing.3.features": [
      "10 agents",
      "WhatsApp + Web + Email + Telegram",
      "CRM and tool integrations",
      "Up to 25,000 messages/mo",
      "Custom API",
      "Dedicated infrastructure",
      "24/7 priority support",
    ],
    "pricing.3.cta": "Choose Pro",
    "pricing.badge": "🏆 Most popular",
    "pricing.upgrades.title": "🚀 Upgrade your model",
    "pricing.upgrades.desc": "Pick the model you prefer. Available as an add-on to any plan.",
    "pricing.upgrades.options": [
      "DeepSeek V4",
      "Claude Sonnet",
    ],
    "pricing.addons.title": "📱 Available add-ons",
    "pricing.addons.desc": "WhatsApp included in every plan. Add more capacity or extra channels to your plan.",
    "pricing.addons.options": [
      "WhatsApp Business included in your plan",
    ],
    "pricing.disclaimer":
      "WhatsApp is included in all plans. Reasonable use is covered; excessive use (abnormally high message volume) is billed separately at actual cost.",

    /* Get Started — hand-holding / service layer */
    "getstarted.section": "// We've got you",
    "getstarted.heading": "You're not alone — we set it up for you",
    "getstarted.subtitle":
      "Sign up and get started. We configure your agent, teach you how to use it and stay by your side. Human touch today, tutorials & automation tomorrow.",
    "getstarted.0.title": "1:1 Setup Call",
    "getstarted.0.body":
      "A personal call to understand your business and build your agent your way. You talk, we build.",
    "getstarted.1.title": "Group Onboarding",
    "getstarted.1.body":
      "Group sessions with other new businesses: we set up together and answer questions live.",
    "getstarted.2.title": "Open Doors",
    "getstarted.2.body":
      "Recurring dates every month to drop in, ask and improve your agent. No commitment.",
    "getstarted.3.title": "Tutorials",
    "getstarted.3.body":
      "Step-by-step videos and guides so one day you can do it yourself. On-demand learning.",
    "getstarted.banner.title": "A real concierge",
    "getstarted.banner.body":
      "Unlike a plain SaaS, we have a person who configures your agent and stays with you. We'd rather it's personal and it works.",
    "getstarted.banner.cta": "Start today",

    /* Payment methods */
    "payment.title": "💳 How to pay",
    "payment.desc": "No company or autónomo needed: pay from your personal account. Pick whichever method you prefer.",
    "payment.copied": "Copied!",

    /* Chatbot Demo */
    "chatbot.section": "// Live Demo",
    "chatbot.heading": "Try the agent in action",
    "chatbot.subtitle":
      "Type any question a customer would ask and see how PickAIChat responds. Switch channels to see it work on WhatsApp, web chat, and Telegram.",
    "chatbot.config": "Configure",
    "chatbot.channel": "channel:",
    "chatbot.thinking": "pickaichat is thinking",
    "chatbot.placeholder": "Type a message…",
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
      "The monthly plan includes hosting, maintenance, and updates. No hidden costs or surprises. Every plan is tailored to your needs.",

    /* Contact */
    "contact.section": "// Start now",
    "contact.heading": "Ready to let your business run itself?",
    "contact.subtitle":
      "Tell us what you need and we'll send you a custom plan in under 24 hours. No commitment, no credit card.",
    "contact.bullet1": "No credit card to start",
    "contact.bullet2": "Setup in 24 hours",
    "contact.bullet3": "Affordable AI agent — try 7 days free",
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
      "PickAIChat was born from a simple idea: AI should work for the business, not the other way around. No complicated contracts, no tech jargon, no engineering teams.\n\nI'm Guillermo, creator of PickAIChat. I've spent years building AI systems, watching the technology stay locked inside big companies. PickAIChat is my way of putting AI agents within reach of any business — with a personal, tailored touch.\n\nThe model is simple: you hire a human who understands AI, and you get a system that works for you 24/7. Without having to learn anything new.",
    "about.cta": "Talk to Guillermo",

    /* Technology */
    "tech.section": "// Technology",
    "tech.heading": "Top-tier agentic models",
    "tech.subtitle": "Access the best AI models on the market through OpenRouter. All plans include free and paid models.",
    "tech.models.title": "Available models",
    "tech.model.0.name": "Claude Opus 5",
    "tech.model.0.tag": "Top notch, best agent",
    "tech.model.0.price": "$$$",
    "tech.model.0.desc": "The most powerful model for complex tasks, deep reasoning, and autonomous agents. Ideal for businesses that need the best.",
    "tech.model.1.name": "GPT-5",
    "tech.model.1.tag": "Enterprise powerhouse",
    "tech.model.1.price": "$$$",
    "tech.model.1.desc": "OpenAI's flagship. Excellent for reasoning, coding, and analysis. The preferred choice for large enterprises.",
    "tech.model.2.name": "Claude Sonnet 4",
    "tech.model.2.tag": "Best value agent",
    "tech.model.2.price": "$$",
    "tech.model.2.desc": "The perfect balance between quality and price. Solid agentic capabilities at a moderate cost.",
    "tech.model.3.name": "DeepSeek V4",
    "tech.model.3.tag": "Best general AI that just works",
    "tech.model.3.price": "$",
    "tech.model.3.desc": "The best general AI that works and is affordable. Ideal for your business day-to-day.",
    "tech.model.4.name": "Qwen3.7 Flash",
    "tech.model.4.tag": "Fast, free-tier friendly",
    "tech.model.4.price": "$",
    "tech.model.4.desc": "Fast, free, with 1M context. Perfect for the free plan and simple tasks.",
    "tech.hermes.title": "Powered by Hermes Agent",
    "tech.hermes.desc": "PickAIChat is built on Hermes Agent by Nous Research, the most widely used open-source agent on the market. Top-tier technology, free and transparent.",

    /* Meta */
    "meta.title": "PickAIChat — AI Agent Hub for WhatsApp & Your Business",
    "meta.description":
      "AI agent hub for WhatsApp, web, and email. Automate your business 24/7 with affordable AI. Setup in 24 hours.",
    "meta.ogTitle": "PickAIChat — AI Agent Hub for Your Business",
    "meta.ogDescription":
      "Your business automated instantly. Affordable AI for every business.",
    "meta.twitterDescription":
      "Your business automated instantly with affordable AI for every business.",
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
