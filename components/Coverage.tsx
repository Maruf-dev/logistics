"use client";

import { t } from "@/lib/i18n";

// Katy, TX dispatch hub + the five destination nodes (viewBox 460 x 300).
// `lx`/`ly` are the manually-tuned label anchors kept from the original layout.
const HUB = { x: 150, y: 210 };
const DESTS = [
  { key: "chicago", x: 300, y: 90, lx: 312, ly: 86 },
  { key: "denver", x: 120, y: 110, lx: 78, ly: 106 },
  { key: "atlanta", x: 340, y: 200, lx: 352, ly: 204 },
  { key: "la", x: 60, y: 150, lx: 6, ly: 146 },
  { key: "miami", x: 250, y: 250, lx: 262, ly: 264 },
] as const;

export default function Coverage() {
  const c = t.coverage;

  // One shipment dot rides each lane hub→city. Constant speed (so longer lanes
  // take longer) with a staggered, deterministic start — no SSR/client drift.
  const lanes = DESTS.map((d, i) => {
    const len = Math.hypot(d.x - HUB.x, d.y - HUB.y);
    return {
      ...d,
      label: c.map[d.key],
      path: `M${HUB.x} ${HUB.y}L${d.x} ${d.y}`,
      dur: Math.max(1.6, len / 52).toFixed(2),
      begin: (-(i * 0.7)).toFixed(2),
    };
  });

  return (
    <section className="section coverage eyebrow-dark" id="coverage">
      <div className="wrap">
        <div className="cov-grid">
          <div className="reveal">
            <span className="kicker">{c.kicker}</span>
            <h2>{c.title}</h2>
            <p>{c.lead}</p>
            <div className="cov-lanes">
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
              {/* route lines from the hub — dashes flow slowly outward */}
              {lanes.map((l) => (
                <path key={l.key} className="mp-line" d={l.path} />
              ))}

              {/* radar pings rippling out from the dispatch hub */}
              <circle className="mp-ping" cx={HUB.x} cy={HUB.y} r="7" />
              <circle className="mp-ping p2" cx={HUB.x} cy={HUB.y} r="7" />

              {/* shipment dots riding each lane, hub → city */}
              <g className="mp-pulses" aria-hidden="true">
                {lanes.map((l) => (
                  <circle key={l.key} className="mp-pulse" r="3.1">
                    <animateMotion
                      dur={`${l.dur}s`}
                      begin={`${l.begin}s`}
                      repeatCount="indefinite"
                      path={l.path}
                    />
                  </circle>
                ))}
              </g>

              {/* dest nodes */}
              {lanes.map((l) => (
                <circle key={l.key} className="mp-node" cx={l.x} cy={l.y} r="5" />
              ))}

              {/* labels */}
              {lanes.map((l) => (
                <text key={l.key} className="node-label" x={l.lx} y={l.ly}>
                  {l.label}
                </text>
              ))}

              {/* hub */}
              <circle className="mp-hub-ring" cx={HUB.x} cy={HUB.y} r="6" />
              <circle className="mp-hub" cx={HUB.x} cy={HUB.y} r="6.5" />
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
