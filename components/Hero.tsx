"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useI18n } from "./LanguageProvider";

/* ------------------------------------------------------------------
   Right-column "live network" map.
   A US-shaped constellation of nodes (viewBox 1000 x 480). The first
   HUB_COUNT entries are labelled city hubs; the rest fill the mesh.
   Edges are derived deterministically (so SSR + client match) by
   connecting any two nodes closer than EDGE_MAX. A few bright lanes
   fan out from the Houston dispatch hub, and trucks drive them via rAF.
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

// Bright lanes fanning out from the Houston hub (index pairs into NODES).
const ROUTES: [number, number][] = [[2, 3], [2, 4], [2, 1], [2, 5], [2, 0], [2, 6]];

// Trucks travel a → b along a lane; some inbound to the hub, some outbound.
const TRUCKS = [
  { a: 2, b: 3, period: 5200, phase: 0 }, // Houston → Chicago (outbound)
  { a: 4, b: 2, period: 6000, phase: 0.35 }, // Atlanta → Houston (inbound)
  { a: 1, b: 2, period: 7200, phase: 0.62 }, // Los Angeles → Houston (inbound)
];

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

function transformAt(a: MapNode, b: MapNode, p: number) {
  const x = a.x + (b.x - a.x) * p;
  const y = a.y + (b.y - a.y) * p;
  const ang = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
  return `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${ang.toFixed(1)})`;
}

export default function Hero() {
  const { t, lang } = useI18n();
  const h = t.hero;

  // Honour reduced-motion: when set, trucks stay parked mid-lane.
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setAnimate(!mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Drive every truck along its lane from a single rAF loop.
  const truckRefs = useRef<(SVGGElement | null)[]>([]);
  useEffect(() => {
    if (!animate) return;
    let raf = 0;
    let start = 0;
    const frame = (now: number) => {
      if (!start) start = now;
      const elapsed = now - start;
      TRUCKS.forEach((tk, i) => {
        const el = truckRefs.current[i];
        if (!el) return;
        const a = NODES[tk.a];
        const b = NODES[tk.b];
        const p = ((elapsed / tk.period + tk.phase) % 1 + 1) % 1;
        // fade in/out near the wrap so the loop reset isn't a hard jump
        const op = p < 0.07 ? p / 0.07 : p > 0.93 ? (1 - p) / 0.07 : 1;
        el.setAttribute("transform", transformAt(a, b, p));
        el.style.opacity = op.toFixed(3);
      });
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [animate]);

  const cityName = (node: MapNode) =>
    node.main && lang === "ru" ? "Хьюстон" : node.hub;

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
                USDOT <b>#3822610</b>
              </span>
              <span className="auth-chip">
                MC <b>#1383751</b>
              </span>
            </div>
          </div>

          <div className="hero-vis">
            <div className="route">
              <svg viewBox="0 0 1000 480" aria-label={t.a11y.coverageMap} role="img">
                <defs>
                  <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* faint triangulated mesh */}
                <g className="mesh">
                  {EDGES.map(([i, j], k) => (
                    <line key={k} className="mline" x1={NODES[i].x} y1={NODES[i].y} x2={NODES[j].x} y2={NODES[j].y} />
                  ))}
                </g>

                {/* bright lanes from the hub */}
                <g className="lanes">
                  {ROUTES.map(([i, j], k) => (
                    <line key={k} className="rline" x1={NODES[i].x} y1={NODES[i].y} x2={NODES[j].x} y2={NODES[j].y} />
                  ))}
                </g>

                {/* mesh dots (twinkle, staggered) */}
                <g className="dots">
                  {NODES.slice(HUB_COUNT).map((n, i) => (
                    <circle
                      key={i}
                      className="mnode"
                      cx={n.x}
                      cy={n.y}
                      r={2.6}
                      style={{ animationDelay: `${((i * 0.41) % 4).toFixed(2)}s` }}
                    />
                  ))}
                </g>

                {/* trucks rolling along the lanes */}
                <g className="trucks" aria-hidden="true">
                  {TRUCKS.map((tk, i) => (
                    <g
                      key={i}
                      className="truck"
                      ref={(el) => {
                        truckRefs.current[i] = el;
                      }}
                      transform={transformAt(NODES[tk.a], NODES[tk.b], 0.5)}
                    >
                      <rect x="-15" y="-7" width="22" height="14" rx="2.5" fill="#fff" />
                      <rect x="7" y="-4.5" width="9" height="9" rx="1.5" fill="var(--accent)" />
                      <circle cx="-9" cy="8" r="2.4" fill="var(--ink)" />
                      <circle cx="11" cy="8" r="2.4" fill="var(--ink)" />
                    </g>
                  ))}
                </g>

                {/* glowing city hubs */}
                <g className="hubs">
                  {NODES.slice(0, HUB_COUNT).map((n, i) => (
                    <g key={i}>
                      <circle cx={n.x} cy={n.y} r={28} fill="url(#hubGlow)" className="hub-glow" />
                      <circle cx={n.x} cy={n.y} r={9} className="hub-ring" style={{ animationDelay: `${(i * 0.4).toFixed(2)}s` }} />
                      {n.main ? (
                        <rect x={n.x - 7} y={n.y - 7} width="14" height="14" rx="3" fill="#fff" className="hub-core" />
                      ) : (
                        <circle cx={n.x} cy={n.y} r={4.6} fill="var(--accent)" className="hub-core" />
                      )}
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
                            {lang === "ru" ? "ХАБ" : "DISPATCH HUB"}
                          </text>
                        )}
                        <text className={n.main ? "hub-label main" : "hub-label"} x={n.x + dx} y={ly} textAnchor={anchor}>
                          {cityName(n)}
                        </text>
                      </g>
                    );
                  })}
                </g>
              </svg>
            </div>

            <div className="load-card" aria-hidden="true">
              <div className="lc-top">
                <span className="lc-id mono">{h.load.id}</span>
                <span className="pill">
                  <span className="dot" />
                  {h.load.status}
                </span>
              </div>
              <div className="lc-route">
                <span>{h.load.from}</span>
                <span className="arr" />
                <span>{h.load.to}</span>
              </div>
              <div className="lc-meta">
                <div>
                  <span>{h.load.etaLabel}</span>
                  <b>{h.load.eta}</b>
                </div>
                <div>
                  <span>{h.load.equipLabel}</span>
                  <b>{h.load.equip}</b>
                </div>
                <div>
                  <span>{h.load.weightLabel}</span>
                  <b>{h.load.weight}</b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
