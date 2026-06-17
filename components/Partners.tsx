"use client";

import type { CSSProperties } from "react";
import { t } from "@/lib/i18n";

export default function Partners() {
  return (
    <section className="section partners" id="partners">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="kicker">{t.partners.kicker}</span>
          <h2>{t.partners.title}</h2>
          <p>{t.partners.lead}</p>
        </div>
        <div className="partner-grid">
          {t.partners.items.map((p, i) => (
            <div className="partner reveal" key={p.name} style={{ ["--i"]: i } as CSSProperties}>
              {/* If the PNG is missing, hide the broken image and reveal the name wordmark. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.logo}
                alt={p.name}
                loading="lazy"
                onError={(e) => {
                  const img = e.currentTarget;
                  img.style.display = "none";
                  const fallback = img.nextElementSibling as HTMLElement | null;
                  if (fallback) fallback.style.display = "block";
                }}
              />
              <span className="p-name">{p.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
