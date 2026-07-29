import { useEffect, useRef, useState, type FormEvent } from "react";
import { useLanguage } from "@/lib/LanguageProvider";
import { DEFAULT_SETTINGS, sendChatMessage } from "@/utils/api";
import { useIsMobile } from "@/hooks/use-mobile";
import { Send, Loader2 } from "lucide-react";

const MAX_MESSAGES = 10;
const SESSION_KEY = "pickaichat.demo-session.v1";

interface DemoMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

const SYSTEM_PROMPT = `You are the PickAIChat demo assistant. Your job is to help visitors understand what PickAIChat can do for their business.

PickAIChat is an AI agent hub that automates businesses 24/7: replies on WhatsApp, manages orders, syncs with CRM, sends emails, and more. It's affordable AI without complicated contracts.

Key selling points:
- One AI agent that works across WhatsApp, web chat, and email
- 24/7 customer service automation
- Syncs with your existing tools (CRM, inventory, calendars)
- Affordable pricing for small and medium businesses
- Setup in 24 hours with no technical knowledge needed
- Created by Guillermo Pickman, a human who makes AI simple for business

When talking to visitors:
- Be friendly and helpful, not pushy
- Answer questions about PickAIChat's features and capabilities
- Naturally mention how it can help their specific business
- If they ask about pricing, direct them to contact Guillermo for a custom quote
- Keep responses concise and clear
- If they ask something outside PickAIChat's scope, politely redirect to what the platform can do`;

function generateId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `msg_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

function loadSession(): DemoMessage[] {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveSession(msgs: DemoMessage[]) {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(msgs));
  } catch {
    /* ignore */
  }
}

export function DemoChat({ compact }: { compact?: boolean }) {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const [messages, setMessages] = useState<DemoMessage[]>(loadSession);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [limitReached, setLimitReached] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, isTyping]);

  // Auto-focus
  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 100);
    return () => clearTimeout(timer);
  }, []);

  // Check limit on load
  useEffect(() => {
    if (messages.filter((m) => m.role === "user").length >= MAX_MESSAGES) {
      setLimitReached(true);
    }
  }, [messages]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || isTyping || limitReached) return;

    setInput("");

    const userMsg: DemoMessage = {
      id: generateId(),
      role: "user",
      content: text,
      timestamp: Date.now(),
    };

    const updated = [...messages, userMsg];
    setMessages(updated);
    saveSession(updated);

    // Check if user hit the limit
    const userCount = updated.filter((m) => m.role === "user").length;
    if (userCount >= MAX_MESSAGES) {
      setLimitReached(true);
      return;
    }

    setIsTyping(true);

    try {
      const reply = await sendChatMessage(DEFAULT_SETTINGS, text, SYSTEM_PROMPT);
      const assistantMsg: DemoMessage = {
        id: generateId(),
        role: "assistant",
        content: reply,
        timestamp: Date.now(),
      };
      const final = [...updated, assistantMsg];
      setMessages(final);
      saveSession(final);
    } catch (err) {
      const errorMsg: DemoMessage = {
        id: generateId(),
        role: "assistant",
        content:
          err instanceof Error
            ? `Error: ${err.message}`
            : "Something went wrong. Please try again.",
        timestamp: Date.now(),
      };
      const final = [...updated, errorMsg];
      setMessages(final);
      saveSession(final);
    } finally {
      setIsTyping(false);
    }
  }

  function handleReload() {
    sessionStorage.removeItem(SESSION_KEY);
    setMessages([]);
    setLimitReached(false);
    setInput("");
  }

  return (
    <div
      className={`flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-2xl shadow-black/40 ${
        compact ? "h-[420px] text-xs" : "h-[520px]"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border bg-card px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="flex h-2 w-2 rounded-full bg-terminal shadow-[0_0_6px_var(--terminal)]" />
          <span className="text-xs font-semibold text-foreground">
            {t("chatbot.heading") || "Try PickAIChat"}
          </span>
        </div>
        <span className="text-[11px] text-muted-foreground">
          {messages.filter((m) => m.role === "user").length}/{MAX_MESSAGES} free
        </span>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.length === 0 && !isTyping ? (
          <div className="flex h-full flex-col items-center justify-center text-center px-4">
            <p className="text-sm font-medium text-foreground mb-1">
              AI that does everything for your business
            </p>
            <p className="text-xs text-muted-foreground">
              Ask about WhatsApp automation, 24/7 customer service, or anything else.
            </p>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-2 ${
                msg.role === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold ${
                  msg.role === "user"
                    ? "bg-foreground/10 text-foreground"
                    : "bg-magenta/20 text-magenta"
                }`}
              >
                {msg.role === "user" ? "U" : "AI"}
              </div>
              <div
                className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "rounded-tr-sm bg-magenta text-white"
                    : "rounded-tl-sm bg-accent text-foreground"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))
        )}

        {isTyping && (
          <div className="flex items-start gap-2">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-magenta/20 text-[10px] font-semibold text-magenta">
              AI
            </div>
            <div className="rounded-2xl rounded-tl-sm bg-accent px-3 py-2">
              <span className="inline-flex gap-1">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-magenta/60" style={{ animationDelay: "0ms" }} />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-magenta/60" style={{ animationDelay: "150ms" }} />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-magenta/60" style={{ animationDelay: "300ms" }} />
              </span>
            </div>
          </div>
        )}

        {limitReached && (
          <div className="rounded-lg border border-magenta/30 bg-magenta/5 p-3 text-center">
            <p className="text-sm font-medium text-magenta mb-1">
              ✨ Free AI limit reached
            </p>
            <p className="text-xs text-muted-foreground mb-2">
              Want to keep going? Contact us for the full experience with unlimited messages.
            </p>
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
              <button
                onClick={handleReload}
                className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground transition hover:border-magenta hover:text-magenta"
              >
                Reload to keep testing
              </button>
              <a
                href="/contact"
                className="rounded-lg bg-magenta px-3 py-1.5 text-xs font-medium text-white transition hover:brightness-110"
              >
                Contact us
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="flex items-stretch gap-2 border-t border-border bg-card p-3"
      >
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            limitReached
              ? "Limit reached — reload or contact us"
              : t("chatbot.placeholder") || "Ask about PickAIChat..."
          }
          className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:border-magenta focus:ring-1 focus:ring-magenta/30"
          disabled={limitReached}
          autoComplete="off"
        />
        <button
          type="submit"
          disabled={!input.trim() || isTyping || limitReached}
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-magenta text-white transition hover:brightness-110 disabled:opacity-40"
        >
          {isTyping ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Send size={14} />
          )}
        </button>
      </form>
    </div>
  );
}