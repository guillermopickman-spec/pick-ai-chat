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
  getConversation,
  deleteConversationApi,
  sendToHermesBot,
  sendChatMessage,
  DEFAULT_SETTINGS,
  getClientSystemPrompt,
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
  loadTrash,
  saveTrash,
  type TrashEntry,
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

1. IN-THREAD HISTORY: Your incoming message may start with a "[Conversation so far]" block. That block IS this same chat's transcript — what the user literally just said here. If the user asks what was discussed in this chat, answer from that block. Never call it a "new session" or "first message" when that block has content.

2. YOUR LONG-TERM MEMORY: You also retain facts the user has shared across sessions. If a question cannot be answered from the in-thread transcript, fall back to your memory. When you answer from memory, say so explicitly and confirm with the user (e.g. "From what I remember, your dog's name is Rex — is that right?"). Never present a memory-based answer as if it were just stated in this chat.

3. IF UNSURE: If you have no in-thread transcript for it and no confident memory of it, say plainly that you don't know. Do not invent facts.

Always be concise and friendly.`;

/**
 * Build the user message sent to Hermes.
 * Embeds the in-thread transcript directly into the message text (the field
 * Hermes always reads) so it cannot ignore the conversation. Auto-compacts
 * when long: older turns collapse into a short summary, only recent turns stay
 * verbatim. Silent — no extra LLM call, just trims, so it costs nothing.
 */
const MAX_VERBATIM_TURNS = 12;
const COMPACT_AFTER_CHARS = 4000;

function buildHermesMessage(
  text: string,
  history: { role: ChatRole; content: string }[],
): string {
  if (history.length === 0) return text;

  const transcript = history
    .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
    .join("\n");

  if (transcript.length <= COMPACT_AFTER_CHARS) {
    return `[Conversation so far]\n${transcript}\n[End conversation]\n\n${text}`;
  }

  // Auto-compact (free): summarize older turns, keep recent verbatim.
  const recent = history.slice(-MAX_VERBATIM_TURNS);
  const older = history.slice(0, -MAX_VERBATIM_TURNS);
  const olderSummary = older
    .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
    .join(" | ");
  const recentTranscript = recent
    .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
    .join("\n");

  return (
    `[Conversation so far — earlier part (condensed): ${olderSummary}]\n` +
    `[Conversation so far — recent:]\n${recentTranscript}\n` +
    `[End conversation]\n\n${text}`
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
  /** When admin is testing a client's agent: label for the conversation + disable server save. */
  testClientLabel?: string | null;
  /** When admin selects a specific agent (e.g. PickAGame), use its persona. */
  personaOverride?: string | null;
}) {
  const { mode, user, agentUrl, testClientLabel, personaOverride } = opts;
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [trash, setTrash] = useState<TrashEntry[]>(() => loadTrash());
  const [loading, setLoading] = useState(false);
  const initialized = useRef(false);
  const convIdRef = useRef<string | null>(null);

  // ── Load ────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (mode === "free") {
      if (initialized.current) return;
      initialized.current = true;
      const local = listFreeConversations();
      setConversations(local);
      const saved = getFreeActiveId();
      if (saved && local.find((c) => c.id === saved)) setActiveId(saved);
      else if (local.length > 0) setActiveId(local[0].id);
      return;
    }

    // mode === "hermes": must wait for the Clerk user to be available.
    // On a hard reload Clerk loads async, so user may be null on first paint —
    // don't load with an empty user, and re-run once the real user arrives.
    if (!user) return;
    if (initialized.current) return;
    initialized.current = true;

    setLoading(true);
    fetchConversations(user)
      .then((summaries) => {
        const convs = summaries.map(summaryToConversation);
        setConversations(convs);
        const saved = localStorage.getItem("pickaichat.active-conversation.v1");
        if (saved && convs.find((c) => c.id === saved)) setActiveId(saved);
        else if (convs.length > 0) setActiveId(convs[0].id);
      })
      .catch((err) => {
        console.error("Failed to load conversations from server:", err);
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
      title: testClientLabel ? `Test · ${testClientLabel}` : "New chat",
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    persist([conv, ...conversations], conv.id);
    return conv;
  }, [conversations, persist]);

  const deleteConversation = useCallback((id: string) => {
    const conv = conversations.find((c) => c.id === id);
    if (!conv) return;
    // Soft-delete: move to trash (local) instead of erasing. Server delete
    // only happens on permanent purge / delete-forever.
    const entry: TrashEntry = {
      conv,
      deletedAt: Date.now(),
      mode,
      user,
    };
    const trash = loadTrash().filter((e) => e.conv.id !== id);
    trash.unshift(entry);
    saveTrash(trash);
    setTrash(trash);

    const filtered = conversations.filter((c) => c.id !== id);
    const nextActive = id === activeId ? (filtered[0]?.id ?? null) : activeId;
    persist(filtered, nextActive);
  }, [conversations, activeId, persist, mode, user]);

  const restoreConversation = useCallback((id: string) => {
    const trash = loadTrash();
    const entry = trash.find((e) => e.conv.id === id);
    if (!entry) return;
    const remaining = trash.filter((e) => e.conv.id !== id);
    saveTrash(remaining);
    setTrash(remaining);
    persist([entry.conv, ...conversations], entry.conv.id);
  }, [conversations, persist]);

  const purgeTrashEntry = useCallback((id: string) => {
    const trash = loadTrash();
    const entry = trash.find((e) => e.conv.id === id);
    if (entry && entry.mode === "hermes" && entry.user && !testClientLabel) {
      deleteConversationApi(entry.user, id).catch((err) =>
        console.error("Failed to delete conversation on server:", err),
      );
    }
    const remaining = trash.filter((e) => e.conv.id !== id);
    saveTrash(remaining);
    setTrash(remaining);
  }, [testClientLabel]);

  const switchConversation = useCallback((id: string) => {
    if (mode === "free") setFreeActiveId(id);
    else localStorage.setItem("pickaichat.active-conversation.v1", id);
    setActiveId(id);
  }, [mode]);

  // Hermes mode: when the active conversation changes, load its message bodies
  // from the server (summaries only carry titles, not messages).
  useEffect(() => {
    if (mode !== "hermes" || !activeId || !user) return;
    let cancelled = false;
    getConversation(user, activeId)
      .then((detail) => {
        if (cancelled || !detail) return;
        const msgs: Message[] = (detail.messages ?? []).map((m) => ({
          id: m.id ?? newMessageId(),
          role: m.role === "assistant" ? "assistant" : "user",
          content: m.content ?? "",
          timestamp: m.timestamp ?? Date.now(),
        }));
        setConversations((prev) =>
          prev.map((c) =>
            c.id === activeId
              ? { ...c, messages: msgs, title: detail.title ?? c.title }
              : c,
          ),
        );
      })
      .catch((err) => console.error("Failed to load messages:", err));
    return () => {
      cancelled = true;
    };
  }, [activeId, mode, user]);

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

    const isTest = !!testClientLabel;
    const hermesMessage = buildHermesMessage(text, history);
    // Per-client bot persona when the user belongs to a client (e.g. Wilson's
    // Come2Ireland bot) or when an agent was selected (e.g. PickAGame);
    // otherwise the generic platform persona.
    const systemPrompt =
      personaOverride ??
      getClientSystemPrompt(user ?? "") ??
      HERMES_BASE_PROMPT;
    const { reply } = await sendToHermesBot(
      hermesMessage,
      convId,
      user ?? "",
      history,
      systemPrompt,
      agentUrl ?? undefined,
      !isTest, // test mode: don't persist to the client's server history
    );
    return reply;
  }, [conversations, mode, user, agentUrl, testClientLabel, personaOverride]);

  return {
    conversations,
    activeConversation,
    activeId,
    loading,
    trash,
    createConversation,
    deleteConversation,
    restoreConversation,
    purgeTrashEntry,
    switchConversation,
    addMessage,
    send,
    isFree: mode === "free",
  };
}

// Re-export the server-side chat fn so callers that previously imported it from
// useConversations keep working if needed.
export { chatWithAI };
