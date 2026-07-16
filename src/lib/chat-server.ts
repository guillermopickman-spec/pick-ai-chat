import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const ChatSchema = z.object({
  message: z.string().min(1).max(4000),
  model: z.string().optional().default("google/gemma-4-31b-it:free"),
});

const SYSTEM_PROMPT =
  "You are PickAIChat, a universal AI chat engine assistant. You help developers " +
  "understand the PickAIChat platform: a production-ready chat engine supporting " +
  "Telegram, WhatsApp, Web Chat, and Email with cross-channel session memory, " +
  "rate limiting, API key auth, upsell architecture, and provider-agnostic LLM " +
  "routing. Be concise, technical, and friendly.";

export const chatWithAI = createServerFn({ method: "POST" })
  .validator((data: unknown) => ChatSchema.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return {
        success: false as const,
        error: "Server not configured — contact the site owner",
      };
    }

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://pickaichat.dev",
        "X-Title": "PickAIChat Web",
      },
      body: JSON.stringify({
        model: data.model,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: data.message },
        ],
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("OpenRouter error", res.status, text);
      if (res.status === 429) {
        return {
          success: false as const,
          error: "Rate limit hit — try again in a moment",
        };
      }
      return {
        success: false as const,
        error: `AI request failed (${res.status})`,
      };
    }

    const json = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const content = json.choices?.[0]?.message?.content?.trim();

    if (!content) {
      return { success: false as const, error: "Empty response from AI" };
    }

    return { success: true as const, reply: content };
  });