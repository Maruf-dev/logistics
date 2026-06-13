"use client";

import Link from "next/link";
import { t } from "@/lib/i18n";

/* ------------------------------------------------------------------
   Right-column network map.
   A US-shaped constellation of nodes (viewBox 1000 x 480). The first
   HUB_COUNT entries are labelled city hubs; the rest fill a faint mesh.
   Edges are derived deterministically (so SSR + client match) by
   connecting any two nodes closer than EDGE_MAX. A few lanes fan out
   from the Houston dispatch hub — the single, restrained motif (a slow
   dashed flow, CSS-only, disabled under prefers-reduced-motion).
------------------------------------------------------------------- */
type MapNode = { x: number; y: number; hub?: string; main?: boolean };

const NODES: MapNode[] = [
  { x: 78, y: 84, hub: "Seattle" }, // 0
  { x: 120, y: 300, hub: "Los Angeles" }, // 1
  { x: 500, y: 372, hub: "Houston", main: true }, // 2 — dispatch hub
  { x: 668, y: 168, hub: "Chicago" }, // 3
  { x: 762, y: 312, hub: "Atlanta" }, // 4
  { x: 902, y: 150, hub: "New York" }, // 5
  { x: 815, y: 432, hub: "Miami" }, // 6
  // mesh fill
  { x: 185, y: 62 }, { x: 300, y: 78 }, { x: 415, y: 58 }, { x: 535, y: 74 }, { x: 640, y: 66 }, { x: 745, y: 74 },
  { x: 95, y: 152 }, { x: 210, y: 148 }, { x: 320, y: 166 }, { x: 430, y: 150 }, { x: 540, y: 170 }, { x: 792, y: 150 }, { x: 862, y: 182 },
  { x: 92, y: 240 }, { x: 200, y: 232 }, { x: 310, y: 250 }, { x: 415, y: 238 }, { x: 520, y: 256 }, { x: 615, y: 236 }, { x: 700, y: 250 }, { x: 792, y: 238 }, { x: 878, y: 236 },
  { x: 232, y: 322 }, { x: 342, y: 316 }, { x: 448, y: 330 }, { x: 560, y: 318 }, { x: 652, y: 332 }, { x: 860, y: 318 },
  { x: 360, y: 402 }, { x: 442, y: 410 }, { x: 602, y: 398 }, { x: 690, y: 412 }, { x: 760, y: 404 },
];

const HUB_COUNT = 7;
const EDGE_MAX = 156; // nodes closer than this get a faint mesh line

// Lanes fanning out from the Houston hub (index pairs into NODES).
const ROUTES: [number, number][] = [[2, 3], [2, 4], [2, 1], [2, 5], [2, 0], [2, 6]];

// Deterministic mesh edges, computed once at module load.
const EDGES: [number, number][] = (() => {
  const out: [number, number][] = [];
  for (let i = 0; i < NODES.length; i++) {
    for (let j = i + 1; j < NODES.length; j++) {
      const d = Math.hypot(NODES[i].x - NODES[j].x, NODES[i].y - NODES[j].y);
      if (d < EDGE_MAX) out.push([i, j]);
    }
  }
  return out;
})();

// One truck rolls along each lane. Directions alternate (hub↔city) and the
// timings are derived deterministically from the index — no randomness — so
// SSR and client agree and the fleet stays spread out along the lanes instead
// of pulsing from Houston in unison. Constant cruising speed, slow and quiet.
const TRUCKS = ROUTES.map(([from, to], i) => {
  const a = NODES[from];
  const b = NODES[to];
  const [p, q] = i % 2 === 0 ? [a, b] : [b, a]; // alternate travel direction
  const len = Math.hypot(a.x - b.x, a.y - b.y);
  return {
    path: `M${p.x} ${p.y}L${q.x} ${q.y}`,
    dur: Math.max(3.6, len / 56).toFixed(1), // ~constant speed across lanes
    begin: (-(i * 1.6 + (i % 3) * 0.6)).toFixed(1), // pre-distribute along lanes
  };
});

