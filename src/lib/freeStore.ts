/**
 * Local storage for FREE multi-thread conversations.
 * Mirrors the paid Conversation shape so ChatView needs no backend branching.
 * Nothing is sent to a server — threads persist only in the visitor's browser.
 */
import type { Conversation, Message } from "@/hooks/useChatSession";

const FREE_CONVERSATIONS_KEY = "pickaichat.free.conversations.v1";
const FREE_ACTIVE_KEY = "pickaichat.free.active-conversation.v1";

export function listFreeConversations(): Conversation[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(FREE_CONVERSATIONS_KEY);
    return raw ? (JSON.parse(raw) as Conversation[]) : [];
  } catch {
    return [];
  }
}

export function getFreeActiveId(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(FREE_ACTIVE_KEY);
}

export function saveFreeConversations(convs: Conversation[]): void {
  try {
    localStorage.setItem(FREE_CONVERSATIONS_KEY, JSON.stringify(convs));
  } catch {
    /* ignore quota / serialization errors */
  }
}

export function setFreeActiveId(id: string | null): void {
  try {
    if (id) localStorage.setItem(FREE_ACTIVE_KEY, id);
    else localStorage.removeItem(FREE_ACTIVE_KEY);
  } catch {
    /* ignore */
  }
}

export function newMessageId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

export function generateFreeTitle(content: string): string {
  const clean = content.trim().slice(0, 60);
  return clean.length < 60 ? clean : clean + "...";
}

export type { Conversation, Message };

// ── Trash (soft-delete with restore window) ──────────────────────────────
const TRASH_KEY = "pickaichat.trash.v1";
const TRASH_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export interface TrashEntry {
  conv: Conversation;
  deletedAt: number;
  mode: "hermes" | "free";
  user: string | null;
}

export function loadTrash(): TrashEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(TRASH_KEY);
    if (!raw) return [];
    const all = JSON.parse(raw) as TrashEntry[];
    const now = Date.now();
    // Drop entries older than the TTL.
    const fresh = all.filter((e) => now - e.deletedAt < TRASH_TTL_MS);
    if (fresh.length !== all.length) saveTrash(fresh);
    return fresh;
  } catch {
    return [];
  }
}

export function saveTrash(entries: TrashEntry[]): void {
  try {
    localStorage.setItem(TRASH_KEY, JSON.stringify(entries));
  } catch {
    /* ignore */
  }
}
