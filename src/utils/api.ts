export interface ChatSettings {
  endpoint: string;
  apiKey: string;
  model: string;
}

export const DEFAULT_SETTINGS: ChatSettings = {
  endpoint: "https://openrouter.ai/api/v1/chat/completions",
  apiKey: "",
  model: "google/gemma-4-31b-it:free",
};

export const MODEL_OPTIONS = [
  "google/gemma-4-31b-it:free",
  "deepseek/deepseek-v4-flash:free",
  "nvidia/nemotron-3-super-120b-a12b:free",
  "minimax/maxim-m2.5:free",
];

const SYSTEM_PROMPT =
  "You are PickAIChat, a universal AI chat engine assistant. You help developers understand the PickAIChat platform: a production-ready chat engine supporting Telegram, WhatsApp, Web Chat, and Email with cross-channel session memory, rate limiting, API key auth, upsell architecture, and provider-agnostic LLM routing. Be concise, technical, and friendly.";

export async function sendChatMessage(
  settings: ChatSettings,
  userMessage: string,
): Promise<string> {
  if (!settings.apiKey.trim()) {
    throw new Error("API key not configured — open Settings");
  }

  const res = await fetch(settings.endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${settings.apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer":
        typeof window !== "undefined" ? window.location.origin : "https://pickaichat.dev",
      "X-Title": "PickAIChat Demo",
    },
    body: JSON.stringify({
      model: settings.model,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userMessage },
      ],
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    if (res.status === 401 || res.status === 403) {
      throw new Error("API key rejected — check your key in Settings");
    }
    if (res.status === 404 || /model/i.test(text)) {
      throw new Error("Model unavailable, try another");
    }
    if (res.status === 429) {
      throw new Error("Rate limit hit — slow down and try again");
    }
    throw new Error(`Request failed (${res.status})`);
  }

  const data = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const content = data.choices?.[0]?.message?.content?.trim();
  if (!content) throw new Error("Empty response from model");
  return content;
}