export default function Hero() {
  const h = t.hero;

  return (
    <section className="hero eyebrow-dark">
      <div className="wrap">
        <div className="hero-grid">
          <div className="hero-copy">
            <span className="kicker">{h.kicker}</span>
            <h1>
              {h.titleBefore}
              <em>{h.titleEm}</em>
              {h.titleAfter}
            </h1>
            <p className="lead">{h.lead}</p>
            <div className="hero-cta">
              <Link href="#quote" className="btn btn-accent">
                {h.ctaQuote}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link href="#services" className="btn btn-ink">
                {h.ctaServices}
              </Link>
            </div>
            <div className="authority">
              <span className="auth-chip">
                <span className="dot" />
                {h.authority} <b>{h.active}</b>
              </span>
              <span className="auth-chip">
                USDOT <b>#4327636</b>
              </span>
              <span className="auth-chip">
                MC <b>#1689299</b>
              </span>
            </div>
          </div>

          <div className="hero-vis">
            <div className="route">
              <div className="route-head">
                <span className="route-title">U.S. lane network</span>
                <span className="route-legend" aria-hidden="true">
                  <span className="rl-item"><i className="rl-hub" />Hub</span>
                  <span className="rl-item"><i className="rl-lane" />Lane</span>
                </span>
              </div>
              <svg viewBox="0 0 1000 480" aria-label={t.a11y.heroRoute} role="img">
                {/* faint triangulated mesh */}
                <g className="mesh">
                  {EDGES.map(([i, j], k) => (
                    <line key={k} className="mline" x1={NODES[i].x} y1={NODES[i].y} x2={NODES[j].x} y2={NODES[j].y} />
                  ))}
                </g>

                {/* lanes from the hub */}
                <g className="lanes">
                  {ROUTES.map(([i, j], k) => (
                    <line key={k} className="rline" x1={NODES[i].x} y1={NODES[i].y} x2={NODES[j].x} y2={NODES[j].y} />
                  ))}
                </g>

                {/* mesh dots */}
                <g className="dots">
                  {NODES.slice(HUB_COUNT).map((n, i) => (
                    <circle key={i} className="mnode" cx={n.x} cy={n.y} r={2.6} />
                  ))}
                </g>

                {/* city hubs */}
                <g className="hubs">
                  {NODES.slice(0, HUB_COUNT).map((n, i) => (
                    n.main ? (
                      <rect key={i} x={n.x - 7} y={n.y - 7} width="14" height="14" rx="3" className="hub-core" />
                    ) : (
                      <circle key={i} cx={n.x} cy={n.y} r={4.6} className="hub-core" />
                    )
                  ))}
                </g>

                {/* rolling fleet — one slow, staggered truck per lane */}
                <g className="trucks" aria-hidden="true">
                  {TRUCKS.map((tk, i) => (
                    <g key={i} className="truck">
                      <rect className="tk-trailer" x={-15} y={-5} width={19} height={10} rx={2.4} />
                      <rect className="tk-cab" x={4} y={-4.2} width={8} height={8.4} rx={2} />
                      <rect className="tk-gap" x={2} y={-4.2} width={2} height={8.4} />
                      <animateMotion
                        dur={`${tk.dur}s`}
                        begin={`${tk.begin}s`}
                        repeatCount="indefinite"
                        rotate="auto"
                        path={tk.path}
                      />
                    </g>
                  ))}
                </g>

                {/* hub labels */}
                <g className="labels">
                  {NODES.slice(0, HUB_COUNT).map((n, i) => {
                    const below = n.y < 110;
                    const ly = below ? n.y + 34 : n.y - 20;
                    const anchor = n.x < 150 ? "start" : n.x > 850 ? "end" : "middle";
                    const dx = anchor === "start" ? 12 : anchor === "end" ? -12 : 0;
                    return (
                      <g key={i}>
                        {n.main && (
                          <text className="hub-tag" x={n.x + dx} y={ly - 22} textAnchor={anchor}>
                            DISPATCH HUB
                          </text>
                        )}
                        <text className={n.main ? "hub-label main" : "hub-label"} x={n.x + dx} y={ly} textAnchor={anchor}>
                          {n.hub}
                        </text>
                      </g>
                    );
                  })}
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
