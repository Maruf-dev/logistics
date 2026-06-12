"use client";

import { useI18n } from "./LanguageProvider";

// One small line-icon per spec row (order mirrors t.equipment.specs).
const SPEC_ICONS = [
  // 0 — trailer length (horizontal measure)
  <g key="len" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12h18" />
    <path d="M6 9l-3 3 3 3M18 9l3 3-3 3" />
  </g>,
  // 1 — payload (weight)
  <g key="pay" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 20h14l-1.6-10H6.6z" />
    <path d="M9 10a3 3 0 0 1 6 0" />
  </g>,
  // 2 — capacity (stacked pallets)
  <g key="cap" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round">
    <rect x="3" y="4.5" width="7.5" height="6" rx="0.6" />
    <rect x="13.5" y="4.5" width="7.5" height="6" rx="0.6" />
    <rect x="8.25" y="13.5" width="7.5" height="6" rx="0.6" />
  </g>,
  // 3 — trip logging (GPS pin)
  <g key="trip" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 21s6.5-5.4 6.5-10.5a6.5 6.5 0 1 0-13 0C5.5 15.6 12 21 12 21z" />
    <circle cx="12" cy="10.5" r="2.4" />
  </g>,
  // 4 — type (truck)
  <g key="type" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6.5h11v8H3z" />
    <path d="M14 9h3.6l2.4 3v2.5H14z" />
    <circle cx="7" cy="17" r="1.7" />
    <circle cx="17" cy="17" r="1.7" />
  </g>,
];

const PALLETS = Array.from({ length: 13 }, (_, i) => 176 + i * 24);
// steer (under hood) · drive tandem (under cab) · trailer tandem (rear)
const AXLES = [70, 118, 154, 430, 466];

export default function Equipment() {
  const { t, lang } = useI18n();

  return (
    <section className="section equip" id="equipment">
      <div className="wrap">
        <div className="eq-grid">
          <div className="trailer-diagram reveal">
            <div className="td-head">
              <span>{lang === "ru" ? "Сухой фургон · боковая проекция" : "Dry van · side elevation"}</span>
              <span>FIG-53</span>
            </div>
            <svg viewBox="0 0 520 250" aria-label={t.a11y.trailer} role="img">
              {/* dimension — length */}
              <g>
                <line className="td-dim td-draw" x1="166" y1="48" x2="502" y2="48" pathLength={1} />
                <line className="td-dim" x1="166" y1="42" x2="166" y2="54" />
                <line className="td-dim" x1="502" y1="42" x2="502" y2="54" />
                <text className="td-dimtxt" x="334" y="38" textAnchor="middle">53 ft · 16.1 m</text>
              </g>

              {/* tractor: conventional hood + sleeper cab */}
              <path className="td-fill" d="M40 176 V130 Q40 124 47 124 L96 119 L116 80 Q117 76 123 76 L158 76 V176 Z" />
              <path className="td-out td-draw" d="M40 176 V130 Q40 124 47 124 L96 119 L116 80 Q117 76 123 76 L158 76 V176 Z" pathLength={1} />
              <path className="td-glass" d="M101 117 L117 83 L150 83 L150 117 Z" />
              <line className="td-detail" x1="150" y1="86" x2="150" y2="172" />
              {/* side mirror */}
              <line className="td-detail" x1="117" y1="90" x2="111" y2="90" />
              <rect className="td-fill" x="106" y="86" width="4" height="11" rx="1" stroke="var(--fg)" strokeWidth="1.2" />
              {/* fifth-wheel coupling */}
              <line className="td-detail" x1="150" y1="174" x2="172" y2="174" strokeWidth="2" />

              {/* GPS antenna + live ping (on the cab roof) */}
              <line className="td-gps" x1="112" y1="76" x2="112" y2="62" />
              <circle className="gps-dot" cx="112" cy="62" r="2.4" />
              <text className="gps-label" x="120" y="65">GPS</text>

              {/* trailer — cutaway box revealing the loadout */}
              <rect className="td-out td-draw" x="166" y="74" width="336" height="102" pathLength={1} />
              <line className="td-out" x1="150" y1="176" x2="502" y2="176" strokeWidth="3" />
              {/* rear swing-door hinges */}
              <line className="td-detail" x1="499" y1="90" x2="505" y2="90" />
              <line className="td-detail" x1="499" y1="125" x2="505" y2="125" />
              <line className="td-detail" x1="499" y1="160" x2="505" y2="160" />

              {/* pallet loadout (renders statically) */}
              <g className="loadout">
                {PALLETS.map((px) => (
                  <g className="pallet" key={px}>
                    <rect className="pallet-box" x={px} y={120} width={21} height={50} rx={1.5} />
                    <rect className="pallet-deck" x={px} y={170} width={21} height={4} />
                  </g>
                ))}
              </g>
              <text className="pallet-note" x="334" y="104" textAnchor="middle">
                {lang === "ru" ? "26 EUR-палет" : "26 EUR pallets"}
              </text>

              {/* landing gear (retracted) + rear mud flap */}
              <line className="td-detail" x1="206" y1="176" x2="206" y2="192" />
              <line className="td-detail" x1="214" y1="176" x2="214" y2="192" />
              <line className="td-detail" x1="202" y1="192" x2="218" y2="192" />
              <rect className="td-hub" x="486" y="176" width="4" height="22" />

              {/* axles — tire / rim / hub */}
              {AXLES.map((cx) => (
                <g key={cx}>
                  <circle className="td-tire" cx={cx} cy={189} r={17} />
                  <circle className="td-rim" cx={cx} cy={189} r={9.5} />
                  <circle className="td-hub" cx={cx} cy={189} r={3} />
                </g>
              ))}

              {/* ground */}
              <line className="td-ground" x1="24" y1="207" x2="506" y2="207" />

              {/* dimension — height */}
              <g>
                <line className="td-dim td-draw" x1="514" y1="74" x2="514" y2="176" pathLength={1} />
                <line className="td-dim" x1="508" y1="74" x2="520" y2="74" />
                <line className="td-dim" x1="508" y1="176" x2="520" y2="176" />
                <text className="td-dimtxt" x="514" y="125" textAnchor="middle" transform="rotate(-90 514 125)">9 ft</text>
              </g>
            </svg>
          </div>

          <div className="reveal eq-info">
            <span className="kicker">{t.equipment.kicker}</span>
            <h2>{t.equipment.title}</h2>
            <p>{t.equipment.lead}</p>
            <div className="eq-chips">
              <span className="eq-chip"><span className="dot" />53′ Dry Van</span>
              <span className="eq-chip"><span className="dot" />GPS 24/7</span>
              <span className="eq-chip"><span className="dot" />ELD</span>
              <span className="eq-chip"><span className="dot" />{lang === "ru" ? "26 палет" : "26 pallets"}</span>
            </div>
            <ul className="eq-specs">
              {t.equipment.specs.map((spec, i) => (
                <li key={spec.label}>
                  <span className="eq-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="eq-ic">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      {SPEC_ICONS[i] ?? SPEC_ICONS[0]}
                    </svg>
                  </span>
                  <span className="eq-lbl">{spec.label}</span>
                  <b>{spec.value}</b>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
