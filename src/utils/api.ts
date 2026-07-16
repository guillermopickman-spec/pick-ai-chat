import { chatWithAI } from "@/lib/chat-server";

export interface ChatSettings {
  model: string;
}

export const DEFAULT_SETTINGS: ChatSettings = {
  model: "google/gemma-4-26b-a4b-it:free",
};

export const MODEL_OPTIONS = [
  "google/gemma-4-26b-a4b-it:free",
  "deepseek/deepseek-v4-flash:free",
  "nvidia/nemotron-3-super-120b-a12b:free",
  "minimax/maxim-m2.5:free",
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