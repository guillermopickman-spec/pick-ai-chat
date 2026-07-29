import { chatWithAI } from "@/lib/chat-server";

export interface ChatSettings {
  model: string;
}

export const DEFAULT_SETTINGS: ChatSettings = {
  model: "openrouter/free",
};

export const MODEL_OPTIONS = [
  "openrouter/free",
  "openrouter/auto",
  "google/gemma-4-26b-a4b-it:free",
  "deepseek/deepseek-v4-flash:free",
];

export async function sendChatMessage(
  settings: ChatSettings,
  userMessage: string,
  systemPrompt?: string,
): Promise<string> {
  const result = await chatWithAI({
    data: { message: userMessage, model: settings.model, systemPrompt },
  });

  if (!result.success) {
    throw new Error(result.error);
  }

  return result.reply;
}

/**
 * Hermes API base URL — configurable via VITE_HERMES_API_URL env var.
 * Default: test endpoint on RackNerd VPS.
 * For production (Jose): set to "https://mail.come2ireland.com/api/webchat"
 */
const HERMES_API_URL =
  import.meta.env.VITE_HERMES_API_URL ||
  "https://mail.pickaichat.com";

export interface ConversationSummary {
  id: string;
  title: string;
  created_at: number;
  updated_at: number;
  message_count: number;
}

export interface ConversationDetail {
  id: string;
  title: string;
  user: string;
  created_at: number;
  updated_at: number;
  messages: MessageItem[];
}

export interface MessageItem {
  id: string;
  role: string;
  content: string;
  timestamp: number;
}

/**
 * Send a message to the webchat API and persist the conversation.
 */
export async function sendToHermesBot(
  message: string,
  conversationId: string,
  user: string,
): Promise<{ reply: string; title?: string }> {
  const res = await fetch(`${HERMES_API_URL}/api/webchat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      conversation_id: conversationId,
      user,
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API error (${res.status}): ${text}`);
  }

  const data = await res.json();
  return { reply: data.reply, title: data.title };
}

/**
 * List all conversations for a user.
 */
export async function fetchConversations(user: string): Promise<ConversationSummary[]> {
  const res = await fetch(
    `${HERMES_API_URL}/api/conversations?user=${encodeURIComponent(user)}`,
  );
  if (!res.ok) throw new Error(`Failed to fetch conversations (${res.status})`);
  const data = await res.json();
  return data.conversations ?? [];
}

/**
 * Get full conversation with messages.
 */
export async function getConversation(
  user: string,
  convId: string,
): Promise<ConversationDetail | null> {
  const res = await fetch(
    `${HERMES_API_URL}/api/conversations/${encodeURIComponent(convId)}?user=${encodeURIComponent(user)}`,
  );
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Failed to fetch conversation (${res.status})`);
  return res.json();
}

/**
 * Delete a conversation.
 */
export async function deleteConversationApi(
  user: string,
  convId: string,
): Promise<void> {
  const res = await fetch(
    `${HERMES_API_URL}/api/conversations/${encodeURIComponent(convId)}?user=${encodeURIComponent(user)}`,
    { method: "DELETE" },
  );
  if (!res.ok && res.status !== 404) {
    throw new Error(`Failed to delete conversation (${res.status})`);
  }
}