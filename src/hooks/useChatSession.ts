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

const HERMES_BASE_PROMPT = `You are PickAIChat, an AI assistant for a paying user.

Two kinds of context reach you:

1. IN-THREAD HISTORY: The conversation transcript below (under "CURRENT CONVERSATION SO FAR") is THIS chat. Treat it as what the user literally just said in this same conversation. If the user asks about something already stated here, answer directly from that transcript (e.g. "You just said Rex"). Do not claim you "remember" it from elsewhere — it is right here in the thread.

2. YOUR LONG-TERM MEMORY: You also retain facts the user has shared across sessions. If a question cannot be answered from the in-thread transcript, fall back to your memory. When you answer from memory, say so explicitly and confirm with the user (e.g. "From what I remember, your dog's name is Rex — is that right?"). Never present a memory-based answer as if it were just stated in this chat.

3. IF UNSURE: If you have no in-thread transcript for it and no confident memory of it, say plainly that you don't know. Do not invent facts.

Always be concise and friendly.`;

/**
 * Build the full system prompt for Hermes.
 * Folds the in-thread transcript directly into the prompt (so the model can't
 * ignore a side `history` field), and auto-compacts it when it gets too long:
 * older turns are collapsed into a short summary, only the recent turns stay
 * verbatim. Silent — the user never sees or triggers this.
 */
const MAX_VERBATIM_TURNS = 12; // keep last N turns word-for-word
const COMPACT_AFTER_CHARS = 4000; // if transcript exceeds this, compact

function buildHermesPrompt(history: { role: ChatRole; content: string }[]): string {
  if (history.length === 0) return HERMES_BASE_PROMPT;

  const transcript = history
    .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
    .join("\n");

  if (transcript.length <= COMPACT_AFTER_CHARS) {
    return `${HERMES_BASE_PROMPT}\n\nCURRENT CONVERSATION SO FAR:\n${transcript}`;
  }

  // Auto-compact: summarize everything except the last MAX_VERBATIM_TURNS.
  const recent = history.slice(-MAX_VERBATIM_TURNS);
  const older = history.slice(0, -MAX_VERBATIM_TURNS);
  const olderSummary = older
    .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
    .join(" | ");
  const recentTranscript = recent
    .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
    .join("\n");

  return (
    `${HERMES_BASE_PROMPT}\n\n` +
    `EARLIER PART OF THIS CONVERSATION (condensed summary):\n` +
    `${olderSummary}\n\n` +
    `CURRENT CONVERSATION SO FAR (recent turns):\n${recentTranscript}`
  );
}

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
      buildHermesPrompt(history),
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
