"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "./LanguageProvider";

/** Count-up targets (language-independent). Order matches `t.stats`. */
const TARGETS = [48, 53, 24, 2];
const DURATION = 1100;

function useCountUp(targets: number[], start: boolean) {
  const [values, setValues] = useState<number[]>(() => targets.map(() => 0));

  useEffect(() => {
    if (!start) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setValues(targets);
      return;
    }
    let raf = 0;
    let t0: number | null = null;
    const tick = (now: number) => {
      if (t0 === null) t0 = now;
      const p = Math.min(1, (now - t0) / DURATION);
      const eased = 1 - Math.pow(1 - p, 3);
      setValues(targets.map((to) => Math.round(to * eased)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start]);

  return values;
}

export default function Stats() {
  const { t } = useI18n();
  const rowRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const values = useCountUp(TARGETS, inView);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="stats">
      <div className="wrap" ref={rowRef}>
        {t.stats.map((stat, i) => (
          <div className="stat" key={stat.label}>
            <div className="num">
              {stat.prefix}
              <span className="count">{values[i]}</span>
              {stat.suffix && <small>{stat.suffix}</small>}
            </div>
            <div className="lbl">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
