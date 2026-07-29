// v1.0.3 - fix renameConversation bug
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useUser } from "@clerk/tanstack-react-start";
import { useConversations, type Message } from "@/hooks/useConversations";
import { useLanguage } from "@/lib/LanguageProvider";
import { sendToHermesBot } from "@/utils/api";
import { useIsMobile } from "@/hooks/use-mobile";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Plus,
  MessageSquare,
  Trash2,
  Send,
  PanelLeftOpen,
  PanelLeftClose,
  Loader2,
  Sparkles,
} from "lucide-react";

export function ChatUI() {
  const { t } = useLanguage();
  const { user } = useUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress ?? null;

  const {
    conversations,
    activeConversation,
    activeId,
    loading,
    createConversation,
    deleteConversation,
    switchConversation,
    addMessage,
  } = useConversations(userEmail);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const isMobile = useIsMobile();

  // Auto-focus the input when switching conversations
  useEffect(() => {
    // Small delay to wait for render on mobile
    const timer = setTimeout(() => inputRef.current?.focus(), 100);
    return () => clearTimeout(timer);
  }, [activeId]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [activeConversation?.messages, isTyping]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || isTyping) return;

    setInput("");

    // If no active conversation, create one
    let convId = activeId;
    if (!convId) {
      const newConv = createConversation();
      convId = newConv.id;
    }

    addMessage("user", text, convId);
    setIsTyping(true);

    try {
      const { reply, title } = await sendToHermesBot(text, convId, userEmail ?? "");
      // Pass the AI-generated title so it's set atomically with the message
      addMessage("assistant", reply, convId, title);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      addMessage("assistant", `Error: ${msg}`);
    } finally {
      setIsTyping(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as FormEvent);
    }
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`flex flex-col border-r border-border bg-background/50 transition-all duration-200 ${
          sidebarOpen ? "w-64" : "w-0 overflow-hidden"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border p-3">
          <button
            onClick={() => {
              createConversation();
              if (isMobile) setSidebarOpen(false);
            }}
            className="flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground transition hover:border-magenta hover:text-magenta"
          >
            <Plus size={14} />
            {t("chatbot.newChat") || "New chat"}
          </button>
          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded p-1 text-muted-foreground hover:text-foreground"
          >
            <PanelLeftClose size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 size={16} className="animate-spin text-muted-foreground" />
            </div>
          ) : conversations.length === 0 ? (
            <p className="px-3 py-8 text-center text-xs text-muted-foreground">
              No conversations yet
            </p>
          ) : (
            conversations.map((conv) => (
              <div
                key={conv.id}
                className={`group mb-1 flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition cursor-pointer ${
                  conv.id === activeId
                    ? "bg-magenta/10 text-magenta"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                }`}
                onClick={() => {
              switchConversation(conv.id);
              if (isMobile) setSidebarOpen(false);
            }}
              >
                <MessageSquare size={14} className="shrink-0" />
                <span className="flex-1 truncate">{conv.title}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteConversation(conv.id);
                  }}
                  className="shrink-0 rounded p-0.5 text-muted-foreground/40 opacity-0 transition hover:text-destructive group-hover:opacity-100"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))
          )}
        </div>
      </aside>

      {/* Main chat area */}
      <div className="flex flex-1 flex-col">
        {/* Top bar */}
        <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
          {!sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded p-1 text-muted-foreground hover:text-foreground"
            >
              <PanelLeftOpen size={16} />
            </button>
          )}
          <span className="text-sm font-medium text-foreground truncate">
            {activeConversation?.title || "PickAIChat"}
          </span>
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-4 py-6"
        >
          {activeConversation && activeConversation.messages.length > 0 ? (
            <div className="mx-auto max-w-3xl space-y-4">
              {activeConversation.messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}
              {isTyping && (
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-magenta/20 text-xs font-semibold text-magenta">
                    AI
                  </div>
                  <div className="rounded-2xl rounded-tl-sm bg-accent/50 px-4 py-2.5">
                    <span className="inline-flex gap-1">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-magenta/60" style={{ animationDelay: "0ms" }} />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-magenta/60" style={{ animationDelay: "150ms" }} />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-magenta/60" style={{ animationDelay: "300ms" }} />
                    </span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="max-w-md text-center">
                <h2 className="text-xl font-semibold text-foreground">
                  {t("chatbot.heading") || "Chat with PickAIChat"}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Ask about business automation, AI agents, or anything else.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="border-t border-border bg-background/50 px-4 py-3">
          <form onSubmit={handleSubmit} className="mx-auto flex max-w-3xl items-end gap-2">
            <div className="relative flex-1">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t("chatbot.placeholder") || "Type a message..."}
                rows={1}
                className="min-h-[44px] w-full resize-none rounded-xl border border-border bg-background px-4 py-3 pr-12 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:border-magenta focus:ring-1 focus:ring-magenta/30"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-lg bg-magenta text-white transition hover:brightness-110 disabled:opacity-40"
              >
                <Send size={14} />
              </button>
            </div>
          </form>
          <p className="mt-2 text-center text-[11px] text-muted-foreground">
            PickAIChat may produce inaccurate information.
          </p>
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";
  return (
    <div className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
          isUser
            ? "bg-foreground/10 text-foreground"
            : "bg-magenta/20 text-magenta"
        }`}
      >
        {isUser ? "U" : "AI"}
      </div>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? "rounded-tr-sm bg-magenta/90 text-white"
            : "rounded-tl-sm bg-accent/50 text-foreground"
        }`}
      >
        {isUser ? (
          message.content
        ) : (
          <Markdown
            remarkPlugins={[remarkGfm]}
            components={{
              // Style tables
              table: ({ children }) => (
                <div className="my-2 overflow-x-auto">
                  <table className="min-w-full border-collapse text-sm">
                    {children}
                  </table>
                </div>
              ),
              th: ({ children }) => (
                <th className="border border-border px-3 py-1.5 text-left font-semibold bg-accent/30">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="border border-border px-3 py-1.5">{children}</td>
              ),
              // Style code blocks
              code: ({ className, children, ...props }) => {
                const isInline = !className;
                return isInline ? (
                  <code className="rounded bg-accent/50 px-1.5 py-0.5 text-xs font-mono" {...props}>
                    {children}
                  </code>
                ) : (
                  <pre className="my-2 overflow-x-auto rounded-lg bg-accent/30 p-3 text-xs font-mono">
                    <code className={className} {...props}>
                      {children}
                    </code>
                  </pre>
                );
              },
              // Style lists
              ul: ({ children }) => (
                <ul className="my-1 list-disc pl-5 space-y-0.5">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="my-1 list-decimal pl-5 space-y-0.5">{children}</ol>
              ),
              // Style headings
              h1: ({ children }) => <h1 className="my-2 text-base font-bold">{children}</h1>,
              h2: ({ children }) => <h2 className="my-2 text-sm font-bold">{children}</h2>,
              h3: ({ children }) => <h3 className="my-1.5 text-sm font-semibold">{children}</h3>,
              // Style paragraphs
              p: ({ children }) => <p className="my-1 last:mb-0">{children}</p>,
              // Style links
              a: ({ children, href }) => (
                <a href={href} target="_blank" rel="noopener noreferrer" className="underline text-magenta hover:brightness-110">
                  {children}
                </a>
              ),
              // Style horizontal rules
              hr: () => <hr className="my-3 border-border" />,
            }}
          >
            {message.content}
          </Markdown>
        )}
      </div>
    </div>
  );
}