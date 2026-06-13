"use client";

import { t } from "@/lib/i18n";

/** Display values (language-independent). Order matches `t.stats`. */
const VALUES = [48, 53, 24, 98];

export default function Stats() {
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
