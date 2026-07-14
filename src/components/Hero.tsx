const PICK = [
  "██████╗ ██╗ ██████╗██╗  ██╗",
  "██╔══██╗██║██╔════╝██║ ██╔╝",
  "██████╔╝██║██║     █████╔╝ ",
  "██╔═══╝ ██║██║     ██╔═██╗ ",
  "██║     ██║╚██████╗██║  ██╗",
  "╚═╝     ╚═╝ ╚═════╝╚═╝  ╚═╝",
];

const AI = [
  " █████╗ ██",
  "██╔══██╗██",
  "███████║██",
  "██╔══██║██",
  "██║  ██║██",
  "╚═╝  ╚═╝╚═",
];

const CHAT = [
  "╗ ██████╗██╗  ██╗ █████╗ ████████╗",
  "║██╔════╝██║  ██╔██╔══██╗╚══██╔══╝",
  "║██║     ███████╝███████║   ██║   ",
  "║██║     ██╔══██╗██╔══██║   ██║   ",
  "║╚██████╗██║  ██╗██║  ██║   ██║   ",
  "╝ ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ",
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 50% 40%, rgba(217,70,239,0.18), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(217,70,239,1) 1px, transparent 1px), linear-gradient(90deg, rgba(217,70,239,1) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 flex w-full max-w-6xl flex-col items-center text-center fade-in-up">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs font-mono text-muted-foreground backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-terminal shadow-[0_0_8px_var(--terminal)]" />
          v1.0 · production ready · 48h deploy
        </div>

        <div className="mb-8 flex items-center justify-center">
          <div className="mx-auto h-48 w-48 overflow-hidden rounded-full sm:h-56 sm:w-56 md:h-72 md:w-72 drop-shadow-[0_0_30px_rgba(217,70,239,0.4)]">
            <img
              src="/logo/logo-only-400.webp"
              alt="PickAIChat"
              width={288}
              height={288}
              className="h-full w-full object-cover"
              loading="eager"
            />
          </div>
        </div>

        <pre
          className="text-glow-magenta font-mono leading-[1.05] tracking-tight whitespace-pre overflow-x-auto max-w-full text-left inline-block"
          style={{ fontSize: "clamp(0.42rem, 1.55vw, 1.1rem)" }}
          aria-label="PickAIChat"
        >
          {PICK.map((_, i) => (
            <div key={i}>
              <span className="text-[#e2a8f0]">{PICK[i]}</span>
              <span className="text-magenta">{AI[i]}</span>
              <span className="text-[#e2a8f0]">{CHAT[i]}</span>
            </div>
          ))}
        </pre>

        <h1 className="sr-only">PickAIChat — Universal AI Chat Engine</h1>

        <p className="mt-10 max-w-2xl text-lg font-medium text-foreground sm:text-xl">
          Universal AI Chat Engine —{" "}
          <span className="text-magenta">Build Once, Deploy Everywhere.</span>
        </p>
        <p className="mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
          One engine. Every channel. Telegram, WhatsApp, Web, Email — with cross-channel memory,
          auth, and provider-agnostic LLM routing baked in.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={() => scrollTo("chatbot")}
            className="group inline-flex items-center justify-center rounded-lg bg-magenta px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:brightness-110 hover:shadow-[0_0_32px_-4px_var(--magenta-glow)]"
          >
            Try the Chatbot
            <span className="ml-2 transition group-hover:translate-x-0.5">→</span>
          </button>
          <button
            onClick={() => scrollTo("pricing")}
            className="inline-flex items-center justify-center rounded-lg border border-border bg-card/60 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur transition hover:border-magenta/60 hover:text-magenta"
          >
            See Pricing
          </button>
        </div>
      </div>
    </section>
  );
}