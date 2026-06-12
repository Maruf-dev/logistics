"use client";

import { LANGS, LANG_LABEL } from "@/lib/i18n";
import { useI18n } from "./LanguageProvider";

/** Compact EN / RU segmented toggle for the dark header + drawer. */
export default function LangToggle({ className = "" }: { className?: string }) {
  const { lang, setLang, t } = useI18n();

  return (
    <div className={`lang-toggle ${className}`.trim()} role="group" aria-label={t.a11y.switchLang}>
      {LANGS.map((l) => (
        <button
          key={l}
          type="button"
          className={`lang-opt${lang === l ? " active" : ""}`}
          aria-pressed={lang === l}
          onClick={() => setLang(l)}
        >
          {LANG_LABEL[l]}
        </button>
      ))}
    </div>
  );
}
