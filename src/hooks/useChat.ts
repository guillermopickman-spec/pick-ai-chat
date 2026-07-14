import { useCallback, useEffect, useState } from "react";
import { DEFAULT_SETTINGS, sendChatMessage, type ChatSettings } from "@/utils/api";

export type Platform = "Telegram" | "WhatsApp" | "Web Chat";

export interface ChatMessage {
  id: string;
  kind: "inbound" | "response" | "error" | "system";
  platform?: Platform;
  text: string;
  ts: number;
}

const STORAGE_KEY = "pickaichat.settings.v1";

function loadSettings(): ChatSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function useChat() {
  const [settings, setSettings] = useState<ChatSettings>(DEFAULT_SETTINGS);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [platform, setPlatform] = useState<Platform>("Web Chat");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setSettings(loadSettings());
    setMessages([
      {
        id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
        kind: "system",
        text: "PickAIChat dispatcher online. Select a channel and send a message.",
        ts: Date.now(),
      },
    ]);
  }, []);

  const updateSettings = useCallback((next: ChatSettings) => {
    setSettings(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }, []);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      const inbound: ChatMessage = {
        id: crypto.randomUUID(),
        kind: "inbound",
        platform,
        text: trimmed,
        ts: Date.now(),
      };
      setMessages((m) => [...m, inbound]);
      setIsTyping(true);

      const started = Date.now();
      try {
        const reply = await sendChatMessage(settings, trimmed);
        const elapsed = Date.now() - started;
        if (elapsed < 500) await new Promise((r) => setTimeout(r, 500 - elapsed));
        setMessages((m) => [
          ...m,
          {
            id: crypto.randomUUID(),
            kind: "response",
            platform,
            text: reply,
            ts: Date.now(),
          },
        ]);
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Something went wrong";
        setMessages((m) => [
          ...m,
          {
            id: crypto.randomUUID(),
            kind: "error",
            text: msg,
            ts: Date.now(),
          },
        ]);
      } finally {
        setIsTyping(false);
      }
    },
    [platform, settings],
  );

  return {
    settings,
    updateSettings,
    messages,
    platform,
    setPlatform,
    isTyping,
    send,
  };
}
