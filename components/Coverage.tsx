"use client";

import { useI18n } from "./LanguageProvider";

export default function Coverage() {
  const { t } = useI18n();
  const c = t.coverage;

  return (
    <section className="section coverage eyebrow-dark" id="coverage">
      <div className="wrap">
        <div className="cov-grid">
          <div className="reveal">
            <span className="kicker">{c.kicker}</span>
            <h2 style={{ color: "#fff", fontSize: "clamp(30px,4vw,46px)", marginTop: 18 }}>{c.title}</h2>
            <p style={{ color: "var(--on-ink-mut)", marginTop: 18, fontSize: 17 }}>{c.lead}</p>
            <div style={{ marginTop: 26 }}>
              {c.lanes.map((lane) => (
                <div className="lane" key={`${lane.from}-${lane.to}`}>
                  <span className="ln-cities">
                    {lane.from}
                    <span className="arr" />
                    {lane.to}
                  </span>
                  <span className="ln-time mono">{lane.time}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="map-wrap reveal">
            <svg viewBox="0 0 460 300" aria-label={t.a11y.coverageMap}>
              {/* abstract route lines from hub */}
              <path className="mp-line" d="M150 210 L300 90" />
              <path className="mp-line" d="M150 210 L120 110" />
              <path className="mp-line" d="M150 210 L340 200" />
              <path className="mp-line" d="M150 210 L60 150" />
              <path className="mp-line" d="M150 210 L250 250" />
              {/* dest nodes */}
              <circle className="mp-node" cx="300" cy="90" r="5" />
              <circle className="mp-node" cx="120" cy="110" r="5" />
              <circle className="mp-node" cx="340" cy="200" r="5" />
              <circle className="mp-node" cx="60" cy="150" r="5" />
              <circle className="mp-node" cx="250" cy="250" r="5" />
              {/* labels */}
              <text className="node-label" x="312" y="86" fill="var(--on-ink-mut)" style={{ fontSize: 11 }}>
                {c.map.chicago}
              </text>
              <text className="node-label" x="78" y="106" fill="var(--on-ink-mut)" style={{ fontSize: 11 }}>
                {c.map.denver}
              </text>
              <text className="node-label" x="352" y="204" fill="var(--on-ink-mut)" style={{ fontSize: 11 }}>
                {c.map.atlanta}
              </text>
              <text className="node-label" x="6" y="146" fill="var(--on-ink-mut)" style={{ fontSize: 11 }}>
                {c.map.la}
              </text>
              <text className="node-label" x="262" y="264" fill="var(--on-ink-mut)" style={{ fontSize: 11 }}>
                {c.map.miami}
              </text>
              {/* hub */}
              <circle className="mp-hub-ring" cx="150" cy="210" r="6" />
              <circle className="mp-hub" cx="150" cy="210" r="6.5" />
              <text x="92" y="232" fill="#fff" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 14 }}>
                {c.map.hub}
              </text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
