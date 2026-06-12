"use client";

import { useI18n } from "./LanguageProvider";

/** Display values (language-independent). Order matches `t.stats`. */
const VALUES = [48, 53, 24, 2];

export default function Stats() {
  const { t } = useI18n();

  return (
    <section className="stats">
      <div className="wrap">
        {t.stats.map((stat, i) => (
          <div className="stat" key={stat.label}>
            <div className="num">
              {stat.prefix}
              {VALUES[i]}
              {stat.suffix && <small>{stat.suffix}</small>}
            </div>
            <div className="lbl">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
