import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { useLanguage } from "@/lib/LanguageProvider";
import { DEFAULT_SETTINGS, sendChatMessage } from "@/utils/api";
import { useIsMobile } from "@/hooks/use-mobile";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Plus, MessageSquare, Trash2, Send, PanelLeftOpen, PanelLeftClose, Loader2 } from "lucide-react";

const MAX_MESSAGES = 10;
const CONVERSATIONS_KEY = "pickaichat.try-conversations.v1";
const ACTIVE_KEY = "pickaichat.try-active.v1";

interface TryMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

interface TryConversation {
  id: string;
  title: string;
  messages: TryMessage[];
  createdAt: number;
  updatedAt: number;
}

const SYSTEM_PROMPT = `You are the PickAIChat demo assistant. ...`; // same as DemoChat

function generateId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `id_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

function generateTitle(content: string): string {
  const clean = content.trim().slice(0, 50);
  return clean.length < 50 ? clean : clean + "...";
}

function loadConvs(): TryConversation[] {
  try { const raw = localStorage.getItem(CONVERSATIONS_KEY); return raw ? JSON.parse(raw) : []; } catch { return []; }
}
function saveConvs(convs: TryConversation[]) {
  try { localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(convs)); } catch {}
}

export function TryChat() {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const [conversations, setConversations] = useState<TryConversation[]>(loadConvs);
  const [activeId, setActiveId] = useState<string | null>(() => {
    const saved = localStorage.getItem(ACTIVE_KEY);
    const convs = loadConvs();
    return saved && convs.find(c => c.id === saved) ? saved : convs[0]?.id ?? null;
  });
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const activeConv = conversations.find(c => c.id === activeId) ?? null;
  const userMsgCount = activeConv?.messages.filter(m => m.role === "user").length ?? 0;
  const limitReached = userMsgCount >= MAX_MESSAGES;

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [activeConv?.messages, isTyping]);

  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 100);
    return () => clearTimeout(timer);
  }, [activeId]);

  function persist(convs: TryConversation[], active?: string | null) {
    setConversations(convs);
    saveConvs(convs);
    if (active !== undefined) {
      setActiveId(active);
      localStorage.setItem(ACTIVE_KEY, active ?? "");
    }
  }

  const createConversation = useCallback(() => {
    const conv: TryConversation = {
      id: generateId(), title: "New chat", messages: [], createdAt: Date.now(), updatedAt: Date.now(),
    };
    persist([conv, ...conversations], conv.id);
  }, [conversations]);

  const deleteConversation = useCallback((id: string) => {
    const filtered = conversations.filter(c => c.id !== id);
    persist(filtered, id === activeId ? filtered[0]?.id ?? null : activeId);
  }, [conversations, activeId]);

  const switchConversation = useCallback((id: string) => {
    localStorage.setItem(ACTIVE_KEY, id);
    setActiveId(id);
  }, []);

  function addMsg(role: "user" | "assistant", content: string, titleOverride?: string) {
    if (!activeId) return;
    const msg: TryMessage = { id: generateId(), role, content, timestamp: Date.now() };
    const current = loadConvs();
    const updated = current.map(c => {
      if (c.id !== activeId) return c;
      const messages = [...c.messages, msg];
      const title = titleOverride ?? (c.messages.length === 0 ? generateTitle(content) : c.title);
      return { ...c, messages, title, updatedAt: Date.now() };
    });
    persist(updated, activeId);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || isTyping || limitReached) return;
    setInput("");

    let id = activeId;
    if (!id) { createConversation(); return; }

    addMsg("user", text);
    setIsTyping(true);
    try {
      const reply = await sendChatMessage(DEFAULT_SETTINGS, text, SYSTEM_PROMPT);
      addMsg("assistant", reply);
    } catch {
      addMsg("assistant", "Something went wrong. Please try again.");
    } finally {
      setIsTyping(false);
    }
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      {/* Sidebar */}
      <aside className={`flex flex-col border-r border-border bg-background/50 transition-all duration-200 ${sidebarOpen ? "w-64" : "w-0 overflow-hidden"}`}>
        <div className="flex items-center justify-between border-b border-border p-3">
          <button onClick={() => { createConversation(); if (isMobile) setSidebarOpen(false); }}
            className="flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground transition hover:border-magenta hover:text-magenta">
            <Plus size={14} /> {t("chatbot.newChat") || "New chat"}
          </button>
          <button onClick={() => setSidebarOpen(false)} className="rounded p-1 text-muted-foreground hover:text-foreground">
            <PanelLeftClose size={16} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          {conversations.length === 0 ? (
            <p className="px-3 py-8 text-center text-xs text-muted-foreground">No conversations yet</p>
          ) : (
            conversations.map(conv => (
              <div key={conv.id}
                className={`group mb-1 flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition cursor-pointer ${conv.id === activeId ? "bg-magenta/10 text-magenta" : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"}`}
                onClick={() => { switchConversation(conv.id); if (isMobile) setSidebarOpen(false); }}>
                <MessageSquare size={14} className="shrink-0" />
                <span className="flex-1 truncate">{conv.title}</span>
                <button onClick={e => { e.stopPropagation(); deleteConversation(conv.id); }}
                  className="shrink-0 rounded p-0.5 text-muted-foreground/40 opacity-0 transition hover:text-destructive group-hover:opacity-100">
                  <Trash2 size={12} />
                </button>
              </div>
            ))
          )}
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col">
        <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
          {!sidebarOpen && <button onClick={() => setSidebarOpen(true)} className="rounded p-1 text-muted-foreground hover:text-foreground"><PanelLeftOpen size={16} /></button>}
          <span className="text-sm font-medium text-foreground truncate">{activeConv?.title || "PickAIChat"}</span>
          <span className="ml-auto text-[11px] text-muted-foreground">{userMsgCount}/{MAX_MESSAGES} free</span>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6">
          {activeConv && activeConv.messages.length > 0 ? (
            <div className="mx-auto max-w-3xl space-y-4">
              {activeConv.messages.map(msg => (
                <div key={msg.id} className={`flex items-start gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${msg.role === "user" ? "bg-foreground/10 text-foreground" : "bg-magenta/20 text-magenta"}`}>
                    {msg.role === "user" ? "U" : "AI"}
                  </div>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${msg.role === "user" ? "rounded-tr-sm bg-magenta/90 text-white" : "rounded-tl-sm bg-accent/50 text-foreground"}`}>
                    {msg.role === "user" ? msg.content : (
                      <Markdown remarkPlugins={[remarkGfm]} components={{
                        table: ({ children }) => <div className="my-2 overflow-x-auto"><table className="min-w-full border-collapse text-sm">{children}</table></div>,
                        th: ({ children }) => <th className="border border-border px-3 py-1.5 text-left font-semibold bg-accent/30">{children}</th>,
                        td: ({ children }) => <td className="border border-border px-3 py-1.5">{children}</td>,
                        code: ({ className, children, ...props }) => !className ? <code className="rounded bg-accent/50 px-1.5 py-0.5 text-xs font-mono" {...props}>{children}</code> : <pre className="my-2 overflow-x-auto rounded-lg bg-accent/30 p-3 text-xs font-mono"><code {...props}>{children}</code></pre>,
                        ul: ({ children }) => <ul className="my-1 list-disc pl-5 space-y-0.5">{children}</ul>,
                        ol: ({ children }) => <ol className="my-1 list-decimal pl-5 space-y-0.5">{children}</ol>,
                        h1: ({ children }) => <h1 className="my-2 text-base font-bold">{children}</h1>,
                        h2: ({ children }) => <h2 className="my-2 text-sm font-bold">{children}</h2>,
                        h3: ({ children }) => <h3 className="my-1.5 text-sm font-semibold">{children}</h3>,
                        p: ({ children }) => <p className="my-1 last:mb-0">{children}</p>,
                        a: ({ children, href }) => <a href={href} target="_blank" rel="noopener noreferrer" className="underline text-magenta hover:brightness-110">{children}</a>,
                        hr: () => <hr className="my-3 border-border" />,
                      }}>{msg.content}</Markdown>
                    )}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-magenta/20 text-xs font-semibold text-magenta">AI</div>
                  <div className="rounded-2xl rounded-tl-sm bg-accent/50 px-4 py-2.5">
                    <span className="inline-flex gap-1">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-magenta/60" style={{ animationDelay: "0ms" }} />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-magenta/60" style={{ animationDelay: "150ms" }} />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-magenta/60" style={{ animationDelay: "300ms" }} />
                    </span>
                  </div>
                </div>
              )}
              {limitReached && (
                <div className="rounded-lg border border-magenta/30 bg-magenta/5 p-4 text-center">
                  <p className="text-sm font-medium text-magenta mb-1">✨ Free AI limit reached</p>
                  <p className="text-xs text-muted-foreground mb-2">Want to keep going? Contact us for the full experience.</p>
                  <a href="/contact" className="inline-block rounded-lg bg-magenta px-4 py-2 text-xs font-medium text-white hover:brightness-110">Contact us</a>
                </div>
              )}
            </div>
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="max-w-md text-center">
                <h2 className="text-xl font-semibold text-foreground">Try PickAIChat</h2>
                <p className="mt-2 text-sm text-muted-foreground">AI that does everything for your business. Create a new chat and ask anything.</p>
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-border bg-background/50 px-4 py-3">
          <form onSubmit={handleSubmit} className="mx-auto flex max-w-3xl items-end gap-2">
            <div className="relative flex-1">
              <textarea ref={inputRef} value={input} onChange={e => setInput(e.target.value)}
                placeholder={limitReached ? "Limit reached — try a new chat" : t("chatbot.placeholder") || "Ask about PickAIChat..."}
                rows={1} disabled={limitReached && !activeConv?.messages.length}
                className="min-h-[44px] w-full resize-none rounded-xl border border-border bg-background px-4 py-3 pr-12 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:border-magenta focus:ring-1 focus:ring-magenta/30"
              />
              <button type="submit" disabled={!input.trim() || isTyping || (limitReached && !!activeConv?.messages.length)}
                className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-lg bg-magenta text-white transition hover:brightness-110 disabled:opacity-40">
                {isTyping ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}