/**
 * Unified chat session hook powering BOTH the paid (Hermes) and free chat UIs.
 * A single presentational <ChatView /> consumes this hook, so the two chat
 * surfaces are a visual mirror — editing ChatView updates both at once.
 *
 * mode: "hermes" -> paid users; messages persist on the Hermes server, full
 *                    thread history is sent every turn (two-layer remembrance).
 * mode: "free"   -> visitors/free users; threads persist in localStorage only,
 *                    backend is stateless OpenRouter (no cross-turn memory).
 */
import { useCallback, useEffect, useRef, useState } from "react";
import {
  fetchConversations,
  deleteConversationApi,
  sendToHermesBot,
  sendChatMessage,
  DEFAULT_SETTINGS,
  type ConversationSummary,
} from "@/utils/api";
import { chatWithAI } from "@/lib/chat-server";
import {
  listFreeConversations,
  getFreeActiveId,
  saveFreeConversations,
  setFreeActiveId,
  newMessageId,
  generateFreeTitle,
} from "@/lib/freeStore";

export type ChatRole = "user" | "assistant";

export interface Message {
  id: string;
  role: ChatRole;
  content: string;
  timestamp: number;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
}

const HERMES_SYSTEM_PROMPT = `You are PickAIChat, an AI assistant for a paying user.

Two kinds of context reach you:

1. IN-THREAD HISTORY: If the history field contains earlier messages from THIS chat, treat them as what the user said in this same conversation. If the user asks about something already stated here, answer directly from that history (e.g. "You just said Rex"). Do not claim you "remember" it from elsewhere — it is right here in the thread.

2. YOUR LONG-TERM MEMORY: You also retain facts the user has shared across sessions. If a question cannot be answered from the in-thread history, fall back to your memory. When you answer from memory, say so explicitly and confirm with the user (e.g. "From what I remember, your dog's name is Rex — is that right?"). Never present a memory-based answer as if it were just stated in this chat.

3. IF UNSURE: If you have no in-thread history for it and no confident memory of it, say plainly that you don't know. Do not invent facts.

Always be concise and friendly.`;

function summaryToConversation(s: ConversationSummary): Conversation {
  return {
    id: s.id,
    title: s.title,
    messages: [],
    createdAt: s.created_at,
    updatedAt: s.updated_at,
  };
}

export function useChatSession(opts: {
  mode: "hermes" | "free";
  user: string | null;
  agentUrl?: string | null;
}) {
  const { mode, user, agentUrl } = opts;
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const initialized = useRef(false);
  const convIdRef = useRef<string | null>(null);

  // ── Load ────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    if (mode === "free") {
      const local = listFreeConversations();
      setConversations(local);
      const saved = getFreeActiveId();
      if (saved && local.find((c) => c.id === saved)) setActiveId(saved);
      else if (local.length > 0) setActiveId(local[0].id);
      return;
    }

    // mode === "hermes"
    setLoading(true);
    fetchConversations(user ?? "")
      .then((summaries) => {
        const convs = summaries.map(summaryToConversation);
        setConversations(convs);
        const saved = localStorage.getItem("pickaichat.active-conversation.v1");
        if (saved && convs.find((c) => c.id === saved)) setActiveId(saved);
        else if (convs.length > 0) setActiveId(convs[0].id);
      })
      .catch((err) => {
        console.error("Failed to load conversations from server:", err);
        const local = listFreeConversations();
        setConversations(local);
        const saved = localStorage.getItem("pickaichat.active-conversation.v1");
        if (saved && local.find((c) => c.id === saved)) setActiveId(saved);
        else if (local.length > 0) setActiveId(local[0].id);
      })
      .finally(() => setLoading(false));
  }, [mode, user]);

  const persist = useCallback((convs: Conversation[], active?: string | null) => {
    setConversations(convs);
    if (mode === "free") {
      saveFreeConversations(convs);
      if (active !== undefined) setFreeActiveId(active);
    } else {
      if (active !== undefined) {
        setActiveId(active);
        localStorage.setItem("pickaichat.active-conversation.v1", active ?? "");
      }
    }
  }, [mode]);

  const activeConversation = conversations.find((c) => c.id === activeId) ?? null;

  const createConversation = useCallback(() => {
    const conv: Conversation = {
      id: newMessageId(),
      title: "New chat",
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    persist([conv, ...conversations], conv.id);
    return conv;
  }, [conversations, persist]);

  const deleteConversation = useCallback((id: string) => {
    if (mode === "hermes" && user) {
      deleteConversationApi(user, id).catch((err) =>
        console.error("Failed to delete conversation on server:", err),
      );
    }
    const filtered = conversations.filter((c) => c.id !== id);
    const nextActive = id === activeId ? (filtered[0]?.id ?? null) : activeId;
    persist(filtered, nextActive);
  }, [conversations, activeId, persist, mode, user]);

  const switchConversation = useCallback((id: string) => {
    if (mode === "free") setFreeActiveId(id);
    else localStorage.setItem("pickaichat.active-conversation.v1", id);
    setActiveId(id);
  }, [mode]);

  const addMessage = useCallback((
    role: ChatRole,
    content: string,
    convId?: string,
    titleOverride?: string,
  ) => {
    const targetId = convId ?? activeId;
    if (!targetId) return;
    const msg: Message = {
      id: newMessageId(),
      role,
      content,
      timestamp: Date.now(),
    };
    // Read fresh state to avoid stale closure
    setConversations((prev) => {
      const updated = prev.map((c) => {
        if (c.id !== targetId) return c;
        const title =
          titleOverride ?? (c.messages.length === 0 ? generateFreeTitle(content) : c.title);
        return { ...c, messages: [...c.messages, msg], title, updatedAt: Date.now() };
      });
      if (mode === "free") saveFreeConversations(updated);
      return updated;
    });
  }, [activeId, mode]);

  /**
   * Send a user message and return the assistant reply.
   * - hermes: sends full thread history + two-layer system prompt.
   * - free: stateless OpenRouter call (history NOT sent).
   */
  const send = useCallback(async (text: string, convId: string): Promise<string> => {
    convIdRef.current = convId;
    const conv = conversations.find((c) => c.id === convId);
    const history: { role: ChatRole; content: string }[] =
      conv?.messages.map((m) => ({ role: m.role, content: m.content })) ?? [];

    if (mode === "free") {
      // Stateless: send only the latest message to the free backend.
      const reply = await sendChatMessage(DEFAULT_SETTINGS, text);
      return reply;
    }

    const { reply } = await sendToHermesBot(
      text,
      convId,
      user ?? "",
      history,
      HERMES_SYSTEM_PROMPT,
      agentUrl ?? undefined,
    );
    return reply;
  }, [conversations, mode, user, agentUrl]);

  return {
    conversations,
    activeConversation,
    activeId,
    loading,
    createConversation,
    deleteConversation,
    switchConversation,
    addMessage,
    send,
    isFree: mode === "free",
  };
}

// Re-export the server-side chat fn so callers that previously imported it from
// useConversations keep working if needed.
export { chatWithAI };
