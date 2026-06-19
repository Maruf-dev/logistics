"use client";

import { t } from "@/lib/i18n";

// Chicago, IL dispatch hub + its destination nodes (viewBox 460 x 300).
// Coordinates are a real equirectangular projection of each city's lat/long
// (continental-US aspect preserved), so the layout matches actual U.S. geography
// rather than a decorative fan. `lx`/`ly` are label anchors; `anchor` keeps
// edge labels on-card.
const HUB = { x: 308, y: 101 }; // Chicago, IL — 41.9°N, 87.6°W
const DESTS = [
  { key: "chicago", x: 342, y: 97, lx: 342, ly: 83, anchor: "middle" }, // Detroit — 42.3°N, 83.0°W
  { key: "denver", x: 175, y: 122, lx: 163, ly: 126, anchor: "end" }, //   39.7°N, 105.0°W
  { key: "atlanta", x: 333, y: 180, lx: 345, ly: 184, anchor: "start" }, // 33.7°N, 84.4°W
  { key: "la", x: 74, y: 177, lx: 62, ly: 181, anchor: "end" }, //         34.0°N, 118.2°W
  { key: "miami", x: 365, y: 257, lx: 377, ly: 261, anchor: "start" }, //  25.8°N, 80.2°W
  { key: "newyork", x: 412, y: 113, lx: 400, ly: 118, anchor: "end" }, //  40.7°N, 74.0°W
  { key: "dallas", x: 237, y: 190, lx: 237, ly: 210, anchor: "middle" }, // 32.8°N, 96.8°W
  { key: "seattle", x: 42, y: 46, lx: 54, ly: 42, anchor: "start" }, //    47.6°N, 122.3°W
] as const;

const POS = Object.fromEntries(DESTS.map((d) => [d.key, d])) as Record<string, (typeof DESTS)[number]>;

// Secondary city-to-city corridors (no hub) — render fainter, no shipment dots.
const CONNECTORS: [string, string][] = [
  ["seattle", "la"], // west coast
  ["newyork", "atlanta"], // east coast
  ["atlanta", "miami"], // southeast → Florida
];

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
      begin: (-(i * 0.6)).toFixed(2),
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
              {/* secondary city-to-city corridors (drawn under the hub lanes) */}
              {CONNECTORS.map(([a, b]) => (
                <path key={`${a}-${b}`} className="mp-conn" d={`M${POS[a].x} ${POS[a].y}L${POS[b].x} ${POS[b].y}`} />
              ))}

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
                <text key={l.key} className="node-label" x={l.lx} y={l.ly} textAnchor={l.anchor}>
                  {l.label}
                </text>
              ))}

              {/* hub */}
              <circle className="mp-hub-ring" cx={HUB.x} cy={HUB.y} r="6" />
              <circle className="mp-hub" cx={HUB.x} cy={HUB.y} r="6.5" />
              <text x="296" y="120" textAnchor="end" className="cov-hub-name">
                {c.map.hub}
              </text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
