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
): Promise<string> {
  const result = await chatWithAI({
    data: { message: userMessage, model: settings.model },
  });

  if (!result.success) {
    throw new Error(result.error);
  }

  return result.reply;
}