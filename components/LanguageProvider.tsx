"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  DEFAULT_LANG,
  STORAGE_KEY,
  dictionaries,
  type Dict,
  type Lang,
} from "@/lib/i18n";

type I18nContext = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Dict;
};

const Ctx = createContext<I18nContext | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // SSR + first paint render the default (English) so the static HTML is English.
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG);

  // Restore a previously chosen language on mount.
  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "ru") setLangState(saved);
  }, []);

  // Keep <html lang> in sync for a11y / SEO.
  useEffect(() => {
    document.documentElement.lang = dictionaries[lang].htmlLang;
  }, [lang]);

  const setLang = (next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable — ignore */
    }
  };

  return (
    <Ctx.Provider value={{ lang, setLang, t: dictionaries[lang] }}>
      {children}
    </Ctx.Provider>
  );
}

export function useI18n(): I18nContext {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useI18n must be used within a LanguageProvider");
  return ctx;
}
