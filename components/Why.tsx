"use client";

import type { CSSProperties, ReactNode } from "react";
import { t } from "@/lib/i18n";

/** Icons stay in code; zipped with `t.why.items` by index. */
const ICONS: ReactNode[] = [
  <svg key="shield" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z" strokeLinejoin="round" />
    <path d="M9 12l2 2 4-4" />
  </svg>,
  <svg key="doc" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <path d="M6 2h9l5 5v15H6z" strokeLinejoin="round" />
    <path d="M15 2v5h5M9 14l2 2 4-4" />
  </svg>,
  <svg key="chat" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <path d="M4 5h16v12H7l-3 3z" strokeLinejoin="round" />
    <path d="M8 10h8M8 13h5" />
  </svg>,
  <svg key="gear" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M19 5l-3 3M8 16l-3 3" />
    <circle cx="12" cy="12" r="3.4" />
  </svg>,
];

export default function Why() {
  return (
    <section className="section why eyebrow-dark">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="kicker">{t.why.kicker}</span>
          <h2>{t.why.title}</h2>
        </div>
        <div className="why-grid">
          {t.why.items.map((item, i) => (
            <div className="why-item reveal" key={item.title} style={{ ["--i"]: i } as CSSProperties}>
              <div className="ic">{ICONS[i]}</div>
              <div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
