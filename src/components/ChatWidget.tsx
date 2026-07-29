import { useEffect, useRef, useState, type FormEvent } from "react";
import { DEFAULT_SETTINGS, sendChatMessage } from "@/utils/api";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { MessageSquare, X, Send, Loader2 } from "lucide-react";

const MAX_MESSAGES = 10;
const SESSION_KEY = "pickaichat.widget-session.v1";

interface WidgetMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
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

function loadSession(): WidgetMessage[] {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveSession(msgs: WidgetMessage[]) {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(msgs));
  } catch {
    /* ignore */
  }
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<WidgetMessage[]>(loadSession);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [limitReached, setLimitReached] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, isTyping]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [open]);

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

    const userMsg: WidgetMessage = { id: generateId(), role: "user", content: text };
    const updated = [...messages, userMsg];
    setMessages(updated);
    saveSession(updated);

    const userCount = updated.filter((m) => m.role === "user").length;
    if (userCount >= MAX_MESSAGES) { setLimitReached(true); return; }

    setIsTyping(true);
    try {
      const reply = await sendChatMessage(DEFAULT_SETTINGS, text, SYSTEM_PROMPT);
      const assistantMsg: WidgetMessage = { id: generateId(), role: "assistant", content: reply };
      const final = [...updated, assistantMsg];
      setMessages(final);
      saveSession(final);
    } catch {
      const final = [...updated, { id: generateId(), role: "assistant" as const, content: "Something went wrong. Please try again." }];
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
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 left-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-magenta text-white shadow-lg shadow-magenta/30 transition hover:brightness-110 hover:shadow-xl hover:shadow-magenta/40"
      >
        {open ? <X size={20} /> : <MessageSquare size={20} />}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-20 left-5 z-50 flex w-80 flex-col overflow-hidden rounded-xl border border-border bg-card shadow-2xl shadow-black/40 sm:w-96">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border bg-card px-3 py-2.5">
            <div className="flex items-center gap-2">
              <div className="flex h-2 w-2 rounded-full bg-terminal shadow-[0_0_6px_var(--terminal)]" />
              <span className="text-sm font-semibold text-foreground">PickAIChat</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-muted-foreground">
                {messages.filter((m) => m.role === "user").length}/{MAX_MESSAGES}
              </span>
              {messages.length > 0 && (
                <button onClick={handleReload} className="flex h-4 w-4 items-center justify-center rounded text-muted-foreground/50 hover:text-foreground" title="Reset">
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/><path d="M21 3v5h-5"/></svg>
                </button>
              )}
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-3 max-h-80">
            {messages.length === 0 && !isTyping ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <p className="text-xs font-medium text-foreground mb-1">AI that does everything</p>
                <p className="text-[10px] text-muted-foreground px-2">Ask about WhatsApp automation, customer service, or anything else.</p>
              </div>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className={`flex items-start gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[9px] font-semibold ${msg.role === "user" ? "bg-foreground/10 text-foreground" : "bg-magenta/20 text-magenta"}`}>
                    {msg.role === "user" ? "U" : "AI"}
                  </div>
                  <div className={`max-w-[85%] rounded-2xl px-2.5 py-1.5 text-xs leading-relaxed ${msg.role === "user" ? "rounded-tr-sm bg-magenta text-white" : "rounded-tl-sm bg-accent text-foreground"}`}>
                    {msg.role === "user" ? msg.content : (
                      <Markdown remarkPlugins={[remarkGfm]} components={{
                        table: ({ children }) => <div className="my-1 overflow-x-auto"><table className="min-w-full border-collapse text-[10px]">{children}</table></div>,
                        th: ({ children }) => <th className="border border-border px-1 py-0.5 text-left font-semibold">{children}</th>,
                        td: ({ children }) => <td className="border border-border px-1 py-0.5">{children}</td>,
                        code: ({ className, children, ...props }) => !className ? <code className="rounded bg-accent/50 px-1 py-0.5 text-[10px] font-mono" {...props}>{children}</code> : <pre className="my-1 overflow-x-auto rounded bg-accent/50 p-1.5 text-[10px] font-mono"><code {...props}>{children}</code></pre>,
                        ul: ({ children }) => <ul className="my-0.5 list-disc pl-3">{children}</ul>,
                        ol: ({ children }) => <ol className="my-0.5 list-decimal pl-3">{children}</ol>,
                        p: ({ children }) => <p className="my-0.5 last:mb-0">{children}</p>,
                        a: ({ children, href }) => <a href={href} target="_blank" rel="noopener noreferrer" className="underline text-magenta">{children}</a>,
                      }}>{msg.content}</Markdown>
                    )}
                  </div>
                </div>
              ))
            )}
            {isTyping && (
              <div className="flex items-start gap-2">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-magenta/20 text-[9px] font-semibold text-magenta">AI</div>
                <div className="rounded-2xl rounded-tl-sm bg-accent px-2.5 py-1.5">
                  <span className="inline-flex gap-1">
                    <span className="h-1 w-1 animate-bounce rounded-full bg-magenta/60" style={{ animationDelay: "0ms" }} />
                    <span className="h-1 w-1 animate-bounce rounded-full bg-magenta/60" style={{ animationDelay: "150ms" }} />
                    <span className="h-1 w-1 animate-bounce rounded-full bg-magenta/60" style={{ animationDelay: "300ms" }} />
                  </span>
                </div>
              </div>
            )}
            {limitReached && (
              <div className="rounded-lg border border-magenta/30 bg-magenta/5 p-2.5 text-center">
                <p className="text-[11px] font-medium text-magenta mb-1">✨ Free limit reached</p>
                <p className="text-[10px] text-muted-foreground mb-1.5">Contact us for unlimited messages.</p>
                <button onClick={handleReload} className="rounded border border-border px-2 py-1 text-[10px] text-foreground hover:border-magenta hover:text-magenta">Reset</button>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="flex items-stretch gap-2 border-t border-border bg-card p-2.5">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={limitReached ? "Limit reached" : "Ask about PickAIChat..."}
              className="flex-1 rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-magenta focus:ring-1 focus:ring-magenta/30"
              disabled={limitReached}
              autoComplete="off"
            />
            <button type="submit" disabled={!input.trim() || isTyping || limitReached} className="flex h-7 w-7 items-center justify-center rounded-lg bg-magenta text-white transition hover:brightness-110 disabled:opacity-40">
              {isTyping ? <Loader2 size={12} className="animate-spin" /> : <Send size={12} />}
            </button>
          </form>
        </div>
      )}
    </>
  );
}