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
  history?: Array<{ role: "user" | "assistant"; content: string }>,
): Promise<string> {
  const messages = [
    ...(history || []),
    { role: "user" as const, content: userMessage },
  ];
  const result = await chatWithAI({
    data: { messages, model: settings.model, systemPrompt },
  });

  if (!result.success) {
    throw new Error(result.error);
  }

  return result.reply;
}

/**
 * Hermes API base URL — configured per user via a simple mapping.
 * Each user connects to their own Hermes agent.
 * Default: "https://mail.pickaichat.com"
 */
const DEFAULT_HERMES_URL = "https://mail.pickaichat.com";

/** Map user emails to their Hermes agent URLs */
const USER_AGENT_URLS: Record<string, string> = {
  "josewilson95@gmail.com": "https://mail.come2ireland.com",
};

function getUserHermesUrl(user: string): string {
  return USER_AGENT_URLS[user] || import.meta.env.VITE_HERMES_API_URL || DEFAULT_HERMES_URL;
}

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
  const baseUrl = getUserHermesUrl(user);
  const res = await fetch(`${baseUrl}/api/webchat`, {
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
  const baseUrl = getUserHermesUrl(user);
  const res = await fetch(
    `${baseUrl}/api/conversations?user=${encodeURIComponent(user)}`,
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
  const baseUrl = getUserHermesUrl(user);
  const res = await fetch(
    `${baseUrl}/api/conversations/${encodeURIComponent(convId)}?user=${encodeURIComponent(user)}`,
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
  const baseUrl = getUserHermesUrl(user);
  const res = await fetch(
    `${baseUrl}/api/conversations/${encodeURIComponent(convId)}?user=${encodeURIComponent(user)}`,
    { method: "DELETE" },
  );
  if (!res.ok && res.status !== 404) {
    throw new Error(`Failed to delete conversation (${res.status})`);
  }
}