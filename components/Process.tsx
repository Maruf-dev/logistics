"use client";

import type { CSSProperties } from "react";
import { useI18n } from "./LanguageProvider";

export default function Process() {
  const { t } = useI18n();

  return (
    <section className="section" id="process">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="kicker">{t.process.kicker}</span>
          <h2>{t.process.title}</h2>
        </div>
        <div className="proc-grid">
          {t.process.steps.map((step, i) => (
            <div className="step reveal" key={step.n} style={{ ["--i"]: i } as CSSProperties}>
              <div className="n">{step.n}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
