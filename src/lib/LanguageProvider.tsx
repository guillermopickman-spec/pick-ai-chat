import { createContext, useContext, useState, type ReactNode } from "react";
import { type Lang, t as translate } from "./i18n";

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string, ...args: string[]) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

function detectLanguage(): Lang {
  if (typeof window === "undefined") return "es";
  try {
    // Check localStorage first
    const stored = window.localStorage.getItem("pickaichat.lang");
    if (stored === "es" || stored === "en") return stored as Lang;
    // Detect browser language
    const browserLang = navigator.language || navigator.languages?.[0] || "";
    if (browserLang.startsWith("es")) return "es";
    return "en";
  } catch {
    return "en";
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLanguage);

  const setLang = (next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem("pickaichat.lang", next);
    } catch {
      /* ignore */
    }
  };

  const value: LanguageContextType = {
    lang,
    setLang,
    t: (key, ...args) => translate(lang, key, ...args),
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}