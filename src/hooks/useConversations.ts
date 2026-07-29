import { useCallback, useEffect, useRef, useState } from "react";
import {
  fetchConversations,
  deleteConversationApi,
  type ConversationSummary,
} from "@/utils/api";

export interface Message {
  id: string;
  role: "user" | "assistant";
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

const CONVERSATIONS_KEY = "pickaichat.conversations.v1";
const ACTIVE_CONV_KEY = "pickaichat.active-conversation.v1";

function generateTitle(content: string): string {
  const clean = content.trim().slice(0, 60);
  return clean.length < 60 ? clean : clean + "...";
}

function generateId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

function loadLocalConversations(): Conversation[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CONVERSATIONS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalConversations(convs: Conversation[]) {
  try {
    localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(convs));
  } catch {
    /* ignore */
  }
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

export function useConversations(user: string | null) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const initialized = useRef(false);

  // Load from server on mount
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    if (!user) {
      const local = loadLocalConversations();
      setConversations(local);
      const saved = localStorage.getItem(ACTIVE_CONV_KEY);
      if (saved && local.find((c) => c.id === saved)) {
        setActiveId(saved);
      } else if (local.length > 0) {
        setActiveId(local[0].id);
      }
      return;
    }

    setLoading(true);
    fetchConversations(user)
      .then((summaries) => {
        const convs = summaries.map(summaryToConversation);
        setConversations(convs);
        saveLocalConversations(convs);

        const saved = localStorage.getItem(ACTIVE_CONV_KEY);
        if (saved && convs.find((c) => c.id === saved)) {
          setActiveId(saved);
        } else if (convs.length > 0) {
          setActiveId(convs[0].id);
        }
      })
      .catch((err) => {
        console.error("Failed to load conversations from server:", err);
        const local = loadLocalConversations();
        setConversations(local);
        const saved = localStorage.getItem(ACTIVE_CONV_KEY);
        if (saved && local.find((c) => c.id === saved)) {
          setActiveId(saved);
        } else if (local.length > 0) {
          setActiveId(local[0].id);
        }
      })
      .finally(() => setLoading(false));
  }, [user]);

  const persist = useCallback((convs: Conversation[], active?: string | null) => {
    setConversations(convs);
    saveLocalConversations(convs);
    if (active !== undefined) {
      setActiveId(active);
      localStorage.setItem(ACTIVE_CONV_KEY, active ?? "");
    }
  }, []);

  const activeConversation = conversations.find((c) => c.id === activeId) ?? null;

  const createConversation = useCallback(() => {
    const conv: Conversation = {
      id: generateId(),
      title: "New chat",
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    persist([conv, ...conversations], conv.id);
    return conv;
  }, [conversations, persist]);

  const deleteConversation = useCallback(
    (id: string) => {
      if (user) {
        deleteConversationApi(user, id).catch((err) =>
          console.error("Failed to delete conversation on server:", err),
        );
      }
      const filtered = conversations.filter((c) => c.id !== id);
      const nextActive = id === activeId ? (filtered[0]?.id ?? null) : activeId;
      persist(filtered, nextActive);
    },
    [conversations, activeId, persist, user],
  );

  const renameConversation = useCallback(
    (id: string, title: string) => {
      const updated = conversations.map((c) =>
        c.id === id ? { ...c, title, updatedAt: Date.now() } : c,
      );
      persist(updated, activeId);
    },
    [conversations, activeId, persist],
  );

  const switchConversation = useCallback((id: string) => {
    localStorage.setItem(ACTIVE_CONV_KEY, id);
    setActiveId(id);
  }, []);

  const addMessage = useCallback(
    (role: "user" | "assistant", content: string, convId?: string, titleOverride?: string) => {
      const targetId = convId ?? activeId;
      if (!targetId) return;
      const msg: Message = {
        id: generateId(),
        role,
        content,
        timestamp: Date.now(),
      };
      // Read fresh conversations from localStorage to avoid stale closure
      const current = loadLocalConversations();
      const updated = current.map((c) => {
        if (c.id !== targetId) return c;
        const messages = [...c.messages, msg];
        // Use API-provided title for new conversations, otherwise keep existing
        const title = titleOverride ?? (c.messages.length === 0 ? generateTitle(content) : c.title);
        return { ...c, messages, title, updatedAt: Date.now() };
      });
      persist(updated, targetId);
    },
    [activeId, persist],
  );

  return {
    conversations,
    activeConversation,
    activeId,
    loading,
    createConversation,
    deleteConversation,
    renameConversation,
    switchConversation,
    addMessage,
  };
}