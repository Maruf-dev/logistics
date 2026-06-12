"use client";

import type { ReactNode } from "react";
import { useI18n } from "./LanguageProvider";

/** Icons stay in code (not translatable); zipped with `t.services.items` by index. */
const ICONS: ReactNode[] = [
  <svg key="ftl" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <path d="M1 5h13v10H1zM14 8h4l3 3v4h-7" strokeLinejoin="round" />
    <circle cx="6" cy="17" r="2" />
    <circle cx="17" cy="17" r="2" />
  </svg>,
  <svg key="ltl" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <path d="M3 8l9-5 9 5v8l-9 5-9-5z" strokeLinejoin="round" />
    <path d="M3 8l9 5 9-5M12 13v8" />
  </svg>,
  <svg key="exp" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <path d="M13 2L4 14h7l-1 8 9-12h-7z" strokeLinejoin="round" />
  </svg>,
  <svg key="ware" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <path d="M3 21V9l9-6 9 6v12" strokeLinejoin="round" />
    <path d="M7 21v-7h10v7M7 14h10" />
  </svg>,
  <svg key="track" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <path d="M12 21s-7-5.2-7-11a7 7 0 0114 0c0 5.8-7 11-7 11z" strokeLinejoin="round" />
    <circle cx="12" cy="10" r="2.6" />
  </svg>,
  <svg key="doc" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <path d="M6 2h9l5 5v15H6z" strokeLinejoin="round" />
    <path d="M15 2v5h5M9 13h7M9 17h7" />
  </svg>,
];

export default function Services() {
  const { t } = useI18n();

  return (
    <section className="section" id="services">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="kicker">{t.services.kicker}</span>
          <h2>{t.services.title}</h2>
          <p>{t.services.lead}</p>
        </div>
        <div className="svc-grid">
          {t.services.items.map((svc, i) => (
            <article className={`svc reveal${i === 0 ? " feat" : ""}`} key={svc.title}>
              <span className="tag">{svc.tag}</span>
              <div className="ic">{ICONS[i]}</div>
              <h3>{svc.title}</h3>
              <p>{svc.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
