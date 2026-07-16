import { useEffect, useRef, useState, type FormEvent } from "react";
import { Settings as SettingsIcon, Send, Terminal } from "lucide-react";
import { useChat, type Platform } from "@/hooks/useChat";
import { SettingsPanel } from "./Settings";
import { useLanguage } from "../lib/LanguageProvider";

const PLATFORMS: Platform[] = ["Telegram", "WhatsApp", "Web Chat"];

function formatTime(ts: number) {
  const d = new Date(ts);
  return d.toTimeString().slice(0, 8);
}

export function Chatbot() {
  const { t } = useLanguage();
  const { settings, updateSettings, messages, platform, setPlatform, isTyping, send } = useChat();
  const [input, setInput] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, isTyping]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    void send(input);
    setInput("");
  }

  return (
    <section id="chatbot" className="relative px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 text-center">
          <div className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-magenta">
            {t("chatbot.section")}
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("chatbot.heading")}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            {t("chatbot.subtitle")}
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-border bg-card font-mono shadow-2xl shadow-black/40">
          {/* terminal chrome */}
          <div className="flex items-center justify-between border-b border-border bg-background/60 px-4 py-2.5">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              <div className="ml-3 flex items-center gap-2 text-xs text-muted-foreground">
                <Terminal size={12} />
                pickaichat@dispatcher: ~
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowSettings((s) => !s)}
              className={
                "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs transition " +
                (showSettings
                  ? "border-magenta text-magenta"
                  : "border-border text-muted-foreground hover:text-foreground")
              }
              aria-expanded={showSettings}
            >
              <SettingsIcon size={12} />
              {t("chatbot.config")}
            </button>
          </div>

          {showSettings && <SettingsPanel settings={settings} onChange={updateSettings} />}

          {/* platform selector */}
          <div className="flex items-center gap-2 border-b border-border bg-background/30 px-4 py-3">
            <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
              {t("chatbot.channel")}
            </span>
            {PLATFORMS.map((p) => (
              <button
                key={p}
                onClick={() => setPlatform(p)}
                className={
                  "rounded-full border px-3 py-1 text-xs transition " +
                  (platform === p
                    ? "border-magenta bg-magenta/10 text-magenta"
                    : "border-border text-muted-foreground hover:text-foreground")
                }
              >
                {p}
              </button>
            ))}
          </div>

          {/* transcript */}
          <div
            ref={scrollRef}
            className="h-[440px] overflow-y-auto bg-background/70 p-4 text-[13px] leading-relaxed"
          >
            {messages.map((m) => (
              <div key={m.id} className="slide-in-msg mb-2">
                {m.kind === "system" && (
                  <div className="text-muted-foreground">
                    <span className="text-magenta">$</span> {m.text}
                  </div>
                )}
                {m.kind === "inbound" && (
                  <div className="text-terminal">
                    <span className="text-muted-foreground">[{formatTime(m.ts)}]</span> → INBOUND [
                    {m.platform}] user: <span className="text-foreground">"{m.text}"</span>
                  </div>
                )}
                {m.kind === "response" && (
                  <div className="mt-1 whitespace-pre-wrap text-terminal">
                    <span className="text-muted-foreground">[{formatTime(m.ts)}]</span> ← OUTBOUND [
                    {m.platform}] pickaichat:{"\n"}
                    <span className="block pl-4 text-foreground/90">{m.text}</span>
                  </div>
                )}
                {m.kind === "error" && (
                  <div className="text-destructive">
                    <span className="text-muted-foreground">[{formatTime(m.ts)}]</span> ✗ ERROR:{" "}
                    {m.text}
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="text-terminal slide-in-msg">
                <span className="text-muted-foreground">…</span> {t("chatbot.thinking")}
                <span className="caret-blink">▍</span>
              </div>
            )}
          </div>

          {/* composer */}
          <form
            onSubmit={handleSubmit}
            className="flex items-stretch gap-2 border-t border-border bg-background/60 p-3"
          >
            <div className="flex items-center pl-2 text-magenta">$</div>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("chatbot.placeholder", platform)}
              className="flex-1 bg-transparent px-1 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              spellCheck={false}
              autoComplete="off"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="inline-flex items-center gap-1.5 rounded-md bg-magenta px-4 py-2 text-xs font-semibold text-primary-foreground transition hover:brightness-110 disabled:opacity-40"
            >
              <Send size={12} />
              {t("chatbot.send")}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}