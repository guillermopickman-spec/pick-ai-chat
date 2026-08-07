import { chatWithAI } from "@/lib/chat-server";

/** Admin emails (both Guille's Google accounts). */
export const ADMIN_EMAILS = ["pickaichat@gmail.com", "guillermopickman@gmail.com"];
export function isAdminEmail(email: string | undefined | null): boolean {
  return !!email && ADMIN_EMAILS.includes(email);
}

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

/**
 * Free chat — stateless OpenRouter call. History is NOT sent (the free
 * backend is a plain echo chat; only locally-stored threads persist for display).
 */
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
 * Hermes webchat base URL.
 * The web chat talks DIRECTLY to the platform Hermes agent. It must NOT be
 * routed by email — that is a separate engine (Wilson -> IONOS).
 * Override per-deployment via VITE_HERMES_API_URL.
 */
const DEFAULT_HERMES_URL = "https://mail.pickaichat.com";

function hermesBaseUrl(): string {
  return import.meta.env.VITE_HERMES_API_URL || DEFAULT_HERMES_URL;
}

/**
 * Per-client webchat routing. Each client with their own Hermes agent is
 * mapped here by login email. This is WEBCHAT ONLY — it is NOT the email
 * auto-reply engine (Wilson -> IONOS). The two must never be entangled.
 */
const WEBCHAT_AGENT_URLS: Record<string, string> = {
  "josewilson95@gmail.com": "https://mail.come2ireland.com",
};

/**
 * Per-client bot persona sent as the system prompt to each client's own
 * Hermes agent. Keyed by the same login email as WEBCHAT_AGENT_URLS.
 * A client's bot speaks for THEIR business — never the generic platform voice.
 */
const CLIENT_SYSTEM_PROMPTS: Record<string, string> = {
  "josewilson95@gmail.com":
    "You are the virtual assistant for Come2Ireland (Jose Wilson's company). " +
    "You help with his business broadly — mainly immigration, visas, relocation and " +
    "moving to Ireland — but you're also happy to help with anything else. " +
    "Be friendly and clear, and reply in the same language the client writes in.",
};

/** Resolve the per-client webchat URL for a logged-in user (or undefined). */
export function getClientAgentUrl(user: string): string | undefined {
  return WEBCHAT_AGENT_URLS[user];
}

/** Resolve the per-client system prompt (bot persona) for a user (or undefined). */
export function getClientSystemPrompt(user: string): string | undefined {
  return CLIENT_SYSTEM_PROMPTS[user];
}

/** Admin-only agent override (for testing any client's agent). */
const OVERRIDE_KEY = "pickaichat.agent-override";
export function setOverrideHermesUrl(url: string | null) {
  if (url) localStorage.setItem(OVERRIDE_KEY, url);
  else localStorage.removeItem(OVERRIDE_KEY);
}
export function getOverrideHermesUrl(): string | null {
  return localStorage.getItem(OVERRIDE_KEY);
}

/** Selectable agents for the admin dropdown. */
export function getAgentOptions(): { label: string; url: string }[] {
  const options = [{ label: "Default", url: hermesBaseUrl() }];
  for (const [email, url] of Object.entries(WEBCHAT_AGENT_URLS)) {
    const name = email.split("@")[0].replace(/[._]/g, " ");
    options.push({ label: `${name.charAt(0).toUpperCase() + name.slice(1)} (${email})`, url });
  }
  return options;
}

/**
 * Resolve the Hermes URL for a send:
 *   1. admin override (if set)  -> else
 *   2. per-client webchat URL for this user  -> else
 *   3. platform default.
 */
export function resolveHermesUrl(user: string): string {
  const override = getOverrideHermesUrl();
  if (override) return override;
  return WEBCHAT_AGENT_URLS[user] || hermesBaseUrl();
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

export type ChatHistoryItem = {
  role: "user" | "assistant";
  content: string;
};

/**
 * Send a message to the Hermes webchat API.
 * Sends the FULL prior thread history so the agent can follow the conversation
 * (Layer 1 of two-layer remembrance). `systemPrompt` steers Layer-1/Layer-2 phrasing.
 *
 * `persist` (default true): when true, uses /api/webchat (conversation saved on
 * the server). When false (admin testing a client), uses /api/chat which replies
 * WITHOUT saving — so the admin's test messages never land in the client's history.
 */
export async function sendToHermesBot(
  message: string,
  conversationId: string,
  user: string,
  history: ChatHistoryItem[] = [],
  systemPrompt?: string,
  baseUrl?: string,
  persist: boolean = true,
): Promise<{ reply: string; title?: string }> {
  const url = baseUrl || resolveHermesUrl(user);
  const endpoint = persist ? "/api/webchat" : "/api/chat";
  const res = await fetch(`${url}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      conversation_id: conversationId,
      user,
      history,
      system_prompt: systemPrompt,
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
 * List all conversations for a user (server-backed, paid side).
 */
export async function fetchConversations(user: string): Promise<ConversationSummary[]> {
  const baseUrl = resolveHermesUrl(user) || hermesBaseUrl();
  const res = await fetch(
    `${baseUrl}/api/conversations?user=${encodeURIComponent(user)}`,
  );
  if (!res.ok) throw new Error(`Failed to fetch conversations (${res.status})`);
  const data = await res.json();
  return data.conversations ?? [];
}

/**
 * Get full conversation with messages (server-backed, paid side).
 */
export async function getConversation(
  user: string,
  convId: string,
): Promise<ConversationDetail | null> {
  const baseUrl = resolveHermesUrl(user) || hermesBaseUrl();
  const res = await fetch(
    `${baseUrl}/api/conversations/${encodeURIComponent(convId)}?user=${encodeURIComponent(user)}`,
  );
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Failed to fetch conversation (${res.status})`);
  return res.json();
}

/**
 * Delete a conversation (server-backed, paid side).
 */
export async function deleteConversationApi(
  user: string,
  convId: string,
): Promise<void> {
  const baseUrl = resolveHermesUrl(user) || hermesBaseUrl();
  const res = await fetch(
    `${baseUrl}/api/conversations/${encodeURIComponent(convId)}?user=${encodeURIComponent(user)}`,
    { method: "DELETE" },
  );
  if (!res.ok && res.status !== 404) {
    throw new Error(`Failed to delete conversation (${res.status})`);
  }
}
